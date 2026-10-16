// 관상 테스트 데이터
// 마의상서(麻衣相書), 신상전편(神相全篇) 등 동양 관상학 문헌 기반

import { faceReadingTypes } from "./face-reading-types";

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
  /** "wealth-health" 처럼 1등-2등 성향 키를 이어 붙인 id. 그림 파일 이름(public/face-reading/{id}.png)으로도 쓴다 */
  id: string;
  /** 1등 성향 */
  primaryTrait: keyof FaceOption["traits"];
  /** 2등 성향 */
  secondaryTrait: keyof FaceOption["traits"];
  /** 유형 이름 한자 (예: 富貴長壽相) */
  hanja: string;
  /** 유형 이름 (예: 부귀장수상) */
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

// =====================================================================
// 2026-10 리뉴얼에서 추가된 데이터
// - 운세 항목(성향) 이름·등급 문장
// - 부위별(옵션별) 한 줄 풀이
// - 점수 계산 유틸 (결과 화면의 "한눈에 보는 운세" 별 등급에 사용)
// =====================================================================

/** 성향(운세 항목) 키 */
export type TraitKey = keyof FaceOption["traits"];

/** 성향별 합산 점수 */
export type TraitScores = Record<TraitKey, number>;

/** 4개 언어 텍스트 */
export type LocalizedText = Record<string, string>;

/** 결과 화면에 보여줄 운세 항목 순서 */
export const traitOrder: TraitKey[] = ["wealth", "wisdom", "leadership", "charm", "health", "fortune"];

/** 운세 항목 이름과 그림 */
export const traitInfo: Record<TraitKey, { label: LocalizedText; emoji: string }> = {
  wealth: { label: { ko: "재물운", en: "Wealth", zh: "财运", ja: "財運" }, emoji: "💰" },
  wisdom: { label: { ko: "지혜운", en: "Wisdom", zh: "智慧运", ja: "知恵運" }, emoji: "📖" },
  leadership: { label: { ko: "출세운", en: "Success", zh: "官运", ja: "出世運" }, emoji: "👑" },
  charm: { label: { ko: "인덕", en: "Relationships", zh: "人缘", ja: "人徳" }, emoji: "🤝" },
  health: { label: { ko: "건강운", en: "Health", zh: "健康运", ja: "健康運" }, emoji: "💪" },
  fortune: { label: { ko: "복운", en: "Luck", zh: "福气", ja: "福運" }, emoji: "🍀" },
};

/** 등급(1~5)별 이름 — 별 개수와 함께 글로도 표시해 색·기호만으로 전달하지 않는다 */
export const levelNames: LocalizedText[] = [
  { ko: "", en: "", zh: "", ja: "" },
  { ko: "차분함", en: "Calm", zh: "平稳", ja: "穏やか" },
  { ko: "보통", en: "Fair", zh: "一般", ja: "普通" },
  { ko: "좋음", en: "Good", zh: "良好", ja: "良い" },
  { ko: "아주 좋음", en: "Very good", zh: "很好", ja: "とても良い" },
  { ko: "최고", en: "Excellent", zh: "极佳", ja: "最高" },
];

/** 운세 항목 × 등급별 짧은 풀이 문장 (등급 1~5, 0번은 비어 있음) */
export const traitLevelTexts: Record<TraitKey, LocalizedText[]> = {
  wealth: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "큰돈보다는 꾸준한 살림이 어울리는 상입니다. 아끼는 습관이 재산이 됩니다.", en: "Steady saving suits you better than big gambles. Thrift becomes your wealth.", zh: "比起大钱，更适合细水长流。节俭就是你的财富。", ja: "大金よりも堅実な暮らしが似合う相です。倹約の習慣が財産になります。" },
    { ko: "들어오는 만큼 나가는 보통의 재물운입니다. 작은 저축이 쌓여 든든해집니다.", en: "An ordinary wealth fortune where money comes and goes. Small savings add up.", zh: "财运平平，有进有出。小小的积蓄会越攒越多。", ja: "入った分だけ出ていく普通の財運です。小さな貯蓄が積み重なって心強くなります。" },
    { ko: "먹고 사는 걱정은 덜한 상입니다. 중년 이후 살림이 점점 넉넉해집니다.", en: "Little worry about livelihood. Life grows more comfortable after middle age.", zh: "不必为生计发愁的面相。中年以后生活越来越宽裕。", ja: "暮らしの心配が少ない相です。中年以降、家計がだんだん豊かになります。" },
    { ko: "재물이 잘 모이는 상입니다. 부동산이나 꾸준한 사업에서 복이 따릅니다.", en: "Wealth gathers easily. Property and steady business bring fortune.", zh: "聚财的面相。房产或稳定的生意会带来福气。", ja: "財がよく集まる相です。不動産や堅実な事業に福が伴います。" },
    { ko: "타고난 부자의 상입니다. 들어온 복을 주변과 나누면 더 큰 재물이 돌아옵니다.", en: "A born-wealthy face. Share your blessings and even greater fortune returns.", zh: "天生富贵之相。把福气分给身边人，会有更大的财富回报。", ja: "生まれつきの富者の相です。得た福を周りと分かち合えば、より大きな財が戻ってきます。" },
  ],
  wisdom: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "머리보다 몸으로 익히는 분입니다. 직접 해 본 경험이 가장 큰 지혜가 됩니다.", en: "You learn by doing rather than thinking. Experience is your greatest wisdom.", zh: "更擅长用身体学习。亲身经历是最大的智慧。", ja: "頭より体で覚える方です。実際にやってみた経験が最大の知恵になります。" },
    { ko: "실생활의 지혜가 있는 상입니다. 어려운 이론보다 살아온 경험을 믿으세요.", en: "Practical, everyday wisdom. Trust your lived experience over theory.", zh: "有生活智慧的面相。相信经验胜过艰深的理论。", ja: "実生活の知恵がある相です。難しい理論より生きてきた経験を信じてください。" },
    { ko: "배우기를 좋아하고 판단이 빠른 상입니다. 새로운 것을 익히는 데 늦은 나이란 없습니다.", en: "You love learning and judge quickly. It is never too late to learn something new.", zh: "好学且判断迅速的面相。学习新事物永远不嫌晚。", ja: "学ぶことが好きで判断が早い相です。新しいことを覚えるのに遅すぎる年齢はありません。" },
    { ko: "생각이 깊고 통찰력이 있는 상입니다. 주변 사람들이 조언을 구하러 찾아옵니다.", en: "Deep thought and insight. People come to you for advice.", zh: "思虑深远、有洞察力的面相。身边的人会来向你请教。", ja: "考えが深く洞察力のある相です。周りの人が助言を求めて訪ねてきます。" },
    { ko: "학자의 상입니다. 평생 배움이 끊이지 않고, 아는 것을 나눌수록 복이 커집니다.", en: "A scholar's face. Learning never stops, and sharing knowledge multiplies your fortune.", zh: "学者之相。一生学习不断，分享所知福气越大。", ja: "学者の相です。生涯学びが絶えず、知識を分かち合うほど福が大きくなります。" },
  ],
  leadership: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "앞에 나서기보다 뒤에서 받쳐 주는 상입니다. 든든한 조력자로 사랑받습니다.", en: "You support from behind rather than lead from the front. A beloved helper.", zh: "不爱出头，擅长在幕后支持。是受人喜爱的得力助手。", ja: "前に出るより後ろで支える相です。頼もしい協力者として愛されます。" },
    { ko: "자기 몫을 묵묵히 해내는 상입니다. 작은 모임에서 믿음직한 사람으로 통합니다.", en: "You quietly do your part. Known as the reliable one in small groups.", zh: "默默做好本分的面相。在小团体中是值得信赖的人。", ja: "自分の役目を黙々とこなす相です。小さな集まりで信頼できる人として通ります。" },
    { ko: "사람들이 자연스럽게 따르는 상입니다. 맡은 자리에서 인정받고 승진운이 있습니다.", en: "People naturally follow you. Recognized in your role, with promotion luck.", zh: "人们自然而然追随你。在岗位上受到认可，有晋升运。", ja: "人が自然とついてくる相です。任された場で認められ、昇進運があります。" },
    { ko: "조직을 이끄는 지도자의 상입니다. 결단력이 있어 어려운 일도 끝까지 해냅니다.", en: "A leader's face. Decisive, you see hard tasks through to the end.", zh: "带领组织的领导者之相。有决断力，困难的事也能坚持到底。", ja: "組織を率いる指導者の相です。決断力があり、難しいことも最後までやり遂げます。" },
    { ko: "옛말로 왕후장상의 상입니다. 높은 자리에 오를수록 겸손하면 명예가 오래갑니다.", en: "The face of kings and generals, as the old texts say. Stay humble and your honor endures.", zh: "古书所说的王侯将相之相。位高而谦逊，名誉长久。", ja: "古くから王侯将相の相と言われます。高い地位ほど謙虚であれば名誉が長く続きます。" },
  ],
  charm: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "넓게 사귀기보다 몇 사람과 깊게 지내는 상입니다. 오래된 인연을 소중히 하세요.", en: "A few deep friendships over many. Cherish long-standing bonds.", zh: "不广交而深交的面相。珍惜老交情。", ja: "広く付き合うより数人と深く付き合う相です。古い縁を大切にしてください。" },
    { ko: "조용하지만 진실한 인덕이 있습니다. 한번 맺은 인연이 오래 갑니다.", en: "Quiet but sincere charm. Bonds you form last a long time.", zh: "安静却真诚的人缘。结下的缘分长久。", ja: "静かですが誠実な人徳があります。一度結んだ縁が長く続きます。" },
    { ko: "사람들이 편안하게 느끼는 상입니다. 가는 곳마다 좋은 이웃을 만납니다.", en: "People feel at ease with you. Good neighbors wherever you go.", zh: "让人感到自在的面相。走到哪里都遇到好邻居。", ja: "人が安心感を覚える相です。行く先々で良い隣人に出会います。" },
    { ko: "인기가 많고 인덕이 두터운 상입니다. 자녀와 손주 복도 좋습니다.", en: "Popular, with thick relationship fortune. Blessed with children and grandchildren too.", zh: "人气旺、人缘厚的面相。儿孙福也好。", ja: "人気があり人徳の厚い相です。子や孫の福にも恵まれます。" },
    { ko: "귀인이 끊이지 않는 상입니다. 어려울 때마다 도와주는 사람이 나타납니다.", en: "Benefactors never run out. Someone always appears to help in hard times.", zh: "贵人不断的面相。每逢困难都有人相助。", ja: "貴人が絶えない相です。困ったときには必ず助けてくれる人が現れます。" },
  ],
  health: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "몸이 보내는 신호에 귀 기울이면 좋은 상입니다. 무리하지 말고 쉬엄쉬엄 가세요.", en: "Listen to your body's signals. Take it easy and rest often.", zh: "宜多留意身体信号的面相。别勉强，慢慢来。", ja: "体のサインに耳を傾けると良い相です。無理せずゆっくり進んでください。" },
    { ko: "규칙적인 생활이 보약인 상입니다. 가벼운 산책이 큰 힘이 됩니다.", en: "Regular routine is your best medicine. Light walks do wonders.", zh: "规律生活就是补药的面相。轻松散步大有益处。", ja: "規則正しい生活が何よりの薬になる相です。軽い散歩が大きな力になります。" },
    { ko: "잔병이 적고 회복이 빠른 상입니다. 꾸준히 움직이면 오래 건강합니다.", en: "Few minor illnesses and quick recovery. Keep moving to stay healthy long.", zh: "小病少、恢复快的面相。坚持活动能长久健康。", ja: "小さな病気が少なく回復が早い相です。こまめに動けば長く健康でいられます。" },
    { ko: "체력이 좋고 생명력이 강한 상입니다. 나이보다 젊어 보인다는 말을 자주 듣습니다.", en: "Strong stamina and vitality. People often say you look younger than your age.", zh: "体力好、生命力强的面相。常被说比实际年龄年轻。", ja: "体力があり生命力の強い相です。年齢より若く見えるとよく言われます。" },
    { ko: "장수의 상입니다. 건강을 과신하지 말고 지금처럼 돌보면 백세까지 거뜬합니다.", en: "A face of longevity. Keep caring for your health and a hundred years is within reach.", zh: "长寿之相。不要过于自信，像现在这样保养可活到百岁。", ja: "長寿の相です。健康を過信せず今のように労われば百歳まで元気です。" },
  ],
  fortune: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "스스로 일군 것이 복이 되는 상입니다. 노력한 만큼 정직하게 돌아옵니다.", en: "What you build yourself becomes your blessing. Effort returns honestly.", zh: "自己打拼出来的才是福的面相。付出多少就诚实回报多少。", ja: "自分で築いたものが福になる相です。努力した分だけ正直に返ってきます。" },
    { ko: "큰 굴곡 없이 평탄한 복운입니다. 소소한 행복이 오래 이어집니다.", en: "Smooth, even luck without big ups and downs. Small joys last long.", zh: "没有大起大落的平稳福运。小小的幸福长久延续。", ja: "大きな起伏のない穏やかな福運です。ささやかな幸せが長く続きます。" },
    { ko: "늦복이 있는 상입니다. 나이가 들수록 좋은 일이 많아집니다.", en: "Late-blooming luck. Good things multiply as you age.", zh: "有晚福的面相。年纪越大好事越多。", ja: "遅咲きの福がある相です。年を重ねるほど良いことが増えます。" },
    { ko: "복을 담는 그릇이 넉넉한 상입니다. 뜻밖의 좋은 소식이 자주 찾아옵니다.", en: "A generous vessel for blessings. Unexpected good news visits often.", zh: "盛福的容器宽大的面相。常有意外的好消息。", ja: "福を入れる器が大きい相です。思いがけない良い知らせがよく訪れます。" },
    { ko: "하늘이 내린 복상입니다. 만사가 순조로우니 그 복을 나누면 더 커집니다.", en: "A heaven-sent blessed face. All goes smoothly; share it and it grows.", zh: "天赐福相。万事顺遂，分享福气会更大。", ja: "天が授けた福相です。万事順調なので、その福を分ければさらに大きくなります。" },
  ],
};

/** 부위별(옵션별) 한 줄 풀이 — 결과 화면 "부위별 풀이"에 사용 */
export const optionReadings: Record<string, Record<string, LocalizedText>> = {
  "face-shape": {
    round: { ko: "둥근 얼굴은 복을 담는 그릇이 넉넉한 상입니다. 재물과 사람이 함께 모입니다.", en: "A round face is a generous vessel for blessings; wealth and people gather around you.", zh: "圆脸是盛福的容器宽大之相，财与人一起汇聚。", ja: "丸顔は福を入れる器が大きい相です。財と人が一緒に集まります。" },
    oval: { ko: "계란형 얼굴은 가장 조화로운 상입니다. 모든 운이 고르게 발달합니다.", en: "An oval face is the most harmonious; every fortune develops evenly.", zh: "鹅蛋脸是最和谐的面相，各运均衡发展。", ja: "卵型の顔は最も調和のとれた相です。すべての運が均等に育ちます。" },
    square: { ko: "각진 얼굴은 의지와 끈기가 강한 상입니다. 한번 마음먹은 일은 끝까지 해냅니다.", en: "A square face shows strong will and persistence; you finish what you start.", zh: "方脸是意志坚定、有毅力之相，下定决心的事一定做到。", ja: "四角い顔は意志と粘り強さの強い相です。決めたことは最後までやり遂げます。" },
    "inverted-triangle": { ko: "이마가 넓고 턱이 갸름한 얼굴은 머리가 좋은 상입니다. 생각이 빠르고 감각이 예민합니다.", en: "A wide forehead and slim chin mark a bright mind; quick thinking and keen senses.", zh: "额宽下巴尖是聪明之相，思维敏捷、感觉敏锐。", ja: "額が広く顎が細い顔は頭の良い相です。考えが早く感覚が鋭いです。" },
    long: { ko: "긴 얼굴은 사려 깊고 신중한 상입니다. 한 분야를 깊이 파는 전문가의 얼굴입니다.", en: "A long face is thoughtful and careful; the face of a specialist who digs deep.", zh: "长脸是深思熟虑之相，是钻研一个领域的专家面相。", ja: "長い顔は思慮深く慎重な相です。一つの分野を深く究める専門家の顔です。" },
  },
  forehead: {
    "wide-high": { ko: "넓고 높은 이마는 초년운과 관운이 좋은 상입니다. 윗사람의 도움을 받습니다.", en: "A wide, high forehead brings good early-life and career luck, with help from elders.", zh: "额头宽高是早年运与官运好之相，得长辈相助。", ja: "広く高い額は若い頃の運と官運が良い相です。目上の人の助けを受けます。" },
    "narrow-low": { ko: "좁은 이마는 스스로 길을 개척하는 상입니다. 늦게 피는 꽃처럼 중년 이후가 좋습니다.", en: "A narrow forehead means you carve your own path; like a late bloom, life improves after midlife.", zh: "额头窄是自己开路之相，像晚开的花，中年以后更好。", ja: "狭い額は自分で道を切り開く相です。遅咲きの花のように中年以降が良くなります。" },
    rounded: { ko: "볼록한 이마는 복이 들어오는 상입니다. 기억력이 좋고 인덕이 있습니다.", en: "A rounded forehead invites blessings; good memory and warm relationships.", zh: "饱满的额头是福气进门之相，记性好、有人缘。", ja: "丸みのある額は福が入ってくる相です。記憶力が良く人徳があります。" },
    flat: { ko: "평평한 이마는 성실하고 반듯한 상입니다. 꾸준함으로 신뢰를 얻습니다.", en: "A flat forehead is sincere and upright; steadiness earns you trust.", zh: "平整的额头是诚实端正之相，以坚持赢得信任。", ja: "平らな額は誠実で真っ直ぐな相です。地道さで信頼を得ます。" },
  },
  eyes: {
    "large-round": { ko: "크고 둥근 눈은 마음이 맑고 정이 많은 상입니다. 사람들이 쉽게 마음을 엽니다.", en: "Large, round eyes show a clear heart and warmth; people open up to you easily.", zh: "大而圆的眼睛是心地清澈、重情之相，人们容易敞开心扉。", ja: "大きく丸い目は心が澄んで情の深い相です。人がすぐ心を開きます。" },
    "small-sharp": { ko: "작고 날카로운 눈은 관찰력이 뛰어난 상입니다. 손해 보는 일이 적습니다.", en: "Small, sharp eyes show keen observation; you rarely lose out.", zh: "小而锐利的眼睛是观察力强之相，很少吃亏。", ja: "小さく鋭い目は観察力に優れた相です。損をすることが少ないです。" },
    upturned: { ko: "올라간 눈꼬리는 기운이 강하고 적극적인 상입니다. 승부에서 이기는 힘이 있습니다.", en: "Upturned eyes are energetic and assertive, with the strength to win.", zh: "上扬的眼角是气势强、积极之相，有胜出的力量。", ja: "上がった目尻は気が強く積極的な相です。勝負に勝つ力があります。" },
    downturned: { ko: "내려간 눈꼬리는 순하고 복이 많은 상입니다. 다툼이 적고 주변이 평안합니다.", en: "Downturned eyes are gentle and blessed; few quarrels and a peaceful circle.", zh: "下垂的眼角是温顺有福之相，少争执、周围安宁。", ja: "下がった目尻は穏やかで福の多い相です。争いが少なく周りが平安です。" },
    phoenix: { ko: "길고 가는 봉황눈은 예로부터 귀한 상입니다. 지혜와 명예가 따릅니다.", en: "Long, narrow phoenix eyes have long been considered noble; wisdom and honor follow.", zh: "细长的凤眼自古是贵相，智慧与名誉相随。", ja: "細長い鳳眼は昔から貴い相です。知恵と名誉が伴います。" },
  },
  nose: {
    "high-straight": { ko: "높고 곧은 코는 자존심과 추진력이 강한 상입니다. 중년에 크게 일어섭니다.", en: "A high, straight nose shows pride and drive; you rise strongly in midlife.", zh: "高挺的鼻子是自尊与推动力强之相，中年大起。", ja: "高くまっすぐな鼻は自尊心と推進力の強い相です。中年に大きく立ち上がります。" },
    "wide-fleshy": { ko: "콧방울이 넓은 코는 재물 창고가 큰 상입니다. 먹을 복과 돈복이 함께합니다.", en: "Wide nostrils mean a large treasury; blessings of food and money come together.", zh: "鼻翼宽是财库大之相，食禄与财运并存。", ja: "小鼻の広い鼻は財の蔵が大きい相です。食の福と金運が一緒に来ます。" },
    aquiline: { ko: "매부리코는 사업 수완이 뛰어난 상입니다. 기회를 보는 눈이 밝습니다.", en: "An aquiline nose shows sharp business sense; you spot opportunities quickly.", zh: "鹰钩鼻是生意手腕出众之相，眼光独到。", ja: "鷲鼻は商才に優れた相です。機会を見る目が確かです。" },
    "small-delicate": { ko: "작고 오똑한 코는 섬세하고 인기가 많은 상입니다. 예술 감각이 뛰어납니다.", en: "A small, delicate nose is refined and popular, with a fine artistic sense.", zh: "小巧挺翘的鼻子是细腻有人气之相，艺术感出众。", ja: "小さく整った鼻は繊細で人気のある相です。芸術的センスに優れます。" },
    button: { ko: "낮고 동그란 코는 마음이 너그러운 상입니다. 사람 복과 먹을 복이 있습니다.", en: "A low, round nose is generous-hearted; blessed with people and plenty.", zh: "低而圆的鼻子是心胸宽厚之相，有人福与食福。", ja: "低く丸い鼻は心の広い相です。人の福と食の福があります。" },
  },
  mouth: {
    "large-full": { ko: "크고 두툼한 입은 정이 많고 복이 큰 상입니다. 말년이 넉넉합니다.", en: "A large, full mouth is affectionate and richly blessed; a comfortable later life.", zh: "大而厚的嘴是重情、福大之相，晚年宽裕。", ja: "大きく厚い口は情が深く福の大きい相です。晩年が豊かです。" },
    "small-thin": { ko: "작고 얇은 입은 말이 신중하고 야무진 상입니다. 살림을 알뜰하게 꾸립니다.", en: "A small, thin mouth is careful with words and capable; you keep house thriftily.", zh: "小而薄的嘴是言语谨慎、精明之相，持家节俭。", ja: "小さく薄い口は言葉が慎重でしっかりした相です。家計を堅実に営みます。" },
    "upturned-corners": { ko: "올라간 입꼬리는 복이 들어오는 입입니다. 웃는 얼굴에 좋은 일이 따릅니다.", en: "Upturned corners welcome blessings; good things follow a smiling face.", zh: "上扬的嘴角是福气入口之相，笑脸迎好事。", ja: "上がった口角は福が入ってくる口です。笑顔に良いことが伴います。" },
    "downturned-corners": { ko: "내려간 입꼬리는 생각이 깊고 진지한 상입니다. 자주 웃으면 복이 배로 늘어납니다.", en: "Downturned corners are thoughtful and serious; smile often and blessings double.", zh: "下垂的嘴角是思虑深、认真之相，常笑则福倍增。", ja: "下がった口角は考えが深く真面目な相です。よく笑えば福が倍に増えます。" },
    "bow-shaped": { ko: "활 모양 입술은 표현력이 뛰어나고 매력 있는 상입니다. 말로 사람을 얻습니다.", en: "Bow-shaped lips are expressive and charming; you win people with your words.", zh: "弓形嘴唇是表达力强、有魅力之相，以言语得人心。", ja: "弓型の唇は表現力に優れ魅力のある相です。言葉で人を得ます。" },
  },
  chin: {
    round: { ko: "둥근 턱은 말년운이 좋은 상입니다. 자녀와 손주의 효도를 받습니다.", en: "A round chin brings good fortune in later life, with devoted children and grandchildren.", zh: "圆下巴是晚年运好之相，享儿孙孝顺。", ja: "丸い顎は晩年運の良い相です。子や孫から孝行を受けます。" },
    pointed: { ko: "뾰족한 턱은 감수성이 풍부한 상입니다. 예술과 창작에 재능이 있습니다.", en: "A pointed chin is sensitive and creative, with talent for the arts.", zh: "尖下巴是感性丰富之相，有艺术与创作才能。", ja: "尖った顎は感受性豊かな相です。芸術や創作に才能があります。" },
    square: { ko: "각진 턱은 체력과 의지가 강한 상입니다. 끝까지 버티는 힘이 있습니다.", en: "A square chin shows strong stamina and will; you have the power to endure.", zh: "方下巴是体力与意志强之相，有坚持到底的力量。", ja: "角張った顎は体力と意志の強い相です。最後まで耐える力があります。" },
    double: { ko: "살집 있는 턱은 말년에 재물이 쌓이는 복상입니다. 노후가 편안합니다.", en: "A full chin is a blessed face where wealth builds in later years; a comfortable old age.", zh: "丰满的下巴是晚年聚财的福相，老年安逸。", ja: "肉付きの良い顎は晩年に財が積もる福相です。老後が安らかです。" },
    cleft: { ko: "가운데가 갈라진 턱은 열정과 끈기가 남다른 상입니다. 한 우물을 파면 크게 이룹니다.", en: "A cleft chin shows rare passion and persistence; dig one well and you achieve greatly.", zh: "中间有凹的下巴是热情与毅力非凡之相，专注一事必有大成。", ja: "真ん中が割れた顎は情熱と粘り強さが際立つ相です。一つのことを究めれば大成します。" },
  },
};

/** 선택한 옵션들의 성향 점수를 합산한다 (각 항목 0~12점) */
export function calculateTraitScores(selections: Record<string, string>): TraitScores {
  const total: TraitScores = { wealth: 0, wisdom: 0, leadership: 0, charm: 0, health: 0, fortune: 0 };
  faceFeatures.forEach((feature) => {
    const option = feature.options.find((opt) => opt.id === selections[feature.id]);
    if (!option) return;
    traitOrder.forEach((trait) => {
      total[trait] += option.traits[trait];
    });
  });
  return total;
}

/** 합산 점수를 별 등급(1~5)으로 바꾼다. 옵션 하나당 최대 2점이므로 8점 이상이면 최고 */
export function scoreToLevel(score: number): number {
  if (score >= 8) return 5;
  if (score >= 6) return 4;
  if (score >= 4) return 3;
  if (score >= 2) return 2;
  return 1;
}

/** 특정 부위에서 고른 옵션 객체를 돌려준다 (없으면 undefined) */
export function getSelectedOption(featureId: string, selections: Record<string, string>): FaceOption | undefined {
  const feature = faceFeatures.find((f) => f.id === featureId);
  return feature?.options.find((opt) => opt.id === selections[featureId]);
}

// =====================================================================
// 결과 유형 30종과 판정
// - 유형 데이터는 src/data/face-reading-types/ 아래 성향별 파일에 있다
// - 판정: 성향별 점수를 "그 성향이 보통 얼마나 나오는지"로 정규화(z 점수)한 뒤
//   1등·2등 성향을 뽑아 30종 중 하나를 고른다. 정규화하지 않으면 복운(fortune)이 절반 이상 나온다.
// =====================================================================


/** 결과 유형 30종 (1등 성향 6 × 2등 성향 5) */
export const faceReadingResults: FaceReadingResult[] = faceReadingTypes;

/** 성향별 기대 평균과 표준편차 (부위마다 옵션을 고르게 고른다고 가정하고 데이터에서 계산) */
const traitBaseline: Record<TraitKey, { mean: number; sd: number }> = (() => {
  const base = {} as Record<TraitKey, { mean: number; sd: number }>;
  traitOrder.forEach((trait) => {
    let mean = 0;
    let variance = 0;
    faceFeatures.forEach((feature) => {
      const values = feature.options.map((opt) => opt.traits[trait]);
      const mu = values.reduce((a, b) => a + b, 0) / values.length;
      mean += mu;
      variance += values.reduce((a, v) => a + (v - mu) ** 2, 0) / values.length;
    });
    base[trait] = { mean, sd: Math.sqrt(variance) || 1 };
  });
  return base;
})();

/** z 점수가 같을 때 앞에 오는 순서 (원래 데이터에서 드물게 나오는 성향을 우선) */
const tieOrder: TraitKey[] = ["health", "wealth", "leadership", "charm", "wisdom", "fortune"];

/** 성향을 정규화 점수가 높은 순서로 정렬해 돌려준다 */
export function rankTraits(scores: TraitScores): TraitKey[] {
  return [...traitOrder].sort((a, b) => {
    const za = (scores[a] - traitBaseline[a].mean) / traitBaseline[a].sd;
    const zb = (scores[b] - traitBaseline[b].mean) / traitBaseline[b].sd;
    if (zb !== za) return zb - za;
    return tieOrder.indexOf(a) - tieOrder.indexOf(b);
  });
}

/** 선택지로 결과 유형(30종 중 하나)을 고른다 */
export function calculateFaceReading(selections: Record<string, string>): FaceReadingResult {
  const scores = calculateTraitScores(selections);
  const [primary, secondary] = rankTraits(scores);
  const found = faceReadingResults.find((r) => r.primaryTrait === primary && r.secondaryTrait === secondary);
  // 데이터가 빠져 있을 때의 안전장치: 1등 성향이 같은 첫 유형, 그것도 없으면 첫 번째
  return found ?? faceReadingResults.find((r) => r.primaryTrait === primary) ?? faceReadingResults[0];
}
