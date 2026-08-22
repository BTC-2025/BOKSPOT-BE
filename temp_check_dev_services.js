const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const cat = await prisma.serviceCategory.findFirst({ where: { slug: 'hotels' } });
  if (!cat) {
    console.log('No hotels category found');
    return;
  }
  const services = await prisma.service.findMany({ 
    where: { categoryId: cat.id },
    include: { merchant: true }
  });
  console.log(`Found ${services.length} services for hotels in DEV DB:`);
  console.dir(services, { depth: null });
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
