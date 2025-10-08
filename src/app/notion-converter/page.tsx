import Link from "next/link";

export default function NotionConverterLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl">📄</div>
              <span className="text-xl font-bold text-white">NotionToSite</span>
            </div>
            <Link 
              href="/notion-converter/convert"
              className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              무료로 시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 font-semibold text-sm mb-6">
          <span>✨</span>
          노션 페이지를 3초만에 웹사이트로
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          노션 페이지를<br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            아름다운 웹사이트로
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          코딩 필요 없이, 클릭 한 번으로<br />
          노션 페이지를 전문가급 랜딩페이지로 변환하세요
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/notion-converter/convert"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:-translate-y-1"
          >
            지금 바로 시작하기 →
          </Link>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition border border-white/20">
            데모 보기
          </button>
        </div>

        {/* Demo Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-sm text-gray-600">
                yoursite.com
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">당신의 멋진 사이트</h2>
              <p className="text-gray-600">노션에서 3초 만에 변환됨</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            정말 쉬워요
          </h2>
          <p className="text-xl text-gray-300">3단계면 끝</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-gray-900">
              1
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
              <div className="text-5xl mb-4 text-center">📋</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">노션 URL 붙여넣기</h3>
              <p className="text-gray-400 text-center">
                노션 페이지 링크를<br/>복사해서 붙여넣으세요
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-gray-900">
              2
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
              <div className="text-5xl mb-4 text-center">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">템플릿 선택</h3>
              <p className="text-gray-400 text-center">
                10가지 전문가급 템플릿 중<br/>마음에 드는 것 선택
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-gray-900">
              3
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
              <div className="text-5xl mb-4 text-center">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">배포 완료!</h3>
              <p className="text-gray-400 text-center">
                커스텀 도메인 연결하고<br/>전세계에 공개하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            강력한 기능들
          </h2>
          <p className="text-xl text-gray-300">필요한 모든 것</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-white mb-2">초고속 변환</h3>
            <p className="text-sm text-gray-400">3초 안에 변환 완료</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-white mb-2">10가지 템플릿</h3>
            <p className="text-sm text-gray-400">전문가가 디자인한 템플릿</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-white mb-2">커스텀 도메인</h3>
            <p className="text-sm text-gray-400">yoursite.com 연결</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-white mb-2">모바일 최적화</h3>
            <p className="text-sm text-gray-400">모든 기기에서 완벽</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-bold text-white mb-2">실시간 동기화</h3>
            <p className="text-sm text-gray-400">노션 수정 즉시 반영</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-white mb-2">SEO 최적화</h3>
            <p className="text-sm text-gray-400">구글 검색 노출</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            간단한 요금제
          </h2>
          <p className="text-xl text-gray-300">지금 시작하세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">무료</h3>
            <div className="text-4xl font-bold text-white mb-6">₩0</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> 1개 페이지
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> 기본 템플릿
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span className="text-gray-600">✗</span> 커스텀 도메인
              </li>
            </ul>
            <Link href="/notion-converter/convert" className="block w-full text-center px-4 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition">
              시작하기
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 transform scale-105 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
              인기 🔥
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <div className="text-4xl font-bold text-white mb-6">₩9,900<span className="text-lg">/월</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-white">
                <span className="text-yellow-300">✓</span> 무제한 페이지
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="text-yellow-300">✓</span> 모든 템플릿
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="text-yellow-300">✓</span> 커스텀 도메인
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="text-yellow-300">✓</span> 실시간 동기화
              </li>
            </ul>
            <Link href="/notion-converter/convert" className="block w-full text-center px-4 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition">
              시작하기
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">기업</h3>
            <div className="text-4xl font-bold text-white mb-6">문의</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> Pro 모든 기능
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> 팀 협업
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span> 우선 지원
              </li>
            </ul>
            <button className="w-full px-4 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition">
              문의하기
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            신용카드 등록 없이 무료로 시작
          </p>
          <Link 
            href="/notion-converter/convert"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-2xl"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400 text-sm">
          <p>© 2025 NotionToSite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
