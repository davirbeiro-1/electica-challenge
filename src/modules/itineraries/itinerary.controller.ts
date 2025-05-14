import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateItineraryDTO } from './dto';
import { ItineraryService } from './itinerary.service';
import { Ticket } from '../tickets/entities';

@ApiTags('Itineraries')
@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a itinerary' })
  @ApiResponse({
    status: 201,
    description: 'Itinerary has been successfully created',
    example: {
      '0': 'Start',
      '1': 'Road 1 from Xpto 1 to Xpto 2. Obs -Test',
      '2': 'Last destination',
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Returned when a itinerary with the same name already exists',
    type: ConflictException,
    example: 'Itinerary with name XPTO already exists',
  })
  @UsePipes(new ValidationPipe())
  async createItinerary(@Body() createItineraryDTO: CreateItineraryDTO) {
    try {
      const tickets =
        await this.itineraryService.createItinerary(createItineraryDTO);
      const formattedTickets = this.formatTickets(tickets);
      return this.formatArrayToObject(formattedTickets);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  formatTickets(tickets): Ticket[] {
    const formattedTickets = tickets[0].tickets;
    const sortedTickets = formattedTickets.sort((a, b) => {
      const dateA = new Date(a.arriveTime);
      const dateB = new Date(b.arriveTime);
      return dateA.getTime() - dateB.getTime();
    });
    return sortedTickets;
  }

  formatArrayToObject(tickets: Ticket[]): Record<string, string> {
    const result: Record<string, string> = { 0: 'Start' };
    const lastIndex = tickets.length - 1;
    tickets.forEach((item, index) => {
      const transportationType = item.transportType;
      const transportionNumber = item.transportNumber;
      const departure = item.departure ? item.departure : '';
      const origin = item.origin;
      const destiny = item.destiny;
      const observation = item.details ? ` OBS:${item.details}` : '';

      result[index + 1] =
        `${transportationType} ${transportionNumber} - ${departure}.  From ${origin} to ${destiny}. ${observation}`;
      if (tickets.length > 0) {
        result[lastIndex + 1] = 'Last destination reached';
      }
    });
    return result;
  }
}
