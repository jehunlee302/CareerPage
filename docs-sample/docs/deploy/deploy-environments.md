# 환경별 설정

## 환경 목록

| 환경 | 용도 | DB | URL |
|------|------|-----|-----|
| local | 개발 | Docker PostgreSQL | localhost:3000 |
| staging | 통합 테스트 | RDS (staging) | staging.example.com |
| production | 운영 | RDS (prod) | example.com |

## 환경변수 관리
- .env.local: 로컬 (git 미추적)
- .env.staging: 스테이징 (CI/CD secrets)
- .env.production: 프로덕션 (CI/CD secrets)

## 환경변수 목록
| 변수 | 설명 | 예시 |
|------|------|------|
| DATABASE_URL | DB 연결 문자열 | postgresql://... |
| REDIS_URL | Redis 연결 | redis://... |
| JWT_SECRET | JWT 서명 키 | (32자 랜덤) |
| STRIPE_SECRET_KEY | Stripe API 키 | sk_test_... |
| STRIPE_WEBHOOK_SECRET | 웹훅 검증 키 | whsec_... |
| S3_BUCKET | 파일 저장 버킷 | my-app-uploads |
