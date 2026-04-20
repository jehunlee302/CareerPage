# BE 요구사항

## 역할
engine의 도메인 로직을 HTTP API로 노출. 인프라 연동 (DB, 캐시, 외부 서비스).

## API 목록

### 인증
- POST /api/auth/register → AuthService.register
- POST /api/auth/login → AuthService.login
- POST /api/auth/refresh → AuthService.refresh
- POST /api/auth/reset-password → AuthService.resetPassword
- POST /api/auth/social/{provider} → AuthService.socialLogin

### 상품
- GET /api/products → 목록 (페이지네이션, 필터)
- GET /api/products/:id → 상세
- POST /api/products → 등록 (판매자만)
- PATCH /api/products/:id → 수정 (소유자만)
- DELETE /api/products/:id → 삭제 (소유자만)

### 주문
- POST /api/orders → 생성
- GET /api/orders/:id → 상세
- PATCH /api/orders/:id/cancel → 취소
- GET /api/orders → 내 주문 목록

### 결제
- POST /api/payments/intent → PaymentIntent 생성
- POST /api/webhooks/stripe → Stripe 웹훅 수신

## 공통 응답 형식
{ success: boolean, data?: T, error?: { code: string, message: string } }

## 인증/인가
- Bearer JWT (Authorization 헤더)
- 역할: BUYER, SELLER, ADMIN
- 미인증 요청은 401, 권한 부족은 403
