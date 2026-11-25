#!/usr/bin/env node
// Lists the screenshots in static/img/screens and their pixel size, for the <Screen> component.
//
//   npm run screens        (also runs before `npm start` and `npm run build`)
//
// A <Screen id="admin-dashboard"> shows static/img/screens/admin-dashboard.webp (or .png / .jpg) at its real
// aspect ratio when the file is listed here, and its wireframe when it isn't. Knowing the size at build time
// means no 404 probes in the browser and no layout shift while a screenshot loads.
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, extname, basename} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'static/img/screens');
const out = join(root, 'src/components/Screen/manifest.json');
const PREFERENCE = ['.webp', '.png', '.jpg', '.jpeg'];

function size(file) {
  const b = readFileSync(file);
  // PNG: the IHDR chunk follows the 8-byte signature.
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  // WebP: RIFF....WEBP, then a VP8 (lossy), VP8L (lossless) or VP8X (extended) chunk.
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    }
    if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  }
  // JPEG: walk the markers to the first start-of-frame.
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  throw new Error(`Unrecognised image: ${file}`);
}

const manifest = {};
for (const name of readdirSync(dir).sort()) {
  const ext = extname(name).toLowerCase();
  if (!PREFERENCE.includes(ext)) continue;
  const id = basename(name, extname(name));
  const current = manifest[id];
  if (current && PREFERENCE.indexOf(extname(current.src)) <= PREFERENCE.indexOf(ext)) continue;
  const [w, h] = size(join(dir, name));
  manifest[id] = {src: name, w, h};
}

const json = `${JSON.stringify(manifest, null, 2)}\n`;
let previous = '';
try {
  previous = readFileSync(out, 'utf8');
} catch {}
if (json !== previous) writeFileSync(out, json);
console.log(`screens: ${Object.keys(manifest).length} screenshots listed`);
