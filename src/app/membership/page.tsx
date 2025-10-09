"use client";

import Link from "next/link";
import { useState } from "react";
import { StarRating } from "@/app/components/StarRating";

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

  const plans = {
    monthly: {
      price: 9900,
      period: "월",
      savings: 0
    },
    yearly: {
      price: 99000,
      period: "년",
      savings: 19800,
      monthlyEquiv: 8250
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo" className="text-gray-600 hover:text-gray-900">
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-6">
            <span>✨</span>
            프리미엄 멤버십
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            더 특별한 혜택을 누려보세요
          </h1>
          <p className="text-xl text-gray-600">
            멤버 전용 콘텐츠와 커뮤니티, 특별 할인까지!
          </p>
        </div>

        {/* Current Members */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 font-semibold text-sm">
                  +89
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-900">94명의 멤버</div>
                <div className="text-sm text-gray-600">이미 혜택을 누리고 있어요</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">🔥</div>
            </div>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Premium Tier */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-300 hover:shadow-2xl transition">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl">
                💜
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">프리미엄</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">₩9,900</div>
              <div className="text-gray-600">/ 월</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">프리미엄 전용 피드 열람</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">멤버 전용 콘텐츠 접근</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">커뮤니티 투표 참여</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">디지털 상품 10% 할인</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">월 1회 무료 콘텐츠</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span className="text-sm">활동 포인트 1.5배</span>
              </li>
            </ul>

            <Link
              href="/checkout/membership"
              className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-full font-bold hover:shadow-xl transition"
            >
              프리미엄 가입하기
            </Link>
            <p className="text-center text-xs text-gray-500 mt-3">첫 7일 무료</p>
          </div>

          {/* VIP Tier */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl text-gray-900 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              BEST
            </div>
            
            <div className="text-center mb-6 relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white/40">
                💎
              </div>
              <h3 className="text-2xl font-bold mb-2">VIP</h3>
              <div className="text-4xl font-bold mb-2">₩19,900</div>
              <div className="text-gray-800">/ 월</div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
              <div className="text-sm font-semibold mb-2 text-center">프리미엄 혜택 + 추가 특전</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">💎 VIP 전용 피드 열람</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">🎬 비공개 영상 & 비하인드</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">💬 VIP 전용 채팅방</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">🎁 디지털 상품 20% 할인</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">⚡ 서비스 우선 예약권</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">🎉 신상품 얼리버드 50% 할인</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">⭐ 활동 포인트 2배</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✓</span>
                <span className="text-sm font-semibold">🏆 VIP 전용 뱃지</span>
              </li>
            </ul>

            <Link
              href="/checkout/membership"
              className="block w-full py-3 bg-white text-orange-600 text-center rounded-full font-bold hover:bg-gray-50 transition shadow-xl"
            >
              VIP 가입하기
            </Link>
            <p className="text-center text-xs text-gray-800 mt-3">첫 14일 무료</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">등급별 혜택 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">혜택</th>
                  <th className="text-center py-3 px-4 text-purple-600 font-bold">💜 프리미엄</th>
                  <th className="text-center py-3 px-4 text-orange-600 font-bold">💎 VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">전용 피드</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4 font-bold">✓✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">디지털 상품 할인</td>
                  <td className="text-center py-3 px-4">10%</td>
                  <td className="text-center py-3 px-4 font-bold">20%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">신상품 얼리버드</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4 font-bold">50%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">활동 포인트</td>
                  <td className="text-center py-3 px-4">1.5배</td>
                  <td className="text-center py-3 px-4 font-bold">2배</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">전용 채팅방</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">우선 예약권</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4 font-bold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Old Pricing Card - Keep for reference */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8 hidden">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">
              ₩{selectedPlan === "monthly" ? "9,900" : "99,000"}
            </div>
            <div className="text-purple-100 text-lg">
              / {plans[selectedPlan].period}
            </div>
            {selectedPlan === "yearly" && (
              <div className="mt-2">
                <span className="text-yellow-300 font-semibold">
                  월 ₩{plans.yearly.monthlyEquiv.toLocaleString()}으로 이용
                </span>
                <div className="text-sm text-purple-100 mt-1">
                  연간 ₩{plans.yearly.savings.toLocaleString()} 절약!
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">🎬 멤버 전용 영상</div>
                <div className="text-sm text-purple-100">
                  일반 공개 전 미리보기 & 비하인드 영상
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">💬 프라이빗 커뮤니티</div>
                <div className="text-sm text-purple-100">
                  멤버 전용 카카오톡 오픈채팅 & 월간 Q&A
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">🎁 특별 할인</div>
                <div className="text-sm text-purple-100">
                  모든 디지털 상품 20% 할인
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">📚 무료 콘텐츠</div>
                <div className="text-sm text-purple-100">
                  월 1회 디지털 상품 무료 제공
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">⚡ 우선 예약</div>
                <div className="text-sm text-purple-100">
                  1:1 컨설팅 & 서비스 우선 예약권
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-semibold mb-1">🎉 월간 이벤트</div>
                <div className="text-sm text-purple-100">
                  멤버 전용 경품 추첨 & 특별 이벤트
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/checkout/membership"
            className="block w-full py-4 bg-white text-purple-600 text-center rounded-full font-bold text-lg hover:bg-gray-50 transition"
          >
            지금 가입하기
          </Link>

          <p className="text-center text-sm text-purple-100 mt-4">
            언제든 해지 가능 • 첫 7일 무료 체험
          </p>
        </div>

        {/* Member Reviews */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">멤버들의 후기</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "민지",
                rating: 5,
                comment: "멤버 전용 영상이 너무 알차요! 일반 영상보다 더 깊이있는 내용을 다뤄서 정말 도움돼요.",
                months: 3
              },
              {
                name: "수연",
                rating: 5,
                comment: "커뮤니티 분위기가 정말 좋아요. 같은 관심사를 가진 사람들과 소통할 수 있어서 좋습니다.",
                months: 6
              },
              {
                name: "지은",
                rating: 5,
                comment: "디지털 상품 할인이 꿀혜택! 이미 구독료 뽑고도 남았어요 ㅎㅎ",
                months: 2
              },
              {
                name: "혜진",
                rating: 5,
                comment: "월간 Q&A에서 제 질문에 직접 답변해주셔서 감동이었어요. 가치있는 투자입니다!",
                months: 4
              }
            ].map((review, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-600">{review.months}개월 구독 중</div>
                  </div>
                </div>
                <StarRating rating={review.rating} className="mb-2" />
                <p className="text-gray-700">{review.comment}</p>
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
                <span className="font-semibold text-gray-900">무료 체험 기간이 있나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                네! 첫 7일은 무료로 체험하실 수 있습니다. 
                체험 기간 동안 모든 멤버 혜택을 이용하실 수 있으며, 
                언제든 해지 가능합니다.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">해지는 어떻게 하나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                마이페이지에서 클릭 한 번으로 간편하게 해지할 수 있습니다. 
                위약금이나 추가 비용은 전혀 없으며, 이미 결제한 기간까지는 
                멤버 혜택을 계속 이용하실 수 있어요.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">결제는 어떻게 되나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                토스페이, 카카오페이, 신용카드로 결제 가능합니다. 
                매월 자동 결제되며, 결제 3일 전에 알림을 보내드립니다.
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="font-semibold text-gray-900">연간 구독을 추천하시나요?</span>
                <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="p-4 text-gray-700">
                연간 구독 시 17% 할인되어 약 2개월을 무료로 이용하시는 셈입니다. 
                장기적으로 이용하실 계획이라면 연간 구독을 추천드립니다!
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
