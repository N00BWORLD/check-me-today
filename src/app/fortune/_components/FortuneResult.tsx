"use client";

// 오늘의 운세 결과 화면
// 순서: 날짜·이름 → 종합운(게이지 + 총평 + 키워드) → 타고난 기운(띠·별자리) → 영역별 운세 4개
//       → 오늘의 행운 5가지 → 살릴 것·조심할 것 → 공유 → 광고 → 다시 보기 → 추천 테스트
import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  fortuneCategories,
  fortuneLevelNames,
  luckyColorHex,
  luckyColors,
  luckyDirections,
  type DailyFortune,
  type FortuneCategory,
  type LText,
} from "@/data/fortunes";
import ShareButtons from "@/components/ShareButtons";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { fortuneTexts } from "./texts";
import { cardClass, categoryColor, innerBoxClass, overallColor, secondaryButtonClass } from "./styles";

interface Props {
  fortune: DailyFortune;
  name: string;
  onRetry: () => void;
}

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export default function FortuneResult({ fortune, name, onRetry }: Props) {
  const { lang } = useLanguage();
  const t = (key: keyof typeof fortuneTexts) => fortuneTexts[key][lang] || fortuneTexts[key].en;
  const l = (text: LText) => text[lang] || text.en;

  // 결과가 뜨면 맨 위부터
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const locale = lang === "ko" ? "ko-KR" : lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en-US";
  const dateLabel = new Date(`${fortune.date}T00:00:00`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const animalName = l(fortune.animal.name);
  const signName = l(fortune.sign.name);
  const levelName = (score: number) => l(fortuneLevelNames[score]);
  const ringColor = overallColor[fortune.overall];
  const ringOffset = RING_LENGTH * (1 - fortune.overallScore / 100);

  const colorName = luckyColors[fortune.luckyColor][lang] || luckyColors[fortune.luckyColor].en;
  const directionName = luckyDirections[fortune.luckyDirection][lang] || luckyDirections[fortune.luckyDirection].en;

  const categoryName = (id: FortuneCategory) => {
    const c = fortuneCategories.find((x) => x.id === id)!;
    return `${c.emoji} ${l(c.name)}`;
  };

  // 공유 문구: "호랑이띠 · 사자자리 · 종합운 82점"
  const shareTitle =
    lang === "ko"
      ? `${name ? `${name}님의 ` : ""}오늘의 운세 · 종합운 ${fortune.overallScore}점 (${levelName(fortune.overall)})`
      : `${name ? `${name}'s ` : ""}Daily Fortune · ${fortune.overallScore} pts (${levelName(fortune.overall)})`;
  const shareDescription = `${fortune.animal.emoji} ${animalName} · ${fortune.sign.symbol} ${signName} · ${t("keyword")}: ${l(fortune.keyword)}`;

  return (
    <main className="min-h-screen px-4 pt-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* 상단: 뒤로 + 날짜 */}
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/"
            aria-label={t("back")}
            className="inline-flex w-10 h-10 rounded-full glass dark:bg-slate-800/80 items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">{dateLabel}</div>
            {name && <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{name}</div>}
          </div>
        </div>

        {/* 종합운 */}
        <section className={`${cardClass} overflow-hidden mb-4 animate-slide-up`}>
          <div className="px-6 pt-6 pb-2 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fdebd3] dark:bg-[#4a3220] text-[#8a3b12] dark:text-[#f3cf8a] text-sm font-bold">
              {fortune.animal.emoji} {animalName}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e8ecf9] dark:bg-[#2b3250] text-[#2f3f8f] dark:text-[#b9c4f5] text-sm font-bold">
              {fortune.sign.symbol} {signName}
            </span>
          </div>

          <div className="px-6 pb-6 flex flex-col items-center">
            <h1 className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-400 mt-3 mb-2">{t("overall")}</h1>

            {/* 원형 게이지 */}
            <div className="relative w-36 h-36 mb-3">
              <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r={RING_RADIUS} fill="none" stroke="currentColor" strokeWidth="10" className="text-black/5 dark:text-white/10" />
                <circle
                  cx="64"
                  cy="64"
                  r={RING_RADIUS}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={RING_LENGTH}
                  strokeDashoffset={ringOffset}
                  className="animate-ring-fill"
                  style={{ ["--ring-length" as string]: RING_LENGTH, ["--ring-offset" as string]: ringOffset }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-slate-800 dark:text-white leading-none">
                  {fortune.overallScore}
                  <span className="text-base font-bold text-slate-400 ml-0.5">{t("points")}</span>
                </div>
                <div className="mt-1 text-sm font-bold" style={{ color: ringColor }}>
                  {levelName(fortune.overall)}
                </div>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 text-center break-keep">
              {l(fortune.overallText)}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1612] dark:bg-[#fff3e0] text-white dark:text-[#1f1612]">
              <span className="text-xs opacity-70">{t("keyword")}</span>
              <span className="text-sm font-black">{l(fortune.keyword)}</span>
            </div>
          </div>
        </section>

        {/* 타고난 기운 */}
        <section className={`${cardClass} p-5 mb-4`}>
          <h2 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-3">{t("innate")}</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#fdebd3] dark:bg-[#4a3220] flex items-center justify-center text-xl">{fortune.animal.emoji}</div>
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">{animalName}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep">{l(fortune.animal.trait)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#e8ecf9] dark:bg-[#2b3250] flex items-center justify-center text-xl text-[#2f3f8f] dark:text-[#b9c4f5]">{fortune.sign.symbol}</div>
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">{signName}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep">{l(fortune.sign.trait)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 영역별 운세 */}
        <section className={`${cardClass} p-5 mb-4`}>
          <h2 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-4">{t("byCategory")}</h2>
          <div className="space-y-5">
            {fortuneCategories.map((c) => {
              const score = fortune.scores[c.id];
              const colors = categoryColor[c.id];
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.emoji}</span>
                      <span className="font-bold text-slate-800 dark:text-white">{l(c.name)}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.chip}`}>{levelName(score)}</span>
                  </div>
                  {/* 5칸 막대 */}
                  <div className="flex gap-1 mb-2" role="img" aria-label={`${l(c.name)} ${score}/5`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i <= score ? colors.bar : "bg-black/5 dark:bg-white/10"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep">{l(fortune.texts[c.id])}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 오늘의 행운 */}
        <section className={`${cardClass} p-5 mb-4`}>
          <h2 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-4">{t("lucky")}</h2>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className={`${innerBoxClass} p-3 text-center`}>
              <div className="text-2xl font-black text-[#c62f26] dark:text-[#f0c060] leading-none mb-1">{fortune.luckyNumber}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("luckyNumber")}</div>
            </div>
            <div className={`${innerBoxClass} p-3 text-center`}>
              <div className="flex justify-center mb-1">
                <span
                  className="inline-block w-6 h-6 rounded-full border border-black/10 dark:border-white/20"
                  style={{ backgroundColor: luckyColorHex[fortune.luckyColor] }}
                  aria-hidden
                />
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{colorName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("luckyColor")}</div>
            </div>
            <div className={`${innerBoxClass} p-3 text-center`}>
              <div className="text-xl leading-none mb-1">🧭</div>
              <div className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{directionName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("luckyDirection")}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`${innerBoxClass} p-3 flex items-center gap-3`}>
              <span className="text-xl">🕐</span>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("luckyTime")}</div>
                <div className="text-sm font-bold text-slate-800 dark:text-white break-keep">{l(fortune.luckyTime)}</div>
              </div>
            </div>
            <div className={`${innerBoxClass} p-3 flex items-center gap-3`}>
              <span className="text-xl">{fortune.luckyItem.emoji}</span>
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("luckyItem")}</div>
                <div className="text-sm font-bold text-slate-800 dark:text-white break-keep">{l(fortune.luckyItem.name)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 살릴 것 · 조심할 것 */}
        <section className="grid gap-3 mb-5">
          <div className="rounded-3xl p-5 bg-[#e6f6ec] dark:bg-[#1e3a2a] border border-[#bfe3cd] dark:border-[#2f5a40]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#1f6b43] dark:text-[#9fe0bb]">💡 {t("advice")}</span>
              <span className="text-[11px] text-[#1f6b43]/70 dark:text-[#9fe0bb]/70">{t("adviceFrom")} · {categoryName(fortune.bestCategory)}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-keep">{l(fortune.advice)}</p>
          </div>
          <div className="rounded-3xl p-5 bg-[#fdebd3] dark:bg-[#4a3220] border border-[#f0cf9a] dark:border-[#6b4a2c]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#8a3b12] dark:text-[#f3cf8a]">⚠️ {t("caution")}</span>
              <span className="text-[11px] text-[#8a3b12]/70 dark:text-[#f3cf8a]/70">{t("cautionFrom")} · {categoryName(fortune.weakCategory)}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-keep">{l(fortune.caution)}</p>
          </div>
        </section>

        {/* 공유 */}
        <div className={`${cardClass} p-4 mb-4`}>
          <ShareButtons title={shareTitle} description={shareDescription} emoji={fortune.animal.emoji} />
        </div>

        <AdUnit />

        {/* 다시 보기 / 홈 */}
        <div className="grid grid-cols-2 gap-3 mt-4 mb-3">
          <button type="button" onClick={onRetry} className={secondaryButtonClass}>
            {t("retry")}
          </button>
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c62f26] to-[#e0702a] text-white font-bold text-center shadow-md hover:shadow-lg transition-shadow"
          >
            {t("home")}
          </Link>
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-2 break-keep">{t("refreshNote")}</p>
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mb-8 break-keep">{t("disclaimer")}</p>

        <RecommendedTests currentTestId="fortune" />
      </div>
    </main>
  );
}
