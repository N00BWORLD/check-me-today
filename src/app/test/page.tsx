"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export default function TestPage() {
    const [started, setStarted] = useState(false);
    const { lang } = useLanguage();
    const { stats } = useTestStats("teto-vs-egen");

    // 테스트 정보 (다국어)
    const testInfo = {
        ko: {
            title: "테토 vs 에겐",
            subtitle: "나는 불꽃형? 물결형?",
            description: "7개의 질문으로 알아보는 나의 성향 테스트! 당신은 열정적인 테토인가요, 섬세한 에겐인가요?",
            questions: "7문제",
            time: "약 2분",
            start: "테스트 시작하기",
            back: "← 돌아가기",
        },
        en: {
            title: "TETO vs EGEN",
            subtitle: "Fire type or Wave type?",
            description: "Find out your personality with 7 questions! Are you a passionate TETO or a delicate EGEN?",
            questions: "7 Questions",
            time: "~2 min",
            start: "Start Test",
            back: "← Back",
        },
        zh: {
            title: "泰托 vs 艾根",
            subtitle: "火焰型还是波浪型?",
            description: "通过7个问题了解你的性格！你是充满激情的泰托还是细腻的艾根？",
            questions: "7题",
            time: "约2分钟",
            start: "开始测试",
            back: "← 返回",
        },
        ja: {
            title: "テト vs エゲン",
            subtitle: "炎タイプ？波タイプ？",
            description: "7つの質問であなたの性格を診断！情熱的なテト？繊細なエゲン？",
            questions: "7問",
            time: "約2分",
            start: "テスト開始",
            back: "← 戻る",
        },
    };

    const info = testInfo[lang] || testInfo.en;

    // 시작 버튼 클릭 시 퀴즈 시작
    if (started) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4">
                <Quiz />
            </main>
        );
    }

    // 랜딩 페이지
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                {/* 뒤로가기 */}
                <Link 
                    href="/"
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-6 hover:text-purple-500 transition-colors"
                >
                    {info.back}
                </Link>

                {/* 히어로 카드 */}
                <div className="glass-strong dark:bg-slate-800/90 rounded-[2rem] p-8 text-center relative overflow-hidden mb-6">
                    {/* 배경 장식 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-violet-400/30 rounded-full blur-3xl" />

                    {/* 이모지 아이콘 */}
                    <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 ring-4 ring-white/30 dark:ring-slate-700/50">
                            <span className="text-5xl">🔥</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                            <span className="text-xl">🔮</span>
                        </div>
                    </div>

                    {/* 제목 */}
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                        {info.title}
                    </h1>
                    <p className="text-lg font-medium text-purple-500 dark:text-purple-400 mb-4">
                        {info.subtitle}
                    </p>

                    {/* 설명 */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 break-keep">
                        {info.description}
                    </p>

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
                        className="w-full py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all"
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
