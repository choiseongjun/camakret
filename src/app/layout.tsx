import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "./AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreatorHub - 크리에이터와 게스트, 장소를 연결하는 플랫폼",
  description: "크리에이터를 위한 올인원 플랫폼. 게스트 섭외, 촬영 장소 추천, 리뷰 및 커뮤니티. 유튜버, 스트리머, 인플루언서를 위한 최고의 협업 파트너를 찾아보세요.",
  keywords: ["크리에이터", "유튜버", "먹방", "스트리머", "게스트 섭외", "촬영 장소", "협업", "출연자", "콜라보", "리뷰", "커뮤니티", "인플루언서", "콘텐츠 제작"],
  authors: [{ name: "CreatorHub" }],
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.svg',
    apple: '/favicon/favicon-96x96.png',
  },
  openGraph: {
    title: "CreatorHub - 크리에이터와 게스트, 장소를 연결하는 플랫폼",
    description: "게스트 섭외부터 촬영 장소까지, 크리에이터를 위한 모든 것",
    url: "https://creatorhub.kr",
    siteName: "CreatorHub",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorHub - 크리에이터와 게스트, 장소를 연결하는 플랫폼",
    description: "게스트 섭외부터 촬영 장소까지, 크리에이터를 위한 모든 것",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
