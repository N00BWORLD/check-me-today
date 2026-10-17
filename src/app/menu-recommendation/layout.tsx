import { Metadata } from "next";

export const metadata: Metadata = {
    title: "오늘의 메뉴추천",
    description: "🍽️ 오늘 뭐 먹지? 한식·중식·일식·양식·분식·야식·디저트 중 종류만 고르면 룰렛이 메뉴를 뽑아 드려요. 80가지 메뉴 중 결정장애 해결!",
    openGraph: {
        title: "오늘의 메뉴추천 🍽️",
        description: "오늘 뭐 먹지? 한식·중식·일식·양식·분식·야식·디저트 중 종류만 고르면 룰렛이 메뉴를 뽑아 드려요.",
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
        description: "오늘 뭐 먹지? 종류만 고르면 룰렛이 메뉴를 뽑아 드려요. 80가지 메뉴 중 결정장애 해결!",
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
