# BE 리뷰 규칙

## 관점
- API 설계 일관성 (RESTful, 네이밍)
- 데이터 모델 적절성 (정규화, 인덱스)
- 인증/인가 안전성
- N+1, 레이스 컨디션 위험
- 에러 핸들링 체계성
- 확장성 (캐싱, 큐, 분산)
- 외부 서비스 장애 대응

## 판단하지 않는 것
UI, 비즈니스 의사결정

## 출력
verdict: PASS | CONCERN | BLOCK
architecture_issues: [{severity, category, description, suggestion}]
recommendation: 한 줄
