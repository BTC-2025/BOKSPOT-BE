import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanServices() {
  console.log("Cleaning only services from database...");
  try {
    const deletedServices = await prisma.service.deleteMany({});
    console.log(`Successfully deleted ${deletedServices.count} services.`);
  } catch (err) {
    console.error("Error wiping services:", err);
  } finally {
    await prisma.$disconnect();
  }
}

cleanServices();
