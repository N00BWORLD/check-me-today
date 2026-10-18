"use client";

// 오늘의 운세: 입력 → 복주머니 열기(2초) → 결과
// 데이터와 생성 규칙은 src/data/fortunes.ts, 화면 조각은 ./_components 에 있다
import { useEffect, useRef, useState } from "react";
import { generateDailyFortune, type DailyFortune, type FortuneInput } from "@/data/fortunes";
import { useIncrementPlay } from "@/hooks/useTestStats";
import FortuneForm from "./_components/FortuneForm";
import FortuneOpening from "./_components/FortuneOpening";
import FortuneResult from "./_components/FortuneResult";

type Stage = "input" | "opening" | "result";

const OPENING_MS = 2000;

export default function FortunePage() {
  const [stage, setStage] = useState<Stage>("input");
  const [name, setName] = useState("");
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 조회수 기록 (세션당 1회)
  useIncrementPlay("fortune");

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (input: FortuneInput) => {
    setName(input.name);
    setFortune(generateDailyFortune(input));
    setStage("opening");
    timerRef.current = setTimeout(() => setStage("result"), OPENING_MS);
  };

  const handleRetry = () => {
    setFortune(null);
    setStage("input");
  };

  if (stage === "opening") return <FortuneOpening />;
  if (stage === "result" && fortune) return <FortuneResult fortune={fortune} name={name} onRetry={handleRetry} />;
  return <FortuneForm onSubmit={handleSubmit} />;
}
