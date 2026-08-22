const { PrismaClient } = require('@prisma/client');
const prismaProd = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' } } });
const prismaDev = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.pdatdypajljkjcmwkgei:BTC003c%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1' } } });

async function check() {
  const prod = await prismaProd.service.findMany({ include: { category: true } });
  console.log('PROD:', prod.map(x => ({ id: x.id, name: x.name, cat: x.category?.name })));
  
  const dev = await prismaDev.service.findMany({ include: { category: true } });
  console.log('DEV:', dev.map(x => ({ id: x.id, name: x.name, cat: x.category?.name })));
  
  await prismaProd.$disconnect();
  await prismaDev.$disconnect();
}
check();
