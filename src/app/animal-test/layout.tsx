import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 동물 자아 테스트 | My Animal Self",
  description: "동물 행동 습성 기반으로 알아보는 나의 동물 자아! 여우, 늑대, 고양이, 강아지... 내 안에 숨어있는 동물은?",
  openGraph: {
    title: "🦊 나의 동물 자아 테스트 | My Animal Self",
    description: "동물 행동 습성 기반으로 알아보는 나의 동물 자아! 내 안에 숨어있는 동물은 무엇일까?",
    images: ["/icon-teto.png"],
    url: "https://check-me.today/animal-test",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🦊 나의 동물 자아 테스트",
    description: "동물 행동 습성 기반으로 알아보는 나의 동물 자아!",
    images: ["/icon-teto.png"],
  },
};

export default function AnimalTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

