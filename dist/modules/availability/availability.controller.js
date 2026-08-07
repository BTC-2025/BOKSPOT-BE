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
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const availability_service_1 = require("./availability.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let AvailabilityController = class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    async setRules(serviceId, rules) {
        return this.availabilityService.setRules(serviceId, rules);
    }
    async getRules(serviceId) {
        return this.availabilityService.getRules(serviceId);
    }
    async generateSlots(serviceId, body) {
        return this.availabilityService.generateSlots(serviceId, new Date(body.startDate), new Date(body.endDate));
    }
    async getSlots(serviceId, date) {
        return this.availabilityService.getSlots(serviceId, date);
    }
    async toggleBlock(slotId, body) {
        return this.availabilityService.toggleSlotBlock(slotId, body.isBlocked);
    }
    async updatePrice(slotId, body) {
        return this.availabilityService.updateSlotPrice(slotId, body.price);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, common_1.Post)('rules/:serviceId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Set availability rules for a service' }),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "setRules", null);
__decorate([
    (0, common_1.Get)('rules/:serviceId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get availability rules for a service' }),
    __param(0, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "getRules", null);
__decorate([
    (0, common_1.Post)('generate/:serviceId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Generate slots for a date range' }),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "generateSlots", null);
__decorate([
    (0, common_1.Get)('slots/:serviceId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get available slots for a date' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true }),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "getSlots", null);
__decorate([
    (0, common_1.Patch)('slots/:slotId/block'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle slot block status' }),
    __param(0, (0, common_1.Param)('slotId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "toggleBlock", null);
__decorate([
    (0, common_1.Patch)('slots/:slotId/price'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update slot price' }),
    __param(0, (0, common_1.Param)('slotId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "updatePrice", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, swagger_1.ApiTags)('availability'),
    (0, common_1.Controller)('availability'),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
