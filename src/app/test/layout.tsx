import { Metadata } from "next";

export const metadata: Metadata = {
    title: "에너지 밸런스 테스트 | Check Me Today",
    description: "내 안의 태양과 달 ☀️🌙 심리학 기반 성향 테스트로 나의 에너지 밸런스를 확인해보세요!",
    openGraph: {
        title: "에너지 밸런스 테스트 ☀️🌙",
        description: "내 안의 태양과 달! 심리학 기반 성향 테스트로 나의 에너지 밸런스를 확인해보세요!",
        images: [
            {
                url: "/og-test.png",
                width: 1200,
                height: 630,
                alt: "에너지 밸런스 테스트",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "에너지 밸런스 테스트 ☀️🌙",
        description: "내 안의 태양과 달! 심리학 기반 성향 테스트로 나의 에너지 밸런스를 확인해보세요!",
        images: ["/og-test.png"],
    },
};

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

