const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.$queryRawUnsafe("SELECT column_name FROM information_schema.columns WHERE table_name = 'services'")
  .then(res => {
    console.log(res);
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
