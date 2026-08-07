"use strict";
// ============================================================
// Root Application Module
// ============================================================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const schedule_1 = require("@nestjs/schedule");
const bullmq_1 = require("@nestjs/bullmq");
// Core modules
const prisma_module_1 = require("./common/prisma/prisma.module");
const redis_module_1 = require("./common/redis/redis.module");
const supabase_module_1 = require("./common/supabase/supabase.module");
// Feature modules
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const merchants_module_1 = require("./modules/merchants/merchants.module");
const services_module_1 = require("./modules/services/services.module");
const availability_module_1 = require("./modules/availability/availability.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const payments_module_1 = require("./modules/payments/payments.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const qr_module_1 = require("./modules/qr/qr.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const geolocation_module_1 = require("./modules/geolocation/geolocation.module");
const websocket_module_1 = require("./modules/websocket/websocket.module");
const booking_types_module_1 = require("./modules/booking-types/booking-types.module");
const tickets_module_1 = require("./modules/tickets/tickets.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Configuration
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            // Rate limiting
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            // Scheduled tasks
            schedule_1.ScheduleModule.forRoot(),
            // BullMQ job queues
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379', 10),
                    password: process.env.REDIS_PASSWORD || undefined,
                },
            }),
            // Core
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            supabase_module_1.SupabaseModule,
            // Features
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            merchants_module_1.MerchantsModule,
            services_module_1.ServicesModule,
            availability_module_1.AvailabilityModule,
            bookings_module_1.BookingsModule,
            payments_module_1.PaymentsModule,
            notifications_module_1.NotificationsModule,
            qr_module_1.QRModule,
            analytics_module_1.AnalyticsModule,
            geolocation_module_1.GeolocationModule,
            websocket_module_1.WebsocketModule,
            booking_types_module_1.BookingTypesModule,
            tickets_module_1.TicketsModule,
        ],
    })
], AppModule);
