import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/api';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creatorId = params.id;

  try {
    const response = await fetch(`${API_BASE_URL}/api/creators/${creatorId}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return {
        title: '소통공간 | CreatorHub',
        description: 'CreatorHub 커뮤니티에서 크리에이터와 팬들이 소통합니다.',
      };
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      return {
        title: '소통공간 | CreatorHub',
        description: 'CreatorHub 커뮤니티에서 크리에이터와 팬들이 소통합니다.',
      };
    }

    const creator = data.data;

    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    const subscriberCount = formatNumber(creator.statistics.subscribers);
    const title = `${creator.name} 소통공간 - 팬들과 함께하는 커뮤니티 | CreatorHub`;
    const description = `${creator.name} 크리에이터와 팬들이 소통하는 공간입니다. 구독자 ${subscriberCount}명과 함께 이야기를 나눠보세요. 토론, 추천, 제안 등 다양한 주제의 게시글을 확인할 수 있습니다.`;

    return {
      title,
      description,
      keywords: [
        creator.name,
        '커뮤니티',
        '팬클럽',
        '소통',
        '게시판',
        '크리에이터 팬',
        '토론',
        '추천'
      ],
      openGraph: {
        title,
        description,
        url: `https://creatorhub.kr/community/${creatorId}`,
        siteName: 'CreatorHub',
        images: [
          {
            url: creator.thumbnail,
            width: 800,
            height: 800,
            alt: `${creator.name} 커뮤니티`,
          }
        ],
        locale: 'ko_KR',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: [creator.thumbnail],
      },
      alternates: {
        canonical: `https://creatorhub.kr/community/${creatorId}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 실패:', error);
    return {
      title: '소통공간 | CreatorHub',
      description: 'CreatorHub 커뮤니티에서 크리에이터와 팬들이 소통합니다.',
    };
  }
}

export default function CommunityLayout({ children }: Props) {
  return <>{children}</>;
}
