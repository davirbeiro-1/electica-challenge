import { Injectable } from '@nestjs/common';

import { CreateTicketDTO } from '../dto';
import { Ticket } from '../entities';
import { PrismaService } from '../../../common/modules/prisma/prisma.service'; // Adjust the path if needed
@Injectable()
export class TicketRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createPost(data: CreateTicketDTO): Promise<Partial<Ticket>> {
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
}
