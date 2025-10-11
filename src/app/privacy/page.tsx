'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
          <section>
            <p className="text-gray-600 mb-4">
              크리에이티브허브(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률,
              개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며,
              관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
            </p>
            <p className="text-sm text-gray-500">
              최종 수정일: 2025년 1월 11일
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 수집하는 개인정보 항목</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">가. 회원가입 시</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>필수항목: 이름, 이메일, 프로필 사진 (Google OAuth)</li>
                  <li>자동수집: IP 주소, 쿠키, 접속 로그, 서비스 이용 기록</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">나. 게스트 등록 시</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>필수항목: 이름, 직업, 카테고리, 활동 지역, 전화번호, 이메일</li>
                  <li>선택항목: 프로필 이미지, 자기소개, 전문 분야, 포트폴리오, SNS 링크</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">다. 협업 제안 시</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>크리에이터 이름, 연락처(이메일, 전화번호)</li>
                  <li>채널 정보, 구독자 수, 제안 내용</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>회원 식별 및 서비스 제공</li>
              <li>크리에이터와 게스트 간 매칭 및 연결</li>
              <li>협업 제안 전송 및 관리</li>
              <li>서비스 이용 통계 분석 및 개선</li>
              <li>공지사항 전달, 문의 응대</li>
              <li>부정 이용 방지 및 서비스 보안 유지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <div className="space-y-2 text-gray-600">
              <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>회원 탈퇴 시: 즉시 파기 (단, 관련 법령에 따라 보존이 필요한 경우 예외)</li>
                <li>게스트 등록 해제 시: 즉시 파기</li>
                <li>협업 제안 정보: 제안 완료 또는 거절 후 1년</li>
              </ul>
              <div className="mt-4">
                <p className="font-semibold mb-2">법령에 따른 보존:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                  <li>소비자 불만 또는 분쟁처리 기록: 3년 (전자상거래법)</li>
                  <li>접속 로그 기록: 3개월 (통신비밀보호법)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
            <div className="space-y-2 text-gray-600">
              <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>이용자가 사전에 동의한 경우 (협업 제안 수락 시 연락처 공개)</li>
                <li>법령에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 요구가 있는 경우</li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">협업 제안 수락 시 정보 공개:</p>
                <p className="text-blue-800 text-sm">
                  게스트가 협업 제안을 수락하면, 크리에이터에게 게스트의 연락처(이메일, 전화번호)가 공개되며,
                  게스트에게도 크리에이터의 연락처가 공개됩니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 개인정보의 파기 절차 및 방법</h2>
            <div className="space-y-2 text-gray-600">
              <p className="font-semibold">파기 절차:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 파기됩니다.</li>
              </ul>
              <p className="font-semibold mt-4">파기 방법:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>전자적 파일 형태: 복구 및 재생이 불가능한 방법으로 영구 삭제</li>
                <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 이용자 및 법정대리인의 권리와 행사 방법</h2>
            <div className="text-gray-600 space-y-2">
              <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>개인정보 열람 요구</li>
                <li>개인정보 정정 요구</li>
                <li>개인정보 삭제 요구</li>
                <li>개인정보 처리정지 요구</li>
                <li>회원 탈퇴 (동의 철회)</li>
              </ul>
              <p className="mt-4">
                권리 행사는 서비스 내 설정 메뉴를 통하거나, 개인정보보호 담당자에게 이메일로 요청하실 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 개인정보 자동 수집 장치의 설치·운영 및 거부</h2>
            <div className="text-gray-600 space-y-2">
              <p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
              <p className="font-semibold mt-4">쿠키 거부 방법:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
                <li>Edge: 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리</li>
              </ul>
              <p className="mt-2 text-sm text-gray-500">
                ※ 쿠키 설치를 거부할 경우 서비스 이용에 어려움이 있을 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 개인정보보호 책임자</h2>
            <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
              <p className="font-semibold mb-3">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보보호 책임자를 지정하고 있습니다.</p>
              <div className="space-y-1">
                <p><span className="font-semibold">성명:</span> 크리에이티브허브 담당자</p>
                <p><span className="font-semibold">이메일:</span> creatorhub987@gmail.com</p>
                <p><span className="font-semibold">연락처:</span> 문의는 이메일로 부탁드립니다</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 개인정보 처리방침 변경</h2>
            <div className="text-gray-600">
              <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 개인정보 침해 관련 상담 및 신고</h2>
            <div className="text-gray-600 space-y-2">
              <p>개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하시기 바랍니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                <li>대검찰청 사이버범죄수사단: (국번없이) 1301 (www.spo.go.kr)</li>
                <li>경찰청 사이버안전국: (국번없이) 182 (cyberbureau.police.go.kr)</li>
              </ul>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              본 개인정보처리방침은 2025년 1월 11일부터 적용됩니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
