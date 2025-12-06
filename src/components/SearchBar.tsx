"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="w-full max-w-xl mx-auto mb-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="테스트 검색하기..."
                className={clsx(
                    "block w-full pl-11 pr-4 py-3 border-none rounded-2xl",
                    "bg-white shadow-sm text-slate-900 placeholder-slate-400",
                    "focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200"
                )}
            />
        </div>
    );
}
