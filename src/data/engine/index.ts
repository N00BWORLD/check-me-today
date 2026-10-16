// 엔진 테스트 레지스트리
// 새 테스트 데이터 파일을 만들면 아래 quizzes[] 에 추가한다.
// (이 파일은 서버 컴포넌트에서만 import 할 것 — 클라이언트에서 import 하면 모든 테스트 데이터가 번들에 포함됨)
import type { QuizDefinition, QuizResultType } from "./types";

export const quizzes: QuizDefinition[] = [
];

export function getQuizBySlug(slug: string): QuizDefinition | undefined {
    return quizzes.find((q) => q.slug === slug);
}

export function getQuizResultType(quiz: QuizDefinition, typeId: string): QuizResultType | undefined {
    return quiz.results.find((r) => r.id === typeId);
}

export * from "./types";
export * from "./scoring";
