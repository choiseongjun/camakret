import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">크리에이터 링크</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">기능</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition">요금</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">로그인</Link>
              <Link href="/dashboard" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition">
                무료로 시작하기
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-medium text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
            크리에이터 전용 플랫폼
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            하나의 링크로<br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              당신만의 쇼핑몰을
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            인스타그램 프로필 링크 하나로<br />
            디지털 상품 판매, 서비스 예약, 멤버십까지<br />
            크리에이터를 위한 올인원 쇼핑몰 플랫폼
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
              무료로 시작하기 →
            </Link>
            <Link href="/demo" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition">
              데모 보기
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <Link href="/demo" className="block text-sm text-gray-500 mb-4 text-left">
                creatorlink.kr/yourname
              </Link>
              <div className="text-left space-y-3">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 border border-emerald-200">
                  <div className="font-medium text-gray-900">🎬 최신 유튜브 영상</div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 border border-blue-200">
                  <div className="font-medium text-gray-900">🛍️ 스마트스토어</div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border border-green-200">
                  <div className="font-medium text-gray-900">📚 디지털 상품 - ₩29,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Unique Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-6">
            <span>✨</span>
            크리에이터를 위한 특별한 기능
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            크리에이터를 위해<br />
            <span className="text-emerald-600">특별히 설계된 플랫폼</span>
          </h2>
          <p className="text-xl text-gray-600">수익화 + 팬덤 관리 + 커뮤니티를 한 곳에서</p>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 수익화 도구 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 flex items-center justify-center text-3xl">
              💰
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">수익화 도구</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">디지털 상품 판매</div>
                  <div className="text-sm text-gray-600">PDF, 영상, 템플릿 무제한</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">1:1 서비스 예약</div>
                  <div className="text-sm text-gray-600">코칭, 컨설팅, 레슨</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">2단계 멤버십</div>
                  <div className="text-sm text-gray-600">프리미엄 & VIP 구독</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">영상 콘텐츠 판매</div>
                  <div className="text-sm text-gray-600">동영상, 튜토리얼 등</div>
                </div>
              </li>
            </ul>
          </div>

          {/* 팬 커뮤니티 */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 border-2 border-emerald-400 shadow-2xl transform md:scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
              독점 기능 🔥
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl mb-6 flex items-center justify-center text-3xl">
              💬
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">팬 커뮤니티</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 mt-1">✨</span>
                <div>
                  <div className="font-semibold text-white">등급별 전용 피드</div>
                  <div className="text-sm text-emerald-100">VIP, 프리미엄, 일반 구분</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 mt-1">✨</span>
                <div>
                  <div className="font-semibold text-white">실시간 소통</div>
                  <div className="text-sm text-emerald-100">댓글, 좋아요, 투표</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 mt-1">✨</span>
                <div>
                  <div className="font-semibold text-white">레벨 & 뱃지 시스템</div>
                  <div className="text-sm text-emerald-100">팬덤 충성도 보상</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 mt-1">✨</span>
                <div>
                  <div className="font-semibold text-white">독점 콘텐츠</div>
                  <div className="text-sm text-emerald-100">멤버 전용 비하인드</div>
                </div>
              </li>
            </ul>
          </div>

          {/* 한국 특화 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center text-3xl">
              🇰🇷
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">한국 특화</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">토스/카카오페이</div>
                  <div className="text-sm text-gray-600">간편결제로 결제율 UP</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">네이버 연동</div>
                  <div className="text-sm text-gray-600">스마트스토어 링크</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">카카오톡 알림</div>
                  <div className="text-sm text-gray-600">주문/배송 자동 안내</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">한국어 고객지원</div>
                  <div className="text-sm text-gray-600">실시간 채팅 상담</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="text-3xl mb-3">🎟️</div>
            <h4 className="font-bold text-gray-900 mb-2">할인 쿠폰</h4>
            <p className="text-sm text-gray-600">멤버십별 쿠폰, 기간 한정 프로모션</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="text-3xl mb-3">📧</div>
            <h4 className="font-bold text-gray-900 mb-2">이메일 마케팅</h4>
            <p className="text-sm text-gray-600">구독자 관리, 캠페인 자동화</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">실시간 분석</h4>
            <p className="text-sm text-gray-600">매출, 방문자, 전환율 한눈에</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="text-3xl mb-3">🎨</div>
            <h4 className="font-bold text-gray-900 mb-2">커스터마이징</h4>
            <p className="text-sm text-gray-600">나만의 스타일로 페이지 꾸미기</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-white mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">수치로 보는 크리에이터 링크</h3>
            <p className="text-emerald-100">실제 크리에이터들의 성과</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">2.5배</div>
              <div className="text-emerald-100">평균 수익 증가</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-emerald-100">재구매율</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3분</div>
              <div className="text-emerald-100">페이지 세팅 시간</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">자동 운영</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-3xl p-12 border-2 border-emerald-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">지금 바로 시작하세요</h3>
          <p className="text-gray-600 mb-8 text-lg">
            신용카드 등록 없이 <span className="font-bold text-emerald-600">14일 무료 체험</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
              무료로 시작하기 →
            </Link>
            <Link href="/demo" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-200 transition">
              데모 둘러보기
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            월 ₩19,900 • 언제든 해지 가능
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">크리에이터 수익화의 모든 것</h2>
          <p className="text-xl text-gray-600">한 곳에서 판매하고, 예약받고, 관리하세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              📚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">디지털 상품 판매</h3>
            <p className="text-gray-600 leading-relaxed">
              전자책, 템플릿, 프리셋, 영상 콘텐츠를 판매하세요. 결제 즉시 자동 전송됩니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              🗓️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">서비스 예약</h3>
            <p className="text-gray-600 leading-relaxed">
              컨설팅, 코칭, 레슨 등 서비스 예약을 쉽게 받고 자동 알림으로 관리하세요.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              ✨
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">멤버십 수익</h3>
            <p className="text-gray-600 leading-relaxed">
              월간 구독으로 안정적인 수익 창출. 멤버 전용 콘텐츠와 혜택 제공.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              💳
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">한국형 결제</h3>
            <p className="text-gray-600 leading-relaxed">
              토스페이, 카카오페이, 신용카드. 한국인이 실제로 사용하는 결제 수단.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              🛍️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">스마트스토어 연동</h3>
            <p className="text-gray-600 leading-relaxed">
              이미 운영 중인 쇼핑몰을 연결하거나, 제휴 상품도 함께 판매하세요.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">실시간 분석</h3>
            <p className="text-gray-600 leading-relaxed">
              매출, 클릭, 인기 상품을 한눈에. 데이터 기반으로 수익을 최적화하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">간단한 요금제</h2>
          <p className="text-xl text-gray-600">복잡한 것 없이, 명확하게</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">₩19,900</div>
              <div className="text-purple-100">/ 월</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>디지털 상품 무제한 판매</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>서비스 예약 및 관리</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>멤버십 구독 기능</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>토스/카카오페이 결제</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>자동 전송 & 알림</span>
          </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <span>실시간 매출 분석</span>
          </li>
            </ul>

            <Link href="/dashboard" className="block w-full py-4 bg-white text-emerald-600 rounded-full font-bold text-center hover:bg-gray-50 transition">
              14일 무료 체험 시작
            </Link>
            <p className="text-center text-sm text-emerald-100 mt-4">신용카드 등록 불필요</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            5분이면 당신만의 링크 페이지가 완성됩니다
          </p>
          <Link href="/dashboard" className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-gray-50 transition transform hover:-translate-y-0.5">
            무료로 시작하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
                <span className="text-lg font-bold text-gray-900">크리에이터 링크</span>
              </div>
              <p className="text-gray-600 text-sm">
                크리에이터를 위한<br />링크인바이오 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">제품</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features" className="hover:text-gray-900">기능</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900">요금</Link></li>
                <li><Link href="/demo" className="hover:text-gray-900">데모</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">고객센터</Link></li>
                <li><Link href="#" className="hover:text-gray-900">가이드</Link></li>
                <li><Link href="#" className="hover:text-gray-900">API 문서</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">소개</Link></li>
                <li><Link href="#" className="hover:text-gray-900">블로그</Link></li>
                <li><Link href="#" className="hover:text-gray-900">채용</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            © 2025 크리에이터 링크. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
