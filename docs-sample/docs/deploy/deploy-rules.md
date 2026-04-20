# 배포 규칙

## Git Push 규칙 (매 개발 완료 후 자동 실행)

검증 통과 후 아래를 자동으로 실행한다. 사람에게 묻지 않는다.

1. atomic commit
   - 형식: feat(모듈): 설명 / fix(모듈): 설명 / refactor(모듈): 설명
   - 하나의 기능 단위로 커밋. 여러 기능을 한 커밋에 섞지 않는다.

2. git push origin {branch}
   - 현재 작업 브랜치에 push.
   - main에 직접 push 금지.

3. PR 생성
   - gstack /ship이 처리.
   - PR 제목: 커밋 메시지와 동일.
   - PR 본문: 변경 사항 요약 + 테스트 결과.

4. main 머지
   - squash merge 기본.
   - 머지 후 작업 브랜치 삭제.

5. 머지 후 자동 실행
   - gstack /document-release → 문서 drift 수정
   - docs/dev_his/{항목}-{날짜}.md 작성
   - CLAUDE.md Code Structure Map 갱신

## 금지 사항
- git push --force, git push -f 금지 (.claude/settings.json deny)
- git reset --hard 금지
- main 브랜치 직접 push 금지
