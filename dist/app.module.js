"use strict";
// ============================================================
// Root Application Module
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var throttler_1 = require("@nestjs/throttler");
var schedule_1 = require("@nestjs/schedule");
var bullmq_1 = require("@nestjs/bullmq");
// Core modules
var prisma_module_1 = require("./common/prisma/prisma.module");
var redis_module_1 = require("./common/redis/redis.module");
var supabase_module_1 = require("./common/supabase/supabase.module");
// Feature modules
var auth_module_1 = require("./modules/auth/auth.module");
var users_module_1 = require("./modules/users/users.module");
var merchants_module_1 = require("./modules/merchants/merchants.module");
var services_module_1 = require("./modules/services/services.module");
var availability_module_1 = require("./modules/availability/availability.module");
var bookings_module_1 = require("./modules/bookings/bookings.module");
var payments_module_1 = require("./modules/payments/payments.module");
var notifications_module_1 = require("./modules/notifications/notifications.module");
var qr_module_1 = require("./modules/qr/qr.module");
var analytics_module_1 = require("./modules/analytics/analytics.module");
var geolocation_module_1 = require("./modules/geolocation/geolocation.module");
var websocket_module_1 = require("./modules/websocket/websocket.module");
var booking_types_module_1 = require("./modules/booking-types/booking-types.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
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
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
