const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  await prisma.service.updateMany({
    where: { name: 'Delux Hotel Test' },
    data: { deletedAt: new Date(), isActive: false }
  });
  console.log('Deleted test service');
}
main().catch(console.error).finally(() => prisma.$disconnect());
