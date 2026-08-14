import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
    }
  }
});

async function wipeProdDB() {
  console.log("Connecting to PROD database to wipe old data...");
  try {
    const deletedServices = await prisma.service.deleteMany({});
    console.log(`Deleted ${deletedServices.count} services.`);

    const deletedCategories = await prisma.serviceCategory.deleteMany({});
    console.log(`Deleted ${deletedCategories.count} categories.`);

    const deletedMerchants = await prisma.merchant.deleteMany({});
    console.log(`Deleted ${deletedMerchants.count} merchants.`);

    console.log("PROD database successfully wiped!");
  } catch (err) {
    console.error("Error wiping PROD database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

wipeProdDB();
