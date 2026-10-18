"use client";

// 성향 가이드 허브(/test/guide) 본문: 소개글 → 6가지 차원 → 2가지 유형 → 테스트 소개 → FAQ
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ENERGY_TEST_PATH, energyGuideHub, energyGuideTexts, getEnergyTraitPath, getEnergyTypePath } from "@/data/energy-balance-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { EbBreadcrumb, EbDisclaimer, ecls, Paragraphs, poleStyle, SectionHeading, TestCta } from "./ebUi";
import type { TraitSummary, TypeSummary } from "./summaries";

interface Props {
  traits: TraitSummary[];
  types: TypeSummary[];
}

export default function EnergyGuideHub({ traits, types }: Props) {
  const { t } = useLanguage();
  const paras = t(energyGuideHub.intro).split(/\n\n+/);
  // 마지막 문단(테스트 안내)은 테스트 소개 섹션에
  const introHead = paras.slice(0, -1).join("\n\n");
  const introTail = paras[paras.length - 1];

  return (
    <main className={ecls.page}>
      <div className={ecls.container}>
        <EbBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: ENERGY_TEST_PATH, label: energyGuideTexts.testCrumb },
            { label: energyGuideTexts.guideCrumb },
          ]}
        />

        <header className={`${ecls.card} relative overflow-hidden animate-fade-in`}>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl" aria-hidden="true" />
          <div className="relative text-center mb-5">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 ring-4 ring-white/30 dark:ring-slate-700/50" aria-hidden="true">
              <span className="text-4xl">⚖️</span>
            </div>
            <h1 className={ecls.h1}>{t(energyGuideHub.heading)}</h1>
          </div>
          <div className="relative">
            <Paragraphs text={introHead} />
          </div>
        </header>

        <TestCta className="mb-6" />

        {/* 6가지 차원 */}
        <section className={ecls.card} aria-labelledby="hub-traits">
          <SectionHeading id="hub-traits" emoji="🔎">
            {t(energyGuideTexts.traitsSection)}
          </SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {traits.map((tr) => (
              <li key={tr.id}>
                <Link
                  href={getEnergyTraitPath(tr.id)}
                  className={`flex gap-3 items-start h-full ${ecls.inner} hover:bg-white/80 dark:hover:bg-slate-700/70 transition-colors ${ecls.focus}`}
                >
                  <span
                    className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${poleStyle[tr.pole].gradient} flex items-center justify-center text-2xl shadow-md`}
                    aria-hidden="true"
                  >
                    {tr.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className={`${ecls.h3} block`}>{t(tr.name)}</span>
                    <span className={`${ecls.muted} block mt-1`}>{t(tr.heading)}</span>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[11px] font-bold ${poleStyle[tr.pole].badge}`}>
                      {tr.pole === "SOLAR" ? "☀️ SOLAR" : "🌙 LUNAR"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 광고: 차원 목록 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 2가지 유형 */}
        <section className={ecls.card} aria-labelledby="hub-types">
          <SectionHeading id="hub-types" emoji="☯️">
            {t(energyGuideTexts.typesSection)}
          </SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {types.map((ty) => (
              <li key={ty.id}>
                <Link
                  href={getEnergyTypePath(ty.id)}
                  className={`block h-full ${ecls.inner} text-center hover:bg-white/80 dark:hover:bg-slate-700/70 transition-colors ${ecls.focus}`}
                >
                  <span
                    className={`block w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${poleStyle[ty.type].gradient} flex items-center justify-center text-4xl shadow-lg`}
                    aria-hidden="true"
                  >
                    {ty.emoji}
                  </span>
                  <span className={`${ecls.h3} block`}>{t(ty.name)}</span>
                  <span className={`${ecls.muted} block mt-1`}>{t(ty.subtitle)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 테스트 소개 */}
        <section className={ecls.card} aria-labelledby="hub-test">
          <SectionHeading id="hub-test" emoji="📝">
            {t(energyGuideTexts.aboutTestSection)}
          </SectionHeading>
          <Paragraphs text={introTail} />
          <TestCta className="mt-5" />
        </section>

        {/* FAQ */}
        <section className={ecls.card} aria-labelledby="hub-faq">
          <SectionHeading id="hub-faq" emoji="❓">
            {t(energyGuideTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-4">
            {energyGuideHub.faq.map((f, i) => (
              <div key={i} className={ecls.inner}>
                <dt className={`${ecls.h3} mb-2`}>Q. {t(f.question)}</dt>
                <dd className={ecls.body}>{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <EbDisclaimer />
        <RecommendedTests currentTestId="energy-balance" />
      </div>
    </main>
  );
}
