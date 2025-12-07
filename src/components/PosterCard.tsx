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
          relative overflow-hidden rounded-2xl aspect-square
          bg-gradient-to-br ${test.bgGradient}
          border border-white/20 dark:border-slate-700
          opacity-70 saturate-50
        `}>
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/20 rounded-full blur-xl" />
          </div>

          {/* 콘텐츠 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
            <div className={`
              relative w-12 h-12 rounded-xl mb-2
              bg-gradient-to-br ${test.gradient}
              flex items-center justify-center
              shadow-lg opacity-60
            `}>
              <span className="text-xl opacity-70">{test.emoji}</span>
              
              {/* SOON 배지 - 아이콘 우측 상단에 작게 표시 */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-600/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                <span className="text-[8px]">⏳</span>
              </div>
            </div>
            
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center line-clamp-2 px-1 break-keep">
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
        relative overflow-hidden rounded-2xl aspect-square
        bg-gradient-to-br ${test.bgGradient}
        border border-white/40 dark:border-slate-600/50
        shadow-lg
        transition-all duration-300
        group-hover:shadow-xl group-hover:shadow-purple-500/20
        group-hover:scale-[1.03] group-hover:-translate-y-1
        active:scale-[0.97]
      `}>
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/25 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/20 rounded-full blur-xl" />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 pt-4">
          {/* 이모지 아이콘 */}
          <div className={`
            relative w-12 h-12 rounded-xl mb-2
            bg-gradient-to-br ${test.gradient}
            flex items-center justify-center
            shadow-lg shadow-black/20
            group-hover:scale-110 group-hover:rotate-3
            transition-all duration-400
            ring-2 ring-white/30
          `}>
            <span className="text-xl drop-shadow-md">{test.emoji}</span>
            
            {/* 뱃지 - 아이콘 우측 상단에 작게 표시 */}
            {test.badge && (
              <div className={`
                absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[8px] font-bold text-white
                flex items-center justify-center shadow-md
                ${test.badge === "HOT" 
                  ? "bg-gradient-to-r from-orange-500 to-red-500" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
                }
              `}>
                {test.badge === "HOT" ? "🔥" : "✨"}
              </div>
            )}
          </div>

          {/* 제목 */}
          <h3 className="text-xs font-bold text-slate-800 dark:text-white text-center line-clamp-2 px-1 leading-tight break-keep">
            {name}
          </h3>

          {/* 통계 & 호버 시 시작 버튼 (같은 위치, 호버 시 교체) */}
          <div className="relative mt-1.5 h-5">
            {/* 기본: 통계 표시 */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200 group-hover:opacity-0">
              <div className="flex items-center gap-0.5 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <span>▶</span>
                <span>{formatPlayCount(playCount)}</span>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-pink-500 dark:text-pink-400 font-medium">
                <span>❤️</span>
                <span>{formatPlayCount(likeCount)}</span>
              </div>
            </div>
            
            {/* 호버: 시작 버튼 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-500 dark:bg-purple-600 rounded-full text-[10px] font-bold text-white shadow-md">
                <span>▶</span>
                <span>{lang === 'ko' ? '시작' : lang === 'zh' ? '开始' : lang === 'ja' ? '開始' : 'Start'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
