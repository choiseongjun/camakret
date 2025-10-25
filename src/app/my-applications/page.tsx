'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Application {
  id: number;
  request_id: number;
  message: string;
  status: string;
  created_at: string;
  request_title: string;
  request_category: string;
  request_status: string;
  channel_name: string;
  creator_name: string;
  creator_email: string;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      login();
      return;
    }
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/api/requests/my/applications');
      const result = await response.json();

      if (result.success) {
        setApplications(result.data);
      }
    } catch (error) {
      console.error('지원 목록 조회 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            수락됨
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            거절됨
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            대기 중
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            요청글 목록으로
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">내가 지원한 요청</h1>
          <p className="text-lg text-gray-600">
            총 {applications.length}개의 지원 내역
          </p>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">아직 지원한 요청이 없습니다</h2>
            <p className="text-gray-600 mb-6">
              크리에이터들의 협업 요청에 지원해보세요!
            </p>
            <Link
              href="/requests"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition"
            >
              요청글 둘러보기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition border border-gray-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {application.request_category}
                      </span>
                      {getStatusBadge(application.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        application.request_status === 'open'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {application.request_status === 'open' ? '모집 중' : '마감'}
                      </span>
                    </div>
                    <Link
                      href={`/requests/${application.request_id}`}
                      className="text-xl font-bold text-gray-900 hover:text-purple-600 transition"
                    >
                      {application.request_title}
                    </Link>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{application.channel_name}</p>
                    {application.creator_name && (
                      <p className="text-sm text-gray-600">{application.creator_name}</p>
                    )}
                  </div>
                </div>

                {/* Application Message */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">지원 메시지</p>
                  <p className="text-gray-800 whitespace-pre-line bg-gray-50 rounded-xl p-4">
                    {application.message || '메시지 없음'}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>지원일: {formatDate(application.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
