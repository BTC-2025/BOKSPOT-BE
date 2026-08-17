import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1" } } });
async function seed() {
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
  console.log("Seeded missing categories successfully.");
}
seed().finally(() => prisma.$disconnect());
