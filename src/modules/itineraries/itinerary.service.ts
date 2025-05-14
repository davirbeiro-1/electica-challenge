import { ConflictException, Injectable } from '@nestjs/common';

import { ItineraryRepository } from './repository/itinerary.repository';
import { CreateItineraryDTO } from './dto/';
import { Itinerary } from './entities/itinerary.entity';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class ItineraryService {
  constructor(
    private readonly itineraryRepository: ItineraryRepository,
    private readonly ticketService: TicketsService,
  ) {}

  async createItinerary(
    createItineraryDTO: CreateItineraryDTO,
  ): Promise<Itinerary> {
    try {
      const itinerary = await this.itineraryRepository.createItinerary({
        name: createItineraryDTO.name,
        userId: createItineraryDTO.userId,
      });

      await this.ticketService.associateTicketsToItinerary(
        createItineraryDTO.ticketsId,
        itinerary.id,
      );

      return this.itineraryRepository.findItineraryByIdWithTickets(
        itinerary.id,
      );
    } catch (error) {
      if (error.code === 'P2002') {
        // Customize the error message to provide more context
        throw new ConflictException(
          `Itinerary with name "${createItineraryDTO.name}" already exists.`,
        );
      }
    }
  }
}
