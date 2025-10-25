'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Mail, Phone, CheckCircle, XCircle, Clock, Eye, Filter } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

// 임시 제안 데이터 (API 실패시 fallback)
const mockProposals = [
  {
    id: '1',
    creatorName: '핏블리TV',
    creatorChannel: 'https://youtube.com/@fitbly',
    subscribers: '15만',
    contentIdea: '30일 홈트레이닝 챌린지',
    shootingDate: '2025-11-15',
    location: '서울 강남구 헬스장',
    fee: '무료 (채널 홍보 제공)',
    message: '안녕하세요! 구독자 15만의 피트니스 채널을 운영하고 있습니다. 30일 홈트레이닝 챌린지 시리즈를 기획 중인데, 전문 트레이너의 시연과 설명이 필요합니다. 채널 소개와 연락처를 영상 설명란에 명시하겠습니다.',
    status: 'pending',
    createdAt: '2025-11-01',
    creatorEmail: 'fitbly@example.com',
    creatorPhone: '010-1111-2222'
  },
  {
    id: '2',
    creatorName: '건강한일상',
    creatorChannel: 'https://youtube.com/@healthylife',
    subscribers: '8만',
    contentIdea: '다이어트 식단 + 운동 조합',
    shootingDate: '2025-11-20',
    location: '서울 마포구 스튜디오',
    fee: '30만원',
    message: '다이어트 콘텐츠를 전문으로 하는 채널입니다. 운동 파트에 전문가 출연이 필요합니다. 평균 조회수 5만회, 출연료 30만원 제안드립니다.',
    status: 'accepted',
    createdAt: '2025-10-28',
    creatorEmail: 'healthy@example.com',
    creatorPhone: '010-3333-4444'
  },
  {
    id: '3',
    creatorName: '초보트레이너TV',
    creatorChannel: 'https://youtube.com/@beginnertrainer',
    subscribers: '3만',
    contentIdea: '헬스장 이용 가이드',
    shootingDate: '2025-11-10',
    location: '서울 강남구 피트니스센터',
    fee: '무료',
    message: '초보 트레이너들을 위한 교육 콘텐츠를 만들고 있습니다. 선배 트레이너로서 조언을 부탁드립니다.',
    status: 'rejected',
    createdAt: '2025-10-25',
    creatorEmail: 'beginner@example.com',
    creatorPhone: '010-5555-6666'
  },
  {
    id: '4',
    creatorName: '운동왕TV',
    creatorChannel: 'https://youtube.com/@exerciseking',
    subscribers: '25만',
    contentIdea: '체형 교정 운동 시리즈',
    shootingDate: '2025-11-25',
    location: '서울 서초구 트레이닝센터',
    fee: '50만원',
    message: '체형 교정 관련 10부작 시리즈를 기획 중입니다. 전문가 출연료 50만원과 채널 홍보를 제공합니다. 평균 조회수 15만회입니다.',
    status: 'pending',
    createdAt: '2025-11-03',
    creatorEmail: 'king@example.com',
    creatorPhone: '010-7777-8888'
  }
];

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  accepted: { label: '수락됨', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: '거절됨', color: 'bg-gray-100 text-gray-700', icon: XCircle }
};

export default function GuestDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    // authLoading이 끝날 때까지 기다림
    if (authLoading) return;

    // 로딩 끝났는데 user가 없으면 로그인 페이지로
    if (!user) {
      router.push('/login');
      return;
    }

    fetchProposals();
  }, [user, authLoading]);

  const formatDate = (dateString: string) => {
    if (!dateString) return dateString;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      // 시간이 00:00이면 날짜만 표시
      if (hours === '00' && minutes === '00') {
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      }

      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 ${hours}:${minutes}`;
    } catch (e) {
      return dateString;
    }
  };

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/api/guests/me/proposals?userId=${user?.id}`);
      const result = await response.json();

      if (result.success) {
        // Transform data for UI compatibility
        const transformedData = (result.data || []).map((proposal: any) => ({
          ...proposal,
          guestName: proposal.guest_name || proposal.guestName,
          guestTitle: proposal.guest_title || proposal.guestTitle,
          guestCategory: proposal.guest_category || proposal.guestCategory,
          creatorName: proposal.creator_name || proposal.creatorName,
          creatorEmail: proposal.creator_email || proposal.creatorEmail,
          creatorPhone: proposal.creator_phone || proposal.creatorPhone,
          creatorChannel: proposal.creator_channel || proposal.creatorChannel,
          subscribers: proposal.creator_subscribers || proposal.subscribers,
          contentIdea: proposal.content_idea || proposal.contentIdea,
          shootingDate: formatDate(proposal.shooting_date || proposal.shootingDate),
          createdAt: formatDate(proposal.created_at || proposal.createdAt)
        }));
        setProposals(transformedData);
      } else {
        console.error('Failed to fetch proposals:', result.message);
        setProposals(mockProposals); // Fallback to mock data
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
      setProposals(mockProposals); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const openAcceptModal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setShowAcceptModal(true);
  };

  const closeAcceptModal = () => {
    setShowAcceptModal(false);
    setSelectedProposalId(null);
  };

  const handleAccept = async () => {
    if (!selectedProposalId) return;

    try {
      const response = await apiFetch(`/api/guests/proposals/${selectedProposalId}/accept`, {
        method: 'POST'
      });
      const result = await response.json();

      if (result.success) {
        alert('제안을 수락했습니다!\n크리에이터의 연락처가 공개되었습니다.');
        closeAcceptModal();
        // Refresh proposals
        await fetchProposals();
      } else {
        alert('제안 수락에 실패했습니다: ' + result.message);
      }
    } catch (error) {
      console.error('Error accepting proposal:', error);
      alert('제안 수락 중 오류가 발생했습니다.');
    }
  };

  const openRejectModal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedProposalId(null);
    setRejectReason('');
  };

  const handleReject = async () => {
    if (!selectedProposalId) return;

    try {
      const response = await apiFetch(`/api/guests/proposals/${selectedProposalId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rejectReason: rejectReason })
      });
      const result = await response.json();

      if (result.success) {
        alert('제안을 거절했습니다.');
        closeRejectModal();
        // Refresh proposals
        await fetchProposals();
      } else {
        alert('제안 거절에 실패했습니다: ' + result.message);
      }
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      alert('제안 거절 중 오류가 발생했습니다.');
    }
  };

  const filteredProposals = filterStatus === 'all'
    ? proposals
    : proposals.filter(p => p.status === filterStatus);

  const stats = {
    total: proposals.length,
    pending: proposals.filter(p => p.status === 'pending').length,
    accepted: proposals.filter(p => p.status === 'accepted').length,
    rejected: proposals.filter(p => p.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">내 협업 지원 리스트</h1>
          <Link href="/guest/dashboard/applications"><p className="text-lg text-gray-600">받은 협업 지원을 확인하세요 이동</p></Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">게스트 대시보드</h1>
          <p className="text-lg text-gray-600">받은 협업 제안을 확인하세요</p>
        </div>

        

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">전체 제안</span>
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">대기중</span>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">수락됨</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.accepted}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">거절됨</span>
              <XCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            전체 ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filterStatus === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            대기중 ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('accepted')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filterStatus === 'accepted'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            수락됨 ({stats.accepted})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filterStatus === 'rejected'
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            거절됨 ({stats.rejected})
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((proposal) => {
            const status = proposal.status || 'pending';
            const StatusIcon = statusConfig[status as keyof typeof statusConfig]?.icon || Clock;

            return (
              <div
                key={proposal.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {proposal.guestName && (
                      <div className="mb-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 rounded-full text-sm font-bold">
                          <span className="text-lg">👤</span>
                          <span>{proposal.guestName}</span>
                          {proposal.guestTitle && <span className="text-blue-700">· {proposal.guestTitle}</span>}
                          {proposal.guestCategory && (
                            <span className="ml-1 px-2 py-0.5 bg-blue-200 text-blue-900 rounded-full text-xs">
                              {proposal.guestCategory}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{proposal.creatorName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${statusConfig[status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-700'}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[status as keyof typeof statusConfig]?.label || '알 수 없음'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>구독자 {proposal.subscribers}</span>
                      <span>•</span>
                      <span>{proposal.createdAt} 제안</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">📹 콘텐츠 아이디어</h4>
                    <p className="text-gray-900 font-medium">{proposal.contentIdea}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">촬영 일정:</span>
                      <span className="font-semibold text-gray-900">{proposal.shootingDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">장소:</span>
                      <span className="font-semibold text-gray-900">{proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">출연료:</span>
                      <span className="font-semibold text-green-600">{proposal.fee}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">💬 제안 메시지</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{proposal.message}</p>
                </div>

                {status === 'accepted' && (
                  <div className="bg-green-50 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-green-800 mb-2">📞 크리에이터 연락처</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-600" />
                        <a href={`mailto:${proposal.creatorEmail}`} className="text-green-700 hover:text-green-800 font-medium">
                          {proposal.creatorEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href={`tel:${proposal.creatorPhone}`} className="text-green-700 hover:text-green-800 font-medium">
                          {proposal.creatorPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Link
                    href={`/guest/proposals/${proposal.id}`}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold hover:shadow-xl transition text-center flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    상세 보기
                  </Link>

                  {status === 'pending' && (
                    <>
                      <button
                        onClick={() => openAcceptModal(proposal.id)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-full font-bold hover:shadow-xl transition"
                      >
                        수락하기
                      </button>
                      <button
                        onClick={() => openRejectModal(proposal.id)}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
                      >
                        거절하기
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-500 mb-2">제안이 없습니다</p>
            <p className="text-gray-400">
              {filterStatus === 'all' ? '아직 받은 제안이 없습니다' : `${statusConfig[filterStatus as keyof typeof statusConfig]?.label} 제안이 없습니다`}
            </p>
          </div>
        )}
      </main>

      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              제안을 수락하시겠습니까?
            </h3>
            <p className="text-gray-600 mb-6">
              수락하시면 크리에이터에게 연락처가 공개되며, 크리에이터의 연락처도 확인할 수 있습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeAcceptModal}
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
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
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
                onClick={closeRejectModal}
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
