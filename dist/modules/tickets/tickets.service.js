"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var TicketsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let TicketsService = TicketsService_1 = class TicketsService {
    constructor() {
        this.logger = new common_1.Logger(TicketsService_1.name);
        this.filePath = path.resolve(process.cwd(), 'shared-tickets.json');
    }
    readTickets() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');
                return JSON.parse(data) || [];
            }
        }
        catch (error) {
            this.logger.error('Error reading shared-tickets.json', error);
        }
        return [];
    }
    writeTickets(tickets) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(tickets, null, 2), 'utf8');
        }
        catch (error) {
            this.logger.error('Error writing to shared-tickets.json', error);
        }
    }
    findAll() {
        return this.readTickets();
    }
    create(ticketData) {
        const tickets = this.readTickets();
        const newTicket = {
            ...ticketData,
            id: 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
            status: 'OPEN',
            createdAt: new Date().toISOString(),
        };
        // Add to top of list
        tickets.unshift(newTicket);
        this.writeTickets(tickets);
        return newTicket;
    }
    updateStatus(id, status) {
        const tickets = this.readTickets();
        const index = tickets.findIndex(t => t.id === id);
        if (index === -1)
            return null;
        tickets[index].status = status;
        this.writeTickets(tickets);
        return tickets[index];
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = TicketsService_1 = __decorate([
    (0, common_1.Injectable)()
], TicketsService);
