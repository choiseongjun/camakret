"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PreviewContent() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "minimal";
  const id = searchParams.get("id") || "demo";

  // 템플릿별 스타일
  const getTemplateStyles = () => {
    switch (template) {
      case "gradient":
        return {
          bg: "bg-gradient-to-br from-purple-500 to-pink-500",
          text: "text-white",
          accent: "text-yellow-300",
        };
      case "dark":
        return {
          bg: "bg-gray-900",
          text: "text-white",
          accent: "text-purple-400",
        };
      case "modern":
        return {
          bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
          text: "text-white",
          accent: "text-yellow-200",
        };
      case "elegant":
        return {
          bg: "bg-gradient-to-br from-indigo-500 to-purple-500",
          text: "text-white",
          accent: "text-pink-300",
        };
      case "creative":
        return {
          bg: "bg-gradient-to-br from-yellow-500 to-red-500",
          text: "text-white",
          accent: "text-white",
        };
      default:
        return {
          bg: "bg-white",
          text: "text-gray-900",
          accent: "text-purple-600",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      {/* Preview Bar */}
      <div className="bg-black/80 backdrop-blur-sm text-white py-3 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">🎨 미리보기 모드</div>
          <div className="text-xs text-gray-400">템플릿: {template}</div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/notion-converter/convert"
            className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            새로 만들기
          </Link>
          <button className="text-sm px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition font-semibold">
            도메인 연결
          </button>
        </div>
      </div>

      {/* Converted Page Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className={`text-center mb-16 ${styles.text}`}>
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            당신의 멋진 프로젝트
          </h1>
          <p className="text-xl opacity-80 mb-8">
            노션에서 3초 만에 변환된 랜딩페이지
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className={`px-8 py-4 ${template === "minimal" ? "bg-purple-600" : "bg-white"} ${template === "minimal" ? "text-white" : "text-gray-900"} rounded-full font-bold text-lg hover:shadow-xl transition`}>
              시작하기 →
            </button>
            <button className={`px-8 py-4 ${template === "minimal" ? "border-2 border-purple-600 text-purple-600" : "bg-white/20 text-white border-2 border-white/20"} rounded-full font-bold text-lg hover:shadow-xl transition`}>
              더 알아보기
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className={`grid md:grid-cols-3 gap-6 mb-16 ${styles.text}`}>
          <div className={`${template === "minimal" ? "bg-gray-50" : "bg-white/10 backdrop-blur-sm"} rounded-2xl p-8 text-center`}>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">빠른 속도</h3>
            <p className={`${template === "minimal" ? "text-gray-600" : "opacity-80"}`}>
              초고속 로딩으로 최상의 경험 제공
            </p>
          </div>

          <div className={`${template === "minimal" ? "bg-gray-50" : "bg-white/10 backdrop-blur-sm"} rounded-2xl p-8 text-center`}>
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">아름다운 디자인</h3>
            <p className={`${template === "minimal" ? "text-gray-600" : "opacity-80"}`}>
              전문가가 디자인한 템플릿
            </p>
          </div>

          <div className={`${template === "minimal" ? "bg-gray-50" : "bg-white/10 backdrop-blur-sm"} rounded-2xl p-8 text-center`}>
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">모바일 최적화</h3>
            <p className={`${template === "minimal" ? "text-gray-600" : "opacity-80"}`}>
              모든 기기에서 완벽하게 작동
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className={`${template === "minimal" ? "bg-white" : "bg-white/10 backdrop-blur-sm"} rounded-3xl p-12 ${styles.text} mb-16`}>
          <h2 className="text-3xl font-bold mb-6">노션 콘텐츠가 여기에</h2>
          <div className={`space-y-4 ${template === "minimal" ? "text-gray-700" : "opacity-90"}`}>
            <p className="text-lg leading-relaxed">
              이곳에는 노션 페이지의 실제 내용이 표시됩니다. 제목, 본문, 이미지, 링크 등 모든 콘텐츠가 아름답게 변환되어 나타납니다.
            </p>
            <p className="text-lg leading-relaxed">
              노션에서 작성한 모든 블록들이 자동으로 반응형 디자인으로 변환되며, SEO에 최적화된 형태로 제공됩니다.
            </p>
            <div className={`${template === "minimal" ? "bg-gray-100" : "bg-white/10"} rounded-xl p-6 my-6`}>
              <p className="font-mono text-sm">
                💡 실제로는 노션 API를 통해 가져온 콘텐츠가 여기에 렌더링됩니다
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center ${styles.text}`}>
          <h2 className="text-4xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className={`text-xl mb-8 ${template === "minimal" ? "text-gray-600" : "opacity-80"}`}>
            무료로 시작할 수 있습니다
          </p>
          <button className={`px-8 py-4 ${template === "minimal" ? "bg-purple-600 text-white" : "bg-white text-gray-900"} rounded-full font-bold text-lg hover:shadow-xl transition`}>
            무료로 시작하기 →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t ${template === "minimal" ? "border-gray-200" : "border-white/10"} py-8`}>
        <div className={`text-center ${styles.text} opacity-60 text-sm`}>
          <p>Powered by NotionToSite • 노션에서 3초 만에 만든 사이트</p>
        </div>
      </div>
    </div>
  );
}

export default function NotionPreview() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">미리보기를 불러오는 중...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
