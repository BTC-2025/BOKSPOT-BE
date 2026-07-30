"use strict";
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
exports.CreateServiceDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateServiceDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _shortDescription_decorators;
    var _shortDescription_initializers = [];
    var _shortDescription_extraInitializers = [];
    var _serviceType_decorators;
    var _serviceType_initializers = [];
    var _serviceType_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _bufferMinutes_decorators;
    var _bufferMinutes_initializers = [];
    var _bufferMinutes_extraInitializers = [];
    var _basePrice_decorators;
    var _basePrice_initializers = [];
    var _basePrice_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _maxCapacity_decorators;
    var _maxCapacity_initializers = [];
    var _maxCapacity_extraInitializers = [];
    var _images_decorators;
    var _images_initializers = [];
    var _images_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateServiceDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.categoryId = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.description = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.shortDescription = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _shortDescription_initializers, void 0));
                this.serviceType = (__runInitializers(this, _shortDescription_extraInitializers), __runInitializers(this, _serviceType_initializers, void 0));
                this.durationMinutes = (__runInitializers(this, _serviceType_extraInitializers), __runInitializers(this, _durationMinutes_initializers, void 0));
                this.bufferMinutes = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _bufferMinutes_initializers, void 0));
                this.basePrice = (__runInitializers(this, _bufferMinutes_extraInitializers), __runInitializers(this, _basePrice_initializers, void 0));
                this.currency = (__runInitializers(this, _basePrice_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
                this.maxCapacity = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _maxCapacity_initializers, void 0));
                this.images = (__runInitializers(this, _maxCapacity_extraInitializers), __runInitializers(this, _images_initializers, void 0));
                this.tags = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                __runInitializers(this, _tags_extraInitializers);
            }
            return CreateServiceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _categoryId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _shortDescription_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _serviceType_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 'APPOINTMENT' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _durationMinutes_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5)];
            _bufferMinutes_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _basePrice_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _currency_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 'INR' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _maxCapacity_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(1000)];
            _images_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _shortDescription_decorators, { kind: "field", name: "shortDescription", static: false, private: false, access: { has: function (obj) { return "shortDescription" in obj; }, get: function (obj) { return obj.shortDescription; }, set: function (obj, value) { obj.shortDescription = value; } }, metadata: _metadata }, _shortDescription_initializers, _shortDescription_extraInitializers);
            __esDecorate(null, null, _serviceType_decorators, { kind: "field", name: "serviceType", static: false, private: false, access: { has: function (obj) { return "serviceType" in obj; }, get: function (obj) { return obj.serviceType; }, set: function (obj, value) { obj.serviceType = value; } }, metadata: _metadata }, _serviceType_initializers, _serviceType_extraInitializers);
            __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
            __esDecorate(null, null, _bufferMinutes_decorators, { kind: "field", name: "bufferMinutes", static: false, private: false, access: { has: function (obj) { return "bufferMinutes" in obj; }, get: function (obj) { return obj.bufferMinutes; }, set: function (obj, value) { obj.bufferMinutes = value; } }, metadata: _metadata }, _bufferMinutes_initializers, _bufferMinutes_extraInitializers);
            __esDecorate(null, null, _basePrice_decorators, { kind: "field", name: "basePrice", static: false, private: false, access: { has: function (obj) { return "basePrice" in obj; }, get: function (obj) { return obj.basePrice; }, set: function (obj, value) { obj.basePrice = value; } }, metadata: _metadata }, _basePrice_initializers, _basePrice_extraInitializers);
            __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
            __esDecorate(null, null, _maxCapacity_decorators, { kind: "field", name: "maxCapacity", static: false, private: false, access: { has: function (obj) { return "maxCapacity" in obj; }, get: function (obj) { return obj.maxCapacity; }, set: function (obj, value) { obj.maxCapacity = value; } }, metadata: _metadata }, _maxCapacity_initializers, _maxCapacity_extraInitializers);
            __esDecorate(null, null, _images_decorators, { kind: "field", name: "images", static: false, private: false, access: { has: function (obj) { return "images" in obj; }, get: function (obj) { return obj.images; }, set: function (obj, value) { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateServiceDto = CreateServiceDto;
