// Checks that built JSON, index.html meta and YAML flags agree with the counts computed from data/career/*.yaml.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { countCareer } = require('./counts');

const ROOT = path.join(__dirname, '..');
const CAREER = path.join(ROOT, 'data', 'career');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const loadAll = prefix => fs.readdirSync(CAREER)
  .filter(f => f.startsWith(prefix) && f.endsWith('.yaml'))
  .flatMap(f => yaml.load(fs.readFileSync(path.join(CAREER, f), 'utf8')) || []);
const loadOne = f => yaml.load(fs.readFileSync(path.join(CAREER, f), 'utf8')) || [];

const pubs = loadAll('publications-');
const counts = countCareer({
  projects: loadAll('projects-'), pubs, patents: loadOne('patents.yaml'),
});

for (const p of pubs) {
  if (/Korea(n)? (CDE|Institute)/.test(p.venue || '')) assert(!p.global, `Domestic venue marked global: ${p.title}`);
}

for (const lang of ['en', 'ko']) {
  const built = JSON.parse(read(`data/portfolio.${lang}.json`));
  assert.deepStrictEqual(built.counts, counts, `data/portfolio.${lang}.json is stale; rebuild it`);
  assert(!/\{\w+\}/.test(built.basic.summary), `Unfilled placeholder in ${lang} summary`);
}

const meta = read('index.html').match(/(\d+) projects \(PM (\d+)\)/);
assert(meta, 'index.html meta description lost its "N projects (PM M)" text');
assert.deepStrictEqual([+meta[1], +meta[2]], [counts.projects, counts.pm], 'index.html meta counts differ from data');

console.log('check-data: ok', counts);
