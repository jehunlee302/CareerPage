# 전체 제품 스펙 (마스터)

## 제품 비전
온라인 커머스 플랫폼. 판매자가 상품을 등록하고 구매자가 구매하는 마켓플레이스.

## 핵심 기능
1. 사용자 인증 (회원가입, 로그인, 소셜 로그인)
2. 상품 관리 (등록, 수정, 삭제, 이미지 업로드)
3. 결제 (Stripe 연동, 환불 처리)
4. 주문 관리 (주문 생성, 상태 추적, 알림)
5. 대시보드 (판매자/구매자별 통계)

## 모듈 매핑

| 모듈 | 엔진 스펙 | BE 스펙 | UI 스펙 |
|------|----------|---------|---------|
| 인증 | engine/engine-spec-auth.md | be/be-spec.md (인증 섹션) | ui/ui-spec.md (로그인 화면) |
| 상품 | engine/engine-spec-product.md | be/be-spec.md (상품 API) | ui/ui-spec.md (상품 목록) |
| 결제 | engine/engine-spec-payment.md | be/be-spec.md (결제 API) | ui/ui-spec.md (결제 화면) |
| 주문 | engine/engine-spec.md (주문 섹션) | be/be-spec.md (주문 API) | ui/ui-spec.md (주문 추적) |

## 비기능 요구사항
- 응답 시간: API 95th percentile < 200ms
- 가용성: 99.9%
- 동시 접속: 1,000명
- 보안: OWASP Top 10 준수
