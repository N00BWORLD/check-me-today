import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관상 분석 테스트 | Face Reading | Check Me Today",
  description: "마의상서와 신상전편 등 동양 고전에 기반한 관상 분석. 얼굴 특징으로 알아보는 나의 운명 - Face reading based on ancient Eastern physiognomy texts.",
  keywords: ["관상", "면상", "관상학", "face reading", "physiognomy", "面相", "人相", "운세", "fortune"],
  openGraph: {
    title: "🔮 관상 분석 테스트 | Face Reading",
    description: "동양 전통 관상학으로 보는 나의 얼굴. 재물운, 지혜, 리더십, 매력을 분석해보세요!",
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "Check Me Today",
    images: [
      {
        url: "/og-face-reading.png",
        width: 1200,
        height: 630,
        alt: "관상 분석 테스트 - Face Reading Test",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🔮 관상 분석 테스트 | Face Reading",
    description: "동양 전통 관상학으로 보는 나의 얼굴",
    images: ["/og-face-reading.png"],
  },
};

export default function FaceReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

