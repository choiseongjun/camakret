"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: "digital" | "service";
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "뷰티 루틴 완벽 가이드",
    price: 29000,
    originalPrice: 49000,
    description: "10년간의 노하우를 담은 120페이지 PDF 전자책. 아침/저녁 루틴, 제품 추천, 피부 타입별 관리법",
    category: "digital",
    image: "📚",
    rating: 4.9,
    reviews: 234,
    badge: "베스트"
  },
  {
    id: 2,
    name: "포토샵 프리셋 팩",
    price: 15000,
    description: "인스타그램 감성 사진을 위한 50개의 프리셋. 원터치로 프로처럼 보정하세요",
    category: "digital",
    image: "🎨",
    rating: 4.8,
    reviews: 189
  },
  {
    id: 3,
    name: "메이크업 영상 패키지",
    price: 89000,
    description: "초보부터 고급까지. 12개 영상으로 배우는 메이크업의 모든 것",
    category: "digital",
    image: "🎥",
    rating: 5.0,
    reviews: 156,
    badge: "인기"
  },
  {
    id: 4,
    name: "1:1 뷰티 컨설팅",
    price: 50000,
    description: "화상으로 만나는 60분 개인 맞춤 컨설팅. 피부 고민 해결부터 메이크업 팁까지",
    category: "service",
    image: "🗓️",
    rating: 4.9,
    reviews: 92
  },
  {
    id: 5,
    name: "퍼스널 메이크업",
    price: 120000,
    description: "특별한 날을 위한 방문 메이크업 서비스. 2시간 소요 (서울/경기 지역)",
    category: "service",
    image: "✨",
    rating: 5.0,
    reviews: 67
  },
  {
    id: 6,
    name: "월간 뷰티 코칭",
    price: 180000,
    description: "꾸준한 관리를 원하시나요? 월 4회 세션으로 완벽한 뷰티 루틴 만들기",
    category: "service",
    image: "📝",
    rating: 4.9,
    reviews: 45
  },
  {
    id: 7,
    name: "스킨케어 루틴 체크리스트",
    price: 9000,
    description: "매일 사용하는 스킨케어 체크리스트 템플릿. 아침/저녁 루틴을 체계적으로",
    category: "digital",
    image: "📋",
    rating: 4.7,
    reviews: 312
  },
  {
    id: 8,
    name: "뷰티 브이로그 촬영 노트",
    price: 19000,
    description: "뷰티 유튜버가 되고 싶다면? 촬영부터 편집까지 모든 노하우",
    category: "digital",
    image: "📹",
    rating: 4.8,
    reviews: 128
  },
  {
    id: 9,
    name: "계절별 메이크업 가이드",
    price: 25000,
    description: "봄/여름/가을/겨울 시즌별 메이크업 트렌드와 실전 팁",
    category: "digital",
    image: "🌸",
    rating: 4.6,
    reviews: 203
  }
];

export default function Shop() {
  const [filter, setFilter] = useState<"all" | "digital" | "service">("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");

  const filteredProducts = products.filter(p => 
    filter === "all" || p.category === filter
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return b.reviews - a.reviews; // popular
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-2xl">
                👩‍🎨
              </div>
              <div>
                <h1 className="font-bold text-gray-900">김크리에이터 상점</h1>
                <p className="text-xs text-gray-600">뷰티 전문가의 특별한 상품들</p>
              </div>
            </Link>
            <Link href="/demo" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">🎉 신학기 특별 세일</h2>
          <p className="text-emerald-100 mb-4">모든 디지털 상품 40% 할인! 3월 31일까지</p>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
            <span>⏰</span>
            <span>남은 시간: 5일 12시간</span>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  filter === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                전체 ({products.length})
              </button>
              <button
                onClick={() => setFilter("digital")}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  filter === "digital"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                디지털 상품 ({products.filter(p => p.category === "digital").length})
              </button>
              <button
                onClick={() => setFilter("service")}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  filter === "service"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                서비스 ({products.filter(p => p.category === "service").length})
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="popular">인기순</option>
                <option value="price-low">낮은 가격순</option>
                <option value="price-high">높은 가격순</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition group"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 h-48 flex items-center justify-center">
                <div className="text-7xl group-hover:scale-110 transition">
                  {product.image}
                </div>
                {product.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">
                    40% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
                    {product.category === "digital" && "디지털"}
                    {product.category === "service" && "서비스"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₩{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ₩{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5">
                    {product.category === "service" ? "예약" : "구매"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">1,200+</div>
              <div className="text-sm text-gray-600">총 구매자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-1">4.9</div>
              <div className="text-sm text-gray-600">평균 평점</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">만족도</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">24시간</div>
              <div className="text-sm text-gray-600">평균 응답시간</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">고객 후기</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">★★★★★</div>
                <span className="font-semibold text-gray-900">민지</span>
                <span className="text-sm text-gray-500">• 뷰티 루틴 가이드 구매</span>
              </div>
              <p className="text-gray-700">
                정말 유용한 정보가 가득해요! 특히 피부 타입별 관리법이 너무 도움됐습니다. 
                120페이지인데 군더더기 없이 핵심만 담겨있어서 좋아요.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">★★★★★</div>
                <span className="font-semibold text-gray-900">수연</span>
                <span className="text-sm text-gray-500">• 메이크업 영상 패키지 구매</span>
              </div>
              <p className="text-gray-700">
                메이크업 초보였는데 이제는 친구들한테 메이크업 해줄 수 있을 정도로 늘었어요! 
                영상이 정말 자세하고 이해하기 쉬웠습니다.
              </p>
            </div>

            <div className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">★★★★★</div>
                <span className="font-semibold text-gray-900">지은</span>
                <span className="text-sm text-gray-500">• 1:1 뷰티 컨설팅 이용</span>
              </div>
              <p className="text-gray-700">
                개인 맞춤 상담이라 정말 도움이 많이 됐어요. 제 피부 고민을 정확히 파악하고 
                솔루션을 제시해주셔서 감사합니다!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl transition flex items-center justify-center text-xl">
          🛒
        </button>
      </div>
    </div>
  );
}
