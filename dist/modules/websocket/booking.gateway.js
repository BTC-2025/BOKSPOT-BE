"use strict";
// ============================================================
// WebSocket Gateway — Real-time booking & dashboard updates
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BookingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let BookingGateway = BookingGateway_1 = class BookingGateway {
    constructor() {
        this.logger = new common_1.Logger(BookingGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinServiceRoom(client, serviceId) {
        client.join(`service:${serviceId}`);
        this.logger.debug(`${client.id} joined service:${serviceId}`);
    }
    handleLeaveServiceRoom(client, serviceId) {
        client.leave(`service:${serviceId}`);
    }
    handleJoinMerchantRoom(client, merchantId) {
        client.join(`merchant:${merchantId}`);
    }
    handleLeaveMerchantRoom(client, merchantId) {
        client.leave(`merchant:${merchantId}`);
    }
    // Emit methods for other services to use
    emitSlotUpdate(serviceId, data) {
        this.server.to(`service:${serviceId}`).emit('slot:updated', data);
    }
    emitBookingCreated(merchantId, data) {
        this.server.to(`merchant:${merchantId}`).emit('booking:created', data);
    }
    emitBookingConfirmed(merchantId, data) {
        this.server.to(`merchant:${merchantId}`).emit('booking:confirmed', data);
    }
    emitDashboardUpdate(merchantId, data) {
        this.server.to(`merchant:${merchantId}`).emit('dashboard:update', data);
    }
    emitNotification(userId, data) {
        this.server.to(`user:${userId}`).emit('notification:new', data);
    }
};
exports.BookingGateway = BookingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BookingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join:serviceRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleJoinServiceRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave:serviceRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleLeaveServiceRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join:merchantRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleJoinMerchantRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave:merchantRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleLeaveMerchantRoom", null);
exports.BookingGateway = BookingGateway = BookingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*', credentials: true },
        namespace: '/ws',
    })
], BookingGateway);
