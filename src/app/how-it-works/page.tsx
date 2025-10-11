'use client';

import Link from 'next/link';
import { ArrowRight, Search, Users, Send, Video, CheckCircle, Star, Award, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'creator' | 'guest'>('creator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">CreatorHub 이용 방법</h1>
          <p className="text-xl opacity-90 mb-8">
            크리에이터와 게스트를 연결하는 간단한 3단계
          </p>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-8 py-3 rounded-full font-bold transition ${
                activeTab === 'creator'
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎥 크리에이터용
            </button>
            <button
              onClick={() => setActiveTab('guest')}
              className={`px-8 py-3 rounded-full font-bold transition ${
                activeTab === 'guest'
                  ? 'bg-gradient-to-r from-teal-400 to-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⭐ 게스트용
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Creator Flow */}
        {activeTab === 'creator' && (
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Search className="w-24 h-24 mx-auto text-green-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">게스트 탐색 화면</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full font-bold mb-4">
                  STEP 1
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">게스트 찾기</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  카테고리, 전문성, 지역으로 필터링해서 원하는 게스트를 찾으세요.
                  검색 기능으로 빠르게 특정 분야 전문가를 찾을 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">8개 카테고리 (운동, 요리, 전문직 등)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">지역별 필터링 (서울 강남, 마포 등)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">출연료별 필터 (무료/유료)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full font-bold mb-4">
                  STEP 2
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">프로필 확인 & 제안</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  게스트의 상세 프로필을 확인하고 협업 제안서를 작성하세요.
                  콘텐츠 아이디어, 촬영 일정, 출연료를 제시합니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">경력, 자격증, 과거 출연 이력 확인</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">평점 & 협업 횟수로 신뢰도 체크</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">간편한 제안서 작성 (5분 소요)</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Send className="w-24 h-24 mx-auto text-green-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">협업 제안 화면</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-24 h-24 mx-auto text-green-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">촬영 진행</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full font-bold mb-4">
                  STEP 3
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">매칭 성사 & 촬영</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  게스트가 제안을 수락하면 연락처가 공유됩니다.
                  일정을 조율하고 함께 퀄리티 높은 콘텐츠를 제작하세요.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">이메일/전화로 직접 소통</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">촬영 후 리뷰 작성으로 신뢰도 향상</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">다음 협업 시 우선 매칭</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">지금 바로 게스트를 찾아보세요</h3>
              <p className="text-lg mb-8 opacity-90">100% 무료 매칭 서비스</p>
              <Link
                href="/guests"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:shadow-xl transition"
              >
                게스트 탐색하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Guest Flow */}
        {activeTab === 'guest' && (
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-teal-100 to-green-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-24 h-24 mx-auto text-teal-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">프로필 등록 화면</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full font-bold mb-4">
                  STEP 1
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">프로필 등록</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  당신의 전문성과 특기를 소개하는 프로필을 작성하세요.
                  출연 가능한 콘텐츠 아이디어도 함께 제시하면 좋습니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">기본 정보 (이름, 직업, 지역)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">전문 분야 & 경력 사항</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">출연 가능 콘텐츠 아이디어</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">희망 출연료 설정</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full font-bold mb-4">
                  STEP 2
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">제안 받기</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  크리에이터들이 당신의 프로필을 보고 협업 제안을 보냅니다.
                  제안 내용을 검토하고 마음에 드는 것을 수락하세요.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">이메일로 제안 알림 수신</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">콘텐츠 아이디어, 일정, 출연료 확인</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">크리에이터 채널 정보 사전 검토</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-teal-100 to-green-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Star className="w-24 h-24 mx-auto text-teal-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">제안 확인 화면</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-teal-100 to-green-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-24 h-24 mx-auto text-teal-600 mb-4" />
                    <p className="text-lg font-semibold text-gray-700">출연 & 홍보 효과</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full font-bold mb-4">
                  STEP 3
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">출연 & 홍보</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  영상 출연으로 전문성을 알리고 새로운 고객을 확보하세요.
                  출연 이력이 쌓이면 신뢰도가 높아져 더 많은 제안을 받게 됩니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">유튜브 조회수만큼 무료 홍보</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">시청자가 실제 고객으로 전환</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">포트폴리오 구축으로 신뢰도 UP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">지금 게스트로 등록하세요</h3>
              <p className="text-lg mb-8 opacity-90">무료로 유튜브 출연 기회 잡기</p>
              <Link
                href="/register-guest"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-bold text-lg hover:shadow-xl transition"
              >
                게스트 등록하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-lg text-gray-600">궁금한 점이 있으신가요?</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    매칭 서비스는 무료인가요?
                  </h3>
                  <p className="text-gray-600">
                    네, CreatorHub의 기본 매칭 서비스는 100% 무료입니다.
                    게스트 탐색, 제안서 전송, 프로필 등록 모두 무료로 이용 가능합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    출연료는 어떻게 정해지나요?
                  </h3>
                  <p className="text-gray-600">
                    게스트가 프로필에 희망 출연료를 명시합니다.
                    크리에이터는 제안서에서 출연료를 제시하고, 협의를 통해 최종 결정됩니다.
                    많은 게스트가 홍보 목적으로 무료 출연하기도 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    제안이 수락되지 않으면 어떻게 하나요?
                  </h3>
                  <p className="text-gray-600">
                    다른 게스트에게 제안할 수 있습니다.
                    제안서를 더 구체적으로 작성하거나, 채널 정보를 상세히 제공하면 수락률이 높아집니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    촬영 후 문제가 생기면 어떻게 하나요?
                  </h3>
                  <p className="text-gray-600">
                    플랫폼에서 분쟁 조정 서비스를 제공합니다.
                    리뷰 시스템으로 신뢰도가 관리되므로, 성실한 참여가 중요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            준비되셨나요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            완벽한 콜라보 파트너를 찾는 여정을 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guests"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition"
            >
              크리에이터 시작하기
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register-guest"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition"
            >
              게스트 시작하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
