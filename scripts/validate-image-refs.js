const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(tsx?|css|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const refs = [];
const imgRegex = /\/images\/[^\s"'`;)]+/g;
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = imgRegex.exec(text)) !== null) {
    // Skip dynamic template-literal paths (e.g. `/images/${dir}/${f}.png`); they resolve at runtime.
    if (m[0].includes('${')) continue;
    refs.push({ file: path.relative(root, file), url: m[0] });
  }
}

const missing = [];
for (const r of refs) {
  const rel = r.url.replace(/^\//, '');
  const abs = path.join(publicDir, rel);
  if (!fs.existsSync(abs)) {
    missing.push(r);
  }
}

console.log(`Scanned ${refs.length} /images/ references in src/`);
if (missing.length) {
  console.log(`Missing: ${missing.length}`);
  for (const m of missing) {
    console.log(`  ${m.url} (in ${m.file})`);
  }
  process.exit(1);
} else {
  console.log('Missing: 0');
  process.exit(0);
}
