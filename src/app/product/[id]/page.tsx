'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { StarRating } from "@/app/components/StarRating";

interface Product {
  id: string;
  creatorId: string;
  creatorName: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  created_at: string;
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const fetchProductAndReviews = async () => {
        try {
          // Fetch product
          const productRes = await fetch(`/api/products/${productId}`);
          const productData = await productRes.json();

          if (productData.success) {
            setProduct(productData.data);

            // Fetch reviews
            const reviewsRes = await fetch(`/api/reviews?creatorId=${productData.data.creatorId}`);
            const reviewsData = await reviewsRes.json();
            if (reviewsData.success) {
              setReviews(reviewsData.data);
            }
          }
        } catch (error) {
          console.error('Error fetching product and reviews:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductAndReviews();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="text-gray-600 hover:text-gray-900">
              ← 뒤로가기
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-lg">
                👩‍🎨
              </div>
              <span className="font-semibold text-gray-900">{product.creatorName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Product Main */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100 h-80 flex items-center justify-center relative">
            <img src={product.images[0]} alt={product.name} className="text-9xl" />
            {product.price < product.originalPrice && (
              <div className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white font-bold rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% 할인
              </div>
            )}
            <div className="absolute top-6 right-6 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full">
              ⭐ 베스트셀러
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <StarRating rating={product.rating} size="lg" />
                <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-600">({product.reviewCount}개 리뷰)</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₩{product.price.toLocaleString()}</span>
                {product.price < product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">₩{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {product.price < product.originalPrice && (
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <span>💰</span>
                  <span>지금 구매하면 ₩{(product.originalPrice - product.price).toLocaleString()} 절약!</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link href={`/checkout/digital?productId=${product.id}`} className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                ₩{product.price.toLocaleString()} 결제하고 바로 받기
              </Link>
              <button className="w-full py-4 bg-gray-100 text-gray-700 text-center rounded-full font-semibold hover:bg-gray-200 transition">
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">고객 후기</h2>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-2xl font-bold text-gray-900">{product.rating.toFixed(1)}</span>
              <span className="text-gray-600">/5.0</span>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.author ? review.author[0] : 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{review.author || 'Anonymous'}</span>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">환불 정책은 어떻게 되나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                디지털 상품 특성상 다운로드 후에는 환불이 어렵습니다. 
                다만 파일에 문제가 있거나 설명과 다른 경우 7일 이내 전액 환불해드립니다.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">업데이트는 어떻게 받나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                업데이트 시 구매하신 이메일로 자동 알림이 발송됩니다. 
                구매 내역 페이지에서도 언제든 최신 버전을 다운로드할 수 있어요.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">모바일에서도 볼 수 있나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                네! PDF 파일이라 스마트폰, 태블릿, PC 어디서든 볼 수 있습니다. 
                PDF 리더 앱만 있으면 됩니다.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}