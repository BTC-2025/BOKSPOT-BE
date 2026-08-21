const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const deleted = await prisma.service.deleteMany({
    where: {
      name: {
        contains: 'Test Valid'
      }
    }
  });
  console.log('Deleted:', deleted.count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
