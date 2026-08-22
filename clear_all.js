const { PrismaClient } = require('@prisma/client');

async function clearDb() {
  // Production DB
  const prismaProd = new PrismaClient({
    datasources: {
      db: { url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' }
    }
  });
  
  // Dev DB
  const prismaDev = new PrismaClient({
    datasources: {
      db: { url: 'postgresql://postgres.pdatdypajljkjcmwkgei:BTC003c%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1' }
    }
  });

  console.log('Clearing old services from Prod DB...');
  await prismaProd.service.deleteMany({});
  console.log('Cleared Prod DB.');

  console.log('Clearing old services from Dev DB...');
  await prismaDev.service.deleteMany({});
  console.log('Cleared Dev DB.');

  await prismaProd.$disconnect();
  await prismaDev.$disconnect();
}

clearDb().catch(e => console.error(e));
