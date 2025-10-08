'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Star, ThumbsUp, User, Tag, Calendar } from 'lucide-react';

// 가데이터(Mock Data)를 위한 인터페이스 정의
interface Review {
  id: number;
  author: string;
  productName: string;
  creatorName: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
}

// 실제 데이터처럼 보이도록 가데이터 생성
const mockReviews: Review[] = [
  { id: 1, author: '김민준', productName: '오가닉 코튼 티셔츠', creatorName: '에코패션', rating: 5, content: '재질이 너무 부드럽고 착용감이 편안해요. 환경을 생각하는 브랜드라 더 좋네요!', createdAt: '2025-10-07T14:48:00.000Z', likes: 15 },
  { id: 2, author: '이서아', productName: '수제 가죽 지갑', creatorName: '장인공방', rating: 4, content: '만듦새가 훌륭하고 디자인도 마음에 듭니다. 다만, 카드를 많이 넣으면 조금 뚱뚱해져요.', createdAt: '2025-10-06T11:20:00.000Z', likes: 8 },
  { id: 3, author: '박하준', productName: '게임 스트리밍 1:1 코칭', creatorName: '마스터 게이머', rating: 5, content: '정말 명쾌한 설명! 혼자서는 절대 몰랐을 꿀팁들을 많이 얻어갑니다. 실력이 확 늘었어요.', createdAt: '2025-10-05T09:00:00.000Z', likes: 22 },
  { id: 4, author: '최지우', productName: '오가닉 코튼 티셔츠', creatorName: '에코패션', rating: 4, content: '디자인은 예쁜데, 목 부분이 조금 좁게 나온 것 같아요. 한 사이즈 크게 살 걸 그랬어요.', createdAt: '2025-10-04T18:15:00.000Z', likes: 3 },
  { id: 5, author: '정예나', productName: '드로잉 클래스 VOD', creatorName: '아트스튜디오', rating: 3, content: '내용은 좋은데, 영상 음질이 조금 아쉬워요. 소리가 작아서 잘 안 들릴 때가 있었습니다.', createdAt: '2025-10-03T21:05:00.000Z', likes: 1 },
  { id: 6, author: '윤도현', productName: '수제 가죽 지갑', creatorName: '장인공방', rating: 5, content: '아버지 선물로 드렸는데 정말 좋아하셨어요. 포장도 고급스럽고, 퀄리티가 최고입니다.', createdAt: '2025-10-02T13:00:00.000Z', likes: 11 },
  { id: 7, author: '한지민', productName: '게임 스트리밍 1:1 코칭', creatorName: '마스터 게이머', rating: 4, content: '코칭 내용은 만족스러웠지만, 예약 시간을 잡는 과정이 조금 번거로웠습니다.', createdAt: '2025-10-01T10:30:00.000Z', likes: 5 },
  { id: 8, author: '강태리', productName: '드로잉 클래스 VOD', creatorName: '아트스튜디오', rating: 5, content: '초보자도 따라하기 쉽게 설명해주셔서 너무 좋았어요! 시간 가는 줄 모르고 그렸네요.', createdAt: '2025-09-30T16:45:00.000Z', likes: 18 },
];

// 별점 표시를 위한 컴포넌트
const StarRating = ({ rating, className = '' }: { rating: number, className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

// 리뷰 페이지 메인 컴포넌트
export default function ReviewsPage() {
  const [creatorFilter, setCreatorFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('latest');

  const displayedReviews = useMemo(() => {
    let reviews = [...mockReviews];
    if (creatorFilter !== 'all') {
      reviews = reviews.filter(r => r.creatorName === creatorFilter);
    }
    if (ratingFilter !== 'all') {
      reviews = reviews.filter(r => r.rating === parseInt(ratingFilter, 10));
    }
    switch (sortOrder) {
      case 'latest':
        reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'likes':
        reviews.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating_high':
        reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating_low':
        reviews.sort((a, b) => a.rating - b.rating);
        break;
    }
    return reviews;
  }, [creatorFilter, ratingFilter, sortOrder]);

  const creators = useMemo(() => ['all', ...Array.from(new Set(mockReviews.map(r => r.creatorName)))], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CreatorHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/creators" className="text-gray-600 hover:text-gray-900 transition">크리에이터</Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900 transition">커뮤니티</Link>
              <Link href="/reviews" className="font-semibold text-orange-600 hover:text-orange-700 transition">리뷰</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">소개</Link>
              <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">고객 후기</h1>
          <p className="text-lg text-gray-600">CreatorHub와 함께하는 크리에이터들의 생생한 리뷰를 확인하세요.</p>
        </div>

        {/* 필터 및 정렬 UI */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-24 z-40">
          <div className="flex flex-wrap gap-4">
            <select value={creatorFilter} onChange={e => setCreatorFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
              {creators.map(c => <option key={c} value={c}>{c === 'all' ? '모든 크리에이터' : c}</option>)}
            </select>
            <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="all">모든 별점</option>
              {[5, 4, 3, 2, 1].map(star => <option key={star} value={star}>{star}점</option>)}
            </select>
          </div>
          <div>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="latest">최신순</option>
              <option value="likes">인기순</option>
              <option value="rating_high">높은 평점순</option>
              <option value="rating_low">낮은 평점순</option>
            </select>
          </div>
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-6">
          {displayedReviews.length > 0 ? (
            displayedReviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">{review.productName}</h3>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                      <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {review.author}</div>
                      <div className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {review.creatorName}</div>
                      <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(review.createdAt).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> {review.likes}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">표시할 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}