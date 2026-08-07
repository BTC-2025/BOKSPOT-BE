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
exports.BookingTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let BookingTypesService = class BookingTypesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(featuredOnly = false) {
        return this.prisma.bookingType.findMany({
            where: {
                isActive: true,
                ...(featuredOnly ? { isFeatured: true } : {}),
            },
            orderBy: { sortOrder: 'asc' },
            include: {
                _count: { select: { categories: true, merchants: true } },
            },
        });
    }
    async findBySlug(slug) {
        const bookingType = await this.prisma.bookingType.findUnique({
            where: { slug, isActive: true },
            include: {
                categories: {
                    where: { isActive: true, parentId: null },
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        _count: { select: { services: true } },
                        children: {
                            where: { isActive: true },
                            orderBy: { sortOrder: 'asc' },
                        },
                    },
                },
                _count: { select: { merchants: true } },
            },
        });
        if (!bookingType)
            throw new common_1.NotFoundException(`Booking type '${slug}' not found`);
        return bookingType;
    }
};
exports.BookingTypesService = BookingTypesService;
exports.BookingTypesService = BookingTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingTypesService);
