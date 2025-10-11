'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, DollarSign, Mail, Phone, CheckCircle, XCircle, Clock, Eye, Filter } from 'lucide-react';

// 임시 제안 데이터
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filteredProposals = filterStatus === 'all'
    ? mockProposals
    : mockProposals.filter(p => p.status === filterStatus);

  const stats = {
    total: mockProposals.length,
    pending: mockProposals.filter(p => p.status === 'pending').length,
    accepted: mockProposals.filter(p => p.status === 'accepted').length,
    rejected: mockProposals.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
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
            const StatusIcon = statusConfig[proposal.status as keyof typeof statusConfig].icon;

            return (
              <div
                key={proposal.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{proposal.creatorName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${statusConfig[proposal.status as keyof typeof statusConfig].color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[proposal.status as keyof typeof statusConfig].label}
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

                {proposal.status === 'accepted' && (
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

                  {proposal.status === 'pending' && (
                    <>
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-full font-bold hover:shadow-xl transition">
                        수락하기
                      </button>
                      <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition">
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
    </div>
  );
}
