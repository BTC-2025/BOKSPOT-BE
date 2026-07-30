"use strict";
// ============================================================
// Availability Service — Slot generation & management
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
exports.AvailabilityService = void 0;
var common_1 = require("@nestjs/common");
var AvailabilityService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AvailabilityService = _classThis = /** @class */ (function () {
        function AvailabilityService_1(prisma, redis) {
            this.prisma = prisma;
            this.redis = redis;
            this.logger = new common_1.Logger(AvailabilityService.name);
        }
        /**
         * Set availability rules for a service
         */
        AvailabilityService_1.prototype.setRules = function (serviceId, rules) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Delete existing rules
                        return [4 /*yield*/, this.prisma.availabilityRule.deleteMany({ where: { serviceId: serviceId } })];
                        case 1:
                            // Delete existing rules
                            _a.sent();
                            // Create new rules
                            return [2 /*return*/, this.prisma.availabilityRule.createMany({
                                    data: rules.map(function (r) { return ({
                                        serviceId: serviceId,
                                        dayOfWeek: r.dayOfWeek,
                                        startTime: r.startTime,
                                        endTime: r.endTime,
                                    }); }),
                                })];
                    }
                });
            });
        };
        /**
         * Get availability rules for a service
         */
        AvailabilityService_1.prototype.getRules = function (serviceId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.availabilityRule.findMany({
                            where: { serviceId: serviceId, isActive: true },
                            orderBy: { dayOfWeek: 'asc' },
                        })];
                });
            });
        };
        /**
         * Generate slots for a service on a given date range
         * Based on availability rules, duration, and buffer time
         */
        AvailabilityService_1.prototype.generateSlots = function (serviceId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var service, slots, dayMap, current, _loop_1, created, _i, slots_1, slot, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.service.findUnique({
                                where: { id: serviceId },
                                include: { availabilityRules: { where: { isActive: true } } },
                            })];
                        case 1:
                            service = _a.sent();
                            if (!service)
                                throw new common_1.NotFoundException('Service not found');
                            slots = [];
                            dayMap = {
                                SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3,
                                THURSDAY: 4, FRIDAY: 5, SATURDAY: 6,
                            };
                            current = new Date(startDate);
                            _loop_1 = function () {
                                var dayOfWeek = current.getDay();
                                var dayRules = service.availabilityRules.filter(function (r) { return dayMap[r.dayOfWeek] === dayOfWeek; });
                                for (var _b = 0, dayRules_1 = dayRules; _b < dayRules_1.length; _b++) {
                                    var rule = dayRules_1[_b];
                                    var _c = rule.startTime.split(':').map(Number), startH = _c[0], startM = _c[1];
                                    var _d = rule.endTime.split(':').map(Number), endH = _d[0], endM = _d[1];
                                    var slotStart = new Date(current);
                                    slotStart.setHours(startH, startM, 0, 0);
                                    var ruleEnd = new Date(current);
                                    ruleEnd.setHours(endH, endM, 0, 0);
                                    while (slotStart < ruleEnd) {
                                        var slotEnd = new Date(slotStart.getTime() + service.durationMinutes * 60 * 1000);
                                        if (slotEnd <= ruleEnd) {
                                            slots.push({
                                                serviceId: serviceId,
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
                            };
                            while (current <= endDate) {
                                _loop_1();
                            }
                            created = 0;
                            _i = 0, slots_1 = slots;
                            _a.label = 2;
                        case 2:
                            if (!(_i < slots_1.length)) return [3 /*break*/, 7];
                            slot = slots_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.prisma.bookingSlot.upsert({
                                    where: {
                                        serviceId_startTime: {
                                            serviceId: slot.serviceId,
                                            startTime: slot.startTime,
                                        },
                                    },
                                    update: {},
                                    create: slot,
                                })];
                        case 4:
                            _a.sent();
                            created++;
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7:
                            this.logger.log("Generated ".concat(created, " slots for service ").concat(serviceId));
                            return [2 /*return*/, { generated: created, total: slots.length }];
                    }
                });
            });
        };
        /**
         * Get available slots for a service on a date
         */
        AvailabilityService_1.prototype.getSlots = function (serviceId, date) {
            return __awaiter(this, void 0, void 0, function () {
                var targetDate;
                return __generator(this, function (_a) {
                    targetDate = new Date(date);
                    return [2 /*return*/, this.prisma.bookingSlot.findMany({
                            where: {
                                serviceId: serviceId,
                                date: targetDate,
                                isBlocked: false,
                                isAvailable: true,
                            },
                            orderBy: { startTime: 'asc' },
                        })];
                });
            });
        };
        /**
         * Block/unblock a specific slot
         */
        AvailabilityService_1.prototype.toggleSlotBlock = function (slotId, isBlocked) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.bookingSlot.update({
                            where: { id: slotId },
                            data: { isBlocked: isBlocked },
                        })];
                });
            });
        };
        /**
         * Block all slots on a date range (e.g., holidays)
         */
        AvailabilityService_1.prototype.blockDateRange = function (serviceId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.bookingSlot.updateMany({
                            where: {
                                serviceId: serviceId,
                                date: { gte: startDate, lte: endDate },
                            },
                            data: { isBlocked: true },
                        })];
                });
            });
        };
        /**
         * Update slot pricing
         */
        AvailabilityService_1.prototype.updateSlotPrice = function (slotId, price) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.bookingSlot.update({
                            where: { id: slotId },
                            data: { price: price },
                        })];
                });
            });
        };
        return AvailabilityService_1;
    }());
    __setFunctionName(_classThis, "AvailabilityService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AvailabilityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AvailabilityService = _classThis;
}();
exports.AvailabilityService = AvailabilityService;
