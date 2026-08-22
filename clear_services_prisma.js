const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});

async function main() {
  const result = await prisma.service.deleteMany({});
  console.log(`Deleted ${result.count} services.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
