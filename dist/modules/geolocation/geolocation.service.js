"use strict";
// ============================================================
// Geolocation Service — PostGIS-based geospatial search
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
var GeolocationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeolocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let GeolocationService = GeolocationService_1 = class GeolocationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(GeolocationService_1.name);
    }
    /**
     * Find nearby merchants using Haversine formula
     * PostGIS would be more performant at scale, this works for initial setup
     */
    async findNearby(latitude, longitude, radiusKm = 25, limit = 20, offset = 0) {
        // Using raw SQL with Haversine formula for geo-distance
        const merchants = await this.prisma.$queryRaw `
      SELECT * FROM (
        SELECT
          id, name, slug, logo_url, cover_image_url,
          address, city, latitude, longitude,
          rating, review_count,
          (
            6371 * acos(
              cos(radians(${latitude})) *
              cos(radians(latitude)) *
              cos(radians(longitude) - radians(${longitude})) +
              sin(radians(${latitude})) *
              sin(radians(latitude))
            )
          ) AS distance_km
        FROM merchants
        WHERE is_active = true AND deleted_at IS NULL
      ) sub
      WHERE distance_km <= ${radiusKm}
      ORDER BY distance_km ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
        return merchants.map((m) => ({
            ...m,
            distanceKm: Math.round(m.distance_km * 10) / 10,
            logoUrl: m.logo_url,
            coverImageUrl: m.cover_image_url,
            reviewCount: m.review_count,
        }));
    }
    /**
     * Get merchants for map pins in a bounding box
     */
    async getMerchantsInBounds(swLat, swLng, neLat, neLng, limit = 100) {
        return this.prisma.merchant.findMany({
            where: {
                isActive: true,
                deletedAt: null,
                latitude: { gte: swLat, lte: neLat },
                longitude: { gte: swLng, lte: neLng },
            },
            select: {
                id: true,
                name: true,
                slug: true,
                logoUrl: true,
                address: true,
                city: true,
                latitude: true,
                longitude: true,
                rating: true,
                reviewCount: true,
                _count: { select: { services: true } },
            },
            take: limit,
        });
    }
};
exports.GeolocationService = GeolocationService;
exports.GeolocationService = GeolocationService = GeolocationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GeolocationService);
