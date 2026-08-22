const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' } } });
prisma.service.findMany({ include: { category: true } }).then(s => console.log(s.map(x => ({ id: x.id, name: x.name, cat: x.category.name })))).finally(() => prisma.$disconnect());
