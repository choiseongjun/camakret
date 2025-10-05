"use client";

import Link from "next/link";
import { useState } from "react";

export default function Support() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");

  const presetAmounts = [1000, 3000, 5000, 10000, 30000, 50000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
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

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Creator Info */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            👩‍🎨
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            김크리에이터를 응원해주세요!
          </h1>
          <p className="text-gray-600">
            여러분의 후원이 더 좋은 콘텐츠를 만드는 데 큰 힘이 됩니다 ❤️
          </p>
        </div>

        {/* Support Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600">1,234</div>
              <div className="text-sm text-gray-600">후원자</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600">₩2.4M</div>
              <div className="text-sm text-gray-600">이번 달</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">재후원율</div>
            </div>
          </div>
        </div>

          {/* Payment Method Selection */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">후원 방법 선택</h2>
          
          <div className="space-y-4 mb-8">
            {/* Bank Transfer - Recommended */}
            <div className="border-2 border-emerald-500 rounded-2xl p-6 bg-emerald-50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                  🏦
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">계좌이체</h3>
                    <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full font-semibold">
                      추천
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    수수료 없이 100% 전달됩니다
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">은행</span>
                      <span className="font-semibold text-gray-900">카카오뱅크</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">계좌번호</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">3333-01-1234567</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText('3333011234567')}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition"
                        >
                          복사
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">예금주</span>
                      <span className="font-semibold text-gray-900">김크리에이터</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Toss Send Money */}
            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                  💸
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">토스 송금하기</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    토스앱으로 간편하게 송금
                  </p>
                  <a
                    href="https://toss.me/creator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    토스로 보내기
                  </a>
                </div>
              </div>
            </div>

            {/* Buy Coffee (Digital Product) */}
            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-yellow-300 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  ☕
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">커피 사주기</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    디지털 응원권 구매 (카드 결제 가능)
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border-2 border-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-50 transition">
                      ☕ ₩3,000
                    </button>
                    <button className="px-4 py-2 border-2 border-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-50 transition">
                      ☕☕ ₩5,000
                    </button>
                    <button className="px-4 py-2 border-2 border-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-50 transition">
                      ☕☕☕ ₩10,000
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Form - Optional Message */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">응원 메시지 남기기 (선택)</h2>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              응원 메시지 (선택)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="따뜻한 응원의 메시지를 남겨주세요 💕"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-600"
            />
            <p className="text-sm text-gray-500 mt-2">
              공개적으로 표시됩니다 (익명 가능)
            </p>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              이름 (선택)
            </label>
            <input
              type="text"
              placeholder="실명 또는 익명"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-600"
            />
            <p className="text-sm text-gray-500 mt-2">
              비워두시면 "익명의 후원자"로 표시됩니다
            </p>
          </div>

          {/* CTA Button */}
          <button
            className="w-full py-4 text-center rounded-full font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            메시지 남기기
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            후원 완료 후 메시지가 공개됩니다
          </p>
        </div>

        {/* Recent Supporters */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">최근 후원자</h2>
          <div className="space-y-4">
            {[
              { name: "민지", amount: 5000, message: "항상 좋은 콘텐츠 감사해요!", time: "5분 전" },
              { name: "익명", amount: 10000, message: "응원합니다 💕", time: "1시간 전" },
              { name: "수연", amount: 3000, message: "영상 잘 보고 있어요~", time: "2시간 전" },
              { name: "지은", amount: 30000, message: "오늘 영상 대박이었어요!", time: "3시간 전" },
              { name: "익명", amount: 5000, message: "", time: "5시간 전" }
            ].map((supporter, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {supporter.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{supporter.name}</span>
                    <span className="text-emerald-600 font-bold">
                      ₩{supporter.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">• {supporter.time}</span>
                  </div>
                  {supporter.message && (
                    <p className="text-gray-700 text-sm">{supporter.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
