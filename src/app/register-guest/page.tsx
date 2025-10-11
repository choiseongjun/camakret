'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Upload, Plus, X, ArrowRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';

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

const locations = [
  '서울 강남',
  '서울 강북',
  '서울 마포',
  '서울 서초',
  '서울 종로',
  '서울 용산',
  '서울 성동',
  '서울 송파',
  '경기 수원',
  '경기 성남',
  '부산',
  '대구',
  '인천',
  '기타'
];

const availabilityOptions = [
  '평일 오전',
  '평일 오후',
  '평일 저녁',
  '주말',
  '협의 가능',
  '수시 가능'
];

export default function RegisterGuestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: 기본 정보
    name: '홍길동',
    title: 'IT 전문가',
    category: '전문직',
    location: '서울 강남',
    phone: '010-1234-5678',
    email: 'test@example.com',
    profileImage: null as File | null,

    // Step 2: 전문성
    bio: '10년차 IT 전문가입니다. 다양한 프로젝트 경험을 가지고 있습니다.',
    expertise: ['웹 개발', '서버 관리'] as string[],
    newExpertise: '',
    portfolio: ['A 프로젝트 참여', 'B 서비스 개발'] as string[],
    newPortfolio: '',

    // Step 3: 출연 조건
    availability: '주말',
    fee: '협의 가능',
    contentIdeas: ['최신 IT 트렌드 소개', '코딩 초보자들을 위한 팁'] as string[],
    newContentIdea: '',

    // Step 4: 추가 정보
    socialMedia: 'https://instagram.com/test',
    website: 'https://example.com',
    pastWorks: 'C 채널 출연'
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddItem = (field: 'expertise' | 'portfolio' | 'contentIdeas', newField: 'newExpertise' | 'newPortfolio' | 'newContentIdea') => {
    const value = formData[newField];
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
        [newField]: ''
      });
    }
  };

  const handleRemoveItem = (field: 'expertise' | 'portfolio' | 'contentIdeas', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 형식 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setFormData({ ...formData, profileImage: file });

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, profileImage: null });
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    // Step 4가 아니면 제출하지 않음
    if (step !== 4) {
      return;
    }

    // 필수 필드 검증
    if (!formData.name || !formData.title || !formData.category || !formData.location ||
        !formData.phone || !formData.email || !formData.bio ||
        formData.expertise.length === 0 || formData.portfolio.length === 0 ||
        !formData.availability || !formData.fee || formData.contentIdeas.length === 0) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    try {
      // 디버깅: 현재 폼 데이터 확인
      console.log('=== Form Data Before Sending ===');
      console.log('formData:', formData);

      // FormData 생성 (이미지 업로드를 위해)
      const formDataToSend = new FormData();

      // 이미지 파일 추가
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      // 나머지 데이터 추가
      // formDataToSend.append('userId', 'null'); // TODO: 로그인 시스템 연동 후 실제 사용자 ID 전달
      formDataToSend.append('name', formData.name);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('expertise', JSON.stringify(formData.expertise));
      formDataToSend.append('portfolio', JSON.stringify(formData.portfolio));
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('fee', formData.fee);
      formDataToSend.append('contentIdeas', JSON.stringify(formData.contentIdeas));
      formDataToSend.append('socialMedia', formData.socialMedia || '');
      formDataToSend.append('website', formData.website || '');
      formDataToSend.append('pastWorks', formData.pastWorks || '');

      // FormData 내용 로깅
      console.log('=== FormData Contents ===');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? 'File: ' + pair[1].name : pair[1]));
      }

      const response = await apiFetch('/api/guests/register', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        alert('게스트 등록이 완료되었습니다!\n검토 후 승인되면 이메일로 알려드립니다.');
        router.push('/');
      } else {
        alert('등록 중 오류가 발생했습니다: ' + result.message);
      }
    } catch (error) {
      console.error('게스트 등록 에러:', error);
      alert('등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.title && formData.category &&
               formData.location && formData.phone && formData.email;
      case 2:
        return formData.bio && formData.expertise.length > 0 && formData.portfolio.length > 0;
      case 3:
        return formData.availability && formData.fee && formData.contentIdeas.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">게스트 등록</h1>
          <p className="text-lg text-gray-600">유튜브 출연 기회를 잡으세요</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    s < step
                      ? 'bg-teal-600 text-white'
                      : s === step
                      ? 'bg-gradient-to-r from-teal-400 to-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      s < step ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm text-gray-600 text-center">
            <span className={`${step === 1 ? 'font-bold text-teal-600' : ''}`}>1. 기본정보</span>
            <span className={`${step === 2 ? 'font-bold text-teal-600' : ''}`}>2. 전문성</span>
            <span className={`${step === 3 ? 'font-bold text-teal-600' : ''}`}>3. 출연조건</span>
            <span className={`${step === 4 ? 'font-bold text-teal-600' : ''}`}>4. 추가정보</span>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Step 1: 기본 정보 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">기본 정보</h2>

                {/* 프로필 이미지 업로드 */}
                <div className="flex flex-col items-center mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    프로필 이미지
                  </label>
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="프로필 미리보기"
                          className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-teal-500 transition bg-gray-50">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-xs text-gray-500 mt-2">이미지 선택</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    JPG, PNG, GIF, WEBP (최대 5MB)
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="김철수"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      직업/타이틀 *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="퍼스널 트레이너"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      카테고리 *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">선택하세요</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      활동 지역 *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    >
                      <option value="">선택하세요</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-green-800">
                    💡 <strong>Tip:</strong> 연락처와 이메일은 제안 수락 시에만 크리에이터에게 공개됩니다.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: 전문성 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">전문성 및 경력</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    자기소개 *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                    placeholder="경력, 전문 분야, 강점 등을 소개해주세요."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    전문 분야 * (최소 1개)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="예: 다이어트, 근력 운동"
                      value={formData.newExpertise}
                      onChange={(e) => setFormData({ ...formData, newExpertise: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem('expertise', 'newExpertise');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('expertise', 'newExpertise')}
                      className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {exp}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('expertise', idx)}
                          className="hover:text-purple-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    경력 및 자격증 * (최소 1개)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="예: 생활스포츠지도사 1급"
                      value={formData.newPortfolio}
                      onChange={(e) => setFormData({ ...formData, newPortfolio: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem('portfolio', 'newPortfolio');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('portfolio', 'newPortfolio')}
                      className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.portfolio.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <span className="text-gray-700">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('portfolio', idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 출연 조건 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">출연 조건</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    촬영 가능 시간 *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="">선택하세요</option>
                    {availabilityOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    희망 출연료 *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="예: 무료 (홍보 목적), 협의 가능, 50만원"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 무료 출연 시 제안을 더 많이 받을 수 있습니다
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    출연 가능한 콘텐츠 아이디어 * (최소 1개)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      placeholder="예: 30일 홈트 챌린지"
                      value={formData.newContentIdea}
                      onChange={(e) => setFormData({ ...formData, newContentIdea: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem('contentIdeas', 'newContentIdea');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('contentIdeas', 'newContentIdea')}
                      className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {formData.contentIdeas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-start justify-between border-2 border-green-100"
                      >
                        <div className="flex items-start gap-2 flex-1">
                          <span className="text-lg">💡</span>
                          <span className="text-gray-700 font-medium">{idea}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('contentIdeas', idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 추가 정보 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">추가 정보 (선택)</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SNS 계정
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="인스타그램, 유튜브 등"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    웹사이트/블로그
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    과거 출연 이력
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                    placeholder="이전에 출연했던 유튜브 채널이나 영상이 있다면 알려주세요."
                    value={formData.pastWorks}
                    onChange={(e) => setFormData({ ...formData, pastWorks: e.target.value })}
                  />
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">🎉 등록 완료 준비!</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      검토 후 24시간 내 승인 결과 이메일 발송
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      승인 즉시 크리에이터들에게 프로필 노출
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      제안 받으면 이메일로 알림
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition"
                >
                  이전
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceedToNextStep()}
                  className={`flex-1 px-6 py-3 rounded-full font-bold transition flex items-center justify-center gap-2 ${
                    canProceedToNextStep()
                      ? 'bg-gradient-to-r from-teal-400 to-green-500 text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white rounded-full font-bold hover:shadow-xl transition"
                >
                  등록 완료
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
