'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, DollarSign, Mail, Phone, CheckCircle, XCircle, Clock, Youtube, User } from 'lucide-react';

// 임시 데이터 (dashboard와 동일)
const mockProposals = [
  {
    id: '1',
    creatorName: '핏블리TV',
    creatorChannel: 'https://youtube.com/@fitbly',
    subscribers: '15만',
    avgViews: '8만',
    contentIdea: '30일 홈트레이닝 챌린지',
    shootingDate: '2025-11-15',
    location: '서울 강남구 헬스장',
    fee: '무료 (채널 홍보 제공)',
    message: '안녕하세요! 구독자 15만의 피트니스 채널을 운영하고 있습니다.\n\n30일 홈트레이닝 챌린지 시리즈를 기획 중인데, 전문 트레이너의 시연과 설명이 필요합니다.\n\n【제공 사항】\n- 영상 설명란에 게스트 소개 및 연락처 명시\n- 영상 내 자막으로 게스트 정보 노출\n- 채널 커뮤니티에 게스트 홍보 게시물 업로드\n\n평균 조회수 8만회 이상이며, 많은 분들께 전문성을 알릴 수 있는 기회가 될 것 같습니다.\n\n감사합니다!',
    status: 'pending',
    createdAt: '2025-11-01',
    creatorEmail: 'fitbly@example.com',
    creatorPhone: '010-1111-2222',
    creatorBio: '피트니스와 건강한 라이프스타일을 다루는 채널입니다. 홈트레이닝, 다이어트, 영양 관련 콘텐츠를 주로 제작합니다.'
  },
  {
    id: '2',
    creatorName: '건강한일상',
    creatorChannel: 'https://youtube.com/@healthylife',
    subscribers: '8만',
    avgViews: '5만',
    contentIdea: '다이어트 식단 + 운동 조합',
    shootingDate: '2025-11-20',
    location: '서울 마포구 스튜디오',
    fee: '30만원',
    message: '다이어트 콘텐츠를 전문으로 하는 채널입니다.\n\n식단 관리와 함께 효과적인 운동 루틴을 소개하는 시리즈를 기획 중이며, 운동 파트에 전문가 출연이 필요합니다.\n\n【촬영 계획】\n- 소요 시간: 약 3-4시간\n- 촬영 내용: 다이어트 운동 루틴 5가지 시연 및 설명\n- 편집 후 20분 분량 예상\n\n평균 조회수 5만회, 출연료 30만원 제안드립니다.\n\n검토 부탁드립니다.',
    status: 'accepted',
    createdAt: '2025-10-28',
    creatorEmail: 'healthy@example.com',
    creatorPhone: '010-3333-4444',
    creatorBio: '건강한 다이어트와 생활 습관 개선을 주제로 콘텐츠를 만듭니다.'
  },
  {
    id: '3',
    creatorName: '초보트레이너TV',
    creatorChannel: 'https://youtube.com/@beginnertrainer',
    subscribers: '3만',
    avgViews: '1.5만',
    contentIdea: '헬스장 이용 가이드',
    shootingDate: '2025-11-10',
    location: '서울 강남구 피트니스센터',
    fee: '무료',
    message: '초보 트레이너들을 위한 교육 콘텐츠를 만들고 있습니다.\n\n선배 트레이너로서 조언과 노하우를 공유해주시면 감사하겠습니다.\n\n작은 채널이지만 열심히 성장하고 있습니다.',
    status: 'rejected',
    createdAt: '2025-10-25',
    creatorEmail: 'beginner@example.com',
    creatorPhone: '010-5555-6666',
    creatorBio: '신입 트레이너들을 위한 실용적인 정보와 팁을 공유합니다.'
  },
  {
    id: '4',
    creatorName: '운동왕TV',
    creatorChannel: 'https://youtube.com/@exerciseking',
    subscribers: '25만',
    avgViews: '15만',
    contentIdea: '체형 교정 운동 시리즈',
    shootingDate: '2025-11-25',
    location: '서울 서초구 트레이닝센터',
    fee: '50만원',
    message: '체형 교정 관련 10부작 시리즈를 기획 중입니다.\n\n【시리즈 구성】\n- 총 10회 분량\n- 각 회당 15-20분\n- 부위별 체형 교정 운동 소개\n\n전문가 출연료 50만원(회당 5만원)과 채널 홍보를 제공합니다.\n평균 조회수 15만회로 높은 홍보 효과를 기대할 수 있습니다.\n\n장기 협업 가능하신 분을 찾고 있습니다.',
    status: 'pending',
    createdAt: '2025-11-03',
    creatorEmail: 'king@example.com',
    creatorPhone: '010-7777-8888',
    creatorBio: '운동 전문 채널로 다양한 운동법과 건강 정보를 제공합니다.'
  }
];

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  accepted: { label: '수락됨', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  rejected: { label: '거절됨', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle }
};

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const proposal = mockProposals.find(p => p.id === params.id) || mockProposals[0];
  const StatusIcon = statusConfig[proposal.status as keyof typeof statusConfig].icon;

  const handleAccept = () => {
    alert('제안을 수락했습니다!\n크리에이터의 연락처가 공개되었습니다.');
    setShowAcceptModal(false);
    router.push('/guest/dashboard');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('거절 사유를 입력해주세요.');
      return;
    }
    alert('제안을 거절했습니다.\n크리에이터에게 알림이 전송됩니다.');
    setShowRejectModal(false);
    router.push('/guest/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로 돌아가기
        </button>

        {/* Status Badge */}
        <div className="flex items-center justify-center mb-6">
          <span className={`px-6 py-3 rounded-full text-lg font-bold flex items-center gap-2 border-2 ${statusConfig[proposal.status as keyof typeof statusConfig].color}`}>
            <StatusIcon className="w-6 h-6" />
            {statusConfig[proposal.status as keyof typeof statusConfig].label}
          </span>
        </div>

        {/* Creator Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
              🎥
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{proposal.creatorName}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>구독자 {proposal.subscribers}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  <span>평균 조회수 {proposal.avgViews}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{proposal.creatorBio}</p>
              <a
                href={proposal.creatorChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition text-sm"
              >
                <Youtube className="w-4 h-4" />
                채널 방문하기
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 mb-1">제안 일시</p>
            <p className="text-gray-900 font-semibold">{proposal.createdAt}</p>
          </div>
        </div>

        {/* Proposal Details */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">제안 상세</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">📹 콘텐츠 아이디어</h3>
              <p className="text-xl font-bold text-gray-900">{proposal.contentIdea}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  촬영 일정
                </h3>
                <p className="text-lg font-semibold text-gray-900">{proposal.shootingDate}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  촬영 장소
                </h3>
                <p className="text-lg font-semibold text-gray-900">{proposal.location}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  제안 출연료
                </h3>
                <p className="text-lg font-semibold text-green-600">{proposal.fee}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">💬 상세 메시지</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{proposal.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info (if accepted) */}
        {proposal.status === 'accepted' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl mb-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              크리에이터 연락처
            </h2>
            <p className="text-gray-600 mb-4">제안을 수락하셨습니다. 아래 연락처로 크리에이터와 직접 소통하세요.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">이메일</span>
                </div>
                <a
                  href={`mailto:${proposal.creatorEmail}`}
                  className="text-green-700 hover:text-green-800 font-medium"
                >
                  {proposal.creatorEmail}
                </a>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">전화번호</span>
                </div>
                <a
                  href={`tel:${proposal.creatorPhone}`}
                  className="text-green-700 hover:text-green-800 font-medium"
                >
                  {proposal.creatorPhone}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Rejected Info */}
        {proposal.status === 'rejected' && (
          <div className="bg-gray-50 rounded-3xl p-8 shadow-xl mb-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-gray-600" />
              거절된 제안
            </h2>
            <p className="text-gray-600">이 제안은 거절되었습니다.</p>
          </div>
        )}

        {/* Action Buttons */}
        {proposal.status === 'pending' && (
          <div className="flex gap-4">
            <button
              onClick={() => setShowAcceptModal(true)}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-6 h-6" />
              제안 수락하기
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <XCircle className="w-6 h-6" />
              거절하기
            </button>
          </div>
        )}
      </main>

      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              제안을 수락하시겠습니까?
            </h3>
            <p className="text-gray-600 mb-6">
              수락하시면 크리에이터에게 연락처가 공개되며, 크리에이터의 연락처도 확인할 수 있습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold hover:shadow-xl transition"
              >
                수락하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-gray-600" />
              제안을 거절하시겠습니까?
            </h3>
            <p className="text-gray-600 mb-4">
              거절 사유를 작성해주세요. (선택사항)
            </p>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none mb-6"
              placeholder="예: 일정이 맞지 않습니다. / 출연료 조건이 맞지 않습니다."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-full font-bold hover:bg-gray-700 transition"
              >
                거절하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
