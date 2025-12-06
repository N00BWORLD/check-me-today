"use client";

import { useState } from "react";
import { useLanguage, uiTexts } from "@/context/LanguageContext";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const { t } = useLanguage();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

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
        <div className="w-full max-w-xl mx-auto mb-6 relative">
            <div 
                className={`
                    relative flex items-center
                    glass rounded-2xl
                    transition-all duration-300
                    ${isFocused 
                        ? "ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/10" 
                        : "hover:shadow-md"
                    }
                `}
            >
                {/* Search Icon */}
                <div className="absolute left-4 flex items-center pointer-events-none">
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${isFocused ? "text-purple-500" : "text-slate-400"}`}
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
                    placeholder={t(uiTexts.searchPlaceholder)}
                    className="
                        block w-full 
                        pl-12 pr-12 py-4 
                        bg-transparent
                        border-none rounded-2xl
                        text-slate-800 placeholder-slate-400
                        font-medium
                        focus:outline-none
                    "
                />

                {/* Clear Button */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 w-6 h-6 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full transition-colors animate-scale-in"
                    >
                        <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
