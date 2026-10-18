"use client";

// 띠별·별자리별 운세 허브 페이지(/fortune/zodiac, /fortune/star) 본문
// 순서: 빵부스러기 → 제목·소개 → (띠: 올해의 띠) → 12개 목록 → 계산법 → FAQ → 내 이름으로 보기 CTA → 다른 허브 링크
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { LText } from "@/data/fortunes";
import {
  fillText,
  FORTUNE_PATH,
  FORTUNE_STAR_PATH,
  FORTUNE_ZODIAC_PATH,
  formatStarSignRange,
  fortuneSignTexts,
  type SignHubContent,
  type SignKind,
} from "@/data/fortune-signs";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";
import { Paragraphs, PersonalCta, scls, SectionHeading, SignBreadcrumb, SignDisclaimer, type SignSummary } from "./signUi";

/** 허브 목록 한 항목 */
export interface HubItem extends SignSummary {
  trait: LText;
  /** 띠: 해당 연도 목록 */
  years?: number[];
}

interface Props {
  kind: SignKind;
  hub: SignHubContent;
  items: HubItem[];
  /** 띠 허브: 올해의 띠 (서버에서 계산해 넘긴다) */
  thisYear?: { year: number; name: LText };
}

export default function SignHubView({ kind, hub, items, thisYear }: Props) {
  const { lang, t } = useLanguage();
  const isZodiac = kind === "zodiac";
  const crossPath = isZodiac ? FORTUNE_STAR_PATH : FORTUNE_ZODIAC_PATH;
  const icon = isZodiac ? scls.iconZodiac : scls.iconStar;

  return (
    <main className={scls.page}>
      <div className={scls.container}>
        <SignBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: FORTUNE_PATH, label: fortuneSignTexts.fortuneCrumb },
            { label: isZodiac ? fortuneSignTexts.zodiacCrumb : fortuneSignTexts.starCrumb },
          ]}
        />

        {/* 머리 */}
        <header className={`${scls.card} mb-4 animate-fade-in`}>
          <div className="text-4xl mb-3" aria-hidden="true">
            {isZodiac ? "🐯" : "♌"}
          </div>
          <h1 className={scls.h1}>{t(hub.heading)}</h1>
          <div className="mt-4">
            <Paragraphs text={t(hub.intro)} />
          </div>
          {thisYear && (
            <p className={`${scls.chipZodiac} mt-4`}>
              {fillText(t(fortuneSignTexts.thisYear), { year: thisYear.year, name: t(thisYear.name) })}
            </p>
          )}
        </header>

        {/* 12개 목록 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="hub-list">
          <SectionHeading id="hub-list" mark={isZodiac ? "🐾" : "⭐"}>
            {t(isZodiac ? fortuneSignTexts.zodiacListSection : fortuneSignTexts.starListSection)}
          </SectionHeading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-start gap-3 h-full p-3 rounded-2xl border border-[#eadbc0] dark:border-[#5a4030] bg-white/70 dark:bg-[#1f1612] hover:bg-white dark:hover:bg-[#352720] transition-colors ${scls.focus}`}
                >
                  <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-2xl ${icon}`} aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-slate-800 dark:text-white break-keep">
                      {fillText(t(fortuneSignTexts.todayHeading), { name: t(item.name) })}
                    </span>
                    <span className="block text-xs text-[#b3261e] dark:text-[#f0c060] font-semibold mt-0.5">
                      {isZodiac ? item.years?.join(" · ") : formatStarSignRange(item.id, lang)}
                    </span>
                    <span className="block text-[13px] text-slate-600 dark:text-slate-300 leading-snug break-keep mt-1">{t(item.trait)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 광고 */}
        <div className="mb-4">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 계산법 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="hub-howto">
          <SectionHeading id="hub-howto" mark="🔎">
            {t(hub.howToTitle)}
          </SectionHeading>
          <Paragraphs text={t(hub.howTo)} />
        </section>

        {/* FAQ */}
        <section className={`${scls.card} mb-6`} aria-labelledby="hub-faq">
          <SectionHeading id="hub-faq" mark="❓">
            {t(fortuneSignTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-3">
            {hub.faq.map((f, i) => (
              <div key={i} className={scls.inner}>
                <dt className={`${scls.h3} mb-1.5`}>Q. {t(f.question)}</dt>
                <dd className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 break-keep">{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <PersonalCta className="mb-6" />

        <p className="text-center">
          <Link href={crossPath} className={`${scls.link} text-sm`}>
            {t(isZodiac ? fortuneSignTexts.crossStar : fortuneSignTexts.crossZodiac)} →
          </Link>
        </p>

        <SignDisclaimer />
      </div>
    </main>
  );
}
