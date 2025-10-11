'use client';

import { CheckCircle, Users, Video, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: '빠른 매칭',
      description: 'AI 기반 추천 시스템으로 당신의 채널에 꼭 맞는 게스트를 빠르게 찾아보세요.',
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: '다양한 전문가 풀',
      description: '운동, 요리, 법률, 예술 등 각 분야의 전문가들이 당신의 콘텐츠를 기다립니다.',
    },
    {
      icon: <Video className="w-10 h-10 text-white" />,
      title: '콘텐츠 아이디어 제안',
      description: '게스트가 직접 제안하는 참신한 콘텐츠 아이디어로 새로운 영감을 얻으세요.',
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      title: '간편한 협업 제안',
      description: '플랫폼 내에서 간편하게 협업을 제안하고 일정을 조율할 수 있습니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            당신의 콘텐츠에
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500">새로운 날개를</span>
            {' '}
            달아주세요
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            CreatorHub는 최고의 크리에이터와 전문 게스트를 연결하여, 시청자를 사로잡는 최고의 콘텐츠를 함께 만들어나가는 공간입니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/guests" legacyBehavior>
              <a className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1">
                게스트 찾기
              </a>
            </Link>
            <Link href="/register-guest" legacyBehavior>
              <a className="inline-block px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1 border-2 border-green-200">
                게스트로 등록하기
              </a>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            왜 CreatorHub를 사용해야 할까요?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-400 to-green-500 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works Section */}
        <section>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            이렇게 작동합니다
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md w-full md:w-1/3">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">1. 게스트 탐색</h3>
              <p className="text-gray-600">다양한 분야의 전문가 프로필을 둘러보세요.</p>
            </div>
            <div className="text-2xl text-gray-400 hidden md:block">→</div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md w-full md:w-1/3">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2">2. 협업 제안</h3>
              <p className="text-gray-600">마음에 드는 게스트에게 간편하게 제안을 보내세요.</p>
            </div>
            <div className="text-2xl text-gray-400 hidden md:block">→</div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md w-full md:w-1/3">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">3. 최고의 콘텐츠 제작</h3>
              <p className="text-gray-600">게스트와 함께 멋진 콘텐츠를 만들어보세요.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
