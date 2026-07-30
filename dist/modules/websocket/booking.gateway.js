"use strict";
// ============================================================
// WebSocket Gateway — Real-time booking & dashboard updates
// ============================================================
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var BookingGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: { origin: '*', credentials: true },
            namespace: '/ws',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleJoinServiceRoom_decorators;
    var _handleLeaveServiceRoom_decorators;
    var _handleJoinMerchantRoom_decorators;
    var _handleLeaveMerchantRoom_decorators;
    var BookingGateway = _classThis = /** @class */ (function () {
        function BookingGateway_1() {
            this.server = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _server_initializers, void 0));
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(BookingGateway.name));
        }
        BookingGateway_1.prototype.handleConnection = function (client) {
            this.logger.log("Client connected: ".concat(client.id));
        };
        BookingGateway_1.prototype.handleDisconnect = function (client) {
            this.logger.log("Client disconnected: ".concat(client.id));
        };
        BookingGateway_1.prototype.handleJoinServiceRoom = function (client, serviceId) {
            client.join("service:".concat(serviceId));
            this.logger.debug("".concat(client.id, " joined service:").concat(serviceId));
        };
        BookingGateway_1.prototype.handleLeaveServiceRoom = function (client, serviceId) {
            client.leave("service:".concat(serviceId));
        };
        BookingGateway_1.prototype.handleJoinMerchantRoom = function (client, merchantId) {
            client.join("merchant:".concat(merchantId));
        };
        BookingGateway_1.prototype.handleLeaveMerchantRoom = function (client, merchantId) {
            client.leave("merchant:".concat(merchantId));
        };
        // Emit methods for other services to use
        BookingGateway_1.prototype.emitSlotUpdate = function (serviceId, data) {
            this.server.to("service:".concat(serviceId)).emit('slot:updated', data);
        };
        BookingGateway_1.prototype.emitBookingCreated = function (merchantId, data) {
            this.server.to("merchant:".concat(merchantId)).emit('booking:created', data);
        };
        BookingGateway_1.prototype.emitBookingConfirmed = function (merchantId, data) {
            this.server.to("merchant:".concat(merchantId)).emit('booking:confirmed', data);
        };
        BookingGateway_1.prototype.emitDashboardUpdate = function (merchantId, data) {
            this.server.to("merchant:".concat(merchantId)).emit('dashboard:update', data);
        };
        BookingGateway_1.prototype.emitNotification = function (userId, data) {
            this.server.to("user:".concat(userId)).emit('notification:new', data);
        };
        return BookingGateway_1;
    }());
    __setFunctionName(_classThis, "BookingGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleJoinServiceRoom_decorators = [(0, websockets_1.SubscribeMessage)('join:serviceRoom')];
        _handleLeaveServiceRoom_decorators = [(0, websockets_1.SubscribeMessage)('leave:serviceRoom')];
        _handleJoinMerchantRoom_decorators = [(0, websockets_1.SubscribeMessage)('join:merchantRoom')];
        _handleLeaveMerchantRoom_decorators = [(0, websockets_1.SubscribeMessage)('leave:merchantRoom')];
        __esDecorate(_classThis, null, _handleJoinServiceRoom_decorators, { kind: "method", name: "handleJoinServiceRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinServiceRoom" in obj; }, get: function (obj) { return obj.handleJoinServiceRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveServiceRoom_decorators, { kind: "method", name: "handleLeaveServiceRoom", static: false, private: false, access: { has: function (obj) { return "handleLeaveServiceRoom" in obj; }, get: function (obj) { return obj.handleLeaveServiceRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinMerchantRoom_decorators, { kind: "method", name: "handleJoinMerchantRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinMerchantRoom" in obj; }, get: function (obj) { return obj.handleJoinMerchantRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveMerchantRoom_decorators, { kind: "method", name: "handleLeaveMerchantRoom", static: false, private: false, access: { has: function (obj) { return "handleLeaveMerchantRoom" in obj; }, get: function (obj) { return obj.handleLeaveMerchantRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingGateway = _classThis;
}();
exports.BookingGateway = BookingGateway;
