# BE 아키텍처

## 구조
```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   ├── product/
│   ├── order/
│   └── payment/
├── infrastructure/
│   ├── database/
│   │   ├── prisma.service.ts
│   │   └── repositories/    ← engine ports 구현체
│   ├── cache/
│   │   └── redis.service.ts
│   └── external/
│       └── stripe.adapter.ts ← engine PaymentGateway 구현
├── common/
│   ├── guards/              ← JwtAuthGuard, RolesGuard
│   ├── filters/             ← GlobalExceptionFilter
│   ├── interceptors/        ← LoggingInterceptor
│   └── pipes/               ← ZodValidationPipe
└── main.ts
```

## engine 연결
- infrastructure/repositories/ 가 engine/ports/ 인터페이스를 구현
- controller → engine service 호출 → 결과를 DTO로 변환하여 응답
- engine은 직접 import하지 않음, DI로 주입

## DB 마이그레이션
- Prisma Migrate 사용
- 마이그레이션 파일은 항상 롤백 가능하게 작성
- 데이터 삭제 마이그레이션은 별도 PR
