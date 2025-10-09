'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock } from 'lucide-react';

// Google 로고 SVG 컴포넌트
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.358-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.34,43.611,20.083z"/>
  </svg>
);

// Kakao 로고 SVG 컴포넌트
const KakaoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" {...props}>
        <path fill="#391B1B" d="M12 4.44c-4.33 0-7.84 2.8-7.84 6.26 0 2.45 1.74 4.6 4.33 5.6.2.15.31.36.31.58v1.5c0 .22-.11.43-.31.58-.9.6-1.98 1.11-3.19 1.48-.18.05-.35.23-.35.43 0 .28.31.48.58.48.55 0 1.1-.05 1.65-.14 4.9-1.03 8.49-4.53 8.49-8.95C20.06 7.24 16.55 4.44 12 4.44z"/>
    </svg>
);

export default function LoginPage() {
  const { login } = useAuth();

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    if (provider === 'google') {
      login();
    } else {
      alert('카카오 로그인은 아직 지원하지 않습니다.');
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('이메일로 로그인을 시도합니다. (UI 테스트용)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
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
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">소개</Link>
              <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition">
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center py-12 sm:py-24 px-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CreatorHub 시작하기</h1>
            <p className="text-gray-600">좋아하는 크리에이터와 더 가까워지세요.</p>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="space-y-4 mb-6">
            <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              <span className="font-medium text-gray-700">Google 계정으로 로그인</span>
            </button>
            {/* 카카오 로그인 - 추후 구현 */}
            {/* <button onClick={() => handleSocialLogin('kakao')} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#FEE500] rounded-lg hover:bg-[#FDD835] transition-colors">
              <KakaoIcon />
              <span className="font-medium text-[#391B1B]">카카오 계정으로 로그인</span>
            </button> */}
          </div>

          {/* 구분선 - 이메일 로그인 비활성화 시 주석 */}
          {/* <div className="flex items-center my-8">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm font-medium text-gray-500">또는</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div> */}

          {/* 이메일 로그인 폼 - 추후 구현 */}
          {/* <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" id="email" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" id="password" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">비밀번호를 잊으셨나요?</a>
            </div>
            <div>
              <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-base hover:shadow-xl transition transform hover:-translate-y-0.5">
                로그인
              </button>
            </div>
          </form> */}

          {/* 회원가입 링크 - 추후 구현 */}
          {/* <p className="text-center text-sm text-gray-600 mt-8">
            아직 계정이 없으신가요? <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">회원가입</Link>
          </p> */}
        </div>
      </main>
    </div>
  );
}
