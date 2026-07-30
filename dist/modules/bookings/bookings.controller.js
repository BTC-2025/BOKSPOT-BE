"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var public_decorator_1 = require("../../common/decorators/public.decorator");
var fs = require("fs");
var path = require("path");
var BookingsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('bookings'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('bookings')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _syncAdd_decorators;
    var _syncList_decorators;
    var _reserve_decorators;
    var _confirm_decorators;
    var _cancel_decorators;
    var _findByReference_decorators;
    var _findByMerchant_decorators;
    var _findByUser_decorators;
    var _findById_decorators;
    var BookingsController = _classThis = /** @class */ (function () {
        function BookingsController_1(bookingsService) {
            this.bookingsService = (__runInitializers(this, _instanceExtraInitializers), bookingsService);
        }
        BookingsController_1.prototype.syncAdd = function (booking) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, bookings, content, index;
                return __generator(this, function (_a) {
                    filePath = path.join(process.cwd(), 'shared-bookings.json');
                    bookings = [];
                    try {
                        if (fs.existsSync(filePath)) {
                            content = fs.readFileSync(filePath, 'utf8');
                            bookings = JSON.parse(content);
                        }
                    }
                    catch (e) {
                        bookings = [];
                    }
                    index = bookings.findIndex(function (b) { return b.ref === booking.ref || b.id === booking.id; });
                    if (index === -1) {
                        bookings.unshift(booking);
                    }
                    else {
                        bookings[index] = __assign(__assign({}, bookings[index]), booking);
                    }
                    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), 'utf8');
                    return [2 /*return*/, { success: true, booking: booking }];
                });
            });
        };
        BookingsController_1.prototype.syncList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, bookings, content;
                return __generator(this, function (_a) {
                    filePath = path.join(process.cwd(), 'shared-bookings.json');
                    bookings = [];
                    try {
                        if (fs.existsSync(filePath)) {
                            content = fs.readFileSync(filePath, 'utf8');
                            bookings = JSON.parse(content);
                        }
                    }
                    catch (e) {
                        bookings = [];
                    }
                    return [2 /*return*/, bookings];
                });
            });
        };
        BookingsController_1.prototype.reserve = function (user, body) {
            return __awaiter(this, void 0, void 0, function () {
                var dbUser;
                return __generator(this, function (_a) {
                    dbUser = user;
                    return [2 /*return*/, this.bookingsService.reserveSlot(user.sub, body.slotId, body.serviceId, body.attendeeCount || 1, body.notes)];
                });
            });
        };
        BookingsController_1.prototype.confirm = function (id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.confirmBooking(id, body.paymentId)];
                });
            });
        };
        BookingsController_1.prototype.cancel = function (id, user, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.cancelBooking(id, user.sub, body.reason)];
                });
            });
        };
        BookingsController_1.prototype.findByReference = function (reference) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.findByReference(reference)];
                });
            });
        };
        BookingsController_1.prototype.findByMerchant = function (merchantId, pagination, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.findByMerchant(merchantId, pagination, status)];
                });
            });
        };
        BookingsController_1.prototype.findByUser = function (user, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.findByUser(user.sub, status)];
                });
            });
        };
        BookingsController_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.bookingsService.findById(id)];
                });
            });
        };
        return BookingsController_1;
    }());
    __setFunctionName(_classThis, "BookingsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _syncAdd_decorators = [(0, common_1.Post)('sync'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Add or update a synchronized booking for demo' })];
        _syncList_decorators = [(0, common_1.Get)('sync'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get all synchronized bookings for demo' })];
        _reserve_decorators = [(0, common_1.Post)('reserve'), (0, swagger_1.ApiOperation)({ summary: 'Reserve a booking slot (Step 1 of booking flow)' })];
        _confirm_decorators = [(0, common_1.Post)(':id/confirm'), (0, swagger_1.ApiOperation)({ summary: 'Confirm booking after payment (Step 2)' })];
        _cancel_decorators = [(0, common_1.Patch)(':id/cancel'), (0, swagger_1.ApiOperation)({ summary: 'Cancel a booking' })];
        _findByReference_decorators = [(0, common_1.Get)('reference/:reference'), (0, swagger_1.ApiOperation)({ summary: 'Get booking by reference' })];
        _findByMerchant_decorators = [(0, common_1.Get)('merchant/:merchantId'), (0, swagger_1.ApiOperation)({ summary: 'Get merchant bookings' }), (0, swagger_1.ApiQuery)({ name: 'status', required: false })];
        _findByUser_decorators = [(0, common_1.Get)('user'), (0, swagger_1.ApiOperation)({ summary: 'Get current user bookings' }), (0, swagger_1.ApiQuery)({ name: 'status', required: false })];
        _findById_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get booking by ID' })];
        __esDecorate(_classThis, null, _syncAdd_decorators, { kind: "method", name: "syncAdd", static: false, private: false, access: { has: function (obj) { return "syncAdd" in obj; }, get: function (obj) { return obj.syncAdd; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _syncList_decorators, { kind: "method", name: "syncList", static: false, private: false, access: { has: function (obj) { return "syncList" in obj; }, get: function (obj) { return obj.syncList; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reserve_decorators, { kind: "method", name: "reserve", static: false, private: false, access: { has: function (obj) { return "reserve" in obj; }, get: function (obj) { return obj.reserve; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirm_decorators, { kind: "method", name: "confirm", static: false, private: false, access: { has: function (obj) { return "confirm" in obj; }, get: function (obj) { return obj.confirm; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: function (obj) { return "cancel" in obj; }, get: function (obj) { return obj.cancel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findByReference_decorators, { kind: "method", name: "findByReference", static: false, private: false, access: { has: function (obj) { return "findByReference" in obj; }, get: function (obj) { return obj.findByReference; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findByMerchant_decorators, { kind: "method", name: "findByMerchant", static: false, private: false, access: { has: function (obj) { return "findByMerchant" in obj; }, get: function (obj) { return obj.findByMerchant; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findByUser_decorators, { kind: "method", name: "findByUser", static: false, private: false, access: { has: function (obj) { return "findByUser" in obj; }, get: function (obj) { return obj.findByUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findById_decorators, { kind: "method", name: "findById", static: false, private: false, access: { has: function (obj) { return "findById" in obj; }, get: function (obj) { return obj.findById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingsController = _classThis;
}();
exports.BookingsController = BookingsController;
