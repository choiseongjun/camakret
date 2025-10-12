import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="CreatorHub Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">CreatorHub</span>
            </div>
            <p className="text-sm">
              크리에이터와 게스트, 장소를 연결하는<br />
              협업 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스 소개</h3>
            <p className="text-sm leading-relaxed">
              CreatorHub는 음식 크리에이터와<br />
              게스트, 촬영 장소를 연결하여<br />
              더 나은 콘텐츠를 만들 수 있도록<br />
              돕는 협업 플랫폼입니다.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guests" className="hover:text-white transition">게스트 찾기</Link></li>
              <li><Link href="/register-guest" className="hover:text-white transition">게스트 등록</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition">이용 방법</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
            </ul>
            <div className="mt-4 text-sm">
              <p className="text-gray-400 mb-1">문의하기</p>
              <p className="text-green-400">creatorhub987@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">협업 문의</h3>
            <div className="text-sm">
              <p className="mb-2">크리에이터&게스트 협업 및 제휴 문의</p>
              <p className="text-green-400">creatorhub987@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm space-y-2">
            <div className="text-gray-400">
              <p className="mb-1">상호: 크리에이티브허브 | 대표: 최성준</p>
              <p className="mb-1">주소: 서울특별시 동작구 상도동 211-114</p>
              <p className="mb-1">이메일: creatorhub987@gmail.com | 개인정보보호책임자: creatorhub987@gmail.com</p>
              {/* <p className="mb-1">사업자등록번호: 사업자등록 준비중 | 통신판매업 신고: 신고 예정</p> */}
            </div>
            <div className="text-gray-500 text-xs pt-3">
              <p className="mb-2"> 
                본 사이트는 정보통신망 이용촉진 및 정보보호 등에 관한 법률과 개인정보보호법을 준수합니다.
              </p>
              <p className="text-gray-400">&copy; 2025 CreatorHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
