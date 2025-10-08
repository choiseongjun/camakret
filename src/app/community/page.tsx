"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type PostType = "all" | "discussion" | "recommendation" | "review" | "poll" | "suggestion";

interface Post {
  id: string;
  type: string;
  title?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorBadge?: string | null;
  creatorId?: string | null;
  tags: string[];
  images: string[];
  createdAt: string;
  likes: number;
  likedBy: string[];
  comments: any[];
  isPinned: boolean;
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
      const response = await fetch(`/api/community/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'like',
          userId: currentUserId,
        }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  const samplePosts = [
    {
      id: 1,
      author: "먹방러버",
      authorBadge: "🔥 인기 멤버",
      tier: "discussion",
      timestamp: "10분 전",
      content: "요즘 핫한 먹방 크리에이터 추천해주세요! 🍜\n\nASMR 스타일 좋아하는데 새로운 채널 발견하고 싶어요. 여러분이 요즘 보고 있는 크리에이터는 누구인가요?\n\n특히 중식이나 한식 전문 채널이면 더 좋을 것 같아요!",
      image: null,
      likes: 45,
      comments: 23,
      isPinned: true
    },
    {
      id: 2,
      author: "푸드헌터",
      authorBadge: "⭐ 리뷰왕",
      tier: "recommendation",
      timestamp: "1시간 전",
      content: "Jane ASMR 제인님 완전 강추합니다! ✨\n\n구독자 1800만 명이 괜히 있는 게 아니에요. ASMR 사운드 퀄리티가 정말 좋고, 음식 선택도 다양해서 질리지 않아요.\n\n입문자분들에게도 추천드립니다!",
      image: null,
      likes: 89,
      comments: 34,
      isPinned: false
    },
    {
      id: 3,
      author: "먹스타그램",
      authorBadge: "🍕 음식 탐험가",
      tier: "review",
      timestamp: "2시간 전",
      content: "Hongyu ASMR 홍유님 리뷰 남겨요! ⭐⭐⭐⭐⭐\n\nASMR 퀄리티가 정말 좋아요. 특히 치킨 먹방이 레전드입니다. 바삭한 소리 듣고 있으면 힐링되는 느낌?\n\n구독자 1600만 명의 위엄을 느낄 수 있어요 👍",
      image: "https://via.placeholder.com/400x300",
      likes: 124,
      comments: 45,
      isPinned: false,
      verified: true
    },
    {
      id: 4,
      author: "야식러",
      authorBadge: "🌙 심야 먹방러",
      tier: "discussion",
      timestamp: "5시간 전",
      content: "밤에 보기 좋은 먹방 추천해주세요! 🌃\n\n야식 땡길 때 보면 좋은 채널 있나요? 소리가 좋고 분위기 있는 채널 선호합니다.\n\nASMR이면 더 좋구요!",
      image: null,
      likes: 67,
      comments: 56,
      isPinned: false
    },
    {
      id: 5,
      author: "맛집탐방",
      authorBadge: null,
      tier: "recommendation",
      timestamp: "어제",
      content: "요리 배우고 싶으면 이 채널들 보세요! 👨‍🍳\n\n먹방만 보다가 요리도 배우고 싶어서 찾아봤는데, 요리 과정 보여주는 크리에이터들도 많더라구요.\n\n따라하기 쉽고 설명도 친절해서 초보자에게 딱이에요!",
      image: null,
      likes: 156,
      comments: 78,
      isPinned: false
    }
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;
  const filteredPosts = displayPosts.filter((post: any) =>
    activeFilter === "all" || post.type === activeFilter || post.tier === activeFilter
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
            <div key={post.id} className={`bg-white rounded-2xl border-2 ${
              post.isPinned ? "border-orange-400" : "border-gray-200"
            } overflow-hidden hover:shadow-lg transition`}>

              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {(post.authorName || post.author || '익명')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{post.authorName || post.author || '익명'}</span>
                        {post.authorBadge && (
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full font-semibold">
                            {post.authorBadge}
                          </span>
                        )}
                        {post.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                            ✓ 인증
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{post.timestamp}</div>
                    </div>
                  </div>
                  {post.isPinned && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-semibold">
                      📌 인기
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-gray-900 whitespace-pre-line mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Image */}
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="" className="w-full" />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition ${
                      post.likedBy?.includes(currentUserId)
                        ? 'text-red-500'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    <span className="text-xl">❤️</span>
                    <span className="font-semibold">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                    <span className="text-xl">💬</span>
                    <span className="font-semibold">{post.comments?.length || post.comments || 0}</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
