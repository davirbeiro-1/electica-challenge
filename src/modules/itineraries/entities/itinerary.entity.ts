import { ITicket } from '../../tickets/interface/ITicket';
import { IItinerary } from '../interface/IItinerary';

export class Itinerary implements IItinerary {
  id: number;
  userId: number;
  tickets: ITicket[];
  createdAt: Date;
  updatedAt: Date;
}
