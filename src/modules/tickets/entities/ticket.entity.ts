import { ITicket } from '../interface/ITicket';

export class Ticket implements ITicket {
  id: number;
  number: string;
  departure: string;
  seat: string;
  details: string;
  origin: string;
  destiny: string;
  transportType: string;
  transportNumber: string;
  departureTime: Date;
  arriveTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
