// ============================================================
// Razorpay Payment Provider
// ============================================================

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class RazorpayProvider {
  private readonly logger = new Logger(RazorpayProvider.name);
  private client: Razorpay;
  private webhookSecret: string;

  constructor(private configService: ConfigService) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID') || 'fallback_key_id';
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET') || 'fallback_key_secret';

    try {
      this.client = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    } catch (e) {
      this.logger.error('Failed to initialize Razorpay Client', e);
    }
    this.webhookSecret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET', '');
  }

  async createOrder(amount: number, currency: string, bookingId: string) {
    const order = await this.client.orders.create({
      amount: Math.round(amount * 100), // Razorpay uses paise
      currency,
      receipt: bookingId,
      notes: { bookingId },
    });

    return {
      id: order.id,
      amount: order.amount as number,
      currency: order.currency,
    };
  }

  verifyWebhook(payload: Record<string, any>, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  }

  async refund(paymentId: string, amount: number) {
    return this.client.payments.refund(paymentId, {
      amount: Math.round(amount * 100),
    });
  }

  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.configService.get<string>('RAZORPAY_KEY_SECRET', ''))
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  }
}
