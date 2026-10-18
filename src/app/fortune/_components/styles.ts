// 오늘의 운세 화면 공통 스타일 (상아색 카드 + 주홍·금색 포인트)
export const cardClass =
  "bg-[#fffaf0] dark:bg-[#2a1f1a] border border-[#eadbc0] dark:border-[#5a4030] rounded-3xl shadow-sm";

export const innerBoxClass =
  "bg-[#fff3e0] dark:bg-[#352720] border border-[#eadbc0] dark:border-[#5a4030] rounded-2xl";

export const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1f1612] border border-[#eadbc0] dark:border-[#5a4030] text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4a017]";

export const primaryButtonClass =
  "w-full py-4 bg-gradient-to-r from-[#c62f26] to-[#e0702a] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all";

export const secondaryButtonClass =
  "w-full py-3 rounded-xl border border-[#eadbc0] dark:border-[#5a4030] bg-white/70 dark:bg-[#1f1612] font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-[#352720] transition-colors";

/** 영역별 포인트 색 (막대·아이콘 배경) */
export const categoryColor: Record<string, { bar: string; chip: string }> = {
  wealth: { bar: "bg-[#d4a017]", chip: "bg-[#fff1c2] dark:bg-[#4a3a10] text-[#7a5a00] dark:text-[#f3d77a]" },
  love: { bar: "bg-[#e05a7a]", chip: "bg-[#ffe1ea] dark:bg-[#4a1f2c] text-[#9b2c4a] dark:text-[#f5a9bd]" },
  health: { bar: "bg-[#3aa06a]", chip: "bg-[#dcf5e6] dark:bg-[#1e3a2a] text-[#1f6b43] dark:text-[#9fe0bb]" },
  work: { bar: "bg-[#3b6fd4]", chip: "bg-[#dfe8fb] dark:bg-[#1f2d4a] text-[#274d9c] dark:text-[#a9c1f3]" },
};

/** 종합 등급(1~5)별 게이지 색 */
export const overallColor: Record<number, string> = {
  1: "#8a8f98",
  2: "#6b9bd1",
  3: "#3aa06a",
  4: "#e0702a",
  5: "#c62f26",
};
