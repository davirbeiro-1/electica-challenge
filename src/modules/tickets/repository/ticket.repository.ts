import { Injectable } from '@nestjs/common';

import { CreateTicketDTO } from '../dto';
import { Ticket } from '../entities';
import { PrismaService } from '../../../common/modules/prisma/prisma.service';
@Injectable()
export class TicketRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createTicket(data: CreateTicketDTO): Promise<Partial<Ticket>> {
    return await this.prismaService.ticket.create({ data: { ...data } });
  }

  async findTicketByNumber(
    ticketNumber: string,
  ): Promise<Pick<Ticket, 'number'>> {
    return await this.prismaService.ticket.findFirst({
      where: {
        number: ticketNumber,
      },
      select: {
        number: true,
      },
    });
  }

  async associateTicketToItinerary(
    ticketId: number,
    id: number,
  ): Promise<Pick<Ticket, 'number'>> {
    return await this.prismaService.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        itineraryId: id,
      },
    });
  }
}
