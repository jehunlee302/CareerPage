/**
 * yaml-to-latex.js
 * Pipeline: data/career/*.yaml → latex/resume.tex + latex/sections/*.tex
 *
 * Reads all YAML career files, extracts the specified language,
 * and generates LaTeX files that xelatex can compile into a PDF.
 *
 * Usage:
 *   node scripts/yaml-to-latex.js          # English (default)
 *   node scripts/yaml-to-latex.js --lang ko # Korean
 */

const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

const CAREER     = path.join(__dirname, '..', 'data', 'career');
const RESUME_DIR = path.join(__dirname, '..', 'latex');
const SECTIONS   = path.join(RESUME_DIR, 'sections');
const LANG       = process.argv.includes('--lang')
  ? process.argv[process.argv.indexOf('--lang') + 1] : 'en';
const BRIEF      = process.argv.includes('--brief');

/* ─── i18n Section Titles ─── */
const TITLES = {
  en: {
    summary:      'Professional Profile',
    education:    'Education',
    experience:   'Work Experience',
    projects:     'Projects',
    publications: 'Academic Works',
    honors:       'Honors \\& Awards',
    activities:   'Activities \\& Leadership',
    skills:       'Skills',
    narrative:    'Career Narrative',
  },
  ko: {
    summary:      '전문 프로필',
    education:    '학력',
    experience:   '경력',
    projects:     '프로젝트',
    publications: '학술 논문',
    honors:       '수상 내역',
    activities:   '활동 및 리더십',
    skills:       '기술',
    narrative:    '경력기술서',
  },
};

const NV_LABELS = {
  en: { background: 'Background', objective: 'Objective', role: 'Role', activities: 'Key Activities', outcomes: 'Outcomes', notes: 'Notes', series: 'Continuous Series', phase: 'Phase' },
  ko: { background: '배경', objective: '목표', role: '역할', activities: '수행 내용', outcomes: '성과', notes: '비고', series: '연속 과제', phase: '단계' },
};

const ALT_SERVICE_LABEL = {
  en: { label: 'Alternative Military Service - Technical Research Personnel', mod: 'concurrent affiliation with Ministry of National Defense' },
  ko: { label: '병역 대체 복무 - 전문연구요원', mod: '국방부 동시 소속' },
};

const DEGREE_KO = { 'Ph.D.': '공학박사 (Ph.D.)', 'M.S.': '석사', 'B.S.': '학사', 'High School': '고등학교' };
const REGION_KO = {
  'Yongin, South Korea': '경기 용인',
  'Daejeon, South Korea': '대전',
  'Suwon, South Korea': '경기 수원',
  'Seoul, South Korea': '서울',
};
function locDegree(d) { return LANG === 'ko' ? (DEGREE_KO[d] || d) : d; }
function locRegion(r) { return LANG === 'ko' ? (REGION_KO[r] || r) : r; }
function locPeriod(p) { return (LANG === 'ko' && typeof p === 'string') ? p.replace(/\bPresent\b/i, '현재') : (p || ''); }

/* ─── Helpers ─── */

function load(filename) {
  const fp = path.join(CAREER, filename);
  if (!fs.existsSync(fp)) { console.warn(`  ⚠ ${filename} not found`); return null; }
  return yaml.load(fs.readFileSync(fp, 'utf8'));
}

function loadMerged(prefix, sortKey = 'index') {
  const files = fs.readdirSync(CAREER)
    .filter(f => f.startsWith(prefix) && f.endsWith('.yaml')).sort();
  let all = [];
  for (const f of files) {
    const data = load(f);
    if (Array.isArray(data)) all = all.concat(data);
  }
  if (sortKey) all.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));
  return all;
}

function extractLang(obj) {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (typeof obj === 'object' && !Array.isArray(obj) && ('en' in obj || 'ko' in obj)) {
    return String(obj[LANG] || obj['en'] || '');
  }
  if (Array.isArray(obj)) return obj.map(extractLang);
  const result = {};
  for (const [key, val] of Object.entries(obj)) result[key] = extractLang(val);
  return result;
}

/** Escape special LaTeX characters in plain text */
function tex(s) {
  if (!s) return '';
  return String(s)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/** Write file and log */
function writeFile(fp, content) {
  fs.writeFileSync(fp, content, 'utf8');
  const rel = path.relative(path.join(__dirname, '..'), fp);
  console.log(`  ✓ ${rel}`);
}

function sectionHeader(key) {
  return `%-------------------------------------------------------------------------------
%\tSECTION TITLE
%-------------------------------------------------------------------------------
\\cvsection{${TITLES[LANG][key] || TITLES.en[key]}}

%-------------------------------------------------------------------------------
%\tCONTENT
%-------------------------------------------------------------------------------`;
}

/* ─── Main File Generator ─── */

function generateMain(basic) {
  const raw = basic || {};
  const nameEn = typeof raw.name === 'object' ? (raw.name.en || '') : (raw.name || '');
  const nameKo = typeof raw.name === 'object' ? (raw.name.ko || '') : '';
  const titles = (raw.titles || []).map(t => typeof t === 'object' ? (t[LANG] || t.en || '') : t);
  const location = typeof raw.location === 'object' ? (raw.location[LANG] || raw.location.en) : (raw.location || '');
  const emails = (raw.email || []).filter(e => e !== 'jehun.lee@vms-solutions.com').join(', ');

  let nameCmd, footerName, footerLabel;
  if (LANG === 'ko') {
    nameCmd = `\\name{${nameKo}}{\\enskip (${nameEn})}`;
    footerName = nameKo;
    footerLabel = '이력서';
  } else {
    const parts = nameEn.split(' ');
    const first = parts[0] ? parts[0].toUpperCase() : '';
    const last = parts.slice(1).join(' ').toUpperCase();
    nameCmd = `\\name{${first}}{\\enskip ${last}}`;
    footerName = nameEn;
    footerLabel = 'Resume';
  }

  const position = titles.map(t => tex(t)).join('\\enskip|\\enskip ');

  // Optional: compensation line (current/desired). Comment out fields in basic.yaml to hide.
  // current can be a plain string OR {base, bonus, total?} for split format.
  let compensationCmd = '';
  const comp = raw.compensation;
  if (comp) {
    const pickLang = v => (typeof v === 'object' && v !== null && !('base' in v) && !('bonus' in v) && !('total' in v))
      ? (v[LANG] || v.en || v.ko || '')
      : (typeof v === 'string' ? v : '');
    const labelCurrent = LANG === 'ko' ? '현재' : 'Current';
    const labelDesired = LANG === 'ko' ? '희망' : 'Desired';
    const labelBase    = LANG === 'ko' ? '기본급' : 'Base';
    const labelBonus   = LANG === 'ko' ? '성과급' : 'Bonus';

    // Format current — supports {base, bonus, total} split or plain string
    let currentRendered = '';
    const cur = comp.current;
    if (cur && typeof cur === 'object' && (cur.base || cur.bonus || cur.total)) {
      const totalVal = cur.total ? pickLang(cur.total).toString().trim() : '';
      const baseVal  = cur.base  ? pickLang(cur.base).toString().trim()  : '';
      const bonusVal = cur.bonus ? pickLang(cur.bonus).toString().trim() : '';
      const inner = [];
      if (baseVal)  inner.push(`${labelBase} ${tex(baseVal)}`);
      if (bonusVal) inner.push(`${labelBonus} ${tex(bonusVal)}`);
      if (totalVal && inner.length > 0) currentRendered = `${tex(totalVal)} (${inner.join(' + ')})`;
      else if (totalVal) currentRendered = tex(totalVal);
      else if (inner.length > 0) currentRendered = `(${inner.join(' + ')})`;
    } else {
      currentRendered = tex(pickLang(cur).toString().trim());
    }
    const desiredRendered = tex(pickLang(comp.desired).toString().trim());

    const parts = [];
    if (currentRendered) parts.push(`\\textbf{${labelCurrent}:} ${currentRendered}`);
    if (desiredRendered) parts.push(`\\textbf{${labelDesired}:} ${desiredRendered}`);
    if (parts.length > 0) compensationCmd = `\\compensation{${parts.join(' \\quad ')}}`;
  }

  return `%!TEX TS-program = xelatex
%!TEX encoding = UTF-8 Unicode
% Auto-generated by yaml-to-latex.js (lang=${LANG}) — do not edit manually

\\documentclass[11pt, a4paper]{resume}
\\fontdir[fonts/]
\\definecolor{awesome}{HTML}{000000}
\\tcbuselibrary{breakable}

\\photo[rectangle,noedge]{../assets/img/jehun.jpg}

${nameCmd}
\\position{${position}}
\\address{${tex(location)}}
\\mobile{(+82) 10-8244-5376}
\\homepage{https://jehun-lee.work}
\\email{${emails}}
\\linkedin{https://www.linkedin.com/in/jehun-lee/}
\\scholar{https://scholar.google.com/citations?user=C7ekyjEAAAAJ}
${compensationCmd}

\\begin{document}
\\makecvheader
\\makecvfooter
  {\\today}
  {${footerName}~~~·~~~${footerLabel}}
  {\\thepage}

\\input{sections/summary.tex}
\\input{sections/education.tex}
\\input{sections/experience.tex}
\\input{sections/projects.tex}
\\input{sections/publication.tex}
\\input{sections/honors.tex}
\\input{sections/leadership.tex}
\\input{sections/skills.tex}${BRIEF ? '' : `
\\input{sections/narrative.tex}`}

\\end{document}
`;
}

/* ─── Section Generators ─── */

function generateSummary(philosophy) {
  if (!philosophy) return '';
  const body = extractLang(philosophy.body) || extractLang(philosophy.body) || '';
  if (!body) return `${sectionHeader('summary')}\n\\begin{cvparagraph}\n\\summarystyle{(No content)}\n\\end{cvparagraph}\n`;

  const paragraphs = body.split(/\n\n+/).filter(p => p.trim());
  const formatted = paragraphs.map((p, i) =>
    (i > 0 ? '\\vspace{0.2cm}\n' : '') + tex(p.trim())
  ).join('\n\n');

  return `${sectionHeader('summary')}
\\begin{cvparagraph}
\\summarystyle{
${formatted}
}
\\end{cvparagraph}
`;
}

function generateEducation(education) {
  if (!Array.isArray(education) || !education.length) return '';
  const entries = education.map(e => {
    const degree = locDegree(e.degree || '');
    const major = extractLang(e.major);
    const inst = extractLang(e.institution);
    const title = major ? (LANG === 'ko' ? `${tex(degree)} | ${tex(major)}` : `${tex(degree)} in ${tex(major)}`) : tex(degree);
    return `  \\cveducation
    {${title}}
    {${tex(inst)}}
    {}
    {${locPeriod(e.period)}}
    {} {}`;
  }).join('\n\n');

  return `${sectionHeader('education')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

const MAX_RESP_LINES = 6;

function generateExperience(work) {
  if (!Array.isArray(work) || !work.length) return '';
  const entries = work.map(w => {
    const period = locPeriod(w.period);
    const position = tex(extractLang(w.position));
    const org = extractLang(w.organization);
    const div = extractLang(w.division);
    let inst = div ? `${tex(org)} | ${tex(div)}` : tex(org);
    if (w.alt_service) {
      const mnd = LANG === 'ko' ? '국방부' : 'Ministry of National Defense';
      const role = LANG === 'ko' ? '전문연구요원' : 'Tech. Research Personnel';
      inst += ` \\\\[0.4mm] \\textit{\\small ${tex(mnd)} | ${tex(role)} [${tex(w.alt_service)}]}`;
    }
    const roles = tex(extractLang(w.roles));

    // Responsibilities (capped for readability)
    const resps = (w.responsibilities || []).map(r => {
      const text = typeof r === 'object' ? (r[LANG] || r.en || '') : r;
      return tex(text);
    });
    // Highlights (always include — these are key achievements)
    const highlights = (w.highlights || []).map(h => {
      const text = typeof h === 'object' ? (h[LANG] || h.en || '') : h;
      return tex(text);
    });

    // Cap responsibilities, then append highlights
    const cappedResps = resps.slice(0, MAX_RESP_LINES);
    const BULLET = '\\textendash{}~';
    const extra = [...cappedResps, ...highlights].map(s => BULLET + s).join('\n    \\\\ ');

    return `%---------------------------------------------------------
  \\cventry
    {${period}} % Date
    {${position}} % Title
    {${inst}} % Institution
    {} % Location
    {${roles}} % Description
    {${extra}} % Extra`;
  }).join('\n\n');

  return `${sectionHeader('experience')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

function generateProjects(projects) {
  if (!Array.isArray(projects) || !projects.length) return '';

  // Filter out projects with empty titles
  const valid = projects.filter(p => {
    const title = typeof p.title === 'object' ? (p.title[LANG] || p.title.en || '') : (p.title || '');
    return title.trim().length > 0;
  });

  let currentYear = null;
  const entries = valid.map(p => {
    const title = extractLang(p.title);
    const period = p.period || '';
    const duration = p.duration || '';
    const client = p.client || '';
    const partners = p.partners || [];
    const affiliated = p.affiliated_institution || '';

    // Build institution line (avoid repeating same name)
    const instParts = [];
    if (affiliated) instParts.push(tex(affiliated));
    const withParts = [];
    if (client && client !== affiliated?.replace(/ Inc\.$/, '')) withParts.push(tex(client));
    partners.forEach(pr => withParts.push(tex(pr)));
    if (withParts.length) {
      if (instParts.length) instParts[0] += ` (with ${withParts.join(', ')})`;
      else instParts.push(`with ${withParts.join(', ')}`);
    }
    const instLine = instParts.join('');

    // Build task lines: details.tasks > details.purpose > remarks
    let tasks = [];
    if (p.details && p.details.tasks && p.details.tasks.length) {
      tasks = p.details.tasks.map(t => {
        const text = typeof t === 'object' ? (t[LANG] || t.en || '') : t;
        return tex(text);
      }).filter(Boolean);
    } else if (p.details && p.details.purpose) {
      const purpose = typeof p.details.purpose === 'object'
        ? (p.details.purpose[LANG] || p.details.purpose.en || '')
        : (p.details.purpose || '');
      if (purpose) tasks.push(tex(purpose));
    }
    // Fallback to remarks if no tasks
    if (!tasks.length) {
      const rem = typeof p.remarks === 'object' ? (p.remarks[LANG] || p.remarks.en || '') : (p.remarks || '');
      if (rem) tasks.push(tex(rem));
    }

    // Achievements line
    if (p.details && p.details.achievements) {
      const ach = typeof p.details.achievements === 'object'
        ? (p.details.achievements[LANG] || p.details.achievements.en || '')
        : (p.details.achievements || '');
      if (ach) tasks.push(tex(ach));
    }

    const BULLET = '\\textendash{}~';
    const taskStr = BRIEF ? '' : tasks.map(s => BULLET + s).join('\n    \\\\ ');

    // Year comment
    const year = period.slice(0, 4);
    let yearComment = '';
    if (year !== currentYear) {
      currentYear = year;
      yearComment = `% ${year} ---------------------------------------------------------\n`;
    }

    return `${yearComment}  \\cvproject
    {${period}}
    {${duration}}
    {${tex(title)}}
    {${taskStr}}
    {${instLine}}`;
  }).join('\n\n');

  return `${sectionHeader('projects')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

function generatePublications(pubs) {
  if (!Array.isArray(pubs) || !pubs.length) return '';

  let currentYear = null;
  const entries = pubs.map(p => {
    const year = String(p.year || '');
    const title = tex(p.title || '');
    const venue = tex(p.venue || '');
    // Normalize role: "1st Author" stays, everything else → "Co-Author"
    const rawRole = p.role || '';
    const role = /1st/i.test(rawRole) ? '1st Author' : (rawRole ? 'Co-Author' : '');
    const link = p.link || '';

    let yearComment = '';
    if (year !== currentYear) {
      currentYear = year;
      yearComment = `% ${year} ---------------------------------------------------------\n`;
    }

    return `${yearComment}  \\cvpaper
    {${year}}
    {${title}}
    {${venue}}
    {${role}}
    {${link}}`;
  }).join('\n\n');

  return `${sectionHeader('publications')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

function generateHonors(honors) {
  if (!Array.isArray(honors) || !honors.length) return '';
  const entries = honors.map(h => {
    const title = tex(extractLang(h.title));
    const desc = tex(extractLang(h.description));
    const org = tex(extractLang(h.organization));
    const date = h.date || '';
    return `  \\cvhonor
    {${title}}
    {${desc}}
    {${org}}
    {${date}}`;
  }).join('\n\n');

  return `${sectionHeader('honors')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

function generateLeadership(activities) {
  if (!Array.isArray(activities) || !activities.length) return '';
  const entries = activities.map(a => {
    const role = tex(extractLang(a.role));
    const org = tex(extractLang(a.organization));
    const period = a.period || '';
    return `  \\cveducation
    {${role}}
    {${org}}
    {}
    {${period}}
    {} {}`;
  }).join('\n\n');

  return `${sectionHeader('activities')}
\\begin{cventries}

${entries}

\\end{cventries}
`;
}

function generateSkills(skills) {
  if (!skills) return '';
  const entries = Object.entries(skills).map(([key, val]) => {
    const label = typeof val.label === 'object' ? (val.label[LANG] || val.label.en || key) : key;
    const items = (val.items || []).map(i => tex(i)).join(', ');
    return `  \\cvskill\n    {${tex(label)}}\n    {${items}}`;
  }).join('\n\n');

  return `${sectionHeader('skills')}
\\begin{cvskills}

${entries}

\\end{cvskills}
`;
}

/* ─── Narrative (Career Narrative — Project Deep Dives, full version only) ─── */
function nvParseStart(period) {
  const m = String(period || '').match(/(\d{4})\.(\d{1,2})/);
  return m ? new Date(parseInt(m[1]), parseInt(m[2]) - 1, 1) : null;
}
function nvParseEnd(period) {
  const all = String(period || '').match(/(\d{4})\.(\d{1,2})/g);
  if (!all || all.length === 0) return null;
  const last = all[all.length - 1].split('.');
  return new Date(parseInt(last[0]), parseInt(last[1]) - 1, 1);
}
function generateNarrative(projects) {
  if (!Array.isArray(projects) || !projects.length) return '';
  const L = NV_LABELS[LANG] || NV_LABELS.en;

  const withDetails = projects.filter(p => p.details && (p.details.situation || p.details.purpose || (p.details.tasks && p.details.tasks.length) || p.details.achievements));
  if (!withDetails.length) return '';

  // Sort ascending by start date for grouping
  const sorted = [...withDetails].sort((a, b) => {
    const aD = nvParseStart(a.period); const bD = nvParseStart(b.period);
    return (aD?.getTime() || 0) - (bD?.getTime() || 0);
  });

  // Group continuous projects: same client + affiliated_institution + period gap < 6 months
  const groups = [];
  for (const p of sorted) {
    const prev = groups.length ? groups[groups.length - 1] : null;
    const prevLast = prev?.projects[prev.projects.length - 1];
    const prevEnd = prevLast ? nvParseEnd(prevLast.period) : null;
    const thisStart = nvParseStart(p.period);
    const gapMo = (prevEnd && thisStart) ? (thisStart - prevEnd) / (1000 * 60 * 60 * 24 * 30) : Infinity;
    if (prev && prev.client === p.client && prev.affiliated === p.affiliated_institution && gapMo < 6) {
      prev.projects.push(p);
    } else {
      groups.push({ client: p.client, affiliated: p.affiliated_institution, projects: [p] });
    }
  }
  groups.reverse(); // newest first

  function renderProject(p, phaseIdx, totalPhases) {
    const d = p.details || {};
    const title = tex(extractLang(p.title));
    const period = locPeriod(p.period || '');
    const duration = p.duration || '';
    const client = tex(p.client || '');
    const affiliated = tex(p.affiliated_institution || '');
    const partners = (p.partners || []).map(s => tex(s)).join(' · ');
    const isMulti = totalPhases > 1;
    const phaseTag = isMulti ? `{\\small\\textbf{\\color{awesome}[${tex(L.phase)} ${phaseIdx}]}}~` : '';
    const pmTag = p.is_pm ? `~{\\footnotesize\\textbf{\\color{awesome}\\faStar~PM}}` : '';

    const metaParts = [];
    if (period) metaParts.push(tex(period) + (duration ? `~(${tex(duration)})` : ''));
    if (client) metaParts.push(client);
    if (affiliated && affiliated !== client) metaParts.push(`\\textit{${affiliated}}`);
    if (partners) metaParts.push(`{\\footnotesize with ${partners}}`);
    const metaLine = metaParts.join(' \\enspace|\\enspace ');

    const fieldLines = [];
    const fmt = (label, content) => fieldLines.push(`\\textbf{\\small\\color{awesome}${tex(label)}}~~${content}`);
    if (d.situation)    fmt(L.background, `{\\small ${tex(extractLang(d.situation))}}`);
    if (d.purpose)      fmt(L.objective,  `{\\small ${tex(extractLang(d.purpose))}}`);
    if (d.role)         fmt(L.role,       `{\\small ${tex(extractLang(d.role))}}`);
    if (d.tasks && d.tasks.length) {
      const tasksLine = d.tasks.map(t => `\\textendash{}~${tex(typeof t === 'object' ? (t[LANG] || t.en || '') : t)}`).join(' \\\\\n~~~~');
      fieldLines.push(`\\textbf{\\small\\color{awesome}${tex(L.activities)}}\\\\\n~~~~{\\small ${tasksLine}}`);
    }
    if (d.achievements) fmt(L.outcomes,   `{\\small ${tex(extractLang(d.achievements))}}`);
    if (d.notes)        fieldLines.push(`\\textbf{\\footnotesize\\color{gray}${tex(L.notes)}}~~{\\footnotesize\\itshape\\color{gray}${tex(extractLang(d.notes))}}`);

    return `\\begin{tcolorbox}[
  breakable, enhanced, sharp corners=northeast,
  colback=white, colframe=gray!35, boxrule=0.4pt, arc=1.2mm,
  left=4mm, right=4mm, top=2.5mm, bottom=2.5mm,
  before skip=1.5mm, after skip=2.5mm,
]
\\noindent ${phaseTag}\\textbf{\\normalsize ${title}}${pmTag}\\par
{\\footnotesize\\color{gray!130} ${metaLine}}\\par
\\vspace{0.5mm}{\\color{gray!50}\\hrule}\\vspace{1.2mm}
${fieldLines.join('\\par\\vspace{0.8mm}\n')}
\\end{tcolorbox}`;
  }

  const sections = groups.map(g => {
    const isMulti = g.projects.length > 1;
    let block = '';
    if (isMulti) {
      const startP = g.projects[0]; const endP = g.projects[g.projects.length - 1];
      const startStr = (startP.period || '').split(/[-~]/)[0].trim();
      const endParts = (endP.period || '').split(/[-~]/);
      const endStr = (endParts[1] || endParts[0] || '').trim();
      block += `\\noindent\\colorbox{awesome!8}{\\parbox{\\dimexpr\\linewidth-2\\fboxsep\\relax}{%
\\textbf{\\small\\color{awesome}[${tex(L.series)}]}~~\\textbf{\\small ${tex(g.client || '')}}${g.affiliated ? `~~{\\small\\itshape\\color{gray!130}· ${tex(g.affiliated)}}` : ''}\\hfill{\\footnotesize\\color{gray!130} ${tex(startStr)} \\textendash{} ${tex(endStr)}}%
}}\\par\\vspace{1mm}\n`;
    }
    block += g.projects.map((p, i) => renderProject(p, i + 1, g.projects.length)).join('\n');
    if (isMulti) block += `\\vspace{2mm}\n`;
    return block;
  }).join('\n\n');

  return `\\clearpage
${sectionHeader('narrative')}
${sections}
`;
}

/* ─── Main ─── */

function main() {
  console.log(`\n📄 Generating LaTeX resume (lang=${LANG}${BRIEF ? ', brief' : ''}) from data/career/*.yaml\n`);

  // Ensure output directories exist
  if (!fs.existsSync(SECTIONS)) fs.mkdirSync(SECTIONS, { recursive: true });

  // Load data
  const basic      = load('basic.yaml');
  const philosophy  = load('philosophy.yaml');
  const education  = load('education.yaml');
  const work       = load('work.yaml');
  const projects   = loadMerged('projects-', 'index');
  const pubs       = loadMerged('publications-', 'index');
  const skills     = load('skills.yaml');
  const honors     = load('honors.yaml');
  const activities = load('activities.yaml');

  // Generate and write files
  writeFile(path.join(RESUME_DIR, 'resume.tex'), generateMain(basic));
  writeFile(path.join(SECTIONS, 'summary.tex'), generateSummary(philosophy));
  writeFile(path.join(SECTIONS, 'education.tex'), generateEducation(education));
  writeFile(path.join(SECTIONS, 'experience.tex'), generateExperience(work));
  writeFile(path.join(SECTIONS, 'projects.tex'), generateProjects(projects));
  writeFile(path.join(SECTIONS, 'publication.tex'), generatePublications(pubs));
  writeFile(path.join(SECTIONS, 'honors.tex'), generateHonors(honors));
  writeFile(path.join(SECTIONS, 'leadership.tex'), generateLeadership(activities));
  writeFile(path.join(SECTIONS, 'skills.tex'), generateSkills(skills));
  if (!BRIEF) {
    writeFile(path.join(SECTIONS, 'narrative.tex'), generateNarrative(projects));
  }

  console.log(`\n✅ LaTeX files generated (lang=${LANG}${BRIEF ? ', brief' : ''})`);
  console.log(`   Next: cd latex && xelatex resume.tex && xelatex resume.tex\n`);
}

main();
