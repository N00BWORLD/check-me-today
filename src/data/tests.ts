// 테스트 데이터 중앙 관리
// 새 테스트 추가 시 이 파일만 수정하면 됨

export type CategoryId = 
  | "all" 
  | "personality" 
  | "love" 
  | "animal" 
  | "quiz" 
  | "social" 
  | "fun" 
  | "fortune";

export interface Category {
  id: CategoryId;
  name: Record<string, string>;
  emoji: string;
}

export interface TestData {
  id: string;
  slug: string; // URL 경로
  category: CategoryId;
  name: Record<string, string>;
  description: Record<string, string>;
  emoji: string;
  gradient: string;
  bgGradient: string;
  playCount: number;
  likeCount: number;
  badge?: "HOT" | "NEW" | null;
  isComingSoon: boolean;
  createdAt: string;
}

// 카테고리 정의
export const categories: Category[] = [
  { id: "all", name: { ko: "전체", en: "All", zh: "全部", ja: "すべて" }, emoji: "✨" },
  { id: "personality", name: { ko: "성격·유형", en: "Personality", zh: "性格·类型", ja: "性格·タイプ" }, emoji: "🧠" },
  { id: "love", name: { ko: "연애", en: "Love", zh: "恋爱", ja: "恋愛" }, emoji: "💕" },
  { id: "animal", name: { ko: "동물", en: "Animal", zh: "动物", ja: "動物" }, emoji: "🐾" },
  { id: "quiz", name: { ko: "퀴즈", en: "Quiz", zh: "问答", ja: "クイズ" }, emoji: "📝" },
  { id: "social", name: { ko: "사회생활", en: "Social", zh: "社会", ja: "社会生活" }, emoji: "💼" },
  { id: "fun", name: { ko: "재미", en: "Fun", zh: "趣味", ja: "おもしろ" }, emoji: "🎮" },
  { id: "fortune", name: { ko: "운세", en: "Fortune", zh: "运势", ja: "占い" }, emoji: "🔮" },
];

// 테스트 목록
export const tests: TestData[] = [
  {
    id: "energy-balance", // Firebase에서 사용하는 ID - 새로운 테스트
    slug: "test", // /test 경로
    category: "personality",
    name: { 
      ko: "에너지 밸런스 테스트", 
      en: "Energy Balance Test", 
      zh: "能量平衡测试", 
      ja: "エネルギーバランス診断" 
    },
    description: { 
      ko: "내 안의 태양과 달 ☀️🌙 심리학 기반 성향 테스트", 
      en: "Sun & Moon within you ☀️🌙 Psychology-based personality test", 
      zh: "你内心的太阳与月亮 ☀️🌙 基于心理学的性格测试",
      ja: "あなたの中の太陽と月 ☀️🌙 心理学に基づく性格診断"
    },
    emoji: "⚖️",
    gradient: "from-amber-500 via-orange-500 to-indigo-500",
    bgGradient: "from-amber-100 to-indigo-100 dark:from-amber-900/30 dark:to-indigo-900/30",
    playCount: 0, // Firebase에서 실시간으로 가져옴
    likeCount: 0, // Firebase에서 실시간으로 가져옴
    badge: "HOT",
    isComingSoon: false,
    createdAt: "2024-12-01",
  },
  {
    id: "fortune",
    slug: "fortune",
    category: "fortune",
    name: { 
      ko: "오늘의 운세", 
      en: "Daily Fortune", 
      zh: "今日运势", 
      ja: "今日の運勢" 
    },
    description: { 
      ko: "이름과 생년월일로 보는 오늘의 운세 🧧", 
      en: "Your daily fortune based on name & birth date 🧧", 
      zh: "根据姓名和生日查看今日运势 🧧",
      ja: "名前と生年月日で見る今日の運勢 🧧"
    },
    emoji: "🧧",
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    bgGradient: "from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "HOT",
    isComingSoon: false,
    createdAt: "2024-12-06",
  },
  {
    id: "face-reading",
    slug: "face-reading",
    category: "fortune",
    name: { 
      ko: "관상 분석", 
      en: "Face Reading", 
      zh: "面相分析", 
      ja: "人相占い" 
    },
    description: { 
      ko: "동양 전통 관상학으로 보는 나의 얼굴 🔮", 
      en: "Your face through Eastern physiognomy 🔮", 
      zh: "用东方传统面相学看你的脸 🔮",
      ja: "東洋伝統の人相学で見るあなたの顔 🔮"
    },
    emoji: "🔮",
    gradient: "from-amber-800 via-red-900 to-amber-900",
    bgGradient: "from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: false,
    createdAt: "2024-12-07",
  },
  {
    id: "love-type",
    slug: "love-test",
    category: "love",
    name: { 
      ko: "연애 유형 테스트", 
      en: "Love Type Test", 
      zh: "恋爱类型测试", 
      ja: "恋愛タイプ診断" 
    },
    description: { 
      ko: "나의 연애 스타일은? 이상형은 어떤 사람?", 
      en: "What's my dating style? Who's my ideal type?", 
      zh: "我的恋爱风格是什么？理想型是什么样的人？",
      ja: "私の恋愛スタイルは？理想のタイプは？"
    },
    emoji: "💕",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    bgGradient: "from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: true,
    createdAt: "2024-12-06",
  },
  {
    id: "animal-self",
    slug: "animal-test",
    category: "animal",
    name: { 
      ko: "나의 동물 자아", 
      en: "My Animal Self", 
      zh: "我的动物自我", 
      ja: "私の動物キャラ" 
    },
    description: { 
      ko: "내 안에 숨어있는 동물은? 귀여운 동물 테스트", 
      en: "What animal lives inside you?", 
      zh: "你内心深处住着什么动物？",
      ja: "あなたの中に隠れている動物は？"
    },
    emoji: "🦊",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    bgGradient: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: true,
    createdAt: "2024-12-06",
  },
  {
    id: "sleep-type",
    slug: "sleep-test",
    category: "personality",
    name: { 
      ko: "수면 유형 테스트", 
      en: "Sleep Type Test", 
      zh: "睡眠类型测试", 
      ja: "睡眠タイプ診断" 
    },
    description: { 
      ko: "나의 수면 패턴으로 알아보는 생활 습관", 
      en: "Discover your lifestyle through sleep patterns", 
      zh: "通过睡眠模式了解你的生活习惯",
      ja: "睡眠パターンでわかる生活習慣"
    },
    emoji: "🌙",
    gradient: "from-indigo-500 via-purple-500 to-blue-500",
    bgGradient: "from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30",
    playCount: 0,
    likeCount: 0,
    badge: null,
    isComingSoon: true,
    createdAt: "2024-12-06",
  },
  {
    id: "personal-color",
    slug: "color-test",
    category: "fun",
    name: { 
      ko: "퍼스널 컬러", 
      en: "Personal Color", 
      zh: "个人色彩", 
      ja: "パーソナルカラー" 
    },
    description: { 
      ko: "나에게 어울리는 색은? 퍼스널 컬러 진단", 
      en: "What colors suit you best?", 
      zh: "什么颜色最适合你？",
      ja: "あなたに似合う色は？"
    },
    emoji: "🎨",
    gradient: "from-pink-500 via-purple-500 to-cyan-500",
    bgGradient: "from-pink-100 to-cyan-100 dark:from-pink-900/30 dark:to-cyan-900/30",
    playCount: 0,
    likeCount: 0,
    badge: null,
    isComingSoon: true,
    createdAt: "2024-12-06",
  },
  {
    id: "meme-test",
    slug: "meme-test",
    category: "quiz",
    name: { 
      ko: "밈 능력고사", 
      en: "Meme Quiz", 
      zh: "网络梗考试", 
      ja: "ミーム検定" 
    },
    description: { 
      ko: "2024 밈 얼마나 알아? 인터넷 고인물 테스트", 
      en: "How well do you know 2024 memes?", 
      zh: "你对2024年的网络梗了解多少？",
      ja: "2024年のミームどれくらい知ってる？"
    },
    emoji: "😂",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bgGradient: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30",
    playCount: 0,
    likeCount: 0,
    badge: null,
    isComingSoon: true,
    createdAt: "2024-12-06",
  },
];

// 유틸리티 함수들
export function getTestsByCategory(categoryId: CategoryId): TestData[] {
  if (categoryId === "all") return tests;
  return tests.filter(test => test.category === categoryId);
}

export function getTestBySlug(slug: string): TestData | undefined {
  return tests.find(test => test.slug === slug);
}

export function getActiveTests(): TestData[] {
  return tests.filter(test => !test.isComingSoon);
}

export function formatPlayCount(count: number): string {
  if (count >= 100000000) {
    return `${(count / 100000000).toFixed(1)}억`;
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}천`;
  }
  return count.toString();
}
