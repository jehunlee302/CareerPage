@echo off
chcp 65001 > nul
echo.
echo ========================================
echo  CareerPage Deploy
echo  Sheet → portfolio.json → GitHub → Web
echo ========================================
echo.

:: Step 1: 구글 시트 동기화
echo [1/3] 구글 시트에서 데이터 가져오는 중...
node scripts/sync-sheets.js
if %errorlevel% neq 0 (
  echo.
  echo 오류 발생. 배포를 중단합니다.
  pause
  exit /b 1
)

:: Step 2: Git 커밋
echo.
echo [2/3] GitHub에 업로드 중...
git add data/portfolio.json
git diff --cached --quiet
if %errorlevel% == 0 (
  echo 변경사항 없음 - 시트 내용이 동일합니다.
  goto done
)
git commit -m "update: portfolio data from Google Sheets"
git push origin main
if %errorlevel% neq 0 (
  echo.
  echo Git push 실패. 인터넷 연결을 확인하세요.
  pause
  exit /b 1
)

:done
echo.
echo [3/3] 완료!
echo Cloudflare가 약 30초 후 자동 배포합니다.
echo 사이트: https://jehun-lee.work
echo.
pause
