'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Users, Award, Calendar, Phone, Mail, Send, X } from 'lucide-react';

// 임시 데이터 (guests/page.tsx와 동일)
const mockGuests = [
  {
    id: '1',
    name: '김철수',
    title: '퍼스널 트레이너',
    category: '운동/건강',
    location: '서울 강남',
    expertise: ['다이어트', '근력 운동', '홈트레이닝', '체형 교정'],
    fee: '무료 (홍보 목적)',
    rating: 4.8,
    collabCount: 12,
    image: '💪',
    bio: '10년 경력의 퍼스널 트레이너입니다. 체계적인 운동 프로그램으로 회원들의 목표 달성을 도와왔습니다.',
    portfolio: [
      '생활스포츠지도사 1급',
      '헬스장 운영 5년',
      '다이어트 프로그램 개발',
      '운동 유튜브 채널 운영 (구독자 5천)'
    ],
    availability: '주말',
    phone: '010-1234-5678',
    email: 'trainer@example.com',
    contentIdeas: [
      '30일 홈트 챌린지',
      '운동 자세 교정 시리즈',
      '다이어트 식단 + 운동 조합',
      '초보자를 위한 헬스장 이용법'
    ],
    pastWorks: [
      { title: '홈트레이닝 브이로그', channel: '핏블리TV', views: '50만' },
      { title: '다이어트 성공 스토리', channel: '건강한일상', views: '30만' }
    ]
  },
  {
    id: '2',
    name: '박미영',
    title: '요리 연구가',
    category: '요리/음식',
    location: '서울 마포',
    expertise: ['한식', '홈쿠킹', '다이어트 식단', '손님 초대 요리'],
    fee: '협의 가능',
    rating: 4.9,
    collabCount: 25,
    image: '🍳',
    bio: '20년 경력 요리 연구가입니다. TV 프로그램 다수 출연 경험이 있으며, 누구나 쉽게 따라할 수 있는 레시피를 만듭니다.',
    portfolio: [
      '요리책 3권 출간',
      '요리 학원 운영 10년',
      'TV 요리 프로그램 출연 (MBC, SBS)',
      '기업 레시피 개발 다수'
    ],
    availability: '평일 오후',
    phone: '010-2345-6789',
    email: 'chef@example.com',
    contentIdeas: [
      '5분 완성 간단 요리',
      '명절 음식 쉽게 만들기',
      '1인 가구 밀키트 만들기',
      '손님 초대 요리 레시피'
    ],
    pastWorks: [
      { title: '한식 마스터 클래스', channel: '요리왕', views: '100만' },
      { title: '초보 요리 시리즈', channel: '집밥연구소', views: '80만' }
    ]
  }
];

export default function GuestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposal, setProposal] = useState({
    contentIdea: '',
    shootingDate: '',
    location: '',
    fee: '',
    message: ''
  });

  const guest = mockGuests.find(g => g.id === params.id) || mockGuests[0];

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    alert('협업 제안이 전송되었습니다!\n게스트가 검토 후 연락드릴 예정입니다.');
    setShowProposalModal(false);
    setProposal({
      contentIdea: '',
      shootingDate: '',
      location: '',
      fee: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-purple-100 rounded-full flex items-center justify-center text-6xl flex-shrink-0">
              {guest.image}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{guest.name}</h1>
                  <p className="text-xl text-orange-600 font-semibold mb-2">{guest.title}</p>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{guest.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{guest.availability} 가능</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold">{guest.rating}</span>
                  <span className="text-gray-500">평점</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-2xl font-bold">{guest.collabCount}회</span>
                  <span className="text-gray-500">협업</span>
                </div>
              </div>

              {/* Fee */}
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-lg mb-6">
                출연료: {guest.fee}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowProposalModal(true)}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                협업 제안하기
              </button>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">소개</h2>
          <p className="text-gray-700 leading-relaxed">{guest.bio}</p>
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">전문 분야</h2>
          <div className="flex flex-wrap gap-3">
            {guest.expertise.map((exp, idx) => (
              <span
                key={idx}
                className="px-6 py-3 bg-gradient-to-r from-orange-50 to-purple-50 text-orange-600 rounded-full font-semibold border-2 border-orange-200"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-orange-600" />
            경력 및 자격
          </h2>
          <ul className="space-y-3">
            {guest.portfolio.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Ideas */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">출연 가능 콘텐츠</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {guest.contentIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl border-2 border-orange-100"
              >
                <p className="font-semibold text-gray-900">💡 {idea}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past Works */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">과거 출연 이력</h2>
          <div className="space-y-4">
            {guest.pastWorks.map((work, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{work.title}</h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>📺 {work.channel}</span>
                  <span>👁️ {work.views} 조회</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">협업 제안서</h3>
              <button
                onClick={() => setShowProposalModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-6">
              {/* Content Idea */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  콘텐츠 아이디어 *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="예: 홈트레이닝 30일 챌린지"
                  value={proposal.contentIdea}
                  onChange={(e) => setProposal({ ...proposal, contentIdea: e.target.value })}
                />
              </div>

              {/* Shooting Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  희망 촬영 일정 *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                  value={proposal.shootingDate}
                  onChange={(e) => setProposal({ ...proposal, shootingDate: e.target.value })}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  촬영 장소 *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="예: 서울 강남구 헬스장"
                  value={proposal.location}
                  onChange={(e) => setProposal({ ...proposal, location: e.target.value })}
                />
              </div>

              {/* Fee */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  제안 출연료
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="예: 무료 (채널 홍보 제공) 또는 50만원"
                  value={proposal.fee}
                  onChange={(e) => setProposal({ ...proposal, fee: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  게스트 희망 출연료: {guest.fee}
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상세 메시지 *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="게스트에게 전할 메시지를 작성해주세요.&#10;- 채널 소개&#10;- 콘텐츠 기획 의도&#10;- 촬영 진행 방식&#10;- 기타 문의사항"
                  value={proposal.message}
                  onChange={(e) => setProposal({ ...proposal, message: e.target.value })}
                />
              </div>

              {/* Your Channel Info */}
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-sm text-orange-800">
                  💡 <strong>Tip:</strong> 채널 정보(구독자 수, 평균 조회수 등)를 함께 알려주면 게스트의 응답률이 높아집니다!
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold hover:shadow-xl transition"
                >
                  제안서 전송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
