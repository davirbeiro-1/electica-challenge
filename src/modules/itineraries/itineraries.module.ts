import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/modules/prisma/prisma.module';
import { ItinerariesController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { ItineraryRepository } from './repository/itinerary.repository';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [PrismaModule, TicketsModule],
  controllers: [ItinerariesController],
  providers: [ItineraryService, ItineraryRepository],
})
export class ItinerariesModule {}
