"use client";

// 차원별 성향 가이드 페이지(/test/guide/[trait]) 본문
// 서버가 한국어로 렌더링한 HTML 을 검색엔진이 읽고, 클라이언트에서 사용자의 언어로 바뀐다.
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ENERGY_GUIDE_PATH,
  ENERGY_TEST_PATH,
  energyGuideTexts,
  getEnergyTraitPath,
  getEnergyTypePath,
  type EnergyTraitGuide,
} from "@/data/energy-balance-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { EbBreadcrumb, EbDisclaimer, ecls, Paragraphs, poleStyle, SectionHeading, TestCta } from "./ebUi";
import type { TraitSummary, TypeSummary } from "./summaries";

interface Props {
  guide: EnergyTraitGuide;
  /** 이 차원이 속한 유형 (Solar 또는 Lunar) */
  ownType: TypeSummary;
  otherTraits: TraitSummary[];
}

export default function EnergyTraitView({ guide, ownType, otherTraits }: Props) {
  const { t } = useLanguage();
  const pole = poleStyle[guide.pole];

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

        {/* 머리 */}
        <header className={`${ecls.card} text-center relative overflow-hidden animate-fade-in`}>
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${pole.gradient} opacity-20 rounded-full blur-3xl`} aria-hidden="true" />
          <div
            className={`relative w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${pole.gradient} flex items-center justify-center shadow-xl ring-4 ${pole.ring}`}
            aria-hidden="true"
          >
            <span className="text-4xl">{guide.emoji}</span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${pole.badge}`}>
            {guide.pole === "SOLAR" ? "☀️" : "🌙"} {t(pole.label)}
          </span>
          <h1 className={ecls.h1}>{t(guide.heading)}</h1>
          <p className={`${ecls.body} mt-4 text-left`}>{t(guide.description)}</p>
        </header>

        {/* 심리학에서 보는 이 성향 */}
        <section className={ecls.card} aria-labelledby="trait-intro">
          <SectionHeading id="trait-intro" emoji="📚">
            {t(energyGuideTexts.introSection)}
          </SectionHeading>
          <Paragraphs text={t(guide.intro)} />
        </section>

        {/* 높은 사람 / 낮은 사람 */}
        <section className={ecls.card} aria-labelledby="trait-highlow">
          <SectionHeading id="trait-highlow" emoji="📊">
            {t(energyGuideTexts.highSection)} · {t(energyGuideTexts.lowSection)}
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`${ecls.inner} border-l-4 border-l-amber-400`}>
              <h3 className={`${ecls.h3} mb-2`}>▲ {t(energyGuideTexts.highSection)}</h3>
              <p className={ecls.body}>{t(guide.high)}</p>
            </div>
            <div className={`${ecls.inner} border-l-4 border-l-indigo-400`}>
              <h3 className={`${ecls.h3} mb-2`}>▼ {t(energyGuideTexts.lowSection)}</h3>
              <p className={ecls.body}>{t(guide.low)}</p>
            </div>
          </div>
        </section>

        <TestCta className="mb-6" />

        {/* 광고: 본문 콘텐츠 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 상황별 */}
        <section className={ecls.card} aria-labelledby="trait-scenes">
          <SectionHeading id="trait-scenes" emoji="🧩">
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

        {/* 균형 잡는 법 */}
        <section className={ecls.card} aria-labelledby="trait-balance">
          <SectionHeading id="trait-balance" emoji="⚖️">
            {t(energyGuideTexts.balanceSection)}
          </SectionHeading>
          <Paragraphs text={t(guide.balance)} />
        </section>

        {/* FAQ */}
        <section className={ecls.card} aria-labelledby="trait-faq">
          <SectionHeading id="trait-faq" emoji="❓">
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

        {/* 이 차원이 속한 유형 */}
        <section className={ecls.card} aria-labelledby="trait-type">
          <SectionHeading id="trait-type" emoji={ownType.emoji}>
            {t(energyGuideTexts.belongsTo)}
          </SectionHeading>
          <Link
            href={getEnergyTypePath(ownType.id)}
            className={`flex items-center gap-4 ${ecls.inner} hover:bg-white/80 dark:hover:bg-slate-700/70 transition-colors ${ecls.focus}`}
          >
            <span className={`shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${pole.gradient} flex items-center justify-center text-3xl shadow-lg`} aria-hidden="true">
              {ownType.emoji}
            </span>
            <span className="min-w-0">
              <span className={`${ecls.h3} block`}>{t(ownType.name)}</span>
              <span className={`${ecls.muted} block mt-1`}>{t(ownType.subtitle)}</span>
            </span>
          </Link>
        </section>

        {/* 다른 차원 */}
        <section className={ecls.card} aria-labelledby="trait-others">
          <SectionHeading id="trait-others" emoji="🔀">
            {t(energyGuideTexts.otherTraitsSection)}
          </SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {otherTraits.map((tr) => (
              <li key={tr.id}>
                <Link
                  href={getEnergyTraitPath(tr.id)}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-[15px] font-bold ${poleStyle[tr.pole].badge} hover:opacity-80 transition-opacity ${ecls.focus}`}
                >
                  <span aria-hidden="true">{tr.emoji}</span>
                  {t(tr.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ENERGY_GUIDE_PATH} className={`inline-flex items-center px-3 py-2 text-[15px] font-bold ${pole.text} ${ecls.link}`}>
                {t(energyGuideTexts.guideCrumb)} →
              </Link>
            </li>
          </ul>
        </section>

        <TestCta className="mb-6" />
        <EbDisclaimer />
        <RecommendedTests currentTestId="energy-balance" />
      </div>
    </main>
  );
}
