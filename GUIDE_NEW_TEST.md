# 🎯 새 테스트 추가 가이드

Check Me Today에 새로운 심리 테스트를 추가할 때 필요한 양식입니다.

---

## 📁 수정해야 할 파일

1. `src/context/LanguageContext.tsx` - 다국어 텍스트 추가
2. `src/data/` 폴더에 새 질문 파일 생성 (예: `sleepQuestions.ts`)
3. `src/app/page.tsx` - 앱 목록에 추가
4. `src/app/[테스트명]/page.tsx` - 새 테스트 페이지 생성
5. `src/components/[테스트명]Result.tsx` - 결과 컴포넌트 생성

---

## 1️⃣ 다국어 텍스트 추가 (LanguageContext.tsx)

```typescript
// uiTexts 객체에 추가할 내용

// 테스트 이름
newTestName: { 
  ko: "새 테스트 이름", 
  en: "New Test Name", 
  zh: "新测试名称", 
  ja: "新テスト名" 
},

// 테스트 설명 (홈 화면에 표시)
newTestDesc: { 
  ko: "테스트 설명 한줄", 
  en: "One line description", 
  zh: "一行描述", 
  ja: "テストの説明" 
},

// 결과 타입 이름들
newResultType1Title: { ko: "결과1 제목", en: "Result 1 Title", zh: "结果1标题", ja: "結果1タイトル" },
newResultType1Subtitle: { ko: "결과1 부제목", en: "Result 1 Subtitle", zh: "结果1副标题", ja: "結果1サブタイトル" },
newResultType1Desc: { 
  ko: "결과1 상세 설명...", 
  en: "Result 1 detailed description...", 
  zh: "结果1详细描述...", 
  ja: "結果1の詳細説明..." 
},

// 태그들
newTag1: { ko: "#태그1", en: "#Tag1", zh: "#标签1", ja: "#タグ1" },
```

---

## 2️⃣ 질문 데이터 파일 양식

파일 위치: `src/data/newTestQuestions.ts`

```typescript
export type NewTestResultType = 'TYPE_A' | 'TYPE_B' | 'TYPE_C'; // 결과 유형들

export type NewTestTraitType = 'trait1' | 'trait2' | 'trait3'; // 특성들

export interface NewTestTraitScore {
    trait: NewTestTraitType;
    score: number; // 1-20 점
}

export interface NewTestOption {
    id: number;
    text: Record<string, string>; // 다국어 { ko: "", en: "", zh: "", ja: "" }
    type: NewTestResultType;
    traits: NewTestTraitScore[];
}

export interface NewTestQuestion {
    id: number;
    text: Record<string, string>; // 다국어
    options: NewTestOption[];
}

// 특성 이름 (결과 화면에 표시)
export const newTestTraitNames: Record<NewTestTraitType, Record<string, string>> = {
    trait1: { ko: "특성1", en: "Trait 1", zh: "特性1", ja: "特性1" },
    trait2: { ko: "특성2", en: "Trait 2", zh: "特性2", ja: "特性2" },
    trait3: { ko: "특성3", en: "Trait 3", zh: "特性3", ja: "特性3" },
};

// 질문 배열 (최소 5개 이상 권장)
export const newTestQuestions: NewTestQuestion[] = [
    {
        id: 1,
        text: {
            ko: "질문 1 내용?",
            en: "Question 1 content?",
            zh: "问题1内容？",
            ja: "質問1の内容？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "선택지 A",
                    en: "Option A",
                    zh: "选项A",
                    ja: "選択肢A"
                },
                type: 'TYPE_A',
                traits: [
                    { trait: 'trait1', score: 15 },
                    { trait: 'trait2', score: 10 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "선택지 B",
                    en: "Option B",
                    zh: "选项B",
                    ja: "選択肢B"
                },
                type: 'TYPE_B',
                traits: [
                    { trait: 'trait2', score: 12 },
                    { trait: 'trait3', score: 10 },
                ]
            },
        ],
    },
    // ... 더 많은 질문 추가
];

// 최대 점수 (퍼센트 계산용)
export const newTestMaxScores: Record<NewTestTraitType, number> = {
    trait1: 80,
    trait2: 70,
    trait3: 60,
};
```

---

## 3️⃣ 홈 화면 앱 목록 추가 (page.tsx)

```typescript
const APPS = [
  // ... 기존 앱들
  {
    id: "newtest",                              // 고유 ID
    title: t(uiTexts.newTestName),              // 번역된 이름
    description: t(uiTexts.newTestDesc),        // 번역된 설명
    emoji: "🆕",                                 // 이모지 아이콘
    gradient: "from-green-500 via-teal-500 to-cyan-500",  // 아이콘 그라데이션
    bgGradient: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30", // 배경
    href: "/newtest",                           // 라우트 경로
    tags: ["태그1", "태그2", "tag1", "tag2"],    // 검색용 태그
    isComingSoon: false,                        // false면 활성화
  },
];
```

---

## 4️⃣ 그라데이션 색상 참고

```
🔥 오렌지-레드: from-orange-500 via-red-500 to-pink-500
🌙 인디고-퍼플: from-indigo-500 via-purple-500 to-blue-500
🎨 핑크-앰버: from-pink-500 via-rose-500 to-amber-500
🌿 그린-틸: from-green-500 via-teal-500 to-cyan-500
💙 블루-시안: from-blue-500 via-cyan-500 to-teal-500
💜 퍼플-핑크: from-purple-500 via-fuchsia-500 to-pink-500
🧡 앰버-오렌지: from-amber-500 via-orange-500 to-red-500
```

---

## 5️⃣ 결과 타입 정의 양식

```typescript
const resultDescriptions = {
    TYPE_A: {
        title: t(uiTexts.newResultType1Title),
        badge: "🏆 TYPE A",
        subtitle: t(uiTexts.newResultType1Subtitle),
        emoji: "🏆",
        tags: [t(uiTexts.newTag1), t(uiTexts.newTag2), ...],
        description: t(uiTexts.newResultType1Desc),
        color: {
            gradient: "from-green-500 via-teal-500 to-cyan-500",
            bg: "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
            accent: "text-green-500 dark:text-green-400",
            ring: "ring-green-200 dark:ring-green-800",
        },
        traits: ["trait1", "trait2", "trait3"], // 표시할 특성들
    },
    TYPE_B: {
        // ... TYPE_B 정의
    },
};
```

---

## 📋 ChatGPT에게 요청할 때 템플릿

```
새로운 심리 테스트를 만들어줘.

테스트 주제: [주제]
결과 유형 개수: [2~4개]
질문 개수: [5~10개]

아래 양식으로 만들어줘:

1. 결과 유형 정의:
   - TYPE_A 이름, 설명, 특징 태그 3-4개
   - TYPE_B 이름, 설명, 특징 태그 3-4개
   
2. 특성 3개 정의:
   - 특성1 이름
   - 특성2 이름
   - 특성3 이름

3. 질문 [n]개:
   각 질문마다:
   - 질문 텍스트 (한/영/중/일)
   - 선택지 A (한/영/중/일) + 어떤 타입에 +점수
   - 선택지 B (한/영/중/일) + 어떤 타입에 +점수

4. 이모지 아이콘 추천
5. 색상 그라데이션 추천
```

---

## ✅ 체크리스트

- [ ] 다국어 텍스트 추가 (한/영/중/일)
- [ ] 질문 데이터 파일 생성
- [ ] 결과 타입별 설명 작성
- [ ] 특성 점수 시스템 설계
- [ ] 홈 화면에 앱 추가
- [ ] 테스트 페이지 생성
- [ ] 결과 페이지 생성
- [ ] 빌드 테스트
- [ ] 배포

---

## 💡 팁

1. **질문은 5-10개**가 적당 (너무 많으면 이탈률 증가)
2. **선택지는 2개**로 유지 (A vs B)
3. **특성 점수는 5-20 사이**로 부여
4. **이모지는 테스트 주제와 연관되게** 선택
5. **그라데이션 색상은 테스트 분위기에 맞게** 선택

