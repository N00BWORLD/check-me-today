// ë©”ë‰´ ì¶”ì²œ ?°ì´??
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
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  calories: number;
  // ê°€ì¤‘ì¹˜?????´ìƒ ?¬ìš©?˜ì? ?Šì?ë§? ê³¼ê±° ?„ë“œë¥?? ì? (?µì…”??
  weight?: Partial<Record<TimeSlot, number>>;
}

export type TimeSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'random';

export const menuRecommendations: MenuItem[] = [
  // ?„ì¹¨ ë©”ë‰´ (ë°°ë‹¬ ?„ì¹¨ ?¸ê¸°??
  {
    id: 'toast-delivery',
    name: {
      ko: 'ë°”ì‚­??? ìŠ¤???¸íŠ¸',
      en: 'Crispy Toast Set',
      zh: '?¥è„†?å¸å¥—é¤',
      ja: '?µã‚¯?µã‚¯?ˆãƒ¼?¹ãƒˆ?»ãƒƒ??
    },
    description: {
      ko: 'ê°?êµ¬ìš´ ë°”ì‚­??? ìŠ¤?¸ì— ë²„í„°?€ ?? ì»¤í”¼?€ ?¨ê»˜?˜ëŠ” ?„ë²½???„ì¹¨.',
      en: 'Freshly baked crispy toast with butter and jam! Perfect morning with coffee.',
      zh: '?°é²œ?¤åˆ¶?„é…¥?†å?¸é…é»„æ²¹?Œæœ?±ï¼?Œå’–?¡æ­?çš„å®Œç¾?©æ™¨??,
      ja: '?¼ãç«‹ã¦??‚µ??‚µ??ƒˆ?¼ã‚¹?ˆã«?ã‚¿?¼ã¨?¸ãƒ£? ï¼?³ãƒ¼?’ãƒ¼?¨ä?ç·’ã«å®Œç’§?ªæœ??
    },
    emoji: '?',
    category: 'breakfast',
    calories: 380,

    weight: { breakfast: 10, lunch: 3, dinner: 1, snack: 5 }
  },
  {
    id: 'sandwich-breakfast',
    name: {
      ko: 'BLT ?Œë“œ?„ì¹˜',
      en: 'BLT Sandwich',
      zh: '?¹æ ¹?Ÿèœ?ªèŒ„ä¸‰æ˜æ²?,
      ja: 'BLT?µãƒ³?‰ã‚¤?ƒãƒ'
    },
    description: {
      ko: 'ë°”ì‚­??ë² ì´ì»¨ê³¼ ? ì„ ??ì±„ì†Œ??ì¡°í•©! ? ë“ ???„ì¹¨ ?ì‚¬.',
      en: 'Crispy bacon with fresh vegetables! Hearty breakfast meal.',
      zh: '?¥è„†?¹æ ¹?æ–°é²œè”¬?œï¼é¥±è…¹?„æ—©é¤ã€?,
      ja: '?µã‚¯?µã‚¯??ƒ™?¼ã‚³?³ã¨?°é??èœ??µ„?¿åˆ?ã›ï¼å¿ƒ?’æ??Ÿã™?é£Ÿ??
    },
    emoji: '?¥ª',
    category: 'breakfast',
    calories: 420,

    weight: { breakfast: 9, lunch: 7, dinner: 2, snack: 6 }
  },
  {
    id: 'croissant-delivery',
    name: {
      ko: 'ê°?êµ¬ìš´ ?¬ë£¨?„ìƒ',
      en: 'Fresh Croissant',
      zh: '?°é²œ?›è§’?¢åŒ…',
      ja: '?¼ãç«‹ã¦??ƒ­??ƒƒ?µãƒ³'
    },
    description: {
      ko: 'ê°?êµ¬ìš´ ?¬ë£¨?„ìƒ??ë²„í„° ?? ì»¤í”¼?€ ?¨ê»˜?˜ëŠ” ?„ë‘?¤ì‹ ?„ì¹¨.',
      en: 'Buttery aroma of freshly baked croissant! French morning with coffee.',
      zh: '?°é²œ?¤åˆ¶?„ç‰›è§’é¢?…çš„é»„æ²¹é¦™æ°”ï¼å’Œ?–å•¡??…?„æ³•?½å¼?©æ™¨??,
      ja: '?¼ãç«‹ã¦??ƒ­??ƒƒ?µãƒ³??ƒ?¿ãƒ¼??¦™?Šï¼?³ãƒ¼?’ãƒ¼?¨ä?ç·’ã«?•ãƒ©?³ã‚¹é¢¨æœé£Ÿã€?
    },
    emoji: '?¥',
    category: 'breakfast',
    calories: 320,

    weight: { breakfast: 8, lunch: 2, dinner: 1, snack: 4 }
  },
  {
    id: 'pancake-delivery',
    name: {
      ko: '?¬ì??´í¬ ?¸íŠ¸',
      en: 'Pancake Set',
      zh: '?é?å¥—é¤',
      ja: '?‘ãƒ³?±ãƒ¼??‚»?ƒãƒˆ'
    },
    description: {
      ko: '??‹ ??‹  ?¬ì??´í¬??ë©”ì´???œëŸ½! ?¬ì½¤???„ì¹¨ ?ì‚¬.',
      en: 'Fluffy pancakes with maple syrup! Sweet breakfast meal.',
      zh: '?¬æ¾?é??æ«ç³–æµ†ï¼ç”œ?œçš„?©é¤??,
      ja: '?µã‚?µã‚?‘ãƒ³?±ãƒ¼??«?¡ãƒ¼?—ãƒ«?·ãƒ­?ƒãƒ—ï¼ç”˜?„æœé£Ÿã€?
    },
    emoji: '?¥',
    category: 'breakfast',
    calories: 480,

    weight: { breakfast: 9, lunch: 1, dinner: 1, snack: 3 }
  },
  {
    id: 'bagel-delivery',
    name: {
      ko: 'ë² ì´ê¸€ ?Œë“œ?„ì¹˜',
      en: 'Bagel Sandwich',
      zh: '?¾å‰é¥¼ä¸‰?æ²»',
      ja: '?™ãƒ¼?°ãƒ«?µãƒ³?‰ã‚¤?ƒãƒ'
    },
    description: {
      ko: 'ì«„ê¹ƒ??ë² ì´ê¸€???¬ë¦¼ì¹˜ì¦ˆ?€ ?ˆì œ ?°ì–´! ?´ìš•???„ì¹¨.',
      en: 'Chewy bagel with cream cheese and smoked salmon! New York morning.',
      zh: 'ç­‹é“?„ç™¾?‰é??å¥¶æ²¹èŠå£«å’Œ?é²‘é±¼ï¼çº½çº¦å¼æ—©?¨ã€?,
      ja: '?‚ã¡?‚ã¡??ƒ™?¼ã‚°?«ã«??ƒª?¼ãƒ ?ãƒ¼?ºã¨?¹ãƒ¢?¼ã‚¯?µãƒ¼?¢ãƒ³ï¼ãƒ‹?¥ãƒ¼?¨ãƒ¼??¢¨?é£Ÿ??
    },
    emoji: '??',
    category: 'breakfast',
    calories: 450,

    weight: { breakfast: 7, lunch: 5, dinner: 2, snack: 4 }
  },
  {
    id: 'smoothie-bowl-delivery',
    name: {
      ko: '?„ë³´ì¹´ë„ ? ìŠ¤??,
      en: 'Avocado Toast',
      zh: 'é³„æ¢¨?å¸',
      ja: '?¢ãƒœ?«ãƒ‰?ˆãƒ¼?¹ãƒˆ'
    },
    description: {
      ko: 'ë°”ì‚­??? ìŠ¤?¸ì— ? ì„ ???„ë³´ì¹´ë„! ê±´ê°•???¸ìŠ¤?€ê·¸ë¨ ?„ì¹¨.',
      en: 'Crispy toast with fresh avocado! Healthy Instagram breakfast.',
      zh: '?¥è„†?å¸?æ–°é²œé³„æ¢¨ï¼?¥åº·?„Instagram?©é¤??,
      ja: '?µã‚¯?µã‚¯??ƒˆ?¼ã‚¹?ˆã«?°é??¢ãƒœ?«ãƒ‰ï¼å¥åº·çš„?ªã‚¤?³ã‚¹?¿æœé£Ÿã€?
    },
    emoji: '?¥‘',
    category: 'breakfast',
    calories: 380,

    weight: { breakfast: 8, lunch: 4, dinner: 3, snack: 2 }
  },
  {
    id: 'eggs-benedict-delivery',
    name: {
      ko: '?ê·¸ ë² ë„¤?•íŠ¸',
      en: 'Eggs Benedict',
      zh: '??°¼è¿ªå…‹??,
      ja: '?¨ãƒƒ?°ãƒ™?ãƒ‡?£ã‚¯??
    },
    description: {
      ko: '?‰ê?ë¦¬ì‹œ ë¨¸í????€?œë°?´ì¦ˆ ?ŒìŠ¤?€ ?¹ì‹ ??ê³„ë?! ê³ ê¸‰?¤ëŸ¬???„ì¹¨.',
      en: 'English muffin with hollandaise sauce and poached egg! Luxurious breakfast.',
      zh: '?±å¼?¾é??è·?°é…±?Œæ°´??›‹ï¼è±ª?æ—©é¤ã€?,
      ja: '?¤ãƒ³?°ãƒª?ƒã‚·?¥ãƒ?•ã‚£?³ã«?ªãƒ©?³ãƒ‡?¼ã‚º?½ãƒ¼?¹ã¨?ãƒ¼?ãƒ‰?¨ãƒƒ?°ï¼è´…æ²¢?ªæœé£Ÿã€?
    },
    emoji: '?³',
    category: 'breakfast',
    calories: 520,

    weight: { breakfast: 7, lunch: 2, dinner: 3, snack: 1 }
  },
  {
    id: 'french-toast-delivery',
    name: {
      ko: '?„ë Œì¹?? ìŠ¤??,
      en: 'French Toast',
      zh: 'æ³•å¼?å¸',
      ja: '?•ãƒ¬?³ãƒ?ˆãƒ¼?¹ãƒˆ'
    },
    description: {
      ko: '?¬ì½¤?˜ê²Œ êµ¬ìš´ ë¹µì— ë©”ì´???œëŸ½! ?¥ê¸°ë¡œìš´ ?„ì¹¨ ?ì‚¬.',
      en: 'Sweetly baked bread with maple syrup! Fragrant morning meal.',
      zh: '?œç”œ?„çƒ¤?¢åŒ…?æ«ç³–æµ†ï¼é¦™æ°”æ‰‘é¼»çš„?©æ™¨é¤é£Ÿ??,
      ja: '?˜ã?¼ã„?Ÿãƒ‘?³ã«?¡ãƒ¼?—ãƒ«?·ãƒ­?ƒãƒ—ï¼é¦™?Šé«˜?„æœé£Ÿã€?
    },
    emoji: '?',
    category: 'breakfast',
    calories: 420,

    weight: { breakfast: 8, lunch: 1, dinner: 2, snack: 3 }
  },
  {
    id: 'juk-breakfast',
    name: {
      ko: '?„ë³µì£?,
      en: 'Abalone Porridge',
      zh: 'é²é±¼ç²?,
      ja: '?¢ãƒ¯?“ç²¥'
    },
    description: {
      ko: 'ë¶€?œëŸ¬???„ë³µì£½ìœ¼ë¡????¸í•œ ?„ì¹¨???œì‘?˜ì„¸??',
      en: 'Start the morning with gentle abalone porridge for a comfy stomach.',
      zh: '?¨æŸ”è½?š„é²é±¼ç²¥å???ˆ’?çš„?©æ™¨??,
      ja: '?„ã•?—ã„?¢ãƒ¯?“ç²¥?§èƒƒ?«ã‚„?•ã—?„æœ?’å§‹?ã‚ˆ?†ã€?
    },
    emoji: '?¥£',
    category: 'breakfast',
    calories: 320,

    weight: { breakfast: 10, lunch: 2, dinner: 2, snack: 1 }
  },
  {
    id: 'cereal-breakfast',
    name: {
      ko: '?œë¦¬??& ?°ìœ ',
      en: 'Cereal & Milk',
      zh: 'éº?‰‡?›å¥¶',
      ja: '?·ãƒª?¢ãƒ«?¨ãƒŸ?«ã‚¯'
    },
    description: {
      ko: 'ë¹ ë¥´ê³?ê°„í¸???œë¦¬?¼ê³¼ ì°¨ê????°ìœ  ????',
      en: 'Quick and easy cereal with a cold glass of milk.',
      zh: 'å¿«æ·?¹ä¾¿?„éº¦?‡é…ä¸€??†°?›å¥¶??,
      ja: '?‹è»½?ªã‚·?ªã‚¢?«ã¨?·ãŸ?„ãƒŸ?«ã‚¯?????€?
    },
    emoji: '?¥›',
    category: 'breakfast',
    calories: 280,

    weight: { breakfast: 9, lunch: 1, dinner: 1, snack: 2 }
  },

  // ?ì‹¬ ë©”ë‰´ (ë°°ë‹¬ ??ë² ìŠ¤?¸ì???
  {
    id: 'chicken-lunch',
    name: {
      ko: '?„ë¼?´ë“œ ì¹˜í‚¨',
      en: 'Fried Chicken',
      zh: '?¸é¸¡',
      ja: '?•ãƒ©?¤ãƒ‰?ã‚­??
    },
    description: {
      ko: 'ë°”ì‚­ë°”ì‚­???„ë¼?´ë“œ ì¹˜í‚¨! ?œêµ­?¸ì˜ êµ?? ê°„ì‹.',
      en: 'Crispy fried chicken! Korean national snack.',
      zh: '?¥è„†?„ç‚¸é¸¡ï¼?©å›½äººçš„?½æ°‘?¶é£Ÿ??,
      ja: '?µã‚¯?µã‚¯??ƒ•?©ã‚¤?‰ãƒ??ƒ³ï¼éŸ“?½äºº??›½æ°‘çš„?Šã‚„?¤ã€?
    },
    emoji: '?—',
    category: 'lunch',
    calories: 580,

    weight: { breakfast: 1, lunch: 10, dinner: 6, snack: 8 }
  },
  {
    id: 'hamburger-lunch',
    name: {
      ko: 'ë¹…ë§¥ ?¸íŠ¸',
      en: 'Big Mac Combo',
      zh: 'å·¨æ— ?¸å¥—é¤?,
      ja: '?“ãƒƒ?°ãƒ?ƒã‚¯?»ãƒƒ??
    },
    description: {
      ko: '???¥ì˜ ?¨í‹°ê°€ ?¤ì–´ê°?ë¹…ë§¥! ë§¥ë„? ë“œ???€??ë©”ë‰´.',
      en: 'Big Mac with two patties! McDonald\'s signature menu.',
      zh: 'ä¸¤ç‰‡?‰é??„å·¨? éœ¸ï¼éº¦å½“åŠ³?„ä»£è¡¨èœ?•ã€?,
      ja: 'äºŒæš??ƒ‘?†ã‚£?Œå…¥?£ãŸ?“ãƒƒ?°ãƒ?ƒã‚¯ï¼ãƒ??ƒ‰?Šãƒ«?‰ã®ä»£è¡¨?¡ãƒ‹?¥ãƒ¼??
    },
    emoji: '?”',
    category: 'lunch',
    calories: 580,

    weight: { breakfast: 2, lunch: 9, dinner: 3, snack: 7 }
  },
  {
    id: 'pizza-lunch',
    name: {
      ko: '?˜í¼ë¡œë‹ˆ ?¼ì',
      en: 'Pepperoni Pizza',
      zh: '?å¤§?©è¾£é¦™è‚ ?«è¨',
      ja: '?šãƒ‘??ƒ‹?”ã‚¶'
    },
    description: {
      ko: 'ê³ ì†Œ???˜í¼ë¡œë‹ˆ?€ ì¹˜ì¦ˆê°€ ?¬ë¿! ?¼ì???•ë„.',
      en: 'Plenty of savory pepperoni and cheese! King of pizzas.',
      zh: 'ä¸°å¯Œ?„é¦™? å’Œå¥¶é…ªï¼æŠ«?¨ä¹‹?‹ã€?,
      ja: 'é¦™ã°?—ã„?šãƒ‘??ƒ‹?¨ãƒ?¼ã‚º?ŒãŸ?£ã·?Šï¼?”ã‚¶??‹æ§˜ã€?
    },
    emoji: '?•',
    category: 'lunch',
    calories: 650,

    weight: { breakfast: 1, lunch: 8, dinner: 5, snack: 6 }
  },
  {
    id: 'jjamppong-lunch',
    name: {
      ko: 'ì§œì¥ë©?,
      en: 'Jjamppong',
      zh: '?’ç ??,
      ja: '?ãƒ£?¸ãƒ£?³ãƒŸ?§ãƒ³'
    },
    description: {
      ko: '?¬ì½¤ì§?§¤??ì¶˜ì¥ ?ŒìŠ¤???´ë¬¼???ë?! ?œêµ­??ì¤‘í™”?”ë¦¬.',
      en: 'Sweet and salty sauce with plenty of seafood! Korean-Chinese cuisine.',
      zh: '?œå’¸?±æ±?ä¸°å¯Œçš„æµ·é²œï¼éŸ©å¼ä¸­é¤ã€?,
      ja: '?˜ã?¦ã—?‡ã£?±ã„?½ãƒ¼?¹ã«æµ·é??ŒãŸ?£ã·?Šï¼?“å›½é¢¨ä¸­??–™?†ã€?
    },
    emoji: '?œ',
    category: 'lunch',
    calories: 550,

    weight: { breakfast: 1, lunch: 9, dinner: 4, snack: 5 }
  },
  {
    id: 'tteokbokki-lunch',
    name: {
      ko: '?¡ë³¶??,
      en: 'Tteokbokki',
      zh: '?’å¹´ç³?,
      ja: '?ˆãƒƒ??ƒ?ƒã‚­'
    },
    description: {
      ko: '?¬ì½¤ë§¤ì½¤???¡ë³¶?´ì— ?´ë¬µê¹Œì?! ê¸¸ê±°ë¦??€??ë©”ë‰´.',
      en: 'Sweet and spicy rice cakes with fish cakes! Street food classic.',
      zh: '?œè¾£å¹´ç³•?é±¼ç³•ï¼è¡—å¤´ä»£è¡¨?œå•??,
      ja: '?˜è¾›?„ãƒˆ?ƒã‚¯?ãƒƒ??«?ªãƒ‡?³ã¾?§ï¼?¹ãƒˆ?ªãƒ¼?ˆãƒ•?¼ãƒ‰??»£è¡¨ã€?
    },
    emoji: '?¥',
    category: 'lunch',
    calories: 450,

    weight: { breakfast: 1, lunch: 8, dinner: 3, snack: 9 }
  },
  {
    id: 'kimbap-lunch',
    name: {
      ko: 'ì°¸ì¹˜ê¹€ë°?,
      en: 'Tuna Kimbap',
      zh: '?‘æªé±¼ç´«?œåŒ…é¥?,
      ja: '?„ãƒŠ??ƒ³?‘ãƒ—'
    },
    description: {
      ko: '? ì„ ??ì°¸ì¹˜?€ ?¼ì±„ê°€ ?¬ë¿! ?œêµ­???€??ê°„ì‹.',
      en: 'Plenty of fresh tuna and vegetables! Korean representative snack.',
      zh: '?°é²œ?‘æªé±¼å’Œ?¬èœä¸°å¯Œï¼éŸ©?½çš„ä»£è¡¨?¶é£Ÿ??,
      ja: '?°é??„ãƒŠ?¨é‡?œãŒ?Ÿã£?·ã‚Šï¼éŸ“?½ã®ä»£è¡¨?Šã‚„?¤ã€?
    },
    emoji: '?™',
    category: 'lunch',
    calories: 380,

    weight: { breakfast: 3, lunch: 9, dinner: 2, snack: 8 }
  },
  {
    id: 'bibimbap-lunch',
    name: {
      ko: '?Œì†¥ë¹„ë¹”ë°?,
      en: 'Hot Stone Bibimbap',
      zh: '?³é”…?Œé?',
      ja: '?›ãƒƒ?ˆã‚¹?ˆãƒ¼?³ãƒ»?“ãƒ“?³ãƒ??
    },
    description: {
      ko: '?¨ê±°???Œì†¥??ë¹„ë²¼ ë¨¹ëŠ” ?ì–‘ë°? ?œêµ­ ?„í†µ ?Œì‹.',
      en: 'Nutritious rice mixed in hot stone bowl! Korean traditional food.',
      zh: '??Ÿ³?…ä¸­?Œå??„è¥?»é?ï¼éŸ©?½ä¼ ç»Ÿé£Ÿ?©ã€?,
      ja: '?±ã„?³é‹?§ã‹?æ··?œã‚‹?„é¤Š?”é£¯ï¼éŸ“?½ä¼çµ±æ–™?†ã€?
    },
    emoji: '?š',
    category: 'lunch',
    calories: 520,

    weight: { breakfast: 2, lunch: 7, dinner: 8, snack: 1 }
  },
  {
    id: 'bulgogi-lunch',
    name: {
      ko: '?Œë¶ˆê³ ê¸° ??°¥',
      en: 'Bulgogi Rice Bowl',
      zh: '?¤è‚‰?–é?',
      ja: '?—ãƒ«?³ã‚®ä¸?
    },
    description: {
      ko: '?¬ì½¤??ë¶ˆê³ ê¸°ê? ?¬ë¿ ?¬ë¼ê°???°¥! ë°¥ë„??ë©”ë‰´.',
      en: 'Rice bowl topped with sweet bulgogi! Rice thief menu.',
      zh: '?œç¾?„çƒ¤?‰ä¸°å¯Œçš„?–é?ï¼é?å°å·?œå•??,
      ja: '?˜ã„?—ãƒ«?³ã‚®?ŒãŸ?£ã·?Šä¹—?£ãŸä¸¼ï¼é£?³¥æ£’ãƒ¡?‹ãƒ¥?¼ã€?
    },
    emoji: '?š',
    category: 'lunch',
    calories: 580,

    weight: { breakfast: 1, lunch: 9, dinner: 6, snack: 4 }
  },
  {
    id: 'bibimbap-lunch-extended',
    name: {
      ko: '?Œì†¥ ?œìœ¡ ë¹„ë¹”ë°?,
      en: 'Spicy Pork Bibimbap',
      zh: 'è¾£çŒª?‰æ‹Œé¥?,
      ja: 'è¾›ã„è±šè‚‰?“ãƒ“?³ãƒ??
    },
    description: {
      ko: 'ë§¤ì½¤???œìœ¡ë³¶ìŒ???¬ë¼ê°??Œì†¥ ë¹„ë¹”ë°? ? ë“ ???ì‹¬.',
      en: 'Hot stone bibimbap with spicy pork! Hearty lunch.',
      zh: 'è¾£çŒª?‰ç‚’?„çƒ­?³é”…?Œé?ï¼é¥±?¹çš„?ˆé¤??,
      ja: 'è¾›ã„è±šè‚‰?’ã‚??ƒ›?ƒãƒˆ?¹ãƒˆ?¼ãƒ³?»ãƒ“?“ãƒ³?ãƒ—ï¼å¿ƒ?’æ??Ÿã™?©ãƒ³?ã€?
    },
    emoji: '?š',
    category: 'lunch',
    calories: 620,

    weight: { breakfast: 1, lunch: 8, dinner: 5, snack: 3 }
  },
  {
    id: 'hamburger-lunch-extended',
    name: {
      ko: '?€???¸íŠ¸',
      en: 'Whopper Combo',
      zh: '?‡å ¡å¥—é¤',
      ja: '??ƒƒ?‘ãƒ¼?»ãƒƒ??
    },
    description: {
      ko: 'ë²„ê±°?¹ì˜ ?€??ë©”ë‰´ ?€?? ?íˆ¼???¨í‹°ê°€ ?¹ì§•.',
      en: 'Burger King\'s signature Whopper! Thick patty is the key.',
      zh: 'æ±‰å ¡?‹çš„ä»£è¡¨?œå•?‡å ¡ï¼åšå®çš„?‰é???‰¹?²ã€?,
      ja: '?ãƒ¼?¬ãƒ¼??ƒ³?°ã®ä»£è¡¨?¡ãƒ‹?¥ãƒ¼?»ãƒ¯?ƒãƒ‘?¼ï¼?šã„?‘ãƒ†?£ãŒ?¹å¾´??
    },
    emoji: '?”',
    category: 'lunch',
    calories: 650,

    weight: { breakfast: 1, lunch: 8, dinner: 4, snack: 6 }
  },
  {
    id: 'sandwich-lunch',
    name: {
      ko: '?¨ë¸Œ?¨ì´ ?Œë“œ?„ì¹˜',
      en: 'Subway Sandwich',
      zh: 'èµ›ç™¾?³ä¸‰?æ²»',
      ja: '?µãƒ–?¦ã‚§?¤ã‚µ?³ãƒ‰?¤ãƒƒ??
    },
    description: {
      ko: '? ì„ ???¼ì±„?€ ë¹µìœ¼ë¡?ë§Œë“  ê±´ê°•???Œë“œ?„ì¹˜! ?ì‹¬?¼ë¡œ ìµœê³ .',
      en: 'Healthy sandwich made with fresh vegetables and bread! Perfect for lunch.',
      zh: '?°é²œ?¬èœ?Œé¢?…åˆ¶ä½œçš„?¥åº·ä¸‰æ˜æ²»ï¼?ˆé¤?€ä½³é€‰æ‹©??,
      ja: '?°é??èœ?¨ãƒ‘?³ã§ä½œã‚‹?¥åº·?µãƒ³?‰ã‚¤?ƒãƒï¼ãƒ©?³ãƒ?«æ?é«˜ã€?
    },
    emoji: '?¥ª',
    category: 'lunch',
    calories: 380,

    weight: { breakfast: 3, lunch: 9, dinner: 4, snack: 5 }
  },
  {
    id: 'dakgangjeong-lunch',
    name: { ko: '??°•??, en: 'Sweet Crispy Chicken', zh: 'ç³–é…¥é¸?, ja: '?¿ãƒƒ?«ãƒ³?¸ãƒ§?? },
    description: {
      ko: '?¬ì½¤ë°”ì‚­ ??°•?? ì§ì¥???ì‹¬ ê°„ì‹ ë² ìŠ¤??',
      en: 'Sweet crispy chicken bites, a lunch favorite.',
      zh: '?œè„†?„ç³–?¥é¸¡ï¼Œåˆé¤äººæ°”å°?ƒã€?,
      ja: '?˜ã?¦ã‚«?ªã‚«?ªã®?¿ãƒƒ?«ãƒ³?¸ãƒ§?³ã€ãƒ©?³ãƒ??®š?ªãŠ?„ã¤??
    },
    emoji: '?—',
    category: 'lunch',
    calories: 620,

    weight: { lunch: 9 }
  },
  {
    id: 'mandu-lunch',
    name: { ko: 'ë§Œë‘?¸íŠ¸', en: 'Dumpling Set', zh: 'é¥ºå­å¥—é¤', ja: 'é¤ƒå­?»ãƒƒ?? },
    description: {
      ko: 'êµ°ë§Œ??ë¬¼ë§Œ?????¸íŠ¸! ê°€?±ë¹„ ?ì‹¬.',
      en: 'Fried and steamed dumpling combo, great value lunch.',
      zh: '?é?+æ°´é?ç»„åˆï¼Œæ€§ä»·æ¯”åˆé¤ã€?,
      ja: '?¼ãé¤ƒå­?¨æ°´é¤ƒå­??‚»?ƒãƒˆ?ãŠå¾—ãª?©ãƒ³?ã€?
    },
    emoji: '?¥Ÿ',
    category: 'lunch',
    calories: 520,

    weight: { lunch: 8 }
  },
  {
    id: 'soba-lunch',
    name: { ko: 'ë©”ë??Œë°”', en: 'Cold Soba', zh: '?éº¦?·é¢', ja: '?–ã‚‹?ã°' },
    description: {
      ko: '?œì›??ë©”ë??Œë°”?€ ?€ê¹€ ?¸íŠ¸, ?”ìœ„???œê²©.',
      en: 'Cold soba with tempura set, perfect for hot days.',
      zh: 'æ¸…çˆ½?éº¦??…å¤©å¦‡ç½—ï¼Œå¤æ—¥é¦–é€‰ã€?,
      ja: '?·ãŸ?„è•éº¦ã¨å¤©ã·?‰ã®?»ãƒƒ?ˆã€æš‘?„æ—¥?«ã´?£ãŸ?Šã€?
    },
    emoji: '?¥¢',
    category: 'lunch',
    calories: 480,

    weight: { lunch: 7 }
  },
  {
    id: 'pho-lunch',
    name: { ko: '?€êµ?ˆ˜', en: 'Beef Pho', zh: 'è¶Šå—ç²?, ja: '?•ã‚©?? },
    description: {
      ko: 'ì§„í•œ ?¡ìˆ˜??ë² íŠ¸???€êµ?ˆ˜, ?´ë°±???ì‹¬.',
      en: 'Vietnamese beef pho with rich broth.',
      zh: 'æµ“éƒæ±¤åº•?„è¶Š?—ç‰›?‰ç²‰ï¼Œæ¸…æ·¡åˆé¤ã€?,
      ja: '?³ã‚¯??‚?‹ã‚¹?¼ãƒ—??ƒ™?ˆãƒŠ? ãƒ•?©ãƒ¼?ã‚?£ã•?Šãƒ©?³ãƒ??
    },
    emoji: '?œ',
    category: 'lunch',
    calories: 450,

    weight: { lunch: 8 }
  },
  {
    id: 'pad-thai-lunch',
    name: { ko: '?Ÿí???, en: 'Pad Thai', zh: 'æ³°å¼?’æ²³ç²?, ja: '?‘ãƒƒ?¿ã‚¤' },
    description: {
      ko: '?…ì½©ê³??ˆìš°ê°€ ?¤ì–´ê°??œêµ­??ë³¶ìŒë©?',
      en: 'Thai stir-fried noodles with shrimp and peanuts.',
      zh: '?«èŠ±?Ÿå’Œ?¾çš„æ³°å¼?’æ²³ç²‰ã€?,
      ja: '?¨ãƒ“?¨ãƒ”?¼ãƒŠ?ƒãƒ„?¥ã‚Š??‚¿?¤é¢¨?¼ã?ã°??
    },
    emoji: '?¤',
    category: 'lunch',
    calories: 620,

    weight: { lunch: 7 }
  },
  {
    id: 'burrito-lunch',
    name: { ko: 'ì¹˜í‚¨ ë¶€ë¦¬ë˜', en: 'Chicken Burrito', zh: 'é¸¡è‚‰?·é?', ja: '?ã‚­?³ãƒ–?ªãƒˆ?? },
    description: {
      ko: '?¼ì´?¤ì? ì¹˜í‚¨??ê½?ì°?ë©•ì‹œì¹?ë¶€ë¦¬ë˜.',
      en: 'Mexican burrito stuffed with rice and chicken.',
      zh: 'è£…æ»¡ç±³é??Œé¸¡?‰çš„å¢¨è??¥å·é¥¼ã€?,
      ja: '?©ã‚¤?¹ã¨?ã‚­?³ãŸ?£ã·?Šã®?¡ã‚­?·ã‚«?³ãƒ–?ªãƒˆ?¼ã€?
    },
    emoji: '?Œ¯',
    category: 'lunch',
    calories: 680,

    weight: { lunch: 7 }
  },
  {
    id: 'poke-lunch',
    name: { ko: '?¬ì? ë³?, en: 'Poke Bowl', zh: 'å¤å¨å¤·ç›–é¥?, ja: '?ã‚±?œã‚¦?? },
    description: {
      ko: '?°ì–´?€ ?„ë³´ì¹´ë„ê°€ ?¤ì–´ê°??˜ì????¬ì? ë³?',
      en: 'Hawaiian poke bowl with salmon and avocado.',
      zh: '?«ä¸‰?‡é±¼?Œç‰›æ²¹æœ?„å¤å¨å¤·?–é???,
      ja: '?µãƒ¼?¢ãƒ³?¨ã‚¢?œã‚«?‰ã®?ãƒ¯?¤ã‚¢?³ãƒ?±ãƒœ?¦ãƒ«??
    },
    emoji: '?¥—',
    category: 'lunch',
    calories: 520,

    weight: { lunch: 6 }
  },
  {
    id: 'taco-lunch',
    name: { ko: 'ë¹„í”„ ?€ì½??¸íŠ¸', en: 'Beef Taco Set', zh: '?›è‚‰å¡”å¯å¥—é¤', ja: '?“ãƒ¼?•ã‚¿?³ã‚¹?»ãƒƒ?? },
    description: {
      ko: 'ë¹„í”„ ?€ì½?3?¼ìŠ¤?€ ?´ì‚¬, ?¼ì„???¨ê»˜.',
      en: 'Three beef tacos served with salsa and lime.',
      zh: 'ä¸‰ä»½?›è‚‰å¡”å¯?è?é…±?Œé’? ã€?,
      ja: '?µãƒ«?µã¨?©ã‚¤? ä»˜?ãƒ“?¼ãƒ•?¿ã‚³???”ãƒ¼?¹ã€?
    },
    emoji: '?Œ®',
    category: 'lunch',
    calories: 560,

    weight: { lunch: 6 }
  },
  {
    id: 'gyoza-lunch',
    name: { ko: 'êµì ?¼ë©˜ ?¸íŠ¸', en: 'Ramen & Gyoza Set', zh: '?‰é¢é¥ºå­å¥—é¤', ja: '?©ãƒ¼?¡ãƒ³é¤ƒå­?»ãƒƒ?? },
    description: {
      ko: 'ê°„ì¥ ?¼ë©˜ê³?êµì ë§Œë‘ê°€ ?¨ê»˜ ?˜ì˜¤??? ë“ ???¸íŠ¸.',
      en: 'Soy ramen served with gyoza dumplings.',
      zh: '?±æ²¹?‰é¢?é?å­ï¼Œä»½é‡?è¶³??,
      ja: '?¤æ²¹?©ãƒ¼?¡ãƒ³?¨é¤ƒå­ãŒ?¤ã„?Ÿãƒœ?ªãƒ¥?¼ãƒ ?»ãƒƒ?ˆã€?
    },
    emoji: '?¥Ÿ',
    category: 'lunch',
    calories: 720,

    weight: { lunch: 8 }
  },
  {
    id: 'omurice-lunch',
    name: { ko: '?¤ë??¼ì´??, en: 'Omurice', zh: '?‹åŒ…é¥?, ja: '?ªãƒ ?©ã‚¤?? },
    description: {
      ko: 'ë¶€?œëŸ¬???¬ê?ê³?ì¼€ì²??¼ì´?? ì¶”ì–µ??ë§?',
      en: 'Fluffy omelet over ketchup rice, a nostalgic classic.',
      zh: '?¾è½¯?‹åŒ…è£¹ç•ª?„ç‚’é¥?¼Œ?…æ»¡?å¿†?„å‘³?“ã€?,
      ja: '?µã‚?¨ã‚?µã¨?±ãƒ?£ãƒƒ?—ãƒ©?¤ã‚¹?æ‡?‹ã—??‘³??
    },
    emoji: '?³',
    category: 'lunch',
    calories: 640,

    weight: { lunch: 7 }
  },
  {
    id: 'salmon-steak-lunch',
    name: { ko: '?°ì–´ ?¤í…Œ?´í¬ ??°¥', en: 'Salmon Steak Rice Bowl', zh: 'ä¸‰æ–‡é±¼æ’?–é?', ja: '?µãƒ¼?¢ãƒ³?¹ãƒ†?¼ã‚­ä¸? },
    description: {
      ko: 'êµ¬ìš´ ?°ì–´ ?¤í…Œ?´í¬ê°€ ?¬ë¼ê°?? ë“ ????°¥.',
      en: 'Hearty rice bowl topped with grilled salmon steak.',
      zh: '?–ç??¤ä¸‰?‡é±¼?’çš„é¥±è…¹?–é???,
      ja: '?¼ã?µãƒ¼?¢ãƒ³?¹ãƒ†?¼ã‚­?’ã®?›ãŸ?œãƒª?¥ãƒ¼? ä¸¼??
    },
    emoji: '?Ÿ',
    category: 'lunch',
    calories: 650,

    weight: { lunch: 7 }
  },

  // ?€??ë©”ë‰´ (ë°°ë‹¬ ?±ì—???¸ê¸° ?ˆëŠ” ?€??ë©”ë‰´)
  {
    id: 'salad-dinner',
    name: {
      ko: '?œì? ?ëŸ¬??,
      en: 'Caesar Salad',
      zh: '??’’æ²™æ‹‰',
      ja: '?·ãƒ¼?¶ãƒ¼?µãƒ©?€'
    },
    description: {
      ko: '? ì„ ??ë¡œë©”???ì¶”???¬ë£¨?µê³¼ ?Œë§ˆ??ì¹˜ì¦ˆ! ê°€ë²¼ìš´ ?€???ì‚¬.',
      en: 'Fresh romaine lettuce with croutons and parmesan cheese! Light dinner.',
      zh: '?°é²œç½—é©¬?Ÿèœ?é¢?…ä¸?Œå¸•?›æ£®?å£«ï¼è½»ä¾¿çš„?šé¤??,
      ja: '?°é???ƒ¡?¤ãƒ³?¬ã‚¿?¹ã«??ƒ«?¼ãƒˆ?³ã¨?‘ãƒ«?¡ã‚¶?³ãƒ?¼ã‚ºï¼è»½?„å¤•é£Ÿã€?
    },
    emoji: '?¥—',
    category: 'dinner',
    calories: 280,

    weight: { breakfast: 4, lunch: 6, dinner: 9, snack: 3 }
  },
  {
    id: 'pasta-dinner',
    name: {
      ko: 'ê¹Œë¥´ë³´ë‚˜???ŒìŠ¤?€',
      en: 'Carbonara Pasta',
      zh: '?¹æ ¹å¥¶æ²¹?å¤§?©é¢',
      ja: '?«ãƒ«?œãƒŠ?¼ãƒ©?‘ã‚¹??
    },
    description: {
      ko: '?¬ë¦¬ë¯¸í•œ ?¬ë¦¼ ?ŒìŠ¤??ë² ì´ì»¨ê³¼ ?ŒìŠ¬ë¦? ?´íƒˆë¦¬ì•„ ?€???ŒìŠ¤?€.',
      en: 'Creamy sauce with bacon and parsley! Italian representative pasta.',
      zh: 'å¥¶æ²¹?±é…?¹æ ¹?Œé¦™?œï¼?å¤§?©ä»£è¡¨æ„?¢ã€?,
      ja: '??ƒª?¼ãƒŸ?¼ã‚½?¼ã‚¹?«ãƒ™?¼ã‚³?³ã¨?‘ã‚»?ªï¼?¤ã‚¿?ªã‚¢ä»£è¡¨?‘ã‚¹?¿ã€?
    },
    emoji: '?',
    category: 'dinner',
    calories: 580,

    weight: { breakfast: 1, lunch: 5, dinner: 9, snack: 4 }
  },
  {
    id: 'steak-dinner',
    name: {
      ko: 'ë¦½ì•„???¤í…Œ?´í¬',
      en: 'Ribeye Steak',
      zh: '?‹çœ¼?›æ’',
      ja: '?ªãƒ–?¢ã‚¤?¹ãƒ†?¼ã‚­'
    },
    description: {
      ko: 'ìµœê³ ê¸?ë§ˆë¸”ë§ì˜ ë¦½ì•„???¤í…Œ?´í¬! ?¡ì¦™???ë????¹ë³„ ?€??',
      en: 'Premium marbled ribeye steak! Juicy special dinner.',
      zh: 'é¡¶çº§å¤§ç†?³çº¹?†çš„?‹çœ¼?›æ’ï¼å¤šæ±çš„?¹åˆ«?šé¤??,
      ja: '?€é«˜ç´š?ãƒ¼?–ãƒª?³ã‚°??ƒª?–ã‚¢?¤ã‚¹?†ãƒ¼??¼?¸ãƒ¥?¼ã‚·?¼ãª?¹åˆ¥å¤•é£Ÿ??
    },
    emoji: '?¥©',
    category: 'dinner',
    calories: 650,

    weight: { breakfast: 1, lunch: 3, dinner: 8, snack: 2 }
  },
  {
    id: 'sushi-dinner',
    name: {
      ko: '?°ì–´ ì´ˆë°¥ ?¸íŠ¸',
      en: 'Salmon Sushi Set',
      zh: 'ä¸‰æ–‡é±¼å??¸å¥—é¤?,
      ja: '?µãƒ¼?¢ãƒ³å¯¿å¸?»ãƒƒ??
    },
    description: {
      ko: '? ì„ ???°ì–´ ì´ˆë°¥ê³??¤ì–‘??ë¡? ê±´ê°•???€???ì‚¬.',
      en: 'Fresh salmon sushi and various rolls! Healthy dinner.',
      zh: '?°é²œä¸‰æ–‡é±¼å??¸å’Œ?„ç§?‹å·ï¼å¥åº·çš„?šé¤??,
      ja: '?°é??µãƒ¼?¢ãƒ³å¯¿å¸?¨æ§˜?…ãª??ƒ¼?«ï¼?¥åº·?„ãªå¤•é£Ÿ??
    },
    emoji: '?£',
    category: 'dinner',
    calories: 420,

    weight: { breakfast: 1, lunch: 4, dinner: 9, snack: 3 }
  },
  {
    id: 'curry-dinner',
    name: {
      ko: 'ì¹˜í‚¨ ì¹´ë ˆ',
      en: 'Chicken Curry',
      zh: 'é¸¡è‚‰?–å–±',
      ja: '?ã‚­?³ã‚«?¬ãƒ¼'
    },
    description: {
      ko: 'ë¶€?œëŸ¬??ì¹˜í‚¨ê³??¥ê¸‹??ì¹´ë ˆ! ?œêµ­???¨ë§› ?˜ëŠ” ì¹´ë ˆ.',
      en: 'Tender chicken and fragrant curry! Korean style mildly sweet curry.',
      zh: 'å«©é¸¡?‰å’Œé¦™æµ“?–å–±ï¼éŸ©?½å¼å¾?”œ?„å’–?±ã€?,
      ja: '?”ã‚‰?‹ã„?ã‚­?³ã¨é¦™ã°?—ã„?«ãƒ¬?¼ï¼?“å›½é¢¨ç”˜?ã®è¾›å£?«ãƒ¬?¼ã€?
    },
    emoji: '?›',
    category: 'dinner',
    calories: 520,

    weight: { breakfast: 2, lunch: 7, dinner: 8, snack: 5 }
  },
  {
    id: 'grilled-salmon-dinner',
    name: {
      ko: 'êµ¬ìš´ ?°ì–´ ?¤í…Œ?´í¬',
      en: 'Grilled Salmon Steak',
      zh: '?¤ä¸‰?‡é±¼??,
      ja: '?°ãƒª?«ã‚µ?¼ãƒ¢?³ã‚¹?†ãƒ¼??
    },
    description: {
      ko: '?¤ë©”ê°€3ê°€ ?ë???êµ¬ìš´ ?°ì–´! ê±´ê°•???€??ë©”ë‰´.',
      en: 'Grilled salmon rich in omega-3! Healthy dinner menu.',
      zh: 'å¯Œå«Omega-3?„çƒ¤ä¸‰æ–‡é±¼ï¼?¥åº·?„æ™šé¤èœ?•ã€?,
      ja: '?ªãƒ¡???Œè±Šå¯Œãª?°ãƒª?«ã‚µ?¼ãƒ¢?³ï¼?¥åº·?„ãªå¤•é£Ÿ?¡ãƒ‹?¥ãƒ¼??
    },
    emoji: '?Ÿ',
    category: 'dinner',
    calories: 380,

    weight: { breakfast: 1, lunch: 3, dinner: 9, snack: 2 }
  },
  {
    id: 'mushroom-risotto-dinner',
    name: {
      ko: 'ë²„ì„¯ ë¦¬ì¡°??,
      en: 'Mushroom Risotto',
      zh: '?‘è‡?©é?',
      ja: '?ãƒƒ?·ãƒ¥?«ãƒ¼? ãƒª?¾ãƒƒ??
    },
    description: {
      ko: '?¬ë¦¬ë¯¸í•œ ë¦¬ì¡°?ì— ?¥ê¸‹??ë²„ì„¯! ?´íƒˆë¦¬ì•„ ?€???€??ë©”ë‰´.',
      en: 'Creamy risotto with aromatic mushrooms! Italian dinner classic.',
      zh: 'å¥¶æ²¹?©é??é¦™æµ“è˜‘?‡ï¼?å¤§?©æ™šé¤ç»?¸ã€?,
      ja: '??ƒª?¼ãƒŸ?¼ãƒª?¾ãƒƒ?ˆã«é¦™ã°?—ã„?ã®?“ï¼?¤ã‚¿?ªã‚¢?³å¤•é£Ÿã®å®šç•ª??
    },
    emoji: '?„',
    category: 'dinner',
    calories: 480,

    weight: { breakfast: 1, lunch: 2, dinner: 8, snack: 2 }
  },
  {
    id: 'paella-dinner',
    name: {
      ko: '?´ì‚°ë¬?ë¹ ì—??,
      en: 'Seafood Paella',
      zh: 'æµ·é²œè¥¿ç­?™æµ·é²œé?',
      ja: '?·ãƒ¼?•ãƒ¼?‰ãƒ‘?¨ãƒª??
    },
    description: {
      ko: '? ì„ ???´ì‚°ë¬¼ì´ ê°€?í•œ ?¤í˜??ë¹ ì—?? ?ë? ê°€?í•œ ?€??',
      en: 'Spanish paella full of fresh seafood! Flavorful dinner.',
      zh: '?°é²œæµ·é²œä¸°å¯Œ?„è???‰™æµ·é²œé¥?¼é£å‘³?è¶³?„æ™šé¤ã€?,
      ja: '?°é?æµ·é??ŒãŸ?£ã·?Šã®?¹ãƒš?¤ãƒ³é¢¨ãƒ‘?¨ãƒª??¼é¢¨å‘³è±Šã‹?ªå¤•é£Ÿã€?
    },
    emoji: '?¥˜',
    category: 'dinner',
    calories: 550,

    weight: { breakfast: 1, lunch: 3, dinner: 8, snack: 2 }
  },
  {
    id: 'quinoa-bowl-dinner',
    name: {
      ko: '?´ë…¸???ëŸ¬??ë³?,
      en: 'Quinoa Salad Bowl',
      zh: '?œéº¦æ²™æ‹‰ç¢?,
      ja: '??ƒŒ?¢ã‚µ?©ã??œã‚¦??
    },
    description: {
      ko: '?ˆí¼?¸ë“œ ?´ë…¸?„ì— ?¤ì–‘??ì±„ì†Œ?€ ?¨ë°±ì§? ê±´ê°• ?€??',
      en: 'Superfood quinoa with various vegetables and protein! Healthy dinner.',
      zh: 'è¶…çº§é£Ÿå“?œéº¦?å„ç§è”¬?œå’Œ?‹ç™½è´¨ï¼?¥åº·?šé¤??,
      ja: '?¹ãƒ¼?‘ãƒ¼?•ãƒ¼?‰ã??«æ§˜ã€…ãª?èœ?¨ã‚¿?³ãƒ‘??³ªï¼å¥åº·å¤•é£Ÿã€?
    },
    emoji: '?¥—',
    category: 'dinner',
    calories: 420,

    weight: { breakfast: 3, lunch: 5, dinner: 9, snack: 2 }
  },
  {
    id: 'jokbal-dinner',
    name: { ko: 'ì¡±ë°œ ë³´ìŒˆ ?¸íŠ¸', en: 'Jokbal & Bossam Set', zh: '?ªè„š?¤è‚‰?¼ç›˜', ja: '?ãƒ§?ƒãƒ‘?«ã¨?ãƒƒ?µãƒ ?»ãƒƒ?? },
    description: {
      ko: 'ì¡±ë°œê³?ë³´ìŒˆ???¨ê»˜ ?˜ì˜¤???¸ì§???¸íŠ¸.',
      en: 'Hearty set with braised pig?™s feet and bossam.',
      zh: '?ªè¹„ä¸çƒ¤?‰ä?èµ·çš„ä¸°ç››?¼ç›˜??,
      ja: '?ãƒ§?ƒãƒ‘?«ã¨?ãƒƒ?µãƒ ?Œä?ç·’ã®?œãƒª?¥ãƒ¼? ã‚»?ƒãƒˆ??
    },
    emoji: '?–',
    category: 'dinner',
    calories: 880,

    weight: { dinner: 9 }
  },
  {
    id: 'galbitang-dinner',
    name: { ko: 'ê°ˆë¹„??, en: 'Short Rib Soup', zh: '?›è‚‹æ±?, ja: '?«ãƒ«?“ã‚¿?? },
    description: {
      ko: 'ë§‘ê³  ê¹Šì? êµ?¬¼???Œê°ˆë¹„íƒ•, ? ë“ ???€??????',
      en: 'Clear rich beef short rib soup for a filling dinner.',
      zh: 'æ¸…æ¾ˆæµ“éƒ?„ç‰›?‹æ±¤ï¼Œé¥±?¹æ™šé¤ã€?,
      ja: 'æ¾„ã‚“? ã‚³??®?‚ã‚‹?«ãƒ«?“ã‚¿?³ã€æ?è¶³ã®å¤•é£Ÿ??
    },
    emoji: '?¥£',
    category: 'dinner',
    calories: 620,

    weight: { dinner: 8 }
  },
  {
    id: 'haemuljjim-dinner',
    name: { ko: '?„êµ¬/?´ë¬¼ì°?, en: 'Spicy Steamed Seafood', zh: 'è¾£è’¸æµ·é²œ', ja: 'æµ·é??ãƒ ' },
    description: {
      ko: '?¼í°???´ë¬¼ì°? ?´ì‚°ë¬??¬ë¿ ë§¤ìš´ë§?????',
      en: 'Spicy steamed seafood packed with shellfish and fish.',
      zh: 'æ»¡æ»¡æµ·é²œ?„è¾£?¸æ–™?†ã€?,
      ja: 'é­šä»‹?Ÿã£?·ã‚Š??ƒ”?ªè¾›æµ·é??ãƒ ??
    },
    emoji: '?¦',
    category: 'dinner',
    calories: 710,

    weight: { dinner: 8 }
  },
  {
    id: 'jjimdak-dinner',
    name: { ko: '?ˆë™ì°œë‹­', en: 'Braised Soy Chicken', zh: 'å®‰ä¸œ?–é¸¡', ja: '?¢ãƒ³?‰ãƒ³?ãƒ ?€?? },
    description: {
      ko: '?¬ì§ì§€ê·¼í•œ ê°„ì¥ ë² ì´??ì°œë‹­, ?¹ë©´ ?¬ë¿.',
      en: 'Sweet soy-braised chicken with lots of glass noodles.',
      zh: '?œå£?±æ²¹?–é¸¡ï¼Œç²‰?¡æ»¡æ»¡ã€?,
      ja: '?˜ã‚??†¤æ²¹ãƒ™?¼ã‚¹??ƒ? ã???€æ˜¥?¨ãŸ?£ã·?Šã€?
    },
    emoji: '?—',
    category: 'dinner',
    calories: 820,

    weight: { dinner: 8 }
  },
  {
    id: 'kimchi-bossam-dinner',
    name: { ko: 'ê¹€ì¹˜ì°œ & ë³´ìŒˆ', en: 'Braised Kimchi & Bossam', zh: '?–æ³¡?œé…?¤è‚‰', ja: '??ƒ ?ãƒ? ã¨?ãƒƒ?µãƒ ' },
    description: {
      ko: '???µì? ê¹€ì¹˜ì°œê³??˜ìœ¡???¨ê»˜ ì¦ê¸°??ì½¤ë³´.',
      en: 'Combo of braised kimchi and tender boiled pork slices.',
      zh: '?–ç†Ÿ?„æ³¡?œé…ä¸Šæ°´??Œª?‰çš„ç»„åˆ??,
      ja: '?Ÿæˆ??ƒ ?ãƒ? ã¨?¹ã§è±šã‚’ä¸€ç·’ã«?³ã‚?†ã‚³?³ãƒœ??
    },
    emoji: '??',
    category: 'dinner',
    calories: 760,

    weight: { dinner: 7 }
  },
  {
    id: 'gnocchi-dinner',
    name: { ko: '?¬ë¦¼ ?¨ë¼', en: 'Creamy Gnocchi', zh: 'å¥¶æ²¹?Ÿè±†?¢å­', ja: '??ƒª?¼ãƒ ?‹ãƒ§?ƒã‚­' },
    description: {
      ko: 'ë¶€?œëŸ¬??ê°ì ?¨ë¼???¬ë¦¼?ŒìŠ¤, ?œì–‘???€??',
      en: 'Soft potato gnocchi in a rich cream sauce.',
      zh: '?”è½¯?Ÿè±†?¢å­?æµ“?å¥¶æ²¹é…±??,
      ja: '?„ã‚?‰ã‹?„ãƒ?†ãƒˆ?‹ãƒ§?ƒã‚­?«ã‚¯?ªãƒ¼? ã‚½?¼ã‚¹??
    },
    emoji: '?¥”',
    category: 'dinner',
    calories: 700,

    weight: { dinner: 6 }
  },
  {
    id: 'paella-black-dinner',
    name: { ko: 'ë¨¹ë¬¼ ë¹ ì—??, en: 'Squid Ink Paella', zh: 'å¢¨é±¼æ±æµ·é²œé?', ja: '?¤ã‚«?¹ãƒŸ?‘ã‚¨?ªã‚¢' },
    description: {
      ko: 'ë¨¹ë¬¼ë¡??ë?ë¥??”í•œ ?¤í˜?¸ì‹ ?´ì‚°ë¬?ë¹ ì—??',
      en: 'Spanish seafood paella enhanced with squid ink.',
      zh: '? å…¥å¢¨é±¼æ±å¢é¦™çš„è¥¿ç­?™æµ·é²œé???,
      ja: '?¤ã‚«?¹ãƒŸ?§é¢¨?³ã‚’å¢—ã—?Ÿã‚¹?šã‚¤?³æµ·é®?ƒ‘?¨ãƒª?¢ã€?
    },
    emoji: '?¦‘',
    category: 'dinner',
    calories: 740,

    weight: { dinner: 6 }
  },
  {
    id: 'tomahawk-dinner',
    name: { ko: '? ë§ˆ?¸í¬ ?¤í…Œ?´í¬', en: 'Tomahawk Steak', zh: '?˜æ–§?›æ’', ja: '?ˆãƒ?›ãƒ¼??‚¹?†ãƒ¼?? },
    description: {
      ko: '?íˆ¼??? ë§ˆ?¸í¬ ?¤í…Œ?´í¬ë¡???…”ë¦¬í•œ ?€??',
      en: 'Thick-cut tomahawk steak for a luxurious dinner.',
      zh: '?šåˆ‡?˜æ–§?›æ’ï¼Œå¥¢?çš„?šé¤??,
      ja: '?†åš?„ãƒˆ?ãƒ›?¼ã‚¯?¹ãƒ†?¼ã‚­?§è´…æ²¢ãƒ‡?£ãƒŠ?¼ã€?
    },
    emoji: '?¥©',
    category: 'dinner',
    calories: 980,

    weight: { dinner: 5 }
  },
  {
    id: 'mala-xiangguo-dinner',
    name: { ko: 'ë§ˆë¼?¹ê¶ˆ', en: 'Mala Xiang Guo', zh: 'éº»è¾£é¦™é”…', ja: '?ãƒ¼?©ãƒ¼?·ãƒ£?³ã‚´?? },
    description: {
      ko: 'ì¤‘ì‹ ë§¤ìš´ ë³¶ìŒ ?„ë¹„, ?í•˜???¬ë£Œë¡?ì»¤ìŠ¤?€.',
      en: 'Spicy Chinese stir-fry pot with customizable ingredients.',
      zh: '??‡ª?‰é£Ÿ?çš„éº»è¾£å¹²é”…??,
      ja: '?·æ?«ã‚¹?¿ãƒ ??ƒ½?ªä¸­??‚¹?‘ã‚¤?·ãƒ¼?’ã‚?‹ã€?
    },
    emoji: '?Œ¶ï¸?,
    category: 'dinner',
    calories: 820,

    weight: { dinner: 8 }
  },
  {
    id: 'gimbap-platters-dinner',
    name: { ko: 'ëª¨ë‘  ê¹€ë°??Œë˜??, en: 'Assorted Gimbap Platter', zh: 'ä»€??´«?œåŒ…é¥?‹¼??, ja: '?›ã‚Š?ˆã‚?›ã‚­?³ãƒ‘?? },
    description: {
      ko: '?¼ì±„/ì°¸ì¹˜/ì¹˜ì¦ˆ ê¹€ë°¥ì„ ??ë²ˆì— ì¦ê¸°???Œë˜??',
      en: 'Platter with veggie, tuna, and cheese gimbap rolls.',
      zh: '?¬èœ/?‘æªé±??å£«ç´«èœ?…é??¼ç›˜??,
      ja: '?èœ?»ãƒ„?Šãƒ»?ãƒ¼?ºã®??ƒ³?‘ãƒ—?›ã‚Š?ˆã‚?›ã€?
    },
    emoji: '?™',
    category: 'dinner',
    calories: 680,

    weight: { dinner: 6 }
  },
  {
    id: 'pork-cutlet-dinner',
    name: { ko: '?˜ì œ ?ˆì¹´ì¸?, en: 'Handmade Pork Cutlet', zh: '?‹å·¥?ªæ’', ja: '?‹ä»•è¾¼ã¿?¨ã‚“?‹ã¤' },
    description: {
      ko: '?íˆ¼???±ì‹¬ ?ˆì¹´ì¸ ì? ìºë¹„ì§€ ?ëŸ¬?? ë°??¸íŠ¸.',
      en: 'Thick loin cutlet with cabbage salad and rice.',
      zh: '?šå®?Œè„Š?ªæ’?å·å¿ƒèœæ²™æ‹‰ä¸ç±³é¥?€?,
      ja: '?†åš?„ãƒ­?¼ã‚¹?«ãƒ„?«ã‚­?£ãƒ™?„ã‚µ?©ã??ã”é£?‚»?ƒãƒˆ??
    },
    emoji: '?¥¢',
    category: 'dinner',
    calories: 750,

    weight: { dinner: 7 }
  },

  // ?¼ì‹ ë©”ë‰´ (ë°°ë‹¬ ???¼ì‹ ë² ìŠ¤?¸ì???
  {
    id: 'fried-chicken',
    name: {
      ko: '?‘ë… ì¹˜í‚¨',
      en: 'Seasoned Fried Chicken',
      zh: '?±æ–™?¸é¸¡',
      ja: '?¤ãƒ³?‹ãƒ§? ãƒ??ƒ³'
    },
    description: {
      ko: '?¬ì½¤ë§¤ì½¤???‘ë…???¬ë¿ ë°?ì¹˜í‚¨! ?¼ì‹???ˆë? ê°•ì.',
      en: 'Chicken coated in sweet and spicy sauce! Absolute late-night champion.',
      zh: '?œè¾£?±æ–™ä¸°å¯Œ?„é¸¡?‰ï¼å®µå¤œ?„ç»å¯¹å¼º?…ã€?,
      ja: '?˜è¾›?„ã‚¿?¬ãŒ?Ÿã£?·ã‚Šçµ¡ã‚“? ãƒ??ƒ³ï¼å¤œé£Ÿã®çµ¶å??‹è€…ã€?
    },
    emoji: '?—',
    category: 'snack',
    calories: 620,

    weight: { breakfast: 1, lunch: 5, dinner: 7, snack: 10 }
  },
  {
    id: 'buldak-chicken',
    name: {
      ko: 'ë¶ˆë‹­ ì¹˜í‚¨',
      en: 'Fire Chicken',
      zh: '?«é¸¡',
      ja: '?—ãƒ«?€??ƒ??ƒ³'
    },
    description: {
      ko: 'ë¶ˆì²˜??ë§¤ìš´ ì¹˜í‚¨! ë§¤ìš´ ?Œì‹ ì¢‹ì•„?˜ëŠ” ?¬ëŒ?¤ì˜ ?¼ì‹ ?„ìˆ˜??',
      en: 'Chicken as spicy as fire! Essential late-night food for spice lovers.',
      zh: '?ç«ä¸€?·è¾£?„é¸¡?‰ï¼?œæ¬¢è¾£é£Ÿ?„äºº?„å?å¤œå¿…?€?ã€?,
      ja: '?«ã®?ˆã†?«è¾›?„ãƒ??ƒ³ï¼è¾›?„é£Ÿ?¹ç‰©å¥½ã??¤œé£Ÿå¿…?€?ã€?
    },
    emoji: '?Œ¶ï¸?,
    category: 'snack',
    calories: 650,

    weight: { breakfast: 1, lunch: 4, dinner: 6, snack: 9 }
  },
  {
    id: 'pizza-pepperoni',
    name: {
      ko: '?¼ì‹ ?˜í¼ë¡œë‹ˆ ?¼ì',
      en: 'Late-night Pepperoni Pizza',
      zh: 'å®µå¤œ?å¤§?©è¾£é¦™è‚ ?«è¨',
      ja: 'å¤œé£Ÿ?šãƒ‘??ƒ‹?”ã‚¶'
    },
    description: {
      ko: 'ì¹˜ì¦ˆ?€ ?˜í¼ë¡œë‹ˆê°€ ?ë????¼ì! ?¼ì‹?¼ë¡œ ë¨¹ëŠ” ìµœê³ ??? íƒ.',
      en: 'Pizza rich with cheese and pepperoni! Best choice for late-night eating.',
      zh: 'å¥¶é…ª?Œæ„å¤§åˆ©è¾£é¦™? ä¸°å¯Œçš„?«è¨ï¼å?å¤œçš„?€ä½³é€‰æ‹©??,
      ja: '?ãƒ¼?ºã¨?šãƒ‘??ƒ‹?Œè±Šå¯Œãª?”ã‚¶ï¼å¤œé£Ÿã«é£Ÿã¹?‹æ?é«˜ã®?¸æŠ??
    },
    emoji: '?•',
    category: 'snack',
    calories: 680,

    weight: { breakfast: 1, lunch: 6, dinner: 8, snack: 9 }
  },
  {
    id: 'tteokbokki-rose',
    name: {
      ko: 'ë¡œì œ ?¡ë³¶??,
      en: 'Rose Tteokbokki',
      zh: '?«ç‘°?’å¹´ç³?,
      ja: '??‚¼?ˆãƒƒ??ƒ?ƒã‚­'
    },
    description: {
      ko: '?¬ë¦¼ê³?? ë§ˆ???ŒìŠ¤???¡ë³¶?? ?¬ì½¤?˜ê³  ë¶€?œëŸ¬???¸ê¸° ë©”ë‰´.',
      en: 'Tteokbokki with cream and tomato sauce! Sweet and soft popular menu.',
      zh: 'å¥¶æ²¹?Œç•ª?„é…±?„å¹´ç³•ç‚’ï¼ç”œç¾æŸ”è½?š„??—¨?œå•??,
      ja: '??ƒª?¼ãƒ ?¨ãƒˆ?ãƒˆ?½ãƒ¼?¹ã®?ˆãƒƒ??ƒ?ƒã‚­ï¼ç”˜?ã¦?”ã‚‰?‹ã„äººæ°—?¡ãƒ‹?¥ãƒ¼??
    },
    emoji: '?¥',
    category: 'snack',
    calories: 480,

    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 10 }
  },
  {
    id: 'chicken-feet',
    name: {
      ko: 'ë§µë‹­ë°?,
      en: 'Spicy Chicken Feet',
      zh: 'è¾£é¸¡??,
      ja: '?ãƒ—?¿ãƒ«'
    },
    description: {
      ko: 'ë¶ˆì²˜??ë§¤ìš´ ??°œ! ?¼ì‹?¼ë¡œ ë¨¹ëŠ” ?œêµ­ ?€???ˆì£¼.',
      en: 'Chicken feet as spicy as fire! Korean representative late-night snack.',
      zh: '?ç«ä¸€?·è¾£?„é¸¡?ªï¼å®µå¤œ?ƒçš„?©å›½ä»£è¡¨ä¸‹é…’?œã€?,
      ja: '?«ã®?ˆã†?«è¾›?„é¶è¶³ï¼å¤œé£Ÿ?«é£Ÿ?¹ã‚‹?“å›½ä»£è¡¨?Šã¤?¾ã¿??
    },
    emoji: '?”',
    category: 'snack',
    calories: 380,

    weight: { breakfast: 1, lunch: 2, dinner: 3, snack: 10 }
  },
  {
    id: 'ramen-snack',
    name: {
      ko: '?¼ì‹ ?¼ë©´',
      en: 'Late-night Ramen',
      zh: 'å®µå¤œ?‰é¢',
      ja: 'å¤œé£Ÿ?©ãƒ¼?¡ãƒ³'
    },
    description: {
      ko: '?¨ëˆ??êµ?¬¼ ?¼ë©´! ?¼ì‹??ê¸°ë³¸ ì¤‘ì˜ ê¸°ë³¸.',
      en: 'Hot broth ramen! The basic of late-night eating.',
      zh: '??±¤?‰é¢ï¼å?å¤œçš„?ºæœ¬ä¸?š„?ºæœ¬??,
      ja: '?±ã„?¹ãƒ¼?—ãƒ©?¼ãƒ¡?³ï¼å¤œé£Ÿ??Ÿº?¬ä¸­??Ÿº?¬ã€?
    },
    emoji: '?œ',
    category: 'snack',
    calories: 520,

    weight: { breakfast: 1, lunch: 4, dinner: 5, snack: 10 }
  },
  {
    id: 'chicken-wings',
    name: {
      ko: 'ì¹˜í‚¨???¸íŠ¸',
      en: 'Chicken Wings Set',
      zh: 'é¸¡ç¿…å¥—é¤',
      ja: '?ã‚­?³ã‚¦?£ãƒ³?°ã‚»?ƒãƒˆ'
    },
    description: {
      ko: 'ë°”ì‚­??ì¹˜í‚¨?™ì— ë§¤ì½¤???ŒìŠ¤! ?¼ì‹?¼ë¡œ ë¨¹ëŠ” ?ˆì£¼.',
      en: 'Crispy chicken wings with spicy sauce! Perfect late-night snack.',
      zh: '?¥è„†é¸¡ç¿…?è¾£?±ï¼?‚åˆå®µå¤œ?„ä¸‹?’èœ??,
      ja: '?µã‚¯?µã‚¯??ƒ??ƒ³?¦ã‚£?³ã‚°?«è¾›?„ã‚½?¼ã‚¹ï¼å¤œé£Ÿã«?´ã£?Ÿã‚Š??Š?¤ã¾?¿ã€?
    },
    emoji: '?—',
    category: 'snack',
    calories: 480,

    weight: { breakfast: 1, lunch: 5, dinner: 6, snack: 9 }
  },
  {
    id: 'zinger-burger',
    name: {
      ko: 'ì§•ê±°ë²„ê±°',
      en: 'Zinger Burger',
      zh: 'æ´¥æ ¼??,
      ja: '?¸ãƒ³?¬ãƒ¼?ãƒ¼?¬ãƒ¼'
    },
    description: {
      ko: 'KFC??ë§¤ì½¤??ì¹˜í‚¨ ?¨í‹° ë²„ê±°! ?¼ì‹?¼ë¡œ ê°•ë ¥ ì¶”ì²œ.',
      en: 'KFC\'s spicy chicken patty burger! Highly recommended for late-night.',
      zh: '??¾·?ºçš„è¾£é¸¡?‰é??¡ï¼å®µå¤œå¼ºçƒˆ?¨è??,
      ja: 'KFC??¾›?„ãƒ??ƒ³?‘ãƒ†?£ãƒ?¼ã‚¬?¼ï¼å¤œé£Ÿ?«å¼·?ãŠ?™ã™?ã€?
    },
    emoji: '?”',
    category: 'snack',
    calories: 580,

    weight: { breakfast: 1, lunch: 6, dinner: 4, snack: 8 }
  },
  {
    id: 'hot-dog',
    name: {
      ko: '?«ë„ê·??¸íŠ¸',
      en: 'Hot Dog Set',
      zh: '??‹—å¥—é¤',
      ja: '?›ãƒƒ?ˆãƒ‰?ƒã‚°?»ãƒƒ??
    },
    description: {
      ko: 'ê¸¸ê²Œ ë»—ì? ?Œì‹œì§€??ë¨¸ìŠ¤?°ë“œ?€ ì¼€ì²? ê°„ë‹¨???¼ì‹.',
      en: 'Long sausage with mustard and ketchup! Simple late-night snack.',
      zh: '?¿é•¿?„é¦™? é…?¥æœ«?±å’Œ?ªèŒ„?±ï¼ç®€?•çš„å®µå¤œ??,
      ja: '?·ãä¼¸ã³?Ÿã‚½?¼ã‚»?¼ã‚¸?«ãƒ?¹ã‚¿?¼ãƒ‰?¨ã‚±?ãƒ£?ƒãƒ—ï¼ã‚·?³ãƒ—?«ãªå¤œé£Ÿ??
    },
    emoji: '?Œ­',
    category: 'snack',
    calories: 420,

    weight: { breakfast: 2, lunch: 5, dinner: 3, snack: 8 }
  },
  {
    id: 'taco-snack',
    name: {
      ko: '?€ì½”ì•¼??,
      en: 'Takoyaki',
      zh: 'ç« é±¼??,
      ja: '?Ÿã“?¼ã'
    },
    description: {
      ko: '?¬ì½¤???€ì½”ì•¼???ŒìŠ¤??ë¬¸ì–´! ?¼ë³¸???¼ì‹ ë©”ë‰´.',
      en: 'Sweet takoyaki sauce with octopus! Japanese late-night menu.',
      zh: '?œç« é±¼çƒ§?±é…ç« é±¼ï¼æ—¥å¼å?å¤œèœ?•ã€?,
      ja: '?˜ã„?Ÿã“?¼ã?½ãƒ¼?¹ã«?¿ã‚³ï¼æ—¥?¬é¢¨å¤œé£Ÿ?¡ãƒ‹?¥ãƒ¼??
    },
    emoji: '?¦‘',
    category: 'snack',
    calories: 380,

    weight: { breakfast: 1, lunch: 3, dinner: 4, snack: 7 }
  },

  // ?”ì???ë©”ë‰´ (ë³„ë„ ì¶”ì²œ)
  {
    id: 'ice-cream',
    name: {
      ko: '?„ì´?¤í¬ë¦??Œì¸??,
      en: 'Ice Cream Pint',
      zh: '?°æ·‡æ·‹å“??,
      ja: '?¢ã‚¤?¹ã‚¯?ªãƒ¼? ãƒ‘?¤ãƒ³??
    },
    description: {
      ko: '?œì›???„ì´?¤í¬ë¦????Œì¸?? ?¼ì‹ ???¬ì½¤??ë§ˆë¬´ë¦?',
      en: 'A cold pint of ice cream for a sweet finish after a meal.',
      zh: 'ä¸€?è„±?°æ·‡æ·‹ï¼Œé¥??„ç”œ?œæ”¶å°¾ã€?,
      ja: 'é£Ÿå¾Œ??”˜?„ç· ?ã«?´ã£?Ÿã‚Š??‚¢?¤ã‚¹??ƒª?¼ãƒ ?‘ã‚¤?³ãƒˆ??
    },
    emoji: '?¨',
    category: 'dessert',
    calories: 520,

  },
  {
    id: 'tiramisu',
    name: {
      ko: '?°ë¼ë¯¸ìˆ˜',
      en: 'Tiramisu',
      zh: '?æ‹‰ç±³è‹',
      ja: '?†ã‚£?©ãƒŸ??
    },
    description: {
      ko: '?ìŠ¤?„ë ˆ?Œì? ë§ˆìŠ¤ì¹´í¬?¤ê? ?´ìš°?¬ì§„ ?´íƒˆë¦¬ì•ˆ ?”ì???',
      en: 'Italian dessert with espresso and mascarpone layers.',
      zh: 'æµ“ç¼©?–å•¡ä¸é©¬??¡å½??ˆçš„?å¼?œç‚¹??,
      ja: '?¨ã‚¹?—ãƒ¬?ƒã‚½?¨ãƒ?¹ã‚«?«ãƒ?¼ãƒ??‚¤?¿ãƒª?¢ãƒ³?‡ã‚¶?¼ãƒˆ??
    },
    emoji: '?°',
    category: 'dessert',
    calories: 450,

  },
  {
    id: 'cheesecake',
    name: {
      ko: '?´ìš• ì¹˜ì¦ˆì¼€?´í¬',
      en: 'New York Cheesecake',
      zh: 'çº½çº¦?å£«?‹ç³•',
      ja: '?‹ãƒ¥?¼ãƒ¨?¼ã‚¯?ãƒ¼?ºã‚±?¼ã‚­'
    },
    description: {
      ko: 'ê¾¸ë•??ì¹˜ì¦ˆ???ë?ê°€ ê°€?í•œ ?´ë˜??ì¼€?´í¬.',
      en: 'Rich and dense classic cheesecake.',
      zh: 'æµ“éƒç»µå¯†?„ç»?¸èŠå£«è›‹ç³•ã€?,
      ja: 'æ¿ƒåš?§ã‚‚?£ã¡?Šã¨?—ãŸ??ƒ©?·ãƒƒ??ƒ?¼ã‚º?±ãƒ¼??€?
    },
    emoji: '?°',
    category: 'dessert',
    calories: 420,

  },
  {
    id: 'brownie',
    name: {
      ko: 'ì´ˆì½” ë¸Œë¼?°ë‹ˆ',
      en: 'Chocolate Brownie',
      zh: 'å·§å…‹?›å¸ƒ?—å°¼',
      ja: '?ãƒ§?³ãƒ–?©ã‚¦?‹ãƒ¼'
    },
    description: {
      ko: 'ì§„í•œ ì´ˆì½œë¦?ë¸Œë¼?°ë‹ˆ ??ì¡°ê°! ?„ì´?¤í¬ë¦¼ê³¼ ê³ë“¤?´ë©´ ìµœê³ .',
      en: 'A rich chocolate brownie slice; perfect with ice cream.',
      zh: 'æµ“éƒ?„å·§?‹åŠ›å¸ƒæœ—å°¼ï¼Œ?å†°æ·‡æ·‹?´ä½³??,
      ja: 'æ¿ƒåš?ªãƒ?§ã‚³?–ãƒ©?¦ãƒ‹?¼ã€‚ã‚¢?¤ã‚¹?’æ·»?ˆã‚‹?¨æ?é«˜ã€?
    },
    emoji: '?«',
    category: 'dessert',
    calories: 360,

  },
  {
    id: 'macaron',
    name: {
      ko: 'ë§ˆì¹´ë¡??¸íŠ¸',
      en: 'Macaron Set',
      zh: 'é©¬å¡é¾™å¥—è£?,
      ja: '?ã‚«??ƒ³?»ãƒƒ??
    },
    description: {
      ko: '?¤ì–‘???‰ê³¼ ë§›ì˜ ë§ˆì¹´ë¡?6ì¢??¸íŠ¸.',
      en: 'Assorted six-piece macaron set in various flavors.',
      zh: 'å¤šç§?£å‘³?„å…­ä»¶é©¬?¡é¾™å¥—è£…??,
      ja: '?²ã¨?Šã©?Šã®?ã‚«??ƒ³6ç¨?‚»?ƒãƒˆ??
    },
    emoji: '?¬',
    category: 'dessert',
    calories: 300,

  },
  {
    id: 'churros',
    name: {
      ko: 'ì¸„ëŸ¬??& ?¥í•‘',
      en: 'Churros with Dip',
      zh: '?‰æ‹¿æ£’è˜¸??,
      ja: '?ãƒ¥??‚¹?¨ãƒ‡?£ãƒƒ??
    },
    description: {
      ko: '?°ëˆ??ì¸„ëŸ¬?¤ì? ì´ˆì½”/?œë‚˜ëª??¥í•‘ ?ŒìŠ¤.',
      en: 'Warm churros with chocolate or cinnamon dipping sauces.',
      zh: '??‰?¿æ£’?å·§?‹åŠ›?–è‚‰æ¡‚è˜¸?±ã€?,
      ja: 'æ¸©ã‹?„ãƒ?¥ãƒ­?¹ã¨?ãƒ§???·ãƒŠ?¢ãƒ³?‡ã‚£?ƒãƒ—??
    },
    emoji: '?¥–',
    category: 'dessert',
    calories: 380,

  },
  {
    id: 'bubble-tea',
    name: {
      ko: 'ë²„ë¸”??,
      en: 'Bubble Tea',
      zh: '?ç å¥¶èŒ¶',
      ja: '?¿ãƒ”?ªã‚«?Ÿãƒ«??ƒ†?£ãƒ¼'
    },
    description: {
      ko: 'ì«€?í•œ ?€?¼ì˜¤ì¹??„ì´ ê°€?í•œ ë²„ë¸”??',
      en: 'Bubble tea filled with chewy tapioca pearls.',
      zh: 'æ»¡æ»¡Qå¼¹ç? çš„å¥¶èŒ¶??,
      ja: '?‚ã¡?‚ã¡?¿ãƒ”?ªã‚«?ŒãŸ?£ã·?Šã®?Ÿãƒ«??ƒ†?£ãƒ¼??
    },
    emoji: '?§‹',
    category: 'dessert',
    calories: 320,

  },
  {
    id: 'croffle',
    name: {
      ko: '?¬ë¡œ??,
      en: 'Croffle',
      zh: '??¢‚?å¤«é¥?,
      ja: '??ƒ­?ƒãƒ•??
    },
    description: {
      ko: 'ê²‰ë°”?ì´‰ ?¬ë¡œ?€???€?Œì— ?„ì´?¤í¬ë¦?ì¶”ê? ê°€??',
      en: 'Crispy croissant waffle; add ice cream on top.',
      zh: 'å¤–è„†?Œå«©?„å¯é¢‚åå¤«é?ï¼Œå¯? å†°æ·‡æ·‹??,
      ja: 'å¤–ã‚«?ªä¸­?µã‚??‚¯??ƒ¯?ƒã‚µ?³ãƒ¯?ƒãƒ•?«ã€‚ã‚¢?¤ã‚¹??¿½? ã‚‚OK??
    },
    emoji: '?§‡',
    category: 'dessert',
    calories: 430,

  },
  {
    id: 'bingsu',
    name: {
      ko: '?¸ê¸° ë¹™ìˆ˜',
      en: 'Strawberry Bingsu',
      zh: '?‰è“?¨å†°',
      ja: '?„ã¡?”ã‹?æ°·'
    },
    description: {
      ko: '?¬ì½¤???°ìœ ?€ ? ì„ ???¸ê¸°ê°€ ?¬ë¼ê°??œì›??ë¹™ìˆ˜.',
      en: 'Shaved ice topped with fresh strawberries and condensed milk.',
      zh: '? ä¸Šé²œè‰?“ä¸?¼ä¹³?„æ¸…?‰åˆ¨?°ã€?,
      ja: 'ç·´ä¹³?¨æ–°é®?„?¡ã”?’ã®?›ãŸ?•ã£?±ã‚Š?‹ãæ°·ã€?
    },
    emoji: '?§',
    category: 'dessert',
    calories: 310,

  },
  {
    id: 'donut',
    name: {
      ko: 'ê¸€?ˆì´ì¦ˆë“œ ?„ë„›',
      en: 'Glazed Donut',
      zh: 'ç³–éœœ?œç”œ??,
      ja: '?°ãƒ¬?¼ã‚º?‰ãƒ‰?¼ãƒŠ??
    },
    description: {
      ko: '?¬ì½¤??ê¸€?ˆì´ì¦ˆê? ?…í?ì§??´ë˜???„ë„›.',
      en: 'Classic donut coated with sweet glaze.',
      zh: 'è£¹ç?ç³–éœœ?„ç»?¸ç”œ?œåœˆ??,
      ja: '?˜ã„?°ãƒ¬?¼ã‚º?Œã‹?‹ã£?Ÿã‚¯?©ã‚·?ƒã‚¯?‰ãƒ¼?Šãƒ„??
    },
    emoji: '?©',
    category: 'dessert',
    calories: 280,

  },
  {
    id: 'hotteok',
    name: {
      ko: 'ê¿€?¸ë–¡',
      en: 'Honey Hotteok',
      zh: '?‚èœœç³–é?',
      ja: '?›ãƒƒ?ˆã‚¯'
    },
    description: {
      ko: '?°ëˆ??ê¿€ ?œëŸ½??ê°€?í•œ ?œêµ­ ê¸¸ê±°ë¦??”ì???',
      en: 'Warm Korean street dessert filled with honey syrup.',
      zh: '?…æ»¡?‚èœœç³–æµ†?„çƒ­?©å›½è¡—å¤´?œç‚¹??,
      ja: '?‚èœœ?·ãƒ­?ƒãƒ—?ŒãŸ?£ã·?Šã®?“å›½å±‹å°?‡ã‚¶?¼ãƒˆ??
    },
    emoji: '?¥',
    category: 'dessert',
    calories: 340,

  }
];

export const timeSlots = {
  breakfast: {
    name: {
      ko: '?„ì¹¨',
      en: 'Breakfast',
      zh: '?©é¤',
      ja: '?é£Ÿ'
    },
    emoji: '?Œ…'
  },
  lunch: {
    name: {
      ko: '?ì‹¬',
      en: 'Lunch',
      zh: '?ˆé¤',
      ja: '?¼é£Ÿ'
    },
    emoji: '?€ï¸?
  },
  dinner: {
    name: {
      ko: '?€??,
      en: 'Dinner',
      zh: '?šé¤',
      ja: 'å¤•é£Ÿ'
    },
    emoji: '?Œ™'
  },
  snack: {
    name: {
      ko: '?¼ì‹',
      en: 'Late-night Snack',
      zh: 'å¤œå?',
      ja: 'å¤œé£Ÿ'
    },
    emoji: '?Œƒ'
  },
  dessert: {
    name: {
      ko: '?”ì???,
      en: 'Dessert',
      zh: '?œç‚¹',
      ja: '?‡ã‚¶?¼ãƒˆ'
    },
    emoji: '?¨'
  },
  random: {
    name: {
      ko: '?œë¤',
      en: 'Random',
      zh: '?æœº',
      ja: '?©ãƒ³?€??
    },
    emoji: '?²'
  }
};

// ê°€ì¤‘ì¹˜ ?†ëŠ” ê· ë“± ?œë¤ ì¶”ì²œ ?¨ìˆ˜
export function getWeightedRandomMenu(timeSlot: TimeSlot): MenuItem {
  // ?œë¤ ? íƒì§€??ê²½ìš° ?”ì??¸ë? ?œì™¸???„ì²´ ë©”ë‰´?ì„œ ê· ë“± ì¶”ì²œ
  if (timeSlot === 'random') {
    const nonDessert = menuRecommendations.filter(menu => menu.category !== 'dessert');
    return nonDessert[Math.floor(Math.random() * nonDessert.length)];
  }

  // ?´ë‹¹ ?œê°„?€??ëª¨ë“  ë©”ë‰´ ?„í„°ë§?
  const availableMenus = menuRecommendations.filter(menu => menu.category === timeSlot);

  if (availableMenus.length === 0) {
    // ê¸°ë³¸?ìœ¼ë¡?ì²?ë²ˆì§¸ ë©”ë‰´ ë°˜í™˜ (fallback)
    return menuRecommendations[0];
  }

  // ê°€ì¤‘ì¹˜ ?†ì´ ê· ë“± ?œë¤ ? íƒ
  return availableMenus[Math.floor(Math.random() * availableMenus.length)];
}
