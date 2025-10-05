"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TabType = "all" | "products" | "links" | "services";

export default function Demo() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Mobile-optimized creator profile page */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white">
            👩‍🎨
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            김크리에이터
          </h1>
          <p className="text-gray-600 mb-4">
            라이프스타일 크리에이터 | 뷰티 & 패션 💄✨
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            안녕하세요! 일상 속 작은 행복을 공유하는 크리에이터입니다.<br />
            제 콘텐츠가 여러분의 하루를 밝게 만들어 드릴게요 🌟
          </p>
        </div>

        {/* Social Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/40">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">126K</div>
              <div className="text-xs text-gray-600">팔로워</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1.2K</div>
              <div className="text-xs text-gray-600">포스트</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.8%</div>
              <div className="text-xs text-gray-600">참여율</div>
            </div>
          </div>
        </div>

        {/* Shop Banner */}
        <Link href="/shop" className="block bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 mb-6 text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                🛍️
              </div>
              <div>
                <div className="text-xs text-purple-100 mb-1">🎉 신학기 특별 세일</div>
                <h3 className="font-bold text-xl mb-1">상점 구경하기</h3>
                <p className="text-sm text-purple-100">
                  9개의 특별한 상품 • 최대 40% 할인
                </p>
              </div>
            </div>
            <div className="text-2xl">→</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-white/20 px-3 py-1.5 rounded-full">⭐ 평균 4.9점</div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full">💝 1,200+ 구매</div>
          </div>
        </Link>

        {/* Category Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 mb-6 border border-gray-200">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-3 rounded-xl font-semibold text-sm transition ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-3 rounded-xl font-semibold text-sm transition ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              상품
            </button>
            <button
              onClick={() => setActiveTab("links")}
              className={`py-3 rounded-xl font-semibold text-sm transition ${
                activeTab === "links"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              링크
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-3 rounded-xl font-semibold text-sm transition ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              서비스
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 mb-8">
          {/* Digital Products */}
          {(activeTab === "all" || activeTab === "products") && (
            <>
              <div className="text-sm font-semibold text-gray-500 mb-3 px-2">💎 디지털 상품</div>
              
              <Link href="/product/1" className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    📚
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">뷰티 루틴 가이드</h3>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">HOT</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">PDF 전자책 • 120페이지</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">₩29,000</span>
                      <div className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
                        구매하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/product/2" className="block bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border-2 border-orange-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🎨
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">포토샵 프리셋 팩</h3>
                    <p className="text-sm text-gray-600 mb-2">50개 프리셋 • 즉시 다운로드</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-600">₩15,000</span>
                      <div className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-semibold">
                        구매하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/product/3" className="block bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border-2 border-emerald-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🎥
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">메이크업 영상 패키지</h3>
                    <p className="text-sm text-gray-600 mb-2">영상 콘텐츠 12개 • 평생 시청</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">₩89,000</span>
                      <div className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-sm font-semibold">
                        구매하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* Links */}
          {(activeTab === "all" || activeTab === "links") && (
            <>
              <div className="text-sm font-semibold text-gray-500 mb-3 px-2 mt-6">🔗 소셜 미디어</div>
              
              <a href="#" className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🎬
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">최신 유튜브 영상</h3>
                    <p className="text-sm text-gray-600">오늘의 메이크업 튜토리얼</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </a>

              <a href="#" className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📸
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">인스타그램</h3>
                    <p className="text-sm text-gray-600">@creator.kim • 126K 팔로워</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </a>

              <a href="#" className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🛍️
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">스마트스토어</h3>
                    <p className="text-sm text-gray-600">추천 뷰티 제품 모음</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </a>

              <a href="#" className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    ✍️
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">네이버 블로그</h3>
                    <p className="text-sm text-gray-600">더 자세한 리뷰 보기</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </a>

              <a href="#" className="block bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    💬
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">오픈채팅방</h3>
                    <p className="text-sm text-gray-600">뷰티 정보 공유 커뮤니티</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </a>
            </>
          )}

          {/* Community & Membership */}
          {activeTab === "all" && (
            <>
              <div className="text-sm font-semibold text-gray-500 mb-3 px-2 mt-6">💬 커뮤니티</div>
              
              <Link href="/community" className="block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">팬 커뮤니티</h3>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">LIVE</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">전용 피드, 투표, 실시간 소통</p>
                    <div className="text-sm text-blue-600 font-semibold">
                      💬 89개 새 게시물 • 1,234명 활동 중
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </Link>

              <Link href="/membership" className="block bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border-2 border-emerald-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    ✨
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">멤버십 등급</h3>
                      <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">NEW</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">프리미엄 or VIP 선택</p>
                    <div className="text-sm text-emerald-600 font-semibold">
                      💜 ₩9,900 • 💎 ₩19,900 • 156명 가입
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </Link>
            </>
          )}

          {/* Services */}
          {(activeTab === "all" || activeTab === "services") && (
            <>
              <div className="text-sm font-semibold text-gray-500 mb-3 px-2 mt-6">💼 서비스</div>
              
              <Link href="/booking" className="block bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 border-2 border-indigo-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🗓️
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">1:1 뷰티 컨설팅</h3>
                    <p className="text-sm text-gray-600 mb-2">화상 미팅 • 60분 세션</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">₩50,000</span>
                      <div className="px-4 py-1.5 bg-indigo-500 text-white rounded-full text-sm font-semibold">
                        예약하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/booking" className="block bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-4 border-2 border-rose-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    ✨
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">퍼스널 메이크업</h3>
                    <p className="text-sm text-gray-600 mb-2">방문 메이크업 • 2시간</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-rose-600">₩120,000</span>
                      <div className="px-4 py-1.5 bg-rose-500 text-white rounded-full text-sm font-semibold">
                        예약하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/booking" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-4 border-2 border-cyan-300 hover:shadow-lg transition transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    📝
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">월간 뷰티 코칭</h3>
                    <p className="text-sm text-gray-600 mb-2">구독형 • 월 4회 세션</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-600">₩180,000/월</span>
                      <div className="px-4 py-1.5 bg-cyan-500 text-white rounded-full text-sm font-semibold">
                        구독하기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* Empty State */}
          {activeTab === "products" && (
            <div className="text-center py-8 text-gray-500">
              {/* This won't show as we have products, but keeping for structure */}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-900 mb-2">뉴스레터 구독</h3>
          <p className="text-sm text-gray-600 mb-4">
            매주 뷰티 팁과 신제품 소식을 받아보세요
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition">
              구독
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mb-4">
          <p>Powered by <span className="font-semibold text-purple-600">크리에이터 링크</span></p>
          <Link href="/" className="text-purple-600 hover:underline mt-2 inline-block">
            나도 만들기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
