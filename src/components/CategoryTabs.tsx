"use client";

import { categories, CategoryId } from "@/data/tests";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryTabsProps {
    selected: CategoryId;
    onSelect: (id: CategoryId) => void;
}

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
    const { lang } = useLanguage();

    return (
        <nav className="w-full" aria-label="Category Filter">
            <div className="flex flex-wrap gap-2" role="tablist">
                {categories.map((cat) => {
                    const isSelected = selected === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            role="tab"
                            aria-selected={isSelected}
                            aria-controls="test-list"
                            className={`
                                flex items-center gap-1.5 px-4 py-2.5 rounded-full
                                text-sm font-semibold whitespace-nowrap
                                transition-all duration-200
                                ${isSelected
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                                    : "glass dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700"
                                }
                            `}
                        >
                            <span className="text-base">{cat.emoji}</span>
                            <span>{cat.name[lang] || cat.name.en}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

