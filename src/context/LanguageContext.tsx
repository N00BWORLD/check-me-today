"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ko" | "en" | "zh" | "ja";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (texts: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// UI 텍스트 번역
export const uiTexts = {
    // 홈 페이지
    brandName: { ko: "Check Me Today", en: "Check Me Today", zh: "Check Me Today", ja: "Check Me Today" },
    brandSlogan: { ko: "오늘 나를 확인해봐", en: "Discover yourself today", zh: "今天来了解自己", ja: "今日の自分を確認しよう" },
    todayTest: { ko: "투데이 테스트", en: "Today's Tests", zh: "今日测试", ja: "今日のテスト" },
    testWord: { ko: "테스트", en: "Tests", zh: "测试", ja: "テスト" },
    discoverYourself: { ko: "심리 테스트로 진짜 나를 발견해보세요 🔮", en: "Discover the real you with our tests 🔮", zh: "通过心理测试发现真正的自己 🔮", ja: "心理テストで本当の自分を発見しよう 🔮" },
    searchPlaceholder: { ko: "테스트 검색하기...", en: "Search tests...", zh: "搜索测试...", ja: "テストを検索..." },
    testList: { ko: "🎯 테스트 목록", en: "🎯 Test List", zh: "🎯 测试列表", ja: "🎯 テスト一覧" },
    noResults: { ko: "검색 결과가 없습니다", en: "No results found", zh: "未找到结果", ja: "検索結果がありません" },
    tryOther: { ko: "다른 키워드로 검색해보세요", en: "Try different keywords", zh: "请尝试其他关键词", ja: "他のキーワードで検索してください" },
    comingSoon: { ko: "준비중", en: "Coming Soon", zh: "即将推出", ja: "準備中" },
    
    // 테스트 이름
    tetoVsEgen: { ko: "테토 vs 에겐", en: "TETO vs EGEN", zh: "热情 vs 温柔", ja: "テト vs エゲン" },
    tetoVsEgenDesc: { ko: "나는 불꽃형? 물결형?", en: "Am I fire or water?", zh: "我是火焰型还是水波型？", ja: "私は炎タイプ？波タイプ？" },
    sleepAnalysis: { ko: "수면 유형", en: "Sleep Type", zh: "睡眠类型", ja: "睡眠タイプ" },
    sleepAnalysisDesc: { ko: "나의 수면 패턴은?", en: "What's my sleep pattern?", zh: "我的睡眠模式是？", ja: "私の睡眠パターンは？" },
    personalColor: { ko: "퍼스널 컬러", en: "Personal Color", zh: "个人色彩", ja: "パーソナルカラー" },
    personalColorDesc: { ko: "나에게 어울리는 색은?", en: "What color suits me?", zh: "什么颜色适合我？", ja: "私に似合う色は？" },
    
    // 퀴즈 페이지
    question: { ko: "QUESTION", en: "QUESTION", zh: "问题", ja: "質問" },
    selectIntuitively: { ko: "✨ 직감적으로 선택해보세요", en: "✨ Follow your intuition", zh: "✨ 跟随直觉选择", ja: "✨ 直感で選んでみて" },
    
    // 결과 페이지
    share: { ko: "🔗 공유하기", en: "🔗 Share", zh: "🔗 分享", ja: "🔗 シェア" },
    copied: { ko: "✅ 복사완료!", en: "✅ Copied!", zh: "✅ 已复制!", ja: "✅ コピー完了!" },
    otherTests: { ko: "🏠 다른 테스트", en: "🏠 Other Tests", zh: "🏠 其他测试", ja: "🏠 他のテスト" },
    retake: { ko: "다시 테스트하기", en: "Retake Test", zh: "重新测试", ja: "もう一度テスト" },
    
    // 결과 타입
    tetoTitle: { ko: "강렬한 리더, 테토", en: "Intense Leader, TETO", zh: "强烈的领导者", ja: "強烈なリーダー、テト" },
    tetoSubtitle: { ko: "도전을 즐기는 행동파", en: "Action-oriented challenger", zh: "享受挑战的行动派", ja: "挑戦を楽しむ行動派" },
    tetoDesc: { 
        ko: "당신은 목표가 생기면 뒤돌아보지 않고 달리는 경주마입니다. 복잡하게 고민하기보다는 행동으로 증명하는 것을 선호하죠. 주변 사람들은 당신의 시원시원한 결단력에 매료됩니다.",
        en: "You're like a racehorse that charges forward without looking back once you have a goal. You prefer proving yourself through action rather than overthinking. People around you are captivated by your decisive nature.",
        zh: "当你有了目标，你就像一匹不回头的赛马。你更喜欢用行动证明自己，而不是过度思考。周围的人都被你果断的性格所吸引。",
        ja: "目標ができたら振り返らずに走り出す競走馬のようです。複雑に悩むより行動で証明することを好みます。周りの人はあなたの爽やかな決断力に魅了されます。"
    },
    egenTitle: { ko: "섬세한 감성, 에겐", en: "Delicate Soul, EGEN", zh: "细腻的感性者", ja: "繊細な感性、エゲン" },
    egenSubtitle: { ko: "마음을 읽는 공감러", en: "Empathetic heart-reader", zh: "能读懂人心的共情者", ja: "心を読む共感者" },
    egenDesc: {
        ko: "당신은 타인의 감정을 기가 막히게 캐치하는 능력이 있습니다. 거친 세상 속에서도 부드러움을 잃지 않으며, 소수의 사람들과 깊은 관계를 맺는 것을 소중히 여깁니다.",
        en: "You have an amazing ability to catch others' emotions. You maintain your gentleness even in a harsh world and value deep connections with a select few.",
        zh: "你有着出色的捕捉他人情感的能力。即使在这个粗糙的世界中，你也不会失去温柔，珍视与少数人建立深厚的关系。",
        ja: "あなたは他人の感情を驚くほど察知する能力があります。荒々しい世界でも柔らかさを失わず、少数の人との深い関係を大切にします。"
    },
    
    // 태그
    tagDrive: { ko: "#추진력", en: "#Drive", zh: "#推动力", ja: "#推進力" },
    tagLeadership: { ko: "#리더십", en: "#Leadership", zh: "#领导力", ja: "#リーダーシップ" },
    tagHonesty: { ko: "#솔직함", en: "#Honesty", zh: "#坦率", ja: "#率直さ" },
    tagPassion: { ko: "#열정", en: "#Passion", zh: "#热情", ja: "#情熱" },
    tagCare: { ko: "#배려", en: "#Care", zh: "#关怀", ja: "#思いやり" },
    tagDetail: { ko: "#디테일", en: "#Detail", zh: "#细节", ja: "#ディテール" },
    tagListening: { ko: "#경청", en: "#Listening", zh: "#倾听", ja: "#傾聴" },
    tagEmpathy: { ko: "#공감", en: "#Empathy", zh: "#共情", ja: "#共感" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>("ko");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Language;
        if (saved && ["ko", "en", "zh", "ja"].includes(saved)) {
            setLangState(saved);
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (browserLang === "ko") setLangState("ko");
            else if (browserLang === "zh") setLangState("zh");
            else if (browserLang === "ja") setLangState("ja");
            else setLangState("en");
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("lang", newLang);
    };

    const t = (texts: Record<string, string>): string => {
        return texts[lang] || texts["en"] || texts["ko"] || "";
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
