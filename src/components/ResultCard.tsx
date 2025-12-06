"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PersonalityType } from "@/data/questions";
import { useState } from "react";

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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
        >
            {/* Result Card */}
            <div className={`glass-strong rounded-[2.5rem] p-8 relative overflow-hidden mb-6 ${content.color.bg}`}>
                
                {/* Background Decorations */}
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-br ${content.color.gradient} opacity-10 blur-3xl`} />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
                
                {/* Confetti Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-4 right-6 text-3xl"
                >
                    🎉
                </motion.div>

                {/* Main Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative mx-auto mb-6"
                >
                    <div className={`
                        w-28 h-28 rounded-full 
                        bg-gradient-to-br ${content.color.gradient} 
                        flex items-center justify-center 
                        shadow-2xl shadow-purple-500/30
                        ring-8 ${content.color.ring} ring-opacity-50
                    `}>
                        <span className="text-6xl">{content.emoji}</span>
                    </div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-4"
                >
                    <span className={`
                        inline-block px-4 py-2 rounded-full 
                        bg-gradient-to-r ${content.color.gradient} 
                        text-white text-sm font-bold tracking-wider
                        shadow-lg
                    `}>
                        {content.badge}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-2"
                >
                    <h1 className="text-3xl font-black text-slate-800 break-keep">
                        {content.title}
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className={`text-center text-lg font-medium ${content.color.accent} mb-6`}
                >
                    "{content.subtitle}"
                </motion.p>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {content.tags.map((tag, idx) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + idx * 0.05 }}
                            className="px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 text-sm font-semibold border border-white/50"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Trait Bars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4 mb-8"
                >
                    {content.traits.map((trait, idx) => (
                        <div key={trait.label} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-600">{trait.label}</span>
                                <span className={`font-bold ${content.color.accent}`}>{trait.value}%</span>
                            </div>
                            <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trait.value}%` }}
                                    transition={{ delay: 0.9 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                                    className={`h-full rounded-full bg-gradient-to-r ${content.color.gradient}`}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50"
                >
                    <p className="text-slate-600 leading-relaxed text-sm break-keep">
                        {content.description}
                    </p>
                </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-2 gap-3 mb-6"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className={`
                        flex items-center justify-center gap-2 
                        bg-gradient-to-r ${content.color.gradient}
                        text-white py-4 rounded-2xl font-bold 
                        shadow-lg shadow-purple-500/20
                    `}
                >
                    {copied ? "✅ 복사완료!" : "🔗 공유하기"}
                </motion.button>
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 glass text-slate-700 py-4 rounded-2xl font-bold h-full"
                    >
                        🏠 다른 테스트
                    </motion.div>
                </Link>
            </motion.div>

            {/* Retry Link */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center"
            >
                <Link 
                    href="/test" 
                    className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-purple-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    다시 테스트하기
                </Link>
            </motion.div>
        </motion.div>
    );
}
