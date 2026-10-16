"use client";

// 분석 중 화면: 느린 붓 애니메이션 하나 + 큰 안내 문구 + 진행 막대 + 광고
// - 애니메이션은 느리고 적게 (ink-stamp 가 천천히 숨 쉬듯 커졌다 작아짐)

import { useLanguage } from "@/context/LanguageContext";
import AdUnit from "@/components/AdUnit";
import { texts } from "./texts";
import { cls } from "./ui";

interface AnalyzingScreenProps {
  /** 0~100 */
  progress: number;
  /** 안내 문구 키 (사진 분석 단계에 따라 바뀜) */
  messageKey: "analyzing" | "analyzingPreparing" | "analyzingPhoto" | "analyzingDone";
}

export default function AnalyzingScreen({ progress, messageKey }: AnalyzingScreenProps) {
  const { t } = useLanguage();
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <main className={`${cls.page} flex items-center`}>
      <div className={`${cls.container} w-full text-center`}>
        <div className="w-36 h-36 mx-auto mb-8 rounded-2xl ink-stamp flex items-center justify-center animate-pulse motion-reduce:animate-none" aria-hidden="true">
          <span className="text-[72px] leading-none">🔮</span>
        </div>

        <h1 className={cls.h1} aria-live="polite">
          {t(texts[messageKey])}…
        </h1>
        <p className={`${cls.body} mt-3`}>{t(texts.analyzingSub)}</p>

        {/* 진행 막대 + 숫자 */}
        <div
          className="mt-8 h-4 bg-[#e3d8c2] dark:bg-[#4a3f31] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={t(texts.analyzing)}
        >
          {/* 진행 폭은 계속 바뀌는 값이라 인라인 style 로 지정한다 */}
          <div className="h-full ink-progress rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-[22px] font-bold text-stone-900 dark:text-stone-50">{pct}%</p>

        <p className={`${cls.muted} font-serif mt-8`}>“{t(texts.proverb)}”</p>

        <div className="mt-8 flex justify-center w-full overflow-hidden">
          <AdUnit />
        </div>
      </div>
    </main>
  );
}
