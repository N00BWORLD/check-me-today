"use client";

import { useState } from "react";
import VisualNovel, { VNScenario } from "@/components/VisualNovel";

interface Props {
    scenario: VNScenario;
}

export default function VisualNovelContainer({ scenario }: Props) {
    const [ending, setEnding] = useState<string | null>(null);

    const handleComplete = (score: number) => {
        let endingType = "BAD_ENDING";
        if (score >= 80) endingType = "HAPPY_ENDING";
        else if (score >= 40) endingType = "NORMAL_ENDING";
        setEnding(endingType);
    };

    if (ending) {
        const isHappy = ending === "HAPPY_ENDING";
        const isNormal = ending === "NORMAL_ENDING";

        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white relative overflow-hidden rounded-xl">
                {/* Background effects */}
                <div
                    className={`absolute inset-0 opacity-30 ${isHappy ? "bg-pink-900" : isNormal ? "bg-blue-900" : "bg-red-900"
                        }`}
                ></div>

                <div className="z-10 text-center max-w-lg">
                    <h1 className="text-4xl font-bold mb-8 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        {isHappy ? "Happy Ending" : isNormal ? "Normal Ending" : "Bad Ending"}
                    </h1>

                    <div className="glass p-8 rounded-3xl bg-white/10 backdrop-blur-md mb-8 border border-white/20">
                        <p className="text-xl leading-relaxed mb-6 italic font-serif">
                            {isHappy && `"그 말... 기다렸어. 안 갈래, 네 곁에 있을래."`}
                            {isNormal && `"고마웠어. 짧은 시간이었지만 즐거웠어."`}
                            {!isHappy && !isNormal && `"역시... 인간은 믿을 게 못 돼. 넌 너무 많은 걸 알았어."`}
                        </p>
                        <p className="text-slate-300 text-sm">
                            {isHappy
                                ? "세라는 당신의 품에 안겼습니다."
                                : isNormal
                                    ? "세라는 빛과 함께 사라졌습니다."
                                    : "당신의 기억이 희미해집니다..."}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition shadow-lg"
                        >
                            Replay
                        </button>
                        <a
                            href="/"
                            className="px-8 py-3 border border-white/30 bg-white/5 rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm"
                        >
                            Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <VisualNovel
            scenario={scenario}
            onComplete={handleComplete}
            onExit={() => (window.location.href = "/")}
        />
    );
}
