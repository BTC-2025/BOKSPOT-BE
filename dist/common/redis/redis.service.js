"use strict";
// ============================================================
// Redis Service — Connection manager with distributed locking
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RedisService_1.name);
        const redisConfig = {
            host: this.configService.get('REDIS_HOST', 'localhost'),
            port: this.configService.get('REDIS_PORT', 6379),
            password: this.configService.get('REDIS_PASSWORD') || undefined,
            db: this.configService.get('REDIS_DB', 0),
            retryStrategy: (times) => Math.min(times * 50, 2000),
            maxRetriesPerRequest: 3,
        };
        this.client = new ioredis_1.default(redisConfig);
        this.subscriber = new ioredis_1.default(redisConfig);
        this.publisher = new ioredis_1.default(redisConfig);
        this.client.on('connect', () => this.logger.log('Redis client connected'));
        this.client.on('error', (err) => this.logger.error('Redis client error', err));
    }
    async onModuleDestroy() {
        await Promise.all([
            this.client.quit(),
            this.subscriber.quit(),
            this.publisher.quit(),
        ]);
        this.logger.log('Redis connections closed');
    }
    // ---- Distributed Locking ----
    /**
     * Acquire a distributed lock using SET NX EX pattern
     * Returns the lock value (UUID) if acquired, null otherwise
     */
    async acquireLock(key, ttlSeconds) {
        const lockValue = `lock:${Date.now()}:${Math.random().toString(36).slice(2)}`;
        const result = await this.client.set(key, lockValue, 'EX', ttlSeconds, 'NX');
        if (result === 'OK') {
            this.logger.debug(`Lock acquired: ${key}`);
            return lockValue;
        }
        return null;
    }
    /**
     * Release a distributed lock (only if we own it)
     * Uses Lua script for atomic check-and-delete
     */
    async releaseLock(key, lockValue) {
        const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
        const result = await this.client.eval(script, 1, key, lockValue);
        const released = result === 1;
        if (released) {
            this.logger.debug(`Lock released: ${key}`);
        }
        return released;
    }
    /**
     * Extend lock TTL (only if we own it)
     */
    async extendLock(key, lockValue, ttlSeconds) {
        const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
        const result = await this.client.eval(script, 1, key, lockValue, ttlSeconds.toString());
        return result === 1;
    }
    // ---- Pub/Sub ----
    async publish(channel, message) {
        await this.publisher.publish(channel, message);
    }
    async subscribe(channel, callback) {
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (ch, msg) => {
            if (ch === channel)
                callback(msg);
        });
    }
    // ---- Cache Helpers ----
    async getJson(key) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }
    async setJson(key, value, ttlSeconds) {
        const serialized = JSON.stringify(value);
        if (ttlSeconds) {
            await this.client.setex(key, ttlSeconds, serialized);
        }
        else {
            await this.client.set(key, serialized);
        }
    }
    async del(key) {
        await this.client.del(key);
    }
    async incr(key) {
        return this.client.incr(key);
    }
    async expire(key, seconds) {
        await this.client.expire(key, seconds);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
