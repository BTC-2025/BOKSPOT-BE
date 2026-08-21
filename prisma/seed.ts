import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

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

  const categories = [
    {
      id: 'ea276d3a-e1a3-0042-2acd-31920fbebc7b',
      name: 'Flight Booking',
      slug: 'flights',
      description: 'Flight Booking',
      iconUrl: 'default'
    },
    {
      id: '5083eaa1-a1bd-a322-18b4-c23801e458cf',
      name: 'Train Booking',
      slug: 'trains',
      description: 'Train Booking',
      iconUrl: 'default'
    },
    {
      id: 'aa978f03-e9e0-d336-042e-8812d607b044',
      name: 'Bus Booking',
      slug: 'buses',
      description: 'Bus Booking',
      iconUrl: 'default'
    },
    {
      id: '46171b07-7997-b166-bb30-cf5494eff2f8',
      name: 'Ferry / Boat Booking',
      slug: 'ferry',
      description: 'Ferry / Boat Booking',
      iconUrl: 'default'
    },
    {
      id: '0c2f2983-0171-ed3d-3e20-1cfdbac8185e',
      name: 'Shuttle / Van Booking',
      slug: 'shuttle',
      description: 'Shuttle / Van Booking',
      iconUrl: 'default'
    },
    {
      id: 'e29e13ac-702a-77bc-d28a-4463a211eba4',
      name: 'Helicopter Booking',
      slug: 'helicopter',
      description: 'Helicopter Booking',
      iconUrl: 'default'
    },
    {
      id: 'a2c16ec6-ff87-a69e-522e-2288235dcdde',
      name: 'Cab / Taxi Booking',
      slug: 'cabs',
      description: 'Cab / Taxi Booking',
      iconUrl: 'default'
    },
    {
      id: '495a04ca-cf7a-e126-8266-cebfc2a70eba',
      name: 'Bike Rental',
      slug: 'bike-rental',
      description: 'Bike Rental',
      iconUrl: 'default'
    },
    {
      id: '9609db6b-483c-274e-1fd3-b7c14bda0b6f',
      name: 'Self-Drive Car Rental',
      slug: 'car-rental',
      description: 'Self-Drive Car Rental',
      iconUrl: 'default'
    },
    {
      id: '4049cf76-aecd-83e0-75d7-b9c12d082625',
      name: 'Hotel Booking',
      slug: 'hotels',
      description: 'Hotel Booking',
      iconUrl: 'default'
    },
    {
      id: 'a6c7ef8d-98b4-286f-feea-ad012cd3dfcb',
      name: 'Resort Booking',
      slug: 'resorts',
      description: 'Resort Booking',
      iconUrl: 'default'
    },
    {
      id: '00c79f9e-4b7b-15e3-08de-e09215cc0427',
      name: 'Homestay / Villa',
      slug: 'villas',
      description: 'Homestay / Villa',
      iconUrl: 'default'
    },
    {
      id: 'ab4b19d7-b454-0012-1685-9ffc34f2fdf3',
      name: 'Hostel Booking',
      slug: 'hostels',
      description: 'Hostel Booking',
      iconUrl: 'default'
    },
    {
      id: '38df36a4-1823-ce7a-fca5-78d3189dbd8f',
      name: 'Camping Booking',
      slug: 'camping',
      description: 'Camping Booking',
      iconUrl: 'default'
    },
    {
      id: '55ba44c5-48d3-ebaf-d9f7-0e64a7f232b0',
      name: 'Cinema / Movie Tickets',
      slug: 'movies',
      description: 'Cinema / Movie Tickets',
      iconUrl: 'default'
    },
    {
      id: 'a0ff692d-b630-abb3-0c9e-b40adc3d205a',
      name: 'Theatre Shows',
      slug: 'theatre',
      description: 'Theatre Shows',
      iconUrl: 'default'
    },
    {
      id: 'bcdd174a-b93e-cda9-d0bc-0735cd2ca820',
      name: 'Concert Tickets',
      slug: 'concerts',
      description: 'Concert Tickets',
      iconUrl: 'default'
    },
    {
      id: '16908b06-05f2-645d-fcb4-c3a8d248cef3',
      name: 'Events & Festivals',
      slug: 'events',
      description: 'Events & Festivals',
      iconUrl: 'default'
    },
    {
      id: '80c83028-af7e-6502-e06d-c2b1ced51ad0',
      name: 'Exhibition Entry',
      slug: 'exhibitions',
      description: 'Exhibition Entry',
      iconUrl: 'default'
    },
    {
      id: '16115e85-e24c-e3a0-ea38-925e4adcddfd',
      name: 'Workshops / Classes',
      slug: 'workshops',
      description: 'Workshops / Classes',
      iconUrl: 'default'
    },
    {
      id: '967ef2eb-3463-4ba4-18db-94dab610ba6f',
      name: 'Gaming Arena Booking',
      slug: 'gaming',
      description: 'Gaming Arena Booking',
      iconUrl: 'default'
    },
    {
      id: 'a79b9965-42a1-e418-571c-05dde37d8982',
      name: 'Football Turf',
      slug: 'football-turf',
      description: 'Football Turf',
      iconUrl: 'default'
    },
    {
      id: '5e2b326a-1ecd-d017-36b0-818452e5719d',
      name: 'Cricket Ground',
      slug: 'cricket-ground',
      description: 'Cricket Ground',
      iconUrl: 'default'
    },
    {
      id: '019b0b27-113b-c3d1-9095-8a6b7cf2c177',
      name: 'Badminton Court',
      slug: 'badminton',
      description: 'Badminton Court',
      iconUrl: 'default'
    },
    {
      id: '1fbfb233-51e3-5806-5139-5ab721f5e935',
      name: 'Tennis Court',
      slug: 'tennis',
      description: 'Tennis Court',
      iconUrl: 'default'
    },
    {
      id: 'd0199f51-d272-8db6-0119-45145a1b607a',
      name: 'Basketball Court',
      slug: 'basketball',
      description: 'Basketball Court',
      iconUrl: 'default'
    },
    {
      id: 'f853b10a-f73a-04a4-c8b3-5b2ade1f40b9',
      name: 'Swimming Pool Slots',
      slug: 'swimming',
      description: 'Swimming Pool Slots',
      iconUrl: 'default'
    },
    {
      id: '8cc9085b-41a7-34e4-1070-3b6701a5638b',
      name: 'Indoor Play Arena',
      slug: 'play-arena',
      description: 'Indoor Play Arena',
      iconUrl: 'default'
    },
    {
      id: '170b916e-bc4c-b45a-5b3c-cd1427b5b88f',
      name: 'Restaurant Table Reservation',
      slug: 'dining',
      description: 'Restaurant Table Reservation',
      iconUrl: 'default'
    },
    {
      id: '71f5df50-6205-527f-72f0-5e3721322d5e',
      name: 'Salon / Spa Appointment',
      slug: 'salons',
      description: 'Salon / Spa Appointment',
      iconUrl: 'default'
    },
    {
      id: 'b94e3e45-f084-32e5-28ee-315699159261',
      name: 'Gym / Yoga Slot Booking',
      slug: 'gym-yoga',
      description: 'Gym / Yoga Slot Booking',
      iconUrl: 'default'
    },
    {
      id: 'f9f16d97-c90d-8c6f-2cab-37bb6d1f1992',
      name: 'Doctor Appointment',
      slug: 'doctor',
      description: 'Doctor Appointment',
      iconUrl: 'default'
    },
    {
      id: 'f122aeec-44e4-63ae-344f-1ddacb93d265',
      name: 'Electrician Booking',
      slug: 'electrician',
      description: 'Electrician Booking',
      iconUrl: 'default'
    },
    {
      id: '74d3077c-3d99-86a8-a6b4-8dc557e1fcc4',
      name: 'Plumber Booking',
      slug: 'plumber',
      description: 'Plumber Booking',
      iconUrl: 'default'
    },
    {
      id: '4c85b362-5c95-b8bf-313d-47934599eef5',
      name: 'Cleaning Service',
      slug: 'cleaning',
      description: 'Cleaning Service',
      iconUrl: 'default'
    },
    {
      id: 'eb919176-ebac-2099-dd02-6ec41524b707',
      name: 'Technician Service',
      slug: 'technician',
      description: 'Technician Service',
      iconUrl: 'default'
    },
    {
      id: 'c9446345-50c6-98fe-bdd9-c868db908d9d',
      name: 'Studio Booking',
      slug: 'studio',
      description: 'Studio Booking',
      iconUrl: 'default'
    },
    {
      id: '46846da4-f251-d1d0-8437-3dfdeb7dd38b',
      name: 'Co-working Space',
      slug: 'coworking',
      description: 'Co-working Space',
      iconUrl: 'default'
    },
    {
      id: '74b34896-ed83-0bf9-0b43-18367255dc5f',
      name: 'Meeting Room',
      slug: 'meeting-room',
      description: 'Meeting Room',
      iconUrl: 'default'
    },
    {
      id: 'ac9cef76-5e0d-bf0b-da62-5b3d1d3b446d',
      name: 'Podcast Studio',
      slug: 'podcast',
      description: 'Podcast Studio',
      iconUrl: 'default'
    },
    {
      id: 'ab3049da-9a0c-d8d6-e8b7-c62586752472',
      name: 'Conference Hall',
      slug: 'conference',
      description: 'Conference Hall',
      iconUrl: 'default'
    },
    {
      id: 'c185ddac-8b5a-8f5a-a23c-5b80bc12d214',
      name: 'Training Sessions',
      slug: 'training',
      description: 'Training Sessions',
      iconUrl: 'default'
    },
    {
      id: '406f84c0-877f-9574-a529-5bb8f4d0ee6f',
      name: 'Temple Darshan Booking',
      slug: 'darshan',
      description: 'Temple Darshan Booking',
      iconUrl: 'default'
    },
    {
      id: '9cbb6aeb-cf5a-e14a-9248-b4c08165212e',
      name: 'Pooja Slot Booking',
      slug: 'pooja',
      description: 'Pooja Slot Booking',
      iconUrl: 'default'
    },
    {
      id: '829289d7-f74e-9911-a716-7677c2d76c63',
      name: 'Pilgrimage Packages',
      slug: 'pilgrimage',
      description: 'Pilgrimage Packages',
      iconUrl: 'default'
    },
    {
      id: '620a1c64-27d7-7c52-0dd5-4466274fe7b0',
      name: 'Cycle Rental',
      slug: 'cycle-rental',
      description: 'Cycle Rental',
      iconUrl: 'default'
    },
    {
      id: 'fa8d9340-f303-2059-a345-863c67fe4441',
      name: 'Sports Bike Rental',
      slug: 'sports-bike',
      description: 'Sports Bike Rental',
      iconUrl: 'default'
    },
    {
      id: 'dd6d2dcc-679d-12b9-430a-9787bab45b33',
      name: 'Camera Rental',
      slug: 'camera',
      description: 'Camera Rental',
      iconUrl: 'default'
    },
    {
      id: '6aee8642-8ff8-3491-ee7e-9767c8d5fdcc',
      name: 'Sound System Rental',
      slug: 'sound-system',
      description: 'Sound System Rental',
      iconUrl: 'default'
    },
    {
      id: '311f732d-934c-8816-b3de-8f1746efbe58',
      name: 'Event Equipment Rental',
      slug: 'event-equip',
      description: 'Event Equipment Rental',
      iconUrl: 'default'
    },
    {
      id: '5e894e46-e356-66ba-1c6f-98b9149a5218',
      name: 'Pet Grooming Appointment',
      slug: 'pet-grooming',
      description: 'Pet Grooming Appointment',
      iconUrl: 'default'
    },
    {
      id: 'fd246981-2a89-2583-cd40-b7fd64b38761',
      name: 'Babysitting Service',
      slug: 'babysitting',
      description: 'Babysitting Service',
      iconUrl: 'default'
    },
    {
      id: '5cf541aa-e646-736f-e855-5f60bd9fb248',
      name: 'Elder Care Service',
      slug: 'elder-care',
      description: 'Elder Care Service',
      iconUrl: 'default'
    },
    {
      id: 'a4985d56-e804-1f20-fffc-2f8a091be68b',
      name: 'Event Organizer Booking',
      slug: 'event-organizer',
      description: 'Event Organizer Booking',
      iconUrl: 'default'
    },
  ];

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }

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
