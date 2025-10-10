'use client';

import { useState } from 'react';
import { MapPin, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface VenueRecommendFormProps {
  creatorId: string;
  creatorName: string;
  onSuccess?: () => void;
}

export default function VenueRecommendForm({ creatorId, creatorName, onSuccess }: VenueRecommendFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    venueName: '',
    venueAddress: '',
    venueCategory: '',
    venuePhone: '',
    recommendationReason: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    '한식', '중식', '일식', '양식', '분식',
    '카페/디저트', '베이커리', '패스트푸드', '기타'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.venueName || !formData.venueAddress) {
      alert('맛집 이름과 주소는 필수입니다!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/creators/${creatorId}/venue-recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // TODO: 실제 로그인 유저 ID
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('맛집 추천이 완료되었습니다! 🎉');
        setFormData({
          venueName: '',
          venueAddress: '',
          venueCategory: '',
          venuePhone: '',
          recommendationReason: '',
          imageUrl: ''
        });
        setIsOpen(false);
        onSuccess?.();
      } else {
        alert('추천 실패: ' + data.error);
      }
    } catch (error) {
      console.error('맛집 추천 실패:', error);
      alert('추천 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-bold flex items-center gap-2 z-50"
      >
        <MapPin className="w-5 h-5" />
        맛집 추천하기
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🍴 {creatorName}님에게 맛집 추천하기
          </h2>
          <p className="text-gray-600 text-sm">
            다음 촬영에서 꼭 가봤으면 하는 맛집을 추천해주세요!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 맛집 이름 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              맛집 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="예: 할매순대국"
              required
            />
          </div>

          {/* 주소 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              주소 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="예: 서울 강남구 테헤란로 123"
                required
              />
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              음식 종류
            </label>
            <select
              value={formData.venueCategory}
              onChange={(e) => setFormData({ ...formData, venueCategory: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">선택하세요</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              전화번호
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.venuePhone}
                onChange={(e) => setFormData({ ...formData, venuePhone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="예: 02-1234-5678"
              />
            </div>
          </div>

          {/* 추천 이유 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              추천 이유
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.recommendationReason}
                onChange={(e) => setFormData({ ...formData, recommendationReason: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="왜 이 맛집을 추천하시나요? (선택사항)"
              />
            </div>
          </div>

          {/* 이미지 URL (임시) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이미지 URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg (선택사항)"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setFormData({
                  venueName: '',
                  venueAddress: '',
                  venueCategory: '',
                  venuePhone: '',
                  recommendationReason: '',
                  imageUrl: ''
                });
              }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition disabled:opacity-50"
            >
              {loading ? '추천 중...' : '추천하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
