"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIncrementPlay } from "@/hooks/useTestStats";
import ShareButtons from "./ShareButtons";

// ===== 사다리 타기 =====
// 참가자(위)와 결과(아래)를 입력하고 사다리를 만들면,
// 참가자 이름을 눌렀을 때 선이 내려가며 결과를 보여준다.

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;
const ROWS = 12;          // 가로선이 놓일 수 있는 줄 수
const ROW_H = 34;         // 줄 간격(px, viewBox 기준)
const TOP = 16;           // 세로선 시작 여백
const RUNG_CHANCE = 0.33; // 각 칸에 가로선이 생길 확률
const DRAW_MS = 1400;     // 경로 그리기 애니메이션 시간

// 참가자별 선 색상
const COLORS = ["#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#f97316"];

type Rung = { row: number; col: number }; // col: 왼쪽 세로선 번호 (col 과 col+1 을 잇는 가로선)
type Phase = "setup" | "play";

const texts = {
    players: { ko: "참가자", en: "Players", zh: "参与者", ja: "参加者" },
    results: { ko: "결과", en: "Results", zh: "结果", ja: "結果" },
    defaultPlayer: { ko: "참가자", en: "Player", zh: "参与者", ja: "参加者" },
    win: { ko: "🎉 당첨", en: "🎉 Winner", zh: "🎉 中奖", ja: "🎉 当たり" },
    miss: { ko: "꽝", en: "Miss", zh: "没中", ja: "はずれ" },
    build: { ko: "사다리 만들기 🎲", en: "Build the Ladder 🎲", zh: "生成梯子 🎲", ja: "あみだを作る 🎲" },
    hint: { ko: "이름을 누르면 사다리를 타고 내려가요", en: "Tap a name to ride the ladder", zh: "点击名字开始爬梯", ja: "名前を押すとあみだを辿ります" },
    revealAll: { ko: "결과 모두 보기", en: "Reveal All", zh: "显示全部结果", ja: "すべて表示" },
    shuffle: { ko: "다시 섞기", en: "Shuffle", zh: "重新打乱", ja: "もう一度混ぜる" },
    back: { ko: "← 설정으로", en: "← Settings", zh: "← 设置", ja: "← 設定へ" },
    playersCount: { ko: "인원", en: "Count", zh: "人数", ja: "人数" },
};

// 가로선을 무작위로 생성. 같은 줄에서 이웃한 칸에 동시에 놓이지 않게 하고,
// 모든 칸(이웃한 세로선 쌍)에 최소 하나의 가로선을 보장한다.
function generateRungs(count: number): Rung[] {
    const rungs: Rung[] = [];
    const hasRungInCol = new Array(count - 1).fill(false);

    for (let row = 0; row < ROWS; row++) {
        let prevPlaced = false;
        for (let col = 0; col < count - 1; col++) {
            const place: boolean = !prevPlaced && Math.random() < RUNG_CHANCE;
            if (place) {
                rungs.push({ row, col });
                hasRungInCol[col] = true;
            }
            prevPlaced = place;
        }
    }

    // 가로선이 하나도 없는 칸에는 빈 줄을 찾아 하나 추가
    hasRungInCol.forEach((has, col) => {
        if (has) return;
        for (let row = 0; row < ROWS; row++) {
            const conflict = rungs.some(r => r.row === row && (r.col === col - 1 || r.col === col + 1));
            if (!conflict) {
                rungs.push({ row, col });
                break;
            }
        }
    });

    return rungs;
}

// 시작 세로선에서 출발해 사다리를 타고 내려간 경로(점 목록)와 도착 번호를 계산
function tracePath(start: number, rungs: Rung[], colX: (c: number) => number) {
    const points: [number, number][] = [];
    let col = start;
    points.push([colX(col), TOP]);

    for (let row = 0; row < ROWS; row++) {
        const y = TOP + ROW_H * (row + 1);
        const right = rungs.some(r => r.row === row && r.col === col);
        const left = rungs.some(r => r.row === row && r.col === col - 1);
        if (right || left) {
            points.push([colX(col), y]);
            col = right ? col + 1 : col - 1;
            points.push([colX(col), y]);
        }
    }

    points.push([colX(col), TOP + ROW_H * (ROWS + 1)]);
    return { points, end: col };
}

export default function LadderGame() {
    const { lang } = useLanguage();
    const t = (key: keyof typeof texts) => texts[key][lang] || texts[key].en;

    useIncrementPlay("ladder-game");

    const [phase, setPhase] = useState<Phase>("setup");
    const [count, setCount] = useState(4);
    const [names, setNames] = useState<string[]>([]);
    const [prizes, setPrizes] = useState<string[]>([]);
    const [rungs, setRungs] = useState<Rung[]>([]);
    const [revealed, setRevealed] = useState<Record<number, number>>({}); // 시작 → 도착
    const [drawing, setDrawing] = useState<number[]>([]);                 // 현재 그려지는 중인 시작 번호들
    const [animKey, setAnimKey] = useState(0);

    // 인원 변경 시 이름/결과 배열 길이 맞추기 (기존 입력은 유지)
    useEffect(() => {
        setNames(prev => Array.from({ length: count }, (_, i) => prev[i] ?? `${t("defaultPlayer")} ${i + 1}`));
        setPrizes(prev => Array.from({ length: count }, (_, i) => prev[i] ?? (i === 0 ? t("win") : t("miss"))));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    // SVG 좌표
    const width = count * 72;
    const height = TOP * 2 + ROW_H * (ROWS + 1);
    const colX = useCallback((c: number) => (c + 0.5) * (width / count), [width, count]);

    // 모든 참가자의 경로를 미리 계산
    const paths = useMemo(
        () => Array.from({ length: count }, (_, i) => tracePath(i, rungs, colX)),
        [count, rungs, colX]
    );

    const build = () => {
        setRungs(generateRungs(count));
        setRevealed({});
        setDrawing([]);
        setPhase("play");
    };

    const shuffle = () => {
        setRungs(generateRungs(count));
        setRevealed({});
        setDrawing([]);
        setAnimKey(k => k + 1);
    };

    // 선택한 참가자(들)의 경로를 애니메이션으로 그린 뒤 결과를 공개
    const ride = (starts: number[]) => {
        const fresh = starts.filter(s => revealed[s] === undefined && !drawing.includes(s));
        if (fresh.length === 0) return;
        setDrawing(prev => [...prev, ...fresh]);
        setAnimKey(k => k + 1);
        setTimeout(() => {
            setRevealed(prev => {
                const next = { ...prev };
                fresh.forEach(s => { next[s] = paths[s].end; });
                return next;
            });
            setDrawing(prev => prev.filter(s => !fresh.includes(s)));
        }, DRAW_MS);
    };

    const gridStyle = { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };
    const allRevealed = Object.keys(revealed).length === count;

    // ===== 설정 화면 =====
    if (phase === "setup") {
        return (
            <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-5 space-y-5 animate-fade-in">
                {/* 인원 */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{t("playersCount")}</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCount(c => Math.max(MIN_PLAYERS, c - 1))}
                            disabled={count <= MIN_PLAYERS}
                            className="w-9 h-9 rounded-full glass dark:bg-slate-700 font-bold text-lg disabled:opacity-30"
                            aria-label="-"
                        >−</button>
                        <span className="w-6 text-center font-black text-lg text-slate-800 dark:text-white">{count}</span>
                        <button
                            onClick={() => setCount(c => Math.min(MAX_PLAYERS, c + 1))}
                            disabled={count >= MAX_PLAYERS}
                            className="w-9 h-9 rounded-full glass dark:bg-slate-700 font-bold text-lg disabled:opacity-30"
                            aria-label="+"
                        >+</button>
                    </div>
                </div>

                {/* 참가자 이름 */}
                <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">👥 {t("players")}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {names.map((n, i) => (
                            <input
                                key={i}
                                value={n}
                                maxLength={10}
                                onChange={e => setNames(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
                                className="px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-white/50 dark:border-slate-600 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-400"
                                style={{ borderLeft: `4px solid ${COLORS[i]}` }}
                            />
                        ))}
                    </div>
                </div>

                {/* 결과 */}
                <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">🎁 {t("results")}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {prizes.map((p, i) => (
                            <input
                                key={i}
                                value={p}
                                maxLength={12}
                                onChange={e => setPrizes(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
                                className="px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-white/50 dark:border-slate-600 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={build}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-black text-lg shadow-lg shadow-teal-500/30 active:scale-95 transition-transform"
                >
                    {t("build")}
                </button>
            </div>
        );
    }

    // ===== 사다리 화면 =====
    return (
        <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-4 animate-fade-in">
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-3">{t("hint")}</p>

            {/* 참가자 (위) */}
            <div className="grid gap-1 mb-1" style={gridStyle}>
                {names.map((n, i) => {
                    const done = revealed[i] !== undefined;
                    const busy = drawing.includes(i);
                    return (
                        <button
                            key={i}
                            onClick={() => ride([i])}
                            disabled={done || busy}
                            className={`px-1 py-2 rounded-xl text-[11px] font-bold text-white truncate transition-transform ${done || busy ? "opacity-90" : "hover:scale-105 active:scale-95 animate-pulse"}`}
                            style={{ background: COLORS[i] }}
                            title={n}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>

            {/* 사다리 */}
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="ladder">
                {/* 세로선 */}
                {Array.from({ length: count }, (_, i) => (
                    <line
                        key={`v${i}`}
                        x1={colX(i)} y1={TOP} x2={colX(i)} y2={height - TOP}
                        className="stroke-slate-300 dark:stroke-slate-600"
                        strokeWidth={3} strokeLinecap="round"
                    />
                ))}
                {/* 가로선 */}
                {rungs.map((r, i) => (
                    <line
                        key={`h${i}`}
                        x1={colX(r.col)} y1={TOP + ROW_H * (r.row + 1)}
                        x2={colX(r.col + 1)} y2={TOP + ROW_H * (r.row + 1)}
                        className="stroke-slate-300 dark:stroke-slate-600"
                        strokeWidth={3} strokeLinecap="round"
                    />
                ))}
                {/* 경로: 공개된 것은 바로, 그리는 중인 것은 애니메이션 */}
                {paths.map((p, i) => {
                    const done = revealed[i] !== undefined;
                    const busy = drawing.includes(i);
                    if (!done && !busy) return null;
                    const d = p.points.map(([x, y], k) => `${k === 0 ? "M" : "L"}${x} ${y}`).join(" ");
                    return (
                        <path
                            key={`p${i}-${busy ? animKey : "done"}`}
                            d={d}
                            fill="none"
                            stroke={COLORS[i]}
                            strokeWidth={5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength={1}
                            style={busy ? { strokeDasharray: 1, strokeDashoffset: 1, animation: `ladder-draw ${DRAW_MS}ms ease-in-out forwards` } : undefined}
                        />
                    );
                })}
            </svg>

            {/* 결과 (아래) */}
            <div className="grid gap-1 mt-1" style={gridStyle}>
                {prizes.map((p, i) => {
                    // 이 결과에 도착한 참가자 찾기
                    const from = Object.entries(revealed).find(([, end]) => end === i)?.[0];
                    const color = from !== undefined ? COLORS[Number(from)] : undefined;
                    return (
                        <div
                            key={i}
                            className={`px-1 py-2 rounded-xl text-[11px] font-bold text-center truncate transition-all ${color ? "text-white scale-105 animate-pop" : "bg-white/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-300"}`}
                            style={color ? { background: color } : undefined}
                            title={p}
                        >
                            {p}
                        </div>
                    );
                })}
            </div>

            {/* 공개된 결과 목록 */}
            {Object.keys(revealed).length > 0 && (
                <ul className="mt-4 space-y-1">
                    {Object.entries(revealed).map(([s, e]) => (
                        <li key={s} className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 animate-slide-up">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[Number(s)] }} />
                            <span>{names[Number(s)]}</span>
                            <span className="text-slate-400">→</span>
                            <span>{prizes[e]}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* 버튼 */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                    onClick={() => ride(names.map((_, i) => i))}
                    disabled={allRevealed || drawing.length > 0}
                    className="py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold shadow-lg active:scale-95 transition-transform disabled:opacity-40"
                >
                    {t("revealAll")}
                </button>
                <button
                    onClick={shuffle}
                    className="py-3 rounded-xl glass dark:bg-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
                >
                    🔀 {t("shuffle")}
                </button>
            </div>
            {/* 결과 공유 (모두 공개된 뒤) */}
            {allRevealed && (
                <ShareButtons
                    className="mt-3 animate-fade-in"
                    title={lang === 'ko' ? '사다리 타기 결과 🎲' : 'Ladder game result 🎲'}
                    description={Object.entries(revealed)
                        .map(([s, e]) => `${names[Number(s)]} → ${prizes[e]}`)
                        .join(" · ")
                        .slice(0, 80)}
                    emoji="🎲"
                />
            )}

            <button
                onClick={() => setPhase("setup")}
                className="w-full mt-2 py-2 text-xs text-slate-400 dark:text-slate-500 hover:text-purple-500 transition-colors"
            >
                {t("back")}
            </button>
        </div>
    );
}
