# 엔진 아키텍처

## 계층 구조
```
engine/
├── domain/           ← 순수 도메인 모델 (외부 의존성 없음)
│   ├── entities/     ← User, Order, Payment
│   ├── value-objects/ ← Money, Email, OrderStatus
│   └── errors/       ← DomainError, BusinessError
├── services/         ← 도메인 서비스 (비즈니스 로직 조합)
│   ├── auth.service.ts
│   ├── order.service.ts
│   └── payment.service.ts
├── ports/            ← 인터페이스 (repository, external service)
│   ├── user.repository.ts
│   ├── order.repository.ts
│   └── payment.gateway.ts
└── index.ts          ← 퍼블릭 API (다른 subagent에 노출)
```

## 설계 원칙
- 도메인 계층은 프레임워크 의존성 금지 (NestJS import 없음)
- 모든 외부 의존성은 ports/로 추상화
- 상태 전이는 엔티티 내부에서만 (setState 외부 호출 금지)
- 도메인 이벤트로 사이드 이펙트 처리 (직접 호출 금지)

## 모듈간 의존성
auth → (없음)
order → auth (userId 참조)
payment → order (orderId 참조)
