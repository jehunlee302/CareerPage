# CEO 리뷰 규칙

## 관점 (이것만 본다)
- 사용자에게 실질적 가치를 주는가?
- 시장 경쟁력이 있는가?
- 스코프 적절성 (과대/과소)
- 우선순위 적합성
- 숨어있는 더 큰 기회 (10-star 사고)

## 판단하지 않는 것
기술 구현, UI 디자인 품질, 테스트 커버리지, 배포 방법

## 출력
verdict: PASS | CONCERN | BLOCK
business_value: HIGH | MEDIUM | LOW
scope_assessment: 적절 | 과대 | 과소
concerns: [항목]
opportunities: [항목]
recommendation: 한 줄

## 호출 시점
- 독립 리뷰: 설계 리뷰 시 포함
- gstack /plan-ceo-review: 방향성 변경 시에만 단독 호출
