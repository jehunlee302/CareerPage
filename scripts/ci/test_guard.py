#!/usr/bin/env python
"""test-guard — 테스트를 고쳐 통과시키는 diff 감지 (enforcement.md §5). 언어 무관 정규식.
사용: python test-guard.py [base=origin/HEAD 또는 HEAD~1] [--repo 경로] [--strict]
감지: 테스트 파일에서 assert·expect 줄 삭제/변경 · skip/xfail/ignore/only 추가 · 테스트 파일 삭제.
출력: 걸린 파일:줄. 기본 종료코드 0(경고) · --strict면 1(CI 차단용). 정당한 변경은 커밋 메시지에 정본 근거를 남기고 독립 검토.
프로젝트 CI에는 이 파일을 scripts/ci/test_guard.py로 복사해 쓴다(동일성은 check-routes가 검사)."""
import re, subprocess, sys

TEST_PATH = re.compile(r"(^|/)(tests?|__tests__|spec)(/|$)|[._-](test|spec)\.[a-z]+$|_test\.(go|py|rs)$|Tests?\.cs$|(^|/)qa/check_[^/]*\.py$", re.I)  # qa/check_*.py = PwC_Crawling 테스트 관례
ASSERT = re.compile(r"\b(assert\w*|expect\s*\(|should\b|toBe|toEqual|toMatch\w*|toThrow|rejects|resolves|Assert\.\w+|assert_eq!|assert_ne!|assert!|require\.\w+|t\.(Error|Fatal)|self\.assert\w+)")
SKIP = re.compile(r"(\.skip\s*\(|\bxit\s*\(|\bxdescribe\b|\.only\s*\(|@pytest\.mark\.(skip|xfail)|pytest\.skip\(|#\[ignore\]|\[Ignore|\[Fact\(Skip|@Disabled|t\.Skip\()")

def main(argv):
    strict = "--strict" in argv
    repo = argv[argv.index("--repo") + 1] if "--repo" in argv else "."
    pos = [a for i, a in enumerate(argv) if not a.startswith("--") and (i == 0 or argv[i - 1] != "--repo")]
    base = pos[0] if pos else "HEAD~1"
    g = lambda *a: subprocess.run(["git", "-C", repo, "-c", "core.quotepath=off", *a], capture_output=True, text=True, encoding="utf-8", errors="replace").stdout
    hits = []
    for st in g("diff", "--name-status", f"{base}...HEAD").splitlines():
        parts = st.split("\t")
        if parts and parts[0].startswith("D") and TEST_PATH.search(parts[-1]):
            hits.append(f"{parts[-1]}: 테스트 파일 삭제")
    cur, ln = None, 0
    # 문맥 6줄로 읽어 "열린 assert 괄호 안"의 줄 변경도 잡는다(여러 줄 expect(...) 안의 기대값 줄 — FanVote 실측 사각지대)
    depth = 0  # 옛 쪽(문맥+삭제) 기준, 마지막 assert 줄부터의 미닫힌 괄호 수
    for l in g("diff", "-U6", f"{base}...HEAD").splitlines():
        if l.startswith("+++ "):
            cur = l[6:] if l.startswith("+++ b/") else None
        elif l.startswith("@@"):
            m = re.search(r"\+(\d+)", l); ln = int(m.group(1)) if m else 0
            depth = 0
        elif cur and TEST_PATH.search(cur):
            body = l[1:]
            if l.startswith("-") and not l.startswith("---"):
                if ASSERT.search(body) or depth > 0:
                    hits.append(f"{cur}:{ln}: 기대값·assert 삭제/변경  {body.strip()[:100]}")
            elif l.startswith("+") and not l.startswith("+++"):
                if SKIP.search(body):
                    hits.append(f"{cur}:{ln}: skip/only 추가  {body.strip()[:100]}")
                ln += 1
            else:
                ln += 1
            if not l.startswith("+"):  # 옛 쪽 줄로 assert 괄호 깊이 추적
                depth = (body.count("(") - body.count(")")) if ASSERT.search(body) else max(0, depth + body.count("(") - body.count(")"))
    for h in hits:
        print("TEST-GUARD", h)
    print(f"test-guard: {len(hits)}건 (base {base})" + (" — 독립 검토 + 커밋에 정본 근거" if hits else ""))
    return 1 if (strict and hits) else 0

if __name__ == "__main__":
    try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass
    sys.exit(main(sys.argv[1:]))
