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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let ServicesService = class ServicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(merchantId, dto) {
        try {
            return await this.prisma.service.create({
                data: {
                    ...dto,
                    merchantId,
                    slug: this.generateSlug(dto.name),
                },
            });
        }
        catch (e) {
            console.error('Prisma Create Error:', e);
            throw new (require('@nestjs/common').InternalServerErrorException)(e.message || 'Error creating service');
        }
    }
    async findAll(pagination, filters) {
        const where = {
            isActive: true,
            deletedAt: null,
        };
        if (filters?.categoryId)
            where.categoryId = filters.categoryId;
        if (filters?.serviceType)
            where.serviceType = filters.serviceType;
        if (filters?.merchantId)
            where.merchantId = filters.merchantId;
        if (filters?.isFeatured)
            where.isFeatured = true;
        if (filters?.categorySlug) {
            where.category = {
                slug: filters.categorySlug,
            };
        }
        if (filters?.city) {
            where.merchant = {
                city: { contains: filters.city, mode: 'insensitive' },
            };
        }
        if (filters?.latitude !== undefined && filters?.longitude !== undefined) {
            const radiusKm = filters.radius || 25;
            const lat = filters.latitude;
            const lng = filters.longitude;
            // Raw SQL query to find nearby merchant IDs using Haversine formula
            const nearbyMerchants = await this.prisma.$queryRaw `
        SELECT id FROM (
          SELECT id, (
            6371 * acos(
              cos(radians(${lat})) *
              cos(radians(latitude)) *
              cos(radians(longitude) - radians(${lng})) +
              sin(radians(${lat})) *
              sin(radians(latitude))
            )
          ) AS distance_km
          FROM merchants
          WHERE is_active = true AND deleted_at IS NULL
        ) sub
        WHERE distance_km <= ${radiusKm}
      `;
            const merchantIds = nearbyMerchants.map((m) => m.id);
            // If we found nearby merchants, filter by them, otherwise force empty result by passing dummy UUID or empty in list if Prisma allows,
            // or we can use empty array if Prisma supports it (in Prisma, { in: [] } returns empty list correctly).
            where.merchantId = { in: merchantIds };
        }
        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
                { tags: { has: filters.search.toLowerCase() } },
            ];
        }
        if (filters?.minPrice || filters?.maxPrice) {
            where.basePrice = {};
            if (filters?.minPrice)
                where.basePrice.gte = filters.minPrice;
            if (filters?.maxPrice)
                where.basePrice.lte = filters.maxPrice;
        }
        const [data, total] = await Promise.all([
            this.prisma.service.findMany({
                where,
                skip: pagination.skip,
                take: pagination.take,
                orderBy: { [pagination.sortBy || 'createdAt']: pagination.sortOrder || 'desc' },
                include: {
                    merchant: {
                        select: { id: true, name: true, slug: true, logoUrl: true, city: true, rating: true, latitude: true, longitude: true },
                    },
                    category: true,
                    _count: { select: { bookings: true, reviews: true } },
                },
            }),
            this.prisma.service.count({ where }),
        ]);
        return (0, pagination_dto_1.createPaginatedResponse)(data, total, pagination);
    }
    async findById(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.NotFoundException('Service not found');
        }
        const service = await this.prisma.service.findUnique({
            where: { id, deletedAt: null },
            include: {
                merchant: true,
                category: true,
                availabilityRules: { where: { isActive: true } },
                reviews: {
                    take: 20,
                    orderBy: { createdAt: 'desc' },
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
                _count: { select: { bookings: true, reviews: true, favorites: true } },
            },
        });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        return service;
    }
    async findBySlug(merchantId, slug) {
        const service = await this.prisma.service.findUnique({
            where: { merchantId_slug: { merchantId, slug }, deletedAt: null },
            include: {
                merchant: true,
                category: true,
                availabilityRules: { where: { isActive: true } },
                reviews: {
                    take: 20,
                    orderBy: { createdAt: 'desc' },
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
                _count: { select: { bookings: true, reviews: true, favorites: true } },
            },
        });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        return service;
    }
    async update(id, dto) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.NotFoundException('Service not found (Invalid ID)');
        }
        return this.prisma.service.update({
            where: { id },
            data: dto,
        });
    }
    async softDelete(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.NotFoundException('Service not found (Invalid ID)');
        }
        return this.prisma.service.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
    async getCategories() {
        return this.prisma.serviceCategory.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: { _count: { select: { services: true } } },
        });
    }
    async getFeatured(limit = 12) {
        return this.prisma.service.findMany({
            where: { isActive: true, isFeatured: true, deletedAt: null },
            take: limit,
            orderBy: { rating: 'desc' },
            include: {
                merchant: {
                    select: { id: true, name: true, slug: true, logoUrl: true, city: true },
                },
                category: true,
            },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
