const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.pdatdypajljkjcmwkgei:BTC003c%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});
async function main() {
  const services = await prisma.service.findMany({});
  console.log('Services count:', services.length);
  console.log(services.map(s => s.name));
}
main().finally(() => prisma.$disconnect());
