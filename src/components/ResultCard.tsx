"use client";

import Link from "next/link";
import { PersonalityType } from "@/data/questions";
import { useState, useEffect } from "react";

interface ResultCardProps {
    type: PersonalityType;
}

const descriptions = {
    TETO: {
        title: "강렬한 리더, 테토",
        badge: "🔥 TETO TYPE",
        subtitle: "도전을 즐기는 행동파",
        emoji: "🔥",
        tags: ["#추진력", "#리더십", "#솔직함", "#열정"],
        description: "당신은 목표가 생기면 뒤돌아보지 않고 달리는 경주마입니다. 복잡하게 고민하기보다는 행동으로 증명하는 것을 선호하죠. 주변 사람들은 당신의 시원시원한 결단력에 매료됩니다.",
        traits: [
            { label: "추진력", value: 95 },
            { label: "사교성", value: 88 },
            { label: "결단력", value: 92 },
        ],
        color: {
            gradient: "from-orange-500 via-red-500 to-pink-500",
            bg: "bg-gradient-to-br from-orange-50 to-red-50",
            accent: "text-red-500",
            ring: "ring-red-200",
        },
    },
    EGEN: {
        title: "섬세한 감성, 에겐",
        badge: "🔮 EGEN TYPE",
        subtitle: "마음을 읽는 공감러",
        emoji: "🔮",
        tags: ["#배려", "#디테일", "#경청", "#공감"],
        description: "당신은 타인의 감정을 기가 막히게 캐치하는 능력이 있습니다. 거친 세상 속에서도 부드러움을 잃지 않으며, 소수의 사람들과 깊은 관계를 맺는 것을 소중히 여깁니다.",
        traits: [
            { label: "공감력", value: 96 },
            { label: "섬세함", value: 90 },
            { label: "창의성", value: 85 },
        ],
        color: {
            gradient: "from-purple-500 via-violet-500 to-indigo-500",
            bg: "bg-gradient-to-br from-purple-50 to-violet-50",
            accent: "text-purple-500",
            ring: "ring-purple-200",
        },
    }
};

export default function ResultCard({ type }: ResultCardProps) {
    const content = descriptions[type] || descriptions.TETO;
    const [copied, setCopied] = useState(false);
    const [showBars, setShowBars] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBars(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareData = {
            title: '테토 vs 에겐 테스트',
            text: `나의 유형은: ${content.title}`,
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
            <div className={`glass-strong rounded-[2.5rem] p-8 relative overflow-hidden mb-6 ${content.color.bg}`}>
                
                {/* Background Decorations */}
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-br ${content.color.gradient} opacity-10 blur-3xl`} />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
                
                {/* Confetti Animation */}
                <div className="absolute top-4 right-6 text-3xl animate-scale-in" style={{ animationDelay: "0.3s" }}>
                    🎉
                </div>

                {/* Main Icon */}
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

                {/* Badge */}
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

                {/* Title */}
                <div className="text-center mb-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <h1 className="text-3xl font-black text-slate-800 break-keep">
                        {content.title}
                    </h1>
                </div>

                {/* Subtitle */}
                <p 
                    className={`text-center text-lg font-medium ${content.color.accent} mb-6 animate-fade-in`}
                    style={{ animationDelay: "0.55s" }}
                >
                    &quot;{content.subtitle}&quot;
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {content.tags.map((tag, idx) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 text-sm font-semibold border border-white/50 animate-scale-in"
                            style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Trait Bars */}
                <div className="space-y-4 mb-8">
                    {content.traits.map((trait, idx) => (
                        <div key={trait.label} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-600">{trait.label}</span>
                                <span className={`font-bold ${content.color.accent}`}>{trait.value}%</span>
                            </div>
                            <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${content.color.gradient} transition-all duration-1000 ease-out`}
                                    style={{ 
                                        width: showBars ? `${trait.value}%` : '0%',
                                        transitionDelay: `${0.9 + idx * 0.1}s`
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div 
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 animate-fade-in"
                    style={{ animationDelay: "1s" }}
                >
                    <p className="text-slate-600 leading-relaxed text-sm break-keep">
                        {content.description}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
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
                    {copied ? "✅ 복사완료!" : "🔗 공유하기"}
                </button>
                <Link href="/">
                    <div className="flex items-center justify-center gap-2 glass text-slate-700 py-4 rounded-2xl font-bold h-full active:scale-[0.98] transition-transform">
                        🏠 다른 테스트
                    </div>
                </Link>
            </div>

            {/* Retry Link */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
                <Link 
                    href="/test" 
                    className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-purple-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    다시 테스트하기
                </Link>
            </div>
        </div>
    );
}
