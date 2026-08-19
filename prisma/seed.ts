import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a default category
  const category = await prisma.serviceCategory.upsert({
    where: { id: 'b06981f6-b12b-4905-be30-d74da4b6906b' },
    update: {},
    create: {
      id: 'b06981f6-b12b-4905-be30-d74da4b6906b',
      name: 'General Service',
      slug: 'general-service',
      description: 'Default category',
      iconUrl: 'default'
    }
  });

  // Create Hotel Category
  const hotelCategory = await prisma.serviceCategory.upsert({
    where: { id: '712cb562-7f6a-4fea-9145-00c6da59ebc3' },
    update: {},
    create: {
      id: '712cb562-7f6a-4fea-9145-00c6da59ebc3',
      name: 'Hotel Booking',
      slug: 'hotels',
      description: 'Hotels and Accommodations',
      iconUrl: 'hotel'
    }
  });

  // Create mock merchants with static UUIDs for Business App logins
  const m1 = await prisma.merchant.upsert({
    where: { id: '11111111-1111-4111-a111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-4111-a111-111111111111',
      ownerId: '00000000-0000-0000-0000-000000000000',
      name: 'Grand Hotel',
      slug: 'grand-hotel-h101',
      description: 'H101 Mock Merchant',
      email: 'h101@bnxmail.com',
      phone: '1234567891',
      address: 'Main Road',
      city: 'Chennai',
      state: 'TN',
      postalCode: '600001',
      latitude: 13.0827,
      longitude: 80.2707,
    }
  });

  const m2 = await prisma.merchant.upsert({
    where: { id: '22222222-2222-4222-a222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-4222-a222-222222222222',
      ownerId: '00000000-0000-0000-0000-000000000000',
      name: 'Arena 5 Turf',
      slug: 'arena-5-turf-t102',
      description: 'T102 Mock Merchant',
      email: 't102@bnxmail.com',
      phone: '1234567892',
      address: 'Main Road',
      city: 'Chennai',
      state: 'TN',
      postalCode: '600001',
      latitude: 13.0827,
      longitude: 80.2707,
    }
  });

  const m3 = await prisma.merchant.upsert({
    where: { id: '33333333-3333-4333-a333-333333333333' },
    update: {},
    create: {
      id: '33333333-3333-4333-a333-333333333333',
      ownerId: '00000000-0000-0000-0000-000000000000',
      name: 'Blue Wave Pool',
      slug: 'blue-wave-pool-t107',
      description: 'T107 Mock Merchant',
      email: 't107@bnxmail.com',
      phone: '1234567893',
      address: 'Main Road',
      city: 'Chennai',
      state: 'TN',
      postalCode: '600001',
      latitude: 13.0827,
      longitude: 80.2707,
    }
  });

  const m4 = await prisma.merchant.upsert({
    where: { id: '44444444-4444-4444-a444-444444444444' },
    update: {},
    create: {
      id: '44444444-4444-4444-a444-444444444444',
      ownerId: '00000000-0000-0000-0000-000000000000',
      name: 'The Grand temple Dine',
      slug: 'grand-temple-dine-r101',
      description: 'R101 Mock Merchant',
      email: 'r101@bnxmail.com',
      phone: '1234567894',
      address: 'Main Road',
      city: 'Madurai',
      state: 'TN',
      postalCode: '625001',
      latitude: 9.9252,
      longitude: 78.1198,
    }
  });

  console.log('--- SEED DATA ---');
  console.log('categoryId:', category.id);
  console.log('merchants:', [m1.id, m2.id, m3.id, m4.id]);
}

main().catch(console.error).finally(() => prisma.$disconnect());
