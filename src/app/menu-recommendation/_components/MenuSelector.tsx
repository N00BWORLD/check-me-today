"use client";

import { timeSlots, type TimeSlot } from "@/data/menu-recommendation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface MenuSelectorProps {
    currentTimeSlot: TimeSlot;
    onSelectTimeSlot: (timeSlot: TimeSlot) => void;
    pageInfo: any;
    stats: any;
    tagOptions: string[];
    tagCategories: Record<string, { label: Record<string, string>; tags: string[] }>;
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
    tagCategories,
    selectedTags,
    onToggleTag,
    tagLabels,
    filteredCount
}: MenuSelectorProps) {
    // Current language detection helper (this is a bit hacky, but consistent with existing code structure)
    // In a real refactor, we should pass 'lang' as a prop.
    // For now, we infer the language from the first label check or simplified logic.
    // Actually, tagLabels uses the closure from page.tsx, so we are good there.
    // But for category labels, we need to know the language. 
    // Since pageInfo is passed, let's pass lang from parent or just iterate keys if simple.
    // However, the cleanest way is adding 'lang' to props or handling it in page.tsx. The user passed 'tagCategories' which has multi-lang labels.
    // Let's assume 'ko' as default if we can't detect, OR better yet, let the parent pass the localised label directly?
    // No, the parent passed the whole object. Let's try to detect lang based on the first character of pageInfo.title? No that's risky.
    // Let's check if we can import useLanguage here. Yes, it's a client component.

    // BUT, I can't add hooks easily without checking imports. 
    // Let's check existing imports. "use client" is there. 
    // Let's use useLanguage hook if possible.
    // Wait, the previous file view showed: `import { timeSlots, type TimeSlot } from "@/data/menu-recommendation";`. 
    // It did NOT import useLanguage.
    // I should add the import.

    const { lang } = require("@/context/LanguageContext").useLanguage(); // Dynamic require or just import top level.
    // Since I'm replacing the whole file content mostly, let's just use standard import.

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


                    {/* 태그 필터 (카테고리별) */}
                    <div className="mb-8 space-y-6">
                        <div className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                            <span>태그 필터 (AND 매칭)</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {filteredCount} {pageInfo.filtered || 'matches'}
                            </span>
                        </div>

                        {/* 카테고리 렌더링 */}
                        {Object.entries(tagCategories).map(([key, category]) => (
                            <div key={key} className="bg-white/40 dark:bg-slate-800/40 rounded-xl p-4 border border-white/50 dark:border-slate-700/50">
                                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                                    {category.label[lang] || category.label['ko']}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.tags.map((tag) => {
                                        // 태그가 실제로 존재하는지 확인 (데이터에 없는 태그가 카테고리에 있을 수 있음)
                                        if (!tagOptions.includes(tag)) return null;

                                        const active = selectedTags.includes(tag);
                                        return (
                                            <button
                                                key={tag}
                                                onClick={() => onToggleTag(tag)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${active
                                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 transform scale-105'
                                                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                                                    }`}
                                            >
                                                #{tagLabels(tag)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 추천 버튼 */}
                    <div className="text-center mb-8 sticky bottom-4 z-10">
                        <button
                            onClick={() => onSelectTimeSlot(currentTimeSlot)}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-500/30 border-t border-white/20"
                        >
                            <span className="drop-shadow-md">🍽️ {pageInfo.recommend}</span>
                        </button>
                    </div>

                    {/* 통계 및 네비게이션 */}
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pb-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-300 transition-colors bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"
                        >
                            {pageInfo.back}
                        </Link>
                        <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                            <span>{pageInfo.stats}:</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400">{stats.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
