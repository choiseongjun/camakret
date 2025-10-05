"use client";

import Link from "next/link";
import { useState } from "react";

export default function Coupons() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const coupons = [
    {
      id: 1,
      code: "WELCOME2024",
      type: "percentage",
      value: 20,
      description: "신규 회원 환영 할인",
      minPurchase: 10000,
      validUntil: "2024-12-31",
      usedCount: 45,
      maxUses: 100,
      isActive: true
    },
    {
      id: 2,
      code: "VIP50",
      type: "percentage",
      value: 50,
      description: "VIP 회원 전용 (신상품 얼리버드)",
      minPurchase: 0,
      validUntil: "2024-04-15",
      usedCount: 23,
      maxUses: 50,
      isActive: true,
      memberOnly: "vip"
    },
    {
      id: 3,
      code: "SPRING5000",
      type: "fixed",
      value: 5000,
      description: "봄맞이 5천원 할인",
      minPurchase: 30000,
      validUntil: "2024-05-31",
      usedCount: 12,
      maxUses: 200,
      isActive: true
    },
    {
      id: 4,
      code: "PREMIUM10",
      type: "percentage",
      value: 10,
      description: "프리미엄 회원 상시 할인",
      minPurchase: 0,
      validUntil: "2024-12-31",
      usedCount: 89,
      maxUses: null,
      isActive: true,
      memberOnly: "premium"
    },
    {
      id: 5,
      code: "SUMMER2023",
      type: "percentage",
      value: 30,
      description: "여름 특가 (종료됨)",
      minPurchase: 20000,
      validUntil: "2023-08-31",
      usedCount: 156,
      maxUses: 200,
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">할인 쿠폰 관리</span>
            </Link>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              + 새 쿠폰 만들기
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">활성 쿠폰</div>
            <div className="text-3xl font-bold text-gray-900">{coupons.filter(c => c.isActive).length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">총 사용횟수</div>
            <div className="text-3xl font-bold text-emerald-600">{coupons.reduce((sum, c) => sum + c.usedCount, 0)}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">이번 달 할인액</div>
            <div className="text-3xl font-bold text-green-600">₩245K</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">전환율 증가</div>
            <div className="text-3xl font-bold text-blue-600">+34%</div>
          </div>
        </div>

        {/* Coupon List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">쿠폰 목록</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {coupons.map((coupon) => (
              <div key={coupon.id} className={`p-6 hover:bg-gray-50 transition ${!coupon.isActive && "opacity-50"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg ${
                      coupon.memberOnly === "vip" ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900" :
                      coupon.memberOnly === "premium" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" :
                      "bg-gray-900 text-white"
                    }`}>
                      {coupon.code}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{coupon.description}</h3>
                        {coupon.memberOnly && (
                          <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            coupon.memberOnly === "vip" ? "bg-yellow-100 text-yellow-800" :
                            "bg-emerald-100 text-emerald-800"
                          }`}>
                            {coupon.memberOnly === "vip" ? "💎 VIP 전용" : "💜 프리미엄 전용"}
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          coupon.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}>
                          {coupon.isActive ? "활성" : "비활성"}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>
                            할인: <span className="font-semibold text-emerald-600">
                              {coupon.type === "percentage" ? `${coupon.value}%` : `₩${coupon.value.toLocaleString()}`}
                            </span>
                          </span>
                          {coupon.minPurchase > 0 && (
                            <span>최소 구매: ₩{coupon.minPurchase.toLocaleString()}</span>
                          )}
                          <span>유효기간: {coupon.validUntil}</span>
                        </div>
                        <div>
                          사용: <span className="font-semibold">{coupon.usedCount}</span>
                          {coupon.maxUses && ` / ${coupon.maxUses}`}
                          {coupon.maxUses && (
                            <span className="ml-2 text-xs">
                              ({Math.round((coupon.usedCount / coupon.maxUses) * 100)}%)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                      수정
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                      {coupon.isActive ? "비활성화" : "활성화"}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {coupon.maxUses && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">쿠폰 활용 팁</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>신규 고객:</strong> 첫 구매 20% 할인으로 진입 장벽 낮추기</li>
                <li>• <strong>VIP 전용:</strong> 신상품 50% 얼리버드로 충성도 보상</li>
                <li>• <strong>최소 구매액:</strong> 객단가를 높이는 전략적 설정</li>
                <li>• <strong>시즌 이벤트:</strong> 한정 기간으로 구매 긴급성 유도</li>
                <li>• <strong>멤버십 혜택:</strong> 상시 할인으로 멤버십 가입 유도</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal (Placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">새 쿠폰 만들기</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">쿠폰 코드</label>
                <input
                  type="text"
                  placeholder="예: SPRING2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">설명</label>
                <input
                  type="text"
                  placeholder="예: 봄맞이 특별 할인"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">할인 타입</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600">
                    <option value="percentage">퍼센트 (%)</option>
                    <option value="fixed">고정 금액 (₩)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">할인 값</label>
                  <input
                    type="number"
                    placeholder="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">최소 구매 금액</label>
                <input
                  type="number"
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">유효기간</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">최대 사용 횟수</label>
                <input
                  type="number"
                  placeholder="100 (비워두면 무제한)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">멤버 전용</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600">
                  <option value="">모든 회원</option>
                  <option value="premium">💜 프리미엄 전용</option>
                  <option value="vip">💎 VIP 전용</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  취소
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition">
                  쿠폰 생성
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
