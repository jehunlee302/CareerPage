# init-project.ps1
# 프로젝트에 gstack 핵심 스킬만 링크
# 사용법: 프로젝트 루트에서 & "$env:USERPROFILE\init-project.ps1"

$skills = @(
    "office-hours",
    "plan-ceo-review",
    "plan-eng-review",
    "review",
    "qa",
    "ship",
    "investigate",
    "document-release",
    "careful",
    "guard",
    "retro",
    "autoplan",
    "design-consultation"
)

$source = "$env:USERPROFILE\.claude\skills"
$target = ".claude\skills"

# gstack 설치 확인
if (!(Test-Path "$source\office-hours\SKILL.md")) {
    Write-Host "ERROR: gstack not found at $source" -ForegroundColor Red
    Write-Host "Install first: git clone https://github.com/garrytan/gstack.git $source\gstack"
    exit 1
}

# .claude\skills 폴더 생성
if (!(Test-Path $target)) {
    New-Item -ItemType Directory -Path $target -Force | Out-Null
}

# 링크 생성
$linked = 0
$skipped = 0
foreach ($skill in $skills) {
    $src = "$source\$skill"
    $dst = "$target\$skill"

    if (!(Test-Path $src)) {
        Write-Host "  SKIP: $skill (source not found)" -ForegroundColor Yellow
        $skipped++
        continue
    }

    if (Test-Path $dst) {
        Write-Host "  EXISTS: $skill" -ForegroundColor Gray
        $skipped++
        continue
    }

    cmd /c mklink /J "$dst" "$src" > $null 2>&1
    Write-Host "  LINKED: $skill" -ForegroundColor Green
    $linked++
}

Write-Host ""
Write-Host "Done. $linked linked, $skipped skipped." -ForegroundColor Cyan
Write-Host "Run 'claude' and try '/office-hours' to verify."
