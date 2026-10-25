const fs = require('fs');

const files = [
  'js/data.js',
  'js/auth.js',
  'js/executive-registry.js',
  'js/app.js'
];

let allGood = true;

for (const f of files) {
  try {
    const code = fs.readFileSync(f, 'utf8');
    // Test parsing
    new Function(code);
    console.log(`[PASS] ${f} syntax is valid!`);
  } catch (err) {
    allGood = false;
    console.error(`[FAIL] ${f} syntax error:`, err.message);
  }
}

if (allGood) {
  console.log('\nAll JavaScript files parsed and validated successfully!');
} else {
  process.exit(1);
}
