'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Eye, MessageSquare, Clock, User, Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface CreatorRequest {
  id: number;
  title: string;
  description: string;
  channel_name: string;
  channel_subscribers: string;
  category: string;
  guest_type: string;
  shooting_location: string;
  preferred_date: string;
  fee_range: string;
  status: string;
  view_count: number;
  application_count: number;
  created_at: string;
  creator_name: string;
}

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

function RequestsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [requests, setRequests] = useState<CreatorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('recent'); // recent, popular
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);

  // URL에서 파라미터 복원
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');

    if (pageParam) setPage(parseInt(pageParam));
    if (searchParam) setSearchTerm(searchParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (sortParam) setSortBy(sortParam);
  }, []);

  useEffect(() => {
    fetchRequests();
    updateURL();
  }, [page, searchTerm, selectedCategory, sortBy]);

  // 필터 변경 시 페이지 1로 리셋
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchTerm, selectedCategory, sortBy]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (page !== 1) params.set('page', page.toString());
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== '전체') params.set('category', selectedCategory);
    if (sortBy !== 'recent') params.set('sort', sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `/requests?${queryString}` : '/requests';
    router.replace(newUrl, { scroll: false });
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sort: sortBy
      });

      if (selectedCategory !== '전체') params.append('category', selectedCategory);

      const response = await apiFetch(`/api/requests?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        let filteredData = result.data;

        // 클라이언트 사이드 검색 필터
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredData = filteredData.filter((req: CreatorRequest) =>
            req.title.toLowerCase().includes(searchLower) ||
            req.description.toLowerCase().includes(searchLower) ||
            req.channel_name.toLowerCase().includes(searchLower) ||
            req.guest_type.toLowerCase().includes(searchLower)
          );
        }

        setRequests(filteredData);
        setTotalPages(result.pagination.totalPages);
        setTotalRequests(result.pagination.total);
      }
    } catch (error) {
      console.error('요청글 목록 조회 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    return `${Math.floor(diffDays / 30)}개월 전`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            협업 요청 피드
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            크리에이터들이 찾고 있는 게스트를 확인하고 지원해보세요
          </p>
          {user && (
            <Link
              href="/requests/create"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              게스트 요청글 작성
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="제목, 채널명, 게스트 타입으로 검색..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full text-lg focus:outline-none focus:border-purple-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">최신순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {loading ? (
              <span>로딩 중...</span>
            ) : (
              <>
                총 <span className="font-bold text-purple-600">{totalRequests}개</span>의 협업 요청
                {searchTerm || selectedCategory !== '전체' ? ' 검색됨' : ''}
              </>
            )}
          </p>
        </div>

        {/* Request Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-xl text-gray-500">로딩 중...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Link
                key={request.id}
                href={`/requests/${request.id}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {request.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(request.created_at)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {request.title}
                </h3>

                {/* Channel Info */}
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    {request.channel_name}
                  </span>
                  {request.channel_subscribers && (
                    <span className="text-xs text-gray-500">
                      ({request.channel_subscribers})
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {request.description}
                </p>

                {/* Guest Type */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-medium">
                    🎯 {request.guest_type}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{request.view_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{request.application_count}</span>
                    </div>
                  </div>
                  {request.fee_range && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {request.fee_range}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 mb-2">검색 결과가 없습니다</p>
            <p className="text-gray-400">다른 조건으로 검색해보세요</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && requests.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
              }`}
            >
              이전
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
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
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
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

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
              }`}
            >
              다음
            </button>
          </div>
        )}

        {/* Page Info */}
        {!loading && requests.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-500">
            {page} / {totalPages} 페이지
          </div>
        )}
      </main>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-500">로딩 중...</p>
        </div>
      </div>
    }>
      <RequestsPageContent />
    </Suspense>
  );
}
