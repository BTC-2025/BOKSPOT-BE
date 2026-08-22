const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.cbcmrjeyzfisjlptmyaf:Beta-softnet@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require'
});

client.connect()
  .then(() => client.query('DELETE FROM services'))
  .then(res => {
    console.log(`Deleted ${res.rowCount} services.`);
    client.end();
  })
  .catch(err => {
    console.error(err);
    client.end();
  });
