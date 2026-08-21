const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const category = await prisma.serviceCategory.findUnique({
    where: { id: 'b06981f6-b12b-4905-be30-d74da4b6906b' }
  });
  console.log('Category b06981f6:', category);
}
main().catch(console.error).finally(() => prisma.$disconnect());
