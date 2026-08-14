import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
    }
  }
});

async function checkProdDB() {
  console.log("Checking PROD database for User's services...");
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true,
        merchant: true
      }
    });
    console.log(JSON.stringify(services.map(s => ({
      id: s.id,
      name: s.name,
      isActive: s.isActive,
      deletedAt: s.deletedAt,
      categorySlug: s.category?.slug,
      merchantCity: s.merchant?.city,
    })), null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkProdDB();
