import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient(); // This will pick up DATABASE_URL from .env

async function seed() {
  console.log("Seeding to:", process.env.DATABASE_URL);
  const cats = [
    { slug: 'doctor', name: 'Doctor Appointment', sortOrder: 1 },
    { slug: 'salons', name: 'Salon / Spa Appointment', sortOrder: 2 },
    { slug: 'cabs', name: 'Cab / Taxi Booking', sortOrder: 3 },
    { slug: 'dining', name: 'Restaurant Table Reservation', sortOrder: 4 },
    { slug: 'gym-yoga', name: 'Gym / Yoga Slot Booking', sortOrder: 5 },
    { slug: 'football-turf', name: 'Football Turf', sortOrder: 6 }
  ];
  for (const cat of cats) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { slug: cat.slug, name: cat.name, sortOrder: cat.sortOrder, isActive: true }
    });
  }
  console.log("Seeded missing categories to REAL database successfully.");
}
seed().finally(() => prisma.$disconnect());
