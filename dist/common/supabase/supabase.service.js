"use strict";
// ============================================================
// Supabase Service — Storage & Realtime integration
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
var SupabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let SupabaseService = SupabaseService_1 = class SupabaseService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SupabaseService_1.name);
        const supabaseUrl = this.configService.get('SUPABASE_URL') || 'https://fallback.supabase.co';
        const supabaseKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY') || 'fallback-key';
        try {
            this.client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
                auth: { autoRefreshToken: false, persistSession: false },
            });
            this.logger.log('Supabase client initialized');
        }
        catch (e) {
            this.logger.error('Failed to initialize Supabase Client', e);
        }
    }
    // ---- Storage ----
    async uploadFile(bucket, path, file, contentType) {
        const { data, error } = await this.client.storage
            .from(bucket)
            .upload(path, file, { contentType, upsert: true });
        if (error)
            throw error;
        const { data: urlData } = this.client.storage
            .from(bucket)
            .getPublicUrl(data.path);
        return urlData.publicUrl;
    }
    async deleteFile(bucket, path) {
        const { error } = await this.client.storage.from(bucket).remove([path]);
        if (error)
            throw error;
    }
    getPublicUrl(bucket, path) {
        const { data } = this.client.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    }
    // ---- Realtime channel helpers ----
    subscribeToChanges(table, callback) {
        return this.client
            .channel(`db-changes-${table}`)
            .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
            .subscribe();
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = SupabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
