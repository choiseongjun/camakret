'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Search, Star, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

const PAGE_SIZE = 12;

export default function Home() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const [allCreators, setAllCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCreators, setTotalCreators] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchInitialCreators();
  }, []);

  useEffect(() => {
    let filtered = allCreators;
    if (searchTerm) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStyle) {
      filtered = filtered.filter(creator =>
        creator.foodCategories.style.includes(selectedStyle)
      );
    }
    if (selectedSize) {
      filtered = filtered.filter(creator =>
        creator.foodCategories.channelSize === selectedSize
      );
    }
    setFilteredCreators(filtered);
  }, [allCreators, searchTerm, selectedStyle, selectedSize]);

  const fetchInitialCreators = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/creators?page=1&limit=${PAGE_SIZE}`);
      const data = await response.json();
      if (data.success) {
        setAllCreators(data.data);
        setTotalCreators(data.total);
      }
    } catch (error) {
      console.error('크리에이터 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || allCreators.length >= totalCreators) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/creators?page=${nextPage}&limit=${PAGE_SIZE}`);
      const data = await response.json();
      if (data.success) {
        setAllCreators(prev => [...prev, ...data.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('추가 데이터 로드 실패:', error);
    } finally {
      setLoadingMore(false);
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

  const hasMoreCreators = allCreators.length < totalCreators;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CreatorHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/creators" className="text-gray-600 hover:text-gray-900 transition">크리에이터</Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900 transition">커뮤니티</Link>
              <Link href="/reviews" className="text-gray-600 hover:text-gray-900 transition">리뷰</Link>
              {!authLoading && (
                user ? (
                  <>
                    <span className="text-gray-800 font-medium">{user.name}님</span>
                    <button onClick={logout} className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition">
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                    로그인
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              당신이 좋아하는 크리에이터를<br />찾아보세요
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              수천 명의 크리에이터와 함께하는 플랫폼
            </p>
            <Link
              href="/creators"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              크리에이터 둘러보기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="크리에이터 이름이나 설명으로 검색..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full text-lg focus:outline-none focus:border-orange-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <select
              className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              <option value="">모든 스타일</option>
              <option value="ASMR">ASMR</option>
              <option value="토크">토크</option>
              <option value="대식가">대식가</option>
              <option value="리뷰">리뷰</option>
            </select>

            <select
              className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">모든 규모</option>
              <option value="대형">대형 (100만+)</option>
              <option value="중형">중형 (10만+)</option>
              <option value="소형">소형 (~10만)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">추천 크리에이터</h2>
            <Link href="/creators" className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
              전체보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCreators.slice(0, 8).map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/creator/${creator.id}`}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={creator.thumbnail}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-100"
                        onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                      />
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                        {creator.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(creator.reviewStats.averageRating)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({creator.reviewStats.totalReviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {formatNumber(creator.statistics.subscribers)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {creator.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMoreCreators && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loadingMore ? '로딩 중...' : '더 보기'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            크리에이터가 되어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            당신의 콘텐츠를 더 많은 사람들과 공유하세요
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            시작하기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}