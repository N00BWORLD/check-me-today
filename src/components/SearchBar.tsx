"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const { lang } = useLanguage();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const placeholder = lang === 'ko' ? '테스트 검색...' 
        : lang === 'zh' ? '搜索测试...' 
        : lang === 'ja' ? 'テストを検索...' 
        : 'Search tests...';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <div className="w-full mb-4 relative z-10">
            <div 
                className={`
                    relative flex items-center
                    glass dark:bg-slate-800/60 rounded-xl
                    transition-all duration-200
                    ${isFocused 
                        ? "ring-2 ring-purple-400/50 shadow-lg" 
                        : ""
                    }
                `}
            >
                {/* Search Icon */}
                <div className="absolute left-3 flex items-center pointer-events-none">
                    <svg
                        className={`h-4 w-4 transition-colors ${isFocused ? "text-purple-500" : "text-slate-400"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="
                        block w-full 
                        pl-9 pr-9 py-3
                        bg-transparent
                        border-none rounded-xl
                        text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
                        font-medium
                        focus:outline-none
                    "
                />

                {/* Clear Button */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 w-5 h-5 flex items-center justify-center bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full transition-colors"
                    >
                        <svg className="w-2.5 h-2.5 text-slate-500 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
