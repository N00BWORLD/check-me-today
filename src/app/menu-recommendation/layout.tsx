import { Metadata } from "next";

export const metadata: Metadata = {
    title: "오늘의 메뉴추천",
    description: "🍽️ 지금 시간에 맞는 최적의 메뉴를 추천해드려요! 아침·점심·저녁·야식 별 맞춤 메뉴 추천",
    openGraph: {
        title: "오늘의 메뉴추천 🍽️",
        description: "지금 시간에 맞는 최적의 메뉴를 추천해드려요! 아침·점심·저녁·야식 별 맞춤 메뉴 추천",
        images: [
            {
                url: "/og-menu.png",
                width: 1200,
                height: 630,
                alt: "오늘의 메뉴추천",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "오늘의 메뉴추천 🍽️",
        description: "지금 시간에 맞는 최적의 메뉴를 추천해드려요! 아침·점심·저녁·야식 별 맞춤 메뉴 추천",
        images: ["/og-menu.png"],
    },
};

export default function MenuRecommendationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
