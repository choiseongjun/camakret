'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Search, Star, Users, Filter, TrendingUp, Heart, MessageCircle } from 'lucide-react';

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

export default function Home() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchCreators();
  }, []);

  useEffect(() => {
    filterCreators();
  }, [creators, searchTerm, selectedStyle, selectedSize]);

  const fetchCreators = async () => {
    try {
      const response = await fetch('/api/creators?limit=12');
      const data = await response.json();
      if (data.success) {
        setCreators(data.data);
      }
    } catch (error) {
      console.error('크리에이터 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCreators = () => {
    let filtered = creators;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
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
              <Link href="#creators" className="text-gray-600 hover:text-gray-900 transition">크리에이터</Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900 transition">커뮤니티</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">소개</Link>
              <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 font-medium text-sm mb-8">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
            유튜브 크리에이터 팬 커뮤니티 플랫폼
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            좋아하는<br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              크리에이터
            </span>
            와 소통하세요
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            리뷰 · 투표 · 제안으로<br />
            크리에이터와 더 가까워지는 팬 커뮤니티
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="#creators" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
              크리에이터 둘러보기 →
            </Link>
            <Link href="#about" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition">
              플랫폼 소개
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="크리에이터 이름으로 검색..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">모든 스타일</option>
            <option value="ASMR">ASMR</option>
            <option value="토크">토크</option>
            <option value="대식가">대식가</option>
            <option value="리뷰">리뷰</option>
            <option value="요리">요리</option>
            <option value="브이로그">브이로그</option>
          </select>
          
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">모든 규모</option>
            <option value="대형">대형 (100만+)</option>
            <option value="중형">중형 (10만+)</option>
            <option value="소형">소형 (~10만)</option>
          </select>
        </div>
      </section>

      {/* Creators Grid */}
      <section id="creators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            인기 먹방 크리에이터
          </h2>
          <p className="text-gray-600">
            {loading ? '로딩 중...' : `${filteredCreators.length}개의 크리에이터를 찾았습니다`}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <div key={creator.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={creator.thumbnail}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/default-avatar.png';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{creator.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {formatNumber(creator.statistics.subscribers)} 구독자
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {creator.description.substring(0, 100)}...
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(creator.reviewStats.averageRating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({creator.reviewStats.totalReviews})
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    creator.foodCategories.channelSize === '대형' 
                      ? 'bg-red-100 text-red-800'
                      : creator.foodCategories.channelSize === '중형'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {creator.foodCategories.channelSize}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {creator.foodCategories.style.slice(0, 2).map((style) => (
                    <span key={style} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {style}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/creator/${creator.id}`}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-center text-sm font-medium hover:shadow-lg transition"
                  >
                    상세보기
                  </Link>
                  <a
                    href={creator.links.channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  >
                    채널
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">왜 CreatorHub인가요?</h2>
          <p className="text-xl text-gray-600">크리에이터와 팬을 연결하는 특별한 공간</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              ⭐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">리뷰</h3>
            <p className="text-gray-600 leading-relaxed">
              크리에이터의 콘텐츠에 대한 솔직한 리뷰와 평점을 공유하세요.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">투표</h3>
            <p className="text-gray-600 leading-relaxed">
              다음 영상 주제나 콘텐츠 방향을 투표로 결정하세요.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              💡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">제안</h3>
            <p className="text-gray-600 leading-relaxed">
              크리에이터에게 영상 아이디어를 제안하고 피드백을 받으세요.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              👥
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">커뮤니티</h3>
            <p className="text-gray-600 leading-relaxed">
              같은 팬들과 소통하며 크리에이터를 함께 응원하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            CreatorHub와 함께하는 크리에이터들
          </h2>
          <p className="text-xl text-gray-600">지금 바로 만나보세요</p>
        </div>

        {/* Top Creators Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {filteredCreators.slice(0, 3).map((creator) => (
            <div key={creator.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200">
              <div className="flex flex-col items-center text-center">
                <img
                  src={creator.thumbnail}
                  alt={creator.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-orange-100"
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png';
                  }}
                />
                <h3 className="font-bold text-gray-900 text-xl mb-2">{creator.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Users className="w-4 h-4" />
                  {formatNumber(creator.statistics.subscribers)} 구독자
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(creator.reviewStats.averageRating)}
                  <span className="text-sm text-gray-600 ml-1">
                    {creator.reviewStats.averageRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {creator.description.substring(0, 80)}...
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {creator.foodCategories.style.slice(0, 2).map((style) => (
                    <span key={style} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {style}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/creator/${creator.id}`}
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-center text-sm font-medium hover:shadow-lg transition"
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">377+</div>
              <div className="text-orange-100">등록된 크리에이터</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-orange-100">커뮤니티 리뷰</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-orange-100">월간 활성 사용자</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🍜</span>
                </div>
                <span className="text-lg font-bold text-gray-900">CreatorHub</span>
              </div>
              <p className="text-gray-600 text-sm">
                한국 먹방 유튜버 리뷰 플랫폼<br />
                커뮤니티 기반 큐레이션
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">플랫폼</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#creators" className="hover:text-gray-900">크리에이터</Link></li>
                <li><Link href="#reviews" className="hover:text-gray-900">리뷰</Link></li>
                <li><Link href="#about" className="hover:text-gray-900">소개</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">고객센터</Link></li>
                <li><Link href="#" className="hover:text-gray-900">가이드</Link></li>
                <li><Link href="#" className="hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">커뮤니티</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">블로그</Link></li>
                <li><Link href="#" className="hover:text-gray-900">공지사항</Link></li>
                <li><Link href="#" className="hover:text-gray-900">문의하기</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            © 2025 CreatorHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}