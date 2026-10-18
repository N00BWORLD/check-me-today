"use client";

// 관상 허브 페이지(/face-reading/guide) 본문: 소개글 → 부위별 가이드 목록 → 유형 30종 목록 → 테스트 소개 → FAQ
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { traitInfo, traitOrder, type TraitKey } from "@/data/face-reading";
import { FACE_READING_PATH, faceGuideHub, faceGuideTexts, getFaceGuidePath, getFaceTypePath } from "@/data/face-reading-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import { TypeImage } from "@/app/face-reading/_components/ui";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { AnalyzeCta, gcls, GuideBreadcrumb, GuideDisclaimer, Paragraphs, SectionHeading } from "./guideUi";
import type { PartSummary, TypeSummary } from "./summaries";

interface Props {
  parts: PartSummary[];
  types: TypeSummary[];
}

export default function FaceGuideHub({ parts, types }: Props) {
  const { t } = useLanguage();
  const introParas = t(faceGuideHub.intro).split(/\n\n+/);
  // 소개글 앞 3문단은 머리에, 마지막 문단(테스트 안내)은 테스트 소개 섹션에
  const introHead = introParas.slice(0, -1).join("\n\n");
  const introTail = introParas[introParas.length - 1];

  // 유형 30종을 1등 운별로 묶는다
  const families = traitOrder.map((trait) => ({
    trait,
    items: types.filter((r) => r.primaryTrait === trait),
  }));

  return (
    <main className={gcls.page}>
      <div className={gcls.container}>
        <GuideBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { label: faceGuideTexts.guideCrumb },
          ]}
        />

        <header className={`${gcls.card} overflow-hidden !p-0 mb-6 animate-fade-in`}>
          <div className="ink-header px-6 py-7 text-center">
            <p className="text-[#e2c17a] text-[20px] tracking-[0.4em] font-serif mb-3" aria-hidden="true">
              觀相
            </p>
            <h1 className={`${gcls.h1} !text-[#fbf7ee]`}>{t(faceGuideHub.heading)}</h1>
          </div>
          <div className="px-5 sm:px-7 py-5">
            <Paragraphs text={introHead} />
          </div>
        </header>

        <AnalyzeCta className="mb-6" />

        {/* 부위별 가이드 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="hub-parts">
          <SectionHeading id="hub-parts" mark="部">
            {t(faceGuideTexts.partsSection)}
          </SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {parts.map((p) => (
              <li key={p.id}>
                <Link
                  href={getFaceGuidePath(p.id)}
                  className={`flex gap-4 items-start h-full ${gcls.inner} hover:bg-white/80 dark:hover:bg-[#2b251d] transition-colors ${gcls.focus}`}
                >
                  <span
                    className="shrink-0 w-14 h-14 rounded-2xl ink-stamp flex items-center justify-center text-[#fbf7ee] text-[26px] font-serif"
                    aria-hidden="true"
                  >
                    {p.hanja}
                  </span>
                  <span className="min-w-0">
                    <span className={`${gcls.h3} block`}>
                      <span aria-hidden="true">{p.emoji} </span>
                      {t(p.name)}
                    </span>
                    <span className={`${gcls.muted} block mt-1 text-[15px]`}>{t(p.heading)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 광고: 가이드 목록 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 유형 30종 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="hub-types">
          <SectionHeading id="hub-types" mark="類">
            {t(faceGuideTexts.typesSection)}
          </SectionHeading>
          <div className="space-y-6">
            {families.map(({ trait, items }) => (
              <div key={trait}>
                <h3 className={`${gcls.h3} mb-3`}>
                  <span aria-hidden="true">{traitInfo[trait as TraitKey].emoji} </span>
                  {t(traitInfo[trait as TraitKey].label)}
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {items.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={getFaceTypePath(r.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl hover:bg-[#f6efe0] dark:hover:bg-[#1f1a14] transition-colors ${gcls.focus}`}
                      >
                        <TypeImage id={r.id} emoji={r.emoji} alt="" size={48} className="w-12 h-12 my-0 rounded-xl border" />
                        <span className="min-w-0">
                          <span className="block text-[16px] font-bold text-stone-900 dark:text-stone-50 break-keep">{t(r.type)}</span>
                          <span className={`block text-[12px] ${gcls.accent} font-serif tracking-wider`} aria-hidden="true">
                            {r.hanja}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 테스트 소개 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="hub-test">
          <SectionHeading id="hub-test" mark="試">
            {t(faceGuideTexts.aboutTestSection)}
          </SectionHeading>
          <Paragraphs text={introTail} />
          <AnalyzeCta className="mt-5" />
        </section>

        {/* FAQ */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="hub-faq">
          <SectionHeading id="hub-faq" mark="問">
            {t(faceGuideTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-4">
            {faceGuideHub.faq.map((f, i) => (
              <div key={i} className={gcls.inner}>
                <dt className={`${gcls.h3} mb-2`}>Q. {t(f.question)}</dt>
                <dd className={gcls.body}>{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <GuideDisclaimer />
        <RecommendedTests currentTestId="face-reading" />
      </div>
    </main>
  );
}
