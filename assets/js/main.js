/**
 * Jehun Lee Portfolio — main.js v3.1
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
const SOCIAL = { linkedin: 'https://www.linkedin.com/in/jehun-lee/', scholar: 'https://scholar.google.com/citations?user=C7ekyjEAAAAJ' };
const HERO_TAGS = ['Autonomous Scheduling','Digital Twin','Reinforcement Learning','Semiconductor Fab','AI-Native Manufacturing','KAIST Ph.D.'];
const THESIS = { 'Ph.D.': 'Learning Schedulers for Job Shop Scheduling Problems', 'M.S.': '' };
const PROJ_PER_PAGE = 9;
const PUB_PER_PAGE = 8;
const AWARD_PER_PAGE = 6;

let _allProjects = [];
let _projPager, _pubPager, _awardPager;

/* ─── Topic Classification ─── */
function getTopics(title) {
  const t = (title || '').toLowerCase();
  const tags = [];
  if (/schedul|dispatch/.test(t)) tags.push('Scheduling');
  if (/digital twin|simulat/.test(t)) tags.push('Simulation');
  if (/plann/.test(t)) tags.push('Planning');
  if (/reinforcement|machine learning|ai[\s-]|learning/.test(t)) tags.push('AI/RL');
  if (/optim/.test(t)) tags.push('Optimization');
  if (/forecast|demand/.test(t)) tags.push('Forecast');
  if (/manufactur|factory|fab|assembly|logistic/.test(t)) tags.push('Manufacturing');
  if (/platform|saas|iot/.test(t)) tags.push('Platform');
  return tags;
}
function isGov(client) { return /NRF|MOTIE|MSIP|Ministry/i.test(client || ''); }

/* ─── Bootstrap ─── */
async function init() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
    setupNav(); setupScrollReveal(); setupPhotoFallback();
    setupTitleTypewriter(data.basic?.titles || []);
  } catch (err) { console.error('Portfolio load error:', err); }
}

function render(data) {
  renderHero(data); renderImpactStrip(data); renderPhilosophy(data.philosophy); renderResearchFocus();
  renderEducation(data.education); renderExperience(data.workExperience);
  renderFeaturedProjects(data.projects); renderProjects(data.projects);
  renderPublications(data.publications); renderAwards(data.honors);
  renderPatents(data.patents); renderActivities(data.activities); renderSkills(data.skills);
  renderContact(data.basic); renderFooter(data);
}

/* ─── Hero ─── */
function renderHero(data) {
  const el = document.getElementById('heroTags');
  if (el) el.innerHTML = HERO_TAGS.map(t => `<span class="hero-tag">${esc(t)}</span>`).join('');
}

/* ─── Typewriter ─── */
function setupTitleTypewriter(titles) {
  if (!titles.length) return;
  const el = document.getElementById('heroTitleText'); if (!el) return;
  let ti = 0, ci = 0, del = false;
  function tick() {
    const c = titles[ti];
    if (!del) { el.textContent = c.slice(0, ++ci); if (ci === c.length) { del = true; return setTimeout(tick, 2200); } }
    else { el.textContent = c.slice(0, --ci); if (ci === 0) { del = false; ti = (ti + 1) % titles.length; return setTimeout(tick, 350); } }
    setTimeout(tick, del ? 40 : 65);
  }
  setTimeout(tick, 800);
}

/* ─── Impact Strip ─── */
function renderImpactStrip(data) {
  const el = document.getElementById('impactStrip'); if (!el) return;
  const pm = (data.projects||[]).filter(p => p.isPM).length;
  const prizes = (data.honors||[]).filter(h => /prize|first|second|third/i.test(h.title||'')).length;
  [{v:`${(data.projects||[]).length}+`,l:'Major Projects'},{v:`${pm}+`,l:'PM Roles'},{v:`${(data.publications||[]).length}+`,l:'Publications'},{v:prizes,l:'Honors & Prizes'},{v:`${(data.patents||[]).length}`,l:'Patent'}]
    .forEach(it => el.innerHTML += `<div class="impact-item"><span class="impact-num">${esc(String(it.v))}</span><span class="impact-label">${esc(it.l)}</span></div>`);
}

/* ─── Philosophy ─── */
function renderPhilosophy(p) {
  if (!p) return;
  setText('philosophyHeadline', p.headline); setText('philosophyLead', p.lead);
  const b = document.getElementById('philosophyBody');
  if (b) b.innerHTML = p.body.split('\n\n').map(para => `<p>${esc(para)}</p>`).join('');
  const pl = document.getElementById('philosophyPillars');
  if (pl && p.pillars) pl.innerHTML = p.pillars.map(x => `<div class="pillar reveal"><div class="pillar-icon">${x.icon}</div><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`).join('');
}

/* ─── Research ─── */
function renderResearchFocus() {
  const el = document.getElementById('researchGrid'); if (!el) return;
  el.innerHTML = RESEARCH_INTERESTS.map(r => `<div class="research-card reveal"><div class="rc-icon">${r.icon}</div><div class="rc-title">${esc(r.title)}</div><div class="rc-desc">${esc(r.desc)}</div></div>`).join('');
}

/* ─── Education ─── */
function renderEducation(items) {
  const el = document.getElementById('educationTimeline'); if (!el || !items) return;
  el.innerHTML = items.map(item => {
    const thesis = THESIS[item.degree] || '';
    return `<div class="timeline-item reveal">
      <div class="tl-header"><span class="tl-title">${esc(item.degree)} — ${esc(item.major)}</span><span class="tl-period">${esc(item.period)}</span></div>
      <div class="tl-org">${esc(item.institution)}</div>
      ${thesis ? `<div class="edu-thesis">${esc(thesis)}</div>` : ''}
      ${item.remarks ? `<div class="tl-remarks">${parseAdvisor(item.remarks)}</div>` : ''}
    </div>`;
  }).join('');
}
function parseAdvisor(r) {
  const m = r.match(/^(Advisor:\s*[^,]+),\s*(https?:\/\/\S+)$/i);
  return m ? `${esc(m[1].trim())} — <a href="${m[2].trim()}" target="_blank" rel="noopener" class="tl-link">Homepage ↗</a>` : esc(r);
}

/* ─── Experience ─── */
function renderExperience(items) {
  const el = document.getElementById('experienceTimeline'); if (!el || !items) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <div class="tl-header-left">
          <span class="tl-title">${esc(item.position)}</span>
          <span class="tl-org">${esc(item.organization)}${item.division ? ` <span class="tl-sep">|</span> ${esc(item.division)}` : ''}</span>
        </div>
        <div class="tl-header-right">
          <span class="tl-period">${esc(item.period)}</span>
          <span class="tl-region-sm">📍 ${esc(item.region)}</span>
        </div>
      </div>
      <div class="tl-roles">${esc(item.roles)}</div>
    </div>`).join('');
}

/* ─── Featured Projects ─── */
function renderFeaturedProjects(projects) {
  const el = document.getElementById('featuredGrid'); if (!el || !projects) return;
  const featured = FEATURED_PROJECT_INDICES.map(i => projects.find(p => p.index === i)).filter(Boolean);
  el.innerHTML = featured.map(p => `
    <div class="featured-card reveal" data-proj-index="${p.index}">
      <div class="fc-badge">${p.isPM ? '👑 PM · ' : ''}#${p.index}</div>
      <div class="fc-client">${esc(p.client)}${p.affiliatedInstitution ? ` · ${esc(p.affiliatedInstitution)}` : ''}</div>
      <div class="fc-title">${esc(p.title)}</div>
      ${p.remarks ? `<div class="fc-period">${esc(p.remarks)}</div>` : ''}
      <div class="fc-tags"><span class="fc-tag">${esc(p.period)}</span>${p.duration ? `<span class="fc-tag">${esc(p.duration)}</span>` : ''}</div>
    </div>`).join('');

  const sub = document.getElementById('projectSubtitle');
  if (sub) sub.textContent = `${projects.length} projects · ${projects.filter(p => p.isPM).length}+ PM roles`;

  /* featured click → modal */
  el.addEventListener('click', e => {
    const card = e.target.closest('.featured-card');
    if (!card) return;
    const p = _allProjects.find(x => x.index === parseInt(card.dataset.projIndex));
    if (p) openProjectModal(p);
  });
}

/* ─── All Projects (paged + topic filter) ─── */
function renderProjects(items) {
  _allProjects = items || [];
  const el = document.getElementById('projectsGrid'); if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);

  /* Collect all topics */
  const topicSet = new Set();
  sorted.forEach(p => getTopics(p.title).forEach(t => topicSet.add(t)));

  /* Filter bar */
  const fb = document.getElementById('projFilterBar');
  if (fb) fb.innerHTML = [
    '<button class="filter-btn active" data-proj-filter="all">All</button>',
    '<button class="filter-btn" data-proj-filter="pm">PM Lead</button>',
    '<button class="filter-btn" data-proj-filter="gov">Gov\'t</button>',
    ...[...topicSet].sort().map(t => `<button class="filter-btn" data-proj-filter="topic:${t}">${t}</button>`)
  ].join('');

  /* Cards */
  el.innerHTML = sorted.map(p => {
    const topics = getTopics(p.title);
    const gov = isGov(p.client);
    return `
    <div class="project-card reveal" data-paged data-proj-index="${p.index}" data-proj-pm="${p.isPM?'1':'0'}" data-proj-gov="${gov?'1':'0'}" data-proj-topics="${topics.join(',')}">
      <div class="project-meta">
        <div><span class="project-index">#${p.index}</span>
        <span class="project-period">${esc(p.period)}${p.duration?` · ${esc(p.duration)}`:''}</span></div>
        <span class="project-popup-hint">Details ↗</span>
      </div>
      <div class="project-title">${esc(p.title)}</div>
      <div class="project-footer">
        ${p.isPM?'<span class="tag pm">PM</span>':''}
        ${gov?'<span class="tag gov">Gov\'t</span>':''}
        ${topics.map(t=>`<span class="tag topic">${t}</span>`).join('')}
        ${p.client?`<span class="tag">${esc(p.client)}</span>`:''}
      </div>
    </div>`;
  }).join('');

  _projPager = createPager(el, PROJ_PER_PAGE, 'projectsPager');
  setupProjectModal();

  /* filter click */
  const handler = e => {
    const btn = e.target.closest('#projFilterBar .filter-btn'); if (!btn) return;
    document.querySelectorAll('#projFilterBar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.projFilter;
    el.querySelectorAll('[data-paged]').forEach(c => {
      let show = true;
      if (f === 'pm') show = c.dataset.projPm === '1';
      else if (f === 'gov') show = c.dataset.projGov === '1';
      else if (f.startsWith('topic:')) show = (c.dataset.projTopics||'').split(',').includes(f.slice(6));
      else show = f === 'all';
      c.dataset.filtered = show ? '' : '1';
    });
    _projPager.reset();
  };
  document.getElementById('projFilterBar')?.addEventListener('click', handler);
}

/* ─── Publications (paged) ─── */
function renderPublications(items) {
  const el = document.getElementById('pubList'); if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(pub => {
    const isIntl = pub.global;
    let dt, tb;
    if (pub.type === 'Poster') { dt='Poster'; tb=`<span class="badge badge-poster">Poster</span>`; }
    else if (pub.type === 'Journal') { dt=isIntl?'Journal-International':'Journal-Domestic'; tb=isIntl?`<span class="badge badge-journal">Intl. Journal</span>`:`<span class="badge badge-journal badge-domestic">Dom. Journal</span>`; }
    else { dt=isIntl?'Conference-International':'Conference-Domestic'; tb=isIntl?`<span class="badge badge-conf">Intl. Conf.</span>`:`<span class="badge badge-conf badge-domestic">Dom. Conf.</span>`; }
    const fb = pub.role==='1st Author'?`<span class="badge badge-1st">1st Author</span>`:'';
    const venue = [pub.venue,pub.year,pub.remarks].filter(Boolean).join(' · ');
    const link = pub.link?`<a href="${pub.link}" target="_blank" rel="noopener" class="pub-link">View Paper ↗</a>`:'';
    return `<div class="pub-item reveal" data-paged data-type="${dt}">
      <span class="pub-num">[${pub.index}]</span>
      <div class="pub-body">
        <div class="pub-main">
          <div class="pub-authors">${esc(pub.authors)}</div>
          <div class="pub-title">"${esc(pub.title)}"</div>
          <div class="pub-venue">${esc(venue)}</div>
        </div>
        <div class="pub-side">${link}<div class="pub-badges">${tb}${fb}</div></div>
      </div>
    </div>`;
  }).join('');

  _pubPager = createPager(el, PUB_PER_PAGE, 'pubPager');

  document.querySelector('.pub-filter-bar')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    document.querySelectorAll('.pub-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    el.querySelectorAll('[data-paged]').forEach(item => { item.dataset.filtered = (f!=='all' && item.dataset.type!==f) ? '1' : ''; });
    _pubPager.reset();
  });
}

/* ─── Awards (paged) ─── */
function renderAwards(items) {
  const el = document.getElementById('awardsList'); if (!el || !items) return;
  el.innerHTML = items.map(a => `
    <div class="award-card reveal" data-paged>
      <div class="award-date${a.date?'':' award-date-unknown'}">${a.date ? esc(a.date) : '—'}</div>
      <div class="award-title">${esc(a.title)}</div>
      ${a.description?`<div class="award-desc">${esc(a.description)}</div>`:''}
      <div class="award-org">${esc(a.organization)}</div>
      ${a.remarks?`<span class="award-remarks">${esc(a.remarks)}</span>`:''}
    </div>`).join('');
  _awardPager = createPager(el, AWARD_PER_PAGE, 'awardsPager');
}

/* ─── Reusable Pager ─── */
function createPager(gridEl, perPage, navId) {
  let page = 0;
  const nav = document.getElementById(navId);
  if (!nav) return { show(){}, reset(){} };
  nav.className = 'paged-nav-inline';
  nav.innerHTML = `<button class="paged-btn paged-prev" disabled>←</button><span class="paged-info"></span><button class="paged-btn paged-next">→</button>`;
  const prev = nav.querySelector('.paged-prev'), next = nav.querySelector('.paged-next'), info = nav.querySelector('.paged-info');
  prev.addEventListener('click', () => { page--; show(); });
  next.addEventListener('click', () => { page++; show(); });

  function show() {
    const all = [...gridEl.querySelectorAll('[data-paged]')];
    const vis = all.filter(el => !el.dataset.filtered);
    const total = Math.ceil(vis.length / perPage) || 1;
    page = Math.max(0, Math.min(page, total - 1));
    all.forEach(el => el.style.display = 'none');
    vis.slice(page * perPage, (page + 1) * perPage).forEach(el => el.style.display = '');
    info.textContent = `${page+1} / ${total}`;
    prev.disabled = page === 0; next.disabled = page >= total - 1;
    reReveal(gridEl);
  }
  show();
  return { show, reset() { page = 0; show(); } };
}

function reReveal(container) {
  container.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.05 });
    io.observe(el);
  });
}

/* ─── Skills ─── */
function renderSkills(skills) {
  const el = document.getElementById('skillsGrid'); if (!el || !skills) return;
  el.innerHTML = Object.entries(skills).map(([c,t]) => `<div class="skill-card reveal"><div class="skill-category">${esc(c)}</div><div class="skill-tags">${t.map(x=>`<span class="skill-tag">${esc(x)}</span>`).join('')}</div></div>`).join('');
}

/* ─── Patents ─── */
function renderPatents(items) {
  const el = document.getElementById('patentsList'); if (!el || !items) return;
  el.innerHTML = items.map(p => `<div class="patent-card reveal"><div class="patent-title">${esc(p.title)}</div><div class="patent-desc">${esc(p.description)}</div><div class="patent-meta"><span><strong>No.</strong> ${esc(p.applicationNumber)}</span><span><strong>Filed</strong> ${esc(p.applicationDate)}</span><span><strong>Applicant</strong> ${esc(p.applicant)}</span><span><strong>Authority</strong> ${esc(p.authority)}</span></div></div>`).join('');
}

/* ─── Activities ─── */
function renderActivities(items) {
  const el = document.getElementById('activitiesGrid'); if (!el || !items) return;
  el.innerHTML = items.map(a => `<div class="activity-card reveal"><span class="activity-role">${esc(a.role)}</span><span class="activity-org">${esc(a.organization)}</span><span class="activity-period">${esc(a.period)}</span><span class="activity-location">📍 ${esc(a.location)}</span></div>`).join('');
}

/* ─── Contact ─── */
function renderContact(basic) {
  const el = document.getElementById('contactCards'); if (!el || !basic) return;
  const cs = [];
  if (basic.email) basic.email.forEach(em => cs.push({i:'✉️',l:'Email',v:em,h:`mailto:${em}`}));
  cs.push({i:'💼',l:'LinkedIn',v:'linkedin.com/in/jehun-lee',h:SOCIAL.linkedin});
  cs.push({i:'📚',l:'Google Scholar',v:'scholar.google.com',h:SOCIAL.scholar});
  if (basic.googleSite) cs.push({i:'🌐',l:'Google Site',v:'sites.google.com/view/jehun-lee',h:basic.googleSite});
  if (basic.location) cs.push({i:'📍',l:'Location',v:basic.location,h:null});
  el.innerHTML = cs.map(c => {
    const inn = `<div class="contact-icon">${c.i}</div><div class="contact-info"><span class="contact-label">${esc(c.l)}</span><span class="contact-value">${esc(c.v)}</span></div>`;
    return c.h ? `<a href="${c.h}" target="${c.h.startsWith('mailto')?'_self':'_blank'}" rel="noopener" class="contact-card">${inn}</a>` : `<div class="contact-card">${inn}</div>`;
  }).join('');
}

/* ─── Footer ─── */
function renderFooter(data) {
  const y = document.getElementById('footerYear'); if (y) y.textContent = new Date().getFullYear();
  const u = document.getElementById('lastUpdated'); if (u && data.lastUpdated) u.textContent = data.lastUpdated;
}

/* ─── Photo Fallback ─── */
function setupPhotoFallback() {
  const img = document.getElementById('profileImg'), fb = document.getElementById('photoFallback');
  if (!img || !fb) return;
  img.addEventListener('error', () => { img.style.display='none'; fb.style.display='flex'; });
  img.addEventListener('load', () => { fb.style.display='none'; });
  if (img.complete && !img.naturalWidth) { img.style.display='none'; fb.style.display='flex'; }
}

/* ─── Project Modal ─── */
function setupProjectModal() {
  const grid = document.getElementById('projectsGrid'), modal = document.getElementById('projectModal');
  if (!grid || !modal || grid.dataset.modalReady) return;
  grid.dataset.modalReady = '1';
  grid.addEventListener('click', e => {
    const card = e.target.closest('.project-card'); if (!card) return;
    const p = _allProjects.find(x => x.index === parseInt(card.dataset.projIndex));
    if (p) openProjectModal(p);
  });
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
function openProjectModal(p) {
  const body = document.getElementById('modalBody'), modal = document.getElementById('projectModal');
  if (!body || !modal) return;
  const topics = getTopics(p.title);
  const fields = [['Period',`${p.period}${p.duration?' · '+p.duration:''}`],p.client&&['Client',p.client],p.partnerInstitution&&['Partner',p.partnerInstitution],p.affiliatedInstitution&&['Affiliated',p.affiliatedInstitution],p.remarks&&['Remarks',p.remarks]].filter(Boolean);
  body.innerHTML = `
    <div class="modal-badge">${p.isPM?'👑 PM · ':''}Project #${p.index}${isGov(p.client)?' · Gov\'t':''}</div>
    <div class="modal-title">${esc(p.title)}</div>
    ${topics.length?`<div style="display:flex;gap:.3rem;margin-bottom:.8rem;flex-wrap:wrap">${topics.map(t=>`<span class="tag topic">${t}</span>`).join('')}</div>`:''}
    ${fields.map(([l,v])=>`<div class="modal-field"><span class="modal-field-label">${esc(l)}</span><span class="modal-field-value">${esc(v)}</span></div>`).join('')}`;
  modal.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('projectModal')?.classList.remove('open'); document.body.style.overflow=''; }

/* ─── Navigation ─── */
function setupNav() {
  const nb = document.getElementById('navbar'), tg = document.getElementById('navToggle'), lk = document.getElementById('navLinks');
  window.addEventListener('scroll', () => { nb.classList.toggle('scrolled', window.scrollY > 40); highlightNav(); }, { passive: true });
  tg?.addEventListener('click', () => lk?.classList.toggle('open'));
  lk?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => lk.classList.remove('open')));
}
function highlightNav() {
  const y = window.scrollY + 80;
  document.querySelectorAll('main section[id]').forEach(s => {
    if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y)
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${s.id}`));
  });
}

/* ─── Scroll Reveal ─── */
function setupScrollReveal() {
  const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
  const obs = () => document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  obs(); setTimeout(obs, 400);
}

/* ─── Helpers ─── */
function setText(id, t) { const e = document.getElementById(id); if (e) e.textContent = t || ''; }
function esc(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

document.addEventListener('DOMContentLoaded', init);
