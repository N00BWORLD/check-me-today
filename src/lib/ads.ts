// Google AdSense 설정 (한 곳에서 관리)
// - 게시자 ID는 public/ads.txt 와 반드시 일치해야 함
export const ADSENSE_CLIENT = "ca-pub-8585338769159452";

// 광고 단위(슬롯) ID
// AdSense 콘솔 > 광고 > 광고 단위 기준 에서 만든 광고 단위의 data-ad-slot 값(숫자 10자리)을 넣는다.
// 값이 비어 있으면 AdUnit이 해당 위치를 렌더링하지 않는다.
// (가짜 ID로 요청을 보내면 AdSense가 오류를 기록하고 빈 영역만 남기 때문)
export const AD_SLOTS = {
  default: "",     // 결과 페이지·분석 중 화면·테스트 페이지 하단 (기본 위치)
  home: "",        // 홈 하단 가로 배너
  quiz: "",        // 퀴즈 진행 중 사각형 광고
  testTop: "",     // /tests/[slug] 상단 320x50
  testBottom: "",  // /tests/[slug] 하단 300x250
};

export type AdSlotKey = keyof typeof AD_SLOTS;
