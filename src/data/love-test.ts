export type LoveDimension = 'Passion' | 'Stability' | 'Intimacy' | 'Logic';

export interface LoveScore {
  dimension: LoveDimension;
  score: number;
}

export interface LoveOption {
  id: number;
  text: Record<string, string>;
  scores: LoveScore[];
}

export interface LoveQuestion {
  id: number;
  text: Record<string, string>;
  options: LoveOption[];
}

export interface LoveResult {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  mbtiMatch?: string;
  emoji: string;
  color: string;
  condition: (scores: Record<LoveDimension, number>) => boolean;
}

export const loveQuestions: LoveQuestion[] = [
  {
    id: 1,
    text: {
      ko: "첫 데이트 장소를 정할 때, 당신은?",
      en: "When choosing a place for a first date, you...",
      zh: "选择第一次约会地点时，你...",
      ja: "初デートの場所를 決めるとき、あなたは？"
    },
    options: [
      {
        id: 1,
        text: {
          ko: "분위기 좋은 핫플레이스! 무조건 예뻐야 한다",
          en: "A trendy spot with great vibes! It must look good.",
          zh: "氛围感十足的热门打卡地！必须漂亮。",
          ja: "雰囲気の良いホットプレイス！絶対に映える場所。"
        },
        scores: [{ dimension: 'Passion', score: 3 }, { dimension: 'Intimacy', score: 1 }]
      },
      {
        id: 2,
        text: {
          ko: "조용히 대화 나눌 수 있는 아늑한 식당",
          en: "A cozy restaurant where we can talk quietly.",
          zh: "可以安静聊天的温馨餐厅。",
          ja: "静かに対話ができるこじんまりとしたレストラン。"
        },
        scores: [{ dimension: 'Intimacy', score: 3 }, { dimension: 'Stability', score: 1 }]
      },
      {
        id: 3,
        text: {
          ko: "미리 리뷰를 꼼꼼히 확인한 검증된 맛집",
          en: "A verified restaurant after checking reviews thoroughly.",
          zh: "仔细查看评论后验证过的美食店。",
          ja: "事前にレビューを細かくチェックした検証済みの名店。"
        },
        scores: [{ dimension: 'Logic', score: 3 }, { dimension: 'Stability', score: 1 }]
      },
      {
        id: 4,
        text: {
          ko: "상대방이 가고 싶어 하는 곳이면 어디든 OK",
          en: "Anywhere the other person wants to go is fine.",
          zh: "只要是对方想去的地方，哪里都OK。",
          ja: "相手が行きたい場所ならどこでもOK。"
        },
        scores: [{ dimension: 'Stability', score: 2 }, { dimension: 'Intimacy', score: 2 }]
      }
    ]
  },
  {
    id: 2,
    text: {
      ko: "연인과 연락이 평소보다 늦어질 때, 당신의 생각은?",
      en: "When your partner responds later than usual, you think...",
      zh: "当恋人的回复比平时晚时，你的想法是？",
      ja: "恋人からの連絡がいつもより遅いとき, あなたの考えは？"
    },
    options: [
      {
        id: 1,
        text: {
          ko: "바쁜 일이 있나 보다 하고 내 할 일에 집중한다",
          en: "They must be busy, and I focus on my own stuff.",
          zh: "可能在忙吧，我专注于自己的事情。",
          ja: "忙しいんだろうなと思って自分のことに集中する。"
        },
        scores: [{ dimension: 'Logic', score: 3 }, { dimension: 'Stability', score: 2 }]
      },
      {
        id: 2,
        text: {
          ko: "혹시 기분 나쁜 일이라도 있는지 걱정된다",
          en: "I worry if something bad happened or if they're upset.",
          zh: "担心是不是发生了什么不顺心的事情。",
          ja: "何か嫌なことでもあったのかと心配になる。"
        },
        scores: [{ dimension: 'Intimacy', score: 3 }, { dimension: 'Passion', score: 1 }]
      },
      {
        id: 3,
        text: {
          ko: "왜 연락이 없는지 궁금해서 먼저 메시지를 보낸다",
          en: "I'm curious and send a message first.",
          zh: "好奇为什么没联系，主动发信息。",
          ja: "なぜ連絡がないのか気になって先にメッセージを送る。"
        },
        scores: [{ dimension: 'Passion', score: 3 }, { dimension: 'Intimacy', score: 1 }]
      },
      {
        id: 4,
        text: {
          ko: "우리의 관계에 대해 다시 한번 생각하게 된다",
          en: "I start rethinking about our relationship.",
          zh: "开始重新思考我们的关系。",
          ja: "私たちの关系について改めて考えてしまう。"
        },
        scores: [{ dimension: 'Intimacy', score: 1 }, { dimension: 'Logic', score: 1 }]
      }
    ]
  },
  {
    id: 3,
    text: {
      ko: "당신이 생각하는 이상적인 데이트 빈도는?",
      en: "What is your ideal dating frequency?",
      zh: "你认为理想的约会频率是？",
      ja: "あなたが考える理想的なデートの頻度は？"
    },
    options: [
      {
        id: 1,
        text: {
          ko: "매일 보고 싶다! 틈날 때마다 만나야지",
          en: "I want to see them every day! Meet whenever possible.",
          zh: "想每天都见面！一有空就见。",
          ja: "毎日会いたい！暇さえあれば会わなきゃ。"
        },
        scores: [{ dimension: 'Passion', score: 3 }, { dimension: 'Intimacy', score: 2 }]
      },
      {
        id: 2,
        text: {
          ko: "주 2~3회 정도가 적당하다. 각자의 시간도 중요해",
          en: "2-3 times a week is good. Personal time is important too.",
          zh: "每周2-3次比较合适。个人的时间也很重要。",
          ja: "週に2〜3回くらいが適当。お互いの時間も大事。"
        },
        scores: [{ dimension: 'Stability', score: 3 }, { dimension: 'Logic', score: 2 }]
      },
      {
        id: 3,
        text: {
          ko: "가끔 만나서 더 뜨겁게 노는 게 좋다",
          en: "Meeting occasionally and having a blast is better.",
          zh: "偶尔见面，玩得更痛快更好。",
          ja: "たまに会って熱く過ごすのがいい。"
        },
        scores: [{ dimension: 'Passion', score: 3 }, { dimension: 'Logic', score: 1 }]
      },
      {
        id: 4,
        text: {
          ko: "상황에 따라 다르다. 유동적인 만남 선호",
          en: "Depends on the situation. I prefer flexible meetings.",
          zh: "视情况而定。喜欢灵活的见面方式。",
          ja: "状況による。流動的な会合を好む。"
        },
        scores: [{ dimension: 'Logic', score: 2 }, { dimension: 'Stability', score: 1 }]
      }
    ]
  },
  {
    id: 4,
    text: {
      ko: "기념일을 챙기는 당신의 태도는?",
      en: "Your attitude toward celebrating anniversaries?",
      zh: "你对待纪念日的态度是？",
      ja: "記念日を祝うあなたの態度は？"
    },
    options: [
      {
        id: 1,
        text: {
          ko: "서프라이즈 이벤트와 선물은 필수!",
          en: "Surprise events and gifts are a must!",
          zh: "惊喜活动和礼物是必须的！",
          ja: "サプライズイベントとプレゼントは必須！"
        },
        scores: [{ dimension: 'Passion', score: 3 }, { dimension: 'Intimacy', score: 2 }]
      },
      {
        id: 2,
        text: {
          ko: "함께 맛있는 음식을 먹으며 소소하게 보낸다",
          en: "Spend it simply by eating delicious food together.",
          zh: "一起吃顿好吃的，平凡地度过。",
          ja: "一緒に美味しいものを食べてささやかに過ごす。"
        },
        scores: [{ dimension: 'Stability', score: 3 }, { dimension: 'Intimacy', score: 2 }]
      },
      {
        id: 3,
        text: {
          ko: "실용적인 선물을 주고받는 것을 선호한다",
          en: "Prefer exchanging practical gifts.",
          zh: "喜欢交换实用的礼物。",
          ja: "実用的なプレゼントをやり取りするのを好む。"
        },
        scores: [{ dimension: 'Logic', score: 3 }, { dimension: 'Stability', score: 2 }]
      },
      {
        id: 4,
        text: {
          ko: "거창하게 챙기기보다 평소에 잘하는 게 중요하다",
          en: "It's more important to be good to each other daily than a grand celebration.",
          zh: "比起隆重的纪念日，平时的付出更重要。",
          ja: "大げさに祝うより普段から尽くすことが大事。"
        },
        scores: [{ dimension: 'Stability', score: 3 }, { dimension: 'Logic', score: 1 }]
      }
    ]
  }
];

export const loveResults: LoveResult[] = [
  {
    id: 'romantic-explorer',
    title: { ko: "낭만적인 탐험가", en: "Romantic Explorer", zh: "浪漫探险家", ja: "ロマンチックな探検家" },
    description: {
      ko: "설렘을 무엇보다 중요하게 생각하는 타입입니다. 당신은 연애에서 새로운 자극과 열정을 찾으며, 상대방에게 끊임없이 사랑을 표현하고 확인받고 싶어 합니다.",
      en: "You value excitement above all else. You seek new stimulation and passion in relationships and constantly express and want confirmation of love.",
      zh: "你是那种把心动看得比什么都重要的人。你会在恋爱中寻找新鲜的刺激和激情，渴望不断向对方表达爱意并得到确认。",
      ja: "ときめきを何よりも大切にするタイプです。あなたは恋愛に新しい刺激と情熱を求め、相手に絶えず愛を表現し、確認されたいと思っています。"
    },
    emoji: "🧭",
    color: "#ff4d6d",
    condition: (s) => s.Passion >= 8
  },
  {
    id: 'stable-forest',
    title: { ko: "안정적인 숲", en: "Stable Forest", zh: "稳定的森林", ja: "安定した森" },
    description: {
      ko: "평안하고 변함없는 관계를 선호하는 타입입니다. 당신은 상대방에게 든든한 버팀목이 되어주며, 자극적인 설렘보다는 깊은 신뢰와 안정감을 추구합니다.",
      en: "You prefer a peaceful and unchanging relationship. You are a reliable support for your partner and pursue deep trust and stability over provocative excitement.",
      zh: "你喜欢平和且不变的关系。你是对方可靠的支柱，比起刺激的心动，你更追求深厚的信任和安全感。",
      ja: "穏やかで変わらない関係を好むタイプ입니다. あなたは相手にとって心強い支えとなり、刺激的なときめきよりも深い信頼と安定感を追求します。"
    },
    emoji: "🌲",
    color: "#2d6a4f",
    condition: (s) => s.Stability >= 8
  },
  {
    id: 'deep-ocean',
    title: { ko: "깊은 바다", en: "Deep Ocean", zh: "深邃海洋", ja: "深い海" },
    description: {
      ko: "상대방과 정서적으로 깊이 연결되기를 원하는 타입입니다. 당신은 풍부한 공감 능력과 세심한 배려로 연인의 마음을 어루만져 주며, 단 한 사람과의 소통을 소중히 여깁니다.",
      en: "You want to be deeply connected emotionally with your partner. You soothe your partner's heart with rich empathy and careful consideration, valuing communication with that one special person.",
      zh: "你渴望与对方建立深层的情感连接。你以丰富的共情能力和细致入微的体贴抚慰爱人的心，珍视与唯一的那个人的沟通。",
      ja: "相手と情緒的に深くつながることを望むタイプ입니다. あなたは豊かな共感能力と細やかな配慮で恋人の心を癒やし、ただ一人とのコミュニケーションを大切にします。"
    },
    emoji: "🌊",
    color: "#0077b6",
    condition: (s) => s.Intimacy >= 8
  },
  {
    id: 'wise-owl',
    title: { ko: "현명한 올빼미", en: "Wise Owl", zh: "聪明的猫头鹰", ja: "賢いフクロウ" },
    description: {
      ko: "사랑에 있어서도 이성과 논리를 잃지 않는 타입입니다. 당신은 감정에 휘둘리기보다 관계를 객관적으로 바라보며, 서로의 성장에 도움이 되는 건강한 파트너십을 지향합니다.",
      en: "You maintain reason and logic even in love. Rather than being swayed by emotions, you look at the relationship objectively and aim for a healthy partnership that aids mutual growth.",
      zh: "即使在爱情中也不会失去理智和逻辑。比起被感情左右，你会客观地看待关系，向往能促进彼此成长的健康伙伴关系。",
      ja: "愛においても理性と論理を失わないタイプ입니다. あなたは感情に振り回されるより関係を客観的に見つめ、お互いの成長につながる健全なパートナーシップを目指します。"
    },
    emoji: "🦉",
    color: "#4a4e69",
    condition: (s) => s.Logic >= 8
  }
];

export const defaultResult: LoveResult = {
  id: 'warm-heart',
  title: { ko: "따뜻한 햇살", en: "Warm Sunshine", zh: "温暖的阳光", ja: "暖かい日差し" },
  description: {
    ko: "균형 잡힌 사랑을 하는 타입입니다. 열정과 안정, 공감과 이성 사이에서 적절한 조화를 이루며 자신만의 따스한 방식으로 상대방을 사랑합니다.",
    en: "You love in a balanced way. You achieve a proper harmony between passion and stability, empathy and reason, loving your partner in your own warm way.",
    zh: "你是那种恋爱很均衡的人。在激情与稳定、共情与理智之间保持着恰到好处的和谐，用自己独特且温暖的方式爱着对方。",
    ja: "バランスの取れた愛をするタイプ입니다. 情熱と安定, 共感と理性の間で適切な調和を保ち, 自分なりの温かいやり方で相手を愛します。"
  },
  emoji: "☀️",
  color: "#ffb703",
  condition: () => true
};
