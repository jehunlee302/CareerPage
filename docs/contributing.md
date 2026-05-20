# Contributing Guide

프로젝트에 코드/문서를 추가하거나 수정할 때 지켜야 할 구조 및 일관성 규칙.
신규 개발자는 이 문서를 반드시 읽고 시작할 것.

---

## 1. 폴더 구조 규칙

### 현재 구조

```
CareerPage/
├── assets/          # 웹 정적 자산 (css, js, img)
├── data/            # 데이터 소스 + 생성물
│   └── career/      # YAML 원본 (single source of truth)
├── docs/            # 모든 문서
│   ├── ui/          # 디자인 시스템, 컴포넌트, 섹션
│   ├── data/        # 데이터 스키마, 컨버터 문서
│   └── history/     # 개발 이력 (changelog)
├── latex/           # Resume PDF 빌드 (cls, fonts, sections)
├── scripts/         # 빌드/변환 스크립트
└── root files       # index.html, CLAUDE.md, deploy.bat, etc.
```

### 폴더 생성 규칙

| 규칙 | 설명 |
|------|------|
| **2파일 이상일 때만 폴더 생성** | 파일 1개를 위한 폴더는 만들지 않는다. `docs/deploy.md`처럼 플랫하게 유지 |
| **최대 깊이 3단계** | `docs/ui/design-system.md`가 최대. 그 이상 중첩하지 않는다 |
| **폴더 이름은 영문 소문자** | `kebab-case` 사용. 예: `design-system`, `my-feature` |
| **약어 금지** | `dev_his` → `history`, `eng` → `engine` 등. 누구나 읽고 바로 이해할 수 있는 이름 |
| **역할 기반 이름** | 폴더 이름은 "무엇이 들어있는가"를 설명. `ui/`(UI 관련), `data/`(데이터 관련) |

### 새 폴더가 필요한 경우 판단 기준

```
파일 1개 → docs/ 루트에 플랫하게 배치
파일 2개 이상 + 같은 주제 → 폴더 생성
파일 5개 이상 → 하위 폴더 고려 (단, 3단계 초과 금지)
```

---

## 2. 파일 명명 규칙

### 일반 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| MD 문서 | `kebab-case.md` | `design-system.md`, `coding.md` |
| YAML 데이터 | `{section}.yaml` 또는 `{section}-{year}.yaml` | `projects-2024-2025.yaml` |
| JS/CSS | `camelCase` 또는 `kebab-case` (기존 패턴 따름) | `main.js`, `style.css` |
| 스크립트 | `kebab-case.js` 또는 `kebab-case.bat` | `yaml-to-json.js` |
| 이미지 | `kebab-case.{ext}` | `background.jpg` |
| Generated 파일 | 원본 이름 기반 | `portfolio.json`, `portfolio.ko.json` |

### 금지 사항

- 파일명에 한글 사용 금지 (Git/GitHub 호환성)
- 공백 대신 하이픈(`-`) 사용
- 언더스코어(`_`) 대신 하이픈(`-`) 사용 (YAML key는 예외: `is_pm`)
- 대문자 시작 금지 (CLAUDE.md, CNAME 등 관례적 예외 제외)

---

## 3. 문서 작성 규칙

### 단일 소스 원칙 (Single Source of Truth)

**같은 정보를 2곳에 쓰지 않는다.** 중복 시 반드시 하나를 참조(`See [file.md]`)로 대체.

| 정보 | 정의 위치 | 다른 곳에서는 |
|------|-----------|---------------|
| 파일 맵 | `CLAUDE.md` | 참조만 ("See CLAUDE.md") |
| 파이프라인 다이어그램 | `pipeline.md` | 한 줄 요약 + 링크 |
| 디자인 토큰 (색상/폰트/간격) | `ui/design-system.md` | 참조만 |
| YAML 스키마 | `data/schema.md` | 참조만 |
| 배포 명령어 | `deploy.md` | 참조만 |

### 문서 계층 (Navigation Depth)

```
CLAUDE.md          ← 진입점. "무엇을 읽어야 하는지" 안내
  └── docs/index.md  ← 전체 문서 지도. 각 문서의 목적과 대상 독자
        └── 개별 문서    ← 실제 규칙/스펙 상세
```

- **CLAUDE.md**: 5분 안에 프로젝트 파악 가능해야 함. 세부 규칙은 docs/ 링크로
- **docs/index.md**: 모든 문서의 목록 + 한 줄 설명. 새 문서 추가 시 여기도 갱신
- **개별 문서**: 하나의 주제에 집중. 다른 주제는 링크로 연결

### 새 문서 추가 시 체크리스트

1. [ ] `docs/index.md`에 항목 추가
2. [ ] `CLAUDE.md` Rules 테이블에 해당 시 추가
3. [ ] Document Hierarchy 트리에 반영
4. [ ] 기존 문서와 내용 중복 없는지 확인
5. [ ] 2파일 이상이 되어 폴더가 필요한 경우 폴더 생성

### 문서 포맷

모든 MD 문서는 다음 구조를 따른다:

```markdown
# 문서 제목 (H1, 파일당 1개)

첫 줄: 이 문서가 무엇인지 한 문장 설명.

## 큰 주제 (H2)

### 세부 주제 (H3)

내용.
```

- H1은 파일당 1개
- H2로 주요 섹션 구분
- H3 이하로 세부 항목
- H4 이상은 가급적 사용하지 않음 (깊이가 깊으면 별도 문서로 분리)
- 테이블은 비교/매핑에 적극 활용
- 코드 블록은 언어 태그 명시 (````css`, ````js`, ````bash`)

---

## 4. 코드 추가/수정 규칙

### 소스 파일 원칙

| 원칙 | 설명 |
|------|------|
| **단일 파일 유지** | CSS는 `style.css` 1개, JS는 `main.js` 1개. 분할하지 않는다 |
| **Generated 파일 직접 수정 금지** | `portfolio.json`, `portfolio.ko.json`, `latex/sections/*.tex` |
| **YAML이 데이터의 유일한 원본** | 웹사이트에 표시되는 모든 커리어 데이터는 `data/career/*.yaml`에서 시작 |

### 새 섹션/컴포넌트 추가 시

1. **YAML 스키마 확장** → `data/schema.md` 갱신
2. **컨버터 수정** → `scripts/yaml-to-json.js` + `data/converter.md` 갱신
3. **HTML 섹션 추가** → `index.html` + `ui/sections.md` 갱신
4. **CSS 스타일 추가** → `style.css` + `ui/components.md` 갱신
5. **JS 렌더러 추가** → `main.js` (40줄 이하 함수, `esc()` 필수)
6. **디자인 토큰 추가** → `style.css` `:root` + `ui/design-system.md` 갱신

### 문서 동기화 의무

**코드를 수정하면 관련 문서도 함께 수정한다.** 같은 커밋 또는 같은 PR에 포함.

| 코드 변경 | 갱신해야 할 문서 |
|-----------|-----------------|
| CSS 변수/토큰 추가 | `ui/design-system.md` |
| 새 컴포넌트 추가 | `ui/components.md` |
| 섹션 추가/순서 변경 | `ui/sections.md` |
| YAML 스키마 변경 | `data/schema.md` |
| 빌드 스크립트 변경 | `data/converter.md` |
| 배포 프로세스 변경 | `deploy.md` |
| 반응형 breakpoint 변경 | `ui/design-system.md` Responsive 섹션 |
| 새 파일 추가 | `CLAUDE.md` File Map + `docs/index.md` |

---

## 5. YAML 데이터 규칙

### 파일 분할 기준

| 데이터 | 파일 분할 | 이유 |
|--------|----------|------|
| Projects | 연도별 2년 단위 (`projects-2024-2025.yaml`) | 파일 크기 관리 |
| Publications | 연도별 2년 단위 | 파일 크기 관리 |
| 나머지 | 섹션당 1파일 (`basic.yaml`, `skills.yaml`) | 항목 수가 적음 |

### 새 YAML 파일 추가 시

- 기존 파일명 패턴을 따른다: `{section}-{start year}-{end year}.yaml`
- `scripts/yaml-to-json.js`의 `loadMerged()` prefix와 일치해야 한다
- `docs/pipeline.md` File Organization 섹션에 반영

---

## 6. Git 규칙

### 커밋 메시지

```
type: short description (영문, 현재형, 소문자)
```

| Type | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `docs` | 문서만 변경 |
| `build` | 빌드 스크립트, deploy.bat, yaml-to-json.js 등 |
| `style` | CSS/UI 변경 (기능 변경 없음) |

### 브랜치

```
feat/add-search-filter
fix/mobile-nav-overlap
docs/update-schema
refactor/split-render-functions
```

### PR 규칙

- 코드 변경 PR에는 관련 문서 변경도 포함
- `docs/backlog.md`에서 해당 항목 제거 (완료 시 `history/`로 이동)

---

## 7. 규칙 변경 절차

이 문서(`contributing.md`) 자체를 수정할 때:

1. 변경 이유를 커밋 메시지에 명시
2. `docs/history/summary-YYYY-MM.md`에 변경 사항 기록
3. 관련된 다른 문서(`CLAUDE.md`, `docs/index.md`)의 정합성 확인
