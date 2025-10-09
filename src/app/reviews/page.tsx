'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Star, ThumbsUp, User, Tag, Calendar } from 'lucide-react';
import { StarRating } from '@/app/components/StarRating';

interface Review {
  id: number;
  author: string;
  creator_name: string;
  rating: number;
  content: string;
  created_at: string;
  likes: number;
  title: string;
  tags: string[];
}

export default function ReviewsPage() {
  const { user, loading, login, logout } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [creatorFilter, setCreatorFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('latest');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const displayedReviews = useMemo(() => {
    let filteredReviews = [...reviews];
    if (creatorFilter !== 'all') {
      filteredReviews = filteredReviews.filter(r => r.creator_name === creatorFilter);
    }
    if (ratingFilter !== 'all') {
      filteredReviews = filteredReviews.filter(r => r.rating === parseInt(ratingFilter, 10));
    }
    switch (sortOrder) {
      case 'latest':
        filteredReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'likes':
        filteredReviews.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating_high':
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating_low':
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
    }
    return filteredReviews;
  }, [reviews, creatorFilter, ratingFilter, sortOrder]);

  const creators = useMemo(() => ['all', ...Array.from(new Set(reviews.map(r => r.creator_name)))], [reviews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
              {!loading && (user ? (
                <>
                  <span className="text-gray-800 font-medium">{user.name}님</span>
                  <button onClick={logout} className="font-medium text-gray-600 hover:text-gray-900 transition">로그아웃</button>
                </>
              ) : (
                <button onClick={login} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                  로그인
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            솔직한 리뷰, 생생한 경험
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            크리에이터와 팬이 함께 만들어가는 건강한 리뷰 문화를 경험해보세요.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="creator-filter" className="block text-sm font-medium text-gray-700 mb-1">크리에이터</label>
              <select
                id="creator-filter"
                value={creatorFilter}
                onChange={(e) => setCreatorFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                {creators.map(c => <option key={c} value={c}>{c === 'all' ? '모든 크리에이터' : c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">평점</label>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="all">모든 평점</option>
                <option value="5">5점</option>
                <option value="4">4점</option>
                <option value="3">3점</option>
                <option value="2">2점</option>
                <option value="1">1점</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">정렬</label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="latest">최신순</option>
                <option value="likes">도움순</option>
                <option value="rating_high">평점 높은순</option>
                <option value="rating_low">평점 낮은순</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-6">
              <div className="sm:w-1/4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                  {review.author.charAt(0)}
                </div>
                <div className="font-semibold text-gray-900">{review.author}</div>
                <div className="text-sm text-gray-500">리뷰 5개</div>
              </div>
              <div className="sm:w-3/4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{review.creator_name}</div>
                    <div className="text-sm text-gray-600">{review.title}</div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <button className="flex items-center gap-1 hover:text-orange-600 transition">
                    <ThumbsUp className="w-4 h-4" />
                    <span>도움됨 ({review.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}