const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.merchant.findMany({ select: { id: true, name: true } })
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
