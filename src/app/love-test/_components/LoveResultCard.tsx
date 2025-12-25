"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LoveResult, loveResults, defaultResult } from "@/data/love-test";
import { motion } from "framer-motion";

interface LoveResultCardProps {
    type: string;
}

export default function LoveResultCard({ type }: LoveResultCardProps) {
    const { t, lang } = useLanguage();
    const result = loveResults.find(r => r.id === type) || defaultResult;

    const info = {
        ko: {
            match: "찰떡궁합 MBTI",
            share: "나의 연애 유형 공유하기",
            again: "다시 테스트하기",
        },
        en: {
            match: "Perfect Match MBTI",
            share: "Share my love type",
            again: "Test again",
        },
        zh: {
            match: "绝配 MBTI",
            share: "分享我的恋爱类型",
            again: "重新测试",
        },
        ja: {
            match: "相性抜群 MBTI",
            share: "自分の恋愛タイプを共有する",
            again: "もう一度テストする",
        }
    };

    const strings = info[lang] || info.en;

    return (
        <div
            id="capture-area"
            className="w-full max-w-[400px] aspect-[9/16] relative overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col p-8 text-white"
            style={{
                background: `linear-gradient(135deg, ${result.color} 0%, ${result.color}dd 100%)`
            }}
        >
            {/* 워터마크 */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest">
                ✨ check-me.today
            </div>

            {/* 메인 이모지 */}
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 pb-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-8xl mb-6 drop-shadow-lg"
                >
                    {result.emoji}
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-white/80 text-lg font-bold mb-1">
                        {lang === 'ko' ? '나의 연애 유형은' : 'My Love Type is'}
                    </h3>
                    <h1 className="text-4xl font-black mb-6 drop-shadow-md break-keep">
                        {result.title[lang] || result.title.en}
                    </h1>
                </motion.div>

                {/* 설명 카드 */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-sm leading-relaxed text-white/95 break-keep"
                >
                    {result.description[lang] || result.description.en}
                </motion.div>

                {/* 찰떡궁합 (있을 경우) */}
                {result.mbtiMatch && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold"
                    >
                        {strings.match}: <span className="text-white underline">{result.mbtiMatch}</span>
                    </motion.div>
                )}
            </div>

            {/* 하단 장식 */}
            <div className="text-center text-[10px] text-white/40 pb-2">
                © 2025 Check Me Today. All rights reserved.
            </div>
        </div>
    );
}
