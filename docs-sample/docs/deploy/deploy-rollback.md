# 롤백 / 모니터링

## 롤백 절차
1. 이전 Docker 이미지로 재배포 (태그 기반)
2. DB 마이그레이션 롤백: prisma migrate resolve + 수동 down migration
3. 롤백 후 스모크 테스트 실행
4. docs/dev_his/ 에 롤백 이력 기록

## 롤백 불가 상황
- 데이터 삭제 마이그레이션 적용 후 → 백업에서 복구 필요
- 외부 서비스 연동 변경 (Stripe 웹훅 URL 등) → 수동 복구

## 모니터링
- 에러율: 5xx > 1% → 알림
- 응답 시간: p95 > 500ms → 알림
- DB 커넥션: > 80% → 알림

## 알림 채널
- Slack #alerts 채널
- 심각: PagerDuty 호출
