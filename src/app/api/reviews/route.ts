import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');

    const reviewsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'reviews.json');

    let allReviews = [];

    if (fs.existsSync(reviewsFilePath)) {
      const reviewsContent = fs.readFileSync(reviewsFilePath, 'utf-8');
      allReviews = JSON.parse(reviewsContent);
    }

    // 크리에이터별 필터링
    let reviews = allReviews;
    if (creatorId) {
      reviews = allReviews.filter((r: any) => r.creatorId === creatorId);
    }

    return NextResponse.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { creatorId, userId, rating, title, content, tags } = body;

    // 필수 필드 확인
    if (!creatorId || !userId || !rating || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const reviewsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'reviews.json');

    let allReviews = [];

    // 기존 리뷰 읽기 (없으면 빈 배열)
    if (fs.existsSync(reviewsFilePath)) {
      const reviewsContent = fs.readFileSync(reviewsFilePath, 'utf-8');
      allReviews = JSON.parse(reviewsContent);
    }

    // 새 리뷰 추가
    const newReview = {
      id: `review-${Date.now()}`,
      creatorId,
      userId,
      rating,
      title: title || '',
      content,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      likes: 0,
      helpful: 0
    };

    allReviews.push(newReview);

    // 파일에 저장
    fs.writeFileSync(reviewsFilePath, JSON.stringify(allReviews, null, 2));

    return NextResponse.json({
      success: true,
      data: newReview
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
