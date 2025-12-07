"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import AdUnit from "@/components/AdUnit";
import { useLanguage } from "@/context/LanguageContext";

function AnalyzingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { lang } = useLanguage();
    const [progress, setProgress] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(0);

    // 분석 메시지 (다국어)
    const messages = {
        ko: [
            "답변을 분석하고 있어요...",
            "에너지 밸런스를 측정 중...",
            "당신의 내면을 탐색 중...",
            "결과를 준비하고 있어요...",
            "거의 다 됐어요! ⚖️"
        ],
        en: [
            "Analyzing your answers...",
            "Measuring energy balance...",
            "Exploring your inner self...",
            "Preparing your results...",
            "Almost done! ⚖️"
        ],
        zh: [
            "正在分析你的答案...",
            "正在测量能量平衡...",
            "正在探索你的内在...",
            "正在准备你的结果...",
            "马上就好！⚖️"
        ],
        ja: [
            "回答を分析中...",
            "エネルギーバランスを測定中...",
            "あなたの内面を探索中...",
            "結果を準備中...",
            "もうすぐ完了！⚖️"
        ]
    };

    const currentMessages = messages[lang] || messages.en;

    useEffect(() => {
        // 프로그레스 애니메이션 (5초)
        const duration = 5000;
        const interval = 50;
        const increment = 100 / (duration / interval);
        
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + increment;
            });
        }, interval);

        // 메시지 변경 (1초마다)
        const messageTimer = setInterval(() => {
            setCurrentMessage(prev => {
                if (prev >= currentMessages.length - 1) {
                    clearInterval(messageTimer);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);

        // 5초 후 결과 페이지로 이동
        const redirectTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            router.push(`/result?${params.toString()}`);
        }, 5000);

        return () => {
            clearInterval(progressTimer);
            clearInterval(messageTimer);
            clearTimeout(redirectTimer);
        };
    }, [searchParams, router, currentMessages.length]);

    const type = searchParams.get("type") || "SOLAR";
    const isSolar = type === "SOLAR";
    const emoji = "⚖️";
    const primaryEmoji = isSolar ? "☀️" : "🌙";
    const gradient = isSolar 
        ? "from-amber-500 via-orange-500 to-red-500" 
        : "from-indigo-500 via-purple-500 to-violet-500";
    const shadowColor = isSolar ? "shadow-orange-500/30" : "shadow-indigo-500/30";

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto text-center">
                {/* 로딩 애니메이션 */}
                <div className="relative mb-8">
                    {/* 배경 원 */}
                    <div className={`
                        w-32 h-32 mx-auto rounded-full 
                        bg-gradient-to-br ${gradient}
                        flex items-center justify-center
                        animate-pulse shadow-2xl ${shadowColor}
                        relative overflow-hidden
                    `}>
                        <span className="text-6xl animate-bounce">{emoji}</span>
                        {/* 태양/달 장식 */}
                        <div className="absolute -left-2 top-2 text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>
                            ☀️
                        </div>
                        <div className="absolute -right-2 bottom-2 text-2xl animate-pulse" style={{ animationDelay: "0.8s" }}>
                            🌙
                        </div>
                    </div>
                    
                    {/* 회전하는 링 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`
                            w-40 h-40 rounded-full border-4 border-transparent
                            ${isSolar ? "border-t-amber-500 border-r-orange-500" : "border-t-indigo-500 border-r-purple-500"}
                            animate-spin
                        `} style={{ animationDuration: "1.5s" }} />
                    </div>
                </div>

                {/* 메시지 */}
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 min-h-[28px] transition-all duration-300">
                    {currentMessages[currentMessage]}
                </h2>

                {/* 프로그레스 바 */}
                <div className="w-full max-w-xs mx-auto mb-8">
                    <div className="h-3 bg-white/30 dark:bg-slate-700 rounded-full overflow-hidden backdrop-blur-sm flex">
                        <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-100"
                            style={{ width: `${progress / 2}%` }}
                        />
                        <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100"
                            style={{ width: `${progress / 2}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-slate-400 dark:text-slate-500">
                        <span>☀️ Solar</span>
                        <span className="font-bold">{Math.round(progress)}%</span>
                        <span>Lunar 🌙</span>
                    </div>
                </div>

                {/* 광고 영역 */}
                <div className="mb-6">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                        {lang === 'ko' ? '잠시만 기다려 주세요' : 
                         lang === 'zh' ? '请稍等' : 
                         lang === 'ja' ? 'しばらくお待ちください' : 
                         'Please wait a moment'}
                    </p>
                    <AdUnit />
                </div>

                {/* 스킵 버튼 (선택적) */}
                {progress >= 80 && (
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            router.push(`/result?${params.toString()}`);
                        }}
                        className={`text-sm text-slate-400 dark:text-slate-500 hover:${isSolar ? 'text-amber-500' : 'text-indigo-500'} dark:hover:${isSolar ? 'text-amber-400' : 'text-indigo-400'} transition-colors animate-fade-in`}
                    >
                        {lang === 'ko' ? '결과 보기 →' : 
                         lang === 'zh' ? '查看结果 →' : 
                         lang === 'ja' ? '結果を見る →' : 
                         'View results →'}
                    </button>
                )}
            </div>
        </main>
    );
}

function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-indigo-500 animate-pulse flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
            </div>
        </div>
    );
}

export default function AnalyzingPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <AnalyzingContent />
        </Suspense>
    );
}
