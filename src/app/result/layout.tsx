import { Metadata } from "next";

export const metadata: Metadata = {
    title: "테스트 결과",
    description: "테토 vs 에겐 테스트 결과를 확인하세요! 나는 불꽃형(TETO)인가요, 물결형(EGEN)인가요?",
    openGraph: {
        title: "테토 vs 에겐 테스트 결과 🔥🔮",
        description: "나의 성향 테스트 결과를 확인해보세요!",
        images: [
            {
                url: "/og-result.png",
                width: 1200,
                height: 630,
                alt: "테토 vs 에겐 테스트 결과",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "테토 vs 에겐 테스트 결과 🔥🔮",
        description: "나의 성향 테스트 결과를 확인해보세요!",
        images: ["/og-result.png"],
    },
};

export default function ResultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

