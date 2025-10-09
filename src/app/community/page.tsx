'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

type PostType = "all" | "discussion" | "recommendation" | "review" | "poll" | "suggestion";

interface Post {
  id: string;
  category: string;
  title?: string;
  content: string;
  author_id: string;
  author_name: string;
  creator_id?: string | null;
  tags: string[];
  images: string[];
  created_at: string;
  likes: number;
}

export default function Community() {
  const [activeFilter, setActiveFilter] = useState<PostType>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'discussion' as PostType,
    title: '',
    content: '',
    tags: [] as string[],
  });
  const [currentUserId] = useState('user-' + Date.now());

  useEffect(() => {
    fetchPosts();
  }, [activeFilter]);

  const fetchPosts = async () => {
    try {
      const url = activeFilter === 'all'
        ? '/api/community'
        : `/api/community?type=${activeFilter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!newPost.content.trim()) return;

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPost,
          authorId: currentUserId,
          authorName: '익명 사용자',
        }),
      });

      if (response.ok) {
        setShowPostForm(false);
        setNewPost({ type: 'discussion', title: '', content: '', tags: [] });
        fetchPosts();
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/community/${postId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'like',
            userId: currentUserId,
          }),
        }
      );

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  const filteredPosts = posts.filter((post: any) =>
    activeFilter === "all" || post.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">CreatorHub 커뮤니티</div>
                <div className="text-xs text-gray-600">크리에이터와 팬이 함께하는 공간</div>
              </div>
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← 홈으로
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">5,234</div>
              <div className="text-sm text-orange-100">전체 멤버</div>
            </div>
            <div>
              <div className="text-2xl font-bold">377+</div>
              <div className="text-sm text-orange-100">크리에이터</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1,423</div>
              <div className="text-sm text-orange-100">리뷰</div>
            </div>
            <div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-orange-100">새 게시물</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-2 mb-6 border border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              전체 피드
            </button>
            <button
              onClick={() => setActiveFilter("discussion")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "discussion"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              💬 토론
            </button>
            <button
              onClick={() => setActiveFilter("recommendation")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "recommendation"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              ⭐ 추천
            </button>
            <button
              onClick={() => setActiveFilter("review")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "review"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📝 리뷰
            </button>
            <button
              onClick={() => setActiveFilter("poll")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "poll"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📊 투표
            </button>
            <button
              onClick={() => setActiveFilter("suggestion")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "suggestion"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              💡 제안
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className={`bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition`}>

              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {(post.author_name || '익명')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{post.author_name || '익명'}</span>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-900 whitespace-pre-line mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    <span className="text-xl">❤️</span>
                    <span className="font-semibold">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                    <span className="text-xl">💬</span>
                    <span className="font-semibold">댓글</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                    <span className="text-xl">🔗</span>
                    <span className="font-semibold">공유</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              아직 게시물이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              첫 번째 게시물을 작성해보세요!
            </p>
          </div>
        )}
      </div>

      {/* Floating Write Button */}
      <button
        onClick={() => setShowPostForm(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition flex items-center justify-center text-2xl"
      >
        ✏️
      </button>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">게시글 작성</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'discussion' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      newPost.type === 'discussion'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    💬 토론
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'recommendation' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      newPost.type === 'recommendation'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ⭐ 추천
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'review' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      newPost.type === 'review'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📝 리뷰
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 (선택)</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={8}
                  placeholder="내용을 입력하세요"
                  maxLength={1000}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {newPost.content.length}/1000
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmitPost}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition"
                disabled={!newPost.content.trim()}
              >
                게시글 작성
              </button>
              <button
                onClick={() => setShowPostForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}