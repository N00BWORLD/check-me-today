// 관상 허브 페이지: /face-reading/guide
// 부위별 가이드 10개와 결과 유형 30종으로 가는 목록 + 관상 테스트 소개. "관상 보는 법" 같은 포괄 검색어 대응.
import type { Metadata } from "next";
import { faceReadingResults } from "@/data/face-reading";
import { faceGuideHub, faceGuideParts, faceGuideTexts, FACE_GUIDE_PATH, FACE_READING_PATH, getFaceGuidePath, getFaceTypePath } from "@/data/face-reading-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import FaceGuideHub from "@/components/face-reading/FaceGuideHub";
import { toPartSummary, toTypeSummary } from "@/components/face-reading/summaries";

const ogImage = buildOgImageUrl({ title: faceGuideHub.heading.ko, desc: "부위별 관상 가이드 · 관상 유형 30종", emoji: "🔮" });

export const metadata: Metadata = {
  title: faceGuideHub.title.ko,
  description: faceGuideHub.description.ko,
  keywords: [...faceGuideHub.keywords.ko, ...faceGuideHub.keywords.en],
  alternates: { canonical: FACE_GUIDE_PATH },
  openGraph: {
    title: `${faceGuideHub.title.ko} | Check Me Today`,
    description: faceGuideHub.description.ko,
    type: "website",
    url: FACE_GUIDE_PATH,
    locale: "ko_KR",
    images: [{ url: ogImage, width: 1200, height: 630, alt: faceGuideHub.heading.ko }],
  },
  twitter: { card: "summary_large_image", title: faceGuideHub.title.ko, description: faceGuideHub.description.ko, images: [ogImage] },
};

export default function FaceGuideHubPage() {
  const pageUrl = `${SITE_URL}${FACE_GUIDE_PATH}`;

  // 검색엔진용 구조화 데이터: CollectionPage + ItemList(가이드) + ItemList(유형) + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: faceGuideHub.title.ko,
        headline: faceGuideHub.heading.ko,
        description: faceGuideHub.description.ko,
        inLanguage: "ko",
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        hasPart: [{ "@id": `${pageUrl}#parts` }, { "@id": `${pageUrl}#types` }],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#parts`,
        name: faceGuideTexts.partsSection.ko,
        numberOfItems: faceGuideParts.length,
        itemListElement: faceGuideParts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getFaceGuidePath(p.id)}`,
          name: p.title.ko,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#types`,
        name: faceGuideTexts.typesSection.ko,
        numberOfItems: faceReadingResults.length,
        itemListElement: faceReadingResults.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getFaceTypePath(r.id)}`,
          name: `${r.type.ko} 관상`,
        })),
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { label: faceGuideTexts.guideCrumb },
          ],
          FACE_GUIDE_PATH
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faceGuideHub.faq.map((f) => ({
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
      <FaceGuideHub parts={faceGuideParts.map(toPartSummary)} types={faceReadingResults.map(toTypeSummary)} />
    </>
  );
}
