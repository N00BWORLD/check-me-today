// 카테고리 랜딩 페이지: /category/[id]
// "연애 심리테스트 모음" 같은 카테고리 단위 검색어로 유입되는 서버 렌더링(SSG) 페이지.
// - 어떤 카테고리에 페이지가 생기는지는 tests.ts 기준(테스트가 1개 이상)으로 자동 결정 → getLandingCategories()
// - 본문 데이터(제목·설명·소개글·FAQ)는 src/data/categories.ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryLanding, getLandingCategories, getCategoryPath } from "@/data/categories";
import { getTestPath } from "@/data/tests";
import { buildOgImageUrl } from "@/lib/kakao";
import { buildBreadcrumbJsonLd, HOME_LABEL } from "@/lib/breadcrumb";
import CategoryLanding, { type CategoryTestCard, type OtherCategoryLink } from "@/components/category/CategoryLanding";

const SITE_URL = "https://check-me.today";

interface Props {
    params: Promise<{ id: string }>;
}

// 테스트가 있는 카테고리만 빌드 시 정적 생성
export async function generateStaticParams() {
    return getLandingCategories().map((c) => ({ id: c.category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const landing = getCategoryLanding(id);
    if (!landing) return { title: "Not Found" };

    const { category, seo } = landing;
    const path = getCategoryPath(category.id);
    const ogImage = buildOgImageUrl({ title: seo.heading.ko, desc: seo.description.ko.slice(0, 60), emoji: category.emoji });

    // 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다
    return {
        title: seo.title.ko,
        description: seo.description.ko,
        keywords: [...seo.keywords.ko, ...seo.keywords.en],
        alternates: { canonical: path },
        openGraph: {
            title: `${seo.title.ko} | Check Me Today`,
            description: seo.description.ko,
            type: "website",
            url: path,
            images: [{ url: ogImage, width: 1200, height: 630, alt: seo.heading.ko }],
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title.ko,
            description: seo.description.ko,
            images: [ogImage],
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;
    const landing = getCategoryLanding(id);
    if (!landing) notFound();

    const { category, seo, tests } = landing;
    const path = getCategoryPath(category.id);
    const pageUrl = `${SITE_URL}${path}`;

    // 클라이언트 컴포넌트에는 필요한 필드만 넘긴다
    const cards: CategoryTestCard[] = tests.map((t) => ({
        id: t.id,
        href: getTestPath(t),
        name: t.name,
        description: t.description,
        emoji: t.emoji,
        gradient: t.gradient,
        bgGradient: t.bgGradient,
        badge: t.badge,
    }));

    const others: OtherCategoryLink[] = getLandingCategories()
        .filter((c) => c.category.id !== category.id)
        .map((c) => ({
            id: c.category.id,
            href: getCategoryPath(c.category.id),
            name: c.category.name,
            emoji: c.category.emoji,
            count: c.tests.length,
        }));

    // 검색엔진용 구조화 데이터: CollectionPage + ItemList(테스트 목록) + BreadcrumbList + FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#page`,
                url: pageUrl,
                name: seo.title.ko,
                headline: seo.heading.ko,
                description: seo.description.ko,
                inLanguage: "ko",
                isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                mainEntity: { "@id": `${pageUrl}#list` },
            },
            {
                "@type": "ItemList",
                "@id": `${pageUrl}#list`,
                name: `${category.name.ko} 테스트 목록`,
                numberOfItems: tests.length,
                itemListElement: tests.map((t, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `${SITE_URL}${getTestPath(t)}`,
                    name: t.name.ko,
                    description: t.description.ko,
                })),
            },
            {
                "@id": `${pageUrl}#breadcrumb`,
                ...buildBreadcrumbJsonLd(
                    [{ href: "/", label: HOME_LABEL }, { label: category.name }],
                    path
                ),
            },
            {
                "@type": "FAQPage",
                "@id": `${pageUrl}#faq`,
                mainEntity: seo.faq.map((f) => ({
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
            <CategoryLanding category={category} seo={seo} tests={cards} others={others} />
        </>
    );
}
