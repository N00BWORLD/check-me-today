"use client";

// 유형 페이지(/test/types/[type]) 본문: Solar 또는 Lunar 우세 유형 설명 전문
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ENERGY_GUIDE_PATH,
  ENERGY_TEST_PATH,
  energyGuideTexts,
  getEnergyTraitPath,
  getEnergyTypePath,
  type EnergyTypeGuide,
} from "@/data/energy-balance-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { EbBreadcrumb, EbDisclaimer, ecls, Paragraphs, poleStyle, SectionHeading, TestCta } from "./ebUi";
import type { TraitSummary, TypeSummary } from "./summaries";

interface Props {
  guide: EnergyTypeGuide;
  /** 이 유형을 이루는 세 차원 */
  traits: TraitSummary[];
  otherType: TypeSummary;
}

export default function EnergyTypeView({ guide, traits, otherType }: Props) {
  const { t, lang } = useLanguage();
  const pole = poleStyle[guide.type];
  const strengths = guide.strengths[lang] ?? guide.strengths.ko;
  const cautions = guide.cautions[lang] ?? guide.cautions.ko;

  return (
    <main className={ecls.page}>
      <div className={ecls.container}>
        <EbBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: ENERGY_TEST_PATH, label: energyGuideTexts.testCrumb },
            { href: ENERGY_GUIDE_PATH, label: energyGuideTexts.guideCrumb },
            { label: guide.name },
          ]}
        />

        {/* 유형 머리 */}
        <header className={`${ecls.card} text-center relative overflow-hidden animate-fade-in`}>
          <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${pole.gradient} opacity-25 rounded-full blur-3xl`} aria-hidden="true" />
          <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${pole.gradient} opacity-15 rounded-full blur-3xl`} aria-hidden="true" />
          <div
            className={`relative w-28 h-28 mx-auto mb-5 rounded-full bg-gradient-to-br ${pole.gradient} flex items-center justify-center shadow-2xl ring-4 ring-white/40 dark:ring-slate-700/60`}
            aria-hidden="true"
          >
            <span className="text-6xl">{guide.emoji}</span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${pole.badge}`}>
            {guide.type} TYPE
          </span>
          <h1 className={ecls.h1}>{t(guide.heading)}</h1>
          <p className={`text-lg font-medium bg-gradient-to-r ${pole.gradient} bg-clip-text text-transparent mt-2`}>{t(guide.subtitle)}</p>
          <div className="mt-5 text-left">
            <Paragraphs text={t(guide.intro)} />
          </div>
        </header>

        {/* 강점 · 주의할 점 */}
        <section className={ecls.card} aria-labelledby="type-strengths">
          <SectionHeading id="type-strengths" emoji="✨">
            {t(energyGuideTexts.strengths)} · {t(energyGuideTexts.cautions)}
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <ul className={`${ecls.inner} space-y-2`}>
              {strengths.map((s) => (
                <li key={s} className={`${ecls.body} font-semibold`}>
                  <span className={pole.text} aria-hidden="true">✔ </span>
                  {s}
                </li>
              ))}
            </ul>
            <ul className={`${ecls.inner} space-y-2`}>
              {cautions.map((c) => (
                <li key={c} className={ecls.body}>
                  <span className="text-slate-400" aria-hidden="true">△ </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TestCta label={energyGuideTexts.ctaMine} className="mb-6" />

        {/* 광고: 유형 콘텐츠 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 상황별 */}
        <section className={ecls.card} aria-labelledby="type-scenes">
          <SectionHeading id="type-scenes" emoji="🧩">
            {t(energyGuideTexts.scenesSection)}
          </SectionHeading>
          <ul className="space-y-4">
            {guide.scenes.map((scene, i) => (
              <li key={i} className={ecls.inner}>
                <h3 className={`${ecls.h3} mb-2`}>{t(scene.name)}</h3>
                <p className={ecls.body}>{t(scene.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 성장 포인트 */}
        <section className={ecls.card} aria-labelledby="type-growth">
          <SectionHeading id="type-growth" emoji="🌱">
            {t(energyGuideTexts.growthSection)}
          </SectionHeading>
          <Paragraphs text={t(guide.growth)} />
        </section>

        {/* 이 유형을 이루는 세 차원 */}
        <section className={ecls.card} aria-labelledby="type-traits">
          <SectionHeading id="type-traits" emoji="🔎">
            {t(energyGuideTexts.typeTraitsSection)}
          </SectionHeading>
          <ul className="space-y-2">
            {traits.map((tr) => (
              <li key={tr.id}>
                <Link
                  href={getEnergyTraitPath(tr.id)}
                  className={`flex items-center gap-3 ${ecls.inner} !py-3 hover:bg-white/80 dark:hover:bg-slate-700/70 transition-colors ${ecls.focus}`}
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">
                    {tr.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className={`${ecls.h3} block`}>{t(tr.name)}</span>
                    <span className={`${ecls.muted} block`}>{t(tr.heading)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className={ecls.card} aria-labelledby="type-faq">
          <SectionHeading id="type-faq" emoji="❓">
            {t(energyGuideTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-4">
            {guide.faq.map((f, i) => (
              <div key={i} className={ecls.inner}>
                <dt className={`${ecls.h3} mb-2`}>Q. {t(f.question)}</dt>
                <dd className={ecls.body}>{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 다른 유형 */}
        <section className={ecls.card} aria-labelledby="type-other">
          <SectionHeading id="type-other" emoji={otherType.emoji}>
            {t(energyGuideTexts.otherTypeSection)}
          </SectionHeading>
          <Link
            href={getEnergyTypePath(otherType.id)}
            className={`flex items-center gap-4 ${ecls.inner} hover:bg-white/80 dark:hover:bg-slate-700/70 transition-colors ${ecls.focus}`}
          >
            <span
              className={`shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${poleStyle[otherType.type].gradient} flex items-center justify-center text-3xl shadow-lg`}
              aria-hidden="true"
            >
              {otherType.emoji}
            </span>
            <span className="min-w-0">
              <span className={`${ecls.h3} block`}>{t(otherType.name)}</span>
              <span className={`${ecls.muted} block mt-1`}>{t(otherType.subtitle)}</span>
            </span>
          </Link>
        </section>

        <TestCta label={energyGuideTexts.ctaMine} className="mb-6" />
        <EbDisclaimer />
        <RecommendedTests currentTestId="energy-balance" />
      </div>
    </main>
  );
}
