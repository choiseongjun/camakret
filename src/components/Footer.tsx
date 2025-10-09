import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎬</span>
              </div>
              <span className="text-xl font-bold text-white">CreatorHub</span>
            </div>
            <p className="text-sm">
              크리에이터와 팬을 연결하는<br />
              최고의 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/creators" className="hover:text-white transition">크리에이터</Link></li>
              <li><Link href="/recommendations" className="hover:text-white transition">맞춤 추천</Link></li>
              <li><Link href="/community" className="hover:text-white transition">커뮤니티</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition">리뷰</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 CreatorHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
