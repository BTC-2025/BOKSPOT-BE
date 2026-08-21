const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});

async function main() {
  const result = await prisma.service.updateMany({
    where: { 
      merchantId: '8fb83f4b-62aa-3a5b-3e42-074005378435', // Grand Hotel
      deletedAt: { not: null }
    },
    data: {
      deletedAt: null,
      isActive: true
    }
  });
  console.log(`Restored ${result.count} services for Grand Hotel`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
