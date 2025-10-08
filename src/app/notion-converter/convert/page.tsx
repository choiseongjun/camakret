"use client";

import Link from "next/link";
import { useState } from "react";

export default function NotionConverter() {
  const [notionUrl, setNotionUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState("");

  const templates = [
    { id: "minimal", name: "미니멀", emoji: "⚪", color: "from-gray-400 to-gray-600" },
    { id: "gradient", name: "그라데이션", emoji: "🌈", color: "from-purple-500 to-pink-500" },
    { id: "dark", name: "다크", emoji: "🌙", color: "from-gray-800 to-black" },
    { id: "modern", name: "모던", emoji: "✨", color: "from-blue-500 to-cyan-500" },
    { id: "elegant", name: "우아함", emoji: "👔", color: "from-indigo-500 to-purple-500" },
    { id: "creative", name: "크리에이티브", emoji: "🎨", color: "from-yellow-500 to-red-500" },
  ];

  const handleConvert = async () => {
    if (!notionUrl) {
      alert("노션 URL을 입력해주세요!");
      return;
    }

    setIsConverting(true);
    
    // 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(7);
      setConvertedUrl(`/notion-converter/preview?id=${randomId}&template=${selectedTemplate}`);
      setIsConverting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/notion-converter" className="flex items-center gap-2">
              <div className="text-2xl">📄</div>
              <span className="text-xl font-bold text-white">NotionToSite</span>
            </Link>
            <Link 
              href="/notion-converter"
              className="text-gray-400 hover:text-white transition"
            >
              ← 뒤로 가기
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!convertedUrl ? (
          <>
            {/* Step 1: URL Input */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-white">노션 페이지 URL 입력</h2>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  노션 페이지 링크를 붙여넣으세요
                </label>
                <input
                  type="text"
                  value={notionUrl}
                  onChange={(e) => setNotionUrl(e.target.value)}
                  placeholder="https://notion.so/your-page-..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
                <p className="text-sm text-gray-400 mt-3">
                  💡 팁: 노션 페이지를 <span className="text-purple-400 font-semibold">공개</span>로 설정해야 합니다
                </p>
              </div>
            </div>

            {/* Step 2: Template Selection */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-white">템플릿 선택</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 transition hover:scale-105 ${
                      selectedTemplate === template.id
                        ? "border-purple-500 shadow-lg shadow-purple-500/50"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                    <div className="text-4xl mb-3 text-center">{template.emoji}</div>
                    <h3 className="font-bold text-white text-center">{template.name}</h3>
                    <div className={`mt-3 h-2 rounded-full bg-gradient-to-r ${template.color}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            <div className="text-center">
              <button
                onClick={handleConvert}
                disabled={isConverting || !notionUrl}
                className={`px-12 py-4 rounded-full font-bold text-lg transition transform ${
                  isConverting || !notionUrl
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1"
                }`}
              >
                {isConverting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    변환 중...
                  </span>
                ) : (
                  "🚀 변환하기"
                )}
              </button>
              <p className="text-sm text-gray-400 mt-4">
                변환에는 약 3초가 소요됩니다
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-3">변환 완료! 🎉</h2>
            <p className="text-xl text-gray-300 mb-8">
              멋진 랜딩페이지가 준비되었습니다
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8 max-w-2xl mx-auto">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                당신의 사이트 URL
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={`${window.location.origin}${convertedUrl}`}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}${convertedUrl}`);
                    alert("복사되었습니다!");
                  }}
                  className="px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
                >
                  복사
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={convertedUrl}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition"
              >
                미리보기 →
              </Link>
              <button
                onClick={() => {
                  setConvertedUrl("");
                  setNotionUrl("");
                }}
                className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition"
              >
                새로 만들기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
