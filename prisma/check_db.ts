import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const services = await prisma.service.findMany({
    select: { name: true, category: { select: { name: true, slug: true } }, merchant: { select: { name: true, city: true } } }
  });
  console.log('Total services:', services.length);
  console.log(JSON.stringify(services, null, 2));
}

check().finally(() => prisma.$disconnect());
