"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { generateFortuneWithLang, luckyColors, luckyDirections, overallDescriptions } from "@/data/fortunes";
import { useIncrementPlay } from "@/hooks/useTestStats";
import AdUnit from "@/components/AdUnit";

type FortuneState = "input" | "opening" | "result";

export default function FortunePage() {
  const { lang } = useLanguage();
  const [state, setState] = useState<FortuneState>("input");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [fortune, setFortune] = useState<ReturnType<typeof generateFortuneWithLang> | null>(null);
  
  // 조회수 증가
  useIncrementPlay("fortune");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    
    // 복주머니 애니메이션 시작
    setState("opening");
    
    // 3초 후 결과 표시
    setTimeout(() => {
      const result = generateFortuneWithLang(name, birthDate, lang);
      setFortune(result);
      setState("result");
    }, 3000);
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-xl ${i <= count ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const texts = {
    title: { ko: "오늘의 운세", en: "Daily Fortune", zh: "今日运势", ja: "今日の運勢" },
    subtitle: { ko: "당신의 오늘 하루는?", en: "What does today hold for you?", zh: "今天会怎样？", ja: "今日はどんな一日？" },
    name: { ko: "이름", en: "Name", zh: "名字", ja: "名前" },
    namePlaceholder: { ko: "이름을 입력하세요", en: "Enter your name", zh: "请输入名字", ja: "名前を入力" },
    birthDate: { ko: "생년월일", en: "Birth Date", zh: "出生日期", ja: "生年月日" },
    submit: { ko: "운세 보기 🔮", en: "See Fortune 🔮", zh: "查看运势 🔮", ja: "運勢を見る 🔮" },
    opening: { ko: "복주머니를 열고 있어요...", en: "Opening the lucky bag...", zh: "正在打开福袋...", ja: "福袋を開けています..." },
    overall: { ko: "종합운", en: "Overall", zh: "综合运", ja: "総合運" },
    wealth: { ko: "재물운", en: "Wealth", zh: "财运", ja: "金運" },
    love: { ko: "연애운", en: "Love", zh: "爱情运", ja: "恋愛運" },
    health: { ko: "건강운", en: "Health", zh: "健康运", ja: "健康運" },
    work: { ko: "직장/학업운", en: "Work/Study", zh: "事业/学业运", ja: "仕事/学業運" },
    luckyNumber: { ko: "행운의 숫자", en: "Lucky Number", zh: "幸运数字", ja: "ラッキーナンバー" },
    luckyColor: { ko: "행운의 색상", en: "Lucky Color", zh: "幸运颜色", ja: "ラッキーカラー" },
    luckyDirection: { ko: "행운의 방향", en: "Lucky Direction", zh: "幸运方向", ja: "ラッキー方向" },
    advice: { ko: "오늘의 조언", en: "Today's Advice", zh: "今日建议", ja: "今日のアドバイス" },
    warning: { ko: "주의할 점", en: "Things to Watch", zh: "注意事项", ja: "注意点" },
    retry: { ko: "다시 보기", en: "Try Again", zh: "重新查看", ja: "もう一度" },
    home: { ko: "홈으로", en: "Home", zh: "首页", ja: "ホームへ" },
  };

  const t = (obj: Record<string, string>) => obj[lang] || obj.en;

  // 입력 폼
  if (state === "input") {
    return (
      <main className="min-h-screen py-10 px-4">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="w-10 h-10 rounded-full glass dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          {/* 타이틀 */}
          <div className="text-center mb-10">
            <div className="text-6xl mb-4 animate-bounce">🧧</div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
              {t(texts.title)}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {t(texts.subtitle)}
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-strong dark:bg-slate-800/90 rounded-3xl p-6 space-y-5">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                  {t(texts.name)}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(texts.namePlaceholder)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              {/* 생년월일 */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                  {t(texts.birthDate)}
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t(texts.submit)}
            </button>
          </form>

          {/* 설명 */}
          <div className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500">
            <p>✨ {lang === 'ko' ? '매일 자정에 운세가 바뀝니다' : lang === 'zh' ? '每天午夜运势会更新' : lang === 'ja' ? '毎日午前0時に運勢が変わります' : 'Fortune changes every midnight'}</p>
          </div>
        </div>
      </main>
    );
  }

  // 복주머니 애니메이션
  if (state === "opening") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20">
        <div className="text-center">
          {/* 복주머니 애니메이션 */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* 빛 효과 */}
            <div className="absolute inset-0 animate-ping opacity-30">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-red-400 blur-xl" />
            </div>
            
            {/* 복주머니 */}
            <div className="relative w-full h-full flex items-center justify-center animate-pulse">
              <span className="text-[120px] animate-bounce drop-shadow-2xl" style={{ animationDuration: '0.5s' }}>
                🧧
              </span>
            </div>

            {/* 반짝이 효과 */}
            <div className="absolute top-0 left-1/4 text-2xl animate-ping" style={{ animationDelay: '0.2s' }}>✨</div>
            <div className="absolute top-1/4 right-0 text-xl animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute bottom-1/4 left-0 text-xl animate-ping" style={{ animationDelay: '0.8s' }}>✨</div>
            <div className="absolute bottom-0 right-1/4 text-2xl animate-ping" style={{ animationDelay: '1.1s' }}>🌟</div>
          </div>

          <h2 className="text-2xl font-bold text-slate-700 dark:text-white animate-pulse">
            {t(texts.opening)}
          </h2>

          {/* 로딩 바 */}
          <div className="mt-6 w-64 mx-auto h-2 bg-white/30 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full animate-loading-bar"
              style={{ animation: 'loading 3s ease-in-out forwards' }}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </main>
    );
  }

  // 결과 화면
  if (state === "result" && fortune) {
    const overallDesc = overallDescriptions[fortune.overall];
    const colorName = luckyColors[fortune.luckyColor];
    const directionName = luckyDirections[fortune.luckyDirection];

    return (
      <main className="min-h-screen py-10 px-4 pb-32">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="w-10 h-10 rounded-full glass dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {name}
            </div>
          </div>

          {/* 결과 카드 */}
          <div className="glass-strong dark:bg-slate-800/90 rounded-3xl overflow-hidden mb-6 animate-slide-up">
            {/* 상단 배너 */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 text-white text-center">
              <div className="text-5xl mb-2">🧧</div>
              <h1 className="text-2xl font-black">{t(texts.title)}</h1>
              <p className="text-white/80 text-sm mt-1">
                {new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* 종합운 */}
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t(texts.overall)}</h2>
                {renderStars(fortune.overall)}
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {overallDesc[lang as keyof typeof overallDesc] || overallDesc.en}
              </p>
            </div>

            {/* 세부 운세 */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.wealth)}</div>
                {renderStars(fortune.wealth)}
              </div>
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <div className="text-2xl mb-1">💕</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.love)}</div>
                {renderStars(fortune.love)}
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl mb-1">💪</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.health)}</div>
                {renderStars(fortune.health)}
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl mb-1">💼</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.work)}</div>
                {renderStars(fortune.work)}
              </div>
            </div>

            {/* 행운 정보 */}
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-black text-orange-500">{fortune.luckyNumber}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t(texts.luckyNumber)}</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🎨</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {colorName[lang as keyof typeof colorName] || colorName.en}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t(texts.luckyColor)}</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🧭</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {directionName[lang as keyof typeof directionName] || directionName.en}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t(texts.luckyDirection)}</div>
                </div>
              </div>
            </div>

            {/* 조언 & 주의 */}
            <div className="p-6 space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <span className="font-bold text-green-700 dark:text-green-400">{t(texts.advice)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{fortune.adviceText}</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚠️</span>
                  <span className="font-bold text-orange-700 dark:text-orange-400">{t(texts.warning)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{fortune.warningText}</p>
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setState("input");
                setFortune(null);
              }}
              className="py-3 glass dark:bg-slate-800/80 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
            >
              {t(texts.retry)}
            </button>
            <Link href="/">
              <div className="py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-center">
                {t(texts.home)}
              </div>
            </Link>
          </div>
        </div>

        {/* 광고 */}
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <AdUnit />
        </div>
      </main>
    );
  }

  return null;
}

