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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    /**
     * Sync user from external auth token payload
     * Creates or updates user record on first API call
     */
    async syncUser(externalAuthId, email, name) {
        const user = await this.prisma.user.upsert({
            where: { externalAuthId },
            update: { email, name, updatedAt: new Date() },
            create: { externalAuthId, email, name },
        });
        this.logger.debug(`User synced: ${user.id} (${email})`);
        return user;
    }
    /**
     * Get internal user by external auth ID
     */
    async getUserByAuthId(externalAuthId) {
        return this.prisma.user.findUnique({
            where: { externalAuthId, deletedAt: null },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
