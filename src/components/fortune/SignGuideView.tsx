"use client";

// 띠별·별자리별 운세 상세 페이지(/fortune/zodiac/[animal], /fortune/star/[sign]) 본문
// 서버가 한국어로 렌더링한 HTML 을 검색엔진이 읽고, 클라이언트에서 사용자의 언어로 바뀐다.
// 순서: 빵부스러기 → 머리(기호·제목·한 줄 기운·연도/날짜) → 오늘의 공통 운세 → 내 이름으로 보기 CTA → 광고
//       → 성격과 강점 → 어울리는 사람과 일 → 올해의 흐름 → FAQ → 다른 띠/별자리 → 추천 테스트
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { LText } from "@/data/fortunes";
import {
  FORTUNE_PATH,
  FORTUNE_STAR_PATH,
  FORTUNE_ZODIAC_PATH,
  formatStarSignRange,
  fortuneSignTexts,
  type SignFaq,
  type SignGuide,
  type SignKind,
} from "@/data/fortune-signs";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import SignDailyCard from "./SignDailyCard";
import { Paragraphs, PersonalCta, scls, SectionHeading, SignBreadcrumb, SignDisclaimer, SignLinkGrid, type SignSummary } from "./signUi";

interface Props {
  kind: SignKind;
  id: string;
  /** 띠는 이모지, 별자리는 유니코드 기호 */
  symbol: string;
  name: LText;
  /** 타고난 기운 한 문장 (fortunes.ts 의 trait) */
  trait: LText;
  guide: SignGuide;
  /** 화면과 JSON-LD 에 같이 쓰는 FAQ (띠는 연도 FAQ 가 앞에 붙는다) */
  faq: SignFaq[];
  /** 띠: 지지 한자 */
  hanja?: string;
  /** 별자리: 원소 */
  element?: LText;
  /** 띠: 해당 연도 목록 */
  years?: number[];
  /** 같은 종류의 12개 (현재 항목 포함) */
  siblings: SignSummary[];
}

export default function SignGuideView({ kind, id, symbol, name, trait, guide, faq, hanja, element, years, siblings }: Props) {
  const { lang, t } = useLanguage();
  const isZodiac = kind === "zodiac";
  const hubPath = isZodiac ? FORTUNE_ZODIAC_PATH : FORTUNE_STAR_PATH;
  const crossPath = isZodiac ? FORTUNE_STAR_PATH : FORTUNE_ZODIAC_PATH;
  const chip = isZodiac ? scls.chipZodiac : scls.chipStar;
  const icon = isZodiac ? scls.iconZodiac : scls.iconStar;
  // 페이지 제목: "호랑이띠 오늘의 운세" (metadata.title 과 같은 문구)
  const title = fillName(t(fortuneSignTexts.pageHeading), t(name));

  return (
    <main className={scls.page}>
      <div className={scls.container}>
        <SignBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: FORTUNE_PATH, label: fortuneSignTexts.fortuneCrumb },
            { href: hubPath, label: isZodiac ? fortuneSignTexts.zodiacCrumb : fortuneSignTexts.starCrumb },
            { label: name },
          ]}
        />

        {/* 머리 */}
        <header className={`${scls.card} mb-4 animate-fade-in`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-4xl ${icon}`} aria-hidden="true">
              {symbol}
            </div>
            <div className="min-w-0">
              <h1 className={scls.h1}>{title}</h1>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {hanja && (
                  <span className={chip} aria-label={`${t(name)} ${hanja}`}>
                    {hanja}
                  </span>
                )}
                {element && <span className={chip}>{t(element)}</span>}
                {!isZodiac && <span className={chip}>{formatStarSignRange(id, lang)}</span>}
              </div>
            </div>
          </div>
          <p className={`${scls.body} mt-4`}>{t(trait)}</p>

          {/* 띠: 해당 연도 */}
          {years && years.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-2">{t(fortuneSignTexts.yearsLabel)}</div>
              <ul className="flex flex-wrap gap-1.5">
                {years.map((y) => (
                  <li key={y} className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-[#1f1612] border border-[#eadbc0] dark:border-[#5a4030] text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {y}
                  </li>
                ))}
              </ul>
              <p className={`${scls.muted} mt-2 text-xs`}>{t(fortuneSignTexts.yearsNote)}</p>
            </div>
          )}
        </header>

        {/* 오늘의 공통 운세 */}
        <SignDailyCard kind={kind} id={id} name={name} />

        {/* 내 이름으로 자세히 보기 */}
        <PersonalCta className="mb-6" />

        {/* 광고 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 성격과 강점 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="sign-personality">
          <SectionHeading id="sign-personality" mark="✨">
            {t(fortuneSignTexts.personalitySection)}
          </SectionHeading>
          <Paragraphs text={t(guide.personality)} />
        </section>

        {/* 어울리는 사람과 일 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="sign-match">
          <SectionHeading id="sign-match" mark="🤝">
            {t(fortuneSignTexts.matchSection)}
          </SectionHeading>
          <Paragraphs text={t(guide.match)} />
        </section>

        {/* 올해의 흐름 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="sign-year">
          <SectionHeading id="sign-year" mark="📅">
            {t(fortuneSignTexts.yearFlowSection)}
          </SectionHeading>
          <Paragraphs text={t(guide.yearFlow)} />
        </section>

        {/* 자주 묻는 질문 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="sign-faq">
          <SectionHeading id="sign-faq" mark="❓">
            {t(fortuneSignTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-3">
            {faq.map((f, i) => (
              <div key={i} className={scls.inner}>
                <dt className={`${scls.h3} mb-1.5`}>Q. {t(f.question)}</dt>
                <dd className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 break-keep">{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 다른 띠 / 별자리 */}
        <section className={`${scls.card} mb-4`} aria-labelledby="sign-others">
          <SectionHeading id="sign-others" mark={isZodiac ? "🐾" : "⭐"}>
            {t(isZodiac ? fortuneSignTexts.otherZodiac : fortuneSignTexts.otherStar)}
          </SectionHeading>
          <SignLinkGrid kind={kind} items={siblings} currentId={id} />
          <p className="mt-4 text-center">
            <Link href={crossPath} className={`${scls.link} text-sm`}>
              {t(isZodiac ? fortuneSignTexts.crossStar : fortuneSignTexts.crossZodiac)} →
            </Link>
          </p>
        </section>

        <SignDisclaimer />

        <div className="mt-8">
          <RecommendedTests currentTestId="fortune" />
        </div>
      </div>
    </main>
  );
}

/** "{name}" 자리표시자만 채우는 가벼운 헬퍼 (데이터 모듈의 fillText 와 같은 규칙) */
function fillName(template: string, name: string): string {
  return template.replace("{name}", name);
}
