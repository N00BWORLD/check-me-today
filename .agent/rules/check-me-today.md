---
trigger: always_on
---

# Check Me Today - 프로젝트 개발 지침

## 프로젝트 개요
심리테스트/운세 웹사이트 (Next.js 16 + React 19 + Tailwind CSS)
- 다국어 지원: 한국어, 영어, 중국어, 일본어
- 다크/라이트 모드 지원
- Firebase 통계 연동
- Vercel 배포

---

## 프로젝트 구조

### 폴더 구조
```
src/
├── app/
│   ├── page.tsx              # 홈 (테스트 목록)
│   ├── layout.tsx            # 루트 레이아웃
│   ├── globals.css
│   │
│   ├── test/                 # 에너지 밸런스 테스트
│   │   ├── page.tsx          # 랜딩 + Quiz
│   │   └── layout.tsx        # OG 메타태그
│   │
│   ├── fortune/              # 오늘의 운세
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── face-reading/         # 관상 분석
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── animal-test/          # 나의 동물 자아
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── menu-recommendation/  # 오늘의 메뉴추천
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── _components/      # 테스트 전용 컴포넌트 예시
│   │       ├── MenuResult.tsx
│   │       └── MenuSelector.tsx
│   │
│   ├── [new-test]/           # 새 테스트 (테스트별 독립 폴더)
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── _components/      # 테스트 전용 컴포넌트
│   │
│   ├── result/               # 결과 페이지 (공용)
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── analyzing/            # 분석 중 (광고 표시)
│   │   └── page.tsx
│   │
│   ├── privacy/              # 개인정보처리방침
│   └── terms/                # 이용약관
│
├── components/               # 공용 컴포넌트
│   ├── AdUnit.tsx            # 광고
│   ├── PosterCard.tsx        # 홈 테스트 카드
│   ├── TestCard.tsx          # 테스트 카드 (대체 스타일)
│   ├── AppCard.tsx           # 앱 스타일 카드
│   ├── AppIcon.tsx           # 앱 아이콘
│   ├── Quiz.tsx              # 에너지밸런스 Quiz (전용)
│   ├── ResultCard.tsx        # 에너지밸런스 Result (전용)
│   ├── LanguageSelector.tsx
│   ├── ThemeToggle.tsx
│   ├── SearchBar.tsx
│   └── CategoryTabs.tsx
│
├── data/
│   ├── tests.ts              # 테스트 목록 (홈용)
│   ├── questions.ts          # 에너지밸런스 질문
│   ├── fortunes.ts           # 운세 데이터
│   ├── animal-test.ts        # 동물 자아 데이터
│   ├── face-reading.ts       # 관상 분석 데이터
│   └── menu-recommendation.ts # 메뉴 추천 데이터
│
├── context/
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/
│   └── useTestStats.ts       # Firebase 통계
│
└── lib/
    └── firebase.ts           # Firebase 설정
```

### 현재 테스트 목록
| 테스트 | slug | 상태 | 카테고리 |
|--------|------|------|----------|
| 에너지 밸런스 테스트 | `/test` | ✅ 활성 | 성격·유형 |
| 오늘의 운세 | `/fortune` | ✅ 활성 | 운세 |
| 관상 분석 | `/face-reading` | ✅ 활성 | 운세 |
| 나의 동물 자아 | `/animal-test` | ✅ 활성 | 동물 |
| 오늘의 메뉴추천 | `/menu-recommendation` | ✅ 활성 | 재미 |
| 연애 유형 테스트 | `/love-test` | 🔜 준비중 | 연애 |

### 카테고리
- `personality` (성격·유형) 🧠
- `love` (연애) 💕
- `animal` (동물) 🐾
- `quiz` (퀴즈) 📝
- `social` (사회생활) 💼
- `fun` (재미) 🎮
- `fortune` (운세) 🔮

---

## 새 테스트 추가 가이드

### 핵심 원칙: 테스트별 독립 컴포넌트
각 테스트는 **고유한 UI/UX**를 가져야 함 (범용 Quiz 사용 X)
→ 사용자가 매번 새로운 경험을 느끼도록!

### 1단계: 폴더 생성
```
src/app/[test-slug]/
├── page.tsx           # 랜딩 페이지 + Quiz
├── layout.tsx         # OG 메타태그
└── _components/       # 이 테스트 전용 컴포넌트
    ├── Quiz.tsx       # 고유한 Quiz UI
    └── ResultCard.tsx # 고유한 결과 카드
```

### 2단계: 데이터 파일
```
src/data/[test-slug].ts  # 질문, 결과 타입, 설명 등
```

### 3단계: tests.ts에 등록
```typescript
{
  id: "new-test-id",      // Firebase ID
  slug: "new-test",       // URL 경로
  category: "personality",
  name: { ko: "...", en: "...", zh: "...", ja: "..." },
  description: { ko: "...", en: "...", zh: "...", ja: "..." },
  emoji: "🎯",
  gradient: "from-...",
  bgGradient: "from-...",
  badge: "NEW",           // "HOT" | "NEW" | null
  isComingSoon: false,    // false로 변경하면 활성화
  createdAt: "2025-01-01",
}
```

### 4단계: 테스트별 독창성 부여
| 테스트 | 고유 요소 예시 |
|--------|---------------|
| 에너지 밸런스 | ☀️🌙 태양/달 테마, 퍼센테이지 바 |
| 관상 분석 | 🔮 동양풍 UI, 부위별 선택 |
| 동물 자아 | 🦊 동물 일러스트, 성격 매칭 |
| 메뉴 추천 | 🍽️ 시간대별 추천, 룰렛 애니메이션 |
| 연애 유형 | 💕 하트 애니메이션, 궁합 카드 |

---

## 핵심 개발 지침

### 1. 광고 (Google AdSense)
- **결과 페이지 진입 전**: `/analyzing` 페이지에서 광고 표시 (5초)
- **결과 페이지 하단**: 배너 광고
- **홈 하단**: 고정 배너 광고
- AdSense Publisher ID: `ca-pub-9155498101026498`
- 광고 컴포넌트: `src/components/AdUnit.tsx`

### 2. 결과 페이지 디자인 (스크린샷용)
- 결과 카드는 **세로형** (인스타그램 스토리 비율)
- 브랜드 워터마크: "✨ check-me.today"
- 깔끔한 배경 (그라데이션)
- 결과 공유 시 URL에 결과 타입 포함

### 3. 공유 기능
```tsx
// 공유 버튼 그룹 (4열)
<div className="grid grid-cols-4 gap-2">
  <button>📷 이미지 저장</button>  // html2canvas
  <button>🔗 링크 복사</button>
  <button>𝕏 Twitter</button>
  <button>💬 카카오톡</button>
</div>
```

### 3-1. 공유 기능 코드 템플릿
```tsx
import html2canvas from "html2canvas";

// 이미지 저장 (html2canvas)
const handleSaveImage = async () => {
  const isDark = document.documentElement.classList.contains('dark');
  const bgColor = isDark ? '#1e293b' : '#fafafa';
  
  // 캡처용 div 동적 생성 (글래스모피즘 없이 깔끔하게)
  const captureDiv = document.createElement('div');
  captureDiv.style.cssText = `
    position: fixed; left: -9999px; top: 0;
    width: 400px; padding: 40px;
    background: linear-gradient(135deg, ${isDark ? '#0f172a' : '#fff7ed'} 0%, ${bgColor} 100%);
  `;
  captureDiv.innerHTML = `/* 결과 카드 HTML */`;
  document.body.appendChild(captureDiv);
  
  const canvas = await html2canvas(captureDiv, { 
    scale: 3,  // 고해상도
    backgroundColor: bgColor,
    useCORS: true,
  });
  
  const link = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  link.download = `result-${today}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
  
  document.body.removeChild(captureDiv);
};

// 링크 복사
const handleCopyLink = async () => {
  const url = window.location.href;
  await navigator.clipboard.writeText(url);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

// 트위터 공유
const handleTwitterShare = () => {
  const url = window.location.href;
  const text = "나의 테스트 결과를 확인해보세요!";
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    '_blank'
  );
};

// 네이티브 공유 (모바일)
const handleNativeShare = async () => {
  const shareData = {
    title: '테스트 결과',
    text: '나의 테스트 결과를 확인해보세요!',
    url: window.location.href,
  };
  
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    // 폴백: 링크 복사
    handleCopyLink();
  }
};
```

### 3-2. 공유 버튼 UI 예시
```tsx
{/* 메인 공유 버튼 */}
<button
  onClick={handleNativeShare}
  className="w-full py-3 mb-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold"
>
  공유하기 🎉
</button>

{/* 공유 옵션 그리드 (4열) */}
<div className="grid grid-cols-4 gap-2">
  <button onClick={handleSaveImage} className="py-3 px-2 glass rounded-xl text-center">
    <div className="text-xl mb-1">📷</div>
    <div className="text-xs">이미지 저장</div>
  </button>
  <button onClick={handleCopyLink} className="py-3 px-2 glass rounded-xl text-center">
    <div className="text-xl mb-1">{copied ? "✅" : "🔗"}</div>
    <div className="text-xs">{copied ? "복사됨!" : "링크 복사"}</div>
  </button>
  <button onClick={handleTwitterShare} className="py-3 px-2 glass rounded-xl text-center">
    <div className="text-xl mb-1">𝕏</div>
    <div className="text-xs">Twitter</div>
  </button>
  <button onClick={handleCopyLink} className="py-3 px-2 glass rounded-xl text-center">
    <div className="text-xl mb-1">💬</div>
    <div className="text-xs">카카오톡</div>
  </button>
</div>
```

### 4. 테스트 플로우
```
홈 → 테스트 랜딩 → 질문들 → [분석/광고 5초] → 결과 → 공유/다시하기
```

### 5. 코드 스타일
- 한국어 주석 사용
- Tailwind CSS 사용 (인라인 스타일 지양)
- "use client" 지시어 필요 시 명시
- 다국어 텍스트: `useLanguage()` 훅 사용

### 5-1. 다국어 처리 코드 예시
```tsx
const { t, lang } = useLanguage();

// 방법 1: 객체로 정의 후 t() 사용
const texts = {
  ko: "한국어 텍스트",
  en: "English text",
  zh: "中文文本",
  ja: "日本語テキスト"
};
<p>{t(texts)}</p>

// 방법 2: 직접 lang으로 접근
<p>{texts[lang] || texts.en}</p>

// 방법 3: 인라인 조건부
<span>
  {lang === 'ko' ? '시작하기' : 
   lang === 'zh' ? '开始' : 
   lang === 'ja' ? '開始' : 'Start'}
</span>
```

### 6. 디자인 원칙
- 글래스모피즘 (`backdrop-blur`, 반투명 배경)
- 부드러운 그라데이션
- 이모지 활용
- 다크 모드 최적화

### 7. 텍스트 처리 규칙
- **긴 텍스트 줄바꿈**: `break-keep` 클래스 (한국어)
- **카드 제목**: `line-clamp-2 break-keep` (2줄까지)
- **설명**: `line-clamp-3 break-keep` (3줄까지)
- **다국어 길이 차이**: 고정 높이 대신 `min-h-[]` 사용

---

## 자주 사용하는 명령어
```bash
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
git push origin main # Vercel 자동 배포
```

## 참고 사항
- 기본 테마: 다크 모드
- Firebase 설정: `.env.local` 파일 참조
- 결과 페이지 URL: `/result?type=xxx&score=xxx`
- 연도: 2025년 (약관/개인정보처리방침)

---

## 워크스페이스 규칙
### 1. 작업 완료 시 Git Push
- 기능 구현, 버그 수정 등 하나의 작업(Task)이 "완료"되면 **반드시** `git push`를 실행하여 변경 사항을 원격 저장소에 반영한다.
- 커밋 메시지는 논리적인 작업 단위(기능 추가, 수정 등)를 명확히 기술한다.
- 사용자가 "완료", "끝", "푸쉬해줘" 등의 요청을 하면 즉시 반영한다.
