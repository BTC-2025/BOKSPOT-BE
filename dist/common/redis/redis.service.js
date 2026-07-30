"use strict";
// ============================================================
// Redis Service — Connection manager with distributed locking
// ============================================================
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
exports.RedisService = void 0;
var common_1 = require("@nestjs/common");
var ioredis_1 = require("ioredis");
var RedisService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RedisService = _classThis = /** @class */ (function () {
        function RedisService_1(configService) {
            var _this = this;
            this.configService = configService;
            this.logger = new common_1.Logger(RedisService.name);
            var redisConfig = {
                host: this.configService.get('REDIS_HOST', 'localhost'),
                port: this.configService.get('REDIS_PORT', 6379),
                password: this.configService.get('REDIS_PASSWORD') || undefined,
                db: this.configService.get('REDIS_DB', 0),
                retryStrategy: function (times) { return Math.min(times * 50, 2000); },
                maxRetriesPerRequest: 3,
            };
            this.client = new ioredis_1.default(redisConfig);
            this.subscriber = new ioredis_1.default(redisConfig);
            this.publisher = new ioredis_1.default(redisConfig);
            this.client.on('connect', function () { return _this.logger.log('Redis client connected'); });
            this.client.on('error', function (err) { return _this.logger.error('Redis client error', err); });
        }
        RedisService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.client.quit(),
                                this.subscriber.quit(),
                                this.publisher.quit(),
                            ])];
                        case 1:
                            _a.sent();
                            this.logger.log('Redis connections closed');
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ---- Distributed Locking ----
        /**
         * Acquire a distributed lock using SET NX EX pattern
         * Returns the lock value (UUID) if acquired, null otherwise
         */
        RedisService_1.prototype.acquireLock = function (key, ttlSeconds) {
            return __awaiter(this, void 0, void 0, function () {
                var lockValue, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lockValue = "lock:".concat(Date.now(), ":").concat(Math.random().toString(36).slice(2));
                            return [4 /*yield*/, this.client.set(key, lockValue, 'EX', ttlSeconds, 'NX')];
                        case 1:
                            result = _a.sent();
                            if (result === 'OK') {
                                this.logger.debug("Lock acquired: ".concat(key));
                                return [2 /*return*/, lockValue];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        /**
         * Release a distributed lock (only if we own it)
         * Uses Lua script for atomic check-and-delete
         */
        RedisService_1.prototype.releaseLock = function (key, lockValue) {
            return __awaiter(this, void 0, void 0, function () {
                var script, result, released;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            script = "\n      if redis.call(\"get\", KEYS[1]) == ARGV[1] then\n        return redis.call(\"del\", KEYS[1])\n      else\n        return 0\n      end\n    ";
                            return [4 /*yield*/, this.client.eval(script, 1, key, lockValue)];
                        case 1:
                            result = _a.sent();
                            released = result === 1;
                            if (released) {
                                this.logger.debug("Lock released: ".concat(key));
                            }
                            return [2 /*return*/, released];
                    }
                });
            });
        };
        /**
         * Extend lock TTL (only if we own it)
         */
        RedisService_1.prototype.extendLock = function (key, lockValue, ttlSeconds) {
            return __awaiter(this, void 0, void 0, function () {
                var script, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            script = "\n      if redis.call(\"get\", KEYS[1]) == ARGV[1] then\n        return redis.call(\"expire\", KEYS[1], ARGV[2])\n      else\n        return 0\n      end\n    ";
                            return [4 /*yield*/, this.client.eval(script, 1, key, lockValue, ttlSeconds.toString())];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result === 1];
                    }
                });
            });
        };
        // ---- Pub/Sub ----
        RedisService_1.prototype.publish = function (channel, message) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.publisher.publish(channel, message)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.subscribe = function (channel, callback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.subscriber.subscribe(channel)];
                        case 1:
                            _a.sent();
                            this.subscriber.on('message', function (ch, msg) {
                                if (ch === channel)
                                    callback(msg);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ---- Cache Helpers ----
        RedisService_1.prototype.getJson = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.get(key)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data ? JSON.parse(data) : null];
                    }
                });
            });
        };
        RedisService_1.prototype.setJson = function (key, value, ttlSeconds) {
            return __awaiter(this, void 0, void 0, function () {
                var serialized;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serialized = JSON.stringify(value);
                            if (!ttlSeconds) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.client.setex(key, ttlSeconds, serialized)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.client.set(key, serialized)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.del = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.del(key)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.incr = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.incr(key)];
                });
            });
        };
        RedisService_1.prototype.expire = function (key, seconds) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.expire(key, seconds)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RedisService_1;
    }());
    __setFunctionName(_classThis, "RedisService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RedisService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RedisService = _classThis;
}();
exports.RedisService = RedisService;
