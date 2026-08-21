const categories = {
  flights: 'Flight Booking', trains: 'Train Booking', buses: 'Bus Booking', ferry: 'Ferry / Boat Booking', shuttle: 'Shuttle / Van Booking', helicopter: 'Helicopter Booking', cabs: 'Cab / Taxi Booking', 'bike-rental': 'Bike Rental', 'car-rental': 'Self-Drive Car Rental',
  hotels: 'Hotel Booking', resorts: 'Resort Booking', villas: 'Homestay / Villa', hostels: 'Hostel Booking', camping: 'Camping Booking',
  movies: 'Cinema / Movie Tickets', theatre: 'Theatre Shows', concerts: 'Concert Tickets', events: 'Events & Festivals', exhibitions: 'Exhibition Entry', workshops: 'Workshops / Classes', gaming: 'Gaming Arena Booking',
  'football-turf': 'Football Turf', 'cricket-ground': 'Cricket Ground', badminton: 'Badminton Court', tennis: 'Tennis Court', basketball: 'Basketball Court', swimming: 'Swimming Pool Slots', 'play-arena': 'Indoor Play Arena',
  dining: 'Restaurant Table Reservation', salons: 'Salon / Spa Appointment', 'gym-yoga': 'Gym / Yoga Slot Booking', doctor: 'Doctor Appointment', electrician: 'Electrician Booking', plumber: 'Plumber Booking', cleaning: 'Cleaning Service', technician: 'Technician Service', studio: 'Studio Booking',
  coworking: 'Co-working Space', 'meeting-room': 'Meeting Room', podcast: 'Podcast Studio', conference: 'Conference Hall', training: 'Training Sessions',
  darshan: 'Temple Darshan Booking', pooja: 'Pooja Slot Booking', pilgrimage: 'Pilgrimage Packages',
  'cycle-rental': 'Cycle Rental', 'sports-bike': 'Sports Bike Rental', camera: 'Camera Rental', 'sound-system': 'Sound System Rental', 'event-equip': 'Event Equipment Rental',
  'pet-grooming': 'Pet Grooming Appointment', babysitting: 'Babysitting Service', 'elder-care': 'Elder Care Service', 'event-organizer': 'Event Organizer Booking'
};
const fs = require('fs');
const crypto = require('crypto');
let code = `import { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nasync function main() {\n`;
code += `
  // Create a default category
  const generalCategory = await prisma.serviceCategory.upsert({
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

  const categories = [`;

for (let slug in categories) {
  let name = categories[slug];
  let hash = crypto.createHash('md5').update(slug).digest('hex');
  let id = hash.substring(0,8) + '-' + hash.substring(8,12) + '-' + hash.substring(12,16) + '-' + hash.substring(16,20) + '-' + hash.substring(20,32);
  code += `
    {
      id: '${id}',
      name: '${name}',
      slug: '${slug}',
      description: '${name}',
      iconUrl: 'default'
    },`;
}

code += `
  ];

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }
`;

code += `
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

  console.log('--- SEED DATA COMPLETE ---');
}

main().catch(console.error).finally(() => prisma.$disconnect());
`;
fs.writeFileSync('prisma/seed.ts', code);
console.log('Generated seed.ts');
