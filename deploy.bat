@echo off
chcp 65001 > nul
echo.
echo ========================================
echo  CareerPage Deploy
echo  YAML → portfolio.json → GitHub → Web
echo ========================================
echo.

:: Step 1: YAML → JSON 변환
echo [1/3] YAML 파일에서 portfolio.json 빌드 중...
node scripts/yaml-to-json.js
if %errorlevel% neq 0 (
  echo.
  echo 오류 발생. 배포를 중단합니다.
  pause
  exit /b 1
)

:: Step 2: Git 커밋
echo.
echo [2/3] GitHub에 업로드 중...
git add data/portfolio.json assets/js/main.js assets/css/style.css
git diff --cached --quiet
if %errorlevel% == 0 (
  echo 변경사항 없음.
  goto done
)
git commit -m "update: portfolio data from career YAML"
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
