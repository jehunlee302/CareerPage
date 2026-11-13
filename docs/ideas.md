# 아이디어 (아직 정하지 않은 것)

PRD 행이 되기 전의 생각만 적는다. 정해지면 `docs/PRD.md` 행으로 옮기고 여기서 지운다.

## 백엔드를 Rust로
- 왜: 사용자 요청(2026-11-14 "b/e 는 rust로"). 전역 기본 스택이 서버는 Rust(agent-ops do-15).
- 지금: 서버는 방문 체류 수집 Worker 하나(`workers/analytics-collector/src/index.js`, JS 59줄). 화면은 정적 사이트라 서버가 없다.
- 목적: 서버 코드 언어를 전역 기본에 맞추기. 새 서버 기능(예: 이력서 질문 답변 에이전트)이 생기면 Rust로 시작.
- 열린 질문: ① 지금 Worker를 Rust(workers-rs, WebAssembly)로 옮길지, 새 서버 기능이 생길 때만 Rust로 할지 ② 새 서버 기능이 무엇인지(없으면 옮길 이득은 언어 통일뿐, 빌드 도구가 하나 늘어남).
