// 성향 가이드 허브: /test/guide
// 6가지 차원 가이드와 Solar·Lunar 유형 페이지로 가는 목록 + 테스트 소개. "성향 테스트", "성격 차원" 같은 포괄 검색어 대응.
import type { Metadata } from "next";
import {
  ENERGY_GUIDE_PATH,
  ENERGY_TEST_PATH,
  energyGuideHub,
  energyGuideTexts,
  energyTraitGuides,
  energyTypeGuides,
  getEnergyTraitPath,
  getEnergyTypePath,
} from "@/data/energy-balance-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import EnergyGuideHub from "@/components/energy-balance/EnergyGuideHub";
import { toTraitSummary, toTypeSummary } from "@/components/energy-balance/summaries";

const ogImage = buildOgImageUrl({ title: energyGuideHub.heading.ko, desc: "자기주장성 · 성취지향성 · 독립성 · 공감력 · 협력성 · 직관력", emoji: "⚖️" });

export const metadata: Metadata = {
  title: energyGuideHub.title.ko,
  description: energyGuideHub.description.ko,
  keywords: [...energyGuideHub.keywords.ko, ...energyGuideHub.keywords.en],
  alternates: { canonical: ENERGY_GUIDE_PATH },
  openGraph: {
    title: `${energyGuideHub.title.ko} | Check Me Today`,
    description: energyGuideHub.description.ko,
    type: "website",
    url: ENERGY_GUIDE_PATH,
    locale: "ko_KR",
    siteName: "Check Me Today",
    images: [{ url: ogImage, width: 1200, height: 630, alt: energyGuideHub.heading.ko }],
  },
  twitter: { card: "summary_large_image", title: energyGuideHub.title.ko, description: energyGuideHub.description.ko, images: [ogImage] },
};

export default function EnergyGuideHubPage() {
  const pageUrl = `${SITE_URL}${ENERGY_GUIDE_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: energyGuideHub.title.ko,
        headline: energyGuideHub.heading.ko,
        description: energyGuideHub.description.ko,
        inLanguage: "ko",
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        hasPart: [{ "@id": `${pageUrl}#traits` }, { "@id": `${pageUrl}#types` }],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#traits`,
        name: energyGuideTexts.traitsSection.ko,
        numberOfItems: energyTraitGuides.length,
        itemListElement: energyTraitGuides.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getEnergyTraitPath(g.id)}`,
          name: g.title.ko,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#types`,
        name: energyGuideTexts.typesSection.ko,
        numberOfItems: energyTypeGuides.length,
        itemListElement: energyTypeGuides.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getEnergyTypePath(g.id)}`,
          name: g.title.ko,
        })),
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: ENERGY_TEST_PATH, label: energyGuideTexts.testCrumb },
            { label: energyGuideTexts.guideCrumb },
          ],
          ENERGY_GUIDE_PATH
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: energyGuideHub.faq.map((f) => ({
          "@type": "Question",
          name: f.question.ko,
          acceptedAnswer: { "@type": "Answer", text: f.answer.ko },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnergyGuideHub traits={energyTraitGuides.map(toTraitSummary)} types={energyTypeGuides.map(toTypeSummary)} />
    </>
  );
}
