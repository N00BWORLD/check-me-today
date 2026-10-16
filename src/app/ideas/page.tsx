"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { IDEAS_FORM_EMBED_URL, getIdeasFormOpenUrl } from "@/lib/ideas";

// 페이지 UI 텍스트 (다국어)
const uiText = {
    back: { ko: "← 홈으로", en: "← Home", zh: "← 主页", ja: "← ホームへ" },
    title: { ko: "아이디어 제안", en: "Suggest an Idea", zh: "创意建议", ja: "アイデア提案" },
    subtitle: {
        ko: "만들었으면 하는 테스트, 개선 아이디어, 불편한 점을 자유롭게 남겨 주세요.",
        en: "Tell us which tests you'd like to see, improvements, or anything that bugs you.",
        zh: "想要的测试、改进想法、不便之处，都可以随意留言。",
        ja: "作ってほしいテスト、改善アイデア、不便な点を自由に書いてください。",
    },
    promise: {
        ko: "좋은 제안은 실제 테스트로 만들어지고, 반영되면 홈에서 NEW 배지로 알려드려요.",
        en: "Great ideas become real tests. When one ships, you'll see it with a NEW badge on the home page.",
        zh: "好的建议会被做成真正的测试，上线后会在主页以 NEW 标记显示。",
        ja: "良い提案は実際のテストになり、反映されるとホームでNEWバッジとしてお知らせします。",
    },
    examples: {
        ko: ["🧠 \"직장 스트레스 유형 테스트 만들어주세요\"", "💕 \"연애 테스트 결과에 궁합 추가해주세요\"", "🐛 \"아이폰에서 이미지 저장이 안 돼요\""],
        en: ["🧠 \"Make a workplace stress type test\"", "💕 \"Add compatibility to the love test results\"", "🐛 \"Image save doesn't work on iPhone\""],
        zh: ["🧠 \"做一个职场压力类型测试\"", "💕 \"恋爱测试结果加上配对\"", "🐛 \"iPhone 上无法保存图片\""],
        ja: ["🧠 \"職場ストレスタイプ診断を作ってください\"", "💕 \"恋愛診断の結果に相性を追加してほしい\"", "🐛 \"iPhoneで画像保存ができません\""],
    },
    loading: { ko: "제안 양식을 불러오는 중...", en: "Loading the form...", zh: "正在加载表单...", ja: "フォームを読み込み中..." },
    openNewTab: { ko: "새 탭에서 열기 ↗", en: "Open in a new tab ↗", zh: "在新标签页打开 ↗", ja: "新しいタブで開く ↗" },
    comingTitle: { ko: "제안 창구 준비 중이에요", en: "The suggestion box is almost ready", zh: "建议通道准备中", ja: "提案窓口を準備中です" },
    comingDesc: {
        ko: "곧 이 자리에 제안 양식이 열립니다. 조금만 기다려 주세요!",
        en: "The form will open here soon. Please check back shortly!",
        zh: "提交表单即将在此开放，请稍后再来！",
        ja: "まもなくここに提案フォームが開きます。少々お待ちください！",
    },
    backHome: { ko: "다른 테스트 둘러보기", en: "Browse other tests", zh: "浏览其他测试", ja: "他のテストを見る" },
};

export default function IdeasPage() {
    const { lang } = useLanguage();
    const [formLoaded, setFormLoaded] = useState(false);
    const t = (key: keyof typeof uiText) => {
        const entry = uiText[key] as Record<string, string | string[]>;
        return entry[lang] ?? entry.en;
    };
    const examples = (uiText.examples[lang] || uiText.examples.en) as string[];
    const hasForm = IDEAS_FORM_EMBED_URL.length > 0;

    return (
        <main className="min-h-screen pb-28 pt-6 px-4">
            <div className="max-w-xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline mb-6 text-sm"
                >
                    {t("back")}
                </Link>

                {/* 헤더 */}
                <header className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 mb-4">
                        💡
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                        {t("title")}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 break-keep">
                        {t("subtitle")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 break-keep">
                        {t("promise")}
                    </p>
                </header>

                {/* 제안 예시 */}
                <ul className="glass dark:bg-slate-800/60 rounded-2xl p-4 mb-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {examples.map((ex) => (
                        <li key={ex} className="break-keep">{ex}</li>
                    ))}
                </ul>

                {/* 구글 폼 임베드 */}
                {hasForm ? (
                    <section className="glass-strong dark:bg-slate-800/90 rounded-3xl overflow-hidden">
                        <div className="relative">
                            {!formLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400 dark:text-slate-500">
                                    {t("loading")}
                                </div>
                            )}
                            <iframe
                                src={IDEAS_FORM_EMBED_URL}
                                title={t("title") as string}
                                className={`w-full border-0 transition-opacity duration-300 ${formLoaded ? "opacity-100" : "opacity-0"}`}
                                style={{ minHeight: "1200px" }}
                                loading="lazy"
                                onLoad={() => setFormLoaded(true)}
                            />
                        </div>
                        <div className="px-4 py-3 border-t border-slate-200/60 dark:border-slate-700/60 text-right">
                            <a
                                href={getIdeasFormOpenUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                            >
                                {t("openNewTab")}
                            </a>
                        </div>
                    </section>
                ) : (
                    <section className="glass-strong dark:bg-slate-800/90 rounded-3xl p-8 text-center">
                        <div className="text-4xl mb-3">🚧</div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                            {t("comingTitle")}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 break-keep mb-6">
                            {t("comingDesc")}
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg active:scale-95 transition-transform"
                        >
                            {t("backHome")}
                        </Link>
                    </section>
                )}
            </div>
        </main>
    );
}
