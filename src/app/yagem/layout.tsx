import type { Metadata } from "next";

// 비밀 페이지이므로 검색엔진 노출 방지
export const metadata: Metadata = {
  title: "야겜 룰렛 | 오늘 뭐하지?",
  description: "오늘은 어떤 게임을 할까? 랜덤 룰렛으로 골라보자!",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "🎰 야겜 룰렛",
    description: "오늘은 어떤 게임? 랜덤으로 골라보자!",
  },
};

export default function YagemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

