"use client";

// 질문 화면: 진행바 + 질문 카드 + 선택지 (선택 시 강조 애니메이션 후 다음 문항)
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizDefinition } from "@/data/engine/types";
import { engineTexts } from "./engineTexts";
import { ACCENT } from "./accent";

interface Props {
    quiz: QuizDefinition;
    /** 모든 문항에 답하면 호출 (answers[i] = i번째 질문의 선택지 인덱스) */
    onComplete: (answers: number[]) => void;
}

const SELECT_DELAY_MS = 350;

export default function QuizPlayer({ quiz, onComplete }: Props) {
    const { t } = useLanguage();
    const accent = ACCENT[quiz.theme.accent];

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    const question = quiz.questions[step];
    const total = quiz.questions.length;
    const progress = ((step + (selected !== null ? 1 : 0)) / total) * 100;

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        const next = [...answers.slice(0, step), idx];
        setAnswers(next);

        setTimeout(() => {
            if (step < total - 1) {
                setStep(step + 1);
                setSelected(null);
            } else {
                onComplete(next);
            }
        }, SELECT_DELAY_MS);
    };

    const handleBack = () => {
        if (step === 0 || selected !== null) return;
        setStep(step - 1);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 pb-24">
            <div className="w-full max-w-md mx-auto">
                {/* 상단: 이전 버튼 · 문항 번호 · 진행바 */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-0 transition-colors"
                    >
                        ← {t(engineTexts.back)}
                    </button>
                    <span className={`text-sm font-bold ${accent.text}`}>
                        {step + 1} / {total}
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
                    <div
                        className={`h-full bg-gradient-to-r ${quiz.theme.gradient} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* 질문 카드 (step 이 바뀌면 key 로 재마운트해 애니메이션 재생) */}
                <div key={step} className="animate-slide-up">
                    <div className="glass-strong rounded-[2rem] p-6 mb-4">
                        <span className="text-xs font-bold tracking-widest text-slate-400">
                            {t(engineTexts.question)} {String(step + 1).padStart(2, "0")}
                        </span>
                        <h2 className="mt-2 text-xl font-bold text-slate-800 dark:text-white leading-snug break-keep">
                            {t(question.text)}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {question.options.map((option, idx) => {
                            const isSelected = selected === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    disabled={selected !== null}
                                    className={`
                                        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                                        animate-slide-up disabled:cursor-default
                                        ${isSelected
                                            ? `${accent.bg} ${accent.border} scale-[1.02] shadow-lg`
                                            : "glass border-transparent active:scale-[0.98]"}
                                    `}
                                    style={{ animationDelay: `${idx * 0.08}s` }}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`
                                            shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                                            ${isSelected ? `bg-gradient-to-r ${quiz.theme.gradient} text-white` : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300"}
                                        `}>
                                            {isSelected ? "✓" : String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="font-medium text-slate-700 dark:text-slate-200 break-keep">
                                            {t(option.text)}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
