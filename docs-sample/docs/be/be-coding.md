# BE 코딩 규칙

## 컨트롤러
- 비즈니스 로직 금지. engine service 호출만.
- 요청 검증은 Zod 스키마 + ZodValidationPipe
- 응답은 반드시 DTO 클래스로 변환 (엔티티 직접 반환 금지)

## 리포지토리
- engine/ports/ 인터페이스를 구현
- Prisma 쿼리만 사용 (raw SQL 금지, 불가피 시 주석에 사유)
- 페이지네이션: cursor 기반 우선, offset은 관리자용만

## 미들웨어/가드
- 인증: JwtAuthGuard (모든 보호 라우트)
- 인가: @Roles() 데코레이터 + RolesGuard
- 로깅: LoggingInterceptor (요청/응답 자동 로깅)

## 에러 응답
- engine DomainError → 400
- engine BusinessError → 422
- 인증 실패 → 401
- 권한 부족 → 403
- 미발견 → 404
- 서버 에러 → 500 (상세 숨김)

## 참조
- 공통 규칙: docs/common/coding.md
- 엔진 인터페이스: docs/engine/engine-spec.md
