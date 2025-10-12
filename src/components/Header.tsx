'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, loading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎬</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CreatorHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">서비스 소개</Link>
            <Link href="/guests" className="text-gray-600 hover:text-gray-900 transition">게스트 찾기</Link>
            <Link href="/register-guest" className="text-gray-600 hover:text-gray-900 transition">게스트 등록</Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition">이용 방법</Link>
            {!authLoading && (
              user ? (
                <>
                  <Link href="/guest/dashboard" className="text-gray-600 hover:text-gray-900 transition font-medium">
                    내 대시보드
                  </Link>
                  <span className="text-gray-800 font-medium">{user.name}님</span>
                  <button onClick={logout} className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition">
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-medium hover:shadow-lg transition">
                  로그인
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={closeMobileMenu}
              >
                서비스 소개
              </Link>
              <Link
                href="/guests"
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={closeMobileMenu}
              >
                게스트 찾기
              </Link>
              <Link
                href="/register-guest"
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={closeMobileMenu}
              >
                게스트 등록
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={closeMobileMenu}
              >
                이용 방법
              </Link>
              {!authLoading && (
                user ? (
                  <>
                    <Link
                      href="/guest/dashboard"
                      className="text-gray-600 hover:text-gray-900 transition font-medium py-2"
                      onClick={closeMobileMenu}
                    >
                      내 대시보드
                    </Link>
                    <div className="text-gray-800 font-medium py-2">{user.name}님</div>
                    <button
                      onClick={() => { logout(); closeMobileMenu(); }}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition text-center"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-6 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-medium hover:shadow-lg transition text-center"
                    onClick={closeMobileMenu}
                  >
                    로그인
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
