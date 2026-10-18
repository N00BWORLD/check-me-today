// 띠별 운세 허브: /fortune/zodiac
// 12띠 상세 페이지로 가는 목록 + 띠 계산법 + FAQ. "띠별 운세" 같은 포괄 검색어 대응.
// "올해의 띠" 문구가 해가 바뀌면 달라지므로 하루에 한 번 다시 생성한다.
import type { Metadata } from "next";
import { getZodiacAnimal, zodiacAnimals } from "@/data/fortunes";
import { FORTUNE_PATH, FORTUNE_ZODIAC_PATH, fortuneSignTexts, getZodiacFortunePath, getZodiacYears, zodiacHub } from "@/data/fortune-signs";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import SignHubView from "@/components/fortune/SignHubView";

export const revalidate = 86400;

const ogImage = buildOgImageUrl({ title: zodiacHub.heading.ko, desc: "12띠 운세 · 성격 · 궁합 · 띠 계산법", emoji: "🐯" });

export const metadata: Metadata = {
  title: zodiacHub.title.ko,
  description: zodiacHub.description.ko,
  keywords: [...zodiacHub.keywords.ko, ...zodiacHub.keywords.en],
  alternates: { canonical: FORTUNE_ZODIAC_PATH },
  openGraph: {
    title: `${zodiacHub.heading.ko} | Check Me Today`,
    description: zodiacHub.description.ko,
    type: "website",
    url: FORTUNE_ZODIAC_PATH,
    locale: "ko_KR",
    images: [{ url: ogImage, width: 1200, height: 630, alt: zodiacHub.heading.ko }],
  },
  twitter: { card: "summary_large_image", title: zodiacHub.title.ko, description: zodiacHub.description.ko, images: [ogImage] },
};

export default function ZodiacHubPage() {
  const pageUrl = `${SITE_URL}${FORTUNE_ZODIAC_PATH}`;
  const year = new Date().getFullYear();
  const thisYear = { year, name: getZodiacAnimal(year).name };
  const items = zodiacAnimals.map((a) => ({
    id: a.id,
    symbol: a.emoji,
    name: a.name,
    trait: a.trait,
    href: getZodiacFortunePath(a.id),
    years: getZodiacYears(a.id),
  }));

  // 검색엔진용 구조화 데이터: CollectionPage + ItemList + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: zodiacHub.title.ko,
        headline: zodiacHub.heading.ko,
        description: zodiacHub.description.ko,
        inLanguage: "ko",
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        hasPart: { "@id": `${pageUrl}#list` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: fortuneSignTexts.zodiacListSection.ko,
        numberOfItems: zodiacAnimals.length,
        itemListElement: zodiacAnimals.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${getZodiacFortunePath(a.id)}`,
          name: `${a.name.ko} 오늘의 운세`,
        })),
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        ...buildBreadcrumbJsonLd(
          [
            { href: "/", label: HOME_LABEL },
            { href: FORTUNE_PATH, label: fortuneSignTexts.fortuneCrumb },
            { label: fortuneSignTexts.zodiacCrumb },
          ],
          FORTUNE_ZODIAC_PATH
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: zodiacHub.faq.map((f) => ({
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
      <SignHubView kind="zodiac" hub={zodiacHub} items={items} thisYear={thisYear} />
    </>
  );
}
