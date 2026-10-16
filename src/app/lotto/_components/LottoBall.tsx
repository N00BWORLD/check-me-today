// 로또 공 하나. 실제 로또 공 색 구간(1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록)을 쓰되
// 어르신이 읽기 쉽도록 글자 대비를 높인 색으로 조금 진하게 잡았다.

import { ballColor, type BallColor } from "@/data/lotto";
import { twMerge } from "tailwind-merge";

const colorClass: Record<BallColor, string> = {
  yellow: "bg-[#f5c400] text-stone-900 border-[#c99f00]",
  blue: "bg-[#2f86d6] text-white border-[#1f63a3]",
  red: "bg-[#e04848] text-white border-[#b23434]",
  gray: "bg-[#767676] text-white border-[#555555]",
  green: "bg-[#4d9a2a] text-white border-[#39741e]",
};

interface LottoBallProps {
  number: number;
  /** "lg" 결과 화면의 큰 공(최대 60px), "md" 5게임 줄의 공(최대 52px). 6칸 격자 안에서 화면 폭을 따라 줄어든다 */
  size?: "lg" | "md";
  className?: string;
}

export default function LottoBall({ number, size = "lg", className = "" }: LottoBallProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center justify-center rounded-full font-bold border-2 shadow-md tabular-nums shrink-0",
        size === "lg" ? "w-full max-w-[60px] aspect-square text-[24px] sm:text-[28px]" : "w-full max-w-[52px] aspect-square text-[22px]",
        colorClass[ballColor(number)],
        className
      )}
      aria-label={String(number)}
    >
      {number}
    </span>
  );
}
