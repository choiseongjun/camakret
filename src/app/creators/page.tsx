'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Search } from 'lucide-react';
import CreatorCard from '@/components/CreatorCard';

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

export default function CreatorsListPage() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelSizeFilter, setChannelSizeFilter] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchCreators = useCallback(async (page: number, search: string, channelSize: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
        search: search,
      });

      if (channelSize) {
        params.append('channelSize', channelSize);
      }

      const response = await fetch(`/api/creators?${params}`);
      const data = await response.json();
      if (data.success) {
        setCreators(data.data);
        setTotalCreators(data.pagination?.totalItems || 0);
        setTotalPages(data.pagination?.totalPages || 0);
      }
    } catch (error) {
      console.error('크리에이터 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, channelSizeFilter]);

  useEffect(() => {
    fetchCreators(currentPage, debouncedSearchTerm, channelSizeFilter);
  }, [currentPage, debouncedSearchTerm, channelSizeFilter, fetchCreators]);

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CreatorHub</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900"> ← 홈으로</Link>
              {!authLoading && (
                user ? (
                  <>
                    <span className="text-gray-800 text-sm font-medium">{user.name}님</span>
                    <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900">
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button onClick={login} className="text-sm font-medium text-orange-600 hover:text-orange-500">
                    로그인
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

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

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setChannelSizeFilter('')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                channelSizeFilter === '' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setChannelSizeFilter('대형')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                channelSizeFilter === '대형' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              대형
            </button>
            <button
              onClick={() => setChannelSizeFilter('중형')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                channelSizeFilter === '중형' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              중형
            </button>
            <button
              onClick={() => setChannelSizeFilter('소형')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                channelSizeFilter === '소형' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              소형
            </button>
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