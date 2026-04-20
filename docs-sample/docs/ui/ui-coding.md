# UI 코딩 규칙

## 컴포넌트
- 함수형 컴포넌트만 (class 컴포넌트 금지)
- 파일당 하나의 export 컴포넌트
- props 타입은 컴포넌트 파일 상단에 정의
- 디자인 시스템 토큰 직접 사용 (하드코딩 색상/스페이싱 금지 → ui-style.json)

## 상태 관리
- 서버 상태: TanStack Query
- 클라이언트 상태: Zustand (전역) / useState (로컬)
- URL 상태: searchParams (필터, 페이지네이션)

## 스타일
- Tailwind CSS 유틸리티 클래스 기본
- 커스텀 CSS는 CSS Modules (.module.css)
- 인라인 스타일 금지

## 접근성
- 모든 인터랙티브 요소에 aria-label
- 키보드 내비게이션 필수 (Tab, Enter, Escape)
- 색상 대비: WCAG AA (4.5:1)
- 이미지에 alt 필수

## API 연동
- API 호출은 lib/api/ 에 모아둠 (컴포넌트에서 직접 fetch 금지)
- 에러 핸들링: ErrorBoundary + toast 알림
- 낙관적 업데이트: TanStack Query mutate + onMutate

## 참조
- 공통 규칙: docs/common/coding.md
- 디자인 토큰: docs/ui/ui-style.json
