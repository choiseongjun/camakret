'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Users, Eye, Video, Heart, MessageCircle, ExternalLink, ThumbsUp } from 'lucide-react';
import { StarRating } from '@/app/components/StarRating';

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
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  links: {
    channel: string;
  };
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
  helpful: number;
}

export default function CreatorDetail() {
  const params = useParams();
  const creatorId = params.id as string;

  const [creator, setCreator] = useState<Creator | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (creatorId) {
      fetchCreatorDetail();
    }
  }, [creatorId]);

  const fetchCreatorDetail = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/creators/${creatorId}`);
      const data = await response.json();

      if (data.success) {
        setCreator(data.data);
        setReviews(data.data.reviews || []);
      }
    } catch (error) {
      console.error('크리에이터 정보 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.rating || !newReview.content.trim()) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId: creatorId,
          userId: 'user-' + Date.now(), // 임시 사용자 ID
          ...newReview
        }),
      });

      if (response.ok) {
        setShowReviewForm(false);
        setNewReview({ rating: 5, title: '', content: '', tags: [] });
        fetchCreatorDetail(); // 데이터 새로고침
      }
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const tagOptions = ['재미있어요', '힐링돼요', '먹고싶어져요', 'ASMR좋아요', '요리배우고싶어요', '다양한음식'];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creator Info */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <img
                src={creator.thumbnail}
                alt={creator.name}
                className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0"
                onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
            </div>
            
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{creator.name}</h1>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{formatNumber(creator.statistics.subscribers)} 구독자</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{formatNumber(creator.statistics.totalViews)} 조회수</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{formatNumber(creator.statistics.videoCount)} 영상</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <StarRating rating={creator.reviewStats.averageRating} size="lg" />
                  <span className="text-lg font-semibold text-gray-900 ml-2">
                    {creator.reviewStats.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">({creator.reviewStats.totalReviews} 리뷰)</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  creator.foodCategories.channelSize === '대형' 
                    ? 'bg-red-100 text-red-800'
                    : creator.foodCategories.channelSize === '중형'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {creator.foodCategories.channelSize} 채널
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {creator.foodCategories.style.map((style) => (
                  <span key={style} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {style}
                  </span>
                ))}
                {creator.foodCategories.foodType.map((type) => (
                  <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {creator.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={creator.links.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube 채널
                </a>
                <Link
                  href={`/community/${creator.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:shadow-lg transition"
                >
                  <Users className="w-4 h-4" />
                  소통공간
                </Link>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-50 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  리뷰 작성
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        {creator.reviewStats.totalReviews > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">평점 분포</h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = creator.reviewStats.ratingDistribution[rating as keyof typeof creator.reviewStats.ratingDistribution];
                const percentage = creator.reviewStats.totalReviews > 0 
                  ? (count / creator.reviewStats.totalReviews) * 100 
                  : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-gray-600">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">리뷰 ({reviews.length})</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition"
            >
              리뷰 작성
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">아직 리뷰가 없습니다.</p>
              <p className="text-gray-400 text-sm">첫 번째 리뷰를 작성해보세요!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {String(review.userId).charAt(String(review.userId).length - 1)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">익명 사용자</span>
                        <div className="flex items-center gap-1">
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                      )}
                      <p className="text-gray-700 mb-3">{review.content}</p>
                      {review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {review.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          도움됨 ({review.helpful})
                        </button>
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <Heart className="w-4 h-4" />
                          좋아요 ({review.likes})
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

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">리뷰 작성</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">평점</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="focus:outline-none"
                    >
                      <Star className={`w-8 h-8 ${rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 (선택)</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="리뷰 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder="리뷰 내용을 입력하세요"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {newReview.content.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">태그 (선택)</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        const tags = newReview.tags.includes(tag)
                          ? newReview.tags.filter(t => t !== tag)
                          : [...newReview.tags, tag];
                        setNewReview({ ...newReview, tags });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newReview.tags.includes(tag)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmitReview}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition"
                disabled={!newReview.rating || !newReview.content.trim()}
              >
                리뷰 작성
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
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
