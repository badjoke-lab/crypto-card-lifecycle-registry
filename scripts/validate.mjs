import { readFile } from 'node:fs/promises';

const files = [
  'data/programs.json',
  'data/providers.json',
  'data/relations.json',
  'data/events.json',
  'data/evidence.json',
];

for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`${file} must contain a top-level JSON array`);
  }
}

console.log(`Validated ${files.length} canonical JSON files.`);
