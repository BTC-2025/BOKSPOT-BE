import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a default category
  const category = await prisma.serviceCategory.create({
    data: {
      name: 'General Service',
      slug: 'general-service',
      description: 'Default category',
      iconUrl: 'default'
    }
  });

  // Create a default merchant
  const merchant = await prisma.merchant.create({
    data: {
      ownerId: '00000000-0000-0000-0000-000000000000',
      name: 'BokSpot Default Merchant',
      slug: 'bokspot-default-merchant',
      description: 'Default merchant for testing',
      email: 'test@merchant.com',
      phone: '1234567890',
      address: 'Test Address',
      city: 'Chennai',
      state: 'TN',
      postalCode: '600001',
      latitude: 13.0827,
      longitude: 80.2707,
    }
  });

  console.log('--- SEED DATA ---');
  console.log('categoryId:', category.id);
  console.log('merchantId:', merchant.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
