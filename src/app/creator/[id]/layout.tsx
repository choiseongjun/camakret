import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/api';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creatorId = params.id;

  try {
    // 서버에서 크리에이터 정보 가져오기
    const response = await fetch(`${API_BASE_URL}/api/creators/${creatorId}`, {
      cache: 'no-store' // 항상 최신 데이터
    });

    if (!response.ok) {
      return {
        title: '크리에이터를 찾을 수 없습니다 | CreatorHub',
        description: 'CreatorHub에서 다양한 크리에이터를 만나보세요.',
      };
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      return {
        title: '크리에이터를 찾을 수 없습니다 | CreatorHub',
        description: 'CreatorHub에서 다양한 크리에이터를 만나보세요.',
      };
    }

    const creator = data.data;

    // 구독자 수 포맷팅
    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    const subscriberCount = formatNumber(creator.statistics.subscribers);
    const rating = creator.reviewStats.averageRating.toFixed(1);
    const reviewCount = creator.reviewStats.totalReviews;

    // 크리에이터 설명 요약 (150자)
    const description = creator.description.length > 150
      ? creator.description.substring(0, 150) + '...'
      : creator.description;

    // 스타일과 음식 타입 태그
    const tags = [...(creator.foodCategories.style || []), ...(creator.foodCategories.foodType || [])].slice(0, 5).join(', ');

    const title = `${creator.name} - 구독자 ${subscriberCount}, ⭐${rating} | CreatorHub`;
    const fullDescription = `${creator.name} 크리에이터 정보 | 구독자 ${subscriberCount}, 평점 ${rating}점 (리뷰 ${reviewCount}개) | ${description} | ${tags}`;

    return {
      title,
      description: fullDescription,
      keywords: [
        creator.name,
        '크리에이터',
        '유튜버',
        '먹방',
        ...(creator.foodCategories.style || []),
        ...(creator.foodCategories.foodType || []),
        'YouTube',
        '구독자',
        '리뷰'
      ],
      openGraph: {
        title,
        description: fullDescription,
        url: `https://creatorhub.kr/creator/${creatorId}`,
        siteName: 'CreatorHub',
        images: [
          {
            url: creator.thumbnail,
            width: 800,
            height: 800,
            alt: `${creator.name} 프로필 사진`,
          }
        ],
        locale: 'ko_KR',
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: fullDescription,
        images: [creator.thumbnail],
      },
      alternates: {
        canonical: `https://creatorhub.kr/creator/${creatorId}`,
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
  } catch (error) {
    console.error('메타데이터 생성 실패:', error);
    return {
      title: 'CreatorHub - 크리에이터와 팬을 연결하는 플랫폼',
      description: 'CreatorHub에서 다양한 크리에이터를 만나보세요.',
    };
  }
}

export default function CreatorLayout({ children }: Props) {
  return <>{children}</>;
}
