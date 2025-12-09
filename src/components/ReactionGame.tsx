"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type GameState = "idle" | "waiting" | "ready" | "early" | "result";

export default function ReactionGame() {
    const { lang } = useLanguage();
    const [state, setState] = useState<GameState>("idle");
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [history, setHistory] = useState<number[]>([]);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const texts = {
        idle: {
            title: { ko: "반응속도 테스트 ⚡", en: "Reaction Time Test ⚡", zh: "反应速度测试 ⚡", ja: "反応速度テスト ⚡" },
            desc: {
                ko: "화면이 초록색으로 바뀌면 클릭하세요!",
                en: "Click when the screen turns green!",
                zh: "屏幕变绿时点击！",
                ja: "画面が緑色になったらクリック！"
            },
            cta: { ko: "화면을 클릭해서 시작", en: "Click to Start", zh: "点击开始", ja: "クリックして開始" }
        },
        waiting: {
            title: { ko: "기다리세요...", en: "Wait for Green...", zh: "等待变绿...", ja: "緑になるまで待って..." },
            desc: { ko: "아직 아닙니다", en: "Not yet", zh: "还不是时候", ja: "まだです" }
        },
        ready: {
            title: { ko: "클릭!!!!", en: "CLICK!!!!", zh: "点击!!!!", ja: "クリック!!!!" },
            desc: { ko: "지금입니다!", en: "NOW!", zh: "现在!", ja: "今だ!" }
        },
        early: {
            title: { ko: "너무 빨라요!", en: "Too Soon!", zh: "太快了!", ja: "早すぎます!" },
            desc: { ko: "초록색이 된 후에 클릭해야 합니다.", en: "Wait for the green color.", zh: "请等待绿色出现。", ja: "緑色になってからクリックしてください。" },
            cta: { ko: "다시 시도하려면 클릭", en: "Click to Try Again", zh: "点击重试", ja: "クリックして再試行" }
        },
        result: {
            title: { ko: "결과: ", en: "Result: ", zh: "结果: ", ja: "結果: " },
            avg: { ko: "평균: ", en: "Avg: ", zh: "平均: ", ja: "平均: " },
            cta: { ko: "테스트 계속하기", en: "Keep Going", zh: "继续测试", ja: "続ける" }
        }
    };

    const t = (key: keyof typeof texts) => texts[key];

    const startGame = () => {
        setState("waiting");
        const randomTime = Math.floor(Math.random() * 3000) + 2000; // 2~5 seconds

        timeoutRef.current = setTimeout(() => {
            setState("ready");
            setStartTime(Date.now());
        }, randomTime);
    };

    const handleClick = () => {
        if (state === "idle" || state === "result" || state === "early") {
            startGame();
        } else if (state === "waiting") {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setState("early");
        } else if (state === "ready") {
            const now = Date.now();
            setEndTime(now);
            setState("result");
            setHistory([...history, now - startTime]);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const getAvg = () => {
        if (history.length === 0) return 0;
        return Math.floor(history.reduce((a, b) => a + b, 0) / history.length);
    };

    // Dynamic Styles
    let bgClass = "bg-slate-100 dark:bg-slate-800";
    if (state === "waiting") bgClass = "bg-red-500";
    if (state === "ready") bgClass = "bg-green-500";
    if (state === "early") bgClass = "bg-slate-200 dark:bg-slate-700";

    return (
        <div
            className={`w-full aspect-square max-w-lg mx-auto rounded-3xl shadow-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none p-6 text-center touch-none ${bgClass}`}
            onPointerDown={handleClick}
        >
            {state === "idle" && (
                <>
                    <div className="text-6xl mb-4">⚡</div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{texts.idle.title[lang] || texts.idle.title.en}</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-8">{texts.idle.desc[lang] || texts.idle.desc.en}</p>
                    <div className="animate-pulse font-bold text-amber-500">{texts.idle.cta[lang] || texts.idle.cta.en}</div>
                </>
            )}

            {state === "waiting" && (
                <>
                    <div className="text-6xl mb-4 text-white">✋</div>
                    <h2 className="text-4xl font-black text-white mb-2">{texts.waiting.title[lang] || texts.waiting.title.en}</h2>
                    <p className="text-white/80">{texts.waiting.desc[lang] || texts.waiting.desc.en}</p>
                </>
            )}

            {state === "ready" && (
                <>
                    <div className="text-8xl mb-4 text-white">👇</div>
                    <h2 className="text-5xl font-black text-white">{texts.ready.title[lang] || texts.ready.title.en}</h2>
                    <p className="text-white/90 text-2xl mt-4 font-bold">{texts.ready.desc[lang] || texts.ready.desc.en}</p>
                </>
            )}

            {state === "early" && (
                <>
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{texts.early.title[lang] || texts.early.title.en}</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-8">{texts.early.desc[lang] || texts.early.desc.en}</p>
                    <div className="font-bold text-amber-500">{texts.early.cta[lang] || texts.early.cta.en}</div>
                </>
            )}

            {state === "result" && (
                <>
                    <div className="text-6xl mb-2">⏱️</div>
                    <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-1">
                        {endTime - startTime}ms
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                        {texts.result.title[lang] || texts.result.title.en}
                    </p>

                    {history.length > 0 && (
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 mb-8">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {texts.result.avg[lang] || texts.result.avg.en}
                                <span className="text-xl font-bold text-slate-800 dark:text-white ml-1">{getAvg()}ms</span>
                            </p>
                        </div>
                    )}

                    <div className="font-bold text-amber-500 animate-bounce">{texts.result.cta[lang] || texts.result.cta.en}</div>
                    <p className="text-xs text-slate-400 mt-4 opacity-60">Click to keep playing</p>
                </>
            )}
        </div>
    );
}
