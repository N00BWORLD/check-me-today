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
        const newScores = { ...scores, [type]: scores[type] + 1 };
        setScores(newScores);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Calculate result
            const resultType = newScores.TETO > newScores.EGEN ? "TETO" : "EGEN";
            router.push(`/result?type=${resultType}`);
        }
    };

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8">
                <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
                >
                    <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
                        Question {currentIndex + 1} / {questions.length}
                    </span>

                    <h2 className="text-2xl font-bold mt-4 mb-8 text-slate-800">
                        {currentQuestion.text}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.type)}
                                className={clsx(
                                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                                    "border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 font-medium"
                                )}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
