// 관상 결과 유형별 정적 페이지: /face-reading/types/[type]
// 30개 유형(src/data/face-reading-types)을 빌드 시 생성. "부귀장수상 관상" 같은 유형 이름 검색과 공유 링크 유입용.
// 화면은 src/components/face-reading/FaceTypeView.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faceReadingResults, traitInfo } from "@/data/face-reading";
import {
  faceGuideParts,
  faceGuideTexts,
  FACE_GUIDE_PATH,
  FACE_GUIDE_PUBLISHED,
  FACE_READING_PATH,
  getCompatibleTypes,
  getFaceTypePath,
  getGuidesForType,
  getTypeFeatureHighlights,
} from "@/data/face-reading-guide";
import { SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import FaceTypeView, { type FeatureHighlight } from "@/components/face-reading/FaceTypeView";
import { toPartSummary, toTypeSummary } from "@/components/face-reading/summaries";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return faceReadingResults.map((r) => ({ type: r.id }));
}

const findType = (id: string) => faceReadingResults.find((r) => r.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type: id } = await params;
  const result = findType(id);
  if (!result) return { title: "Not Found" };

  const title = `${result.type.ko} 관상 - 특징과 운세`;
  const description = `${result.hanja} ${result.type.ko}: ${result.subtitle.ko}. ${result.description.ko.replace(/\s+/g, " ").slice(0, 110)}…`;
  const path = getFaceTypePath(result.id);
  // 유형 삽화(public/face-reading/{id}.webp)를 OG 이미지로 쓴다
  const image = `${SITE_URL}/face-reading/${result.id}.webp`;

  return {
    title,
    description,
    keywords: [`${result.type.ko} 관상`, result.type.ko, result.hanja, "관상 유형", "관상 분석", "face reading", result.type.en],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Check Me Today`,
      description,
      type: "article",
      url: path,
      locale: "ko_KR",
      images: [{ url: image, alt: `${result.type.ko} 관상 삽화` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function FaceTypePage({ params }: Props) {
  const { type: id } = await params;
  const result = findType(id);
  if (!result) notFound();

  const path = getFaceTypePath(result.id);
  const pageUrl = `${SITE_URL}${path}`;

  // 부위별 "이 유형이 나오기 쉬운 선택지" + 해당 부위 가이드 링크
  const highlights: FeatureHighlight[] = getTypeFeatureHighlights(result).map(({ feature, option }) => ({
    featureName: feature.name,
    optionLabel: option.label,
    optionDescription: option.description,
    emoji: option.emoji,
    guideId: faceGuideParts.find((p) => p.featureId === feature.id)?.id,
  }));
  const compatible = getCompatibleTypes(result).map(toTypeSummary);
  const family = faceReadingResults.filter((r) => r.primaryTrait === result.primaryTrait).map(toTypeSummary);
  const guides = getGuidesForType(result.id).map(toPartSummary);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${result.type.ko} 관상 - 특징과 운세`,
        alternativeHeadline: result.title.ko,
        description: result.subtitle.ko,
        inLanguage: "ko",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: `${SITE_URL}/face-reading/${result.id}.webp`,
        datePublished: FACE_GUIDE_PUBLISHED,
        dateModified: FACE_GUIDE_PUBLISHED,
        author: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        articleSection: "관상",
        keywords: [`${result.type.ko} 관상`, traitInfo[result.primaryTrait].label.ko, traitInfo[result.secondaryTrait].label.ko].join(", "),
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { href: FACE_GUIDE_PATH, label: faceGuideTexts.guideCrumb },
            { label: result.type },
          ],
          path
        ),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaceTypeView result={result} highlights={highlights} compatible={compatible} family={family} guides={guides} />
    </>
  );
}
