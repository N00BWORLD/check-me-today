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
          relative overflow-hidden rounded-2xl aspect-[3/4]
          bg-gradient-to-b ${test.bgGradient}
          border border-white/20 dark:border-slate-700
          opacity-60 saturate-50
        `}>
          {/* 상단: 이모지 영역 (70%) */}
          <div className="absolute inset-x-0 top-0 h-[65%] flex items-center justify-center">
            <span className="text-5xl opacity-50 grayscale">{test.emoji}</span>
          </div>

          {/* SOON 배지 */}
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-600/80 backdrop-blur-sm rounded-full">
            <span className="text-[9px] font-bold text-white">⏳ SOON</span>
          </div>

          {/* 하단: 정보 영역 (30%) */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-2 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 text-center line-clamp-2 break-keep leading-tight">
              {name}
            </h3>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 text-center mt-1">
              {lang === 'ko' ? '준비 중' : 'Coming Soon'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/${test.slug}`} className="group block">
      <div className={`
        relative overflow-hidden rounded-2xl aspect-[3/4]
        bg-gradient-to-b ${test.bgGradient}
        border border-white/30 dark:border-slate-600/50
        shadow-lg
        transition-all duration-300
        group-hover:shadow-xl group-hover:shadow-purple-500/25
        group-hover:scale-[1.02] group-hover:-translate-y-1
        active:scale-[0.98]
      `}>
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
          <div className="absolute top-1/3 -left-8 w-20 h-20 bg-white/20 rounded-full blur-xl" />
        </div>

        {/* 상단: 이모지 영역 (65%) */}
        <div className="absolute inset-x-0 top-0 h-[65%] flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {test.emoji}
          </span>
        </div>

        {/* 뱃지 */}
        {test.badge && (
          <div className={`
            absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-md
            ${test.badge === "HOT" 
              ? "bg-gradient-to-r from-orange-500 to-red-500" 
              : "bg-gradient-to-r from-green-500 to-emerald-500"
            }
          `}>
            {test.badge === "HOT" ? "🔥 HOT" : "✨ NEW"}
          </div>
        )}

        {/* 하단: 정보 영역 (35%) */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <div className="h-full flex flex-col justify-center px-2 py-1.5">
            {/* 제목 */}
            <h3 className="text-[11px] font-bold text-slate-800 dark:text-white text-center line-clamp-2 break-keep leading-tight">
              {name}
            </h3>

            {/* 통계 & 호버 시 시작 버튼 */}
            <div className="relative mt-1 h-4">
              {/* 기본: 통계 표시 */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-200 group-hover:opacity-0">
                <div className="flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>▶</span>
                  <span>{formatPlayCount(playCount)}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[9px] text-pink-500 dark:text-pink-400 font-medium">
                  <span>❤️</span>
                  <span>{formatPlayCount(likeCount)}</span>
                </div>
              </div>
              
              {/* 호버: 시작 버튼 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-1 px-3 py-0.5 bg-purple-500 dark:bg-purple-600 rounded-full text-[9px] font-bold text-white shadow-md">
                  <span>▶</span>
                  <span>{lang === 'ko' ? '시작하기' : lang === 'zh' ? '开始' : lang === 'ja' ? '開始' : 'Start'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
