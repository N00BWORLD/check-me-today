"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, TraitType, solarTraits, lunarTraits } from "@/data/questions";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useIncrementPlay } from "@/hooks/useTestStats";
import Link from "next/link";

export default function Quiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    
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
                // Solar/Lunar 점수 계산
                let solarScore = 0;
                let lunarScore = 0;
                
                solarTraits.forEach(trait => {
                    solarScore += newTraitScores[trait];
                });
                
                lunarTraits.forEach(trait => {
                    lunarScore += newTraitScores[trait];
                });
                
                // 결과 타입 결정
                const resultType = solarScore >= lunarScore ? "SOLAR" : "LUNAR";
                
                // URL 파라미터 생성
                const params = new URLSearchParams({
                    type: resultType,
                    solar: solarScore.toString(),
                    lunar: lunarScore.toString(),
                    assertiveness: newTraitScores.assertiveness.toString(),
                    achievement: newTraitScores.achievement.toString(),
                    independence: newTraitScores.independence.toString(),
                    empathy: newTraitScores.empathy.toString(),
                    collaboration: newTraitScores.collaboration.toString(),
                    intuition: newTraitScores.intuition.toString(),
                });
                
                // 광고 로딩 페이지를 거쳐서 결과 페이지로 이동
                router.push(`/analyzing?${params.toString()}`);
            }
        }, 300);
    };

    const currentQuestion = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    // 선택지 라벨 (A, B, C, D)
    const optionLabels = ['A', 'B', 'C', 'D'];

    return (
        <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col min-h-[85vh] justify-between">
            
            {/* Header */}
            <div className="mb-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href="/"
                        className="w-10 h-10 rounded-full glass dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                            {currentIndex + 1}
                        </span>
                        <span className="text-sm text-slate-400">/</span>
                        <span className="text-sm text-slate-400">
                            {questions.length}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                    <div className="w-full bg-white/50 dark:bg-slate-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/50 dark:border-slate-600">
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none">
                        {questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1 h-1 rounded-full transition-colors ${
                                    idx <= currentIndex ? "bg-white" : "bg-white/30 dark:bg-slate-600"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Card Area */}
            <div className="flex-1 relative">
                <div
                    key={currentIndex}
                    className="h-full flex flex-col animate-slide-up"
                >
                    {/* Question Card */}
                    <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-6 mb-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-indigo-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full mb-4">
                            <span className="text-white text-xs font-bold tracking-wider">
                                {t(uiTexts.question)} {currentIndex + 1}
                            </span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-snug break-keep relative z-10">
                            {t(currentQuestion.text)}
                        </h2>
                    </div>

                    {/* Answer Options - 4개 */}
                    <div className="space-y-2 flex-1">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.id, option.scores)}
                                disabled={selectedOption !== null}
                                className={`
                                    w-full text-left p-4 rounded-2xl transition-all duration-300 relative overflow-hidden
                                    animate-slide-up
                                    ${selectedOption === option.id 
                                        ? "bg-gradient-to-r from-amber-500 to-indigo-500 text-white shadow-lg shadow-amber-500/30 scale-[0.98]" 
                                        : "glass dark:bg-slate-800/80 hover:bg-white/90 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:scale-[1.01]"
                                    }
                                    disabled:cursor-not-allowed
                                    active:scale-[0.98]
                                `}
                                style={{ animationDelay: `${idx * 0.08 + 0.15}s` }}
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`
                                        inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold flex-shrink-0 mt-0.5
                                        ${selectedOption === option.id 
                                            ? "bg-white/20 text-white" 
                                            : "bg-gradient-to-br from-amber-100 to-indigo-100 dark:from-amber-900/50 dark:to-indigo-900/50 text-amber-700 dark:text-amber-300"
                                        }
                                    `}>
                                        {optionLabels[idx]}
                                    </span>
                                    <span className="font-medium text-base leading-snug break-keep">
                                        {t(option.text)}
                                    </span>
                                </div>
                                
                                {selectedOption === option.id && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 animate-scale-in">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Hint */}
            <div className="mt-4 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                    {t(uiTexts.selectIntuitively)}
                </p>
            </div>
        </div>
    );
}
