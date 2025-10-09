'use client';

import { useState } from 'react';
import { Share2, Link2, Check, X } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

export default function ShareButton({ title, description, url, imageUrl }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  const handleTwitterShare = () => {
    const text = `${title}\n\n${description}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition"
      >
        <Share2 className="w-4 h-4" />
        공유하기
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">공유하기</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {/* 트위터 공유 */}
              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center gap-4 p-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition"
              >
                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">𝕏</span>
                </div>
                <span className="text-lg font-semibold">트위터(X)로 공유</span>
              </button>

              {/* 페이스북 공유 */}
              <button
                onClick={handleFacebookShare}
                className="w-full flex items-center gap-4 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">f</span>
                </div>
                <span className="text-lg font-semibold">페이스북으로 공유</span>
              </button>

              {/* 링크 복사 */}
              <button
                onClick={handleCopyLink}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  copied ? 'bg-green-600' : 'bg-gray-200'
                }`}>
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Link2 className="w-5 h-5 text-gray-700" />
                  )}
                </div>
                <span className="text-lg font-semibold">
                  {copied ? '링크가 복사되었습니다!' : '링크 복사'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
