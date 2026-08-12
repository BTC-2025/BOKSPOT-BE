import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a default category
  const category = await prisma.serviceCategory.create({
    data: {
      id: 'b06981f6-b12b-4905-be30-d74da4b6906b',
      name: 'General Service',
      slug: 'general-service',
      description: 'Default category',
      iconUrl: 'default'
    }
  });

  // Create Hotel Category
  const hotelCategory = await prisma.serviceCategory.create({
    data: {
      id: '712cb562-7f6a-4fea-9145-00c6da59ebc3',
      name: 'Hotel Booking',
      slug: 'hotels',
      description: 'Hotels and Accommodations',
      iconUrl: 'hotel'
    }
  });

  // Create a default merchant
  const merchant = await prisma.merchant.create({
    data: {
      id: '2cf63fd7-6710-4ac6-a3fa-8cbda29fdc0e',
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
