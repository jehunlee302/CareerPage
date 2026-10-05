↑ [문서 인덱스](../index.md)

# 함정 (gotchas) — 실제로 난 것만

> **언제**: main.js 렌더를 고치거나 검증·빌드가 이상할 때. 형식 = 증상 → 원인 → 해결. 같은 함정이 2회+ 나오면 여기 추가.

## ❌ YAML의 링크·아이콘·번호가 esc 없이 innerHTML로 들어감 (`javascript:` href 통과)
- 원인: `esc()`는 본문 필드에만 붙이고 "내가 쓴 값"으로 여긴 필드(`pillars[].icon`·`pub.link`·`basic.googleSite`·advisor URL·`index`)는 그대로 보간. href는 스킴 검사가 없어 `javascript:`가 링크가 됨(2026-10 정합 점검 🔴).
- 해결: 보간은 전부 `esc()`, href는 `safeHref()`(http·https·mailto만, 나머지 `''`=링크 안 만듦). `npm run verify`의 `scripts/check-invariants.js`가 `${obj.prop}`·map 콜백 인자 raw 보간(`${x}`)·`href="${…}"`(safeHref 아님)를 FAIL, `tests/main-render.test.js`가 전 필드 악성 데이터로 렌더해 확인.

## ❌ 숫자 0이 화면에서 사라짐
- 원인: 예전 `esc`가 `if (!s) return ''`라 `0`·`false`도 빈 문자열이 됨(impact strip은 `String(it.v)`로 우회하고 있었음).
- 해결: `esc`는 `s == null`만 빈 문자열. 숫자는 `esc(n)` 그대로 넘긴다.

## ❌ 빌드 확인하려다 `data/portfolio.json`이 바뀐 채 남음
- 원인: `node scripts/yaml-to-json.js`는 항상 `data/portfolio.json`에 쓴다(generated 파일 — 커밋하면 배포 산출물이 섞임). 현재 YAML로 빌드하면 커밋본과 바이트가 다를 수 있다.
- 해결: 검증은 `npm run verify`(`--out`으로 OS 임시 폴더에 빌드). 실수로 남았으면 `git checkout -- data/`.

## ❌ `node --test tests/`가 "test failed" 1건으로 끝남
- 원인: Node 24는 디렉터리 인자를 파일로 취급해 실패, Node 20(CI)은 glob 인자를 지원하지 않음.
- 해결: 테스트 파일을 명시(`node --test tests/main-render.test.js`). verify.js·`npm test`가 그렇게 부른다.
