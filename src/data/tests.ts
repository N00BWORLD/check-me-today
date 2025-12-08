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

export type ContentType = 'test' | 'game';

export interface TestData {
  id: string;
  slug: string; // URL 경로
  type: ContentType; // 'test' 또는 'game'
  category: CategoryId;
  name: Record<string, string>;
  description: Record<string, string>;
  keywords?: string[]; // SEO 키워드
  emoji: string;
  gradient: string;
  bgGradient: string;
  playCount: number;
  likeCount: number;
  badge?: "HOT" | "NEW" | null;
  isComingSoon: boolean;
  createdAt: string;
  // 게임일 경우 질문 데이터가 없을 수 있음
  questions?: any[];
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
    type: "test",
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
    type: "test",
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
    type: "test",
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
    type: "test",
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
    type: "test",
    category: "animal",
    name: {
      ko: "나의 동물 자아",
      en: "My Animal Self",
      zh: "我的动物自我",
      ja: "私の動物キャラ"
    },
    description: {
      ko: "동물 행동 습성으로 찾는 내 안의 동물 🐾",
      en: "Find your inner animal through behavior patterns 🐾",
      zh: "通过动物行为习性找到你内心的动物 🐾",
      ja: "動物の行動習性で見つける内なる動物 🐾"
    },
    emoji: "🦊",
    gradient: "from-amber-500 via-orange-500 to-emerald-500",
    bgGradient: "from-amber-100 to-emerald-100 dark:from-amber-900/30 dark:to-emerald-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: false,
    createdAt: "2024-12-07",
  },
  {
    id: "menu-recommendation",
    slug: "menu-recommendation",
    type: "test",
    category: "fun",
    name: {
      ko: "오늘의 메뉴추천",
      en: "Today's Menu",
      zh: "今日菜单推荐",
      ja: "今日のメニューおすすめ"
    },
    description: {
      ko: "🍽️ 지금 시간에 맞는 최적의 메뉴! 아침·점심·저녁·야식 별 추천",
      en: "🍽️ Perfect menu for your current time! Breakfast·Lunch·Dinner·Late-night",
      zh: "🍽️ 适合当前时间的完美菜单！早餐·午餐·晚餐·宵夜推荐",
      ja: "🍽️ 現在の時間にぴったりのメニュー！朝・昼・夕・夜食のおすすめ"
    },
    emoji: "🍽️",
    gradient: "from-orange-500 via-red-500 to-yellow-500",
    bgGradient: "from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: false,
    createdAt: "2024-12-07",
  },
  {
    id: "spending-habits",
    slug: "spending-test",
    type: "test",
    category: "personality",
    name: {
      ko: "숨겨진 소비성향 테스트",
      en: "Hidden Spending Habits Test",
      zh: "隐藏消费习惯测试",
      ja: "隠された消費習慣テスト"
    },
    description: {
      ko: "나는 짠돌이일까? 큰손일까? 💸 소비 스타일 진단",
      en: "Minimalist or Big Spender? 💸 Diagnose your spending style",
      zh: "我是吝啬鬼还是大手大脚？💸 消费风格诊断",
      ja: "私はケチ？それとも浪費家？💸 消費スタイル診断"
    },
    emoji: "🪙",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    bgGradient: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: false,
    createdAt: "2024-12-08",
  },
  {
    id: "reaction-test",
    slug: "reaction-test",
    type: "game",
    category: "fun",
    name: {
      ko: "반응속도 테스트 ⚡",
      en: "Reaction Time Test ⚡",
      zh: "反应速度测试 ⚡",
      ja: "反応速度テスト ⚡"
    },
    description: {
      ko: "나의 뇌지컬은 상위 몇 %일까? 기네스북 도전!",
      en: "Test your reflexes! Challenge existing records!",
      zh: "测试你的反应速度！挑战吉尼斯纪录！",
      ja: "あなたの反射神経をテスト！ギネス記録に挑戦！"
    },
    keywords: ["game", "reaction", "reflex", "speed", "test"],
    emoji: "⚡",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    bgGradient: "from-yellow-100 to-red-100 dark:from-yellow-900/30 dark:to-red-900/30",
    playCount: 0,
    likeCount: 0,
    badge: "NEW",
    isComingSoon: false,
    createdAt: "2024-12-09",
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
