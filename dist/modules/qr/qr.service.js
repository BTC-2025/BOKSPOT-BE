"use strict";
// ============================================================
// QR Check-in Service — Secure QR generation & validation
// ============================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var QRService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const QRCode = __importStar(require("qrcode"));
const crypto = __importStar(require("crypto"));
const QR_EXPIRY_HOURS = 24;
let QRService = QRService_1 = class QRService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(QRService_1.name);
        this.qrSecret = this.configService.get('QR_SECRET', 'default-qr-secret');
    }
    /**
     * Generate a secure QR code for a booking
     */
    async generateQR(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.status !== 'CONFIRMED') {
            throw new common_1.BadRequestException('QR can only be generated for confirmed bookings');
        }
        // Check if QR already exists
        const existing = await this.prisma.qRCheckin.findUnique({
            where: { bookingId },
        });
        if (existing && existing.status === 'ACTIVE') {
            const qrDataUrl = await QRCode.toDataURL(existing.qrToken);
            return { qrToken: existing.qrToken, qrImage: qrDataUrl, expiresAt: existing.expiresAt };
        }
        // Generate secure token
        const tokenData = `${bookingId}:${Date.now()}:${crypto.randomBytes(16).toString('hex')}`;
        const qrToken = crypto
            .createHmac('sha256', this.qrSecret)
            .update(tokenData)
            .digest('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + QR_EXPIRY_HOURS);
        // Create QR record
        const qrCheckin = await this.prisma.qRCheckin.create({
            data: {
                bookingId,
                qrToken,
                expiresAt,
            },
        });
        // Generate QR code image
        const qrDataUrl = await QRCode.toDataURL(qrToken, {
            width: 400,
            margin: 2,
            color: { dark: '#000000', light: '#FFFFFF' },
        });
        this.logger.log(`QR generated for booking: ${bookingId}`);
        return {
            qrToken: qrCheckin.qrToken,
            qrImage: qrDataUrl,
            expiresAt: qrCheckin.expiresAt,
        };
    }
    /**
     * Validate and check-in a QR code
     * Prevents reuse and fake check-ins
     */
    async validateAndCheckin(qrToken, checkedInById) {
        const qrCheckin = await this.prisma.qRCheckin.findUnique({
            where: { qrToken },
            include: {
                booking: {
                    include: {
                        user: { select: { name: true, email: true, avatarUrl: true } },
                        service: { select: { name: true } },
                    },
                },
            },
        });
        if (!qrCheckin) {
            throw new common_1.BadRequestException('Invalid QR code');
        }
        // Prevent reuse
        if (qrCheckin.status === 'USED') {
            throw new common_1.BadRequestException('QR code has already been used');
        }
        // Check expiry
        if (qrCheckin.status === 'EXPIRED' || new Date() > qrCheckin.expiresAt) {
            await this.prisma.qRCheckin.update({
                where: { id: qrCheckin.id },
                data: { status: 'EXPIRED' },
            });
            throw new common_1.BadRequestException('QR code has expired');
        }
        // Check revocation
        if (qrCheckin.status === 'REVOKED') {
            throw new common_1.BadRequestException('QR code has been revoked');
        }
        // Validate booking status
        if (qrCheckin.booking.status !== 'CONFIRMED') {
            throw new common_1.BadRequestException(`Cannot check-in: booking is ${qrCheckin.booking.status}`);
        }
        // Perform check-in
        await this.prisma.$transaction([
            this.prisma.qRCheckin.update({
                where: { id: qrCheckin.id },
                data: {
                    status: 'USED',
                    checkedInAt: new Date(),
                    checkedInById,
                },
            }),
            this.prisma.booking.update({
                where: { id: qrCheckin.bookingId },
                data: { status: 'CHECKED_IN' },
            }),
        ]);
        this.logger.log(`Check-in successful for booking: ${qrCheckin.bookingId}`);
        return {
            success: true,
            booking: qrCheckin.booking,
            checkedInAt: new Date(),
        };
    }
    /**
     * Revoke a QR code
     */
    async revokeQR(bookingId) {
        return this.prisma.qRCheckin.updateMany({
            where: { bookingId, status: 'ACTIVE' },
            data: { status: 'REVOKED' },
        });
    }
};
exports.QRService = QRService;
exports.QRService = QRService = QRService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], QRService);
