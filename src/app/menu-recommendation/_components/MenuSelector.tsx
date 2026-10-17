"use client";

// 메뉴 추천 1단계: 종류(카테고리) 선택 화면
// - 언어(문화권)별 메뉴 풀의 카테고리를 카드로 보여주고, "아무거나"는 전체에서 뽑는다
// - 카드 하나를 누르면 바로 룰렛으로 넘어간다
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
    getMenuPool,
    getMenuItems,
    getCurrentMealTime,
    mealTimeLabels,
    menuText,
    RANDOM_CATEGORY_ID,
    type MenuLang,
} from "@/data/menu-recommendation";

interface MenuSelectorProps {
    onSelectCategory: (categoryId: string) => void;
    stats: number;
}

export default function MenuSelector({ onSelectCategory, stats }: MenuSelectorProps) {
    const { lang } = useLanguage();
    const pool = getMenuPool(lang);
    const mealTime = getCurrentMealTime();
    const timeLabel = mealTimeLabels[mealTime][lang as MenuLang] ?? mealTimeLabels[mealTime].en;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-24">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* 헤더 */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4 animate-bounce">🍽️</div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                            {menuText("title", lang)}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 font-medium break-keep">
                            {menuText("pickCategory", lang, { time: timeLabel })}
                        </p>
                    </div>

                    {/* 아무거나 */}
                    <button
                        onClick={() => onSelectCategory(RANDOM_CATEGORY_ID)}
                        className="w-full mb-4 py-5 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-3xl font-black text-xl transition-all transform hover:scale-[1.02] active:scale-[0.97] shadow-xl shadow-orange-500/30 flex items-center justify-between"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-3xl">🎲</span>
                            <span className="text-left">
                                <span className="block">{menuText("random", lang)}</span>
                                <span className="block text-xs font-medium opacity-90">{menuText("randomDesc", lang)}</span>
                            </span>
                        </span>
                        <span className="text-sm font-semibold opacity-90 whitespace-nowrap">
                            {menuText("menuCount", lang, { n: pool.items.length })}
                        </span>
                    </button>

                    {/* 카테고리 그리드 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="list">
                        {pool.categories.map((cat) => {
                            const count = getMenuItems(pool, cat.id).length;
                            return (
                                <button
                                    key={cat.id}
                                    role="listitem"
                                    onClick={() => onSelectCategory(cat.id)}
                                    className="group glass dark:bg-slate-800/70 rounded-2xl p-4 text-left hover:bg-white/90 dark:hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] transition-all"
                                >
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</div>
                                    <div className="font-bold text-slate-800 dark:text-white break-keep">{cat.label}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 break-keep">{cat.description}</div>
                                    <div className="text-[11px] font-semibold text-orange-500 dark:text-orange-400 mt-2">
                                        {menuText("menuCount", lang, { n: count })}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* 통계·홈 */}
                    <div className="flex flex-col items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-10">
                        <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-5 py-2 rounded-full shadow-sm backdrop-blur-sm">
                            <span>{menuText("stats", lang)}:</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400">{stats.toLocaleString()}</span>
                        </div>
                        <Link href="/" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline decoration-slate-300 underline-offset-4">
                            ← {menuText("back", lang)}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
