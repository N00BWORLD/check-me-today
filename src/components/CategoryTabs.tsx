"use client";

import Link from "next/link";
import { categories, CategoryId, getCategoryPath, hasCategoryLanding } from "@/data/tests";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryTabsProps {
    selected: CategoryId;
    onSelect: (id: CategoryId) => void;
}

// 홈 카테고리 탭
// - 랜딩 페이지(/category/[id])가 있는 카테고리는 실제 <a href> 링크로 렌더링해 크롤러가 따라갈 수 있게 한다
// - 사용자가 클릭하면 페이지 이동 대신 홈 안에서 필터만 적용한다 (기존 동작 유지)
// - "전체"와 테스트가 없는 카테고리는 링크 대상이 없으므로 버튼으로 둔다
export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
    const { lang } = useLanguage();

    return (
        <nav className="w-full" aria-label="Category Filter">
            <div className="flex flex-wrap gap-2" role="tablist">
                {categories.map((cat) => {
                    const isSelected = selected === cat.id;
                    const className = `
                        flex items-center gap-1.5 px-4 py-2.5 rounded-full
                        text-sm font-semibold whitespace-nowrap
                        transition-all duration-200
                        ${isSelected
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                            : "glass dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700"
                        }
                    `;
                    const content = (
                        <>
                            <span className="text-base">{cat.emoji}</span>
                            <span>{cat.name[lang] || cat.name.en}</span>
                        </>
                    );

                    if (hasCategoryLanding(cat.id)) {
                        return (
                            <Link
                                key={cat.id}
                                href={getCategoryPath(cat.id)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelect(cat.id);
                                }}
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls="test-list"
                                className={className}
                            >
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            role="tab"
                            aria-selected={isSelected}
                            aria-controls="test-list"
                            className={className}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
