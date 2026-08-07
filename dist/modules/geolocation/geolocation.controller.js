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
exports.GeolocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const geolocation_service_1 = require("./geolocation.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let GeolocationController = class GeolocationController {
    constructor(geoService) {
        this.geoService = geoService;
    }
    async findNearby(lat, lng, radius, limit, offset) {
        return this.geoService.findNearby(lat, lng, radius, limit, offset);
    }
    async getMerchantsInBounds(swLat, swLng, neLat, neLng, limit) {
        return this.geoService.getMerchantsInBounds(swLat, swLng, neLat, neLng, limit);
    }
};
exports.GeolocationController = GeolocationController;
__decorate([
    (0, common_1.Get)('nearby'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find nearby merchants' }),
    (0, swagger_1.ApiQuery)({ name: 'lat', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'lng', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'radius', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __param(2, (0, common_1.Query)('radius')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "findNearby", null);
__decorate([
    (0, common_1.Get)('bounds'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchants in map bounds' }),
    __param(0, (0, common_1.Query)('swLat')),
    __param(1, (0, common_1.Query)('swLng')),
    __param(2, (0, common_1.Query)('neLat')),
    __param(3, (0, common_1.Query)('neLng')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "getMerchantsInBounds", null);
exports.GeolocationController = GeolocationController = __decorate([
    (0, swagger_1.ApiTags)('geolocation'),
    (0, common_1.Controller)('geo'),
    __metadata("design:paramtypes", [geolocation_service_1.GeolocationService])
], GeolocationController);
