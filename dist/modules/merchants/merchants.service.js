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
exports.MerchantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let MerchantsService = class MerchantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(ownerId, dto) {
        return this.prisma.merchant.create({
            data: {
                ...dto,
                ownerId,
                slug: this.generateSlug(dto.name),
            },
        });
    }
    async findAll(pagination, city) {
        const where = {
            isActive: true,
            deletedAt: null,
            ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.merchant.findMany({
                where,
                skip: pagination.skip,
                take: pagination.take,
                orderBy: { [pagination.sortBy || 'createdAt']: pagination.sortOrder || 'desc' },
                include: {
                    services: { where: { isActive: true, deletedAt: null }, take: 5 },
                    _count: { select: { services: true, bookings: true, reviews: true } },
                },
            }),
            this.prisma.merchant.count({ where }),
        ]);
        return (0, pagination_dto_1.createPaginatedResponse)(data, total, pagination);
    }
    async findBySlug(slug) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { slug, deletedAt: null },
            include: {
                services: {
                    where: { isActive: true, deletedAt: null },
                    include: { category: true },
                },
                reviews: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
                _count: { select: { services: true, bookings: true, reviews: true } },
            },
        });
        if (!merchant)
            throw new common_1.NotFoundException('Merchant not found');
        return merchant;
    }
    async findById(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const merchant = await this.prisma.merchant.findUnique({
            where: { id, deletedAt: null },
            include: {
                services: { where: { isActive: true, deletedAt: null } },
                staff: true,
                _count: { select: { services: true, bookings: true, reviews: true } },
            },
        });
        if (!merchant)
            throw new common_1.NotFoundException('Merchant not found');
        return merchant;
    }
    async update(id, ownerId, dto) {
        const merchant = await this.findById(id);
        if (merchant.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('Not authorized to update this merchant');
        }
        return this.prisma.merchant.update({
            where: { id },
            data: dto,
        });
    }
    async getMerchantDashboard(merchantId) {
        const [totalBookings, todayBookings, revenue, recentBookings] = await Promise.all([
            this.prisma.booking.count({
                where: { merchantId, deletedAt: null },
            }),
            this.prisma.booking.count({
                where: {
                    merchantId,
                    deletedAt: null,
                    scheduledStart: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lte: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            }),
            this.prisma.payment.aggregate({
                where: {
                    booking: { merchantId },
                    status: 'COMPLETED',
                },
                _sum: { amount: true },
            }),
            this.prisma.booking.findMany({
                where: { merchantId, deletedAt: null },
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true, avatarUrl: true } },
                    service: { select: { name: true } },
                    slot: true,
                },
            }),
        ]);
        return {
            totalBookings,
            todayBookings,
            totalRevenue: revenue._sum.amount || 0,
            recentBookings,
        };
    }
    async addStaff(merchantId, userId, role, name = 'Staff Member') {
        return this.prisma.merchantStaff.create({
            data: {
                merchantId,
                userId,
                name,
                role: role,
            },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            + '-' + Math.random().toString(36).slice(2, 6);
    }
};
exports.MerchantsService = MerchantsService;
exports.MerchantsService = MerchantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MerchantsService);
