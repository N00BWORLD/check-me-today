import { Metadata } from "next";

export const metadata: Metadata = {
    title: "아이디어 제안",
    description: "만들었으면 하는 테스트, 개선 아이디어, 불편한 점을 자유롭게 제안해 주세요. 좋은 제안은 실제 테스트로 만들어집니다.",
    alternates: {
        canonical: "/ideas",
    },
    openGraph: {
        title: "아이디어 제안 💡 | Check Me Today",
        description: "만들었으면 하는 테스트, 개선 아이디어를 제안해 주세요. 좋은 제안은 실제 테스트로 만들어집니다.",
        type: "website",
        siteName: "Check Me Today",
    },
};

export default function IdeasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
