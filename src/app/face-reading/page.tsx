"use client";

// 관상 보기 페이지 (2026-10 어르신 친화 리뉴얼)
// 흐름: 시작 → (질문 6단계 | 사진 고르기) → 분석 중 → 결과
// 화면은 _components/ 아래 컴포넌트가 그리고, 이 파일은 상태 전환만 맡는다.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  calculateFaceReading,
  calculateTraitScores,
  faceFeatures,
  FaceReadingResult,
  TraitScores,
} from "@/data/face-reading";
import { useIncrementPlay } from "@/hooks/useTestStats";
import StartScreen from "./_components/StartScreen";
import QuestionScreen from "./_components/QuestionScreen";
import PhotoScreen from "./_components/PhotoScreen";
import AnalyzingScreen from "./_components/AnalyzingScreen";
import ResultScreen from "./_components/ResultScreen";
import { usePhotoFaceReading } from "./_components/usePhotoFaceReading";

type Screen = "start" | "quiz" | "photo" | "analyzing" | "result";

/** 직접 고른 경우 분석 중 화면을 보여 주는 시간 (광고 노출 겸) */
const QUIZ_ANALYZING_MS = 4000;
/** 사진 분석이 너무 빨리 끝나도 최소 이 시간은 분석 중 화면을 보여 준다 */
const PHOTO_MIN_ANALYZING_MS = 2500;

export default function FaceReadingPage() {
  const [screen, setScreen] = useState<Screen>("start");
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FaceReadingResult | null>(null);
  const [scores, setScores] = useState<TraitScores | null>(null);
  const [photoError, setPhotoError] = useState<"noFace" | "photoError" | null>(null);

  // 직접 고른 경우의 분석 중 진행률 (시간에 따라 올라감)
  const [quizProgress, setQuizProgress] = useState(0);
  const [mode, setMode] = useState<"quiz" | "photo">("quiz");

  const { analyzePhoto, preload, reset: resetPhoto, phase: photoPhase, progress: photoProgress } = usePhotoFaceReading();
  const timersRef = useRef<number[]>([]);

  // 조회수 증가 (세션당 1회)
  useIncrementPlay("face-reading");

  // 화면을 떠날 때 남은 타이머 정리
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  /** 화면 전환 때마다 맨 위로 */
  const go = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0 });
  }, []);

  /** 선택지를 결과로 바꾸고 결과 화면으로 이동 */
  const finish = useCallback(
    (finalSelections: Record<string, string>) => {
      setResult(calculateFaceReading(finalSelections));
      setScores(calculateTraitScores(finalSelections));
      setSelections(finalSelections);
      go("result");
    },
    [go]
  );

  // ----- 직접 고르기 -----
  const handleSelect = (featureId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [featureId]: optionId }));
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      window.scrollTo({ top: 0 });
    } else {
      go("start");
    }
  };

  const handleNext = () => {
    const feature = faceFeatures[stepIndex];
    if (!selections[feature.id]) return;

    if (stepIndex < faceFeatures.length - 1) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0 });
      return;
    }

    // 마지막 단계: 분석 중 화면을 잠시 보여 준 뒤 결과로
    setMode("quiz");
    setQuizProgress(0);
    go("analyzing");
    const startedAt = Date.now();
    const tick = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startedAt) / QUIZ_ANALYZING_MS) * 100);
      setQuizProgress(pct);
      if (pct >= 100) window.clearInterval(tick);
    }, 100);
    const done = window.setTimeout(() => {
      window.clearInterval(tick);
      finish(selections);
    }, QUIZ_ANALYZING_MS);
    timersRef.current.push(done);
  };

  // ----- 사진으로 보기 -----
  const handlePhotoFile = async (file: File) => {
    setMode("photo");
    setPhotoError(null);
    go("analyzing");
    const startedAt = Date.now();

    try {
      const detected = await analyzePhoto(file);
      const waitMore = Math.max(0, PHOTO_MIN_ANALYZING_MS - (Date.now() - startedAt));
      const done = window.setTimeout(() => {
        if (detected) {
          finish(detected);
        } else {
          setPhotoError("noFace");
          go("photo");
        }
        resetPhoto();
      }, waitMore);
      timersRef.current.push(done);
    } catch (err) {
      console.error("사진 관상 분석 실패:", err);
      setPhotoError("photoError");
      resetPhoto();
      go("photo");
    }
  };

  /** 처음부터 다시 */
  const handleRetry = () => {
    setStepIndex(0);
    setSelections({});
    setResult(null);
    setScores(null);
    setPhotoError(null);
    go("start");
  };

  if (screen === "quiz") {
    return (
      <QuestionScreen
        stepIndex={stepIndex}
        selections={selections}
        onSelect={handleSelect}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    );
  }

  if (screen === "photo") {
    return (
      <PhotoScreen
        errorKey={photoError}
        onFileSelected={(file) => void handlePhotoFile(file)}
        onManual={() => {
          setPhotoError(null);
          setStepIndex(0);
          go("quiz");
        }}
        onBack={() => {
          setPhotoError(null);
          go("start");
        }}
        onEnter={preload}
      />
    );
  }

  if (screen === "analyzing") {
    const isPhoto = mode === "photo";
    const messageKey = !isPhoto
      ? "analyzing"
      : photoPhase === "preparing"
        ? "analyzingPreparing"
        : photoPhase === "done"
          ? "analyzingDone"
          : "analyzingPhoto";
    return <AnalyzingScreen progress={isPhoto ? photoProgress : quizProgress} messageKey={messageKey} />;
  }

  if (screen === "result" && result && scores) {
    return <ResultScreen result={result} scores={scores} selections={selections} onRetry={handleRetry} />;
  }

  return (
    <StartScreen
      onStart={() => {
        setStepIndex(0);
        setSelections({});
        go("quiz");
      }}
      onPhoto={() => {
        setPhotoError(null);
        go("photo");
      }}
    />
  );
}
