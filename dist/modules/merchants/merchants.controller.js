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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const merchants_service_1 = require("./merchants.service");
const create_merchant_dto_1 = require("./dto/create-merchant.dto");
const update_merchant_dto_1 = require("./dto/update-merchant.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let MerchantsController = class MerchantsController {
    constructor(merchantsService) {
        this.merchantsService = merchantsService;
    }
    async create(user, dto) {
        return this.merchantsService.create(user.sub, dto);
    }
    async findAll(pagination, city) {
        return this.merchantsService.findAll(pagination, city);
    }
    async getDashboard(merchantId) {
        return this.merchantsService.getMerchantDashboard(merchantId);
    }
    async findBySlug(slug) {
        return this.merchantsService.findBySlug(slug);
    }
    async findById(id) {
        return this.merchantsService.findById(id);
    }
    async update(id, dto) {
        return this.merchantsService.update(id, 'bypass', dto);
    }
};
exports.MerchantsController = MerchantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a merchant' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_merchant_dto_1.CreateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all merchants' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dashboard/:merchantId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchant dashboard data' }),
    __param(0, (0, common_1.Param)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchant by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchant by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, public_decorator_1.Public)() // Temporary for prototyping without auth
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Update merchant' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merchant_dto_1.UpdateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "update", null);
exports.MerchantsController = MerchantsController = __decorate([
    (0, swagger_1.ApiTags)('merchants'),
    (0, common_1.Controller)('merchants'),
    __metadata("design:paramtypes", [merchants_service_1.MerchantsService])
], MerchantsController);
