'use client';

import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, loading: authLoading, logout } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎬</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CreatorHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/creators" className="text-gray-600 hover:text-gray-900 transition">크리에이터</Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition">커뮤니티</Link>
            <Link href="/reviews" className="text-gray-600 hover:text-gray-900 transition">리뷰</Link>
            {!authLoading && (
              user ? (
                <>
                  <span className="text-gray-800 font-medium">{user.name}님</span>
                  <button onClick={logout} className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition">
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                  로그인
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
