// 오늘의 운세 데이터

export interface FortuneResult {
  overall: number;       // 종합운 1-5
  wealth: number;        // 재물운 1-5
  love: number;          // 연애운 1-5
  health: number;        // 건강운 1-5
  work: number;          // 직장/학업운 1-5
  luckyNumber: number;   // 행운의 숫자
  luckyColor: string;    // 행운의 색상
  luckyDirection: string; // 행운의 방향
  advice: string;        // 오늘의 조언
  warning: string;       // 주의할 점
}

// 행운의 색상
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

// 행운의 방향
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

// 운세 조언 (60개+)
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

// 주의사항 (40개+)
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

// 종합운 설명
export const overallDescriptions: Record<number, Record<string, string>> = {
  1: { ko: "오늘은 조금 힘든 하루가 될 수 있어요. 무리하지 마세요.", en: "Today might be a bit tough. Don't push yourself.", zh: "今天可能会有点累。不要勉强自己。", ja: "今日は少し大変な日かも。無理しないで。" },
  2: { ko: "평범한 하루예요. 차분하게 보내세요.", en: "An ordinary day. Spend it calmly.", zh: "普通的一天。平静地度过吧。", ja: "普通の一日です。落ち着いて過ごして。" },
  3: { ko: "괜찮은 하루가 될 거예요. 긍정적으로!", en: "It will be a decent day. Stay positive!", zh: "会是不错的一天。保持积极！", ja: "まあまあの一日になるでしょう。前向きに！" },
  4: { ko: "좋은 기운이 함께하는 날이에요!", en: "Good energy is with you today!", zh: "今天有好运气陪伴你！", ja: "良いエネルギーが一緒にある日です！" },
  5: { ko: "대길! 최고의 하루가 될 거예요! 🎊", en: "Great fortune! It will be the best day! 🎊", zh: "大吉！会是最棒的一天！🎊", ja: "大吉！最高の一日になります！🎊" },
};

// 시드 기반 난수 생성기
export function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// 해시 함수 (문자열 → 숫자)
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 오늘의 운세 생성
export function generateFortune(name: string, birthDate: string): FortuneResult {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const seed = hashString(`${name}-${birthDate}-${today}`);
  const random = seededRandom(seed);
  
  const colorKeys = Object.keys(luckyColors);
  const directionKeys = Object.keys(luckyDirections);
  
  return {
    overall: Math.floor(random() * 5) + 1,
    wealth: Math.floor(random() * 5) + 1,
    love: Math.floor(random() * 5) + 1,
    health: Math.floor(random() * 5) + 1,
    work: Math.floor(random() * 5) + 1,
    luckyNumber: Math.floor(random() * 99) + 1,
    luckyColor: colorKeys[Math.floor(random() * colorKeys.length)],
    luckyDirection: directionKeys[Math.floor(random() * directionKeys.length)],
    advice: advices[Math.floor(random() * advices.length)].ko, // 언어별로 선택 필요
    warning: warnings[Math.floor(random() * warnings.length)].ko,
  };
}

// 언어별 운세 생성
export function generateFortuneWithLang(name: string, birthDate: string, lang: string): FortuneResult & { adviceText: string; warningText: string } {
  const today = new Date().toISOString().split('T')[0];
  const seed = hashString(`${name}-${birthDate}-${today}`);
  const random = seededRandom(seed);
  
  const colorKeys = Object.keys(luckyColors);
  const directionKeys = Object.keys(luckyDirections);
  
  const adviceIndex = Math.floor(random() * advices.length);
  const warningIndex = Math.floor(random() * warnings.length);
  
  const langKey = lang as keyof typeof advices[0];
  
  return {
    overall: Math.floor(random() * 5) + 1,
    wealth: Math.floor(random() * 5) + 1,
    love: Math.floor(random() * 5) + 1,
    health: Math.floor(random() * 5) + 1,
    work: Math.floor(random() * 5) + 1,
    luckyNumber: Math.floor(random() * 99) + 1,
    luckyColor: colorKeys[Math.floor(random() * colorKeys.length)],
    luckyDirection: directionKeys[Math.floor(random() * directionKeys.length)],
    advice: "",
    warning: "",
    adviceText: advices[adviceIndex][langKey] || advices[adviceIndex].en,
    warningText: warnings[warningIndex][langKey] || warnings[warningIndex].en,
  };
}
