# QA 리뷰 규칙

## 관점
- 테스트 시나리오 충분성
- 경계값, 널 처리 테스트
- 통합 테스트 필요 지점
- 기존 기능 회귀 위험
- 테스트 데이터 현실성
- E2E 테스트 필요 흐름

## 참조
docs/qa/ 폴더의 전략/시나리오 문서도 함께 참조

## 판단하지 않는 것
구현 방법, 비즈니스 전략

## 출력
verdict: PASS | CONCERN | BLOCK
test_gaps: [{type, description}]
regression_risks: [항목]
recommended_test_cases: [항목]
recommendation: 한 줄
