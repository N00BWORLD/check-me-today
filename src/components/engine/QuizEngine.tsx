"use client";

// 범용 테스트 엔진 오케스트레이터: 랜딩 → 질문 → 분석 중 → 결과
// - 결과가 나오면 URL 에 ?r=유형id 를 붙여 그 주소를 공유하면 같은 결과가 열린다.
// - ?r= 로 직접 들어오면(공유 링크) 바로 결과 화면을 보여주고 "나도 테스트하기"를 안내한다.
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizDefinition, QuizResultType } from "@/data/engine/types";
import { computeResult, toQuizSummary } from "@/data/engine/scoring";
import { useIncrementPlay } from "@/hooks/useTestStats";
import QuizLanding from "./QuizLanding";
import QuizPlayer from "./QuizPlayer";
import QuizResult from "./QuizResult";
import { engineTexts } from "./engineTexts";

type Stage = "landing" | "quiz" | "analyzing" | "result";

const ANALYZING_MS = 1500;

interface Props {
    quiz: QuizDefinition;
}

export default function QuizEngine({ quiz }: Props) {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const r = searchParams.get("r");
    const sharedResult = useMemo(
        () => (r ? quiz.results.find((x) => x.id === r) : undefined),
        [quiz, r]
    );

    const [stage, setStage] = useState<Stage>(sharedResult ? "result" : "landing");
    const [result, setResult] = useState<QuizResultType | null>(sharedResult ?? null);
    const [viaShare, setViaShare] = useState(!!sharedResult);

    const summary = useMemo(() => toQuizSummary(quiz), [quiz]);

    useIncrementPlay(quiz.id);

    // URL 의 ?r 이 바뀌면 화면을 맞춘다
    // - 공유 링크로 들어오거나 뒤로가기 등으로 ?r 이 생기면 결과 화면
    // - "다시 테스트하기"(= /q/[slug], ?r 없음) 로 이동하면 랜딩으로 복귀
    useEffect(() => {
        if (sharedResult) {
            setResult((prev) => {
                // 퀴즈를 끝내고 replaceState 로 붙인 ?r 이면 이미 같은 결과 → viaShare 유지
                if (prev?.id !== sharedResult.id) setViaShare(true);
                return sharedResult;
            });
            setStage("result");
        } else if (stage === "result") {
            setStage("landing");
            setResult(null);
            setViaShare(false);
        }
        // stage 는 의도적으로 의존성에서 제외 (r 변화에만 반응)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sharedResult]);

    const handleComplete = (answers: number[]) => {
        const computed = computeResult(quiz, answers);
        setStage("analyzing");
        setTimeout(() => {
            setResult(computed);
            setViaShare(false);
            setStage("result");
            // 공유용 주소. Next 는 history API 변경을 useSearchParams 에 반영한다
            window.history.replaceState(window.history.state, "", `?r=${computed.id}`);
        }, ANALYZING_MS);
    };

    if (stage === "quiz") {
        return <QuizPlayer quiz={quiz} onComplete={handleComplete} />;
    }

    if (stage === "analyzing") {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <div className="text-6xl animate-spin-slow mb-6">{quiz.emoji}</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r ${quiz.theme.gradient} bg-clip-text text-transparent animate-pulse`}>
                    {t(engineTexts.analyzing)}
                </h2>
            </main>
        );
    }

    if (stage === "result" && result) {
        return <QuizResult quiz={summary} result={result} viaShare={viaShare} />;
    }

    return <QuizLanding quiz={quiz} onStart={() => setStage("quiz")} />;
}
