import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/modules/prisma/prisma.module';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketRepository } from './repository/ticket.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketRepository],
  exports: [TicketsService],
})
export class TicketsModule {}
