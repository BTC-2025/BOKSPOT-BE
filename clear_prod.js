const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.deleteMany({})
  .then(() => console.log('Wiped all dummy services'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
