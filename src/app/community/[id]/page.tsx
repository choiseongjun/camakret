'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Users, Eye, Video, Heart, MessageCircle, ExternalLink, ThumbsUp, TrendingUp, Calendar } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  statistics: {
    subscribers: number;
    totalViews: number;
    videoCount: number;
  };
  foodCategories: {
    style: string[];
    foodType: string[];
    channelSize: string;
  };
  reviewStats: {
    averageRating: number;
    totalReviews: number;
  };
  links: {
    channel: string;
  };
}

interface Post {
  id: string;
  type: 'discussion' | 'review' | 'recommendation' | 'poll' | 'suggestion';
  title?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorBadge?: string;
  tags: string[];
  createdAt: string;
  likes: number;
  likedBy: string[];
  comments: any[];
  isPinned: boolean;
}

export default function CreatorCommunity() {
  const params = useParams();
  const creatorId = params.id as string;
  
  const [creator, setCreator] = useState<Creator | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'reviews' | 'polls'>('posts');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'discussion' as const,
    title: '',
    content: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (creatorId) {
      fetchCreatorDetail();
      fetchCommunityPosts();
    }
  }, [creatorId]);

  const fetchCreatorDetail = async () => {
    try {
      const response = await fetch(`/api/creators/${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setCreator(data.data);
      }
    } catch (error) {
      console.error('크리에이터 정보 로드 실패:', error);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      const response = await fetch(`/api/community?creatorId=${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('커뮤니티 게시글 로드 실패:', error);
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
          authorId: 'user-' + Date.now(),
          authorName: '익명 사용자',
          creatorId: creatorId,
        }),
      });

      if (response.ok) {
        setShowPostForm(false);
        setNewPost({ type: 'discussion', title: '', content: '', tags: [] });
        fetchCommunityPosts();
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion': return '💬';
      case 'review': return '⭐';
      case 'recommendation': return '👍';
      case 'poll': return '📊';
      case 'suggestion': return '💡';
      default: return '💬';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discussion': return '토론';
      case 'review': return '리뷰';
      case 'recommendation': return '추천';
      case 'poll': return '투표';
      case 'suggestion': return '제안';
      default: return '토론';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">소통공간을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">크리에이터를 찾을 수 없습니다</h1>
          <Link href="/" className="text-orange-600 hover:text-orange-700">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/creator/${creatorId}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              뒤로가기
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{creator.name} 소통공간</div>
                <div className="text-xs text-gray-600">크리에이터와 팬이 함께하는 공간</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creator Info Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <img
                src={creator.thumbnail}
                alt={creator.name}
                className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0"
                onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
            </div>
            
            <div className="lg:w-3/4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{creator.name}</h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(creator.statistics.subscribers)}</div>
                  <div className="text-sm text-gray-600">구독자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(creator.statistics.totalViews)}</div>
                  <div className="text-sm text-gray-600">총 조회수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(creator.statistics.videoCount)}</div>
                  <div className="text-sm text-gray-600">영상 수</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {renderStars(creator.reviewStats.averageRating)}
                  </div>
                  <div className="text-sm text-gray-600">{creator.reviewStats.averageRating.toFixed(1)} ({creator.reviewStats.totalReviews} 리뷰)</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {creator.foodCategories.style.slice(0, 3).map((style) => (
                  <span key={style} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {style}
                  </span>
                ))}
                {creator.foodCategories.foodType.slice(0, 2).map((type) => (
                  <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={creator.links.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube 채널
                </a>
                <Link
                  href={`/creator/${creatorId}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  <Star className="w-4 h-4" />
                  크리에이터 정보
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === 'posts'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              💬 게시글
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ⭐ 리뷰
            </button>
            <button
              onClick={() => setActiveTab('polls')}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === 'polls'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 투표
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  아직 게시글이 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  첫 번째 게시글을 작성해보세요!
                </p>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition"
                >
                  게시글 작성하기
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className={`bg-white rounded-2xl border-2 ${
                  post.isPinned ? "border-orange-400" : "border-gray-200"
                } overflow-hidden hover:shadow-lg transition`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.authorName[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{post.authorName}</span>
                            <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              {getTypeIcon(post.type)} {getTypeLabel(post.type)}
                            </span>
                            {post.authorBadge && (
                              <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full font-semibold">
                                {post.authorBadge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      {post.isPinned && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-semibold">
                          📌 인기
                        </span>
                      )}
                    </div>

                    {post.title && (
                      <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                    )}
                    
                    <p className="text-gray-900 whitespace-pre-line mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                        <Heart className="w-4 h-4" />
                        <span className="font-semibold">{post.likes || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-semibold">{post.comments?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-semibold">공유</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              리뷰 기능 준비 중
            </h3>
            <p className="text-gray-600">
              곧 크리에이터에 대한 리뷰를 작성하고 확인할 수 있습니다.
            </p>
          </div>
        )}

        {activeTab === 'polls' && (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              투표 기능 준비 중
            </h3>
            <p className="text-gray-600">
              곧 크리에이터와 함께 투표할 수 있는 기능이 추가됩니다.
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
                    onClick={() => setNewPost({ ...newPost, type: 'review' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      newPost.type === 'review'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ⭐ 리뷰
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'recommendation' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      newPost.type === 'recommendation'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    👍 추천
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
                  rows={6}
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
