# 공통 코딩 규칙

## 네이밍
- 변수/함수: camelCase
- 클래스/타입: PascalCase
- 상수: UPPER_SNAKE_CASE
- 파일명: kebab-case
- DB 테이블/컬럼: snake_case

## 에러 핸들링
- 모든 외부 호출은 try-catch 필수
- 에러 메시지에 민감 정보 포함 금지
- 비즈니스 에러와 시스템 에러 구분 (BusinessError vs SystemError)
- 에러 코드 체계: {도메인}-{번호} (예: AUTH-001, PAY-003)

## 로깅
- 구조화된 JSON 로깅 (timestamp, level, message, context)
- 레벨: ERROR(장애), WARN(경고), INFO(비즈니스 이벤트), DEBUG(개발용)
- 민감 정보 마스킹 필수 (비밀번호, 토큰, 카드번호)
- 요청별 traceId 부여

## 타입 안전성
- any 타입 사용 금지 (TypeScript)
- 모든 함수에 파라미터/리턴 타입 명시
- 널 체크: optional chaining + nullish coalescing 사용

## 주석
- "왜" 하는지 작성. "무엇"은 코드가 말한다.
- TODO에 담당자와 이슈 번호 필수: // TODO(jehun): #123

## 테스트
- 새 기능은 반드시 테스트 동반 (TDD - Superpowers 자동 강제)
- 테스트 파일명: {대상}.test.ts
- 단위 테스트는 외부 의존성 모킹 필수
