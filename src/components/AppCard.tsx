"use client";

import Link from "next/link";
import { useLanguage, uiTexts } from "@/context/LanguageContext";

interface AppCardProps {
    title: string;
    description: string;
    emoji: string;
    gradient: string;
    bgGradient: string;
    href: string;
    isComingSoon?: boolean;
}

export default function AppCard({ 
    title, 
    description, 
    emoji, 
    gradient, 
    bgGradient, 
    href, 
    isComingSoon = false 
}: AppCardProps) {
    const { t } = useLanguage();

    if (isComingSoon) {
        return (
            <div className={`
                relative overflow-hidden rounded-3xl p-6
                glass dark:bg-slate-800/60
                border border-white/50 dark:border-slate-700
                opacity-60
            `}>
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-16 h-16 rounded-2xl 
                        bg-gradient-to-br ${bgGradient}
                        flex items-center justify-center
                        grayscale
                    `}>
                        <span className="text-3xl filter grayscale">{emoji}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400">
                                {title}
                            </h3>
                            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t(uiTexts.comingSoon)}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 dark:text-slate-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link href={href} className="block group">
            <div className={`
                relative overflow-hidden rounded-3xl p-6
                bg-gradient-to-br ${bgGradient}
                border border-white/50 dark:border-slate-700
                shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50
                transition-all duration-300
                hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10
                hover:scale-[1.02] hover:-translate-y-1
                active:scale-[0.98]
            `}>
                {/* Glow Effect */}
                <div className={`
                    absolute -top-20 -right-20 w-40 h-40 
                    bg-gradient-to-br ${gradient} 
                    opacity-20 blur-3xl
                    group-hover:opacity-40 transition-opacity
                `} />

                <div className="relative flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-16 h-16 rounded-2xl 
                        bg-gradient-to-br ${gradient}
                        flex items-center justify-center
                        shadow-lg
                        group-hover:scale-110 transition-transform duration-300
                    `}>
                        <span className="text-3xl">{emoji}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-purple-500 dark:group-hover:bg-purple-600 transition-colors">
                        <svg 
                            className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Bottom Decoration */}
                <div className={`
                    absolute bottom-0 left-0 right-0 h-1
                    bg-gradient-to-r ${gradient}
                    opacity-0 group-hover:opacity-100 transition-opacity
                `} />
            </div>
        </Link>
    );
}

