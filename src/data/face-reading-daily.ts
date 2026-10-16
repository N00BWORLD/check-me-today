// 오늘의 관상 운세
// - 관상 결과 유형(id)과 오늘 날짜로 시드를 만들어 매일 다른 운세를 낸다 (같은 날은 같은 결과)
// - 조언·주의·행운의 색·방향은 오늘의 운세(src/data/fortunes.ts)의 문구를 그대로 가져와 두 콘텐츠를 잇는다

import { advices, hashString, luckyColors, luckyDirections, seededRandom, warnings } from "./fortunes";
import { FaceReadingResult, LocalizedText, TraitKey, traitOrder } from "./face-reading";

export interface DailyFaceFortune {
  /** YYYY-MM-DD (기기 기준 날짜) */
  date: string;
  /** 종합운 1~5 */
  overall: number;
  /** 운세 항목별 오늘의 별점 1~5 */
  traits: Record<TraitKey, number>;
  /** 유형(1등 성향)에 맞춘 오늘의 한마디 */
  message: LocalizedText;
  /** 오늘의 조언 (오늘의 운세와 공용) */
  advice: LocalizedText;
  /** 오늘 주의할 점 (오늘의 운세와 공용) */
  warning: LocalizedText;
  luckyNumber: number;
  /** luckyColors 의 키 */
  luckyColorKey: string;
  /** luckyDirections 의 키 */
  luckyDirectionKey: string;
  /** 행운의 글자 (언어별 목록 luckyInitials 의 인덱스. 한국어는 초성) */
  luckyInitialIndex: number;
  /** 행운의 물건 */
  luckyItem: LocalizedText;
  /** 행운의 음식 */
  luckyFood: LocalizedText;
  /** 행운의 시간 */
  luckyTime: LocalizedText;
}

/** 행운의 글자: 한국어는 초성, 영어는 알파벳, 중국어는 천간, 일본어는 오십음 행 */
export const luckyInitials: Record<string, string[]> = {
  ko: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  zh: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  ja: ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"],
};

/** 행운의 물건 */
export const luckyItems: LocalizedText[] = [
  { ko: "손수건", en: "Handkerchief", zh: "手帕", ja: "ハンカチ" },
  { ko: "빨간 양말", en: "Red socks", zh: "红袜子", ja: "赤い靴下" },
  { ko: "동전 한 닢", en: "A single coin", zh: "一枚硬币", ja: "小銭一枚" },
  { ko: "모자", en: "Hat", zh: "帽子", ja: "帽子" },
  { ko: "우산", en: "Umbrella", zh: "雨伞", ja: "傘" },
  { ko: "부채", en: "Folding fan", zh: "扇子", ja: "扇子" },
  { ko: "지팡이", en: "Walking stick", zh: "拐杖", ja: "杖" },
  { ko: "돋보기", en: "Reading glasses", zh: "老花镜", ja: "老眼鏡" },
  { ko: "꽃 한 송이", en: "A single flower", zh: "一朵花", ja: "花一輪" },
  { ko: "사진 한 장", en: "A photograph", zh: "一张照片", ja: "写真一枚" },
  { ko: "열쇠고리", en: "Key ring", zh: "钥匙扣", ja: "キーホルダー" },
  { ko: "보온병", en: "Thermos", zh: "保温瓶", ja: "水筒" },
  { ko: "작은 거울", en: "Small mirror", zh: "小镜子", ja: "小さな鏡" },
  { ko: "볼펜", en: "Ballpoint pen", zh: "圆珠笔", ja: "ボールペン" },
  { ko: "장바구니", en: "Shopping basket", zh: "购物篮", ja: "買い物かご" },
  { ko: "라디오", en: "Radio", zh: "收音机", ja: "ラジオ" },
  { ko: "목도리", en: "Scarf", zh: "围巾", ja: "マフラー" },
  { ko: "달력", en: "Calendar", zh: "日历", ja: "カレンダー" },
  { ko: "손목시계", en: "Wristwatch", zh: "手表", ja: "腕時計" },
  { ko: "편한 신발", en: "Comfortable shoes", zh: "舒适的鞋", ja: "楽な靴" },
];

/** 행운의 음식 */
export const luckyFoods: LocalizedText[] = [
  { ko: "따뜻한 국밥", en: "Hot rice soup", zh: "热汤饭", ja: "温かいクッパ" },
  { ko: "삶은 달걀", en: "Boiled egg", zh: "水煮蛋", ja: "ゆで卵" },
  { ko: "사과 한 개", en: "An apple", zh: "一个苹果", ja: "りんご一個" },
  { ko: "구운 고구마", en: "Roasted sweet potato", zh: "烤红薯", ja: "焼き芋" },
  { ko: "된장찌개", en: "Soybean paste stew", zh: "大酱汤", ja: "味噌チゲ" },
  { ko: "미역국", en: "Seaweed soup", zh: "海带汤", ja: "わかめスープ" },
  { ko: "잡곡밥", en: "Multigrain rice", zh: "杂粮饭", ja: "雑穀ご飯" },
  { ko: "두부 한 모", en: "A block of tofu", zh: "一块豆腐", ja: "豆腐一丁" },
  { ko: "생선구이", en: "Grilled fish", zh: "烤鱼", ja: "焼き魚" },
  { ko: "귤", en: "Tangerine", zh: "橘子", ja: "みかん" },
  { ko: "호두 몇 알", en: "A few walnuts", zh: "几颗核桃", ja: "くるみ数粒" },
  { ko: "따뜻한 차 한 잔", en: "A cup of warm tea", zh: "一杯热茶", ja: "温かいお茶一杯" },
  { ko: "떡 한 조각", en: "A piece of rice cake", zh: "一块年糕", ja: "お餅一切れ" },
  { ko: "콩나물국", en: "Bean sprout soup", zh: "豆芽汤", ja: "豆もやしスープ" },
  { ko: "바나나", en: "Banana", zh: "香蕉", ja: "バナナ" },
  { ko: "김치전", en: "Kimchi pancake", zh: "泡菜煎饼", ja: "キムチチヂミ" },
];

/** 행운의 시간 */
export const luckyTimes: LocalizedText[] = [
  { ko: "이른 아침 (6~8시)", en: "Early morning (6-8)", zh: "清晨 (6~8点)", ja: "早朝 (6〜8時)" },
  { ko: "오전 (9~11시)", en: "Mid-morning (9-11)", zh: "上午 (9~11点)", ja: "午前 (9〜11時)" },
  { ko: "점심 무렵 (12~1시)", en: "Around noon (12-1)", zh: "午间 (12~1点)", ja: "お昼ごろ (12〜1時)" },
  { ko: "오후 (2~4시)", en: "Afternoon (2-4)", zh: "下午 (2~4点)", ja: "午後 (2〜4時)" },
  { ko: "해 질 녘 (5~7시)", en: "Dusk (5-7)", zh: "傍晚 (5~7点)", ja: "夕暮れ (5〜7時)" },
  { ko: "저녁 (8~10시)", en: "Evening (8-10)", zh: "晚上 (8~10点)", ja: "夜 (8〜10時)" },
];

/** 운세 항목 × 오늘의 등급(1~5)별 짧은 코멘트. 화면에는 별 대신 이 코멘트만 보여 준다 */
export const dailyTraitComments: Record<TraitKey, LocalizedText[]> = {
  wealth: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "지갑은 닫아 두세요", en: "Keep the purse closed", zh: "钱包先合上", ja: "財布は閉じておいて" },
    { ko: "꼭 필요한 데만 쓰세요", en: "Spend only on needs", zh: "只花必要的钱", ja: "必要なところだけに" },
    { ko: "들어온 만큼 나가는 날", en: "In and out evenly", zh: "有进有出", ja: "入った分だけ出る日" },
    { ko: "작은 돈이 들어옵니다", en: "A little money comes", zh: "小钱进账", ja: "小さなお金が入ります" },
    { ko: "뜻밖의 돈복이 있는 날", en: "Unexpected money luck", zh: "有意外财运", ja: "思いがけない金運の日" },
  ],
  wisdom: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "판단은 내일로 미루세요", en: "Delay judgments", zh: "判断推到明天", ja: "判断は明日に" },
    { ko: "아는 길로만 가세요", en: "Stick to familiar roads", zh: "走熟路", ja: "知っている道だけを" },
    { ko: "평소처럼 차분한 날", en: "Calm as usual", zh: "和平常一样冷静", ja: "いつも通り落ち着いた日" },
    { ko: "좋은 생각이 떠오릅니다", en: "Good ideas come", zh: "好主意浮现", ja: "良い考えが浮かびます" },
    { ko: "머리가 가장 맑은 날", en: "Clearest mind today", zh: "头脑最清醒的一天", ja: "頭がいちばん澄む日" },
  ],
  leadership: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "나서지 말고 지켜보세요", en: "Hold back and watch", zh: "别出头，先观望", ja: "出しゃばらず見守って" },
    { ko: "남의 뜻을 따르는 날", en: "Follow others today", zh: "顺从他人的一天", ja: "人の意見に従う日" },
    { ko: "맡은 일만 잘하면 무난", en: "Do your part, all is fine", zh: "做好本分即可", ja: "自分の役目をこなせば無難" },
    { ko: "사람들이 당신을 따릅니다", en: "People follow you", zh: "人们追随您", ja: "人があなたについてきます" },
    { ko: "앞장서면 크게 이깁니다", en: "Lead and win big", zh: "带头就大胜", ja: "先頭に立てば大きく勝ちます" },
  ],
  charm: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "말을 아끼는 게 좋습니다", en: "Fewer words are better", zh: "少说为妙", ja: "言葉を控えめに" },
    { ko: "오해가 생기기 쉬운 날", en: "Misunderstandings likely", zh: "容易产生误会", ja: "誤解が生まれやすい日" },
    { ko: "편안한 만남이 있습니다", en: "A relaxed meeting", zh: "有轻松的会面", ja: "気楽な出会いがあります" },
    { ko: "반가운 연락이 옵니다", en: "A welcome call comes", zh: "有令人高兴的联系", ja: "嬉しい連絡が来ます" },
    { ko: "귀인을 만나는 날", en: "You meet a benefactor", zh: "遇贵人的一天", ja: "貴人に出会う日" },
  ],
  health: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "푹 쉬어야 하는 날", en: "A day to rest well", zh: "需要好好休息", ja: "ゆっくり休む日" },
    { ko: "무리한 외출은 삼가세요", en: "Avoid tiring outings", zh: "避免劳累外出", ja: "無理な外出は控えて" },
    { ko: "가볍게 움직이면 좋습니다", en: "Light movement helps", zh: "轻微活动有益", ja: "軽く動くと良いです" },
    { ko: "몸이 가볍고 기운찹니다", en: "Light body, good energy", zh: "身轻有劲", ja: "体が軽く元気です" },
    { ko: "최고의 컨디션", en: "Peak condition", zh: "最佳状态", ja: "最高の体調" },
  ],
  fortune: [
    { ko: "", en: "", zh: "", ja: "" },
    { ko: "조심조심 지나가는 날", en: "Tread carefully today", zh: "小心度过的一天", ja: "慎重に過ごす日" },
    { ko: "큰 기대 없이 보내세요", en: "Keep expectations low", zh: "别抱太大期待", ja: "大きな期待をせずに" },
    { ko: "소소한 복이 있습니다", en: "Small blessings", zh: "有小福气", ja: "ささやかな福があります" },
    { ko: "좋은 소식이 올 수 있어요", en: "Good news may come", zh: "可能有好消息", ja: "良い知らせが来るかも" },
    { ko: "복이 가득한 날", en: "A day full of blessing", zh: "福气满满的一天", ja: "福に満ちた日" },
  ],
};

/** 기기 기준 오늘 날짜를 YYYY-MM-DD 로 (자정에 바뀌도록 UTC 가 아니라 현지 시간을 쓴다) */
export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 1등 성향별 "오늘의 한마디" 문구 모음. 어르신이 하루를 시작하며 읽기 좋은 짧은 말 */
export const dailyMessages: Record<TraitKey, LocalizedText[]> = {
  wealth: [
    { ko: "오늘은 지갑을 열기보다 닫는 날입니다. 안 쓴 돈이 내일의 복이 됩니다.", en: "Today is for closing the purse, not opening it. Money unspent becomes tomorrow's blessing.", zh: "今天宜合钱包而非打开。没花的钱是明天的福。", ja: "今日は財布を開くより閉じる日です。使わなかったお金が明日の福になります。" },
    { ko: "작은 거래에 복이 붙는 날입니다. 시장에 가서 물건값을 한 번 더 물어보세요.", en: "Blessing clings to small deals today. Ask the price once more at the market.", zh: "今天小买卖有福。去市场再问一次价。", ja: "小さな取引に福がつく日です。市場で値段をもう一度聞いてみてください。" },
    { ko: "오래 묵혀 둔 물건을 정리하면 뜻밖의 돈이 나옵니다.", en: "Clearing out long-kept things turns up unexpected money.", zh: "整理久放的东西会冒出意外的钱。", ja: "長く置いてあった物を片付けると思いがけないお金が出てきます。" },
    { ko: "오늘 들어오는 돈은 반은 쓰고 반은 두세요. 그래야 복이 이어집니다.", en: "Spend half of today's income and keep half, so the blessing continues.", zh: "今天进来的钱一半花一半留，福才会延续。", ja: "今日入るお金は半分使い、半分残してください。そうして福が続きます。" },
    { ko: "누군가에게 밥을 사는 날입니다. 그 밥값이 열 배로 돌아옵니다.", en: "Today, buy someone a meal. That meal returns tenfold.", zh: "今天请人吃顿饭，饭钱十倍回报。", ja: "誰かにご飯をおごる日です。その代金は十倍になって戻ります。" },
    { ko: "큰 결정은 내일로 미루세요. 오늘은 셈이 흐려지기 쉽습니다.", en: "Put off big decisions until tomorrow. Numbers blur easily today.", zh: "大决定推到明天，今天容易算不清。", ja: "大きな決定は明日に回してください。今日は計算が曇りやすいです。" },
    { ko: "재물운이 밝은 날입니다. 미뤄 둔 돈 이야기를 꺼내기 좋습니다.", en: "Wealth luck is bright today, a good day to raise that money talk you put off.", zh: "财运明朗的一天，适合谈拖延的钱事。", ja: "財運が明るい日です。先延ばしにしていたお金の話を切り出すのに良い日です。" },
  ],
  wisdom: [
    { ko: "오늘은 말하기보다 듣는 날입니다. 들은 것 중 하나가 답이 됩니다.", en: "Today is for listening, not speaking. One thing you hear will be the answer.", zh: "今天宜听不宜说，听到的话里有答案。", ja: "今日は話すより聞く日です。聞いたことの一つが答えになります。" },
    { ko: "신문이나 책을 한 장만 읽어도 머리가 맑아지는 날입니다.", en: "Even one page of a paper or book clears the head today.", zh: "今天哪怕读一页报纸或书，头脑也会清醒。", ja: "新聞や本を一枚読むだけで頭が澄む日です。" },
    { ko: "오래 풀리지 않던 일의 실마리가 보입니다. 서두르지 말고 적어 두세요.", en: "A thread appears in a long-stuck matter. Write it down instead of rushing.", zh: "久未解决的事有了头绪，别急，先记下来。", ja: "長く解けなかったことの糸口が見えます。急がず書き留めてください。" },
    { ko: "젊은 사람의 말에 오늘의 지혜가 들어 있습니다. 끝까지 들어 주세요.", en: "Today's wisdom hides in a young person's words. Hear them out.", zh: "今天的智慧藏在年轻人的话里，听到最后。", ja: "若い人の言葉に今日の知恵があります。最後まで聞いてあげてください。" },
    { ko: "기억력이 좋은 날입니다. 잊고 있던 사람 이름이 떠오르면 연락해 보세요.", en: "Memory is sharp today. If a forgotten name comes back, reach out.", zh: "今天记性好，想起忘了的名字就联系一下。", ja: "記憶力が良い日です。忘れていた人の名前が浮かんだら連絡してみてください。" },
    { ko: "오늘은 가르칠 일이 생깁니다. 아는 것을 쉽게 풀어 주면 덕이 쌓입니다.", en: "A chance to teach comes today. Explain simply and virtue builds.", zh: "今天会有教人的机会，讲得简单就积德。", ja: "今日は教えることが起きます。知っていることを易しく語れば徳が積まれます。" },
    { ko: "생각이 많아지는 날입니다. 걱정은 종이에 적고 접어 두세요.", en: "Thoughts multiply today. Write worries on paper and fold it away.", zh: "今天想得多，把忧虑写在纸上折起来。", ja: "考えが多くなる日です。心配は紙に書いて折りたたんでおいてください。" },
  ],
  leadership: [
    { ko: "오늘은 누군가 당신의 결정을 기다립니다. 짧고 분명하게 말해 주세요.", en: "Someone is waiting for your decision today. Say it short and clear.", zh: "今天有人在等您的决定，说得简短明确。", ja: "今日は誰かがあなたの決定を待っています。短くはっきり伝えてください。" },
    { ko: "앞장서면 따라오는 날입니다. 산책이든 모임이든 먼저 제안하세요.", en: "Lead and they follow today. Be the first to suggest a walk or a gathering.", zh: "今天您带头大家就跟，散步聚会都先提议。", ja: "先頭に立てばついてくる日です。散歩でも集まりでも先に提案してください。" },
    { ko: "오늘은 한 걸음 물러서는 것이 더 큰 통솔입니다. 아랫사람에게 맡겨 보세요.", en: "Stepping back is the greater leadership today. Let the younger ones handle it.", zh: "今天退一步才是更大的统率，交给晚辈试试。", ja: "今日は一歩引くことがより大きな統率です。下の人に任せてみてください。" },
    { ko: "윗사람이나 관청과 얽힌 일이 잘 풀리는 날입니다.", en: "Matters with superiors or officials go smoothly today.", zh: "今天与上级或官府相关的事顺利。", ja: "目上の人や役所に関わることがうまく運ぶ日です。" },
    { ko: "화를 낼 일이 생겨도 오늘은 참는 쪽이 이깁니다.", en: "Even if anger comes, patience wins today.", zh: "今天即使生气，忍的一方赢。", ja: "腹の立つことがあっても今日は耐える方が勝ちます。" },
    { ko: "책임질 일이 하나 더 생깁니다. 받아들이면 자리가 단단해집니다.", en: "One more responsibility comes. Accept it and your seat grows firmer.", zh: "今天多一件要负责的事，接下来位置更稳。", ja: "責任を負うことが一つ増えます。受け入れれば地位が固まります。" },
    { ko: "오늘은 공을 남에게 돌리는 날입니다. 그만큼 명예가 돌아옵니다.", en: "Give the credit away today, and honor returns in equal measure.", zh: "今天把功劳让给别人，名誉同等回报。", ja: "今日は功を人に譲る日です。その分名誉が戻ってきます。" },
  ],
  charm: [
    { ko: "오늘 걸려 오는 전화는 꼭 받으세요. 반가운 사람입니다.", en: "Answer every call today. It is someone you will be glad to hear from.", zh: "今天来电一定接，是想见的人。", ja: "今日かかってくる電話は必ず出てください。懐かしい人です。" },
    { ko: "웃는 얼굴이 오늘의 부적입니다. 먼저 인사하면 좋은 일이 따라옵니다.", en: "A smiling face is today's charm. Greet first and good things follow.", zh: "笑脸是今天的护身符，先打招呼好事跟着来。", ja: "笑顔が今日のお守りです。先に挨拶すれば良いことがついてきます。" },
    { ko: "오래 못 본 사람에게 안부를 전하기 좋은 날입니다.", en: "A good day to send word to someone you have not seen in a long time.", zh: "今天适合问候久未见的人。", ja: "長く会っていない人に安否を伝えるのに良い日です。" },
    { ko: "오늘은 베푼 만큼 돌아옵니다. 작은 간식이라도 나누어 보세요.", en: "What you give returns today. Share even a small snack.", zh: "今天付出多少回多少，哪怕分点小零食。", ja: "今日は施した分だけ戻ってきます。小さなおやつでも分けてみてください。" },
    { ko: "사람 많은 자리에 복이 있습니다. 혼자 있지 말고 나가 보세요.", en: "Blessing sits where people gather. Do not stay alone; go out.", zh: "今天人多的地方有福，别独处，出去走走。", ja: "人の多い場に福があります。一人でいずに出かけてみてください。" },
    { ko: "오늘은 거절해도 미움받지 않습니다. 힘든 부탁은 웃으며 사양하세요.", en: "Refusing will not cost you today. Decline hard requests with a smile.", zh: "今天拒绝也不招怨，难办的请求笑着推辞。", ja: "今日は断っても嫌われません。無理な頼みは笑って辞退してください。" },
    { ko: "손주나 자녀에게서 기쁜 소식이 올 수 있는 날입니다.", en: "Happy news may come from children or grandchildren today.", zh: "今天可能收到儿孙的好消息。", ja: "孫や子から嬉しい知らせが来るかもしれない日です。" },
  ],
  health: [
    { ko: "오늘은 몸이 가벼운 날입니다. 평소보다 열 걸음만 더 걸어 보세요.", en: "The body feels light today. Walk ten steps more than usual.", zh: "今天身体轻快，比平时多走十步。", ja: "今日は体が軽い日です。いつもより十歩だけ多く歩いてみてください。" },
    { ko: "따뜻한 물 한 잔으로 하루를 시작하면 운이 트입니다.", en: "Start the day with a cup of warm water and luck opens up.", zh: "用一杯温水开始一天，运势打开。", ja: "温かい水を一杯飲んで一日を始めると運が開けます。" },
    { ko: "오늘은 무리하지 않는 것이 가장 큰 복입니다. 낮잠도 보약입니다.", en: "Not overdoing it is today's greatest blessing. Even a nap is medicine.", zh: "今天不勉强就是最大的福，午睡也是补药。", ja: "今日は無理しないことが最大の福です。昼寝も薬です。" },
    { ko: "햇볕을 쬐는 날입니다. 창가에 앉기만 해도 기운이 돕니다.", en: "A day for sunlight. Even sitting by a window restores energy.", zh: "今天晒晒太阳，坐在窗边也有精神。", ja: "日差しを浴びる日です。窓辺に座るだけでも気が巡ります。" },
    { ko: "오늘 먹는 것이 보약입니다. 제철 음식을 한 가지 챙기세요.", en: "What you eat today is medicine. Have one seasonal food.", zh: "今天吃的就是补药，吃一样时令食物。", ja: "今日食べるものが薬です。旬の食べ物を一つ取り入れてください。" },
    { ko: "미뤄 둔 병원 예약을 잡기 좋은 날입니다. 걱정이 반으로 줄어듭니다.", en: "A good day to book that postponed doctor's visit. Worry halves.", zh: "今天适合预约拖延的看诊，担忧减半。", ja: "先延ばしにしていた病院の予約を取るのに良い日です。心配が半分になります。" },
    { ko: "건강운이 가장 밝은 날입니다. 오늘 시작한 운동은 오래갑니다.", en: "Health luck is at its brightest. Exercise begun today lasts.", zh: "今天健康运最旺，今天开始的运动能坚持。", ja: "健康運がいちばん明るい日です。今日始めた運動は長く続きます。" },
  ],
  fortune: [
    { ko: "오늘은 뜻밖의 좋은 소식이 오는 날입니다. 문자와 우편을 잘 살피세요.", en: "Unexpected good news comes today. Check your messages and mail.", zh: "今天有意外的好消息，留意短信和邮件。", ja: "今日は思いがけない良い知らせが来る日です。メッセージと郵便をよく見てください。" },
    { ko: "복이 들어오는 날입니다. 현관을 깨끗이 하면 더 크게 들어옵니다.", en: "Blessing enters today. Clean the entryway and more comes in.", zh: "今天福气进门，把门口打扫干净进得更多。", ja: "福が入ってくる日です。玄関をきれいにすればもっと大きく入ります。" },
    { ko: "오늘은 작은 행운이 여러 번 옵니다. 하나씩 고맙다고 말하세요.", en: "Small lucks come several times today. Say thanks for each one.", zh: "今天小幸运来好几次，一个个说谢谢。", ja: "今日は小さな幸運が何度も来ます。一つずつありがとうと言ってください。" },
    { ko: "남에게 받은 복을 돌려주기 좋은 날입니다. 복은 돌수록 커집니다.", en: "A good day to pass on a blessing you received. Blessing grows as it circles.", zh: "今天适合把受到的福传出去，福越转越大。", ja: "人から受けた福を返すのに良い日です。福は巡るほど大きくなります。" },
    { ko: "오늘은 늦게 피는 복이 있습니다. 저녁 무렵에 좋은 일이 생깁니다.", en: "Today's blessing blooms late. Something good happens toward evening.", zh: "今天的福来得晚，傍晚有好事。", ja: "今日は遅く咲く福があります。夕方ごろに良いことが起きます。" },
    { ko: "잃어버린 줄 알았던 것이 돌아오는 날입니다.", en: "Something you thought was lost comes back today.", zh: "今天以为丢了的东西会回来。", ja: "失くしたと思っていたものが戻ってくる日です。" },
    { ko: "오늘은 그냥 편안히 지내는 것이 복입니다. 애쓰지 않아도 잘 풀립니다.", en: "Simply being at ease is today's blessing. Things work out without strain.", zh: "今天安安稳稳就是福，不费力也顺。", ja: "今日はただ穏やかに過ごすことが福です。頑張らなくてもうまく運びます。" },
  ],
};

/** 종합운 등급별 한 줄 (어르신용으로 다시 씀) */
export const dailyOverallTexts: LocalizedText[] = [
  { ko: "", en: "", zh: "", ja: "" },
  { ko: "조심조심 쉬어 가는 날", en: "A day to go gently and rest", zh: "小心慢行、休息的一天", ja: "慎重にゆっくり休む日" },
  { ko: "차분히 보내면 무난한 날", en: "An easy day if kept calm", zh: "平静度过就无妨的一天", ja: "落ち着いて過ごせば無難な日" },
  { ko: "소소하게 좋은 일이 있는 날", en: "A day with small good things", zh: "有小小好事的一天", ja: "ささやかに良いことがある日" },
  { ko: "기운이 밝고 일이 잘 풀리는 날", en: "A bright day when things go well", zh: "气运明亮、万事顺利的一天", ja: "気が明るく物事がよく運ぶ日" },
  { ko: "대길! 복이 가득한 최고의 날", en: "Great fortune! The best, blessing-filled day", zh: "大吉！福气满满的最佳一天", ja: "大吉！福に満ちた最高の日" },
];

/**
 * 오늘의 관상 운세를 만든다. 같은 유형·같은 날이면 항상 같은 결과.
 * - 1등 성향은 +1, 2등 성향은 반올림 +0.5 로 가중해 "내 상"의 강점이 더 자주 좋게 나온다
 */
export function generateDailyFaceFortune(result: FaceReadingResult, date: Date = new Date()): DailyFaceFortune {
  const dateKey = todayKey(date);
  const random = seededRandom(hashString(`face-${result.id}-${dateKey}`));
  const roll = () => Math.floor(random() * 5) + 1;

  const traits = {} as Record<TraitKey, number>;
  traitOrder.forEach((trait) => {
    let level = roll();
    if (trait === result.primaryTrait) level += 1;
    if (trait === result.secondaryTrait) level += Math.round(random());
    traits[trait] = Math.min(5, Math.max(1, level));
  });

  const sum = traitOrder.reduce((acc, trait) => acc + traits[trait], 0);
  const overall = Math.min(5, Math.max(1, Math.round(sum / traitOrder.length)));

  const messages = dailyMessages[result.primaryTrait];
  const colorKeys = Object.keys(luckyColors);
  const directionKeys = Object.keys(luckyDirections);

  return {
    date: dateKey,
    overall,
    traits,
    message: messages[Math.floor(random() * messages.length)],
    advice: advices[Math.floor(random() * advices.length)],
    warning: warnings[Math.floor(random() * warnings.length)],
    luckyNumber: Math.floor(random() * 99) + 1,
    luckyColorKey: colorKeys[Math.floor(random() * colorKeys.length)],
    luckyDirectionKey: directionKeys[Math.floor(random() * directionKeys.length)],
    // 언어별 목록 길이가 달라 큰 수를 저장하고 보여 줄 때 나머지 연산으로 고른다
    luckyInitialIndex: Math.floor(random() * 1000),
    luckyItem: luckyItems[Math.floor(random() * luckyItems.length)],
    luckyFood: luckyFoods[Math.floor(random() * luckyFoods.length)],
    luckyTime: luckyTimes[Math.floor(random() * luckyTimes.length)],
  };
}

/** 언어에 맞는 행운의 글자를 돌려준다 */
export function getLuckyInitial(index: number, lang: string): string {
  const list = luckyInitials[lang] ?? luckyInitials.en;
  return list[index % list.length];
}
