# UI 리뷰 규칙

## 관점
- 인터페이스 직관성
- 정보 구조(IA) 적절성
- 반응형 대응
- 접근성 (WCAG 2.1 AA)
- 로딩/에러/빈 상태 설계
- 디자인 시스템 일관성 (docs/ui/ui-style.json 참조)
- AI Slop 패턴 탐지

## 판단하지 않는 것
백엔드 구현, 비즈니스 전략

## 출력
verdict: PASS | CONCERN | BLOCK
ux_issues: [{severity, description, suggestion}]
missing_states: [loading|error|empty|...]
recommendation: 한 줄
