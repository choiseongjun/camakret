"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Checkout() {
  const params = useParams();
  const type = params.type as string;
  const [paymentMethod, setPaymentMethod] = useState<"toss" | "kakao" | "card">("toss");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const products = {
    digital: {
      name: "뷰티 루틴 완벽 가이드",
      description: "PDF 전자책 • 120페이지",
      price: 29000,
      icon: "📚"
    },
    service: {
      name: "1:1 뷰티 컨설팅",
      description: "2024-03-15 • 10:00 • 60분",
      price: 50000,
      icon: "🗓️"
    },
    support: {
      name: "후원하기",
      description: "김크리에이터를 응원합니다",
      price: 5000,
      icon: "💝"
    },
    membership: {
      name: "프리미엄 멤버십",
      description: "월간 구독 • 첫 7일 무료",
      price: 9900,
      icon: "✨"
    }
  };

  const product = products[type as keyof typeof products] || products.digital;

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
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
              <span className="font-bold text-gray-900">크리에이터 링크</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">결제하기</h1>
          <p className="text-gray-600">안전하고 빠른 한국형 결제 시스템</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 text-lg mb-4">구매자 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                  {type === "digital" && (
                    <p className="text-sm text-gray-500 mt-2">
                      다운로드 링크가 이 이메일로 전송됩니다
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 text-lg mb-4">결제 수단</h2>
              
              <div className="space-y-3">
                {/* Toss Pay */}
                <button
                  onClick={() => setPaymentMethod("toss")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "toss"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      T
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">토스페이</div>
                      <div className="text-sm text-gray-600">간편하고 빠른 결제</div>
                    </div>
                    {paymentMethod === "toss" && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        ✓
                      </div>
                    )}
                  </div>
                </button>

                {/* Kakao Pay */}
                <button
                  onClick={() => setPaymentMethod("kakao")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "kakao"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl">
                      K
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">카카오페이</div>
                      <div className="text-sm text-gray-600">카카오톡으로 간편결제</div>
                    </div>
                    {paymentMethod === "kakao" && (
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900">
                        ✓
                      </div>
                    )}
                  </div>
                </button>

                {/* Credit Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${
                    paymentMethod === "card"
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl">
                      💳
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">신용/체크카드</div>
                      <div className="text-sm text-gray-600">모든 카드 결제 가능</div>
                    </div>
                    {paymentMethod === "card" && (
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                        ✓
                      </div>
                    )}
                  </div>
                </button>
              </div>

              {/* Payment Benefits */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🎁</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">안전한 결제</div>
                    <div className="text-sm text-gray-600">
                      SSL 암호화 • PG사 안전 결제 • 구매자 보호 정책
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="font-bold text-gray-900 text-lg mb-4">약관 동의</h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      전체 동의 (필수)
                    </div>
                  </div>
                </label>

                <div className="pl-8 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>구매조건 확인 및 결제 진행 동의 (필수)</span>
                    <button className="text-purple-600 hover:underline">보기</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>개인정보 수집 및 이용 동의 (필수)</span>
                    <button className="text-purple-600 hover:underline">보기</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>개인정보 제3자 제공 동의 (필수)</span>
                    <button className="text-purple-600 hover:underline">보기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
              <h3 className="font-bold text-gray-900 text-lg mb-6">주문 정보</h3>

              {/* Product */}
              <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {product.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.description}</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-semibold text-gray-900">
                    ₩{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">할인</span>
                  <span className="font-semibold text-green-600">-₩0</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-900">최종 결제금액</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₩{product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                disabled={!agreedToTerms}
                className={`w-full py-4 rounded-full font-bold text-lg transition ${
                  agreedToTerms
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                ₩{product.price.toLocaleString()} 결제하기
              </button>

              {/* Auto Delivery Info */}
              {type === "digital" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        자동 전송
                      </div>
                      <div className="text-xs text-gray-600">
                        결제 완료 후 즉시 이메일로 다운로드 링크가 전송됩니다
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === "service" && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">📅</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        예약 확정
                      </div>
                      <div className="text-xs text-gray-600">
                        결제 완료 후 예약이 확정되며 안내 문자가 발송됩니다
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === "membership" && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🎉</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        첫 7일 무료
                      </div>
                      <div className="text-xs text-gray-600">
                        7일 후부터 자동 결제됩니다. 언제든 해지 가능
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
