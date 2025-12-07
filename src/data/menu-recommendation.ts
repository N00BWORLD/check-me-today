// 메뉴 추천 데이터
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
  calories: number;
  tags: string[];
  weight: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
}

export type TimeSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'random';

export const menuRecommendations: MenuItem[] = [
  // 아침 메뉴 (배달 아침 인기템)
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
      ko: '바삭한 치킨윙에 매콤한 소스! 야식으로 먹는 안주.',
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
      en: 'Late-night Snack',
      zh: '夜宵',
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

// 가중치 기반 메뉴 추천 함수
export function getWeightedRandomMenu(timeSlot: TimeSlot): MenuItem {
  // 랜덤 선택지인 경우 모든 카테고리의 메뉴에서 골고루 추천
  if (timeSlot === 'random') {
    return menuRecommendations[Math.floor(Math.random() * menuRecommendations.length)];
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