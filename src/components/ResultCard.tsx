"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PersonalityType } from "@/data/questions";

interface ResultCardProps {
    type: PersonalityType;
}

const descriptions = {
    TETO: {
        title: "당신은 테토(TETO) 유형!",
        subtitle: "대담하고, 활동적이며, 에너지가 넘쳐요",
        description: "테스토스테론처럼, 당신은 추진력이 강하고 경쟁을 즐깁니다. 사람들 앞에 나서는 것을 두려워하지 않으며, 도전적인 상황에서 오히려 힘을 얻는 타입이네요! 목표를 향해 직진하는 당신의 모습이 멋집니다.",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200"
    },
    EGEN: {
        title: "당신은 에겐(EGEN) 유형!",
        subtitle: "섬세하고, 배려심 깊으며, 디테일에 강해요",
        description: "에스트로겐처럼, 당신은 조화와 감정적인 연결을 중요하게 생각합니다. 주변 사람들의 기분을 잘 살피고, 깊이 있는 대화를 선호하죠. 당신의 섬세함과 따뜻함은 주변 사람들에게 큰 위로가 됩니다.",
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200"
    }
};

export default function ResultCard({ type }: ResultCardProps) {
    const content = descriptions[type] || descriptions.TETO; // Fallback

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-md w-full p-8 rounded-2xl shadow-xl border-2 ${content.bg} ${content.border} text-center`}
        >
            <h1 className={`text-3xl font-bold mb-2 ${content.color}`}>
                {content.title}
            </h1>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">
                {content.subtitle}
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8 break-keep">
                {content.description}
            </p>

            <div className="flex flex-col gap-4">
                <Link
                    href="/test"
                    className={`inline-block w-full py-4 text-white font-bold rounded-xl transition-all shadow-lg hover:opacity-90 ${type === 'TETO' ? 'bg-red-500 shadow-red-200' : 'bg-purple-500 shadow-purple-200'}`}
                >
                    테스트 다시하기
                </Link>
                <Link
                    href="/"
                    className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </motion.div>
    );
}
