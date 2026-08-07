"use strict";
// ============================================================
// Booking Engine — Core service with distributed locking
// CRITICAL: Prevents double-bookings via Redis + PostgreSQL
// ============================================================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BookingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const redis_service_1 = require("../../common/redis/redis.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const nanoid_1 = require("nanoid");
const SLOT_LOCK_TTL = 300; // 5 minutes
const BOOKING_HOLD_TTL = 600; // 10 minutes
let BookingsService = BookingsService_1 = class BookingsService {
    constructor(prisma, redis, bookingQueue) {
        this.prisma = prisma;
        this.redis = redis;
        this.bookingQueue = bookingQueue;
        this.logger = new common_1.Logger(BookingsService_1.name);
    }
    // ==========================================================
    // BOOKING FLOW — With distributed locking
    // ==========================================================
    /**
     * Step 1: Reserve a slot
     * - Acquires Redis distributed lock on the slot
     * - Validates capacity
     * - Creates a temporary booking hold
     * - Returns booking reference for payment
     */
    async reserveSlot(userId, slotId, serviceId, attendeeCount = 1, notes) {
        const lockKey = `lock:slot:${slotId}`;
        const holdKey = `hold:booking`;
        // Step 1: Acquire distributed lock
        const lockValue = await this.redis.acquireLock(lockKey, SLOT_LOCK_TTL);
        if (!lockValue) {
            throw new common_1.ConflictException('Slot is currently being booked by another user. Please try again.');
        }
        try {
            // Step 2: Validate slot availability within transaction
            const result = await this.prisma.$transaction(async (tx) => {
                // Fetch slot with pessimistic locking intent
                const slot = await tx.bookingSlot.findUnique({
                    where: { id: slotId },
                    include: { service: { include: { merchant: true } } },
                });
                if (!slot) {
                    throw new common_1.NotFoundException('Slot not found');
                }
                if (slot.isBlocked || !slot.isAvailable) {
                    throw new common_1.BadRequestException('Slot is not available');
                }
                if (slot.serviceId !== serviceId) {
                    throw new common_1.BadRequestException('Slot does not belong to this service');
                }
                // Step 3: Validate capacity
                const remainingCapacity = slot.maxCapacity - slot.bookedCount;
                if (attendeeCount > remainingCapacity) {
                    throw new common_1.BadRequestException(`Only ${remainingCapacity} spots remaining. Requested: ${attendeeCount}`);
                }
                // Step 4: Generate booking reference
                const bookingReference = `BK-${(0, nanoid_1.nanoid)(10).toUpperCase()}`;
                const totalAmount = Number(slot.price) * attendeeCount;
                // Step 5: Create booking in PENDING state
                const booking = await tx.booking.create({
                    data: {
                        bookingReference,
                        userId,
                        serviceId,
                        merchantId: slot.service.merchantId,
                        slotId,
                        status: 'PENDING',
                        totalAmount,
                        currency: slot.service.currency,
                        attendeeCount,
                        notes,
                        scheduledStart: slot.startTime,
                        scheduledEnd: slot.endTime,
                    },
                });
                // Step 6: Increment booked count (optimistic)
                await tx.bookingSlot.update({
                    where: { id: slotId },
                    data: {
                        bookedCount: { increment: attendeeCount },
                        isAvailable: slot.bookedCount + attendeeCount < slot.maxCapacity,
                    },
                });
                return {
                    booking,
                    slot,
                    totalAmount,
                };
            });
            // Step 7: Set booking hold in Redis (expires if payment not completed)
            await this.redis.setJson(`${holdKey}:${result.booking.id}`, {
                bookingId: result.booking.id,
                slotId,
                attendeeCount,
                createdAt: Date.now(),
            }, BOOKING_HOLD_TTL);
            // Step 8: Queue expiry check job
            await this.bookingQueue.add('check-booking-expiry', { bookingId: result.booking.id, slotId, attendeeCount }, { delay: BOOKING_HOLD_TTL * 1000 });
            this.logger.log(`Booking reserved: ${result.booking.bookingReference} for slot ${slotId}`);
            return {
                bookingId: result.booking.id,
                bookingReference: result.booking.bookingReference,
                totalAmount: result.totalAmount,
                currency: result.booking.currency,
                holdExpiresAt: new Date(Date.now() + BOOKING_HOLD_TTL * 1000),
                slot: {
                    startTime: result.slot.startTime,
                    endTime: result.slot.endTime,
                },
            };
        }
        finally {
            // Always release lock
            await this.redis.releaseLock(lockKey, lockValue);
        }
    }
    /**
     * Step 2: Confirm booking after payment
     */
    async confirmBooking(bookingId, paymentId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Booking is ${booking.status}, cannot confirm`);
        }
        const confirmed = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'CONFIRMED' },
            include: {
                service: true,
                merchant: true,
                slot: true,
                user: true,
            },
        });
        // Clear the hold from Redis
        await this.redis.del(`hold:booking:${bookingId}`);
        // Queue notification
        await this.bookingQueue.add('send-confirmation', {
            bookingId: confirmed.id,
            userId: confirmed.userId,
            bookingReference: confirmed.bookingReference,
        });
        this.logger.log(`Booking confirmed: ${confirmed.bookingReference}`);
        return confirmed;
    }
    /**
     * Cancel a booking
     */
    async cancelBooking(bookingId, userId, reason) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.userId !== userId) {
            throw new common_1.BadRequestException('Not authorized to cancel this booking');
        }
        if (['CANCELLED', 'COMPLETED', 'REFUNDED'].includes(booking.status)) {
            throw new common_1.BadRequestException(`Cannot cancel a ${booking.status} booking`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            // Cancel booking
            const cancelled = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: 'CANCELLED',
                    cancelledAt: new Date(),
                    cancelReason: reason,
                },
            });
            // Restore slot capacity
            await tx.bookingSlot.update({
                where: { id: booking.slotId },
                data: {
                    bookedCount: { decrement: booking.attendeeCount },
                    isAvailable: true,
                },
            });
            return cancelled;
        });
        // Queue refund if payment was completed
        await this.bookingQueue.add('process-refund', { bookingId });
        return result;
    }
    /**
     * Handle expired booking holds
     */
    async expireBookingHold(bookingId, slotId, attendeeCount) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking || booking.status !== 'PENDING')
            return;
        // Check if hold still exists in Redis
        const hold = await this.redis.getJson(`hold:booking:${bookingId}`);
        if (hold)
            return; // Hold still active, was extended
        await this.prisma.$transaction(async (tx) => {
            // Cancel the expired booking
            await tx.booking.update({
                where: { id: bookingId },
                data: { status: 'CANCELLED', cancelReason: 'Payment timeout' },
            });
            // Restore slot capacity
            await tx.bookingSlot.update({
                where: { id: slotId },
                data: {
                    bookedCount: { decrement: attendeeCount },
                    isAvailable: true,
                },
            });
        });
        this.logger.warn(`Booking expired: ${booking.bookingReference}`);
    }
    // ==========================================================
    // QUERY METHODS
    // ==========================================================
    async findById(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.NotFoundException('Booking not found');
        }
        const booking = await this.prisma.booking.findUnique({
            where: { id, deletedAt: null },
            include: {
                service: true,
                merchant: { select: { id: true, name: true, logoUrl: true, address: true, phone: true } },
                slot: true,
                payment: true,
                qrCheckin: true,
                user: { select: { id: true, name: true, email: true, avatarUrl: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async findByReference(reference) {
        const booking = await this.prisma.booking.findUnique({
            where: { bookingReference: reference, deletedAt: null },
            include: {
                service: true,
                merchant: true,
                slot: true,
                payment: true,
                qrCheckin: true,
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async findByMerchant(merchantId, pagination, status) {
        const where = { merchantId, deletedAt: null };
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip: pagination.skip,
                take: pagination.take,
                orderBy: { scheduledStart: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } },
                    service: { select: { id: true, name: true } },
                    slot: true,
                    payment: true,
                    qrCheckin: true,
                },
            }),
            this.prisma.booking.count({ where }),
        ]);
        return (0, pagination_dto_1.createPaginatedResponse)(data, total, pagination);
    }
    async findByUser(userId, status) {
        const where = { userId, deletedAt: null };
        if (status)
            where.status = status;
        return this.prisma.booking.findMany({
            where,
            orderBy: { scheduledStart: 'desc' },
            include: {
                service: { select: { id: true, name: true, images: true, durationMinutes: true } },
                merchant: { select: { id: true, name: true, logoUrl: true, address: true } },
                slot: true,
                payment: true,
                qrCheckin: true,
            },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = BookingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('booking-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        bullmq_2.Queue])
], BookingsService);
