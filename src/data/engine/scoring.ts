// 점수 계산·결과 판정 (서버/클라이언트 공용, 부수효과 없음)
import type { QuizDefinition, QuizResultType, QuizSummary } from "./types";

/** 선택한 옵션 인덱스 배열(answers[i] = i번째 질문에서 고른 옵션 인덱스)로 점수를 합산 */
export function sumScores(quiz: QuizDefinition, answers: number[]): Record<string, number> {
    const totals: Record<string, number> = {};
    quiz.questions.forEach((q, i) => {
        const option = q.options[answers[i]];
        if (!option) return;
        for (const [key, value] of Object.entries(option.scores)) {
            totals[key] = (totals[key] ?? 0) + value;
        }
    });
    return totals;
}

/** 합산 점수로 결과 유형을 판정 */
export function resolveResult(quiz: QuizDefinition, totals: Record<string, number>): QuizResultType {
    const { scoring, results } = quiz;

    if (scoring.mode === "threshold") {
        const total = totals[scoring.axis] ?? 0;
        // min 오름차순 가정. 총점 이상인 마지막 구간
        let chosen = scoring.thresholds[0]?.result;
        for (const t of scoring.thresholds) {
            if (total >= t.min) chosen = t.result;
        }
        return results.find((r) => r.id === chosen) ?? results[0];
    }

    // sum-max: 가장 높은 점수. 동점이면 results 순서가 앞선 쪽
    let best = results[0];
    let bestScore = -Infinity;
    for (const r of results) {
        const s = totals[r.id] ?? 0;
        if (s > bestScore) {
            best = r;
            bestScore = s;
        }
    }
    return best;
}

/** 답변 배열 → 결과 유형 (위 두 함수를 합친 편의 함수) */
export function computeResult(quiz: QuizDefinition, answers: number[]): QuizResultType {
    return resolveResult(quiz, sumScores(quiz, answers));
}

/** 소요 시간(분). intro.durationMinutes 가 없으면 문항당 10초로 계산 */
export function estimateMinutes(quiz: QuizDefinition): number {
    return quiz.intro.durationMinutes ?? Math.max(1, Math.ceil((quiz.questions.length * 10) / 60));
}

/** 결과 카드·유형 페이지에 필요한 최소 정보만 추린다 (클라이언트 전송량 절감) */
export function toQuizSummary(quiz: QuizDefinition): QuizSummary {
    return {
        slug: quiz.slug,
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        emoji: quiz.emoji,
        theme: quiz.theme,
        results: quiz.results.map(({ id, emoji, title, subtitle }) => ({ id, emoji, title, subtitle })),
    };
}
