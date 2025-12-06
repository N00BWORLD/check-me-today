import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Check Me Today | 오늘 나를 확인해봐",
  description: "테토-에겐 테스트, 퍼스널 컬러, 수면 분석 등 다양한 심리 테스트로 진짜 나를 발견해보세요!",
  keywords: ["심리 테스트", "성격 테스트", "MBTI", "테토", "에겐", "퍼스널 컬러", "check me today"],
  authors: [{ name: "Check Me Today" }],
  openGraph: {
    title: "Check Me Today | 오늘 나를 확인해봐",
    description: "테토-에겐 테스트부터 다양한 심리 테스트까지, 진짜 나를 발견해보세요!",
    url: "https://check-me.today",
    siteName: "Check Me Today",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Me Today | 오늘 나를 확인해봐",
    description: "테토-에겐 테스트부터 다양한 심리 테스트까지!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5d0fe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard Font */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8585338769159452"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="floating-shape w-96 h-96 bg-purple-300/30 top-0 -left-48" />
          <div className="floating-shape w-80 h-80 bg-cyan-300/30 top-1/3 -right-40" style={{ animationDelay: "-5s" }} />
          <div className="floating-shape w-72 h-72 bg-pink-300/30 bottom-0 left-1/4" style={{ animationDelay: "-10s" }} />
        </div>
        
        {children}
      </body>
    </html>
  );
}
