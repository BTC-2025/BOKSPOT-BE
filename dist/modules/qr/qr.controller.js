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
exports.QRController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const qr_service_1 = require("./qr.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let QRController = class QRController {
    constructor(qrService) {
        this.qrService = qrService;
    }
    async generate(bookingId) {
        return this.qrService.generateQR(bookingId);
    }
    async checkin(user, body) {
        return this.qrService.validateAndCheckin(body.qrToken, user.sub);
    }
    async revoke(bookingId) {
        return this.qrService.revokeQR(bookingId);
    }
};
exports.QRController = QRController;
__decorate([
    (0, common_1.Post)('generate/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate QR code for a booking' }),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QRController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('checkin'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate and check-in via QR code' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QRController.prototype, "checkin", null);
__decorate([
    (0, common_1.Post)('revoke/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke QR code for a booking' }),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QRController.prototype, "revoke", null);
exports.QRController = QRController = __decorate([
    (0, swagger_1.ApiTags)('qr'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('qr'),
    __metadata("design:paramtypes", [qr_service_1.QRService])
], QRController);
