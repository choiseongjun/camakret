'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, ThumbsUp, CheckCircle, XCircle, Clock } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface VenueRecommendation {
  id: number;
  creatorId: string;
  userId: number;
  userName: string;
  userProfileImage: string | null;
  venueName: string;
  venueAddress: string;
  venueCategory: string | null;
  venuePhone: string | null;
  recommendationReason: string | null;
  imageUrl: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'visited';
  creatorComment: string | null;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

const statusLabels = {
  pending: { label: '새 추천', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  approved: { label: '관심 있어요', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: '패스', color: 'bg-gray-100 text-gray-600', icon: XCircle },
  visited: { label: '다녀왔어요', color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
};

export default function CreatorRecommendPage() {
  const params = useParams();
  const router = useRouter();
  const creatorId = params.id as string;

  const [recommendations, setRecommendations] = useState<VenueRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'likes' | 'recent'>('likes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    venueName: '',
    venueAddress: '',
    venueCategory: '',
    venuePhone: '',
    recommendationReason: ''
  });

  useEffect(() => {
    fetchRecommendations();
  }, [creatorId, statusFilter]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      // 가상 데이터 생성
      const mockData: VenueRecommendation[] = [
        {
          id: 1,
          creatorId: creatorId,
          userId: 1,
          userName: '김민수',
          userProfileImage: null,
          venueName: '북한산 백운대 코스',
          venueAddress: '서울특별시 강북구 우이동',
          venueCategory: '등산/아웃도어',
          venuePhone: null,
          recommendationReason: '여기 경치가 진짜 끝내줍니다! 브이로그 찍기 완벽한 곳이에요',
          imageUrl: null,
          status: 'pending',
          creatorComment: null,
          likesCount: 42,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          creatorId: creatorId,
          userId: 2,
          userName: '박지영',
          userProfileImage: null,
          venueName: '코엑스 별마당 도서관',
          venueAddress: '서울특별시 강남구 영동대로 513',
          venueCategory: '문화/예술',
          venuePhone: '02-6002-5300',
          recommendationReason: '인스타 감성 사진 찍기 좋아요! 책 리뷰하시는 분들께 추천드립니다',
          imageUrl: null,
          status: 'approved',
          creatorComment: '좋은 추천 감사합니다! 🙏',
          likesCount: 128,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          creatorId: creatorId,
          userId: 3,
          userName: '이준호',
          userProfileImage: null,
          venueName: '롯데월드 어드벤처',
          venueAddress: '서울특별시 송파구 올림픽로 240',
          venueCategory: '테마파크',
          venuePhone: '1661-2000',
          recommendationReason: '놀이기구 챌린지 콘텐츠 찍으면 재밌을 것 같아요!',
          imageUrl: null,
          status: 'visited',
          creatorComment: '다녀왔습니다! 영상 곧 올라와요 🎬',
          likesCount: 256,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 4,
          creatorId: creatorId,
          userId: 4,
          userName: '최수진',
          userProfileImage: null,
          venueName: 'VR 카페 메타버스',
          venueAddress: '서울특별시 강남구 테헤란로 521',
          venueCategory: '게임/체험',
          venuePhone: '02-4567-8901',
          recommendationReason: '요즘 핫한 VR 게임 체험할 수 있어요! 리액션 영상 대박날 듯',
          imageUrl: null,
          status: 'pending',
          creatorComment: null,
          likesCount: 89,
          createdAt: new Date(Date.now() - 43200000).toISOString(),
          updatedAt: new Date(Date.now() - 43200000).toISOString()
        },
        {
          id: 5,
          creatorId: creatorId,
          userId: 5,
          userName: '정태원',
          userProfileImage: null,
          venueName: '국립중앙박물관',
          venueAddress: '서울특별시 용산구 서빙고로 137',
          venueCategory: '문화/예술',
          venuePhone: '02-2077-9000',
          recommendationReason: '역사 콘텐츠 만드시는 분들께 추천! 전시가 정말 좋아요',
          imageUrl: null,
          status: 'approved',
          creatorComment: '꼭 가보겠습니다!',
          likesCount: 175,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 6,
          creatorId: creatorId,
          userId: 6,
          userName: '강혜진',
          userProfileImage: null,
          venueName: '서울숲',
          venueAddress: '서울특별시 성동구 뚝섬로 273',
          venueCategory: '공원/자연',
          venuePhone: '02-460-2905',
          recommendationReason: '피크닉 브이로그 찍기 딱이에요! 가을 단풍 정말 예쁩니다',
          imageUrl: null,
          status: 'visited',
          creatorComment: '영상 업로드 완료했어요! 감사합니다 ✨',
          likesCount: 312,
          createdAt: new Date(Date.now() - 345600000).toISOString(),
          updatedAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 7,
          creatorId: creatorId,
          userId: 7,
          userName: '윤서준',
          userProfileImage: null,
          venueName: '스트릿 댄스 스튜디오',
          venueAddress: '서울특별시 마포구 홍익로 52',
          venueCategory: '댄스/운동',
          venuePhone: '02-7890-1234',
          recommendationReason: '댄스 챌린지 하기 좋은 곳! 시설도 깔끔하고 조명도 좋아요',
          imageUrl: null,
          status: 'rejected',
          creatorComment: null,
          likesCount: 34,
          createdAt: new Date(Date.now() - 432000000).toISOString(),
          updatedAt: new Date(Date.now() - 345600000).toISOString()
        },
        {
          id: 8,
          creatorId: creatorId,
          userId: 8,
          userName: '한지우',
          userProfileImage: null,
          venueName: '연남동 벽화 거리',
          venueAddress: '서울특별시 마포구 연남동',
          venueCategory: '거리/관광',
          venuePhone: null,
          recommendationReason: '사진 찍기 좋은 예쁜 벽화들이 많아요! 브이로그 배경으로 완벽',
          imageUrl: null,
          status: 'pending',
          creatorComment: null,
          likesCount: 67,
          createdAt: new Date(Date.now() - 21600000).toISOString(),
          updatedAt: new Date(Date.now() - 21600000).toISOString()
        }
      ];

      // 필터 적용
      let filteredData = mockData;
      if (statusFilter !== 'all') {
        filteredData = mockData.filter(item => item.status === statusFilter);
      }

      setRecommendations(filteredData);

      // 실제 API 호출 (에러 무시)
      try {
        const statusParam = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
        const response = await fetch(`${API_BASE_URL}/api/creators/${creatorId}/venue-recommendations${statusParam}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setRecommendations(data.data);
        }
      } catch (error) {
        // API 실패시 가상 데이터 사용
        console.log('API 데이터를 가져올 수 없어 가상 데이터를 사용합니다.');
      }
    } catch (error) {
      console.error('맛집 추천 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (recommendationId: number, newStatus: string, comment?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/venue-recommendations/${recommendationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, creatorComment: comment })
      });

      const data = await response.json();

      if (data.success) {
        fetchRecommendations(); // 목록 새로고침
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const handleLike = async (recommendationId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/venue-recommendations/${recommendationId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1 }) // TODO: 실제 로그인 유저 ID
      });

      const data = await response.json();

      if (data.success) {
        fetchRecommendations(); // 목록 새로고침
      }
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로가기
          </button>

          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 text-white mb-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-4xl">
                  💡
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-3">
                    콘텐츠 추천
                  </h1>
                  <p className="text-white/90 text-lg mb-4">
                    구독자들이 추천하는 콘텐츠 아이디어를 확인하고 다음 영상을 계획해보세요!
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <span className="text-2xl">💡</span>
                      <span>총 <strong>{recommendations.length}개</strong> 추천</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <span className="text-2xl">🔥</span>
                      <span><strong>{recommendations.filter(r => r.likesCount > 100).length}개</strong> 인기 추천</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                      <span className="text-2xl">✅</span>
                      <span><strong>{recommendations.filter(r => r.status === 'visited').length}개</strong> 완료</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl">✨</span>
                추천하기
              </button>
            </div>
          </div>

          {/* 추천 가이드 */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="font-bold text-gray-900 mb-1">팬들의 리얼 추천</h3>
              <p className="text-sm text-gray-600">실제 경험을 바탕으로 한 생생한 콘텐츠 아이디어</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-bold text-gray-900 mb-1">콘텐츠 아이디어</h3>
              <p className="text-sm text-gray-600">다음 영상 아이디어를 팬들에게서 얻어보세요</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-bold text-gray-900 mb-1">팬들과 소통</h3>
              <p className="text-sm text-gray-600">관심 표시하고 댓글로 감사 인사를 전해보세요</p>
            </div>
          </div>
        </div>

        {/* 검색 & 정렬 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 검색바 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="추천 제목이나 장소로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* 정렬 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('likes')}
                className={`px-6 py-3 rounded-xl font-medium transition ${
                  sortBy === 'likes'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭐ 인기순
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-6 py-3 rounded-xl font-medium transition ${
                  sortBy === 'recent'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🕐 최신순
              </button>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'pending', 'approved', 'visited', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm ${
                statusFilter === status
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              {status === 'all' ? '🍽️ 전체' : `${statusLabels[status as keyof typeof statusLabels].label}`}
            </button>
          ))}
        </div>

        {/* 추천 목록 */}
        {(() => {
          // 검색 필터링
          let filteredRecs = recommendations.filter(rec =>
            rec.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rec.venueAddress.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // 정렬
          if (sortBy === 'likes') {
            filteredRecs.sort((a, b) => b.likesCount - a.likesCount);
          } else {
            filteredRecs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }

          return filteredRecs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-gray-500 text-lg">아직 추천된 맛집이 없습니다.</p>
            <p className="text-gray-400 mt-2">팬들이 맛집을 추천하면 여기에 표시됩니다!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecs.map((rec) => {
              const StatusIcon = statusLabels[rec.status].icon;

              return (
                <div key={rec.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-orange-200">
                  {/* 상태 배지 */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusLabels[rec.status].color} shadow-sm`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusLabels[rec.status].label}
                    </span>
                    <button
                      onClick={() => handleLike(rec.id)}
                      className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition px-3 py-1.5 hover:bg-orange-50 rounded-full"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">{rec.likesCount}</span>
                    </button>
                  </div>

                  {/* 맛집 정보 */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                      🍽️
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{rec.venueName}</h3>
                      {rec.venueCategory && (
                        <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          {rec.venueCategory}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{rec.venueAddress}</span>
                    </div>
                    {rec.venuePhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{rec.venuePhone}</span>
                      </div>
                    )}
                  </div>

                  {/* 추천 이유 */}
                  {rec.recommendationReason && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        <span className="text-orange-500 font-semibold">💭 "{rec.recommendationReason}"</span>
                      </p>
                    </div>
                  )}

                  {/* 추천인 정보 */}
                  <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {rec.userName[0]}
                    </div>
                    <span className="font-medium">{rec.userName}님의 추천</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{new Date(rec.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
                  </div>

                  {/* 크리에이터 댓글 */}
                  {rec.creatorComment && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💬</span>
                        <p className="text-sm text-blue-900 font-medium">{rec.creatorComment}</p>
                      </div>
                    </div>
                  )}

                  {/* 액션 버튼 (pending 상태일 때만) */}
                  {rec.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(rec.id, 'approved', '좋은 추천 감사합니다! 한 번 가보고 싶네요 😊')}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:scale-105"
                      >
                        💚 관심 있어요
                      </button>
                      <button
                        onClick={() => handleStatusChange(rec.id, 'rejected')}
                        className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        패스
                      </button>
                    </div>
                  )}

                  {/* 방문완료 버튼 (approved 상태일 때) */}
                  {rec.status === 'approved' && (
                    <button
                      onClick={() => handleStatusChange(rec.id, 'visited', '다녀왔어요! 곧 영상으로 만나요 🎬✨')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:scale-105"
                    >
                      🎬 다녀왔어요!
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
        })()}
      </div>

      {/* 추천 작성 모달 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">✨ 콘텐츠 추천하기</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  추천 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRecommendation.venueName}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, venueName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="예: 북한산 등산 브이로그"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">{newRecommendation.venueName.length}/50</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  장소/위치 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRecommendation.venueAddress}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, venueAddress: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="예: 서울특별시 강북구 북한산"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  value={newRecommendation.venueCategory}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, venueCategory: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">선택하세요</option>
                  <option value="등산/아웃도어">등산/아웃도어</option>
                  <option value="문화/예술">문화/예술</option>
                  <option value="테마파크">테마파크</option>
                  <option value="게임/체험">게임/체험</option>
                  <option value="공원/자연">공원/자연</option>
                  <option value="댄스/운동">댄스/운동</option>
                  <option value="거리/관광">거리/관광</option>
                  <option value="카페/맛집">카페/맛집</option>
                  <option value="쇼핑">쇼핑</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  연락처
                </label>
                <input
                  type="text"
                  value={newRecommendation.venuePhone}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, venuePhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="예: 02-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  추천 이유 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newRecommendation.recommendationReason}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, recommendationReason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder="이 콘텐츠를 추천하는 이유를 자세히 설명해주세요..."
                  maxLength={300}
                />
                <p className="text-xs text-gray-500 mt-1">{newRecommendation.recommendationReason.length}/300</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm text-orange-800">
                  💡 <strong>팁:</strong> 구체적이고 생생한 설명이 크리에이터에게 더 와닿아요!
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  // TODO: API 연동
                  alert('추천이 등록되었습니다!');
                  setShowAddForm(false);
                  setNewRecommendation({
                    venueName: '',
                    venueAddress: '',
                    venueCategory: '',
                    venuePhone: '',
                    recommendationReason: ''
                  });
                }}
                disabled={!newRecommendation.venueName || !newRecommendation.venueAddress || !newRecommendation.recommendationReason}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✨ 추천하기
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
