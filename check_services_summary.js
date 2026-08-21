const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const services = await prisma.service.findMany({
    include: { category: true, merchant: true }
  });
  const res = services.map(s => ({
    serviceName: s.name,
    categoryName: s.category.name,
    categoryId: s.categoryId,
    merchantName: s.merchant.name,
    merchantId: s.merchantId
  }));
  console.log(JSON.stringify(res, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
