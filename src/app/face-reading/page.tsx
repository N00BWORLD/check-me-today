"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";
import RecommendedTests from "@/components/RecommendedTests";



type PageState = "landing" | "upload" | "quiz" | "analyzing" | "result";

// face-api.js 타입 정의
type FaceApiModule = {
  nets: {
    tinyFaceDetector: { loadFromUri: (uri: string) => Promise<void> };
    faceLandmark68Net: { loadFromUri: (uri: string) => Promise<void> };
  };
  detectSingleFace: (image: HTMLImageElement) => {
    withFaceLandmarks: () => Promise<{
      landmarks: {
        positions: Array<{ x: number; y: number }>;
        getJawOutline: () => Array<{ x: number; y: number }>;
        getLeftEye: () => Array<{ x: number; y: number }>;
        getRightEye: () => Array<{ x: number; y: number }>;
        getNose: () => Array<{ x: number; y: number }>;
        getMouth: () => Array<{ x: number; y: number }>;
        getLeftEyeBrow: () => Array<{ x: number; y: number }>;
        getRightEyeBrow: () => Array<{ x: number; y: number }>;
      };
      detection: { box: { x: number; y: number; width: number; height: number } };
    } | undefined>;
  };
  TinyFaceDetectorOptions: new () => object;
};

export default function FaceReadingPage() {
  const { lang } = useLanguage();
  const [state, setState] = useState<PageState>("landing");
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FaceReadingResult | null>(null);
  const [copied, setCopied] = useState(false);

  // AI 분석을 위한 상태
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const faceApiRef = useRef<FaceApiModule | null>(null);

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
    // AI 분석 관련 텍스트
    aiAnalyze: { ko: "AI로 분석하기", en: "AI Analysis", zh: "AI分析", ja: "AI分析" },
    manualSelect: { ko: "직접 선택하기", en: "Manual Selection", zh: "手动选择", ja: "手動選択" },
    uploadPhoto: { ko: "사진 업로드", en: "Upload Photo", zh: "上传照片", ja: "写真をアップロード" },
    takePhoto: { ko: "사진 촬영", en: "Take Photo", zh: "拍照", ja: "写真を撮る" },
    uploadDesc: { ko: "얼굴이 잘 보이는 정면 사진을 선택해주세요", en: "Please select a clear front-facing photo", zh: "请选择一张清晰的正面照片", ja: "顔がよく見える正面写真を選択してください" },
    loadingModel: { ko: "AI 모델 로딩 중...", en: "Loading AI model...", zh: "正在加载AI模型...", ja: "AIモデルをロード中..." },
    analyzingFace: { ko: "얼굴 특징 분석 중...", en: "Analyzing facial features...", zh: "正在分析面部特征...", ja: "顔の特徴を分析中..." },
    noFaceDetected: { ko: "얼굴을 감지할 수 없습니다. 다른 사진을 시도해주세요.", en: "No face detected. Please try another photo.", zh: "无法检测到人脸，请尝试其他照片", ja: "顔が検出できません。別の写真をお試しください。" },
    aiAnalyzeDesc: { ko: "📷 사진으로 얼굴 특징을 자동 분석", en: "📷 Auto-analyze facial features from photo", zh: "📷 通过照片自动分析面部特征", ja: "📷 写真から顔の特徴を自動分析" },
    manualSelectDesc: { ko: "✍️ 직접 얼굴 특징을 선택하여 분석", en: "✍️ Select facial features manually", zh: "✍️ 手动选择面部特征进行分析", ja: "✍️ 顔の特徴を手動で選択" },
  };

  const t = (obj: Record<string, string>) => obj[lang] || obj.en;

  const currentFeature = faceFeatures[currentStep];
  const progress = ((currentStep + 1) / faceFeatures.length) * 100;

  // face-api.js 모델 로드
  const loadModel = useCallback(async () => {
    if (faceApiRef.current) return faceApiRef.current;

    setIsModelLoading(true);
    setAnalysisMessage(t(texts.loadingModel));
    setAnalysisProgress(10);

    try {
      // face-api.js 동적 임포트
      const faceapi = await import('face-api.js');
      setAnalysisProgress(30);

      // 모델 로드 (로컬 public/models에서 - 빠름!)
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      setAnalysisProgress(50);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setAnalysisProgress(70);

      faceApiRef.current = faceapi as unknown as FaceApiModule;
      setIsModelLoading(false);
      return faceApiRef.current;
    } catch (error) {
      console.error('모델 로드 실패:', error);
      setIsModelLoading(false);
      throw error;
    }
  }, []);

  // 업로드 페이지 진입 시 모델 미리 로드 (백그라운드)
  useEffect(() => {
    if (state === "upload" && !faceApiRef.current) {
      // 백그라운드에서 모델 프리로드
      loadModel().catch(() => {
        // 프리로드 실패해도 무시 (나중에 다시 시도)
      });
    }
  }, [state, loadModel]);

  // face-api.js 68 랜드마크에서 특징 분석
  const analyzeFacialFeatures = (landmarks: {
    positions: Array<{ x: number; y: number }>;
    getJawOutline: () => Array<{ x: number; y: number }>;
    getLeftEye: () => Array<{ x: number; y: number }>;
    getRightEye: () => Array<{ x: number; y: number }>;
    getNose: () => Array<{ x: number; y: number }>;
    getMouth: () => Array<{ x: number; y: number }>;
    getLeftEyeBrow: () => Array<{ x: number; y: number }>;
    getRightEyeBrow: () => Array<{ x: number; y: number }>;
  }) => {
    // face-api.js 68 랜드마크
    // 턱선: 0-16, 눈썹: 17-26, 코: 27-35, 눈: 36-47, 입: 48-67
    const positions = landmarks.positions;
    const selections: Record<string, string> = {};

    // 1. 얼굴형 분석 (턱선 너비 vs 높이)
    const jawOutline = landmarks.getJawOutline();
    if (jawOutline.length > 0) {
      const leftJaw = jawOutline[0];
      const rightJaw = jawOutline[jawOutline.length - 1];
      const chin = jawOutline[Math.floor(jawOutline.length / 2)];
      const forehead = positions[27]; // 코 시작점 (이마 아래)

      const faceWidth = Math.abs(rightJaw.x - leftJaw.x);
      const faceHeight = Math.abs(chin.y - forehead.y) * 1.3; // 이마 보정
      const ratio = faceWidth / faceHeight;

      if (ratio > 0.9) {
        selections['face-shape'] = 'round';
      } else if (ratio > 0.8) {
        selections['face-shape'] = 'square';
      } else if (ratio > 0.7) {
        selections['face-shape'] = 'oval';
      } else {
        selections['face-shape'] = 'long';
      }
    }

    // 2. 이마 분석 (눈썹 높이로 추정)
    const leftBrow = landmarks.getLeftEyeBrow();
    const rightBrow = landmarks.getRightEyeBrow();
    if (leftBrow.length > 0 && rightBrow.length > 0) {
      const browY = (leftBrow[2].y + rightBrow[2].y) / 2;
      const noseTop = positions[27].y;
      const browHeight = Math.abs(noseTop - browY);

      if (browHeight > 40) {
        selections['forehead'] = 'high-wide';
      } else if (browHeight > 30) {
        selections['forehead'] = 'flat';
      } else {
        selections['forehead'] = 'narrow-low';
      }
    }

    // 3. 눈 분석
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    if (leftEye.length >= 6) {
      const eyeWidth = Math.abs(leftEye[3].x - leftEye[0].x);
      const eyeHeight = Math.abs(leftEye[4].y - leftEye[1].y);
      const eyeRatio = eyeHeight / eyeWidth;

      // 눈꼬리 기울기 (외측 - 내측)
      const eyeSlope = (leftEye[3].y - leftEye[0].y) / (leftEye[3].x - leftEye[0].x);

      if (eyeRatio > 0.4) {
        selections['eyes'] = 'big-round';
      } else if (eyeSlope < -0.1) {
        selections['eyes'] = 'upturned';
      } else if (eyeSlope > 0.1) {
        selections['eyes'] = 'downturned';
      } else if (eyeRatio < 0.25) {
        selections['eyes'] = 'phoenix';
      } else {
        selections['eyes'] = 'small-sharp';
      }
    }

    // 4. 코 분석
    const nose = landmarks.getNose();
    if (nose.length >= 9) {
      const noseTop = nose[0];
      const noseTip = nose[6];
      const noseLeft = nose[4];
      const noseRight = nose[8];

      const noseLength = Math.abs(noseTip.y - noseTop.y);
      const noseWidth = Math.abs(noseRight.x - noseLeft.x);
      const noseRatio = noseWidth / noseLength;

      if (noseRatio > 0.8) {
        selections['nose'] = 'wide-sensual';
      } else if (noseRatio < 0.5) {
        selections['nose'] = 'high-straight';
      } else {
        selections['nose'] = 'small-cute';
      }
    }

    // 5. 입 분석
    const mouth = landmarks.getMouth();
    if (mouth.length >= 12) {
      const mouthLeft = mouth[0];
      const mouthRight = mouth[6];
      const upperLip = mouth[3];
      const lowerLip = mouth[9];

      const mouthWidth = Math.abs(mouthRight.x - mouthLeft.x);
      const lipHeight = Math.abs(lowerLip.y - upperLip.y);

      // 입꼬리 기울기
      const mouthSlope = (mouthRight.y - mouthLeft.y) / (mouthRight.x - mouthLeft.x);

      if (mouthSlope < -0.05) {
        selections['mouth'] = 'upturned';
      } else if (mouthSlope > 0.05) {
        selections['mouth'] = 'downturned';
      } else if (lipHeight > 15) {
        selections['mouth'] = 'big-thick';
      } else {
        selections['mouth'] = 'small-thin';
      }
    }

    // 6. 턱 분석
    const jawOutline2 = landmarks.getJawOutline();
    if (jawOutline2.length >= 17) {
      const jawLeft = jawOutline2[4];
      const jawRight = jawOutline2[12];
      const chinTip = jawOutline2[8];

      const jawWidth = Math.abs(jawRight.x - jawLeft.x);
      const chinPointedness = Math.abs((jawLeft.y + jawRight.y) / 2 - chinTip.y);

      if (chinPointedness > jawWidth * 0.25) {
        selections['chin'] = 'pointed';
      } else if (jawWidth > 100) {
        selections['chin'] = 'square';
      } else {
        selections['chin'] = 'round';
      }
    }

    return selections;
  };

  // 이미지 리사이징 함수 (처리 속도 향상)
  const resizeImage = (imageUrl: string, maxSize: number = 640): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // 최대 크기로 리사이징
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = imageUrl;
    });
  };

  // 이미지 업로드 처리
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 즉시 분석 화면으로 전환 (사용자 피드백)
    setState("analyzing");
    setAnalysisProgress(5);
    setAnalysisMessage(lang === 'ko' ? '이미지 처리 중...' : 'Processing image...');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;

      // 이미지 리사이징 (속도 향상)
      setAnalysisProgress(10);
      const resizedImage = await resizeImage(imageUrl);
      setUploadedImage(resizedImage);

      // AI 분석 시작
      await analyzeWithAI(resizedImage);
    };
    reader.readAsDataURL(file);
  };

  // AI로 얼굴 분석
  const analyzeWithAI = async (imageUrl: string) => {
    setAnalysisProgress(15);

    try {
      // 모델 로드 (캐시되어 있으면 빠름)
      setAnalysisMessage(t(texts.loadingModel));
      const faceapi = await loadModel();

      setAnalysisMessage(t(texts.analyzingFace));
      setAnalysisProgress(75);

      // 이미지 로드
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageUrl;
      });

      setAnalysisProgress(85);

      // 얼굴 감지 및 랜드마크 (TinyFaceDetector 사용)
      const faceapiModule = await import('face-api.js');
      const detection = await faceapiModule.detectSingleFace(img, new faceapiModule.TinyFaceDetectorOptions()).withFaceLandmarks();

      if (!detection) {
        alert(t(texts.noFaceDetected));
        setState("upload");
        return;
      }

      setAnalysisProgress(95);

      // 얼굴 특징 분석
      const analyzedSelections = analyzeFacialFeatures(detection.landmarks);
      setSelections(analyzedSelections);

      setAnalysisProgress(100);
      setAnalysisMessage(lang === 'ko' ? '분석 완료!' : 'Analysis complete!');

      // 결과 계산
      setTimeout(() => {
        const calculatedResult = calculateFaceReading(analyzedSelections);
        setResult(calculatedResult);
        setState("result");
      }, 500);

    } catch (error) {
      console.error('AI 분석 실패:', error);
      alert('분석 중 오류가 발생했습니다. 직접 선택 모드를 이용해주세요.');
      setState("landing");
    }
  };

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
    if (!(await copyToClipboard(window.location.href))) return;
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

  // 카카오톡 공유 (Kakao SDK 피드 메시지, 키가 없으면 링크 복사로 폴백)
  const handleKakaoShare = () => {
    const sent = shareKakaoFeed({
      title: lang === 'ko'
        ? `🔮 나의 관상 분석 결과: ${result?.type.ko ?? ''}`
        : `🔮 My Face Reading: ${result?.type.en ?? ''}`,
      description: result?.title[lang] || result?.title.en || '',
      emoji: '🔮',
      buttonTitle: lang === 'ko' ? '결과 보기' : 'View Result',
    });
    if (!sent) handleCopyLink();
  };

  const handleSaveImage = async () => {
    if (!result) return;

    const isDark = document.documentElement.classList.contains('dark');

    // 수묵화 스타일 색상
    const bgGradient = isDark
      ? 'linear-gradient(180deg, #1a1814 0%, #252018 100%)'
      : 'linear-gradient(180deg, #f5f0e6 0%, #e8dfd0 100%)';
    const bgColor = isDark ? '#1a1814' : '#f5f0e6';
    const textColor = isDark ? '#f5f0e6' : '#2d2d2d';
    const subTextColor = isDark ? '#c5b8a5' : '#5a4d3d';
    const accentColor = isDark ? '#c5a572' : '#8B0000';
    const cardBg = isDark ? 'rgba(42, 36, 28, 0.9)' : 'rgba(255, 251, 245, 0.9)';
    const cardBorder = isDark ? 'rgba(139, 90, 43, 0.3)' : 'rgba(139, 0, 0, 0.2)';
    const headerBg = 'linear-gradient(135deg, #8B0000 0%, #6B0000 50%, #4a0000 100%)';

    // 강점 태그 HTML 생성
    const strengthsHtml = (result.strengths[lang] || result.strengths.en)
      .map(s => `<span style="display: inline-block; padding: 6px 14px; margin: 4px; background: ${isDark ? 'rgba(197, 165, 114, 0.15)' : 'rgba(139, 0, 0, 0.1)'}; color: ${accentColor}; border-radius: 20px; font-size: 13px; border: 1px solid ${isDark ? 'rgba(197, 165, 114, 0.3)' : 'rgba(139, 0, 0, 0.3)'};">${s}</span>`)
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
      <div style="background: ${headerBg}; padding: 32px 24px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px;">
          <span style="color: #c5a572; font-size: 16px; letter-spacing: 4px;">觀相結果</span>
          <span style="color: rgba(197, 165, 114, 0.7); font-size: 14px;">(${lang === 'ko' ? '관상 결과' : lang === 'zh' ? '面相结果' : lang === 'ja' ? '人相結果' : 'Result'})</span>
        </div>
        <div style="font-size: 80px; margin: 20px 0;">${result.emoji}</div>
        <div style="font-size: 36px; font-weight: 700; color: #faf8f5;">
          ${result.type[lang] || result.type.en}
        </div>
      </div>
      
      <!-- 본문 -->
      <div style="padding: 28px;">
        <!-- 제목 & 부제 -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 24px; font-weight: 700; color: ${textColor}; margin-bottom: 10px;">
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

        <!-- 강점 -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 16px; font-weight: 700; color: ${accentColor}; margin-bottom: 14px;">✦ ${t(texts.strengths)}</div>
          <div style="text-align: center;">
            ${strengthsHtml}
          </div>
        </div>

        <!-- 행운 정보 -->
        <div style="display: flex; justify-content: space-around; background: ${cardBg}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${cardBorder};">
          <div style="text-align: center;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: ${result.luckyColor}; margin: 0 auto 10px;"></div>
            <div style="font-size: 13px; color: ${subTextColor};">${t(texts.luckyColor)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 28px; margin-bottom: 6px;">🧭</div>
            <div style="font-size: 16px; font-weight: 600; color: ${textColor};">${result.luckyDirection[lang] || result.luckyDirection.en}</div>
            <div style="font-size: 13px; color: ${subTextColor};">${t(texts.luckyDirection)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 28px; margin-bottom: 6px;">💑</div>
            <div style="font-size: 14px; font-weight: 600; color: ${textColor};">${result.compatibility[lang] || result.compatibility.en}</div>
            <div style="font-size: 13px; color: ${subTextColor};">${t(texts.compatibility)}</div>
          </div>
        </div>

        <!-- 조언 -->
        <div style="background: ${isDark ? 'rgba(60, 50, 35, 0.8)' : 'rgba(255, 248, 220, 0.8)'}; border-radius: 12px; padding: 20px; border: 1px solid ${cardBorder};">
          <div style="font-size: 15px; font-weight: 700; color: ${isDark ? '#a68b5b' : '#6B0000'}; margin-bottom: 10px;">📜 ${t(texts.advice)}</div>
          <div style="font-size: 15px; color: ${isDark ? '#c5b8a5' : '#3d3328'}; line-height: 1.7; font-style: italic;">
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
      link.download = `face-reading-${result.type[lang] || result.type.en}-${today}.png`;
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

          {/* 시작 버튼 - 두 가지 옵션 */}
          <div className="space-y-4">
            {/* AI 분석 버튼 */}
            <button
              onClick={() => setState("upload")}
              className="w-full py-5 ink-button rounded-xl font-bold text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center gap-2"
            >
              <span>📷 {t(texts.aiAnalyze)}</span>
              <span className="text-sm font-normal opacity-80">{t(texts.aiAnalyzeDesc)}</span>
            </button>

            {/* 직접 선택 버튼 */}
            <button
              onClick={() => setState("quiz")}
              className="w-full py-4 ink-card rounded-xl font-bold text-lg text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-700 transition-all flex flex-col items-center gap-1"
            >
              <span>✍️ {t(texts.manualSelect)}</span>
              <span className="text-sm font-normal text-ink-500">{t(texts.manualSelectDesc)}</span>
            </button>
          </div>

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

  // 업로드 페이지 (AI 분석)
  if (state === "upload") {
    return (
      <main className="min-h-screen ink-bg py-10 px-4">
        <div className="max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                setState("landing");
                setUploadedImage(null);
              }}
              className="w-12 h-12 rounded-full ink-card flex items-center justify-center text-ink-600 hover:text-ink-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-base text-ink-500 font-serif">
              {t(texts.aiAnalyze)}
            </div>
          </div>

          {/* 한자 장식 */}
          <div className="text-center mb-8">
            <div className="text-ink-accent text-lg tracking-[6px] font-serif mb-2">面相識別</div>
            <div className="text-ink-500 text-sm">
              {lang === 'ko' ? 'AI 얼굴 분석' : lang === 'zh' ? 'AI面相识别' : lang === 'ja' ? 'AI顔分析' : 'AI Face Analysis'}
            </div>
          </div>

          {/* 업로드 영역 */}
          <div className="ink-card rounded-2xl p-8 mb-6">
            {uploadedImage ? (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded face"
                  className="w-full rounded-xl"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-dashed border-ink-300 dark:border-ink-600 flex items-center justify-center">
                  <span className="text-6xl">📷</span>
                </div>
                <p className="text-lg text-ink-700 dark:text-ink-200 mb-2 font-medium">
                  {t(texts.uploadPhoto)}
                </p>
                <p className="text-base text-ink-500 mb-6">
                  {t(texts.uploadDesc)}
                </p>

                {/* 숨겨진 파일 입력 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* 업로드 버튼 */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 ink-button rounded-xl font-bold text-lg"
                >
                  📁 {t(texts.uploadPhoto)}
                </button>
              </div>
            )}
          </div>

          {/* 안내 문구 */}
          <div className="ink-card rounded-xl p-4 mb-6">
            <h4 className="text-ink-accent font-bold mb-2">💡 {lang === 'ko' ? '촬영 팁' : 'Tips'}</h4>
            <ul className="text-sm text-ink-500 space-y-1">
              <li>• {lang === 'ko' ? '정면을 바라본 사진이 가장 정확합니다' : 'Front-facing photos work best'}</li>
              <li>• {lang === 'ko' ? '얼굴 전체가 잘 보이는 사진을 선택하세요' : 'Choose a photo where your full face is visible'}</li>
              <li>• {lang === 'ko' ? '밝은 조명에서 촬영된 사진을 권장합니다' : 'Well-lit photos are recommended'}</li>
            </ul>
          </div>

          {/* 직접 선택 링크 */}
          <button
            onClick={() => setState("quiz")}
            className="w-full py-3 text-ink-500 hover:text-ink-700 transition-colors text-sm"
          >
            ✍️ {t(texts.manualSelect)}
          </button>
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
                  className={`w-full p-5 rounded-xl text-left transition-all duration-200 border-2 ${selections[currentFeature.id] === option.id
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
                <span className="text-7xl">{isModelLoading ? '🤖' : '🔮'}</span>
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
            {analysisMessage || t(texts.analyzing)}
          </h2>

          {/* 한자 + 번역 */}
          <p className="text-ink-accent text-lg mb-6">
            {isModelLoading
              ? (lang === 'ko' ? 'AI 모델 준비 중...' : 'Loading AI Model...')
              : (lang === 'ko' ? '觀相 (관상)' :
                lang === 'zh' ? '觀相 (面相)' :
                  lang === 'ja' ? '觀相 (人相)' :
                    '觀相 (Face Reading)')}
          </p>

          {/* 로딩 바 */}
          <div className="w-80 mx-auto h-2 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full ink-progress rounded-full transition-all duration-500"
              style={{
                width: analysisProgress > 0 ? `${analysisProgress}%` : undefined,
                animation: analysisProgress === 0 ? 'loading 3.5s ease-in-out forwards' : undefined
              }}
            />
          </div>

          {/* AI 분석 진행률 표시 */}
          {analysisProgress > 0 && (
            <p className="mt-3 text-ink-500 text-sm">
              {analysisProgress}%
            </p>
          )}

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
                onClick={handleKakaoShare}
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
          {/* 하단 여백 및 광고를 고려하여 버튼 위치 조정 */}
          <div className="grid grid-cols-2 gap-3 mb-8 relative z-30">
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

          {/* 추천 테스트 */}
          <RecommendedTests currentTestId="face-reading" />
        </div>

        {/* 광고 - 고정 해제하고 스크롤 하단에 배치하여 버튼 가림 방지 */}
        <div className="mt-8 flex justify-center z-10 w-full overflow-hidden">
          <AdUnit />
        </div>
      </main>
    );
  }

  return null;
}

