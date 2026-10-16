// 로또 공 하나. 게임마다 실제 공 색을 따르되 어르신이 읽기 쉽도록 글자 대비를 높인 색으로 조금 진하게 잡았다.
// - kr: 한국 로또 5색 (1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록)
// - powerball: 흰 공 + 빨간 파워볼, mega: 흰 공 + 금색 메가볼, ssq: 빨간 공 + 파란 공, mono: 단색(일본 ロト)

import { krBallColor, type BallScheme, type KrBallColor } from "@/data/lotto";
import { twMerge } from "tailwind-merge";

const krColorClass: Record<KrBallColor, string> = {
  yellow: "bg-[#f5c400] text-stone-900 border-[#c99f00]",
  blue: "bg-[#2f86d6] text-white border-[#1f63a3]",
  red: "bg-[#e04848] text-white border-[#b23434]",
  gray: "bg-[#767676] text-white border-[#555555]",
  green: "bg-[#4d9a2a] text-white border-[#39741e]",
};

const WHITE = "bg-white text-stone-900 border-stone-400";
const RED = "bg-[#d6302f] text-white border-[#a82423]";
const GOLD = "bg-[#e5a800] text-stone-900 border-[#b38300]";
const BLUE = "bg-[#2f6fd6] text-white border-[#1f4fa3]";
const MONO = "bg-[#c0672b] text-white border-[#8f4a1c]";

/** 게임 색 묶음과 공 종류(본번호/보조 공)에 맞는 색 클래스 */
function colorFor(scheme: BallScheme, n: number, extra: boolean): string {
  switch (scheme) {
    case "kr":
      return krColorClass[krBallColor(n)];
    case "powerball":
      return extra ? RED : WHITE;
    case "mega":
      return extra ? GOLD : WHITE;
    case "ssq":
      return extra ? BLUE : RED;
    default:
      return MONO;
  }
}

interface LottoBallProps {
  number: number;
  scheme: BallScheme;
  /** 보조 공(파워볼·메가볼·蓝球)이면 true */
  extra?: boolean;
  /** "lg" 결과 화면의 큰 공(최대 60px), "md" 5게임 줄의 공(최대 52px). 격자 안에서 화면 폭을 따라 줄어든다 */
  size?: "lg" | "md";
  className?: string;
}

export default function LottoBall({ number, scheme, extra = false, size = "lg", className = "" }: LottoBallProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center justify-center rounded-full font-bold border-2 shadow-md tabular-nums shrink-0",
        size === "lg" ? "w-full max-w-[60px] aspect-square text-[24px] sm:text-[28px]" : "w-full max-w-[52px] aspect-square text-[22px]",
        colorFor(scheme, number, extra),
        className
      )}
      aria-label={String(number)}
    >
      {number}
    </span>
  );
}
