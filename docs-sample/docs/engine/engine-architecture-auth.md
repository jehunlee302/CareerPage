# 엔진 아키텍처: 인증 모듈

## 엔티티
- User { id, email, passwordHash, provider, createdAt }
- RefreshToken { id, userId, token, usedAt, expiresAt }

## 상태
- User: ACTIVE / SUSPENDED / DELETED

## 시퀀스: 로그인
1. email+password 수신
2. User 조회 (없으면 AuthError)
3. bcrypt.compare (불일치 시 AuthError)
4. AccessToken 생성 (JWT, 15분)
5. RefreshToken 생성 (opaque, 7일, DB 저장)
6. 반환

## 시퀀스: 토큰 갱신
1. refreshToken 수신
2. DB 조회 (없거나 만료 시 AuthError)
3. usedAt 확인 → 이미 사용됨 = 탈취 → 해당 userId 모든 토큰 무효화
4. 현재 토큰 usedAt 기록
5. 새 accessToken + refreshToken 발급
6. 반환
