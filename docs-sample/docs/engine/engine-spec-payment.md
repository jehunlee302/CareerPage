# 엔진 요구사항: 결제 모듈

## 요구사항
- Stripe PaymentIntent 기반 결제
- 부분 환불 / 전체 환불
- 결제 실패 시 주문 상태 롤백
- 웹훅으로 결제 상태 동기화

## 도메인 규칙
- 결제 금액은 주문 총액과 일치해야 함
- 환불 금액은 결제 금액을 초과할 수 없음
- 이미 환불된 주문에 중복 환불 불가

## 인터페이스
- PaymentService.createIntent(orderId, amount): PaymentIntent
- PaymentService.confirm(paymentIntentId): Payment
- PaymentService.refund(paymentId, amount?): Refund
- PaymentService.handleWebhook(event): void
