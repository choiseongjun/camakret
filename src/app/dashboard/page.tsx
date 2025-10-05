import Link from "next/link";

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
        {/* Top Section: Profile Link & Quick Actions */}
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link href="/shop" className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition text-left">
            <div className="text-2xl mb-2">🛍️</div>
            <div className="font-semibold text-gray-900">쇼핑몰 관리</div>
            <div className="text-sm text-gray-600">상품 & 서비스</div>
          </Link>
          <Link href="/community" className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition text-left">
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold text-gray-900">커뮤니티</div>
            <div className="text-sm text-gray-600">팬들과 소통하기</div>
          </Link>
          <Link href="/coupons" className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition text-left">
            <div className="text-2xl mb-2">🎟️</div>
            <div className="font-semibold text-gray-900">할인 쿠폰</div>
            <div className="text-sm text-gray-600">프로모션 관리</div>
          </Link>
          <Link href="/email" className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition text-left">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-semibold text-gray-900">이메일</div>
            <div className="text-sm text-gray-600">마케팅 캠페인</div>
          </Link>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/membership" className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✨</div>
              <div>
                <div className="font-bold text-gray-900">멤버십</div>
                <div className="text-sm text-gray-600">등급 관리 • 156명</div>
              </div>
            </div>
          </Link>
          <Link href="/booking" className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📅</div>
              <div>
                <div className="font-bold text-gray-900">예약 관리</div>
                <div className="text-sm text-gray-600">서비스 스케줄</div>
              </div>
            </div>
          </Link>
          <Link href="/profile" className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 border border-yellow-200 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">👤</div>
              <div>
                <div className="font-bold text-gray-900">내 프로필</div>
                <div className="text-sm text-gray-600">레벨 & 뱃지</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Links Performance */}
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">링크 성과</h3>
                <Link href="/dashboard/analytics" className="text-sm text-purple-600 hover:underline">
                  전체보기
                </Link>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-lg">
                    🎬
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">최신 유튜브 영상</div>
                    <div className="text-sm text-gray-600">124 클릭</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">52%</div>
                  <div className="text-xs text-gray-500">클릭률</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-lg">
                    🛍️
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">스마트스토어</div>
                    <div className="text-sm text-gray-600">86 클릭</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">36%</div>
                  <div className="text-xs text-gray-500">클릭률</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-lg">
                    📚
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">뷰티 루틴 가이드</div>
                    <div className="text-sm text-gray-600">43 클릭</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">18%</div>
                  <div className="text-xs text-gray-500">클릭률</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-lg">
                    ✍️
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">네이버 블로그</div>
                    <div className="text-sm text-gray-600">32 클릭</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">13%</div>
                  <div className="text-xs text-gray-500">클릭률</div>
                </div>
              </div>
            </div>
          </div>

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

        {/* Bottom Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">프로 팁: 클릭률을 높이는 방법</h3>
              <p className="text-gray-700 mb-3">
                링크 제목에 이모지를 추가하고, 명확한 행동 유도 문구를 사용하세요. 
                데이터에 따르면 클릭률이 평균 40% 증가합니다!
              </p>
              <Link href="#" className="text-blue-600 hover:underline font-semibold text-sm">
                더 알아보기 →
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-200 rounded-full text-emerald-800 font-semibold text-xs mb-4">
              ✨ 특별한 기능
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              크리에이터 링크만의 강력한 기능
            </h3>
            <p className="text-gray-600">수익화부터 팬덤 관리까지 한 곳에서</p>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* 팬 커뮤니티 */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  💬
                </div>
                <div>
                  <div className="font-bold text-lg">팬 커뮤니티</div>
                  <div className="text-xs text-emerald-100">독점 기능</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✨</span> VIP/프리미엄 전용 피드
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✨</span> 실시간 댓글 & 좋아요
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✨</span> 투표 & 설문조사
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✨</span> 레벨 & 뱃지 시스템
                </li>
              </ul>
            </div>

            {/* 수익화 도구 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl">
                  💰
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">수익화 도구</div>
                  <div className="text-xs text-gray-500">완벽한 세트</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 디지털 상품 판매
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 1:1 서비스 예약
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 2단계 멤버십
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 영상 콘텐츠 판매
                </li>
              </ul>
            </div>

            {/* 한국 특화 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                  🇰🇷
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">한국 특화</div>
                  <div className="text-xs text-gray-500">완벽 최적화</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 토스/카카오페이
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 카카오톡 알림
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 네이버 연동
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> 한국어 지원
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎟️</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">할인 쿠폰</div>
              <div className="text-xs text-gray-600">무제한 발행</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">이메일</div>
              <div className="text-xs text-gray-600">마케팅 자동화</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">분석</div>
              <div className="text-xs text-gray-600">실시간 대시보드</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-gray-900 text-sm mb-1">커스텀</div>
              <div className="text-xs text-gray-600">자유로운 디자인</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center bg-white rounded-2xl p-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">₩19,900 / 월</div>
            <p className="text-sm text-gray-600 mb-4">모든 기능 무제한 사용</p>
            <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition">
              내 페이지 미리보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
