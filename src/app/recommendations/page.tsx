'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, User, Flame, Check, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Creator {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
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
  isActive: boolean;
  recommendationScore: number;
}

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [channelSize, setChannelSize] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [activeOnly, setActiveOnly] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string>('');

  const [recommendations, setRecommendations] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [isPersonalized, setIsPersonalized] = useState<boolean>(false);
  const [userPreferences, setUserPreferences] = useState<any>(null);

  const channelSizeOptions = ['소형', '중형', '대형'];
  const styleOptions = ['ASMR', '일반', '요리'];
  const foodTypeOptions = ['한식', '양식', '중식', '일식', '다양'];

  const getRecommendations = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelSize,
          style,
          foodType,
          minRating,
          activeOnly,
          keywords,
          userId: user?.id || null
        }),
      });

      if (!response.ok) {
        throw new Error('추천을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      setRecommendations(data.data);
      setTotal(data.total);
      setIsPersonalized(data.isPersonalized);
      setUserPreferences(data.userPreferences);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 초기 로드
    getRecommendations();
  }, []);

  const toggleSelection = (arr: string[], setArr: (arr: string[]) => void, value: string) => {
    if (arr.includes(value)) {
      setArr(arr.filter(v => v !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}천만`;
    if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
    return num.toLocaleString();
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              나에게 맞는 크리에이터 찾기
            </h1>
            {isPersonalized && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI 맞춤 추천
              </span>
            )}
          </div>
          <p className="text-gray-600">
            {isPersonalized
              ? `${user?.name}님의 리뷰 ${userPreferences?.reviewCount}개를 분석해서 맞춤 추천해드립니다`
              : '선호하는 조건을 선택하면 딱 맞는 크리에이터를 추천해드립니다'
            }
          </p>
          {isPersonalized && userPreferences && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">선호 스타일:</span>
              {userPreferences.favoriteStyles.map((s: string, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  {s}
                </span>
              ))}
              <span className="text-sm text-gray-600 ml-2">선호 음식:</span>
              {userPreferences.favoriteFoodTypes.map((f: string, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* 키워드 검색 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">키워드 검색</h3>
            <input
              type="text"
              placeholder="크리에이터 이름, 설명, 키워드로 검색..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-sm text-gray-500 mt-2">
              예: &quot;먹방&quot;, &quot;ASMR&quot;, &quot;요리&quot;, &quot;한식&quot; 등
            </p>
          </div>

          {/* 채널 크기 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">채널 규모</h3>
            <div className="flex flex-wrap gap-2">
              {channelSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSelection(channelSize, setChannelSize, size)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    channelSize.includes(size)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {channelSize.includes(size) && <Check className="inline mr-1 w-4 h-4" />}
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 콘텐츠 스타일 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">콘텐츠 스타일</h3>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSelection(style, setStyle, s)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    style.includes(s)
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {style.includes(s) && <Check className="inline mr-1 w-4 h-4" />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 음식 종류 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">음식 종류</h3>
            <div className="flex flex-wrap gap-2">
              {foodTypeOptions.map((food) => (
                <button
                  key={food}
                  onClick={() => toggleSelection(foodType, setFoodType, food)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    foodType.includes(food)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                  }`}
                >
                  {foodType.includes(food) && <Check className="inline mr-1 w-4 h-4" />}
                  {food}
                </button>
              ))}
            </div>
          </div>

          {/* 최소 평점 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              최소 평점: {minRating.toFixed(1)}★
            </h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>0★</span>
              <span>5★</span>
            </div>
          </div>

          {/* 활동 중인 크리에이터만 */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 flex items-center">
                <Flame className="inline text-orange-500 mr-1 w-4 h-4" />
                최근 활동 중인 크리에이터만 보기
              </span>
            </label>
          </div>

          {/* 추천 버튼 */}
          <button
            onClick={getRecommendations}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '추천 생성 중...' : '🎯 나에게 맞는 크리에이터 찾기'}
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* 추천 결과 */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              추천 크리에이터 ({recommendations.length}명 / 전체 {total}명)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((creator) => (
                <Link
                  key={creator.id}
                  href={`/creator/${creator.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* 썸네일 */}
                  <div className="relative h-48 bg-gray-200">
                    {creator.thumbnail && (
                      <img
                        src={creator.thumbnail}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {creator.isActive && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Flame className="mr-1 w-3 h-3" />
                        활동중
                      </div>
                    )}
                    {/* 추천 점수 */}
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      매칭도 {creator.recommendationScore}점
                    </div>
                  </div>

                  {/* 정보 */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                      {creator.name}
                    </h3>

                    {/* 통계 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="mr-1 w-4 h-4" />
                        {formatNumber(creator.statistics.subscribers)}
                      </div>
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="mr-1 w-4 h-4 fill-yellow-500" />
                        {creator.reviewStats.averageRating.toFixed(1)} ({creator.reviewStats.totalReviews})
                      </div>
                    </div>

                    {/* 카테고리 태그 */}
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {creator.foodCategories.channelSize}
                      </span>
                      {creator.foodCategories.style.map((s, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {s}
                        </span>
                      ))}
                      {creator.foodCategories.foodType.slice(0, 2).map((f, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 결과 없음 */}
        {!loading && recommendations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">
              조건에 맞는 크리에이터를 찾을 수 없습니다
            </p>
            <p className="text-gray-500">
              필터 조건을 조정해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
