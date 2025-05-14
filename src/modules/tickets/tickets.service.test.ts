import { Test, TestingModule } from '@nestjs/testing';

import { TicketsService } from './tickets.service';
import { TicketRepository } from './repository/ticket.repository';
import { CreateTicketDTO } from './dto';
import { Ticket } from './entities';

const mockTicketRepository = (): any => ({
  findTicketByNumber: jest.fn(),
  createTicket: jest.fn(),
});

describe('TicketsService', () => {
  let service: TicketsService;
  let repository: ReturnType<typeof mockTicketRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: TicketRepository,
          useFactory: mockTicketRepository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    repository = module.get(TicketRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createTicketDto: CreateTicketDTO = {
      number: 'XPTO123',
      origin: 'Lisbon',
      destiny: 'Porto',
      departureTime: new Date(),
      arriveTime: new Date(),
      transportType: 'BUS',
      transportNumber: '123',
      userId: 1,
      departure: '',
      seat: '',
      details: '',
    };

    it('should return the created ticket if creation is successful', async () => {
      repository.findTicketByNumber.mockResolvedValue(undefined);
      const createdTicket: Partial<Ticket> = { id: 2, ...createTicketDto };
      repository.createTicket.mockResolvedValue(createdTicket);
      const result = await service.create(createTicketDto);
      expect(result).toEqual(createdTicket);
    });
  });
});
