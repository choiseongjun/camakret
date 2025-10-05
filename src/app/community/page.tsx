"use client";

import Link from "next/link";
import { useState } from "react";

type PostType = "all" | "premium" | "vip" | "public";

export default function Community() {
  const [activeFilter, setActiveFilter] = useState<PostType>("all");

  const posts = [
    {
      id: 1,
      author: "김크리에이터",
      authorBadge: "💎 VIP",
      tier: "vip",
      timestamp: "5분 전",
      content: "VIP 멤버님들만을 위한 특별 공지! 🎉\n\n다음 주 신상품 론칭 전에 VIP 회원님들께 먼저 공개합니다. 50% 얼리버드 할인 + 한정 굿즈 증정 예정이에요!\n\n어떤 상품일지 힌트: 💄✨",
      image: null,
      likes: 234,
      comments: 45,
      isPinned: true
    },
    {
      id: 2,
      author: "김크리에이터",
      authorBadge: "💜 프리미엄",
      tier: "premium",
      timestamp: "1시간 전",
      content: "프리미엄 회원님들께 질문드립니다! 📊\n\n다음 영상 주제로 뭘 원하시나요?\n1️⃣ 고급 메이크업 테크닉\n2️⃣ 스킨케어 루틴 완벽 가이드\n3️⃣ 뷰티 브이로그 촬영 노하우\n\n댓글로 투표해주세요!",
      image: null,
      likes: 156,
      comments: 89,
      isPinned: false,
      poll: {
        options: [
          { text: "고급 메이크업 테크닉", votes: 45, percentage: 51 },
          { text: "스킨케어 루틴 완벽 가이드", votes: 32, percentage: 36 },
          { text: "뷰티 브이로그 촬영 노하우", votes: 12, percentage: 13 }
        ],
        totalVotes: 89,
        endsIn: "2일 남음"
      }
    },
    {
      id: 3,
      author: "민지",
      authorBadge: "⭐ 슈퍼팬 Lv.5",
      tier: "public",
      timestamp: "3시간 전",
      content: "어제 구매한 '뷰티 루틴 가이드' 진짜 대박이에요! 😍\n\n120페이지인데 3시간 만에 다 읽었어요. 특히 피부 타입별 관리법이 너무 유용했습니다. 이미 실천 중이고 효과 보고 있어요!\n\n#구매인증 #강추",
      image: "https://via.placeholder.com/400x300",
      likes: 89,
      comments: 23,
      isPinned: false,
      verified: true
    },
    {
      id: 4,
      author: "김크리에이터",
      authorBadge: null,
      tier: "public",
      timestamp: "어제",
      content: "안녕하세요 여러분! 👋\n\n오늘 새로운 유튜브 영상 올라왔어요. 이번엔 가을 메이크업 룩 3가지를 준비했습니다.\n\n멤버십 회원분들은 확장판(+30분)을 커뮤니티에서 먼저 보실 수 있어요!",
      image: null,
      likes: 456,
      comments: 78,
      isPinned: false
    }
  ];

  const filteredPosts = posts.filter(post => 
    activeFilter === "all" || post.tier === activeFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-lg">
                👩‍🎨
              </div>
              <div>
                <div className="font-bold text-gray-900">크리에이터 커뮤니티</div>
                <div className="text-xs text-gray-600">팬들과 함께하는 공간</div>
              </div>
            </Link>
            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full hover:bg-emerald-100 transition">
              <span className="text-sm font-semibold text-emerald-600">내 프로필</span>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                M
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-purple-100">전체 멤버</div>
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-purple-100">💎 VIP</div>
            </div>
            <div>
              <div className="text-2xl font-bold">423</div>
              <div className="text-sm text-purple-100">💜 프리미엄</div>
            </div>
            <div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-purple-100">새 게시물</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-2 mb-6 border border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              전체 피드
            </button>
            <button
              onClick={() => setActiveFilter("vip")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "vip"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              💎 VIP 전용
            </button>
            <button
              onClick={() => setActiveFilter("premium")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "premium"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              💜 프리미엄
            </button>
            <button
              onClick={() => setActiveFilter("public")}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                activeFilter === "public"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🌐 공개
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className={`bg-white rounded-2xl border-2 ${
              post.tier === "vip" ? "border-yellow-400" :
              post.tier === "premium" ? "border-purple-400" :
              "border-gray-200"
            } overflow-hidden hover:shadow-lg transition`}>
              {/* Tier Badge */}
              {post.tier !== "public" && (
                <div className={`px-4 py-2 text-sm font-semibold ${
                  post.tier === "vip" ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900" :
                  "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}>
                  {post.tier === "vip" ? "💎 VIP 회원 전용" : "💜 프리미엄 회원 전용"}
                </div>
              )}

              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{post.author}</span>
                        {post.authorBadge && (
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-semibold">
                            {post.authorBadge}
                          </span>
                        )}
                        {post.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                            ✓ 구매인증
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{post.timestamp}</div>
                    </div>
                  </div>
                  {post.isPinned && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full font-semibold">
                      📌 공지
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-gray-900 whitespace-pre-line mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Poll */}
                {post.poll && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="space-y-3">
                      {post.poll.options.map((option, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-900">{option.text}</span>
                            <span className="text-sm text-gray-600">{option.votes}표 ({option.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                              style={{ width: `${option.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-3 flex items-center justify-between">
                      <span>총 {post.poll.totalVotes}명 참여</span>
                      <span>{post.poll.endsIn}</span>
                    </div>
                  </div>
                )}

                {/* Image */}
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="" className="w-full" />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                    <span className="text-xl">❤️</span>
                    <span className="font-semibold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                    <span className="text-xl">💬</span>
                    <span className="font-semibold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                    <span className="text-xl">🔗</span>
                    <span className="font-semibold">공유</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        {activeFilter !== "all" && filteredPosts.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {activeFilter === "vip" ? "VIP 멤버십" : "프리미엄 멤버십"} 전용 콘텐츠
            </h3>
            <p className="text-gray-600 mb-6">
              이 섹션의 게시물을 보려면 멤버십 업그레이드가 필요합니다
            </p>
            <Link href="/membership" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transition">
              멤버십 업그레이드
            </Link>
          </div>
        )}
      </div>

      {/* Floating Write Button */}
      <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition flex items-center justify-center text-2xl">
        ✏️
      </button>
    </div>
  );
}
