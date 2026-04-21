// Generates a 32x32 monochrome noise PNG used by the ELITE chance-badge gradient.
// Run with: node scripts/generate-noise.js
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const SIZE = 32;
const SEED = 42;

// Small deterministic PRNG so the texture is reproducible on regeneration.
let seed = SEED;
function rand() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0xffffffff;
}

const png = new PNG({ width: SIZE, height: SIZE });
for (let i = 0; i < png.data.length; i += 4) {
  const v = Math.floor(rand() * 256);
  png.data[i] = v;
  png.data[i + 1] = v;
  png.data[i + 2] = v;
  png.data[i + 3] = 255;
}

const outPath = path.join(__dirname, '..', 'assets', 'textures', 'noise.png');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
png.pack().pipe(fs.createWriteStream(outPath)).on('finish', () => {
  console.log(`Wrote ${outPath}`);
});
