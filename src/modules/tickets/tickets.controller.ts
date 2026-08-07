import { Controller, Get, Post, Body, Patch, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TicketsService, Ticket } from './tickets.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Public()
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Public()
  @Post()
  create(@Body() ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt'>) {
    if (!ticketData.subject || !ticketData.message || !ticketData.targetType) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    return this.ticketsService.create(ticketData);
  }

  @Public()
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'OPEN' | 'PENDING' | 'RESOLVED'
  ) {
    if (!status || !['OPEN', 'PENDING', 'RESOLVED'].includes(status.toUpperCase())) {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }
    const updated = this.ticketsService.updateStatus(id, status.toUpperCase() as any);
    if (!updated) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }
    return updated;
  }
}
