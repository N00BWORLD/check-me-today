"use client";

// 그림으로 저장할 때 html2canvas 로 찍는 결과 카드 (화면 밖에 숨겨 두고 캡처한다)
// - 폭 420px 고정, 항상 밝은 한지 톤으로 그려 어디에 보내도 잘 보이게 한다

import { forwardRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  FaceReadingResult,
  levelNames,
  scoreToLevel,
  traitInfo,
  traitOrder,
  TraitScores,
} from "@/data/face-reading";
import { texts } from "./texts";

interface ShareCardProps {
  result: FaceReadingResult;
  scores: TraitScores;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard({ result, scores }, ref) {
  const { t } = useLanguage();

  return (
    <div className="fixed top-0 -left-[9999px] pointer-events-none" aria-hidden="true">
      <div ref={ref} className="w-[420px] bg-[#f6efe0] text-[#1f1a14] font-sans">
        {/* 머리 */}
        <div className="ink-header px-6 py-8 text-center">
          <p className="text-[#e2c17a] text-[16px] tracking-[0.4em] font-serif">觀相結果</p>
          <p className="text-[#f6efe0] text-[14px] mt-1">{t(texts.resultOf)}</p>
          <div className="text-[76px] leading-none my-5">{result.emoji}</div>
          <p className="text-[38px] font-bold text-[#fbf7ee] font-serif leading-none">{t(result.type)}</p>
        </div>

        {/* 본문 */}
        <div className="px-6 py-6">
          <p className="text-[22px] font-bold text-center break-keep leading-snug">{t(result.title)}</p>
          <p className="text-[16px] text-[#4a3f31] text-center mt-2 break-keep">{t(result.subtitle)}</p>

          <div className="mt-6 bg-[#fffdf7] border border-[#d8c8a6] rounded-2xl p-4 space-y-3">
            {traitOrder.map((trait) => {
              const level = scoreToLevel(scores[trait]);
              return (
                <div key={trait} className="flex items-center justify-between gap-3">
                  <span className="text-[17px] font-bold">
                    {traitInfo[trait].emoji} {t(traitInfo[trait].label)}
                  </span>
                  <span className="text-[17px] text-[#8b1a1a] font-bold tracking-wider">
                    {"★".repeat(level)}
                    <span className="text-[#c8b89a]">{"★".repeat(5 - level)}</span>
                    <span className="text-[#4a3f31] text-[14px] ml-2 font-normal">{t(levelNames[level])}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 bg-[#fff8dc] border border-[#d8c8a6] rounded-2xl p-4">
            <p className="text-[15px] font-bold text-[#8b1a1a] mb-2">📜 {t(texts.advice)}</p>
            <p className="text-[15px] leading-relaxed break-keep">{t(result.advice)}</p>
          </div>
        </div>

        <div className="text-center py-4 border-t border-[#d8c8a6] text-[14px] text-[#4a3f31] tracking-widest">✨ check-me.today</div>
      </div>
    </div>
  );
});

export default ShareCard;
