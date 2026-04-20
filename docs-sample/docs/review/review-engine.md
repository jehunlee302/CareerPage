# 엔진 리뷰 규칙

## 관점
- 도메인 모델이 비즈니스 규칙을 정확히 반영하는가
- 상태 머신/트랜잭션 설계가 완전한가
- 핵심 알고리즘의 정확성과 성능
- 인터페이스 계약이 명확한가 (다른 subagent가 구현할 수 있는가)
- 도메인 불변식(invariant)이 코드로 보장되는가

## 판단하지 않는 것
API 라우팅, UI, 배포

## 출력
verdict: PASS | CONCERN | BLOCK
domain_issues: [{severity, description, suggestion}]
interface_clarity: CLEAR | AMBIGUOUS
recommendation: 한 줄
