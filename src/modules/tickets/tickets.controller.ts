import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTicketDTO } from './dto';
import { TicketResponse } from './response/ticket.response';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a ticket' })
  @ApiResponse({
    status: 201,
    description: 'Tickets has been successfully created',
    type: [TicketResponse],
  })
  @ApiResponse({
    status: 400,
    description: 'Return this error when input is bad formatted',
    type: BadRequestException,
    example: {
      message: 'Input needs to be an array ',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @UsePipes(new ValidationPipe())
  async create(@Body() tickets: CreateTicketDTO[]): Promise<TicketResponse[]> {
    try {
      if (!Array.isArray(tickets)) {
        throw new BadRequestException('Input needs to be an array ');
      }
      if (tickets.length === 0) {
        throw new BadRequestException('Its need to have at least one ticket');
      }
      const ticketsSucessuflyCreated = [];
      for await (const createTicketDto of tickets) {
        if (Object.keys(createTicketDto).length === 0) {
          throw new BadRequestException('Ticket cant be empty');
        }
        const ticketResponse = await this.ticketService.create(createTicketDto);
        ticketsSucessuflyCreated.push(ticketResponse);
      }
      return ticketsSucessuflyCreated;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
