// 오늘의 운세 데이터
// - 이름 + 생년월일 + 오늘 날짜를 시드로 삼아 같은 사람은 하루 동안 같은 결과를 본다
// - 생년월일에서 띠(12지)와 별자리를 계산해 결과에 반영한다
// - 재물·연애·건강·직장 네 영역 점수를 먼저 뽑고, 종합운은 그 평균에서 만든다 (서로 어긋나지 않게)
// - 조언은 가장 좋은 영역에서, 주의할 점은 가장 약한 영역에서 고른다
// - luckyColors / luckyDirections / advices / warnings / hashString / seededRandom 은
//   오늘의 관상 운세(src/data/face-reading-daily.ts)도 같이 쓰므로 이름을 바꾸지 않는다

export type FortuneLang = "ko" | "en" | "zh" | "ja";
export type LText = Record<FortuneLang, string>;

/** 운세 영역 */
export type FortuneCategory = "wealth" | "love" | "health" | "work";

export const fortuneCategories: { id: FortuneCategory; emoji: string; name: LText }[] = [
  { id: "wealth", emoji: "💰", name: { ko: "재물운", en: "Wealth", zh: "财运", ja: "金運" } },
  { id: "love", emoji: "💕", name: { ko: "연애운", en: "Love", zh: "爱情运", ja: "恋愛運" } },
  { id: "health", emoji: "🌿", name: { ko: "건강운", en: "Health", zh: "健康运", ja: "健康運" } },
  { id: "work", emoji: "💼", name: { ko: "직장·학업운", en: "Work & Study", zh: "事业·学业运", ja: "仕事・学業運" } },
];

/** 점수(1~5)별 등급 이름. 인덱스 0은 쓰지 않는다 */
export const fortuneLevelNames: LText[] = [
  { ko: "", en: "", zh: "", ja: "" },
  { ko: "조심", en: "Careful", zh: "谨慎", ja: "注意" },
  { ko: "무난", en: "Steady", zh: "平稳", ja: "無難" },
  { ko: "좋음", en: "Good", zh: "良好", ja: "良い" },
  { ko: "아주 좋음", en: "Very good", zh: "很好", ja: "とても良い" },
  { ko: "최고", en: "Excellent", zh: "极佳", ja: "最高" },
];

// ───────────────────────────── 띠 (12지) ─────────────────────────────
// 양력 연도 기준으로 계산한다. (설 이전 1~2월생은 전통적으로 전년도 띠로 보기도 하는데, 여기서는 단순화)
export interface ZodiacAnimal {
  id: string;
  emoji: string;
  name: LText;
  /** 타고난 기운 한 문장 */
  trait: LText;
}

export const zodiacAnimals: ZodiacAnimal[] = [
  { id: "rat", emoji: "🐭", name: { ko: "쥐띠", en: "Rat", zh: "鼠", ja: "子年" },
    trait: { ko: "눈치가 빠르고 기회를 놓치지 않는 띠예요. 작은 변화를 먼저 알아채는 힘이 오늘의 무기가 됩니다.", en: "Quick-witted and alert to opportunity. Noticing small changes first is your edge today.", zh: "机敏灵活，善于抓住机会。率先察觉细微变化是你今天的优势。", ja: "機転が利きチャンスを逃さない年。小さな変化に先に気づく力が今日の武器です。" } },
  { id: "ox", emoji: "🐮", name: { ko: "소띠", en: "Ox", zh: "牛", ja: "丑年" },
    trait: { ko: "묵묵히 끝까지 해내는 뚝심의 띠예요. 서두르지 않아도 결국 도착하는 사람입니다.", en: "Steady and persistent to the end. You arrive without rushing.", zh: "踏实稳重，坚持到底。不急不躁也终能到达。", ja: "黙々と最後までやり遂げる粘りの年。急がなくても必ず辿り着く人です。" } },
  { id: "tiger", emoji: "🐯", name: { ko: "호랑이띠", en: "Tiger", zh: "虎", ja: "寅年" },
    trait: { ko: "추진력과 용기가 강한 띠예요. 결단이 필요한 순간에 가장 빛납니다.", en: "Bold and driven. You shine brightest when a decision is needed.", zh: "勇敢果断，行动力强。在需要决断的时刻最为耀眼。", ja: "推進力と勇気に満ちた年。決断が必要な瞬間に最も輝きます。" } },
  { id: "rabbit", emoji: "🐰", name: { ko: "토끼띠", en: "Rabbit", zh: "兔", ja: "卯年" },
    trait: { ko: "섬세하고 분위기를 잘 읽는 띠예요. 부드러움이 곧 설득력이 되는 날입니다.", en: "Gentle and perceptive. Softness becomes persuasion today.", zh: "细腻敏感，善解人意。温和就是你今天的说服力。", ja: "繊細で空気を読むのが上手な年。柔らかさがそのまま説得力になる日です。" } },
  { id: "dragon", emoji: "🐲", name: { ko: "용띠", en: "Dragon", zh: "龙", ja: "辰年" },
    trait: { ko: "스케일이 크고 존재감이 뚜렷한 띠예요. 큰 그림을 그리는 일에 운이 따릅니다.", en: "Big presence, big vision. Luck follows your large-scale plans.", zh: "气场强大，格局开阔。谋划大局时运势相随。", ja: "スケールが大きく存在感のある年。大きな絵を描く仕事に運がついてきます。" } },
  { id: "snake", emoji: "🐍", name: { ko: "뱀띠", en: "Snake", zh: "蛇", ja: "巳年" },
    trait: { ko: "깊이 생각하고 조용히 움직이는 지혜의 띠예요. 말보다 관찰이 힘이 되는 날입니다.", en: "Thoughtful and quietly strategic. Observation beats talk today.", zh: "深思熟虑，行事低调。今天观察胜于言语。", ja: "深く考え静かに動く知恵の年。言葉より観察が力になる日です。" } },
  { id: "horse", emoji: "🐴", name: { ko: "말띠", en: "Horse", zh: "马", ja: "午年" },
    trait: { ko: "활동적이고 자유로운 띠예요. 몸을 움직일수록 좋은 기운이 따라옵니다.", en: "Active and free-spirited. The more you move, the more luck follows.", zh: "活力充沛，崇尚自由。多活动，好运自然来。", ja: "活動的で自由な年。体を動かすほど良い気が巡ります。" } },
  { id: "goat", emoji: "🐑", name: { ko: "양띠", en: "Goat", zh: "羊", ja: "未年" },
    trait: { ko: "온화하고 예술 감각이 좋은 띠예요. 사람을 편안하게 하는 재주가 운을 부릅니다.", en: "Warm and artistic. Putting people at ease draws luck to you.", zh: "温和善良，富有艺术感。让人安心的能力带来好运。", ja: "穏やかで芸術センスのある年。人を安心させる才能が運を呼びます。" } },
  { id: "monkey", emoji: "🐵", name: { ko: "원숭이띠", en: "Monkey", zh: "猴", ja: "申年" },
    trait: { ko: "재치 있고 머리 회전이 빠른 띠예요. 유연하게 방향을 바꾸는 힘이 오늘의 열쇠입니다.", en: "Witty and quick-thinking. Changing course with ease is today's key.", zh: "聪明机智，反应敏捷。灵活调整方向是今天的关键。", ja: "機知に富み頭の回転が速い年。柔軟に方向を変える力が今日の鍵です。" } },
  { id: "rooster", emoji: "🐔", name: { ko: "닭띠", en: "Rooster", zh: "鸡", ja: "酉年" },
    trait: { ko: "꼼꼼하고 책임감이 강한 띠예요. 미리 준비한 사람에게 결과가 돌아옵니다.", en: "Meticulous and responsible. Preparation pays off today.", zh: "细致认真，责任感强。有备者今天将收获成果。", ja: "几帳面で責任感の強い年。準備した人に結果が返ってきます。" } },
  { id: "dog", emoji: "🐶", name: { ko: "개띠", en: "Dog", zh: "狗", ja: "戌年" },
    trait: { ko: "의리 있고 진심이 통하는 띠예요. 신뢰를 쌓아 온 관계가 힘이 되는 날입니다.", en: "Loyal and sincere. Relationships built on trust carry you today.", zh: "忠诚仗义，真诚待人。积累的信任今天成为你的后盾。", ja: "義理堅く真心が伝わる年。信頼を積み上げた関係が力になる日です。" } },
  { id: "pig", emoji: "🐷", name: { ko: "돼지띠", en: "Pig", zh: "猪", ja: "亥年" },
    trait: { ko: "넉넉하고 복이 많은 띠예요. 베푼 만큼 돌아오는 흐름이 오늘 특히 강합니다.", en: "Generous and blessed. What you give comes back, especially today.", zh: "宽厚有福。付出必有回报，今天尤为明显。", ja: "おおらかで福の多い年。与えた分だけ返ってくる流れが今日は特に強いです。" } },
];

/** 양력 연도 → 띠. (year - 4) % 12 → 0 = 쥐띠 (예: 1984, 1996, 2008) */
export function getZodiacAnimal(year: number): ZodiacAnimal {
  const index = (((year - 4) % 12) + 12) % 12;
  return zodiacAnimals[index];
}

// ───────────────────────────── 별자리 ─────────────────────────────
export interface StarSign {
  id: string;
  /** 별자리 기호 (유니코드 ♈~♓, 윈도우 10에서도 표시됨) */
  symbol: string;
  name: LText;
  /** 시작 월/일 (이 날짜부터 다음 별자리 시작 전날까지) */
  from: [number, number];
  trait: LText;
}

export const starSigns: StarSign[] = [
  { id: "capricorn", symbol: "♑", from: [12, 22], name: { ko: "염소자리", en: "Capricorn", zh: "摩羯座", ja: "やぎ座" },
    trait: { ko: "목표를 향해 한 계단씩 오르는 성실함이 강점이에요.", en: "Your strength is climbing toward goals one step at a time.", zh: "朝着目标一步一个脚印的踏实是你的强项。", ja: "目標に向かって一段ずつ登る誠実さが強みです。" } },
  { id: "aquarius", symbol: "♒", from: [1, 20], name: { ko: "물병자리", en: "Aquarius", zh: "水瓶座", ja: "みずがめ座" },
    trait: { ko: "남다른 시선과 아이디어가 강점이에요.", en: "Your strength is a fresh perspective and original ideas.", zh: "独特的视角和创意是你的强项。", ja: "人と違う視点とアイデアが強みです。" } },
  { id: "pisces", symbol: "♓", from: [2, 19], name: { ko: "물고기자리", en: "Pisces", zh: "双鱼座", ja: "うお座" },
    trait: { ko: "공감 능력과 상상력이 강점이에요.", en: "Your strength is empathy and imagination.", zh: "共情力和想象力是你的强项。", ja: "共感力と想像力が強みです。" } },
  { id: "aries", symbol: "♈", from: [3, 21], name: { ko: "양자리", en: "Aries", zh: "白羊座", ja: "おひつじ座" },
    trait: { ko: "먼저 시작하는 용기와 추진력이 강점이에요.", en: "Your strength is the courage to go first.", zh: "率先行动的勇气和冲劲是你的强项。", ja: "先に始める勇気と推進力が強みです。" } },
  { id: "taurus", symbol: "♉", from: [4, 20], name: { ko: "황소자리", en: "Taurus", zh: "金牛座", ja: "おうし座" },
    trait: { ko: "흔들리지 않는 안정감과 끈기가 강점이에요.", en: "Your strength is unshakable steadiness and patience.", zh: "不动摇的稳定感和耐心是你的强项。", ja: "揺るがない安定感と粘り強さが強みです。" } },
  { id: "gemini", symbol: "♊", from: [5, 21], name: { ko: "쌍둥이자리", en: "Gemini", zh: "双子座", ja: "ふたご座" },
    trait: { ko: "빠른 소통과 호기심이 강점이에요.", en: "Your strength is quick communication and curiosity.", zh: "快速沟通和好奇心是你的强项。", ja: "素早いコミュニケーションと好奇心が強みです。" } },
  { id: "cancer", symbol: "♋", from: [6, 22], name: { ko: "게자리", en: "Cancer", zh: "巨蟹座", ja: "かに座" },
    trait: { ko: "사람을 돌보는 따뜻함과 직감이 강점이에요.", en: "Your strength is warmth and intuition for people.", zh: "照顾他人的温暖和直觉是你的强项。", ja: "人を思いやる温かさと直感が強みです。" } },
  { id: "leo", symbol: "♌", from: [7, 23], name: { ko: "사자자리", en: "Leo", zh: "狮子座", ja: "しし座" },
    trait: { ko: "당당한 존재감과 리더십이 강점이에요.", en: "Your strength is confident presence and leadership.", zh: "自信的气场和领导力是你的强项。", ja: "堂々とした存在感とリーダーシップが強みです。" } },
  { id: "virgo", symbol: "♍", from: [8, 23], name: { ko: "처녀자리", en: "Virgo", zh: "处女座", ja: "おとめ座" },
    trait: { ko: "꼼꼼한 분석력과 완성도가 강점이에요.", en: "Your strength is careful analysis and polish.", zh: "细致的分析力和完成度是你的强项。", ja: "緻密な分析力と完成度が強みです。" } },
  { id: "libra", symbol: "♎", from: [9, 23], name: { ko: "천칭자리", en: "Libra", zh: "天秤座", ja: "てんびん座" },
    trait: { ko: "균형 감각과 조화를 만드는 힘이 강점이에요.", en: "Your strength is balance and creating harmony.", zh: "平衡感和创造和谐的能力是你的强项。", ja: "バランス感覚と調和を生む力が強みです。" } },
  { id: "scorpio", symbol: "♏", from: [10, 23], name: { ko: "전갈자리", en: "Scorpio", zh: "天蝎座", ja: "さそり座" },
    trait: { ko: "깊은 집중력과 통찰이 강점이에요.", en: "Your strength is deep focus and insight.", zh: "深度专注和洞察力是你的强项。", ja: "深い集中力と洞察が強みです。" } },
  { id: "sagittarius", symbol: "♐", from: [11, 22], name: { ko: "사수자리", en: "Sagittarius", zh: "射手座", ja: "いて座" },
    trait: { ko: "낙천적인 에너지와 넓은 시야가 강점이에요.", en: "Your strength is optimism and a wide horizon.", zh: "乐观的能量和开阔的视野是你的强项。", ja: "楽天的なエネルギーと広い視野が強みです。" } },
];

/** 월/일 → 별자리 */
export function getStarSign(month: number, day: number): StarSign {
  // 배열은 염소자리(12/22)부터 시작하므로, 1/1~1/19 는 염소자리
  let found = starSigns[0];
  for (const sign of starSigns) {
    const [m, d] = sign.from;
    if (m === 12) continue; // 염소자리는 기본값
    if (month > m || (month === m && day >= d)) found = sign;
  }
  if (month === 12 && day >= 22) return starSigns[0];
  return found;
}

// ───────────────────────────── 행운 요소 ─────────────────────────────
export const luckyColors: Record<string, Record<string, string>> = {
  red: { ko: "빨강", en: "Red", zh: "红色", ja: "赤" },
  orange: { ko: "주황", en: "Orange", zh: "橙色", ja: "オレンジ" },
  yellow: { ko: "노랑", en: "Yellow", zh: "黄色", ja: "黄色" },
  green: { ko: "초록", en: "Green", zh: "绿色", ja: "緑" },
  blue: { ko: "파랑", en: "Blue", zh: "蓝色", ja: "青" },
  purple: { ko: "보라", en: "Purple", zh: "紫色", ja: "紫" },
  pink: { ko: "분홍", en: "Pink", zh: "粉色", ja: "ピンク" },
  gold: { ko: "금색", en: "Gold", zh: "金色", ja: "金色" },
  white: { ko: "흰색", en: "White", zh: "白色", ja: "白" },
  black: { ko: "검정", en: "Black", zh: "黑色", ja: "黒" },
};

/** 행운의 색 → 화면에 칠할 실제 색상값 */
export const luckyColorHex: Record<string, string> = {
  red: "#ef4444", orange: "#f97316", yellow: "#facc15", green: "#22c55e", blue: "#3b82f6",
  purple: "#a855f7", pink: "#ec4899", gold: "#d4a017", white: "#f8fafc", black: "#1e293b",
};

export const luckyDirections: Record<string, Record<string, string>> = {
  east: { ko: "동쪽", en: "East", zh: "东方", ja: "東" },
  west: { ko: "서쪽", en: "West", zh: "西方", ja: "西" },
  south: { ko: "남쪽", en: "South", zh: "南方", ja: "南" },
  north: { ko: "북쪽", en: "North", zh: "北方", ja: "北" },
  southeast: { ko: "동남쪽", en: "Southeast", zh: "东南", ja: "東南" },
  southwest: { ko: "서남쪽", en: "Southwest", zh: "西南", ja: "西南" },
  northeast: { ko: "동북쪽", en: "Northeast", zh: "东北", ja: "東北" },
  northwest: { ko: "서북쪽", en: "Northwest", zh: "西北", ja: "西北" },
};

/** 행운의 시간대 */
export const luckyTimes: LText[] = [
  { ko: "이른 아침 (6~9시)", en: "Early morning (6–9)", zh: "清晨 (6~9点)", ja: "早朝 (6〜9時)" },
  { ko: "오전 (9~12시)", en: "Morning (9–12)", zh: "上午 (9~12点)", ja: "午前 (9〜12時)" },
  { ko: "점심 무렵 (12~14시)", en: "Around noon (12–14)", zh: "午间 (12~14点)", ja: "昼頃 (12〜14時)" },
  { ko: "오후 (14~18시)", en: "Afternoon (14–18)", zh: "下午 (14~18点)", ja: "午後 (14〜18時)" },
  { ko: "저녁 (18~21시)", en: "Evening (18–21)", zh: "傍晚 (18~21点)", ja: "夕方 (18〜21時)" },
  { ko: "늦은 밤 (21시 이후)", en: "Late night (after 21)", zh: "深夜 (21点以后)", ja: "夜 (21時以降)" },
];

/** 행운의 아이템 */
export const luckyItems: { emoji: string; name: LText }[] = [
  { emoji: "☕", name: { ko: "따뜻한 차 한 잔", en: "A warm cup of tea", zh: "一杯热茶", ja: "温かいお茶" } },
  { emoji: "📒", name: { ko: "손글씨 메모", en: "A handwritten note", zh: "手写便条", ja: "手書きのメモ" } },
  { emoji: "🎧", name: { ko: "좋아하는 음악", en: "Your favorite music", zh: "喜欢的音乐", ja: "お気に入りの音楽" } },
  { emoji: "🌱", name: { ko: "작은 화분", en: "A small plant", zh: "一盆小绿植", ja: "小さな鉢植え" } },
  { emoji: "⌚", name: { ko: "손목시계", en: "A wristwatch", zh: "手表", ja: "腕時計" } },
  { emoji: "🧣", name: { ko: "목도리나 스카프", en: "A scarf", zh: "围巾", ja: "マフラーやスカーフ" } },
  { emoji: "📚", name: { ko: "읽다 만 책", en: "A half-read book", zh: "读了一半的书", ja: "読みかけの本" } },
  { emoji: "🍀", name: { ko: "초록색 소품", en: "Something green", zh: "绿色小物", ja: "緑色の小物" } },
  { emoji: "🔑", name: { ko: "열쇠고리", en: "A keychain", zh: "钥匙扣", ja: "キーホルダー" } },
  { emoji: "🕯️", name: { ko: "향초", en: "A scented candle", zh: "香薰蜡烛", ja: "アロマキャンドル" } },
  { emoji: "📷", name: { ko: "사진 한 장", en: "A photograph", zh: "一张照片", ja: "一枚の写真" } },
  { emoji: "🧢", name: { ko: "모자", en: "A hat", zh: "帽子", ja: "帽子" } },
];

/** 오늘의 키워드 */
export const fortuneKeywords: LText[] = [
  { ko: "정리", en: "Clarity", zh: "整理", ja: "整理" },
  { ko: "시작", en: "Beginning", zh: "开始", ja: "始まり" },
  { ko: "여유", en: "Ease", zh: "从容", ja: "ゆとり" },
  { ko: "대화", en: "Conversation", zh: "对话", ja: "対話" },
  { ko: "집중", en: "Focus", zh: "专注", ja: "集中" },
  { ko: "기다림", en: "Patience", zh: "等待", ja: "待つこと" },
  { ko: "용기", en: "Courage", zh: "勇气", ja: "勇気" },
  { ko: "감사", en: "Gratitude", zh: "感恩", ja: "感謝" },
  { ko: "균형", en: "Balance", zh: "平衡", ja: "バランス" },
  { ko: "휴식", en: "Rest", zh: "休息", ja: "休息" },
  { ko: "연결", en: "Connection", zh: "联结", ja: "つながり" },
  { ko: "결단", en: "Decision", zh: "决断", ja: "決断" },
  { ko: "배움", en: "Learning", zh: "学习", ja: "学び" },
  { ko: "솔직함", en: "Honesty", zh: "坦诚", ja: "率直さ" },
  { ko: "유연함", en: "Flexibility", zh: "灵活", ja: "柔軟さ" },
  { ko: "마무리", en: "Completion", zh: "收尾", ja: "仕上げ" },
];

// ───────────────────────────── 운세 본문 ─────────────────────────────
/** 종합운 총평: [점수 1~5][변형 2가지]. 인덱스 0은 비워 둔다 */
export const overallTexts: LText[][] = [
  [],
  [
    { ko: "오늘은 흐름이 느리고 마음이 쉽게 어수선해질 수 있는 날이에요. 새로운 일을 벌이기보다 하던 일을 지키는 데 집중하세요. 저녁이 되면 한결 차분해지니 하루를 길게 보고 버티면 됩니다.",
      en: "The pace is slow today and your mind may scatter easily. Protect what you already have instead of starting something new. Things calm down by evening, so take the long view.",
      zh: "今天节奏偏慢，心绪容易纷乱。与其开启新事，不如守好手头的事。到了傍晚会平静许多，把一天看长一点就好。",
      ja: "今日は流れが遅く、心が散らかりやすい日です。新しいことを始めるより、今あるものを守ることに集中を。夕方には落ち着くので、一日を長い目で見てください。" },
    { ko: "작은 일이 자꾸 어긋나는 느낌이 들 수 있어요. 그럴수록 속도를 늦추고 한 번 더 확인하는 습관이 손해를 막아 줍니다. 오늘 지킨 신중함은 내일의 여유로 돌아옵니다.",
      en: "Small things may keep slipping out of place. Slow down and double-check; that habit prevents losses today. The care you take now returns as tomorrow's ease.",
      zh: "可能会觉得小事接连出岔子。越是这样越要放慢速度、多确认一遍，这个习惯能避免损失。今天的谨慎会变成明天的从容。",
      ja: "小さなことが噛み合わない感じがするかもしれません。そんな時こそ速度を落として、もう一度確認する習慣が損を防ぎます。今日の慎重さは明日の余裕になります。" },
  ],
  [
    { ko: "크게 나쁠 것도, 크게 튀는 것도 없는 평온한 하루예요. 이런 날은 기본기를 다지기에 좋습니다. 미뤄 둔 정리나 연락을 처리하면 저녁에 뿌듯함이 남을 거예요.",
      en: "A calm day with nothing dramatic either way. Days like this are good for fundamentals. Clear a postponed chore or message and you'll end the day satisfied.",
      zh: "没有大起也没有大落，是平静的一天。这样的日子适合打基础。处理掉拖延的整理或联络，晚上会很有成就感。",
      ja: "大きく悪くも良くもない穏やかな一日です。こんな日は基本を固めるのに向いています。先延ばしにしていた整理や連絡を片付けると、夜に充実感が残ります。" },
    { ko: "무난하게 흘러가는 날이지만 그 안에 작은 힌트가 숨어 있어요. 평소 지나치던 말이나 장면을 한 번 더 들여다보세요. 조용한 하루가 다음 기회의 밑그림이 됩니다.",
      en: "An uneventful day, but with a small hint hidden inside. Look twice at a remark or scene you'd usually pass by. A quiet day sketches the next opportunity.",
      zh: "日子平淡流过，其中却藏着小小的提示。对平时忽略的话语或场景多看一眼。安静的一天是下一次机会的底稿。",
      ja: "無難に流れる日ですが、その中に小さなヒントが隠れています。いつも見過ごしている言葉や場面をもう一度見てみて。静かな一日が次のチャンスの下絵になります。" },
  ],
  [
    { ko: "기운이 안정적으로 올라오는 좋은 날이에요. 해 오던 일에 속도가 붙고 주변의 반응도 긍정적입니다. 다만 욕심을 내 일을 늘리기보다 지금 손에 쥔 것을 잘 마무리하는 쪽이 더 큰 만족을 줍니다.",
      en: "Energy rises steadily today. Ongoing work gains momentum and people respond well. Rather than piling on more, finishing what's in hand brings the greater satisfaction.",
      zh: "运势稳步上升的好日子。手头的事加快推进，周围反应也积极。但与其贪多揽事，不如把握好当下，完成得更漂亮才更有满足感。",
      ja: "気運が安定して上がってくる良い日です。続けてきたことに勢いがつき、周囲の反応も前向き。ただし欲張って増やすより、今手にしているものをしっかり仕上げる方が大きな満足を得られます。" },
    { ko: "사람과의 만남에서 기분 좋은 일이 생기기 쉬운 날이에요. 먼저 인사하고 먼저 웃으면 그 배로 돌아옵니다. 오후에 작은 행운이 하나 끼어들 수 있으니 눈을 크게 뜨세요.",
      en: "Pleasant moments come easily through people today. Greet first, smile first, and it returns doubled. A small stroke of luck may slip in during the afternoon, so keep your eyes open.",
      zh: "今天在与人相处中容易遇到愉快的事。先打招呼、先微笑，收获会加倍。下午可能有一个小幸运，睁大眼睛留意。",
      ja: "人との出会いで嬉しいことが起こりやすい日です。先に挨拶し先に笑えば、その倍になって返ってきます。午後に小さな幸運がひとつ紛れ込むかもしれないので、目を大きく開けて。" },
  ],
  [
    { ko: "막혀 있던 일이 풀리고 자신감이 차오르는 날이에요. 망설이던 제안이나 연락이 있다면 오늘 하세요. 흐름이 당신 편이라 평소보다 좋은 답이 돌아올 확률이 높습니다.",
      en: "Blocked things loosen and confidence fills up today. If there's a proposal or message you've hesitated on, do it today. The current is on your side and a better answer than usual is likely.",
      zh: "受阻的事情开始疏通，自信渐渐充盈。有犹豫的提议或联络，今天就去做。大势站在你这边，得到好答复的几率比平时高。",
      ja: "詰まっていたことがほどけ、自信が満ちてくる日です。ためらっていた提案や連絡があるなら今日のうちに。流れが味方なので、いつもより良い返事が返ってくる可能性が高いです。" },
    { ko: "준비해 온 것이 인정받는 날이에요. 결과를 조급하게 확인하지 않아도 자연스럽게 소식이 들려올 겁니다. 들뜬 기분에 지출이 커지기 쉬우니 그것만 조심하면 아주 좋은 하루입니다.",
      en: "Your preparation gets recognized today. You don't need to chase results; news will arrive on its own. The one caution: an upbeat mood can inflate spending. Mind that and it's a very good day.",
      zh: "你一直的准备今天会得到认可。不必急着确认结果，消息自然会传来。情绪高涨时容易花钱变多，留意这一点就是非常好的一天。",
      ja: "準備してきたことが認められる日です。結果を焦って確かめなくても、自然と知らせが届きます。浮かれた気分で出費が増えやすいので、そこだけ気をつければとても良い一日です。" },
  ],
  [
    { ko: "오늘은 운의 문이 활짝 열린 날이에요. 하고 싶었던 일, 만나고 싶었던 사람, 가고 싶었던 곳 중 하나를 꼭 실행하세요. 평소라면 어려웠을 일도 오늘은 이상하리만큼 수월하게 풀립니다.",
      en: "The door of fortune stands wide open today. Do one thing you've wanted: a task, a person, a place. Things that would normally be hard unfold with uncanny ease.",
      zh: "今天好运之门大开。想做的事、想见的人、想去的地方，一定要实现其中一个。平时困难的事，今天会顺利得出奇。",
      ja: "今日は運の扉が大きく開いた日です。やりたかったこと、会いたかった人、行きたかった場所のどれかを必ず実行して。普段なら難しいことも、今日は不思議なほどすんなり進みます。" },
    { ko: "좋은 소식과 좋은 사람이 함께 찾아오는 최고의 날이에요. 받은 복은 나눌수록 커지니 주변에 작은 호의를 베풀어 보세요. 오늘의 기운은 며칠 동안 이어지니 중요한 결정을 하기에도 좋습니다.",
      en: "Good news and good people arrive together on this excellent day. Shared luck multiplies, so offer small kindnesses. Today's energy carries for several days, making it a fine time for big decisions.",
      zh: "好消息和贵人一同到来的极佳日子。福气越分享越大，不妨对身边人施以小小善意。今天的气运会延续几天，也适合做重要决定。",
      ja: "良い知らせと良い人が一緒にやってくる最高の日です。受けた福は分けるほど大きくなるので、周りに小さな親切を。今日の気運は数日続くので、重要な決断にも向いています。" },
  ],
];

/** 영역별 본문: [영역][점수 1~5][변형 2가지] */
export const categoryTexts: Record<FortuneCategory, LText[][]> = {
  wealth: [
    [],
    [
      { ko: "돈이 새기 쉬운 날이에요. 충동적인 결제와 즉흥적인 약속은 오늘만큼은 미루세요. 지갑을 닫는 것만으로도 운을 지키는 셈입니다.",
        en: "Money leaks easily today. Postpone impulse purchases and spur-of-the-moment plans. Simply keeping your wallet closed protects your luck.",
        zh: "今天钱容易漏走。冲动消费和临时应酬今天就先缓缓。管住钱包本身就是守住运气。",
        ja: "お金が漏れやすい日です。衝動的な支払いと即興の約束は今日だけは先延ばしに。財布を閉じるだけで運を守れます。" },
      { ko: "예상 밖의 지출이 생길 수 있어요. 큰 거래나 투자 결정은 하루 이틀 미루는 편이 안전합니다. 가계부를 한 번 들여다보는 것만으로 흐름이 바뀝니다.",
        en: "Unexpected expenses may appear. It's safer to delay big transactions or investment decisions a day or two. Just reviewing your budget shifts the flow.",
        zh: "可能出现预料之外的支出。大额交易或投资决定推迟一两天更安全。翻一翻账本，走势就会改变。",
        ja: "予想外の出費が出るかもしれません。大きな取引や投資の判断は一両日延ばす方が安全です。家計簿を見直すだけで流れが変わります。" },
    ],
    [
      { ko: "들어오는 돈도 나가는 돈도 평소 수준이에요. 무리하지 않으면 손해 볼 일은 없습니다. 작은 절약이 쌓이는 날이니 커피 한 잔 값이라도 아껴 보세요.",
        en: "Money in and out stays at its usual level. Nothing is lost if you don't overreach. Small savings add up today, even the price of a coffee.",
        zh: "进账和支出都在平常水平。不勉强就不会有损失。今天小节俭会积累，哪怕省下一杯咖啡钱。",
        ja: "入るお金も出るお金もいつも通り。無理をしなければ損はありません。小さな節約が積み重なる日なので、コーヒー一杯分でも貯めてみて。" },
      { ko: "큰 변동 없이 안정적인 재물운이에요. 투자보다는 저축, 소비보다는 점검이 어울리는 날입니다. 꾸준함이 결국 가장 큰 재테크예요.",
        en: "Stable finances without big swings. Saving suits today better than investing, and reviewing better than spending. Consistency is the best strategy.",
        zh: "财运平稳无大波动。今天适合储蓄胜过投资，适合盘点胜过消费。坚持才是最大的理财。",
        ja: "大きな変動のない安定した金運です。投資より貯蓄、消費より点検が似合う日。コツコツが結局いちばんの資産運用です。" },
    ],
    [
      { ko: "재물의 흐름이 부드럽게 들어오는 날이에요. 미뤄 둔 정산이나 받을 돈이 있다면 오늘 이야기해 보세요. 돈과 관련된 좋은 정보를 귀담아들을 가치가 있습니다.",
        en: "Money flows in smoothly today. If there's a settlement or payment owed to you, bring it up today. Financial tips you hear are worth listening to.",
        zh: "财运平顺流入的一天。有拖欠的结算或应收款，今天去谈谈。听到的理财信息值得留心。",
        ja: "財の流れが穏やかに入ってくる日です。先延ばしの精算や受け取るお金があれば今日話してみて。お金に関する良い情報は耳を傾ける価値があります。" },
      { ko: "노력한 만큼 보상이 따라오는 재물운이에요. 작은 보너스나 뜻밖의 할인 같은 소소한 행운이 있을 수 있습니다. 번 돈의 일부를 나에게 선물해도 좋은 날입니다.",
        en: "Rewards match your effort today. A small bonus or an unexpected discount may come along. It's fine to treat yourself with a little of what you've earned.",
        zh: "付出多少就有多少回报的财运。可能有小奖金或意外折扣这样的小确幸。拿出一部分收入犒劳自己也不错。",
        ja: "努力した分だけ報われる金運です。小さなボーナスや思わぬ割引といったささやかな幸運があるかも。稼いだお金の一部を自分へのご褒美にしても良い日です。" },
    ],
    [
      { ko: "돈의 기회가 눈에 띄는 날이에요. 새로운 수입원이나 좋은 조건의 제안이 보이면 꼼꼼히 살펴보세요. 다만 확신이 들 때까지 서두르지 않는 게 포인트입니다.",
        en: "Financial opportunities stand out today. Examine any new income source or favorable offer closely. The key is not rushing until you're sure.",
        zh: "财运机会显眼的一天。看到新收入来源或条件不错的提议，仔细研究。关键是在确定之前不要急。",
        ja: "お金のチャンスが目につく日です。新しい収入源や好条件の提案が見えたらじっくり検討を。確信が持てるまで急がないのがポイントです。" },
      { ko: "재물운이 활짝 열려 있어요. 오래 기다린 입금이나 좋은 소식이 들어올 수 있습니다. 들뜬 마음에 바로 써 버리기보다 하루만 묵혀 두면 더 좋은 쓰임새가 보일 거예요.",
        en: "Wealth luck is wide open. A long-awaited payment or good news may arrive. Let it sit a day rather than spending right away, and a better use will appear.",
        zh: "财运大开。久等的进账或好消息可能到来。别一激动就花掉，放一天再看，会有更好的用途。",
        ja: "金運が大きく開いています。待っていた入金や良い知らせが届くかも。浮かれてすぐ使うより一日寝かせると、もっと良い使い道が見えてきます。" },
    ],
    [
      { ko: "재물운이 최고조인 날이에요. 뜻밖의 수입, 횡재, 좋은 거래 중 하나가 찾아올 수 있습니다. 오늘 들어온 복은 일부를 나누거나 저축해 두면 더 오래 갑니다.",
        en: "Wealth luck peaks today. An unexpected income, windfall, or great deal may find you. Share or save part of today's blessing and it lasts longer.",
        zh: "财运达到顶峰。意外收入、横财或好交易可能出现其一。今天进来的福气分一部分出去或存起来，会持续更久。",
        ja: "金運が最高潮の日です。思いがけない収入、臨時収入、良い取引のどれかが訪れるかも。今日入った福は一部を分けるか貯めておくと長持ちします。" },
      { ko: "오랫동안 공들인 일이 돈으로 돌아오는 날이에요. 협상이나 계약이 있다면 오늘 마무리하세요. 평소보다 유리한 조건을 끌어낼 수 있는 강한 운입니다.",
        en: "Long effort turns into money today. If there's a negotiation or contract, close it today. The luck is strong enough to secure better terms than usual.",
        zh: "长期用心的事今天变成收益。有谈判或合同，今天就收尾。这是能争取到比平时更有利条件的强运。",
        ja: "長く手をかけてきたことがお金になって返ってくる日。交渉や契約があれば今日まとめて。いつもより有利な条件を引き出せる強い運です。" },
    ],
  ],
  love: [
    [],
    [
      { ko: "말 한마디가 오해로 번지기 쉬운 날이에요. 중요한 이야기는 문자보다 얼굴을 보고, 그것도 오늘보다는 내일이 좋습니다. 혼자만의 시간을 갖는 것도 관계를 지키는 방법이에요.",
        en: "A single remark can snowball into a misunderstanding today. Save important talks for face to face, and preferably tomorrow. Time alone is also a way to protect the relationship.",
        zh: "一句话容易演变成误会的一天。重要的话见面说比发信息好，而且明天比今天好。独处也是守护关系的方式。",
        ja: "一言が誤解に広がりやすい日です。大事な話はメッセージより顔を見て、しかも今日より明日が良いでしょう。一人の時間を持つことも関係を守る方法です。" },
      { ko: "상대의 반응이 평소와 달라 서운할 수 있어요. 그건 당신 탓이 아니라 그 사람의 하루 탓일 가능성이 큽니다. 캐묻지 말고 한 걸음 물러서 기다려 주세요.",
        en: "Your partner's reaction may feel off and leave you hurt. It's more likely their day than your fault. Don't press; step back and give them room.",
        zh: "对方反应和平时不同，可能让你委屈。那多半不是你的问题，而是对方今天的状态。别追问，退一步等等看。",
        ja: "相手の反応がいつもと違って寂しく感じるかも。それはあなたのせいではなく、その人の一日のせいである可能性が高いです。問い詰めず一歩引いて待ってあげて。" },
    ],
    [
      { ko: "큰 설렘도 큰 다툼도 없는 잔잔한 연애운이에요. 특별한 이벤트보다 짧은 안부 한 번이 관계를 따뜻하게 합니다. 솔로라면 억지로 움직이기보다 나를 가꾸는 날로 쓰세요.",
        en: "Calm love luck with neither big thrills nor fights. A brief check-in warms things more than any event. If single, use today for yourself rather than forcing moves.",
        zh: "没有大心动也没有大争执的平静爱情运。一句简短的问候比特别的活动更能温暖关系。单身的话，与其勉强行动，不如用来经营自己。",
        ja: "大きなときめきも喧嘩もない穏やかな恋愛運。特別なイベントより短い一言の気遣いが関係を温めます。独り身なら無理に動くより自分を磨く日に。" },
      { ko: "서로의 일상을 존중하는 게 어울리는 날이에요. 상대의 시간을 채우려 하기보다 각자의 리듬을 지켜 주세요. 느슨한 거리가 오히려 애정을 오래가게 합니다.",
        en: "A day for respecting each other's routines. Rather than filling your partner's time, keep your own rhythms. A loose distance helps affection last.",
        zh: "适合尊重彼此日常的一天。别总想填满对方的时间，守住各自的节奏。松弛的距离反而让感情更长久。",
        ja: "お互いの日常を尊重するのが似合う日。相手の時間を埋めようとせず、それぞれのリズムを守って。緩い距離がかえって愛情を長持ちさせます。" },
    ],
    [
      { ko: "마음이 통하는 순간이 찾아오는 좋은 연애운이에요. 평소 하지 못한 다정한 말을 오늘은 꺼내 보세요. 솔로라면 자연스러운 자리에서 눈이 마주치는 사람을 눈여겨보세요.",
        en: "A good day for moments of real connection. Say the tender thing you usually hold back. If single, notice who meets your eyes in an ordinary setting.",
        zh: "心意相通的时刻会到来的好爱情运。平时说不出口的温柔话，今天试着说出来。单身的话，留意在自然场合中与你目光相遇的人。",
        ja: "心が通じる瞬間が訪れる良い恋愛運。普段言えない優しい言葉を今日は口にしてみて。独り身なら自然な場で目が合う人に注目を。" },
      { ko: "작은 배려가 큰 감동으로 돌아오는 날이에요. 상대가 좋아하는 것을 하나 기억해 두었다가 건네 보세요. 관계에 온기가 돌고 대화가 길어집니다.",
        en: "Small thoughtfulness returns as deep appreciation today. Remember one thing your partner likes and offer it. Warmth returns and conversations run longer.",
        zh: "小小体贴换来大感动的一天。记住对方喜欢的一样东西，送给他。关系回温，对话也会变长。",
        ja: "小さな気遣いが大きな感動になって返ってくる日。相手の好きなものをひとつ覚えておいて渡してみて。関係に温もりが戻り、会話が長くなります。" },
    ],
    [
      { ko: "연애운이 크게 열리는 날이에요. 고백, 화해, 재회 같은 결정적 순간을 만들기에 좋습니다. 솔로라면 소개나 모임 제안을 거절하지 마세요. 뜻밖의 인연이 가까이 있습니다.",
        en: "Love luck opens wide today. It's a fine day for a decisive moment: a confession, a reconciliation, a reunion. If single, don't turn down an introduction or gathering. An unexpected connection is near.",
        zh: "爱情运大开的一天。适合创造表白、和解、重逢这样的决定性时刻。单身的话，别拒绝介绍或聚会。意外的缘分就在附近。",
        ja: "恋愛運が大きく開く日。告白、仲直り、再会といった決定的な瞬間を作るのに良い日です。独り身なら紹介や集まりの誘いを断らないで。思わぬ縁がすぐ近くにあります。" },
      { ko: "당신의 매력이 평소보다 두 배로 빛나는 날이에요. 자신감 있게 표현할수록 좋은 반응이 돌아옵니다. 연인이 있다면 오늘의 데이트는 오래 기억에 남을 거예요.",
        en: "Your charm shines twice as bright today. The more confidently you express yourself, the better the response. If partnered, today's date will be long remembered.",
        zh: "你的魅力比平时耀眼一倍的日子。越自信地表达，回应越好。有伴侣的话，今天的约会会被长久铭记。",
        ja: "あなたの魅力がいつもの倍輝く日。自信を持って表現するほど良い反応が返ってきます。恋人がいるなら今日のデートは長く記憶に残るでしょう。" },
    ],
    [
      { ko: "연애운이 최고인 날이에요. 마음에 둔 사람이 있다면 오늘 움직이세요. 운명 같은 타이밍이 당신 편입니다. 연인과는 오래 기억될 약속을 하기에도 좋은 날이에요.",
        en: "Love luck is at its peak. If someone is on your mind, make your move today; fateful timing is on your side. With a partner, it's a lovely day for a promise you'll both remember.",
        zh: "爱情运极佳的一天。心里有人的话，今天就行动。命运般的时机站在你这边。和伴侣许下会被长久铭记的约定也很好。",
        ja: "恋愛運が最高の日。想う人がいるなら今日動いて。運命のようなタイミングが味方です。恋人とは長く記憶に残る約束をするのにも良い日。" },
      { ko: "사랑이 넘치는 하루예요. 누군가의 진심이 전해지거나 당신의 진심이 닿는 일이 생깁니다. 오늘 나눈 대화는 관계의 전환점이 될 수 있으니 솔직하게 말하세요.",
        en: "A day overflowing with love. Someone's sincerity reaches you, or yours reaches them. Today's conversation can be a turning point, so speak honestly.",
        zh: "充满爱的一天。会有人的真心传到你这里，或你的真心传达给对方。今天的对话可能成为关系的转折点，请坦诚地说。",
        ja: "愛にあふれる一日。誰かの真心が届くか、あなたの真心が伝わる出来事が起きます。今日交わす会話は関係の転換点になり得るので、素直に話して。" },
    ],
  ],
  health: [
    [],
    [
      { ko: "몸이 보내는 신호를 무시하면 안 되는 날이에요. 피로가 쌓여 있다면 오늘은 일정을 줄이고 일찍 잠자리에 드세요. 무리한 운동이나 늦은 야식은 피하는 게 좋습니다.",
        en: "Don't ignore your body's signals today. If fatigue has built up, trim your schedule and sleep early. Skip hard workouts and late-night snacks.",
        zh: "今天不能忽视身体发出的信号。疲劳累积的话，减少日程、早点睡。避免剧烈运动和深夜宵夜。",
        ja: "体のサインを無視してはいけない日。疲れが溜まっているなら予定を減らして早めに就寝を。無理な運動や夜食は避けた方が良いです。" },
      { ko: "컨디션이 떨어지기 쉬운 날이에요. 따뜻한 물을 자주 마시고 목과 어깨를 틈틈이 풀어 주세요. 오늘 쉬어 두면 이번 주가 편해집니다.",
        en: "Your condition dips easily today. Sip warm water often and loosen your neck and shoulders now and then. Rest today and the rest of the week goes easier.",
        zh: "状态容易下滑的一天。常喝温水，时不时放松脖子和肩膀。今天休息好，这一周都会轻松。",
        ja: "コンディションが落ちやすい日。白湯をこまめに飲み、首と肩を時々ほぐして。今日休んでおけば今週が楽になります。" },
    ],
    [
      { ko: "특별히 아픈 곳은 없지만 활력이 넘치지도 않는 보통의 날이에요. 가벼운 산책 20분이 기분과 몸을 동시에 깨워 줍니다. 식사는 거르지 말고 제때 챙기세요.",
        en: "Nothing hurts, but energy isn't high either. A light 20-minute walk wakes both mood and body. Don't skip meals; eat on time.",
        zh: "没什么不舒服，但也不算精力充沛的普通日子。轻松散步20分钟能同时唤醒心情和身体。别不吃饭，按时吃。",
        ja: "特に悪いところはないけれど活力に満ちているわけでもない普通の日。軽い散歩20分が気分と体を同時に目覚めさせます。食事は抜かず時間通りに。" },
      { ko: "무난한 건강운이에요. 평소 습관을 그대로 유지하면 문제없습니다. 다만 앉아 있는 시간이 길다면 한 시간에 한 번은 일어나 기지개를 켜 주세요.",
        en: "Steady health luck. Keep your usual habits and you'll be fine. If you sit for long stretches, stand and stretch once an hour.",
        zh: "平稳的健康运。保持平时的习惯就没问题。如果久坐，每小时起来伸个懒腰。",
        ja: "無難な健康運。普段の習慣をそのまま維持すれば問題ありません。ただ座っている時間が長いなら一時間に一度は立ち上がって伸びを。" },
    ],
    [
      { ko: "몸과 마음이 가벼운 좋은 날이에요. 미뤄 둔 운동을 다시 시작하기에 적당합니다. 햇볕을 쬐며 걷는 시간이 길수록 운이 더 좋아집니다.",
        en: "Body and mind feel light today. A good day to restart the exercise you've postponed. The longer you walk in sunlight, the better your luck.",
        zh: "身心轻盈的好日子。适合重新开始搁置的运动。晒着太阳走路的时间越长，运气越好。",
        ja: "体も心も軽い良い日。先延ばしにしていた運動を再開するのに適しています。日差しを浴びて歩く時間が長いほど運が良くなります。" },
      { ko: "회복력이 좋은 날이에요. 피로가 있었다면 오늘 밤 푹 자고 나면 거의 풀립니다. 건강에 좋은 음식이 유난히 맛있게 느껴질 거예요.",
        en: "Recovery comes easily today. Any fatigue mostly clears after a deep sleep tonight. Healthy food will taste unusually good.",
        zh: "恢复力强的一天。有疲劳的话，今晚好好睡一觉基本就缓过来。健康的食物会格外好吃。",
        ja: "回復力の良い日。疲れがあっても今夜ぐっすり眠ればほとんど取れます。体に良い食べ物が特別においしく感じるはず。" },
    ],
    [
      { ko: "에너지가 넘치는 날이에요. 몸을 쓰는 활동이 평소보다 즐겁고 성과도 좋습니다. 다만 넘치는 기운에 무리하지 않도록 수분 보충을 잊지 마세요.",
        en: "You're brimming with energy today. Physical activity feels better and pays off more than usual. Just don't let the surge push you too far; keep hydrating.",
        zh: "精力充沛的一天。体力活动比平时更愉快，效果也更好。但别因为劲头足而过度，记得补水。",
        ja: "エネルギーにあふれる日。体を使う活動がいつもより楽しく成果も良いです。ただし勢いで無理しないよう水分補給を忘れずに。" },
      { ko: "컨디션이 아주 좋은 날이에요. 집중력과 체력이 함께 올라와 오래 미룬 일을 끝내기 좋습니다. 좋은 상태일 때 수면 리듬을 정리해 두면 효과가 오래갑니다.",
        en: "You're in very good shape today. Focus and stamina rise together, making it ideal for finishing a long-delayed task. Set your sleep rhythm while you feel good and it lasts.",
        zh: "状态非常好的一天。专注力和体力一起提升，适合完成拖了很久的事。趁状态好把睡眠节奏调整好，效果能持续很久。",
        ja: "コンディションがとても良い日。集中力と体力が一緒に上がり、長く先延ばしにしていたことを終えるのに最適。調子の良い時に睡眠リズムを整えておくと効果が長続きします。" },
    ],
    [
      { ko: "건강운이 최고인 날이에요. 몸이 가볍고 머리가 맑아 무엇을 해도 잘 됩니다. 새로운 운동이나 식습관을 시작하기에 더없이 좋은 출발점이에요.",
        en: "Health luck is at its best. Your body feels light and your head clear, so everything goes well. A perfect starting point for a new exercise or eating habit.",
        zh: "健康运极佳的一天。身体轻盈、头脑清醒，做什么都顺。是开始新运动或饮食习惯的绝佳起点。",
        ja: "健康運が最高の日。体が軽く頭も冴えて何をしてもうまくいきます。新しい運動や食習慣を始めるのにこれ以上ない出発点。" },
      { ko: "활력이 가득 찬 하루예요. 오랜만에 몸을 크게 움직여 보세요. 땀을 흘리고 나면 마음속 묵은 걱정까지 함께 씻겨 나갈 거예요.",
        en: "A day full of vitality. Move your body in a big way for a change. After a good sweat, even old worries wash away with it.",
        zh: "活力满满的一天。久违地大幅活动一下身体吧。出一身汗，心里积压的烦恼也会一起洗掉。",
        ja: "活力に満ちた一日。久しぶりに体を大きく動かしてみて。汗を流せば心の中の古い心配事まで一緒に洗い流されます。" },
    ],
  ],
  work: [
    [],
    [
      { ko: "실수가 나오기 쉬운 날이에요. 보내기 전에 한 번 더 읽고, 제출하기 전에 한 번 더 확인하세요. 새로운 일을 벌이기보다 기존 일을 지키는 날입니다.",
        en: "Mistakes slip in easily today. Read once more before sending, check once more before submitting. Protect existing work instead of launching new things.",
        zh: "容易出错的一天。发送前再读一遍，提交前再确认一遍。今天是守住现有工作而非开启新事的日子。",
        ja: "ミスが出やすい日。送る前にもう一度読み、提出前にもう一度確認を。新しいことを始めるより既存の仕事を守る日です。" },
      { ko: "집중이 흐트러지고 의욕이 떨어질 수 있어요. 큰 과제는 작게 쪼개서 하나씩만 처리하세요. 오늘 버틴 것만으로도 충분히 잘한 날입니다.",
        en: "Focus scatters and motivation dips today. Break big tasks into small pieces and handle them one at a time. Just getting through today is doing well.",
        zh: "注意力容易分散、干劲下降。把大任务拆小，一件件处理。今天能撑下来就已经做得很好。",
        ja: "集中が乱れ意欲が落ちるかも。大きな課題は小さく分けてひとつずつ処理を。今日を乗り切っただけで十分よくやった日です。" },
    ],
    [
      { ko: "크게 바쁘지도 한가하지도 않은 보통의 업무운이에요. 밀린 자료 정리나 메일 답장처럼 손이 가지 않던 일을 처리하기 좋습니다. 기본을 다지면 다음 주가 편해져요.",
        en: "An ordinary work day, neither hectic nor idle. Good for clearing the backlog: filing, replies, loose ends. Shore up the basics and next week gets easier.",
        zh: "不忙也不闲的普通事业运。适合处理积压的资料整理、邮件回复这类一直没动手的事。打好基础，下周会轻松。",
        ja: "大して忙しくも暇でもない普通の仕事運。溜まった資料整理やメールの返信など手が回らなかったことを片付けるのに良い日。基本を固めれば来週が楽になります。" },
      { ko: "무난하게 흘러가는 날이에요. 눈에 띄는 성과는 없어도 꾸준함이 쌓이는 중입니다. 동료나 친구와 가볍게 나눈 대화에서 쓸 만한 아이디어가 나올 수 있어요.",
        en: "A smooth, uneventful day. No visible wins, but consistency is accumulating. A casual chat with a colleague or friend may yield a usable idea.",
        zh: "平顺流过的一天。虽然没有显眼的成果，但坚持在积累。和同事或朋友的闲聊中可能冒出可用的点子。",
        ja: "無難に流れる日。目立つ成果はなくても継続が積み重なっています。同僚や友人との何気ない会話から使えるアイデアが出るかも。" },
    ],
    [
      { ko: "일이 순조롭게 풀리는 좋은 날이에요. 집중력이 좋아 평소보다 빨리 끝나는 과제가 생깁니다. 남는 시간은 다음 단계를 미리 그려 보는 데 쓰세요.",
        en: "Work unfolds smoothly today. Good focus means some tasks finish faster than usual. Use the spare time to sketch the next step.",
        zh: "工作顺利推进的好日子。专注力好，有些任务会比平时更快完成。多出来的时间用来提前规划下一步。",
        ja: "仕事がスムーズに進む良い日。集中力が良く、いつもより早く終わる課題が出てきます。余った時間は次のステップを先に描くことに。" },
      { ko: "노력이 눈에 보이기 시작하는 날이에요. 작은 칭찬이나 인정을 받을 수 있습니다. 공부 중이라면 어려웠던 부분이 갑자기 이해되는 순간이 올 거예요.",
        en: "Your effort starts to show today. Small praise or recognition may come. If you're studying, a hard concept may suddenly click.",
        zh: "努力开始显现的一天。可能得到小小的表扬或认可。在学习的话，难懂的部分会突然豁然开朗。",
        ja: "努力が目に見え始める日。小さな褒め言葉や評価を得られるかも。勉強中なら難しかった部分が急に理解できる瞬間が来ます。" },
    ],
    [
      { ko: "성과가 뚜렷하게 드러나는 날이에요. 발표, 면접, 시험처럼 평가받는 자리가 있다면 자신 있게 임하세요. 준비한 것 이상으로 좋은 결과가 따라옵니다.",
        en: "Results show clearly today. If you have a presentation, interview, or exam, go in with confidence. Outcomes exceed what you prepared for.",
        zh: "成果清晰显现的一天。有演讲、面试、考试这类被评价的场合，自信地去。会得到超出准备的好结果。",
        ja: "成果がはっきり現れる日。発表、面接、試験など評価される場があるなら自信を持って臨んで。準備した以上の良い結果がついてきます。" },
      { ko: "리더십과 판단력이 빛나는 날이에요. 의견을 내야 하는 자리에서 주저하지 마세요. 당신의 제안이 흐름을 바꾸는 계기가 될 수 있습니다.",
        en: "Leadership and judgment shine today. Don't hesitate where your opinion is needed. Your proposal could change the direction of things.",
        zh: "领导力和判断力闪光的一天。需要发表意见的场合别犹豫。你的提议可能成为改变走向的契机。",
        ja: "リーダーシップと判断力が輝く日。意見を出すべき場で躊躇しないで。あなたの提案が流れを変えるきっかけになり得ます。" },
    ],
    [
      { ko: "직장·학업운이 최고인 날이에요. 오래 공들인 프로젝트가 결실을 맺거나 중요한 기회가 찾아옵니다. 오늘 내린 결정은 길게 보아도 옳은 선택이 될 거예요.",
        en: "Work and study luck peaks today. A long-nurtured project bears fruit or a major opportunity arrives. Decisions made today prove right in the long run.",
        zh: "事业·学业运极佳的一天。长期用心的项目开花结果，或重要机会到来。今天做的决定从长远看也会是正确的。",
        ja: "仕事・学業運が最高の日。長く手をかけたプロジェクトが実を結ぶか、重要な機会が訪れます。今日下した決断は長い目で見ても正しい選択になるでしょう。" },
      { ko: "능력을 마음껏 펼칠 수 있는 날이에요. 어려워 보이던 문제가 의외로 간단히 풀립니다. 주변에서 도움의 손길도 이어지니 혼자 끌어안지 말고 함께 하세요.",
        en: "A day to use your abilities to the fullest. Problems that looked hard turn out simple. Help keeps arriving too, so don't carry it alone.",
        zh: "能尽情施展能力的一天。看似困难的问题意外地轻松解决。周围也会伸出援手，别一个人扛，一起做。",
        ja: "能力を思う存分発揮できる日。難しそうに見えた問題が意外と簡単に解けます。周囲からの助けも続くので、一人で抱え込まず一緒に。" },
    ],
  ],
};

/** 가장 좋은 영역을 살리는 조언 (영역별 3가지) */
export const categoryAdvice: Record<FortuneCategory, LText[]> = {
  wealth: [
    { ko: "오늘 들어온 좋은 기운은 돈과 관련된 결정에 쓰세요. 미뤄 둔 정산이나 협상을 마무리하기 좋습니다.", en: "Spend today's good energy on money decisions. It's a fine time to close a pending settlement or negotiation.", zh: "把今天的好运用在和钱有关的决定上。适合完成拖延的结算或谈判。", ja: "今日の良い気はお金に関する決断に使って。先延ばしの精算や交渉をまとめるのに良いです。" },
    { ko: "재물운이 받쳐 주는 날이니 평소 궁금했던 재테크 정보를 찾아보세요. 작은 공부가 큰 차이를 만듭니다.", en: "With wealth luck behind you, look into the financial topic you've been curious about. A little study makes a big difference.", zh: "财运撑腰的日子，去查查一直好奇的理财信息。小小的学习带来大差别。", ja: "金運が支えてくれる日なので、気になっていた資産運用の情報を調べてみて。小さな学びが大きな差を生みます。" },
    { ko: "복은 나눌수록 커져요. 오늘은 소중한 사람에게 작은 선물이나 식사를 베풀어 보세요.", en: "Luck grows when shared. Treat someone dear to a small gift or a meal today.", zh: "福气越分享越大。今天请珍视的人吃顿饭或送个小礼物吧。", ja: "福は分けるほど大きくなります。今日は大切な人に小さな贈り物や食事をごちそうしてみて。" },
  ],
  love: [
    { ko: "마음을 표현하기에 가장 좋은 날이에요. 평소 아끼던 말을 오늘은 꺼내 보세요.", en: "The best day to express your feelings. Say the words you've been saving.", zh: "表达心意的最佳日子。平时舍不得说的话，今天说出来吧。", ja: "気持ちを表現するのに最も良い日。普段しまっていた言葉を今日は口にしてみて。" },
    { ko: "먼저 연락하는 쪽이 이기는 날이에요. 보고 싶은 사람에게 짧은 안부라도 보내 보세요.", en: "Whoever reaches out first wins today. Send even a short hello to someone you miss.", zh: "先联系的一方会赢的日子。给想念的人哪怕发个简短问候。", ja: "先に連絡した方が勝つ日。会いたい人に短い一言でも送ってみて。" },
    { ko: "연애운이 강한 날엔 모임과 초대를 거절하지 마세요. 뜻밖의 인연이 그 자리에 있습니다.", en: "On a strong love day, don't decline gatherings or invitations. An unexpected connection waits there.", zh: "爱情运强的日子别拒绝聚会和邀请。意外的缘分就在那里。", ja: "恋愛運が強い日は集まりや招待を断らないで。思わぬ縁がその場にあります。" },
  ],
  health: [
    { ko: "몸이 가벼운 날이니 오래 미룬 운동을 오늘 시작하세요. 20분이면 충분합니다.", en: "Your body feels light, so start the exercise you've postponed. Twenty minutes is enough.", zh: "身体轻盈的日子，今天就开始搁置已久的运动。20分钟就够。", ja: "体が軽い日なので、長く先延ばしにしていた運動を今日始めて。20分で十分です。" },
    { ko: "좋은 컨디션일 때 수면 시간을 정리해 두세요. 오늘 만든 리듬이 한 주를 지켜 줍니다.", en: "Set your sleep schedule while you feel good. The rhythm you make today protects your week.", zh: "状态好的时候把睡眠时间调整好。今天建立的节奏会守护这一周。", ja: "調子が良い時に睡眠時間を整えておいて。今日作ったリズムが一週間を守ってくれます。" },
    { ko: "햇볕 아래에서 걷는 시간을 일부러 만들어 보세요. 몸과 운이 함께 충전됩니다.", en: "Make time to walk in the sun on purpose. Body and luck recharge together.", zh: "刻意留出在阳光下散步的时间。身体和运气一起充电。", ja: "日差しの下を歩く時間をあえて作ってみて。体と運が一緒に充電されます。" },
  ],
  work: [
    { ko: "집중력이 좋은 날이니 가장 어려운 일을 오전에 처리하세요. 오후는 가볍게 흘러갑니다.", en: "Focus is strong today, so tackle the hardest task in the morning. The afternoon flows easily.", zh: "专注力好的日子，上午处理最难的事。下午会轻松流过。", ja: "集中力が良い日なので、最も難しい仕事を午前中に処理を。午後は軽く流れます。" },
    { ko: "의견을 내야 하는 자리가 있다면 오늘 하세요. 당신의 제안이 평소보다 잘 받아들여집니다.", en: "If there's a place to voice your opinion, do it today. Your proposals land better than usual.", zh: "有需要发表意见的场合，今天就说。你的提议比平时更容易被接受。", ja: "意見を出すべき場があるなら今日のうちに。あなたの提案がいつもより受け入れられやすいです。" },
    { ko: "배우고 있는 것이 있다면 오늘 한 단계 더 나아가 보세요. 어렵던 부분이 풀리는 날입니다.", en: "If you're learning something, push one step further today. Hard parts come loose.", zh: "有正在学的东西，今天再进一步。难点会被攻克。", ja: "学んでいることがあるなら今日もう一段進んでみて。難しかった部分がほどける日です。" },
  ],
};

/** 가장 약한 영역을 지키는 주의 (영역별 3가지) */
export const categoryCaution: Record<FortuneCategory, LText[]> = {
  wealth: [
    { ko: "충동구매와 즉흥적인 결제는 오늘만 참으세요. 내일 봐도 필요하면 그때 사도 늦지 않아요.", en: "Hold off on impulse buys and spontaneous payments just for today. If you still want it tomorrow, it's not too late.", zh: "冲动购物和临时付款今天忍一忍。明天还需要的话再买也不迟。", ja: "衝動買いと即興の支払いは今日だけ我慢を。明日見てもまだ必要なら、その時買っても遅くありません。" },
    { ko: "돈을 빌려주거나 보증을 서는 일은 피하세요. 가까운 사이일수록 더 신중해야 하는 날입니다.", en: "Avoid lending money or co-signing today. The closer the person, the more careful you need to be.", zh: "避免借钱给人或做担保。越是亲近的人越要谨慎的一天。", ja: "お金を貸したり保証人になるのは避けて。近い間柄ほど慎重になるべき日です。" },
    { ko: "큰 금액이 오가는 결정은 하루 이틀 미루세요. 흐름이 바뀐 뒤에 보면 다른 답이 보입니다.", en: "Delay any decision involving a large sum by a day or two. Once the current shifts, a different answer appears.", zh: "涉及大额的决定推迟一两天。走势变化后再看，会有不同的答案。", ja: "大きな金額が動く決断は一両日延ばして。流れが変わった後に見ると違う答えが見えてきます。" },
  ],
  love: [
    { ko: "서운한 말이 나오려 할 때 한 박자만 쉬세요. 오늘의 오해는 내일이면 풀릴 작은 일입니다.", en: "When a hurt remark rises, pause one beat. Today's misunderstanding is a small thing that clears by tomorrow.", zh: "想说委屈话的时候停一拍。今天的误会是明天就能解开的小事。", ja: "寂しさから言葉が出そうな時は一拍置いて。今日の誤解は明日には解ける小さなことです。" },
    { ko: "상대의 반응을 억지로 확인하려 하지 마세요. 기다림이 오늘은 가장 좋은 애정 표현입니다.", en: "Don't force a reaction from your partner. Waiting is the best show of affection today.", zh: "别勉强去确认对方的反应。等待是今天最好的爱意表达。", ja: "相手の反応を無理に確かめようとしないで。待つことが今日いちばんの愛情表現です。" },
    { ko: "중요한 고백이나 결정적인 대화는 다른 날로 미루세요. 오늘은 들어 주는 쪽이 어울립니다.", en: "Postpone major confessions or decisive talks to another day. Today suits listening.", zh: "重要的表白或决定性的对话改天再说。今天适合做倾听的一方。", ja: "大事な告白や決定的な会話は別の日に。今日は聞き役が似合います。" },
  ],
  health: [
    { ko: "피곤함을 참고 버티지 마세요. 오늘 30분 더 자는 것이 어떤 영양제보다 효과적입니다.", en: "Don't push through fatigue. Thirty extra minutes of sleep beats any supplement today.", zh: "别硬撑着疲劳。今天多睡30分钟比任何保健品都有效。", ja: "疲れを我慢して耐えないで。今日30分多く眠ることがどんなサプリより効果的です。" },
    { ko: "과식과 늦은 야식은 피하세요. 속이 편해야 운도 편하게 들어옵니다.", en: "Skip overeating and late-night snacks. A settled stomach lets luck settle in too.", zh: "避免暴食和深夜宵夜。肠胃舒服，运气才进得顺。", ja: "食べ過ぎと夜食は避けて。お腹が楽だと運も楽に入ってきます。" },
    { ko: "무리한 운동이나 급한 움직임을 조심하세요. 계단과 길바닥에서 발밑을 한 번 더 보는 날입니다.", en: "Be careful with hard workouts and sudden moves. Watch your step on stairs and pavement today.", zh: "小心剧烈运动和急促动作。今天在楼梯和路面上多看一眼脚下。", ja: "無理な運動や急な動きに注意を。階段や道で足元をもう一度見る日です。" },
  ],
  work: [
    { ko: "보내기 전에 한 번 더 읽으세요. 오늘의 실수는 대부분 서두름에서 나옵니다.", en: "Read once more before sending. Most of today's mistakes come from hurry.", zh: "发送前再读一遍。今天的失误大多来自匆忙。", ja: "送る前にもう一度読んで。今日のミスはほとんど急ぎから生まれます。" },
    { ko: "새 일을 벌이거나 큰 약속을 하지 마세요. 지금 맡은 일을 지키는 것만으로 충분한 날입니다.", en: "Don't launch new projects or make big promises. Keeping what you already hold is enough today.", zh: "别开启新项目或许下大承诺。守住现有的工作就足够的一天。", ja: "新しいことを始めたり大きな約束をしないで。今任されている仕事を守るだけで十分な日です。" },
    { ko: "의견 충돌이 생기면 오늘은 한발 물러서세요. 내일 다시 꺼내면 훨씬 부드럽게 풀립니다.", en: "If opinions clash, step back for today. Raise it again tomorrow and it resolves far more smoothly.", zh: "意见冲突时今天先退一步。明天再提会顺畅得多。", ja: "意見がぶつかったら今日は一歩引いて。明日また持ち出せばずっと柔らかく解決します。" },
  ],
};

// ───────────────────────────── 예전 형식 (오늘의 관상 운세에서 사용) ─────────────────────────────
export const advices: Record<string, string>[] = [
  { ko: "오늘은 새로운 시작을 하기 좋은 날이에요!", en: "Today is a great day for new beginnings!", zh: "今天是开始新事物的好日子！", ja: "今日は新しいことを始めるのに良い日です！" },
  { ko: "주변 사람들에게 따뜻한 말 한마디를 건네보세요.", en: "Try saying something warm to people around you.", zh: "试着对周围的人说些温暖的话。", ja: "周りの人に温かい言葉をかけてみてください。" },
  { ko: "작은 일에도 감사하는 마음을 가져보세요.", en: "Be grateful for even the small things.", zh: "对小事也要心存感激。", ja: "小さなことにも感謝の気持ちを持ちましょう。" },
  { ko: "오래 미뤄둔 일을 처리하면 마음이 가벼워질 거예요.", en: "Handling postponed tasks will lighten your heart.", zh: "处理拖延的事情会让你心情轻松。", ja: "先延ばしにしていた仕事を片付けると心が軽くなります。" },
  { ko: "오늘 만나는 사람이 행운을 가져다줄 수 있어요.", en: "Someone you meet today might bring luck.", zh: "今天遇到的人可能会带来好运。", ja: "今日出会う人が幸運をもたらすかも。" },
  { ko: "직감을 믿어보세요. 오늘은 느낌이 맞을 거예요.", en: "Trust your intuition. Your feelings will be right today.", zh: "相信你的直觉。今天感觉会很准。", ja: "直感を信じてください。今日は当たります。" },
  { ko: "무리하지 말고 자신의 페이스를 지키세요.", en: "Don't push yourself, keep your own pace.", zh: "不要勉强自己，保持自己的节奏。", ja: "無理せず自分のペースを守りましょう。" },
  { ko: "오늘은 집중력이 높아지는 날이에요. 중요한 일을 해보세요.", en: "Your focus is high today. Try doing important tasks.", zh: "今天注意力很集中。尝试做重要的事。", ja: "今日は集中力が高まる日。大事な仕事をしましょう。" },
  { ko: "웃음이 행운을 불러옵니다. 많이 웃어보세요!", en: "Laughter brings luck. Smile more!", zh: "笑容会带来好运。多笑笑吧！", ja: "笑いは幸運を呼びます。たくさん笑いましょう！" },
  { ko: "오늘은 솔직한 대화가 관계를 개선시킬 거예요.", en: "Honest conversation will improve relationships today.", zh: "今天坦诚的对话会改善关系。", ja: "今日は素直な会話が関係を良くします。" },
  { ko: "예상치 못한 좋은 소식이 올 수 있어요!", en: "Unexpected good news may come!", zh: "可能会有意想不到的好消息！", ja: "予想外の良いニュースが来るかも！" },
  { ko: "오늘은 창의력이 빛나는 날이에요.", en: "Your creativity shines today.", zh: "今天是创意闪耀的日子。", ja: "今日は創造力が輝く日です。" },
  { ko: "가까운 사람에게 연락해보세요. 기쁜 일이 생길 거예요.", en: "Contact someone close. Something happy will happen.", zh: "联系亲近的人。会有好事发生。", ja: "身近な人に連絡してみて。嬉しいことがありますよ。" },
  { ko: "오늘 결정한 일은 좋은 결과를 가져올 거예요.", en: "Decisions made today will bring good results.", zh: "今天做的决定会带来好结果。", ja: "今日決めたことは良い結果をもたらします。" },
  { ko: "몸과 마음의 휴식이 필요한 날이에요.", en: "Today you need rest for body and mind.", zh: "今天需要身心休息。", ja: "今日は体と心の休息が必要です。" },
  { ko: "주변을 정리하면 기분도 정리될 거예요.", en: "Organizing your surroundings will clear your mind.", zh: "整理周围环境，心情也会变好。", ja: "周りを整理すると気持ちも整理されます。" },
  { ko: "오늘은 배움의 기회가 찾아올 수 있어요.", en: "Learning opportunities may come today.", zh: "今天可能会有学习的机会。", ja: "今日は学びの機会が訪れるかも。" },
  { ko: "긍정적인 생각이 긍정적인 결과를 만들어요.", en: "Positive thoughts create positive results.", zh: "积极的想法创造积极的结果。", ja: "ポジティブな考えがポジティブな結果を生みます。" },
  { ko: "오늘은 재테크에 관심을 가져볼 만한 날이에요.", en: "Today is good for financial interests.", zh: "今天适合关注理财。", ja: "今日は資産運用に関心を持つと良い日です。" },
  { ko: "자신을 믿으세요. 당신은 충분히 잘하고 있어요.", en: "Believe in yourself. You're doing great.", zh: "相信自己。你做得很好。", ja: "自分を信じてください。あなたは十分頑張っています。" },
  { ko: "오늘 하루도 당신은 특별해요!", en: "You are special today too!", zh: "今天的你也很特别！", ja: "今日もあなたは特別です！" },
  { ko: "작은 변화가 큰 행복을 가져다줄 거예요.", en: "Small changes will bring great happiness.", zh: "小改变会带来大幸福。", ja: "小さな変化が大きな幸せをもたらします。" },
  { ko: "오늘은 도전을 두려워하지 마세요.", en: "Don't be afraid of challenges today.", zh: "今天不要害怕挑战。", ja: "今日は挑戦を恐れないでください。" },
  { ko: "진심은 언젠가 통하기 마련이에요.", en: "Sincerity will eventually reach others.", zh: "真心总会被理解的。", ja: "真心はいつか通じるものです。" },
  { ko: "오늘은 과거보다 미래에 집중하세요.", en: "Focus on the future rather than the past today.", zh: "今天专注于未来而不是过去。", ja: "今日は過去より未来に集中しましょう。" },
  { ko: "좋은 습관 하나를 시작해보세요.", en: "Start one good habit.", zh: "开始一个好习惯吧。", ja: "良い習慣を一つ始めてみてください。" },
  { ko: "오늘의 노력이 내일의 성과가 될 거예요.", en: "Today's effort will become tomorrow's achievement.", zh: "今天的努力会成为明天的成果。", ja: "今日の努力が明日の成果になります。" },
  { ko: "자연과 함께하면 에너지가 충전될 거예요.", en: "Being with nature will recharge your energy.", zh: "与大自然在一起会充满能量。", ja: "自然と一緒にいるとエネルギーが充電されます。" },
  { ko: "오늘은 사랑을 표현하기 좋은 날이에요.", en: "Today is a good day to express love.", zh: "今天是表达爱的好日子。", ja: "今日は愛を表現するのに良い日です。" },
  { ko: "건강한 식사가 오늘의 운을 높여줄 거예요.", en: "Healthy eating will boost your luck today.", zh: "健康饮食会提升今天的运气。", ja: "健康的な食事が今日の運を高めます。" },
];

export const warnings: Record<string, string>[] = [
  { ko: "급한 결정은 피하세요.", en: "Avoid hasty decisions.", zh: "避免仓促决定。", ja: "急な決断は避けましょう。" },
  { ko: "물 근처에서 조심하세요.", en: "Be careful near water.", zh: "在水边要小心。", ja: "水の近くでは気をつけて。" },
  { ko: "금전 거래는 신중하게.", en: "Be careful with financial transactions.", zh: "金钱交易要谨慎。", ja: "金銭取引は慎重に。" },
  { ko: "말 실수에 주의하세요.", en: "Watch your words.", zh: "注意言辞。", ja: "言葉遣いに気をつけて。" },
  { ko: "과식은 피하세요.", en: "Avoid overeating.", zh: "避免暴饮暴食。", ja: "食べ過ぎに注意。" },
  { ko: "늦은 시간 외출은 삼가세요.", en: "Avoid going out late.", zh: "避免深夜外出。", ja: "遅い時間の外出は控えて。" },
  { ko: "감정적인 대응을 피하세요.", en: "Avoid emotional responses.", zh: "避免情绪化反应。", ja: "感情的な対応は避けて。" },
  { ko: "중요한 물건 분실에 주의하세요.", en: "Watch out for losing important items.", zh: "注意重要物品丢失。", ja: "大切なものの紛失に注意。" },
  { ko: "무리한 약속은 하지 마세요.", en: "Don't make impossible promises.", zh: "不要做无法实现的承诺。", ja: "無理な約束はしないで。" },
  { ko: "건강 관리에 신경 쓰세요.", en: "Take care of your health.", zh: "注意健康管理。", ja: "健康管理に気をつけて。" },
  { ko: "교통 안전에 주의하세요.", en: "Watch out for traffic safety.", zh: "注意交通安全。", ja: "交通安全に注意。" },
  { ko: "충동구매를 피하세요.", en: "Avoid impulse buying.", zh: "避免冲动购物。", ja: "衝動買いは避けて。" },
  { ko: "험담이나 소문에 휘말리지 마세요.", en: "Don't get involved in gossip.", zh: "不要卷入闲话或谣言。", ja: "噂話に巻き込まれないで。" },
  { ko: "컨디션 관리를 잘 하세요.", en: "Take good care of your condition.", zh: "好好管理身体状态。", ja: "コンディション管理をしっかり。" },
  { ko: "지나친 자신감은 경계하세요.", en: "Beware of overconfidence.", zh: "警惕过度自信。", ja: "過度な自信には気をつけて。" },
  { ko: "약속 시간을 지키세요.", en: "Keep your appointments.", zh: "遵守约定时间。", ja: "約束の時間を守って。" },
  { ko: "스트레스 관리에 신경 쓰세요.", en: "Manage your stress.", zh: "注意压力管理。", ja: "ストレス管理に気をつけて。" },
  { ko: "전자기기 사용을 줄여보세요.", en: "Reduce electronic device usage.", zh: "减少电子设备使用。", ja: "電子機器の使用を減らして。" },
  { ko: "수면 부족에 주의하세요.", en: "Watch out for lack of sleep.", zh: "注意睡眠不足。", ja: "睡眠不足に注意。" },
  { ko: "혼자 결정하지 말고 상의해보세요.", en: "Don't decide alone, consult others.", zh: "不要独自决定，多商量。", ja: "一人で決めずに相談して。" },
];

// ───────────────────────────── 난수·시드 ─────────────────────────────
/** 시드 기반 난수 생성기 (같은 시드 → 같은 순서의 난수) */
export function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

/** 문자열 → 숫자 해시 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// ───────────────────────────── 운세 생성 ─────────────────────────────
export interface DailyFortune {
  /** YYYY-MM-DD (현지 날짜) */
  date: string;
  animal: ZodiacAnimal;
  sign: StarSign;
  /** 영역별 점수 1~5 */
  scores: Record<FortuneCategory, number>;
  /** 영역별 본문 */
  texts: Record<FortuneCategory, LText>;
  /** 종합운 등급 1~5 */
  overall: number;
  /** 종합운 점수 0~100 (게이지 표시용) */
  overallScore: number;
  overallText: LText;
  keyword: LText;
  /** 가장 좋은 영역과 그 영역을 살리는 조언 */
  bestCategory: FortuneCategory;
  advice: LText;
  /** 가장 약한 영역과 그 영역을 지키는 주의 */
  weakCategory: FortuneCategory;
  caution: LText;
  luckyNumber: number;
  /** luckyColors 의 키 */
  luckyColor: string;
  /** luckyDirections 의 키 */
  luckyDirection: string;
  luckyTime: LText;
  luckyItem: { emoji: string; name: LText };
}

/** 현지 시간 기준 오늘 날짜 (YYYY-MM-DD). 자정에 운세가 바뀐다 */
export function getLocalDateKey(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 두 난수의 평균 → 1~5. 극단값(1, 5)이 너무 자주 나오지 않도록 가운데로 모은다. 띠별·별자리별 운세(src/data/fortune-signs.ts)도 같이 쓴다 */
export function pickScore(random: () => number): number {
  const v = (random() + random()) / 2; // 0~1, 삼각 분포
  return Math.min(5, Math.max(1, Math.floor(v * 5) + 1));
}

/** 종합 점수(0~100) → 등급 1~5 */
export function overallScoreToLevel(score: number): number {
  if (score < 52) return 1;
  if (score < 64) return 2;
  if (score < 76) return 3;
  if (score < 88) return 4;
  return 5;
}

export interface FortuneInput {
  name: string;
  year: number;
  month: number;
  day: number;
  /** 테스트용. 생략하면 오늘 */
  date?: string;
}

export function generateDailyFortune({ name, year, month, day, date }: FortuneInput): DailyFortune {
  const dateKey = date ?? getLocalDateKey();
  const birth = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const seed = hashString(`${name.trim()}|${birth}|${dateKey}`);
  const random = seededRandom(seed);
  // 선형 합동 생성기는 첫 값이 시드에 치우치므로 몇 번 버린다
  random(); random(); random();

  const animal = getZodiacAnimal(year);
  const sign = getStarSign(month, day);

  const scores: Record<FortuneCategory, number> = {
    wealth: pickScore(random),
    love: pickScore(random),
    health: pickScore(random),
    work: pickScore(random),
  };

  const pickVariant = <T,>(arr: T[]): T => arr[Math.floor(random() * arr.length)];

  const texts = {
    wealth: pickVariant(categoryTexts.wealth[scores.wealth]),
    love: pickVariant(categoryTexts.love[scores.love]),
    health: pickVariant(categoryTexts.health[scores.health]),
    work: pickVariant(categoryTexts.work[scores.work]),
  };

  // 종합 점수: 네 영역 합(4~20)을 40~98 사이로 펼치고 약간의 흔들림을 더한다
  const sum = scores.wealth + scores.love + scores.health + scores.work;
  const base = 40 + ((sum - 4) / 16) * 58;
  const overallScore = Math.round(Math.min(99, Math.max(35, base + (random() * 8 - 4))));
  const overall = overallScoreToLevel(overallScore);
  const overallText = pickVariant(overallTexts[overall]);

  // 가장 좋은 영역 / 가장 약한 영역 (동점이면 먼저 나온 영역)
  const order: FortuneCategory[] = ["wealth", "love", "health", "work"];
  let bestCategory = order[0];
  let weakCategory = order[0];
  for (const c of order) {
    if (scores[c] > scores[bestCategory]) bestCategory = c;
    if (scores[c] < scores[weakCategory]) weakCategory = c;
  }
  // 모두 같은 점수라면 조언·주의가 같은 영역을 가리키지 않도록 다른 영역을 고른다
  if (bestCategory === weakCategory) weakCategory = order[(order.indexOf(bestCategory) + 2) % 4];

  const colorKeys = Object.keys(luckyColors);
  const directionKeys = Object.keys(luckyDirections);

  return {
    date: dateKey,
    animal,
    sign,
    scores,
    texts,
    overall,
    overallScore,
    overallText,
    keyword: pickVariant(fortuneKeywords),
    bestCategory,
    advice: pickVariant(categoryAdvice[bestCategory]),
    weakCategory,
    caution: pickVariant(categoryCaution[weakCategory]),
    luckyNumber: Math.floor(random() * 45) + 1,
    luckyColor: colorKeys[Math.floor(random() * colorKeys.length)],
    luckyDirection: directionKeys[Math.floor(random() * directionKeys.length)],
    luckyTime: pickVariant(luckyTimes),
    luckyItem: pickVariant(luckyItems),
  };
}
