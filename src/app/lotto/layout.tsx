import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로또 번호 뽑기 | Lotto Number Picker",
  description:
    "역대 당첨 번호 통계로 뽑는 재미있는 로또 6/45 번호 추첨기. 적게 나온 번호, 많이 나온 번호, 분배가 잘 맞는 조합, 나의 운 번호, 완전 무작위 중 골라 보세요 - Fun lotto number picker based on draw history.",
  keywords: ["로또", "로또 번호", "로또 번호 추첨", "로또 번호 생성기", "로또 6/45", "lotto", "lotto number generator", "乐透", "ロト"],
  openGraph: {
    title: "🎱 로또 번호 뽑기 | Lotto Number Picker",
    description: "적게 나온 번호, 많이 나온 번호, 분배가 잘 맞는 조합, 나의 운 번호 중 골라서 로또 번호 6개를 뽑아 보세요!",
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "Check Me Today",
    images: [
      {
        url: "/api/og?title=%EB%A1%9C%EB%98%90%20%EB%B2%88%ED%98%B8%20%EB%BD%91%EA%B8%B0&desc=%EC%97%AD%EB%8C%80%20%EB%8B%B9%EC%B2%A8%20%ED%86%B5%EA%B3%84%EB%A1%9C%20%EB%BD%91%EB%8A%94%20%EB%A1%9C%EB%98%90%206%2F45%20%EB%B2%88%ED%98%B8&emoji=%F0%9F%8E%B1",
        width: 1200,
        height: 630,
        alt: "로또 번호 뽑기 - Lotto Number Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🎱 로또 번호 뽑기 | Lotto Number Picker",
    description: "역대 당첨 번호 통계로 뽑는 재미있는 로또 번호 추첨기",
  },
};

export default function LottoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
