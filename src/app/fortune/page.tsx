"use client";

import { useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import {
  generateFortuneWithLang,
  luckyColors,
  luckyDirections,
  overallDescriptions,
  fortuneComments,
} from "@/data/fortunes";
import { useIncrementPlay } from "@/hooks/useTestStats";
import AdUnit from "@/components/AdUnit";

type FortuneState = "input" | "opening" | "result";

export default function FortunePage() {
  const { lang } = useLanguage();
  const [state, setState] = useState<FortuneState>("input");
  const [name, setName] = useState("");
  // 생년월일 - 년/월/일 분리
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [fortune, setFortune] = useState<ReturnType<typeof generateFortuneWithLang> | null>(null);
  const [copied, setCopied] = useState(false);

  // 조회수 증가
  useIncrementPlay("fortune");
  
  // 년도 옵션 생성 (1920~현재년도)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 공유 텍스트
  const shareTexts = {
    share: { ko: "공유하기", en: "Share", zh: "分享", ja: "シェア" },
    saveImage: { ko: "이미지 저장", en: "Save Image", zh: "保存图片", ja: "画像保存" },
    copyLink: { ko: "링크 복사", en: "Copy Link", zh: "复制链接", ja: "リンクコピー" },
    copied: { ko: "복사됨!", en: "Copied!", zh: "已复制!", ja: "コピー!" },
    kakao: { ko: "카카오톡", en: "KakaoTalk", zh: "KakaoTalk", ja: "カカオトーク" },
  };

  // 링크 복사
  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 트위터 공유
  const handleTwitterShare = () => {
    const url = window.location.href;
    const overallStars = "★".repeat(fortune?.overall || 0) + "☆".repeat(5 - (fortune?.overall || 0));
    const text = lang === 'ko' 
      ? `🧧 오늘의 운세 (${overallStars})\n${name}님의 운세를 확인해보세요!`
      : lang === 'zh'
      ? `🧧 今日运势 (${overallStars})\n查看${name}的运势！`
      : lang === 'ja'
      ? `🧧 今日の運勢 (${overallStars})\n${name}さんの運勢をチェック！`
      : `🧧 Daily Fortune (${overallStars})\nCheck ${name}'s fortune!`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  // 카카오톡 공유 (링크 복사로 대체)
  const handleKakaoShare = () => {
    handleCopyLink();
  };

  // 네이티브 공유
  const handleNativeShare = async () => {
    const overallStars = "★".repeat(fortune?.overall || 0) + "☆".repeat(5 - (fortune?.overall || 0));
    const shareData = {
      title: lang === 'ko' ? '오늘의 운세' : lang === 'zh' ? '今日运势' : lang === 'ja' ? '今日の運勢' : 'Daily Fortune',
      text: lang === 'ko' 
        ? `🧧 ${name}님의 오늘의 운세 (${overallStars})`
        : `🧧 ${name}'s Fortune (${overallStars})`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      handleCopyLink();
    }
  };

  // 이미지 저장
  const handleSaveImage = async () => {
    if (!fortune) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#1e293b' : '#fafafa';
    const textColor = isDark ? '#f1f5f9' : '#1e293b';
    const subTextColor = isDark ? '#94a3b8' : '#64748b';
    
    const overallDesc = overallDescriptions[fortune.overall];
    const colorName = luckyColors[fortune.luckyColor];
    const directionName = luckyDirections[fortune.luckyDirection];
    const dateStr = new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    // 캡처용 div 생성
    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      position: fixed; left: -9999px; top: 0;
      width: 400px; padding: 40px;
      background: linear-gradient(135deg, ${isDark ? '#0f172a' : '#fff7ed'} 0%, ${isDark ? '#1e293b' : '#fef3c7'} 50%, ${isDark ? '#0f172a' : '#fff7ed'} 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${textColor};
    `;
    
    const renderStarsHTML = (count: number) => {
      return Array(5).fill(0).map((_, i) => 
        `<span style="color: ${i < count ? '#facc15' : (isDark ? '#475569' : '#cbd5e1')}; font-size: 18px;">★</span>`
      ).join('');
    };
    
    captureDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 64px; margin-bottom: 8px;">🧧</div>
        <div style="font-size: 24px; font-weight: 800; color: ${textColor};">${lang === 'ko' ? '오늘의 운세' : 'Daily Fortune'}</div>
        <div style="font-size: 14px; color: ${subTextColor}; margin-top: 4px;">${dateStr}</div>
        <div style="font-size: 16px; color: ${subTextColor}; margin-top: 8px;">${name}</div>
      </div>
      
      <div style="background: ${isDark ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.8)'}; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-weight: 700;">${lang === 'ko' ? '종합운' : 'Overall'}</span>
          <div>${renderStarsHTML(fortune.overall)}</div>
        </div>
        <div style="font-size: 14px; color: ${subTextColor};">${overallDesc[lang as keyof typeof overallDesc] || overallDesc.en}</div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div style="background: ${isDark ? 'rgba(234,179,8,0.2)' : 'rgba(254,249,195,1)'}; border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px;">💰</div>
          <div style="font-size: 12px; color: ${subTextColor};">${lang === 'ko' ? '재물운' : 'Wealth'}</div>
          <div style="margin: 8px 0;">${renderStarsHTML(fortune.wealth)}</div>
          <div style="font-size: 11px; color: ${isDark ? '#fcd34d' : '#a16207'};">${fortuneComments.wealth[fortune.wealth as keyof typeof fortuneComments.wealth]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || ''}</div>
        </div>
        <div style="background: ${isDark ? 'rgba(236,72,153,0.2)' : 'rgba(252,231,243,1)'}; border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px;">💕</div>
          <div style="font-size: 12px; color: ${subTextColor};">${lang === 'ko' ? '연애운' : 'Love'}</div>
          <div style="margin: 8px 0;">${renderStarsHTML(fortune.love)}</div>
          <div style="font-size: 11px; color: ${isDark ? '#f9a8d4' : '#9d174d'};">${fortuneComments.love[fortune.love as keyof typeof fortuneComments.love]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || ''}</div>
        </div>
        <div style="background: ${isDark ? 'rgba(34,197,94,0.2)' : 'rgba(220,252,231,1)'}; border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px;">💪</div>
          <div style="font-size: 12px; color: ${subTextColor};">${lang === 'ko' ? '건강운' : 'Health'}</div>
          <div style="margin: 8px 0;">${renderStarsHTML(fortune.health)}</div>
          <div style="font-size: 11px; color: ${isDark ? '#86efac' : '#166534'};">${fortuneComments.health[fortune.health as keyof typeof fortuneComments.health]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || ''}</div>
        </div>
        <div style="background: ${isDark ? 'rgba(59,130,246,0.2)' : 'rgba(219,234,254,1)'}; border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 24px;">💼</div>
          <div style="font-size: 12px; color: ${subTextColor};">${lang === 'ko' ? '직장/학업운' : 'Work'}</div>
          <div style="margin: 8px 0;">${renderStarsHTML(fortune.work)}</div>
          <div style="font-size: 11px; color: ${isDark ? '#93c5fd' : '#1e40af'};">${fortuneComments.work[fortune.work as keyof typeof fortuneComments.work]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || ''}</div>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-around; background: ${isDark ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.8)'}; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 800; color: #f97316;">${fortune.luckyNumber}</div>
          <div style="font-size: 10px; color: ${subTextColor};">${lang === 'ko' ? '행운의 숫자' : 'Lucky #'}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px;">🎨</div>
          <div style="font-size: 12px; font-weight: 600;">${colorName[lang as keyof typeof colorName] || colorName.en}</div>
          <div style="font-size: 10px; color: ${subTextColor};">${lang === 'ko' ? '행운의 색상' : 'Color'}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px;">🧭</div>
          <div style="font-size: 12px; font-weight: 600;">${directionName[lang as keyof typeof directionName] || directionName.en}</div>
          <div style="font-size: 10px; color: ${subTextColor};">${lang === 'ko' ? '행운의 방향' : 'Direction'}</div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid ${isDark ? '#334155' : '#e2e8f0'};">
        <div style="font-size: 12px; color: ${subTextColor};">Check Me Today</div>
      </div>
    `;
    
    document.body.appendChild(captureDiv);
    
    try {
      const canvas = await html2canvas(captureDiv, {
        scale: 3,
        backgroundColor: bgColor,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      const today = new Date().toISOString().split('T')[0];
      link.download = `fortune-${name}-${today}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert(lang === 'ko' ? '이미지 저장에 실패했습니다.' : 'Failed to save image.');
    } finally {
      document.body.removeChild(captureDiv);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthYear || !birthMonth || !birthDay) return;
    
    // 복주머니 애니메이션 시작
    setState("opening");
    
    // 생년월일 조합 (YYYY-MM-DD)
    const birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
    
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

              {/* 생년월일 - 년/월/일 선택 */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                  {t(texts.birthDate)}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* 년도 */}
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
                    required
                  >
                    <option value="">{lang === 'ko' ? '년' : lang === 'zh' ? '年' : lang === 'ja' ? '年' : 'Year'}</option>
                    {years.map((y) => (
                      <option key={y} value={y.toString()}>{y}</option>
                    ))}
                  </select>
                  {/* 월 */}
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
                    required
                  >
                    <option value="">{lang === 'ko' ? '월' : lang === 'zh' ? '月' : lang === 'ja' ? '月' : 'Mon'}</option>
                    {months.map((m) => (
                      <option key={m} value={m.toString()}>{m}</option>
                    ))}
                  </select>
                  {/* 일 */}
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
                    required
                  >
                    <option value="">{lang === 'ko' ? '일' : lang === 'zh' ? '日' : lang === 'ja' ? '日' : 'Day'}</option>
                    {days.map((d) => (
                      <option key={d} value={d.toString()}>{d}</option>
                    ))}
                  </select>
                </div>
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
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.wealth)}</div>
                {renderStars(fortune.wealth)}
                <div className="mt-2 text-xs font-medium text-yellow-700 dark:text-yellow-300">
                  {fortuneComments.wealth[fortune.wealth as keyof typeof fortuneComments.wealth]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || fortuneComments.wealth[fortune.wealth as keyof typeof fortuneComments.wealth]?.en}
                </div>
              </div>
              <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <div className="text-2xl mb-1">💕</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.love)}</div>
                {renderStars(fortune.love)}
                <div className="mt-2 text-xs font-medium text-pink-700 dark:text-pink-300">
                  {fortuneComments.love[fortune.love as keyof typeof fortuneComments.love]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || fortuneComments.love[fortune.love as keyof typeof fortuneComments.love]?.en}
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl mb-1">💪</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.health)}</div>
                {renderStars(fortune.health)}
                <div className="mt-2 text-xs font-medium text-green-700 dark:text-green-300">
                  {fortuneComments.health[fortune.health as keyof typeof fortuneComments.health]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || fortuneComments.health[fortune.health as keyof typeof fortuneComments.health]?.en}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl mb-1">💼</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t(texts.work)}</div>
                {renderStars(fortune.work)}
                <div className="mt-2 text-xs font-medium text-blue-700 dark:text-blue-300">
                  {fortuneComments.work[fortune.work as keyof typeof fortuneComments.work]?.[lang as 'ko' | 'en' | 'zh' | 'ja'] || fortuneComments.work[fortune.work as keyof typeof fortuneComments.work]?.en}
                </div>
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

          {/* 공유 버튼 그룹 */}
          <div className="mb-4">
            {/* 메인 공유 버튼 */}
            <button
              onClick={handleNativeShare}
              className="w-full py-3 mb-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t(shareTexts.share)} 🎉
            </button>

            {/* 공유 옵션 그리드 (4열) */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleSaveImage}
                className="py-3 px-2 glass dark:bg-slate-800/80 rounded-xl text-center hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="text-xl mb-1">📷</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{t(shareTexts.saveImage)}</div>
              </button>
              <button
                onClick={handleCopyLink}
                className="py-3 px-2 glass dark:bg-slate-800/80 rounded-xl text-center hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="text-xl mb-1">{copied ? "✅" : "🔗"}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{copied ? t(shareTexts.copied) : t(shareTexts.copyLink)}</div>
              </button>
              <button
                onClick={handleTwitterShare}
                className="py-3 px-2 glass dark:bg-slate-800/80 rounded-xl text-center hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="text-xl mb-1">𝕏</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">Twitter</div>
              </button>
              <button
                onClick={handleKakaoShare}
                className="py-3 px-2 glass dark:bg-slate-800/80 rounded-xl text-center hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="text-xl mb-1">💬</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{t(shareTexts.kakao)}</div>
              </button>
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
