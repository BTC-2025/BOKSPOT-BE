import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearServices() {
  await prisma.booking.deleteMany({});
  await prisma.bookingSlot.deleteMany({});
  await prisma.availabilityRule.deleteMany({});
  await prisma.service.deleteMany({});
  console.log('All services and bookings have been wiped clean.');
}

clearServices().finally(() => prisma.$disconnect());
