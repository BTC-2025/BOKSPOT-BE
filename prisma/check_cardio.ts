import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:BTC003c%402026@db.pdatdypajljkjcmwkgei.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1" } } });
async function check() {
  const services = await prisma.service.findMany({ include: { category: true } });
  console.log(JSON.stringify(services.map(s => ({ name: s.name, categorySlug: s.category?.slug })), null, 2));
}
check().finally(() => prisma.$disconnect());
