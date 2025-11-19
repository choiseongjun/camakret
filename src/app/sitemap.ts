import { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://creatorhub.kr';

  // // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/creators`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
  //   // 모든 크리에이터 가져오기
  //   const response = await fetch(`${API_BASE_URL}/api/creators?page=1&limit=1000`, {
  //     cache: 'no-store'
  //   });

  //   if (!response.ok) {
  //     console.error('크리에이터 목록 가져오기 실패');
  //     return staticPages;
  //   }

  //   const data = await response.json();

  //   if (!data.success || !data.data) {
  //     return staticPages;
  //   }

  //   const creators = data.data;

  //   // 각 크리에이터 페이지
  //   const creatorPages: MetadataRoute.Sitemap = creators.map((creator: any) => ({
  //     url: `${baseUrl}/creator/${creator.id}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'weekly' as const,
  //     priority: 0.8,
  //   }));

  //   // 각 크리에이터 커뮤니티 페이지
  //   const communityPages: MetadataRoute.Sitemap = creators.map((creator: any) => ({
  //     url: `${baseUrl}/community/${creator.id}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'daily' as const,
  //     priority: 0.7,
  //   }));

      return [...staticPages];

    // return [...staticPages, ...creatorPages, ...communityPages];
  } catch (error) {
  //   console.error('Sitemap 생성 중 오류:', error);
    return staticPages;
  }
}
