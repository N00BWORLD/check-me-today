// 테마 강조 색 → Tailwind 클래스 매핑
// 클래스 문자열을 여기 리터럴로 적어 두어야 Tailwind JIT 가 빌드에 포함시킨다 (동적 조합 금지)
import type { QuizAccent } from "@/data/engine/types";

export interface AccentClasses {
    /** 강조 글자색 */
    text: string;
    /** 선택지 호버·선택 테두리 */
    border: string;
    /** 선택지 선택 배경 */
    bg: string;
    /** 배지 배경 (연한) */
    badge: string;
}

export const ACCENT: Record<QuizAccent, AccentClasses> = {
    rose: { text: "text-rose-500 dark:text-rose-400", border: "border-rose-400 dark:border-rose-500", bg: "bg-rose-50 dark:bg-rose-900/30", badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
    pink: { text: "text-pink-500 dark:text-pink-400", border: "border-pink-400 dark:border-pink-500", bg: "bg-pink-50 dark:bg-pink-900/30", badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300" },
    fuchsia: { text: "text-fuchsia-500 dark:text-fuchsia-400", border: "border-fuchsia-400 dark:border-fuchsia-500", bg: "bg-fuchsia-50 dark:bg-fuchsia-900/30", badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300" },
    purple: { text: "text-purple-500 dark:text-purple-400", border: "border-purple-400 dark:border-purple-500", bg: "bg-purple-50 dark:bg-purple-900/30", badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
    violet: { text: "text-violet-500 dark:text-violet-400", border: "border-violet-400 dark:border-violet-500", bg: "bg-violet-50 dark:bg-violet-900/30", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" },
    indigo: { text: "text-indigo-500 dark:text-indigo-400", border: "border-indigo-400 dark:border-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/30", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" },
    blue: { text: "text-blue-500 dark:text-blue-400", border: "border-blue-400 dark:border-blue-500", bg: "bg-blue-50 dark:bg-blue-900/30", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
    sky: { text: "text-sky-500 dark:text-sky-400", border: "border-sky-400 dark:border-sky-500", bg: "bg-sky-50 dark:bg-sky-900/30", badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" },
    cyan: { text: "text-cyan-500 dark:text-cyan-400", border: "border-cyan-400 dark:border-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/30", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300" },
    teal: { text: "text-teal-500 dark:text-teal-400", border: "border-teal-400 dark:border-teal-500", bg: "bg-teal-50 dark:bg-teal-900/30", badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
    emerald: { text: "text-emerald-500 dark:text-emerald-400", border: "border-emerald-400 dark:border-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
    green: { text: "text-green-500 dark:text-green-400", border: "border-green-400 dark:border-green-500", bg: "bg-green-50 dark:bg-green-900/30", badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
    lime: { text: "text-lime-500 dark:text-lime-400", border: "border-lime-400 dark:border-lime-500", bg: "bg-lime-50 dark:bg-lime-900/30", badge: "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300" },
    amber: { text: "text-amber-500 dark:text-amber-400", border: "border-amber-400 dark:border-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
    orange: { text: "text-orange-500 dark:text-orange-400", border: "border-orange-400 dark:border-orange-500", bg: "bg-orange-50 dark:bg-orange-900/30", badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
    red: { text: "text-red-500 dark:text-red-400", border: "border-red-400 dark:border-red-500", bg: "bg-red-50 dark:bg-red-900/30", badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
    slate: { text: "text-slate-500 dark:text-slate-400", border: "border-slate-400 dark:border-slate-500", bg: "bg-slate-50 dark:bg-slate-900/30", badge: "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300" },
};
