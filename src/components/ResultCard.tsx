"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PersonalityType } from "@/data/questions";
import { useState } from "react";

interface ResultCardProps {
    type: PersonalityType;
}

const descriptions = {
    TETO: {
        title: "강렬한 리더, 테토",
        badge: "TETO TYPE",
        subtitle: "도전을 즐기는 행동파",
        tags: ["#추진력", "#리더십", "#솔직함"],
        description: "당신은 목표가 생기면 뒤돌아보지 않고 달리는 경주마입니다. 복잡하게 고민하기보다는 행동으로 증명하는 것을 선호하죠. 주변 사람들은 당신의 시원시원한 결단력에 매료됩니다.",
        color: "from-red-500 to-orange-500",
        bg: "bg-red-50",
        icon: "🔥"
    },
    EGEN: {
        title: "섬세한 감성, 에겐",
        badge: "EGEN TYPE",
        subtitle: "마음을 읽는 공감러",
        tags: ["#배려", "#디테일", "#경청"],
        description: "당신은 타인의 감정을 기가 막히게 캐치하는 능력이 있습니다. 거친 세상 속에서도 부드러움을 잃지 않으며, 소수의 사람들과 깊은 관계를 맺는 것을 소중히 여깁니다.",
        color: "from-purple-500 to-pink-500",
        bg: "bg-purple-50",
        icon: "🔮"
    }
};

export default function ResultCard({ type }: ResultCardProps) {
    const content = descriptions[type] || descriptions.TETO;
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: '테토 vs 에겐 테스트',
                text: `나의 유형은: ${content.title}`,
                url: url,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            {/* Certificate Card */}
            <div className="bg-white rounded-[2rem] shadow-2xl p-8 relative overflow-hidden mb-6 text-center border-4 border-white">
                {/* Background Decorative Blob */}
                <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br ${content.color} opacity-10 rounded-b-[50%] scale-150 -translate-y-12`} />

                {/* Header Icon */}
                <div className={`relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${content.color} flex items-center justify-center text-5xl shadow-lg mb-6 shadow-indigo-500/20 ring-4 ring-white`}>
                    {content.icon}
                </div>

                {/* Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest text-white bg-gradient-to-r ${content.color} mb-4`}>
                    {content.badge}
                </span>

                {/* Titles */}
                <h1 className="text-3xl font-black text-slate-800 mb-2 word-keep">
                    {content.title}
                </h1>
                <p className="text-slate-500 font-medium text-lg mb-6">
                    "{content.subtitle}"
                </p>

                {/* Tags */}
                <div className="flex justify-center gap-2 mb-8">
                    {content.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 rounded-lg text-slate-600 text-sm font-semibold">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-2 text-left">
                    <p className="text-slate-600 leading-relaxed text-sm break-keep">
                        {content.description}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-transform"
                >
                    {copied ? "복사완료! ✅" : "공유하기 🔗"}
                </button>
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 py-4 rounded-xl font-bold shadow-sm active:scale-95 transition-transform"
                >
                    다른 테스트 🏠
                </Link>
            </div>

            <div className="text-center">
                <Link href="/test" className="text-slate-400 text-sm underline underline-offset-4">
                    다시 하기
                </Link>
            </div>

        </motion.div>
    );
}
