import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
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
      };

      jest.mocked(ticketsService.create).mockResolvedValue(mockResponse);

      const result = await ticketsController.create(createTicketDto);

      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the request body is empty', async () => {
      //@ts-expect-error
      await expect(ticketsController.create({})).rejects.toThrowError(Error);
      expect(ticketsService.create).not.toHaveBeenCalled();
    });

    it('should throw the error thrown by ticketsService', async () => {
      const errorMessage = 'Ticket with this number already exists';
      jest
        .mocked(ticketsService.create)
        .mockRejectedValue(
          new TicketApiItemAlreadyExistsException(errorMessage),
        );

      await expect(
        ticketsController.create(createTicketDto),
      ).rejects.toThrowError(TicketApiItemAlreadyExistsException);
    });
  });
});
