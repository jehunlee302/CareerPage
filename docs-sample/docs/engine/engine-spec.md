# 엔진 요구사항 (전체)

## 역할
비즈니스 핵심 로직. API나 UI에 독립적인 도메인 계층.

## 모듈 목록
- 인증 (auth) → engine-spec-auth.md
- 결제 (payment) → engine-spec-payment.md
- 주문 (order) → 이 파일 하단 참조

## 주문 도메인
### 요구사항
- 주문 생성 시 재고 차감 (원자적)
- 주문 상태: PENDING → PAID → SHIPPED → DELIVERED / CANCELLED
- 취소는 SHIPPED 전까지만 가능
- 상태 전이 규칙 외 전이 시 DomainError 발생

### 인터페이스
- OrderService.create(items, userId): Order
- OrderService.cancel(orderId, reason): Order
- OrderService.updateStatus(orderId, status): Order
