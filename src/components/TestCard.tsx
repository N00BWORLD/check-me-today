"use client";

import Link from "next/link";
import { TestData, formatPlayCount } from "@/data/tests";
import { useLanguage } from "@/context/LanguageContext";
import { TestStats } from "@/lib/firebase";

interface TestCardProps {
    test: TestData;
    realStats?: TestStats; // Firebase에서 가져온 실시간 통계
}

export default function TestCard({ test, realStats }: TestCardProps) {
    const { lang } = useLanguage();

    const name = test.name[lang] || test.name.en;
    const description = test.description[lang] || test.description.en;
    
    // 실시간 통계가 있으면 사용, 없으면 기본값
    const playCount = realStats?.playCount ?? test.playCount;
    const likeCount = realStats?.likeCount ?? test.likeCount;

    if (test.isComingSoon) {
        return (
            <div className={`
                relative overflow-hidden rounded-2xl p-4
                glass dark:bg-slate-800/60
                border border-white/50 dark:border-slate-700
                opacity-70
            `}>
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-14 h-14 rounded-xl shrink-0
                        bg-gradient-to-br ${test.bgGradient}
                        flex items-center justify-center
                        grayscale opacity-60
                    `}>
                        <span className="text-2xl">{test.emoji}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-base font-bold text-slate-500 dark:text-slate-400 truncate">
                                {name}
                            </h3>
                            <span className="shrink-0 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                SOON
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link href={`/${test.slug}`} className="block group">
            <div className={`
                relative overflow-hidden rounded-2xl p-4
                bg-gradient-to-br ${test.bgGradient}
                border border-white/50 dark:border-slate-700
                shadow-md
                transition-all duration-300
                hover:shadow-xl hover:shadow-purple-500/10
                hover:scale-[1.02] hover:-translate-y-0.5
                active:scale-[0.98]
            `}>
                {/* Badge */}
                {test.badge && (
                    <div className={`
                        absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white
                        ${test.badge === "HOT" 
                            ? "bg-gradient-to-r from-orange-500 to-red-500" 
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }
                        shadow-lg
                    `}>
                        {test.badge}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-14 h-14 rounded-xl shrink-0
                        bg-gradient-to-br ${test.gradient}
                        flex items-center justify-center
                        shadow-lg
                        group-hover:scale-110 transition-transform duration-300
                    `}>
                        <span className="text-2xl">{test.emoji}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-0.5 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mb-1.5">
                            {description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {formatPlayCount(playCount)}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                {formatPlayCount(likeCount)}
                            </span>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 group-hover:bg-purple-500 transition-colors">
                        <svg 
                            className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

