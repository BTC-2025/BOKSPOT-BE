"use strict";
// ============================================================
// QR Check-in Service — Secure QR generation & validation
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
exports.QRService = void 0;
var common_1 = require("@nestjs/common");
var QRCode = require("qrcode");
var crypto = require("crypto");
var QR_EXPIRY_HOURS = 24;
var QRService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var QRService = _classThis = /** @class */ (function () {
        function QRService_1(prisma, configService) {
            this.prisma = prisma;
            this.configService = configService;
            this.logger = new common_1.Logger(QRService.name);
            this.qrSecret = this.configService.get('QR_SECRET', 'default-qr-secret');
        }
        /**
         * Generate a secure QR code for a booking
         */
        QRService_1.prototype.generateQR = function (bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, existing, qrDataUrl_1, tokenData, qrToken, expiresAt, qrCheckin, qrDataUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking)
                                throw new common_1.NotFoundException('Booking not found');
                            if (booking.status !== 'CONFIRMED') {
                                throw new common_1.BadRequestException('QR can only be generated for confirmed bookings');
                            }
                            return [4 /*yield*/, this.prisma.qRCheckin.findUnique({
                                    where: { bookingId: bookingId },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (!(existing && existing.status === 'ACTIVE')) return [3 /*break*/, 4];
                            return [4 /*yield*/, QRCode.toDataURL(existing.qrToken)];
                        case 3:
                            qrDataUrl_1 = _a.sent();
                            return [2 /*return*/, { qrToken: existing.qrToken, qrImage: qrDataUrl_1, expiresAt: existing.expiresAt }];
                        case 4:
                            tokenData = "".concat(bookingId, ":").concat(Date.now(), ":").concat(crypto.randomBytes(16).toString('hex'));
                            qrToken = crypto
                                .createHmac('sha256', this.qrSecret)
                                .update(tokenData)
                                .digest('hex');
                            expiresAt = new Date();
                            expiresAt.setHours(expiresAt.getHours() + QR_EXPIRY_HOURS);
                            return [4 /*yield*/, this.prisma.qRCheckin.create({
                                    data: {
                                        bookingId: bookingId,
                                        qrToken: qrToken,
                                        expiresAt: expiresAt,
                                    },
                                })];
                        case 5:
                            qrCheckin = _a.sent();
                            return [4 /*yield*/, QRCode.toDataURL(qrToken, {
                                    width: 400,
                                    margin: 2,
                                    color: { dark: '#000000', light: '#FFFFFF' },
                                })];
                        case 6:
                            qrDataUrl = _a.sent();
                            this.logger.log("QR generated for booking: ".concat(bookingId));
                            return [2 /*return*/, {
                                    qrToken: qrCheckin.qrToken,
                                    qrImage: qrDataUrl,
                                    expiresAt: qrCheckin.expiresAt,
                                }];
                    }
                });
            });
        };
        /**
         * Validate and check-in a QR code
         * Prevents reuse and fake check-ins
         */
        QRService_1.prototype.validateAndCheckin = function (qrToken, checkedInById) {
            return __awaiter(this, void 0, void 0, function () {
                var qrCheckin;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.qRCheckin.findUnique({
                                where: { qrToken: qrToken },
                                include: {
                                    booking: {
                                        include: {
                                            user: { select: { name: true, email: true, avatarUrl: true } },
                                            service: { select: { name: true } },
                                        },
                                    },
                                },
                            })];
                        case 1:
                            qrCheckin = _a.sent();
                            if (!qrCheckin) {
                                throw new common_1.BadRequestException('Invalid QR code');
                            }
                            // Prevent reuse
                            if (qrCheckin.status === 'USED') {
                                throw new common_1.BadRequestException('QR code has already been used');
                            }
                            if (!(qrCheckin.status === 'EXPIRED' || new Date() > qrCheckin.expiresAt)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.qRCheckin.update({
                                    where: { id: qrCheckin.id },
                                    data: { status: 'EXPIRED' },
                                })];
                        case 2:
                            _a.sent();
                            throw new common_1.BadRequestException('QR code has expired');
                        case 3:
                            // Check revocation
                            if (qrCheckin.status === 'REVOKED') {
                                throw new common_1.BadRequestException('QR code has been revoked');
                            }
                            // Validate booking status
                            if (qrCheckin.booking.status !== 'CONFIRMED') {
                                throw new common_1.BadRequestException("Cannot check-in: booking is ".concat(qrCheckin.booking.status));
                            }
                            // Perform check-in
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.qRCheckin.update({
                                        where: { id: qrCheckin.id },
                                        data: {
                                            status: 'USED',
                                            checkedInAt: new Date(),
                                            checkedInById: checkedInById,
                                        },
                                    }),
                                    this.prisma.booking.update({
                                        where: { id: qrCheckin.bookingId },
                                        data: { status: 'CHECKED_IN' },
                                    }),
                                ])];
                        case 4:
                            // Perform check-in
                            _a.sent();
                            this.logger.log("Check-in successful for booking: ".concat(qrCheckin.bookingId));
                            return [2 /*return*/, {
                                    success: true,
                                    booking: qrCheckin.booking,
                                    checkedInAt: new Date(),
                                }];
                    }
                });
            });
        };
        /**
         * Revoke a QR code
         */
        QRService_1.prototype.revokeQR = function (bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.qRCheckin.updateMany({
                            where: { bookingId: bookingId, status: 'ACTIVE' },
                            data: { status: 'REVOKED' },
                        })];
                });
            });
        };
        return QRService_1;
    }());
    __setFunctionName(_classThis, "QRService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QRService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QRService = _classThis;
}();
exports.QRService = QRService;
