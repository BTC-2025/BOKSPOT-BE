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
      }
    });
    console.log(JSON.stringify(services.map(s => ({
      name: s.name,
      categorySlug: s.category?.slug,
    })), null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkProdDB();
