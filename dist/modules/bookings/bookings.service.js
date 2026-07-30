"use strict";
// ============================================================
// Booking Engine — Core service with distributed locking
// CRITICAL: Prevents double-bookings via Redis + PostgreSQL
// ============================================================
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
var common_1 = require("@nestjs/common");
var pagination_dto_1 = require("../../common/dto/pagination.dto");
var nanoid_1 = require("nanoid");
var SLOT_LOCK_TTL = 300; // 5 minutes
var BOOKING_HOLD_TTL = 600; // 10 minutes
var BookingsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookingsService = _classThis = /** @class */ (function () {
        function BookingsService_1(prisma, redis, bookingQueue) {
            this.prisma = prisma;
            this.redis = redis;
            this.bookingQueue = bookingQueue;
            this.logger = new common_1.Logger(BookingsService.name);
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
        BookingsService_1.prototype.reserveSlot = function (userId_1, slotId_1, serviceId_1) {
            return __awaiter(this, arguments, void 0, function (userId, slotId, serviceId, attendeeCount, notes) {
                var lockKey, holdKey, lockValue, result;
                var _this = this;
                if (attendeeCount === void 0) { attendeeCount = 1; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lockKey = "lock:slot:".concat(slotId);
                            holdKey = "hold:booking";
                            return [4 /*yield*/, this.redis.acquireLock(lockKey, SLOT_LOCK_TTL)];
                        case 1:
                            lockValue = _a.sent();
                            if (!lockValue) {
                                throw new common_1.ConflictException('Slot is currently being booked by another user. Please try again.');
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, , 6, 8]);
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var slot, remainingCapacity, bookingReference, totalAmount, booking;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.bookingSlot.findUnique({
                                                    where: { id: slotId },
                                                    include: { service: { include: { merchant: true } } },
                                                })];
                                            case 1:
                                                slot = _a.sent();
                                                if (!slot) {
                                                    throw new common_1.NotFoundException('Slot not found');
                                                }
                                                if (slot.isBlocked || !slot.isAvailable) {
                                                    throw new common_1.BadRequestException('Slot is not available');
                                                }
                                                if (slot.serviceId !== serviceId) {
                                                    throw new common_1.BadRequestException('Slot does not belong to this service');
                                                }
                                                remainingCapacity = slot.maxCapacity - slot.bookedCount;
                                                if (attendeeCount > remainingCapacity) {
                                                    throw new common_1.BadRequestException("Only ".concat(remainingCapacity, " spots remaining. Requested: ").concat(attendeeCount));
                                                }
                                                bookingReference = "BK-".concat((0, nanoid_1.nanoid)(10).toUpperCase());
                                                totalAmount = Number(slot.price) * attendeeCount;
                                                return [4 /*yield*/, tx.booking.create({
                                                        data: {
                                                            bookingReference: bookingReference,
                                                            userId: userId,
                                                            serviceId: serviceId,
                                                            merchantId: slot.service.merchantId,
                                                            slotId: slotId,
                                                            status: 'PENDING',
                                                            totalAmount: totalAmount,
                                                            currency: slot.service.currency,
                                                            attendeeCount: attendeeCount,
                                                            notes: notes,
                                                            scheduledStart: slot.startTime,
                                                            scheduledEnd: slot.endTime,
                                                        },
                                                    })];
                                            case 2:
                                                booking = _a.sent();
                                                // Step 6: Increment booked count (optimistic)
                                                return [4 /*yield*/, tx.bookingSlot.update({
                                                        where: { id: slotId },
                                                        data: {
                                                            bookedCount: { increment: attendeeCount },
                                                            isAvailable: slot.bookedCount + attendeeCount < slot.maxCapacity,
                                                        },
                                                    })];
                                            case 3:
                                                // Step 6: Increment booked count (optimistic)
                                                _a.sent();
                                                return [2 /*return*/, {
                                                        booking: booking,
                                                        slot: slot,
                                                        totalAmount: totalAmount,
                                                    }];
                                        }
                                    });
                                }); })];
                        case 3:
                            result = _a.sent();
                            // Step 7: Set booking hold in Redis (expires if payment not completed)
                            return [4 /*yield*/, this.redis.setJson("".concat(holdKey, ":").concat(result.booking.id), {
                                    bookingId: result.booking.id,
                                    slotId: slotId,
                                    attendeeCount: attendeeCount,
                                    createdAt: Date.now(),
                                }, BOOKING_HOLD_TTL)];
                        case 4:
                            // Step 7: Set booking hold in Redis (expires if payment not completed)
                            _a.sent();
                            // Step 8: Queue expiry check job
                            return [4 /*yield*/, this.bookingQueue.add('check-booking-expiry', { bookingId: result.booking.id, slotId: slotId, attendeeCount: attendeeCount }, { delay: BOOKING_HOLD_TTL * 1000 })];
                        case 5:
                            // Step 8: Queue expiry check job
                            _a.sent();
                            this.logger.log("Booking reserved: ".concat(result.booking.bookingReference, " for slot ").concat(slotId));
                            return [2 /*return*/, {
                                    bookingId: result.booking.id,
                                    bookingReference: result.booking.bookingReference,
                                    totalAmount: result.totalAmount,
                                    currency: result.booking.currency,
                                    holdExpiresAt: new Date(Date.now() + BOOKING_HOLD_TTL * 1000),
                                    slot: {
                                        startTime: result.slot.startTime,
                                        endTime: result.slot.endTime,
                                    },
                                }];
                        case 6: 
                        // Always release lock
                        return [4 /*yield*/, this.redis.releaseLock(lockKey, lockValue)];
                        case 7:
                            // Always release lock
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Step 2: Confirm booking after payment
         */
        BookingsService_1.prototype.confirmBooking = function (bookingId, paymentId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, confirmed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking)
                                throw new common_1.NotFoundException('Booking not found');
                            if (booking.status !== 'PENDING') {
                                throw new common_1.BadRequestException("Booking is ".concat(booking.status, ", cannot confirm"));
                            }
                            return [4 /*yield*/, this.prisma.booking.update({
                                    where: { id: bookingId },
                                    data: { status: 'CONFIRMED' },
                                    include: {
                                        service: true,
                                        merchant: true,
                                        slot: true,
                                        user: true,
                                    },
                                })];
                        case 2:
                            confirmed = _a.sent();
                            // Clear the hold from Redis
                            return [4 /*yield*/, this.redis.del("hold:booking:".concat(bookingId))];
                        case 3:
                            // Clear the hold from Redis
                            _a.sent();
                            // Queue notification
                            return [4 /*yield*/, this.bookingQueue.add('send-confirmation', {
                                    bookingId: confirmed.id,
                                    userId: confirmed.userId,
                                    bookingReference: confirmed.bookingReference,
                                })];
                        case 4:
                            // Queue notification
                            _a.sent();
                            this.logger.log("Booking confirmed: ".concat(confirmed.bookingReference));
                            return [2 /*return*/, confirmed];
                    }
                });
            });
        };
        /**
         * Cancel a booking
         */
        BookingsService_1.prototype.cancelBooking = function (bookingId, userId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking)
                                throw new common_1.NotFoundException('Booking not found');
                            if (booking.userId !== userId) {
                                throw new common_1.BadRequestException('Not authorized to cancel this booking');
                            }
                            if (['CANCELLED', 'COMPLETED', 'REFUNDED'].includes(booking.status)) {
                                throw new common_1.BadRequestException("Cannot cancel a ".concat(booking.status, " booking"));
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var cancelled;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.booking.update({
                                                    where: { id: bookingId },
                                                    data: {
                                                        status: 'CANCELLED',
                                                        cancelledAt: new Date(),
                                                        cancelReason: reason,
                                                    },
                                                })];
                                            case 1:
                                                cancelled = _a.sent();
                                                // Restore slot capacity
                                                return [4 /*yield*/, tx.bookingSlot.update({
                                                        where: { id: booking.slotId },
                                                        data: {
                                                            bookedCount: { decrement: booking.attendeeCount },
                                                            isAvailable: true,
                                                        },
                                                    })];
                                            case 2:
                                                // Restore slot capacity
                                                _a.sent();
                                                return [2 /*return*/, cancelled];
                                        }
                                    });
                                }); })];
                        case 2:
                            result = _a.sent();
                            // Queue refund if payment was completed
                            return [4 /*yield*/, this.bookingQueue.add('process-refund', { bookingId: bookingId })];
                        case 3:
                            // Queue refund if payment was completed
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * Handle expired booking holds
         */
        BookingsService_1.prototype.expireBookingHold = function (bookingId, slotId, attendeeCount) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, hold;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking || booking.status !== 'PENDING')
                                return [2 /*return*/];
                            return [4 /*yield*/, this.redis.getJson("hold:booking:".concat(bookingId))];
                        case 2:
                            hold = _a.sent();
                            if (hold)
                                return [2 /*return*/]; // Hold still active, was extended
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // Cancel the expired booking
                                            return [4 /*yield*/, tx.booking.update({
                                                    where: { id: bookingId },
                                                    data: { status: 'CANCELLED', cancelReason: 'Payment timeout' },
                                                })];
                                            case 1:
                                                // Cancel the expired booking
                                                _a.sent();
                                                // Restore slot capacity
                                                return [4 /*yield*/, tx.bookingSlot.update({
                                                        where: { id: slotId },
                                                        data: {
                                                            bookedCount: { decrement: attendeeCount },
                                                            isAvailable: true,
                                                        },
                                                    })];
                                            case 2:
                                                // Restore slot capacity
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 3:
                            _a.sent();
                            this.logger.warn("Booking expired: ".concat(booking.bookingReference));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ==========================================================
        // QUERY METHODS
        // ==========================================================
        BookingsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var uuidRegex, booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                            if (!uuidRegex.test(id)) {
                                throw new common_1.NotFoundException('Booking not found');
                            }
                            return [4 /*yield*/, this.prisma.booking.findUnique({
                                    where: { id: id, deletedAt: null },
                                    include: {
                                        service: true,
                                        merchant: { select: { id: true, name: true, logoUrl: true, address: true, phone: true } },
                                        slot: true,
                                        payment: true,
                                        qrCheckin: true,
                                        user: { select: { id: true, name: true, email: true, avatarUrl: true } },
                                    },
                                })];
                        case 1:
                            booking = _a.sent();
                            if (!booking)
                                throw new common_1.NotFoundException('Booking not found');
                            return [2 /*return*/, booking];
                    }
                });
            });
        };
        BookingsService_1.prototype.findByReference = function (reference) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { bookingReference: reference, deletedAt: null },
                                include: {
                                    service: true,
                                    merchant: true,
                                    slot: true,
                                    payment: true,
                                    qrCheckin: true,
                                },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking)
                                throw new common_1.NotFoundException('Booking not found');
                            return [2 /*return*/, booking];
                    }
                });
            });
        };
        BookingsService_1.prototype.findByMerchant = function (merchantId, pagination, status) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, data, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = { merchantId: merchantId, deletedAt: null };
                            if (status)
                                where.status = status;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.booking.findMany({
                                        where: where,
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
                                    this.prisma.booking.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), data = _a[0], total = _a[1];
                            return [2 /*return*/, (0, pagination_dto_1.createPaginatedResponse)(data, total, pagination)];
                    }
                });
            });
        };
        BookingsService_1.prototype.findByUser = function (userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { userId: userId, deletedAt: null };
                    if (status)
                        where.status = status;
                    return [2 /*return*/, this.prisma.booking.findMany({
                            where: where,
                            orderBy: { scheduledStart: 'desc' },
                            include: {
                                service: { select: { id: true, name: true, images: true, durationMinutes: true } },
                                merchant: { select: { id: true, name: true, logoUrl: true, address: true } },
                                slot: true,
                                payment: true,
                                qrCheckin: true,
                            },
                        })];
                });
            });
        };
        return BookingsService_1;
    }());
    __setFunctionName(_classThis, "BookingsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingsService = _classThis;
}();
exports.BookingsService = BookingsService;
