"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { loveQuestions, LoveQuestion, LoveResult, loveResults, defaultResult, LoveDimension } from "@/data/love-test";
import { useRouter } from "next/navigation";

export default function LoveQuiz() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<Record<LoveDimension, number>>({
        Passion: 0,
        Stability: 0,
        Intimacy: 0,
        Logic: 0
    });
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = loveQuestions[currentStep];
    const progress = ((currentStep + 1) / loveQuestions.length) * 100;

    const handleAnswer = (optionScores: { dimension: LoveDimension; score: number }[]) => {
        const newScores = { ...scores };
        optionScores.forEach(s => {
            newScores[s.dimension] += s.score;
        });
        setScores(newScores);

        if (currentStep < loveQuestions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    useEffect(() => {
        if (isFinished) {
            // 결과 계산
            const result = loveResults.find(r => r.condition(scores)) || defaultResult;

            // 분석중 페이지로 이동 (결과와 점수를 쿼리로 전달)
            const params = new URLSearchParams();
            params.set('type', result.id);
            params.set('test', 'love-test');
            // 점수도 전달하고 싶다면 추가 가능

            router.push(`/analyzing?${params.toString()}`);
        }
    }, [isFinished, scores, router]);

    if (isFinished) return null;

    return (
        <div className="w-full max-w-md mx-auto">
            {/* 상단 프로그레스 */}
            <div className="mb-8 relative">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-pink-500 font-bold text-sm">Question {currentStep + 1}/{loveQuestions.length}</span>
                    <span className="text-pink-400 text-xl">💖</span>
                </div>
                <div className="h-3 w-full bg-pink-100 dark:bg-pink-900/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
            </div>

            {/* 질문 카드 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-strong dark:bg-slate-800/90 rounded-3xl p-8 mb-6"
                >
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 leading-relaxed break-keep">
                        {currentQuestion.text[lang] || currentQuestion.text.en}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.scores)}
                                className="w-full p-5 text-left bg-white/50 dark:bg-slate-700/50 hover:bg-pink-50 dark:hover:bg-pink-900/20 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-700 rounded-2xl transition-all group active:scale-[0.98]"
                            >
                                <span className="text-slate-700 dark:text-slate-200 font-medium group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors break-keep">
                                    {option.text[lang] || option.text.en}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                💕 당신의 연애 성향을 분석하고 있습니다
            </p>
        </div>
    );
}
