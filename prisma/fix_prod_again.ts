import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Beta-softnet@db.cbcmrjeyzfisjlptmyaf.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
    }
  }
});

async function fixCategoryAgain() {
  console.log("Fixing categories again...");
  try {
    // 1. Find the general-service category
    const generalCat = await prisma.serviceCategory.findUnique({
      where: { slug: 'general-service' }
    });

    if (generalCat) {
      console.log("Found general-service. Renaming it to 'hotels'...");
      
      // Delete the manually created 'hotels' category from earlier to avoid unique constraint error
      await prisma.serviceCategory.deleteMany({
        where: { slug: 'hotels' }
      });

      // Update general-service to hotels
      await prisma.serviceCategory.update({
        where: { id: generalCat.id },
        data: {
          name: "Hotel Booking",
          slug: "hotels"
        }
      });
      console.log("Successfully renamed general-service to hotels.");
    } else {
      console.log("general-service not found. It might already be renamed.");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

fixCategoryAgain();
