const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.pdatdypajljkjcmwkgei:BTC003c%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const cats = await prisma.serviceCategory.findMany({});
  console.log('Categories:', cats.map(c => ({ name: c.name, id: c.id })));
}
main().finally(() => prisma.$disconnect());
