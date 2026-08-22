const fs = require('fs');

function fixFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/const isProd = false;/g, `const isProd = process.env.NODE_ENV === 'production' || (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app'));`);
  fs.writeFileSync(path, content);
  console.log('Fixed ' + path);
}

fixFile('../BOKSPOT-BUS-FE/src/lib/store.ts');
fixFile('../BOKSPOT-FE/src/lib/api.ts');
