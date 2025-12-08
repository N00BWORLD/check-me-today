"use client";

import { timeSlots, type TimeSlot } from "@/data/menu-recommendation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface MenuSelectorProps {
    currentTimeSlot: TimeSlot;
    onSelectTimeSlot: (timeSlot: TimeSlot) => void;
    pageInfo: any;
    stats: any;
}

export default function MenuSelector({
    currentTimeSlot,
    onSelectTimeSlot,
    pageInfo,
    stats,
}: MenuSelectorProps) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto flex flex-col min-h-[80vh] justify-center">
                    {/* 헤더 */}
                    <div className="text-center mb-12">
                        <div className="text-6xl mb-6 animate-bounce">🍽️</div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                            {pageInfo.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-3 font-medium">
                            {pageInfo.subtitle}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            {pageInfo.description}
                        </p>
                    </div>

                    {/* 추천 버튼 */}
                    <div className="text-center mb-12">
                        <button
                            onClick={() => onSelectTimeSlot(currentTimeSlot)}
                            className="w-full max-w-md mx-auto py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-3xl font-black text-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.95] shadow-2xl shadow-orange-500/40 border-t border-white/20 ring-4 ring-orange-100 dark:ring-orange-900/30"
                        >
                            <span className="drop-shadow-md flex items-center justify-center gap-3">
                                <span>🎲</span>
                                <span>{pageInfo.recommend}</span>
                            </span>
                        </button>
                    </div>

                    {/* 통계 및 네비게이션 */}
                    <div className="flex flex-col items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-8 mt-auto">
                        <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-5 py-2.5 rounded-full shadow-sm backdrop-blur-sm">
                            <span>{pageInfo.stats}:</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">{stats.toLocaleString()}</span>
                        </div>
                        <Link
                            href="/"
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline decoration-slate-300 underline-offset-4"
                        >
                            {pageInfo.back}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
