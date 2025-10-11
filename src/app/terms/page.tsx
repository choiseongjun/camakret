'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">이용약관</h1>

        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
          <section>
            <p className="text-gray-600 mb-4">
              본 약관은 크리에이티브허브(이하 "회사")가 제공하는 CreatorHub 서비스(이하 "서비스")의 이용과 관련하여
              회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
            <p className="text-sm text-gray-500">
              최종 수정일: 2025년 1월 11일
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-600">
              본 약관은 회사가 제공하는 CreatorHub 서비스의 이용조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항,
              기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (정의)</h2>
            <div className="space-y-2 text-gray-600">
              <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ul className="list-decimal list-inside space-y-2 ml-4">
                <li>"서비스"란 회사가 제공하는 크리에이터와 게스트 매칭 플랫폼을 의미합니다.</li>
                <li>"회원"이란 본 약관에 동의하고 회사와 이용계약을 체결한 자를 의미합니다.</li>
                <li>"크리에이터"란 콘텐츠 제작을 위해 게스트를 찾는 회원을 의미합니다.</li>
                <li>"게스트"란 크리에이터의 콘텐츠에 출연하고자 프로필을 등록한 회원을 의미합니다.</li>
                <li>"협업 제안"이란 크리에이터가 게스트에게 콘텐츠 출연을 제안하는 것을 의미합니다.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.</p>
              <p>2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>
              <p>3. 회사가 약관을 변경할 경우 적용일자 및 변경사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</p>
              <p>4. 회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (회원가입)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회원가입은 서비스 이용자가 약관의 내용에 동의한 후, 회사가 정한 양식에 따라 회원정보를 기입하여 신청하고 회사가 이를 승낙함으로써 체결됩니다.</p>
              <p>2. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>타인의 명의를 이용하여 신청한 경우</li>
                <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                <li>부정한 용도로 서비스를 이용하고자 하는 경우</li>
                <li>관련 법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (서비스의 제공)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>게스트 프로필 등록 및 관리</li>
                <li>게스트 검색 및 필터링</li>
                <li>협업 제안 전송 및 관리</li>
                <li>크리에이터-게스트 간 연락처 교환 (제안 수락 시)</li>
                <li>협업 이력 관리</li>
              </ul>
              <p>2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</p>
              <p>3. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 등의 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (서비스 이용요금)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사가 제공하는 서비스는 기본적으로 무료입니다.</p>
              <p>2. 단, 향후 유료 서비스가 추가될 경우 해당 서비스 이용 전 사전 공지하고 별도의 동의를 받습니다.</p>
              <p>3. 크리에이터와 게스트 간의 출연료 협상 및 지급은 당사자 간 직접 처리하며, 회사는 이에 관여하지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (회원의 의무)</h2>
            <div className="space-y-3 text-gray-600">
              <p>회원은 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-decimal list-inside space-y-2 ml-4">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                <li>스팸 메시지, 광고성 정보 전송</li>
                <li>서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하는 행위</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (게스트 등록 및 관리)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 게스트로 등록하고자 하는 회원은 정확하고 사실에 부합하는 정보를 제공해야 합니다.</p>
              <p>2. 회사는 허위 정보를 제공한 게스트의 프로필을 삭제하거나 서비스 이용을 제한할 수 있습니다.</p>
              <p>3. 게스트는 본인의 프로필 정보를 최신 상태로 유지할 책임이 있습니다.</p>
              <p>4. 회사는 부적절한 내용이 포함된 게스트 프로필에 대해 사전 통보 없이 삭제하거나 비공개 처리할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (협업 제안 및 계약)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 크리에이터는 게스트에게 협업 제안을 전송할 수 있으며, 게스트는 제안을 수락 또는 거절할 수 있습니다.</p>
              <p>2. 제안이 수락된 경우 양측의 연락처가 공개되며, 이후 협업 진행은 당사자 간 직접 협의합니다.</p>
              <p>3. 회사는 크리에이터와 게스트 간의 협업 계약, 출연료 지급, 저작권 등에 대해 책임을 지지 않습니다.</p>
              <p>4. 협업 과정에서 발생하는 모든 법적 책임은 당사자 간의 문제이며, 회사는 중재 또는 분쟁 해결 의무가 없습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (개인정보보호)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다.</p>
              <p>2. 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보처리방침이 적용됩니다.</p>
              <p>3. 단, 회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제11조 (회사의 의무)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사는 관련 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.</p>
              <p>2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.</p>
              <p>3. 회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우 이를 처리하여야 합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제12조 (회사의 면책)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.</p>
              <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</p>
              <p>3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</p>
              <p>4. 회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.</p>
              <p>5. 회사는 크리에이터와 게스트 간의 협업 계약, 출연료 지급, 협업 진행 과정에서 발생하는 분쟁에 대해 책임을 지지 않습니다.</p>
              <p>6. 회사는 제안 수락 후 양측에게 공개된 연락처의 오용, 남용, 2차 피해에 대해 책임을 지지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제13조 (저작권의 귀속 및 이용제한)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
              <p>2. 회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시자에게 귀속됩니다.</p>
              <p>3. 회원은 서비스를 이용하여 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제14조 (계약 해지 및 서비스 이용 제한)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 직접 서비스 내 회원탈퇴 기능을 이용하여 해지할 수 있습니다.</p>
              <p>2. 회사는 회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전통보 없이 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>타인의 정보를 도용한 경우</li>
                <li>허위 정보를 등록한 경우</li>
                <li>다른 회원의 서비스 이용을 방해하거나 정보를 도용하는 경우</li>
                <li>서비스를 이용하여 법령 또는 본 약관이 금지하는 행위를 하는 경우</li>
                <li>공공질서 및 미풍양속에 반하는 내용을 유포하는 경우</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제15조 (손해배상)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 회사의 고의 또는 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 않습니다.</p>
              <p>2. 회원이 본 약관의 규정을 위반하여 회사에 손해가 발생한 경우 본 약관을 위반한 회원은 회사에 발생하는 모든 손해를 배상하여야 합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제16조 (분쟁의 해결)</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.</p>
              <p>2. 제1항의 규정에도 불구하고 분쟁이 해결되지 않을 경우 양 당사자는 민사소송법상의 관할법원에 소를 제기할 수 있습니다.</p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              본 약관은 2025년 1월 11일부터 적용됩니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
