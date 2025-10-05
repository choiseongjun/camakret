"use client";

import Link from "next/link";

export default function Profile() {
  const userStats = {
    level: 5,
    points: 2450,
    nextLevelPoints: 3000,
    purchases: 12,
    comments: 89,
    likes: 234,
    memberSince: "2023년 5월"
  };

  const badges = [
    { id: 1, icon: "⭐", name: "슈퍼팬", description: "Lv.5 달성", earned: true, rarity: "epic" },
    { id: 2, icon: "💎", name: "VIP", description: "VIP 멤버십 가입", earned: true, rarity: "legendary" },
    { id: 3, icon: "🛍️", name: "쇼핑 마스터", description: "10회 이상 구매", earned: true, rarity: "rare" },
    { id: 4, icon: "💬", name: "활동왕", description: "댓글 50개 이상", earned: true, rarity: "rare" },
    { id: 5, icon: "🎉", name: "얼리버드", description: "초기 멤버", earned: true, rarity: "epic" },
    { id: 6, icon: "❤️", name: "열정팬", description: "100 좋아요", earned: true, rarity: "common" },
    { id: 7, icon: "🏆", name: "챔피언", description: "모든 뱃지 획득", earned: false, rarity: "mythic" },
    { id: 8, icon: "🎯", name: "투표왕", description: "투표 10회 참여", earned: false, rarity: "rare" }
  ];

  const activities = [
    { type: "purchase", item: "뷰티 루틴 가이드", points: 100, date: "2시간 전" },
    { type: "comment", item: "VIP 공지 게시물에 댓글", points: 10, date: "5시간 전" },
    { type: "like", item: "프리미엄 투표에 참여", points: 5, date: "어제" },
    { type: "badge", item: "쇼핑 마스터 뱃지 획득", points: 50, date: "3일 전" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              ← 커뮤니티
            </Link>
            <div className="text-center">
              <div className="font-bold text-gray-900">내 프로필</div>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              ⚙️
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border-4 border-white/40">
                👤
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">민지</h1>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                    ⭐ Lv.{userStats.level} 슈퍼팬
                  </span>
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
                    💎 VIP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Lv.{userStats.level}</span>
              <span>{userStats.points} / {userStats.nextLevelPoints} P</span>
              <span>Lv.{userStats.level + 1}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all"
                style={{ width: `${(userStats.points / userStats.nextLevelPoints) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-emerald-100 mt-2">
              다음 레벨까지 {userStats.nextLevelPoints - userStats.points}P
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.purchases}</div>
              <div className="text-sm text-emerald-100">구매</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.comments}</div>
              <div className="text-sm text-emerald-100">댓글</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.likes}</div>
              <div className="text-sm text-emerald-100">좋아요</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{badges.filter(b => b.earned).length}</div>
              <div className="text-sm text-emerald-100">뱃지</div>
            </div>
          </div>
        </div>

        {/* Membership Info */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 border-2 border-yellow-400">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-2xl">
                💎
              </div>
              <div>
                <div className="font-bold text-gray-900">VIP 멤버십</div>
                <div className="text-sm text-gray-600">다음 결제일: 2024년 4월 5일</div>
              </div>
            </div>
            <Link href="/membership" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition text-sm">
              관리
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">전용 콘텐츠</div>
              <div className="font-bold text-emerald-600">45개</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">할인 혜택</div>
              <div className="font-bold text-green-600">20%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">가입일</div>
              <div className="font-bold text-gray-900">{userStats.memberSince}</div>
            </div>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">뱃지 컬렉션</h2>
            <span className="text-sm text-gray-600">
              {badges.filter(b => b.earned).length} / {badges.length}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center transition ${
                  badge.earned
                    ? badge.rarity === "mythic" ? "bg-gradient-to-br from-red-500 to-purple-600 text-white" :
                      badge.rarity === "legendary" ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900" :
                      badge.rarity === "epic" ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white" :
                      badge.rarity === "rare" ? "bg-gradient-to-br from-blue-400 to-cyan-500 text-white" :
                      "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                    : "bg-gray-100 text-gray-400 grayscale opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs font-bold">{badge.name}</div>
                {!badge.earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-2xl">
                    <span className="text-white text-2xl">🔒</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-semibold text-gray-900 mb-1">다음 뱃지까지</div>
                <div className="text-sm text-gray-600">
                  투표에 3번 더 참여하면 <span className="font-semibold text-emerald-600">"투표왕"</span> 뱃지를 획득합니다!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">최근 활동</h2>
          
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                  activity.type === "purchase" ? "bg-green-100" :
                  activity.type === "comment" ? "bg-blue-100" :
                  activity.type === "like" ? "bg-pink-100" :
                  "bg-purple-100"
                }`}>
                  {activity.type === "purchase" && "🛍️"}
                  {activity.type === "comment" && "💬"}
                  {activity.type === "like" && "❤️"}
                  {activity.type === "badge" && "🏆"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 mb-1">{activity.item}</div>
                  <div className="text-sm text-gray-600">{activity.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">+{activity.points}P</div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/activity" className="block mt-6 text-center py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
            전체 활동 보기
          </Link>
        </div>

        {/* Points Info */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">포인트 적립 방법</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>• 상품 구매</span>
              <span className="font-semibold text-emerald-600">+100P</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• 뱃지 획득</span>
              <span className="font-semibold text-emerald-600">+50P</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• 댓글 작성</span>
              <span className="font-semibold text-emerald-600">+10P</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• 좋아요 & 투표</span>
              <span className="font-semibold text-emerald-600">+5P</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
