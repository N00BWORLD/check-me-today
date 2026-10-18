// 에너지 밸런스 유형 페이지: /test/types/[type] (solar | lunar)
// 결과 유형 설명 전문을 서버에서 렌더링해 "솔라 유형", "루나 에너지" 같은 결과 공유 뒤 검색에 대응한다.
// 화면은 src/components/energy-balance/EnergyTypeView.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ENERGY_GUIDE_PATH,
  ENERGY_GUIDE_PUBLISHED,
  ENERGY_TEST_PATH,
  energyGuideTexts,
  energyTraitGuides,
  energyTypeGuides,
  getEnergyTypeGuide,
  getEnergyTypePath,
} from "@/data/energy-balance-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import EnergyTypeView from "@/components/energy-balance/EnergyTypeView";
import { toTraitSummary, toTypeSummary } from "@/components/energy-balance/summaries";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return energyTypeGuides.map((g) => ({ type: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const guide = getEnergyTypeGuide(type);
  if (!guide) return { title: "Not Found" };

  const path = getEnergyTypePath(guide.id);
  const ogImage = buildOgImageUrl({ title: guide.name.ko, desc: guide.subtitle.ko, emoji: guide.emoji });

  return {
    title: guide.title.ko,
    description: guide.description.ko,
    keywords: [...guide.keywords.ko, ...guide.keywords.en],
    alternates: { canonical: path },
    openGraph: {
      title: `${guide.title.ko} | Check Me Today`,
      description: guide.description.ko,
      type: "article",
      url: path,
      locale: "ko_KR",
      siteName: "Check Me Today",
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.name.ko }],
    },
    twitter: { card: "summary_large_image", title: guide.title.ko, description: guide.description.ko, images: [ogImage] },
  };
}

export default async function EnergyTypePage({ params }: Props) {
  const { type } = await params;
  const guide = getEnergyTypeGuide(type);
  if (!guide) notFound();

  const path = getEnergyTypePath(guide.id);
  const pageUrl = `${SITE_URL}${path}`;
  const traits = energyTraitGuides.filter((g) => g.pole === guide.type).map(toTraitSummary);
  const otherType = energyTypeGuides.find((g) => g.id !== guide.id)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.heading.ko,
        name: guide.title.ko,
        description: guide.description.ko,
        inLanguage: "ko",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: ENERGY_GUIDE_PUBLISHED,
        dateModified: ENERGY_GUIDE_PUBLISHED,
        author: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        articleSection: "심리 성향",
        keywords: guide.keywords.ko.join(", "),
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: ENERGY_TEST_PATH, label: energyGuideTexts.testCrumb },
            { href: ENERGY_GUIDE_PATH, label: energyGuideTexts.guideCrumb },
            { label: guide.name },
          ],
          path
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: guide.faq.map((f) => ({
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
      <EnergyTypeView guide={guide} traits={traits} otherType={toTypeSummary(otherType)} />
    </>
  );
}
