"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import { 
  animalQuestions, 
  calculateAnimalScores, 
  determineAnimalResult,
  getOptionFeedback,
  AnimalResult 
} from "@/data/animal-test";
import { useIncrementPlay } from "@/hooks/useTestStats";
import AdUnit from "@/components/AdUnit";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";

type PageState = "landing" | "quiz" | "analyzing" | "result";

export default function AnimalTestPage() {
  const { lang } = useLanguage();
  const [state, setState] = useState<PageState>("landing");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AnimalResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressAnimalIndex, setProgressAnimalIndex] = useState(0);
  const [isAnimalFading, setIsAnimalFading] = useState(false);
  
  // 프로그레스 바 동물 이모지 & 색상 배열
  const animalData = [
    { emoji: '🦊', color: '#FF6B35', name: 'fox' },      // 여우 - 주황
    { emoji: '🐺', color: '#607D8B', name: 'wolf' },     // 늑대 - 회색
    { emoji: '🐱', color: '#9C27B0', name: 'cat' },      // 고양이 - 보라
    { emoji: '🐕', color: '#8D6E63', name: 'dog' },      // 강아지 - 갈색
    { emoji: '🐻', color: '#795548', name: 'bear' },     // 곰 - 진갈색
    { emoji: '🐰', color: '#E91E63', name: 'rabbit' },   // 토끼 - 핑크
    { emoji: '🦉', color: '#4A148C', name: 'owl' },      // 부엉이 - 진보라
    { emoji: '🐬', color: '#00BCD4', name: 'dolphin' },  // 돌고래 - 청록
  ];

  // 프로그레스 바 동물 이모지 순환 (페이드 효과 포함)
  // 버그 수정: setTimeout ID를 추적하여 cleanup 시 정리
  useEffect(() => {
    if (state === "quiz") {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      
      const interval = setInterval(() => {
        // 먼저 페이드 아웃
        setIsAnimalFading(true);
        
        // 기존 타임아웃이 있으면 정리
        if (timeoutId) clearTimeout(timeoutId);
        
        // 0.3초 후 동물 변경 & 페이드 인
        timeoutId = setTimeout(() => {
          setProgressAnimalIndex((prev) => (prev + 1) % animalData.length);
          setIsAnimalFading(false);
        }, 300);
      }, 2000); // 2초마다 변경
      
      // cleanup: interval과 pending timeout 모두 정리
      return () => {
        clearInterval(interval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [state, animalData.length]);

  // 조회수 증가
  useIncrementPlay("animal-self");

  const texts = {
    title: { ko: "나의 동물 자아", en: "My Animal Self", zh: "我的动物自我", ja: "私の動物キャラ" },
    subtitle: { 
      ko: "내 안에 숨어있는 동물은?", 
      en: "What animal lives inside you?",
      zh: "你内心深处住着什么动物？",
      ja: "あなたの中に隠れている動物は？"
    },
    description: {
      ko: "동물 행동 습성을 기반으로 분석하는 심리 테스트! 여우의 영리함, 늑대의 리더십, 고양이의 독립심... 당신과 가장 닮은 동물을 찾아보세요.",
      en: "A psychology test based on animal behavior! Fox's cleverness, Wolf's leadership, Cat's independence... Find the animal that resembles you most.",
      zh: "基于动物行为习性的心理测试！狐狸的聪明、狼的领导力、猫的独立性...找到最像你的动物。",
      ja: "動物の行動習性に基づく心理テスト！キツネの賢さ、オオカミのリーダーシップ、猫の独立心...あなたに最も似た動物を見つけましょう。"
    },
    start: { ko: "테스트 시작하기", en: "Start Test", zh: "开始测试", ja: "テスト開始" },
    step: { ko: "질문", en: "Question", zh: "问题", ja: "質問" },
    analyzing: {
      ko: "당신의 동물 자아를 찾고 있습니다...",
      en: "Finding your animal self...",
      zh: "正在寻找你的动物自我...",
      ja: "あなたの動物キャラを探しています..."
    },
    yourAnimal: { ko: "당신의 동물 자아", en: "Your Animal Self", zh: "你的动物自我", ja: "あなたの動物キャラ" },
    traits: { ko: "성격 특성", en: "Personality Traits", zh: "性格特征", ja: "性格特性" },
    strengths: { ko: "강점", en: "Strengths", zh: "优势", ja: "強み" },
    weaknesses: { ko: "약점", en: "Weaknesses", zh: "弱点", ja: "弱み" },
    compatibility: { ko: "잘 맞는 동물", en: "Compatible Animals", zh: "相合动物", ja: "相性の良い動物" },
    habitat: { ko: "서식지", en: "Habitat", zh: "栖息地", ja: "生息地" },
    advice: { ko: "동물의 조언", en: "Animal's Advice", zh: "动物的建议", ja: "動物からのアドバイス" },
    retry: { ko: "다시 하기", en: "Try Again", zh: "重新测试", ja: "もう一度" },
    home: { ko: "홈으로", en: "Home", zh: "首页", ja: "ホームへ" },
    share: { ko: "공유하기", en: "Share", zh: "分享", ja: "シェア" },
    saveImage: { ko: "이미지 저장", en: "Save Image", zh: "保存图片", ja: "画像保存" },
    copyLink: { ko: "링크 복사", en: "Copy Link", zh: "复制链接", ja: "リンクコピー" },
    copied: { ko: "복사됨!", en: "Copied!", zh: "已复制!", ja: "コピー!" },
  };

  const t = (obj: Record<string, string>) => obj[lang] || obj.en;

  const currentQuestion = animalQuestions[currentStep];
  const progress = ((currentStep + 1) / animalQuestions.length) * 100;

  // 옵션 선택
  const handleSelect = (optionId: string) => {
    if (isTransitioning) return; // 연속 클릭 방지
    
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);
    setIsTransitioning(true);
    
    // 피드백 표시
    const feedback = getOptionFeedback(currentQuestion.id, optionId, lang);
    setSelectedFeedback(feedback);

    // 피드백을 1.5초 보여준 후 다음으로 이동
    setTimeout(() => {
      setSelectedFeedback(null);
      setIsTransitioning(false);
      
      if (currentStep < animalQuestions.length - 1) {
        // 다음 질문으로
        setCurrentStep(currentStep + 1);
      } else {
        // 분석 화면으로
        setState("analyzing");
        setTimeout(() => {
          const scores = calculateAnimalScores(newAnswers);
          const animalResult = determineAnimalResult(scores);
          setResult(animalResult);
          setState("result");
        }, 3500);
      }
    }, 1500);
  };

  // 공유 기능들
  const handleCopyLink = async () => {
    if (!(await copyToClipboard(window.location.href))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = lang === 'ko'
      ? `🦊 나의 동물 자아: ${result?.animal.ko} ${result?.emoji}\n${result?.title.ko}`
      : `🦊 My Animal Self: ${result?.animal.en} ${result?.emoji}\n${result?.title.en}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: lang === 'ko' ? '나의 동물 자아' : 'My Animal Self',
      text: `${result?.animal[lang] || result?.animal.en} ${result?.emoji}: ${result?.title[lang] || result?.title.en}`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      handleCopyLink();
    }
  };

  // 카카오톡 공유 (Kakao SDK 피드 메시지, 키가 없으면 링크 복사로 폴백)
  const handleKakaoShare = () => {
    const animalName = result?.animal[lang] || result?.animal.en || '';
    const sent = shareKakaoFeed({
      title: lang === 'ko'
        ? `나의 동물 자아: ${animalName} ${result?.emoji ?? ''}`
        : `My Animal Self: ${animalName} ${result?.emoji ?? ''}`,
      description: result?.title[lang] || result?.title.en || '',
      emoji: result?.emoji || '🦊',
      buttonTitle: lang === 'ko' ? '결과 보기' : 'View Result',
    });
    if (!sent) handleCopyLink();
  };

  const handleSaveImage = async () => {
    if (!result) return;

    const isDark = document.documentElement.classList.contains('dark');
    
    // 숲/자연 테마 색상
    const bgGradient = isDark 
      ? 'linear-gradient(180deg, #1a2f1a 0%, #0f1f0f 100%)'
      : 'linear-gradient(180deg, #f0f7e9 0%, #d4e7c5 100%)';
    const bgColor = isDark ? '#1a2f1a' : '#f0f7e9';
    const textColor = isDark ? '#e8f5e0' : '#2d4a2d';
    const subTextColor = isDark ? '#a8c49a' : '#5a7a5a';
    const accentColor = result.color;
    const cardBg = isDark ? 'rgba(30, 50, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const cardBorder = isDark ? 'rgba(100, 150, 80, 0.3)' : 'rgba(80, 120, 60, 0.2)';

    // 특성 태그 HTML 생성
    const traitsHtml = (result.traits[lang] || result.traits.en)
      .map(trait => `<span style="display: inline-block; padding: 6px 14px; margin: 4px; background: ${accentColor}22; color: ${accentColor}; border-radius: 20px; font-size: 13px; border: 1px solid ${accentColor}44;">${trait}</span>`)
      .join('');

    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      position: fixed; left: -9999px; top: 0;
      width: 420px;
      background: ${bgGradient};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${textColor};
    `;

    captureDiv.innerHTML = `
      <!-- 상단 헤더 -->
      <div style="background: linear-gradient(135deg, ${result.color}dd 0%, ${result.color}99 100%); padding: 32px 24px; text-align: center;">
        <div style="font-size: 16px; color: rgba(255,255,255,0.9); letter-spacing: 4px; margin-bottom: 12px;">🌿 MY ANIMAL SELF 🌿</div>
        <div style="font-size: 100px; margin: 16px 0;">${result.emoji}</div>
        <div style="font-size: 40px; font-weight: 700; color: #fff;">
          ${result.animal[lang] || result.animal.en}
        </div>
      </div>
      
      <!-- 본문 -->
      <div style="padding: 28px;">
        <!-- 제목 & 부제 -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 26px; font-weight: 700; color: ${textColor}; margin-bottom: 10px;">
            ${result.title[lang] || result.title.en}
          </div>
          <div style="font-size: 16px; color: ${subTextColor};">
            ${result.subtitle[lang] || result.subtitle.en}
          </div>
        </div>

        <!-- 설명 텍스트 -->
        <div style="background: ${cardBg}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${cardBorder};">
          <div style="font-size: 15px; color: ${textColor}; line-height: 1.8;">
            ${result.description[lang] || result.description.en}
          </div>
        </div>

        <!-- 특성 태그 -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 16px; font-weight: 700; color: ${accentColor}; margin-bottom: 14px;">🐾 ${t(texts.traits)}</div>
          <div style="text-align: center;">
            ${traitsHtml}
          </div>
        </div>

        <!-- 궁합 & 서식지 -->
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <div style="flex: 1; background: ${cardBg}; border-radius: 12px; padding: 16px; text-align: center; border: 1px solid ${cardBorder};">
            <div style="font-size: 24px; margin-bottom: 6px;">💕</div>
            <div style="font-size: 14px; font-weight: 600; color: ${textColor};">${result.compatibility[lang] || result.compatibility.en}</div>
            <div style="font-size: 12px; color: ${subTextColor};">${t(texts.compatibility)}</div>
          </div>
          <div style="flex: 1; background: ${cardBg}; border-radius: 12px; padding: 16px; text-align: center; border: 1px solid ${cardBorder};">
            <div style="font-size: 24px; margin-bottom: 6px;">🏡</div>
            <div style="font-size: 14px; font-weight: 600; color: ${textColor};">${result.habitat[lang] || result.habitat.en}</div>
            <div style="font-size: 12px; color: ${subTextColor};">${t(texts.habitat)}</div>
          </div>
        </div>

        <!-- 조언 -->
        <div style="background: ${isDark ? 'rgba(40, 60, 40, 0.8)' : 'rgba(230, 245, 220, 0.8)'}; border-radius: 12px; padding: 20px; border: 1px solid ${cardBorder};">
          <div style="font-size: 15px; font-weight: 700; color: ${accentColor}; margin-bottom: 10px;">💬 ${t(texts.advice)}</div>
          <div style="font-size: 15px; color: ${isDark ? '#a8c49a' : '#3d5a3d'}; line-height: 1.7; font-style: italic;">
            "${result.advice[lang] || result.advice.en}"
          </div>
        </div>
      </div>
      
      <!-- 푸터 -->
      <div style="text-align: center; padding: 20px; border-top: 1px solid ${cardBorder};">
        <div style="font-size: 14px; color: ${subTextColor}; letter-spacing: 2px;">✨ check-me.today</div>
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
      link.download = `animal-self-${result.id}-${today}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
    } finally {
      document.body.removeChild(captureDiv);
    }
  };

  // 랜딩 페이지
  if (state === "landing") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 dark:from-[#0a1a0a] dark:via-[#0f2510] dark:to-[#0a1f0f] py-10 px-4">
        <div className="max-w-md mx-auto">
          {/* 뒤로가기 */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-white/60 dark:bg-green-900/40 backdrop-blur-sm flex items-center justify-center text-green-700 dark:text-green-300 hover:bg-white/80 dark:hover:bg-green-900/60 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          {/* 메인 비주얼 */}
          <div className="text-center mb-10">
            {/* 숲 장식 */}
            <div className="mb-4 text-3xl tracking-widest">
              🌲🌳🌿🍃🌲
            </div>
            
            {/* 동물 아이콘 그룹 */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              {/* 중앙 큰 동물 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-orange-400/40 flex items-center justify-center ring-4 ring-white/50 dark:ring-green-800/50">
                  <span className="text-6xl animate-bounce">🦊</span>
                </div>
              </div>
              {/* 주변 작은 동물들 */}
              <div className="absolute -left-2 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl">🐺</span>
              </div>
              <div className="absolute -right-2 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg animate-pulse delay-100">
                <span className="text-2xl">🐱</span>
              </div>
              <div className="absolute -left-4 bottom-4 w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg animate-pulse delay-200">
                <span className="text-xl">🐻</span>
              </div>
              <div className="absolute -right-4 bottom-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg animate-pulse delay-300">
                <span className="text-xl">🐬</span>
              </div>
            </div>

            <h1 className="text-4xl font-black text-green-800 dark:text-green-100 mb-3">
              {t(texts.title)}
            </h1>
            <p className="text-xl font-medium text-amber-600 dark:text-amber-400 mb-3">
              {t(texts.subtitle)}
            </p>
            <p className="text-base text-green-700 dark:text-green-300 break-keep leading-relaxed">
              {t(texts.description)}
            </p>
          </div>

          {/* 동물 소개 카드 */}
          <div className="bg-white/70 dark:bg-green-900/40 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border border-green-200/50 dark:border-green-700/30">
            <div className="grid grid-cols-4 gap-3 mb-6">
              {['🦊', '🐺', '🐱', '🐕', '🐻', '🐰', '🦉', '🐬'].map((emoji, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-800 dark:to-emerald-900 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🐾</span>
                <div>
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-100">
                    {lang === 'ko' ? '행동 습성 기반 분석' : lang === 'zh' ? '基于行为习性分析' : lang === 'ja' ? '行動習性に基づく分析' : 'Behavior-Based Analysis'}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {lang === 'ko' ? '실제 동물들의 행동 패턴을 기반으로 분석' : 
                     lang === 'zh' ? '基于真实动物的行为模式分析' :
                     lang === 'ja' ? '実際の動物の行動パターンに基づいて分析' :
                     'Analysis based on real animal behavior patterns'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">🧠</span>
                <div>
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-100">
                    {lang === 'ko' ? '8가지 동물 유형' : lang === 'zh' ? '8种动物类型' : lang === 'ja' ? '8種類の動物タイプ' : '8 Animal Types'}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {lang === 'ko' ? '여우, 늑대, 고양이, 강아지, 곰, 토끼, 부엉이, 돌고래' :
                     lang === 'zh' ? '狐狸、狼、猫、狗、熊、兔子、猫头鹰、海豚' :
                     lang === 'ja' ? 'キツネ、オオカミ、猫、犬、クマ、ウサギ、フクロウ、イルカ' :
                     'Fox, Wolf, Cat, Dog, Bear, Rabbit, Owl, Dolphin'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📝</span>
                <div>
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-100">
                    {lang === 'ko' ? '12가지 질문' : lang === 'zh' ? '12个问题' : lang === 'ja' ? '12の質問' : '12 Questions'}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {lang === 'ko' ? '사회성, 영역, 활동 패턴, 방어 행동 등 분석' :
                     lang === 'zh' ? '分析社交、领地、活动模式、防御行为等' :
                     lang === 'ja' ? '社会性、縄張り、活動パターン、防御行動などを分析' :
                     'Analyze sociability, territory, activity patterns, defense behavior'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={() => setState("quiz")}
            className="w-full py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span>🐾</span>
            <span>{t(texts.start)}</span>
            <span>→</span>
          </button>

          {/* 면책 */}
          <p className="mt-6 text-center text-sm text-green-500 dark:text-green-400">
            {lang === 'ko' ? '※ 본 테스트는 재미를 위한 것으로, 실제 성격을 완전히 반영하지 않습니다.' :
             lang === 'zh' ? '※ 本测试仅供娱乐，不完全反映真实性格。' :
             lang === 'ja' ? '※ このテストは娯楽目的であり、実際の性格を完全に反映するものではありません。' :
             '※ This test is for entertainment and may not fully reflect actual personality.'}
          </p>
        </div>
      </main>
    );
  }

  // 퀴즈 페이지
  if (state === "quiz") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 dark:from-[#0a1a0a] dark:via-[#0f2510] dark:to-[#0a1f0f] py-10 px-4">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                } else {
                  setState("landing");
                }
              }}
              className="w-12 h-12 rounded-full bg-white/60 dark:bg-green-900/40 backdrop-blur-sm flex items-center justify-center text-green-700 dark:text-green-300 hover:bg-white/80 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-base text-green-600 dark:text-green-300 font-medium">
              {t(texts.step)} {currentStep + 1} / {animalQuestions.length}
            </div>
          </div>

          {/* 프로그레스 바 */}
          <div className="relative h-6 bg-green-200/50 dark:bg-green-800/50 rounded-full mb-8 overflow-hidden shadow-inner">
            {/* 발자국 장식 */}
            <div className="absolute inset-0 flex items-center justify-around opacity-20">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="text-xs">🐾</span>
              ))}
            </div>
            {/* 프로그레스 바 - 색상이 서서히 변하는 효과 */}
            <div
              className="h-full rounded-full relative overflow-hidden"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${animalData[progressAnimalIndex].color}99 0%, ${animalData[progressAnimalIndex].color} 100%)`,
                transition: 'width 0.5s ease, background 0.8s ease-in-out',
                boxShadow: `0 0 10px ${animalData[progressAnimalIndex].color}66`
              }}
            >
              {/* 빛나는 효과 */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              {/* 동물 이모지 - 페이드 인/아웃 효과 */}
              <span 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-lg drop-shadow-md"
                style={{
                  opacity: isAnimalFading ? 0 : 1,
                  transform: `translateY(-50%) scale(${isAnimalFading ? 0.5 : 1})`,
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}
              >
                {animalData[progressAnimalIndex].emoji}
              </span>
            </div>
          </div>

          {/* 질문 카드 */}
          <div className="bg-white/80 dark:bg-green-900/50 backdrop-blur-md rounded-2xl p-8 mb-6 shadow-xl border border-green-200/50 dark:border-green-700/30 animate-fade-in">
            {/* 카테고리 표시 */}
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-800 rounded-full text-sm text-green-700 dark:text-green-200 font-medium">
                {currentQuestion.category === 'social' ? '🤝 사회성' :
                 currentQuestion.category === 'territory' ? '🏠 영역' :
                 currentQuestion.category === 'activity' ? '⚡ 활동' :
                 currentQuestion.category === 'hunting' ? '🎯 목표 추구' :
                 currentQuestion.category === 'defense' ? '🛡️ 방어' :
                 currentQuestion.category === 'communication' ? '💬 소통' :
                 currentQuestion.category === 'play' ? '🎮 놀이' :
                 currentQuestion.category === 'loyalty' ? '💕 유대' :
                 currentQuestion.category === 'adaptation' ? '🌍 적응' :
                 currentQuestion.category === 'leadership' ? '👑 리더십' :
                 currentQuestion.category === 'curiosity' ? '🔍 호기심' :
                 '🧬 본능'}
              </span>
            </div>

            {/* 질문 */}
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 text-center mb-8 break-keep">
              {currentQuestion.question[lang] || currentQuestion.question.en}
            </h2>

            {/* 선택지들 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={isTransitioning}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    answers[currentQuestion.id] === option.id
                      ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-500 shadow-lg scale-[1.02]'
                      : isTransitioning 
                        ? 'bg-white/30 dark:bg-green-800/20 border-green-200/30 dark:border-green-700/20 opacity-50'
                        : 'bg-white/50 dark:bg-green-800/30 border-green-200/50 dark:border-green-700/30 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-700/50 flex items-center justify-center text-green-700 dark:text-green-200 font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <div className="text-base font-medium text-green-800 dark:text-green-100 break-keep pt-1">
                      {option.text[lang] || option.text.en}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 피드백 메시지 */}
          {selectedFeedback && (
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 mb-4 shadow-lg animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">💭</span>
                <p className="text-white font-medium text-lg break-keep">
                  {selectedFeedback}
                </p>
              </div>
            </div>
          )}

          {/* 힌트 */}
          {!selectedFeedback && (
            <p className="text-center text-sm text-green-500 dark:text-green-400">
              {lang === 'ko' ? '✨ 직감적으로 선택해보세요!' :
               lang === 'zh' ? '✨ 凭直觉选择吧！' :
               lang === 'ja' ? '✨ 直感で選んでみてください！' :
               '✨ Choose intuitively!'}
            </p>
          )}
        </div>
      </main>
    );
  }

  // 분석 중 페이지
  if (state === "analyzing") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 dark:from-[#0a1a0a] dark:via-[#0f2510] dark:to-[#0a1f0f] flex items-center justify-center px-4">
        <div className="text-center">
          {/* 동물 아이콘 애니메이션 */}
          <div className="relative w-56 h-56 mx-auto mb-8">
            {/* 중앙 물음표 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-orange-400/50 animate-pulse">
                <span className="text-6xl">❓</span>
              </div>
            </div>
            {/* 회전하는 동물들 */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl">🦊</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl">🐺</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl">🐱</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl">🐕</div>
            </div>
            <div className="absolute inset-4 animate-spin-reverse-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl">🐻</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl">🐰</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl">🦉</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl">🐬</div>
            </div>
          </div>

          {/* 분석 중 텍스트 */}
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-3">
            {t(texts.analyzing)}
          </h2>
          
          <p className="text-green-600 dark:text-green-300 text-lg mb-6">
            {lang === 'ko' ? '🌲 숲 속에서 동물 자아를 찾는 중...' : 
             lang === 'zh' ? '🌲 在森林中寻找动物自我...' : 
             lang === 'ja' ? '🌲 森の中で動物の自我を探しています...' : 
             '🌲 Searching for your animal self in the forest...'}
          </p>

          {/* 로딩 바 */}
          <div className="w-80 mx-auto h-3 bg-green-200/50 dark:bg-green-800/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              style={{ animation: 'loading 3.5s ease-in-out forwards' }}
            />
          </div>

          {/* 발자국 애니메이션 */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className="text-2xl opacity-0"
                style={{ 
                  animation: 'fadeIn 0.3s ease-in-out forwards',
                  animationDelay: `${i * 0.5}s`
                }}
              >
                🐾
              </span>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}</style>
      </main>
    );
  }

  // 결과 페이지
  if (state === "result" && result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 dark:from-[#0a1a0a] dark:via-[#0f2510] dark:to-[#0a1f0f] py-10 px-4 pb-32">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="w-12 h-12 rounded-full bg-white/60 dark:bg-green-900/40 backdrop-blur-sm flex items-center justify-center text-green-700 dark:text-green-300 hover:bg-white/80 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-base text-green-600 dark:text-green-300 font-medium">
              {t(texts.yourAnimal)}
            </div>
          </div>

          {/* 메인 결과 카드 */}
          <div className="bg-white/80 dark:bg-green-900/50 backdrop-blur-md rounded-2xl overflow-hidden mb-6 shadow-xl border border-green-200/50 dark:border-green-700/30 animate-slide-up">
            {/* 상단 배너 */}
            <div 
              className="p-8 text-center"
              style={{ background: `linear-gradient(135deg, ${result.color}dd 0%, ${result.color}99 100%)` }}
            >
              <div className="text-white/90 text-sm tracking-[4px] mb-2">🌿 MY ANIMAL SELF 🌿</div>
              <div className="text-8xl mb-4 animate-bounce">{result.emoji}</div>
              <div className="text-4xl font-bold text-white">
                {result.animal[lang] || result.animal.en}
              </div>
            </div>

            {/* 결과 내용 */}
            <div className="p-6 space-y-6">
              {/* 제목 & 부제 */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-2">
                  {result.title[lang] || result.title.en}
                </h1>
                <p className="text-lg text-green-600 dark:text-green-300">
                  {result.subtitle[lang] || result.subtitle.en}
                </p>
              </div>

              {/* 설명 */}
              <div className="bg-green-50/80 dark:bg-green-800/30 rounded-xl p-5">
                <p className="text-green-700 dark:text-green-200 text-base leading-relaxed break-keep">
                  {result.description[lang] || result.description.en}
                </p>
              </div>

              {/* 특성 태그 */}
              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: result.color }}>
                  <span>🐾</span> {t(texts.traits)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(result.traits[lang] || result.traits.en).map((trait, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${result.color}22`,
                        color: result.color,
                        border: `1px solid ${result.color}44`
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* 강점 & 약점 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50/80 dark:bg-green-800/30 rounded-xl p-4">
                  <h4 className="text-green-700 dark:text-green-300 font-bold mb-2 flex items-center gap-1">
                    <span>💪</span> {t(texts.strengths)}
                  </h4>
                  <ul className="text-sm text-green-600 dark:text-green-200 space-y-1">
                    {(result.strengths[lang] || result.strengths.en).map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50/80 dark:bg-amber-900/20 rounded-xl p-4">
                  <h4 className="text-amber-700 dark:text-amber-300 font-bold mb-2 flex items-center gap-1">
                    <span>⚠️</span> {t(texts.weaknesses)}
                  </h4>
                  <ul className="text-sm text-amber-600 dark:text-amber-200 space-y-1">
                    {(result.weaknesses[lang] || result.weaknesses.en).map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 궁합 & 서식지 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50/80 dark:bg-pink-900/20 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💕</div>
                  <div className="text-base font-bold text-pink-700 dark:text-pink-300">
                    {result.compatibility[lang] || result.compatibility.en}
                  </div>
                  <div className="text-sm text-pink-500">{t(texts.compatibility)}</div>
                </div>
                <div className="bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🏡</div>
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300 break-keep">
                    {result.habitat[lang] || result.habitat.en}
                  </div>
                  <div className="text-sm text-emerald-500">{t(texts.habitat)}</div>
                </div>
              </div>

              {/* 조언 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: result.color }}>
                  💬 {t(texts.advice)}
                </h3>
                <p className="text-amber-700 dark:text-amber-200 text-base leading-relaxed break-keep italic">
                  &quot;{result.advice[lang] || result.advice.en}&quot;
                </p>
              </div>
            </div>
          </div>

          {/* 공유 버튼 그룹 */}
          <div className="mb-4">
            <button
              onClick={handleNativeShare}
              className="w-full py-4 mb-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t(texts.share)} 🎉
            </button>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleSaveImage}
                className="py-4 px-2 bg-white/70 dark:bg-green-900/40 backdrop-blur-sm rounded-xl text-center hover:bg-white/90 dark:hover:bg-green-900/60 transition-colors shadow-lg"
              >
                <div className="text-2xl mb-1">📷</div>
                <div className="text-xs text-green-700 dark:text-green-300">{t(texts.saveImage)}</div>
              </button>
              <button
                onClick={handleCopyLink}
                className="py-4 px-2 bg-white/70 dark:bg-green-900/40 backdrop-blur-sm rounded-xl text-center hover:bg-white/90 dark:hover:bg-green-900/60 transition-colors shadow-lg"
              >
                <div className="text-2xl mb-1">{copied ? "✅" : "🔗"}</div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  {copied ? t(texts.copied) : t(texts.copyLink)}
                </div>
              </button>
              <button
                onClick={handleTwitterShare}
                className="py-4 px-2 bg-white/70 dark:bg-green-900/40 backdrop-blur-sm rounded-xl text-center hover:bg-white/90 dark:hover:bg-green-900/60 transition-colors shadow-lg"
              >
                <div className="text-2xl mb-1">𝕏</div>
                <div className="text-xs text-green-700 dark:text-green-300">Twitter</div>
              </button>
              <button
                onClick={handleKakaoShare}
                className="py-4 px-2 bg-white/70 dark:bg-green-900/40 backdrop-blur-sm rounded-xl text-center hover:bg-white/90 dark:hover:bg-green-900/60 transition-colors shadow-lg"
              >
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  {lang === 'ko' ? '카카오톡' : 'Kakao'}
                </div>
              </button>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setState("landing");
                setCurrentStep(0);
                setAnswers({});
                setResult(null);
              }}
              className="py-4 bg-white/70 dark:bg-green-900/40 backdrop-blur-sm rounded-xl font-bold text-lg text-green-700 dark:text-green-300 hover:bg-white/90 dark:hover:bg-green-900/60 transition-colors shadow-lg"
            >
              {t(texts.retry)}
            </button>
            <Link href="/">
              <div className="py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-lg text-center shadow-lg hover:shadow-xl transition-all">
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
