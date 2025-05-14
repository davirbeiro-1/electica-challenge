import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Seed de passagens
  const tickets = [
    {
      number: 'PAR-LON-001',
      departure: 'Paris Charles de Gaulle Airport',
      seat: '12A',
      details: 'Non-stop flight',
      origin: 'Paris',
      destiny: 'London',
      transportType: 'AIRPLANE',
      transportNumber: 'BA314',
      departureTime: new Date('2024-07-20T14:30:00Z'),
      arriveTime: new Date('2024-07-20T15:50:00Z'),
      userId: 1,
    },
    {
      number: 'BER-ROM-002',
      departure: 'Berlin Hauptbahnhof',
      seat: '6',
      details: 'Train with 2 stops',
      origin: 'Berlin',
      destiny: 'Rome',
      transportType: 'TRAIN',
      transportNumber: 'IC244',
      departureTime: new Date('2024-07-21T09:00:00Z'),
      arriveTime: new Date('2024-07-22T19:00:00Z'),
      userId: 1,
    },
    {
      number: 'AMS-BAR-003',
      departure: 'Amsterdam Centraal Station',
      seat: 'Bus 24',
      details: 'Long journey, comfortable seats',
      origin: 'Amsterdam',
      destiny: 'Barcelona',
      transportType: 'BUS',
      transportNumber: 'FLX123',
      departureTime: new Date('2024-07-22T06:00:00Z'),
      arriveTime: new Date('2024-07-23T18:00:00Z'),
      userId: 1,
    },
    {
      number: 'MAD-LIS-004',
      departure: 'Madrid Barajas Airport',
      seat: '2B',
      details: 'Express flight',
      origin: 'Madrid',
      destiny: 'Lisbon',
      transportType: 'AIRPLANE',
      transportNumber: 'IB372',
      departureTime: new Date('2024-07-23T11:00:00Z'),
      arriveTime: new Date('2024-07-23T12:30:00Z'),
      userId: 1,
    },
    {
      number: 'VIE-BUD-005',
      departure: 'Vienna Hauptbahnhof',
      seat: '14',
      details: 'Scenic train ride',
      origin: 'Vienna',
      destiny: 'Budapest',
      transportType: 'TRAIN',
      transportNumber: 'RJ62',
      departureTime: new Date('2024-07-24T15:00:00Z'),
      arriveTime: new Date('2024-07-24T17:45:00Z'),
      userId: 1,
    },
    {
      number: 'BRU-PAR-006',
      departure: 'Brussels Central Station',
      seat: '8',
      details: 'High-speed train',
      origin: 'Brussels',
      destiny: 'Paris',
      transportType: 'TRAIN',
      transportNumber: 'TH9412',
      departureTime: new Date('2024-07-25T10:30:00Z'),
      arriveTime: new Date('2024-07-25T12:00:00Z'),
      userId: 1,
    },
    {
      number: 'CPH-STO-007',
      departure: 'Copenhagen Airport',
      seat: '9F',
      details: 'Direct flight',
      origin: 'Copenhagen',
      destiny: 'Stockholm',
      transportType: 'AIRPLANE',
      transportNumber: 'SK104',
      departureTime: new Date('2024-07-26T08:00:00Z'),
      arriveTime: new Date('2024-07-26T09:15:00Z'),
      userId: 1,
    },
    {
      number: 'DUB-LON-008',
      departure: 'Dublin Airport',
      seat: '5D',
      details: 'Morning flight',
      origin: 'Dublin',
      destiny: 'London',
      transportType: 'AIRPLANE',
      transportNumber: 'EI328',
      departureTime: new Date('2024-07-27T07:30:00Z'),
      arriveTime: new Date('2024-07-27T08:50:00Z'),
      userId: 1,
    },
    {
      number: 'ATH-IST-009',
      departure: 'Athens International Airport',
      seat: '21C',
      details: 'Connecting flight',
      origin: 'Athens',
      destiny: 'Istanbul',
      transportType: 'AIRPLANE',
      transportNumber: 'TK1880',
      departureTime: new Date('2024-07-28T12:00:00Z'),
      arriveTime: new Date('2024-07-28T14:30:00Z'),
      userId: 1,
    },
    {
      number: 'PRG-BER-010',
      departure: 'Prague Hlavní nádraží',
      seat: '3',
      details: 'Overnight train',
      origin: 'Prague',
      destiny: 'Berlin',
      transportType: 'TRAIN',
      transportNumber: 'EN457',
      departureTime: new Date('2024-07-29T22:00:00Z'),
      arriveTime: new Date('2024-07-30T06:00:00Z'),
      userId: 1,
    },
  ];

  for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
