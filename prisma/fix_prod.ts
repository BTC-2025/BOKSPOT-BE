import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
    }
  }
});

async function fixCategory() {
  console.log("Fixing category in PROD database...");
  try {
    // 1. Create the 'hotels' category if it doesn't exist
    let hotelsCategory = await prisma.serviceCategory.findUnique({
      where: { slug: 'hotels' }
    });

    if (!hotelsCategory) {
      hotelsCategory = await prisma.serviceCategory.create({
        data: {
          name: "Hotel Booking",
          slug: "hotels",
          description: "Hotel bookings category",
        }
      });
      console.log("Created 'hotels' category.");
    }

    // 2. Move all services from 'general-service' to 'hotels'
    const updated = await prisma.service.updateMany({
      where: {
        category: {
          slug: 'general-service'
        }
      },
      data: {
        categoryId: hotelsCategory.id
      }
    });

    console.log(`Moved ${updated.count} services to 'hotels' category.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

fixCategory();
