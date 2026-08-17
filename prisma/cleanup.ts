import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:BTC003c%402026@db.pdatdypajljkjcmwkgei.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1" } } });
async function cleanup() {
  const deleted = await prisma.service.deleteMany({
    where: {
      category: { slug: 'hotels' },
      name: { in: ['cardio', 'Cardio', 'Orthopedics', 'Cardiology'] }
    }
  });
  console.log(`Deleted ${deleted.count} old buggy services from hotels category.`);
}
cleanup().finally(() => prisma.$disconnect());
