export interface ITicket {
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
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
