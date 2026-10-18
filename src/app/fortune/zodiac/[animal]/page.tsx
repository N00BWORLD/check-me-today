// 띠별 오늘의 운세: /fortune/zodiac/[animal]
// "호랑이띠 오늘의 운세" 같은 검색어로 유입되는 서버 렌더링(SSG) 페이지.
// 본문 데이터는 src/data/fortune-signs.ts, 화면은 src/components/fortune/SignGuideView.tsx
// 오늘의 공통 운세 카드는 클라이언트에서 띠 + 오늘 날짜로 계산한다.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { zodiacAnimals } from "@/data/fortunes";
import {
  FORTUNE_PATH,
  FORTUNE_SIGNS_PUBLISHED,
  FORTUNE_ZODIAC_PATH,
  fortuneSignTexts,
  getZodiacAnimalById,
  getZodiacFortunePath,
  getZodiacGuide,
  getZodiacYears,
  getZodiacYearsFaq,
} from "@/data/fortune-signs";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import SignGuideView from "@/components/fortune/SignGuideView";

interface Props {
  params: Promise<{ animal: string }>;
}

export async function generateStaticParams() {
  return zodiacAnimals.map((a) => ({ animal: a.id }));
}

/** 페이지 제목. 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다 */
const buildTitle = (name: string) => `${name} 오늘의 운세`;

/** 메타 설명: 띠 이름 + 해당 연도 + 매일 바뀌는 운세 안내 (약 130자) */
function buildDescription(name: string, years: number[]) {
  return `${name}(${years.join("·")}년생) 오늘의 운세. 종합운 점수와 재물·연애·건강·직장운, 행운의 숫자와 색이 매일 자정에 새로 바뀝니다. ${name} 성격·궁합·올해 흐름까지 한 페이지에 정리했어요.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animal: id } = await params;
  const animal = getZodiacAnimalById(id);
  const guide = getZodiacGuide(id);
  if (!animal || !guide) return { title: "Not Found" };

  const path = getZodiacFortunePath(animal.id);
  const years = getZodiacYears(animal.id);
  const title = buildTitle(animal.name.ko);
  const description = buildDescription(animal.name.ko, years);
  const ogImage = buildOgImageUrl({ title, desc: `${years.join(" · ")}년생`, emoji: animal.emoji });

  return {
    title,
    description,
    keywords: [...guide.keywords.ko, ...guide.keywords.en],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Check Me Today`,
      description,
      type: "article",
      url: path,
      locale: "ko_KR",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function ZodiacFortunePage({ params }: Props) {
  const { animal: id } = await params;
  const animal = getZodiacAnimalById(id);
  const guide = getZodiacGuide(id);
  if (!animal || !guide) notFound();

  const path = getZodiacFortunePath(animal.id);
  const pageUrl = `${SITE_URL}${path}`;
  const years = getZodiacYears(animal.id);
  const title = buildTitle(animal.name.ko);
  const description = buildDescription(animal.name.ko, years);
  // FAQ: 연도 FAQ(자동 생성) + 손으로 쓴 2개. 화면과 JSON-LD 에 같은 목록을 쓴다
  const faq = [getZodiacYearsFaq(animal), ...guide.faq];
  const siblings = zodiacAnimals.map((a) => ({ id: a.id, symbol: a.emoji, name: a.name, href: getZodiacFortunePath(a.id) }));

  // 검색엔진용 구조화 데이터: Article + BreadcrumbList + FAQPage (한국어 기준)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: title,
        name: title,
        description,
        inLanguage: "ko",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: FORTUNE_SIGNS_PUBLISHED,
        dateModified: FORTUNE_SIGNS_PUBLISHED,
        author: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        articleSection: "운세",
        keywords: guide.keywords.ko.join(", "),
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FORTUNE_PATH, label: fortuneSignTexts.fortuneCrumb },
            { href: FORTUNE_ZODIAC_PATH, label: fortuneSignTexts.zodiacCrumb },
            { label: animal.name },
          ],
          path
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((f) => ({
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
      <SignGuideView
        kind="zodiac"
        id={animal.id}
        symbol={animal.emoji}
        name={animal.name}
        trait={animal.trait}
        guide={guide}
        faq={faq}
        hanja={guide.hanja}
        years={years}
        siblings={siblings}
      />
    </>
  );
}
