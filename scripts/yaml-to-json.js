/**
 * yaml-to-json.js
 * Pipeline: data/career/*.yaml → data/portfolio.json
 *
 * Reads all YAML career files, extracts the specified language (default: en),
 * and assembles the portfolio.json the website consumes.
 *
 * Usage:
 *   node scripts/yaml-to-json.js          # English (default)
 *   node scripts/yaml-to-json.js --lang ko # Korean
 */

const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

const CAREER  = path.join(__dirname, '..', 'data', 'career');
const OUT     = path.join(__dirname, '..', 'data', 'portfolio.json');
const LANG    = process.argv.includes('--lang') ? process.argv[process.argv.indexOf('--lang') + 1] : 'en';

// ── Helpers ───────────────────────────────────────────────

/** Load and parse a YAML file */
function load(filename) {
  const fp = path.join(CAREER, filename);
  if (!fs.existsSync(fp)) { console.warn(`  ⚠ ${filename} not found, skipping`); return null; }
  return yaml.load(fs.readFileSync(fp, 'utf8'));
}

/** Load all files matching a prefix, merge arrays, sort by index desc */
function loadMerged(prefix, sortKey = 'index') {
  const files = fs.readdirSync(CAREER)
    .filter(f => f.startsWith(prefix) && f.endsWith('.yaml'))
    .sort();
  let all = [];
  for (const f of files) {
    const data = load(f);
    if (Array.isArray(data)) all = all.concat(data);
  }
  if (sortKey) all.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));
  return all;
}

/**
 * Extract a single language from bilingual fields.
 * { en: "hello", ko: "안녕" } → "hello" (if lang=en)
 * Plain strings pass through as-is.
 */
function extractLang(obj) {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') return obj;

  // Bilingual object: { en: ..., ko: ... }
  if (typeof obj === 'object' && !Array.isArray(obj) && ('en' in obj || 'ko' in obj)) {
    return obj[LANG] || obj['en'] || '';
  }

  // Array
  if (Array.isArray(obj)) {
    return obj.map(item => extractLang(item));
  }

  // Regular object: recurse
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = extractLang(val);
  }
  return result;
}

// ── Section Builders ──────────────────────────────────────

function buildBasic(raw) {
  if (!raw) return {};
  const b = extractLang(raw);
  return {
    name:       typeof raw.name === 'object' ? (raw.name[LANG] || raw.name.en) : raw.name,
    nameKr:     typeof raw.name === 'object' ? raw.name.ko : '',
    titles:     (raw.titles || []).map(t => typeof t === 'object' ? (t[LANG] || t.en || '') : t),
    email:      raw.email || [],
    website:    raw.website || '',
    location:   typeof raw.location === 'object' ? (raw.location[LANG] || raw.location.en) : (raw.location || ''),
    googleSite: raw.google_site || '',
    resume:     typeof raw.resume === 'object' ? (raw.resume[LANG] || raw.resume.en || '') : (raw.resume || ''),
    summary:    extractLang(raw.summary),
  };
}

function buildPhilosophy(raw) {
  if (!raw) return {};
  return {
    headline: extractLang(raw.headline),
    lead:     extractLang(raw.lead),
    body:     extractLang(raw.body),
    pillars:  (raw.pillars || []).map(p => ({
      icon:  p.icon,
      title: extractLang(p.title),
      desc:  extractLang(p.desc),
    })),
  };
}

function buildStats(raw) {
  if (!raw || !raw.stats) return [];
  return raw.stats.map(s => ({
    value: s.value,
    label: extractLang(s.label),
  }));
}

function buildEducation(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(e => {
    const item = {
      degree:      e.degree,
      institution: extractLang(e.institution),
      period:      e.period,
      major:       extractLang(e.major),
      region:      e.region || '',
      remarks:     e.remarks || '',
    };
    if (e.advisor) item.advisor = extractLang(e.advisor);
    if (e.thesis) {
      item.thesis = {
        title:       extractLang(e.thesis.title),
        topic:       extractLang(e.thesis.topic),
        methodology: extractLang(e.thesis.methodology),
        performance: extractLang(e.thesis.performance),
      };
      if (e.thesis.prior_limitations) {
        item.thesis.priorLimitations = extractLang(e.thesis.prior_limitations);
      }
    }
    return item;
  });
}

function buildWork(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(w => {
    const item = {
      position:     extractLang(w.position),
      organization: extractLang(w.organization),
      division:     extractLang(w.division) || '',
      period:       w.period,
      roles:        extractLang(w.roles),
      performance:  w.performance || '',
      region:       w.region || '',
    };
    if (w.responsibilities) {
      item.responsibilities = w.responsibilities.map(r =>
        typeof r === 'object' ? (r[LANG] || r.en || '') : r
      );
    }
    if (w.highlights) {
      item.highlights = w.highlights.map(h =>
        typeof h === 'object' ? (h[LANG] || h.en || '') : h
      );
    }
    if (w.advisor) item.advisor = w.advisor;
    return item;
  });
}

function buildProjects(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(p => {
    const item = {
      index:                p.index,
      period:               p.period || '',
      duration:             p.duration || '',
      title:                extractLang(p.title),
      client:               p.client || '',
      partnerInstitution:   p.partner_institution || '',
      affiliatedInstitution: p.affiliated_institution || '',
      isPM:                 !!p.is_pm,
      remarks:              extractLang(p.remarks),
    };
    if (p.partners) item.partners = p.partners;
    if (p.details) {
      item.details = {
        purpose:      extractLang(p.details.purpose),
        role:         extractLang(p.details.role),
      };
      if (p.details.tasks) {
        item.details.tasks = p.details.tasks.map(t =>
          typeof t === 'object' ? (t[LANG] || t.en || '') : t
        );
      }
      if (p.details.achievements) {
        item.details.achievements = extractLang(p.details.achievements);
      }
      if (p.details.notes) {
        item.details.notes = extractLang(p.details.notes);
      }
    }
    return item;
  });
}

function buildPublications(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(p => ({
    index:        p.index,
    authors:      p.authors || '',
    title:        (p.title || '').replace(/,\s*$/, ''),
    fullCitation: p.full_citation || '',
    type:         p.type || '',
    link:         p.link || '',
    role:         p.role || '',
    remarks:      p.remarks || '',
    year:         p.year || 0,
    global:       !!p.global,
    venue:        p.venue || '',
  }));
}

function buildSkills(raw) {
  if (!raw) return {};
  const result = {};
  for (const [key, val] of Object.entries(raw)) {
    const label = typeof val.label === 'object' ? (val.label[LANG] || val.label.en || key) : key;
    result[label] = val.items || [];
  }
  return result;
}

function buildHonors(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(h => ({
    date:         h.date || '',
    title:        extractLang(h.title),
    description:  extractLang(h.description),
    organization: h.organization || '',
    location:     h.location || '',
    remarks:      h.remarks || '',
  }));
}

function buildPatents(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(p => ({
    title:             extractLang(p.title),
    description:       extractLang(p.description),
    applicationDate:   p.application_date || '',
    applicationNumber: p.application_number || '',
    applicant:         p.applicant || '',
    authority:         extractLang(p.authority) || '',
  }));
}

function buildActivities(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(a => ({
    role:         extractLang(a.role),
    organization: extractLang(a.organization),
    location:     a.location || '',
    period:       a.period || '',
  }));
}

// ── Main ──────────────────────────────────────────────────

function main() {
  console.log(`\n📦 Building portfolio.json (lang=${LANG}) from data/career/*.yaml\n`);

  const basic      = load('basic.yaml');
  const philosophy  = load('philosophy.yaml');
  const education  = load('education.yaml');
  const work       = load('work.yaml');
  const projects   = loadMerged('projects-', 'index');
  const pubs       = loadMerged('publications-', 'index');
  const skills     = load('skills.yaml');
  const honors     = load('honors.yaml');
  const patents    = load('patents.yaml');
  const activities = load('activities.yaml');

  const portfolio = {
    lastUpdated:    new Date().toISOString().slice(0, 10),
    basic:          buildBasic(basic),
    philosophy:     buildPhilosophy(philosophy),
    stats:          buildStats(philosophy),
    education:      buildEducation(education),
    workExperience: buildWork(work),
    projects:       buildProjects(projects),
    publications:   buildPublications(pubs),
    skills:         buildSkills(skills),
    honors:         buildHonors(honors),
    patents:        buildPatents(patents),
    activities:     buildActivities(activities),
  };

  fs.writeFileSync(OUT, JSON.stringify(portfolio, null, 2), 'utf8');

  // Summary
  console.log('  Section             Items');
  console.log('  ──────────────────  ─────');
  console.log(`  education           ${portfolio.education.length}`);
  console.log(`  workExperience      ${portfolio.workExperience.length}`);
  console.log(`  projects            ${portfolio.projects.length}`);
  console.log(`  publications        ${portfolio.publications.length}`);
  console.log(`  honors              ${portfolio.honors.length}`);
  console.log(`  patents             ${portfolio.patents.length}`);
  console.log(`  activities          ${portfolio.activities.length}`);
  console.log(`\n✅ data/portfolio.json written (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)\n`);
}

main();
