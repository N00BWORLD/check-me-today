"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIncrementPlay } from "@/hooks/useTestStats";

// ===== N초 맞추기 (인형뽑기 10초 챌린지) =====
// 0.00부터 올라가는 타이머를 목표 시간(기본 10.00초)에 정확히 멈추는 게임.
// 모드: 시간 보고 하기 / 시간 가리고 하기. 목표 시간은 프리셋 또는 직접 입력.

type Phase = "idle" | "running" | "result";
type Mode = "visible" | "hidden";

const PRESETS = [3, 5, 10, 15, 20];
const MIN_TARGET = 1;
const MAX_TARGET = 60;
const AUTO_STOP_MARGIN = 10; // 목표 + 10초가 지나면 자동 종료
const STORAGE_KEY = "ten-seconds-best"; // 모드/목표별 최고 기록

interface Attempt {
    stopped: number; // 멈춘 시간(초)
    diff: number;    // 목표와의 차이(초, 부호 포함)
}

const texts = {
    mode: { ko: "모드", en: "Mode", zh: "模式", ja: "モード" },
    visible: { ko: "👀 시간 보고 하기", en: "👀 Watch the clock", zh: "👀 看着时间", ja: "👀 時間を見てやる" },
    hidden: { ko: "🙈 시간 가리고 하기", en: "🙈 Clock hidden", zh: "🙈 遮住时间", ja: "🙈 時間を隠してやる" },
    target: { ko: "목표 시간", en: "Target", zh: "目标时间", ja: "目標時間" },
    custom: { ko: "직접 입력", en: "Custom", zh: "自定义", ja: "手動入力" },
    sec: { ko: "초", en: "s", zh: "秒", ja: "秒" },
    start: { ko: "탭해서 시작", en: "Tap to start", zh: "点击开始", ja: "タップで開始" },
    stop: { ko: "탭해서 멈추기!", en: "Tap to stop!", zh: "点击停止！", ja: "タップで止める！" },
    hint: { ko: "스페이스바로도 시작/정지할 수 있어요", en: "Space bar also starts/stops", zh: "也可以用空格键开始/停止", ja: "スペースキーでも開始/停止できます" },
    diff: { ko: "오차", en: "Off by", zh: "误差", ja: "誤差" },
    best: { ko: "최고 기록", en: "Best", zh: "最佳记录", ja: "ベスト記録" },
    history: { ko: "최근 기록", en: "Recent", zh: "最近记录", ja: "最近の記録" },
    retry: { ko: "다시 도전", en: "Try again", zh: "再试一次", ja: "もう一度" },
    timeout: { ko: "너무 늦었어요!", en: "Too late!", zh: "太晚了！", ja: "遅すぎ！" },
    // 등급 (오차 기준)
    perfect: { ko: "🎯 PERFECT! 완벽해요", en: "🎯 PERFECT!", zh: "🎯 完美！", ja: "🎯 パーフェクト！" },
    prize: { ko: "🧸 성공! 인형 획득", en: "🧸 Success! Prize won", zh: "🧸 成功！抓到娃娃", ja: "🧸 成功！景品ゲット" },
    close: { ko: "😮 아깝다! 거의 다 왔어요", en: "😮 So close!", zh: "😮 差一点！", ja: "😮 惜しい！" },
    good: { ko: "👍 좋아요, 조금만 더", en: "👍 Nice, a bit more", zh: "👍 不错，再接再厉", ja: "👍 いい感じ、もう少し" },
    again: { ko: "😅 다시 도전해봐요", en: "😅 Try again", zh: "😅 再来一次", ja: "😅 もう一度挑戦" },
};

function gradeOf(absDiff: number): keyof typeof texts {
    if (absDiff === 0) return "perfect";
    if (absDiff <= 0.01) return "prize";
    if (absDiff <= 0.05) return "close";
    if (absDiff <= 0.2) return "good";
    return "again";
}

function fmt(sec: number) {
    return sec.toFixed(2);
}

export default function TenSecondsGame() {
    const { lang } = useLanguage();
    const t = (key: keyof typeof texts) => texts[key][lang] || texts[key].en;

    useIncrementPlay("ten-seconds");

    const [phase, setPhase] = useState<Phase>("idle");
    const [mode, setMode] = useState<Mode>("visible");
    const [target, setTarget] = useState(10);
    const [customInput, setCustomInput] = useState("");
    const [elapsed, setElapsed] = useState(0);
    const [history, setHistory] = useState<Attempt[]>([]);
    const [best, setBest] = useState<number | null>(null); // 최소 |오차|
    const [timedOut, setTimedOut] = useState(false);

    const startRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const phaseRef = useRef<Phase>("idle");
    phaseRef.current = phase;

    const bestKey = `${STORAGE_KEY}-${mode}-${target}`;

    // 모드/목표가 바뀌면 그에 맞는 최고 기록 불러오기
    useEffect(() => {
        try {
            const saved = localStorage.getItem(bestKey);
            setBest(saved !== null ? parseFloat(saved) : null);
        } catch {
            setBest(null);
        }
    }, [bestKey]);

    const tick = useCallback(() => {
        const now = (performance.now() - startRef.current) / 1000;
        setElapsed(now);
        if (now >= target + AUTO_STOP_MARGIN) {
            // 너무 오래 안 멈추면 자동 종료
            finish(now, true);
            return;
        }
        rafRef.current = requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    const start = () => {
        setTimedOut(false);
        setElapsed(0);
        startRef.current = performance.now();
        setPhase("running");
        rafRef.current = requestAnimationFrame(tick);
    };

    const finish = (stoppedAt: number, isTimeout = false) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        const stopped = Math.round(stoppedAt * 100) / 100; // 1/100초 단위로 반올림
        const diff = Math.round((stopped - target) * 100) / 100;
        setElapsed(stopped);
        setTimedOut(isTimeout);
        setPhase("result");
        setHistory(prev => [{ stopped, diff }, ...prev].slice(0, 5));
        const abs = Math.abs(diff);
        if (!isTimeout && (best === null || abs < best)) {
            setBest(abs);
            try { localStorage.setItem(bestKey, String(abs)); } catch { /* 저장 실패는 무시 */ }
        }
    };

    const stop = () => {
        finish((performance.now() - startRef.current) / 1000);
    };

    // 메인 버튼: 시작 → 정지 → 다시 시작
    const handleTap = () => {
        if (phase === "running") stop();
        else start();
    };

    // 스페이스바 지원
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== "Space") return;
            if ((e.target as HTMLElement)?.tagName === "INPUT") return;
            e.preventDefault();
            if (phaseRef.current === "running") stop();
            else start();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, mode, best]);

    // 언마운트 시 애니메이션 정리
    useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

    const applyCustom = () => {
        const v = Math.round(parseFloat(customInput) * 100) / 100;
        if (!isNaN(v) && v >= MIN_TARGET && v <= MAX_TARGET) {
            setTarget(v);
            setHistory([]);
        }
    };

    const selectPreset = (p: number) => {
        setTarget(p);
        setCustomInput("");
        setHistory([]);
    };

    const diff = Math.round((elapsed - target) * 100) / 100;
    const absDiff = Math.abs(diff);
    const grade = gradeOf(absDiff);
    const isHiddenNow = mode === "hidden" && phase === "running";
    const isRunning = phase === "running";

    // 결과 색상
    const gradeColor =
        grade === "perfect" || grade === "prize" ? "from-emerald-500 to-teal-500" :
        grade === "close" ? "from-amber-400 to-orange-500" :
        grade === "good" ? "from-sky-500 to-indigo-500" : "from-slate-500 to-slate-600";

    return (
        <div className="space-y-4 animate-fade-in">
            {/* 설정: 모드 + 목표 시간 (진행 중엔 잠금) */}
            <div className={`glass-strong dark:bg-slate-800/90 rounded-3xl p-4 space-y-4 transition-opacity ${isRunning ? "opacity-50 pointer-events-none" : ""}`}>
                <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{t("mode")}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {(["visible", "hidden"] as Mode[]).map(m => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setHistory([]); }}
                                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${mode === m
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                                    : "glass dark:bg-slate-700/70 text-slate-600 dark:text-slate-300"}`}
                            >
                                {t(m)}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{t("target")}</p>
                    <div className="flex flex-wrap gap-2">
                        {PRESETS.map(p => (
                            <button
                                key={p}
                                onClick={() => selectPreset(p)}
                                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${target === p
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                                    : "glass dark:bg-slate-700/70 text-slate-600 dark:text-slate-300"}`}
                            >
                                {p}{t("sec")}
                            </button>
                        ))}
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                inputMode="decimal"
                                min={MIN_TARGET}
                                max={MAX_TARGET}
                                step={0.5}
                                placeholder={t("custom")}
                                value={customInput}
                                onChange={e => setCustomInput(e.target.value)}
                                onBlur={applyCustom}
                                onKeyDown={e => { if (e.key === "Enter") applyCustom(); }}
                                className={`w-24 px-3 py-2 rounded-xl text-sm font-bold bg-white/70 dark:bg-slate-700/70 border outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white ${!PRESETS.includes(target) ? "border-purple-400" : "border-white/50 dark:border-slate-600"}`}
                            />
                            <span className="text-xs text-slate-500 dark:text-slate-400">{t("sec")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 타이머 (전체가 버튼) */}
            <button
                onClick={handleTap}
                className={`w-full rounded-3xl py-10 px-4 text-center select-none transition-all active:scale-[0.98] shadow-2xl ${isRunning
                    ? "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 shadow-pink-500/40"
                    : phase === "result"
                        ? `bg-gradient-to-br ${gradeColor}`
                        : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-purple-500/40"}`}
                aria-live="polite"
            >
                <p className="text-white/80 text-sm font-bold mb-2">
                    🎯 {fmt(target)}{t("sec")}
                </p>
                <p className={`font-black text-white tabular-nums tracking-tight leading-none ${isHiddenNow ? "text-6xl blur-[2px]" : "text-7xl"}`}>
                    {isHiddenNow ? "?.??" : fmt(elapsed)}
                </p>

                {phase === "result" && (
                    <div className="mt-5 animate-pop">
                        <p className="text-white text-xl font-black mb-1">
                            {timedOut ? t("timeout") : t(grade)}
                        </p>
                        <p className="text-white/90 text-sm font-bold">
                            {t("diff")}: {diff > 0 ? "+" : ""}{fmt(diff)}{t("sec")}
                        </p>
                    </div>
                )}

                <p className="mt-6 text-white/90 text-base font-bold animate-pulse">
                    {isRunning ? t("stop") : phase === "result" ? `🔄 ${t("retry")}` : `▶ ${t("start")}`}
                </p>
            </button>
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">{t("hint")}</p>

            {/* 기록 */}
            {(best !== null || history.length > 0) && (
                <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-4">
                    {best !== null && (
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                            🏆 {t("best")}: <span className="text-purple-600 dark:text-purple-400">±{fmt(best)}{t("sec")}</span>
                        </p>
                    )}
                    {history.length > 0 && (
                        <>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t("history")}</p>
                            <ul className="space-y-1">
                                {history.map((h, i) => (
                                    <li key={i} className="flex justify-between text-sm tabular-nums text-slate-600 dark:text-slate-300">
                                        <span>{fmt(h.stopped)}{t("sec")}</span>
                                        <span className={Math.abs(h.diff) <= 0.01 ? "text-emerald-500 font-bold" : ""}>
                                            {h.diff > 0 ? "+" : ""}{fmt(h.diff)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
