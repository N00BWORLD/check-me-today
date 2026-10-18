"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import Quiz from "@/components/Quiz";
import Link from "next/link";
import { ENERGY_GUIDE_PATH, energyGuideTexts } from "@/data/energy-balance-guide";

export default function TestPage() {
    const [started, setStarted] = useState(false);
    const { lang } = useLanguage();
    const { stats } = useTestStats("energy-balance");

    // 테스트 정보 (다국어)
    const testInfo = {
        ko: {
            title: "에너지 밸런스 테스트",
            subtitle: "내 안의 태양과 달 ☀️🌙",
            description: "심리학 기반의 12가지 질문으로 알아보는 나의 에너지 성향! 당신은 행동과 성취의 Solar 에너지가 강한가요, 공감과 직관의 Lunar 에너지가 강한가요?",
            subDescription: "융(Jung)의 아니마/아니무스 이론과 벰(Bem)의 성역할 검사를 참고한 심리학적 성향 테스트입니다.",
            questions: "12문제",
            time: "약 3분",
            start: "테스트 시작하기",
            back: "← 돌아가기",
            traits: ["자기주장성", "성취지향", "독립성", "공감력", "협력성", "직관력"],
        },
        en: {
            title: "Energy Balance Test",
            subtitle: "Sun & Moon Within You ☀️🌙",
            description: "Discover your energy type with 12 psychology-based questions! Are you more Solar (action & achievement) or Lunar (empathy & intuition)?",
            subDescription: "A psychological personality test inspired by Jung's Anima/Animus theory and Bem's Sex Role Inventory.",
            questions: "12 Questions",
            time: "~3 min",
            start: "Start Test",
            back: "← Back",
            traits: ["Assertiveness", "Achievement", "Independence", "Empathy", "Collaboration", "Intuition"],
        },
        zh: {
            title: "能量平衡测试",
            subtitle: "你内心的太阳与月亮 ☀️🌙",
            description: "通过12个心理学问题了解你的能量类型！你是行动与成就的Solar能量更强，还是共情与直觉的Lunar能量更强？",
            subDescription: "基于荣格的阿尼玛/阿尼姆斯理论和贝姆性别角色量表的心理学性格测试。",
            questions: "12题",
            time: "约3分钟",
            start: "开始测试",
            back: "← 返回",
            traits: ["自我主张", "成就导向", "独立性", "共情力", "合作性", "直觉力"],
        },
        ja: {
            title: "エネルギーバランス診断",
            subtitle: "あなたの中の太陽と月 ☀️🌙",
            description: "心理学に基づく12の質問であなたのエネルギータイプを診断！行動と達成のSolarエネルギーが強い？それとも共感と直感のLunarエネルギーが強い？",
            subDescription: "ユングのアニマ/アニムス理論とベムの性役割検査を参考にした心理学的性格診断です。",
            questions: "12問",
            time: "約3分",
            start: "テスト開始",
            back: "← 戻る",
            traits: ["自己主張", "達成志向", "独立性", "共感力", "協調性", "直感力"],
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
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-6 hover:text-amber-500 transition-colors"
                >
                    {info.back}
                </Link>

                {/* 히어로 카드 */}
                <div className="glass-strong dark:bg-slate-800/90 rounded-[2rem] p-8 text-center relative overflow-hidden mb-6">
                    {/* 배경 장식 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl" />

                    {/* 이모지 아이콘 */}
                    <div className="relative mb-6">
                        <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 ring-4 ring-white/30 dark:ring-slate-700/50 relative">
                            <span className="text-5xl">⚖️</span>
                            {/* 태양과 달 장식 */}
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                                <span className="text-sm">☀️</span>
                            </div>
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                                <span className="text-sm">🌙</span>
                            </div>
                        </div>
                    </div>

                    {/* 제목 */}
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                        {info.title}
                    </h1>
                    <p className="text-lg font-medium bg-gradient-to-r from-amber-500 to-indigo-500 bg-clip-text text-transparent mb-4">
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
                        {info.traits.map((trait, idx) => (
                            <span 
                                key={trait}
                                className={`
                                    px-2 py-1 rounded-full text-xs font-medium
                                    ${idx < 3 
                                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" 
                                        : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                                    }
                                `}
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
                        className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 active:scale-[0.98] transition-all"
                    >
                        {info.start} →
                    </button>
                </div>

                {/* 6가지 성향 차원·유형 가이드 허브로 가는 링크 (검색 유입 콘텐츠 클러스터) */}
                <p className="text-center mb-4">
                    <Link href={ENERGY_GUIDE_PATH} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-amber-500 transition-colors">
                        📖 {energyGuideTexts.landingLink[lang] || energyGuideTexts.landingLink.en} →
                    </Link>
                </p>

                {/* 하단 정보 */}
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    ✨ check-me.today
                </p>
            </div>
        </main>
    );
}
