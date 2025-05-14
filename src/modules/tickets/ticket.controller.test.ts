import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, jest } from '@jest/globals';

import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CreateTicketDTO } from '../tickets/dto';
import { TicketResponse } from './response/ticket.response';
import { TicketApiItemAlreadyExistsException } from '../../common/exceptions/custom.exception';

describe('TicketsController', () => {
  let ticketsController: TicketsController;
  let ticketsService: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    ticketsController = module.get<TicketsController>(TicketsController);
    ticketsService = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(ticketsController).toBeDefined();
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
      departure: '',
      seat: '',
      details: '',
      userId: 1,
    };

    it('should return the result of ticketsService.create on success', async () => {
      const mockResponse: TicketResponse = {
        number: 'XPTO123',
        origin: 'Lisbon',
        destiny: 'Porto',
        departureTime: new Date(),
        arriveTime: new Date(),
        transportType: 'BUS',
        transportNumber: '123',
        departure: '',
        seat: '',
        details: '',
        userId: 1,
      };
      const tickets = [];
      tickets.push(createTicketDto);
      jest.mocked(ticketsService.create).mockResolvedValue(mockResponse);
      const result = await ticketsController.create(tickets);

      expect(result).toEqual([mockResponse]);
    });

    it('should throw an error if the tickets array are empty', async () => {
      const tickets = [];
      expect(ticketsService.create).not.toHaveBeenCalled();
      await expect(ticketsController.create(tickets)).rejects.toThrowError();
    });

    it('should throw an error if the input is not an array', async () => {
      const tickets: any = {};
      expect(ticketsService.create).not.toHaveBeenCalled();
      await expect(ticketsController.create(tickets)).rejects.toThrowError();
    });

    it('should throw an error if the tickets array containing empty objects', async () => {
      const tickets: any = [{}];
      expect(ticketsService.create).not.toHaveBeenCalled();
      await expect(ticketsController.create(tickets)).rejects.toThrowError();
    });

    it('should throw the error thrown by ticketsService', async () => {
      const errorMessage = 'Ticket with this number already exists';
      jest
        .mocked(ticketsService.create)
        .mockRejectedValue(
          new TicketApiItemAlreadyExistsException(errorMessage),
        );
      const tickets = [];
      tickets.push(createTicketDto);
      await expect(ticketsController.create(tickets)).rejects.toThrowError(
        TicketApiItemAlreadyExistsException,
      );
    });
  });
});
