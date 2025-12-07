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
                glass opacity-60 cursor-not-allowed
            `}>
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-16 h-16 rounded-2xl 
                        bg-slate-100 dark:bg-slate-800
                        flex items-center justify-center
                        grayscale opacity-50
                    `}>
                        <span className="text-3xl filter grayscale">{emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500">
                                {title}
                            </h3>
                            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
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
                glass transition-all duration-300
                hover:glass-strong
                hover:scale-[1.02] hover:-translate-y-1
                active:scale-[0.98]
            `}>
                {/* Background Gradient Hint */}
                <div className={`
                    absolute inset-0 bg-gradient-to-br ${bgGradient}
                    opacity-10 group-hover:opacity-25 transition-opacity duration-300
                `} />

                <div className="relative z-10 flex items-center gap-4">
                    {/* Icon */}
                    <div className={`
                        w-16 h-16 rounded-2xl 
                        bg-gradient-to-br ${gradient}
                        flex items-center justify-center
                        shadow-lg shadow-black/5
                        group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
                    `}>
                        <span className="text-3xl">{emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                            {description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
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
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `} />
            </div>
        </Link>
    );
}

