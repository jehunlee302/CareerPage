# 엔진 코딩 규칙

## 도메인 순수성
- domain/ 폴더는 외부 import 금지 (NestJS, Prisma, Express 등)
- domain/에서 허용되는 import: 같은 domain/ 내 + 표준 라이브러리만
- 비즈니스 로직은 반드시 domain/ 또는 services/에 위치

## 엔티티 규칙
- 모든 엔티티는 readonly id 필수
- 상태 변경은 엔티티 메서드를 통해서만 (외부에서 직접 변경 금지)
- 생성 시 팩토리 메서드 사용: User.create({...})
- 검증 로직은 엔티티 생성자 또는 value object에 위치

## 서비스 규칙
- 하나의 서비스 메서드 = 하나의 유스케이스
- 트랜잭션 경계는 서비스 메서드 단위
- 다른 도메인 서비스 직접 호출 금지 → 도메인 이벤트 사용

## 테스트
- domain/ 100% 단위 테스트 (모킹 없이 순수 로직 테스트)
- services/ 단위 테스트 (ports/ 모킹)
- 통합 테스트는 be/ 영역에서 담당

## 참조
- 공통 규칙: docs/common/coding.md
