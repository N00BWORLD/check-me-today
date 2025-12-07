"use client";

import { useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import { 
  faceFeatures, 
  calculateFaceReading, 
  FaceReadingResult,
  featureInterpretations 
} from "@/data/face-reading";
import { useIncrementPlay } from "@/hooks/useTestStats";
import AdUnit from "@/components/AdUnit";

type PageState = "landing" | "quiz" | "analyzing" | "result";

export default function FaceReadingPage() {
  const { lang } = useLanguage();
  const [state, setState] = useState<PageState>("landing");
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FaceReadingResult | null>(null);
  const [copied, setCopied] = useState(false);

  // 조회수 증가
  useIncrementPlay("face-reading");

  const texts = {
    title: { ko: "관상 분석", en: "Face Reading", zh: "面相分析", ja: "人相占い" },
    subtitle: { 
      ko: "동양 전통 관상학으로 보는 나의 얼굴", 
      en: "Your face through Eastern physiognomy",
      zh: "用东方传统面相学看你的脸",
      ja: "東洋伝統の人相学で見るあなたの顔"
    },
    description: {
      ko: "마의상서(麻衣相書)와 신상전편(神相全篇) 등 동양 고전에 기반한 관상 분석",
      en: "Face analysis based on ancient Eastern texts like Mayi Xiangfa",
      zh: "基于《麻衣相书》《神相全篇》等东方古籍的面相分析",
      ja: "麻衣相書や神相全篇など東洋の古典に基づく人相分析"
    },
    start: { ko: "관상 보기", en: "Read My Face", zh: "看面相", ja: "人相を見る" },
    step: { ko: "단계", en: "Step", zh: "步骤", ja: "ステップ" },
    analyzing: {
      ko: "관상을 분석하고 있습니다...",
      en: "Analyzing your features...",
      zh: "正在分析您的面相...",
      ja: "人相を分析しています..."
    },
    yourType: { ko: "당신의 관상", en: "Your Face Reading", zh: "你的面相", ja: "あなたの人相" },
    strengths: { ko: "강점", en: "Strengths", zh: "优势", ja: "強み" },
    advice: { ko: "관상가의 조언", en: "Advice", zh: "相师建议", ja: "アドバイス" },
    luckyInfo: { ko: "행운 정보", en: "Lucky Info", zh: "幸运信息", ja: "ラッキー情報" },
    luckyColor: { ko: "행운의 색", en: "Lucky Color", zh: "幸运色", ja: "ラッキーカラー" },
    luckyDirection: { ko: "길방", en: "Lucky Direction", zh: "吉方", ja: "吉方位" },
    compatibility: { ko: "궁합", en: "Compatibility", zh: "相合", ja: "相性" },
    retry: { ko: "다시 보기", en: "Try Again", zh: "重新测试", ja: "もう一度" },
    home: { ko: "홈으로", en: "Home", zh: "首页", ja: "ホームへ" },
    share: { ko: "공유하기", en: "Share", zh: "分享", ja: "シェア" },
    saveImage: { ko: "이미지 저장", en: "Save Image", zh: "保存图片", ja: "画像保存" },
    copyLink: { ko: "링크 복사", en: "Copy Link", zh: "复制链接", ja: "リンクコピー" },
    copied: { ko: "복사됨!", en: "Copied!", zh: "已复制!", ja: "コピー!" },
  };

  const t = (obj: Record<string, string>) => obj[lang] || obj.en;

  const currentFeature = faceFeatures[currentStep];
  const progress = ((currentStep + 1) / faceFeatures.length) * 100;

  // 옵션 선택
  const handleSelect = (optionId: string) => {
    const newSelections = { ...selections, [currentFeature.id]: optionId };
    setSelections(newSelections);

    if (currentStep < faceFeatures.length - 1) {
      // 다음 질문으로
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // 분석 화면으로
      setState("analyzing");
      setTimeout(() => {
        const calculatedResult = calculateFaceReading(newSelections);
        setResult(calculatedResult);
        setState("result");
      }, 3500);
    }
  };

  // 공유 기능들
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = lang === 'ko'
      ? `🔮 나의 관상 분석 결과: ${result?.type.ko}\n${result?.title.ko}`
      : `🔮 My Face Reading: ${result?.type.en}\n${result?.title.en}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: lang === 'ko' ? '관상 분석 결과' : 'Face Reading Result',
      text: `${result?.type[lang] || result?.type.en}: ${result?.title[lang] || result?.title.en}`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      handleCopyLink();
    }
  };

  const handleSaveImage = async () => {
    if (!result) return;

    const bgColor = '#f5f0e6';
    const textColor = '#2d2d2d';
    const accentColor = '#8B0000';

    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      position: fixed; left: -9999px; top: 0;
      width: 400px; padding: 40px;
      background: linear-gradient(180deg, #f5f0e6 0%, #e8dfd0 100%);
      font-family: 'Noto Serif KR', serif;
      color: ${textColor};
    `;

    captureDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 64px; margin-bottom: 12px;">${result.emoji}</div>
        <div style="font-size: 14px; color: ${accentColor}; letter-spacing: 4px; margin-bottom: 8px;">觀相</div>
        <div style="font-size: 28px; font-weight: 700; color: ${textColor};">${result.type[lang] || result.type.en}</div>
      </div>
      
      <div style="background: rgba(255,255,255,0.6); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid rgba(139,0,0,0.2);">
        <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: ${textColor};">
          ${result.title[lang] || result.title.en}
        </div>
        <div style="font-size: 13px; color: #666; line-height: 1.6;">
          ${result.subtitle[lang] || result.subtitle.en}
        </div>
      </div>

      <div style="display: flex; justify-content: space-around; background: rgba(255,255,255,0.6); border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid rgba(139,0,0,0.2);">
        <div style="text-align: center;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: ${result.luckyColor}; margin: 0 auto 8px;"></div>
          <div style="font-size: 10px; color: #666;">${t(texts.luckyColor)}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px; margin-bottom: 4px;">🧭</div>
          <div style="font-size: 12px; font-weight: 600;">${result.luckyDirection[lang] || result.luckyDirection.en}</div>
          <div style="font-size: 10px; color: #666;">${t(texts.luckyDirection)}</div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(139,0,0,0.2);">
        <div style="font-size: 11px; color: #888; letter-spacing: 2px;">✨ check-me.today</div>
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
      link.download = `face-reading-${today}.png`;
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
      <main className="min-h-screen ink-bg py-10 px-4">
        <div className="max-w-md mx-auto">
          {/* 뒤로가기 */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="w-10 h-10 rounded-full ink-card flex items-center justify-center text-ink-600 hover:text-ink-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          {/* 메인 비주얼 */}
          <div className="text-center mb-10">
            {/* 한자 + 번역 장식 */}
            <div className="mb-4">
              <div className="text-ink-accent text-base tracking-[6px] font-serif">觀相學</div>
              <div className="text-ink-500 text-sm mt-1">
                {lang === 'ko' ? '관상학' : lang === 'zh' ? '面相学' : lang === 'ja' ? '人相学' : 'Physiognomy'}
              </div>
            </div>
            
            {/* 도장 스타일 아이콘 */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 ink-stamp rounded-lg flex items-center justify-center">
                <span className="text-7xl">🔮</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-ink-800 dark:text-ink-100 mb-3 font-serif">
              {t(texts.title)}
            </h1>
            <p className="text-lg text-ink-600 dark:text-ink-300 mb-2">
              {t(texts.subtitle)}
            </p>
            <p className="text-base text-ink-500 dark:text-ink-400 break-keep">
              {t(texts.description)}
            </p>
          </div>

          {/* 설명 카드 */}
          <div className="ink-card rounded-2xl p-6 mb-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl">👁️</span>
                <div>
                  <h3 className="text-lg font-bold text-ink-800 dark:text-ink-100">
                    {lang === 'ko' ? '얼굴 특징 선택' : lang === 'zh' ? '选择面部特征' : lang === 'ja' ? '顔の特徴を選択' : 'Select Features'}
                  </h3>
                  <p className="text-base text-ink-500 dark:text-ink-400">
                    {lang === 'ko' ? '6가지 얼굴 부위의 특징을 선택합니다' : 
                     lang === 'zh' ? '选择6个面部部位的特征' :
                     lang === 'ja' ? '6つの顔のパーツの特徴を選びます' :
                     'Select features from 6 facial areas'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📜</span>
                <div>
                  <h3 className="text-lg font-bold text-ink-800 dark:text-ink-100">
                    {lang === 'ko' ? '고전 문헌 기반' : lang === 'zh' ? '基于古典文献' : lang === 'ja' ? '古典文献に基づく' : 'Based on Classics'}
                  </h3>
                  <p className="text-base text-ink-500 dark:text-ink-400">
                    {lang === 'ko' ? '마의상서, 신상전편 등 동양 관상학 참고' :
                     lang === 'zh' ? '参考麻衣相书、神相全篇等东方面相学' :
                     lang === 'ja' ? '麻衣相書、神相全篇など東洋の人相学を参考' :
                     'References Mayi Xiangfa and other Eastern texts'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎴</span>
                <div>
                  <h3 className="text-lg font-bold text-ink-800 dark:text-ink-100">
                    {lang === 'ko' ? '종합 관상 결과' : lang === 'zh' ? '综合面相结果' : lang === 'ja' ? '総合人相結果' : 'Full Reading'}
                  </h3>
                  <p className="text-base text-ink-500 dark:text-ink-400">
                    {lang === 'ko' ? '재물운, 지혜, 리더십, 매력 등 분석' :
                     lang === 'zh' ? '分析财运、智慧、领导力、魅力等' :
                     lang === 'ja' ? '財運、知恵、リーダーシップ、魅力などを分析' :
                     'Analysis of wealth, wisdom, leadership, charm'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={() => setState("quiz")}
            className="w-full py-5 ink-button rounded-xl font-bold text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t(texts.start)} 🔮
          </button>

          {/* 면책 */}
          <p className="mt-6 text-center text-sm text-ink-400">
            {lang === 'ko' ? '※ 본 테스트는 재미를 위한 것으로, 실제 운명을 결정하지 않습니다.' :
             lang === 'zh' ? '※ 本测试仅供娱乐，不代表真实命运。' :
             lang === 'ja' ? '※ このテストは娯楽目的であり、実際の運命を決定するものではありません。' :
             '※ This test is for entertainment only and does not determine actual fate.'}
          </p>
        </div>
      </main>
    );
  }

  // 퀴즈 페이지
  if (state === "quiz") {
    return (
      <main className="min-h-screen ink-bg py-10 px-4">
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
              className="w-12 h-12 rounded-full ink-card flex items-center justify-center text-ink-600 hover:text-ink-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-base text-ink-500 font-serif">
              {t(texts.step)} {currentStep + 1} / {faceFeatures.length}
            </div>
          </div>

          {/* 프로그레스 바 */}
          <div className="h-3 bg-ink-200 dark:bg-ink-700 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full ink-progress rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 질문 카드 */}
          <div className="ink-card rounded-2xl p-8 mb-6 animate-fade-in">
            {/* 부위 이름 - 한자 + 모국어 번역 */}
            <div className="text-center mb-8">
              {/* 한자 + 번역을 함께 표시 */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-ink-accent text-xl tracking-[4px] font-serif">
                  {currentFeature.id === 'face-shape' ? '面型' :
                   currentFeature.id === 'forehead' ? '額' :
                   currentFeature.id === 'eyes' ? '眼' :
                   currentFeature.id === 'nose' ? '鼻' :
                   currentFeature.id === 'mouth' ? '口' : '頤'}
                </span>
                <span className="text-ink-500 text-base">
                  ({currentFeature.name[lang] || currentFeature.name.en})
                </span>
              </div>
              <h2 className="text-4xl font-bold text-ink-800 dark:text-ink-100 font-serif">
                {currentFeature.name[lang] || currentFeature.name.en}
              </h2>
              <p className="text-lg text-ink-500 dark:text-ink-400 mt-3">
                {currentFeature.description[lang] || currentFeature.description.en}
              </p>
            </div>

            {/* 선택지들 */}
            <div className="space-y-4">
              {currentFeature.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full p-5 rounded-xl text-left transition-all duration-200 border-2 ${
                    selections[currentFeature.id] === option.id
                      ? 'ink-option-selected'
                      : 'ink-option hover:border-ink-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{option.emoji}</span>
                    <div className="flex-1">
                      <div className="text-xl font-bold text-ink-800 dark:text-ink-100">
                        {option.label[lang] || option.label.en}
                      </div>
                      <div className="text-base text-ink-500 dark:text-ink-400 mt-1">
                        {option.description[lang] || option.description.en}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 힌트 */}
          <p className="text-center text-lg text-ink-400">
            {lang === 'ko' ? '✨ 거울을 보며 직감적으로 선택해보세요' :
             lang === 'zh' ? '✨ 照镜子凭直觉选择' :
             lang === 'ja' ? '✨ 鏡を見ながら直感で選んでみてください' :
             '✨ Look in the mirror and choose intuitively'}
          </p>
        </div>
      </main>
    );
  }

  // 분석 중 페이지
  if (state === "analyzing") {
    return (
      <main className="min-h-screen ink-bg flex items-center justify-center px-4">
        <div className="text-center">
          {/* 수묵화 스타일 애니메이션 */}
          <div className="relative w-56 h-56 mx-auto mb-8">
            {/* 붓터치 효과 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 ink-stamp rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-7xl">🔮</span>
              </div>
            </div>
            {/* 한자 회전 */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-ink-accent text-2xl font-serif">觀</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-ink-accent text-2xl font-serif">相</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-accent text-2xl font-serif">面</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-accent text-2xl font-serif">命</div>
            </div>
          </div>

          {/* 분석 중 텍스트 */}
          <h2 className="text-3xl font-bold text-ink-800 dark:text-ink-100 mb-3 font-serif">
            {t(texts.analyzing)}
          </h2>
          
          {/* 한자 + 번역 */}
          <p className="text-ink-accent text-lg mb-6">
            {lang === 'ko' ? '觀相 (관상)' : 
             lang === 'zh' ? '觀相 (面相)' : 
             lang === 'ja' ? '觀相 (人相)' : 
             '觀相 (Face Reading)'}
          </p>

          {/* 로딩 바 */}
          <div className="w-80 mx-auto h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full ink-progress rounded-full"
              style={{ animation: 'loading 3.5s ease-in-out forwards' }}
            />
          </div>

          {/* 명언 */}
          <p className="mt-8 text-ink-500 dark:text-ink-400 text-lg font-serif italic max-w-sm mx-auto">
            {lang === 'ko' ? '"상은 마음에서 나오고, 마음이 바뀌면 상도 바뀐다"' :
             lang === 'zh' ? '"相由心生，心变则相变"' :
             lang === 'ja' ? '"相は心より生ず、心変われば相も変わる"' :
             '"The face is born from the heart; when the heart changes, so does the face"'}
          </p>
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

  // 결과 페이지
  if (state === "result" && result) {
    return (
      <main className="min-h-screen ink-bg py-10 px-4 pb-32">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="w-12 h-12 rounded-full ink-card flex items-center justify-center text-ink-600 hover:text-ink-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-base text-ink-500 font-serif">
              {t(texts.yourType)}
            </div>
          </div>

          {/* 메인 결과 카드 */}
          <div className="ink-card rounded-2xl overflow-hidden mb-6 animate-slide-up">
            {/* 상단 배너 */}
            <div className="ink-header p-8 text-center">
              {/* 한자 + 번역을 함께 표시 */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-ink-accent-light text-lg tracking-[4px] font-serif">觀相結果</span>
                <span className="text-ink-accent-light/70 text-base">
                  ({lang === 'ko' ? '관상 결과' : 
                    lang === 'zh' ? '面相结果' : 
                    lang === 'ja' ? '人相結果' : 
                    'Result'})
                </span>
              </div>
              <div className="text-8xl mb-4">{result.emoji}</div>
              <div className="text-4xl font-bold text-ink-100 font-serif">
                {result.type[lang] || result.type.en}
              </div>
            </div>

            {/* 결과 내용 */}
            <div className="p-6 space-y-6">
              {/* 제목 & 부제 */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-ink-800 dark:text-ink-100 mb-3 font-serif">
                  {result.title[lang] || result.title.en}
                </h1>
                <p className="text-lg text-ink-500 dark:text-ink-400">
                  {result.subtitle[lang] || result.subtitle.en}
                </p>
              </div>

              {/* 설명 */}
              <div className="ink-inner-card rounded-xl p-5">
                <p className="text-ink-700 dark:text-ink-200 text-lg leading-relaxed break-keep">
                  {result.description[lang] || result.description.en}
                </p>
              </div>

              {/* 강점 */}
              <div>
                <h3 className="text-ink-accent text-xl font-bold mb-4 font-serif flex items-center gap-2">
                  <span>✦</span> {t(texts.strengths)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(result.strengths[lang] || result.strengths.en).map((strength, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 ink-tag rounded-full text-base font-medium"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* 행운 정보 */}
              <div>
                <h3 className="text-ink-accent text-xl font-bold mb-4 font-serif flex items-center gap-2">
                  <span>✦</span> {t(texts.luckyInfo)}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="ink-inner-card rounded-xl p-4 text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: result.luckyColor }}
                    />
                    <div className="text-base text-ink-500">{t(texts.luckyColor)}</div>
                  </div>
                  <div className="ink-inner-card rounded-xl p-4 text-center">
                    <div className="text-4xl mb-1">🧭</div>
                    <div className="text-lg font-bold text-ink-700 dark:text-ink-200">
                      {result.luckyDirection[lang] || result.luckyDirection.en}
                    </div>
                    <div className="text-base text-ink-500">{t(texts.luckyDirection)}</div>
                  </div>
                  <div className="ink-inner-card rounded-xl p-4 text-center">
                    <div className="text-4xl mb-1">💑</div>
                    <div className="text-base text-ink-700 dark:text-ink-200 font-medium">
                      {result.compatibility[lang] || result.compatibility.en}
                    </div>
                    <div className="text-base text-ink-500">{t(texts.compatibility)}</div>
                  </div>
                </div>
              </div>

              {/* 조언 */}
              <div className="ink-advice rounded-xl p-5">
                <h3 className="text-ink-accent-dark text-xl font-bold mb-3 font-serif flex items-center gap-2">
                  📜 {t(texts.advice)}
                </h3>
                <p className="text-ink-700 text-lg leading-relaxed break-keep italic">
                  "{result.advice[lang] || result.advice.en}"
                </p>
              </div>
            </div>
          </div>

          {/* 공유 버튼 그룹 */}
          <div className="mb-4">
            <button
              onClick={handleNativeShare}
              className="w-full py-4 mb-3 ink-button rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t(texts.share)} 🎉
            </button>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleSaveImage}
                className="py-4 px-2 ink-card rounded-xl text-center hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
              >
                <div className="text-2xl mb-1">📷</div>
                <div className="text-sm text-ink-600 dark:text-ink-300">{t(texts.saveImage)}</div>
              </button>
              <button
                onClick={handleCopyLink}
                className="py-4 px-2 ink-card rounded-xl text-center hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
              >
                <div className="text-2xl mb-1">{copied ? "✅" : "🔗"}</div>
                <div className="text-sm text-ink-600 dark:text-ink-300">
                  {copied ? t(texts.copied) : t(texts.copyLink)}
                </div>
              </button>
              <button
                onClick={handleTwitterShare}
                className="py-4 px-2 ink-card rounded-xl text-center hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
              >
                <div className="text-2xl mb-1">𝕏</div>
                <div className="text-sm text-ink-600 dark:text-ink-300">Twitter</div>
              </button>
              <button
                onClick={handleCopyLink}
                className="py-4 px-2 ink-card rounded-xl text-center hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
              >
                <div className="text-2xl mb-1">💬</div>
                <div className="text-sm text-ink-600 dark:text-ink-300">
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
                setSelections({});
                setResult(null);
              }}
              className="py-4 ink-card rounded-xl font-bold text-lg text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
            >
              {t(texts.retry)}
            </button>
            <Link href="/">
              <div className="py-4 ink-button rounded-xl font-bold text-lg text-center">
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

