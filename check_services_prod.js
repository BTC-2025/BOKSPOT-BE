const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.findMany({ select: { id: true, name: true, merchantId: true, categoryId: true, merchant: { select: { name: true } }, category: { select: { name: true, slug: true } } } })
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
