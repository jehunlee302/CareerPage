# Docs 파일 맵

전체 문서 매핑. 어떤 내용을 찾으려면 이 파일에서 위치를 확인한다.

## 루트

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| prod.md | 전체 제품 스펙 마스터 | orchestrator, planner |
| orchestration.md | 오케스트레이션 파이프라인, 모델 할당, 리뷰 운영 | orchestrator |
| backlog.md | 보류 개발 항목 (세션 간 유지) | 세션 시작 시 전원 |
| index.md | 이 파일. 전체 문서 매핑 | 누구든 |

## common/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| coding.md | 공통 코딩 규칙 (네이밍, 에러, 로깅, 타입, 테스트) | 모든 구현 subagent |
| stack.md | 기술 스택, 라이브러리 버전 고정 | 모든 구현 subagent |

## review/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| review-ceo.md | CEO 리뷰 기준 (비즈니스 가치, 스코프) | review-ceo agent |
| review-planner.md | 기획 리뷰 기준 (요구사항 완전성, 엣지케이스) | review-planner agent |
| review-engine.md | 엔진 리뷰 기준 (도메인 모델, 인터페이스) | review-engine agent |
| review-be.md | BE 리뷰 기준 (API, DB, 보안, 성능) | review-be agent |
| review-ui.md | UI 리뷰 기준 (UX, 접근성, AI Slop) | review-ui agent |
| review-qa.md | QA 리뷰 기준 (테스트 시나리오, 회귀) | review-qa agent |
| review-deploy.md | 배포 리뷰 기준 (환경, 마이그레이션, 롤백) | review-deploy agent |

## engine/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| engine-spec.md | 엔진 전체 요구사항 | engine subagent |
| engine-spec-{모듈}.md | 모듈별 요구사항 (auth, payment 등) | 해당 모듈 subagent |
| engine-architecture.md | 엔진 전체 설계 (계층, 원칙, 의존성) | engine subagent |
| engine-architecture-{모듈}.md | 모듈별 설계 (엔티티, 시퀀스) | 해당 모듈 subagent |
| engine-coding.md | 엔진 코딩 규칙 (도메인 순수성, 서비스 규칙) | engine subagent |

## be/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| be-spec.md | BE 요구사항 (API 목록, 응답 형식, 인증) | be subagent |
| be-architecture.md | BE 구조 (NestJS 모듈, DB, engine 연결) | be subagent |
| be-coding.md | BE 코딩 규칙 (컨트롤러, 리포지토리, 에러) | be subagent |

## ui/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| ui-spec.md | UI 요구사항 (화면 목록, 상태 처리, 반응형) | ui subagent |
| ui-design-system.md | 디자인 시스템 (타이포, 색상, 스페이싱, 모션) | ui subagent |
| ui-style.json | 디자인 토큰 (색상/폰트/스페이싱 수치) | ui subagent |
| ui-coding.md | UI 코딩 규칙 (컴포넌트, 상태관리, 접근성) | ui subagent |

## qa/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| qa-strategy.md | 테스트 전략 (피라미드, 환경, 품질 게이트) | qa agent, orchestrator |
| qa-scenarios.md | 테스트 시나리오 (인증, 결제, 주문, E2E) | qa agent |
| qa-coverage.md | 커버리지 기준 (모듈별 목표, 측정 도구) | qa agent |
| qa-test-data.md | 테스트 데이터 규칙 (픽스처, 시드, 격리) | qa agent |

## deploy/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| deploy-rules.md | 배포 규칙 + git push 자동화 절차 | orchestrator, gstack /ship |
| deploy-environments.md | 환경별 설정 (local/staging/prod, 환경변수) | deploy agent |
| deploy-cicd.md | CI/CD 파이프라인 (GitHub Actions 단계) | deploy agent |
| deploy-rollback.md | 롤백 절차, 모니터링, 알림 | deploy agent |

## dev_his/

| 파일 | 내용 | 누가 읽나 |
|------|------|----------|
| summary-YYYY-MM.md | 월별 완료 요약 테이블 | 세션 시작 시 |
| {항목}-{날짜}.md | 건별 상세 이력 | 필요 시 |