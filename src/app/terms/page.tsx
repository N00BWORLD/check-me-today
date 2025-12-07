"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline mb-8"
        >
          ← 홈으로
        </Link>
        
        <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
            📜 이용약관
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              시행일: 2025년 1월 1일 | 최종 수정일: 2025년 1월 1일
            </p>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제1조 (목적)
              </h2>
              <p>
                이 약관은 Check Me Today(이하 "서비스")가 제공하는 심리 테스트 서비스의 
                이용조건 및 절차, 서비스와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 
                규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제2조 (정의)
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>"서비스"</strong>란 Check Me Today가 제공하는 심리 테스트 및 관련 콘텐츠를 의미합니다.</li>
                <li><strong>"이용자"</strong>란 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 자를 말합니다.</li>
                <li><strong>"테스트"</strong>란 서비스에서 제공하는 심리 테스트, 성격 테스트, 유형 테스트 등을 의미합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제3조 (약관의 효력 및 변경)
              </h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
                <li>서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지합니다.</li>
                <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제4조 (서비스의 제공)
              </h2>
              <p>서비스는 다음과 같은 서비스를 제공합니다:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>다양한 심리 테스트 콘텐츠</li>
                <li>테스트 결과 분석 및 제공</li>
                <li>결과 공유 기능</li>
                <li>기타 서비스가 정하는 서비스</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제5조 (서비스 이용)
              </h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>서비스는 연중무휴 24시간 제공을 원칙으로 합니다.</li>
                <li>서비스는 시스템 정기점검, 증설 및 교체를 위해 서비스를 일시 중단할 수 있습니다.</li>
                <li>서비스는 무료로 제공되며, 광고가 포함될 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제6조 (이용자의 의무)
              </h2>
              <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>서비스를 이용하여 얻은 정보를 서비스의 사전 승낙 없이 복제, 유통, 조장하는 행위</li>
                <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
                <li>서비스의 저작권 등 지적재산권을 침해하는 행위</li>
                <li>기타 관계 법령이나 서비스가 정한 규정에 위배되는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제7조 (면책조항)
              </h2>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-800 dark:text-yellow-300 mb-4">
                ⚠️ 중요: 본 서비스의 테스트 결과는 오락 및 참고 목적으로만 제공됩니다.
              </div>
              <ul className="list-decimal pl-6 space-y-2">
                <li>
                  서비스에서 제공하는 모든 테스트 결과는 <strong>과학적/의학적 진단이 아니며</strong>, 
                  오락 및 자기 이해를 위한 참고 자료로만 활용해야 합니다.
                </li>
                <li>
                  테스트 결과를 바탕으로 한 이용자의 판단이나 행동에 대해 서비스는 책임을 지지 않습니다.
                </li>
                <li>
                  심리적 문제나 고민이 있는 경우, 반드시 전문 상담사나 의료 전문가와 상담하시기 바랍니다.
                </li>
                <li>
                  서비스는 천재지변, 전쟁 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제8조 (저작권)
              </h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>서비스가 작성한 콘텐츠에 대한 저작권은 서비스에 귀속됩니다.</li>
                <li>이용자는 서비스를 이용하여 얻은 정보를 서비스의 사전 승낙 없이 상업적으로 이용할 수 없습니다.</li>
                <li>테스트 결과의 개인적인 공유(SNS 등)는 허용됩니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제9조 (광고 게재)
              </h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>서비스는 운영을 위해 서비스 내에 광고를 게재할 수 있습니다.</li>
                <li>서비스는 Google AdSense 등 제3자 광고 서비스를 이용합니다.</li>
                <li>광고 링크를 통해 연결된 제3자의 사이트에서 발생하는 문제에 대해 서비스는 책임을 지지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제10조 (분쟁 해결)
              </h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>서비스와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 적용합니다.</li>
                <li>서비스와 이용자 간의 분쟁은 먼저 상호 협의에 의해 해결하도록 합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                제11조 (문의)
              </h2>
              <p>서비스 이용에 관한 문의사항은 아래로 연락해 주시기 바랍니다:</p>
              <div className="mt-3 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                <p>이메일: chreeoer@gmail.com</p>
              </div>
            </section>

            <section className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong>부칙</strong><br />
                이 약관은 2025년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

