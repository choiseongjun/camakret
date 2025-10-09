'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Search, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CreatorCard from '@/components/CreatorCard';

interface Creator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  keywords?: string[];
  category?: string;
  statistics: {
    subscribers: number;
    totalViews: number;
    videoCount: number;
  };
  foodCategories: {
    style?: string[];
    foodType?: string[];
    channelSize: string;
  };
  reviewStats?: {
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
        creator?.foodCategories?.style?.includes(selectedStyle)
      );
    }
    if (selectedSize) {
      filtered = filtered.filter(creator =>
        creator?.foodCategories?.channelSize === selectedSize
      );
    }
    setFilteredCreators(filtered);
  }, [allCreators, searchTerm, selectedStyle, selectedSize]);

  const fetchInitialCreators = async () => {
    setLoading(true);
    try {
      // 랜덤하게 정렬된 크리에이터 가져오기
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/creators?page=1&limit=50&sortBy=random`);
      const data = await response.json();
      if (data.success) {
        // 응답 데이터를 섞어서 무작위로 표시
        const shuffled = [...data.data].sort(() => Math.random() - 0.5);
        setAllCreators(shuffled);
        setTotalCreators(data.pagination?.totalItems || data.total || shuffled.length);
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/creators?page=${nextPage}&limit=${PAGE_SIZE}`);
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

  const hasMoreCreators = false; // 메인 페이지에서는 더보기 비활성화

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
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse h-[400px]">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.slice(0, 12).map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">CreatorHub가 특별한 이유</h2>
            <p className="text-xl text-gray-600">크리에이터와 팬을 연결하는 최고의 플랫폼</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">맞춤 추천</h3>
              <p className="text-gray-600">
                당신의 취향에 맞는 크리에이터를 AI가 추천해드립니다.
                카테고리, 키워드, 구독자 수 등 다양한 필터로 원하는 크리에이터를 쉽게 찾아보세요.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">활발한 커뮤니티</h3>
              <p className="text-gray-600">
                크리에이터와 팬들이 소통하는 공간.
                리뷰를 남기고, 커뮤니티 게시글로 의견을 공유하며 함께 성장하세요.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">신뢰할 수 있는 정보</h3>
              <p className="text-gray-600">
                실제 사용자들의 리뷰와 평점으로 검증된 크리에이터 정보.
                투명하고 정확한 통계 데이터를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">{totalCreators.toLocaleString()}+</div>
              <div className="text-xl text-gray-300">검증된 크리에이터</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl text-gray-300">실시간 업데이트</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl text-gray-300">무료 서비스</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 로그인 안된 사용자만 */}
      {!authLoading && !user && (
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              CreatorHub에서 당신이 좋아하는 크리에이터를 발견하고 소통하세요
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
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🎬</span>
                </div>
                <span className="text-xl font-bold text-white">CreatorHub</span>
              </div>
              <p className="text-sm">
                크리에이터와 팬을 연결하는<br />
                최고의 플랫폼
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/creators" className="hover:text-white transition">크리에이터</Link></li>
                <li><Link href="/community" className="hover:text-white transition">커뮤니티</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition">리뷰</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 CreatorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}