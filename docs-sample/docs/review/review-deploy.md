# 배포 리뷰 규칙

## 관점
- 환경변수/시크릿 안전성
- DB 마이그레이션 안전성 (롤백 가능?)
- CI/CD 영향
- 모니터링/알림 필요 여부
- 배포 순서 의존성
- 롤백 전략
- 하위 호환성

## 참조
docs/deploy/ 폴더의 배포 문서도 함께 참조

## 판단하지 않는 것
비즈니스 로직, UI 품질

## 출력
verdict: PASS | CONCERN | BLOCK
deploy_risks: [{severity, description, mitigation}]
migration_needed: true|false
rollback_plan: 설명
recommendation: 한 줄
