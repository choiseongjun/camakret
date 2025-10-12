'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  '운동/건강',
  '요리/음식',
  '전문직',
  '예술/공연',
  '뷰티/패션',
  '교육/강연',
  '게임/e스포츠',
  '여행/모험'
];

export default function CreateRequestPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel_name: '',
    channel_url: '',
    channel_subscribers: '',
    category: categories[0],
    guest_type: '',
    content_concept: '',
    shooting_location: '',
    preferred_date: '',
    fee_range: '',
    fee_negotiable: true
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
          <p className="text-gray-600 mb-8">
            협업 요청글을 작성하려면 로그인이 필요합니다.
          </p>
          <button
            onClick={login}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.guest_type.trim()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const response = await apiFetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('협업 요청글이 등록되었습니다!');
        router.push(`/requests/${result.data.id}`);
      } else {
        alert('등록 중 오류가 발생했습니다: ' + result.message);
      }
    } catch (error) {
      console.error('요청글 등록 에러:', error);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/requests"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">협업 요청글 작성</h1>
          <p className="text-gray-600">
            원하는 게스트를 찾고 있다면 요청글을 작성해보세요
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="예: 다이어트 전문가를 찾습니다"
                value={formData.title}
                onChange={handleChange}
                maxLength={200}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                상세 설명 *
              </label>
              <textarea
                name="description"
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                placeholder="어떤 게스트를 찾고 있는지, 어떤 콘텐츠를 만들고 싶은지 자세히 설명해주세요."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Channel Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  채널명 *
                </label>
                <input
                  type="text"
                  name="channel_name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="채널 이름"
                  value={formData.channel_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  구독자 수
                </label>
                <input
                  type="text"
                  name="channel_subscribers"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="예: 10만명"
                  value={formData.channel_subscribers}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                채널 URL
              </label>
              <input
                type="url"
                name="channel_url"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="https://youtube.com/@yourchannel"
                value={formData.channel_url}
                onChange={handleChange}
              />
            </div>

            {/* Category & Guest Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  카테고리 *
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  원하는 게스트 타입 *
                </label>
                <input
                  type="text"
                  name="guest_type"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="예: 퍼스널 트레이너"
                  value={formData.guest_type}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Content Concept */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                콘텐츠 기획
              </label>
              <textarea
                name="content_concept"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                placeholder="어떤 콘텐츠를 만들 계획인지 설명해주세요"
                value={formData.content_concept}
                onChange={handleChange}
              />
            </div>

            {/* Shooting Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  촬영 장소
                </label>
                <input
                  type="text"
                  name="shooting_location"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="예: 서울 강남구"
                  value={formData.shooting_location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  희망 촬영 일정
                </label>
                <input
                  type="text"
                  name="preferred_date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="예: 12월 중순"
                  value={formData.preferred_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                출연료 범위
              </label>
              <input
                type="text"
                name="fee_range"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="예: 무료 (채널 홍보 제공) 또는 50만원"
                value={formData.fee_range}
                onChange={handleChange}
              />
              <div className="mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="fee_negotiable"
                    checked={formData.fee_negotiable}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">출연료 협의 가능</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/requests"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition text-center"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>처리 중...</>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  등록하기
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
