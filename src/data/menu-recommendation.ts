export interface MenuItem {
  id: string;
  name: {
    ko: string;
    en: string;
    zh: string;
    ja: string;
  };
  description: {
    ko: string;
    en: string;
    zh: string;
    ja: string;
  };
  emoji: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories?: number;
  tags: string[];
}

export const menuRecommendations: MenuItem[] = [
  // 아침 메뉴
  {
    id: 'kimchi-jjigae',
    name: {
      ko: '김치찌개',
      en: 'Kimchi Stew',
      zh: '泡菜汤',
      ja: 'キムチチゲ'
    },
    description: {
      ko: '얼큰한 김치찌개로 하루를 시작하세요! 영양만점 국물이 든든합니다.',
      en: 'Start your day with spicy kimchi stew! Full of nutrition and comforting broth.',
      zh: '用辣味泡菜汤开启新的一天！营养丰富的汤汁让你饱腹。',
      ja: '辛いキムチチゲで一日を始めよう！栄養満点のスープが心を満たします。'
    },
    emoji: '🍲',
    category: 'breakfast',
    calories: 320,
    tags: ['spicy', 'comforting', 'traditional']
  },
  {
    id: 'bibimbap',
    name: {
      ko: '비빔밥',
      en: 'Bibimbap',
      zh: '石锅拌饭',
      ja: 'ビビンバプ'
    },
    description: {
      ko: '다양한 나물과 고기, 계란이 어우러진 영양 밥상! 에너지를 충전하세요.',
      en: 'Nutritious bowl with mixed vegetables, meat, and egg! Recharge your energy.',
      zh: '蔬菜、肉类和鸡蛋混合的营养饭！为你的身体充能。',
      ja: '野菜、肉、卵が混ざった栄養満点のご飯！エネルギーをチャージしよう。'
    },
    emoji: '🍚',
    category: 'breakfast',
    calories: 450,
    tags: ['balanced', 'nutritious', 'colorful']
  },
  {
    id: 'tofu-jjigae',
    name: {
      ko: '된장찌개',
      en: 'Doenjang Stew',
      zh: '大酱汤',
      ja: 'テンジャンチゲ'
    },
    description: {
      ko: '부드러운 두부와 된장이 어우러진 구수한 국! 몸에 좋은 한 그릇.',
      en: 'Hearty stew with soft tofu and soybean paste! A healthy bowl for your body.',
      zh: '嫩豆腐和大酱融合的香浓汤！有益身体的一碗汤。',
      ja: '柔らかい豆腐と味噌が合わさった香ばしいスープ！体に良い一膳。'
    },
    emoji: '🍛',
    category: 'breakfast',
    calories: 280,
    tags: ['comforting', 'healthy', 'traditional']
  },
  {
    id: 'bulgogi',
    name: {
      ko: '불고기',
      en: 'Bulgogi',
      zh: '烤肉',
      ja: 'プルコギ'
    },
    description: {
      ko: '달콤한 양념이 밴 부드러운 소고기! 특별한 아침을 위한 메뉴.',
      en: 'Tender marinated beef with sweet sauce! A special breakfast treat.',
      zh: '涂着甜酱的嫩牛肉！为特别的早晨准备的菜品。',
      ja: '甘いタレが染みた柔らかい牛肉！特別な朝のためのメニュー。'
    },
    emoji: '🥩',
    category: 'breakfast',
    calories: 380,
    tags: ['special', 'sweet', 'protein']
  },

  // 점심 메뉴
  {
    id: 'samgyeopsal',
    name: {
      ko: '삼겹살',
      en: 'Grilled Pork Belly',
      zh: '烤五花肉',
      ja: 'サムギョプサル'
    },
    description: {
      ko: '직화로 구운 삼겹살의 풍미를 즐겨보세요! 쌈채소와 함께 완벽한 조합.',
      en: 'Enjoy the flavor of charcoal-grilled pork belly! Perfect with fresh vegetables.',
      zh: '品尝炭烤五花肉的美味！配上新鲜蔬菜是完美的组合。',
      ja: '直火で焼いた三枚肉の風味を味わおう！サンチョと共に完璧な組み合わせ。'
    },
    emoji: '🥓',
    category: 'lunch',
    calories: 520,
    tags: ['grilled', 'juicy', 'traditional']
  },
  {
    id: 'dakgalbi',
    name: {
      ko: '닭갈비',
      en: 'Spicy Chicken Stir-fry',
      zh: '辣炒鸡肉',
      ja: 'タッカルビ'
    },
    description: {
      ko: '매콤달콤한 양념이 듬뿍 밴 닭갈비! 밥도둑 메뉴의 대표주자.',
      en: 'Spicy and sweet marinated chicken stir-fry! The ultimate rice thief.',
      zh: '辣甜酱料丰富的炒鸡肉！饭小偷菜单的代表。',
      ja: '辛くて甘いタレがたっぷりのタッカルビ！飯泥棒メニューの代表格。'
    },
    emoji: '🍗',
    category: 'lunch',
    calories: 480,
    tags: ['spicy', 'sweet', 'stir-fry']
  },
  {
    id: 'japchae',
    name: {
      ko: '잡채',
      en: 'Stir-fried Glass Noodles',
      zh: '炒粉丝',
      ja: 'チャプチェ'
    },
    description: {
      ko: '쫄깃한 당면과 다양한 채소의 조화! 영양가득한 점심 메뉴.',
      en: 'Chewy noodles and mixed vegetables! A nutritious lunch option.',
      zh: '筋道的粉丝和各种蔬菜的和谐！营养丰富的午餐菜单。',
      ja: 'もちもちのタンメンと野菜のハーモニー！栄養満点のランチメニュー。'
    },
    emoji: '🥡',
    category: 'lunch',
    calories: 420,
    tags: ['noodles', 'vegetables', 'balanced']
  },
  {
    id: 'mandu',
    name: {
      ko: '만두',
      en: 'Dumplings',
      zh: '饺子',
      ja: 'マンドゥ'
    },
    description: {
      ko: '바삭바삭한 껍질에 풍부한 속이 가득! 국물이 있는 따뜻한 만두국.',
      en: 'Crispy skin filled with delicious fillings! Warm dumpling soup.',
      zh: '酥脆的外皮里塞满丰富的馅料！热腾腾的饺子汤。',
      ja: 'サクサクの皮にたっぷりの具！温かいマンドゥグク。'
    },
    emoji: '🥟',
    category: 'lunch',
    calories: 380,
    tags: ['dumplings', 'crispy', 'comforting']
  },

  // 저녁 메뉴
  {
    id: 'sundubu-jjigae',
    name: {
      ko: '순두부찌개',
      en: 'Soft Tofu Stew',
      zh: '嫩豆腐汤',
      ja: 'スンドゥブチゲ'
    },
    description: {
      ko: '부드러운 순두부가 든 매콤한 찌개! 저녁 식사로 딱 좋은 메뉴.',
      en: 'Spicy stew with soft tofu! Perfect for dinner.',
      zh: '含有嫩豆腐的辣汤！适合晚餐的菜单。',
      ja: '柔らかい順豆腐が入った辛いチゲ！夕食にぴったりのメニュー。'
    },
    emoji: '🍜',
    category: 'dinner',
    calories: 350,
    tags: ['spicy', 'soft', 'light']
  },
  {
    id: 'bibim-naengmyeon',
    name: {
      ko: '비빔냉면',
      en: 'Spicy Cold Noodles',
      zh: '拌冷面',
      ja: 'ビビム冷麺'
    },
    description: {
      ko: '시원한 냉면에 매콤한 양념을 비벼먹어요! 여름 저녁에 최고.',
      en: 'Cold noodles mixed with spicy sauce! Best for summer evenings.',
      zh: '在凉面上拌上辣酱！夏天晚上最棒的选择。',
      ja: '冷たい麺に辛いタレを混ぜて食べる！夏の夕方に最高。'
    },
    emoji: '🍝',
    category: 'dinner',
    calories: 320,
    tags: ['cold', 'spicy', 'refreshing']
  },
  {
    id: 'galbitang',
    name: {
      ko: '갈비탕',
      en: 'Short Rib Soup',
      zh: '排骨汤',
      ja: 'カルビタン'
    },
    description: {
      ko: '진한 국물의 갈비탕! 든든하면서도 깔끔한 저녁 식사.',
      en: 'Rich short rib soup! Hearty yet clean dinner meal.',
      zh: '浓郁的排骨汤！饱腹又清爽的晚餐。',
      ja: '濃厚なスープのカルビタン！心を満たしつつさっぱりした夕食。'
    },
    emoji: '🥣',
    category: 'dinner',
    calories: 450,
    tags: ['soup', 'hearty', 'traditional']
  },

  // 야식 메뉴
  {
    id: 'ramyeon',
    name: {
      ko: '라면',
      en: 'Instant Noodles',
      zh: '方便面',
      ja: 'ラーメン'
    },
    description: {
      ko: '뜨끈한 국물의 라면! 야식의 왕, 언제 먹어도 맛있는 메뉴.',
      en: 'Hot noodle soup! The king of late-night snacks, delicious anytime.',
      zh: '热腾腾的面汤！宵夜之王，什么时候吃都美味。',
      ja: '熱いスープのラーメン！夜食の王様、いつ食べても美味しいメニュー。'
    },
    emoji: '🍜',
    category: 'snack',
    calories: 480,
    tags: ['hot', 'comforting', 'quick']
  },
  {
    id: 'tteokbokki',
    name: {
      ko: '떡볶이',
      en: 'Spicy Rice Cakes',
      zh: '炒年糕',
      ja: 'トックポッキ'
    },
    description: {
      ko: '매콤달콤한 떡볶이! 어묵과 함께 야식으로 딱 좋은 메뉴.',
      en: 'Spicy and sweet rice cakes! Perfect late-night snack with fish cakes.',
      zh: '辣甜年糕！配上海带和鱼糕是完美的宵夜。',
      ja: '辛くて甘いトックポッキ！魚糕と共に夜食にぴったりのメニュー。'
    },
    emoji: '🍥',
    category: 'snack',
    calories: 380,
    tags: ['spicy', 'sweet', 'street-food']
  },
  {
    id: 'chicken',
    name: {
      ko: '치킨',
      en: 'Fried Chicken',
      zh: '炸鸡',
      ja: 'チキン'
    },
    description: {
      ko: '바삭바삭한 치킨! 맥주와 함께하는 완벽한 야식 메뉴.',
      en: 'Crispy fried chicken! Perfect late-night snack with beer.',
      zh: '酥脆的炸鸡！配着啤酒的完美宵夜菜单。',
      ja: 'サクサクのチキン！ビールと共に完璧な夜食メニュー。'
    },
    emoji: '🍗',
    category: 'snack',
    calories: 550,
    tags: ['crispy', 'comforting', 'party']
  },
  {
    id: 'mandu-guk',
    name: {
      ko: '만두국',
      en: 'Dumpling Soup',
      zh: '饺子汤',
      ja: 'マンドゥグク'
    },
    description: {
      ko: '따뜻한 국물이 있는 만두국! 가벼운 야식으로 좋은 선택.',
      en: 'Warm dumpling soup! A good choice for a light late-night meal.',
      zh: '热腾腾的饺子汤！适合作为轻便宵夜的选择。',
      ja: '温かいスープのあるマンドゥグク！軽めの夜食に良い選択。'
    },
    emoji: '🥟',
    category: 'snack',
    calories: 320,
    tags: ['soup', 'light', 'comforting']
  }
];

export const timeSlots = {
  breakfast: {
    name: {
      ko: '아침',
      en: 'Breakfast',
      zh: '早餐',
      ja: '朝食'
    },
    timeRange: '6:00 - 9:00',
    emoji: '🌅'
  },
  lunch: {
    name: {
      ko: '점심',
      en: 'Lunch',
      zh: '午餐',
      ja: '昼食'
    },
    timeRange: '11:00 - 14:00',
    emoji: '☀️'
  },
  dinner: {
    name: {
      ko: '저녁',
      en: 'Dinner',
      zh: '晚餐',
      ja: '夕食'
    },
    timeRange: '17:00 - 20:00',
    emoji: '🌙'
  },
  snack: {
    name: {
      ko: '야식',
      en: 'Late Night',
      zh: '宵夜',
      ja: '夜食'
    },
    timeRange: '21:00 - 24:00',
    emoji: '🌃'
  }
};

export type TimeSlot = keyof typeof timeSlots;
