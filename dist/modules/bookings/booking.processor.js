"use strict";
// ============================================================
// Booking Queue Processor — Handles async booking tasks
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
var BookingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
let BookingProcessor = BookingProcessor_1 = class BookingProcessor extends bullmq_1.WorkerHost {
    constructor(bookingsService) {
        super();
        this.bookingsService = bookingsService;
        this.logger = new common_1.Logger(BookingProcessor_1.name);
    }
    async process(job) {
        this.logger.log(`Processing job: ${job.name} [${job.id}]`);
        switch (job.name) {
            case 'check-booking-expiry':
                await this.handleBookingExpiry(job.data);
                break;
            case 'send-confirmation':
                await this.handleConfirmation(job.data);
                break;
            case 'process-refund':
                await this.handleRefund(job.data);
                break;
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }
    async handleBookingExpiry(data) {
        try {
            await this.bookingsService.expireBookingHold(data.bookingId, data.slotId, data.attendeeCount);
            this.logger.log(`Booking expiry checked: ${data.bookingId}`);
        }
        catch (error) {
            this.logger.error(`Error checking booking expiry: ${error.message}`);
            throw error;
        }
    }
    async handleConfirmation(data) {
        // TODO: Send confirmation email/notification
        this.logger.log(`Confirmation sent for: ${data.bookingReference}`);
    }
    async handleRefund(data) {
        // TODO: Process refund via payment provider
        this.logger.log(`Refund queued for booking: ${data.bookingId}`);
    }
};
exports.BookingProcessor = BookingProcessor;
exports.BookingProcessor = BookingProcessor = BookingProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('booking-queue'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingProcessor);
