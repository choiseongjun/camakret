import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// 데이터베이스 연결 풀 생성 (환경 변수 사용)
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// DB 컬럼 이름을 프론트엔드에서 사용하는 JSON 객체 구조로 변환하는 함수
const mapToCreatorObject = (row: any) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  thumbnail: row.thumbnail_url,
  statistics: {
    subscribers: parseInt(row.subscribers, 10) || 0,
    totalViews: parseInt(row.total_views, 10) || 0,
    videoCount: parseInt(row.video_count, 10) || 0,
  },
  foodCategories: {
    style: row.category ? [row.category] : [], // DB에 따라 조정 필요
    foodType: [], // DB에 따라 조정 필요
    channelSize: getChannelSize(parseInt(row.subscribers, 10) || 0),
  },
  reviewStats: {
    averageRating: 0, // DB에 리뷰 테이블이 없으므로 임시값
    totalReviews: 0, // DB에 리뷰 테이블이 없으므로 임시값
  },
  links: {
    channel: row.channel_url,
  },
});

const getChannelSize = (subscribers: number) => {
  if (subscribers >= 1000000) return '대형';
  if (subscribers >= 100000) return '중형';
  return '소형';
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * limit;

  let client;
  try {
    client = await pool.connect();
    
    const searchParamsList: any[] = [];
    let whereClause = '';
    if (search) {
      searchParamsList.push(`%${search}%`);
      whereClause = `WHERE name ILIKE $1 OR description ILIKE $1`;
    }

    // 전체 카운트를 가져오는 쿼리
    const totalResult = await client.query(`SELECT COUNT(*) FROM creators ${whereClause}`, searchParamsList);
    const total = parseInt(totalResult.rows[0].count, 10);

    // 페이지네이션된 데이터를 가져오는 쿼리
    const dataParams = [...searchParamsList];
    const limitIndex = dataParams.length + 1;
    const offsetIndex = dataParams.length + 2;
    dataParams.push(limit, offset);

    const dataQuery = `SELECT * FROM creators ${whereClause} ORDER BY subscribers DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
    const dataResult = await client.query(dataQuery, dataParams);

    const creators = dataResult.rows.map(mapToCreatorObject);

    return NextResponse.json({ 
      success: true, 
      data: creators, 
      total: total,
      page: page,
      limit: limit
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}