import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transport } from '../../../common/enum/transport';

export class TicketResponse {
  @ApiProperty({ example: 'XPTO' })
  number: string;

  @ApiPropertyOptional({ example: 'Plataform XPTO' })
  departure: string;

  @ApiPropertyOptional({ example: 'Seat XPTO' })
  seat: string;

  @ApiPropertyOptional({ example: 'Without Luggage' })
  details: string;

  @ApiProperty({ example: 'From Rio de Janeiro Airport' })
  origin: string;

  @ApiProperty({ example: 'To Lisbon' })
  destiny: string;

  @ApiPropertyOptional({ example: Transport.AIRPLANE })
  transportType: string;

  @ApiPropertyOptional({ example: 'Airplane XPTO' })
  transportNumber: string;

  @ApiProperty({ example: new Date() })
  departureTime: Date;

  @ApiProperty({ example: new Date() })
  arriveTime: Date;
}
