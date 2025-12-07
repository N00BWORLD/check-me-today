import { Metadata } from "next";

export const metadata: Metadata = {
    title: "오늘의 운세 | Check Me Today",
    description: "이름과 생년월일로 보는 오늘의 운세 🧧 종합운, 재물운, 연애운, 건강운, 직장/학업운을 확인해보세요!",
    openGraph: {
        title: "오늘의 운세 🧧",
        description: "이름과 생년월일로 보는 오늘의 운세! 종합운, 재물운, 연애운, 건강운을 확인해보세요!",
        images: [
            {
                url: "/og-fortune.png",
                width: 1200,
                height: 630,
                alt: "오늘의 운세",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "오늘의 운세 🧧",
        description: "이름과 생년월일로 보는 오늘의 운세! 종합운, 재물운, 연애운, 건강운을 확인해보세요!",
        images: ["/og-fortune.png"],
    },
};

export default function FortuneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

