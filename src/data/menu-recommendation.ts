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
    random?: number;
  };
}

export const menuRecommendations: MenuItem[] = [
  // 아침 메뉴 (배달 앱에서 인기 있는 아침 메뉴)
  {
    id: 'toast-delivery',
    name: {
      ko: '바삭한 토스트 세트',
      en: 'Crispy Toast Set',
      zh: '酥脆吐司套餐',
      ja: 'サクサクトーストセット'
    },
    description: {
      ko: '갓 구운 바삭한 토스트에 버터와 잼! 커피와 함께하는 완벽한 아침.',
      en: 'Freshly baked crispy toast with butter and jam! Perfect morning with coffee.',
      zh: '新鲜烤制的酥脆吐司配黄油和果酱！和咖啡搭配的完美早晨。',
      ja: '焼き立てのサクサクトーストにバターとジャム！コーヒーと一緒に完璧な朝。'
    },
    emoji: '🍞',
    category: 'breakfast',
    calories: 380,
    tags: ['crispy', 'fresh', 'classic'],
    weight: { breakfast: 10, lunch: 3, dinner: 1, snack: 5 }
  },
  {
    id: 'sandwich-breakfast',
    name: {
      ko: 'BLT 샌드위치',
      en: 'BLT Sandwich',
      zh: '培根生菜番茄三明治',
      ja: 'BLTサンドイッチ'
    },
    description: {
      ko: '바삭한 베이컨과 신선한 채소의 조합! 든든한 아침 식사.',
      en: 'Crispy bacon with fresh vegetables! Hearty breakfast meal.',
      zh: '酥脆培根配新鲜蔬菜！饱腹的早餐。',
      ja: 'サクサクのベーコンと新鮮野菜の組み合わせ！心を満たす朝食。'
    },
    emoji: '🥪',
    category: 'breakfast',
    calories: 420,
    tags: ['bacon', 'fresh', 'hearty'],
    weight: { breakfast: 9, lunch: 7, dinner: 2, snack: 6 }
  },
  {
    id: 'croissant-delivery',
    name: {
      ko: '갓 구운 크루아상',
      en: 'Fresh Croissant',
      zh: '新鲜牛角面包',
      ja: '焼き立てクロワッサン'
    },
    description: {
      ko: '갓 구운 크루아상의 버터 향! 커피와 함께하는 프랑스식 아침.',
      en: 'Buttery aroma of freshly baked croissant! French morning with coffee.',
      zh: '新鲜烤制的牛角面包的黄油香气！和咖啡搭配的法国式早晨。',
      ja: '焼き立てクロワッサンのバターの香り！コーヒーと一緒にフランス風朝食。'
    },
    emoji: '🥐',
    category: 'breakfast',
    calories: 320,
    tags: ['buttery', 'fresh', 'french'],
    weight: { breakfast: 8, lunch: 2, dinner: 1, snack: 4 }
  },
  {
    id: 'pancake-delivery',
    name: {
      ko: '팬케이크 세트',
      en: 'Pancake Set',
      zh: '煎饼套餐',
      ja: 'パンケーキセット'
    },
    description: {
      ko: '폭신폭신 팬케이크에 메이플 시럽! 달콤한 아침 식사.',
      en: 'Fluffy pancakes with maple syrup! Sweet breakfast meal.',
      zh: '蓬松煎饼配枫糖浆！甜蜜的早餐。',
      ja: 'ふわふわパンケーキにメープルシロップ！甘い朝食。'
    },
    emoji: '🥞',
    category: 'breakfast',
    calories: 480,
    tags: ['fluffy', 'sweet', 'american'],
    weight: { breakfast: 9, lunch: 1, dinner: 1, snack: 3 }
  },
  {
    id: 'bagel-delivery',
    name: {
      ko: '베이글 샌드위치',
      en: 'Bagel Sandwich',
      zh: '百吉饼三明治',
      ja: 'ベーグルサンドイッチ'
    },
    description: {
      ko: '쫄깃한 베이글에 크림치즈와 훈제 연어! 뉴욕식 아침.',
      en: 'Chewy bagel with cream cheese and smoked salmon! New York morning.',
      zh: '筋道的百吉饼配奶油芝士和熏鲑鱼！纽约式早晨。',
      ja: 'もちもちのベーグルにクリームチーズとスモークサーモン！ニューヨーク風朝食。'
    },
    emoji: '🥯',
    category: 'breakfast',
    calories: 450,
    tags: ['chewy', 'smoked', 'new-york'],
    weight: { breakfast: 7, lunch: 5, dinner: 2, snack: 4 }
  },
  {
    id: 'smoothie-bowl-delivery',
    name: {
      ko: '아보카도 토스트',
      en: 'Avocado Toast',
      zh: '鳄梨吐司',
      ja: 'アボカドトースト'
    },
    description: {
      ko: '바삭한 토스트에 신선한 아보카도! 건강한 인스타그램 아침.',
      en: 'Crispy toast with fresh avocado! Healthy Instagram breakfast.',
      zh: '酥脆吐司配新鲜鳄梨！健康的Instagram早餐。',
      ja: 'サクサクのトーストに新鮮アボカド！健康的なインスタ朝食。'
    },
    emoji: '🥑',
    category: 'breakfast',
    calories: 380,
    tags: ['healthy', 'trendy', 'instagram'],
    weight: { breakfast: 8, lunch: 4, dinner: 3, snack: 2 }
  },
  {
    id: 'eggs-benedict-delivery',
    name: {
      ko: '에그 베네딕트',
      en: 'Eggs Benedict',
      zh: '班尼迪克蛋',
      ja: 'エッグベネディクト'
    },
    description: {
      ko: '잉글리시 머핀에 홀랜데이즈 소스와 푹신한 계란! 고급스러운 아침.',
      en: 'English muffin with hollandaise sauce and poached egg! Luxurious breakfast.',
      zh: '英式松饼配荷兰酱和水煮蛋！豪华早餐。',
      ja: 'イングリッシュマフィンにオランデーズソースとポーチドエッグ！贅沢な朝食。'
    },
    emoji: '🍳',
    category: 'breakfast',
    calories: 520,
    tags: ['luxurious', 'poached-egg', 'hollandaise'],
    weight: { breakfast: 7, lunch: 2, dinner: 3, snack: 1 }
  },
  {
    id: 'french-toast-delivery',
    name: {
      ko: '프렌치 토스트',
      en: 'French Toast',
      zh: '法式吐司',
      ja: 'フレンチトースト'
    },
    description: {
      ko: '달콤하게 구운 빵에 메이플 시럽! 향기로운 아침 식사.',
      en: 'Sweetly baked bread with maple syrup! Fragrant morning meal.',
      zh: '甜甜的烤面包配枫糖浆！香气扑鼻的早晨餐食。',
      ja: '甘く焼いたパンにメープルシロップ！香り高い朝食。'
    },
    emoji: '🍞',
    category: 'breakfast',
    calories: 420,
    tags: ['sweet', 'fragrant', 'comforting'],
    weight: { breakfast: 8, lunch: 1, dinner: 2, snack: 3 }
  },
  // 추가 아침 메뉴들
  // 확장된 아침 메뉴들
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
    id: 'jeonbokjuk',
    name: {
      ko: '전복죽',
      en: 'Abalone Porridge',
      zh: '鲍鱼粥',
      ja: 'アワビ粥'
    },
    description: {
      ko: '고급스러운 전복죽! 영양만점으로 시작하는 특별한 아침.',
      en: 'Luxurious abalone porridge! A special breakfast full of nutrition.',
      zh: '高档鲍鱼粥！营养满分的特别早餐。',
      ja: '高級感のあるアワビ粥！栄養満点で始まる特別な朝食。'
    },
    emoji: '🦪',
    category: 'breakfast',
    calories: 250,
    tags: ['luxury', 'nutritious', 'special'],
    weight: { breakfast: 7, lunch: 1, dinner: 2, snack: 1 }
  },
  {
    id: 'pumpkinjuk',
    name: {
      ko: '호박죽',
      en: 'Pumpkin Porridge',
      zh: '南瓜粥',
      ja: 'カボチャ粥'
    },
    description: {
      ko: '달콤한 호박죽! 베타카로틴이 풍부한 건강 식사.',
      en: 'Sweet pumpkin porridge! Rich in beta-carotene.',
      zh: '甜南瓜粥！富含β-胡萝卜素的健康餐食。',
      ja: '甘いカボチャ粥！β-カロテンが豊富な健康食。'
    },
    emoji: '🎃',
    category: 'breakfast',
    calories: 220,
    tags: ['sweet', 'healthy', 'vitamin-rich'],
    weight: { breakfast: 9, lunch: 3, dinner: 4, snack: 2 }
  },
  {
    id: 'hempjuk',
    name: {
      ko: '참죽',
      en: 'Hemp Seed Porridge',
      zh: '麻籽粥',
      ja: '麻の実粥'
    },
    description: {
      ko: '영양가득 참죽! 고소한 맛과 건강한 기력 충전.',
      en: 'Nutritious hemp seed porridge! Nutty flavor and healthy energy.',
      zh: '营养丰富的麻籽粥！坚果味和健康的精力补充。',
      ja: '栄養満点の麻の実粥！香ばしい味と健康的なエネルギー補給。'
    },
    emoji: '🌿',
    category: 'breakfast',
    calories: 280,
    tags: ['nutritious', 'nutty', 'energizing'],
    weight: { breakfast: 8, lunch: 2, dinner: 3, snack: 1 }
  },
  {
    id: 'tteokguk',
    name: {
      ko: '떡국',
      en: 'Rice Cake Soup',
      zh: '年糕汤',
      ja: 'トックク'
    },
    description: {
      ko: '쫄깃한 떡과 시원한 국물! 한국의 전통 아침 식사.',
      en: 'Chewy rice cakes in clear broth! Traditional Korean breakfast.',
      zh: '筋道的年糕配清汤！韩国的传统早餐。',
      ja: 'もちもちの餅とさっぱりしたスープ！韓国の伝統的な朝食。'
    },
    emoji: '🍜',
    category: 'breakfast',
    calories: 320,
    tags: ['traditional', 'chewy', 'festive'],
    weight: { breakfast: 10, lunch: 5, dinner: 6, snack: 2 }
  },
  {
    id: 'sikhye',
    name: {
      ko: '식혜',
      en: 'Sweet Rice Drink',
      zh: '甘米露',
      ja: 'シッケ'
    },
    description: {
      ko: '달콤하고 시원한 식혜! 한국 전통 음료로 마무리.',
      en: 'Sweet and refreshing traditional Korean drink!',
      zh: '甜美清爽的韩国传统饮料！',
      ja: '甘くてさっぱりした韓国伝統飲料！'
    },
    emoji: '🍶',
    category: 'breakfast',
    calories: 150,
    tags: ['traditional', 'sweet', 'refreshing'],
    weight: { breakfast: 9, lunch: 2, dinner: 4, snack: 3 }
  },
  {
    id: 'sujeonggwa',
    name: {
      ko: '수정과',
      en: 'Cinnamon Punch',
      zh: '桂花蜜',
      ja: 'スジョングァ'
    },
    description: {
      ko: '향긋한 계피와 대추가 들어간 전통 음료! 건강한 아침.',
      en: 'Traditional Korean drink with cinnamon and jujubes!',
      zh: '含有桂皮和枣子的传统韩国饮料！',
      ja: '香り高いシナモンとナツメが入った伝統飲料！'
    },
    emoji: '🍯',
    category: 'breakfast',
    calories: 120,
    tags: ['traditional', 'aromatic', 'healthy'],
    weight: { breakfast: 8, lunch: 1, dinner: 3, snack: 2 }
  },
  {
    id: 'pancakes',
    name: {
      ko: '팬케이크',
      en: 'Pancakes',
      zh: '煎饼',
      ja: 'パンケーキ'
    },
    description: {
      ko: '폭신폭신한 팬케이크에 메이플 시럽! 달콤한 아침 시작.',
      en: 'Fluffy pancakes with maple syrup! Sweet morning start.',
      zh: '蓬松的煎饼配枫糖浆！甜蜜的早晨开始。',
      ja: 'ふわふわのパンケーキにメープルシロップ！甘い朝の始まり。'
    },
    emoji: '🥞',
    category: 'breakfast',
    calories: 450,
    tags: ['fluffy', 'sweet', 'western'],
    weight: { breakfast: 9, lunch: 2, dinner: 1, snack: 4 }
  },
  {
    id: 'croissant',
    name: {
      ko: '크루아상',
      en: 'Croissant',
      zh: '牛角面包',
      ja: 'クロワッサン'
    },
    description: {
      ko: '바삭바삭한 크루아상! 커피와 함께하는 완벽한 조합.',
      en: 'Crispy croissant! Perfect with coffee.',
      zh: '酥脆的牛角面包！和咖啡搭配完美。',
      ja: 'サクサクのクロワッサン！コーヒーと一緒に完璧な組み合わせ。'
    },
    emoji: '🥐',
    category: 'breakfast',
    calories: 320,
    tags: ['crispy', 'buttery', 'elegant'],
    weight: { breakfast: 8, lunch: 3, dinner: 1, snack: 5 }
  },
  {
    id: 'bagel',
    name: {
      ko: '베이글',
      en: 'Bagel',
      zh: '百吉饼',
      ja: 'ベーグル'
    },
    description: {
      ko: '쫄깃한 베이글에 크림치즈! 든든한 아침 식사.',
      en: 'Chewy bagel with cream cheese! Hearty breakfast.',
      zh: '筋道的百吉饼配奶油芝士！饱腹的早餐。',
      ja: 'もちもちのベーグルにクリームチーズ！心を満たす朝食。'
    },
    emoji: '🥯',
    category: 'breakfast',
    calories: 380,
    tags: ['chewy', 'creamy', 'hearty'],
    weight: { breakfast: 7, lunch: 4, dinner: 2, snack: 6 }
  },
  {
    id: 'granola',
    name: {
      ko: '그래놀라',
      en: 'Granola',
      zh: '格兰诺拉麦片',
      ja: 'グラノーラ'
    },
    description: {
      ko: '건강한 그래놀라에 요거트와 과일! 영양 밸런스 최고.',
      en: 'Healthy granola with yogurt and fruits! Perfect nutrition balance.',
      zh: '健康的格兰诺拉配酸奶和水果！营养平衡最佳。',
      ja: '健康的なグラノーラにヨーグルトとフルーツ！栄養バランス最高。'
    },
    emoji: '🥣',
    category: 'breakfast',
    calories: 280,
    tags: ['healthy', 'nutritious', 'balanced'],
    weight: { breakfast: 9, lunch: 2, dinner: 1, snack: 3 }
  },
  {
    id: 'eggs-benedict',
    name: {
      ko: '에그 베네딕트',
      en: 'Eggs Benedict',
      zh: '班尼迪克蛋',
      ja: 'エッグベネディクト'
    },
    description: {
      ko: '푹신한 잉글리시 머핀에 홀랜데이즈 소스! 고급스러운 아침.',
      en: 'Fluffy English muffin with hollandaise sauce! Luxurious breakfast.',
      zh: '蓬松的英式松饼配荷兰酱！豪华的早餐。',
      ja: 'ふわふわのイングリッシュマフィンにオランデーズソース！贅沢な朝食。'
    },
    emoji: '🍳',
    category: 'breakfast',
    calories: 520,
    tags: ['luxurious', 'rich', 'elegant'],
    weight: { breakfast: 6, lunch: 1, dinner: 2, snack: 1 }
  },
  {
    id: 'french-toast',
    name: {
      ko: '프렌치 토스트',
      en: 'French Toast',
      zh: '法式吐司',
      ja: 'フレンチトースト'
    },
    description: {
      ko: '달콤하게 구운 빵에 시럽! 향기로운 아침 식사.',
      en: 'Sweetly baked bread with syrup! Fragrant morning meal.',
      zh: '甜甜的烤面包配糖浆！香气扑鼻的早餐。',
      ja: '甘く焼いたパンにシロップ！香り高い朝食。'
    },
    emoji: '🍞',
    category: 'breakfast',
    calories: 420,
    tags: ['sweet', 'fragrant', 'comforting'],
    weight: { breakfast: 8, lunch: 2, dinner: 1, snack: 4 }
  },
  {
    id: 'smoothie-bowl',
    name: {
      ko: '스무디 볼',
      en: 'Smoothie Bowl',
      zh: '冰沙碗',
      ja: 'スムージーボウル'
    },
    description: {
      ko: '신선한 과일과 채소의 스무디! 건강하고 시원한 아침.',
      en: 'Smoothie with fresh fruits and vegetables! Healthy and cool breakfast.',
      zh: '新鲜水果和蔬菜的冰沙！健康清凉的早餐。',
      ja: '新鮮なフルーツと野菜のスムージー！健康的で涼しい朝食。'
    },
    emoji: '🍓',
    category: 'breakfast',
    calories: 220,
    tags: ['fresh', 'healthy', 'cool'],
    weight: { breakfast: 7, lunch: 1, dinner: 3, snack: 2 }
  },
  {
    id: 'chia-pudding',
    name: {
      ko: '치아 푸딩',
      en: 'Chia Pudding',
      zh: '奇亚籽布丁',
      ja: 'チアプディング'
    },
    description: {
      ko: '영양만점 치아씨드 푸딩! 오메가3가 풍부한 건강식.',
      en: 'Nutritious chia seed pudding! Rich in omega-3.',
      zh: '营养丰富的奇亚籽布丁！富含Omega-3的健康食品。',
      ja: '栄養満点のチアシードプディング！オメガ3が豊富な健康食。'
    },
    emoji: '🫘',
    category: 'breakfast',
    calories: 250,
    tags: ['nutritious', 'omega-3', 'healthy'],
    weight: { breakfast: 8, lunch: 1, dinner: 2, snack: 3 }
  },
  {
    id: 'yogurt-parfait',
    name: {
      ko: '요거트 파르페',
      en: 'Yogurt Parfait',
      zh: '酸奶拼盘',
      ja: 'ヨーグルトパフェ'
    },
    description: {
      ko: '레이어드 요거트에 그래놀라와 과일! 예쁘고 맛있는 아침.',
      en: 'Layered yogurt with granola and fruits! Beautiful and delicious.',
      zh: '分层的酸奶配格兰诺拉和水果！漂亮又美味的早餐。',
      ja: 'レイヤードヨーグルトにグラノーラとフルーツ！綺麗で美味しい朝食。'
    },
    emoji: '🥣',
    category: 'breakfast',
    calories: 320,
    tags: ['layered', 'beautiful', 'nutritious'],
    weight: { breakfast: 9, lunch: 2, dinner: 1, snack: 4 }
  },
  {
    id: 'breakfast-burrito',
    name: {
      ko: '브렉퍼스트 부리또',
      en: 'Breakfast Burrito',
      zh: '早餐墨西哥卷饼',
      ja: 'ブレックファストブリトー'
    },
    description: {
      ko: '계란과 야채가 가득한 부리또! 든든한 아침 식사.',
      en: 'Burrito filled with eggs and vegetables! Hearty breakfast.',
      zh: '塞满鸡蛋和蔬菜的墨西哥卷饼！饱腹的早餐。',
      ja: '卵と野菜がたっぷりのブリトー！心を満たす朝食。'
    },
    emoji: '🌯',
    category: 'breakfast',
    calories: 480,
    tags: ['hearty', 'filling', 'mexican-inspired'],
    weight: { breakfast: 7, lunch: 5, dinner: 2, snack: 6 }
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

  // 점심 메뉴 (배달 앱 베스트셀러)
  {
    id: 'chicken-lunch',
    name: {
      ko: '후라이드 치킨',
      en: 'Fried Chicken',
      zh: '炸鸡',
      ja: 'フライドチキン'
    },
    description: {
      ko: '바삭바삭한 후라이드 치킨! 한국인의 국민 간식.',
      en: 'Crispy fried chicken! Korean national snack.',
      zh: '酥脆的炸鸡！韩国人的国民零食。',
      ja: 'サクサクのフライドチキン！韓国人の国民的おやつ。'
    },
    emoji: '🍗',
    category: 'lunch',
    calories: 580,
    tags: ['crispy', 'popular', 'korean'],
    weight: { breakfast: 1, lunch: 10, dinner: 6, snack: 8 }
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
    id: 'hamburger-lunch',
    name: {
      ko: '빅맥 세트',
      en: 'Big Mac Combo',
      zh: '巨无霸套餐',
      ja: 'ビッグマックセット'
    },
    description: {
      ko: '두 장의 패티가 들어간 빅맥! 맥도날드의 대표 메뉴.',
      en: 'Big Mac with two patties! McDonald\'s signature menu.',
      zh: '两片肉饼的巨无霸！麦当劳的代表菜单。',
      ja: '二枚のパティが入ったビッグマック！マクドナルドの代表メニュー。'
    },
    emoji: '🍔',
    category: 'lunch',
    calories: 580,
    tags: ['signature', 'mcdonalds', 'filling'],
    weight: { breakfast: 2, lunch: 9, dinner: 3, snack: 7 }
  },
  {
    id: 'pizza-lunch',
    name: {
      ko: '페퍼로니 피자',
      en: 'Pepperoni Pizza',
      zh: '意大利辣香肠披萨',
      ja: 'ペパロニピザ'
    },
    description: {
      ko: '고소한 페퍼로니와 치즈가 듬뿍! 피자의 왕도.',
      en: 'Plenty of savory pepperoni and cheese! King of pizzas.',
      zh: '丰富的香肠和奶酪！披萨之王。',
      ja: '香ばしいペパロニとチーズがたっぷり！ピザの王様。'
    },
    emoji: '🍕',
    category: 'lunch',
    calories: 650,
    tags: ['cheesy', 'pepperoni', 'classic'],
    weight: { breakfast: 1, lunch: 8, dinner: 5, snack: 6 }
  },
  {
    id: 'jjamppong-lunch',
    name: {
      ko: '짜장면',
      en: 'Jjamppong',
      zh: '炒码面',
      ja: 'チャジャンミョン'
    },
    description: {
      ko: '달콤짭짤한 춘장 소스에 해물이 풍부! 한국식 중화요리.',
      en: 'Sweet and salty sauce with plenty of seafood! Korean-Chinese cuisine.',
      zh: '甜咸酱汁配丰富的海鲜！韩式中餐。',
      ja: '甘くてしょっぱいソースに海鮮がたっぷり！韓国風中華料理。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 550,
    tags: ['seafood', 'sweet-salty', 'korean-chinese'],
    weight: { breakfast: 1, lunch: 9, dinner: 4, snack: 5 }
  },
  {
    id: 'tteokbokki-lunch',
    name: {
      ko: '떡볶이',
      en: 'Tteokbokki',
      zh: '炒年糕',
      ja: 'トックポッキ'
    },
    description: {
      ko: '달콤매콤한 떡볶이에 어묵까지! 길거리 대표 메뉴.',
      en: 'Sweet and spicy rice cakes with fish cakes! Street food classic.',
      zh: '甜辣年糕配鱼糕！街头代表菜单。',
      ja: '甘辛いトックポッキにオデンまで！ストリートフードの代表。'
    },
    emoji: '🍥',
    category: 'lunch',
    calories: 450,
    tags: ['spicy', 'street-food', 'popular'],
    weight: { breakfast: 1, lunch: 8, dinner: 3, snack: 9 }
  },
  {
    id: 'kimbap-lunch',
    name: {
      ko: '참치김밥',
      en: 'Tuna Kimbap',
      zh: '金枪鱼紫菜包饭',
      ja: 'ツナキンパプ'
    },
    description: {
      ko: '신선한 참치와 야채가 듬뿍! 한국의 대표 간식.',
      en: 'Plenty of fresh tuna and vegetables! Korean representative snack.',
      zh: '新鲜金枪鱼和蔬菜丰富！韩国的代表零食。',
      ja: '新鮮ツナと野菜がたっぷり！韓国の代表おやつ。'
    },
    emoji: '🍙',
    category: 'lunch',
    calories: 380,
    tags: ['tuna', 'fresh', 'convenient'],
    weight: { breakfast: 3, lunch: 9, dinner: 2, snack: 8 }
  },
  {
    id: 'bibimbap-lunch',
    name: {
      ko: '돌솥비빔밥',
      en: 'Hot Stone Bibimbap',
      zh: '石锅拌饭',
      ja: 'ホットストーン・ビビンバプ'
    },
    description: {
      ko: '뜨거운 돌솥에 비벼 먹는 영양밥! 한국 전통 음식.',
      en: 'Nutritious rice mixed in hot stone bowl! Korean traditional food.',
      zh: '热石锅中拌匀的营养饭！韩国传统食物。',
      ja: '熱い石鍋でかき混ぜる栄養ご飯！韓国伝統料理。'
    },
    emoji: '🍚',
    category: 'lunch',
    calories: 520,
    tags: ['traditional', 'nutritious', 'hot'],
    weight: { breakfast: 2, lunch: 7, dinner: 8, snack: 1 }
  },
  {
    id: 'bulgogi-lunch',
    name: {
      ko: '소불고기 덮밥',
      en: 'Bulgogi Rice Bowl',
      zh: '烤肉盖饭',
      ja: 'プルコギ丼'
    },
    description: {
      ko: '달콤한 불고기가 듬뿍 올라간 덮밥! 밥도둑 메뉴.',
      en: 'Rice bowl topped with sweet bulgogi! Rice thief menu.',
      zh: '甜美的烤肉丰富的盖饭！饭小偷菜单。',
      ja: '甘いプルコギがたっぷり乗った丼！飯泥棒メニュー。'
    },
    emoji: '🍚',
    category: 'lunch',
    calories: 580,
    tags: ['sweet', 'rice-bowl', 'popular'],
    weight: { breakfast: 1, lunch: 9, dinner: 6, snack: 4 }
  },
  {
    id: 'bibimbap-lunch-extended',
    name: {
      ko: '돌솥 제육 비빔밥',
      en: 'Spicy Pork Bibimbap',
      zh: '辣猪肉拌饭',
      ja: '辛い豚肉ビビンバプ'
    },
    description: {
      ko: '매콤한 제육볶음이 올라간 돌솥 비빔밥! 든든한 점심.',
      en: 'Hot stone bibimbap with spicy pork! Hearty lunch.',
      zh: '辣猪肉炒的热石锅拌饭！饱腹的午餐。',
      ja: '辛い豚肉炒めのホットストーン・ビビンバプ！心を満たすランチ。'
    },
    emoji: '🍚',
    category: 'lunch',
    calories: 620,
    tags: ['spicy', 'hot-stone', 'hearty'],
    weight: { breakfast: 1, lunch: 8, dinner: 5, snack: 3 }
  },
  {
    id: 'hamburger-lunch-extended',
    name: {
      ko: '와퍼 세트',
      en: 'Whopper Combo',
      zh: '皇堡套餐',
      ja: 'ワッパーセット'
    },
    description: {
      ko: '버거킹의 대표 메뉴 와퍼! 두툼한 패티가 특징.',
      en: 'Burger King\'s signature Whopper! Thick patty is the key.',
      zh: '汉堡王的代表菜单皇堡！厚实的肉饼是特色。',
      ja: 'バーガーキングの代表メニュー・ワッパー！厚いパティが特徴。'
    },
    emoji: '🍔',
    category: 'lunch',
    calories: 650,
    tags: ['signature', 'burger-king', 'thick'],
    weight: { breakfast: 1, lunch: 8, dinner: 4, snack: 6 }
  },
  {
    id: 'sandwich-lunch',
    name: {
      ko: '써브웨이 샌드위치',
      en: 'Subway Sandwich',
      zh: '赛百味三明治',
      ja: 'サブウェイサンドイッチ'
    },
    description: {
      ko: '신선한 야채와 빵으로 만든 건강한 샌드위치! 점심으로 최고.',
      en: 'Healthy sandwich made with fresh vegetables and bread! Perfect for lunch.',
      zh: '新鲜蔬菜和面包制作的健康三明治！午餐最佳选择。',
      ja: '新鮮野菜とパンで作る健康サンドイッチ！ランチに最高。'
    },
    emoji: '🥪',
    category: 'lunch',
    calories: 380,
    tags: ['healthy', 'fresh', 'subway'],
    weight: { breakfast: 3, lunch: 9, dinner: 4, snack: 5 }
  },
  // 확장된 점심 메뉴들
  {
    id: 'seolleongtang',
    name: {
      ko: '설렁탕',
      en: 'Beef Bone Soup',
      zh: '牛骨汤',
      ja: 'ソルロンタン'
    },
    description: {
      ko: '진한 사골 국물의 설렁탕! 한국 전통 국물 요리의 대표.',
      en: 'Rich beef bone soup! Representative of Korean traditional soups.',
      zh: '浓郁的牛骨汤！韩国传统汤菜的代表。',
      ja: '濃厚な牛骨スープ！韓国伝統スープ料理の代表。'
    },
    emoji: '🥣',
    category: 'lunch',
    calories: 380,
    tags: ['traditional', 'rich', 'hearty'],
    weight: { breakfast: 2, lunch: 9, dinner: 7, snack: 1 }
  },
  {
    id: 'chueotang',
    name: {
      ko: '추어탕',
      en: 'Loach Soup',
      zh: '泥鳅汤',
      ja: 'チュオタン'
    },
    description: {
      ko: '매콤하고 시원한 추어탕! 한국 전통 생선 요리.',
      en: 'Spicy and refreshing loach soup! Korean traditional fish dish.',
      zh: '辣味清爽的泥鳅汤！韩国传统鱼类菜肴。',
      ja: '辛くてさっぱりしたチュオタン！韓国伝統魚料理。'
    },
    emoji: '🐟',
    category: 'lunch',
    calories: 420,
    tags: ['spicy', 'traditional', 'fish'],
    weight: { breakfast: 1, lunch: 8, dinner: 6, snack: 2 }
  },
  {
    id: 'maeuntang',
    name: {
      ko: '매운탕',
      en: 'Spicy Fish Stew',
      zh: '辣鱼汤',
      ja: 'マウンタン'
    },
    description: {
      ko: '얼큰하고 매콤한 매운탕! 신선한 해산물의 풍미.',
      en: 'Spicy and hearty fish stew! Flavor of fresh seafood.',
      zh: '辣味十足的鱼汤！新鲜海鲜的美味。',
      ja: '辛くて心を満たすマウンタン！新鮮な海鮮の風味。'
    },
    emoji: '🍲',
    category: 'lunch',
    calories: 350,
    tags: ['spicy', 'seafood', 'hearty'],
    weight: { breakfast: 1, lunch: 9, dinner: 8, snack: 3 }
  },
  {
    id: 'jeyukbokkeum',
    name: {
      ko: '제육볶음',
      en: 'Spicy Pork Stir-fry',
      zh: '辣猪肉炒',
      ja: 'チェユクポックム'
    },
    description: {
      ko: '달콤매콤한 양념의 제육볶음! 밥에 비벼 먹으면 최고.',
      en: 'Sweet and spicy pork stir-fry! Best with rice.',
      zh: '甜辣酱的猪肉炒！和饭拌着吃最好。',
      ja: '甘辛いタレのチェユクポックム！ご飯にかけて食べると最高。'
    },
    emoji: '🥩',
    category: 'lunch',
    calories: 520,
    tags: ['spicy', 'sweet', 'pork'],
    weight: { breakfast: 1, lunch: 10, dinner: 6, snack: 4 }
  },
  {
    id: 'galbi',
    name: {
      ko: '갈비',
      en: 'Grilled Ribs',
      zh: '烤肋排',
      ja: 'カルビ'
    },
    description: {
      ko: '부드럽게 구운 소갈비! 한국 전통 바비큐의 정수.',
      en: 'Tenderly grilled beef ribs! Essence of Korean barbecue.',
      zh: '柔嫩的烤牛肋排！韩国传统烧烤的精髓。',
      ja: '柔らかく焼いた牛カルビ！韓国伝統バーベキューの真髄。'
    },
    emoji: '🥩',
    category: 'lunch',
    calories: 580,
    tags: ['grilled', 'tender', 'traditional'],
    weight: { breakfast: 1, lunch: 9, dinner: 8, snack: 3 }
  },
  {
    id: 'mulhoe',
    name: {
      ko: '물회',
      en: 'Freshwater Fish Salad',
      zh: '生鱼片沙拉',
      ja: 'ムルフェ'
    },
    description: {
      ko: '신선한 생선 회와 매콤한 소스! 시원하고 상큼한 점심.',
      en: 'Fresh fish sashimi with spicy sauce! Cool and refreshing lunch.',
      zh: '新鲜的生鱼片配辣酱！清凉爽口的午餐。',
      ja: '新鮮な魚の刺身に辛いソース！涼しくさっぱりしたランチ。'
    },
    emoji: '🐠',
    category: 'lunch',
    calories: 280,
    tags: ['fresh', 'spicy', 'refreshing'],
    weight: { breakfast: 1, lunch: 8, dinner: 9, snack: 2 }
  },
  {
    id: 'haemultang',
    name: {
      ko: '해물탕',
      en: 'Seafood Stew',
      zh: '海鲜汤',
      ja: 'ヘムルタン'
    },
    description: {
      ko: '신선한 해산물이 가득한 해물탕! 영양만점 바다의 풍미.',
      en: 'Seafood stew full of fresh seafood! Nutritious ocean flavors.',
      zh: '塞满新鲜海鲜的海鲜汤！营养丰富的海洋风味。',
      ja: '新鮮な海鮮がたっぷりのヘムルタン！栄養満点の海の風味。'
    },
    emoji: '🦞',
    category: 'lunch',
    calories: 420,
    tags: ['seafood', 'nutritious', 'oceanic'],
    weight: { breakfast: 1, lunch: 9, dinner: 7, snack: 4 }
  },
  {
    id: 'bibimbap-special',
    name: {
      ko: '전주비빔밥',
      en: 'Jeonju Bibimbap',
      zh: '全州拌饭',
      ja: 'チョンジュビビンバプ'
    },
    description: {
      ko: '전주의 대표 음식 비빔밥! 다양한 나물과 고기의 조화.',
      en: 'Jeonju\'s representative dish bibimbap! Harmony of various vegetables and meat.',
      zh: '全州的代表食物拌饭！各种野菜和肉的和谐。',
      ja: '全州の代表料理ビビンバプ！様々なナムルと肉のハーモニー。'
    },
    emoji: '🍚',
    category: 'lunch',
    calories: 480,
    tags: ['traditional', 'balanced', 'regional'],
    weight: { breakfast: 2, lunch: 9, dinner: 6, snack: 1 }
  },
  {
    id: 'kalguksu',
    name: {
      ko: '칼국수',
      en: 'Knife-cut Noodles',
      zh: '刀削面',
      ja: 'カルグクス'
    },
    description: {
      ko: '쫄깃한 칼국수 면에 시원한 육수! 한국 전통 면 요리.',
      en: 'Chewy knife-cut noodles with cool broth! Korean traditional noodle dish.',
      zh: '筋道的刀削面配清凉的汤汁！韩国传统面条菜肴。',
      ja: 'もちもちのカルグクス麺にさっぱりしたスープ！韓国伝統麺料理。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 450,
    tags: ['noodles', 'traditional', 'chewy'],
    weight: { breakfast: 2, lunch: 8, dinner: 5, snack: 3 }
  },
  {
    id: 'sundae',
    name: {
      ko: '순대',
      en: 'Korean Sausage',
      zh: '韩国香肠',
      ja: 'スンデ'
    },
    description: {
      ko: '한국 전통 순대! 돼지 창자와 각종 양념의 환상적인 조화.',
      en: 'Korean traditional sundae! Fantastic harmony of pork intestines and seasonings.',
      zh: '韩国传统香肠！猪肠和各种调料的绝妙和谐。',
      ja: '韓国伝統スンデ！豚の腸と各種薬味の素晴らしいハーモニー。'
    },
    emoji: '🌭',
    category: 'lunch',
    calories: 380,
    tags: ['traditional', 'unique', 'spicy'],
    weight: { breakfast: 1, lunch: 7, dinner: 4, snack: 6 }
  },
  {
    id: 'dakjjim-extended',
    name: {
      ko: '닭도리탕',
      en: 'Spicy Braised Chicken',
      zh: '辣炖鸡',
      ja: 'タクドリタン'
    },
    description: {
      ko: '매콤하게 매운 닭도리탕! 뼈째 먹는 재미와 맛의 조화.',
      en: 'Spicy braised chicken! Fun of eating with bones and delicious flavor.',
      zh: '辣味十足的炖鸡！连骨吃的有趣和美味的和谐。',
      ja: '辛く煮込んだタクドリタン！骨ごと食べる楽しさと味のハーモニー。'
    },
    emoji: '🍗',
    category: 'lunch',
    calories: 550,
    tags: ['spicy', 'braised', 'bone-in'],
    weight: { breakfast: 1, lunch: 8, dinner: 9, snack: 5 }
  },
  {
    id: 'gamjatang',
    name: {
      ko: '감자탕',
      en: 'Pork Backbone Stew',
      zh: '猪骨汤',
      ja: 'カムジャタン'
    },
    description: {
      ko: '얼큰한 국물의 감자탕! 돼지 등뼈의 깊은 맛.',
      en: 'Hearty pork backbone stew! Deep flavor of pork spine.',
      zh: '辣味十足的猪骨汤！猪脊骨的深厚味道。',
      ja: '辛いスープのカムジャタン！豚の背骨の深い味わい。'
    },
    emoji: '🥩',
    category: 'lunch',
    calories: 620,
    tags: ['hearty', 'spicy', 'bone-based'],
    weight: { breakfast: 1, lunch: 9, dinner: 7, snack: 4 }
  },
  {
    id: 'kimchijjigae-extended',
    name: {
      ko: '돼지고기 김치찌개',
      en: 'Pork Kimchi Stew',
      zh: '猪肉泡菜汤',
      ja: '豚肉キムチチゲ'
    },
    description: {
      ko: '돼지고기가 듬뿍 들어간 김치찌개! 더욱 진한 국물 맛.',
      en: 'Kimchi stew with plenty of pork! Even richer broth flavor.',
      zh: '猪肉满满的泡菜汤！更加浓郁的汤汁味道。',
      ja: '豚肉がたっぷり入ったキムチチゲ！より濃厚なスープの味。'
    },
    emoji: '🍲',
    category: 'lunch',
    calories: 480,
    tags: ['spicy', 'pork', 'rich'],
    weight: { breakfast: 3, lunch: 9, dinner: 6, snack: 3 }
  },
  {
    id: 'bulgogi-extended',
    name: {
      ko: 'LA 불고기',
      en: 'LA Style Bulgogi',
      zh: '洛杉矶式烤肉',
      ja: 'LAスタイルプルコギ'
    },
    description: {
      ko: '달콤한 양념의 LA식 불고기! 미국 교포들이 사랑하는 맛.',
      en: 'Sweet LA style bulgogi! Favorite flavor of Korean-Americans.',
      zh: '甜酱的洛杉矶式烤肉！韩裔美国人喜爱的味道。',
      ja: '甘いタレのLAスタイルプルコギ！在米韓国人が愛する味。'
    },
    emoji: '🥩',
    category: 'lunch',
    calories: 520,
    tags: ['sweet', 'american-korean', 'popular'],
    weight: { breakfast: 2, lunch: 8, dinner: 7, snack: 4 }
  },
  {
    id: 'samgyetang-extended',
    name: {
      ko: '영계백숙',
      en: 'Young Chicken Ginseng Soup',
      zh: '童子鸡参汤',
      ja: '英鶏白粲'
    },
    description: {
      ko: '연한 영계에 인삼과 대추! 최고급 보양식.',
      en: 'Young chicken with ginseng and jujubes! Premium tonic food.',
      zh: '嫩童子鸡配人参和枣子！最高级的滋补食品。',
      ja: '柔らかい英鶏に高麗人参とナツメ！最高級の滋養食。'
    },
    emoji: '🐔',
    category: 'lunch',
    calories: 450,
    tags: ['premium', 'tonic', 'nutritious'],
    weight: { breakfast: 1, lunch: 7, dinner: 8, snack: 1 }
  },
  {
    id: 'dakgalbi-extended',
    name: {
      ko: '춘천 닭갈비',
      en: 'Chuncheon Dakgalbi',
      zh: '春川辣炒鸡肉',
      ja: 'チュンチョン・タッカルビ'
    },
    description: {
      ko: '춘천식 매콤달콤한 닭갈비! 쫄면과 함께 먹는 재미.',
      en: 'Spicy sweet Chuncheon style dakgalbi! Fun to eat with noodles.',
      zh: '春川式甜辣鸡肉炒！和面条一起吃的有趣。',
      ja: 'チュンチョン式甘辛いタッカルビ！麺と一緒に食べる楽しみ。'
    },
    emoji: '🍗',
    category: 'lunch',
    calories: 550,
    tags: ['regional', 'spicy', 'noodle-combo'],
    weight: { breakfast: 1, lunch: 9, dinner: 5, snack: 4 }
  },
  {
    id: 'bibimnaengmyeon',
    name: {
      ko: '비빔냉면',
      en: 'Spicy Cold Noodles',
      zh: '拌冷面',
      ja: 'ビビム冷麺'
    },
    description: {
      ko: '시원한 냉면에 매콤한 양념장! 여름 점심의 대표 메뉴.',
      en: 'Cool noodles with spicy sauce! Representative summer lunch.',
      zh: '凉面配辣酱！夏季午餐的代表菜单。',
      ja: '冷たい麺に辛いタレ！夏のランチの代表メニュー。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 380,
    tags: ['cold', 'spicy', 'summer'],
    weight: { breakfast: 1, lunch: 9, dinner: 10, snack: 2 }
  },
  {
    id: 'udon',
    name: {
      ko: '우동',
      en: 'Udon Noodles',
      zh: '乌冬面',
      ja: 'ウドン'
    },
    description: {
      ko: '쫄깃한 우동 면에 진한 국물! 따뜻하고 든든한 점심.',
      en: 'Chewy udon noodles with rich broth! Warm and hearty lunch.',
      zh: '筋道的乌冬面配浓汤！温暖饱腹的午餐。',
      ja: 'もちもちのウドン麺に濃厚なスープ！温かくて心を満たすランチ。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 480,
    tags: ['noodles', 'warm', 'japanese-korean'],
    weight: { breakfast: 2, lunch: 7, dinner: 5, snack: 6 }
  },
  {
    id: 'ramen-lunch',
    name: {
      ko: '라멘',
      en: 'Ramen',
      zh: '拉面',
      ja: 'ラーメン'
    },
    description: {
      ko: '진한 국물의 라멘! 한국식으로 변형된 일본 라면.',
      en: 'Rich broth ramen! Japanese ramen adapted to Korean taste.',
      zh: '浓汤的拉面！适应韩国口味的日本拉面。',
      ja: '濃厚なスープのラーメン！韓国風にアレンジされた日本ラーメン。'
    },
    emoji: '🍜',
    category: 'lunch',
    calories: 550,
    tags: ['rich', 'japanese-korean', 'noodles'],
    weight: { breakfast: 1, lunch: 8, dinner: 4, snack: 7 }
  },
  {
    id: 'sushi-lunch',
    name: {
      ko: '초밥 세트',
      en: 'Sushi Set',
      zh: '寿司套餐',
      ja: '寿司セット'
    },
    description: {
      ko: '신선한 해산물 초밥! 건강하고 세련된 점심 식사.',
      en: 'Fresh seafood sushi! Healthy and sophisticated lunch.',
      zh: '新鲜海鲜寿司！健康优雅的午餐。',
      ja: '新鮮な海鮮寿司！健康的で洗練されたランチ。'
    },
    emoji: '🍣',
    category: 'lunch',
    calories: 420,
    tags: ['fresh', 'seafood', 'japanese'],
    weight: { breakfast: 1, lunch: 6, dinner: 8, snack: 2 }
  },
  {
    id: 'curry-rice',
    name: {
      ko: '카레라이스',
      en: 'Curry Rice',
      zh: '咖喱饭',
      ja: 'カレーライス'
    },
    description: {
      ko: '한국식 달콤한 카레에 밥! 친근하고 맛있는 점심.',
      en: 'Korean style sweet curry with rice! Friendly and delicious lunch.',
      zh: '韩国式甜咖喱配饭！亲切美味的午餐。',
      ja: '韓国風甘いカレーにご飯！親しみやすく美味しいランチ。'
    },
    emoji: '🍛',
    category: 'lunch',
    calories: 580,
    tags: ['sweet', 'comforting', 'indian-korean'],
    weight: { breakfast: 2, lunch: 8, dinner: 4, snack: 5 }
  },
  {
    id: 'sandwich',
    name: {
      ko: '샌드위치',
      en: 'Sandwich',
      zh: '三明治',
      ja: 'サンドイッチ'
    },
    description: {
      ko: '신선한 야채와 햄의 샌드위치! 가벼운 점심으로 최고.',
      en: 'Sandwich with fresh vegetables and ham! Best for light lunch.',
      zh: '新鲜蔬菜和火腿的三明治！轻便午餐的最佳选择。',
      ja: '新鮮な野菜とハムのサンドイッチ！軽いランチに最高。'
    },
    emoji: '🥪',
    category: 'lunch',
    calories: 380,
    tags: ['light', 'fresh', 'convenient'],
    weight: { breakfast: 4, lunch: 9, dinner: 3, snack: 7 }
  },
  {
    id: 'wrap',
    name: {
      ko: '랩',
      en: 'Wrap',
      zh: '卷饼',
      ja: 'ラップ'
    },
    description: {
      ko: '토르티야에 야채와 고기! 건강하고 포터블한 점심.',
      en: 'Tortilla with vegetables and meat! Healthy and portable lunch.',
      zh: '玉米饼配蔬菜和肉！健康便携的午餐。',
      ja: 'トルティーヤに野菜と肉！健康的でポータブルなランチ。'
    },
    emoji: '🌯',
    category: 'lunch',
    calories: 420,
    tags: ['healthy', 'portable', 'mexican-inspired'],
    weight: { breakfast: 2, lunch: 7, dinner: 4, snack: 6 }
  },
  {
    id: 'poke-bowl',
    name: {
      ko: '포케 볼',
      en: 'Poke Bowl',
      zh: '夏威夷盖浇饭',
      ja: 'ポケボウル'
    },
    description: {
      ko: '신선한 생선과 채소의 하와이안 포케! 건강한 점심.',
      en: 'Hawaiian poke with fresh fish and vegetables! Healthy lunch.',
      zh: '新鲜鱼类和蔬菜的夏威夷盖浇饭！健康的午餐。',
      ja: '新鮮な魚と野菜のハワイアンポケ！健康的なランチ。'
    },
    emoji: '🐟',
    category: 'lunch',
    calories: 380,
    tags: ['fresh', 'hawaiian', 'healthy'],
    weight: { breakfast: 1, lunch: 6, dinner: 7, snack: 3 }
  },
  {
    id: 'quinoa-bowl',
    name: {
      ko: '퀴노아 볼',
      en: 'Quinoa Bowl',
      zh: '藜麦碗',
      ja: 'キヌアボウル'
    },
    description: {
      ko: '영양만점 퀴노아에 채소와 단백질! 슈퍼푸드 점심.',
      en: 'Nutritious quinoa with vegetables and protein! Superfood lunch.',
      zh: '营养丰富的藜麦配蔬菜和蛋白质！超级食品午餐。',
      ja: '栄養満点のキヌアに野菜とタンパク質！スーパーフードランチ。'
    },
    emoji: '🌾',
    category: 'lunch',
    calories: 450,
    tags: ['superfood', 'nutritious', 'balanced'],
    weight: { breakfast: 3, lunch: 7, dinner: 5, snack: 2 }
  },
  {
    id: 'risotto',
    name: {
      ko: '리조또',
      en: 'Risotto',
      zh: '意大利烩饭',
      ja: 'リゾット'
    },
    description: {
      ko: '크리미한 이탈리아 리조또! 특별한 점심 식사.',
      en: 'Creamy Italian risotto! Special lunch meal.',
      zh: '奶油般的意大利烩饭！特别的午餐。',
      ja: 'クリーミーなイタリアンリゾット！特別なランチ食事。'
    },
    emoji: '🍚',
    category: 'lunch',
    calories: 520,
    tags: ['creamy', 'italian', 'special'],
    weight: { breakfast: 1, lunch: 5, dinner: 8, snack: 2 }
  },
  {
    id: 'paella',
    name: {
      ko: '빠에야',
      en: 'Paella',
      zh: '西班牙海鲜饭',
      ja: 'パエリア'
    },
    description: {
      ko: '스페인 해산물 리조또 빠에야! 풍미 가득한 점심.',
      en: 'Spanish seafood paella! Flavorful lunch.',
      zh: '西班牙海鲜烩饭！风味十足的午餐。',
      ja: 'スペイン風海鮮パエリア！風味豊かなランチ。'
    },
    emoji: '🥘',
    category: 'lunch',
    calories: 580,
    tags: ['spanish', 'seafood', 'flavorful'],
    weight: { breakfast: 1, lunch: 6, dinner: 9, snack: 3 }
  },

  // 저녁 메뉴 (배달 앱에서 인기 있는 저녁 메뉴)
  {
    id: 'salad-dinner',
    name: {
      ko: '시저 샐러드',
      en: 'Caesar Salad',
      zh: '凯撒沙拉',
      ja: 'シーザーサラダ'
    },
    description: {
      ko: '신선한 로메인 상추에 크루통과 파마산 치즈! 가벼운 저녁 식사.',
      en: 'Fresh romaine lettuce with croutons and parmesan cheese! Light dinner.',
      zh: '新鲜罗马生菜配面包丁和帕玛森芝士！轻便的晚餐。',
      ja: '新鮮ロメインレタスにクルートンとパルメザンチーズ！軽い夕食。'
    },
    emoji: '🥗',
    category: 'dinner',
    calories: 280,
    tags: ['fresh', 'crunchy', 'light'],
    weight: { breakfast: 4, lunch: 6, dinner: 9, snack: 3 }
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
  // 확장된 저녁 메뉴들
  {
    id: 'miso-soup',
    name: {
      ko: '된장국',
      en: 'Miso Soup',
      zh: '味噌汤',
      ja: '味噌汁'
    },
    description: {
      ko: '구수한 된장국! 한국식 된장으로 만든 건강한 저녁 식사.',
      en: 'Hearty miso soup! Healthy dinner made with Korean soybean paste.',
      zh: '香浓的味噌汤！用韩国大酱制作的健康晚餐。',
      ja: '香ばしい味噌汁！韓国風味噌で作る健康的な夕食。'
    },
    emoji: '🍵',
    category: 'dinner',
    calories: 120,
    tags: ['light', 'traditional', 'healthy'],
    weight: { breakfast: 6, lunch: 3, dinner: 9, snack: 2 }
  },
  {
    id: 'wakame-soup',
    name: {
      ko: '미역국',
      en: 'Seaweed Soup',
      zh: '海带汤',
      ja: 'ワカメスープ'
    },
    description: {
      ko: '영양가득 미역국! 요오드가 풍부한 건강 저녁.',
      en: 'Nutritious seaweed soup! Rich in iodine for healthy dinner.',
      zh: '营养丰富的海带汤！富含碘的健康晚餐。',
      ja: '栄養満点のワカメスープ！ヨウ素が豊富な健康夕食。'
    },
    emoji: '🌿',
    category: 'dinner',
    calories: 150,
    tags: ['nutritious', 'iodine-rich', 'light'],
    weight: { breakfast: 5, lunch: 4, dinner: 8, snack: 1 }
  },
  {
    id: 'tofu-dinner',
    name: {
      ko: '두부조림',
      en: 'Braised Tofu',
      zh: '炖豆腐',
      ja: '豆腐の煮物'
    },
    description: {
      ko: '부드러운 두부에 달콤한 양념! 가벼운 저녁 메뉴.',
      en: 'Soft tofu with sweet sauce! Light dinner option.',
      zh: '柔软的豆腐配甜酱！轻便的晚餐选择。',
      ja: '柔らかい豆腐に甘いタレ！軽い夕食メニュー。'
    },
    emoji: '🍢',
    category: 'dinner',
    calories: 220,
    tags: ['soft', 'sweet', 'light'],
    weight: { breakfast: 4, lunch: 5, dinner: 9, snack: 3 }
  },
  {
    id: 'namul-bancham',
    name: {
      ko: '나물 반찬',
      en: 'Vegetable Side Dishes',
      zh: '野菜小菜',
      ja: 'ナムルのおかず'
    },
    description: {
      ko: '다양한 한국 나물 반찬! 건강하고 영양 밸런스 좋은 저녁.',
      en: 'Various Korean vegetable side dishes! Healthy dinner with good nutrition balance.',
      zh: '各种韩国野菜小菜！健康营养均衡的晚餐。',
      ja: '様々な韓国ナムルのおかず！健康的で栄養バランスの良い夕食。'
    },
    emoji: '🥬',
    category: 'dinner',
    calories: 180,
    tags: ['vegetarian', 'healthy', 'traditional'],
    weight: { breakfast: 3, lunch: 6, dinner: 8, snack: 1 }
  },
  {
    id: 'grilled-salmon',
    name: {
      ko: '연어 스테이크',
      en: 'Grilled Salmon',
      zh: '烤三文鱼',
      ja: 'サーモンステーキ'
    },
    description: {
      ko: '부드러운 연어 스테이크! 오메가3가 풍부한 건강 저녁.',
      en: 'Tender salmon steak! Rich in omega-3 for healthy dinner.',
      zh: '柔嫩的三文鱼排！富含Omega-3的健康晚餐。',
      ja: '柔らかいサーモンステーキ！オメガ3が豊富な健康夕食。'
    },
    emoji: '🐟',
    category: 'dinner',
    calories: 380,
    tags: ['omega-3', 'grilled', 'healthy'],
    weight: { breakfast: 1, lunch: 5, dinner: 9, snack: 2 }
  },
  {
    id: 'quinoa-salad',
    name: {
      ko: '퀴노아 샐러드',
      en: 'Quinoa Salad',
      zh: '藜麦沙拉',
      ja: 'キヌアサラダ'
    },
    description: {
      ko: '신선한 채소와 퀴노아의 건강 샐러드! 가벼운 저녁 식사.',
      en: 'Fresh vegetables and quinoa healthy salad! Light dinner meal.',
      zh: '新鲜蔬菜和藜麦的健康沙拉！轻便的晚餐。',
      ja: '新鮮な野菜ときのこの健康サラダ！軽い夕食食事。'
    },
    emoji: '🥗',
    category: 'dinner',
    calories: 280,
    tags: ['fresh', 'superfood', 'light'],
    weight: { breakfast: 4, lunch: 7, dinner: 9, snack: 3 }
  },
  {
    id: 'vegetable-stir-fry',
    name: {
      ko: '야채 볶음',
      en: 'Vegetable Stir-fry',
      zh: '炒蔬菜',
      ja: '野菜炒め'
    },
    description: {
      ko: '다양한 야채를 건강하게 볶은 요리! 영양 밸런스 최고.',
      en: 'Various vegetables stir-fried healthily! Perfect nutrition balance.',
      zh: '各种蔬菜健康炒制的菜肴！营养均衡最佳。',
      ja: '様々な野菜を健康的に炒めた料理！栄養バランス最高。'
    },
    emoji: '🥦',
    category: 'dinner',
    calories: 220,
    tags: ['vegetarian', 'nutritious', 'colorful'],
    weight: { breakfast: 5, lunch: 6, dinner: 8, snack: 2 }
  },
  {
    id: 'mushroom-risotto',
    name: {
      ko: '버섯 리조또',
      en: 'Mushroom Risotto',
      zh: '蘑菇烩饭',
      ja: 'マッシュルームリゾット'
    },
    description: {
      ko: '향긋한 버섯과 크리미한 리조또! 특별한 저녁 메뉴.',
      en: 'Aromatic mushrooms and creamy risotto! Special dinner menu.',
      zh: '香浓的蘑菇和奶油烩饭！特别的晚餐菜单。',
      ja: '香り高いきのことクリーミーリゾット！特別な夕食メニュー。'
    },
    emoji: '🍄',
    category: 'dinner',
    calories: 420,
    tags: ['creamy', 'aromatic', 'special'],
    weight: { breakfast: 1, lunch: 3, dinner: 8, snack: 2 }
  },
  {
    id: 'eggplant-teriyaki',
    name: {
      ko: '가지 테리야키',
      en: 'Eggplant Teriyaki',
      zh: '茄子照烧',
      ja: '茄子の照り焼き'
    },
    description: {
      ko: '달콤한 테리야키 소스의 가지 요리! 건강한 저녁 옵션.',
      en: 'Eggplant with sweet teriyaki sauce! Healthy dinner option.',
      zh: '甜照烧酱的茄子菜肴！健康的晚餐选择。',
      ja: '甘い照り焼きソースの茄子料理！健康的な夕食オプション。'
    },
    emoji: '🍆',
    category: 'dinner',
    calories: 180,
    tags: ['sweet', 'healthy', 'japanese-inspired'],
    weight: { breakfast: 2, lunch: 4, dinner: 7, snack: 3 }
  },
  {
    id: 'spinach-sesame',
    name: {
      ko: '시금치 무침',
      en: 'Spinach with Sesame',
      zh: '芝麻菠菜',
      ja: 'ほうれん草のゴマ和え'
    },
    description: {
      ko: '고소한 참기름과 깨로 무친 시금치! 한국 전통 반찬.',
      en: 'Spinach seasoned with sesame oil and seeds! Korean traditional side dish.',
      zh: '用芝麻油和芝麻拌制的菠菜！韩国传统小菜。',
      ja: '香ばしいごま油と胡麻で和えたほうれん草！韓国伝統のおかず。'
    },
    emoji: '🥬',
    category: 'dinner',
    calories: 120,
    tags: ['traditional', 'sesame', 'light'],
    weight: { breakfast: 6, lunch: 5, dinner: 8, snack: 2 }
  },
  {
    id: 'bean-sprout-soup',
    name: {
      ko: '콩나물국',
      en: 'Bean Sprout Soup',
      zh: '黄豆芽汤',
      ja: '豆もやしスープ'
    },
    description: {
      ko: '시원하고 개운한 콩나물국! 가벼운 저녁 식사.',
      en: 'Cool and refreshing bean sprout soup! Light dinner meal.',
      zh: '清凉爽口的黄豆芽汤！轻便的晚餐。',
      ja: 'さっぱりとしたもやしスープ！軽い夕食食事。'
    },
    emoji: '🌱',
    category: 'dinner',
    calories: 90,
    tags: ['light', 'refreshing', 'traditional'],
    weight: { breakfast: 7, lunch: 4, dinner: 9, snack: 1 }
  },
  {
    id: 'grilled-vegetables',
    name: {
      ko: '구이 야채',
      en: 'Grilled Vegetables',
      zh: '烤蔬菜',
      ja: 'グリル野菜'
    },
    description: {
      ko: '직화로 구운 다양한 야채! 건강하고 맛있는 저녁.',
      en: 'Various vegetables grilled directly! Healthy and delicious dinner.',
      zh: '直接烤制的各种蔬菜！健康美味的晚餐。',
      ja: '直火で焼いた様々な野菜！健康的で美味しい夕食。'
    },
    emoji: '🍆',
    category: 'dinner',
    calories: 160,
    tags: ['grilled', 'healthy', 'colorful'],
    weight: { breakfast: 3, lunch: 5, dinner: 8, snack: 2 }
  },
  {
    id: 'lentil-soup',
    name: {
      ko: '렌틸 수프',
      en: 'Lentil Soup',
      zh: '扁豆汤',
      ja: 'レンズ豆スープ'
    },
    description: {
      ko: '영양가득 렌틸콩 수프! 단백질 풍부한 건강 저녁.',
      en: 'Nutritious lentil soup! Protein-rich healthy dinner.',
      zh: '营养丰富的扁豆汤！蛋白质充足的健康晚餐。',
      ja: '栄養満点のレンズ豆スープ！タンパク質豊富な健康夕食。'
    },
    emoji: '🍛',
    category: 'dinner',
    calories: 280,
    tags: ['protein-rich', 'nutritious', 'hearty'],
    weight: { breakfast: 4, lunch: 6, dinner: 7, snack: 1 }
  },
  {
    id: 'zucchini-noodles',
    name: {
      ko: '주키니 누들',
      en: 'Zucchini Noodles',
      zh: '西葫芦面',
      ja: 'ズッキーニヌードル'
    },
    description: {
      ko: '저칼로리 주키니 면 요리! 건강하고 가벼운 저녁.',
      en: 'Low-calorie zucchini noodle dish! Healthy and light dinner.',
      zh: '低卡路里西葫芦面条菜肴！健康轻便的晚餐。',
      ja: '低カロリーのズッキーニヌードル料理！健康的で軽い夕食。'
    },
    emoji: '🥒',
    category: 'dinner',
    calories: 140,
    tags: ['low-calorie', 'healthy', 'light'],
    weight: { breakfast: 2, lunch: 4, dinner: 9, snack: 3 }
  },
  {
    id: 'sweet-potato-soup',
    name: {
      ko: '고구마 수프',
      en: 'Sweet Potato Soup',
      zh: '红薯汤',
      ja: 'さつまいもスープ'
    },
    description: {
      ko: '달콤하고 부드러운 고구마 수프! 따뜻한 저녁 식사.',
      en: 'Sweet and soft sweet potato soup! Warm dinner meal.',
      zh: '甜美柔软的红薯汤！温暖的晚餐。',
      ja: '甘くて柔らかいさつまいもスープ！温かい夕食食事。'
    },
    emoji: '🍠',
    category: 'dinner',
    calories: 220,
    tags: ['sweet', 'warm', 'comforting'],
    weight: { breakfast: 5, lunch: 3, dinner: 8, snack: 4 }
  },
  {
    id: 'kale-salad',
    name: {
      ko: '케일 샐러드',
      en: 'Kale Salad',
      zh: '羽衣甘蓝沙拉',
      ja: 'ケールサラダ'
    },
    description: {
      ko: '영양만점 케일 샐러드! 슈퍼푸드의 대표 저녁 메뉴.',
      en: 'Nutritious kale salad! Representative superfood dinner menu.',
      zh: '营养丰富的羽衣甘蓝沙拉！超级食品代表晚餐菜单。',
      ja: '栄養満点のケールサラダ！スーパーフードの代表夕食メニュー。'
    },
    emoji: '🥬',
    category: 'dinner',
    calories: 180,
    tags: ['superfood', 'nutritious', 'fresh'],
    weight: { breakfast: 4, lunch: 6, dinner: 8, snack: 1 }
  },
  {
    id: 'cucumber-salad',
    name: {
      ko: '오이 소박이',
      en: 'Cucumber Salad',
      zh: '黄瓜沙拉',
      ja: 'キュウリサラダ'
    },
    description: {
      ko: '시원하고 아삭한 오이 소박이! 한국 전통 냉채.',
      en: 'Cool and crunchy cucumber salad! Korean traditional cold dish.',
      zh: '清凉脆爽的黄瓜沙拉！韩国传统凉菜。',
      ja: '涼しくシャキシャキしたキュウリサラダ！韓国伝統の冷菜。'
    },
    emoji: '🥒',
    category: 'dinner',
    calories: 80,
    tags: ['cool', 'crunchy', 'traditional'],
    weight: { breakfast: 6, lunch: 7, dinner: 9, snack: 2 }
  },
  {
    id: 'broccoli-steamed',
    name: {
      ko: '찐 브로콜리',
      en: 'Steamed Broccoli',
      zh: '蒸西兰花',
      ja: '蒸しブロッコリー'
    },
    description: {
      ko: '영양가득 찐 브로콜리! 건강한 저녁 채소.',
      en: 'Nutritious steamed broccoli! Healthy dinner vegetable.',
      zh: '营养丰富的蒸西兰花！健康的晚餐蔬菜。',
      ja: '栄養満点の蒸しブロッコリー！健康的な夕食野菜。'
    },
    emoji: '🥦',
    category: 'dinner',
    calories: 120,
    tags: ['steamed', 'healthy', 'green'],
    weight: { breakfast: 3, lunch: 5, dinner: 8, snack: 1 }
  },
  {
    id: 'tomato-soup',
    name: {
      ko: '토마토 수프',
      en: 'Tomato Soup',
      zh: '番茄汤',
      ja: 'トマトスープ'
    },
    description: {
      ko: '신선한 토마토로 만든 건강 수프! 비타민 C 풍부.',
      en: 'Healthy soup made with fresh tomatoes! Rich in vitamin C.',
      zh: '新鲜番茄制作的健康汤！富含维生素C。',
      ja: '新鮮なトマトで作る健康スープ！ビタミンC豊富。'
    },
    emoji: '🍅',
    category: 'dinner',
    calories: 140,
    tags: ['vitamin-c', 'healthy', 'warm'],
    weight: { breakfast: 4, lunch: 6, dinner: 7, snack: 2 }
  },
  {
    id: 'asparagus-grilled',
    name: {
      ko: '구운 아스파라거스',
      en: 'Grilled Asparagus',
      zh: '烤芦笋',
      ja: 'グリルアスパラガス'
    },
    description: {
      ko: '직화로 구운 아스파라거스! 섬세하고 건강한 저녁.',
      en: 'Asparagus grilled directly! Delicate and healthy dinner.',
      zh: '直接烤制的芦笋！细腻健康的晚餐。',
      ja: '直火で焼いたアスパラガス！繊細で健康的な夕食。'
    },
    emoji: '🌿',
    category: 'dinner',
    calories: 90,
    tags: ['grilled', 'delicate', 'healthy'],
    weight: { breakfast: 2, lunch: 4, dinner: 8, snack: 1 }
  },
  {
    id: 'pasta-dinner',
    name: {
      ko: '까르보나라 파스타',
      en: 'Carbonara Pasta',
      zh: '培根奶油意大利面',
      ja: 'カルボナーラパスタ'
    },
    description: {
      ko: '크리미한 크림 소스에 베이컨과 파슬리! 이탈리아 대표 파스타.',
      en: 'Creamy sauce with bacon and parsley! Italian representative pasta.',
      zh: '奶油酱配培根和香菜！意大利代表意面。',
      ja: 'クリーミーソースにベーコンとパセリ！イタリア代表パスタ。'
    },
    emoji: '🍝',
    category: 'dinner',
    calories: 580,
    tags: ['creamy', 'italian', 'bacon'],
    weight: { breakfast: 1, lunch: 5, dinner: 9, snack: 4 }
  },
  {
    id: 'steak-dinner',
    name: {
      ko: '립아이 스테이크',
      en: 'Ribeye Steak',
      zh: '肋眼牛排',
      ja: 'リブアイステーキ'
    },
    description: {
      ko: '최고급 마블링의 립아이 스테이크! 육즙이 풍부한 특별 저녁.',
      en: 'Premium marbled ribeye steak! Juicy special dinner.',
      zh: '顶级大理石纹理的肋眼牛排！多汁的特别晚餐。',
      ja: '最高級マーブリングのリブアイステーキ！ジューシーな特別夕食。'
    },
    emoji: '🥩',
    category: 'dinner',
    calories: 650,
    tags: ['premium', 'juicy', 'special'],
    weight: { breakfast: 1, lunch: 3, dinner: 8, snack: 2 }
  },
  {
    id: 'sushi-dinner',
    name: {
      ko: '연어 초밥 세트',
      en: 'Salmon Sushi Set',
      zh: '三文鱼寿司套餐',
      ja: 'サーモン寿司セット'
    },
    description: {
      ko: '신선한 연어 초밥과 다양한 롤! 건강한 저녁 식사.',
      en: 'Fresh salmon sushi and various rolls! Healthy dinner.',
      zh: '新鲜三文鱼寿司和各种手卷！健康的晚餐。',
      ja: '新鮮サーモン寿司と様々なロール！健康的な夕食。'
    },
    emoji: '🍣',
    category: 'dinner',
    calories: 420,
    tags: ['fresh', 'salmon', 'japanese'],
    weight: { breakfast: 1, lunch: 4, dinner: 9, snack: 3 }
  },
  {
    id: 'curry-dinner',
    name: {
      ko: '치킨 카레',
      en: 'Chicken Curry',
      zh: '鸡肉咖喱',
      ja: 'チキンカレー'
    },
    description: {
      ko: '부드러운 치킨과 향긋한 카레! 한국식 단맛 나는 카레.',
      en: 'Tender chicken and fragrant curry! Korean style mildly sweet curry.',
      zh: '嫩鸡肉和香浓咖喱！韩国式微甜的咖喱。',
      ja: '柔らかいチキンと香ばしいカレー！韓国風甘めの辛口カレー。'
    },
    emoji: '🍛',
    category: 'dinner',
    calories: 520,
    tags: ['chicken', 'fragrant', 'korean-style'],
    weight: { breakfast: 2, lunch: 7, dinner: 8, snack: 5 }
  },
  {
    id: 'grilled-salmon-dinner',
    name: {
      ko: '구운 연어 스테이크',
      en: 'Grilled Salmon Steak',
      zh: '烤三文鱼排',
      ja: 'グリルサーモンステーキ'
    },
    description: {
      ko: '오메가3가 풍부한 구운 연어! 건강한 저녁 메뉴.',
      en: 'Grilled salmon rich in omega-3! Healthy dinner menu.',
      zh: '富含Omega-3的烤三文鱼！健康的晚餐菜单。',
      ja: 'オメガ3が豊富なグリルサーモン！健康的な夕食メニュー。'
    },
    emoji: '🐟',
    category: 'dinner',
    calories: 380,
    tags: ['omega-3', 'grilled', 'healthy'],
    weight: { breakfast: 1, lunch: 3, dinner: 9, snack: 2 }
  },
  {
    id: 'mushroom-risotto-dinner',
    name: {
      ko: '버섯 리조또',
      en: 'Mushroom Risotto',
      zh: '蘑菇烩饭',
      ja: 'マッシュルームリゾット'
    },
    description: {
      ko: '크리미한 리조또에 향긋한 버섯! 이탈리아 대표 저녁 메뉴.',
      en: 'Creamy risotto with aromatic mushrooms! Italian dinner classic.',
      zh: '奶油烩饭配香浓蘑菇！意大利晚餐经典。',
      ja: 'クリーミーリゾットに香ばしいきのこ！イタリアン夕食の定番。'
    },
    emoji: '🍄',
    category: 'dinner',
    calories: 480,
    tags: ['creamy', 'mushroom', 'italian'],
    weight: { breakfast: 1, lunch: 2, dinner: 8, snack: 2 }
  },
  {
    id: 'paella-dinner',
    name: {
      ko: '해산물 빠에야',
      en: 'Seafood Paella',
      zh: '海鲜西班牙海鲜饭',
      ja: 'シーフードパエリア'
    },
    description: {
      ko: '신선한 해산물이 가득한 스페인 빠에야! 풍미 가득한 저녁.',
      en: 'Spanish paella full of fresh seafood! Flavorful dinner.',
      zh: '新鲜海鲜丰富的西班牙海鲜饭！风味十足的晚餐。',
      ja: '新鮮海鮮がたっぷりのスペイン風パエリア！風味豊かな夕食。'
    },
    emoji: '🥘',
    category: 'dinner',
    calories: 550,
    tags: ['seafood', 'spanish', 'flavorful'],
    weight: { breakfast: 1, lunch: 3, dinner: 8, snack: 2 }
  },
  {
    id: 'quinoa-bowl-dinner',
    name: {
      ko: '퀴노아 샐러드 볼',
      en: 'Quinoa Salad Bowl',
      zh: '藜麦沙拉碗',
      ja: 'キヌアサラダボウル'
    },
    description: {
      ko: '슈퍼푸드 퀴노아에 다양한 채소와 단백질! 건강 저녁.',
      en: 'Superfood quinoa with various vegetables and protein! Healthy dinner.',
      zh: '超级食品藜麦配各种蔬菜和蛋白质！健康晚餐。',
      ja: 'スーパーフードきのに様々な野菜とタンパク質！健康夕食。'
    },
    emoji: '🥗',
    category: 'dinner',
    calories: 420,
    tags: ['superfood', 'healthy', 'balanced'],
    weight: { breakfast: 3, lunch: 5, dinner: 9, snack: 2 }
  },

  // 야식 메뉴 (배달 앱 야식 베스트셀러)
  {
    id: 'fried-chicken',
    name: {
      ko: '양념 치킨',
      en: 'Seasoned Fried Chicken',
      zh: '酱料炸鸡',
      ja: 'ヤンニョムチキン'
    },
    description: {
      ko: '달콤매콤한 양념이 듬뿍 밴 치킨! 야식의 절대 강자.',
      en: 'Chicken coated in sweet and spicy sauce! Absolute late-night champion.',
      zh: '甜辣酱料丰富的鸡肉！宵夜的绝对强者。',
      ja: '甘辛いタレがたっぷり絡んだチキン！夜食の絶対王者。'
    },
    emoji: '🍗',
    category: 'snack',
    calories: 620,
    tags: ['spicy', 'sweet', 'popular'],
    weight: { breakfast: 1, lunch: 5, dinner: 7, snack: 10 }
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
  // 확장된 야식 메뉴들
  {
    id: 'tteokbokki-extended',
    name: {
      ko: '로제 떡볶이',
      en: 'Rose Tteokbokki',
      zh: '玫瑰炒年糕',
      ja: 'ロゼトックポッキ'
    },
    description: {
      ko: '크림과 토마토 소스의 떡볶이! 달콤하고 부드러운 야식.',
      en: 'Tteokbokki with cream and tomato sauce! Sweet and soft late-night snack.',
      zh: '奶油和番茄酱的年糕炒！甜美柔软的宵夜。',
      ja: 'クリームとトマトソースのトックポッキ！甘くて柔らかい夜食。'
    },
    emoji: '🍥',
    category: 'snack',
    calories: 450,
    tags: ['creamy', 'sweet', 'fusion'],
    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 9 }
  },
  {
    id: 'mandu-night',
    name: {
      ko: '야식 만두',
      en: 'Late-night Dumplings',
      zh: '宵夜饺子',
      ja: '夜食マンドゥ'
    },
    description: {
      ko: '뜨끈한 만두국이나 군만두! 야식의 완벽한 선택.',
      en: 'Hot dumpling soup or fried dumplings! Perfect late-night choice.',
      zh: '热腾腾的饺子汤或炸饺子！宵夜的完美选择。',
      ja: '熱いマンドゥグクや軍マンドゥ！夜食の完璧な選択。'
    },
    emoji: '🥟',
    category: 'snack',
    calories: 380,
    tags: ['hot', 'comforting', 'filling'],
    weight: { breakfast: 3, lunch: 6, dinner: 8, snack: 8 }
  },
  {
    id: 'kimbap-night',
    name: {
      ko: '야식 김밥',
      en: 'Late-night Kimbap',
      zh: '宵夜紫菜包饭',
      ja: '夜食キンパプ'
    },
    description: {
      ko: '야식으로 먹는 김밥! 간단하면서도 든든한 선택.',
      en: 'Kimbap for late-night! Simple yet satisfying choice.',
      zh: '宵夜吃的紫菜包饭！简单却饱腹的选择。',
      ja: '夜食にキンパプ！シンプルで心を満たす選択。'
    },
    emoji: '🍙',
    category: 'snack',
    calories: 420,
    tags: ['simple', 'filling', 'portable'],
    weight: { breakfast: 4, lunch: 8, dinner: 3, snack: 9 }
  },
  {
    id: 'chicken-feet',
    name: {
      ko: '닭발',
      en: 'Chicken Feet',
      zh: '鸡爪',
      ja: '鶏足'
    },
    description: {
      ko: '매콤달콤한 양념 닭발! 야식의 대표 메뉴.',
      en: 'Spicy and sweet seasoned chicken feet! Representative late-night menu.',
      zh: '辣甜酱的鸡爪！宵夜的代表菜单。',
      ja: '辛くて甘いタレの鶏足！夜食の代表メニュー。'
    },
    emoji: '🐔',
    category: 'snack',
    calories: 320,
    tags: ['spicy', 'sweet', 'popular'],
    weight: { breakfast: 1, lunch: 4, dinner: 5, snack: 9 }
  },
  {
    id: 'dakgalbi-night',
    name: {
      ko: '야식 닭갈비',
      en: 'Late-night Dakgalbi',
      zh: '宵夜辣炒鸡肉',
      ja: '夜食タッカルビ'
    },
    description: {
      ko: '뜨끈한 닭갈비! 야식으로 먹는 매콤한 치킨.',
      en: 'Hot dakgalbi! Spicy chicken for late-night eating.',
      zh: '热腾腾的鸡肉炒！宵夜吃的辣鸡。',
      ja: '熱いタッカルビ！夜食に食べる辛いチキン。'
    },
    emoji: '🍗',
    category: 'snack',
    calories: 480,
    tags: ['spicy', 'hot', 'satisfying'],
    weight: { breakfast: 1, lunch: 7, dinner: 6, snack: 8 }
  },
  {
    id: 'mandu-fried',
    name: {
      ko: '군만두',
      en: 'Fried Dumplings',
      zh: '炸饺子',
      ja: '軍マンドゥ'
    },
    description: {
      ko: '바삭하게 튀긴 군만두! 야식으로 먹는 고소한 맛.',
      en: 'Crispy fried dumplings! Nutty flavor for late-night eating.',
      zh: '酥脆的炸饺子！宵夜吃的香脆味道。',
      ja: 'サクサクに揚がった軍マンドゥ！夜食に食べる香ばしい味。'
    },
    emoji: '🥟',
    category: 'snack',
    calories: 420,
    tags: ['crispy', 'fried', 'nutty'],
    weight: { breakfast: 2, lunch: 5, dinner: 7, snack: 9 }
  },
  {
    id: 'tteokbokki-cream',
    name: {
      ko: '크림 떡볶이',
      en: 'Cream Tteokbokki',
      zh: '奶油炒年糕',
      ja: 'クリームトックポッキ'
    },
    description: {
      ko: '부드러운 크림 소스의 떡볶이! 달콤하고 고소한 야식.',
      en: 'Tteokbokki with creamy sauce! Sweet and nutty late-night snack.',
      zh: '奶油酱的年糕炒！甜美香脆的宵夜。',
      ja: 'クリーミーソースのトックポッキ！甘くて香ばしい夜食。'
    },
    emoji: '🍥',
    category: 'snack',
    calories: 480,
    tags: ['creamy', 'sweet', 'comforting'],
    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 9 }
  },
  {
    id: 'ramen-extended',
    name: {
      ko: '야식 라면',
      en: 'Late-night Ramen',
      zh: '宵夜拉面',
      ja: '夜食ラーメン'
    },
    description: {
      ko: '뜨끈한 국물 라면! 야식의 대표적인 따뜻한 음식.',
      en: 'Hot broth ramen! Representative warm late-night food.',
      zh: '热汤拉面！宵夜的代表性温暖食物。',
      ja: '熱いスープラーメン！夜食の代表的な温かい食べ物。'
    },
    emoji: '🍜',
    category: 'snack',
    calories: 520,
    tags: ['hot', 'brothy', 'comforting'],
    weight: { breakfast: 1, lunch: 4, dinner: 5, snack: 10 }
  },
  {
    id: 'pizza-extended',
    name: {
      ko: '야식 피자',
      en: 'Late-night Pizza',
      zh: '宵夜披萨',
      ja: '夜食ピザ'
    },
    description: {
      ko: '따뜻한 치즈 피자! 야식으로 먹는 최고의 선택.',
      en: 'Warm cheesy pizza! Best choice for late-night eating.',
      zh: '温暖的奶酪披萨！宵夜的最佳选择。',
      ja: '温かいチーズピザ！夜食に食べる最高の選択。'
    },
    emoji: '🍕',
    category: 'snack',
    calories: 650,
    tags: ['cheesy', 'warm', 'satisfying'],
    weight: { breakfast: 1, lunch: 6, dinner: 8, snack: 9 }
  },
  {
    id: 'chicken-extended',
    name: {
      ko: '야식 치킨',
      en: 'Late-night Chicken',
      zh: '宵夜炸鸡',
      ja: '夜食チキン'
    },
    description: {
      ko: '바삭한 후라이드 치킨! 야식의 완벽한 동반자.',
      en: 'Crispy fried chicken! Perfect late-night companion.',
      zh: '酥脆的炸鸡！宵夜的完美伴侣。',
      ja: 'サクサクのフライドチキン！夜食の完璧な仲間。'
    },
    emoji: '🍗',
    category: 'snack',
    calories: 580,
    tags: ['crispy', 'fried', 'popular'],
    weight: { breakfast: 1, lunch: 5, dinner: 7, snack: 10 }
  },
  {
    id: 'bibimbap-night-extended',
    name: {
      ko: '야식 비빔밥',
      en: 'Late-night Bibimbap',
      zh: '宵夜拌饭',
      ja: '夜食ビビンバプ'
    },
    description: {
      ko: '뜨끈한 돌솥 비빔밥! 야식으로 먹는 든든한 한 끼.',
      en: 'Hot stone bibimbap! Satisfying meal for late-night eating.',
      zh: '热石锅拌饭！宵夜吃的饱腹一餐。',
      ja: '熱い石鍋ビビンバプ！夜食に食べる心を満たす一膳。'
    },
    emoji: '🍚',
    category: 'snack',
    calories: 550,
    tags: ['hot', 'stone-pot', 'satisfying'],
    weight: { breakfast: 2, lunch: 7, dinner: 8, snack: 7 }
  },
  {
    id: 'sundae-extended',
    name: {
      ko: '야식 순대',
      en: 'Late-night Sundae',
      zh: '宵夜香肠',
      ja: '夜食スンデ'
    },
    description: {
      ko: '뜨끈한 순대국! 야식으로 먹는 한국 전통 길거리 음식.',
      en: 'Hot sundae soup! Korean traditional street food for late-night.',
      zh: '热腾腾的香肠汤！宵夜吃的韩国传统街头食物。',
      ja: '熱いスンデグク！夜食に食べる韓国伝統ストリートフード。'
    },
    emoji: '🌭',
    category: 'snack',
    calories: 420,
    tags: ['traditional', 'hot', 'street-food'],
    weight: { breakfast: 1, lunch: 6, dinner: 4, snack: 8 }
  },
  {
    id: 'bossam-extended',
    name: {
      ko: '야식 보쌈',
      en: 'Late-night Bossam',
      zh: '宵夜烤肉卷',
      ja: '夜食ポッサム'
    },
    description: {
      ko: '야식으로 먹는 부드러운 보쌈! 특별한 야식 메뉴.',
      en: 'Tender bossam for late-night eating! Special late-night menu.',
      zh: '宵夜吃的柔嫩烤肉卷！特别的宵夜菜单。',
      ja: '夜食に食べる柔らかいポッサム！特別な夜食メニュー。'
    },
    emoji: '🥬',
    category: 'snack',
    calories: 520,
    tags: ['tender', 'special', 'wrapped'],
    weight: { breakfast: 1, lunch: 7, dinner: 9, snack: 6 }
  },
  {
    id: 'hamburger-extended',
    name: {
      ko: '야식 햄버거',
      en: 'Late-night Hamburger',
      zh: '宵夜汉堡',
      ja: '夜食ハンバーガー'
    },
    description: {
      ko: '뜨끈한 햄버거! 야식으로 먹는 패스트푸드의 즐거움.',
      en: 'Hot hamburger! Joy of fast food for late-night eating.',
      zh: '热腾腾的汉堡！宵夜吃快餐的乐趣。',
      ja: '熱いハンバーガー！夜食に食べるファストフードの楽しみ。'
    },
    emoji: '🍔',
    category: 'snack',
    calories: 580,
    tags: ['hot', 'fast-food', 'satisfying'],
    weight: { breakfast: 2, lunch: 7, dinner: 3, snack: 9 }
  },
  {
    id: 'sandwich-night',
    name: {
      ko: '야식 샌드위치',
      en: 'Late-night Sandwich',
      zh: '宵夜三明治',
      ja: '夜食サンドイッチ'
    },
    description: {
      ko: '간단하게 먹을 수 있는 샌드위치! 야식으로 좋은 선택.',
      en: 'Simple sandwich to eat! Good choice for late-night snack.',
      zh: '简单吃的的三明治！适合宵夜的选择。',
      ja: '簡単に食べられるサンドイッチ！夜食に良い選択。'
    },
    emoji: '🥪',
    category: 'snack',
    calories: 380,
    tags: ['simple', 'convenient', 'light'],
    weight: { breakfast: 4, lunch: 8, dinner: 3, snack: 7 }
  },
  {
    id: 'hot-bar',
    name: {
      ko: '야식 떡꼬치',
      en: 'Late-night Skewers',
      zh: '宵夜烤串',
      ja: '夜食焼き鳥'
    },
    description: {
      ko: '길거리에서 쉽게 먹을 수 있는 떡꼬치! 야식의 재미.',
      en: 'Easy street food skewers! Fun of late-night eating.',
      zh: '街头容易买到的烤串！宵夜的乐趣。',
      ja: '街中で簡単に食べられる焼き鳥！夜食の楽しみ。'
    },
    emoji: '🍢',
    category: 'snack',
    calories: 280,
    tags: ['street-food', 'fun', 'easy'],
    weight: { breakfast: 1, lunch: 3, dinner: 2, snack: 10 }
  },
  {
    id: 'fish-cake-soup',
    name: {
      ko: '어묵탕',
      en: 'Fish Cake Soup',
      zh: '鱼糕汤',
      ja: 'オデン汁'
    },
    description: {
      ko: '뜨끈한 어묵탕! 한국식 어묵 요리의 따뜻함.',
      en: 'Hot fish cake soup! Warmth of Korean fish cake dish.',
      zh: '热腾腾的鱼糕汤！韩式鱼糕菜肴的温暖。',
      ja: '熱いオデンタン！韓国風オデン料理の温かさ。'
    },
    emoji: '🍜',
    category: 'snack',
    calories: 320,
    tags: ['warm', 'comforting', 'traditional'],
    weight: { breakfast: 2, lunch: 4, dinner: 6, snack: 8 }
  },
  {
    id: 'instant-jjamppong',
    name: {
      ko: '컵 짜장면',
      en: 'Cup Jjamppong',
      zh: '杯炒码面',
      ja: 'カップチャジャンミョン'
    },
    description: {
      ko: '컵에 담긴 매콤한 짜장면! 야식으로 먹는 즉석 요리.',
      en: 'Spicy jjamppong in a cup! Instant dish for late-night eating.',
      zh: '杯装的辣炒码面！宵夜吃的即食菜肴。',
      ja: 'カップに入った辛いチャジャンミョン！夜食に食べる即席料理。'
    },
    emoji: '🥡',
    category: 'snack',
    calories: 420,
    tags: ['spicy', 'instant', 'seafood'],
    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 9 }
  },
  {
    id: 'buldak-chicken',
    name: {
      ko: '불닭 치킨',
      en: 'Fire Chicken',
      zh: '火鸡',
      ja: 'プルダクチキン'
    },
    description: {
      ko: '불처럼 매운 치킨! 매운 음식 좋아하는 사람들의 야식 필수품.',
      en: 'Chicken as spicy as fire! Essential late-night food for spice lovers.',
      zh: '像火一样辣的鸡肉！喜欢辣食的人的宵夜必需品。',
      ja: '火のように辛いチキン！辛い食べ物好きの夜食必需品。'
    },
    emoji: '🌶️',
    category: 'snack',
    calories: 650,
    tags: ['spicy', 'fire-hot', 'addictive'],
    weight: { breakfast: 1, lunch: 4, dinner: 6, snack: 9 }
  },
  {
    id: 'pizza-pepperoni',
    name: {
      ko: '야식 페퍼로니 피자',
      en: 'Late-night Pepperoni Pizza',
      zh: '宵夜意大利辣香肠披萨',
      ja: '夜食ペパロニピザ'
    },
    description: {
      ko: '치즈와 페퍼로니가 풍부한 피자! 야식으로 먹는 최고의 선택.',
      en: 'Pizza rich with cheese and pepperoni! Best choice for late-night eating.',
      zh: '奶酪和意大利辣香肠丰富的披萨！宵夜的最佳选择。',
      ja: 'チーズとペパロニが豊富なピザ！夜食に食べる最高の選択。'
    },
    emoji: '🍕',
    category: 'snack',
    calories: 680,
    tags: ['cheesy', 'pepperoni', 'satisfying'],
    weight: { breakfast: 1, lunch: 6, dinner: 8, snack: 9 }
  },
  {
    id: 'tteokbokki-rose',
    name: {
      ko: '로제 떡볶이',
      en: 'Rose Tteokbokki',
      zh: '玫瑰炒年糕',
      ja: 'ロゼトックポッキ'
    },
    description: {
      ko: '크림과 토마토 소스의 떡볶이! 달콤하고 부드러운 인기 메뉴.',
      en: 'Tteokbokki with cream and tomato sauce! Sweet and soft popular menu.',
      zh: '奶油和番茄酱的年糕炒！甜美柔软的热门菜单。',
      ja: 'クリームとトマトソースのトックポッキ！甘くて柔らかい人気メニュー。'
    },
    emoji: '🍥',
    category: 'snack',
    calories: 480,
    tags: ['creamy', 'sweet', 'trendy'],
    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 10 }
  },
  {
    id: 'chicken-feet',
    name: {
      ko: '맵닭발',
      en: 'Spicy Chicken Feet',
      zh: '辣鸡爪',
      ja: 'マプタル'
    },
    description: {
      ko: '불처럼 매운 닭발! 야식으로 먹는 한국 대표 안주.',
      en: 'Chicken feet as spicy as fire! Korean representative late-night snack.',
      zh: '像火一样辣的鸡爪！宵夜吃的韩国代表下酒菜。',
      ja: '火のように辛い鶏足！夜食に食べる韓国代表おつまみ。'
    },
    emoji: '🐔',
    category: 'snack',
    calories: 380,
    tags: ['spicy', 'chicken-feet', 'korean'],
    weight: { breakfast: 1, lunch: 2, dinner: 3, snack: 10 }
  },
  {
    id: 'ramen-snack',
    name: {
      ko: '야식 라면',
      en: 'Late-night Ramen',
      zh: '宵夜拉面',
      ja: '夜食ラーメン'
    },
    description: {
      ko: '뜨끈한 국물 라면! 야식의 기본 중의 기본.',
      en: 'Hot broth ramen! The basic of late-night eating.',
      zh: '热汤拉面！宵夜的基本中的基本。',
      ja: '熱いスープラーメン！夜食の基本中の基本。'
    },
    emoji: '🍜',
    category: 'snack',
    calories: 520,
    tags: ['hot', 'brothy', 'essential'],
    weight: { breakfast: 1, lunch: 4, dinner: 5, snack: 10 }
  },
  {
    id: 'chicken-wings',
    name: {
      ko: '치킨윙 세트',
      en: 'Chicken Wings Set',
      zh: '鸡翅套餐',
      ja: 'チキンウィングセット'
    },
    description: {
      ko: '바삭한 치킨윙에 매콤한 소스! 야식으로 딱 좋은 안주.',
      en: 'Crispy chicken wings with spicy sauce! Perfect late-night snack.',
      zh: '酥脆鸡翅配辣酱！适合宵夜的下酒菜。',
      ja: 'サクサクのチキンウィングに辛いソース！夜食にぴったりのおつまみ。'
    },
    emoji: '🍗',
    category: 'snack',
    calories: 480,
    tags: ['crispy', 'spicy', 'wings'],
    weight: { breakfast: 1, lunch: 5, dinner: 6, snack: 9 }
  },
  {
    id: 'zinger-burger',
    name: {
      ko: '징거버거',
      en: 'Zinger Burger',
      zh: '津格堡',
      ja: 'ジンガーバーガー'
    },
    description: {
      ko: 'KFC의 매콤한 치킨 패티 버거! 야식으로 강력 추천.',
      en: 'KFC\'s spicy chicken patty burger! Highly recommended for late-night.',
      zh: '肯德基的辣鸡肉饼堡！宵夜强烈推荐。',
      ja: 'KFCの辛いチキンパティバーガー！夜食に強くおすすめ。'
    },
    emoji: '🍔',
    category: 'snack',
    calories: 580,
    tags: ['kfc', 'spicy', 'chicken'],
    weight: { breakfast: 1, lunch: 6, dinner: 4, snack: 8 }
  },
  {
    id: 'hot-dog',
    name: {
      ko: '핫도그 세트',
      en: 'Hot Dog Set',
      zh: '热狗套餐',
      ja: 'ホットドッグセット'
    },
    description: {
      ko: '길게 뻗은 소시지에 머스터드와 케첩! 간단한 야식.',
      en: 'Long sausage with mustard and ketchup! Simple late-night snack.',
      zh: '长长的香肠配芥末酱和番茄酱！简单的宵夜。',
      ja: '長く伸びたソーセージにマスタードとケチャップ！シンプルな夜食。'
    },
    emoji: '🌭',
    category: 'snack',
    calories: 420,
    tags: ['simple', 'sausage', 'classic'],
    weight: { breakfast: 2, lunch: 5, dinner: 3, snack: 8 }
  },
  {
    id: 'taco-snack',
    name: {
      ko: '타코야키',
      en: 'Takoyaki',
      zh: '章鱼烧',
      ja: 'たこ焼き'
    },
    description: {
      ko: '달콤한 타코야키 소스에 문어! 일본식 야식 메뉴.',
      en: 'Sweet takoyaki sauce with octopus! Japanese late-night menu.',
      zh: '甜章鱼烧酱配章鱼！日式宵夜菜单。',
      ja: '甘いたこ焼きソースにタコ！日本風夜食メニュー。'
    },
    emoji: '🦑',
    category: 'snack',
    calories: 380,
    tags: ['octopus', 'japanese', 'sweet'],
    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 7 }
  }
];
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
    emoji: '🌅'
  },
  lunch: {
    name: {
      ko: '점심',
      en: 'Lunch',
      zh: '午餐',
      ja: '昼食'
    },
    emoji: '☀️'
  },
  dinner: {
    name: {
      ko: '저녁',
      en: 'Dinner',
      zh: '晚餐',
      ja: '夕食'
    },
    emoji: '🌙'
  },
  snack: {
    name: {
      ko: '야식',
      en: 'Late Night',
      zh: '宵夜',
      ja: '夜食'
    },
    emoji: '🌃'
  },
  random: {
    name: {
      ko: '랜덤',
      en: 'Random',
      zh: '随机',
      ja: 'ランダム'
    },
    emoji: '🎲'
  }
};

export type TimeSlot = keyof typeof timeSlots | 'random';

// 가중치 기반 메뉴 추천 함수
export function getWeightedRandomMenu(timeSlot: TimeSlot): MenuItem {
  // 랜덤 선택지인 경우 모든 카테고리의 메뉴에서 골고루 추천
  if (timeSlot === 'random') {
    const allMenus = menuRecommendations.filter(menu => menu.category !== 'random');
    return allMenus[Math.floor(Math.random() * allMenus.length)];
  }

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
