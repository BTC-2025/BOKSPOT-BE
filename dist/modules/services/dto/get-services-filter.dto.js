"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetServicesFilterDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var pagination_dto_1 = require("../../../common/dto/pagination.dto");
var GetServicesFilterDto = function () {
    var _a;
    var _classSuper = pagination_dto_1.PaginationDto;
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _categorySlug_decorators;
    var _categorySlug_initializers = [];
    var _categorySlug_extraInitializers = [];
    var _serviceType_decorators;
    var _serviceType_initializers = [];
    var _serviceType_extraInitializers = [];
    var _merchantId_decorators;
    var _merchantId_initializers = [];
    var _merchantId_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _minPrice_decorators;
    var _minPrice_initializers = [];
    var _minPrice_extraInitializers = [];
    var _maxPrice_decorators;
    var _maxPrice_initializers = [];
    var _maxPrice_extraInitializers = [];
    var _isFeatured_decorators;
    var _isFeatured_initializers = [];
    var _isFeatured_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _radius_decorators;
    var _radius_initializers = [];
    var _radius_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetServicesFilterDto, _super);
            function GetServicesFilterDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.categoryId = __runInitializers(_this, _categoryId_initializers, void 0);
                _this.categorySlug = (__runInitializers(_this, _categoryId_extraInitializers), __runInitializers(_this, _categorySlug_initializers, void 0));
                _this.serviceType = (__runInitializers(_this, _categorySlug_extraInitializers), __runInitializers(_this, _serviceType_initializers, void 0));
                _this.merchantId = (__runInitializers(_this, _serviceType_extraInitializers), __runInitializers(_this, _merchantId_initializers, void 0));
                _this.search = (__runInitializers(_this, _merchantId_extraInitializers), __runInitializers(_this, _search_initializers, void 0));
                _this.minPrice = (__runInitializers(_this, _search_extraInitializers), __runInitializers(_this, _minPrice_initializers, void 0));
                _this.maxPrice = (__runInitializers(_this, _minPrice_extraInitializers), __runInitializers(_this, _maxPrice_initializers, void 0));
                _this.isFeatured = (__runInitializers(_this, _maxPrice_extraInitializers), __runInitializers(_this, _isFeatured_initializers, void 0));
                _this.city = (__runInitializers(_this, _isFeatured_extraInitializers), __runInitializers(_this, _city_initializers, void 0));
                _this.latitude = (__runInitializers(_this, _city_extraInitializers), __runInitializers(_this, _latitude_initializers, void 0));
                _this.longitude = (__runInitializers(_this, _latitude_extraInitializers), __runInitializers(_this, _longitude_initializers, void 0));
                _this.radius = (__runInitializers(_this, _longitude_extraInitializers), __runInitializers(_this, _radius_initializers, void 0));
                __runInitializers(_this, _radius_extraInitializers);
                return _this;
            }
            return GetServicesFilterDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _categoryId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _categorySlug_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _serviceType_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _merchantId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _search_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _minPrice_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _maxPrice_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _isFeatured_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Boolean; }), (0, class_validator_1.IsBoolean)()];
            _city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _latitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _longitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _radius_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _categorySlug_decorators, { kind: "field", name: "categorySlug", static: false, private: false, access: { has: function (obj) { return "categorySlug" in obj; }, get: function (obj) { return obj.categorySlug; }, set: function (obj, value) { obj.categorySlug = value; } }, metadata: _metadata }, _categorySlug_initializers, _categorySlug_extraInitializers);
            __esDecorate(null, null, _serviceType_decorators, { kind: "field", name: "serviceType", static: false, private: false, access: { has: function (obj) { return "serviceType" in obj; }, get: function (obj) { return obj.serviceType; }, set: function (obj, value) { obj.serviceType = value; } }, metadata: _metadata }, _serviceType_initializers, _serviceType_extraInitializers);
            __esDecorate(null, null, _merchantId_decorators, { kind: "field", name: "merchantId", static: false, private: false, access: { has: function (obj) { return "merchantId" in obj; }, get: function (obj) { return obj.merchantId; }, set: function (obj, value) { obj.merchantId = value; } }, metadata: _metadata }, _merchantId_initializers, _merchantId_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _minPrice_decorators, { kind: "field", name: "minPrice", static: false, private: false, access: { has: function (obj) { return "minPrice" in obj; }, get: function (obj) { return obj.minPrice; }, set: function (obj, value) { obj.minPrice = value; } }, metadata: _metadata }, _minPrice_initializers, _minPrice_extraInitializers);
            __esDecorate(null, null, _maxPrice_decorators, { kind: "field", name: "maxPrice", static: false, private: false, access: { has: function (obj) { return "maxPrice" in obj; }, get: function (obj) { return obj.maxPrice; }, set: function (obj, value) { obj.maxPrice = value; } }, metadata: _metadata }, _maxPrice_initializers, _maxPrice_extraInitializers);
            __esDecorate(null, null, _isFeatured_decorators, { kind: "field", name: "isFeatured", static: false, private: false, access: { has: function (obj) { return "isFeatured" in obj; }, get: function (obj) { return obj.isFeatured; }, set: function (obj, value) { obj.isFeatured = value; } }, metadata: _metadata }, _isFeatured_initializers, _isFeatured_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _radius_decorators, { kind: "field", name: "radius", static: false, private: false, access: { has: function (obj) { return "radius" in obj; }, get: function (obj) { return obj.radius; }, set: function (obj, value) { obj.radius = value; } }, metadata: _metadata }, _radius_initializers, _radius_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetServicesFilterDto = GetServicesFilterDto;
