"use client";

import Link from "next/link";
import { useState } from "react";

export default function EmailMarketing() {
  const [activeTab, setActiveTab] = useState<"subscribers" | "campaigns">("subscribers");

  const subscribers = [
    { email: "user1@email.com", name: "민지", tier: "vip", joined: "2024-01-15", opened: 89, clicked: 34 },
    { email: "user2@email.com", name: "수연", tier: "premium", joined: "2024-02-20", opened: 67, clicked: 23 },
    { email: "user3@email.com", name: "지은", tier: "free", joined: "2024-03-01", opened: 45, clicked: 12 },
    { email: "user4@email.com", name: "혜진", tier: "vip", joined: "2023-12-10", opened: 92, clicked: 41 }
  ];

  const campaigns = [
    {
      id: 1,
      title: "🎉 VIP 회원 전용 신상품 공개!",
      subject: "50% 얼리버드 + 한정 굿즈 🎁",
      sentDate: "2024-03-10",
      recipients: 156,
      opened: 123,
      clicked: 45,
      converted: 12,
      revenue: 456000,
      status: "sent"
    },
    {
      id: 2,
      title: "프리미엄 회원님을 위한 특별 할인",
      subject: "이번 주만! 디지털 상품 전체 20% 할인",
      sentDate: "2024-03-08",
      recipients: 423,
      opened: 298,
      clicked: 89,
      converted: 23,
      revenue: 678000,
      status: "sent"
    },
    {
      id: 3,
      title: "신규 멤버 환영 시리즈 1/3",
      subject: "크리에이터 링크에 오신 것을 환영합니다 💜",
      sentDate: "2024-03-05",
      recipients: 89,
      opened: 78,
      clicked: 34,
      converted: 8,
      revenue: 234000,
      status: "sent"
    },
    {
      id: 4,
      title: "봄맞이 특가 시즌",
      subject: "🌸 봄과 함께 찾아온 특별한 혜택",
      sentDate: "진행 중",
      recipients: 1234,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      status: "scheduled"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">이메일 마케팅</span>
            </Link>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
              + 새 캠페인
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">총 구독자</div>
            <div className="text-3xl font-bold text-gray-900">1,234</div>
            <div className="text-sm text-green-600 mt-1">+45 이번 주</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">평균 오픈율</div>
            <div className="text-3xl font-bold text-emerald-600">67.3%</div>
            <div className="text-sm text-gray-500 mt-1">업계 평균: 23%</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">평균 클릭률</div>
            <div className="text-3xl font-bold text-blue-600">28.4%</div>
            <div className="text-sm text-gray-500 mt-1">업계 평균: 3.2%</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">이메일 매출</div>
            <div className="text-3xl font-bold text-green-600">₩1.3M</div>
            <div className="text-sm text-green-600 mt-1">이번 달</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 mb-6 border border-gray-200 inline-flex">
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "subscribers"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            구독자 관리
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "campaigns"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            캠페인 내역
          </button>
        </div>

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">구독자 목록</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                    필터
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                    내보내기
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">이메일</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">이름</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">등급</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">가입일</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">오픈률</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">클릭률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-900">{sub.email}</td>
                      <td className="py-4 px-6 text-gray-900 font-semibold">{sub.name}</td>
                      <td className="text-center py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.tier === "vip" ? "bg-yellow-100 text-yellow-800" :
                          sub.tier === "premium" ? "bg-emerald-100 text-emerald-800" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {sub.tier === "vip" ? "💎 VIP" :
                           sub.tier === "premium" ? "💜 프리미엄" :
                           "무료"}
                        </span>
                      </td>
                      <td className="text-center py-4 px-6 text-gray-600 text-sm">{sub.joined}</td>
                      <td className="text-center py-4 px-6 font-semibold text-emerald-600">{sub.opened}%</td>
                      <td className="text-center py-4 px-6 font-semibold text-blue-600">{sub.clicked}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === "sent" ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {campaign.status === "sent" ? "발송 완료" : "예약됨"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">제목: {campaign.subject}</div>
                    <div className="text-sm text-gray-500">발송일: {campaign.sentDate} • 수신자: {campaign.recipients}명</div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                    상세보기
                  </button>
                </div>

                {campaign.status === "sent" && (
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{Math.round((campaign.opened / campaign.recipients) * 100)}%</div>
                      <div className="text-xs text-gray-600">오픈률</div>
                      <div className="text-xs text-gray-500">{campaign.opened}명</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{Math.round((campaign.clicked / campaign.recipients) * 100)}%</div>
                      <div className="text-xs text-gray-600">클릭률</div>
                      <div className="text-xs text-gray-500">{campaign.clicked}명</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{Math.round((campaign.converted / campaign.recipients) * 100)}%</div>
                      <div className="text-xs text-gray-600">전환율</div>
                      <div className="text-xs text-gray-500">{campaign.converted}건</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">₩{Math.round(campaign.revenue / 1000)}K</div>
                      <div className="text-xs text-gray-600">매출</div>
                      <div className="text-xs text-gray-500">ROI 340%</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💌</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">이메일 마케팅 성공 전략</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>세분화:</strong> VIP/프리미엄/무료 등급별 맞춤 메시지 전송</li>
                <li>• <strong>자동화:</strong> 신규 가입, 구매 완료, 장바구니 이탈 시 자동 메일</li>
                <li>• <strong>A/B 테스트:</strong> 제목 2가지 버전으로 오픈률 개선</li>
                <li>• <strong>타이밍:</strong> 평일 오전 10시 or 저녁 8시가 최고 오픈률</li>
                <li>• <strong>CTA 명확화:</strong> "지금 구매하기" 버튼 1개만 강조</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
