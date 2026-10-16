// 엔진 공용 UI 문구 (4개 언어). 테스트별 문구는 데이터 파일에, 공통 버튼·제목은 여기에.
import type { LocalizedText } from "@/data/engine/types";

export const engineTexts = {
    start: { ko: "테스트 시작하기", en: "Start Test", zh: "开始测试", ja: "テストを始める" },
    questions: { ko: "{n}문항", en: "{n} questions", zh: "{n}道题", ja: "{n}問" },
    minutes: { ko: "약 {n}분", en: "about {n} min", zh: "约{n}分钟", ja: "約{n}分" },
    typesCount: { ko: "결과 {n}가지", en: "{n} result types", zh: "{n}种结果", ja: "結果{n}種類" },
    measures: { ko: "이 테스트가 측정하는 것", en: "What this test measures", zh: "这个测试测什么", ja: "このテストで分かること" },
    background: { ko: "원리와 배경", en: "How it works", zh: "原理与背景", ja: "仕組みと背景" },
    resultTypes: { ko: "결과 유형 미리보기", en: "Result types", zh: "结果类型预览", ja: "結果タイプ一覧" },
    question: { ko: "QUESTION", en: "QUESTION", zh: "问题", ja: "質問" },
    back: { ko: "이전", en: "Back", zh: "上一题", ja: "戻る" },
    analyzing: { ko: "결과 분석 중...", en: "Analyzing...", zh: "分析中...", ja: "分析中..." },
    myType: { ko: "나의 유형", en: "MY TYPE", zh: "我的类型", ja: "私のタイプ" },
    features: { ko: "특징", en: "Traits", zh: "特点", ja: "特徴" },
    advice: { ko: "이 유형을 위한 조언", en: "Advice for this type", zh: "给这个类型的建议", ja: "このタイプへのアドバイス" },
    goodMatch: { ko: "잘 맞는 유형", en: "Good match", zh: "合拍的类型", ja: "相性の良いタイプ" },
    badMatch: { ko: "부딪히기 쉬운 유형", en: "Likely to clash with", zh: "容易冲突的类型", ja: "ぶつかりやすいタイプ" },
    tryMe: { ko: "나도 테스트하기", en: "Take the test", zh: "我也要测", ja: "私もテストする" },
    sharedHint: { ko: "친구가 공유한 결과예요. 나는 어떤 유형일까요?", en: "A friend shared this result. What's your type?", zh: "这是朋友分享的结果。你是哪种类型？", ja: "友達がシェアした結果です。あなたはどのタイプ？" },
    otherTypes: { ko: "다른 유형 보기", en: "Other types", zh: "查看其他类型", ja: "他のタイプを見る" },
    home: { ko: "홈으로", en: "Home", zh: "首页", ja: "ホーム" },
    viewResult: { ko: "결과 보기", en: "View result", zh: "查看结果", ja: "結果を見る" },
    allTypes: { ko: "모든 결과 유형", en: "All result types", zh: "所有结果类型", ja: "すべての結果タイプ" },
    savedImage: { ko: "이미지를 저장했어요", en: "Image saved", zh: "已保存图片", ja: "画像を保存しました" },
} satisfies Record<string, LocalizedText>;

/** "{n}" 자리 표시자를 숫자로 치환 */
export function fill(text: string, n: number): string {
    return text.replace("{n}", String(n));
}
