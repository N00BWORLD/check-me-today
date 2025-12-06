"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, PersonalityType } from "@/data/questions";
import Link from "next/link";

export default function Quiz() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState<Record<PersonalityType, number>>({
        TETO: 0,
        EGEN: 0,
    });
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnswer = (type: PersonalityType, optionId: number) => {
        if (isAnimating) return;
        
        setSelectedOption(optionId);
        setIsAnimating(true);
        
        setTimeout(() => {
            const newScores = { ...scores, [type]: scores[type] + 1 };
            setScores(newScores);
            setSelectedOption(null);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setIsAnimating(false);
            } else {
                const resultType = newScores.TETO > newScores.EGEN ? "TETO" : "EGEN";
                router.push(`/result?type=${resultType}`);
            }
        }, 300);
    };

    const currentQuestion = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col min-h-[85vh] justify-between">
            
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                {/* Back Button & Progress */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-purple-600">
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
                    <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/50">
                        <div
                            className="progress-bar h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {/* Progress Dots */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none">
                        {questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                    idx <= currentIndex ? "bg-white" : "bg-white/30"
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
                    <div className="glass-strong rounded-3xl p-8 mb-6 relative overflow-hidden">
                        {/* Decorative Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        
                        {/* Question Number Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-5">
                            <span className="text-white text-xs font-bold tracking-wider">
                                QUESTION {currentIndex + 1}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-snug break-keep relative z-10">
                            {currentQuestion.text}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3 flex-1">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.type, option.id)}
                                disabled={selectedOption !== null}
                                className={`
                                    w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden
                                    animate-slide-up
                                    ${selectedOption === option.id 
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-[0.98]" 
                                        : "glass hover:bg-white/90 text-slate-700 hover:shadow-lg hover:scale-[1.02]"
                                    }
                                    disabled:cursor-not-allowed
                                    active:scale-[0.98]
                                `}
                                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
                            >
                                {/* Option Letter */}
                                <span className={`
                                    inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold
                                    ${selectedOption === option.id 
                                        ? "bg-white/20 text-white" 
                                        : "bg-purple-100 text-purple-600"
                                    }
                                `}>
                                    {idx === 0 ? "A" : "B"}
                                </span>
                                <span className="font-semibold text-lg">
                                    {option.text}
                                </span>
                                
                                {/* Selection Indicator */}
                                {selectedOption === option.id && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-scale-in">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <p className="text-slate-400 text-sm">
                    ✨ 직감적으로 선택해보세요
                </p>
            </div>
        </div>
    );
}
