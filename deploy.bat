@echo off
chcp 65001 > nul
echo.
echo ========================================
echo  CareerPage Deploy
echo  YAML → JSON (en+ko) → GitHub → Web
echo ========================================
echo.

:: Step 1: YAML → JSON 변환 (English + Korean)
echo [1/3] YAML 파일에서 portfolio.json 빌드 중...
node scripts/yaml-to-json.js
if %errorlevel% neq 0 (
  echo 오류 발생. 배포를 중단합니다.
  pause
  exit /b 1
)
copy /Y data\portfolio.json data\portfolio.en.json > nul
node scripts/yaml-to-json.js --lang ko
if %errorlevel% neq 0 (
  echo 오류 발생. 배포를 중단합니다.
  pause
  exit /b 1
)
copy /Y data\portfolio.json data\portfolio.ko.json > nul
copy /Y data\portfolio.en.json data\portfolio.json > nul
echo 빌드 완료: portfolio.json (en) + portfolio.ko.json

:: Step 1b: Resume PDF 빌드 (xelatex가 있는 경우만)
where xelatex >nul 2>&1
if %errorlevel% == 0 (
  echo.
  echo [1b/3] Resume PDF 빌드 중...
  node scripts/yaml-to-latex.js --lang en
  pushd latex
  xelatex -interaction=nonstopmode resume.tex > nul 2>&1
  xelatex -interaction=nonstopmode resume.tex > nul 2>&1
  popd
  if exist latex\resume.pdf copy /Y latex\resume.pdf data\resume-en.pdf > nul
  node scripts/yaml-to-latex.js --lang ko
  pushd latex
  xelatex -interaction=nonstopmode resume.tex > nul 2>&1
  xelatex -interaction=nonstopmode resume.tex > nul 2>&1
  popd
  if exist latex\resume.pdf copy /Y latex\resume.pdf data\resume-ko.pdf > nul
  node scripts/yaml-to-latex.js --lang en > nul 2>&1
  del /q latex\*.aux latex\*.log latex\*.out 2>nul
  echo   ✓ data\resume-en.pdf + data\resume-ko.pdf
) else (
  echo [1b/3] xelatex 미설치 — Resume PDF 빌드 건너뜀
)

:: Step 2: Git 커밋
echo.
echo [2/3] GitHub에 업로드 중...
git add data/portfolio.json data/portfolio.ko.json data/resume-en.pdf data/resume-ko.pdf assets/js/main.js assets/css/style.css index.html
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
echo 약 30초 후 자동 배포됩니다.
echo 사이트: https://jehun-lee.work
echo.
pause
