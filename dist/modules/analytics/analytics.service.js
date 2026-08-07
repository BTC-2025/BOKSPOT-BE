"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMerchantAnalytics(merchantId, startDate, endDate) {
        const dateFilter = {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
        };
        const [totalBookings, confirmedBookings, cancelledBookings, completedBookings, revenue, bookingsByDay, topServices, revenueByMonth,] = await Promise.all([
            this.prisma.booking.count({
                where: { merchantId, deletedAt: null, ...(startDate ? { createdAt: dateFilter } : {}) },
            }),
            this.prisma.booking.count({
                where: { merchantId, status: 'CONFIRMED', deletedAt: null },
            }),
            this.prisma.booking.count({
                where: { merchantId, status: 'CANCELLED', deletedAt: null },
            }),
            this.prisma.booking.count({
                where: { merchantId, status: 'COMPLETED', deletedAt: null },
            }),
            this.prisma.payment.aggregate({
                where: { booking: { merchantId }, status: 'COMPLETED' },
                _sum: { amount: true },
            }),
            this.prisma.booking.groupBy({
                by: ['bookedAt'],
                where: { merchantId, deletedAt: null },
                _count: true,
                orderBy: { bookedAt: 'desc' },
                take: 30,
            }),
            this.prisma.booking.groupBy({
                by: ['serviceId'],
                where: { merchantId, deletedAt: null },
                _count: true,
                orderBy: { _count: { serviceId: 'desc' } },
                take: 10,
            }),
            this.prisma.payment.groupBy({
                by: ['createdAt'],
                where: { booking: { merchantId }, status: 'COMPLETED' },
                _sum: { amount: true },
                orderBy: { createdAt: 'desc' },
                take: 12,
            }),
        ]);
        return {
            overview: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                completedBookings,
                totalRevenue: revenue._sum.amount || 0,
                conversionRate: totalBookings > 0
                    ? ((confirmedBookings + completedBookings) / totalBookings * 100).toFixed(1)
                    : 0,
            },
            bookingsByDay,
            topServices,
            revenueByMonth,
        };
    }
    async getGlobalStats() {
        const [totalUsers, totalMerchants, totalBookings, totalRevenue] = await Promise.all([
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.merchant.count({ where: { isActive: true } }),
            this.prisma.booking.count({ where: { deletedAt: null } }),
            this.prisma.payment.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true },
            }),
        ]);
        return {
            totalUsers,
            totalMerchants,
            totalBookings,
            totalRevenue: totalRevenue._sum.amount || 0,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
