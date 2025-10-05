"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Success() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            결제가 완료되었습니다!
          </h1>
          <p className="text-xl text-gray-600">
            주문이 정상적으로 처리되었습니다
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-600 mb-1">주문번호</div>
              <div className="font-bold text-gray-900 text-lg">CL-2024-03-001234</div>
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              결제 완료
            </div>
          </div>

          {/* Purchase Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                📚
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-1">뷰티 루틴 완벽 가이드</div>
                <div className="text-sm text-gray-600 mb-2">PDF 전자책 • 120페이지</div>
                <div className="text-lg font-bold text-emerald-600">₩29,000</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">결제 수단</span>
              <span className="font-semibold text-gray-900">토스페이</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">결제 일시</span>
              <span className="font-semibold text-gray-900">
                {new Date().toLocaleDateString('ko-KR')} {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Auto Delivery Status */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-2">📧 다운로드 링크 전송 완료!</div>
                <div className="text-sm text-gray-700 mb-3">
                  <strong>example@email.com</strong>으로 다운로드 링크를 발송했습니다.
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                    <span>결제 확인 완료</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                    <span>다운로드 링크 이메일 발송</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                    <span>구매 내역 저장 완료</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              지금 다운로드하기
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link
            href="/demo"
            className="py-4 bg-white text-gray-900 text-center rounded-2xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition"
          >
            홈으로
          </Link>
          <button className="py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-2xl font-semibold hover:shadow-xl transition">
            영수증 보기
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-semibold text-gray-900 mb-2">알려드립니다</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 구매 내역은 마이페이지에서 확인하실 수 있습니다</li>
                <li>• 이메일을 받지 못하셨다면 스팸함을 확인해주세요</li>
                <li>• 문의사항은 고객센터로 연락주세요</li>
                <li>• 파일은 언제든 재다운로드 가능합니다</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        {countdown > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {countdown}초 후 자동으로 홈으로 이동합니다
          </div>
        )}
      </div>
    </div>
  );
}
