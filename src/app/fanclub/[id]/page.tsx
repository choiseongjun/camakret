'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Users, Eye, Video, Heart, MessageCircle, ExternalLink, TrendingUp } from 'lucide-react';

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
  type: string;
  title?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorBadge?: string | null;
  createdAt: string;
  likes: number;
  likedBy: string[];
  comments: any[];
}

interface Poll {
  id: string;
  title: string;
  options: {
    text: string;
    votes: number;
    votedBy: string[];
  }[];
  creatorId: string;
  totalVotes: number;
  createdAt: string;
  endsAt: string;
  isActive: boolean;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  authorId: string;
  authorName: string;
  upvotes: number;
  upvotedBy: string[];
  status: string;
  createdAt: string;
}

export default function FanClub() {
  const params = useParams();
  const creatorId = params.id as string;

  const [creator, setCreator] = useState<Creator | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'polls' | 'suggestions'>('posts');
  const [showPostForm, setShowPostForm] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'discussion',
    title: '',
    content: '',
  });
  const [newPoll, setNewPoll] = useState({
    title: '',
    options: ['', ''],
  });
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
  });
  const [currentUserId] = useState('user-' + Date.now());

  useEffect(() => {
    if (creatorId) {
      fetchCreatorData();
      fetchPosts();
      fetchPolls();
      fetchSuggestions();
    }
  }, [creatorId]);

  const fetchCreatorData = async () => {
    try {
      const response = await fetch(`/api/creators/${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setCreator(data.data);
      }
    } catch (error) {
      console.error('크리에이터 정보 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/community?creatorId=${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    }
  };

  const fetchPolls = async () => {
    try {
      const response = await fetch(`/api/polls?creatorId=${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setPolls(data.data);
      }
    } catch (error) {
      console.error('투표 로드 실패:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`/api/suggestions?creatorId=${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.data);
      }
    } catch (error) {
      console.error('제안 로드 실패:', error);
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
          authorName: '익명 팬',
          creatorId: creatorId,
        }),
      });

      if (response.ok) {
        setShowPostForm(false);
        setNewPost({ type: 'discussion', title: '', content: '' });
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
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
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              뒤로가기
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🍜</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CreatorHub</span>
            </div>
          </div>
        </div>
      </header>

      {/* Creator Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-6">
            <img
              src={creator.thumbnail}
              alt={creator.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{creator.name} 팬클럽</h1>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{formatNumber(creator.statistics.subscribers)} 구독자</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{creator.reviewStats.averageRating.toFixed(1)} 평점</span>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={creator.links.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-orange-600 rounded-full font-medium hover:shadow-lg transition"
                >
                  YouTube 채널
                </a>
                <Link
                  href={`/creator/${creator.id}`}
                  className="px-6 py-2 bg-orange-700 text-white rounded-full font-medium hover:bg-orange-800 transition"
                >
                  상세정보
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{posts.length}</div>
            <div className="text-gray-600">팬클럽 게시글</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {posts.reduce((sum, p) => sum + p.likes, 0)}
            </div>
            <div className="text-gray-600">총 좋아요</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{creator.reviewStats.totalReviews}</div>
            <div className="text-gray-600">리뷰</div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">팬클럽 피드</h2>
            <button
              onClick={() => setShowPostForm(true)}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition"
            >
              글쓰기
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">아직 게시글이 없습니다.</p>
              <p className="text-gray-400 text-sm">첫 번째 게시글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {post.authorName[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{post.authorName}</span>
                        {post.authorBadge && (
                          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                            {post.authorBadge}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {post.title && (
                        <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                      )}
                      <p className="text-gray-700 mb-3 whitespace-pre-line">{post.content}</p>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 ${
                            post.likedBy?.includes(currentUserId)
                              ? 'text-red-500'
                              : 'text-gray-500 hover:text-red-500'
                          } transition`}
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-orange-500 transition">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments?.length || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">게시글 작성</h3>

            <div className="space-y-4">
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
