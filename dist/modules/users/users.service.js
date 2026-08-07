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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id, deletedAt: null },
            include: {
                bookings: { take: 5, orderBy: { createdAt: 'desc' } },
                favorites: { include: { service: true } },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByAuthId(externalAuthId) {
        return this.prisma.user.findUnique({
            where: { externalAuthId, deletedAt: null },
        });
    }
    async update(id, dto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }
    async softDelete(id) {
        return this.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
    async getUserBookings(userId, status) {
        return this.prisma.booking.findMany({
            where: {
                userId,
                deletedAt: null,
                ...(status ? { status: status } : {}),
            },
            include: {
                service: { select: { id: true, name: true, images: true, durationMinutes: true } },
                merchant: { select: { id: true, name: true, logoUrl: true } },
                slot: true,
                qrCheckin: true,
            },
            orderBy: { scheduledStart: 'desc' },
        });
    }
    async getUserFavorites(userId) {
        return this.prisma.favorite.findMany({
            where: { userId },
            include: {
                service: {
                    include: {
                        merchant: { select: { id: true, name: true, logoUrl: true, city: true } },
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async toggleFavorite(userId, serviceId) {
        const existing = await this.prisma.favorite.findUnique({
            where: { userId_serviceId: { userId, serviceId } },
        });
        if (existing) {
            await this.prisma.favorite.delete({ where: { id: existing.id } });
            return { favorited: false };
        }
        await this.prisma.favorite.create({ data: { userId, serviceId } });
        return { favorited: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
