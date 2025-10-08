import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 좋아요 토글
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const body = await request.json();
    const { action, userId, commentText } = body;

    const postsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'community-posts.json');

    if (!fs.existsSync(postsFilePath)) {
      return NextResponse.json(
        { success: false, error: 'Posts file not found' },
        { status: 404 }
      );
    }

    const postsContent = fs.readFileSync(postsFilePath, 'utf-8');
    const allPosts = JSON.parse(postsContent);

    const postIndex = allPosts.findIndex((p: any) => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = allPosts[postIndex];

    if (action === 'like') {
      // 좋아요 토글
      if (!post.likedBy) post.likedBy = [];

      if (post.likedBy.includes(userId)) {
        post.likedBy = post.likedBy.filter((id: string) => id !== userId);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.likedBy.push(userId);
        post.likes = (post.likes || 0) + 1;
      }
    } else if (action === 'comment') {
      // 댓글 추가
      if (!post.comments) post.comments = [];

      const newComment = {
        id: `comment-${Date.now()}`,
        userId,
        text: commentText,
        createdAt: new Date().toISOString(),
        likes: 0
      };

      post.comments.push(newComment);
    }

    allPosts[postIndex] = post;

    // 파일에 저장
    fs.writeFileSync(postsFilePath, JSON.stringify(allPosts, null, 2));

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
