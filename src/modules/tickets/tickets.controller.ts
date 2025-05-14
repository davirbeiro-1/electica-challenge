import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TicketApiExceptionResponse } from './../../common/exceptions/ticket-exception.response';
import { CreateTicketDTO } from './dto';
import { TicketResponse } from './response/ticket.response';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
@ApiResponse({
  description: 'Non-2XX response',
  type: TicketApiExceptionResponse,
})
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a ticket' })
  @ApiResponse({
    status: 201,
    description: 'Ticket has been successfully created',
    type: TicketResponse,
  })
  @UsePipes(new ValidationPipe())
  async create(@Body() tickets: CreateTicketDTO[]) {
    try {
      if (tickets.length === 0) {
        throw new Error('Its need to have at least one ticket');
      }

      for await (const createTicketDto of tickets) {
        if (Object.keys(createTicketDto).length === 0) {
          throw new Error('Ticket cant be empty');
        }
        return this.ticketService.create(createTicketDto);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
