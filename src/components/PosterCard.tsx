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
          {/* 상단: 이모지 영역 (55%) */}
          <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center">
            <span className="text-5xl opacity-50 grayscale">{test.emoji}</span>
          </div>

          {/* SOON 배지 - 작고 반투명하게 */}
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-slate-500/70 backdrop-blur-sm rounded-full">
            <span className="text-[9px] font-bold text-white/90">SOON</span>
          </div>

          {/* 하단: 정보 영역 (45%) */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-3 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center line-clamp-2 break-keep leading-snug">
              {name}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-1.5">
              {lang === 'ko' ? '준비 중' : lang === 'zh' ? '准备中' : lang === 'ja' ? '準備中' : 'Coming Soon'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const href = ['starfall-rooftop', 'reaction-test'].includes(test.slug)
    ? `/tests/${test.slug}`
    : `/${test.slug}`;

  return (
    <Link href={href} className="group block">
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

        {/* 상단: 이모지 영역 (55%) */}
        <div className="absolute inset-x-0 top-0 h-[55%] flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {test.emoji}
          </span>
        </div>

        {/* 뱃지 - 작고 반투명하게 */}
        {test.badge && (
          <div className={`
            absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white/90 backdrop-blur-sm
            ${test.badge === "HOT"
              ? "bg-gradient-to-r from-orange-500/80 to-red-500/80"
              : "bg-gradient-to-r from-green-500/80 to-emerald-500/80"
            }
          `}>
            {test.badge}
          </div>
        )}

        {/* 하단: 정보 영역 (45%) */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <div className="h-full flex flex-col justify-center px-3 py-2">
            {/* 제목 - 긴 텍스트도 2줄까지 표시 */}
            <h3 className="text-xs font-bold text-slate-800 dark:text-white text-center line-clamp-2 break-keep leading-snug min-h-[2.5em]">
              {name}
            </h3>

            {/* 통계 */}
            <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <span>▶</span>
                <span>{formatPlayCount(playCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-pink-500 dark:text-pink-400">❤️</span>
                <span>{formatPlayCount(likeCount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
