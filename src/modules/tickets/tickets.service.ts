import { Injectable } from '@nestjs/common';

import { TicketApiItemAlreadyExistsException } from '../../common/exceptions/custom.exception';
import { TicketRepository } from './repository/ticket.repository';
import { CreateTicketDTO } from './dto';
import { Ticket } from './entities';

@Injectable()
export class TicketsService {
  constructor(private ticketRepository: TicketRepository) {}
  async create(data: CreateTicketDTO): Promise<Partial<Ticket>> {
    const existingTicket = await this.ticketRepository.findTicketByNumber(
      data.number,
    );
    if (existingTicket) {
      throw new TicketApiItemAlreadyExistsException(
        `Ticket ${existingTicket.number} already exists`,
      );
    }

    return await this.ticketRepository.createPost(data);
  }
}
