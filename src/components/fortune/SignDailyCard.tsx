"use client";

// 오늘의 띠(또는 별자리) 공통 운세 카드
// - generateSignFortune(): 띠·별자리 id + 오늘 날짜만 시드로 쓰므로 같은 띠는 하루 동안 같은 결과를 본다
// - 날짜는 사용자 기기 기준이라 서버 HTML 과 어긋날 수 있어, 마운트 뒤 효과 안에서 계산한다 (hydration 안전)
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fortuneCategories, fortuneLevelNames, luckyColorHex, luckyColors, luckyDirections, type LText } from "@/data/fortunes";
import { fillText, firstSentence, fortuneSignTexts, generateSignFortune, type SignDailyFortune, type SignKind } from "@/data/fortune-signs";
import { categoryColor, innerBoxClass, overallColor } from "@/app/fortune/_components/styles";
import { scls } from "./signUi";

interface Props {
  kind: SignKind;
  id: string;
  name: LText;
}

export default function SignDailyCard({ kind, id, name }: Props) {
  const { lang, t } = useLanguage();
  const l = (text: LText) => text[lang] || text.en;
  const [fortune, setFortune] = useState<SignDailyFortune | null>(null);

  useEffect(() => {
    // 오늘 날짜는 클라이언트에서만 확정되므로 효과 안에서 1회 계산한다
    setFortune(generateSignFortune(kind, id));
  }, [kind, id]);

  const signName = l(name);
  const heading = fillText(t(fortuneSignTexts.todayHeading), { name: signName });

  if (!fortune) {
    return (
      <section className={`${scls.card} mb-4`} aria-busy="true">
        <h2 className={`${scls.h2} mb-3`}>{heading}</h2>
        <div className="space-y-3 animate-pulse" aria-hidden="true">
          <div className="h-24 rounded-2xl bg-black/5 dark:bg-white/10" />
          <div className="h-4 w-3/4 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-4 w-1/2 rounded bg-black/5 dark:bg-white/10" />
        </div>
        <p className={`${scls.muted} mt-3`}>{t(fortuneSignTexts.loading)}</p>
      </section>
    );
  }

  const locale = lang === "ko" ? "ko-KR" : lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en-US";
  const dateLabel = new Date(`${fortune.date}T00:00:00`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const levelName = (score: number) => l(fortuneLevelNames[score]);
  const ringColor = overallColor[fortune.overall];
  const colorName = luckyColors[fortune.luckyColor][lang] || luckyColors[fortune.luckyColor].en;
  const directionName = luckyDirections[fortune.luckyDirection][lang] || luckyDirections[fortune.luckyDirection].en;

  return (
    <section className={`${scls.card} mb-4 animate-fade-in`} aria-labelledby="sign-today">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h2 id="sign-today" className={scls.h2}>
          {heading}
        </h2>
        <time dateTime={fortune.date} className="shrink-0 text-xs text-slate-500 dark:text-slate-400 mt-1">
          {dateLabel}
        </time>
      </div>

      {/* 종합운 */}
      <div className={`${innerBoxClass} p-4 flex items-center gap-4 mb-4`}>
        <div className="shrink-0 w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center" style={{ borderColor: ringColor }}>
          <div className="text-2xl font-black text-slate-800 dark:text-white leading-none">
            {fortune.overallScore}
            <span className="text-[11px] font-bold text-slate-400 ml-0.5">{t(fortuneSignTexts.points)}</span>
          </div>
          <div className="text-[11px] font-bold mt-1" style={{ color: ringColor }}>
            {levelName(fortune.overall)}
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-1">{t(fortuneSignTexts.overall)}</div>
          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 break-keep">{l(fortune.overallText)}</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1612] dark:bg-[#fff3e0] text-white dark:text-[#1f1612]">
            <span className="text-[11px] opacity-70">{t(fortuneSignTexts.keyword)}</span>
            <span className="text-sm font-black">{l(fortune.keyword)}</span>
          </div>
        </div>
      </div>

      {/* 영역별 한 줄 */}
      <ul className="space-y-3 mb-4">
        {fortuneCategories.map((c) => {
          const score = fortune.scores[c.id];
          const colors = categoryColor[c.id];
          return (
            <li key={c.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <span className={scls.h3}>{l(c.name)}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.chip}`}>{levelName(score)}</span>
              </div>
              <div className="flex gap-1 mb-1.5" role="img" aria-label={`${l(c.name)} ${score}/5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= score ? colors.bar : "bg-black/5 dark:bg-white/10"}`} />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep">{firstSentence(l(fortune.texts[c.id]))}</p>
            </li>
          );
        })}
      </ul>

      {/* 행운 요소 */}
      <div className="grid grid-cols-3 gap-2">
        <div className={`${innerBoxClass} p-3 text-center`}>
          <div className="text-2xl font-black text-[#c62f26] dark:text-[#f0c060] leading-none mb-1">{fortune.luckyNumber}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{t(fortuneSignTexts.luckyNumber)}</div>
        </div>
        <div className={`${innerBoxClass} p-3 text-center`}>
          <div className="flex justify-center mb-1">
            <span
              className="inline-block w-6 h-6 rounded-full border border-black/10 dark:border-white/20"
              style={{ backgroundColor: luckyColorHex[fortune.luckyColor] }}
              aria-hidden="true"
            />
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{colorName}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{t(fortuneSignTexts.luckyColor)}</div>
        </div>
        <div className={`${innerBoxClass} p-3 text-center`}>
          <div className="text-xl leading-none mb-1" aria-hidden="true">
            🧭
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{directionName}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{t(fortuneSignTexts.luckyDirection)}</div>
        </div>
      </div>

      <p className={`${scls.muted} mt-3 text-xs`}>{fillText(t(fortuneSignTexts.todayNote), { name: signName })}</p>
    </section>
  );
}
