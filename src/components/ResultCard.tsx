"use client";

import Link from "next/link";
import { PersonalityType, TraitType, traitNames, maxScores } from "@/data/questions";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

interface ResultCardProps {
    type: PersonalityType;
    traitScores: Record<TraitType, number>;
}

export default function ResultCard({ type, traitScores }: ResultCardProps) {
    const { t, lang } = useLanguage();
    const [copied, setCopied] = useState(false);
    const [showBars, setShowBars] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBars(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const displayTraits: TraitType[] = type === "TETO" 
        ? ["drive", "social", "decision"] 
        : ["empathy", "detail", "creativity"];

    const getPercentage = (trait: TraitType): number => {
        const score = traitScores[trait];
        const max = maxScores[trait];
        const percentage = Math.round((score / max) * 100);
        return Math.min(100, Math.max(20, percentage));
    };

    const descriptions = {
        TETO: {
            title: t(uiTexts.tetoTitle),
            badge: "🔥 TETO TYPE",
            subtitle: t(uiTexts.tetoSubtitle),
            emoji: "🔥",
            tags: [t(uiTexts.tagDrive), t(uiTexts.tagLeadership), t(uiTexts.tagHonesty), t(uiTexts.tagPassion)],
            description: t(uiTexts.tetoDesc),
            color: {
                gradient: "from-orange-500 via-red-500 to-pink-500",
                bg: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                accent: "text-red-500 dark:text-red-400",
                ring: "ring-red-200 dark:ring-red-800",
            },
        },
        EGEN: {
            title: t(uiTexts.egenTitle),
            badge: "🔮 EGEN TYPE",
            subtitle: t(uiTexts.egenSubtitle),
            emoji: "🔮",
            tags: [t(uiTexts.tagCare), t(uiTexts.tagDetail), t(uiTexts.tagListening), t(uiTexts.tagEmpathy)],
            description: t(uiTexts.egenDesc),
            color: {
                gradient: "from-purple-500 via-violet-500 to-indigo-500",
                bg: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
                accent: "text-purple-500 dark:text-purple-400",
                ring: "ring-purple-200 dark:ring-purple-800",
            },
        }
    };

    const content = descriptions[type] || descriptions.TETO;

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareData = {
            title: 'TETO vs EGEN Test',
            text: `My type is: ${content.title}`,
            url: url,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto animate-slide-up">
            {/* Result Card */}
            <div className={`glass-strong dark:bg-slate-800/90 rounded-[2.5rem] p-8 relative overflow-hidden mb-6 ${content.color.bg}`}>
                
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-br ${content.color.gradient} opacity-10 blur-3xl`} />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/40 dark:from-white/10 to-transparent" />
                
                <div className="absolute top-4 right-6 text-3xl animate-scale-in" style={{ animationDelay: "0.3s" }}>
                    🎉
                </div>

                <div className="relative mx-auto mb-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    <div className={`
                        w-28 h-28 rounded-full 
                        bg-gradient-to-br ${content.color.gradient} 
                        flex items-center justify-center 
                        shadow-2xl shadow-purple-500/30
                        ring-8 ${content.color.ring} ring-opacity-50
                    `}>
                        <span className="text-6xl">{content.emoji}</span>
                    </div>
                </div>

                <div className="text-center mb-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <span className={`
                        inline-block px-4 py-2 rounded-full 
                        bg-gradient-to-r ${content.color.gradient} 
                        text-white text-sm font-bold tracking-wider
                        shadow-lg
                    `}>
                        {content.badge}
                    </span>
                </div>

                <div className="text-center mb-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white break-keep">
                        {content.title}
                    </h1>
                </div>

                <p 
                    className={`text-center text-lg font-medium ${content.color.accent} mb-6 animate-fade-in`}
                    style={{ animationDelay: "0.55s" }}
                >
                    &quot;{content.subtitle}&quot;
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {content.tags.map((tag, idx) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-300 text-sm font-semibold border border-white/50 dark:border-slate-600 animate-scale-in"
                            style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="space-y-4 mb-8">
                    {displayTraits.map((trait, idx) => {
                        const percentage = getPercentage(trait);
                        return (
                            <div key={trait} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                                        {traitNames[trait][lang] || traitNames[trait]["en"]}
                                    </span>
                                    <span className={`font-bold ${content.color.accent}`}>
                                        {percentage}%
                                    </span>
                                </div>
                                <div className="h-2 bg-white/50 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${content.color.gradient} transition-all duration-1000 ease-out`}
                                        style={{ 
                                            width: showBars ? `${percentage}%` : '0%',
                                            transitionDelay: `${0.9 + idx * 0.1}s`
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div 
                    className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-slate-600 animate-fade-in"
                    style={{ animationDelay: "1s" }}
                >
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm break-keep">
                        {content.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up" style={{ animationDelay: "1.1s" }}>
                <button
                    onClick={handleShare}
                    className={`
                        flex items-center justify-center gap-2 
                        bg-gradient-to-r ${content.color.gradient}
                        text-white py-4 rounded-2xl font-bold 
                        shadow-lg shadow-purple-500/20
                        active:scale-[0.98] transition-transform
                    `}
                >
                    {copied ? t(uiTexts.copied) : t(uiTexts.share)}
                </button>
                <Link href="/">
                    <div className="flex items-center justify-center gap-2 glass dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 py-4 rounded-2xl font-bold h-full active:scale-[0.98] transition-transform">
                        {t(uiTexts.otherTests)}
                    </div>
                </Link>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
                <Link 
                    href="/test" 
                    className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t(uiTexts.retake)}
                </Link>
            </div>
        </div>
    );
}
