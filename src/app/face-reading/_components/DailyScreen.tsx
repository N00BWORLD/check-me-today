"use client";

// 오늘의 관상 운세 화면: 저장된 관상 유형 + 오늘 날짜로 매일 바뀌는 운세
// - 별점 없이 항목마다 짧은 코멘트만 보여 준다 (어르신이 한눈에 읽기 쉽게)
// - 행운의 글자(초성)·물건·음식·시간·색·숫자·방향, 오늘의 한마디, 조언, 주의
// - 연속으로 본 날짜 수를 보여 주어 매일 다시 오고 싶게 한다

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaceReadingResult, traitInfo, traitOrder } from "@/data/face-reading";
import {
  dailyOverallTexts,
  dailyTraitComments,
  generateDailyFaceFortune,
  getLuckyInitial,
} from "@/data/face-reading-daily";
import { luckyColors, luckyDirections } from "@/data/fortunes";
import { SITE_URL } from "@/lib/kakao";
import { texts } from "./texts";
import { BackButton, BigButton, cls, SectionTitle, Toast, TypeImage } from "./ui";
import ShareButtons from "./ShareButtons";

interface DailyScreenProps {
  result: FaceReadingResult;
  /** 연속으로 본 날짜 수 */
  streak: number;
  /** 내 관상 결과 전체 다시 보기 */
  onShowResult: () => void;
  /** 관상 다시 보기(처음부터) */
  onRetry: () => void;
  onBack: () => void;
}

const localeOf: Record<string, string> = { ko: "ko-KR", en: "en-US", zh: "zh-CN", ja: "ja-JP" };

export default function DailyScreen({ result, streak, onShowResult, onRetry, onBack }: DailyScreenProps) {
  const { t, lang } = useLanguage();
  const [toast, setToast] = useState<string | null>(null);

  // 날짜가 바뀌기 전까지는 같은 운세 (렌더마다 다시 계산하지 않음)
  const fortune = useMemo(() => generateDailyFaceFortune(result), [result]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const dateLabel = new Date().toLocaleDateString(localeOf[lang] ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const colorName = luckyColors[fortune.luckyColorKey];
  const directionName = luckyDirections[fortune.luckyDirectionKey];

  const luckyList = [
    { emoji: "🔤", label: t(texts.luckyInitial), value: getLuckyInitial(fortune.luckyInitialIndex, lang) },
    { emoji: "🔢", label: t(texts.luckyNumber), value: String(fortune.luckyNumber) },
    { emoji: "🎨", label: t(texts.luckyColor), value: t(colorName) },
    { emoji: "🧭", label: t(texts.luckyDirection), value: t(directionName) },
    { emoji: "🎁", label: t(texts.luckyItem), value: t(fortune.luckyItem) },
    { emoji: "🍚", label: t(texts.luckyFood), value: t(fortune.luckyFood) },
    { emoji: "⏰", label: t(texts.luckyTime), value: t(fortune.luckyTime) },
  ];

  const shareTitle = `🔮 ${t(texts.dailyTitle)} · ${t(result.type)}`;
  const shareDescription = `${dateLabel} — ${t(fortune.message)}`;

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="flex items-center justify-between mb-5">
          <BackButton label={t(texts.back)} onClick={onBack} />
          {streak > 1 && (
            <span className="text-[18px] font-bold text-[#8b1a1a] dark:text-[#e2c17a]" aria-live="polite">
              🔥 {t(texts.streakPrefix)} {streak}
              {t(texts.streakSuffix)}
            </span>
          )}
        </div>

        {/* 머리: 날짜 + 유형 */}
        <section className={`${cls.card} overflow-hidden mb-6 animate-fade-in`} aria-labelledby="daily-title">
          <div className="ink-header px-6 py-7 text-center">
            <h1 id="daily-title" className="text-[32px] font-bold text-[#fbf7ee] font-serif leading-tight">
              {t(texts.dailyTitle)}
            </h1>
            <p className="text-[#e2c17a] text-[20px] font-bold mt-2">{dateLabel}</p>
          </div>
          <button
            type="button"
            onClick={onShowResult}
            aria-label={t(texts.seeMyResult)}
            className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-black/5 dark:hover:bg-white/5 ${cls.focus}`}
          >
            <TypeImage id={result.id} emoji={result.emoji} alt="" size={80} className="w-20 h-20 my-0 rounded-2xl border-2" />
            <span className="flex-1 min-w-0">
              <span className={`${cls.muted} block`}>{t(texts.yourFace)}</span>
              <span className="block text-[26px] font-bold text-stone-900 dark:text-stone-50 font-serif leading-tight">
                {t(result.type)}
              </span>
              <span className="block text-[16px] text-[#8b1a1a] dark:text-[#e2c17a] font-bold mt-1">{t(texts.seeMyResult)} →</span>
            </span>
          </button>
        </section>

        {/* 종합운 + 오늘의 한마디 */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.dailyOverall)}>
          <p className={`${cls.muted} mb-1`}>{t(texts.dailyOverall)}</p>
          <p className={`${cls.h2} mb-5`}>{t(dailyOverallTexts[fortune.overall])}</p>
          <div className={`${cls.innerBox} p-5`}>
            <p className="text-[18px] font-bold text-[#8b1a1a] dark:text-[#e2c17a] mb-2">📜 {t(texts.dailyMessage)}</p>
            <p className={`${cls.body} font-serif`}>“{t(fortune.message)}”</p>
          </div>
        </section>

        {/* 항목별 코멘트 (별점 없음) */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.dailyTraits)}>
          <SectionTitle emoji="🧭">{t(texts.dailyTraits)}</SectionTitle>
          <ul className="space-y-3">
            {traitOrder.map((trait) => (
              <li key={trait} className={`${cls.innerBox} px-4 py-3 flex items-center gap-4`}>
                <span className="text-[30px] leading-none shrink-0" aria-hidden="true">
                  {traitInfo[trait].emoji}
                </span>
                <span className="w-[5.5rem] shrink-0 text-[20px] font-bold text-stone-900 dark:text-stone-50">{t(traitInfo[trait].label)}</span>
                <span className="flex-1 text-[19px] text-stone-800 dark:text-stone-200 leading-snug break-keep">
                  {t(dailyTraitComments[trait][fortune.traits[trait]])}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 행운 정보 */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.luckyInfo)}>
          <SectionTitle emoji="🍀">{t(texts.dailyLucky)}</SectionTitle>
          <ul className="grid grid-cols-2 gap-3">
            {luckyList.map((item) => (
              <li key={item.label} className={`${cls.innerBox} p-4 text-center`}>
                <span className="block text-[30px] leading-none mb-2" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className={`${cls.muted} block text-[16px]`}>{item.label}</span>
                <span className="block text-[22px] font-bold text-stone-900 dark:text-stone-50 break-keep leading-tight mt-1">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 조언 · 주의 */}
        <section className="space-y-4 mb-8">
          <div className="ink-advice rounded-3xl border-2 border-[#d8c8a6] dark:border-[#5c4b35] p-5">
            <p className="text-[20px] font-bold text-stone-900 dark:text-stone-50 mb-2">💡 {t(texts.dailyAdvice)}</p>
            <p className={cls.body}>{t(fortune.advice)}</p>
          </div>
          <div className={`${cls.card} p-5`}>
            <p className="text-[20px] font-bold text-stone-900 dark:text-stone-50 mb-2">⚠️ {t(texts.dailyWarning)}</p>
            <p className={cls.body}>{t(fortune.warning)}</p>
          </div>
        </section>

        {/* 내일 다시 */}
        <p className={`${cls.body} text-center font-bold mb-8`}>🌅 {t(texts.comeBackTomorrow)}</p>

        {/* 공유 */}
        <div className={`${cls.card} p-6 mb-8`}>
          <ShareButtons
            shareTitle={shareTitle}
            shareDescription={shareDescription}
            imageUrl={`${SITE_URL}/face-reading/share/${result.id}.jpg`}
            shareUrl={`${SITE_URL}/face-reading?type=${result.id}`}
            onToast={setToast}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BigButton variant="secondary" onClick={onShowResult} aria-label={t(texts.seeMyResult)}>
            🔮 {t(texts.seeMyResult)}
          </BigButton>
          <BigButton variant="secondary" onClick={onRetry} aria-label={t(texts.retry)}>
            🔄 {t(texts.retry)}
          </BigButton>
        </div>

        <p className={`${cls.muted} text-center mt-10`}>{t(texts.disclaimer)}</p>
      </div>

      <Toast message={toast} />
    </main>
  );
}
