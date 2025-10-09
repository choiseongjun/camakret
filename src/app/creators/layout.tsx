import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전체 크리에이터 목록 - 800+ 크리에이터 | CreatorHub',
  description: 'CreatorHub에 등록된 800명 이상의 크리에이터를 만나보세요. 먹방, ASMR, 토크, 리뷰 등 다양한 카테고리의 유튜버를 검색하고 비교할 수 있습니다.',
  keywords: [
    '크리에이터',
    '유튜버',
    '먹방',
    'ASMR',
    '토크',
    '리뷰',
    '크리에이터 검색',
    '유튜버 목록',
    '구독자',
    '평점'
  ],
  openGraph: {
    title: '전체 크리에이터 목록 | CreatorHub',
    description: '800명 이상의 검증된 크리에이터를 찾아보세요. 구독자 수, 평점, 카테고리별로 검색 가능합니다.',
    url: 'https://creatorhub.kr/creators',
    siteName: 'CreatorHub',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전체 크리에이터 목록 | CreatorHub',
    description: '800명 이상의 검증된 크리에이터를 찾아보세요.',
  },
  alternates: {
    canonical: 'https://creatorhub.kr/creators',
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
};

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
