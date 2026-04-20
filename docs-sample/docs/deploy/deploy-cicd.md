# CI/CD 파이프라인

## GitHub Actions

### PR 생성 시
1. lint (ESLint + Prettier)
2. type check (tsc --noEmit)
3. 단위 테스트 (Jest)
4. 통합 테스트 (Docker Compose)
5. 커버리지 체크 (최소 80%)
6. E2E 테스트 (Playwright)

### main 머지 시
1. 위 전체 + 빌드
2. Docker 이미지 빌드 + push
3. staging 자동 배포
4. staging E2E 스모크 테스트
5. 수동 승인 후 production 배포

## 타임아웃
- 단위/통합: 10분
- E2E: 15분
- 전체 파이프라인: 30분
