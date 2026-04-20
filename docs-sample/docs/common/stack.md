# 기술 스택

## 언어
- TypeScript 5.4+, Node.js 20 LTS

## 프레임워크
- Backend: NestJS 10
- Frontend: Next.js 14 (App Router)
- ORM: Prisma 5
- 테스트: Jest + Testing Library

## 인프라
- DB: PostgreSQL 16
- 캐시: Redis 7
- 파일 저장: AWS S3
- 결제: Stripe API

## 버전 고정
| 라이브러리 | 버전 | 이유 |
|-----------|------|------|
| zod | 3.22 | 스키마 검증 |
| jose | 5.2 | JWT |
| ioredis | 5.3 | Redis 클라이언트 |

## 패키지 매니저
- pnpm (workspace)

## 린터
- ESLint + Prettier, husky + lint-staged
