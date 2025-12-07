"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, TraitType, solarTraits, lunarTraits } from "@/data/questions";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useIncrementPlay } from "@/hooks/useTestStats";
import Link from "next/link";
import AdUnit from "./AdUnit";

export default function Quiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    // 테스트 상태: 'playing' | 'analyzing'
    const [quizState, setQuizState] = useState<'playing' | 'analyzing'>('playing');

    // 테스트 시작 시 조회수 증가
    useIncrementPlay("energy-balance");

    // 각 특성별 점수 (0부터 시작)
    const [traitScores, setTraitScores] = useState<Record<TraitType, number>>({
        assertiveness: 0,
        achievement: 0,
        independence: 0,
        empathy: 0,
        collaboration: 0,
        intuition: 0,
    });

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnswer = (optionId: number, scores: { trait: TraitType; score: number }[]) => {
        if (isAnimating) return;

        setSelectedOption(optionId);
        setIsAnimating(true);

        setTimeout(() => {
            // 특성 점수 업데이트
            const newTraitScores = { ...traitScores };
            scores.forEach(({ trait, score }) => {
                newTraitScores[trait] += score;
            });
            setTraitScores(newTraitScores);

            setSelectedOption(null);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setIsAnimating(false);
            } else {
                // 마지막 문제 답변 후 -> 분석 단계로 진입
                finishQuiz(newTraitScores);
            }
        }, 300);
    };

    const finishQuiz = (finalScores: Record<TraitType, number>) => {
        setQuizState('analyzing');

        // Solar/Lunar 점수 계산
        let solarScore = 0;
        let lunarScore = 0;

        solarTraits.forEach(trait => {
            solarScore += finalScores[trait];
        });

        lunarTraits.forEach(trait => {
            lunarScore += finalScores[trait];
        });

        // 결과 타입 결정
        const resultType = solarScore >= lunarScore ? "SOLAR" : "LUNAR";

        // URL 파라미터 생성
        const params = new URLSearchParams({
            type: resultType,
            solar: solarScore.toString(),
            lunar: lunarScore.toString(),
            assertiveness: finalScores.assertiveness.toString(),
            achievement: finalScores.achievement.toString(),
            independence: finalScores.independence.toString(),
            empathy: finalScores.empathy.toString(),
            collaboration: finalScores.collaboration.toString(),
            intuition: finalScores.intuition.toString(),
        });

        // 3초 후 결과 페이지로 이동 (광고 노출 시간 확보)
        setTimeout(() => {
            router.push(`/analyzing?${params.toString()}`);
        }, 3500);
    };

    const currentQuestion = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    // 선택지 라벨 (A, B, C, D)
    const optionLabels = ['A', 'B', 'C', 'D'];

    // 로딩/분석 화면
    if (quizState === 'analyzing') {
        return (
            <div className="w-full min-h-[85vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-amber-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-pink-500 rounded-full animate-spin-reverse-slow opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🔮
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                    결과를 분석하고 있습니다...
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    당신의 내면 에너지를 확인하는 중입니다.
                </p>

                {/* 여기가 핵심 광고 영역 (전면 광고 느낌) */}
                <div className="w-full max-w-sm mx-auto glass-strong rounded-xl overflow-hidden shadow-lg p-2 bg-white/50">
                    <p className="text-xs text-center text-slate-400 mb-1">Sponsored</p>
                    {/* Rectangle Format Ad */}
                    <AdUnit slotId="1234567890" format="rectangle" className="min-h-[250px]" />
                </div>
            </div>
        );
    }

    // 퀴즈 진행 화면
    return (
        <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col min-h-[85vh] justify-between">

            {/* Header */}
            <div className="mb-6 animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href="/"
                        className="w-10 h-10 rounded-full glass border-white/40 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:scale-110 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div className="flex items-center gap-2 glass px-3 py-1 rounded-full border-white/40">
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                            {currentIndex + 1}
                        </span>
                        <span className="text-xs text-slate-400">/</span>
                        <span className="text-sm text-slate-500 font-medium">
                            {questions.length}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className="absolute h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
            </div>

            {/* Main Card Area */}
            <div className="flex-1 relative z-0">
                {/* Decorative Background Elements */}
                <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 -right-10 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div
                    key={currentIndex}
                    className="h-full flex flex-col"
                >
                    {/* Question Card */}
                    <div className="glass-strong rounded-[2rem] p-8 mb-6 relative overflow-hidden ring-1 ring-white/60 shadow-xl animate-scale-in">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-indigo-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 to-indigo-100 dark:from-amber-900/40 dark:to-indigo-900/40 rounded-full mb-6 border border-white/50">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600 text-xs font-bold tracking-wider uppercase">
                                Question {currentIndex + 1}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug break-keep relative z-10">
                            {t(currentQuestion.text)}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3 flex-1">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.id, option.scores)}
                                disabled={selectedOption !== null}
                                className={`
                                    w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group
                                    border border-transparent
                                    animate-slide-up
                                    ${selectedOption === option.id
                                        ? "bg-gradient-to-r from-amber-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-[0.98]"
                                        : "glass hover:bg-white/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:border-white/50 hover:-translate-y-0.5"
                                    }
                                    disabled:cursor-not-allowed
                                `}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`
                                        inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 transition-colors
                                        ${selectedOption === option.id
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                                        }
                                    `}>
                                        {optionLabels[idx]}
                                    </span>
                                    <span className="font-medium text-lg leading-snug break-keep">
                                        {t(option.text)}
                                    </span>
                                </div>

                                {selectedOption === option.id && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-scale-in">
                                        <div className="bg-white rounded-full p-1">
                                            <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
