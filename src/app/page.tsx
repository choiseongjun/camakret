'use client';

import { useState } from 'react';
import Link from "next/link";
import { Search, ArrowRight, Users, Video, Sparkles, CheckCircle } from 'lucide-react';

export default function Home() {
  const [userType, setUserType] = useState<'creator' | 'guest' | null>(null);

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-green-100 rounded-full text-green-600 font-semibold text-sm">
              🎬 크리에이터 × 게스트 매칭 플랫폼
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              완벽한 콜라보 파트너를<br />
              찾아보세요
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              전문가, 특기 보유자와 유튜버를 연결합니다.<br />
              당신의 채널에 필요한 게스트를 찾거나, 유튜브에 출연할 기회를 잡으세요.
            </p>

            {/* User Type Selection */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 text-white hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">🎥</div>
                <h3 className="text-2xl font-bold mb-3">크리에이터</h3>
                <p className="mb-6 opacity-90">
                  전문가 게스트를 섭외해서<br />
                  퀄리티 높은 콘텐츠를 만드세요
                </p>
                <Link
                  href="/guests"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-green-50 transition"
                >
                  게스트 찾기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl p-8 text-white hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold mb-3">게스트</h3>
                <p className="mb-6 opacity-90">
                  유튜브에 출연해서<br />
                  당신의 전문성을 알리세요
                </p>
                <Link
                  href="/register-guest"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-full font-bold hover:bg-teal-50 transition"
                >
                  게스트 등록
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">어떻게 작동하나요?</h2>
            <p className="text-xl text-gray-600">3단계로 간편하게 매칭</p>
          </div>

          {/* For Creators */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-green-600 mb-8 text-center">📹 크리에이터라면</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">1. 게스트 탐색</h4>
                <p className="text-gray-600">카테고리, 전문성, 지역으로 필터링해서 원하는 게스트 찾기</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">2. 출연 제안</h4>
                <p className="text-gray-600">콘텐츠 아이디어, 일정, 출연료 조건 제시</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">3. 촬영 진행</h4>
                <p className="text-gray-600">매칭 성사 후 함께 퀄리티 높은 콘텐츠 제작</p>
              </div>
            </div>
          </div>

          {/* For Guests */}
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-8 text-center">⭐ 게스트라면</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">1. 프로필 등록</h4>
                <p className="text-gray-600">전문성, 특기, 출연 가능한 콘텐츠 소개</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">2. 제안 받기</h4>
                <p className="text-gray-600">크리에이터들의 출연 제안 검토</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">3. 출연 & 홍보</h4>
                <p className="text-gray-600">영상 출연으로 전문성 알리고 고객 확보</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">다양한 분야의 게스트</h2>
            <p className="text-xl text-gray-600">어떤 콘텐츠에도 맞는 전문가를 찾아보세요</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">💪</div>
              <h4 className="font-bold text-lg mb-2">운동/건강</h4>
              <p className="text-sm text-gray-600">트레이너, 요가 강사, 필라테스</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🍳</div>
              <h4 className="font-bold text-lg mb-2">요리/음식</h4>
              <p className="text-sm text-gray-600">셰프, 바리스타, 소믈리에</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">⚖️</div>
              <h4 className="font-bold text-lg mb-2">전문직</h4>
              <p className="text-sm text-gray-600">변호사, 의사, 회계사</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-lg mb-2">예술/공연</h4>
              <p className="text-sm text-gray-600">마술사, 댄서, 가수</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">💄</div>
              <h4 className="font-bold text-lg mb-2">뷰티/패션</h4>
              <p className="text-sm text-gray-600">메이크업, 스타일리스트</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-bold text-lg mb-2">교육/강연</h4>
              <p className="text-sm text-gray-600">교수, 강사, 작가</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎮</div>
              <h4 className="font-bold text-lg mb-2">게임/e스포츠</h4>
              <p className="text-sm text-gray-600">프로게이머, 게임 코치</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="font-bold text-lg mb-2">여행/모험</h4>
              <p className="text-sm text-gray-600">여행가, 등산가, 다이버</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                크리에이터에게<br />완벽한 솔루션
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">전문가 섭외 간편화</h4>
                    <p className="text-gray-600">DM으로 일일이 연락하지 않아도 됩니다</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">콘텐츠 퀄리티 향상</h4>
                    <p className="text-gray-600">실제 전문가 출연으로 신뢰도 UP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">출연료 협상 투명</h4>
                    <p className="text-gray-600">조건 명확히 제시하고 협의</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                게스트에게<br />새로운 기회
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">무료 홍보 효과</h4>
                    <p className="text-gray-600">유튜브 출연으로 인지도 상승</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">고객 확보</h4>
                    <p className="text-gray-600">영상 시청자가 실제 고객으로</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">포트폴리오 구축</h4>
                    <p className="text-gray-600">출연 이력이 쌓여 신뢰도 증가</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full text-green-600 font-semibold text-sm">
              🚀 베타 테스트 중
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">실제 사용자들의 후기</h2>
            <p className="text-xl text-gray-600">초기 베타 테스터들의 생생한 경험담</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  PT
                </div>
                <div>
                  <div className="font-bold">필라테스 강사</div>
                  <div className="text-sm text-gray-500">강남 필라테스 원장</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                등록하고 2주만에 제안 2건 받았어요! 한 채널이 구독자 12만이라 처음엔 반신반의했는데 진짜 촬영 나갔고, 영상 나간 후에 센터 문의 엄청 들어왔습니다. 완전 대박
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  카
                </div>
                <div>
                  <div className="font-bold">카페 사장님</div>
                  <div className="text-sm text-gray-500">홍대 디저트 카페</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
                <span className="text-gray-300">⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                유튜버분이 직접 찾아오셨어요. 촬영하고 영상 업로드되니까 손님들이 "유튜브 보고 왔어요"라고 하더라고요ㅋㅋ 광고비 안쓰고 홍보됐습니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  요
                </div>
                <div>
                  <div className="font-bold">요가 강사</div>
                  <div className="text-sm text-gray-500">서울 요가 스튜디오</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                프로필 올려놓기만 했는데 제안이 와서 신기했어요. 출연 후 인스타 팔로워도 늘고 수강 신청도 많이 들어왔습니다. 무료로 홍보되는 느낌이라 좋네요!
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              ※ 베타 테스트 기간 중 실제 사용자 후기입니다
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🎉 베타 런칭 기념</h2>
            <p className="text-xl text-gray-300">지금 시작하는 모든 분들께 특별 혜택을 드립니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-5xl font-bold mb-2 text-green-400">100%</div>
              <div className="text-xl text-gray-300 mb-2">완전 무료</div>
              <div className="text-sm text-gray-400">수수료 없이 모든 기능 이용</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-5xl font-bold mb-2 text-green-400">1순위</div>
              <div className="text-xl text-gray-300 mb-2">우선 매칭</div>
              <div className="text-sm text-gray-400">초기 가입자 우선 노출</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-5xl font-bold mb-2 text-green-400">∞</div>
              <div className="text-xl text-gray-300 mb-2">무제한 제안</div>
              <div className="text-sm text-gray-400">제한 없이 제안 주고받기</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-12 text-white text-center shadow-2xl">
            <div className="inline-block mb-6 px-4 py-2 bg-white/20 rounded-full font-semibold text-sm backdrop-blur">
              🎁 베타 기간 한정 혜택
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              지금 등록하고<br />특별 혜택을 받으세요
            </h2>
            <p className="text-xl mb-8 opacity-90">
              완벽한 콜라보 파트너를 찾는 여정, 오늘부터 시작하세요
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h4 className="font-bold text-lg mb-2">완전 무료</h4>
                <p className="text-sm opacity-90">수수료 없이 모든 기능 이용</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h4 className="font-bold text-lg mb-2">우선 매칭 기회</h4>
                <p className="text-sm opacity-90">초기 가입자 프로필 우선 노출</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h4 className="font-bold text-lg mb-2">상위 노출</h4>
                <p className="text-sm opacity-90">검색 결과 상단에 표시</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guests"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:bg-green-50 transition transform hover:scale-105 shadow-xl"
              >
                게스트 찾기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/register-guest"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition transform hover:scale-105 border-2 border-white/30"
              >
                지금 등록하고 혜택 받기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="mt-6 text-sm opacity-75">
              ⏰ 베타 기간 중 가입하는 모든 분들께 혜택이 제공됩니다
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
