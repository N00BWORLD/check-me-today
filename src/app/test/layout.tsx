import { Metadata } from "next";

export const metadata: Metadata = {
    title: "테토 vs 에겐 테스트 | Check Me Today",
    description: "나는 불꽃형(TETO)인가요, 물결형(EGEN)인가요? 7개의 질문으로 알아보는 나의 성향 테스트!",
    openGraph: {
        title: "테토 vs 에겐 테스트 🔥🔮",
        description: "나는 불꽃형? 물결형? 7개의 질문으로 알아보는 나의 성향 테스트!",
        images: [
            {
                url: "/og-test.png",
                width: 1200,
                height: 630,
                alt: "테토 vs 에겐 테스트",
            },
        ],
        type: "website",
        siteName: "Check Me Today",
    },
    twitter: {
        card: "summary_large_image",
        title: "테토 vs 에겐 테스트 🔥🔮",
        description: "나는 불꽃형? 물결형? 7개의 질문으로 알아보는 나의 성향 테스트!",
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

