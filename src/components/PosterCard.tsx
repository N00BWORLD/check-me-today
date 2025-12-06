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
                    relative overflow-hidden rounded-3xl aspect-[3/4]
                    bg-gradient-to-br ${test.bgGradient}
                    border-2 border-white/20 dark:border-slate-700
                    opacity-70 saturate-50
                `}>
                    {/* 배경 패턴 */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                    </div>
                    
                    {/* SOON 배지 */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-slate-600/90 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-bold text-white">⏳ SOON</span>
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                        <div className={`
                            w-24 h-24 rounded-[1.5rem] mb-4
                            bg-gradient-to-br ${test.gradient}
                            flex items-center justify-center
                            shadow-xl opacity-60
                        `}>
                            <span className="text-5xl opacity-70">{test.emoji}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-500 dark:text-slate-400 text-center line-clamp-2 px-3 mb-2">
                            {name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                            {lang === 'ko' ? '준비 중...' : lang === 'zh' ? '准备中...' : lang === 'ja' ? '準備中...' : 'Coming Soon...'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link href={`/${test.slug}`} className="group block">
            <div className={`
                relative overflow-hidden rounded-3xl aspect-[3/4]
                bg-gradient-to-br ${test.bgGradient}
                border-2 border-white/40 dark:border-slate-600/50
                shadow-xl
                transition-all duration-300
                group-hover:shadow-2xl group-hover:shadow-purple-500/30
                group-hover:scale-[1.02] group-hover:-translate-y-2
                active:scale-[0.98]
            `}>
                {/* 배경 장식 - 더 화려하게 */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/25 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    {/* 반짝이 효과 */}
                    <div className="absolute top-8 left-8 w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                    <div className="absolute top-16 right-10 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-20 left-12 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* 뱃지 - 더 크게 */}
                {test.badge && (
                    <div className={`
                        absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white
                        ${test.badge === "HOT" 
                            ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/40" 
                            : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/40"
                        }
                    `}>
                        {test.badge === "HOT" ? "🔥" : "✨"} {test.badge}
                    </div>
                )}
                
                {/* 메인 콘텐츠 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                    {/* 큰 이모지 아이콘 - 훨씬 크게 */}
                    <div className={`
                        w-28 h-28 rounded-[2rem] mb-5
                        bg-gradient-to-br ${test.gradient}
                        flex items-center justify-center
                        shadow-2xl shadow-black/30
                        group-hover:scale-110 group-hover:rotate-6
                        transition-all duration-500
                        ring-4 ring-white/40
                    `}>
                        <span className="text-6xl drop-shadow-lg filter">{test.emoji}</span>
                    </div>
                    
                    {/* 제목 - 더 크게 */}
                    <h3 className="text-lg font-black text-slate-800 dark:text-white text-center line-clamp-2 px-3 mb-4 drop-shadow-md leading-tight">
                        {name}
                    </h3>
                    
                    {/* 설명 추가 */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 text-center line-clamp-2 px-4 mb-4 opacity-80">
                        {test.description[lang] || test.description.en}
                    </p>
                    
                    {/* 통계 - 더 예쁘게 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm shadow-inner">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {formatPlayCount(playCount)}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100/60 dark:bg-pink-900/30 backdrop-blur-sm rounded-xl text-pink-600 dark:text-pink-400 font-bold text-sm shadow-inner">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            {formatPlayCount(likeCount)}
                        </div>
                    </div>
                </div>
                
                {/* 하단 플레이 버튼 - 더 크게 */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
                        <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="text-sm font-bold text-slate-700 dark:text-white">
                            {lang === 'ko' ? '테스트 시작' : lang === 'zh' ? '开始测试' : lang === 'ja' ? 'テスト開始' : 'Start Test'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

