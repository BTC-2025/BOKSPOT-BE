const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.serviceCategory.findMany({ select: { id: true, name: true, slug: true, parentId: true } })
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
