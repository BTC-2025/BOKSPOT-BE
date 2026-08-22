const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const cats = await prisma.serviceCategory.findMany();
  console.log('DEV Categories:', cats.map(c => c.name));
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
