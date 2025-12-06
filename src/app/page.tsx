import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center py-8 mb-12 border-b border-slate-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Check Me Today
        </h1>
        <nav className="text-sm text-slate-500 font-medium space-x-4">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">홈</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">인기 테스트</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">문의하기</span>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="max-w-md w-full text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800">
          오늘의 나를 발견하세요
        </h2>
        <p className="text-lg text-slate-600 break-keep">
          간단한 심리 테스트로 당신의 숨겨진 모습을 확인해보세요.
        </p>
      </div>

      {/* Test List (Grid) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Teto/Egen Card */}
        <Link href="/test" className="group block">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200">
            <div className="h-40 w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform duration-300">
              🧬
            </div>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                HOT 🔥
              </span>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                테토 vs 에겐 테스트
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed break-keep">
                나의 호르몬 타입은? 대담한 테토 유형일까, 섬세한 에겐 유형일까? 지금 확인해보세요.
              </p>
            </div>
          </div>
        </Link>

        {/* Placeholder Card 1 */}
        <div className="group block opacity-60 pointer-events-none grayscale">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
            <div className="h-40 w-full bg-slate-100 rounded-xl mb-6 flex items-center justify-center text-4xl mb-4">
              💤
            </div>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-400 text-xs font-bold rounded-full">
                준비중
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                수면 패턴 분석
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed break-keep">
                당신의 수면 유형을 분석하고 꿀잠 팁을 알려드려요.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder Card 2 */}
        <div className="group block opacity-60 pointer-events-none grayscale">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
            <div className="h-40 w-full bg-slate-100 rounded-xl mb-6 flex items-center justify-center text-4xl mb-4">
              🎨
            </div>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-400 text-xs font-bold rounded-full">
                준비중
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                나의 퍼스널 컬러
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed break-keep">
                나에게 가장 잘 어울리는 색상은 무엇일까요?
              </p>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-24 text-slate-400 text-sm text-center">
        © 2024 Check Me Today. All rights reserved.
      </footer>
    </main>
  );
}
