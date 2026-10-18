// 차원별 성향 가이드: /test/guide/[trait]
// "자기주장성이란", "공감 능력 키우는 법" 같은 일반 심리 검색어로 유입되는 서버 렌더링(SSG) 페이지.
// 본문 데이터는 src/data/energy-balance-guide.ts, 화면은 src/components/energy-balance/EnergyTraitView.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ENERGY_GUIDE_PATH,
  ENERGY_GUIDE_PUBLISHED,
  ENERGY_TEST_PATH,
  energyGuideTexts,
  energyTraitGuides,
  energyTypeGuides,
  getEnergyTraitGuide,
  getEnergyTraitPath,
} from "@/data/energy-balance-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import EnergyTraitView from "@/components/energy-balance/EnergyTraitView";
import { toTraitSummary, toTypeSummary } from "@/components/energy-balance/summaries";

interface Props {
  params: Promise<{ trait: string }>;
}

export async function generateStaticParams() {
  return energyTraitGuides.map((g) => ({ trait: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trait } = await params;
  const guide = getEnergyTraitGuide(trait);
  if (!guide) return { title: "Not Found" };

  const path = getEnergyTraitPath(guide.id);
  const ogImage = buildOgImageUrl({ title: guide.heading.ko, desc: guide.description.ko.slice(0, 60), emoji: guide.emoji });

  // 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.heading.ko }],
    },
    twitter: { card: "summary_large_image", title: guide.title.ko, description: guide.description.ko, images: [ogImage] },
  };
}

export default async function EnergyTraitPage({ params }: Props) {
  const { trait } = await params;
  const guide = getEnergyTraitGuide(trait);
  if (!guide) notFound();

  const path = getEnergyTraitPath(guide.id);
  const pageUrl = `${SITE_URL}${path}`;
  const ownType = energyTypeGuides.find((ty) => ty.type === guide.pole)!;
  const otherTraits = energyTraitGuides.filter((g) => g.id !== guide.id).map(toTraitSummary);

  // 검색엔진용 구조화 데이터: Article + BreadcrumbList + FAQPage (한국어 기준)
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
      <EnergyTraitView guide={guide} ownType={toTypeSummary(ownType)} otherTraits={otherTraits} />
    </>
  );
}
