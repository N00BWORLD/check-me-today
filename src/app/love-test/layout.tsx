import { Metadata } from "next";

export const metadata: Metadata = {
    title: "연애 유형 테스트",
    description: "나의 연애 스타일은? 이상형은 어떤 사람? 심리학 기반 연애 유형 테스트를 통해 확인해보세요! 💕",
    openGraph: {
        title: "연애 유형 테스트 💕",
        description: "나의 연애 스타일은? 이상형은 어떤 사람? 심리학 기반 연애 유형 테스트를 통해 확인해보세요!",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "연애 유형 테스트",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "연애 유형 테스트 💕",
        description: "나의 연애 스타일은? 이상형은 어떤 사람? 심리학 기반 연애 유형 테스트를 통해 확인해보세요!",
        images: ["/og-image.png"],
    },
};

export default function LoveTestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
