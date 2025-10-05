"use client";

import Link from "next/link";
import { useState } from "react";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("consulting");

  const services = {
    consulting: {
      name: "1:1 뷰티 컨설팅",
      price: 50000,
      duration: "60분",
      description: "화상으로 만나는 개인 맞춤 컨설팅",
      icon: "🗓️"
    },
    makeup: {
      name: "퍼스널 메이크업",
      price: 120000,
      duration: "2시간",
      description: "방문 메이크업 서비스",
      icon: "✨"
    },
    coaching: {
      name: "월간 뷰티 코칭",
      price: 180000,
      duration: "월 4회",
      description: "정기 코칭 프로그램",
      icon: "📝"
    }
  };

  const availableDates = [
    "2024-03-15",
    "2024-03-16",
    "2024-03-18",
    "2024-03-19",
    "2024-03-20"
  ];

  const availableTimes = [
    "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="text-gray-600 hover:text-gray-900">
              ← 뒤로가기
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-lg">
                👩‍🎨
              </div>
              <span className="font-semibold text-gray-900">김크리에이터</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">서비스 예약</h1>
          <p className="text-gray-600">원하시는 서비스와 시간을 선택해주세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Service Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-900">서비스 선택</h2>
              </div>

              <div className="space-y-3">
                {Object.entries(services).map(([key, service]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedService(key)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition ${
                      selectedService === key
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₩{service.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{service.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-900">날짜 선택</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
                  const dayName = dayNames[dateObj.getDay()];
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-xl border-2 transition ${
                        selectedDate === date
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm text-gray-600">{dayName}요일</div>
                      <div className="font-bold text-gray-900">
                        {dateObj.getMonth() + 1}/{dateObj.getDate()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Time Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-900">시간 선택</h2>
              </div>

              {!selectedDate ? (
                <div className="text-center py-8 text-gray-500">
                  먼저 날짜를 선택해주세요
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 font-semibold transition ${
                        selectedTime === time
                          ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-900"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 4: Customer Info */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl font-bold text-gray-900">예약자 정보</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    요청사항 (선택)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="특별히 상담받고 싶은 내용이 있다면 알려주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-4">
              <h3 className="font-bold text-gray-900 text-lg mb-6">예약 요약</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{services[selectedService as keyof typeof services].icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">서비스</div>
                    <div className="font-semibold text-gray-900">
                      {services[selectedService as keyof typeof services].name}
                    </div>
                  </div>
                </div>

                {selectedDate && (
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📅</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">날짜</div>
                      <div className="font-semibold text-gray-900">
                        {new Date(selectedDate).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⏰</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">시간</div>
                      <div className="font-semibold text-gray-900">{selectedTime}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="text-2xl">⏱️</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">소요시간</div>
                    <div className="font-semibold text-gray-900">
                      {services[selectedService as keyof typeof services].duration}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">서비스 금액</span>
                  <span className="font-semibold text-gray-900">
                    ₩{services[selectedService as keyof typeof services].price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-900">총 결제금액</span>
                  <span className="text-emerald-600">
                    ₩{services[selectedService as keyof typeof services].price.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout/service"
                className={`block w-full py-4 text-center rounded-full font-bold transition ${
                  selectedDate && selectedTime
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                예약하고 결제하기
              </Link>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">ℹ️</span>
                  <p className="text-sm text-gray-700">
                    예약 확정 후 이메일과 문자로 알림이 발송됩니다. 
                    일정 변경은 24시간 전까지 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
