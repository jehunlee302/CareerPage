@echo off
chcp 65001 > nul
echo.
echo ========================================
echo  Resume PDF Build
echo  YAML → LaTeX → PDF (en + ko)
echo ========================================
echo.

:: Check xelatex
where xelatex >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] xelatex을 찾을 수 없습니다.
  echo MiKTeX 또는 TeX Live를 설치해 주세요:
  echo   https://miktex.org/download
  echo   https://www.tug.org/texlive/
  echo.
  pause
  exit /b 1
)

:: Build English latex
echo [1/4] LaTeX 생성 (English)...
node scripts/yaml-to-latex.js --lang en
if %errorlevel% neq 0 (
  echo LaTeX 생성 실패
  pause
  exit /b 1
)

echo [2/4] PDF 컴파일 (English)...
pushd latex
xelatex -interaction=nonstopmode latex.tex > nul 2>&1
xelatex -interaction=nonstopmode latex.tex > nul 2>&1
popd
if not exist latex\latex.pdf (
  echo PDF 컴파일 실패 (English)
  pause
  exit /b 1
)
copy /Y latex\latex.pdf data\latex-en.pdf > nul
echo   ✓ data\latex-en.pdf

:: Build Korean latex
echo [3/4] LaTeX 생성 (Korean)...
node scripts/yaml-to-latex.js --lang ko
if %errorlevel% neq 0 (
  echo LaTeX 생성 실패
  pause
  exit /b 1
)

echo [4/4] PDF 컴파일 (Korean)...
pushd latex
xelatex -interaction=nonstopmode latex.tex > nul 2>&1
xelatex -interaction=nonstopmode latex.tex > nul 2>&1
popd
if not exist latex\latex.pdf (
  echo PDF 컴파일 실패 (Korean)
  pause
  exit /b 1
)
copy /Y latex\latex.pdf data\latex-ko.pdf > nul
echo   ✓ data\latex-ko.pdf

:: Restore English as default LaTeX source
node scripts/yaml-to-latex.js --lang en > nul 2>&1

:: Cleanup
del /q latex\*.aux latex\*.log latex\*.out latex\*.fdb_latexmk latex\*.fls latex\*.synctex.gz 2>nul

echo.
echo ✅ Resume PDF 빌드 완료!
echo   data\latex-en.pdf
echo   data\latex-ko.pdf
echo.
pause
