'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, MessageSquare, User, MapPin, Calendar, DollarSign, Send, Edit2, Trash2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface CreatorRequest {
  id: number;
  title: string;
  description: string;
  channel_name: string;
  channel_url: string;
  channel_subscribers: string;
  category: string;
  guest_type: string;
  content_concept: string;
  shooting_location: string;
  preferred_date: string;
  fee_range: string;
  fee_negotiable: boolean;
  status: string;
  view_count: number;
  application_count: number;
  created_at: string;
  creator_name: string;
  creator_email: string;
  creator_profile_image: string;
  user_id: number;
}

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, login } = useAuth();
  const [request, setRequest] = useState<CreatorRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hasGuestProfile, setHasGuestProfile] = useState(false);
  const [guestProfileChecked, setGuestProfileChecked] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');

  useEffect(() => {
    fetchRequestDetail();
  }, [params.id]);

  useEffect(() => {
    if (user) {
      checkGuestProfile();
    }
  }, [user]);

  const fetchRequestDetail = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/api/requests/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setRequest(result.data);
      }
    } catch (error) {
      console.error('요청글 조회 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkGuestProfile = async () => {
    try {
      const response = await apiFetch('/api/guests/my-profile');
      const result = await response.json();

      if (result.success && result.data) {
        setHasGuestProfile(true);
      } else {
        setHasGuestProfile(false);
      }
    } catch (error) {
      console.error('게스트 프로필 확인 에러:', error);
      setHasGuestProfile(false);
    } finally {
      setGuestProfileChecked(true);
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

  const handleApplyClick = () => {
    if (!user) {
      login();
      return;
    }

    // 게스트 프로필이 있으면 지원 모달 표시, 없으면 등록 안내
    if (hasGuestProfile) {
      setShowApplyModal(true);
    } else {
      alert('게스트 프로필이 필요합니다. 게스트 프로필을 먼저 등록해주세요.');
      router.push('/register-guest');
    }
  };

  const handleSubmitApplication = async (message: string) => {
    try {
      const response = await apiFetch(`/api/requests/${params.id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (result.success) {
        alert('지원이 완료되었습니다!');
        setShowApplyModal(false);
        fetchRequestDetail(); // 지원자 수 업데이트
      } else {
        alert(result.message || '지원 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('지원 에러:', error);
      alert('지원 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiFetch(`/api/requests/${params.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        alert('요청글이 삭제되었습니다.');
        router.push('/requests');
      } else {
        alert(result.message || '삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('삭제 에러:', error);
      alert('삭제 중 오류가 발생했습니다.');
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

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-gray-500 mb-4">요청글을 찾을 수 없습니다</p>
          <Link
            href="/requests"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/requests"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
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
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{request.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{request.view_count} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{request.application_count} 지원</span>
                </div>
                <span>•</span>
                <span>{formatDate(request.created_at)}</span>
              </div>
            </div>

            {/* Edit & Delete Buttons (Only for author) */}
            {user && user.id === request.user_id && (
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/requests/${request.id}/edit`}
                  className="p-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition"
                  title="수정"
                >
                  <Edit2 className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                  title="삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Creator Info */}
          <div className="bg-purple-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <User className="w-10 h-10 text-purple-600" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{request.channel_name}</h3>
                {request.channel_subscribers && (
                  <p className="text-sm text-gray-600">구독자 {request.channel_subscribers}</p>
                )}
              </div>
            </div>
            {request.channel_url && (
              <a
                href={request.channel_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                채널 방문하기 →
              </a>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">상세 설명</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {request.description}
            </p>
          </div>

          {/* Guest Type */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">원하는 게스트</h2>
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-lg font-semibold text-pink-700">🎯 {request.guest_type}</p>
            </div>
          </div>

          {/* Content Concept */}
          {request.content_concept && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">콘텐츠 기획</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {request.content_concept}
              </p>
            </div>
          )}

          {/* Shooting Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {request.shooting_location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">촬영 장소</p>
                  <p className="font-semibold text-gray-900">{request.shooting_location}</p>
                </div>
              </div>
            )}
            {request.preferred_date && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">희망 일정</p>
                  <p className="font-semibold text-gray-900">{request.preferred_date}</p>
                </div>
              </div>
            )}
          </div>

          {/* Fee */}
          {request.fee_range && (
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">출연료</p>
                  <p className="font-semibold text-gray-900">
                    {request.fee_range}
                    {request.fee_negotiable && (
                      <span className="text-sm text-purple-600 ml-2">(협의 가능)</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Apply Button */}
          {request.status === 'open' && user && user.id !== request.user_id && (
            <button
              onClick={handleApplyClick}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              지원하기
            </button>
          )}

          {!user && request.status === 'open' && (
            <button
              onClick={login}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition"
            >
              로그인하고 지원하기
            </button>
          )}

          {request.status !== 'open' && (
            <div className="text-center py-4 bg-gray-100 rounded-xl">
              <p className="text-gray-600 font-semibold">모집이 마감된 요청글입니다</p>
            </div>
          )}
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">지원하기</h3>
            <p className="text-gray-600 mb-4">
              크리에이터에게 전달할 메시지를 작성해주세요.
            </p>
            <textarea
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              placeholder="자기소개, 협업 경험, 콘텐츠 아이디어 등을 자유롭게 작성해주세요."
              className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none mb-4 resize-none"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setApplicationMessage('');
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={() => handleSubmitApplication(applicationMessage)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition"
              >
                지원하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">요청글 삭제</h3>
            <p className="text-gray-600 mb-6">
              정말로 이 요청글을 삭제하시겠습니까?
              <br />
              삭제된 요청글은 복구할 수 없습니다.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleDelete();
                }}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
