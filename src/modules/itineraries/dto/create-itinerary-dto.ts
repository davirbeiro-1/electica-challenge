import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { IItinerary } from '../interface/IItinerary';

export class CreateItineraryDTO implements Partial<IItinerary> {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'UserId is required' })
  userId: number;

  @ApiProperty({ example: 'Itinerary 1' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNotEmpty({ message: 'TicketIds are required' })
  ticketsId: number[];
}
