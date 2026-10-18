"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats, useIncrementPlay } from "@/hooks/useTestStats";
import LoveQuiz from "./_components/LoveQuiz";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoveTestPage() {
    const [started, setStarted] = useState(false);
    const { lang } = useLanguage();
    const { stats } = useTestStats("love-type");
    // 조회수 기록 (세션당 1회) — 빠져 있어서 연애 테스트 실행수가 항상 0이던 문제 수정
    useIncrementPlay("love-type");

    const testInfo = {
        ko: {
            title: "연애 유형 테스트",
            subtitle: "나의 연애 스타일은? 💕",
            description: "심리학 기반 질문으로 알아보는 나의 연애 성향! 당신은 뜨거운 열정의 소유자인가요, 아니면 평온한 휴식처 같은 사람인가요?",
            subDescription: "데이트 습관, 연락 방식, 가치관을 통해 분석하는 고유한 연애 유형 진단입니다.",
            questions: "10문제",
            time: "약 2분",
            start: "테스트 시작하기",
            back: "← 돌아가기",
            traits: ["열정", "안정성", "친밀감", "합리성"],
        },
        en: {
            title: "Love Type Test",
            subtitle: "What's my dating style? 💕",
            description: "Discover your dating personality through psychology-based questions! Are you a person of fiery passion or a peaceful sanctuary?",
            subDescription: "A unique dating type diagnosis analyzed through dating habits, communication styles, and values.",
            questions: "10 Questions",
            time: "~2 min",
            start: "Start Test",
            back: "← Back",
            traits: ["Passion", "Stability", "Intimacy", "Logic"],
        },
        zh: {
            title: "恋爱类型测试",
            subtitle: "我的恋爱风格是什么？ 💕",
            description: "通过心理学问题了解你的恋爱倾向！你是热情的火花，还是宁静的避风港？",
            subDescription: "通过约会习惯、沟通方式和价值观分析的独特恋爱类型诊断。",
            questions: "10题",
            time: "约2分钟",
            start: "开始测试",
            back: "← 返回",
            traits: ["热情", "稳定性", "亲密度", "合理性"],
        },
        ja: {
            title: "恋愛タイプ診断",
            subtitle: "私の恋愛スタイルは？ 💕",
            description: "心理学に基づく質問であなたの恋愛傾向を分析！あなたは熱い情熱の持ち主？それとも穏やかな安らぎのような人？",
            subDescription: "デートの習慣、連絡の取り方、価値観を通じて分析する独自の恋愛タイプ診断です。",
            questions: "10問",
            time: "約2分",
            start: "テスト開始",
            back: "← 戻る",
            traits: ["情熱", "安定性", "親密度", "合理性"],
        },
    };

    const info = testInfo[lang] || testInfo.en;

    if (started) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-white dark:from-slate-950 dark:to-slate-900">
                <LoveQuiz />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="w-full max-w-md mx-auto">
                {/* 뒤로가기 */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-6 hover:text-pink-500 transition-colors"
                >
                    {info.back}
                </Link>

                {/* 히어로 카드 */}
                <div className="glass-strong dark:bg-slate-800/90 rounded-[2rem] p-8 text-center relative overflow-hidden mb-6">
                    {/* 배경 장식 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                    {/* 하트 아이콘 */}
                    <div className="relative mb-6">
                        <motion.div
                            className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30 ring-4 ring-white/30 dark:ring-slate-700/50"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <span className="text-5xl animate-pulse">💖</span>
                        </motion.div>
                    </div>

                    {/* 제목 */}
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                        {info.title}
                    </h1>
                    <p className="text-lg font-medium text-pink-600 dark:text-pink-400 mb-4">
                        {info.subtitle}
                    </p>

                    {/* 설명 */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3 break-keep">
                        {info.description}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed mb-6 break-keep">
                        {info.subDescription}
                    </p>

                    {/* 측정 특성 태그 */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {info.traits.map((trait) => (
                            <span
                                key={trait}
                                className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium"
                            >
                                {trait}
                            </span>
                        ))}
                    </div>

                    {/* 테스트 정보 */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                            <span className="text-lg">📝</span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{info.questions}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                            <span className="text-lg">⏱️</span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{info.time}</span>
                        </div>
                    </div>

                    {/* 통계 */}
                    {(stats.playCount > 0 || stats.likeCount > 0) && (
                        <div className="flex justify-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                            {stats.playCount > 0 && (
                                <span>▶ {stats.playCount.toLocaleString()}명 참여</span>
                            )}
                            {stats.likeCount > 0 && (
                                <span>❤️ {stats.likeCount.toLocaleString()}</span>
                            )}
                        </div>
                    )}

                    {/* 시작 버튼 */}
                    <button
                        onClick={() => setStarted(true)}
                        className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 active:scale-[0.98] transition-all"
                    >
                        {info.start} →
                    </button>
                </div>

                {/* 하단 정보 */}
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    ✨ check-me.today
                </p>
            </div>
        </main>
    );
}
