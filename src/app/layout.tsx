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
  title: "CreatorHub - 크리에이터와 팬을 연결하는 플랫폼",
  description: "당신이 좋아하는 크리에이터를 찾아보세요. 수천 명의 크리에이터와 함께하는 플랫폼, CreatorHub에서 리뷰를 작성하고 커뮤니티에서 소통하세요.",
  keywords: ["크리에이터", "유튜버", "먹방", "스트리머", "리뷰", "커뮤니티"],
  authors: [{ name: "CreatorHub" }],
  openGraph: {
    title: "CreatorHub - 크리에이터와 팬을 연결하는 플랫폼",
    description: "당신이 좋아하는 크리에이터를 찾아보세요",
    url: "https://creatorhub.kr",
    siteName: "CreatorHub",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorHub - 크리에이터와 팬을 연결하는 플랫폼",
    description: "당신이 좋아하는 크리에이터를 찾아보세요",
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
