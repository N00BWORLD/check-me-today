export interface MenuItem {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  emoji: string;
  category: string;
  calories: number;
}

export type TimeSlot = 'morning' | 'lunch' | 'dinner' | 'snack';

export const menuRecommendations: MenuItem[] = [
  {
    id: "bibimbap",
    name: { ko: "비빔밥", en: "Bibimbap", zh: "拌饭", ja: "ビビンバ" },
    description: {
      ko: "건강한 나물과 고추장의 조화",
      en: "Mixed rice with vegetables and chili paste",
      zh: "蔬菜和辣椒酱的完美组合",
      ja: "野菜とコチュジャンの調和"
    },
    emoji: "🥗",
    category: "korean",
    calories: 550
  },
  {
    id: "kimchi-stew",
    name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ" },
    description: {
      ko: "얼큰하고 시원한 한국인의 소울푸드",
      en: "Spicy and refreshing Korean soul food",
      zh: "香辣爽口的韩国灵魂美食",
      ja: "辛くてさっぱりした韓国のソウルフード"
    },
    emoji: "🥘",
    category: "korean",
    calories: 450
  },
  {
    id: "pork-cutlet",
    name: { ko: "돈까스", en: "Pork Cutlet", zh: "炸猪排", ja: "トンカツ" },
    description: {
      ko: "바삭바삭한 튀김과 소스의 만남",
      en: "Crispy fried pork with sauce",
      zh: "酥脆的炸猪排配酱汁",
      ja: "サクサクの揚げ物とソースの出会い"
    },
    emoji: "🍱",
    category: "japanese",
    calories: 700
  },
  {
    id: "sushi",
    name: { ko: "초밥", en: "Sushi", zh: "寿司", ja: "寿司" },
    description: {
      ko: "신선한 생선과 밥의 조화",
      en: "Fresh fish on vinegared rice",
      zh: "新鲜鱼肉和米饭的搭配",
      ja: "新鮮な魚とシャリの調和"
    },
    emoji: "🍣",
    category: "japanese",
    calories: 450
  },
  {
    id: "pizza",
    name: { ko: "피자", en: "Pizza", zh: "披萨", ja: "ピザ" },
    description: {
      ko: "치즈가 듬뿍 들어간 이탈리안 스타일",
      en: "Cheesy Italian style pizza",
      zh: "满满芝士的意式披萨",
      ja: "チーズたっぷりのイタリアンスタイル"
    },
    emoji: "🍕",
    category: "western",
    calories: 800
  },
  {
    id: "burger",
    name: { ko: "햄버거", en: "Burger", zh: "汉堡", ja: "ハンバーガー" },
    description: {
      ko: "육즙 가득한 패티와 신선한 야채",
      en: "Juicy patty with fresh vegetables",
      zh: "多汁肉饼配新鲜蔬菜",
      ja: "肉汁たっぷりのパティと新鮮野菜"
    },
    emoji: "🍔",
    category: "western",
    calories: 600
  },
  {
    id: "jjajangmyeon",
    name: { ko: "짜장면", en: "Jjajangmyeon", zh: "炸酱面", ja: "ジャージャー麺" },
    description: {
      ko: "달콤하고 짭짤한 춘장의 맛",
      en: "Noodles in black bean sauce",
      zh: "甜咸适口的炸酱面",
      ja: "甘辛い黒豆ソースの麺料理"
    },
    emoji: "🍜",
    category: "chinese",
    calories: 700
  },
  {
    id: "fried-chicken",
    name: { ko: "치킨", en: "Fried Chicken", zh: "炸鸡", ja: "フライドチキン" },
    description: {
      ko: "바삭하고 고소한 국민 간식",
      en: "Crispy and savory national snack",
      zh: "酥脆可口的国民零食",
      ja: "サクサクで香ばしい国民的おやつ"
    },
    emoji: "🍗",
    category: "snack",
    calories: 1200
  },
  {
    id: "tteokbokki",
    name: { ko: "떡볶이", en: "Tteokbokki", zh: "辣炒年糕", ja: "トッポッキ" },
    description: {
      ko: "매콤달콤한 쫄깃한 떡",
      en: "Spicy and sweet chewy rice cakes",
      zh: "辣甜有嚼劲的年糕",
      ja: "甘辛くてモチモチした餅"
    },
    emoji: "🌶️",
    category: "snack",
    calories: 400
  },
  {
    id: "salad",
    name: { ko: "샐러드", en: "Salad", zh: "沙拉", ja: "サラダ" },
    description: {
      ko: "가볍고 신선한 다이어트 식단",
      en: "Light and fresh diet meal",
      zh: "轻盈新鲜的减肥餐",
      ja: "軽くて新鮮なダイエット食"
    },
    emoji: "🥗",
    category: "light",
    calories: 200
  },
  {
    id: "ramen",
    name: { ko: "라면", en: "Ramen", zh: "拉面", ja: "ラーメン" },
    description: {
      ko: "얼큰한 국물의 유혹",
      en: "Spicy noodle soup temptation",
      zh: "香辣汤面的诱惑",
      ja: "辛いスープの誘惑"
    },
    emoji: "🍜",
    category: "noodle",
    calories: 500
  },
  {
    id: "pasta",
    name: { ko: "파스타", en: "Pasta", zh: "意面", ja: "パスタ" },
    description: {
      ko: "다양한 소스로 즐기는 면요리",
      en: "Noodles enjoyed with various sauces",
      zh: "多种酱汁的美味面食",
      ja: "様々なソースで楽しむ麺料理"
    },
    emoji: "🍝",
    category: "western",
    calories: 650
  }
];

export const timeSlots = {
  morning: {
    id: 'morning',
    label: { ko: '아침', en: 'Breakfast', zh: '早餐', ja: '朝食' },
    range: [5, 11],
    emoji: "🌅"
  },
  lunch: {
    id: 'lunch',
    label: { ko: '점심', en: 'Lunch', zh: '午餐', ja: '昼食' },
    range: [11, 15],
    emoji: "☀️"
  },
  dinner: {
    id: 'dinner',
    label: { ko: '저녁', en: 'Dinner', zh: '晚餐', ja: '夕食' },
    range: [17, 22],
    emoji: "🌙"
  },
  snack: {
    id: 'snack',
    label: { ko: '야식', en: 'Late Snack', zh: '夜宵', ja: '夜食' },
    range: [22, 5],
    emoji: "🦉"
  }
};
