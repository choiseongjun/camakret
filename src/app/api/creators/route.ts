import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');
    const style = searchParams.get('style');
    const size = searchParams.get('size');

    // JSON 파일 읽기
    const filePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'korean-food-creators.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const allCreators = JSON.parse(fileContent);

    // 크리에이터 데이터 변환
    let creators = allCreators.map((creator: any, index: number) => {
      // 구독자 수로 채널 크기 결정
      const subscribers = creator.statistics.subscribers;
      let channelSize = '소형';
      if (subscribers >= 1000000) channelSize = '대형';
      else if (subscribers >= 100000) channelSize = '중형';

      // 스타일 분류 (키워드 기반)
      const keywords = creator.keywords || [];
      const styles = [];
      if (keywords.some((k: string) => k.toLowerCase().includes('asmr'))) styles.push('ASMR');
      if (keywords.some((k: string) => k.includes('토크') || k.includes('talk'))) styles.push('토크');
      if (keywords.some((k: string) => k.includes('먹방') || k.includes('mukbang'))) styles.push('먹방');
      if (keywords.some((k: string) => k.includes('요리') || k.includes('cooking') || k.includes('recipe'))) styles.push('요리');
      if (keywords.some((k: string) => k.includes('대식') || k.includes('big eater'))) styles.push('대식가');
      if (keywords.some((k: string) => k.includes('리뷰') || k.includes('review'))) styles.push('리뷰');
      if (styles.length === 0) styles.push('먹방');

      // 음식 종류 분류
      const foodTypes = [];
      const desc = creator.description?.toLowerCase() || '';
      if (desc.includes('한식') || desc.includes('korean')) foodTypes.push('한식');
      if (desc.includes('중식') || desc.includes('chinese')) foodTypes.push('중식');
      if (desc.includes('일식') || desc.includes('japanese')) foodTypes.push('일식');
      if (desc.includes('양식') || desc.includes('western')) foodTypes.push('양식');
      if (desc.includes('디저트') || desc.includes('dessert')) foodTypes.push('디저트');
      if (foodTypes.length === 0) foodTypes.push('다양한 음식');

      // 가짜 리뷰 통계 생성
      const avgRating = 3.5 + Math.random() * 1.5; // 3.5-5.0
      const totalReviews = Math.floor(Math.random() * 100) + 10;

      return {
        id: creator.channelId,
        name: creator.name,
        description: creator.description || `${creator.name}의 먹방 채널`,
        thumbnail: creator.thumbnail,
        statistics: creator.statistics,
        foodCategories: {
          style: styles,
          foodType: foodTypes,
          channelSize: channelSize
        },
        reviewStats: {
          averageRating: parseFloat(avgRating.toFixed(1)),
          totalReviews: totalReviews,
          ratingDistribution: {
            5: Math.floor(totalReviews * 0.5),
            4: Math.floor(totalReviews * 0.3),
            3: Math.floor(totalReviews * 0.15),
            2: Math.floor(totalReviews * 0.04),
            1: Math.floor(totalReviews * 0.01)
          }
        },
        links: creator.links
      };
    });

    // 필터링
    if (style) {
      creators = creators.filter((c: any) => c.foodCategories.style.includes(style));
    }
    if (size) {
      creators = creators.filter((c: any) => c.foodCategories.channelSize === size);
    }

    // 페이지네이션
    const paginatedCreators = creators.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedCreators,
      total: creators.length,
      offset,
      limit
    });
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}
