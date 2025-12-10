# 🎯 새 테스트 추가 가이드

Check Me Today에 새로운 심리 테스트를 추가할 때 필요한 양식입니다.

---

## 📁 수정해야 할 파일

1. `src/data/` 폴더에 새 질문 파일 생성 (예: `sleepQuestions.ts`)
2. `src/data/tests.ts` - **핵심!** 여기에 테스트 등록
3. `src/app/[테스트명]/page.tsx` - 새 테스트 페이지 생성
4. `src/components/[테스트명]Result.tsx` - 결과 컴포넌트 생성

---

## 1️⃣ 질문 데이터 파일 양식

파일 위치: `src/data/newTestQuestions.ts` (또는 `src/data/new-test.ts`)

```typescript
export type NewTestResultType = 'TYPE_A' | 'TYPE_B' | 'TYPE_C'; // 결과 유형들

// ... (기존 질문 데이터 구조 유지) ...
```

---

## 2️⃣ tests.ts에 등록 (가장 중요)

`src/data/tests.ts` 파일의 `tests` 배열에 새 객체를 추가합니다.
별도의 `LanguageContext` 수정이나 `page.tsx` 수정 없이, **여기만 추가하면 홈 화면에 자동으로 나타납니다.**

```typescript
{
  id: "new-test-id",      // Firebase ID
  slug: "new-test",       // URL 경로
  category: "personality", // personality | love | animal | quiz | social | fun | fortune
  type: "test",           // test | game | visual-novel
  name: { 
    ko: "새 테스트 이름", 
    en: "New Test Name", 
    zh: "新测试名称", 
    ja: "新テスト名" 
  },
  description: { 
    ko: "테스트 설명 한줄", 
    en: "One line description", 
    zh: "一行描述", 
    ja: "テストの説明" 
  },
  emoji: "🎯",
  gradient: "from-green-500 via-teal-500 to-cyan-500",
  bgGradient: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30",
  playCount: 0,
  likeCount: 0,
  badge: "NEW",           // "HOT" | "NEW" | null
  isComingSoon: false,    // false로 변경하면 활성화
  createdAt: "2025-01-01",
}
```

---

## 3️⃣ 테스트 페이지 생성

폴더: `src/app/[slug]/page.tsx`

```typescript
import { getTestBySlug } from '@/data/tests';
import { notFound } from 'next/navigation';
// ...

export default async function TestPage({ params }: Props) {
    const { slug } = await params;
    const test = getTestBySlug(slug);

    if (!test) notFound();

    // ... Quiz 컴포넌트 렌더링
}
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

## ✅ 체크리스트

- [ ] 질문 데이터 파일 생성 (`src/data/...`)
- [ ] `src/data/tests.ts`에 등록 (다국어 이름/설명 포함)
- [ ] 테스트 페이지 퍼블리싱 (`src/app/...`)
- [ ] 결과 컴포넌트 구현
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 배포 (Git Push)

---

## 💡 팁

1. **질문은 5-10개**가 적당 (너무 많으면 이탈률 증가)
2. **선택지는 2개**로 유지 (A vs B)
3. **이모지는 테스트 주제와 연관되게** 선택
4. **그라데이션 색상은 테스트 분위기에 맞게** 선택

