// 별자리 운세 허브: /fortune/star
// 12별자리 상세 페이지로 가는 목록 + 별자리 찾는 법 + FAQ. "별자리 운세" 같은 포괄 검색어 대응.
import type { Metadata } from "next";
import { starSigns } from "@/data/fortunes";
import { FORTUNE_PATH, FORTUNE_STAR_PATH, fortuneSignTexts, getStarFortunePath, starHub } from "@/data/fortune-signs";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import SignHubView from "@/components/fortune/SignHubView";

const ogImage = buildOgImageUrl({ title: starHub.heading.ko, desc: "12별자리 운세 · 성격 · 궁합 · 날짜", emoji: "⭐" });

export const metadata: Metadata = {
  title: starHub.title.ko,
  description: starHub.description.ko,
  keywords: [...starHub.keywords.ko, ...starHub.keywords.en],
  alternates: { canonical: FORTUNE_STAR_PATH },
  openGraph: {
    title: `${starHub.heading.ko} | Check Me Today`,
    description: starHub.description.ko,
    type: "website",
    url: FORTUNE_STAR_PATH,
    locale: "ko_KR",
    images: [{ url: ogImage, width: 1200, height: 630, alt: starHub.heading.ko }],
  },
  twitter: { card: "summary_large_image", title: starHub.title.ko, description: starHub.description.ko, images: [ogImage] },
};

export default function StarHubPage() {
  const pageUrl = `${SITE_URL}${FORTUNE_STAR_PATH}`;
  // 목록은 양자리(3/21)부터 보여 준다 (배열은 염소자리부터 시작)
  const ordered = [...starSigns.slice(3), ...starSigns.slice(0, 3)];
  const items = ordered.map((s) => ({
    id: s.id,
    symbol: s.symbol,
    name: s.name,
    trait: s.trait,
    href: getStarFortunePath(s.id),
  }));

  // 검색엔진용 구조화 데이터: CollectionPage + ItemList + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: starHub.title.ko,
        headline: starHub.heading.ko,
        description: starHub.description.ko,
        inLanguage: "ko",
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        hasPart: { "@id": `${pageUrl}#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: fortuneSignTexts.starListSection.ko,
        numberOfItems: ordered.length,
        itemListElement: ordered.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getStarFortunePath(s.id)}`,
          name: `${s.name.ko} 오늘의 운세`,
        })),
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FORTUNE_PATH, label: fortuneSignTexts.fortuneCrumb },
            { label: fortuneSignTexts.starCrumb },
          ],
          FORTUNE_STAR_PATH
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: starHub.faq.map((f) => ({
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
      <SignHubView kind="star" hub={starHub} items={items} />
    </>
  );
}
