# CLAUDE.md

## Frameworks
gstack(판단·리뷰·QA·배포) + Superpowers(설계·실행·TDD)

## Model
메인: opusplan. subagent 기본: sonnet. 판단 → Opus, 실행 → Sonnet.

## Docs 규칙
- docs/ 아래 최대 depth 3. 이 이상 금지.
- 이 파일에 상세 규칙 작성 금지. docs/ 참조.
- 파일명은 도메인 접두사 필수 (engine-spec.md, ui-coding.md).
- subagent는 자기 도메인 폴더 + common/ 만 참조.
- 그 안에서 어떤 md를 볼지는 planner가 파견 시 지정.

## Docs 맵

docs/
├── index.md             ← 전체 파일 매핑
├── prod.md              ← 전체 스펙 (orchestrator용)
├── orchestration.md     ← 오케스트레이션 허브
├── backlog.md           ← 보류 개발 항목 (세션 간 유지)
├── common/              ← 공통 (coding, stack)
├── review/              ← 리뷰 규칙 (review-ceo, review-be, ...)
├── engine/              ← 엔진 (spec, architecture, coding, 모듈별 분할)
├── be/                  ← BE (spec, architecture, coding)
├── ui/                  ← UI (spec, design-system, style.json, coding)
├── qa/                  ← QA (strategy, scenarios, coverage, test-data)
├── deploy/              ← 배포 (rules, environments, cicd, rollback)
└── dev_his/             ← 개발 이력
    ├── summary-YYYY-MM.md   ← 월별 완료 요약
    └── {항목}-{날짜}.md      ← 건별 상세

## Subagent 참조 원칙

subagent는 자기 도메인 폴더 + common/ 만 본다.
planner가 docs/index.md를 확인하여 필요한 파일을 파악하고,
"docs/engine/engine-spec-auth.md, common/coding.md 읽고 작업해" 식으로 구체 지정.

엔진 모듈이 많으면:
  engine-spec-{모듈}.md + engine-architecture-{모듈}.md 로 분할.
  subagent에 해당 모듈 파일만 전달.

## Routing

| 트리거 | 스킬 | 시작점 |
|--------|------|--------|
| 아이디어 검증 | gstack /office-hours | orchestration.md |
| 설계 | superpowers /brainstorm → /write-plan | orchestration.md |
| 방향성 변경 | gstack /plan-ceo-review | review/review-ceo.md |
| 아키텍처 확정 | gstack /plan-eng-review | review/review-be.md |
| 엔진 구현 | superpowers subagent | engine/ + common/ |
| BE 구현 | superpowers subagent | be/ + common/ |
| UI 구현 | superpowers subagent | ui/ + common/ |
| 코드 리뷰 | gstack /review | — |
| QA | gstack /qa | qa/ |
| 배포 | gstack /ship | deploy/ |
| 독립 리뷰 | Task(review-*) 병렬 | review/ |

## Orchestration 요약

상세 → docs/orchestration.md

설계 (superpowers /brainstorm → /write-plan, Opus)
  → 아키텍처 확정 (gstack /plan-eng-review)
  → 독립 리뷰 (review/ 참조, 병렬)
  → planner가 index.md 확인 → 태스크별 참조 md + 에이전트 지정
    [COMPLEX] → Task(complex-implementer) Opus
    [STANDARD]/[SIMPLE] → Task(standard-implementer) Sonnet
  → subagent 실행 (자기 폴더 + common/, TDD)
    BE 대규모 시 → engine(Opus) → detail(Sonnet) 분할
  → 검증 (gstack /review + /qa)
  → 배포 (gstack /ship, deploy/ 참조, 자동 git push + PR)
  → 이력 (dev_his/summary-YYYY-MM.md + {항목}-{날짜}.md)
  → 보류 항목 갱신 (backlog.md)

## 보류 항목
→ docs/backlog.md 참조. 세션 시작 시 읽고 우선순위 판단할 것.

## 개발 이력
→ docs/dev_his/ 참조.
- 완료 요약: dev_his/summary-YYYY-MM.md (월별)
- 상세 이력: dev_his/{항목}-{날짜}.md (건별)
- 매 개발 종료 시 상세 이력 작성 + 월별 요약 갱신
- 발견된 규칙은 해당 docs/ md에 즉시 반영

## 독립 멀티에이전트 리뷰

"독립 리뷰 해줘" → review/ 참조.
에이전트 병렬 파견, 서로 결과 공유 금지.

| 상황 | 에이전트 |
|------|---------|
| 설계 리뷰 | CEO + 기획 + engine + BE + UI |
| 구현 리뷰 | BE + UI + QA + 배포 |
| BE 전용 | BE + QA + 배포 |
| UI 전용 | UI + QA |
| 핫픽스 | QA + 배포 |

## Code Structure Map

src/
(배포 시마다 갱신)

## Drift 감지
- spec에 있고 코드에 없음 → gstack /review + /qa
- 코드에 있고 spec에 없음 → gstack /document-release
- 동작 불일치 → gstack /qa