import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

import {
  TicketApiItemAlreadyExistsException,
  TicketPropertyMissingException,
} from '../../common/exceptions/custom.exception';
import { TicketRepository } from './repository/ticket.repository';
import { CreateTicketDTO } from './dto';
import { Ticket } from './entities';

@Injectable()
export class TicketsService {
  constructor(private ticketRepository: TicketRepository) {}
  async create(data: CreateTicketDTO): Promise<Partial<Ticket>> {
    try {
      const existingTicket = await this.ticketRepository.findTicketByNumber(
        data.number,
      );
      if (existingTicket) {
        throw new TicketApiItemAlreadyExistsException(
          `Ticket ${existingTicket.number} already exists`,
        );
      }

      return await this.ticketRepository.createPost(data);
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(
          'Validation error: One or more required fields are missing or invalid.',
        );
      }
    }
  }
}
