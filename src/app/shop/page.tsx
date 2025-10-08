"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

type Creator = {
  id: string;
  channelName: string;
  channelHandle: string;
  thumbnailUrl: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  keywords: string[];
  channelUrl: string;
};

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/creators?limit=50')
      .then(res => res.json())
      .then(data => {
        setCreators(data.creators);
        setFilteredCreators(data.creators);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load creators:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = creators;

    if (selectedStyle !== "all") {
      filtered = filtered.filter(c => c.keywords.some(k => k.includes(selectedStyle)));
    }

    if (selectedSize !== "all") {
      filtered = filtered.filter(c => {
        if (selectedSize === "large") return c.subscriberCount >= 1000000;
        if (selectedSize === "medium") return c.subscriberCount >= 100000 && c.subscriberCount < 1000000;
        if (selectedSize === "small") return c.subscriberCount < 100000;
        return true;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCreators(filtered);
  }, [selectedStyle, selectedSize, searchQuery, creators]);

  const formatSubscribers = (count: number) => {
    if (count >= 10000000) return `${(count / 10000000).toFixed(0)}천만`;
    if (count >= 1000000) return `${(count / 10000000).toFixed(1)}천만`;
    if (count >= 10000) return `${(count / 10000).toFixed(0)}만`;
    return count.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-3xl">🎬</span>
              <div>
                <h1 className="font-bold text-xl text-gray-900">CreatorHub</h1>
                <p className="text-xs text-gray-600">크리에이터 디렉토리</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">🔍 크리에이터 찾기</h2>
          <p className="text-orange-100 mb-4">다양한 스타일의 {filteredCreators.length}명의 크리에이터를 만나보세요</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <input
            type="text"
            placeholder="크리에이터 이름 또는 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Style Filter */}
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-2 block">스타일</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="all">전체 스타일</option>
                <option value="ASMR">ASMR</option>
                <option value="먹방">먹방</option>
                <option value="토크">토크</option>
                <option value="리뷰">리뷰</option>
                <option value="요리">요리</option>
              </select>
            </div>

            {/* Size Filter */}
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-2 block">채널 규모</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="all">전체 규모</option>
                <option value="large">대형 (100만+)</option>
                <option value="medium">중형 (10만~100만)</option>
                <option value="small">소형 (~10만)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">크리에이터 로딩 중...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCreators.map((creator) => (
              <Link
                key={creator.id}
                href={`/creator/${creator.id}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={creator.thumbnailUrl}
                    alt={creator.channelName}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* Creator Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                    {creator.channelName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{creator.channelHandle}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm">
                      <span>👥</span>
                      <span className="font-semibold text-gray-900">
                        {formatSubscribers(creator.subscriberCount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span>📹</span>
                      <span className="text-gray-600">{creator.videoCount}개</span>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {creator.keywords.slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {creators.length}+
              </div>
              <div className="text-sm text-gray-600">등록 크리에이터</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                {Math.round(creators.reduce((acc, c) => acc + c.subscriberCount, 0) / 10000000)}천만
              </div>
              <div className="text-sm text-gray-600">총 구독자 수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {creators.reduce((acc, c) => acc + c.videoCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">총 영상 수</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <span className="text-2xl">🎬</span>
              <span className="font-bold">CreatorHub</span>
            </p>
            <p className="text-sm mt-2">크리에이터와 팬을 연결하는 커뮤니티</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
