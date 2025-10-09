import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/profile/',
          '/booking/',
          '/checkout/',
          '/coupons/',
          '/demo/',
          '/email/',
          '/membership/',
          '/notion-converter/',
          '/product/',
          '/shop/',
          '/success/',
          '/support/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/auth/'],
      },
    ],
    sitemap: 'https://creatorhub.kr/sitemap.xml',
  };
}
