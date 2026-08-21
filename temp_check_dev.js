const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:BTC003c%402026@db.pdatdypajljkjcmwkgei.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('Dev DB services:', services);
}
main().catch(console.error).finally(() => prisma.$disconnect());
