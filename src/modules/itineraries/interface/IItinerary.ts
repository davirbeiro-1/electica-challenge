import { ITicket } from '../../tickets/interface/ITicket';

export interface IItinerary {
  id: number;
  userId: number;
  tickets: ITicket[];
  createdAt: Date;
  updatedAt: Date;
}
