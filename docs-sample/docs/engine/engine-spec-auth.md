# 엔진 요구사항: 인증 모듈

## 요구사항
- 이메일/비밀번호 회원가입 (비밀번호 bcrypt 해싱)
- JWT 액세스 토큰 (15분) + 리프레시 토큰 (7일)
- 소셜 로그인 (Google, Kakao)
- 비밀번호 재설정 (이메일 링크, 1시간 만료)

## 도메인 규칙
- 이메일 중복 가입 불가
- 비밀번호 최소 8자, 영문+숫자+특수문자
- 리프레시 토큰 탈취 감지: 이미 사용된 토큰 재사용 시 모든 세션 무효화

## 인터페이스 (다른 subagent에 전달)
- AuthService.register(email, password): User
- AuthService.login(email, password): { accessToken, refreshToken }
- AuthService.refresh(refreshToken): { accessToken, refreshToken }
- AuthService.resetPassword(email): void
- AuthService.socialLogin(provider, code): { accessToken, refreshToken }
