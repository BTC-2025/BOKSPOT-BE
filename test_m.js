const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' } } });
prisma.merchant.findUnique({ where: { id: '8fb83f4b-62aa-3a5b-3e42-074005378435' } }).then(m => console.log(m)).finally(() => prisma.$disconnect());
