'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import CreatorCard from '@/components/CreatorCard';
import { apiFetch } from '@/lib/api';

// Debounce hook to prevent excessive API calls while typing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface Creator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  keywords: string[];
  category: string;
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

const PAGE_SIZE = 12;

function CreatorsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, login, logout } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);

  // URL에서 초기값 가져오기
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [channelSizeFilter, setChannelSizeFilter] = useState<string>(searchParams.get('size') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 맞춤 추천 필터 상태
  const [showRecommendationFilters, setShowRecommendationFilters] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [channelSizePrefs, setChannelSizePrefs] = useState<string[]>([]);
  const [stylePrefs, setStylePrefs] = useState<string[]>([]);
  const [foodTypePrefs, setFoodTypePrefs] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [activeOnly, setActiveOnly] = useState<boolean>(false);

  const styleOptions = ['ASMR', '일반', '요리'];
  const foodTypeOptions = ['한식', '양식', '중식', '일식', '다양'];
  const channelSizeOptions = ['소형', '중형', '대형'];

  const fetchCreators = useCallback(async (
    page: number,
    search: string,
    channelSize: string,
    useRecommendation: boolean = false
  ) => {
    setLoading(true);
    try {
      if (useRecommendation && showRecommendationFilters) {
        // 맞춤 추천 API 호출
        const response = await apiFetch('api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            channelSize: channelSizePrefs,
            style: stylePrefs,
            foodType: foodTypePrefs,
            minRating,
            activeOnly,
            keywords: search,
            userId: user?.id || null
          })
        });
        const data = await response.json();
        if (data.success) {
          setCreators(data.data);
          setTotalCreators(data.total || 0);
          setIsPersonalized(data.isPersonalized || false);
          // 추천은 페이지네이션 없이 한 번에 보여줌
          setTotalPages(1);
        }
      } else {
        // 일반 목록 API 호출
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
          search: search,
        });

        if (channelSize) {
          params.append('channelSize', channelSize);
        }

        const response = await apiFetch(`api/creators?${params}`);
        const data = await response.json();
        if (data.success) {
          setCreators(data.data);
          setTotalCreators(data.pagination?.totalItems || 0);
          setTotalPages(data.pagination?.totalPages || 0);
          setIsPersonalized(false);
        }
      }
    } catch (error) {
      console.error('크리에이터 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [showRecommendationFilters, channelSizePrefs, stylePrefs, foodTypePrefs, minRating, activeOnly, user]);

  // URL 파라미터 업데이트 함수
  const updateURL = useCallback((page: number, search: string, size: string) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    if (size) params.set('size', size);

    const queryString = params.toString();
    const newUrl = `/creators${queryString ? `?${queryString}` : ''}`;

    // 현재 URL과 다를 때만 업데이트
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [router]);

  // 검색어나 필터가 변경되면 페이지를 1로 리셋 (초기 로드 제외)
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearchTerm, channelSizeFilter, showRecommendationFilters]);

  useEffect(() => {
    fetchCreators(currentPage, debouncedSearchTerm, channelSizeFilter, showRecommendationFilters);
    updateURL(currentPage, debouncedSearchTerm, channelSizeFilter);
  }, [currentPage, debouncedSearchTerm, channelSizeFilter, showRecommendationFilters]);

  const toggleArrayItem = (arr: string[], setArr: (arr: string[]) => void, value: string) => {
    if (arr.includes(value)) {
      setArr(arr.filter(v => v !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === i ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}>
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          이전
        </button>
        {startPage > 1 && <span className="px-4 py-2">...</span>}
        {pageNumbers}
        {endPage < totalPages && <span className="px-4 py-2">...</span>}
        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          다음
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">전체 크리에이터</h1>
          <p className="text-lg text-gray-600">CreatorHub에 등록된 {totalCreators}명의 크리에이터를 만나보세요.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="크리에이터 이름, 설명, 키워드로 검색..."
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            {/* 맞춤 추천 버튼 */}
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setShowRecommendationFilters(!showRecommendationFilters)}
                className={`px-8 py-3 rounded-full font-bold transition flex items-center gap-2 ${
                  showRecommendationFilters
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-purple-300'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                맞춤 추천 필터
                {showRecommendationFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* 맞춤 추천 상세 필터 */}
            {showRecommendationFilters && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-2 border-purple-200">
                {isPersonalized && user && (
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">
                      ✨ {user.name}님의 리뷰를 분석한 AI 맞춤 추천이 적용되었습니다!
                    </p>
                  </div>
                )}

                {/* 채널 규모 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">채널 규모</h3>
                  <div className="flex flex-wrap gap-2">
                    {channelSizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleArrayItem(channelSizePrefs, setChannelSizePrefs, size)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          channelSizePrefs.includes(size)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 콘텐츠 스타일 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">콘텐츠 스타일</h3>
                  <div className="flex flex-wrap gap-2">
                    {styleOptions.map((style) => (
                      <button
                        key={style}
                        onClick={() => toggleArrayItem(stylePrefs, setStylePrefs, style)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          stylePrefs.includes(style)
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 음식 종류 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">음식 종류</h3>
                  <div className="flex flex-wrap gap-2">
                    {foodTypeOptions.map((food) => (
                      <button
                        key={food}
                        onClick={() => toggleArrayItem(foodTypePrefs, setFoodTypePrefs, food)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          foodTypePrefs.includes(food)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {food}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 최소 평점 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
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
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0★</span>
                    <span>5★</span>
                  </div>
                </div>

                {/* 활동성 필터 */}
                <div className="mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeOnly}
                      onChange={(e) => setActiveOnly(e.target.checked)}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-medium">
                      🎬 최근 활동 중인 크리에이터만
                    </span>
                  </label>
                </div>
              </div>
            )}

          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-full mt-1"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {creators.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
            {renderPagination()}
          </>
        )}
      </main>
    </div>
  );
}

export default function CreatorsListPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">전체 크리에이터</h1>
            <p className="text-lg text-gray-600">로딩 중...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-full mt-1"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    }>
      <CreatorsListContent />
    </Suspense>
  );
}