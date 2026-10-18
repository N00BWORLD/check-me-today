// 부위별 관상 가이드: /face-reading/guide/[part]
// "눈 관상 보는 법" 같은 부위 단위 검색어로 유입되는 서버 렌더링(SSG) 페이지.
// 본문 데이터는 src/data/face-reading-guide.ts, 화면은 src/components/face-reading/FaceGuideView.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faceReadingResults } from "@/data/face-reading";
import {
  faceGuideParts,
  faceGuideTexts,
  FACE_GUIDE_PATH,
  FACE_GUIDE_PUBLISHED,
  FACE_READING_PATH,
  getFaceGuidePart,
  getFaceGuidePath,
} from "@/data/face-reading-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import FaceGuideView from "@/components/face-reading/FaceGuideView";
import { toPartSummary, toTypeSummary } from "@/components/face-reading/summaries";

interface Props {
  params: Promise<{ part: string }>;
}

export async function generateStaticParams() {
  return faceGuideParts.map((p) => ({ part: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part: id } = await params;
  const part = getFaceGuidePart(id);
  if (!part) return { title: "Not Found" };

  const path = getFaceGuidePath(part.id);
  const ogImage = buildOgImageUrl({ title: part.heading.ko, desc: part.description.ko.slice(0, 60), emoji: part.emoji });

  // 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다
  return {
    title: part.title.ko,
    description: part.description.ko,
    keywords: [...part.keywords.ko, ...part.keywords.en],
    alternates: { canonical: path },
    openGraph: {
      title: `${part.title.ko} | Check Me Today`,
      description: part.description.ko,
      type: "article",
      url: path,
      locale: "ko_KR",
      images: [{ url: ogImage, width: 1200, height: 630, alt: part.heading.ko }],
    },
    twitter: { card: "summary_large_image", title: part.title.ko, description: part.description.ko, images: [ogImage] },
  };
}

export default async function FaceGuidePartPage({ params }: Props) {
  const { part: id } = await params;
  const part = getFaceGuidePart(id);
  if (!part) notFound();

  const path = getFaceGuidePath(part.id);
  const pageUrl = `${SITE_URL}${path}`;

  const relatedTypes = part.relatedTypes
    .map((typeId) => faceReadingResults.find((r) => r.id === typeId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map(toTypeSummary);
  const otherParts = faceGuideParts.filter((p) => p.id !== part.id).map(toPartSummary);

  // 검색엔진용 구조화 데이터: Article + BreadcrumbList + FAQPage (한국어 기준)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: part.heading.ko,
        name: part.title.ko,
        description: part.description.ko,
        inLanguage: "ko",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: FACE_GUIDE_PUBLISHED,
        dateModified: FACE_GUIDE_PUBLISHED,
        author: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        articleSection: "관상",
        keywords: part.keywords.ko.join(", "),
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { href: FACE_GUIDE_PATH, label: faceGuideTexts.guideCrumb },
            { label: part.name },
          ],
          path
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: part.faq.map((f) => ({
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
      <FaceGuideView part={part} relatedTypes={relatedTypes} otherParts={otherParts} />
    </>
  );
}
