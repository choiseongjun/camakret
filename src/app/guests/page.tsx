'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Award, Users } from 'lucide-react';
import { apiFetch } from '@/lib/api';

// 임시 게스트 데이터 (나중에 DB로 교체)
const mockGuests = [
  {
    id: '1',
    name: '김철수',
    title: '퍼스널 트레이너',
    category: '운동/건강',
    location: '서울 강남',
    expertise: ['다이어트', '근력 운동', '홈트레이닝'],
    fee: '무료 (홍보 목적)',
    rating: 4.8,
    collabCount: 12,
    image: '💪',
    bio: '10년 경력의 퍼스널 트레이너. 체계적인 운동 프로그램 제공.',
    portfolio: ['자격증: 생활스포츠지도사 1급', '헬스장 운영 5년'],
    availability: '주말'
  },
  {
    id: '2',
    name: '박미영',
    title: '요리 연구가',
    category: '요리/음식',
    location: '서울 마포',
    expertise: ['한식', '홈쿠킹', '다이어트 식단'],
    fee: '협의 가능',
    rating: 4.9,
    collabCount: 25,
    image: '🍳',
    bio: '20년 경력 요리 연구가. TV 프로그램 다수 출연.',
    portfolio: ['요리책 3권 출간', '요리 학원 운영'],
    availability: '평일 오후'
  },
  {
    id: '3',
    name: '이준호',
    title: '변호사',
    category: '전문직',
    location: '서울 서초',
    expertise: ['부동산법', '계약법', '민사 소송'],
    fee: '회당 50만원',
    rating: 5.0,
    collabCount: 8,
    image: '⚖️',
    bio: '대형 로펌 출신 변호사. 쉬운 법률 설명 전문.',
    portfolio: ['변호사 경력 15년', '법률 상담 유튜브 운영'],
    availability: '협의'
  },
  {
    id: '4',
    name: '정수진',
    title: '프로 마술사',
    category: '예술/공연',
    location: '서울 종로',
    expertise: ['클로즈업 마술', '무대 마술', '이벤트 공연'],
    fee: '무료 (홍보 목적)',
    rating: 4.7,
    collabCount: 18,
    image: '🎩',
    bio: '국제 마술 대회 수상 경력. 기업 이벤트 전문.',
    portfolio: ['마술 대회 금상', '이벤트 공연 500회+'],
    availability: '주말'
  },
  {
    id: '5',
    name: '최은지',
    title: '메이크업 아티스트',
    category: '뷰티/패션',
    location: '서울 강남',
    expertise: ['브라이덜 메이크업', '특수 분장', '방송 메이크업'],
    fee: '무료 (포트폴리오용)',
    rating: 4.9,
    collabCount: 30,
    image: '💄',
    bio: '방송국 전속 메이크업 아티스트 출신. 뷰티 유튜브 운영.',
    portfolio: ['드라마 메이크업 담당', '셀럽 메이크업 다수'],
    availability: '평일 오전'
  },
  {
    id: '6',
    name: '강민수',
    title: '프로게이머',
    category: '게임/e스포츠',
    location: '서울 용산',
    expertise: ['리그오브레전드', '게임 코칭', 'e스포츠 전략'],
    fee: '협의 가능',
    rating: 4.6,
    collabCount: 15,
    image: '🎮',
    bio: '전 프로게이머. 현재 게임 코치 및 해설가 활동.',
    portfolio: ['프로게이머 경력 5년', 'LCK 해설 경험'],
    availability: '저녁 시간'
  },
  {
    id: '7',
    name: '윤서연',
    title: '요가 강사',
    category: '운동/건강',
    location: '서울 성동',
    expertise: ['하타 요가', '빈야사 요가', '명상'],
    fee: '무료 (홍보 목적)',
    rating: 4.8,
    collabCount: 20,
    image: '🧘',
    bio: '국제 요가 자격증 보유. 요가 스튜디오 운영 중.',
    portfolio: ['요가 강사 10년', '해외 요가 연수 다수'],
    availability: '오전 시간'
  },
  {
    id: '8',
    name: '송태준',
    title: '세계 여행가',
    category: '여행/모험',
    location: '서울 마포',
    expertise: ['배낭여행', '현지 문화', '여행 팁'],
    fee: '무료 (여행 홍보)',
    rating: 4.9,
    collabCount: 22,
    image: '🌍',
    bio: '100개국 방문 경험. 여행 작가 및 강연가.',
    portfolio: ['여행 책 2권 출간', '여행 강연 200회+'],
    availability: '수시'
  }
];

const categories = [
  '전체',
  '운동/건강',
  '요리/음식',
  '전문직',
  '예술/공연',
  '뷰티/패션',
  '교육/강연',
  '게임/e스포츠',
  '여행/모험'
];

const locations = ['전체', '서울 강남', '서울 마포', '서울 서초', '서울 종로', '서울 용산', '서울 성동'];

interface Guest {
  id: number;
  name: string;
  title: string;
  category: string;
  location: string;
  expertise: string[];
  fee: string;
  rating: number;
  collab_count: number;
  bio: string;
  profile_image: string | null;
  avg_rating?: number;
}

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [selectedFeeType, setSelectedFeeType] = useState('전체');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    fetchGuests();
  }, [page, searchTerm, selectedCategory, selectedLocation, selectedFeeType]);

  // 필터 변경 시 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, selectedLocation, selectedFeeType]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== '전체') params.append('category', selectedCategory);
      if (selectedLocation !== '전체') params.append('location', selectedLocation);
      if (selectedFeeType !== '전체') params.append('feeType', selectedFeeType);

      const response = await apiFetch(`/api/guests?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setGuests(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalGuests(result.pagination.total);
      }
    } catch (error) {
      console.error('게스트 목록 조회 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">게스트 찾기</h1>
          <p className="text-lg text-gray-600">당신의 콘텐츠에 필요한 전문가를 찾아보세요</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="게스트 이름, 직업, 전문성으로 검색..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full text-lg focus:outline-none focus:border-green-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 bg-white"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 bg-white"
            value={selectedFeeType}
            onChange={(e) => setSelectedFeeType(e.target.value)}
          >
            <option value="전체">출연료 전체</option>
            <option value="무료">무료</option>
            <option value="유료">유료</option>
          </select>
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {loading ? (
              <span>로딩 중...</span>
            ) : (
              <>
                총 <span className="font-bold text-green-600">{totalGuests}명</span>의 게스트
                {searchTerm || selectedCategory !== '전체' || selectedLocation !== '전체' || selectedFeeType !== '전체'
                  ? ' 검색됨'
                  : ''}
              </>
            )}
          </p>
        </div>

        {/* Guest Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-xl text-gray-500">로딩 중...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.map((guest) => {
              const categoryEmoji: Record<string, string> = {
                '운동/건강': '💪',
                '요리/음식': '🍳',
                '전문직': '⚖️',
                '예술/공연': '🎭',
                '뷰티/패션': '💄',
                '교육/강연': '📚',
                '게임/e스포츠': '🎮',
                '여행/모험': '🌍'
              };

              return (
            <Link
              key={guest.id}
              href={`/guests/${guest.id}`}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Profile Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex-shrink-0">
                  {guest.profile_image ? (
                    <img
                      src={`https://creatorhub-real.s3.ap-northeast-2.amazonaws.com/${guest.profile_image}`}
                      alt={guest.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-3xl">
                      {categoryEmoji[guest.category] || '👤'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{guest.name}</h3>
                  <p className="text-sm text-green-600 font-semibold mb-1">{guest.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{guest.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guest.bio}</p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {guest.expertise.slice(0, 3).map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{guest.avg_rating || guest.rating || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{guest.collab_count}회 협업</span>
                  </div>
                </div>
              </div>

              {/* Fee */}
              <div className="mt-3">
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                  {guest.fee}
                </span>
              </div>
            </Link>
            );
          })}
          </div>
        )}

        {/* Empty State */}
        {!loading && guests.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 mb-2">검색 결과가 없습니다</p>
            <p className="text-gray-400">다른 조건으로 검색해보세요</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && guests.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
              }`}
            >
              이전
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                // 현재 페이지 주변만 표시
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= page - 2 && pageNum <= page + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${
                        page === pageNum
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === page - 3 || pageNum === page + 3) {
                  return (
                    <span key={pageNum} className="flex items-center px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
              }`}
            >
              다음
            </button>
          </div>
        )}

        {/* Page Info */}
        {!loading && guests.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-500">
            {page} / {totalPages} 페이지
          </div>
        )}
      </main>
    </div>
  );
}
