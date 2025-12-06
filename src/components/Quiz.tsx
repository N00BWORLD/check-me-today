"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions, PersonalityType } from "@/data/questions";
import { clsx } from "clsx";

export default function Quiz() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState<Record<PersonalityType, number>>({
        TETO: 0,
        EGEN: 0,
    });

    const handleAnswer = (type: PersonalityType) => {
        // Add a small delay for the ripple effect/animation to be felt
        setTimeout(() => {
            const newScores = { ...scores, [type]: scores[type] + 1 };
            setScores(newScores);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                const resultType = newScores.TETO > newScores.EGEN ? "TETO" : "EGEN";
                router.push(`/result?type=${resultType}`);
            }
        }, 250);
    };

    const currentQuestion = questions[currentIndex];
    // Calculate distinct progress steps (e.g. 1/7, 2/7)
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col h-[80vh] justify-center">

            {/* Top: Progress & Counter */}
            <div className="mb-12 space-y-4">
                <div className="flex justify-between items-end px-1">
                    <span className="text-3xl font-black text-slate-900 leading-none">
                        Q{currentIndex + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-400 mb-1">
                        {questions.length}문제 중
                    </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                </div>
            </div>

            {/* Main Card Area */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: -50, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="absolute inset-0"
                    >
                        {/* Question Bubble */}
                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-white/50 mb-6 backdrop-blur-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight break-keep">
                                {currentQuestion.text}
                            </h2>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 + 0.2 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => handleAnswer(option.type)}
                                    className={clsx(
                                        "w-full text-left p-5 rounded-2xl transition-colors duration-200",
                                        "bg-white hover:bg-blue-50 border-2 border-transparent hover:border-blue-200",
                                        "shadow-lg shadow-slate-100 font-semibold text-slate-700 text-lg"
                                    )}
                                >
                                    {option.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
