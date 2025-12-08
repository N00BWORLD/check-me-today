"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tests, TestData } from "@/data/tests";

interface RecommendedTestsProps {
    currentTestId?: string;
}

export default function RecommendedTests({ currentTestId }: RecommendedTestsProps) {
    const { lang } = useLanguage();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [animatingId, setAnimatingId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 현재 테스트 제외하고 랜덤으로 4개 선택
    const otherTests = tests
        .filter((test) => test.id !== currentTestId && !test.isComingSoon)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    const handleTestClick = (e: React.MouseEvent, test: TestData) => {
        e.preventDefault();
        setAnimatingId(test.id);

        const href = `/${test.slug}`;

        // Delay for animation
        setTimeout(() => {
            router.push(href);
        }, 2000);
    };

    // Render Portal for Animation Overlay
    const renderAnimationOverlay = () => {
        if (!mounted || !animatingId) return null;

        const animatingTest = tests.find(t => t.id === animatingId);
        if (!animatingTest) return null;

        return createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                {animatingId === "energy-balance" && (
                    <div className="text-8xl animate-swing filter drop-shadow-2xl">
                        ⚖️
                    </div>
                )}
                {animatingId === "fortune" && (
                    <div className="text-8xl animate-pop filter drop-shadow-2xl">
                        🧧
                    </div>
                )}
                {/* Fallback for other tests if needed, or just standard loading feel */}
                {!["energy-balance", "fortune"].includes(animatingId) && (
                    <div className="text-8xl animate-pulse-card filter drop-shadow-2xl">
                        {animatingTest.emoji}
                    </div>
                )}
            </div>,
            document.body
        );
    };

    return (
        <div className="mt-8 animate-fade-in relative z-20"> {/* Explicit z-index */}
            {renderAnimationOverlay()}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span>🔥</span>
                    {lang === 'ko' ? '추천 테스트' :
                        lang === 'zh' ? '推荐测试' :
                            lang === 'ja' ? 'おすすめテスト' :
                                'Recommended'}
                </h3>
                <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1">
                    {lang === 'ko' ? '더보기' : 'More'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {otherTests.map((test) => (
                    <div
                        key={test.id}
                        onClick={(e) => handleTestClick(e, test)}
                        className={`
                            group block relative overflow-hidden rounded-xl cursor-pointer
                            bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                            shadow-sm hover:shadow-md transition-all 
                            ${animatingId === test.id ? 'animate-pulse-card' : 'active:scale-[0.98]'}
                        `}
                    >
                        <div className={`h-1.5 w-full bg-gradient-to-r ${test.gradient}`} />
                        <div className="p-4">
                            <div className={`text-3xl mb-3 transition-transform duration-300 origin-left ${animatingId !== test.id ? 'group-hover:scale-110' : ''}`}>
                                {test.emoji}
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-colors">
                                {test.name[lang] || test.name['en']}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                {test.description[lang] || test.description['en']}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
