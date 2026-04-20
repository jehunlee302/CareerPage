/**
 * json-to-yaml.js
 * One-time conversion: portfolio.json -> data/career/*.yaml
 * Bilingual (en/ko) structure for multi-format export
 *
 * Usage: node scripts/json-to-yaml.js
 */

const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'portfolio.json'), 'utf8')
);

// Supplement empty basic data (Google Sheet basic tab may be restructured)
if (!data.basic.titles || data.basic.titles.length === 0) {
  data.basic = {
    name: 'Jehun Lee',
    nameKr: '\uc774\uc81c\ud6c8',
    titles: [
      'Industrial & Systems Engineer (Ph.D.)',
      'Simulation Solution Consultant',
      'AI Solution Architect',
    ],
    email: [
      'jehun.lee302@gmail.com',
      'jehun.lee@vms-solutions.com',
      'jehun.lee@kaist.ac.kr',
    ],
    website: 'jehun-lee.work',
    location: 'Yongin, Gyeonggi-do, South Korea',
    googleSite: 'https://sites.google.com/view/jehun-lee',
  };
}

const OUT = path.join(__dirname, '..', 'data', 'career');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ── YAML helpers ──────────────────────────────────────────
function q(s) {
  if (s === undefined || s === null || s === '') return '""';
  s = String(s);
  if (
    /[:#\[\]{}|>&*!?'"\\`@%\n]/.test(s) ||
    s.startsWith('-') ||
    s.startsWith(' ') ||
    s.endsWith(' ') ||
    s.match(/^\d/)
  ) {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }
  return s;
}

function isKorean(s) {
  return /[\uac00-\ud7af\u3130-\u318f]/.test(s);
}

function biField(en, ko) {
  return `en: ${q(en)}\n    ko: ${q(ko || '')}`;
}

function write(name, content) {
  fs.writeFileSync(path.join(OUT, name), content, 'utf8');
  console.log(`  -> ${name}`);
}

// ── basic.yaml ────────────────────────────────────────────
function genBasic() {
  const b = data.basic;
  let y = `# Basic Information\n`;
  y += `# Last synced from Google Sheets: ${data.lastUpdated}\n\n`;
  y += `name:\n  en: ${q(b.name)}\n  ko: ${q(b.nameKr)}\n\n`;
  y += `titles:\n`;
  for (const t of b.titles) {
    y += `  - en: ${q(t)}\n    ko: ""\n`;
  }
  y += `\nemail:\n`;
  for (const e of b.email) {
    y += `  - ${q(e)}\n`;
  }
  y += `\nwebsite: ${q(b.website)}\n`;
  y += `\nlocation:\n  en: ${q(b.location)}\n  ko: "\uACBD\uAE30\uB3C4 \uC6A9\uC778\uC2DC"\n`;
  y += `\ngoogle_site: ${q(b.googleSite)}\n`;
  write('basic.yaml', y);
}

// ── philosophy.yaml ───────────────────────────────────────
function genPhilosophy() {
  const p = data.philosophy;
  const s = data.stats;
  let y = `# Philosophy & Stats\n\n`;
  y += `headline:\n  en: ${q(p.headline)}\n  ko: ""\n\n`;
  y += `lead:\n  en: ${q(p.lead)}\n  ko: ""\n\n`;
  y += `body:\n  en: |\n`;
  for (const line of p.body.split('\n')) {
    y += `    ${line}\n`;
  }
  y += `  ko: ""\n\n`;
  y += `pillars:\n`;
  for (const pl of p.pillars) {
    y += `  - icon: ${q(pl.icon)}\n`;
    y += `    title:\n      en: ${q(pl.title)}\n      ko: ""\n`;
    y += `    desc:\n      en: ${q(pl.desc)}\n      ko: ""\n`;
  }
  y += `\nstats:\n`;
  for (const st of s) {
    y += `  - value: ${q(st.value)}\n`;
    y += `    label:\n      en: ${q(st.label)}\n      ko: ""\n`;
  }
  write('philosophy.yaml', y);
}

// ── education.yaml ────────────────────────────────────────
function genEducation() {
  let y = `# Education (newest first)\n\n`;
  for (const e of data.education) {
    y += `- degree: ${q(e.degree)}\n`;
    y += `  institution:\n    en: ${q(e.institution)}\n    ko: ""\n`;
    y += `  period: ${q(e.period)}\n`;
    y += `  major:\n    en: ${q(e.major)}\n    ko: ""\n`;
    y += `  region: ${q(e.region)}\n`;
    y += `  remarks: ${q(e.remarks)}\n\n`;
  }
  write('education.yaml', y);
}

// ── work.yaml ─────────────────────────────────────────────
function genWork() {
  let y = `# Work Experience (newest first)\n\n`;
  for (const w of data.workExperience) {
    y += `- position:\n    en: ${q(w.position)}\n    ko: ""\n`;
    y += `  organization: ${q(w.organization)}\n`;
    y += `  division: ${q(w.division)}\n`;
    y += `  period: ${q(w.period)}\n`;
    y += `  roles:\n    en: ${q(w.roles)}\n    ko: ""\n`;
    y += `  performance: ${q(w.performance)}\n`;
    y += `  region: ${q(w.region)}\n\n`;
  }
  write('work.yaml', y);
}

// ── projects.yaml ─────────────────────────────────────────
function genProjects() {
  let y = `# Projects (newest first, sorted by index desc)\n\n`;
  for (const p of data.projects) {
    y += `- index: ${p.index}\n`;
    y += `  period: ${q(p.period)}\n`;
    y += `  duration: ${q(p.duration)}\n`;
    y += `  title:\n    en: ${q(p.title)}\n    ko: ""\n`;
    y += `  client: ${q(p.client)}\n`;
    if (p.partnerInstitution) {
      y += `  partner_institution: ${q(p.partnerInstitution)}\n`;
    }
    y += `  affiliated_institution: ${q(p.affiliatedInstitution)}\n`;
    y += `  is_pm: ${p.isPM}\n`;
    // Detect language of remarks
    const rk = p.remarks || '';
    if (isKorean(rk)) {
      y += `  remarks:\n    en: ""\n    ko: ${q(rk)}\n`;
    } else {
      y += `  remarks:\n    en: ${q(rk)}\n    ko: ""\n`;
    }
    y += `\n`;
  }
  write('projects.yaml', y);
}

// ── publications.yaml ─────────────────────────────────────
function genPublications() {
  let y = `# Publications (newest first, sorted by index desc)\n`;
  y += `# Citations are in English (academic standard)\n\n`;
  for (const p of data.publications) {
    y += `- index: ${p.index}\n`;
    y += `  year: ${p.year}\n`;
    y += `  type: ${q(p.type)}\n`;
    y += `  global: ${p.global}\n`;
    y += `  role: ${q(p.role)}\n`;
    y += `  authors: ${q(p.authors)}\n`;
    y += `  title: ${q(p.title.replace(/,\s*$/, ''))}\n`;
    y += `  venue: ${q(p.venue)}\n`;
    y += `  full_citation: ${q(p.fullCitation)}\n`;
    if (p.link) {
      y += `  link: ${q(p.link)}\n`;
    }
    if (p.remarks) {
      y += `  remarks: ${q(p.remarks)}\n`;
    }
    y += `\n`;
  }
  write('publications.yaml', y);
}

// ── skills.yaml ───────────────────────────────────────────
function genSkills() {
  let y = `# Skills\n\n`;
  for (const [cat, items] of Object.entries(data.skills)) {
    y += `${cat.toLowerCase()}:\n`;
    y += `  label:\n    en: ${q(cat)}\n    ko: ""\n`;
    y += `  items:\n`;
    for (const item of items) {
      y += `    - ${q(item)}\n`;
    }
    y += `\n`;
  }
  write('skills.yaml', y);
}

// ── honors.yaml ───────────────────────────────────────────
function genHonors() {
  let y = `# Honors & Awards (newest first)\n\n`;
  for (const h of data.honors) {
    y += `- date: ${q(h.date)}\n`;
    y += `  title:\n    en: ${q(h.title)}\n    ko: ""\n`;
    y += `  description:\n    en: ${q(h.description)}\n    ko: ""\n`;
    y += `  organization: ${q(h.organization)}\n`;
    y += `  location: ${q(h.location)}\n`;
    if (h.remarks) {
      y += `  remarks: ${q(h.remarks)}\n`;
    }
    y += `\n`;
  }
  write('honors.yaml', y);
}

// ── patents.yaml ──────────────────────────────────────────
function genPatents() {
  let y = `# Patents\n\n`;
  for (const p of data.patents) {
    y += `- title:\n    en: ${q(p.title)}\n    ko: ""\n`;
    y += `  description:\n    en: ${q(p.description)}\n    ko: ""\n`;
    y += `  application_date: ${q(p.applicationDate)}\n`;
    y += `  application_number: ${q(p.applicationNumber)}\n`;
    y += `  applicant: ${q(p.applicant)}\n`;
    y += `  authority: ${q(p.authority)}\n`;
  }
  write('patents.yaml', y);
}

// ── activities.yaml ───────────────────────────────────────
function genActivities() {
  let y = `# Activities & Leadership (newest first)\n\n`;
  for (const a of data.activities) {
    y += `- role:\n    en: ${q(a.role)}\n    ko: ""\n`;
    y += `  organization:\n    en: ${q(a.organization)}\n    ko: ""\n`;
    y += `  location: ${q(a.location)}\n`;
    y += `  period: ${q(a.period)}\n\n`;
  }
  write('activities.yaml', y);
}

// ── Run all ───────────────────────────────────────────────
console.log('Converting portfolio.json -> data/career/*.yaml ...\n');
genBasic();
genPhilosophy();
genEducation();
genWork();
genProjects();
genPublications();
genSkills();
genHonors();
genPatents();
genActivities();
console.log('\nDone! YAML files written to data/career/');
