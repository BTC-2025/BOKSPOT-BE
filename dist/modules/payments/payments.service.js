"use strict";
// ============================================================
// Payment Service — Abstraction layer for payment providers
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
exports.PaymentsService = void 0;
var common_1 = require("@nestjs/common");
var PaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentsService = _classThis = /** @class */ (function () {
        function PaymentsService_1(prisma, razorpay) {
            this.prisma = prisma;
            this.razorpay = razorpay;
            this.logger = new common_1.Logger(PaymentsService.name);
        }
        /**
         * Create a payment order
         */
        PaymentsService_1.prototype.createOrder = function (bookingId_1, userId_1, amount_1) {
            return __awaiter(this, arguments, void 0, function (bookingId, userId, amount, currency, provider) {
                var providerOrder, _a, payment;
                if (currency === void 0) { currency = 'INR'; }
                if (provider === void 0) { provider = 'RAZORPAY'; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = provider;
                            switch (_a) {
                                case 'RAZORPAY': return [3 /*break*/, 1];
                                case 'STRIPE': return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, this.razorpay.createOrder(amount, currency, bookingId)];
                        case 2:
                            providerOrder = _b.sent();
                            return [3 /*break*/, 5];
                        case 3: 
                        // Future: Stripe integration
                        throw new common_1.BadRequestException('Stripe integration coming soon');
                        case 4: throw new common_1.BadRequestException("Unknown payment provider: ".concat(provider));
                        case 5: return [4 /*yield*/, this.prisma.payment.create({
                                data: {
                                    bookingId: bookingId,
                                    userId: userId,
                                    amount: amount,
                                    currency: currency,
                                    provider: provider,
                                    providerOrderId: providerOrder.id,
                                    status: 'PENDING',
                                },
                            })];
                        case 6:
                            payment = _b.sent();
                            this.logger.log("Payment order created: ".concat(payment.id, " via ").concat(provider));
                            return [2 /*return*/, {
                                    orderId: providerOrder.id,
                                    amount: providerOrder.amount,
                                    currency: providerOrder.currency,
                                    provider: provider,
                                    metadata: { paymentId: payment.id },
                                }];
                    }
                });
            });
        };
        /**
         * Verify payment webhook
         */
        PaymentsService_1.prototype.verifyPayment = function (provider, payload, signature) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (provider) {
                        case 'RAZORPAY':
                            return [2 /*return*/, this.razorpay.verifyWebhook(payload, signature)];
                        default:
                            throw new common_1.BadRequestException("Unknown provider: ".concat(provider));
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Handle successful payment
         */
        PaymentsService_1.prototype.handlePaymentSuccess = function (providerPaymentId, providerOrderId) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.findFirst({
                                where: { providerOrderId: providerOrderId },
                            })];
                        case 1:
                            payment = _a.sent();
                            if (!payment) {
                                this.logger.error("Payment not found for order: ".concat(providerOrderId));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.prisma.payment.update({
                                    where: { id: payment.id },
                                    data: {
                                        status: 'COMPLETED',
                                        providerPaymentId: providerPaymentId,
                                        paidAt: new Date(),
                                    },
                                })];
                        case 2:
                            _a.sent();
                            this.logger.log("Payment completed: ".concat(payment.id));
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        /**
         * Process refund
         */
        PaymentsService_1.prototype.refund = function (paymentId, amount) {
            return __awaiter(this, void 0, void 0, function () {
                var payment, refundAmount, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.findUnique({
                                where: { id: paymentId },
                            })];
                        case 1:
                            payment = _b.sent();
                            if (!payment)
                                throw new common_1.BadRequestException('Payment not found');
                            if (payment.status !== 'COMPLETED') {
                                throw new common_1.BadRequestException('Can only refund completed payments');
                            }
                            refundAmount = amount || Number(payment.amount);
                            _a = payment.provider;
                            switch (_a) {
                                case 'RAZORPAY': return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.razorpay.refund(payment.providerPaymentId, refundAmount)];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, this.prisma.payment.update({
                                where: { id: paymentId },
                                data: {
                                    status: amount && amount < Number(payment.amount) ? 'PARTIALLY_REFUNDED' : 'REFUNDED',
                                    refundAmount: refundAmount,
                                    refundedAt: new Date(),
                                },
                            })];
                        case 5:
                            _b.sent();
                            this.logger.log("Refund processed: ".concat(paymentId, " for ").concat(refundAmount));
                            return [2 /*return*/];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getPaymentByBooking = function (bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.payment.findUnique({ where: { bookingId: bookingId } })];
                });
            });
        };
        return PaymentsService_1;
    }());
    __setFunctionName(_classThis, "PaymentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsService = _classThis;
}();
exports.PaymentsService = PaymentsService;
