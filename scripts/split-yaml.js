/**
 * split-yaml.js
 * Split projects.yaml and publications.yaml into year-range files.
 * Groups by end-year (projects) or publication year.
 * Ongoing projects use start year.
 *
 * Usage: node scripts/split-yaml.js
 */

const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'portfolio.json'), 'utf8')
);

// Supplement empty basic data
if (!data.basic.titles || data.basic.titles.length === 0) {
  data.basic = {
    name: 'Jehun Lee', nameKr: '\uc774\uc81c\ud6c8',
    titles: ['Industrial & Systems Engineer (Ph.D.)', 'Simulation Solution Consultant', 'AI Solution Architect'],
    email: ['jehun.lee302@gmail.com', 'jehun.lee@vms-solutions.com', 'jehun.lee@kaist.ac.kr'],
    website: 'jehun-lee.work', location: 'Yongin, Gyeonggi-do, South Korea',
    googleSite: 'https://sites.google.com/view/jehun-lee',
  };
}

const CAREER = path.join(__dirname, '..', 'data', 'career');

// ── Helpers ───────────────────────────────────────────────
function q(s) {
  if (s === undefined || s === null || s === '') return '""';
  s = String(s);
  if (/[:#\[\]{}|>&*!?'"\\`@%\n]/.test(s) || s.startsWith('-') || s.startsWith(' ') || s.endsWith(' ') || s.match(/^\d/)) {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }
  return s;
}

function isKorean(s) { return /[\uac00-\ud7af\u3130-\u318f]/.test(s); }

function getEndYear(period) {
  const parts = (period || '').split('-').map(s => s.trim());
  if (parts.length >= 2 && parts[1] && parts[1] !== '') {
    return parseInt(parts[1]);
  }
  return parseInt(parts[0]); // ongoing: use start year
}

function write(name, content) {
  fs.writeFileSync(path.join(CAREER, name), content, 'utf8');
  console.log(`  -> ${name}`);
}

// ── Project year ranges ───────────────────────────────────
const PROJECT_RANGES = [
  { label: '2024-2025', min: 2024, max: 2025 },
  { label: '2022-2023', min: 2022, max: 2023 },
  { label: '2020-2021', min: 2020, max: 2021 },
  { label: '2017-2019', min: 2017, max: 2019 },
];

function formatProject(p) {
  let y = `- index: ${p.index}\n`;
  y += `  period: ${q(p.period)}\n`;
  y += `  duration: ${q(p.duration)}\n`;
  y += `  title:\n    en: ${q(p.title)}\n    ko: ""\n`;
  y += `  client: ${q(p.client)}\n`;
  if (p.partnerInstitution) {
    y += `  partner_institution: ${q(p.partnerInstitution)}\n`;
  }
  y += `  affiliated_institution: ${q(p.affiliatedInstitution)}\n`;
  y += `  is_pm: ${p.isPM}\n`;
  const rk = p.remarks || '';
  if (isKorean(rk)) {
    y += `  remarks:\n    en: ""\n    ko: ${q(rk)}\n`;
  } else {
    y += `  remarks:\n    en: ${q(rk)}\n    ko: ""\n`;
  }
  return y;
}

function genProjects() {
  console.log('\nProjects:');
  for (const range of PROJECT_RANGES) {
    const items = data.projects.filter(p => {
      const ey = getEndYear(p.period);
      return ey >= range.min && ey <= range.max;
    });
    if (items.length === 0) continue;

    let y = `# Projects ${range.label} (newest first, by end year)\n`;
    y += `# ${items.length} projects\n\n`;
    for (const p of items) {
      y += formatProject(p) + '\n';
    }
    write(`projects-${range.label}.yaml`, y);
  }

  // Remove old single file
  const old = path.join(CAREER, 'projects.yaml');
  if (fs.existsSync(old)) {
    fs.unlinkSync(old);
    console.log('  (removed old projects.yaml)');
  }
}

// ── Publication year ranges ───────────────────────────────
const PUB_RANGES = [
  { label: '2023-2024', min: 2023, max: 2024 },
  { label: '2021-2022', min: 2021, max: 2022 },
  { label: '2019-2020', min: 2019, max: 2020 },
  { label: '2017-2018', min: 2017, max: 2018 },
];

function formatPublication(p) {
  let y = `- index: ${p.index}\n`;
  y += `  year: ${p.year}\n`;
  y += `  type: ${q(p.type)}\n`;
  y += `  global: ${p.global}\n`;
  y += `  role: ${q(p.role)}\n`;
  y += `  authors: ${q(p.authors)}\n`;
  y += `  title: ${q(p.title.replace(/,\s*$/, ''))}\n`;
  y += `  venue: ${q(p.venue)}\n`;
  y += `  full_citation: ${q(p.fullCitation)}\n`;
  if (p.link) y += `  link: ${q(p.link)}\n`;
  if (p.remarks) y += `  remarks: ${q(p.remarks)}\n`;
  return y;
}

function genPublications() {
  console.log('\nPublications:');
  for (const range of PUB_RANGES) {
    const items = data.publications.filter(p => p.year >= range.min && p.year <= range.max);
    if (items.length === 0) continue;

    let y = `# Publications ${range.label} (newest first)\n`;
    y += `# Citations are in English (academic standard)\n`;
    y += `# ${items.length} publications\n\n`;
    for (const p of items) {
      y += formatPublication(p) + '\n';
    }
    write(`publications-${range.label}.yaml`, y);
  }

  // Remove old single file
  const old = path.join(CAREER, 'publications.yaml');
  if (fs.existsSync(old)) {
    fs.unlinkSync(old);
    console.log('  (removed old publications.yaml)');
  }
}

// ── Run ───────────────────────────────────────────────────
console.log('Splitting projects & publications by year range...');
genProjects();
genPublications();
console.log('\nDone!');
