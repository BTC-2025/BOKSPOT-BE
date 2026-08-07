import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Ticket {
  id: string;
  targetType: 'ADMIN' | 'BUSINESS';
  merchantId?: string;
  merchantName?: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'PENDING' | 'RESOLVED';
  createdAt: string;
}

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);
  private readonly filePath = path.resolve(process.cwd(), 'shared-tickets.json');

  private readTickets(): Ticket[] {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) || [];
      }
    } catch (error) {
      this.logger.error('Error reading shared-tickets.json', error);
    }
    return [];
  }

  private writeTickets(tickets: Ticket[]) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(tickets, null, 2), 'utf8');
    } catch (error) {
      this.logger.error('Error writing to shared-tickets.json', error);
    }
  }

  findAll(): Ticket[] {
    return this.readTickets();
  }

  create(ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt'>): Ticket {
    const tickets = this.readTickets();
    const newTicket: Ticket = {
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

  updateStatus(id: string, status: 'OPEN' | 'PENDING' | 'RESOLVED'): Ticket | null {
    const tickets = this.readTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;

    tickets[index].status = status;
    this.writeTickets(tickets);
    return tickets[index];
  }
}
