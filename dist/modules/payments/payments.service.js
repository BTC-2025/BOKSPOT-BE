"use strict";
// ============================================================
// Payment Service — Abstraction layer for payment providers
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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const razorpay_provider_1 = require("./providers/razorpay.provider");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(prisma, razorpay) {
        this.prisma = prisma;
        this.razorpay = razorpay;
        this.logger = new common_1.Logger(PaymentsService_1.name);
    }
    /**
     * Create a payment order
     */
    async createOrder(bookingId, userId, amount, currency = 'INR', provider = 'RAZORPAY') {
        // Create order via provider
        let providerOrder;
        switch (provider) {
            case 'RAZORPAY':
                providerOrder = await this.razorpay.createOrder(amount, currency, bookingId);
                break;
            case 'STRIPE':
                // Future: Stripe integration
                throw new common_1.BadRequestException('Stripe integration coming soon');
            default:
                throw new common_1.BadRequestException(`Unknown payment provider: ${provider}`);
        }
        // Create payment record
        const payment = await this.prisma.payment.create({
            data: {
                bookingId,
                userId,
                amount,
                currency,
                provider: provider,
                providerOrderId: providerOrder.id,
                status: 'PENDING',
            },
        });
        this.logger.log(`Payment order created: ${payment.id} via ${provider}`);
        return {
            orderId: providerOrder.id,
            amount: providerOrder.amount,
            currency: providerOrder.currency,
            provider,
            metadata: { paymentId: payment.id },
        };
    }
    /**
     * Verify payment webhook
     */
    async verifyPayment(provider, payload, signature) {
        switch (provider) {
            case 'RAZORPAY':
                return this.razorpay.verifyWebhook(payload, signature);
            default:
                throw new common_1.BadRequestException(`Unknown provider: ${provider}`);
        }
    }
    /**
     * Handle successful payment
     */
    async handlePaymentSuccess(providerPaymentId, providerOrderId) {
        const payment = await this.prisma.payment.findFirst({
            where: { providerOrderId },
        });
        if (!payment) {
            this.logger.error(`Payment not found for order: ${providerOrderId}`);
            return;
        }
        await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: 'COMPLETED',
                providerPaymentId,
                paidAt: new Date(),
            },
        });
        this.logger.log(`Payment completed: ${payment.id}`);
        return payment;
    }
    /**
     * Process refund
     */
    async refund(paymentId, amount) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
        });
        if (!payment)
            throw new common_1.BadRequestException('Payment not found');
        if (payment.status !== 'COMPLETED') {
            throw new common_1.BadRequestException('Can only refund completed payments');
        }
        const refundAmount = amount || Number(payment.amount);
        switch (payment.provider) {
            case 'RAZORPAY':
                await this.razorpay.refund(payment.providerPaymentId, refundAmount);
                break;
        }
        await this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: amount && amount < Number(payment.amount) ? 'PARTIALLY_REFUNDED' : 'REFUNDED',
                refundAmount,
                refundedAt: new Date(),
            },
        });
        this.logger.log(`Refund processed: ${paymentId} for ${refundAmount}`);
    }
    async getPaymentByBooking(bookingId) {
        return this.prisma.payment.findUnique({ where: { bookingId } });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        razorpay_provider_1.RazorpayProvider])
], PaymentsService);
