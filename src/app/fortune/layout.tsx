import { Metadata } from "next";

// 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다
const title = "오늘의 운세";
const description =
    "생년월일로 띠와 별자리를 찾아 보는 오늘의 운세. 종합운 점수와 재물운·연애운·건강운·직장운 풀이, 행운의 숫자·색·방향·시간·아이템까지. 매일 자정에 새로 바뀝니다.";

export const metadata: Metadata = {
    // 이 레이아웃이 title 을 문자열로 두면 루트 템플릿이 여기서 끊겨 하위 페이지(/fortune/zodiac/*, /fortune/star/*)에
    // 사이트명이 붙지 않는다. 그래서 템플릿을 다시 선언하고, /fortune 자체는 absolute 로 완성된 제목을 준다
    title: { absolute: `${title} | Check Me Today`, template: "%s | Check Me Today" },
    description,
    keywords: ["오늘의 운세", "띠별 운세", "별자리 운세", "오늘 운세", "무료 운세", "재물운", "연애운", "일일 운세"],
    alternates: { canonical: "/fortune" },
    openGraph: {
        title: `${title} 🧧 | Check Me Today`,
        description,
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
        title: `${title} 🧧`,
        description,
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
