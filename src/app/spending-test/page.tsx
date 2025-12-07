"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { spendingQuestions, spendingResults, SpendingType } from "@/data/spending-test";
import { useIncrementPlay } from "@/hooks/useTestStats";
import AdUnit from "@/components/AdUnit";

export default function SpendingTestPage() {
    const { lang } = useLanguage();
    // 상태: 'intro' | 'quiz' | 'analyzing' | 'result'
    const [status, setStatus] = useState<'intro' | 'quiz' | 'analyzing' | 'result'>('intro');
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({
        achievement: 0,
        intuition: 0,
        independence: 0,
        assertiveness: 0
    });
    const [resultType, setResultType] = useState<SpendingType | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useIncrementPlay("spending-habits");

    const t = (obj: Record<string, string>) => obj[lang] || obj.en;

    const handleStart = () => {
        setStatus('quiz');
    };

    const handleAnswer = (traitScores: { trait: string; score: number }[]) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const newScores = { ...scores };
        traitScores.forEach(item => {
            if (newScores[item.trait] !== undefined) {
                newScores[item.trait] += item.score;
            }
        });
        setScores(newScores);

        setTimeout(() => {
            if (currentStep < spendingQuestions.length - 1) {
                setCurrentStep(currentStep + 1);
                setIsAnimating(false);
            } else {
                finishQuiz(newScores);
            }
        }, 300);
    };

    const finishQuiz = (finalScores: Record<string, number>) => {
        setStatus('analyzing');

        // 점수가 가장 높은 특성 찾기
        // achievement -> INVESTOR
        // intuition -> FLEX
        // independence -> MINIMALIST
        // assertiveness -> VALUE

        const sortedTraits = Object.entries(finalScores).sort(([, a], [, b]) => b - a);
        const topTrait = sortedTraits[0][0];

        let type: SpendingType = "MINIMALIST";
        if (topTrait === "achievement") type = "INVESTOR";
        else if (topTrait === "intuition") type = "FLEX";
        else if (topTrait === "independence") type = "MINIMALIST";
        else if (topTrait === "assertiveness") type = "VALUE";

        setResultType(type);

        // 3.5초 대기 후 결과 (광고 노출)
        setTimeout(() => {
            setStatus('result');
        }, 3500);
    };

    // --- RENDERERS ---

    // 1. INTRO
    if (status === 'intro') {
        const info = {
            title: { ko: "숨겨진 소비성향 테스트", en: "Hidden Spending Habits Test" },
            subtitle: { ko: "나는 짠돌이일까? 큰손일까? 💸", en: "Minimalist or Big Spender? 💸" },
            desc: { ko: "5가지 질문으로 알아보는 나의 돈 관리 스타일!", en: "Discover your money management style with 5 questions!" }
        };

        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto relative">
                    <Link href="/" className="absolute -top-12 left-0 text-slate-500 hover:text-purple-600 transition-colors">
                        ← {lang === 'ko' ? '홈으로' : 'Home'}
                    </Link>

                    <div className="glass-strong rounded-[2rem] p-8 text-center relative overflow-hidden animate-fade-in">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="text-6xl mb-6 animate-bounce">🪙</div>

                        <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                            {t(info.title)}
                        </h1>
                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                            {t(info.subtitle)}
                        </p>

                        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            {t(info.desc)}
                        </p>

                        <button
                            onClick={handleStart}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {lang === 'ko' ? '테스트 시작하기' : 'Start Test'}
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    // 2. QUIZ
    if (status === 'quiz') {
        const question = spendingQuestions[currentStep];
        const progress = ((currentStep + 1) / spendingQuestions.length) * 100;

        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-bold text-slate-400">
                            Q.{currentStep + 1}
                        </span>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="glass-strong rounded-[2rem] p-6 mb-4 animate-slide-up">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-snug break-keep">
                            {t(question.text)}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.scores)}
                                disabled={isAnimating}
                                className="w-full text-left p-4 rounded-xl glass hover:bg-white/90 dark:hover:bg-slate-700 transition-all duration-200 active:scale-[0.98] animate-slide-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-200">
                                    {t(option.text)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // 3. ANALYZING (with Ad)
    if (status === 'analyzing') {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <div className="mb-8 relative">
                    <div className="text-6xl animate-spin-slow">🔮</div>
                </div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
                    {lang === 'ko' ? '소비 성향 분석 중...' : 'Analyzing Spending Habits...'}
                </h2>
                <p className="text-slate-500 mb-8">
                    {lang === 'ko' ? '잠시만 기다려주세요.' : 'Please wait a moment.'}
                </p>

                {/* AD AREA */}
                <div className="w-full max-w-sm glass-strong rounded-xl p-2 bg-white/50">
                    <p className="text-xs text-slate-400 mb-1">Sponsored</p>
                    <AdUnit slotId="1234567890" format="rectangle" className="min-h-[250px]" />
                </div>
            </main>
        );
    }

    // 4. RESULT
    if (status === 'result' && resultType) {
        const result = spendingResults[resultType];

        return (
            <main className="min-h-screen p-4 pb-20">
                <div className="max-w-md mx-auto space-y-6">
                    {/* Home Link */}
                    <Link href="/" className="inline-block text-slate-500 mb-2">← Home</Link>

                    {/* Main Card */}
                    <div className="glass-strong rounded-[2rem] overflow-hidden shadow-xl animate-scale-in">
                        {/* Header Banner */}
                        <div className={`bg-gradient-to-r ${result.color} p-8 text-center text-white`}>
                            <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
                            <div className="text-sm font-medium opacity-80 mb-1">MY SPENDING TYPE</div>
                            <h1 className="text-3xl font-black break-keep">
                                {t(result.name)}
                            </h1>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-lg text-slate-700 dark:text-slate-200 font-medium mb-6 leading-relaxed break-keep">
                                {t(result.description)}
                            </p>

                            {/* Features */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-3">
                                    {lang === 'ko' ? '특징' : 'Features'}
                                </h3>
                                <ul className="space-y-2">
                                    {result.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <span className="text-purple-500 mt-0.5">✔</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Advice */}
                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-5 mb-6">
                                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                                    💡 {lang === 'ko' ? '금융 조언' : 'Financial Advice'}
                                </h3>
                                <p className="text-sm text-purple-800 dark:text-purple-200 italic">
                                    "{result.advice}"
                                </p>
                            </div>

                            {/* Share / Retry */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    ↻ {lang === 'ko' ? '다시하기' : 'Retry'}
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity">
                                    🔗 {lang === 'ko' ? '공유하기' : 'Share'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-xs text-slate-400">
                        check-me.today
                    </div>
                </div>
            </main>
        );
    }

    return null;
}
