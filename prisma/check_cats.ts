import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1" } } });
async function check() {
  const cats = await prisma.serviceCategory.findMany();
  console.log("CATEGORIES:");
  console.log(JSON.stringify(cats.map(c => ({ id: c.id, slug: c.slug, name: c.name })), null, 2));
}
check().finally(() => prisma.$disconnect());
