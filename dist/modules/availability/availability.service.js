"use strict";
// ============================================================
// Availability Service — Slot generation & management
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
var AvailabilityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const redis_service_1 = require("../../common/redis/redis.service");
let AvailabilityService = AvailabilityService_1 = class AvailabilityService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
        this.logger = new common_1.Logger(AvailabilityService_1.name);
    }
    /**
     * Set availability rules for a service
     */
    async setRules(serviceId, rules) {
        // Delete existing rules
        await this.prisma.availabilityRule.deleteMany({ where: { serviceId } });
        // Create new rules
        return this.prisma.availabilityRule.createMany({
            data: rules.map((r) => ({
                serviceId,
                dayOfWeek: r.dayOfWeek,
                startTime: r.startTime,
                endTime: r.endTime,
            })),
        });
    }
    /**
     * Get availability rules for a service
     */
    async getRules(serviceId) {
        return this.prisma.availabilityRule.findMany({
            where: { serviceId, isActive: true },
            orderBy: { dayOfWeek: 'asc' },
        });
    }
    /**
     * Generate slots for a service on a given date range
     * Based on availability rules, duration, and buffer time
     */
    async generateSlots(serviceId, startDate, endDate) {
        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
            include: { availabilityRules: { where: { isActive: true } } },
        });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        const slots = [];
        const dayMap = {
            SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3,
            THURSDAY: 4, FRIDAY: 5, SATURDAY: 6,
        };
        const current = new Date(startDate);
        while (current <= endDate) {
            const dayOfWeek = current.getDay();
            const dayRules = service.availabilityRules.filter((r) => dayMap[r.dayOfWeek] === dayOfWeek);
            for (const rule of dayRules) {
                const [startH, startM] = rule.startTime.split(':').map(Number);
                const [endH, endM] = rule.endTime.split(':').map(Number);
                let slotStart = new Date(current);
                slotStart.setHours(startH, startM, 0, 0);
                const ruleEnd = new Date(current);
                ruleEnd.setHours(endH, endM, 0, 0);
                while (slotStart < ruleEnd) {
                    const slotEnd = new Date(slotStart.getTime() + service.durationMinutes * 60 * 1000);
                    if (slotEnd <= ruleEnd) {
                        slots.push({
                            serviceId,
                            date: new Date(current.toISOString().split('T')[0]),
                            startTime: new Date(slotStart),
                            endTime: new Date(slotEnd),
                            maxCapacity: service.maxCapacity,
                            price: Number(service.basePrice),
                        });
                    }
                    // Move to next slot (duration + buffer)
                    slotStart = new Date(slotStart.getTime() +
                        (service.durationMinutes + service.bufferMinutes) * 60 * 1000);
                }
            }
            current.setDate(current.getDate() + 1);
        }
        // Upsert slots (skip existing)
        let created = 0;
        for (const slot of slots) {
            try {
                await this.prisma.bookingSlot.upsert({
                    where: {
                        serviceId_startTime: {
                            serviceId: slot.serviceId,
                            startTime: slot.startTime,
                        },
                    },
                    update: {},
                    create: slot,
                });
                created++;
            }
            catch (e) {
                // Skip duplicate
            }
        }
        this.logger.log(`Generated ${created} slots for service ${serviceId}`);
        return { generated: created, total: slots.length };
    }
    /**
     * Get available slots for a service on a date
     */
    async getSlots(serviceId, date) {
        const targetDate = new Date(date);
        return this.prisma.bookingSlot.findMany({
            where: {
                serviceId,
                date: targetDate,
                isBlocked: false,
                isAvailable: true,
            },
            orderBy: { startTime: 'asc' },
        });
    }
    /**
     * Block/unblock a specific slot
     */
    async toggleSlotBlock(slotId, isBlocked) {
        return this.prisma.bookingSlot.update({
            where: { id: slotId },
            data: { isBlocked },
        });
    }
    /**
     * Block all slots on a date range (e.g., holidays)
     */
    async blockDateRange(serviceId, startDate, endDate) {
        return this.prisma.bookingSlot.updateMany({
            where: {
                serviceId,
                date: { gte: startDate, lte: endDate },
            },
            data: { isBlocked: true },
        });
    }
    /**
     * Update slot pricing
     */
    async updateSlotPrice(slotId, price) {
        return this.prisma.bookingSlot.update({
            where: { id: slotId },
            data: { price },
        });
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = AvailabilityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], AvailabilityService);
