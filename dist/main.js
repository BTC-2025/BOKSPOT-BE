"use strict";
// ============================================================
// BETA Universal Booking Platform — Application Entry Point
// ============================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const express_1 = require("express");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 4000);
    const corsOrigins = configService.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001,http://localhost:4000,http://localhost:4001,https://bokspot-fe.vercel.app,https://bokspot-bus-fe.vercel.app');
    // Security
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    // CORS
    app.enableCors({
        origin: corsOrigins.split(',').map((o) => o.trim()),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    // Global prefix
    app.setGlobalPrefix('api');
    // Versioning
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    // Global pipes
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    // Global filters & interceptors
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
    // Swagger
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('BETA Universal Booking Platform API')
        .setDescription('Production-grade booking ecosystem API documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication integration')
        .addTag('users', 'User management')
        .addTag('merchants', 'Merchant management')
        .addTag('services', 'Service management')
        .addTag('availability', 'Availability & slots')
        .addTag('bookings', 'Booking engine')
        .addTag('payments', 'Payment processing')
        .addTag('qr', 'QR check-in system')
        .addTag('notifications', 'Notification system')
        .addTag('analytics', 'Analytics & reporting')
        .addTag('geolocation', 'Geo-search & maps')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(port);
    console.log(`🚀 BETA Booking API running on http://localhost:${port}`);
    console.log(`📚 Swagger docs at http://localhost:${port}/docs`);
}
bootstrap();
// Trigger restart 4
