// 아이디어 제안 페이지(/ideas) 설정
//
// 구글 폼 임베드 URL 넣는 방법:
//   1. Google Forms 에서 폼을 만든다 (제목, 내용, 닉네임 등 원하는 항목)
//   2. 오른쪽 위 [보내기] → <> (삽입) 탭 → iframe 코드의 src 값을 복사
//   3. 아래 상수에 붙여넣는다. 보통 다음 형태:
//      https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true
//
// 값이 비어 있으면 /ideas 페이지는 "준비 중" 안내 화면을 보여준다.
export const IDEAS_FORM_EMBED_URL = "";

// 새 탭에서 열 때 쓰는 URL (embedded 파라미터 제거)
export function getIdeasFormOpenUrl(): string {
  return IDEAS_FORM_EMBED_URL.replace(/[?&]embedded=true/, "");
}
