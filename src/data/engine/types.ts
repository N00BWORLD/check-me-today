// ─────────────────────────────────────────────────────────────
// 범용 심리테스트 엔진 스키마
//
// 이 타입에 맞는 데이터 파일 하나(src/data/engine/quizzes/*.ts)를 만들고
// src/data/engine/index.ts 의 quizzes[] 와 src/data/tests.ts 에 등록하면
// 랜딩 → 질문 → 결과 페이지(/q/[slug]) 와 결과 유형별 페이지(/q/[slug]/[type]),
// OG 이미지, 사이트맵이 모두 자동으로 생성된다.
// 작성 절차는 docs/GUIDE_NEW_TEST.md 참고.
// ─────────────────────────────────────────────────────────────

/** 다국어 텍스트. 4개 언어를 모두 채운다 (docs/I18N_GUIDELINES.md)
 *  interface 가 아닌 type 으로 선언해야 useLanguage().t(Record<string,string>) 에 그대로 넘길 수 있다 */
export type LocalizedText = {
    ko: string;
    en: string;
    zh: string;
    ja: string;
};

/** 지원 언어 코드 */
export type QuizLang = keyof LocalizedText;

/** 선택지 하나. scores 의 키는 결과 유형 id(합산 방식) 또는 축 id(임계값 방식) */
export interface QuizOption {
    text: LocalizedText;
    /** 예) { fighter: 2, avoider: 1 } — 적지 않은 키는 0점 */
    scores: Record<string, number>;
}

/** 질문 하나. 선택지는 2~4개 */
export interface QuizQuestion {
    /** 생략하면 "q" + 순번 */
    id?: string;
    text: LocalizedText;
    options: QuizOption[];
}

/** 결과 유형 하나 */
export interface QuizResultType {
    /** URL(/q/[slug]/[id])·공유 링크(?r=id)에 쓰이므로 영문 소문자·하이픈만 사용 */
    id: string;
    emoji: string;
    /** 유형 이름 (예: "불도저형") */
    title: LocalizedText;
    /** 한 줄 요약 (예: "부딪혀서 해결하는 정면돌파 타입") */
    subtitle: LocalizedText;
    /** 본문 설명. 2~4문단, 문단 구분은 "\n\n" */
    description: LocalizedText;
    /** 특징 목록 (3~5개) */
    features: LocalizedText[];
    /** 이 유형에게 주는 조언 (선택) */
    advice?: LocalizedText;
    /** 잘 맞는 유형 id 목록 (선택) */
    matches?: string[];
    /** 안 맞는 유형 id 목록 (선택) */
    mismatches?: string[];
    /** 결과 카드 상단 그라데이션 Tailwind 클래스. 생략하면 테스트 테마 색 사용 */
    gradient?: string;
    /** 유형 페이지 SEO 키워드 (선택) */
    keywords?: string[];
}

/**
 * 점수 → 결과 판정 방식
 * - sum-max : 선택지 점수를 결과 유형 id 별로 합산해 가장 높은 유형. 동점이면 results 배열에서 앞선 유형
 * - threshold : 단일 축(axis) 점수를 합산해 thresholds 에서 min 이하인 가장 큰 구간의 유형
 */
export type QuizScoring =
    | { mode: "sum-max" }
    | {
        mode: "threshold";
        /** 합산할 scores 키 */
        axis: string;
        /** min 오름차순으로 작성. 총점 >= min 인 마지막 구간이 선택됨 */
        thresholds: { min: number; result: string }[];
    };

/** 소개 섹션. 서버에서 렌더링되어 검색엔진이 읽는 본문이 된다 */
export interface QuizIntro {
    /** 이 테스트가 측정하는 것 (한국어 기준 200자 이상 권장) */
    measures: LocalizedText;
    /** 원리·배경 (이론적 근거, 왜 이렇게 나누는지. 한국어 기준 300자 이상 권장) */
    background: LocalizedText;
    /** 추가 섹션 (선택) 예: 이런 분께 추천, 결과 활용법 */
    extra?: { heading: LocalizedText; body: LocalizedText }[];
    /** 예상 소요 시간(분). 생략하면 문항 수로 자동 계산 */
    durationMinutes?: number;
}

/** 테스트 테마 색 */
export interface QuizTheme {
    /** 버튼·진행바·결과 헤더 그라데이션 (예: "from-rose-500 via-orange-500 to-amber-500") */
    gradient: string;
    /** 강조 색 Tailwind 색 이름 (예: "rose"). 선택지 호버·체크 표시에 사용 */
    accent: QuizAccent;
}

/** 강조 색으로 쓸 수 있는 Tailwind 색 이름 (클래스가 빌드에 포함되도록 목록을 고정) */
export type QuizAccent =
    | "rose" | "pink" | "fuchsia" | "purple" | "violet" | "indigo" | "blue" | "sky" | "cyan"
    | "teal" | "emerald" | "green" | "lime" | "amber" | "orange" | "red" | "slate";

/** 테스트 데이터 파일 하나의 전체 구조 */
export interface QuizDefinition {
    /** URL 경로 /q/[slug]. src/data/tests.ts 의 slug 와 같아야 한다 */
    slug: string;
    /** Firestore 통계 문서 id. src/data/tests.ts 의 id 와 같아야 한다 */
    id: string;
    name: LocalizedText;
    /** 한 줄 설명 (메타 description·OG 에 사용) */
    description: LocalizedText;
    emoji: string;
    theme: QuizTheme;
    /** SEO 키워드 */
    keywords?: string[];
    intro: QuizIntro;
    questions: QuizQuestion[];
    results: QuizResultType[];
    scoring: QuizScoring;
}

// ── 클라이언트에 넘길 때 쓰는 축약형 (질문·소개 제외, 결과 유형은 제목·이모지만) ──
export type QuizResultSummary = Pick<QuizResultType, "id" | "emoji" | "title" | "subtitle">;

export interface QuizSummary extends Pick<QuizDefinition, "slug" | "id" | "name" | "description" | "emoji" | "theme"> {
    results: QuizResultSummary[];
}
