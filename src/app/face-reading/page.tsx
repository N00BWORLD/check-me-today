"use client";

// 관상 보기 페이지 (2026-10 어르신 친화 리뉴얼)
// 흐름: 시작 → (질문 6단계 | 사진 고르기) → 분석 중 → 결과
//       저장된 결과가 있으면 시작 화면에서 "오늘의 관상 운세"(매일 바뀜)로 바로 간다
// 주소: ?daily=1 → 오늘의 관상 운세 바로 열기, ?type=<유형id> → 공유받은 결과 보기
// 화면은 _components/ 아래 컴포넌트가 그리고, 이 파일은 상태 전환만 맡는다.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  calculateFaceReading,
  calculateTraitScores,
  faceFeatures,
  faceReadingResults,
  FaceReadingResult,
  TraitScores,
} from "@/data/face-reading";
import { useIncrementPlay } from "@/hooks/useTestStats";
import StartScreen from "./_components/StartScreen";
import QuestionScreen from "./_components/QuestionScreen";
import PhotoScreen from "./_components/PhotoScreen";
import AnalyzingScreen from "./_components/AnalyzingScreen";
import ResultScreen from "./_components/ResultScreen";
import DailyScreen from "./_components/DailyScreen";
import { usePhotoFaceReading } from "./_components/usePhotoFaceReading";
import { clearFaceReading, loadFaceReading, recordDailyVisit, saveFaceReading } from "./_components/storage";

type Screen = "start" | "quiz" | "photo" | "analyzing" | "result" | "daily";

/** 직접 고른 경우 분석 중 화면을 보여 주는 시간 (광고 노출 겸) */
const QUIZ_ANALYZING_MS = 4000;
/** 사진 분석이 너무 빨리 끝나도 최소 이 시간은 분석 중 화면을 보여 준다 */
const PHOTO_MIN_ANALYZING_MS = 2500;

const findType = (id: string | null | undefined): FaceReadingResult | null =>
  (id && faceReadingResults.find((r) => r.id === id)) || null;

export default function FaceReadingPage() {
  const [screen, setScreen] = useState<Screen>("start");
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FaceReadingResult | null>(null);
  const [scores, setScores] = useState<TraitScores | null>(null);
  const [photoError, setPhotoError] = useState<"noFace" | "photoError" | null>(null);
  /** 공유받은 결과를 보는 중인지 (내 선택이 없으므로 일부 항목을 숨긴다) */
  const [isSharedView, setIsSharedView] = useState(false);

  /** 기기에 저장된 지난 결과 */
  const [saved, setSaved] = useState<FaceReadingResult | null>(null);
  const [savedSelections, setSavedSelections] = useState<Record<string, string>>({});
  const [streak, setStreak] = useState(1);

  // 직접 고른 경우의 분석 중 진행률 (시간에 따라 올라감)
  const [quizProgress, setQuizProgress] = useState(0);
  const [mode, setMode] = useState<"quiz" | "photo">("quiz");

  const { analyzePhoto, preload, reset: resetPhoto, phase: photoPhase, progress: photoProgress } = usePhotoFaceReading();
  const timersRef = useRef<number[]>([]);

  // 조회수 증가 (세션당 1회)
  useIncrementPlay("face-reading");

  /** 화면 전환 때마다 맨 위로 */
  const go = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0 });
  }, []);

  /** 오늘의 관상 운세 열기 (방문 기록도 남긴다) */
  const openDaily = useCallback(
    (type: FaceReadingResult) => {
      setResult(type);
      setStreak(recordDailyVisit());
      go("daily");
    },
    [go]
  );

  // 처음 열 때: 저장된 결과와 주소 파라미터 확인 (localStorage 는 클라이언트에서만 읽을 수 있다)
  useEffect(() => {
    const stored = loadFaceReading();
    const storedType = findType(stored?.typeId);
    if (storedType && stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(storedType);
      setSavedSelections(stored.selections);
    }

    const params = new URLSearchParams(window.location.search);
    const sharedType = findType(params.get("type"));
    if (sharedType && sharedType.id !== storedType?.id) {
      // 다른 사람이 공유한 결과: 선택 없이 유형만 보여 준다
      setResult(sharedType);
      setScores(null);
      setSelections({});
      setIsSharedView(true);
      setScreen("result");
      return;
    }
    if ((params.get("daily") === "1" || sharedType) && storedType) {
      openDaily(storedType);
    }
  }, [openDaily]);

  // 화면을 떠날 때 남은 타이머 정리
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  /** 선택지를 결과로 바꾸고 결과 화면으로 이동. 결과는 기기에 저장한다 */
  const finish = useCallback(
    (finalSelections: Record<string, string>) => {
      const type = calculateFaceReading(finalSelections);
      setResult(type);
      setScores(calculateTraitScores(finalSelections));
      setSelections(finalSelections);
      setIsSharedView(false);
      saveFaceReading(type.id, finalSelections);
      setSaved(type);
      setSavedSelections(finalSelections);
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

  /** 처음부터 다시 (저장된 결과도 지운다) */
  const handleRetry = () => {
    clearFaceReading();
    setSaved(null);
    setSavedSelections({});
    setStepIndex(0);
    setSelections({});
    setResult(null);
    setScores(null);
    setPhotoError(null);
    setIsSharedView(false);
    go("start");
  };

  /** 저장된 내 결과 전체를 다시 보기 */
  const showSavedResult = () => {
    if (!saved) return;
    setResult(saved);
    setSelections(savedSelections);
    setScores(Object.keys(savedSelections).length ? calculateTraitScores(savedSelections) : null);
    setIsSharedView(false);
    go("result");
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

  if (screen === "daily" && result) {
    return (
      <DailyScreen
        result={result}
        streak={streak}
        onShowResult={showSavedResult}
        onRetry={handleRetry}
        onBack={() => go("start")}
      />
    );
  }

  if (screen === "result" && result) {
    return (
      <ResultScreen
        result={result}
        scores={scores}
        selections={selections}
        isSharedView={isSharedView}
        onRetry={handleRetry}
        onDaily={() => openDaily(result)}
        onStartMine={() => {
          setIsSharedView(false);
          setStepIndex(0);
          setSelections({});
          go("quiz");
        }}
      />
    );
  }

  return (
    <StartScreen
      saved={saved}
      onStart={() => {
        setStepIndex(0);
        setSelections({});
        setIsSharedView(false);
        go("quiz");
      }}
      onPhoto={() => {
        setPhotoError(null);
        go("photo");
      }}
      onDaily={() => saved && openDaily(saved)}
    />
  );
}
