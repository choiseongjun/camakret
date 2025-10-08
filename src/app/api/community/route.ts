import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const creatorId = searchParams.get('creatorId');

    const postsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'community-posts.json');

    let allPosts = [];

    if (fs.existsSync(postsFilePath)) {
      const postsContent = fs.readFileSync(postsFilePath, 'utf-8');
      allPosts = JSON.parse(postsContent);
    }

    // 필터링
    let posts = allPosts;

    if (type && type !== 'all') {
      posts = posts.filter((p: any) => p.type === type);
    }

    if (creatorId) {
      posts = posts.filter((p: any) => p.creatorId === creatorId);
    }

    // 최신순 정렬
    posts.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, content, authorId, authorName, creatorId, tags, images } = body;

    // 필수 필드 확인
    if (!type || !content || !authorId || !authorName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const postsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'community-posts.json');

    let allPosts = [];

    // 기존 게시글 읽기
    if (fs.existsSync(postsFilePath)) {
      const postsContent = fs.readFileSync(postsFilePath, 'utf-8');
      allPosts = JSON.parse(postsContent);
    }

    // 새 게시글 추가
    const newPost = {
      id: `post-${Date.now()}`,
      type, // discussion, recommendation, review
      title: title || '',
      content,
      authorId,
      authorName,
      authorBadge: null, // 추후 구현
      creatorId: creatorId || null,
      tags: tags || [],
      images: images || [],
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
      isPinned: false
    };

    allPosts.push(newPost);

    // 파일에 저장
    fs.writeFileSync(postsFilePath, JSON.stringify(allPosts, null, 2));

    return NextResponse.json({
      success: true,
      data: newPost
    });
  } catch (error) {
    console.error('Error creating community post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create community post' },
      { status: 500 }
    );
  }
}
