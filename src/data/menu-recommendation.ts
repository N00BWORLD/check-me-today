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
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'random';
  calories?: number;
  tags: string[];
  // 시간대별 선호도 가중치 (높을수록 추천 확률 높음)
  weight: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
}

export const menuRecommendations: MenuItem[] = [
  // 아침 메뉴 (주로 국물 음식, 든든한 시작)
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
    tags: ['spicy', 'comforting', 'traditional'],
    weight: { breakfast: 10, lunch: 8, dinner: 6, snack: 2 }
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
    tags: ['balanced', 'nutritious', 'colorful'],
    weight: { breakfast: 8, lunch: 9, dinner: 7, snack: 1 }
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
    tags: ['comforting', 'healthy', 'traditional'],
    weight: { breakfast: 9, lunch: 6, dinner: 8, snack: 3 }
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
    tags: ['special', 'sweet', 'protein'],
    weight: { breakfast: 6, lunch: 10, dinner: 9, snack: 4 }
  },
  // 추가 아침 메뉴들
  {
    id: 'juk',
    name: {
      ko: '죽',
      en: 'Rice Porridge',
      zh: '粥',
      ja: '粥'
    },
    description: {
      ko: '부드러운 죽으로 시작하는 건강한 하루! 속을 편안하게 해줍니다.',
      en: 'Start your day with gentle rice porridge! Comforts your stomach.',
      zh: '用柔软的粥开启健康的一天！让你胃部舒适。',
      ja: '柔らかい粥で健康的な一日を始めよう！胃を優しく癒します。'
    },
    emoji: '🥣',
    category: 'breakfast',
    calories: 180,
    tags: ['gentle', 'healthy', 'comforting'],
    weight: { breakfast: 10, lunch: 2, dinner: 3, snack: 1 }
  },
  {
    id: 'toast',
    name: {
      ko: '토스트',
      en: 'Toast',
      zh: '吐司',
      ja: 'トースト'
    },
    description: {
      ko: '바삭한 토스트에 버터와 잼! 서양식 아침의 대표 메뉴.',
      en: 'Crispy toast with butter and jam! Classic Western breakfast.',
      zh: '酥脆的吐司配黄油和果酱！西方早餐的代表。',
      ja: 'サクサクのトーストにバターとジャム！西洋風朝食の代表。'
    },
    emoji: '🍞',
    category: 'breakfast',
    calories: 220,
    tags: ['crispy', 'western', 'simple'],
    weight: { breakfast: 8, lunch: 3, dinner: 2, snack: 5 }
  },
  {
    id: 'oatmeal',
    name: {
      ko: '오트밀',
      en: 'Oatmeal',
      zh: '燕麦粥',
      ja: 'オートミール'
    },
    description: {
      ko: '건강한 오트밀로 영양을 채워보세요! 다양한 토핑으로 맛있게.',
      en: 'Fill up with healthy oatmeal! Delicious with various toppings.',
      zh: '用健康的燕麦粥补充营养！配上各种配料更美味。',
      ja: '健康的なオートミールで栄養をチャージ！様々なトッピングで美味しく。'
    },
    emoji: '🌾',
    category: 'breakfast',
    calories: 150,
    tags: ['healthy', 'fiber', 'modern'],
    weight: { breakfast: 7, lunch: 1, dinner: 1, snack: 2 }
  },

  // 점심 메뉴 (가장 다양한 선택)
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
    tags: ['grilled', 'juicy', 'traditional'],
    weight: { breakfast: 1, lunch: 10, dinner: 7, snack: 3 }
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
    tags: ['spicy', 'sweet', 'stir-fry'],
    weight: { breakfast: 2, lunch: 9, dinner: 5, snack: 4 }
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
    tags: ['noodles', 'vegetables', 'balanced'],
    weight: { breakfast: 3, lunch: 8, dinner: 6, snack: 2 }
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
    tags: ['dumplings', 'crispy', 'comforting'],
    weight: { breakfast: 4, lunch: 7, dinner: 8, snack: 6 }
  },
  // 추가 점심 메뉴들
  {
    id: 'kimbap',
    name: {
      ko: '김밥',
      en: 'Kimbap',
      zh: '紫菜包饭',
      ja: 'キンパプ'
    },
    description: {
      ko: '신선한 야채와 햄, 계란이 어우러진 영양 김밥! 간단하면서 든든한 점심.',
      en: 'Nutritious kimbap with fresh vegetables, ham, and egg! Simple yet satisfying lunch.',
      zh: '新鲜蔬菜、火腿和鸡蛋搭配的营养紫菜包饭！简单又饱腹的午餐。',
      ja: '新鮮な野菜とハム、卵が合わさった栄養キンパプ！シンプルで心を満たすランチ。'
    },
    emoji: '🍙',
    category: 'lunch',
    calories: 350,
    tags: ['convenient', 'balanced', 'portable'],
    weight: { breakfast: 5, lunch: 9, dinner: 3, snack: 7 }
  },
  {
    id: 'bibim-naengmyeon',
    name: {
      ko: '물냉면',
      en: 'Cold Wheat Noodles',
      zh: '冷面',
      ja: '冷麺'
    },
    description: {
      ko: '시원한 육수에 쫄깃한 면! 여름 점심으로 최고의 메뉴.',
      en: 'Chewy noodles in cold broth! The best summer lunch.',
      zh: '筋道的面条配冰凉的汤汁！夏天午餐的最佳选择。',
      ja: '冷たいスープにもちもちの麺！夏のランチに最高のメニュー。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 320,
    tags: ['cold', 'refreshing', 'traditional'],
    weight: { breakfast: 1, lunch: 8, dinner: 10, snack: 1 }
  },
  {
    id: 'samgyetang',
    name: {
      ko: '삼계탕',
      en: 'Ginseng Chicken Soup',
      zh: '参鸡汤',
      ja: 'サムゲタン'
    },
    description: {
      ko: '영양 만점 삼계탕! 뜨거운 국물로 든든한 점심 식사.',
      en: 'Nutritious ginseng chicken soup! Hearty lunch with hot broth.',
      zh: '营养满分的参鸡汤！热腾腾的汤汁让你饱腹的午餐。',
      ja: '栄養満点のサムゲタン！熱いスープで心を満たすランチ。'
    },
    emoji: '🍗',
    category: 'lunch',
    calories: 450,
    tags: ['nutritious', 'hearty', 'traditional'],
    weight: { breakfast: 2, lunch: 6, dinner: 8, snack: 1 }
  },
  {
    id: 'bossam',
    name: {
      ko: '보쌈',
      en: 'Pork Wraps',
      zh: '烤肉卷',
      ja: 'ポッサム'
    },
    description: {
      ko: '쫄깃한 보쌈김치에 싸서 먹는 부드러운 돼지고기! 특별한 점심 메뉴.',
      en: 'Tender pork wrapped in crunchy kimchi! A special lunch treat.',
      zh: '筋道的泡菜里包着嫩猪肉！特别的午餐菜品。',
      ja: 'もちもちのポッサムキムチに包んだ柔らかい豚肉！特別なランチメニュー。'
    },
    emoji: '🥬',
    category: 'lunch',
    calories: 480,
    tags: ['special', 'tender', 'traditional'],
    weight: { breakfast: 1, lunch: 7, dinner: 9, snack: 2 }
  },
  {
    id: 'hamburger',
    name: {
      ko: '햄버거',
      en: 'Hamburger',
      zh: '汉堡',
      ja: 'ハンバーガー'
    },
    description: {
      ko: '패티와 야채가 어우러진 맛있는 햄버거! 빠르고 간편한 점심.',
      en: 'Delicious hamburger with patty and vegetables! Quick and easy lunch.',
      zh: '肉饼和蔬菜搭配的美味汉堡！快速便捷的午餐。',
      ja: 'パティと野菜が合わさった美味しいハンバーガー！速くて簡単なランチ。'
    },
    emoji: '🍔',
    category: 'lunch',
    calories: 550,
    tags: ['fast', 'western', 'convenient'],
    weight: { breakfast: 3, lunch: 8, dinner: 2, snack: 8 }
  },

  // 저녁 메뉴 (가벼운 식사 중심)
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
    tags: ['spicy', 'soft', 'light'],
    weight: { breakfast: 3, lunch: 4, dinner: 9, snack: 2 }
  },
  {
    id: 'bibim-naengmyeon-dinner',
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
    tags: ['cold', 'spicy', 'refreshing'],
    weight: { breakfast: 1, lunch: 6, dinner: 10, snack: 1 }
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
    tags: ['soup', 'hearty', 'traditional'],
    weight: { breakfast: 2, lunch: 5, dinner: 8, snack: 1 }
  },
  // 추가 저녁 메뉴들
  {
    id: 'dakjjim',
    name: {
      ko: '닭찜',
      en: 'Steamed Chicken',
      zh: '蒸鸡',
      ja: 'タクチム'
    },
    description: {
      ko: '부드럽게 찐 닭고기에 달콤한 양념! 건강한 저녁 메뉴.',
      en: 'Tender steamed chicken with sweet sauce! Healthy dinner option.',
      zh: '嫩蒸鸡肉配甜酱！健康的晚餐选择。',
      ja: '柔らかく蒸した鶏肉に甘いタレ！健康的な夕食メニュー。'
    },
    emoji: '🍗',
    category: 'dinner',
    calories: 380,
    tags: ['steamed', 'healthy', 'sweet'],
    weight: { breakfast: 1, lunch: 3, dinner: 9, snack: 2 }
  },
  {
    id: 'salad',
    name: {
      ko: '샐러드',
      en: 'Salad',
      zh: '沙拉',
      ja: 'サラダ'
    },
    description: {
      ko: '신선한 채소와 드레싱의 조화! 가벼운 저녁 식사로 완벽.',
      en: 'Fresh vegetables with dressing! Perfect for a light dinner.',
      zh: '新鲜蔬菜配酱汁的和谐！轻便晚餐的完美选择。',
      ja: '新鮮な野菜とドレッシングのハーモニー！軽めの夕食に完璧。'
    },
    emoji: '🥗',
    category: 'dinner',
    calories: 150,
    tags: ['fresh', 'light', 'healthy'],
    weight: { breakfast: 4, lunch: 5, dinner: 8, snack: 3 }
  },
  {
    id: 'pasta',
    name: {
      ko: '파스타',
      en: 'Pasta',
      zh: '意大利面',
      ja: 'パスタ'
    },
    description: {
      ko: '다양한 소스와 면이 어우러진 이탈리아 요리! 특별한 저녁 메뉴.',
      en: 'Italian dish with various sauces and noodles! Special dinner treat.',
      zh: '各种酱汁和面条搭配的意大利菜！特别的晚餐菜品。',
      ja: '様々なソースと麺が合わさったイタリアン！特別な夕食メニュー。'
    },
    emoji: '🍝',
    category: 'dinner',
    calories: 420,
    tags: ['italian', 'special', 'varied'],
    weight: { breakfast: 1, lunch: 4, dinner: 7, snack: 5 }
  },

  // 야식 메뉴 (가장 인기 있는 시간대)
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
    tags: ['hot', 'comforting', 'quick'],
    weight: { breakfast: 2, lunch: 3, dinner: 4, snack: 10 }
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
    tags: ['spicy', 'sweet', 'street-food'],
    weight: { breakfast: 1, lunch: 2, dinner: 3, snack: 10 }
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
    tags: ['crispy', 'comforting', 'party'],
    weight: { breakfast: 1, lunch: 4, dinner: 6, snack: 10 }
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
    tags: ['soup', 'light', 'comforting'],
    weight: { breakfast: 3, lunch: 5, dinner: 7, snack: 8 }
  },
  // 추가 야식 메뉴들 (한국인이 야식으로 자주 먹는 음식들)
  {
    id: 'pizza',
    name: {
      ko: '피자',
      en: 'Pizza',
      zh: '披萨',
      ja: 'ピザ'
    },
    description: {
      ko: '치즈와 토핑이 풍부한 피자! 친구들과 함께하는 야식의 정석.',
      en: 'Cheesy pizza with rich toppings! The classic late-night meal with friends.',
      zh: '奶酪丰富的披萨配配料！和朋友一起的宵夜经典。',
      ja: 'チーズとトッピングたっぷりのピザ！友達と共に夜食の定番。'
    },
    emoji: '🍕',
    category: 'snack',
    calories: 600,
    tags: ['cheesy', 'sharing', 'western'],
    weight: { breakfast: 1, lunch: 6, dinner: 8, snack: 9 }
  },
  {
    id: 'burger-night',
    name: {
      ko: '햄버거 세트',
      en: 'Burger Combo',
      zh: '汉堡套餐',
      ja: 'バーガーセット'
    },
    description: {
      ko: '햄버거에 감자튀김과 콜라! 든든한 야식 세트 메뉴.',
      en: 'Burger with fries and cola! Hearty late-night combo.',
      zh: '汉堡配薯条和可乐！饱腹的宵夜套餐。',
      ja: 'ハンバーガーにフライドポテトとコーラ！心を満たす夜食セット。'
    },
    emoji: '🍔',
    category: 'snack',
    calories: 750,
    tags: ['combo', 'filling', 'fast-food'],
    weight: { breakfast: 2, lunch: 7, dinner: 3, snack: 9 }
  },
  {
    id: 'samgyetang-night',
    name: {
      ko: '삼계탕',
      en: 'Chicken Ginseng Soup',
      zh: '参鸡汤',
      ja: 'サムゲタン'
    },
    description: {
      ko: '야식으로 삼계탕? 든든하고 영양가득한 야식 메뉴!',
      en: 'Chicken ginseng soup for late-night? Nutritious and filling!',
      zh: '宵夜吃参鸡汤？营养丰富又饱腹的宵夜菜单！',
      ja: '夜食にサムゲタン？栄養満点で心を満たす夜食メニュー！'
    },
    emoji: '🐔',
    category: 'snack',
    calories: 450,
    tags: ['nutritious', 'hearty', 'traditional'],
    weight: { breakfast: 2, lunch: 6, dinner: 8, snack: 7 }
  },
  {
    id: 'bibimbap-night',
    name: {
      ko: '야식 비빔밥',
      en: 'Late-Night Bibimbap',
      zh: '宵夜石锅拌饭',
      ja: '夜食ビビンバプ'
    },
    description: {
      ko: '야식으로 비빔밥! 고기와 계란이 든든한 늦은 저녁 식사.',
      en: 'Bibimbap for late-night! Hearty meal with meat and egg.',
      zh: '宵夜吃石锅拌饭！肉和鸡蛋让你饱腹的晚餐。',
      ja: '夜食にビビンバプ！肉と卵で心を満たす遅い夕食。'
    },
    emoji: '🍚',
    category: 'snack',
    calories: 480,
    tags: ['hearty', 'balanced', 'late-night'],
    weight: { breakfast: 3, lunch: 8, dinner: 9, snack: 6 }
  },
  {
    id: 'hotdog',
    name: {
      ko: '핫도그',
      en: 'Hot Dog',
      zh: '热狗',
      ja: 'ホットドッグ'
    },
    description: {
      ko: '길거리에서 쉽게 먹을 수 있는 핫도그! 간단한 야식으로 최고.',
      en: 'Easy street food hot dog! Perfect for a quick late-night snack.',
      zh: '街头容易买到的热狗！简单的宵夜最佳选择。',
      ja: '街中で簡単に食べられるホットドッグ！簡単な夜食に最高。'
    },
    emoji: '🌭',
    category: 'snack',
    calories: 350,
    tags: ['street-food', 'quick', 'convenient'],
    weight: { breakfast: 1, lunch: 4, dinner: 2, snack: 8 }
  },
  {
    id: 'cup-noodles',
    name: {
      ko: '컵라면',
      en: 'Cup Noodles',
      zh: '杯面',
      ja: 'カップラーメン'
    },
    description: {
      ko: '컵에 담긴 즉석 라면! 혼자 먹기 딱 좋은 야식 메뉴.',
      en: 'Instant noodles in a cup! Perfect late-night snack for one.',
      zh: '杯装的即食面！适合一个人吃的宵夜菜单。',
      ja: 'カップに入った即席ラーメン！一人で食べるのにぴったりの夜食メニュー。'
    },
    emoji: '🥤',
    category: 'snack',
    calories: 320,
    tags: ['instant', 'solo', 'quick'],
    weight: { breakfast: 2, lunch: 2, dinner: 3, snack: 10 }
  },
  // 랜덤 추천 메뉴들 (모든 시간대에서 나올 수 있음)
  {
    id: 'random-bibimbap',
    name: {
      ko: '돌솥비빔밥',
      en: 'Hot Stone Bibimbap',
      zh: '石锅拌饭',
      ja: 'ホットストーン・ビビンバプ'
    },
    description: {
      ko: '뜨거운 돌솥에 비벼먹는 영양만점 비빔밥! 언제 먹어도 맛있는 국민 음식.',
      en: 'Nutritious bibimbap mixed in a hot stone bowl! Delicious anytime.',
      zh: '在热石锅里拌匀的营养拌饭！什么时候吃都美味的国民食物。',
      ja: '熱い石鍋でかき混ぜる栄養満点のビビンバプ！いつ食べても美味しい国民食。'
    },
    emoji: '🍚',
    category: 'random',
    calories: 480,
    tags: ['traditional', 'nutritious', 'hot'],
    weight: { breakfast: 5, lunch: 8, dinner: 9, snack: 4 }
  },
  {
    id: 'random-bulgogi',
    name: {
      ko: '소불고기',
      en: 'Marinated Beef',
      zh: '酱牛肉',
      ja: 'カルビ'
    },
    description: {
      ko: '달콤하게 양념된 부드러운 소고기! 밥에 비벼 먹으면 최고의 조합.',
      en: 'Sweetly marinated tender beef! Perfect with rice.',
      zh: '甜甜的腌制嫩牛肉！和饭拌在一起是最好的组合。',
      ja: '甘くタレが染みた柔らかい牛肉！ご飯にかけて食べると最高の組み合わせ。'
    },
    emoji: '🥩',
    category: 'random',
    calories: 420,
    tags: ['sweet', 'tender', 'popular'],
    weight: { breakfast: 3, lunch: 9, dinner: 8, snack: 5 }
  },
  {
    id: 'random-kimchi',
    name: {
      ko: '김치찌개',
      en: 'Kimchi Stew',
      zh: '泡菜汤',
      ja: 'キムチチゲ'
    },
    description: {
      ko: '얼큰하고 시원한 국물의 김치찌개! 한국인의 소울푸드.',
      en: 'Spicy and refreshing kimchi stew! Korean soul food.',
      zh: '辣味十足又清爽的泡菜汤！韩国人的灵魂食物。',
      ja: '辛くてさっぱりしたキムチチゲ！韓国人のソウルフード。'
    },
    emoji: '🍲',
    category: 'random',
    calories: 380,
    tags: ['spicy', 'comforting', 'soul-food'],
    weight: { breakfast: 7, lunch: 8, dinner: 6, snack: 4 }
  },
  {
    id: 'random-samgyetang',
    name: {
      ko: '닭볶음탕',
      en: 'Spicy Chicken Stew',
      zh: '辣炒鸡汤',
      ja: 'タッカルビタン'
    },
    description: {
      ko: '매콤달콤한 양념에 푹 고아진 닭고기! 든든한 한 끼 식사.',
      en: 'Chicken slowly cooked in sweet and spicy sauce! Hearty meal.',
      zh: '在甜辣酱汁中慢慢炖煮的鸡肉！饱腹的一餐。',
      ja: '甘辛いタレでじっくり煮込んだ鶏肉！心を満たす一膳。'
    },
    emoji: '🍗',
    category: 'random',
    calories: 520,
    tags: ['spicy', 'sweet', 'hearty'],
    weight: { breakfast: 2, lunch: 7, dinner: 9, snack: 6 }
  },
  {
    id: 'random-jjajangmyeon',
    name: {
      ko: '짜장면',
      en: 'Black Bean Noodles',
      zh: '炸酱面',
      ja: 'チャジャンミョン'
    },
    description: {
      ko: '달콤하고 짭짤한 춘장 소스의 면 요리! 한국식 중화요리의 대표.',
      en: 'Noodles with sweet and salty black bean sauce! Korean-Chinese classic.',
      zh: '甜咸黑豆酱的面条！韩式中餐的代表。',
      ja: '甘くてしょっぱい甜麺醤の麺料理！韓国式中華料理の代表。'
    },
    emoji: '🍜',
    category: 'random',
    calories: 580,
    tags: ['chinese-korean', 'noodles', 'comforting'],
    weight: { breakfast: 1, lunch: 8, dinner: 7, snack: 9 }
  },
  {
    id: 'random-tteokbokki',
    name: {
      ko: '어묵볶음',
      en: 'Fish Cake Stir-fry',
      zh: '炒鱼糕',
      ja: 'オデン炒め'
    },
    description: {
      ko: '달콤하고 매콤한 어묵볶음! 간단하면서도 맛있는 분식.',
      en: 'Sweet and spicy fish cake stir-fry! Simple yet delicious snack.',
      zh: '甜辣鱼糕炒！简单却美味的小吃。',
      ja: '甘くて辛いオデン炒め！シンプルで美味しい分食。'
    },
    emoji: '🍥',
    category: 'random',
    calories: 350,
    tags: ['spicy', 'sweet', 'street-food'],
    weight: { breakfast: 2, lunch: 5, dinner: 4, snack: 10 }
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

export type TimeSlot = keyof typeof timeSlots | 'random';

// 가중치 기반 메뉴 추천 함수
export function getWeightedRandomMenu(timeSlot: TimeSlot): MenuItem {
  // 해당 시간대의 모든 메뉴 필터링
  const availableMenus = menuRecommendations.filter(menu => menu.category === timeSlot);

  if (availableMenus.length === 0) {
    // 기본적으로 첫 번째 메뉴 반환 (fallback)
    return menuRecommendations[0];
  }

  // 각 메뉴의 가중치에 따른 확률 계산
  const totalWeight = availableMenus.reduce((sum, menu) => sum + menu.weight[timeSlot], 0);
  let random = Math.random() * totalWeight;

  for (const menu of availableMenus) {
    random -= menu.weight[timeSlot];
    if (random <= 0) {
      return menu;
    }
  }

  // fallback (이론적으로 도달하지 않음)
  return availableMenus[0];
}
