'use client';

import Link from "next/link";

import ReceivedApplicationsSummary from './ReceivedApplicationsSummary';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">크리에이터 링크</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-emerald-600 font-semibold">대시보드</Link>
                <Link href="/shop" className="text-gray-600 hover:text-gray-900">쇼핑몰</Link>
                <Link href="/community" className="text-gray-600 hover:text-gray-900">커뮤니티</Link>
                <Link href="/coupons" className="text-gray-600 hover:text-gray-900">쿠폰</Link>
                <Link href="/email" className="text-gray-600 hover:text-gray-900">이메일</Link>
                <Link href="/dashboard/applications" className="text-gray-600 hover:text-gray-900">받은 지원</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <span className="text-xl">🔔</span>
              </button>
              <Link href="/profile" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-xl hover:shadow-lg transition">
                👩‍🎨
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요, 김크리에이터님! 👋</h1>
          <p className="text-gray-600">오늘도 좋은 하루 되세요</p>
        </div>

        {/* Top Section: Profile Link & Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Your Link */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">당신의 링크</h2>
                <div className="bg-white/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
                  <span className="text-sm">creatorlink.kr/yourname</span>
                  <button className="hover:bg-white/10 px-2 py-1 rounded">📋</button>
                </div>
              </div>
              <Link href="/demo" className="px-4 py-2 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-50 transition">
                미리보기
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold">2.4K</div>
                <div className="text-sm text-purple-100">이번 주 방문</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold">186</div>
                <div className="text-sm text-purple-100">클릭</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold">7.8%</div>
                <div className="text-sm text-purple-100">전환율</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">이번 달 수익</div>
              <div className="text-3xl font-bold text-gray-900">₩340K</div>
              <div className="text-sm text-green-600 mt-2">+23% vs 지난달</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">활성 링크</div>
              <div className="text-3xl font-bold text-gray-900">12</div>
            </div>
          </div>
        </div>

        {/* 상품 관리 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">내 상품</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
              + 새 상품 등록
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className="text-2xl">📚</div>
                <div>
                  <div className="font-semibold text-gray-900">뷰티 루틴 완벽 가이드</div>
                  <div className="text-sm text-gray-600">디지털 상품 • ₩29,000</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">234개 판매</div>
                <div className="text-sm text-gray-500">₩6,786,000</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🗓️</div>
                <div>
                  <div className="font-semibold text-gray-900">1:1 뷰티 컨설팅</div>
                  <div className="text-sm text-gray-600">예약 서비스 • ₩50,000</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">92개 예약</div>
                <div className="text-sm text-gray-500">₩4,600,000</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🎨</div>
                <div>
                  <div className="font-semibold text-gray-900">포토샵 프리셋 팩</div>
                  <div className="text-sm text-gray-600">디지털 상품 • ₩15,000</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">189개 판매</div>
                <div className="text-sm text-gray-500">₩2,835,000</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 받은 지원 요약 */}
          <ReceivedApplicationsSummary />

          {/* Recent Sales */}
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">최근 판매</h3>
                <Link href="/dashboard/products" className="text-sm text-purple-600 hover:underline">
                  전체보기
                </Link>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">뷰티 루틴 완벽 가이드</div>
                  <div className="text-sm text-gray-600">2시간 전</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">₩29,000</div>
                  <div className="text-xs text-green-600">완료</div>
                </div>
              </div>

              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">포토샵 프리셋 팩</div>
                  <div className="text-sm text-gray-600">5시간 전</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">₩15,000</div>
                  <div className="text-xs text-green-600">완료</div>
                </div>
              </div>

              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">1:1 뷰티 컨설팅</div>
                  <div className="text-sm text-gray-600">어제</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">₩50,000</div>
                  <div className="text-xs text-green-600">완료</div>
                </div>
              </div>

              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">뷰티 루틴 완벽 가이드</div>
                  <div className="text-sm text-gray-600">2일 전</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">₩29,000</div>
                  <div className="text-xs text-green-600">완료</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
