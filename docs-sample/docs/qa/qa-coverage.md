# QA 커버리지 기준

## 모듈별 목표

| 모듈 | 단위 | 통합 | E2E |
|------|------|------|-----|
| engine/domain | 100% | — | — |
| engine/services | 90% | — | — |
| be/controllers | — | 90% | — |
| be/repositories | — | 80% | — |
| ui/components | 80% | — | — |
| ui/pages | — | — | 핵심 플로우 |

## 측정 도구
- Jest --coverage (Istanbul)
- 리포트: lcov + HTML

## 커버리지 하락 방지
- PR에서 기존 대비 커버리지 하락 시 CI 실패
- 신규 파일 커버리지 0%이면 CI 경고
