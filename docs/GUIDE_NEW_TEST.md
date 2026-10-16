# 🎯 새 심리테스트 추가 가이드 (범용 엔진)

check-me.today 에 새 심리테스트를 추가하는 방법입니다.
**데이터 파일 1개 + 등록 2줄**이면 랜딩 → 질문 → 결과 페이지, 결과 유형별 페이지, OG 이미지, 홈 카드, 사이트맵이 모두 자동으로 만들어집니다.

> 루트의 `GUIDE_NEW_TEST.md` 는 엔진 이전 방식(테스트마다 page.tsx 를 손으로 작성)입니다. 새 테스트는 이 문서를 따르세요.

---

## 0. 한눈에 보기

| 단계 | 파일 | 할 일 |
|---|---|---|
| 1 | `src/data/engine/quizzes/<slug>.ts` | **새로 작성** — 질문·결과·소개글 (4개 언어) |
| 2 | `src/data/engine/index.ts` | `quizzes[]` 배열에 import 한 줄 추가 |
| 3 | `src/data/tests.ts` | `tests[]` 배열에 항목 하나 추가 (`type: "quiz"`) |
| 4 | — | `npx tsc --noEmit` → `npm run dev` 로 확인 → 커밋 |

자동으로 생기는 것:

| URL | 내용 |
|---|---|
| `/q/<slug>` | 랜딩(소개글, 서버 렌더링) → 질문 → 결과. `?r=<유형id>` 로 공유 링크 |
| `/q/<slug>/<유형id>` | 결과 유형별 정적 페이지 (유형 설명 전문 + "나도 테스트하기") |
| `/api/og?...` | 테스트·유형별 OG 이미지 (메타데이터에 자동 연결) |
| `/` 홈 카드, `/sitemap.xml` | `tests.ts` 와 엔진 레지스트리에서 자동 생성 |

엔진 코드 위치: 스키마 `src/data/engine/types.ts`, 판정 `src/data/engine/scoring.ts`, 화면 `src/components/engine/`, 라우트 `src/app/q/`.

---

## 1. 데이터 파일 양식

파일: `src/data/engine/quizzes/<slug>.ts`
전체 샘플: [`src/data/engine/quizzes/work-stress.ts`](../src/data/engine/quizzes/work-stress.ts) (10문항 · 4유형 · 4개 언어)

```typescript
import type { QuizDefinition } from "../types";

export const sleepTypeQuiz: QuizDefinition = {
    slug: "sleep-type",            // URL: /q/sleep-type  (tests.ts 의 slug 와 동일)
    id: "sleep-type",              // Firestore 통계 문서 id (tests.ts 의 id 와 동일)
    name: { ko: "수면 유형 테스트", en: "Sleep Type Test", zh: "睡眠类型测试", ja: "睡眠タイプ診断" },
    description: { ko: "한 줄 설명 (메타·OG 에 사용)", en: "...", zh: "...", ja: "..." },
    emoji: "🌙",                   // Windows 10 에서 보이는 2019년 이전 이모지만
    theme: {
        gradient: "from-indigo-500 via-purple-500 to-blue-500", // 버튼·진행바·결과 헤더
        accent: "indigo",          // 선택지 강조색. types.ts 의 QuizAccent 목록 중 하나
    },
    keywords: ["수면 유형 테스트", "sleep type quiz"],

    // ── 소개 섹션: 서버가 렌더링해 검색엔진이 읽는 본문. 한국어 기준 600자 이상 ──
    intro: {
        measures: { ko: "이 테스트가 측정하는 것 (200자+)", en: "...", zh: "...", ja: "..." },
        background: { ko: "원리·배경 (300자+). 문단 구분은 \\n\\n", en: "...", zh: "...", ja: "..." },
        extra: [   // 선택. "이런 분께 추천" 같은 추가 섹션
            { heading: { ko: "...", en: "...", zh: "...", ja: "..." }, body: { ko: "...", en: "...", zh: "...", ja: "..." } },
        ],
        durationMinutes: 3,        // 선택. 생략하면 문항당 10초로 계산
    },

    // ── 질문: 8~12개 권장, 선택지 2~4개. scores 의 키 = 결과 유형 id ──
    questions: [
        {
            text: { ko: "질문 1", en: "...", zh: "...", ja: "..." },
            options: [
                { text: { ko: "선택지 A", en: "...", zh: "...", ja: "..." }, scores: { owl: 2 } },
                { text: { ko: "선택지 B", en: "...", zh: "...", ja: "..." }, scores: { lark: 2 } },
                { text: { ko: "선택지 C", en: "...", zh: "...", ja: "..." }, scores: { owl: 1, lark: 1 } }, // 두 유형에 나눠 주기 가능
            ],
        },
        // ...
    ],

    // ── 결과 유형: 3~6개 권장 ──
    results: [
        {
            id: "owl",             // URL 에 쓰임: 영문 소문자·하이픈만
            emoji: "🦉",
            title: { ko: "올빼미형", en: "The Owl", zh: "猫头鹰型", ja: "フクロウタイプ" },
            subtitle: { ko: "한 줄 요약", en: "...", zh: "...", ja: "..." },
            description: { ko: "본문 2~4문단. 문단 구분은 \\n\\n (한국어 300자+)", en: "...", zh: "...", ja: "..." },
            features: [            // 3~5개
                { ko: "특징 1", en: "...", zh: "...", ja: "..." },
            ],
            advice: { ko: "이 유형을 위한 조언 (선택)", en: "...", zh: "...", ja: "..." },
            matches: ["lark"],     // 잘 맞는 유형 id (선택)
            mismatches: [],        // 안 맞는 유형 id (선택)
            gradient: "from-indigo-600 to-slate-800", // 결과 카드 헤더 색 (선택, 생략 시 theme.gradient)
        },
        // ...
    ],

    // ── 판정 방식 ──
    scoring: { mode: "sum-max" },  // 유형별 합산 → 최고 점수 유형 (동점이면 results 순서가 앞선 쪽)
    // 또는 단일 축 점수 구간 판정:
    // scoring: { mode: "threshold", axis: "stress", thresholds: [
    //     { min: 0, result: "calm" }, { min: 8, result: "tense" }, { min: 15, result: "burnout" },
    // ] },
};
```

### 작성 요령
- **4개 언어(ko·en·zh·ja)를 전부 채웁니다.** 빠진 키는 타입 오류로 잡힙니다. (`docs/I18N_GUIDELINES.md`)
- **소개글은 검색 유입의 핵심입니다.** "무엇을 측정하는지"와 "왜 이렇게 나누는지(이론 근거)"를 한국어 기준 600자 이상 써 주세요.
- **문항 수는 8~12개**, 선택지는 2~4개. 선택지가 어느 유형에 몇 점을 주는지가 결과를 결정하므로 유형별 총점 기회가 비슷하게 배분되었는지 확인합니다.
- **결과 설명은 길게.** 유형 페이지(`/q/<slug>/<유형id>`)가 독립 색인되므로 설명 2~4문단 + 특징 + 조언을 채우면 페이지당 콘텐츠가 충분해집니다.
- 이모지는 **2019년 이전 유니코드**만 사용 (Windows 10 에서 네모로 깨짐 방지).
- 광고는 엔진이 결과 카드 아래에 자동으로 넣습니다. 데이터에서 신경 쓸 필요 없습니다.

---

## 2. 레지스트리 등록 — `src/data/engine/index.ts`

```typescript
import { workStressQuiz } from "./quizzes/work-stress";
import { sleepTypeQuiz } from "./quizzes/sleep-type";   // ← 추가

export const quizzes: QuizDefinition[] = [
    workStressQuiz,
    sleepTypeQuiz,                                       // ← 추가
];
```

이 배열이 `/q/[slug]` 라우트, 유형별 정적 페이지 생성, 사이트맵의 근거입니다.
(이 파일은 서버 컴포넌트에서만 import 합니다. 클라이언트 컴포넌트에서 import 하면 모든 테스트 데이터가 번들에 들어갑니다.)

---

## 3. 홈 카드 등록 — `src/data/tests.ts`

`tests[]` 배열에 항목을 추가합니다. `type: "quiz"` 가 핵심이며, `getTestPath()` 가 이 값을 보고 `/q/<slug>` 로 연결합니다.

```typescript
{
  id: "sleep-type",        // 데이터 파일의 id 와 동일
  slug: "sleep-type",      // 데이터 파일의 slug 와 동일
  type: "quiz",            // ★ 범용 엔진 테스트
  category: "personality", // personality | love | animal | quiz | social | fun | fortune
  name: { ko: "수면 유형 테스트", en: "Sleep Type Test", zh: "睡眠类型测试", ja: "睡眠タイプ診断" },
  description: { ko: "한 줄 설명", en: "...", zh: "...", ja: "..." },
  keywords: ["수면 유형 테스트"],
  emoji: "🌙",
  gradient: "from-indigo-500 via-purple-500 to-blue-500",
  bgGradient: "from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30",
  playCount: 0,
  likeCount: 0,
  badge: "NEW",            // "HOT" | "NEW" | null
  isComingSoon: false,
  createdAt: "2026-10-16",
},
```

`name`·`description`·`emoji` 는 데이터 파일과 같은 값을 복사합니다. (홈 화면 번들을 가볍게 유지하려고 일부러 분리해 둔 것입니다.)

---

## 4. 확인 및 커밋

```bash
npx tsc --noEmit
```

```bash
npm run dev
```

브라우저에서 확인할 것 (포트 2222):
- `http://localhost:2222/q/<slug>` 랜딩 → 끝까지 진행 → 결과 → 주소창에 `?r=<유형id>` 가 붙는지
- `http://localhost:2222/q/<slug>?r=<유형id>` 로 직접 열면 결과가 바로 보이고 "나도 테스트하기" 안내가 뜨는지
- `http://localhost:2222/q/<slug>/<유형id>` 유형 페이지
- 홈 카드 클릭 → `/q/<slug>` 로 이동하는지
- `http://localhost:2222/sitemap.xml` 에 테스트·유형 URL 포함
- 언어 바꿔 가며 4개 언어 모두 표시

```bash
npm run build
```

통과하면 커밋합니다 (push 는 지시가 있을 때만).

---

## ✅ 체크리스트

- [ ] `src/data/engine/quizzes/<slug>.ts` 작성 (slug·id 는 tests.ts 와 동일)
- [ ] 소개글 한국어 600자 이상, 4개 언어 모두 작성
- [ ] 질문 8~12개, 선택지별 `scores` 키가 결과 유형 id 와 일치
- [ ] 결과 유형 id 는 영문 소문자·하이픈만
- [ ] `matches`/`mismatches` 에 적은 id 가 실제 존재
- [ ] 이모지는 2019년 이전 것만
- [ ] `src/data/engine/index.ts` 의 `quizzes[]` 에 추가
- [ ] `src/data/tests.ts` 에 `type: "quiz"` 항목 추가
- [ ] `npx tsc --noEmit` 통과
- [ ] 브라우저에서 랜딩 → 결과 → 공유 링크 → 유형 페이지 확인
- [ ] `npm run build` 통과 후 커밋

---

## 💡 그라데이션 색상 참고

```
🔥 오렌지-레드: from-orange-500 via-red-500 to-pink-500
🌙 인디고-퍼플: from-indigo-500 via-purple-500 to-blue-500
🎨 핑크-앰버: from-pink-500 via-rose-500 to-amber-500
🌿 그린-틸: from-green-500 via-teal-500 to-cyan-500
💙 블루-시안: from-blue-500 via-cyan-500 to-teal-500
💜 퍼플-핑크: from-purple-500 via-fuchsia-500 to-pink-500
🧡 앰버-오렌지: from-amber-500 via-orange-500 to-red-500
💼 스카이-바이올렛: from-sky-500 via-indigo-500 to-violet-500
```

`theme.accent` 로 쓸 수 있는 색 이름: rose, pink, fuchsia, purple, violet, indigo, blue, sky, cyan, teal, emerald, green, lime, amber, orange, red, slate

---

## 엔진을 고쳐야 할 때

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 데이터 필드 추가 | `src/data/engine/types.ts` → 사용하는 컴포넌트 |
| 판정 로직 (새 scoring 모드) | `src/data/engine/scoring.ts` |
| 랜딩 화면 | `src/components/engine/QuizLanding.tsx` |
| 질문 화면 (진행바·선택 애니메이션) | `src/components/engine/QuizPlayer.tsx` |
| 결과 카드 | `src/components/engine/ResultCard.tsx` (결과 화면·유형 페이지 공용) |
| 결과 화면 (공유·광고·추천) | `src/components/engine/QuizResult.tsx` |
| 유형별 페이지 | `src/components/engine/QuizTypeView.tsx`, `src/app/q/[slug]/[type]/page.tsx` |
| 메타데이터·OG | `src/app/q/[slug]/page.tsx`, `src/app/q/[slug]/[type]/page.tsx` |
| 공용 버튼 문구 | `src/components/engine/engineTexts.ts` |
