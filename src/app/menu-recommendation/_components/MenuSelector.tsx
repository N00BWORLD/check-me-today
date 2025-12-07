"use client";

import { timeSlots, type TimeSlot } from "@/data/menu-recommendation";
import Link from "next/link";

interface MenuSelectorProps {
    currentTimeSlot: TimeSlot;
    onSelectTimeSlot: (timeSlot: TimeSlot) => void;
    pageInfo: any;
    stats: any;
    tagOptions: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    tagLabels: (tag: string) => string;
    filteredCount: number;
}

export default function MenuSelector({
    currentTimeSlot,
    onSelectTimeSlot,
    pageInfo,
    stats,
    tagOptions,
    selectedTags,
    onToggleTag,
    tagLabels,
    filteredCount
}: MenuSelectorProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* 헤더 */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {pageInfo.title}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                            {pageInfo.subtitle}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {pageInfo.description}
                        </p>
                    </div>


                    {/* 태그 필터 */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                            <span>태그 필터 (AND 매칭)</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {filteredCount} {pageInfo.filtered || 'matches'}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tagOptions.map((tag) => {
                                const active = selectedTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => onToggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-xs border transition ${
                                            active
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                        }`}
                                    >
                                        #{tagLabels(tag)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 추천 버튼 */}
                    <div className="text-center mb-8">
                        <button
                            onClick={() => onSelectTimeSlot(currentTimeSlot)}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            🍽️ {pageInfo.recommend}
                        </button>
                    </div>

                    {/* 통계 및 네비게이션 */}
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                        >
                            {pageInfo.back}
                        </Link>
                        <div className="flex items-center gap-1">
                            <span>{pageInfo.stats}:</span>
                            <span className="font-bold">{stats.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
