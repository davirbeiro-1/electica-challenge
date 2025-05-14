import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TicketsModule } from './modules/tickets/tickets.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { ItinerariesModule } from './modules/itineraries/itineraries.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    TicketsModule,
    ItinerariesModule,
  ],
  providers: [],
})
export class AppModule {}
