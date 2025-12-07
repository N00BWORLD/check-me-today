// 관상 테스트 데이터
// 마의상서(麻衣相書), 신상전편(神相全篇) 등 동양 관상학 문헌 기반

export interface FaceFeature {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  options: FaceOption[];
}

export interface FaceOption {
  id: string;
  label: Record<string, string>;
  description: Record<string, string>;
  emoji: string;
  // 각 옵션의 성향 점수
  traits: {
    wealth: number;      // 재물운 (-2 ~ +2)
    wisdom: number;      // 지혜/학업 (-2 ~ +2)
    leadership: number;  // 리더십/권력 (-2 ~ +2)
    charm: number;       // 매력/연애 (-2 ~ +2)
    health: number;      // 건강/장수 (-2 ~ +2)
    fortune: number;     // 행운/복 (-2 ~ +2)
  };
}

export interface FaceReadingResult {
  id: string;
  type: Record<string, string>;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  description: Record<string, string>;
  strengths: Record<string, string[]>;
  advice: Record<string, string>;
  luckyColor: string;
  luckyDirection: Record<string, string>;
  compatibility: Record<string, string>;
  emoji: string;
  // 결과 판정 기준 (가장 높은 trait)
  primaryTrait: keyof FaceOption['traits'];
}

// 얼굴 부위별 질문
export const faceFeatures: FaceFeature[] = [
  {
    id: "face-shape",
    name: {
      ko: "얼굴형",
      en: "Face Shape",
      zh: "脸型",
      ja: "顔の形"
    },
    description: {
      ko: "거울을 보고 전체적인 얼굴 윤곽을 확인해보세요",
      en: "Look in the mirror and check your overall face outline",
      zh: "照镜子看看你的整体脸型轮廓",
      ja: "鏡を見て、顔の輪郭を確認してください"
    },
    options: [
      {
        id: "round",
        label: { ko: "원형 (둥근 얼굴)", en: "Round", zh: "圆形脸", ja: "丸顔" },
        description: { 
          ko: "볼이 통통하고 전체적으로 둥근 인상", 
          en: "Chubby cheeks, overall round impression",
          zh: "脸颊丰满，整体圆润",
          ja: "頬がふっくらして、全体的に丸い印象"
        },
        emoji: "🌕",
        traits: { wealth: 2, wisdom: 0, leadership: 0, charm: 1, health: 1, fortune: 2 }
      },
      {
        id: "oval",
        label: { ko: "타원형 (계란형)", en: "Oval", zh: "椭圆形脸", ja: "卵型" },
        description: { 
          ko: "이마와 턱이 좁고 광대가 넓은 달걀 모양",
          en: "Egg-shaped with narrow forehead and chin",
          zh: "额头和下巴较窄，颧骨较宽，呈蛋形",
          ja: "額と顎が狭く、頬骨が広い卵形"
        },
        emoji: "🥚",
        traits: { wealth: 1, wisdom: 1, leadership: 1, charm: 2, health: 1, fortune: 1 }
      },
      {
        id: "square",
        label: { ko: "사각형 (각진 얼굴)", en: "Square", zh: "方形脸", ja: "四角顔" },
        description: { 
          ko: "이마, 광대, 턱이 비슷한 너비로 각진 느낌",
          en: "Angular with similar width at forehead, cheekbones, and jaw",
          zh: "额头、颧骨和下巴宽度相近，有棱角感",
          ja: "額、頬骨、顎が同じ幅で角張った印象"
        },
        emoji: "⬜",
        traits: { wealth: 1, wisdom: 0, leadership: 2, charm: 0, health: 2, fortune: 1 }
      },
      {
        id: "inverted-triangle",
        label: { ko: "역삼각형 (하트형)", en: "Heart-shaped", zh: "心形脸", ja: "逆三角形" },
        description: { 
          ko: "이마가 넓고 턱이 뾰족한 하트 모양",
          en: "Wide forehead with pointed chin, heart-shaped",
          zh: "额头宽，下巴尖，呈心形",
          ja: "額が広く顎が尖った逆三角形"
        },
        emoji: "💎",
        traits: { wealth: 0, wisdom: 2, leadership: 1, charm: 1, health: 0, fortune: 1 }
      },
      {
        id: "long",
        label: { ko: "긴형 (장방형)", en: "Oblong", zh: "长形脸", ja: "面長" },
        description: { 
          ko: "세로로 긴 얼굴, 이마와 턱이 길어 보임",
          en: "Vertically long face with elongated forehead and chin",
          zh: "脸型纵向较长，额头和下巴都显得较长",
          ja: "縦に長い顔、額と顎が長く見える"
        },
        emoji: "📏",
        traits: { wealth: 0, wisdom: 2, leadership: 1, charm: 0, health: 1, fortune: 1 }
      }
    ]
  },
  {
    id: "forehead",
    name: {
      ko: "이마",
      en: "Forehead",
      zh: "额头",
      ja: "額"
    },
    description: {
      ko: "이마의 넓이와 높이를 확인해보세요",
      en: "Check the width and height of your forehead",
      zh: "看看你额头的宽度和高度",
      ja: "額の幅と高さを確認してください"
    },
    options: [
      {
        id: "wide-high",
        label: { ko: "넓고 높은 이마", en: "Wide & High", zh: "宽而高的额头", ja: "広くて高い額" },
        description: { 
          ko: "이마가 넓고 시원하게 드러나 있음",
          en: "Forehead is wide and prominently visible",
          zh: "额头宽阔且明显",
          ja: "額が広くはっきり見える"
        },
        emoji: "👑",
        traits: { wealth: 1, wisdom: 2, leadership: 2, charm: 0, health: 1, fortune: 1 }
      },
      {
        id: "narrow-low",
        label: { ko: "좁고 낮은 이마", en: "Narrow & Low", zh: "窄而低的额头", ja: "狭くて低い額" },
        description: { 
          ko: "이마가 좁거나 헤어라인이 낮음",
          en: "Forehead is narrow or hairline is low",
          zh: "额头较窄或发际线较低",
          ja: "額が狭いか、生え際が低い"
        },
        emoji: "🌿",
        traits: { wealth: 0, wisdom: 0, leadership: 0, charm: 1, health: 1, fortune: 1 }
      },
      {
        id: "rounded",
        label: { ko: "볼록한 이마", en: "Rounded/Prominent", zh: "圆润突出的额头", ja: "丸みのある額" },
        description: { 
          ko: "이마가 앞으로 둥글게 나와 있음",
          en: "Forehead curves outward in a rounded shape",
          zh: "额头圆润向前突出",
          ja: "額が丸く前に出ている"
        },
        emoji: "🎱",
        traits: { wealth: 1, wisdom: 1, leadership: 0, charm: 1, health: 1, fortune: 2 }
      },
      {
        id: "flat",
        label: { ko: "평평한 이마", en: "Flat", zh: "平坦的额头", ja: "平らな額" },
        description: { 
          ko: "이마가 평평하고 반듯함",
          en: "Forehead is flat and even",
          zh: "额头平坦整齐",
          ja: "額が平らで整っている"
        },
        emoji: "📐",
        traits: { wealth: 1, wisdom: 1, leadership: 1, charm: 0, health: 1, fortune: 0 }
      }
    ]
  },
  {
    id: "eyes",
    name: {
      ko: "눈",
      en: "Eyes",
      zh: "眼睛",
      ja: "目"
    },
    description: {
      ko: "눈의 크기와 모양, 눈꼬리 방향을 확인해보세요",
      en: "Check the size, shape, and direction of your eyes",
      zh: "看看眼睛的大小、形状和眼角方向",
      ja: "目の大きさ、形、目尻の方向を確認してください"
    },
    options: [
      {
        id: "large-round",
        label: { ko: "크고 둥근 눈", en: "Large & Round", zh: "大而圆的眼睛", ja: "大きくて丸い目" },
        description: { 
          ko: "눈이 크고 동그란 인상, 흰자가 많이 보임",
          en: "Large round eyes with visible sclera",
          zh: "眼睛大而圆，眼白明显",
          ja: "大きくて丸い目、白目が見える"
        },
        emoji: "👁️",
        traits: { wealth: 0, wisdom: 0, leadership: 0, charm: 2, health: 1, fortune: 2 }
      },
      {
        id: "small-sharp",
        label: { ko: "작고 날카로운 눈", en: "Small & Sharp", zh: "小而锐利的眼睛", ja: "小さくて鋭い目" },
        description: { 
          ko: "눈이 작고 날카로운 인상, 예리해 보임",
          en: "Small sharp eyes with a keen appearance",
          zh: "眼睛小而锐利，看起来敏锐",
          ja: "小さくて鋭い目、鋭敏に見える"
        },
        emoji: "🦅",
        traits: { wealth: 1, wisdom: 2, leadership: 1, charm: 0, health: 1, fortune: 0 }
      },
      {
        id: "upturned",
        label: { ko: "올라간 눈꼬리", en: "Upturned Eyes", zh: "上扬的眼角", ja: "上がった目尻" },
        description: { 
          ko: "눈꼬리가 위로 올라간 형태",
          en: "Eye corners that point upward",
          zh: "眼角向上扬起",
          ja: "目尻が上に向かっている"
        },
        emoji: "😸",
        traits: { wealth: 1, wisdom: 1, leadership: 2, charm: 1, health: 0, fortune: 0 }
      },
      {
        id: "downturned",
        label: { ko: "내려간 눈꼬리", en: "Downturned Eyes", zh: "下垂的眼角", ja: "下がった目尻" },
        description: { 
          ko: "눈꼬리가 아래로 내려간 순한 인상",
          en: "Eye corners that point downward, gentle appearance",
          zh: "眼角下垂，看起来温和",
          ja: "目尻が下がっていて優しい印象"
        },
        emoji: "🐶",
        traits: { wealth: 0, wisdom: 0, leadership: 0, charm: 2, health: 1, fortune: 2 }
      },
      {
        id: "phoenix",
        label: { ko: "봉황눈 (길고 가는 눈)", en: "Phoenix Eyes", zh: "凤眼", ja: "鳳眼" },
        description: { 
          ko: "눈이 길고 가늘며 눈꼬리가 올라간 형태",
          en: "Long narrow eyes with upturned corners",
          zh: "眼睛细长，眼角上扬",
          ja: "目が細長く、目尻が上がっている"
        },
        emoji: "🔥",
        traits: { wealth: 2, wisdom: 1, leadership: 2, charm: 1, health: 0, fortune: 1 }
      }
    ]
  },
  {
    id: "nose",
    name: {
      ko: "코",
      en: "Nose",
      zh: "鼻子",
      ja: "鼻"
    },
    description: {
      ko: "코의 높이와 모양을 확인해보세요",
      en: "Check the height and shape of your nose",
      zh: "看看你鼻子的高度和形状",
      ja: "鼻の高さと形を確認してください"
    },
    options: [
      {
        id: "high-straight",
        label: { ko: "높고 곧은 코", en: "High & Straight", zh: "高挺的鼻子", ja: "高くてまっすぐな鼻" },
        description: { 
          ko: "콧대가 높고 일직선으로 뻗어 있음",
          en: "High nose bridge extending in a straight line",
          zh: "鼻梁高挺，呈直线",
          ja: "鼻筋が高くまっすぐ"
        },
        emoji: "⛰️",
        traits: { wealth: 2, wisdom: 1, leadership: 2, charm: 1, health: 1, fortune: 1 }
      },
      {
        id: "wide-fleshy",
        label: { ko: "넓고 육감적인 코", en: "Wide & Fleshy", zh: "宽大丰满的鼻子", ja: "幅広く肉感的な鼻" },
        description: { 
          ko: "콧방울이 넓고 코끝이 둥근 편",
          en: "Wide nostrils with a rounded nose tip",
          zh: "鼻翼宽大，鼻尖圆润",
          ja: "小鼻が広く、鼻先が丸い"
        },
        emoji: "💰",
        traits: { wealth: 2, wisdom: 0, leadership: 0, charm: 0, health: 2, fortune: 2 }
      },
      {
        id: "aquiline",
        label: { ko: "매부리코", en: "Aquiline/Roman", zh: "鹰钩鼻", ja: "鷲鼻" },
        description: { 
          ko: "콧대 중간이 볼록하게 튀어나온 형태",
          en: "Nose with a prominent bump on the bridge",
          zh: "鼻梁中间有明显的凸起",
          ja: "鼻筋の中間が膨らんでいる"
        },
        emoji: "🦅",
        traits: { wealth: 1, wisdom: 1, leadership: 2, charm: 0, health: 0, fortune: 0 }
      },
      {
        id: "small-delicate",
        label: { ko: "작고 오똑한 코", en: "Small & Delicate", zh: "小巧精致的鼻子", ja: "小さくて整った鼻" },
        description: { 
          ko: "코가 작고 섬세한 인상",
          en: "Small and delicate nose",
          zh: "鼻子小巧精致",
          ja: "小さくて繊細な鼻"
        },
        emoji: "🌸",
        traits: { wealth: 0, wisdom: 1, leadership: 0, charm: 2, health: 1, fortune: 1 }
      },
      {
        id: "button",
        label: { ko: "낮고 동그란 코", en: "Button Nose", zh: "圆润低矮的鼻子", ja: "低くて丸い鼻" },
        description: { 
          ko: "콧대가 낮고 코끝이 동글동글",
          en: "Low bridge with a round tip",
          zh: "鼻梁较低，鼻尖圆润",
          ja: "鼻筋が低く、先が丸い"
        },
        emoji: "🔘",
        traits: { wealth: 1, wisdom: 0, leadership: 0, charm: 1, health: 1, fortune: 2 }
      }
    ]
  },
  {
    id: "mouth",
    name: {
      ko: "입",
      en: "Mouth",
      zh: "嘴巴",
      ja: "口"
    },
    description: {
      ko: "입의 크기와 입술 두께를 확인해보세요",
      en: "Check the size of your mouth and thickness of lips",
      zh: "看看嘴巴大小和嘴唇厚度",
      ja: "口の大きさと唇の厚さを確認してください"
    },
    options: [
      {
        id: "large-full",
        label: { ko: "크고 두꺼운 입술", en: "Large & Full Lips", zh: "大而厚的嘴唇", ja: "大きくて厚い唇" },
        description: { 
          ko: "입이 크고 입술이 두툼한 편",
          en: "Large mouth with full, thick lips",
          zh: "嘴巴大，嘴唇丰满",
          ja: "口が大きく、唇が厚い"
        },
        emoji: "👄",
        traits: { wealth: 1, wisdom: 0, leadership: 0, charm: 2, health: 1, fortune: 2 }
      },
      {
        id: "small-thin",
        label: { ko: "작고 얇은 입술", en: "Small & Thin Lips", zh: "小而薄的嘴唇", ja: "小さくて薄い唇" },
        description: { 
          ko: "입이 작고 입술이 얇은 편",
          en: "Small mouth with thin lips",
          zh: "嘴巴小，嘴唇较薄",
          ja: "口が小さく、唇が薄い"
        },
        emoji: "🎀",
        traits: { wealth: 0, wisdom: 2, leadership: 1, charm: 1, health: 0, fortune: 0 }
      },
      {
        id: "upturned-corners",
        label: { ko: "올라간 입꼬리", en: "Upturned Corners", zh: "上扬的嘴角", ja: "上がった口角" },
        description: { 
          ko: "자연스럽게 입꼬리가 올라가 있음",
          en: "Naturally upturned mouth corners",
          zh: "嘴角自然上扬",
          ja: "自然に口角が上がっている"
        },
        emoji: "😊",
        traits: { wealth: 1, wisdom: 0, leadership: 0, charm: 2, health: 1, fortune: 2 }
      },
      {
        id: "downturned-corners",
        label: { ko: "내려간 입꼬리", en: "Downturned Corners", zh: "下垂的嘴角", ja: "下がった口角" },
        description: { 
          ko: "입꼬리가 아래로 처져 있음",
          en: "Mouth corners that turn downward",
          zh: "嘴角向下",
          ja: "口角が下がっている"
        },
        emoji: "😔",
        traits: { wealth: 0, wisdom: 1, leadership: 0, charm: 0, health: 0, fortune: 0 }
      },
      {
        id: "bow-shaped",
        label: { ko: "활 모양 입술", en: "Bow-shaped", zh: "弓形嘴唇", ja: "弓型の唇" },
        description: { 
          ko: "윗입술이 M자로 또렷한 활 모양",
          en: "Defined M-shaped upper lip like a bow",
          zh: "上唇呈明显的M形弓状",
          ja: "上唇がM字型のはっきりした弓形"
        },
        emoji: "🏹",
        traits: { wealth: 0, wisdom: 1, leadership: 1, charm: 2, health: 0, fortune: 1 }
      }
    ]
  },
  {
    id: "chin",
    name: {
      ko: "턱",
      en: "Chin",
      zh: "下巴",
      ja: "顎"
    },
    description: {
      ko: "턱의 형태를 확인해보세요",
      en: "Check the shape of your chin",
      zh: "看看你下巴的形状",
      ja: "顎の形を確認してください"
    },
    options: [
      {
        id: "round",
        label: { ko: "둥근 턱", en: "Round Chin", zh: "圆下巴", ja: "丸い顎" },
        description: { 
          ko: "턱선이 부드럽고 둥근 형태",
          en: "Soft, rounded chin line",
          zh: "下巴线条柔和圆润",
          ja: "顎のラインが柔らかく丸い"
        },
        emoji: "🌙",
        traits: { wealth: 1, wisdom: 0, leadership: 0, charm: 1, health: 1, fortune: 2 }
      },
      {
        id: "pointed",
        label: { ko: "뾰족한 턱", en: "Pointed Chin", zh: "尖下巴", ja: "尖った顎" },
        description: { 
          ko: "턱 끝이 뾰족하고 갸름한 형태",
          en: "Pointed and slender chin",
          zh: "下巴尖细",
          ja: "顎先が尖っていて細い"
        },
        emoji: "📍",
        traits: { wealth: 0, wisdom: 2, leadership: 0, charm: 1, health: 0, fortune: 0 }
      },
      {
        id: "square",
        label: { ko: "각진 턱", en: "Square Chin", zh: "方下巴", ja: "角張った顎" },
        description: { 
          ko: "턱선이 뚜렷하고 각진 형태",
          en: "Defined and angular jaw line",
          zh: "下巴线条明显有棱角",
          ja: "顎のラインがはっきり角張っている"
        },
        emoji: "💪",
        traits: { wealth: 1, wisdom: 0, leadership: 2, charm: 0, health: 2, fortune: 1 }
      },
      {
        id: "double",
        label: { ko: "이중턱/살집있는 턱", en: "Full/Double Chin", zh: "双下巴/丰满下巴", ja: "二重顎/ふっくらした顎" },
        description: { 
          ko: "턱 아래에 살이 있거나 이중턱이 있음",
          en: "Flesh under the chin or double chin",
          zh: "下巴下方有肉或双下巴",
          ja: "顎の下に肉がある、または二重顎"
        },
        emoji: "🍀",
        traits: { wealth: 2, wisdom: 0, leadership: 0, charm: 0, health: 1, fortune: 2 }
      },
      {
        id: "cleft",
        label: { ko: "보조개 턱/갈라진 턱", en: "Cleft Chin", zh: "下巴中间有凹陷", ja: "割れ顎" },
        description: { 
          ko: "턱 가운데가 갈라지거나 움푹 들어간 형태",
          en: "Chin with a dimple or cleft in the middle",
          zh: "下巴中间有凹陷或分裂",
          ja: "顎の真ん中が割れているか凹んでいる"
        },
        emoji: "✨",
        traits: { wealth: 0, wisdom: 1, leadership: 1, charm: 2, health: 0, fortune: 1 }
      }
    ]
  }
];

// 결과 유형 (가장 높은 trait에 따라 결정)
export const faceReadingResults: FaceReadingResult[] = [
  {
    id: "wealth-fortune",
    type: { ko: "부귀상", en: "Wealth Fortune", zh: "富贵相", ja: "富貴相" },
    title: { 
      ko: "재물과 복을 타고난 부귀상",
      en: "Born with Wealth and Fortune",
      zh: "天生富贵命",
      ja: "富と福を持って生まれた富貴相"
    },
    subtitle: {
      ko: "물질적 풍요와 안정을 누리는 얼굴",
      en: "A face blessed with material abundance and stability",
      zh: "享有物质富裕与稳定的面相",
      ja: "物質的な豊かさと安定を享受する顔"
    },
    description: {
      ko: "당신의 관상은 재물운이 강하게 나타납니다. 마의상서에 따르면, 이러한 얼굴형은 중년 이후 재산이 크게 늘어나며, 먹고 사는 문제로 크게 걱정할 일이 없습니다. 특히 콧방울이 넓거나 둥근 얼굴형은 재물을 모으는 복이 있다고 전해집니다. 다만 재물에만 집착하지 말고 주변과 나누는 마음을 가지면 더 큰 복이 따릅니다.",
      en: "Your face shows strong wealth fortune. According to ancient physiognomy texts, this facial structure suggests increasing wealth after middle age, with little worry about livelihood. Wide nostrils or a round face are said to bring fortune in accumulating wealth. However, greater blessings come when you share with others rather than being attached to money alone.",
      zh: "你的面相显示出强烈的财运。根据古代相书，这样的面相表明中年后财富会大幅增长，生活无忧。特别是宽鼻翼或圆脸被认为有聚财之福。不过，如果不只执着于财富，而懂得与他人分享，会获得更大的福气。",
      ja: "あなたの顔相は財運が強く現れています。古代の相書によると、このような顔立ちは中年以降に財産が大きく増え、生活の心配がないとされています。特に小鼻が広いか丸顔は財を集める福があると伝えられています。ただし、お金だけに執着せず、周りと分かち合う心を持てば、より大きな福が訪れます。"
    },
    strengths: {
      ko: ["재물을 모으는 능력", "안정적인 생활 기반", "물질적 여유", "사업 감각"],
      en: ["Ability to accumulate wealth", "Stable life foundation", "Material comfort", "Business sense"],
      zh: ["聚财能力", "稳定的生活基础", "物质富裕", "商业头脑"],
      ja: ["財を集める能力", "安定した生活基盤", "物質的余裕", "ビジネスセンス"]
    },
    advice: {
      ko: "재물은 흘러가는 물과 같습니다. 움켜쥐려 하면 빠져나가고, 흘려보내면 다시 돌아옵니다. 베푸는 삶을 실천해보세요.",
      en: "Wealth is like flowing water. The more you try to grasp it, the more it slips away; let it flow, and it returns. Practice a life of giving.",
      zh: "财富如流水，越想抓住越会流失；放开让它流动，它就会回来。试着过一种慷慨分享的生活。",
      ja: "財は流れる水のようなものです。握りしめようとすれば逃げ、流せばまた戻ってきます。施す生き方を実践してみてください。"
    },
    luckyColor: "#FFD700",
    luckyDirection: { ko: "서쪽", en: "West", zh: "西方", ja: "西" },
    compatibility: { ko: "지혜상, 복록상", en: "Wisdom, Fortune types", zh: "智慧相、福禄相", ja: "知恵相、福禄相" },
    emoji: "💰",
    primaryTrait: "wealth"
  },
  {
    id: "wisdom-scholar",
    type: { ko: "지혜상", en: "Wisdom Fortune", zh: "智慧相", ja: "知恵相" },
    title: {
      ko: "총명함이 빛나는 지혜상",
      en: "Brilliantly Wise Fortune",
      zh: "聪慧过人",
      ja: "聡明さが輝く知恵相"
    },
    subtitle: {
      ko: "학문과 지식을 사랑하는 학자의 얼굴",
      en: "The face of a scholar who loves learning and knowledge",
      zh: "热爱学问与知识的学者面相",
      ja: "学問と知識を愛する学者の顔"
    },
    description: {
      ko: "당신의 관상은 지혜와 총명함이 돋보입니다. 신상전편에서는 이마가 넓거나 눈빛이 맑은 사람은 학문에 재능이 있다고 기록합니다. 책을 읽고 생각하는 것을 즐기며, 복잡한 문제도 논리적으로 풀어나가는 능력이 있습니다. 다만 머리만 쓰지 말고 몸도 움직이며, 이론과 실천의 균형을 맞추는 것이 중요합니다.",
      en: "Your face shows wisdom and intelligence. Ancient texts note that a wide forehead or clear eyes indicate talent in learning. You enjoy reading and thinking, with the ability to solve complex problems logically. However, balance theory with practice, and don't just use your mind—move your body too.",
      zh: "你的面相显示出智慧与聪颖。古代相书记载，额头宽或眼神清澈的人有学问天赋。你喜欢阅读思考，有能力逻辑性地解决复杂问题。不过，不要只用脑子，也要动动身体，理论与实践的平衡很重要。",
      ja: "あなたの顔相は知恵と聡明さが際立っています。古書には、額が広いか目が澄んでいる人は学問に才能があると記されています。読書や思考を楽しみ、複雑な問題も論理的に解決する能力があります。ただし、頭だけでなく体も動かし、理論と実践のバランスを取ることが大切です。"
    },
    strengths: {
      ko: ["뛰어난 분석력", "학습 능력", "논리적 사고", "전문 지식"],
      en: ["Excellent analytical skills", "Learning ability", "Logical thinking", "Professional knowledge"],
      zh: ["出色的分析能力", "学习能力", "逻辑思维", "专业知识"],
      ja: ["優れた分析力", "学習能力", "論理的思考", "専門知識"]
    },
    advice: {
      ko: "지식은 나눌수록 빛납니다. 아는 것을 혼자 쌓아두지 말고, 다른 이에게 가르치고 전하는 기쁨을 느껴보세요.",
      en: "Knowledge shines brighter when shared. Don't hoard what you know—experience the joy of teaching and passing it on to others.",
      zh: "知识越分享越闪耀。不要把所知藏起来，体验教导和传授他人的快乐吧。",
      ja: "知識は分かち合うほど輝きます。知っていることを独り占めせず、他の人に教え伝える喜びを感じてみてください。"
    },
    luckyColor: "#4169E1",
    luckyDirection: { ko: "북쪽", en: "North", zh: "北方", ja: "北" },
    compatibility: { ko: "리더상, 예술가상", en: "Leader, Artist types", zh: "领袖相、艺术家相", ja: "リーダー相、芸術家相" },
    emoji: "📚",
    primaryTrait: "wisdom"
  },
  {
    id: "leader-power",
    type: { ko: "리더상", en: "Leader Fortune", zh: "领袖相", ja: "リーダー相" },
    title: {
      ko: "사람을 이끄는 리더상",
      en: "Natural Born Leader",
      zh: "天生领袖",
      ja: "人を導くリーダー相"
    },
    subtitle: {
      ko: "카리스마와 결단력을 갖춘 지도자의 얼굴",
      en: "The face of a leader with charisma and decisiveness",
      zh: "具有魅力与决断力的领导者面相",
      ja: "カリスマと決断力を備えた指導者の顔"
    },
    description: {
      ko: "당신의 관상은 권위와 리더십이 강하게 나타납니다. 각진 턱선, 높은 콧대, 올라간 눈꼬리는 예로부터 왕후장상(王侯將相)의 상이라 불렸습니다. 조직을 이끌고 사람들을 통솔하는 능력이 뛰어나며, 어려운 상황에서도 결단을 내릴 수 있는 배포가 있습니다. 단, 권위가 독선이 되지 않도록 경청하는 자세를 잃지 마세요.",
      en: "Your face shows strong authority and leadership. An angular jaw, high nose bridge, and upturned eyes have long been called the 'marks of kings and generals.' You excel at leading organizations and managing people, with the boldness to make decisions in difficult situations. However, don't let authority become arrogance—maintain a listening attitude.",
      zh: "你的面相显示出强烈的权威与领导力。方正的下巴、高挺的鼻梁、上扬的眼角自古被称为'王侯将相之相'。你擅长领导组织、统帅众人，在困难情况下也能做出决断。不过，不要让权威变成独断，保持倾听的姿态。",
      ja: "あなたの顔相は権威とリーダーシップが強く現れています。角張った顎、高い鼻筋、上がった目尻は昔から「王侯将相の相」と呼ばれてきました。組織を率い、人々を統率する能力に優れ、困難な状況でも決断を下せる度胸があります。ただし、権威が独善にならないよう、傾聴する姿勢を忘れないでください。"
    },
    strengths: {
      ko: ["결단력", "통솔력", "카리스마", "위기 대처 능력"],
      en: ["Decisiveness", "Leadership", "Charisma", "Crisis management"],
      zh: ["决断力", "统率力", "魅力", "危机处理能力"],
      ja: ["決断力", "統率力", "カリスマ", "危機対処能力"]
    },
    advice: {
      ko: "높은 자리일수록 겸손해야 합니다. 리더의 진정한 힘은 강압이 아닌, 따르고 싶게 만드는 덕(德)에서 나옵니다.",
      en: "The higher your position, the more humble you should be. A true leader's power comes not from force, but from virtue that makes others want to follow.",
      zh: "地位越高越要谦逊。真正的领袖力量不是来自强压，而是来自让人心服口服的德行。",
      ja: "高い地位にあるほど謙虚でなければなりません。リーダーの真の力は、強制ではなく、従いたくなるような徳から生まれます。"
    },
    luckyColor: "#8B0000",
    luckyDirection: { ko: "남쪽", en: "South", zh: "南方", ja: "南" },
    compatibility: { ko: "지혜상, 부귀상", en: "Wisdom, Wealth types", zh: "智慧相、富贵相", ja: "知恵相、富貴相" },
    emoji: "👑",
    primaryTrait: "leadership"
  },
  {
    id: "charm-artist",
    type: { ko: "매력상", en: "Charm Fortune", zh: "魅力相", ja: "魅力相" },
    title: {
      ko: "사람을 끌어당기는 매력상",
      en: "Irresistibly Charming Fortune",
      zh: "魅力四射",
      ja: "人を惹きつける魅力相"
    },
    subtitle: {
      ko: "예술적 감각과 인기를 겸비한 얼굴",
      en: "A face combining artistic sense with popularity",
      zh: "兼具艺术感与人气的面相",
      ja: "芸術的センスと人気を兼ね備えた顔"
    },
    description: {
      ko: "당신의 관상은 타고난 매력과 인기운이 돋보입니다. 큰 눈, 두툼한 입술, 부드러운 인상은 사람들의 마음을 사로잡는 힘이 있습니다. 예술적 감각이 뛰어나며, 표현력과 소통 능력이 좋아 많은 사람들에게 사랑받습니다. 연예, 예술, 서비스업 등 사람을 상대하는 일에서 크게 빛날 수 있습니다. 다만 외모에만 의존하지 말고 내면도 가꾸세요.",
      en: "Your face shows natural charm and popularity. Large eyes, full lips, and a gentle expression have the power to captivate people's hearts. With excellent artistic sense and great expression and communication skills, you're loved by many. You can shine in entertainment, arts, or service industries. However, don't rely only on appearance—cultivate your inner self too.",
      zh: "你的面相显示出天生的魅力与人气。大眼睛、丰满的嘴唇、温和的表情有俘获人心的力量。你有出色的艺术感和表达沟通能力，受到很多人的喜爱。在演艺、艺术、服务业等与人打交道的工作中可以大放异彩。不过，不要只依赖外表，也要修炼内在。",
      ja: "あなたの顔相は生まれながらの魅力と人気運が際立っています。大きな目、厚い唇、柔らかい印象は人々の心を掴む力があります。芸術的センスに優れ、表現力とコミュニケーション能力が高く、多くの人に愛されます。芸能、芸術、サービス業など人と接する仕事で大きく輝けるでしょう。ただし、外見だけに頼らず、内面も磨いてください。"
    },
    strengths: {
      ko: ["대인 관계", "예술적 감각", "표현력", "소통 능력"],
      en: ["Interpersonal skills", "Artistic sense", "Expressiveness", "Communication"],
      zh: ["人际关系", "艺术感", "表达力", "沟通能力"],
      ja: ["対人関係", "芸術的センス", "表現力", "コミュニケーション能力"]
    },
    advice: {
      ko: "겉모습의 아름다움은 시간이 지나면 바래지만, 내면의 아름다움은 나이가 들수록 빛납니다. 진정한 매력은 마음에서 우러나옵니다.",
      en: "Outer beauty fades with time, but inner beauty shines brighter with age. True charm comes from within the heart.",
      zh: "外表的美丽会随时间褪色，但内在的美丽会随年龄增长而闪耀。真正的魅力来自内心。",
      ja: "外見の美しさは時間とともに薄れますが、内面の美しさは年を重ねるほど輝きます。真の魅力は心から湧き出るものです。"
    },
    luckyColor: "#FF69B4",
    luckyDirection: { ko: "동쪽", en: "East", zh: "东方", ja: "東" },
    compatibility: { ko: "복록상, 지혜상", en: "Fortune, Wisdom types", zh: "福禄相、智慧相", ja: "福禄相、知恵相" },
    emoji: "🌟",
    primaryTrait: "charm"
  },
  {
    id: "health-longevity",
    type: { ko: "건강상", en: "Health Fortune", zh: "健康相", ja: "健康相" },
    title: {
      ko: "장수와 건강을 타고난 건강상",
      en: "Born with Longevity and Health",
      zh: "天生健康长寿",
      ja: "長寿と健康を持って生まれた健康相"
    },
    subtitle: {
      ko: "튼튼한 체력과 생명력이 넘치는 얼굴",
      en: "A face overflowing with robust vitality",
      zh: "充满强健体力与生命力的面相",
      ja: "丈夫な体力と生命力に溢れる顔"
    },
    description: {
      ko: "당신의 관상은 건강과 장수의 기운이 가득합니다. 사각형 얼굴, 넓은 콧방울, 각진 턱은 체력이 좋고 생명력이 강한 상입니다. 질병에 잘 걸리지 않으며, 회복력도 빠릅니다. 활동적이고 에너지가 넘치며, 실천력이 뛰어납니다. 다만 과로하지 않도록 휴식과 일의 균형을 잘 맞추고, 건강을 과신하지 마세요.",
      en: "Your face is full of health and longevity energy. A square face, wide nostrils, and angular jaw indicate good stamina and strong vitality. You rarely get sick and recover quickly. Active and full of energy, you excel at taking action. However, balance rest and work to avoid overexertion, and don't take your health for granted.",
      zh: "你的面相充满健康与长寿的气息。方脸、宽鼻翼、方下巴表示体力好、生命力强。你不容易生病，恢复力也快。活跃而充满能量，行动力出色。不过要注意休息与工作的平衡，不要过度劳累，也不要过于相信自己的健康。",
      ja: "あなたの顔相は健康と長寿の気に満ちています。四角い顔、広い小鼻、角張った顎は体力が良く生命力が強い相です。病気にかかりにくく、回復も早いです。活動的でエネルギーに溢れ、実行力に優れています。ただし、過労しないよう休息と仕事のバランスを取り、健康を過信しないでください。"
    },
    strengths: {
      ko: ["강한 체력", "회복력", "실천력", "지구력"],
      en: ["Strong stamina", "Recovery power", "Action-oriented", "Endurance"],
      zh: ["强健的体力", "恢复力", "行动力", "耐力"],
      ja: ["強い体力", "回復力", "実践力", "持久力"]
    },
    advice: {
      ko: "건강은 가장 큰 재산입니다. 지금의 건강함에 감사하며, 규칙적인 생활과 적절한 운동으로 이 복을 오래 유지하세요.",
      en: "Health is the greatest wealth. Be grateful for your current health and maintain it through regular living and appropriate exercise.",
      zh: "健康是最大的财富。感恩现在的健康，通过规律的生活和适当的运动来长久保持这份福气。",
      ja: "健康は最大の財産です。今の健康に感謝し、規則的な生活と適度な運動でこの福を長く維持してください。"
    },
    luckyColor: "#228B22",
    luckyDirection: { ko: "동남쪽", en: "Southeast", zh: "东南方", ja: "東南" },
    compatibility: { ko: "부귀상, 복록상", en: "Wealth, Fortune types", zh: "富贵相、福禄相", ja: "富貴相、福禄相" },
    emoji: "💪",
    primaryTrait: "health"
  },
  {
    id: "fortune-blessing",
    type: { ko: "복록상", en: "Blessing Fortune", zh: "福禄相", ja: "福禄相" },
    title: {
      ko: "하늘이 내린 복을 받은 복록상",
      en: "Blessed by Heaven",
      zh: "天赐福禄",
      ja: "天が授けた福を受けた福禄相"
    },
    subtitle: {
      ko: "만사형통, 복이 따르는 얼굴",
      en: "A face where everything goes well and fortune follows",
      zh: "万事亨通、福气相随的面相",
      ja: "万事順調、福が付いて回る顔"
    },
    description: {
      ko: "당신의 관상은 타고난 복과 행운이 함께합니다. 둥근 얼굴, 올라간 입꼬리, 내려간 눈꼬리의 순한 인상은 예로부터 복상(福相)이라 불렸습니다. 큰 노력 없이도 좋은 기회가 찾아오고, 귀인(貴人)의 도움을 받기 쉽습니다. 사람들이 당신과 함께 있으면 편안함을 느끼며, 자연스럽게 인복(人福)도 따릅니다. 이 복을 나누는 마음을 가지면 더 큰 복이 됩니다.",
      en: "Your face comes with natural blessings and luck. A round face, upturned mouth corners, and gentle downturned eyes have long been called a 'blessed face.' Good opportunities come without much effort, and help from benefactors comes easily. People feel comfortable around you, and you naturally attract good relationships. Sharing these blessings brings even greater fortune.",
      zh: "你的面相带有天生的福气与好运。圆脸、上扬的嘴角、下垂眼角的温和印象自古被称为'福相'。不需太多努力就会有好机会降临，容易得到贵人相助。人们和你在一起感到舒适，自然也有人缘福。如果懂得分享这份福气，会获得更大的福分。",
      ja: "あなたの顔相には生まれながらの福と幸運が伴っています。丸い顔、上がった口角、下がった目尻の穏やかな印象は昔から「福相」と呼ばれてきました。大きな努力なしに良い機会が訪れ、貴人の助けを受けやすいです。人々はあなたと一緒にいると安心感を覚え、自然と人徳も付いてきます。この福を分かち合う心を持てば、さらに大きな福となります。"
    },
    strengths: {
      ko: ["행운", "인복", "편안한 분위기", "긍정적 에너지"],
      en: ["Good luck", "People fortune", "Comfortable presence", "Positive energy"],
      zh: ["好运", "人缘福", "让人舒适的氛围", "正能量"],
      ja: ["幸運", "人徳", "心地よい雰囲気", "ポジティブなエネルギー"]
    },
    advice: {
      ko: "복은 나눌수록 커집니다. 당신이 받은 행운을 주변과 나누며, 함께 행복해지는 삶을 살아보세요.",
      en: "Blessings grow when shared. Share the luck you've received with those around you and live a life of collective happiness.",
      zh: "福气越分享越大。把你得到的好运与周围的人分享，过一种共同幸福的生活。",
      ja: "福は分かち合うほど大きくなります。あなたが受けた幸運を周りと分かち合い、一緒に幸せになる人生を歩んでみてください。"
    },
    luckyColor: "#FFD700",
    luckyDirection: { ko: "중앙", en: "Center", zh: "中央", ja: "中央" },
    compatibility: { ko: "매력상, 부귀상", en: "Charm, Wealth types", zh: "魅力相、富贵相", ja: "魅力相、富貴相" },
    emoji: "🍀",
    primaryTrait: "fortune"
  }
];

// 결과 계산 함수
export function calculateFaceReading(selections: Record<string, string>): FaceReadingResult {
  // 모든 선택의 trait 점수 합산
  const totalTraits = {
    wealth: 0,
    wisdom: 0,
    leadership: 0,
    charm: 0,
    health: 0,
    fortune: 0
  };

  faceFeatures.forEach(feature => {
    const selectedOptionId = selections[feature.id];
    const selectedOption = feature.options.find(opt => opt.id === selectedOptionId);
    if (selectedOption) {
      Object.keys(totalTraits).forEach(trait => {
        totalTraits[trait as keyof typeof totalTraits] += selectedOption.traits[trait as keyof typeof selectedOption.traits];
      });
    }
  });

  // 가장 높은 trait 찾기
  let maxTrait: keyof typeof totalTraits = 'fortune';
  let maxValue = totalTraits.fortune;

  Object.entries(totalTraits).forEach(([trait, value]) => {
    if (value > maxValue) {
      maxValue = value;
      maxTrait = trait as keyof typeof totalTraits;
    }
  });

  // 해당 trait의 결과 반환
  const result = faceReadingResults.find(r => r.primaryTrait === maxTrait);
  return result || faceReadingResults[5]; // 기본값: 복록상
}

// 부위별 해석 텍스트
export const featureInterpretations: Record<string, Record<string, Record<string, string>>> = {
  "face-shape": {
    "round": {
      ko: "둥근 얼굴은 복을 담는 그릇이 넉넉함을 의미합니다. 재물운과 인복이 좋으며, 사람들에게 편안한 인상을 줍니다.",
      en: "A round face signifies a generous vessel for blessings. Good fortune in wealth and relationships, giving a comfortable impression to others.",
      zh: "圆脸意味着福气的容器宽大。财运和人缘好，给人舒适的印象。",
      ja: "丸顔は福を入れる器が大きいことを意味します。財運と人徳が良く、人々に安心感を与えます。"
    },
    "oval": {
      ko: "타원형 얼굴은 가장 조화로운 상입니다. 모든 운이 균형있게 발달하며, 특히 대인관계에서 강점을 보입니다.",
      en: "An oval face is the most harmonious shape. All fortunes develop in balance, with particular strength in interpersonal relationships.",
      zh: "椭圆形脸是最和谐的面相。所有运势均衡发展，尤其在人际关系方面有优势。",
      ja: "卵型の顔は最も調和のとれた相です。すべての運がバランスよく発達し、特に対人関係で強みを発揮します。"
    },
    "square": {
      ko: "사각형 얼굴은 의지와 끈기가 강함을 나타냅니다. 리더십과 건강운이 좋으며, 목표를 향해 꾸준히 나아갑니다.",
      en: "A square face indicates strong will and perseverance. Good leadership and health fortune, steadily moving toward goals.",
      zh: "方脸表示意志力和毅力强。领导力和健康运好，能坚定地朝目标前进。",
      ja: "四角い顔は意志と粘り強さが強いことを示します。リーダーシップと健康運が良く、目標に向かって着実に進みます。"
    },
    "inverted-triangle": {
      ko: "역삼각형 얼굴은 지적이고 예민한 감각을 가졌음을 의미합니다. 창의력과 분석력이 뛰어나며, 학문에 재능이 있습니다.",
      en: "A heart-shaped face signifies intellectual and sensitive nature. Excellent creativity and analytical skills, with talent in academics.",
      zh: "心形脸意味着聪明和敏锐的感觉。创造力和分析能力出色，有学术天赋。",
      ja: "逆三角形の顔は知的で鋭敏な感覚を持っていることを意味します。創造力と分析力に優れ、学問に才能があります。"
    },
    "long": {
      ko: "긴 얼굴은 사려깊고 신중한 성격을 나타냅니다. 학자나 전문가의 상으로, 깊은 생각과 연구에 적합합니다.",
      en: "A long face indicates a thoughtful and cautious personality. Suited for scholars or experts, ideal for deep thinking and research.",
      zh: "长脸表示深思熟虑、谨慎的性格。是学者或专家的面相，适合深度思考和研究。",
      ja: "長い顔は思慮深く慎重な性格を示します。学者や専門家の相で、深い思考と研究に適しています。"
    }
  }
};

