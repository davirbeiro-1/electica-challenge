import { Injectable } from '@nestjs/common';

import { CreateItineraryDTO } from '../dto';
import { Itinerary } from '../entities';
import { PrismaService } from '../../../common/modules/prisma/prisma.service';
@Injectable()
export class ItineraryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createItinerary(
    data: Pick<CreateItineraryDTO, 'name' | 'userId'>,
  ): Promise<any> {
    return await this.prismaService.itinerary.create({ data: { ...data } });
  }

  async findItineraryByIdWithTickets(id: number): Promise<any> {
    return await this.prismaService.itinerary.findMany({
      where: { id },
      select: {
        tickets: {
          select: {
            number: true,
            arriveTime: true,
            departure: true,
            departureTime: true,
            destiny: true,
            details: true,
            origin: true,
            seat: true,
            transportNumber: true,
            transportType: true,
          },
        },
      },
    });
  }
}
