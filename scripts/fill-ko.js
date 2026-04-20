/**
 * fill-ko.js — Auto-fill Korean translations in YAML files
 * One-time script. Fills common terms, institutions, positions, etc.
 *
 * Usage: node scripts/fill-ko.js
 */

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const CAREER = path.join(__dirname, '..', 'data', 'career');

function loadYaml(f) { return yaml.load(fs.readFileSync(path.join(CAREER, f), 'utf8')); }
function saveYaml(f, data) { fs.writeFileSync(path.join(CAREER, f), yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"', forceQuotes: false }), 'utf8'); }

// ── basic.yaml ────────────────────────────────
function fillBasic() {
  const d = loadYaml('basic.yaml');
  const titleKo = {
    'Industrial & Systems Engineer (Ph.D.)': '산업및시스템공학 박사',
    'Simulation Solution Consultant': '시뮬레이션 솔루션 컨설턴트',
    'AI Solution Architect': 'AI 솔루션 아키텍트',
  };
  if (d.titles) d.titles.forEach(t => { if (t.en && !t.ko) t.ko = titleKo[t.en] || ''; });
  saveYaml('basic.yaml', d);
  console.log('  basic.yaml — titles filled');
}

// ── education.yaml ────────────────────────────
function fillEducation() {
  const d = loadYaml('education.yaml');
  const instKo = {
    'Korea Advanced Institute of Science and Technology (KAIST)': '한국과학기술원',
    'Sungkyunkwan University (SKKU)': '성균관대학교',
    'Sejong Science High School': '세종과학고등학교',
  };
  const majorKo = {
    'Industrial & Systems Engineering': '산업및시스템공학과',
    'Industrial Engineering': '산업공학과',
    'Systems Management Engineering': '시스템경영공학과',
    'Math & Science Track': '수학·과학 과정',
  };
  d.forEach(e => {
    if (e.institution?.en && !e.institution?.ko) e.institution.ko = instKo[e.institution.en] || '';
    if (e.major?.en && !e.major?.ko) e.major.ko = majorKo[e.major.en] || '';
  });
  saveYaml('education.yaml', d);
  console.log('  education.yaml — institutions, majors filled');
}

// ── work.yaml ─────────────────────────────────
function fillWork() {
  const d = loadYaml('work.yaml');
  const posKo = {
    'Planning & Scheduling Solution Consultant': '생산계획 솔루션 컨설턴트',
    'Technical Research Personnel': '전문연구요원',
    'Researcher': '연구원',
  };
  d.forEach(w => {
    if (w.position?.en && !w.position?.ko) w.position.ko = posKo[w.position.en] || '';
  });
  saveYaml('work.yaml', d);
  console.log('  work.yaml — positions filled');
}

// ── skills.yaml ───────────────────────────────
function fillSkills() {
  const d = loadYaml('skills.yaml');
  const catKo = { Programming: '프로그래밍', Tools: '도구', Languages: '언어' };
  for (const [key, val] of Object.entries(d)) {
    if (val.label?.en && !val.label?.ko) val.label.ko = catKo[val.label.en] || '';
  }
  saveYaml('skills.yaml', d);
  console.log('  skills.yaml — category labels filled');
}

// ── honors.yaml ───────────────────────────────
function fillHonors() {
  const d = loadYaml('honors.yaml');
  const titleKo = {
    'Second Prize, Ph.D. Thesis Competition': '2등상, 박사논문경진대회',
    'First Prize, 2023 Simulation Challenge': '1등상, 2023 Simulation Challenge',
    'Third Prize, 2023 AI Competition: Solving Real-world Problems': '3등상, 2023 AI Competition: 실제 문제 해결',
    'Ph.D. Candidate Research Incentive Support': '박사과정생 연구장려 지원사업',
    'Second Prize, 2022 Poster Competition: Industry/Social Problems': '2등상, 2022 포스터경진대회: 산업/사회문제',
    'Certificate of Appreciation: Successful Project': '감사장: 우수 프로젝트',
    'Full-tuition Entrance Scholarship': '전액 입학 장학금',
    'Third Prize, 2015-2016 PACE RSMS Competition (Second Year): Customer Insight': '3등상, 2015-2016 PACE RSMS Competition (2차): Customer Insight',
    'Third Prize, 2015-2016 PACE RSMS Competition (Second Year): Manufacturing Engineering': '3등상, 2015-2016 PACE RSMS Competition (2차): Manufacturing Engineering',
  };
  const descKo = {
    'Learning Schedulers for Job Shop Scheduling Problems': '잡 샵 스케줄링 문제를 위한 학습 기반 스케줄러',
    'Gating Control in Semiconductor Fabrication': '반도체 팹 게이팅 제어',
    'Integrated Planning Module using AI': 'AI를 활용한 통합 계획 모듈',
    'RL for Resource Leveling in Shipbuilding': '선박건조 자원 평활화를 위한 강화학습',
    'Workload Balancing of Ship Cargo Production': '선박 화물 생산 부하 분산',
    'Merit-based Entrance Scholarship (Ph.D.)': '성적 우수 입학 장학금 (박사)',
    'Merit-based Entrance Scholarship (B.S.)': '성적 우수 입학 장학금 (학사)',
  };
  d.forEach(h => {
    if (h.title?.en && !h.title?.ko) h.title.ko = titleKo[h.title.en] || '';
    if (h.description?.en && !h.description?.ko) h.description.ko = descKo[h.description.en] || '';
  });
  saveYaml('honors.yaml', d);
  console.log('  honors.yaml — titles, descriptions filled');
}

// ── patents.yaml ──────────────────────────────
function fillPatents() {
  const d = loadYaml('patents.yaml');
  d.forEach(p => {
    if (p.title?.en && !p.title?.ko) p.title.ko = '공정 최적화 방법';
    if (p.description?.en && !p.description?.ko) p.description.ko = '반자동 조립 공정에서의 실시간 작업자 할당 최적화 방법';
  });
  saveYaml('patents.yaml', d);
  console.log('  patents.yaml — title, description filled');
}

// ── activities.yaml ───────────────────────────
function fillActivities() {
  const d = loadYaml('activities.yaml');
  const roleKo = {
    'Researcher Representative': '연구실 대표',
    'Technical Mentor': '기술 멘토',
    'Teaching Assistant (TA)': '조교',
    'President': '회장',
    'Working Group Member': '운영위원',
  };
  const orgKo = {
    'Manufacturing and Service Systems Lab. (KAIST)': 'MSS (Manufacturing Service Systems) 연구실 (KAIST)',
    'Public Data Internship Program (Korea National Information Society Agency)': '공공데이터 인턴십 프로그램 (한국정보화진흥원)',
    'Scheduling (KAIST)': 'Scheduling 수업 (KAIST)',
    'Supply Chain Management (SKKU)': '공급사슬관리 수업 (SKKU)',
    'Industrial Engineering Graduate Student Council (SKKU)': '산업공학과 대학원 학생회 (SKKU)',
    'Operations Management (SKKU)': '생산관리 수업 (SKKU)',
    'Gender Awareness Education (SKKU)': '양성평등교육 (SKKU)',
    'Engineering Economy (SKKU)': '공학경제 수업 (SKKU)',
    'Operations Research and Practice 1 (SKKU)': '경영과학 및 실습 1 수업 (SKKU)',
    'Systems Management Engineering Student Council (SKKU)': '시스템경영공학과 학생회 (SKKU)',
    'Turbo: Basketball Club (SKKU)': 'Turbo: 농구 동아리 (SKKU)',
    'College of Engineering Student Council (SKKU)': '공과대학 학생회 (SKKU)',
  };
  d.forEach(a => {
    if (a.role?.en && !a.role?.ko) a.role.ko = roleKo[a.role.en] || '';
    if (a.organization?.en && !a.organization?.ko) a.organization.ko = orgKo[a.organization.en] || '';
  });
  saveYaml('activities.yaml', d);
  console.log('  activities.yaml — roles, orgs filled');
}

// ── projects (all files) ──────────────────────
function fillProjects() {
  const titleKo = {
    'Digital twin platform construction: production-logistics simulation-based operation twin for semiconductor fab': '디지털 트윈 플랫폼 구축: 반도체 팹 생산-물류 시뮬레이션 기반 운영 트윈',
    'Simulation-based real-time scheduler for semiconductor fab': '반도체 팹 시뮬레이션 기반 실시간 스케줄러',
    'Autonomous scheduling for swift and efficient adaptation to dynamic manufacturing environments': '동적 제조 환경의 신속하고 효율적인 적응을 위한 자율 스케줄링',
    'AI-based algorithm for optimal operation plans for various scenarios': '다양한 시나리오에 대한 최적 운영 계획을 위한 AI 기반 알고리즘',
    'Reinforcement learning for unrelated parallel machine scheduling problems with sequence-dependent setup times and machine eligibility': '순서 의존 셋업 시간 및 설비 자격을 고려한 비관련 병렬 기계 스케줄링을 위한 강화학습',
    'Production planning with AI': 'AI를 활용한 생산계획 수립',
    'Graph-based reinforcement learning algorithm for real-time job shop scheduling': '실시간 잡 샵 스케줄링을 위한 그래프 기반 강화학습 알고리즘',
    'Reinforcement learning for job shop scheduling': '잡 샵 스케줄링을 위한 강화학습',
    'Development of a wiring optimization algorithm for X-DEC slim layout': 'X-DEC 슬림 레이아웃 배선 최적화 알고리즘 개발',
    'Reinforcement learning-based meta-scheduling for manufacturing systems': '제조 시스템을 위한 강화학습 기반 메타 스케줄링',
    'Reinforcement learning for project scheduling': '프로젝트 스케줄링을 위한 강화학습',
    'Development of a reinforcement learning algorithm for workload balancing of ship cargo production': '선박 화물 생산 부하 분산을 위한 강화학습 알고리즘 개발',
    'Optimal machine assignment with machine learning algorithms': '머신러닝 알고리즘을 활용한 최적 설비 할당',
    'Cyber-physical assembly and logistics systems in global supply chains': '글로벌 공급망 내 사이버-물리 조립 및 물류 시스템',
    'Optimal weight sets for dispatching rules with multiple KPIs': '다중 KPI를 고려한 디스패칭 룰 최적 가중치 도출',
    'Big data-based simulation and optimization technology for smart manufacturing': '스마트 제조를 위한 빅데이터 기반 시뮬레이션 및 최적화 기술',
    'Development of scheduling theory and algorithms with reinforcement learning for manufacturing systems': '제조 시스템을 위한 강화학습 기반 스케줄링 이론 및 알고리즘 개발',
    'Methodology for dispatching rules\' weights': '디스패칭 룰 가중치 방법론',
    'Framework development for KPI analysis with various weights on dispatching rules': '디스패칭 룰 가중치에 따른 KPI 분석 프레임워크 개발',
    'Analysis of KPIs according to weights on dispatching rules for LCD manufacturing': 'LCD 제조 디스패칭 룰 가중치에 따른 KPI 분석',
    'Design and analysis for operations optimizations of smart factory testbed': '스마트 팩토리 테스트베드 운영 최적화 설계 및 분석',
    'Development of scheduling and rescheduling algorithms for 3D printer-based smart factory': '3D 프린터 기반 스마트 팩토리 스케줄링/리스케줄링 알고리즘 개발',
    'Development of algorithms for detecting and improving inefficient schedules in LCD processes': 'LCD 공정 비효율 스케줄 탐지 및 개선 알고리즘 개발',
    'Development of open FaaS IoT service platform for mass personalization': '대량 개인맞춤을 위한 개방형 FaaS IoT 서비스 플랫폼 개발',
  };

  const files = fs.readdirSync(CAREER).filter(f => f.startsWith('projects-') && f.endsWith('.yaml'));
  for (const f of files) {
    const d = loadYaml(f);
    let changed = 0;
    d.forEach(p => {
      if (p.title?.en && !p.title?.ko && titleKo[p.title.en]) {
        p.title.ko = titleKo[p.title.en];
        changed++;
      }
    });
    if (changed) {
      saveYaml(f, d);
      console.log(`  ${f} — ${changed} titles filled`);
    }
  }
}

// ── philosophy.yaml ───────────────────────────
function fillPhilosophy() {
  const d = loadYaml('philosophy.yaml');
  if (d.headline && !d.headline.ko) d.headline.ko = '체계적 탁월함';
  if (d.lead && !d.lead.ko) d.lead.ko = 'AI 네이티브 엔지니어링 — 한계적 효율이 아닌, 반복적 복잡성으로부터 인간의 잠재력을 해방하기 위해.';

  const pillarKo = {
    'AI-Native Engineering': 'AI 네이티브 엔지니어링',
    'Industrial Execution': '산업 실행력',
    'Human-Centric Future': '인간 중심 미래',
  };
  const pillarDescKo = {
    'Deploying intelligent systems that transform industrial operations from the ground up — not as a tool, but as a foundational shift.': '산업 운영을 근본부터 변혁하는 지능형 시스템 — 도구가 아닌, 패러다임의 전환으로.',
    'Translating academic depth into measurable, scalable business impact across semiconductor, logistics, and manufacturing domains.': '학문적 깊이를 반도체, 물류, 제조 영역에서 측정 가능하고 확장 가능한 비즈니스 임팩트로 전환.',
    'Technology as a catalyst for a purposeful industrial ecosystem where human potential is amplified, not replaced.': '인간의 잠재력이 대체되는 것이 아닌 증폭되는, 목적 지향적 산업 생태계를 위한 촉매로서의 기술.',
  };
  const statKo = {
    'Major Projects': '주요 프로젝트',
    'Publications': '논문',
    'Years at KAIST': 'KAIST 재학',
    'Patent': '특허',
  };

  if (d.pillars) d.pillars.forEach(p => {
    if (p.title?.en && !p.title?.ko) p.title.ko = pillarKo[p.title.en] || '';
    if (p.desc?.en && !p.desc?.ko) p.desc.ko = pillarDescKo[p.desc.en] || '';
  });
  if (d.stats) d.stats.forEach(s => {
    if (s.label?.en && !s.label?.ko) s.label.ko = statKo[s.label.en] || '';
  });

  saveYaml('philosophy.yaml', d);
  console.log('  philosophy.yaml — headline, lead, pillars, stats filled');
}

// ── Run all ───────────────────────────────────
console.log('Filling Korean translations...\n');
fillBasic();
fillEducation();
fillWork();
fillSkills();
fillHonors();
fillPatents();
fillActivities();
fillProjects();
fillPhilosophy();
console.log('\nDone! Run "node scripts/yaml-to-json.js --lang ko" to verify.');
