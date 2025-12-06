"use client";

import { useState } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages: { code: Language; label: string; flag: string }[] = [
    { code: "ko", label: "한국어", flag: "🇰🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export default function LanguageSelector() {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(l => l.code === lang) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/80 transition-colors text-sm font-medium"
            >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="hidden sm:inline text-slate-600">{currentLang.label}</span>
                <svg 
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)} 
                    />
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden shadow-lg z-20 animate-scale-in min-w-[140px]">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => {
                                    setLang(language.code);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium
                                    transition-colors hover:bg-purple-50
                                    ${lang === language.code ? "bg-purple-100 text-purple-700" : "text-slate-600"}
                                `}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <span>{language.label}</span>
                                {lang === language.code && (
                                    <svg className="w-4 h-4 ml-auto text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

