# 오케스트레이션

## 파이프라인

Phase 1: 설계 확정 (Opus)
  superpowers /brainstorm → 질문 기반 아이디어 정제, 설계 문서 생성
  superpowers /write-plan → 태스크 분해 (2~5분 단위, 파일 경로 포함)
  → 각 도메인 폴더의 spec.md에 분리 기록
  확정 조건: 요구사항 완전, 인터페이스 정의, 의존성 명확, 엣지케이스 기술

  새 제품/방향 변경 시:
    gstack /office-hours → 아이디어 검증 (비즈니스 관점)
    gstack /plan-ceo-review → 스코프 판단 (확장/축소/유지)

  아키텍처 확정:
    gstack /plan-eng-review → 데이터 흐름, 다이어그램, 엣지케이스

Phase 2: 독립 리뷰 (review-* 병렬)
  → docs/review/ 참조
  각 에이전트는 동일 문서를 독립적으로 읽음 (상호 결과 공유 금지)
  Orchestrator가 피드백 종합 + 충돌 해결
  설계 리뷰: review-ceo + review-planner + review-engine + review-be + review-ui
  구현 리뷰: review-be + review-ui + review-qa + review-deploy

Phase 3: 태스크 분류 + subagent 파견
  planner가 태스크별로 아래를 지정:
    1. docs/index.md를 확인하여 해당 태스크에 필요한 파일 목록 파악
       - "누가 읽나" 컬럼으로 해당 subagent에 맞는 파일 선별
    2. 난이도 태그 부여
       - [COMPLEX] → Task(complex-implementer) 호출 (Opus)
       - [STANDARD] → Task(standard-implementer) 호출 (Sonnet)
       - [SIMPLE] → Task(standard-implementer) 호출 (Sonnet)
    3. subagent에 구체적으로 읽을 파일 지정
       예: "docs/engine/engine-spec-auth.md, docs/common/coding.md 읽고 작업해"
    4. engine 태스크 분할 시:
       - engine subagent → Task(complex-implementer) (Opus)
         완료 후 인터페이스 확정
       - detail subagent(들) → Task(standard-implementer) (Sonnet)
         engine 인터페이스 + 해당 spec만 전달, 병렬 파견 가능

  난이도 분류 기준:
    [COMPLEX]: 아키텍처 판단, 멀티모듈, 새 패턴, 상태 머신, 동시성
    [STANDARD]: 스펙 기반 단일 모듈, CRUD, API 라우팅
    [SIMPLE]: 반복 패턴, 보일러플레이트, 환경변수, 타입 정의

  subagent 컨텍스트 전달 규칙:
    - subagent는 자기 도메인 폴더 + common/ 만 참조
    - planner가 index.md 기반으로 필요한 파일만 구체 지정
    - 다른 subagent의 코드나 결과는 전달하지 않음
    - engine 완료 후 detail에 전달하는 것은 인터페이스 정의만 (내부 구현 제외)

  TDD 강제 (Superpowers 자동):
    - 실패하는 테스트 → 통과하는 코드 → 리팩터링
    - 테스트 없이 코드 작성 시 삭제

Phase 4: 검증
  순서대로 실행:
    1. gstack /review → 코드 품질 (Opus)
       - N+1, 레이스 컨디션, 신뢰 경계, 누락 인덱스 탐지
       - 완전성 gap도 함께 체크 (spec 대비 구현 누락)
    2. gstack /qa → 실동작 확인 (Sonnet, 필요 시)
       - 브라우저 기반 실제 테스트

  판정:
    PASS → Phase 5
    MINOR → Sonnet으로 수정 태스크 파견 → 해당 항목만 재검증
    MAJOR → 피드백 문서 생성 → 원래 모델로 재실행 → Phase 4 재진입 (최대 3회)
    CRITICAL → Phase 1로 돌아가 설계 수정

  피드백 문서 형식:
    - 어떤 spec.md의 어떤 항목이 미충족인지
    - 현재 코드의 어떤 부분이 문제인지
    - 기대하는 수정 방향
    - 3회 반복 후에도 미해결 시 사람에게 보고

Phase 5: 배포 + 이력
  → docs/deploy/deploy-rules.md 참조
    1. gstack /ship → 테스트 + 커버리지 감사 + PR 생성 (Sonnet)
    2. git push origin {branch} (자동, 사람에게 묻지 않음)
    3. main squash merge
    4. gstack /document-release → spec drift 수정 (Sonnet)
    5. docs/dev_his/{항목}-{날짜}.md 작성
    6. docs/dev_his/summary-YYYY-MM.md 갱신
    7. docs/backlog.md 에서 완료 항목 삭제 (해당 시)
    8. docs/ 하위 적합한 md에 규칙 갱신
    9. CLAUDE.md Code Structure Map 갱신

## CEO 리뷰 호출 기준

gstack /plan-ceo-review는 아래 상황에서만:
- 프로젝트 최초 기획
- 제품 철학, 방향성 변경
- 전체 아키텍처 구조 변경
- 피벗, 기능 대폭 추가/삭제
그 외 → gstack /review 또는 독립 멀티 리뷰.

## 모델 할당 기준

| 작업 | 모델 | 에이전트 |
|------|------|---------|
| 설계 (/brainstorm, /write-plan) | Opus | — |
| CEO/Eng 리뷰 | Opus | review-ceo, review-planner, review-engine, review-be |
| UI/QA/배포 리뷰 | Sonnet | review-ui, review-qa, review-deploy |
| [COMPLEX] 구현 | Opus | complex-implementer |
| engine subagent | Opus | complex-implementer |
| [STANDARD]/[SIMPLE] 구현 | Sonnet | standard-implementer |
| detail subagent | Sonnet | standard-implementer |
| 코드 리뷰 (gstack /review) | Opus | — |
| QA, 배포 | Sonnet | — |

## 독립 리뷰 운영

"독립 리뷰 해줘" 시:
  1. 상황에 따라 에이전트 선택 (아래 표)
  2. 각 에이전트에 동일 문서 전달, 서로 결과 공유 금지
  3. 가능하면 run_in_background: true로 병렬 실행
  4. 전체 수집 후 Orchestrator(Opus)가 종합:
     - 각 verdict 확인 (PASS/CONCERN/BLOCK)
     - 충돌 해결 (예: CEO "확장" vs BE "복잡도 우려" → 트레이드오프 정리)
     - 종합 리포트 생성
  5. BLOCK이 있었던 영역은 수정 후 해당 에이전트만 재파견

| 상황 | 에이전트 |
|------|---------|
| 설계 리뷰 | review-ceo + review-planner + review-engine + review-be + review-ui |
| 구현 리뷰 | review-be + review-ui + review-qa + review-deploy |
| BE 전용 | review-be + review-qa + review-deploy |
| UI 전용 | review-ui + review-qa |
| 핫픽스 | review-qa + review-deploy |
| 방향성 판단 | review-ceo + review-planner |

## engine/세부 다중 subagent 분할

BE 태스크가 아래 조건 중 하나 이상일 때 분할:
  - 핵심 비즈니스 로직 + CRUD 혼재
  - 데이터 모델 설계 + API 라우팅 함께 필요
  - 알고리즘 + 직렬화/검증 함께 필요
  - 여러 서비스/모듈에 걸치는 변경

실행 순서:
  1. docs/index.md에서 engine subagent에 필요한 파일 파악
  2. Task(complex-implementer): engine 핵심 로직 + 인터페이스 정의 (Opus)
     → docs/engine/ + common/ 전달
  3. 인터페이스 확인 (명확하면 진행, 모호하면 피드백 → 재실행)
  4. docs/index.md에서 detail subagent에 필요한 파일 파악
  5. Task(standard-implementer) × N: detail 구현 (Sonnet, 병렬 가능)
     → engine 인터페이스 + 해당 docs/{be|ui}/ 전달
  6. 통합 테스트 실행

분할하지 않는 경우:
  - 단일 모듈 CRUD → standard-implementer 하나로 충분
  - 변경 범위 파일 3개 이내 → 분할 오버헤드가 더 큼
  - 강한 순차 의존성 → 병렬화 이점 없음

## 세션 시작 체크리스트

새 세션 시작 시 아래 순서로 확인:
  1. docs/backlog.md → 보류 항목 중 진행할 것 선택
  2. docs/dev_his/summary-YYYY-MM.md → 최근 완료 항목 파악
  3. CLAUDE.md Code Structure Map → 현재 코드 구조 파악
  4. 해당 도메인 spec.md → 요구사항 확인
  5. 작업 시작