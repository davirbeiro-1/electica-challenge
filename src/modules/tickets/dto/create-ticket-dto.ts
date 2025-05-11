import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { Transport } from '../../../common/enum/transport';
import { ITicket } from '../interface/ITicket';

export class CreateTicketDTO implements Partial<ITicket> {
  @ApiProperty({ example: 'XPTO' })
  @IsString({ message: 'Ticket Number must be a string' })
  @IsNotEmpty({ message: 'Ticket Number is required' })
  number: string;

  @ApiPropertyOptional({ example: 'Plataform XPTO' })
  @IsString({ message: 'Descripion must be a string' })
  @IsOptional()
  departure: string;

  @ApiPropertyOptional({ example: 'Seat XPTO' })
  @IsString({ message: 'Seat must be a string' })
  @IsOptional()
  seat: string;

  @ApiPropertyOptional({ example: 'Without Luggage' })
  @IsString({ message: 'Seat must be a string' })
  @MaxLength(100, { message: 'Title must be less than 100 characters' })
  @IsOptional()
  details: string;

  @ApiProperty({ example: 'From Rio de Janeiro Airport' })
  @IsString({ message: 'Origin must be a string' })
  @IsNotEmpty({ message: 'Origin is required' })
  origin: string;

  @ApiProperty({ example: 'To Lisbon' })
  @IsString({ message: 'Destiny must be a string' })
  @IsNotEmpty({ message: 'Destiny is required' })
  destiny: string;

  @ApiPropertyOptional({ example: Transport.AIRPLANE })
  @IsString({ message: 'Trasnport must be a string' })
  @IsNotEmpty({ message: 'Transport is required' })
  @IsIn([Transport.BUS, Transport.TAXI, Transport.AIRPLANE], {
    message: `Transport must be one of the following values: ${Transport.BUS}, ${Transport.TAXI}, ${Transport.AIRPLANE}`,
  })
  transportType: string;

  @ApiProperty({ example: 'Airplane XPTO' })
  @IsString({ message: 'Transport Number must be a string' })
  @IsNotEmpty({ message: 'Transport number is required' })
  transportNumber: string;

  @ApiProperty({ example: new Date() })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Departure time must be a date' })
  @IsNotEmpty({ message: 'Departure time is required' })
  departureTime: Date;

  @ApiProperty({ example: new Date() })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Arrive time must be a date' })
  @IsNotEmpty({ message: 'Arrive time is required' })
  arriveTime: Date;
}
