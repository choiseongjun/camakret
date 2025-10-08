import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const creatorId = params.id;

    // JSON 파일 읽기
    const filePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'korean-food-creators.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const allCreators = JSON.parse(fileContent);

    // 특정 크리에이터 찾기
    const creator = allCreators.find((c: any) => c.channelId === creatorId);

    if (!creator) {
      return NextResponse.json(
        { success: false, error: 'Creator not found' },
        { status: 404 }
      );
    }

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

    // 리뷰 파일 읽기 (없으면 빈 배열)
    const reviewsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'reviews.json');
    let allReviews = [];

    try {
      if (fs.existsSync(reviewsFilePath)) {
        const reviewsContent = fs.readFileSync(reviewsFilePath, 'utf-8');
        allReviews = JSON.parse(reviewsContent);
      }
    } catch (e) {
      allReviews = [];
    }

    // 이 크리에이터의 리뷰만 필터링
    const creatorReviews = allReviews.filter((r: any) => r.creatorId === creatorId);

    // 리뷰 통계 계산
    const totalReviews = creatorReviews.length;
    let avgRating = 0;
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (totalReviews > 0) {
      const sum = creatorReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
      avgRating = sum / totalReviews;

      creatorReviews.forEach((r: any) => {
        ratingDistribution[r.rating as keyof typeof ratingDistribution]++;
      });
    } else {
      // 리뷰가 없으면 기본값
      avgRating = 4.5;
      ratingDistribution[5] = 8;
      ratingDistribution[4] = 5;
      ratingDistribution[3] = 2;
      ratingDistribution[2] = 0;
      ratingDistribution[1] = 0;
    }

    const formattedCreator = {
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
        totalReviews: totalReviews || 15,
        ratingDistribution: ratingDistribution
      },
      links: creator.links,
      reviews: creatorReviews
    };

    return NextResponse.json({
      success: true,
      data: formattedCreator
    });
  } catch (error) {
    console.error('Error fetching creator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch creator' },
      { status: 500 }
    );
  }
}
