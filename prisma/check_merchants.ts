import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1" } } });
async function check() {
  const merchants = await prisma.merchant.findMany();
  console.log("MERCHANTS:");
  console.log(JSON.stringify(merchants.map(m => ({ id: m.id, name: m.name, lat: m.latitude, lng: m.longitude })), null, 2));
  const services = await prisma.service.findMany({ include: { category: true } });
  console.log("SERVICES:");
  console.log(JSON.stringify(services.map(s => ({ id: s.id, name: s.name, merchantId: s.merchantId, categorySlug: s.category?.slug })), null, 2));
}
check().finally(() => prisma.$disconnect());
