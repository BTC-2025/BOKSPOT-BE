const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('Recent services:', services);
}
main().catch(console.error).finally(() => prisma.$disconnect());
