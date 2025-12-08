"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tests, TestData } from "@/data/tests";

interface RecommendedTestsProps {
    currentTestId?: string;
}

export default function RecommendedTests({ currentTestId }: RecommendedTestsProps) {
    const { lang } = useLanguage();

    // 현재 테스트 제외하고 랜덤으로 4개 선택
    const otherTests = tests
        .filter((test) => test.id !== currentTestId && !test.isComingSoon)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    return (
        <div className="mt-8 animate-fade-in relative z-20"> {/* Explicit z-index */}
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
                    <Link
                        key={test.id}
                        href={`/${test.slug}`}
                        className="group block relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                    >
                        <div className={`h-1.5 w-full bg-gradient-to-r ${test.gradient}`} />
                        <div className="p-4">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">
                                {test.emoji}
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-colors">
                                {test.name[lang] || test.name['en']}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                {test.description[lang] || test.description['en']}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
