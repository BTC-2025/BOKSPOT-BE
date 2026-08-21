const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const merchant = await prisma.merchant.findUnique({
    where: { id: '2cf63fd7-6710-4ac6-a3fa-8cbda29fdc0e' }
  });
  console.log('Merchant:', merchant);
}
main().catch(console.error).finally(() => prisma.$disconnect());
