'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Eye } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  keywords?: string[];
  category?: string;
  statistics: {
    subscribers: number;
    totalViews: number;
    videoCount: number;
  };
  foodCategories: {
    style?: string[];
    foodType?: string[];
    channelSize: string;
  };
  reviewStats?: {
    averageRating: number;
    totalReviews: number;
  };
  links: {
    channel: string;
  };
}

interface CreatorCardProps {
  creator: Creator;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);

  const displayKeywords = isKeywordsExpanded
    ? creator.keywords
    : creator.keywords?.slice(0, 3);
  const hasMoreKeywords = (creator.keywords?.length || 0) > 3;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="flex flex-col items-center text-center flex-grow">
        {/* 프로필 이미지 */}
        <div className="relative mb-3">
          <img
            src={creator.thumbnail}
            alt={creator.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-100"
            onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
          />
          <span className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-bold ${
            creator.foodCategories.channelSize === '대형'
              ? 'bg-red-500 text-white'
              : creator.foodCategories.channelSize === '중형'
              ? 'bg-yellow-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {creator.foodCategories.channelSize}
          </span>
        </div>

        {/* 이름 */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 w-full">{creator.name}</h3>

        {/* 카테고리 */}
        {creator.category && (
          <div className="mb-2">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-semibold">
              📂 {creator.category}
            </span>
          </div>
        )}

        {/* 통계 */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-3 bg-gray-50 px-3 py-2 rounded-lg w-full justify-center">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {formatNumber(creator.statistics.subscribers)}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {formatNumber(creator.statistics.totalViews)}
          </div>
        </div>

        {/* 설명 - 고정 높이 */}
        <div className="h-10 mb-3 w-full">
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
            {creator.description}
          </p>
        </div>

        {/* 키워드 - 최소 높이 보장 */}
        <div className="min-h-[60px] mb-3 w-full">
          {creator.keywords && creator.keywords.length > 0 ? (
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-semibold text-left">🏷️ 키워드</p>
              <div className="flex flex-wrap gap-1 justify-center mb-1">
                {displayKeywords?.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200 hover:border-blue-300 transition"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              {hasMoreKeywords && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsKeywordsExpanded(!isKeywordsExpanded);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold mt-1"
                >
                  {isKeywordsExpanded ? '접기 ▲' : `+${(creator.keywords?.length || 0) - 3}개 더보기 ▼`}
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-400">키워드 없음</div>
          )}
        </div>
      </div>

      {/* 상세보기 버튼 - 하단 고정 */}
      <Link
        href={`/creator/${creator.id}`}
        className="w-full mt-auto px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl text-center text-sm font-semibold hover:shadow-lg hover:from-orange-600 hover:to-red-700 transition-all"
      >
        상세보기
      </Link>
    </div>
  );
}
