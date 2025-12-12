import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://check-me.today"),
  title: {
    default: "Check Me Today | 오늘 나를 확인해봐",
    template: "%s | Check Me Today",
  },
  description: "심리 테스트, 성격 테스트, 운세, MBTI, 퍼스널 컬러 등 나를 알아보는 다양한 콘텐츠를 제공합니다. 오늘 당신의 상태를 확인해보세요!",
  keywords: ["심리 테스트", "성격 테스트", "MBTI", "운세", "관상", "사주", "무료 테스트", "check me today"],
  authors: [{ name: "Check Me Today" }],
  creator: "Check Me Today",
  publisher: "Check Me Today",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Check Me Today | 오늘 나를 확인해봐",
    description: "테토/에겐 성격 테스트, 오늘의 운세, 관상 분석까지! 나를 발견하는 가장 쉬운 방법.",
    url: "https://check-me.today",
    siteName: "Check Me Today",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Check Me Today - 심리테스트 & 운세",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Me Today | 오늘 나를 확인해봐",
    description: "테토/에겐 성격 테스트, 오늘의 운세, 관상 분석까지!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // 추후 실제 코드로 교체 필요
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Pretendard Font - 안정적인 로딩 */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* JSON-LD for Brand Entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Check Me Today",
              "alternateName": "오늘 나를 확인해봐",
              "url": "https://check-me.today",
              "description": "심리학 기반의 성향 테스트, 운세, 관상 분석을 제공하는 자아 탐구 플랫폼",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://check-me.today/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
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
          <div className="floating-shape w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 top-0 -left-48" />
          <div className="floating-shape w-80 h-80 bg-cyan-300/30 dark:bg-cyan-500/20 top-1/3 -right-40" style={{ animationDelay: "-5s" }} />
          <div className="floating-shape w-72 h-72 bg-pink-300/30 dark:bg-pink-500/20 bottom-0 left-1/4" style={{ animationDelay: "-10s" }} />
        </div>

        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
