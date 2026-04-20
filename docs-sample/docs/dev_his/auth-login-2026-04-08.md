# 인증 로그인 구현

- 날짜: 2026-04-08
- 모듈: auth
- 스펙: engine/engine-spec-auth.md, be/be-spec.md (인증 섹션)
- 난이도: [COMPLEX]
- 모델: engine=Opus, be-detail=Sonnet
- subagent 분할: engine(도메인 로직) + detail(API 라우팅)

## 변경 사항
- AuthService.login 구현 (bcrypt 검증, JWT 발급)
- RefreshToken 엔티티 + 탈취 감지 로직
- POST /api/auth/login 엔드포인트
- POST /api/auth/refresh 엔드포인트

## 테스트
- 단위 테스트 18개, 커버리지 96%
- 통합 테스트 5개 (DB 연동)

## 검증
- bkit gap: PASS (engine-spec-auth.md 로그인/리프레시 요구사항 전체 충족)
- gstack /review: PASS (MINOR 1건 - 에러 메시지 표준화 수정)
- 독립 리뷰: CEO PASS, BE PASS, QA CONCERN (소셜 로그인 테스트 추가 필요)

## 규칙 추가
- Redis 연결 풀 기본값 10 → 환경변수 분리 (→ common/stack.md 반영)
- JWT 만료 시간 15분 확정 (→ engine/engine-spec-auth.md 반영)

## 다음
- 소셜 로그인 구현 (Google, Kakao)
- 비밀번호 재설정 흐름
