const { PrismaClient } = require('@prisma/client');
const prismaProd = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' } } });

async function check() {
  const m = await prismaProd.merchant.findUnique({ where: { id: '8fb83f4b-62aa-3a5b-3e42-074005378435' } });
  console.log('Merchant:', m);
  const s = await prismaProd.service.findMany({ where: { merchantId: '8fb83f4b-62aa-3a5b-3e42-074005378435' } });
  console.log('Services:', s.map(x => x.name));
  await prismaProd.$disconnect();
}
check();
