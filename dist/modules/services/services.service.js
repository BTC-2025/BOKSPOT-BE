"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.ServicesService = void 0;
var common_1 = require("@nestjs/common");
var pagination_dto_1 = require("../../common/dto/pagination.dto");
var ServicesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesService = _classThis = /** @class */ (function () {
        function ServicesService_1(prisma) {
            this.prisma = prisma;
        }
        ServicesService_1.prototype.create = function (merchantId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.service.create({
                            data: __assign(__assign({}, dto), { merchantId: merchantId, slug: this.generateSlug(dto.name) }),
                        })];
                });
            });
        };
        ServicesService_1.prototype.findAll = function (pagination, filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where, radiusKm, lat, lng, nearbyMerchants, merchantIds, _a, data, total;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            where = {
                                isActive: true,
                                deletedAt: null,
                            };
                            if (filters === null || filters === void 0 ? void 0 : filters.categoryId)
                                where.categoryId = filters.categoryId;
                            if (filters === null || filters === void 0 ? void 0 : filters.serviceType)
                                where.serviceType = filters.serviceType;
                            if (filters === null || filters === void 0 ? void 0 : filters.merchantId)
                                where.merchantId = filters.merchantId;
                            if (filters === null || filters === void 0 ? void 0 : filters.isFeatured)
                                where.isFeatured = true;
                            if (filters === null || filters === void 0 ? void 0 : filters.categorySlug) {
                                where.category = {
                                    slug: filters.categorySlug,
                                };
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.city) {
                                where.merchant = {
                                    city: { contains: filters.city, mode: 'insensitive' },
                                };
                            }
                            if (!((filters === null || filters === void 0 ? void 0 : filters.latitude) !== undefined && (filters === null || filters === void 0 ? void 0 : filters.longitude) !== undefined)) return [3 /*break*/, 2];
                            radiusKm = filters.radius || 25;
                            lat = filters.latitude;
                            lng = filters.longitude;
                            return [4 /*yield*/, this.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT id FROM (\n          SELECT id, (\n            6371 * acos(\n              cos(radians(", ")) *\n              cos(radians(latitude)) *\n              cos(radians(longitude) - radians(", ")) +\n              sin(radians(", ")) *\n              sin(radians(latitude))\n            )\n          ) AS distance_km\n          FROM merchants\n          WHERE is_active = true AND deleted_at IS NULL\n        ) sub\n        WHERE distance_km <= ", "\n      "], ["\n        SELECT id FROM (\n          SELECT id, (\n            6371 * acos(\n              cos(radians(", ")) *\n              cos(radians(latitude)) *\n              cos(radians(longitude) - radians(", ")) +\n              sin(radians(", ")) *\n              sin(radians(latitude))\n            )\n          ) AS distance_km\n          FROM merchants\n          WHERE is_active = true AND deleted_at IS NULL\n        ) sub\n        WHERE distance_km <= ", "\n      "])), lat, lng, lat, radiusKm)];
                        case 1:
                            nearbyMerchants = _c.sent();
                            merchantIds = nearbyMerchants.map(function (m) { return m.id; });
                            // If we found nearby merchants, filter by them, otherwise force empty result by passing dummy UUID or empty in list if Prisma allows,
                            // or we can use empty array if Prisma supports it (in Prisma, { in: [] } returns empty list correctly).
                            where.merchantId = { in: merchantIds };
                            _c.label = 2;
                        case 2:
                            if (filters === null || filters === void 0 ? void 0 : filters.search) {
                                where.OR = [
                                    { name: { contains: filters.search, mode: 'insensitive' } },
                                    { description: { contains: filters.search, mode: 'insensitive' } },
                                    { tags: { has: filters.search.toLowerCase() } },
                                ];
                            }
                            if ((filters === null || filters === void 0 ? void 0 : filters.minPrice) || (filters === null || filters === void 0 ? void 0 : filters.maxPrice)) {
                                where.basePrice = {};
                                if (filters === null || filters === void 0 ? void 0 : filters.minPrice)
                                    where.basePrice.gte = filters.minPrice;
                                if (filters === null || filters === void 0 ? void 0 : filters.maxPrice)
                                    where.basePrice.lte = filters.maxPrice;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.service.findMany({
                                        where: where,
                                        skip: pagination.skip,
                                        take: pagination.take,
                                        orderBy: (_b = {}, _b[pagination.sortBy || 'createdAt'] = pagination.sortOrder || 'desc', _b),
                                        include: {
                                            merchant: {
                                                select: { id: true, name: true, slug: true, logoUrl: true, city: true, rating: true, latitude: true, longitude: true },
                                            },
                                            category: true,
                                            _count: { select: { bookings: true, reviews: true } },
                                        },
                                    }),
                                    this.prisma.service.count({ where: where }),
                                ])];
                        case 3:
                            _a = _c.sent(), data = _a[0], total = _a[1];
                            return [2 /*return*/, (0, pagination_dto_1.createPaginatedResponse)(data, total, pagination)];
                    }
                });
            });
        };
        ServicesService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var uuidRegex, service;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                            if (!uuidRegex.test(id)) {
                                throw new common_1.NotFoundException('Service not found');
                            }
                            return [4 /*yield*/, this.prisma.service.findUnique({
                                    where: { id: id, deletedAt: null },
                                    include: {
                                        merchant: true,
                                        category: true,
                                        availabilityRules: { where: { isActive: true } },
                                        reviews: {
                                            take: 20,
                                            orderBy: { createdAt: 'desc' },
                                            include: { user: { select: { name: true, avatarUrl: true } } },
                                        },
                                        _count: { select: { bookings: true, reviews: true, favorites: true } },
                                    },
                                })];
                        case 1:
                            service = _a.sent();
                            if (!service)
                                throw new common_1.NotFoundException('Service not found');
                            return [2 /*return*/, service];
                    }
                });
            });
        };
        ServicesService_1.prototype.findBySlug = function (merchantId, slug) {
            return __awaiter(this, void 0, void 0, function () {
                var service;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.service.findUnique({
                                where: { merchantId_slug: { merchantId: merchantId, slug: slug }, deletedAt: null },
                                include: {
                                    merchant: true,
                                    category: true,
                                    availabilityRules: { where: { isActive: true } },
                                    reviews: {
                                        take: 20,
                                        orderBy: { createdAt: 'desc' },
                                        include: { user: { select: { name: true, avatarUrl: true } } },
                                    },
                                    _count: { select: { bookings: true, reviews: true, favorites: true } },
                                },
                            })];
                        case 1:
                            service = _a.sent();
                            if (!service)
                                throw new common_1.NotFoundException('Service not found');
                            return [2 /*return*/, service];
                    }
                });
            });
        };
        ServicesService_1.prototype.update = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.service.update({
                            where: { id: id },
                            data: dto,
                        })];
                });
            });
        };
        ServicesService_1.prototype.softDelete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.service.update({
                            where: { id: id },
                            data: { deletedAt: new Date(), isActive: false },
                        })];
                });
            });
        };
        ServicesService_1.prototype.getCategories = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.serviceCategory.findMany({
                            where: { isActive: true },
                            orderBy: { sortOrder: 'asc' },
                            include: { _count: { select: { services: true } } },
                        })];
                });
            });
        };
        ServicesService_1.prototype.getFeatured = function () {
            return __awaiter(this, arguments, void 0, function (limit) {
                if (limit === void 0) { limit = 12; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.service.findMany({
                            where: { isActive: true, isFeatured: true, deletedAt: null },
                            take: limit,
                            orderBy: { rating: 'desc' },
                            include: {
                                merchant: {
                                    select: { id: true, name: true, slug: true, logoUrl: true, city: true },
                                },
                                category: true,
                            },
                        })];
                });
            });
        };
        ServicesService_1.prototype.generateSlug = function (name) {
            return name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        };
        return ServicesService_1;
    }());
    __setFunctionName(_classThis, "ServicesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesService = _classThis;
}();
exports.ServicesService = ServicesService;
var templateObject_1;
