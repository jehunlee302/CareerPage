/**
 * Jehun Lee Portfolio — main.js v2.0
 */

const DATA_URL = 'data/portfolio.json';

const RESEARCH_INTERESTS = [
  { icon: '🤖', title: 'Autonomous Scheduling', desc: 'AI-driven dynamic scheduling for real-time manufacturing environments' },
  { icon: '🧠', title: 'Reinforcement & Imitation Learning', desc: 'Graph-based RL/IL algorithms for real-time industrial decision-making' },
  { icon: '🏭', title: 'Digital Twin & Simulation', desc: 'Production-logistics simulation platforms for semiconductor fabs' },
  { icon: '💾', title: 'Semiconductor Fab Optimization', desc: 'Real-time scheduling and operation planning for advanced semiconductor manufacturing' },
  { icon: '📐', title: 'Meta-Scheduling Architecture', desc: 'Generalizable agent architectures adaptable to diverse manufacturing environments' },
  { icon: '🔗', title: 'AI-Native Manufacturing', desc: 'End-to-end AI integration in smart factory systems and SaaS platforms' },
];

const FEATURED_PROJECT_INDICES = [25, 23, 21];

const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/jehun-lee/',
  scholar:  'https://scholar.google.com/citations?user=C7ekyjEAAAAJ',
};

const HERO_TAGS = [
  'Autonomous Scheduling', 'Digital Twin', 'Reinforcement Learning',
  'Semiconductor Fab', 'AI-Native Manufacturing', 'KAIST Ph.D.'
];

/* ─── Bootstrap ─── */
async function init() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
    setupNav();
    setupScrollReveal();
    setupFilterButtons();
    setupPhotoFallback();
    setupTitleTypewriter(data.basic?.titles || []);
  } catch (err) {
    console.error('Portfolio load error:', err);
  }
}

function render(data) {
  renderHero(data);
  renderImpactStrip(data);
  renderPhilosophy(data.philosophy);
  renderResearchFocus();
  renderExperience(data.workExperience);
  renderFeaturedProjects(data.projects);
  renderProjects(data.projects);
  renderPublications(data.publications);
  renderEducation(data.education);
  renderSkills(data.skills);
  renderAwards(data.honors);
  renderPatents(data.patents);
  renderActivities(data.activities);
  renderContact(data.basic);
  renderFooter(data);
}

/* ─── Hero ─── */
function renderHero(data) {
  // Tags
  const tagsEl = document.getElementById('heroTags');
  if (tagsEl) {
    tagsEl.innerHTML = HERO_TAGS.map(t => `<span class="hero-tag">${esc(t)}</span>`).join('');
  }
}

/* ─── Title Typewriter ─── */
function setupTitleTypewriter(titles) {
  if (!titles.length) return;
  const el = document.getElementById('heroTitleText');
  if (!el) return;
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const current = titles[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; return setTimeout(tick, 2200); }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; return setTimeout(tick, 350); }
    }
    setTimeout(tick, deleting ? 40 : 65);
  }
  setTimeout(tick, 800);
}

/* ─── Impact Strip ─── */
function renderImpactStrip(data) {
  const el = document.getElementById('impactStrip');
  if (!el) return;
  const pmCount = (data.projects || []).filter(p => p.isPM).length;
  const intlPrizes = (data.honors || []).filter(h =>
    (h.title || '').toLowerCase().includes('prize') || (h.title || '').toLowerCase().includes('first') || (h.title || '').toLowerCase().includes('second') || (h.title || '').toLowerCase().includes('third')
  ).length;

  const items = [
    { value: `${(data.projects || []).length}+`, label: 'Major Projects' },
    { value: `${pmCount}+`,  label: 'PM Roles' },
    { value: `${(data.publications || []).length}+`, label: 'Publications' },
    { value: intlPrizes,     label: 'Honors & Prizes' },
    { value: `${(data.patents || []).length}`,        label: 'Patent' },
  ];

  el.innerHTML = items.map(it => `
    <div class="impact-item">
      <span class="impact-num">${esc(String(it.value))}</span>
      <span class="impact-label">${esc(it.label)}</span>
    </div>
  `).join('');
}

/* ─── Philosophy ─── */
function renderPhilosophy(p) {
  if (!p) return;
  setText('philosophyHeadline', p.headline);
  setText('philosophyLead', p.lead);
  const bodyEl = document.getElementById('philosophyBody');
  if (bodyEl) bodyEl.innerHTML = p.body.split('\n\n').map(para => `<p>${esc(para)}</p>`).join('');
  const pillarsEl = document.getElementById('philosophyPillars');
  if (pillarsEl && p.pillars) {
    pillarsEl.innerHTML = p.pillars.map(pl => `
      <div class="pillar reveal">
        <div class="pillar-icon">${pl.icon}</div>
        <h3>${esc(pl.title)}</h3>
        <p>${esc(pl.desc)}</p>
      </div>`).join('');
  }
}

/* ─── Research Focus ─── */
function renderResearchFocus() {
  const el = document.getElementById('researchGrid');
  if (!el) return;
  el.innerHTML = RESEARCH_INTERESTS.map(r => `
    <div class="research-card reveal">
      <div class="rc-icon">${r.icon}</div>
      <div class="rc-title">${esc(r.title)}</div>
      <div class="rc-desc">${esc(r.desc)}</div>
    </div>`).join('');
}

/* ─── Experience ─── */
function renderExperience(items) {
  const el = document.getElementById('experienceTimeline');
  if (!el || !items) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <span class="tl-title">${esc(item.position)}</span>
        <span class="tl-period">${esc(item.period)}</span>
      </div>
      <div class="tl-org">${esc(item.organization)}</div>
      ${item.division ? `<div class="tl-div">${esc(item.division)}</div>` : ''}
      <div class="tl-roles">${esc(item.roles)}</div>
      <div class="tl-region">📍 ${esc(item.region)}</div>
    </div>`).join('');
}

/* ─── Featured Projects ─── */
function renderFeaturedProjects(projects) {
  const el = document.getElementById('featuredGrid');
  if (!el || !projects) return;
  const featured = FEATURED_PROJECT_INDICES
    .map(idx => projects.find(p => p.index === idx))
    .filter(Boolean);

  el.innerHTML = featured.map(p => {
    const isPM = p.isPM;
    return `
    <div class="featured-card reveal">
      <div class="fc-badge">
        ${isPM ? '👑 PM Lead · ' : ''}Project #${p.index}
      </div>
      <div class="fc-client">${esc(p.client)}${p.affiliatedInstitution ? ` · ${esc(p.affiliatedInstitution)}` : ''}</div>
      <div class="fc-title">${esc(p.title)}</div>
      ${p.remarks ? `<div class="fc-period">${esc(p.remarks)}</div>` : ''}
      <div class="fc-tags">
        <span class="fc-tag">${esc(p.period)}</span>
        ${p.duration ? `<span class="fc-tag">${esc(p.duration)}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  // Project subtitle
  const sub = document.getElementById('projectSubtitle');
  if (sub) sub.textContent = `${projects.length} research & industry projects · ${projects.filter(p => p.isPM).length}+ as Project Manager`;
}

/* ─── All Projects ─── */
function renderProjects(items) {
  const el = document.getElementById('projectsGrid');
  if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(p => {
    const isPM = p.isPM;
    return `
    <div class="project-card reveal">
      <div class="project-meta">
        <span class="project-index">PROJECT #${p.index}</span>
        <span class="project-period">${esc(p.period)}${p.duration ? ` · ${esc(p.duration)}` : ''}</span>
      </div>
      <div class="project-title">${esc(p.title)}</div>
      ${p.remarks ? `<div class="project-remarks">${esc(p.remarks)}</div>` : ''}
      <div class="project-footer">
        ${isPM ? '<span class="tag pm">PM Lead</span>' : ''}
        ${p.client ? `<span class="tag">${esc(p.client)}</span>` : ''}
        ${p.affiliatedInstitution ? `<span class="tag org">${esc(p.affiliatedInstitution)}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

/* ─── Publications ─── */
function renderPublications(items) {
  const el = document.getElementById('pubList');
  if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(pub => {
    const typeBadge = pub.type === 'Journal'
      ? `<span class="badge badge-journal">Journal</span>`
      : pub.type === 'Poster'
        ? `<span class="badge badge-poster">Poster</span>`
        : `<span class="badge badge-conf">Conference</span>`;
    const firstBadge  = pub.role === '1st Author' ? `<span class="badge badge-1st">1st Author</span>` : '';
    const globalBadge = pub.global ? `<span class="badge badge-global">International</span>` : '';
    const venue = [pub.venue, pub.year, pub.remarks].filter(Boolean).join(' · ');
    const link  = pub.link ? `<a href="${pub.link}" target="_blank" rel="noopener" class="pub-link">View Paper ↗</a>` : '';
    return `
    <div class="pub-item reveal" data-type="${esc(pub.type)}">
      <span class="pub-num">[${pub.index}]</span>
      <div class="pub-body">
        <div class="pub-authors">${esc(pub.authors)}</div>
        <div class="pub-title">"${esc(pub.title)}"</div>
        <div class="pub-venue">${esc(venue)}</div>
        <div class="pub-badges">${typeBadge}${firstBadge}${globalBadge}</div>
        ${link}
      </div>
    </div>`;
  }).join('');
}

/* ─── Education ─── */
function renderEducation(items) {
  const el = document.getElementById('educationTimeline');
  if (!el || !items) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <span class="tl-title">${esc(item.degree)} — ${esc(item.major)}</span>
        <span class="tl-period">${esc(item.period)}</span>
      </div>
      <div class="tl-org">${esc(item.institution)}</div>
      <div class="tl-region">📍 ${esc(item.region)}</div>
      ${item.remarks ? `<div class="tl-remarks">${
        item.labUrl
          ? `${esc(item.remarks.split('·')[0].trim())} · <a href="${item.labUrl}" target="_blank" rel="noopener" class="tl-link">MSS Lab ↗</a>`
          : esc(item.remarks)
      }</div>` : ''}
    </div>`).join('');
}

/* ─── Skills ─── */
function renderSkills(skills) {
  const el = document.getElementById('skillsGrid');
  if (!el || !skills) return;
  el.innerHTML = Object.entries(skills).map(([cat, tags]) => `
    <div class="skill-card reveal">
      <div class="skill-category">${esc(cat)}</div>
      <div class="skill-tags">${tags.map(t => `<span class="skill-tag">${esc(t)}</span>`).join('')}</div>
    </div>`).join('');
}

/* ─── Awards ─── */
function renderAwards(items) {
  const el = document.getElementById('awardsList');
  if (!el || !items) return;
  el.innerHTML = items.map(a => `
    <div class="award-card reveal">
      <div class="award-date">${esc(a.date)}</div>
      <div class="award-title">${esc(a.title)}</div>
      ${a.description ? `<div class="award-desc">${esc(a.description)}</div>` : ''}
      <div class="award-org">${esc(a.organization)} · ${esc(a.location)}</div>
      ${a.remarks ? `<span class="award-remarks">${esc(a.remarks)}</span>` : ''}
    </div>`).join('');
}

/* ─── Patents ─── */
function renderPatents(items) {
  const el = document.getElementById('patentsList');
  if (!el || !items) return;
  el.innerHTML = items.map(p => `
    <div class="patent-card reveal">
      <div class="patent-title">${esc(p.title)}</div>
      <div class="patent-desc">${esc(p.description)}</div>
      <div class="patent-meta">
        <span><strong>No.</strong> ${esc(p.applicationNumber)}</span>
        <span><strong>Filed</strong> ${esc(p.applicationDate)}</span>
        <span><strong>Applicant</strong> ${esc(p.applicant)}</span>
        <span><strong>Authority</strong> ${esc(p.authority)}</span>
      </div>
    </div>`).join('');
}

/* ─── Activities ─── */
function renderActivities(items) {
  const el = document.getElementById('activitiesGrid');
  if (!el || !items) return;
  el.innerHTML = items.map(a => `
    <div class="activity-card reveal">
      <span class="activity-role">${esc(a.role)}</span>
      <span class="activity-org">${esc(a.organization)}</span>
      <span class="activity-period">${esc(a.period)}</span>
      <span class="activity-location">📍 ${esc(a.location)}</span>
    </div>`).join('');
}

/* ─── Contact ─── */
function renderContact(basic) {
  const el = document.getElementById('contactCards');
  if (!el || !basic) return;
  const contacts = [];

  if (basic.email) {
    basic.email.forEach(em => contacts.push({ icon: '✉️', label: 'Email', value: em, href: `mailto:${em}` }));
  }
  contacts.push({ icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/jehun-lee', href: SOCIAL.linkedin });
  contacts.push({ icon: '📚', label: 'Google Scholar', value: 'scholar.google.com', href: SOCIAL.scholar });
  if (basic.googleSite) contacts.push({ icon: '🌐', label: 'Google Site', value: 'sites.google.com/view/jehun-lee', href: basic.googleSite });
  if (basic.location)   contacts.push({ icon: '📍', label: 'Location', value: basic.location, href: null });

  el.innerHTML = contacts.map(c => {
    const inner = `
      <div class="contact-icon">${c.icon}</div>
      <div class="contact-info">
        <span class="contact-label">${esc(c.label)}</span>
        <span class="contact-value">${esc(c.value)}</span>
      </div>`;
    return c.href
      ? `<a href="${c.href}" target="${c.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener" class="contact-card">${inner}</a>`
      : `<div class="contact-card">${inner}</div>`;
  }).join('');
}

/* ─── Footer ─── */
function renderFooter(data) {
  const y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
  const u = document.getElementById('lastUpdated');
  if (u && data.lastUpdated) u.textContent = data.lastUpdated;
}

/* ─── Photo Fallback ─── */
function setupPhotoFallback() {
  const img      = document.getElementById('profileImg');
  const fallback = document.getElementById('photoFallback');
  if (!img || !fallback) return;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    fallback.style.display = 'flex';
  });
  img.addEventListener('load', () => {
    fallback.style.display = 'none';
  });
  // Check if already broken
  if (img.complete && !img.naturalWidth) {
    img.style.display = 'none';
    fallback.style.display = 'flex';
  }
}

/* ─── Navigation ─── */
function setupNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightNav();
  }, { passive: true });

  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function highlightNav() {
  const scrollY = window.scrollY + 80;
  document.querySelectorAll('main section[id]').forEach(sec => {
    if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
      });
    }
  });
}

/* ─── Scroll Reveal ─── */
function setupScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });

  const observe = () => document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  observe();
  setTimeout(observe, 400);
}

/* ─── Publication Filter ─── */
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.pub-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.type !== filter);
      });
    });
  });
}

/* ─── Helpers ─── */
function setText(id, text) { const e = document.getElementById(id); if (e) e.textContent = text || ''; }
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', init);
