"use client";

import Link from "next/link";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 overflow-hidden shadow-2xl flex items-center justify-center text-6xl">
            👩‍🎨
          </div>
          <h1 className="text-4xl font-bold mb-3">김크리에이터</h1>
          <p className="text-lg text-emerald-100 mb-4">
            뷰티 & 라이프스타일 크리에이터<br/>
            당신을 더 아름답게 만드는 실전 노하우를 공유합니다 ✨
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">판매 중인 상품1</h2>

        {/* Items Grid */}
        <div className="space-y-4">
          {/* Digital Product */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">뷰티 루틴 완벽 가이드</h3>
                  <p className="text-gray-600 mb-4">PDF 전자책 • 120페이지 • 평생 소장</p>
                  <div className="text-2xl font-bold text-emerald-600">₩29,000</div>
                </div>
                <Link
                  href="/product/1"
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
                >
                  구매하기
                </Link>
              </div>
            </div>
          </div>

          {/* Service Booking */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-4xl mb-3">🗓️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1:1 뷰티 컨설팅</h3>
                  <p className="text-gray-600 mb-4">화상 상담 60분 • 맞춤 솔루션 제공</p>
                  <div className="text-2xl font-bold text-emerald-600">₩50,000</div>
                </div>
                <Link
                  href="/booking"
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
                >
                  예약하기
                </Link>
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-4xl mb-3">🎬</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">메이크업 영상 패키지</h3>
                  <p className="text-gray-600 mb-4">영상 콘텐츠 12개 • 평생 시청</p>
                  <div className="text-2xl font-bold text-emerald-600">₩39,000</div>
                </div>
                <Link
                  href="/product/3"
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
                >
                  구매하기
                </Link>
              </div>
            </div>
          </div>

          {/* Template */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">포토샵 프리셋 팩</h3>
                  <p className="text-gray-600 mb-4">프리셋 30개 • 상업적 이용 가능</p>
                  <div className="text-2xl font-bold text-emerald-600">₩15,000</div>
                </div>
                <Link
                  href="/product/2"
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap"
                >
                  구매하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SNS Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">더 많은 콘텐츠</h3>
          <div className="grid grid-cols-2 gap-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              📷 인스타그램
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              🎬 유튜브
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Powered by CreatorLink</p>
        </div>
      </div>
    </div>
  );
}