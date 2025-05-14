import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TicketsModule } from './modules/tickets/tickets.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), TicketsModule],
  providers: [],
})
export class AppModule {}
