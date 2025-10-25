'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, CheckCircle, Clock, XCircle, MessageSquare } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Application {
  id: number;
  request_id: number;
  guest_id: number;
  message: string;
  status: string;
  created_at: string;
  guest_name: string;
  guest_title: string;
  guest_profile_image: string;
  guest_email: string;
  request_title: string;
  request_category: string;
}

interface RequestWithApplications {
  id: number;
  title: string;
  category: string;
  status: string;
  created_at: string;
  applications: Application[];
}

export default function ReceivedApplicationsPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [requests, setRequests] = useState<RequestWithApplications[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      login();
      return;
    }
    fetchMyRequests();
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/api/requests/my/requests');
      const result = await response.json();

      if (result.success) {
        // 각 요청글의 상세 정보(지원자 포함)를 가져오기
        const requestsWithApps = await Promise.all(
          result.data.map(async (req: any) => {
            const detailResponse = await apiFetch(`/api/requests/${req.id}`);
            const detailResult = await detailResponse.json();
            return {
              id: req.id,
              title: req.title,
              category: req.category,
              status: req.status,
              created_at: req.created_at,
              applications: detailResult.data?.applications || []
            };
          })
        );
        setRequests(requestsWithApps);
      }
    } catch (error) {
      console.error('요청글 목록 조회 에러:', error);
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
            검토 중
          </span>
        );
    }
  };

  const totalApplications = requests.reduce((sum, req) => sum + req.applications.length, 0);

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            요청글 목록으로
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">내게 온 지원</h1>
          <p className="text-lg text-gray-600">
            총 {totalApplications}개의 지원이 도착했습니다
          </p>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">작성한 요청글이 없습니다</h2>
            <p className="text-gray-600 mb-6">
              협업 요청글을 작성하고 게스트들의 지원을 받아보세요!
            </p>
            <Link
              href="/requests/new"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition"
            >
              요청글 작성하기
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200"
              >
                {/* Request Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {request.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        request.status === 'open'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {request.status === 'open' ? '모집 중' : '마감'}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        <MessageSquare className="w-4 h-4" />
                        {request.applications.length}명 지원
                      </span>
                    </div>
                    <Link
                      href={`/requests/${request.id}`}
                      className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition"
                    >
                      {request.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">
                      게시일: {formatDate(request.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                    className="ml-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition"
                  >
                    {selectedRequest === request.id ? '접기' : '지원자 보기'}
                  </button>
                </div>

                {/* Applications */}
                {selectedRequest === request.id && (
                  <div className="space-y-4">
                    {request.applications.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">아직 지원자가 없습니다</p>
                      </div>
                    ) : (
                      request.applications.map((app) => (
                        <div
                          key={app.id}
                          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
                        >
                          {/* Guest Info */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl">
                                {app.guest_profile_image ? (
                                  <img
                                    src={app.guest_profile_image}
                                    alt={app.guest_name}
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                ) : (
                                  '👤'
                                )}
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">{app.guest_name}</h4>
                                <p className="text-sm text-gray-600">{app.guest_title}</p>
                                <p className="text-sm text-gray-500">{app.guest_email}</p>
                              </div>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>

                          {/* Application Message */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2 font-semibold">지원 메시지</p>
                            <p className="text-gray-800 whitespace-pre-line bg-white rounded-xl p-4">
                              {app.message || '메시지 없음'}
                            </p>
                          </div>

                          {/* Date and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>지원일: {formatDate(app.created_at)}</span>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                href={`/guests/${app.guest_id}`}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                              >
                                프로필 보기
                              </Link>
                              {app.status === 'pending' && (
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                                  수락하기
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
