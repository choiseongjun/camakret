'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Upload, Plus, X, ArrowRight } from 'lucide-react';

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
    name: '',
    title: '',
    category: '',
    location: '',
    phone: '',
    email: '',

    // Step 2: 전문성
    bio: '',
    expertise: [] as string[],
    newExpertise: '',
    portfolio: [] as string[],
    newPortfolio: '',

    // Step 3: 출연 조건
    availability: '',
    fee: '',
    contentIdeas: [] as string[],
    newContentIdea: '',

    // Step 4: 추가 정보
    socialMedia: '',
    website: '',
    pastWorks: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출
    alert('게스트 등록이 완료되었습니다!\n검토 후 승인되면 이메일로 알려드립니다.');
    router.push('/');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    s < step
                      ? 'bg-purple-600 text-white'
                      : s === step
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      s < step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className={step === 1 ? 'font-bold text-purple-600' : ''}>기본 정보</span>
            <span className={step === 2 ? 'font-bold text-purple-600' : ''}>전문성</span>
            <span className={step === 3 ? 'font-bold text-purple-600' : ''}>출연 조건</span>
            <span className={step === 4 ? 'font-bold text-purple-600' : ''}>추가 정보</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Step 1: 기본 정보 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">기본 정보</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-purple-800">
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
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
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2"
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
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
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
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {formData.contentIdeas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-start justify-between border-2 border-purple-100"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="인스타그램, 유튜브 등"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    웹사이트/블로그
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    과거 출연 이력
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                    placeholder="이전에 출연했던 유튜브 채널이나 영상이 있다면 알려주세요."
                    value={formData.pastWorks}
                    onChange={(e) => setFormData({ ...formData, pastWorks: e.target.value })}
                  />
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">🎉 등록 완료 준비!</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      검토 후 24시간 내 승인 결과 이메일 발송
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      승인 즉시 크리에이터들에게 프로필 노출
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
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
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition"
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
