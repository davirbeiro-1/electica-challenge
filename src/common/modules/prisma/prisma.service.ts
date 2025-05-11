import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async onModuleInit() {
    return await this.$connect();
  }
}
