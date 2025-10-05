"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

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
              <span className="font-semibold text-gray-900">김크리에이터</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Product Main */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100 h-80 flex items-center justify-center relative">
            <div className="text-9xl">📚</div>
            <div className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white font-bold rounded-full">
              40% 할인
            </div>
            <div className="absolute top-6 right-6 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full">
              ⭐ 베스트셀러
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">★★★★★</span>
                <span className="font-bold text-gray-900">4.9</span>
              </div>
              <span className="text-gray-600">(234개 리뷰)</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                디지털 상품
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              뷰티 루틴 완벽 가이드
            </h1>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              10년간의 노하우를 담은 120페이지 PDF 전자책. 
              아침/저녁 루틴, 제품 추천, 피부 타입별 관리법까지 
              모든 것을 담았습니다.
            </p>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₩29,000</span>
                <span className="text-2xl text-gray-400 line-through">₩49,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <span>💰</span>
                <span>지금 구매하면 20,000원 절약!</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 text-lg mb-4">📦 포함 내용</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <span className="text-gray-700">120페이지 PDF 전자책</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <span className="text-gray-700">피부 타입 진단 체크리스트</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <span className="text-gray-700">제품 추천 리스트 (2024 최신판)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <span className="text-gray-700">평생 업데이트 무료 제공</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <span className="text-gray-700">1:1 질문 1회 무료 (이메일)</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">즉시 다운로드</h3>
                  <p className="text-gray-700 text-sm">
                    결제 완료 후 즉시 다운로드 링크가 이메일로 전송됩니다.
                    구매 내역 페이지에서도 언제든 다시 다운로드할 수 있어요.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link href="/checkout/digital" className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                ₩29,000 결제하고 바로 받기
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
              <span className="text-yellow-500 text-2xl">★</span>
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-600">/5.0</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                name: "민지",
                rating: 5,
                date: "2024년 3월 2일",
                content: "와... 진짜 대박이에요! 그동안 이것저것 찾아보느라 고생했는데 이 책 하나면 다 해결되네요. 특히 피부 타입별 관리법이 정말 자세해서 좋았어요. 완전 추천합니다!",
                verified: true
              },
              {
                name: "수연",
                rating: 5,
                date: "2024년 3월 1일",
                content: "120페이지라고 해서 부담스러울까 했는데 오히려 딱 좋더라구요. 군더더기 없이 핵심만 담겨있어서 읽기 편해요. 제품 추천 리스트도 최신이라 바로 써먹을 수 있었습니다.",
                verified: true
              },
              {
                name: "지은",
                rating: 5,
                date: "2024년 2월 28일",
                content: "뷰티 크리에이터님 영상 보다가 구매했어요. 영상에서 못 다룬 내용까지 정말 자세하게 나와있고, 사진도 많아서 이해하기 쉬워요. 가격 대비 정말 가치있는 구매였습니다!",
                verified: true
              }
            ].map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        {review.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            ✓ 구매 인증
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {"★".repeat(review.rating)}
                  </div>
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
