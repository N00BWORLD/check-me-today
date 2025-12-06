"use client";

import Link from "next/link";
import { TestData, formatPlayCount } from "@/data/tests";
import { useLanguage } from "@/context/LanguageContext";
import { TestStats } from "@/lib/firebase";

interface PosterCardProps {
    test: TestData;
    realStats?: TestStats;
}

export default function PosterCard({ test, realStats }: PosterCardProps) {
    const { lang } = useLanguage();

    const name = test.name[lang] || test.name.en;
    
    // 실시간 통계가 있으면 사용, 없으면 기본값
    const playCount = realStats?.playCount ?? test.playCount;
    const likeCount = realStats?.likeCount ?? test.likeCount;

    // Coming Soon 카드
    if (test.isComingSoon) {
        return (
            <div className="group relative">
                <div className={`
                    relative overflow-hidden rounded-2xl aspect-[4/5]
                    bg-gradient-to-br ${test.bgGradient}
                    border border-white/30 dark:border-slate-700
                    opacity-60 grayscale
                `}>
                    {/* 배경 패턴 */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/20 rounded-full blur-2xl" />
                        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                    </div>
                    
                    {/* SOON 배지 */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-slate-500/80 backdrop-blur-sm rounded-full">
                        <span className="text-[10px] font-bold text-white">SOON</span>
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className={`
                            w-16 h-16 rounded-2xl mb-3
                            bg-gradient-to-br ${test.gradient}
                            flex items-center justify-center
                            shadow-lg opacity-50
                        `}>
                            <span className="text-3xl">{test.emoji}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 text-center line-clamp-2 px-2">
                            {name}
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link href={`/${test.slug}`} className="group block">
            <div className={`
                relative overflow-hidden rounded-2xl aspect-[4/5]
                bg-gradient-to-br ${test.bgGradient}
                border border-white/30 dark:border-slate-700/50
                shadow-lg
                transition-all duration-300
                group-hover:shadow-2xl group-hover:shadow-purple-500/20
                group-hover:scale-[1.03] group-hover:-translate-y-1
                active:scale-[0.98]
            `}>
                {/* 배경 장식 */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-white/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
                
                {/* 뱃지 */}
                {test.badge && (
                    <div className={`
                        absolute top-2.5 right-2.5 px-2 py-1 rounded-full text-[10px] font-bold text-white
                        ${test.badge === "HOT" 
                            ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30" 
                            : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                        }
                        animate-pulse
                    `}>
                        🔥 {test.badge}
                    </div>
                )}
                
                {/* 메인 콘텐츠 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* 큰 이모지 아이콘 */}
                    <div className={`
                        w-20 h-20 rounded-3xl mb-4
                        bg-gradient-to-br ${test.gradient}
                        flex items-center justify-center
                        shadow-xl shadow-black/20
                        group-hover:scale-110 group-hover:rotate-3
                        transition-all duration-300
                        ring-4 ring-white/30
                    `}>
                        <span className="text-4xl drop-shadow-lg">{test.emoji}</span>
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-base font-black text-slate-800 dark:text-white text-center line-clamp-2 px-2 mb-2 drop-shadow-sm">
                        {name}
                    </h3>
                    
                    {/* 통계 */}
                    <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-200 font-semibold">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {formatPlayCount(playCount)}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-full text-pink-600 dark:text-pink-400 font-semibold">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            {formatPlayCount(likeCount)}
                        </span>
                    </div>
                </div>
                
                {/* 하단 플레이 버튼 힌트 */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg">
                        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="text-xs font-bold text-slate-700 dark:text-white">
                            {lang === 'ko' ? '시작하기' : lang === 'zh' ? '开始' : lang === 'ja' ? 'スタート' : 'Start'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

