import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <span className="text-xl font-bold text-white">CreatorHub</span>
            </div>
            <p className="text-sm">
              크리에이터와 게스트, 장소를 연결하는<br />
              협업 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스 소개</h3>
            <p className="text-sm leading-relaxed">
              CreatorHub는 음식 크리에이터와<br />
              게스트, 촬영 장소를 연결하여<br />
              더 나은 콘텐츠를 만들 수 있도록<br />
              돕는 협업 플랫폼입니다.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guests" className="hover:text-white transition">게스트 찾기</Link></li>
              <li><Link href="/register-guest" className="hover:text-white transition">게스트 등록</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition">이용 방법</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">협업 문의</h3>
            <div className="text-sm">
              <p className="mb-2">크리에이터 협업 및 제휴 문의</p>
              <a
                href="mailto:creatorhub987@gmail.com"
                className="text-green-400 hover:text-green-300 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                creatorhub987@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 CreatorHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
