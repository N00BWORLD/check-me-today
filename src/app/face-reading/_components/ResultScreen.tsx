"use client";

// 결과 화면: 유형 이름을 아주 크게 → 한눈에 보는 운세(별 등급) → 부위별 풀이 → 장점 → 조언 → 행운 정보 → 추천·공유 → 다시 보기 → 추천 테스트
// - 긴 글 대신 항목별 큰 제목 + 짧은 문장
// - 별 등급은 별 그림 + 글자(좋음/최고 등) + 숫자로 함께 표시한다

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  faceFeatures,
  FaceReadingResult,
  getSelectedOption,
  levelNames,
  optionReadings,
  scoreToLevel,
  traitInfo,
  traitLevelTexts,
  traitOrder,
  TraitScores,
} from "@/data/face-reading";
import { useLike, useTestStats } from "@/hooks/useTestStats";
import RecommendedTests from "@/components/RecommendedTests";
import { colorNames, featureHanja, texts } from "./texts";
import { BackButton, BigButton, cls, SectionTitle, Toast } from "./ui";
import ShareButtons from "./ShareButtons";

interface ResultScreenProps {
  result: FaceReadingResult;
  scores: TraitScores;
  selections: Record<string, string>;
  onRetry: () => void;
}

export default function ResultScreen({ result, scores, selections, onRetry }: ResultScreenProps) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { stats } = useTestStats("face-reading");
  const { hasLiked, toggleLike, isLiking } = useLike("face-reading");
  const [toast, setToast] = useState<string | null>(null);

  // 결과 화면에 들어오면 맨 위부터 보이도록
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 안내 문구는 3초 뒤 사라진다
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const colorName = colorNames[result.luckyColor.toUpperCase()] ?? colorNames[result.luckyColor];

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="flex items-center justify-between mb-5">
          <BackButton label={t(texts.home)} href="/" />
          <span className={`${cls.muted} font-serif`}>{t(texts.resultOf)}</span>
        </div>

        {/* 유형 머리 */}
        <section className={`${cls.card} overflow-hidden mb-6 animate-fade-in`} aria-labelledby="face-result-type">
          <div className="ink-header px-6 py-8 text-center">
            <p className="text-[#f6efe0] text-[20px]">{t(texts.yourFace)}</p>
            <div className="text-[88px] leading-none my-4" aria-hidden="true">
              {result.emoji}
            </div>
            <h1 id="face-result-type" className="text-[44px] font-bold text-[#fbf7ee] font-serif leading-none">
              {t(result.type)}
            </h1>
          </div>
          <div className="px-6 py-6 text-center">
            <p className={`${cls.h2}`}>{t(result.title)}</p>
            <p className={`${cls.muted} mt-2`}>{t(result.subtitle)}</p>
            <p className={`${cls.body} mt-5 text-left`}>{t(result.description)}</p>
          </div>
        </section>

        {/* 한눈에 보는 운세 */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.fortuneOverview)}>
          <SectionTitle emoji="🧭">{t(texts.fortuneOverview)}</SectionTitle>
          <ul className="space-y-5">
            {traitOrder.map((trait) => {
              const level = scoreToLevel(scores[trait]);
              const levelLabel = t(levelNames[level]);
              return (
                <li key={trait} className={`${cls.innerBox} p-4`}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-[22px] font-bold text-stone-900 dark:text-stone-50">
                      <span aria-hidden="true">{traitInfo[trait].emoji} </span>
                      {t(traitInfo[trait].label)}
                    </span>
                    <span
                      className="text-[22px] font-bold tracking-wider"
                      aria-label={`${levelLabel}, ${level} ${t(texts.stars)} 5`}
                    >
                      <span className="text-[#8b1a1a] dark:text-[#e2c17a]" aria-hidden="true">
                        {"★".repeat(level)}
                      </span>
                      <span className="text-stone-400 dark:text-stone-500" aria-hidden="true">
                        {"★".repeat(5 - level)}
                      </span>
                      <span className="ml-2 text-[18px] text-stone-800 dark:text-stone-200">{levelLabel}</span>
                    </span>
                  </div>
                  <p className={`${cls.body} mt-2`}>{t(traitLevelTexts[trait][level])}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 부위별 풀이 */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.featureReadings)}>
          <SectionTitle emoji="👤">{t(texts.featureReadings)}</SectionTitle>
          <ul className="space-y-5">
            {faceFeatures.map((feature) => {
              const option = getSelectedOption(feature.id, selections);
              if (!option) return null;
              const reading = optionReadings[feature.id]?.[option.id];
              return (
                <li key={feature.id} className="flex items-start gap-4">
                  <span
                    className="w-14 h-14 shrink-0 rounded-full bg-[#f6efe0] dark:bg-[#1f1a14] border border-[#d8c8a6] dark:border-[#5c4b35] flex items-center justify-center text-[30px] leading-none"
                    aria-hidden="true"
                  >
                    {option.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[20px] font-bold text-stone-900 dark:text-stone-50 leading-snug">
                      <span className={`${cls.accent} font-serif mr-2`} aria-hidden="true">
                        {featureHanja[feature.id]}
                      </span>
                      {t(feature.name)} · {t(option.label)}
                    </p>
                    {reading && <p className={`${cls.body} mt-1`}>{t(reading)}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 타고난 장점 */}
        <section className={`${cls.card} p-6 mb-6`} aria-label={t(texts.strengths)}>
          <SectionTitle emoji="✨">{t(texts.strengths)}</SectionTitle>
          <ul className="flex flex-wrap gap-3">
            {(result.strengths[lang] || result.strengths.en).map((s) => (
              <li key={s} className="ink-tag rounded-full px-5 py-2 text-[20px] font-bold">
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 관상가의 한마디 */}
        <section className="ink-advice rounded-3xl border-2 border-[#d8c8a6] dark:border-[#5c4b35] p-6 mb-6" aria-label={t(texts.advice)}>
          <SectionTitle emoji="📜">{t(texts.advice)}</SectionTitle>
          <p className={`${cls.body} font-serif`}>“{t(result.advice)}”</p>
        </section>

        {/* 행운 정보 */}
        <section className={`${cls.card} p-6 mb-8`} aria-label={t(texts.luckyInfo)}>
          <SectionTitle emoji="🍀">{t(texts.luckyInfo)}</SectionTitle>
          <ul className="space-y-4">
            <li className={`${cls.innerBox} p-4 flex items-center gap-4`}>
              {/* 행운의 색은 데이터에서 오는 값이라 인라인 style 로 칠한다. 색 이름을 글로도 함께 보여 준다 */}
              <span
                className="w-14 h-14 shrink-0 rounded-full border-2 border-stone-500"
                style={{ backgroundColor: result.luckyColor }}
                aria-hidden="true"
              />
              <span>
                <span className={`${cls.muted} block`}>{t(texts.luckyColor)}</span>
                <span className="text-[22px] font-bold text-stone-900 dark:text-stone-50">{colorName ? t(colorName) : result.luckyColor}</span>
              </span>
            </li>
            <li className={`${cls.innerBox} p-4 flex items-center gap-4`}>
              <span className="w-14 h-14 shrink-0 flex items-center justify-center text-[36px] leading-none" aria-hidden="true">
                🧭
              </span>
              <span>
                <span className={`${cls.muted} block`}>{t(texts.luckyDirection)}</span>
                <span className="text-[22px] font-bold text-stone-900 dark:text-stone-50">{t(result.luckyDirection)}</span>
              </span>
            </li>
            <li className={`${cls.innerBox} p-4 flex items-center gap-4`}>
              <span className="w-14 h-14 shrink-0 flex items-center justify-center text-[36px] leading-none" aria-hidden="true">
                🤝
              </span>
              <span>
                <span className={`${cls.muted} block`}>{t(texts.goodMatch)}</span>
                <span className="text-[22px] font-bold text-stone-900 dark:text-stone-50">{t(result.compatibility)}</span>
              </span>
            </li>
          </ul>
        </section>

        {/* 추천하기 */}
        <BigButton
          variant={hasLiked ? "secondary" : "primary"}
          onClick={() => void toggleLike()}
          disabled={hasLiked || isLiking}
          aria-pressed={hasLiked}
          aria-label={hasLiked ? t(texts.liked) : t(texts.like)}
          className="mb-8"
        >
          {hasLiked ? "✅ " : "👍 "}
          {hasLiked ? t(texts.liked) : t(texts.like)}
          {stats.likeCount > 0 && <span className="ml-2 text-[18px] font-normal">({stats.likeCount})</span>}
        </BigButton>

        {/* 공유 */}
        <div className={`${cls.card} p-6 mb-8`}>
          <ShareButtons result={result} scores={scores} onToast={setToast} />
        </div>

        {/* 다시 보기 / 처음으로 */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          <BigButton variant="secondary" onClick={onRetry} aria-label={t(texts.retry)}>
            🔄 {t(texts.retry)}
          </BigButton>
          <BigButton variant="secondary" onClick={() => router.push("/")} aria-label={t(texts.home)}>
            🏠 {t(texts.home)}
          </BigButton>
        </div>

        <RecommendedTests currentTestId="face-reading" />

        <p className={`${cls.muted} text-center mt-10`}>{t(texts.disclaimer)}</p>
      </div>

      <Toast message={toast} />
    </main>
  );
}
