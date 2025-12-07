"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
            📋 개인정보처리방침
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              시행일: 2025년 1월 1일 | 최종 수정일: 2025년 1월 1일
            </p>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                1. 개인정보의 처리 목적
              </h2>
              <p>
                Check Me Today(이하 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다. 
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>심리 테스트 서비스 제공</li>
                <li>테스트 결과 분석 및 제공</li>
                <li>서비스 이용 통계 분석</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                2. 수집하는 개인정보 항목
              </h2>
              <p>서비스는 다음과 같은 최소한의 개인정보를 수집합니다:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>자동 수집 항목:</strong> 접속 IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보</li>
                <li><strong>테스트 응답 데이터:</strong> 심리 테스트 선택 답변 (익명 처리)</li>
              </ul>
              <p className="mt-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-800 dark:text-green-300">
                ✅ 본 서비스는 회원가입 없이 이용 가능하며, 이름, 이메일, 전화번호 등 
                개인을 직접 식별할 수 있는 정보를 수집하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <p>
                서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
                지체없이 해당 개인정보를 파기합니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>서비스 이용 기록: 1년</li>
                <li>접속 로그: 3개월</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                4. 개인정보의 제3자 제공
              </h2>
              <p>
                서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 
                다만, 아래의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                5. 쿠키(Cookie)의 사용
              </h2>
              <p>
                서비스는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키를 사용합니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>쿠키란?</strong> 웹사이트가 이용자의 브라우저에 전송하는 소량의 텍스트 파일</li>
                <li><strong>사용 목적:</strong> 언어 설정, 테마 설정, 서비스 이용 분석</li>
                <li><strong>거부 방법:</strong> 브라우저 설정에서 쿠키를 거부할 수 있습니다</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                6. 광고 및 분석 서비스
              </h2>
              <p>서비스는 다음과 같은 제3자 서비스를 이용합니다:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Google AdSense:</strong> 맞춤형 광고 제공
                  <br />
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Google 개인정보처리방침 →
                  </a>
                </li>
                <li>
                  <strong>Google Analytics:</strong> 서비스 이용 통계 분석
                </li>
              </ul>
              <p className="mt-3">
                이러한 서비스들은 쿠키를 사용하여 익명의 정보를 수집할 수 있습니다. 
                맞춤 광고를 원하지 않으시면{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Google 광고 설정
                </a>
                에서 비활성화할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                7. 이용자의 권리
              </h2>
              <p>이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리 정지 요구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                8. 개인정보 보호책임자
              </h2>
              <p>
                서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 
                개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 
                아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="mt-3 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                <p><strong>개인정보 보호책임자</strong></p>
                <p>이메일: chreeoer@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-8 mb-4">
                9. 개인정보처리방침의 변경
              </h2>
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 
                삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

