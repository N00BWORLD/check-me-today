"use client";

// 관상 유형별 정적 페이지(/face-reading/types/[type]) 본문
// 유형 설명 전문 → 장점 → 조언 → 행운 정보 → 어울리는 유형 → 이 유형이 나오기 쉬운 얼굴 특징 → 관련 부위 가이드 → 다른 유형
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { traitInfo, type FaceReadingResult, type LocalizedText } from "@/data/face-reading";
import { FACE_GUIDE_PATH, FACE_READING_PATH, faceGuideTexts, getFaceGuidePath, getFaceTypePath } from "@/data/face-reading-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import { TypeImage } from "@/app/face-reading/_components/ui";
import { colorNames } from "@/app/face-reading/_components/texts";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { AnalyzeCta, gcls, GuideBreadcrumb, GuideDisclaimer, Paragraphs, SectionHeading } from "./guideUi";
import type { PartSummary, TypeSummary } from "./summaries";

/** 부위별로 이 유형이 가장 잘 나오는 선택지 (서버에서 계산해 넘긴다) */
export interface FeatureHighlight {
  featureName: LocalizedText;
  optionLabel: LocalizedText;
  optionDescription: LocalizedText;
  emoji: string;
  /** 그 부위의 가이드 페이지 id (없으면 링크 없음) */
  guideId?: string;
}

interface Props {
  result: FaceReadingResult;
  highlights: FeatureHighlight[];
  compatible: TypeSummary[];
  family: TypeSummary[];
  guides: PartSummary[];
}

export default function FaceTypeView({ result, highlights, compatible, family, guides }: Props) {
  const { t, lang } = useLanguage();
  const colorName = colorNames[result.luckyColor.toUpperCase()] ?? colorNames[result.luckyColor];

  return (
    <main className={gcls.page}>
      <div className={gcls.container}>
        <GuideBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { href: FACE_GUIDE_PATH, label: faceGuideTexts.guideCrumb },
            { label: result.type },
          ]}
        />

        {/* 유형 머리 */}
        <header className={`${gcls.card} overflow-hidden !p-0 mb-6 animate-fade-in`}>
          <div className="ink-header px-6 py-8 text-center">
            <TypeImage id={result.id} emoji={result.emoji} alt={t(result.type)} className="w-52 h-52" />
            <p className="text-[#e2c17a] text-[20px] tracking-[0.3em] font-serif mb-2" aria-hidden="true">
              {result.hanja}
            </p>
            <h1 className={`${gcls.h1} !text-[#fbf7ee] !text-[40px]`}>{t(result.type)}</h1>
            <p className="text-[#f6efe0] text-[20px] mt-3 break-keep">{t(result.title)}</p>
          </div>
          <div className="px-5 sm:px-7 py-5">
            <p className={`${gcls.h3} text-center mb-4`}>{t(result.subtitle)}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className={`${gcls.inner} !py-2 text-[15px]`}>
                {t(faceGuideTexts.primaryTrait)}: <strong>{traitInfo[result.primaryTrait].emoji} {t(traitInfo[result.primaryTrait].label)}</strong>
              </span>
              <span className={`${gcls.inner} !py-2 text-[15px]`}>
                {t(faceGuideTexts.secondaryTrait)}: <strong>{traitInfo[result.secondaryTrait].emoji} {t(traitInfo[result.secondaryTrait].label)}</strong>
              </span>
            </div>
            <Paragraphs text={t(result.description)} />
          </div>
        </header>

        {/* 타고난 장점 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="type-strengths">
          <SectionHeading id="type-strengths" mark="長">
            {t(faceGuideTexts.strengths)}
          </SectionHeading>
          <ul className="grid grid-cols-2 gap-2">
            {(result.strengths[lang] ?? result.strengths.ko).map((s) => (
              <li key={s} className={`${gcls.inner} !py-3 text-[17px] font-bold text-stone-900 dark:text-stone-50 break-keep`}>
                <span aria-hidden="true">✔ </span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 관상가의 한마디 + 행운 정보 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="type-advice">
          <SectionHeading id="type-advice" mark="言">
            {t(faceGuideTexts.advice)}
          </SectionHeading>
          <blockquote className={`${gcls.inner} ${gcls.body} border-l-4 border-l-[#8b1a1a] dark:border-l-[#e2c17a]`}>
            “{t(result.advice)}”
          </blockquote>
          <dl className="grid grid-cols-2 gap-3 mt-4">
            <div className={gcls.inner}>
              <dt className={gcls.muted}>{t(faceGuideTexts.luckyColor)}</dt>
              <dd className="flex items-center gap-2 mt-1 text-[18px] font-bold text-stone-900 dark:text-stone-50">
                <span className="inline-block w-6 h-6 rounded-full border border-black/20" style={{ backgroundColor: result.luckyColor }} aria-hidden="true" />
                {colorName ? t(colorName) : result.luckyColor}
              </dd>
            </div>
            <div className={gcls.inner}>
              <dt className={gcls.muted}>{t(faceGuideTexts.luckyDirection)}</dt>
              <dd className="mt-1 text-[18px] font-bold text-stone-900 dark:text-stone-50">🧭 {t(result.luckyDirection)}</dd>
            </div>
          </dl>
        </section>

        {/* 나도 분석해 보기 */}
        <AnalyzeCta label={faceGuideTexts.ctaMine} className="mb-6" />

        {/* 광고: 유형 콘텐츠 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 어울리는 유형 */}
        {compatible.length > 0 && (
          <section className={`${gcls.card} mb-6`} aria-labelledby="type-match">
            <SectionHeading id="type-match" mark="合">
              {t(faceGuideTexts.goodMatch)}
            </SectionHeading>
            <ul className="grid grid-cols-2 gap-3">
              {compatible.map((r) => (
                <li key={r.id}>
                  <Link
                    href={getFaceTypePath(r.id)}
                    className={`block h-full ${gcls.inner} text-center hover:bg-white/80 dark:hover:bg-[#2b251d] transition-colors ${gcls.focus}`}
                  >
                    <TypeImage id={r.id} emoji={r.emoji} alt="" size={96} className="w-24 h-24 my-0 mb-2 rounded-2xl border-2" />
                    <p className={`${gcls.accent} text-[14px] font-serif tracking-widest`} aria-hidden="true">
                      {r.hanja}
                    </p>
                    <p className={`${gcls.h3} text-[18px]`}>{t(r.type)}</p>
                    <p className={`${gcls.muted} text-[14px] mt-1`}>{t(r.subtitle)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 이 유형이 나오기 쉬운 얼굴 특징 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="type-features">
          <SectionHeading id="type-features" mark="貌">
            {t(faceGuideTexts.featuresSection)}
          </SectionHeading>
          <p className={`${gcls.muted} mb-4`}>{t(faceGuideTexts.featuresNote)}</p>
          <ul className="space-y-3">
            {highlights.map((h, i) => (
              <li key={i} className={`${gcls.inner} flex gap-3 items-start`}>
                <span className="text-[28px] leading-none shrink-0" aria-hidden="true">
                  {h.emoji}
                </span>
                <div className="min-w-0">
                  <p className={gcls.h3}>
                    {h.guideId ? (
                      <Link href={getFaceGuidePath(h.guideId)} className={gcls.link}>
                        {t(h.featureName)}
                      </Link>
                    ) : (
                      t(h.featureName)
                    )}
                    <span className="mx-2 text-stone-400" aria-hidden="true">
                      ›
                    </span>
                    {t(h.optionLabel)}
                  </p>
                  <p className={`${gcls.muted} mt-1`}>{t(h.optionDescription)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 관련 부위 가이드 */}
        {guides.length > 0 && (
          <section className={`${gcls.card} mb-6`} aria-labelledby="type-guides">
            <SectionHeading id="type-guides" mark="部">
              {t(faceGuideTexts.relatedGuidesSection)}
            </SectionHeading>
            <ul className="space-y-2">
              {guides.map((p) => (
                <li key={p.id}>
                  <Link
                    href={getFaceGuidePath(p.id)}
                    className={`flex items-center gap-3 ${gcls.inner} !py-3 hover:bg-white/80 dark:hover:bg-[#2b251d] transition-colors ${gcls.focus}`}
                  >
                    <span className={`${gcls.accent} text-[22px] font-serif shrink-0`} aria-hidden="true">
                      {p.hanja}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[17px] font-bold text-stone-900 dark:text-stone-50 break-keep">{t(p.heading)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 같은 운이 1등인 다른 유형 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="type-family">
          <SectionHeading id="type-family" mark="他">
            {t(faceGuideTexts.sameFamily)}
          </SectionHeading>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {family.map((r) => (
              <li key={r.id}>
                <Link
                  href={getFaceTypePath(r.id)}
                  aria-current={r.id === result.id ? "page" : undefined}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${gcls.focus} ${
                    r.id === result.id ? "bg-[#f6efe0] dark:bg-[#1f1a14] font-bold" : "hover:bg-[#f6efe0] dark:hover:bg-[#1f1a14]"
                  }`}
                >
                  <TypeImage id={r.id} emoji={r.emoji} alt="" size={48} className="w-12 h-12 my-0 rounded-xl border" />
                  <span className="text-[16px] text-stone-900 dark:text-stone-50 break-keep">{t(r.type)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right">
            <Link href={`${FACE_GUIDE_PATH}#hub-types`} className={`text-[16px] font-bold ${gcls.link}`}>
              {t(faceGuideTexts.allTypesLink)} →
            </Link>
          </p>
        </section>

        <AnalyzeCta label={faceGuideTexts.ctaMine} className="mb-6" />
        <GuideDisclaimer />
        <RecommendedTests currentTestId="face-reading" />
      </div>
    </main>
  );
}
