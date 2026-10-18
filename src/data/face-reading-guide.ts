// 관상 콘텐츠 클러스터 데이터
// - 부위별 관상 가이드(/face-reading/guide/[part]) 본문: 전통 관상학에서의 의미, 형태별 해석, 자주 묻는 질문
// - 허브 페이지(/face-reading/guide) 소개글
// - 가이드·유형 페이지 공용 UI 문구
// 한국어 문장을 기준으로 쓰고 다른 언어는 뜻을 맞춘다. 문단 구분은 "\n\n".
// 출처 표현: 마의상서(麻衣相書)·신상전편(神相全篇)·유장상법(柳莊相法) 등 동양 고전의 일반적인 해석을 쉽게 풀어 쓴 것으로,
// 재미와 자기 이해를 위한 참고 자료이며 의학적·과학적 판단 근거가 아니다.

import { faceFeatures, faceReadingResults, type FaceFeature, type FaceOption, type FaceReadingResult, type LocalizedText } from "./face-reading";

/** 형태별 해석 하나 (예: 큰 눈 → 정이 많은 상) */
export interface FaceGuideShape {
  name: LocalizedText;
  meaning: LocalizedText;
}

/** 자주 묻는 질문 하나 */
export interface FaceGuideFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface FaceGuidePart {
  /** 주소에 쓰는 id (/face-reading/guide/{id}) */
  id: string;
  /** 부위 한자 (예: 眼) */
  hanja: string;
  emoji: string;
  /** 부위 이름 (예: 눈) */
  name: LocalizedText;
  /** 검색 결과용 제목. 루트 레이아웃이 " | Check Me Today" 를 붙이므로 사이트명은 넣지 않는다 */
  title: LocalizedText;
  /** 메타 설명 (120~160자 권장) */
  description: LocalizedText;
  keywords: Record<string, string[]>;
  /** 페이지 H1 */
  heading: LocalizedText;
  /** 전통 관상학에서 이 부위가 뜻하는 것 (2~3문단) */
  intro: LocalizedText;
  /** 형태별 해석 4~6가지 */
  shapes: FaceGuideShape[];
  /** 보는 법과 주의할 점 */
  tips: LocalizedText;
  /** 자주 묻는 질문 3개 */
  faq: FaceGuideFaq[];
  /** 관련이 깊은 결과 유형 id (src/data/face-reading-types) */
  relatedTypes: string[];
  /** 관상 테스트에서 묻는 부위면 그 질문 id (faceFeatures.id) */
  featureId?: string;
}

export const FACE_READING_PATH = "/face-reading";
export const FACE_GUIDE_PATH = "/face-reading/guide";
export const FACE_TYPES_PATH = "/face-reading/types";
export const FACE_EN_PATH = "/face-reading/en";

/** 관상 가이드·유형 페이지 콘텐츠 작성일 (JSON-LD·사이트맵 lastmod 용) */
export const FACE_GUIDE_PUBLISHED = "2026-10-18";

export const getFaceGuidePath = (partId: string) => `${FACE_GUIDE_PATH}/${partId}`;
export const getFaceTypePath = (typeId: string) => `${FACE_TYPES_PATH}/${typeId}`;

export const faceGuideParts: FaceGuidePart[] = [
  // ───────────────────────── 눈 ─────────────────────────
  {
    id: "eyes",
    hanja: "眼",
    emoji: "👀",
    featureId: "eyes",
    name: { ko: "눈", en: "Eyes", zh: "眼睛", ja: "目" },
    title: {
      ko: "눈 관상 보는 법 | 눈 모양별 성격과 운세",
      en: "Eye Face Reading | Personality and Fortune by Eye Shape",
      zh: "眼睛面相怎么看 | 不同眼型的性格与运势",
      ja: "目の人相の見方 | 目の形でわかる性格と運勢",
    },
    description: {
      ko: "관상에서 눈은 마음의 창이자 중년운을 보는 자리입니다. 큰 눈, 작은 눈, 올라간 눈꼬리, 내려간 눈꼬리, 봉황눈 등 눈 모양별 성격과 운세 해석을 정리했습니다.",
      en: "In face reading the eyes are the window of the heart and the seat of midlife fortune. Large eyes, small eyes, upturned and downturned corners, phoenix eyes: what each shape says about personality and luck.",
      zh: "面相中眼睛是心灵之窗，也是看中年运的部位。整理了大眼、小眼、上扬眼角、下垂眼角、凤眼等眼型的性格与运势解读。",
      ja: "人相で目は心の窓であり、中年運を見る場所です。大きい目、小さい目、上がった目尻、下がった目尻、鳳眼など目の形ごとの性格と運勢をまとめました。",
    },
    keywords: {
      ko: ["눈 관상", "눈 모양 관상", "눈꼬리 관상", "큰 눈 관상", "작은 눈 관상", "봉황눈", "쌍꺼풀 관상"],
      en: ["eye face reading", "eye shape personality", "korean face reading eyes", "phoenix eyes meaning"],
      zh: ["眼睛面相", "眼型性格", "凤眼面相"],
      ja: ["目 人相", "目の形 性格", "鳳眼 人相"],
    },
    heading: {
      ko: "눈 관상: 눈 모양으로 보는 성격과 운세",
      en: "Eye Face Reading: Personality and Fortune in the Eyes",
      zh: "眼睛面相：从眼型看性格与运势",
      ja: "目の人相：目の形で見る性格と運勢",
    },
    intro: {
      ko: "옛 관상서는 얼굴 전체를 백으로 칠 때 눈이 그 절반을 차지한다고 했습니다. 마의상서에서는 눈을 '감찰관(監察官)'이라 불러, 사람의 마음과 기운이 드러나는 자리로 보았습니다. 아무리 다른 부위가 잘 생겼어도 눈빛이 흐리면 좋은 상으로 치지 않았고, 반대로 눈이 맑고 또렷하면 다른 부위의 부족함을 덮는다고 했습니다. 그래서 관상을 볼 때는 눈의 크기나 모양보다 먼저 눈빛이 맑은지, 흰자위가 깨끗한지, 시선이 안정되어 있는지를 봅니다.\n\n눈은 나이로 치면 35세부터 40세 전후의 중년운을 맡습니다. 왼쪽 눈은 35~36세, 오른쪽 눈은 37~38세를 뜻한다고 하여 이 시기의 성취와 인간관계를 눈에서 읽었습니다. 또 눈은 지혜와 판단력, 그리고 정(情)을 보는 자리이기도 합니다. 눈이 크고 둥글면 감정이 풍부하고 사람을 잘 믿으며, 눈이 작고 길면 관찰력이 좋고 속을 쉽게 내보이지 않는다고 풀이합니다.\n\n눈을 볼 때는 눈 모양 자체와 함께 눈꼬리의 방향, 눈 사이의 거리, 눈 밑의 살집(누당·와잠)을 함께 봅니다. 눈 사이가 넓으면 마음이 너그럽고 느긋하며, 좁으면 집중력이 높고 예민한 편입니다. 눈 밑이 도톰하고 밝으면 자녀운과 애정운이 좋다고 하여 '와잠(臥蠶)'이라 부르며 귀하게 여겼습니다.",
      en: "The old texts said that if the whole face counts for a hundred, the eyes alone count for fifty. The Mayi Xiangfa calls them the 'inspecting official', the place where a person's heart and energy show through. No matter how well shaped the other features are, dull eyes were never read as a good face, while clear, steady eyes were said to cover the shortcomings of everything else. So a reader looks first at whether the gaze is clear, the whites are clean and the eyes rest calmly, and only then at size and shape.\n\nIn the age map of the face the eyes govern the mid-thirties to around forty. The left eye stands for ages 35 to 36 and the right for 37 to 38, so achievements and relationships of that period were read here. The eyes are also where wisdom, judgment and affection are seen. Large round eyes suggest rich emotion and a trusting nature, while small, long eyes suggest keen observation and a heart that is not easily shown.\n\nAlongside the basic shape, a reader looks at the direction of the outer corners, the distance between the eyes and the fullness under them. Wide-set eyes point to a generous, easygoing mind; close-set eyes to focus and sensitivity. A plump, bright area under the eye, called the 'lying silkworm', was prized as a sign of good luck with children and love.",
      zh: "古相书说，整张脸若算一百分，眼睛独占五十。《麻衣相法》称眼为“监察官”，是心神与气色显露的地方。其他部位再好，眼神浑浊也不算好相；反之眼睛清亮有神，可以弥补其他部位的不足。所以看相先看眼神是否清澈、眼白是否干净、目光是否安定，然后才看大小和形状。\n\n在流年上，眼睛主管三十五岁到四十岁前后的中年运，左眼主35~36岁，右眼主37~38岁，这一时期的成就与人际从眼睛来看。眼睛也是看智慧、判断力和情义的部位。眼大而圆者感情丰富、容易信人；眼小而长者观察力强、不轻易露心。\n\n看眼除了眼型本身，还要一起看眼尾方向、两眼距离和眼下的肉（泪堂、卧蚕）。两眼距离宽者心胸宽、性子慢；距离窄者专注而敏感。眼下饱满明亮称为“卧蚕”，主子女运与爱情运好，自古视为贵。",
      ja: "古い相書は、顔全体を百とすれば目だけで五十を占めると言いました。麻衣相法は目を「監察官」と呼び、人の心と気が表れる場所としました。他の部位がどれほど整っていても目が濁っていれば良い相とせず、逆に目が澄んではっきりしていれば他の部位の不足を補うとされます。そのため人相を見るときは、目の大きさや形より先に、目の光が澄んでいるか、白目がきれいか、視線が安定しているかを見ます。\n\n年齢で言えば目は35歳から40歳前後の中年運を受け持ちます。左目は35〜36歳、右目は37〜38歳を表すとされ、この時期の成果と人間関係を目から読みました。また目は知恵と判断力、そして情を見る場所でもあります。目が大きく丸ければ感情が豊かで人をよく信じ、目が小さく長ければ観察力があり本心を簡単に見せないと解釈します。\n\n目を見るときは目の形と一緒に、目尻の向き、両目の間隔、目の下のふくらみ（涙堂・臥蚕）も見ます。目の間隔が広ければ心が寛大でのんびりしており、狭ければ集中力が高く敏感な傾向です。目の下がふっくらと明るければ子ども運と愛情運が良いとされ、「臥蚕」と呼んで貴いものとしました。",
    },
    shapes: [
      {
        name: { ko: "크고 둥근 눈", en: "Large, round eyes", zh: "大而圆的眼睛", ja: "大きく丸い目" },
        meaning: {
          ko: "감정이 얼굴에 그대로 드러나는 솔직한 상입니다. 정이 많고 사람을 잘 믿어 주변에 사람이 모이지만, 남의 말에 쉽게 흔들리고 손해를 보기도 합니다. 예술·연예·서비스처럼 사람을 상대하는 일에 잘 맞고, 돈 문제는 믿을 만한 사람과 함께 결정하는 것이 좋습니다.",
          en: "An honest face whose feelings show at once. Warm and trusting, so people gather around you, but easily swayed by others and sometimes taken advantage of. Suited to art, entertainment and service work; money decisions are best made with someone you trust.",
          zh: "感情直接写在脸上的坦诚之相。重情、易信人，身边聚人，但也容易被人左右而吃亏。适合艺术、演艺、服务等与人打交道的工作，钱财之事最好与可靠的人一起决定。",
          ja: "感情がそのまま顔に出る正直な相です。情が深く人をよく信じるので周りに人が集まりますが、他人の言葉に揺れやすく損をすることもあります。芸術・芸能・サービスなど人を相手にする仕事に向き、お金のことは信頼できる人と一緒に決めるのが良いでしょう。",
        },
      },
      {
        name: { ko: "작고 긴 눈", en: "Small, long eyes", zh: "小而细长的眼睛", ja: "小さく細長い目" },
        meaning: {
          ko: "관찰력과 분석력이 뛰어난 상입니다. 속마음을 잘 드러내지 않아 차갑다는 말을 듣기도 하지만, 한번 마음을 주면 오래갑니다. 숫자와 계획에 강해 재물을 지키는 힘이 좋고, 연구·회계·전략처럼 꼼꼼함이 필요한 일에서 두각을 나타냅니다.",
          en: "A face of sharp observation and analysis. You rarely show your inner feelings, so some call you cool, but once you give your heart it lasts. Strong with numbers and plans, good at keeping wealth, and you shine in research, accounting or strategy.",
          zh: "观察力与分析力出众之相。不轻易露出内心，有时被说冷淡，但一旦交心便长久。擅长数字与规划，守财能力强，在研究、会计、策略等需要细致的工作中出彩。",
          ja: "観察力と分析力に優れた相です。本心をあまり見せないので冷たいと言われることもありますが、一度心を許せば長く続きます。数字と計画に強く財を守る力があり、研究・会計・戦略など緻密さが必要な仕事で頭角を現します。",
        },
      },
      {
        name: { ko: "올라간 눈꼬리", en: "Upturned corners", zh: "上扬的眼尾", ja: "上がった目尻" },
        meaning: {
          ko: "기운이 세고 승부욕이 강한 상입니다. 목표가 생기면 끝까지 밀어붙이며 경쟁에서 이기는 힘이 있어 사업이나 영업, 운동에 어울립니다. 다만 고집이 세고 말이 직설적이라 가까운 사람과 부딪히기 쉬우니, 한 박자 쉬고 말하는 습관이 운을 지킵니다.",
          en: "Strong energy and a competitive spirit. Once you have a goal you push to the end and tend to win, which suits business, sales and sport. Stubbornness and blunt speech can cause friction with those close to you, so pausing before you speak protects your luck.",
          zh: "气势强、好胜之相。有了目标便坚持到底，竞争中有胜出之力，适合经商、销售、运动。但固执且说话直接，易与亲近的人起冲突，说话前停一拍能守住运气。",
          ja: "気が強く勝負欲の強い相です。目標ができれば最後まで押し切り競争に勝つ力があり、事業や営業、スポーツに向きます。ただ頑固で物言いが直接的なので身近な人とぶつかりやすく、一呼吸おいて話す習慣が運を守ります。",
        },
      },
      {
        name: { ko: "내려간 눈꼬리", en: "Downturned corners", zh: "下垂的眼尾", ja: "下がった目尻" },
        meaning: {
          ko: "순하고 복이 많은 상으로, 다툼을 싫어하고 남의 사정을 잘 헤아립니다. 윗사람과 아랫사람 모두에게 사랑받아 인덕으로 자리를 잡는 경우가 많습니다. 거절을 잘 못해 일을 떠안기 쉬우니, 하기 싫은 일은 처음부터 분명히 말하는 연습이 필요합니다.",
          en: "A gentle, blessed face that dislikes conflict and senses others' situations well. Loved by seniors and juniors alike, you often settle into your place through goodwill. Because you find it hard to say no, you tend to take on too much, so practise stating clearly what you will not do.",
          zh: "温顺有福之相，不喜争执，善于体谅他人。上下都喜欢，常凭人缘立足。不善拒绝，容易揽下太多事，需练习一开始就明确说出不想做的事。",
          ja: "穏やかで福の多い相で、争いを嫌い人の事情をよく汲みます。目上にも目下にも愛され、人徳で居場所を得ることが多いです。断るのが苦手で仕事を抱え込みやすいので、やりたくないことは最初にはっきり言う練習が必要です。",
        },
      },
      {
        name: { ko: "길고 가는 봉황눈(봉안)", en: "Phoenix eyes", zh: "凤眼", ja: "鳳眼" },
        meaning: {
          ko: "눈이 길고 눈꼬리가 살짝 올라가며 눈빛이 그윽한 눈을 봉안(鳳眼)이라 하여 옛날부터 귀한 상으로 쳤습니다. 지혜와 명예가 따르고 사람을 이끄는 품격이 있어 학자·관리·지도자의 눈으로 불렸습니다. 다만 자존심이 강해 남에게 쉽게 고개를 숙이지 않으니 겸손이 더해지면 더 크게 됩니다.",
          en: "Long eyes with slightly lifted corners and a deep, calm gaze are called phoenix eyes and have long been read as noble. Wisdom and honor follow, with the dignity to lead, so they were called the eyes of scholars, officials and leaders. Strong pride means you rarely bow to others; add humility and you rise higher.",
          zh: "眼长、眼尾微扬、眼神深邃者称为凤眼，自古视为贵相。智慧与名誉相随，有领导他人的气度，被称为学者、官员、领袖之眼。但自尊心强，不易向人低头，若加上谦逊会更有成就。",
          ja: "目が長く目尻がわずかに上がり、眼差しに深みのある目を鳳眼と呼び、昔から貴い相とされました。知恵と名誉が伴い、人を導く品格があるため学者・役人・指導者の目と呼ばれました。ただ自尊心が強く人に簡単に頭を下げないので、謙虚さが加わればさらに大きくなります。",
        },
      },
      {
        name: { ko: "쌍꺼풀과 외꺼풀", en: "Double and single eyelids", zh: "双眼皮与单眼皮", ja: "二重と一重" },
        meaning: {
          ko: "쌍꺼풀이 있으면 감정 표현이 풍부하고 애교가 있어 인기가 많은 대신 기분 변화가 잦습니다. 외꺼풀은 침착하고 인내심이 강하며 속이 깊어 큰일을 맡길 만하다고 봅니다. 어느 쪽이 더 좋다기보다 쌍꺼풀은 사람 운, 외꺼풀은 끈기 운이 강한 것으로 풀이합니다.",
          en: "Double eyelids suggest rich expression and charm that wins popularity, with quicker mood swings. Single eyelids suggest composure, patience and depth that can be trusted with big responsibilities. Neither is better: double lids lean toward luck with people, single lids toward luck through persistence.",
          zh: "有双眼皮者表情丰富、讨人喜欢、人气高，但情绪起伏较多。单眼皮者沉着、有耐心、城府深，可托付大事。无所谓好坏，双眼皮偏人缘运，单眼皮偏毅力运。",
          ja: "二重まぶたは感情表現が豊かで愛嬌があり人気が高い反面、気分の変化が多めです。一重は落ち着きと忍耐力があり懐が深く、大事を任せられると見ます。どちらが良いというより、二重は人の運、一重は粘りの運が強いと解釈します。",
        },
      },
    ],
    tips: {
      ko: "눈을 볼 때는 밝은 곳에서 정면을 바라본 상태로 봅니다. 눈 모양은 타고나지만 눈빛은 생활에 따라 바뀌므로, 관상가들은 '눈빛이 맑아지면 운이 바뀐다'고 했습니다. 잠을 충분히 자고, 화면을 오래 보지 않으며, 사람을 볼 때 시선을 피하지 않는 습관이 눈의 기운을 살립니다. 눈 밑이 어둡거나 흰자위에 핏발이 서 있으면 운세보다 먼저 몸의 휴식이 필요하다는 신호로 읽습니다.",
      en: "Read the eyes in good light, facing straight ahead. Shape is inborn but the gaze changes with how you live, which is why readers said 'when the eyes clear, fortune turns'. Enough sleep, less screen time and not avoiding eye contact all strengthen the energy of the eyes. Dark circles or bloodshot whites are read first as a signal that the body needs rest.",
      zh: "看眼要在光线明亮处、正视前方时看。眼型天生，眼神却随生活改变，所以相师说“眼神清亮则运转”。睡眠充足、少看屏幕、看人时不躲避目光，都能养眼之神。眼下发暗或眼白有血丝，先当作身体需要休息的信号，而非运势。",
      ja: "目は明るい場所で正面を向いた状態で見ます。目の形は生まれつきですが目の光は生活で変わるため、観相家は「目が澄めば運が変わる」と言いました。十分な睡眠、画面を長く見ないこと、人と目を合わせる習慣が目の気を養います。目の下が暗い、白目に血が走っているときは、運勢より先に体の休息が必要な合図と読みます。",
    },
    faq: [
      {
        question: { ko: "눈이 작으면 관상이 나쁜가요?", en: "Are small eyes a bad sign?", zh: "眼睛小面相就不好吗？", ja: "目が小さいと人相が悪いのですか？" },
        answer: {
          ko: "아닙니다. 관상에서 눈의 크기는 좋고 나쁨이 아니라 성향의 차이로 봅니다. 작은 눈은 관찰력과 끈기, 재물을 지키는 힘이 강한 상으로 풀이하며, 특히 길고 눈빛이 또렷한 작은 눈은 봉안에 가까운 귀한 상으로 칩니다. 중요한 것은 크기보다 눈빛의 맑기입니다.",
          en: "No. Eye size is read as a difference in temperament, not as good or bad. Small eyes point to observation, persistence and the power to keep wealth, and long small eyes with a clear gaze are close to the noble phoenix eye. Clarity of the gaze matters more than size.",
          zh: "不是。面相中眼睛大小不是好坏，而是性情的差别。小眼主观察力、毅力和守财之力，尤其细长而有神的小眼接近凤眼，属贵相。重要的是眼神清亮与否，而非大小。",
          ja: "いいえ。人相では目の大きさを良し悪しではなく性質の違いとして見ます。小さい目は観察力と粘り強さ、財を守る力が強い相と解釈し、特に細長く目の光がはっきりした小さい目は鳳眼に近い貴い相とされます。大切なのは大きさより目の澄み方です。",
        },
      },
      {
        question: { ko: "쌍꺼풀 수술을 하면 운이 바뀌나요?", en: "Does eyelid surgery change your fortune?", zh: "做双眼皮手术会改运吗？", ja: "二重の手術をすると運が変わりますか？" },
        answer: {
          ko: "전통 관상학은 '상은 마음을 따라 바뀐다(相由心生)'고 하여, 수술로 모양을 바꾸는 것보다 표정과 눈빛이 바뀌는 것을 더 중요하게 봅니다. 쌍꺼풀이 생기면 인상이 부드러워져 사람 운이 좋아질 수는 있지만, 눈빛이 흐리면 효과가 없다고 봅니다. 결국 운을 바꾸는 것은 모양이 아니라 그 눈으로 세상을 보는 태도입니다.",
          en: "Traditional physiognomy holds that 'the face follows the heart', so a change in expression and gaze counts for more than a change in shape. A new fold can soften your impression and help with people, but it does nothing if the gaze stays dull. What changes fortune is not the shape but how you look at the world through those eyes.",
          zh: "传统相学讲“相由心生”，比起手术改变形状，更看重表情和眼神的变化。有了双眼皮印象变柔和，人缘运可能变好，但眼神浑浊则无效。改变运势的终究不是形状，而是用这双眼看世界的态度。",
          ja: "伝統的な人相学は「相は心に由って生ず」と言い、手術で形を変えるより表情と目の光が変わることを重視します。二重になると印象が柔らかくなり人の運が良くなることはありますが、目が濁っていれば効果はないと見ます。結局運を変えるのは形ではなく、その目で世界を見る態度です。",
        },
      },
      {
        question: { ko: "눈 밑 와잠(애교살)은 무엇을 뜻하나요?", en: "What does the 'lying silkworm' under the eye mean?", zh: "眼下卧蚕代表什么？", ja: "目の下の臥蚕（涙袋）は何を意味しますか？" },
        answer: {
          ko: "눈 바로 아래 도톰하게 올라오는 살을 와잠(臥蠶), 요즘 말로 애교살이라 합니다. 관상에서는 자녀운과 애정운을 보는 자리로, 도톰하고 밝으면 자녀와 배우자 복이 있고 사람에게 사랑받는 상으로 풀이합니다. 반대로 이 자리가 푹 꺼지고 어두우면 피로가 쌓인 것이니 쉬어 가라는 뜻으로 읽습니다.",
          en: "The plump band just under the eye is the 'lying silkworm', often called aegyo-sal today. It is the seat of luck with children and love; full and bright, it means blessings in family and partnership and being loved. Hollow and dark, it is read as accumulated fatigue and a reminder to rest.",
          zh: "眼睛正下方微微隆起的肉称为卧蚕。面相中是看子女运与爱情运的部位，饱满明亮者有子女与配偶之福、受人喜爱；若此处凹陷发暗，则是疲劳累积，该休息了。",
          ja: "目のすぐ下にふっくらと盛り上がる部分を臥蚕、今の言葉で涙袋と言います。人相では子ども運と愛情運を見る場所で、ふっくらと明るければ子どもと配偶者の福があり人に愛される相と解釈します。逆にここが落ちくぼんで暗ければ疲れがたまっているので休めという意味に読みます。",
        },
      },
    ],
    relatedTypes: ["wisdom-charm", "charm-wisdom", "wisdom-leadership", "charm-fortune"],
  },

  // ───────────────────────── 코 ─────────────────────────
  {
    id: "nose",
    hanja: "鼻",
    emoji: "👃",
    featureId: "nose",
    name: { ko: "코", en: "Nose", zh: "鼻子", ja: "鼻" },
    title: {
      ko: "코 관상 보는 법 | 코 모양별 재물운과 성격",
      en: "Nose Face Reading | Wealth and Personality by Nose Shape",
      zh: "鼻子面相怎么看 | 不同鼻型的财运与性格",
      ja: "鼻の人相の見方 | 鼻の形でわかる財運と性格",
    },
    description: {
      ko: "관상에서 코는 재물창고이자 중년운의 중심입니다. 높은 코, 복코, 매부리코, 작은 코, 들창코 등 코 모양별 재물운과 성격 해석, 콧방울과 콧대 보는 법을 정리했습니다.",
      en: "In face reading the nose is the treasury of wealth and the center of midlife fortune. High, fleshy, aquiline, small and upturned noses: what each shape means for money and character, plus how to read the bridge and wings.",
      zh: "面相中鼻子是财库，也是中年运的中心。整理了高鼻、福鼻、鹰钩鼻、小鼻、朝天鼻等鼻型的财运与性格解读，以及鼻翼鼻梁的看法。",
      ja: "人相で鼻は財の蔵であり中年運の中心です。高い鼻、福鼻、鷲鼻、小さい鼻、上向きの鼻など鼻の形ごとの財運と性格、鼻筋と小鼻の見方をまとめました。",
    },
    keywords: {
      ko: ["코 관상", "복코 관상", "코 모양 관상", "매부리코 관상", "콧대 관상", "코 재물운", "들창코 관상"],
      en: ["nose face reading", "nose shape wealth", "korean face reading nose", "aquiline nose meaning"],
      zh: ["鼻子面相", "鼻型财运", "鹰钩鼻面相"],
      ja: ["鼻 人相", "鼻の形 財運", "鷲鼻 人相"],
    },
    heading: {
      ko: "코 관상: 코 모양으로 보는 재물운과 성격",
      en: "Nose Face Reading: Wealth and Character in the Nose",
      zh: "鼻子面相：从鼻型看财运与性格",
      ja: "鼻の人相：鼻の形で見る財運と性格",
    },
    intro: {
      ko: "관상학에서 코는 얼굴의 한가운데 솟아 있어 '나 자신'을 상징합니다. 마의상서는 코를 '심변관(審辨官)'이라 하여 판단과 결단을 맡는 자리로 보았고, 동시에 재백궁(財帛宮)이라 하여 재물이 모이는 창고로 풀이했습니다. 그래서 코 관상은 돈 이야기가 빠지지 않습니다. 콧대는 돈을 버는 힘, 코끝(준두)은 모인 재물의 크기, 양쪽 콧방울(난대·정위)은 재물을 지키는 금고에 비유됩니다.\n\n나이로는 41세부터 50세까지의 운을 코에서 봅니다. 41세는 콧대 위쪽(산근), 44~45세는 콧대 가운데, 48세는 코끝, 49~50세는 콧방울에 해당한다고 하여 중년의 성취가 코에 모여 있다고 했습니다. 콧대가 반듯하고 끊어진 데가 없으면 중년에 일이 순조롭고, 코끝이 둥글고 살집이 있으면 재물이 모이며, 콧방울이 단단히 감싸고 있으면 번 돈이 새지 않는다고 봅니다.\n\n코를 볼 때 흔히 하는 오해가 '높을수록 좋다'는 것입니다. 관상에서는 높이보다 균형을 중요하게 봅니다. 코가 지나치게 높고 날카로우면 고집이 세고 사람을 가리기 쉬우며, 얼굴에 비해 코만 크면 혼자 애쓰는 상이 됩니다. 이마와 광대, 턱이 코를 알맞게 받쳐 줄 때 비로소 '좋은 코'가 됩니다.",
      en: "Rising in the very center of the face, the nose stands for 'myself' in physiognomy. The Mayi Xiangfa calls it the 'discerning official', the seat of judgment and decision, and at the same time the 'palace of wealth', the storehouse where money gathers. That is why money is never far from any reading of the nose. The bridge is likened to the power to earn, the tip to the size of what has been gathered, and the two wings to the safe that keeps it.\n\nIn the age map the nose governs 41 to 50. Age 41 sits at the top of the bridge, 44 to 45 in the middle, 48 at the tip and 49 to 50 at the wings, so the achievements of midlife are said to be concentrated here. A straight bridge with no break means smooth affairs in middle age, a round fleshy tip means wealth gathers, and firm wings that wrap the tip mean what is earned does not leak away.\n\nA common mistake is to think higher is always better. Readers value balance over height. A nose that is too high and sharp suggests stubbornness and being choosy about people, and a nose too large for the face suggests struggling alone. A nose becomes a 'good nose' only when the forehead, cheekbones and chin support it in proportion.",
      zh: "鼻子耸立在脸的正中，在相学中象征“自我”。《麻衣相法》称鼻为“审辨官”，主判断与决断，同时又是“财帛宫”，是财富聚集的仓库，所以看鼻相离不开钱财。鼻梁比作赚钱之力，鼻头（准头）比作所聚财富的大小，两侧鼻翼（兰台、廷尉）比作守财的金库。\n\n流年上鼻子主管四十一岁到五十岁。41岁在鼻梁上端（山根），44~45岁在鼻梁中段，48岁在鼻头，49~50岁在鼻翼，中年成就都聚在鼻上。鼻梁端正无断者中年顺遂，鼻头圆润有肉者聚财，鼻翼收紧有力者赚到的钱不外漏。\n\n看鼻常见的误解是“越高越好”。相学重均衡而非高度。鼻子过高过尖者固执、挑人；鼻子相对脸太大者则是独自操劳之相。额头、颧骨、下巴恰当地托住鼻子，才算“好鼻”。",
      ja: "人相学で鼻は顔の真ん中に高く立ち、「自分自身」を象徴します。麻衣相法は鼻を「審弁官」と呼んで判断と決断を司る場所とし、同時に「財帛宮」として財が集まる蔵と解釈しました。だから鼻の人相にお金の話は欠かせません。鼻筋は稼ぐ力、鼻先（準頭）は集まった財の大きさ、両側の小鼻（蘭台・廷尉）は財を守る金庫にたとえられます。\n\n年齢では41歳から50歳までの運を鼻で見ます。41歳は鼻筋の上（山根）、44〜45歳は鼻筋の中ほど、48歳は鼻先、49〜50歳は小鼻にあたるとされ、中年の成果が鼻に集まっているとされました。鼻筋がまっすぐで途切れがなければ中年に物事が順調で、鼻先が丸く肉づきがあれば財が集まり、小鼻がしっかり包んでいれば稼いだお金が漏れないと見ます。\n\n鼻を見るときによくある誤解が「高いほど良い」というものです。人相では高さより均衡を重視します。鼻が高すぎて鋭いと頑固で人を選びやすく、顔に比べて鼻だけ大きいと一人で苦労する相になります。額、頬骨、顎が鼻をほどよく支えてはじめて「良い鼻」になります。",
    },
    shapes: [
      {
        name: { ko: "높고 곧은 코", en: "High, straight nose", zh: "高而挺直的鼻子", ja: "高くまっすぐな鼻" },
        meaning: {
          ko: "자존심과 추진력이 강한 상입니다. 스스로 길을 열어 중년에 크게 일어서며, 남에게 기대지 않고 제 힘으로 성취하는 힘이 있습니다. 다만 자기 기준이 높아 타협을 어려워하니, 주변의 조언을 받아들이는 유연함이 더해지면 성취가 오래갑니다.",
          en: "Pride and drive. You open your own road and rise strongly in midlife, achieving by your own strength rather than leaning on others. High standards make compromise hard, so adding the flexibility to take advice makes success last.",
          zh: "自尊与推动力强之相。自己开路，中年大起，不依赖他人、凭自己成事。但自我标准高，难以妥协，若能柔软地接受建议，成就更持久。",
          ja: "自尊心と推進力の強い相です。自ら道を開いて中年に大きく立ち、人に頼らず自力で成し遂げる力があります。ただ自分の基準が高く妥協が苦手なので、周りの助言を受け入れる柔軟さが加われば成果が長続きします。",
        },
      },
      {
        name: { ko: "콧방울이 넓고 살집 있는 복코", en: "Fleshy nose with wide wings", zh: "鼻翼宽厚的福鼻", ja: "小鼻が広く肉づきのよい福鼻" },
        meaning: {
          ko: "흔히 '복코'라 부르는 코로, 재물창고가 큰 상입니다. 먹을 복과 돈복이 함께 따르고 특히 사업이나 장사에서 돈이 모입니다. 콧방울이 단단하게 코끝을 감싸고 있으면 번 돈을 잘 지키고, 콧구멍이 정면에서 많이 보이면 씀씀이가 커서 들어온 만큼 나가기 쉽습니다.",
          en: "The so-called 'fortune nose', a large treasury. Blessings of food and money come together, and wealth gathers especially in business and trade. If the wings wrap the tip firmly you keep what you earn; if the nostrils show plainly from the front, spending is generous and money leaves as fast as it comes.",
          zh: "俗称“福鼻”，财库大之相。食禄与财运并存，尤其经商做买卖易聚财。鼻翼紧裹鼻头者守得住钱；正面鼻孔外露明显者花销大，进多少出多少。",
          ja: "いわゆる「福鼻」で、財の蔵が大きい相です。食の福と金運がともに伴い、特に事業や商売でお金が集まります。小鼻がしっかり鼻先を包んでいれば稼いだお金をよく守り、鼻の穴が正面からよく見えると出費が大きく入った分だけ出ていきやすいです。",
        },
      },
      {
        name: { ko: "매부리코", en: "Aquiline nose", zh: "鹰钩鼻", ja: "鷲鼻" },
        meaning: {
          ko: "콧대 중간이 솟고 코끝이 아래로 굽은 코로, 사업 수완과 기회를 보는 눈이 뛰어난 상입니다. 협상과 투자에서 손해를 잘 보지 않으며, 한번 잡은 기회는 놓치지 않습니다. 다만 계산이 앞서 냉정하다는 평을 듣기 쉬우니 베푸는 마음을 함께 가지면 재물이 더 크게 모입니다.",
          en: "A raised middle bridge with a tip that curves down marks sharp business sense and an eye for opportunity. You rarely lose in negotiation or investment and never let a chance slip. Calculation can come across as cold, so pairing it with generosity gathers greater wealth.",
          zh: "鼻梁中段隆起、鼻头下弯，生意手腕与眼光出众之相。谈判投资少吃亏，抓住的机会不放手。但精于算计易被说冷漠，若兼有施予之心，财聚得更大。",
          ja: "鼻筋の中ほどが盛り上がり鼻先が下に曲がった鼻で、商才と機会を見る目に優れた相です。交渉や投資で損をしにくく、一度つかんだ機会は逃しません。ただ計算が先に立って冷静だと言われやすいので、与える心を持ち合わせれば財がさらに大きく集まります。",
        },
      },
      {
        name: { ko: "작고 오똑한 코", en: "Small, delicate nose", zh: "小巧挺翘的鼻子", ja: "小さく整った鼻" },
        meaning: {
          ko: "섬세하고 감각이 뛰어난 상으로, 예술·디자인·미용처럼 감각을 쓰는 일에서 빛을 봅니다. 사람들에게 호감을 사기 쉬워 인기가 많습니다. 재물은 큰돈을 한 번에 벌기보다 꾸준히 들어오는 편이니, 큰 투자보다 안정적인 수입을 지키는 쪽이 유리합니다.",
          en: "Refined and sensitive, you shine in work that uses taste: art, design, beauty. Easily liked and popular. Money tends to come steadily rather than in one big win, so protecting stable income beats large gambles.",
          zh: "细腻、感觉敏锐之相，在艺术、设计、美容等用感觉的工作中发光。易得好感、人气高。财运偏稳定进账而非一夜暴富，守住稳定收入比大笔投资更有利。",
          ja: "繊細で感覚に優れた相で、芸術・デザイン・美容など感覚を使う仕事で輝きます。人に好感を持たれやすく人気があります。財は大金を一度に得るより着実に入る方なので、大きな投資より安定した収入を守る方が有利です。",
        },
      },
      {
        name: { ko: "낮고 동그란 코", en: "Low, round nose", zh: "低而圆的鼻子", ja: "低く丸い鼻" },
        meaning: {
          ko: "마음이 너그럽고 사람을 편하게 해 주는 상입니다. 주변 사람의 도움으로 일이 풀리는 경우가 많아 혼자보다 함께할 때 운이 열립니다. 자기주장이 약해 손해를 볼 수 있으니 돈 문제만큼은 분명하게 선을 긋는 것이 좋습니다.",
          en: "Generous-hearted and easy to be around. Things often work out through the help of others, so luck opens when you work together rather than alone. A weak voice for your own interests can cost you, so draw clear lines in money matters.",
          zh: "心胸宽厚、让人舒服之相。常靠旁人相助把事办成，与人同行比独自更开运。自我主张弱易吃亏，钱财之事要划清界限。",
          ja: "心が広く人を楽にさせる相です。周りの助けで物事が解決することが多く、一人より一緒のときに運が開けます。自己主張が弱く損をすることがあるので、お金のことだけははっきり線を引くのが良いでしょう。",
        },
      },
      {
        name: { ko: "들창코(코끝이 위로 향한 코)", en: "Upturned nose", zh: "朝天鼻", ja: "上向きの鼻" },
        meaning: {
          ko: "코끝이 들려 콧구멍이 보이는 코는 솔직하고 밝으며 숨기는 것이 없는 상입니다. 사람들과 쉽게 친해지고 어디서나 환영받습니다. 다만 들어온 돈이 쉽게 나가는 상이라 하여 저축 습관이 중요하고, 말이 앞서 비밀을 지키기 어려울 수 있으니 조심해야 합니다.",
          en: "A lifted tip that shows the nostrils marks an honest, bright nature with nothing to hide. You make friends easily and are welcome anywhere. Money that comes in leaves easily, so a saving habit matters, and a quick tongue can make secrets hard to keep.",
          zh: "鼻头上翘、鼻孔可见者，坦率开朗、无所隐藏之相。容易与人亲近，到哪都受欢迎。但财来易去，储蓄习惯很重要；嘴快难守秘密，需留意。",
          ja: "鼻先が上を向いて鼻の穴が見える鼻は、正直で明るく隠し事のない相です。人とすぐ親しくなりどこでも歓迎されます。ただ入ったお金が出ていきやすい相とされ貯蓄の習慣が大切で、口が先に出て秘密を守りにくいことがあるので注意が必要です。",
        },
      },
    ],
    tips: {
      ko: "코는 정면과 옆면을 모두 봐야 합니다. 정면에서는 콧방울의 크기와 콧구멍이 얼마나 보이는지, 옆에서는 콧대가 곧은지 굽었는지를 봅니다. 코에 상처나 점, 붉은 기운이 있으면 재물이 새는 신호로 읽었으므로, 코 피부를 깨끗하게 관리하는 것이 관상에서는 곧 재물 관리입니다. 또 코는 얼굴의 다른 부위와 균형이 맞을 때 가장 좋으니, 코만 따로 떼어 좋고 나쁨을 단정하지 않도록 합니다.",
      en: "Read the nose from the front and the side. From the front, look at the size of the wings and how much of the nostrils show; from the side, whether the bridge is straight or bent. Scars, moles or redness on the nose were read as wealth leaking away, so keeping the skin of the nose clean counts as money management in physiognomy. The nose is at its best in balance with the other features, so never judge it in isolation.",
      zh: "看鼻要正面侧面都看。正面看鼻翼大小与鼻孔外露程度，侧面看鼻梁直或弯。鼻上有疤、痣、发红，古人视为漏财之兆，所以保养好鼻部皮肤在相学中就是理财。鼻子与其他部位均衡时最好，不要单独拿鼻子断好坏。",
      ja: "鼻は正面と横の両方から見る必要があります。正面では小鼻の大きさと鼻の穴がどれだけ見えるか、横では鼻筋がまっすぐか曲がっているかを見ます。鼻に傷やほくろ、赤みがあると財が漏れる合図と読んだため、鼻の肌をきれいに保つことが人相ではそのまま財の管理です。また鼻は顔の他の部位と均衡がとれているときが最も良いので、鼻だけを切り離して良し悪しを断定しないようにします。",
    },
    faq: [
      {
        question: { ko: "복코는 어떤 코를 말하나요?", en: "What exactly is a 'fortune nose'?", zh: "什么样的鼻子叫福鼻？", ja: "福鼻とはどんな鼻ですか？" },
        answer: {
          ko: "코끝이 둥글고 살집이 있으며 양쪽 콧방울이 도톰하게 코끝을 감싸고, 정면에서 콧구멍이 거의 보이지 않는 코를 복코라 합니다. 관상에서 코끝은 모은 재물, 콧방울은 지키는 금고이므로 둘 다 든든한 코는 돈이 모이고 새지 않는 상으로 풀이합니다. 높이는 상관없으며 낮아도 살집이 있으면 복코로 봅니다.",
          en: "A nose with a round, fleshy tip, plump wings that wrap the tip, and nostrils that barely show from the front. The tip stands for gathered wealth and the wings for the safe that keeps it, so a nose solid in both is read as money gathering without leaking. Height does not matter; a low nose with flesh still counts.",
          zh: "鼻头圆润有肉、两侧鼻翼丰厚包住鼻头、正面几乎看不到鼻孔的鼻子叫福鼻。鼻头主聚财，鼻翼主守财，两者都厚实者聚财不漏。与高低无关，鼻低但有肉也算福鼻。",
          ja: "鼻先が丸く肉づきがあり、両側の小鼻がふっくらと鼻先を包み、正面から鼻の穴がほとんど見えない鼻を福鼻と言います。人相で鼻先は集めた財、小鼻は守る金庫なので、両方がしっかりした鼻はお金が集まり漏れない相と解釈します。高さは関係なく、低くても肉づきがあれば福鼻と見ます。",
        },
      },
      {
        question: { ko: "코가 낮으면 재물운이 없나요?", en: "Does a low nose mean no luck with money?", zh: "鼻子低就没有财运吗？", ja: "鼻が低いと財運がないのですか？" },
        answer: {
          ko: "그렇지 않습니다. 관상에서 콧대의 높이는 '자기 힘으로 버는 힘'을, 코끝과 콧방울의 살집은 '모이고 지키는 힘'을 뜻합니다. 콧대가 낮아도 코끝이 둥글고 콧방울이 든든하면 사람들의 도움으로 재물이 모이는 상입니다. 오히려 콧대만 높고 코끝이 뾰족하면 벌어도 모이지 않는다고 봅니다.",
          en: "No. The height of the bridge stands for earning by your own effort, while the flesh of the tip and wings stands for gathering and keeping. A low bridge with a round tip and solid wings means wealth gathers through the help of others. A high bridge with a sharp tip, on the other hand, is read as earning without keeping.",
          zh: "不是。鼻梁高低主“自己赚钱之力”，鼻头鼻翼的肉主“聚财守财之力”。鼻梁低但鼻头圆、鼻翼厚者，靠贵人相助聚财。反而鼻梁高鼻头尖者，赚得到却存不住。",
          ja: "そうではありません。人相で鼻筋の高さは「自力で稼ぐ力」を、鼻先と小鼻の肉づきは「集めて守る力」を意味します。鼻筋が低くても鼻先が丸く小鼻がしっかりしていれば、人の助けで財が集まる相です。むしろ鼻筋だけ高く鼻先が尖っていると稼いでも集まらないと見ます。",
        },
      },
      {
        question: { ko: "코에 점이 있으면 어떤 뜻인가요?", en: "What does a mole on the nose mean?", zh: "鼻子上有痣是什么意思？", ja: "鼻にほくろがあるとどんな意味ですか？" },
        answer: {
          ko: "코는 재물창고이므로 코 위의 점은 창고에 난 구멍으로 봅니다. 콧대의 점은 중년에 돈 때문에 고생하거나 건강에 신경 쓸 일이 생긴다고 하고, 코끝의 점은 씀씀이가 커서 돈이 새기 쉽다고 풀이합니다. 다만 색이 짙고 윤기가 있는 '살아 있는 점'은 오히려 복점으로 보기도 하니, 점의 색과 크기를 함께 봐야 합니다.",
          en: "Since the nose is the treasury, a mole on it is read as a hole in the storehouse. A mole on the bridge suggests money troubles or health concerns in midlife; one on the tip suggests generous spending that lets money leak. A dark, glossy 'living mole' can be a lucky mole instead, so color and size must be read together.",
          zh: "鼻为财库，鼻上的痣视为仓库上的洞。鼻梁有痣主中年为钱操劳或需留意健康，鼻头有痣主花销大易漏财。但颜色深、有光泽的“活痣”反而可能是福痣，要结合颜色与大小一起看。",
          ja: "鼻は財の蔵なので、鼻の上のほくろは蔵に開いた穴と見ます。鼻筋のほくろは中年にお金で苦労したり健康に気を配ることが起きるとされ、鼻先のほくろは出費が大きくお金が漏れやすいと解釈します。ただ色が濃くつやのある「生きぼくろ」はむしろ福ぼくろと見ることもあるので、色と大きさを一緒に見る必要があります。",
        },
      },
    ],
    relatedTypes: ["wealth-wisdom", "wealth-leadership", "wealth-fortune", "fortune-wealth"],
  },

  // ───────────────────────── 입 ─────────────────────────
  {
    id: "mouth",
    hanja: "口",
    emoji: "👄",
    featureId: "mouth",
    name: { ko: "입", en: "Mouth", zh: "嘴巴", ja: "口" },
    title: {
      ko: "입 관상 보는 법 | 입 모양·입술 두께별 성격과 말년운",
      en: "Mouth Face Reading | Personality and Later-Life Fortune by Lip Shape",
      zh: "嘴巴面相怎么看 | 嘴型·唇厚与性格、晚年运",
      ja: "口の人相の見方 | 口の形・唇の厚さでわかる性格と晩年運",
    },
    description: {
      ko: "관상에서 입은 복이 드나드는 문이자 말년운을 보는 자리입니다. 큰 입, 작은 입, 두꺼운 입술, 얇은 입술, 올라간 입꼬리, 활 모양 입술 등 입 모양별 성격과 운세를 정리했습니다.",
      en: "In face reading the mouth is the gate through which blessings pass and the seat of later-life fortune. Large and small mouths, thick and thin lips, upturned corners and bow lips: what each says about character and luck.",
      zh: "面相中嘴是福气出入之门，也是看晚年运的部位。整理了大嘴、小嘴、厚唇、薄唇、上扬嘴角、弓形唇等嘴型的性格与运势。",
      ja: "人相で口は福が出入りする門であり晩年運を見る場所です。大きい口、小さい口、厚い唇、薄い唇、上がった口角、弓型の唇など口の形ごとの性格と運勢をまとめました。",
    },
    keywords: {
      ko: ["입 관상", "입술 관상", "입꼬리 관상", "입술 두꺼운 관상", "입술 얇은 관상", "입 큰 관상", "말년운 관상"],
      en: ["mouth face reading", "lips personality", "korean face reading mouth", "lip shape meaning"],
      zh: ["嘴巴面相", "嘴唇面相", "嘴角面相"],
      ja: ["口 人相", "唇 人相", "口角 人相"],
    },
    heading: {
      ko: "입 관상: 입 모양과 입술로 보는 성격과 말년운",
      en: "Mouth Face Reading: Character and Later Fortune in the Lips",
      zh: "嘴巴面相：从嘴型与嘴唇看性格与晚年运",
      ja: "口の人相：口の形と唇で見る性格と晩年運",
    },
    intro: {
      ko: "관상에서 입은 '출납관(出納官)'이라 불립니다. 먹을 것이 들어오고 말이 나가는 문이기 때문입니다. 옛사람들은 입을 바다에, 코를 산에 비유해 '산이 높고 바다가 넓으면 큰 그릇'이라 했습니다. 입은 복이 들어오는 길이라 입 모양이 단정하고 입술 색이 붉고 윤기가 있으면 먹을 복과 사람 복이 있다고 보았습니다. 반대로 입술이 마르고 색이 어두우면 기운이 떨어졌다는 신호로 읽습니다.\n\n나이로는 입이 60세 전후의 말년운을 맡습니다. 그래서 입 관상은 노후가 편안한지, 자녀와 배우자 복이 있는지, 말년에 재물이 남는지를 보는 자리입니다. 입이 크고 입꼬리가 뚜렷하면 말년에 넉넉하고, 입술이 두툼하면 정이 많아 사람들이 곁에 남으며, 입꼬리가 올라가 있으면 웃는 얼굴에 복이 따른다고 풀이합니다.\n\n입은 또한 말과 신용을 보는 자리입니다. 입이 야무지게 다물어지면 말에 책임이 있고 비밀을 지키며, 입이 늘 벌어져 있으면 말이 앞서거나 기운이 새기 쉽다고 봅니다. 윗입술은 베푸는 정, 아랫입술은 받는 복으로 보아 두 입술의 두께가 비슷하면 주고받는 균형이 맞아 인간관계가 원만하다고 합니다.",
      en: "In physiognomy the mouth is the 'official of income and expenditure', the gate through which food comes in and words go out. The old readers likened the mouth to the sea and the nose to the mountain, saying 'a high mountain and a wide sea make a great vessel'. Because the mouth is the road by which blessings enter, a neat mouth with red, glossy lips was read as luck with food and with people, while dry, dark lips signal that energy has dropped.\n\nIn the age map the mouth governs the years around sixty, so the mouth is where a reader checks whether old age will be comfortable, whether there is luck with children and spouse, and whether wealth remains late in life. A large mouth with clear corners means comfort in later years; full lips mean warmth that keeps people close; lifted corners mean blessings follow a smiling face.\n\nThe mouth is also where speech and trust are read. Lips that close firmly mean responsibility for one's words and the ability to keep secrets, while a mouth that always hangs open suggests words running ahead and energy leaking. The upper lip stands for the affection you give and the lower lip for the blessings you receive, so lips of similar thickness mean a balance of giving and taking and smooth relationships.",
      zh: "相学称嘴为“出纳官”，因为食物从这里进来、言语从这里出去。古人把嘴比作海、鼻比作山，说“山高海阔是大器”。嘴是福气进入之路，嘴型端正、唇色红润有光者有食禄与人缘；唇干色暗则是气衰之兆。\n\n流年上嘴主管六十岁前后的晚年运，所以嘴相看的是晚年是否安稳、有无子女配偶之福、晚年是否有余财。嘴大嘴角分明者晚年宽裕，唇厚者重情、人留得住，嘴角上扬者笑脸带福。\n\n嘴也是看言语与信用的部位。嘴闭得紧者言出必行、能守秘密；嘴常张开者话快或漏气。上唇主施予之情，下唇主接受之福，两唇厚薄相近者施受平衡、人际圆满。",
      ja: "人相で口は「出納官」と呼ばれます。食べ物が入り言葉が出る門だからです。昔の人は口を海に、鼻を山にたとえ「山が高く海が広ければ大きな器」と言いました。口は福が入ってくる道なので、口の形が整い唇の色が赤くつやがあれば食の福と人の福があると見ました。逆に唇が乾いて色が暗ければ気が落ちている合図と読みます。\n\n年齢では口が60歳前後の晩年運を受け持ちます。そのため口の人相は老後が安らかか、子どもと配偶者の福があるか、晩年に財が残るかを見る場所です。口が大きく口角がはっきりしていれば晩年が豊かで、唇が厚ければ情が深く人がそばに残り、口角が上がっていれば笑顔に福が伴うと解釈します。\n\n口はまた言葉と信用を見る場所です。口がしっかり閉じていれば言葉に責任があり秘密を守り、口がいつも開いていれば言葉が先に出たり気が漏れやすいと見ます。上唇は与える情、下唇は受ける福と見て、両方の厚さが似ていれば与え受け取る均衡がとれ、人間関係が円満だとされます。",
    },
    shapes: [
      {
        name: { ko: "크고 두툼한 입", en: "Large, full mouth", zh: "大而厚的嘴", ja: "大きく厚い口" },
        meaning: {
          ko: "정이 많고 복이 큰 상입니다. 사람을 품는 그릇이 넓어 주변에 사람이 끊이지 않고, 먹을 복이 있어 어디서든 굶지 않는다고 했습니다. 말년이 넉넉하고 자녀 복도 좋은 편입니다. 다만 정이 많은 만큼 거절을 못해 손해를 보기 쉬우니, 베풀 때도 한도를 정해 두는 것이 좋습니다.",
          en: "Affectionate and richly blessed. A wide vessel for people, so you are never short of company, and never short of food wherever you go. Later life is comfortable and luck with children is good. Because you find it hard to refuse, set limits even when giving.",
          zh: "重情、福大之相。容人之量宽，身边不缺人，有食禄到哪都不挨饿。晚年宽裕、子女运也好。但重情难拒绝易吃亏，施予时也要定个限度。",
          ja: "情が深く福の大きい相です。人を包む器が広く周りに人が絶えず、食の福があってどこでも飢えないとされました。晩年が豊かで子ども運も良い方です。ただ情が深い分断れずに損をしやすいので、与えるときも限度を決めておくのが良いでしょう。",
        },
      },
      {
        name: { ko: "작고 야무진 입", en: "Small, firm mouth", zh: "小而紧致的嘴", ja: "小さく引き締まった口" },
        meaning: {
          ko: "말이 신중하고 살림이 알뜰한 상입니다. 쓸데없는 말을 하지 않아 신뢰를 얻고, 계획적으로 돈을 모읍니다. 큰 모험보다 안정을 택하는 편이라 급격한 성공은 드물지만 꾸준히 자리를 잡습니다. 지나치게 소극적이면 기회를 놓칠 수 있으니 가끔은 먼저 손을 내밀어 보세요.",
          en: "Careful with words and thrifty at home. You earn trust by not speaking idly and save money by plan. Preferring stability to big gambles, you rarely succeed overnight but settle in steadily. Too much reserve can miss chances, so reach out first now and then.",
          zh: "言语谨慎、持家节俭之相。不说废话而得信任，有计划地存钱。偏好安稳而非冒险，少有骤然成功但稳步立足。过于被动会错失机会，偶尔要主动伸手。",
          ja: "言葉が慎重で家計がしっかりした相です。無駄なことを言わず信頼を得て、計画的にお金を貯めます。大きな冒険より安定を選ぶので急激な成功は少ないものの、着実に居場所を築きます。消極的すぎると機会を逃すので、たまには先に手を差し伸べてみてください。",
        },
      },
      {
        name: { ko: "올라간 입꼬리", en: "Upturned corners", zh: "上扬的嘴角", ja: "上がった口角" },
        meaning: {
          ko: "가만히 있어도 웃는 듯한 입은 복이 들어오는 입이라 합니다. 긍정적이고 밝아 사람들이 먼저 다가오며, 어려운 일도 주변의 도움으로 풀립니다. 윗사람에게 사랑받아 승진과 추천 운이 좋습니다. 타고난 복을 지키려면 뒤에서 남의 말을 하지 않는 것이 중요합니다.",
          en: "A mouth that seems to smile even at rest is said to welcome blessings. Positive and bright, people approach you first and difficulties resolve with help from around you. Favored by seniors, you have good luck with promotion and recommendation. To keep this inborn luck, avoid speaking of others behind their backs.",
          zh: "静止时也像在笑的嘴，是福气入口之相。乐观开朗，人主动靠近，难事也靠旁人相助化解。受长辈喜爱，升职、推荐运好。要守住天生的福，切忌背后议论他人。",
          ja: "じっとしていても笑っているような口は福が入ってくる口とされます。前向きで明るく人の方から近づいてきて、困りごとも周りの助けで解決します。目上に愛され昇進と推薦の運が良いです。生まれ持った福を守るには、陰で人の噂をしないことが大切です。",
        },
      },
      {
        name: { ko: "내려간 입꼬리", en: "Downturned corners", zh: "下垂的嘴角", ja: "下がった口角" },
        meaning: {
          ko: "생각이 깊고 진지한 상입니다. 쉽게 들뜨지 않아 큰 실수가 적고, 맡은 일을 끝까지 책임집니다. 다만 무뚝뚝해 보여 오해를 사기 쉽고, 스스로도 걱정이 많은 편입니다. 관상가들은 '입꼬리를 올리는 연습만으로도 복이 배로 는다'고 했으니, 거울 앞에서 웃는 습관을 들여 보세요.",
          en: "Thoughtful and serious. Not easily carried away, you make few big mistakes and see your duties through. You can look gruff and be misread, and you tend to worry. Readers said that 'simply practising a lifted corner doubles your blessings', so make a habit of smiling at the mirror.",
          zh: "思虑深、认真之相。不易浮躁，少犯大错，有始有终。但看起来冷淡易被误会，自己也多忧虑。相师说“练习提起嘴角福就加倍”，不妨养成对镜微笑的习惯。",
          ja: "考えが深く真面目な相です。浮かれにくく大きな失敗が少なく、任された仕事を最後まで責任を持ちます。ただ無愛想に見えて誤解されやすく、自分でも心配が多い方です。観相家は「口角を上げる練習だけで福が倍になる」と言ったので、鏡の前で笑う習慣をつけてみてください。",
        },
      },
      {
        name: { ko: "활 모양 입술", en: "Bow-shaped lips", zh: "弓形嘴唇", ja: "弓型の唇" },
        meaning: {
          ko: "윗입술의 산이 뚜렷하고 입꼬리가 또렷한 활 모양 입은 표현력이 뛰어나고 매력이 있는 상입니다. 말로 사람을 얻어 강의·방송·영업·상담처럼 말하는 일에 어울립니다. 연애운도 좋은 편이지만 말이 많아지면 구설이 따를 수 있으니, 들을 때는 충분히 듣는 균형이 필요합니다.",
          en: "A clear cupid's bow with distinct corners marks expressiveness and charm. You win people with words and suit speaking work: teaching, broadcasting, sales, counselling. Romance luck is good, but too much talk invites gossip, so balance it by truly listening.",
          zh: "唇峰分明、嘴角清晰的弓形嘴，表达力强、有魅力之相。以言语得人心，适合讲课、播音、销售、咨询等说话的工作。恋爱运也好，但话多易招口舌，听的时候要听够。",
          ja: "上唇の山がはっきりし口角が明瞭な弓型の口は表現力に優れ魅力のある相です。言葉で人を得て、講義・放送・営業・相談など話す仕事に向きます。恋愛運も良い方ですが、話が多くなると口の災いが伴うことがあるので、聞くときは十分に聞く均衡が必要です。",
        },
      },
      {
        name: { ko: "얇은 입술", en: "Thin lips", zh: "薄唇", ja: "薄い唇" },
        meaning: {
          ko: "이성적이고 논리가 분명한 상입니다. 감정에 휘둘리지 않아 판단이 정확하고, 말을 아껴 실수가 적습니다. 다만 정이 적어 보여 차갑다는 말을 듣기 쉽고, 베푸는 데 인색해지면 말년에 외로울 수 있다고 하니 작은 친절을 자주 베푸는 것이 좋습니다.",
          en: "Rational with clear logic. Not swept by emotion, your judgment is accurate and sparing words keep mistakes few. You can seem cool and short on warmth, and stinginess in giving is said to bring loneliness in later life, so offer small kindnesses often.",
          zh: "理性、逻辑清晰之相。不被情绪左右，判断准确，惜言少错。但看起来寡情易被说冷淡，若吝于施予晚年易孤独，宜常行小善。",
          ja: "理性的で論理がはっきりした相です。感情に振り回されず判断が正確で、言葉を惜しむので失敗が少ないです。ただ情が薄く見えて冷たいと言われやすく、与えることに吝嗇になると晩年に寂しくなるとされるので、小さな親切を頻繁に施すのが良いでしょう。",
        },
      },
    ],
    tips: {
      ko: "입은 모양보다 '다물고 있을 때의 상태'를 봅니다. 가만히 있을 때 입이 벌어져 있는지, 입꼬리가 어느 쪽을 향하는지, 입술 색이 붉은지 어두운지를 함께 봐야 합니다. 입술 색은 그날의 건강과 기운을 반영하므로 입술이 트고 색이 어두우면 운세 이전에 몸을 돌봐야 할 때입니다. 입은 얼굴에서 가장 쉽게 바꿀 수 있는 부위이기도 합니다. 입꼬리를 올리는 표정 습관 하나가 인상과 사람 운을 바꾼다고 옛 관상가들은 거듭 강조했습니다.",
      en: "Judge the mouth by its state at rest rather than its outline alone: whether it hangs open, which way the corners point, whether the lips are red or dark. Lip color reflects the day's health and energy, so chapped, dark lips mean the body needs care before any fortune is read. The mouth is also the easiest feature to change. The old readers kept insisting that the single habit of lifting the corners changes both your impression and your luck with people.",
      zh: "看嘴不只看轮廓，更看“闭着时的状态”：静止时是否张开、嘴角朝哪、唇色红润或发暗。唇色反映当天的健康与气，唇裂色暗时先顾身体再谈运势。嘴也是脸上最容易改变的部位，古相师反复强调，一个提起嘴角的表情习惯就能改变印象与人缘。",
      ja: "口は形より「閉じているときの状態」を見ます。じっとしているとき口が開いているか、口角がどちらを向いているか、唇の色が赤いか暗いかを一緒に見る必要があります。唇の色はその日の健康と気を映すので、唇が荒れて色が暗ければ運勢の前に体をいたわる時です。口は顔の中で最も変えやすい部位でもあります。口角を上げる表情の習慣ひとつが印象と人の運を変えると、昔の観相家は繰り返し強調しました。",
    },
    faq: [
      {
        question: { ko: "입술이 두꺼우면 정이 많다는 말이 맞나요?", en: "Is it true that full lips mean a warm heart?", zh: "嘴唇厚就重情是真的吗？", ja: "唇が厚いと情が深いというのは本当ですか？" },
        answer: {
          ko: "관상에서는 그렇게 봅니다. 입술의 두께를 정(情)의 두께로 풀이해, 두툼한 입술은 사람에게 마음을 많이 쓰고 베푸는 상, 얇은 입술은 이성적이고 절제하는 상으로 봅니다. 특히 윗입술이 두꺼우면 먼저 베푸는 정, 아랫입술이 두꺼우면 받는 복이 많다고 합니다. 어느 쪽이든 극단적이지 않고 균형이 맞을 때 가장 좋습니다.",
          en: "That is how physiognomy reads it. Lip thickness is read as the thickness of affection: full lips mean caring and giving, thin lips mean reason and restraint. A thick upper lip means you give first; a thick lower lip means you receive many blessings. Either way, balance without extremes is best.",
          zh: "相学是这样看的。唇的厚度被解读为情的厚度，厚唇主用心待人、乐于施予，薄唇主理性克制。上唇厚者先施予，下唇厚者多受福。无论哪种，不走极端、均衡时最好。",
          ja: "人相ではそう見ます。唇の厚さを情の厚さと解釈し、厚い唇は人に心を多く使い与える相、薄い唇は理性的で節制する相と見ます。特に上唇が厚ければ先に与える情、下唇が厚ければ受ける福が多いとされます。どちらにしても極端でなく均衡がとれているときが最も良いです。",
        },
      },
      {
        question: { ko: "입이 크면 좋은 관상인가요?", en: "Is a big mouth a good sign?", zh: "嘴大是好面相吗？", ja: "口が大きいと良い人相ですか？" },
        answer: {
          ko: "옛 관상서는 '입이 크면 천하를 먹는다'고 하여 큰 입을 그릇이 큰 상으로 보았습니다. 사람을 많이 품고 먹을 복이 크다는 뜻입니다. 다만 입이 크면서 다물어지지 않고 늘 벌어져 있으면 기운이 새는 상으로 보니, 크기보다 야무지게 다물어지는지가 더 중요합니다. 작은 입도 입꼬리가 또렷하면 좋은 상입니다.",
          en: "The old texts said 'a big mouth eats the world', reading it as a face with a large vessel: room for many people and great luck with food. But a big mouth that cannot close and always hangs open is read as energy leaking, so closing firmly matters more than size. A small mouth with crisp corners is also a good sign.",
          zh: "古相书说“口大吃四方”，把大嘴视为器量大之相，容人多、食禄大。但嘴大却闭不拢、常张开者是漏气之相，所以比大小更重要的是能否闭得紧。小嘴若嘴角分明也是好相。",
          ja: "昔の相書は「口が大きければ天下を食う」と言い、大きな口を器の大きい相と見ました。人を多く包み食の福が大きいという意味です。ただ口が大きくても閉じられずいつも開いていれば気が漏れる相と見るので、大きさよりしっかり閉じられるかの方が重要です。小さい口も口角がはっきりしていれば良い相です。",
        },
      },
      {
        question: { ko: "입 주변 점은 무슨 뜻인가요?", en: "What does a mole near the mouth mean?", zh: "嘴边的痣是什么意思？", ja: "口のまわりのほくろはどんな意味ですか？" },
        answer: {
          ko: "입가의 점은 전통적으로 '먹을 복'과 관련지어 봅니다. 입술 바로 옆이나 입꼬리 근처의 점은 먹을 복이 있고 말재주가 좋다고 하며, 아랫입술 아래의 점은 말년에 자녀나 사람 문제로 신경 쓸 일이 생긴다고도 합니다. 입술 위에 난 점은 구설을 조심하라는 뜻으로 읽습니다. 점의 해석은 위치와 색에 따라 달라지므로 점 관상 페이지도 함께 참고하세요.",
          en: "Moles around the mouth are traditionally tied to luck with food. One right beside the lips or near a corner means good food luck and a way with words; one under the lower lip suggests worries over children or people late in life; one on the lip itself warns against gossip. Readings depend on position and color, so see the moles guide as well.",
          zh: "嘴边的痣传统上与“食禄”相关。紧挨嘴唇或嘴角附近的痣主有食禄、口才好；下唇下方的痣主晚年为子女或人事操心；唇上的痣提醒谨防口舌。痣的解读因位置与颜色而异，请一并参考痣相页面。",
          ja: "口元のほくろは伝統的に「食の福」と関連づけて見ます。唇のすぐ横や口角近くのほくろは食の福があり話が上手いとされ、下唇の下のほくろは晩年に子どもや人のことで気を使うことが起きるともされます。唇の上にあるほくろは口の災いに注意という意味に読みます。ほくろの解釈は位置と色で変わるので、ほくろの人相ページも併せて参考にしてください。",
        },
      },
    ],
    relatedTypes: ["charm-wealth", "fortune-charm", "wealth-charm", "charm-fortune"],
  },

  // ───────────────────────── 이마 ─────────────────────────
  {
    id: "forehead",
    hanja: "額",
    emoji: "🌅",
    featureId: "forehead",
    name: { ko: "이마", en: "Forehead", zh: "额头", ja: "額" },
    title: {
      ko: "이마 관상 보는 법 | 이마 넓이·모양별 초년운과 성격",
      en: "Forehead Face Reading | Early-Life Fortune and Personality by Forehead Shape",
      zh: "额头面相怎么看 | 额头宽窄·形状与早年运、性格",
      ja: "額の人相の見方 | 額の広さ・形でわかる初年運と性格",
    },
    description: {
      ko: "관상에서 이마는 하늘이 준 복과 초년운, 지혜를 보는 자리입니다. 넓은 이마, 좁은 이마, 볼록한 이마, 평평한 이마, M자 이마 등 이마 모양별 해석과 이마 주름 보는 법을 정리했습니다.",
      en: "In face reading the forehead shows heaven-given blessings, early-life fortune and wisdom. Wide, narrow, rounded, flat and M-shaped foreheads explained, plus how to read forehead lines.",
      zh: "面相中额头是看天赐之福、早年运与智慧的部位。整理了宽额、窄额、饱满额、平额、M字额等额型解读以及额纹的看法。",
      ja: "人相で額は天が与えた福と初年運、知恵を見る場所です。広い額、狭い額、丸い額、平らな額、M字の額など額の形ごとの解釈と額のしわの見方をまとめました。",
    },
    keywords: {
      ko: ["이마 관상", "이마 넓은 관상", "이마 좁은 관상", "이마 주름 관상", "M자 이마 관상", "이마 볼록 관상"],
      en: ["forehead face reading", "forehead shape personality", "korean face reading forehead"],
      zh: ["额头面相", "额头宽 面相", "额纹 面相"],
      ja: ["額 人相", "額 広い 人相", "額のしわ 人相"],
    },
    heading: {
      ko: "이마 관상: 이마 모양으로 보는 초년운과 지혜",
      en: "Forehead Face Reading: Early Fortune and Wisdom in the Brow",
      zh: "额头面相：从额型看早年运与智慧",
      ja: "額の人相：額の形で見る初年運と知恵",
    },
    intro: {
      ko: "관상학은 얼굴을 위·가운데·아래의 삼정(三停)으로 나눕니다. 이마는 그중 상정(上停)으로 하늘(天)에 해당하며, 부모와 조상에게서 받은 복, 타고난 지혜, 그리고 15세부터 30세까지의 초년운을 봅니다. 마의상서는 이마를 '관록궁(官祿宮)'이라 하여 벼슬과 직장, 윗사람의 도움을 보는 자리로 삼았습니다. 이마가 넓고 반듯하며 빛이 나면 어려서부터 윗사람의 도움을 받고 공부 운이 좋다고 풀이했습니다.\n\n이마를 볼 때는 넓이, 높이, 둥근 정도, 그리고 피부의 윤기를 봅니다. 넓이는 생각의 폭과 포용력, 높이는 이상과 지혜, 둥근 정도는 복이 들어오는 그릇, 윤기는 지금 운이 열려 있는지를 뜻합니다. 머리카락이 나는 경계선(발제)이 고르고 깨끗하면 초년이 순탄하고, 들쭉날쭉하면 어린 시절에 변화가 많았다고 봅니다.\n\n이마에는 세 줄의 가로 주름이 생기는데 위부터 천문(天紋)·인문(人紋)·지문(地紋)이라 합니다. 세 줄이 끊어지지 않고 고르게 나 있으면 하늘·사람·땅의 복을 두루 받는 상이고, 주름이 어지럽게 끊어져 있으면 생각이 많고 고생이 따른다고 풀이했습니다. 젊은 나이에 주름이 깊으면 일찍 철이 들어 책임을 많이 진 사람으로 봅니다.",
      en: "Physiognomy divides the face into three zones: upper, middle and lower. The forehead is the upper zone and corresponds to heaven; it shows blessings inherited from parents and ancestors, inborn wisdom and the early fortune of ages 15 to 30. The Mayi Xiangfa calls it the 'palace of office and salary', where career, position and help from seniors are read. A wide, even, luminous forehead meant help from elders from an early age and good luck in study.\n\nA reader looks at width, height, roundness and the sheen of the skin. Width stands for breadth of mind and tolerance, height for ideals and wisdom, roundness for the vessel that receives blessings, and sheen for whether fortune is open right now. An even, clean hairline means a smooth early life; a ragged one suggests many changes in childhood.\n\nThree horizontal lines form on the forehead, called from the top the heaven, human and earth lines. Three unbroken, even lines mean blessings from heaven, people and earth alike, while broken, tangled lines mean many thoughts and hardship. Deep lines at a young age mark someone who matured early and carried much responsibility.",
      zh: "相学把脸分为上、中、下“三停”。额头属上停，对应“天”，看父母祖上所赐之福、天生智慧以及十五到三十岁的早年运。《麻衣相法》称额为“官禄宫”，看官职、工作与长辈相助。额头宽阔端正有光者，自幼得长辈提携、学业运好。\n\n看额头要看宽度、高度、饱满程度与皮肤光泽。宽度主思维广度与包容力，高度主理想与智慧，饱满主纳福之器，光泽主当下运势是否开。发际线整齐干净者早年顺遂，参差不齐者童年变动多。\n\n额上会生三道横纹，从上到下称天纹、人纹、地纹。三纹不断、均匀者天人地之福兼得，纹路杂乱断裂者思虑多、劳碌。年轻时纹深者早熟、多担责任。",
      ja: "人相学は顔を上・中・下の三停に分けます。額はそのうちの上停で天にあたり、親と先祖から受けた福、生まれつきの知恵、そして15歳から30歳までの初年運を見ます。麻衣相法は額を「官禄宮」と呼び、官職と職場、目上の助けを見る場所としました。額が広く整って光っていれば幼い頃から目上の助けを受け、勉強の運が良いと解釈しました。\n\n額を見るときは広さ、高さ、丸み、そして肌のつやを見ます。広さは考えの幅と包容力、高さは理想と知恵、丸みは福が入る器、つやは今運が開いているかを意味します。髪の生え際が整ってきれいなら初年が順調で、ぎざぎざなら幼い頃に変化が多かったと見ます。\n\n額には三本の横じわができ、上から天紋・人紋・地紋と言います。三本が途切れず均等に入っていれば天・人・地の福をあまねく受ける相で、しわが乱れて途切れていれば考えが多く苦労が伴うと解釈しました。若いうちにしわが深ければ早く大人になり責任を多く負った人と見ます。",
    },
    shapes: [
      {
        name: { ko: "넓고 높은 이마", en: "Wide, high forehead", zh: "宽而高的额头", ja: "広く高い額" },
        meaning: {
          ko: "초년운과 관운이 좋은 상입니다. 머리가 좋고 생각의 폭이 넓어 공부와 시험에 강하며, 윗사람의 눈에 들어 일찍 자리를 잡습니다. 이상이 높아 현실과 부딪히면 실망도 크니, 큰 그림과 함께 작은 실천을 챙기는 것이 좋습니다.",
          en: "Good early fortune and career luck. Bright and broad-minded, strong in study and exams, and noticed by seniors so you settle early. High ideals can bring sharp disappointment when they meet reality, so pair the big picture with small daily steps.",
          zh: "早年运与官运好之相。聪明、思路宽，擅长学习考试，得长辈赏识而早立足。理想高，遇现实落差失望也大，宜大局与小步并重。",
          ja: "初年運と官運の良い相です。頭が良く考えの幅が広いので勉強と試験に強く、目上の目にとまって早く居場所を得ます。理想が高く現実とぶつかると失望も大きいので、大きな絵と一緒に小さな実践を積むのが良いでしょう。",
        },
      },
      {
        name: { ko: "좁고 낮은 이마", en: "Narrow, low forehead", zh: "窄而低的额头", ja: "狭く低い額" },
        meaning: {
          ko: "스스로 길을 개척하는 상입니다. 초년에는 윗사람의 도움보다 제 힘으로 부딪히며 배우고, 그 경험이 쌓여 중년 이후에 늦게 피는 꽃처럼 좋아집니다. 현실 감각이 뛰어나고 손재주가 좋아 기술·실무 분야에서 인정받습니다.",
          en: "A face that carves its own path. Early on you learn by striving on your own rather than through elders' help, and that experience builds toward a late bloom after midlife. Practical sense and skilled hands bring recognition in technical and hands-on fields.",
          zh: "自己开路之相。早年少靠长辈，多靠自己摸索学习，经验积累后中年以后如晚开之花渐好。现实感强、手巧，在技术、实务领域受认可。",
          ja: "自分で道を切り開く相です。初年は目上の助けより自力でぶつかって学び、その経験が積み重なって中年以降に遅咲きの花のように良くなります。現実感覚に優れ手先が器用で、技術・実務の分野で認められます。",
        },
      },
      {
        name: { ko: "볼록하게 둥근 이마", en: "Rounded, full forehead", zh: "饱满圆润的额头", ja: "丸くふくらんだ額" },
        meaning: {
          ko: "복이 들어오는 그릇이 큰 상입니다. 기억력이 좋고 인덕이 있어 사람들이 도와주며, 특히 여성의 둥근 이마는 예로부터 귀한 상으로 쳤습니다. 감정이 풍부하고 상상력이 뛰어나 창작 분야에 어울립니다. 생각이 많아 밤에 잠을 설치기 쉬우니 마음을 비우는 시간이 필요합니다.",
          en: "A large vessel for incoming blessings. Good memory and goodwill bring help from others, and a woman's rounded forehead has long been counted noble. Rich feeling and imagination suit creative work. Many thoughts can disturb sleep, so make time to empty the mind.",
          zh: "纳福之器大之相。记性好、有人缘、常得相助，女性圆额自古视为贵相。感情丰富、想象力强，适合创作领域。思虑多易失眠，需有放空的时间。",
          ja: "福が入る器の大きい相です。記憶力が良く人徳があって人が助けてくれ、特に女性の丸い額は昔から貴い相とされました。感情が豊かで想像力に優れ創作分野に向きます。考えが多く夜に眠れなくなりやすいので、心を空にする時間が必要です。",
        },
      },
      {
        name: { ko: "평평하고 반듯한 이마", en: "Flat, even forehead", zh: "平整端正的额头", ja: "平らで整った額" },
        meaning: {
          ko: "성실하고 반듯한 상입니다. 꾸준함으로 신뢰를 얻고, 맡은 일을 묵묵히 해내 조직에서 오래 자리를 지킵니다. 화려하지 않아도 끝까지 남는 사람입니다. 변화를 두려워해 기회를 놓칠 수 있으니 가끔은 새로운 일에 손을 대 보는 것이 운을 넓힙니다.",
          en: "Sincere and upright. Steadiness earns trust, and quietly doing your job keeps your place in an organization for a long time. Not flashy, but the one who remains to the end. Fear of change can miss chances, so trying something new now and then widens your luck.",
          zh: "诚实端正之相。以坚持赢得信任，默默做事，在组织中长久立足。不张扬却能留到最后。惧怕变化易失机会，偶尔尝试新事可拓宽运势。",
          ja: "誠実で真っ直ぐな相です。地道さで信頼を得て、任された仕事を黙々とこなし組織で長く居場所を守ります。華やかでなくても最後まで残る人です。変化を恐れて機会を逃すことがあるので、たまには新しいことに手を出してみると運が広がります。",
        },
      },
      {
        name: { ko: "M자 이마", en: "M-shaped hairline", zh: "M字额", ja: "M字の額" },
        meaning: {
          ko: "양쪽 이마 모서리가 올라가 M자 모양을 이루는 이마는 예술적 감각과 독창성이 뛰어난 상입니다. 남과 다른 길을 가며 자기 분야에서 이름을 얻습니다. 다만 고집과 개성이 강해 조직 생활보다 혼자 하는 일이 맞고, 초년보다 중년 이후에 인정받는 경우가 많습니다.",
          en: "A hairline that rises at both corners into an M marks artistic sense and originality. You walk a different road and make a name in your own field. Strong will and individuality suit independent work more than organizations, and recognition usually comes after midlife.",
          zh: "两侧额角上移呈M字的额头，艺术感与独创性强之相。走与众不同之路，在自己的领域成名。固执个性强，适合独立工作而非组织，多在中年以后获认可。",
          ja: "両側の額の角が上がってM字をなす額は芸術的感覚と独創性に優れた相です。人と違う道を行き自分の分野で名を得ます。ただ頑固で個性が強いので組織生活より一人でする仕事が合い、初年より中年以降に認められることが多いです。",
        },
      },
    ],
    tips: {
      ko: "이마는 앞머리를 올리고 봐야 정확합니다. 넓이는 눈썹 위부터 발제까지의 높이와 양쪽 관자놀이 사이의 폭을 함께 보고, 옆에서 보아 볼록한지 평평한지를 확인합니다. 이마의 윤기는 그때그때의 운을 보여 주므로, 이마가 거칠거나 어두워 보이면 잠과 휴식을 먼저 챙깁니다. 앞머리로 이마를 늘 가리면 관운이 막힌다는 속설이 있는데, 관상학적으로는 '이마를 드러내면 윗사람과 눈이 마주쳐 기회가 늘어난다'는 뜻으로 받아들이면 됩니다.",
      en: "Lift the fringe before reading the forehead. Judge width by the height from brow to hairline together with the span between the temples, and check from the side whether it is rounded or flat. The sheen of the forehead shows fortune in the moment, so a rough or dark forehead calls first for sleep and rest. The folk belief that always covering the forehead with a fringe blocks career luck can be understood as 'an uncovered brow meets the eyes of seniors and multiplies chances'.",
      zh: "看额要把刘海撩起才准。宽度看眉上到发际的高度与两侧太阳穴之间的跨度，侧面看饱满或平坦。额头光泽反映当下运势，额头粗糙发暗时先补觉休息。民间说刘海总遮额会挡官运，从相学上可理解为“露出额头易与上位者对视、机会更多”。",
      ja: "額は前髪を上げて見てこそ正確です。広さは眉の上から生え際までの高さと両側のこめかみの間の幅を一緒に見て、横から見てふくらんでいるか平らかを確認します。額のつやはその時々の運を示すので、額が荒れたり暗く見えたりすれば睡眠と休息を先に整えます。前髪でいつも額を隠すと官運が塞がるという俗説がありますが、人相学的には「額を出せば目上の人と目が合い機会が増える」という意味に受け取ればよいでしょう。",
    },
    faq: [
      {
        question: { ko: "이마가 넓으면 머리가 좋다는 말이 사실인가요?", en: "Is a wide forehead really a sign of intelligence?", zh: "额头宽就聪明是真的吗？", ja: "額が広いと頭が良いというのは本当ですか？" },
        answer: {
          ko: "관상학에서는 이마를 지혜와 생각의 폭을 보는 자리로 삼아 넓고 높은 이마를 총명한 상으로 풀이합니다. 다만 이것은 지능 검사 같은 과학적 근거가 아니라, 넓은 이마가 주는 트인 인상과 윗사람의 호감이 공부와 출세에 유리하게 작용한다는 경험적 해석입니다. 이마가 좁아도 눈빛이 맑으면 총명한 상으로 봅니다.",
          en: "Physiognomy treats the forehead as the seat of wisdom and breadth of thought, so a wide, high forehead is read as bright. This is not scientific evidence like an IQ test but an experiential reading: an open brow gives an open impression and wins elders' favor, which helps in study and career. A narrow forehead with clear eyes is also read as bright.",
          zh: "相学把额头作为看智慧与思维广度的部位，宽高之额解读为聪慧。但这不是智力测验那样的科学依据，而是经验性的解读：开阔的额头给人开朗印象、易得上位者好感，有利学业与仕途。额窄但眼神清亮者同样视为聪明之相。",
          ja: "人相学では額を知恵と考えの幅を見る場所とし、広く高い額を聡明な相と解釈します。ただこれは知能検査のような科学的根拠ではなく、広い額が与える開けた印象と目上の好感が勉強と出世に有利に働くという経験的な解釈です。額が狭くても目が澄んでいれば聡明な相と見ます。",
        },
      },
      {
        question: { ko: "이마 주름이 많으면 고생을 많이 하나요?", en: "Do many forehead lines mean a hard life?", zh: "额纹多就劳碌吗？", ja: "額のしわが多いと苦労が多いのですか？" },
        answer: {
          ko: "주름의 수보다 모양이 중요합니다. 세 줄이 끊어지지 않고 가지런하면 오히려 하늘·사람·땅의 복을 고루 받는 좋은 상입니다. 주름이 어지럽게 끊어지고 비스듬히 교차하면 생각이 많고 일이 꼬이기 쉽다고 봅니다. 젊은 나이의 깊은 주름은 일찍 책임을 진 사람에게 나타나며, 이는 고생이기도 하지만 남보다 빨리 단단해졌다는 뜻이기도 합니다.",
          en: "Shape matters more than number. Three unbroken, orderly lines are actually a good sign, blessings from heaven, people and earth alike. Lines that are broken, tangled or crossing at angles suggest many worries and tangled affairs. Deep lines at a young age appear on those who took responsibility early, which is hardship but also means you grew solid sooner than others.",
          zh: "纹的形状比数量重要。三纹不断、整齐反而是天人地之福兼得的好相。纹路杂乱断裂、斜向交叉者思虑多、事易纠缠。年轻时纹深者多早担责任，既是劳碌，也意味着比别人更早变得坚实。",
          ja: "しわの数より形が重要です。三本が途切れず整っていればむしろ天・人・地の福をあまねく受ける良い相です。しわが乱れて途切れ斜めに交差していれば考えが多く物事がこじれやすいと見ます。若い年齢の深いしわは早く責任を負った人に現れ、それは苦労でもありますが人より早くしっかりしたという意味でもあります。",
        },
      },
      {
        question: { ko: "앞머리로 이마를 가리면 운이 나빠지나요?", en: "Does covering the forehead with bangs hurt your luck?", zh: "刘海遮额会影响运势吗？", ja: "前髪で額を隠すと運が悪くなりますか？" },
        answer: {
          ko: "관상학에서 이마는 관록궁, 즉 윗사람과 직장의 운을 보는 자리라 '이마를 가리면 귀인이 알아보지 못한다'는 말이 생겼습니다. 중요한 면접이나 발표처럼 윗사람에게 자신을 보여야 하는 날에는 이마를 드러내는 것이 관상학적으로는 유리하다고 봅니다. 평소에는 자신에게 어울리는 머리 모양이 인상을 좋게 하므로 너무 얽매일 필요는 없습니다.",
          en: "Because the forehead is the palace of office, where luck with seniors and work is read, the saying arose that 'a covered forehead keeps benefactors from recognizing you'. On days when you must present yourself to seniors, such as interviews or presentations, showing the forehead is considered favorable. Day to day, the hairstyle that suits you improves your impression most, so there is no need to be bound by it.",
          zh: "相学中额为官禄宫，看上位者与工作之运，故有“遮额则贵人认不出”之说。面试、汇报等需向上位者展示自己的日子，露出额头在相学上有利。平日里适合自己的发型最能提升印象，不必过于拘泥。",
          ja: "人相学で額は官禄宮、つまり目上と職場の運を見る場所なので「額を隠すと貴人が気づかない」という言葉が生まれました。大事な面接や発表のように目上に自分を見せる日は、額を出す方が人相学的には有利と見ます。普段は自分に似合う髪型が印象を良くするので、あまりとらわれる必要はありません。",
        },
      },
    ],
    relatedTypes: ["wisdom-leadership", "leadership-wisdom", "wisdom-fortune", "leadership-fortune"],
  },

  // ───────────────────────── 눈썹 ─────────────────────────
  {
    id: "eyebrows",
    hanja: "眉",
    emoji: "🌙",
    name: { ko: "눈썹", en: "Eyebrows", zh: "眉毛", ja: "眉" },
    title: {
      ko: "눈썹 관상 보는 법 | 눈썹 모양별 형제운·성격·대인운",
      en: "Eyebrow Face Reading | Siblings, Personality and Relationships by Eyebrow Shape",
      zh: "眉毛面相怎么看 | 不同眉型的兄弟运·性格·人缘",
      ja: "眉の人相の見方 | 眉の形でわかる兄弟運・性格・対人運",
    },
    description: {
      ko: "관상에서 눈썹은 형제운과 대인운, 31~34세의 운을 보는 자리입니다. 짙은 눈썹, 옅은 눈썹, 일자 눈썹, 아치형 눈썹, 팔자 눈썹, 긴 눈썹 등 눈썹 모양별 성격과 운세 해석을 정리했습니다.",
      en: "In face reading the eyebrows show luck with siblings and people and the years 31 to 34. Thick, thin, straight, arched, drooping and long eyebrows explained with personality and fortune.",
      zh: "面相中眉毛是看兄弟运、人缘与31~34岁运势的部位。整理了浓眉、淡眉、一字眉、弯眉、八字眉、长眉等眉型的性格与运势。",
      ja: "人相で眉は兄弟運と対人運、31〜34歳の運を見る場所です。濃い眉、薄い眉、一文字眉、アーチ眉、八の字眉、長い眉など眉の形ごとの性格と運勢をまとめました。",
    },
    keywords: {
      ko: ["눈썹 관상", "눈썹 모양 관상", "일자 눈썹 관상", "짙은 눈썹 관상", "눈썹 문신 관상", "팔자 눈썹"],
      en: ["eyebrow face reading", "eyebrow shape personality", "korean face reading eyebrows"],
      zh: ["眉毛面相", "眉型性格", "一字眉面相"],
      ja: ["眉 人相", "眉の形 性格", "一文字眉 人相"],
    },
    heading: {
      ko: "눈썹 관상: 눈썹 모양으로 보는 성격과 대인운",
      en: "Eyebrow Face Reading: Character and Relationships in the Brows",
      zh: "眉毛面相：从眉型看性格与人缘",
      ja: "眉の人相：眉の形で見る性格と対人運",
    },
    intro: {
      ko: "관상에서 눈썹은 '보수관(保壽官)'이라 하여 눈을 지붕처럼 덮어 보호하는 자리로 봅니다. 눈이 마음이라면 눈썹은 그 마음을 지키는 울타리입니다. 마의상서는 눈썹을 형제궁(兄弟宮)이라 하여 형제·친구·동료와의 인연을 보는 자리로 삼았고, 나이로는 31세부터 34세까지의 운을 눈썹에서 읽었습니다. 눈썹이 가지런하고 윤기가 있으면 형제와 친구의 도움이 많고, 눈썹이 끊어지거나 거꾸로 나 있으면 가까운 사람과의 다툼을 조심하라고 했습니다.\n\n눈썹을 볼 때는 짙기, 길이, 모양, 그리고 눈과의 거리를 봅니다. 눈썹이 눈보다 길면 정이 깊고 형제운이 좋으며, 눈보다 짧으면 혼자 힘으로 사는 상입니다. 눈썹과 눈 사이(전택궁)가 넓으면 마음이 너그럽고 집과 땅의 복이 있다고 하고, 좁으면 성격이 급하고 자기 것을 잘 챙긴다고 풀이합니다. 눈썹 털이 한 방향으로 가지런히 누워 있으면 성품이 순하고, 뻗치거나 거꾸로 나 있으면 기운이 세고 고집이 있다고 봅니다.\n\n눈썹은 얼굴 부위 가운데 가장 쉽게 손질할 수 있는 곳이라, 옛사람들도 눈썹을 다듬어 인상을 바꾸는 것을 '개운(開運)'의 한 방법으로 여겼습니다. 다만 눈썹을 지나치게 밀거나 가늘게 만들면 눈을 지키는 지붕이 없어지는 격이라 좋지 않게 보았습니다.",
      en: "In physiognomy the eyebrows are the 'guardians of longevity', the roof that covers and protects the eyes. If the eyes are the heart, the brows are the fence around it. The Mayi Xiangfa calls them the palace of siblings, where ties with brothers, sisters, friends and colleagues are read, and in the age map they govern 31 to 34. Neat, glossy brows mean much help from siblings and friends; broken brows or hairs growing backward warn of quarrels with those close to you.\n\nA reader looks at thickness, length, shape and the distance from the eye. Brows longer than the eye mean deep affection and good luck with siblings; shorter than the eye, a life lived on your own strength. A wide space between brow and eye means a generous mind and blessings of house and land; a narrow one, a quick temper and a firm grip on what is yours. Hairs that lie neatly in one direction show a mild nature; hairs that stick out or grow backward show strong energy and stubbornness.\n\nBecause the brows are the easiest feature to groom, the old readers counted shaping them as one way of 'opening fortune'. But shaving them off or making them too thin was frowned on, like removing the roof that shelters the eyes.",
      zh: "相学称眉为“保寿官”，像屋顶一样覆盖保护眼睛。眼是心，眉就是守心的篱笆。《麻衣相法》称眉为兄弟宫，看与兄弟、朋友、同事的缘分，流年主管三十一到三十四岁。眉毛整齐有光者多得兄弟朋友相助，眉断或逆生者要提防与亲近之人争执。\n\n看眉要看浓淡、长短、形状以及与眼的距离。眉长过眼者情深、兄弟运好；眉短于眼者靠自己过活。眉眼之间（田宅宫）宽者心宽、有房产之福；窄者性急、顾自己。眉毛顺向一边平伏者性情温顺，竖起或逆生者气强固执。\n\n眉是脸上最容易修整的部位，古人也把修眉改印象视为“开运”之法。但眉剃得过多或过细，如同拆掉护眼之顶，视为不佳。",
      ja: "人相で眉は「保寿官」と呼ばれ、目を屋根のように覆って守る場所と見ます。目が心なら眉はその心を守る垣根です。麻衣相法は眉を兄弟宮とし、兄弟・友人・同僚との縁を見る場所とし、年齢では31歳から34歳までの運を眉から読みました。眉が整ってつやがあれば兄弟と友人の助けが多く、眉が途切れたり逆に生えていれば身近な人との争いに注意せよとされました。\n\n眉を見るときは濃さ、長さ、形、そして目との距離を見ます。眉が目より長ければ情が深く兄弟運が良く、目より短ければ自力で生きる相です。眉と目の間（田宅宮）が広ければ心が寛大で家と土地の福があるとされ、狭ければ性格が急で自分のものをよく守ると解釈します。眉毛が一方向に整って寝ていれば性品が穏やかで、はねたり逆に生えていれば気が強く頑固だと見ます。\n\n眉は顔の部位の中で最も手入れしやすい場所なので、昔の人も眉を整えて印象を変えることを「開運」の一つの方法と考えました。ただ眉を剃りすぎたり細くしすぎたりすると目を守る屋根がなくなるようなもので、良くないと見ました。",
    },
    shapes: [
      {
        name: { ko: "짙고 가지런한 눈썹", en: "Thick, neat eyebrows", zh: "浓而整齐的眉毛", ja: "濃く整った眉" },
        meaning: {
          ko: "의지가 강하고 정이 깊은 상입니다. 형제와 친구 복이 많고 리더십이 있어 사람들을 이끕니다. 한번 맺은 인연을 오래 지키지만, 감정이 격해지면 말이 세게 나가 가까운 사람에게 상처를 줄 수 있으니 화가 날 때는 하루 뒤에 말하는 것이 좋습니다.",
          en: "Strong will and deep affection. Rich in siblings and friends, with the leadership to guide people. You keep bonds for a long time, but heated feelings can make your words harsh to those close to you, so when angry, speak a day later.",
          zh: "意志坚强、情深之相。兄弟朋友多，有领导力。缘分一旦结下便长久守护，但情绪激动时言语过重易伤亲近之人，生气时隔天再说为好。",
          ja: "意志が強く情が深い相です。兄弟と友人の福が多くリーダーシップがあって人を導きます。一度結んだ縁を長く守りますが、感情が高ぶると言葉が強く出て身近な人を傷つけることがあるので、怒ったときは一日おいて話すのが良いでしょう。",
        },
      },
      {
        name: { ko: "옅고 성긴 눈썹", en: "Thin, sparse eyebrows", zh: "淡而稀疏的眉毛", ja: "薄くまばらな眉" },
        meaning: {
          ko: "감성이 섬세하고 생각이 많은 상입니다. 형제나 친구보다 혼자 힘으로 일을 이루며, 조용히 자기 길을 갑니다. 사람에게 크게 기대하지 않아 실망도 적지만 외로움을 타기 쉬우니, 마음을 나눌 한두 사람을 꼭 곁에 두세요. 눈썹을 자연스럽게 그려 주면 대인운이 보완된다고 합니다.",
          en: "Delicate feeling and many thoughts. You achieve on your own rather than through siblings or friends, quietly walking your path. Expecting little from people means little disappointment, but loneliness comes easily, so keep one or two confidants close. Drawing the brows in naturally is said to supplement luck with people.",
          zh: "感性细腻、思虑多之相。不靠兄弟朋友，靠自己成事，安静走自己的路。对人期望不高故失望少，但易感孤独，务必留一两个知心人在身边。自然地画眉可补人缘运。",
          ja: "感性が繊細で考えの多い相です。兄弟や友人より自力で事を成し、静かに自分の道を行きます。人に大きく期待しないので失望も少ないですが寂しさを感じやすいので、心を分け合える一人二人を必ずそばに置いてください。眉を自然に描き足すと対人運が補われるとされます。",
        },
      },
      {
        name: { ko: "일자 눈썹", en: "Straight eyebrows", zh: "一字眉", ja: "一文字眉" },
        meaning: {
          ko: "결단력이 있고 솔직한 상입니다. 옳고 그름이 분명해 흐지부지한 일을 싫어하고, 한번 정하면 곧바로 행동합니다. 일 처리가 빠르고 믿음직해 직장에서 인정받습니다. 융통성이 부족해 보일 수 있으니, 상대의 사정을 한 번 더 묻는 여유가 인간관계를 부드럽게 합니다.",
          en: "Decisive and honest. Clear about right and wrong, you dislike half-finished things and act at once on a decision. Fast and dependable, you earn recognition at work. You can seem inflexible, so asking once more about the other person's situation softens relationships.",
          zh: "果断坦率之相。是非分明，讨厌拖泥带水，一旦决定立刻行动。办事快、可靠，职场受认可。可能显得不够变通，多问一句对方的处境可让人际更柔和。",
          ja: "決断力があり正直な相です。善悪がはっきりしていて曖昧なことを嫌い、一度決めればすぐ行動します。仕事の処理が速く頼りになるので職場で認められます。融通が利かないように見えることがあるので、相手の事情をもう一度尋ねる余裕が人間関係を柔らかくします。",
        },
      },
      {
        name: { ko: "아치형(초승달) 눈썹", en: "Arched eyebrows", zh: "弯月眉", ja: "アーチ型（三日月）眉" },
        meaning: {
          ko: "부드럽고 다정한 상으로 예로부터 '미인 눈썹'이라 불렸습니다. 감성이 풍부하고 예술적 감각이 있으며, 사람을 편하게 해 주어 대인운이 좋습니다. 이성에게 인기가 많아 연애운이 따릅니다. 마음이 여려 상처를 잘 받으니, 싫은 말은 흘려보내는 연습이 필요합니다.",
          en: "Soft and warm, long called the 'beauty's brow'. Rich in feeling and artistic sense, you put people at ease and enjoy good luck with relationships and romance. A tender heart bruises easily, so practise letting unkind words pass.",
          zh: "柔和多情之相，自古称“美人眉”。感性丰富、有艺术感，让人舒服，人缘好。受异性欢迎，恋爱运随之而来。心软易受伤，需练习让难听的话随风而去。",
          ja: "柔らかく優しい相で、昔から「美人眉」と呼ばれました。感性が豊かで芸術的感覚があり、人を楽にさせるので対人運が良いです。異性に人気があり恋愛運が伴います。心が繊細で傷つきやすいので、嫌な言葉は流す練習が必要です。",
        },
      },
      {
        name: { ko: "팔자(八字) 눈썹", en: "Drooping eyebrows", zh: "八字眉", ja: "八の字眉" },
        meaning: {
          ko: "눈썹 꼬리가 아래로 처진 팔자 눈썹은 마음이 착하고 남을 잘 도와주는 상입니다. 다툼을 피하고 양보를 잘해 적이 없습니다. 다만 자기주장이 약해 손해를 보거나 이용당하기 쉬우니, 돈과 보증 문제만큼은 단호해야 합니다. 나이가 들수록 사람 복으로 편안해지는 상입니다.",
          en: "Tails that droop downward mark a kind heart that readily helps others. Avoiding conflict and yielding easily, you have no enemies. A weak voice for yourself makes you easy to shortchange or use, so be firm about money and guarantees. With age, luck with people brings comfort.",
          zh: "眉尾下垂的八字眉，心善、乐于助人之相。避争执、善让步，没有敌人。但自我主张弱，易吃亏或被利用，钱财与担保之事务必坚决。年纪越大越靠人缘而安稳。",
          ja: "眉尻が下がった八の字眉は心が優しく人をよく助ける相です。争いを避け譲ることが上手で敵がいません。ただ自己主張が弱く損をしたり利用されたりしやすいので、お金と保証のことだけは断固とすべきです。年を重ねるほど人の福で安らかになる相です。",
        },
      },
      {
        name: { ko: "눈보다 긴 눈썹", en: "Eyebrows longer than the eyes", zh: "长过眼睛的眉毛", ja: "目より長い眉" },
        meaning: {
          ko: "눈썹이 눈 길이를 넘어 길게 뻗은 상은 장수와 형제운의 상징입니다. 정이 깊어 형제·친구와 오래 가고, 나이 들어 눈썹에 긴 털(수미)이 나면 장수의 표시로 여겨 뽑지 않았습니다. 인내심이 강하고 큰일을 오래 끌고 가는 힘이 있어 큰 조직이나 가업을 지키는 데 어울립니다.",
          en: "Brows that stretch past the eye are a sign of longevity and sibling luck. Deep affection keeps siblings and friends close for life, and a long hair that appears in the brow with age was left unplucked as a mark of long life. Patience and the strength to carry big things for a long time suit guarding a large organization or a family business.",
          zh: "眉长过眼者，是长寿与兄弟运的象征。情深，与兄弟朋友长久；年老眉中生出长毫（寿眉）视为长寿之兆，不拔。耐心强，有长期推动大事之力，适合守护大组织或家业。",
          ja: "眉が目の長さを越えて長く伸びた相は長寿と兄弟運の象徴です。情が深く兄弟・友人と長く続き、年を取って眉に長い毛（寿眉）が生えると長寿のしるしとして抜きませんでした。忍耐力が強く大きな事を長く引っ張る力があり、大きな組織や家業を守るのに向いています。",
        },
      },
    ],
    tips: {
      ko: "눈썹은 그린 상태가 아니라 자연 상태로 봅니다. 눈썹 머리(눈 안쪽)부터 꼬리까지 털이 어느 방향으로 누워 있는지, 중간에 끊어진 데는 없는지, 눈과의 간격은 어떤지를 봅니다. 관상학에서 눈썹 손질은 허용하지만 눈썹을 완전히 밀고 새로 그리는 것은 권하지 않습니다. 눈썹을 다듬을 때는 타고난 모양을 살려 끝을 살짝 정리하고, 눈썹 꼬리가 눈꼬리보다 조금 길게 남도록 하면 대인운이 좋아진다고 합니다.",
      en: "Read the brows in their natural state, not as drawn. Look at which way the hairs lie from the head of the brow to the tail, whether there are gaps in the middle, and how far they sit from the eye. Grooming is fine, but shaving the brows off and redrawing them is not recommended. When shaping, keep the natural line, tidy only the ends, and leave the tail a little longer than the outer corner of the eye; this is said to improve luck with people.",
      zh: "看眉要看自然状态而非画后。看从眉头到眉尾毛向哪边伏、中间有无断缺、与眼的间距如何。相学允许修眉，但不建议全部剃掉重画。修眉时顺着天生的形状略修末端，让眉尾比眼尾稍长，据说人缘会变好。",
      ja: "眉は描いた状態ではなく自然な状態で見ます。眉頭（目の内側）から眉尻まで毛がどの方向に寝ているか、途中に途切れがないか、目との間隔はどうかを見ます。人相学で眉の手入れは許容しますが、眉を完全に剃って描き直すことは勧めません。眉を整えるときは生まれつきの形を生かして先を少し整え、眉尻が目尻より少し長く残るようにすると対人運が良くなるとされます。",
    },
    faq: [
      {
        question: { ko: "눈썹 문신(반영구)을 하면 관상이 바뀌나요?", en: "Does eyebrow tattooing change your face reading?", zh: "纹眉会改变面相吗？", ja: "眉のアートメイクをすると人相が変わりますか？" },
        answer: {
          ko: "관상학에서는 눈썹 모양이 바뀌면 인상이 바뀌고, 인상이 바뀌면 사람 운이 달라진다고 보아 눈썹 손질을 개운법의 하나로 인정합니다. 다만 타고난 눈썹을 모두 지우고 전혀 다른 모양을 그리면 '뿌리 없는 눈썹'이라 하여 좋게 보지 않습니다. 자연스러운 모양을 살려 결을 채우는 정도가 가장 좋다고 봅니다.",
          en: "Physiognomy accepts brow grooming as a way of opening fortune: a new brow shape changes your impression, and a new impression changes your luck with people. But erasing the natural brow entirely and drawing a completely different one is called a 'rootless brow' and read unfavorably. Filling in the natural line is considered best.",
          zh: "相学认为眉形变则印象变，印象变则人缘变，故把修眉视为开运法之一。但把天生的眉全部去掉画成完全不同的形状，称为“无根之眉”，不视为好。顺着自然形状填补毛流最为理想。",
          ja: "人相学では眉の形が変われば印象が変わり、印象が変われば人の運が変わると見て、眉の手入れを開運法の一つと認めます。ただ生まれつきの眉をすべて消して全く違う形を描くと「根のない眉」と呼び良くは見ません。自然な形を生かして毛流れを埋める程度が最も良いと見ます。",
        },
      },
      {
        question: { ko: "눈썹 사이가 붙어 있으면(일자 미간) 어떤가요?", en: "What if the eyebrows join in the middle?", zh: "眉毛连在一起（连心眉）怎么看？", ja: "眉がつながっている（一文字の眉間）とどうですか？" },
        answer: {
          ko: "눈썹과 눈썹 사이인 미간을 관상에서는 명궁(命宮)이라 하여 운이 드나드는 문으로 봅니다. 이곳이 털로 막혀 있으면 '문이 닫힌 상'이라 하여 답답한 일이 많고 성격이 급해지기 쉽다고 풀이합니다. 그래서 미간의 잔털은 정리하는 것이 좋다고 보며, 미간은 손가락 두 개 정도 넓이로 트여 있을 때 가장 좋다고 합니다.",
          en: "The space between the brows is the 'palace of life', the gate through which fortune passes. When it is blocked by hair it is read as a 'closed gate', bringing frustrations and a quick temper. So tidying stray hairs there is advised, and the space is at its best when open about two fingers wide.",
          zh: "两眉之间的印堂在相学中称“命宫”，是运气进出之门。此处被毛堵住称为“闭门之相”，多郁闷之事、性子易急。因此建议清理印堂杂毛，印堂开阔约两指宽最佳。",
          ja: "眉と眉の間の眉間を人相では「命宮」と呼び、運が出入りする門と見ます。ここが毛でふさがれていると「門が閉じた相」とされ、もどかしいことが多く性格が急になりやすいと解釈します。そのため眉間の産毛は整えるのが良いとされ、眉間は指二本ほどの広さで開いているときが最も良いとされます。",
        },
      },
      {
        question: { ko: "눈썹이 끊어져 있으면 나쁜가요?", en: "Is a gap in the eyebrow a bad sign?", zh: "眉毛断开不好吗？", ja: "眉が途切れていると悪いのですか？" },
        answer: {
          ko: "전통 관상에서는 눈썹이 중간에 끊어져 있으면 형제나 가까운 친구와의 인연이 끊어지거나 31~34세 무렵에 변동이 있다고 풀이했습니다. 흉터로 끊어진 경우도 같은 뜻으로 봅니다. 다만 요즘은 눈썹 펜슬로 끊어진 부분을 채우면 보완된다고 보며, 결국 가까운 사람에게 먼저 연락하고 마음을 쓰는 것이 가장 확실한 개운법입니다.",
          en: "Traditional readers took a gap in the brow to mean a broken tie with a sibling or close friend, or changes around ages 31 to 34; a gap from a scar is read the same way. Today it is considered enough to fill the gap with a brow pencil, and in the end reaching out first to those close to you is the surest way to open fortune.",
          zh: "传统相学认为眉中断者与兄弟或挚友缘分中断，或31~34岁前后有变动；因疤痕断眉同样解读。如今认为用眉笔补上断处即可弥补，归根结底主动联系、用心对待亲近之人才是最可靠的开运法。",
          ja: "伝統的な人相では眉が途中で途切れていると兄弟や親しい友人との縁が切れたり、31〜34歳頃に変動があると解釈しました。傷跡で途切れている場合も同じ意味に見ます。ただ今は眉ペンシルで途切れた部分を埋めれば補われると見ており、結局は身近な人に先に連絡して心を使うことが最も確かな開運法です。",
        },
      },
    ],
    relatedTypes: ["leadership-charm", "charm-leadership", "leadership-health", "charm-health"],
  },

  // ───────────────────────── 귀 ─────────────────────────
  {
    id: "ears",
    hanja: "耳",
    emoji: "👂",
    name: { ko: "귀", en: "Ears", zh: "耳朵", ja: "耳" },
    title: {
      ko: "귀 관상 보는 법 | 귀 모양·귓불별 복과 건강운",
      en: "Ear Face Reading | Blessings and Health by Ear Shape and Earlobe",
      zh: "耳朵面相怎么看 | 耳型·耳垂与福气、健康运",
      ja: "耳の人相の見方 | 耳の形・耳たぶでわかる福と健康運",
    },
    description: {
      ko: "관상에서 귀는 타고난 복과 건강, 어린 시절 운을 보는 자리입니다. 큰 귀, 작은 귀, 두툼한 귓불, 얇은 귓불, 뒤로 붙은 귀, 앞으로 벌어진 귀 등 귀 모양별 해석과 부처님 귀의 뜻을 정리했습니다.",
      en: "In face reading the ears show inborn blessings, health and childhood fortune. Large and small ears, full and thin lobes, flat and protruding ears explained, including the meaning of 'Buddha's ears'.",
      zh: "面相中耳朵是看天生福气、健康与童年运的部位。整理了大耳、小耳、厚耳垂、薄耳垂、贴脑耳、招风耳等耳型解读以及佛耳的含义。",
      ja: "人相で耳は生まれつきの福と健康、幼い頃の運を見る場所です。大きい耳、小さい耳、厚い耳たぶ、薄い耳たぶ、寝た耳、立った耳など耳の形ごとの解釈と福耳の意味をまとめました。",
    },
    keywords: {
      ko: ["귀 관상", "귓불 관상", "부처님 귀 관상", "귀 큰 관상", "귀 모양 관상", "귀 복 관상"],
      en: ["ear face reading", "earlobe meaning", "korean face reading ears", "buddha ears meaning"],
      zh: ["耳朵面相", "耳垂面相", "佛耳"],
      ja: ["耳 人相", "耳たぶ 人相", "福耳"],
    },
    heading: {
      ko: "귀 관상: 귀 모양과 귓불로 보는 복과 건강",
      en: "Ear Face Reading: Blessings and Health in the Ears",
      zh: "耳朵面相：从耳型与耳垂看福气与健康",
      ja: "耳の人相：耳の形と耳たぶで見る福と健康",
    },
    intro: {
      ko: "관상에서 귀는 '채청관(採聽官)'이라 하여 세상의 소리를 거두어 듣는 자리로 봅니다. 또 귀는 어머니 뱃속에서 가장 먼저 완성되는 부위라 하여 타고난 복과 체질, 그리고 1세부터 14세까지의 어린 시절 운을 귀에서 읽었습니다. 왼쪽 귀는 1~7세, 오른쪽 귀는 8~14세를 뜻한다고 했습니다. 귀가 크고 두툼하며 색이 얼굴보다 희고 밝으면 명성이 멀리 퍼지는 귀한 상으로 쳤습니다.\n\n귀를 볼 때는 크기, 두께, 귓불의 모양, 귀의 위치와 각도를 봅니다. 귀의 윗부분(천륜)은 지혜와 초년운, 가운데(인륜)는 의지와 중년운, 아래 귓불(지륜)은 복과 말년운을 뜻합니다. 귓불이 도톰하고 늘어져 입 쪽을 향하면 흔히 '부처님 귀'라 하여 재물과 복이 많다고 하고, 귓불이 작고 얇으면 복을 스스로 만들어 가는 상으로 봅니다. 귀의 윗선이 눈썹보다 높으면 총명하고 일찍 이름을 얻는다고 했습니다.\n\n귀는 또한 건강과 장수를 보는 자리이기도 합니다. 한의학에서 귀는 신장(腎)의 기운과 통한다고 보았고, 관상에서도 귀가 단단하고 윤기 있으면 타고난 체력이 좋아 오래 산다고 풀이했습니다. 귀가 얇고 힘없이 처져 있으면 기운이 약한 것이니 무리하지 말라는 신호로 읽습니다.",
      en: "In physiognomy the ears are the 'gathering-and-listening officials', the organs that collect the sounds of the world. The ears are also said to be the first feature completed in the womb, so inborn blessings, constitution and childhood fortune from ages 1 to 14 are read here: the left ear for ages 1 to 7, the right for 8 to 14. Large, thick ears paler and brighter than the face were counted noble, a sign of a name that travels far.\n\nA reader looks at size, thickness, the shape of the lobe, and the position and angle of the ear. The upper rim stands for wisdom and early fortune, the middle for will and midlife, and the lobe for blessings and later years. A plump lobe that hangs toward the mouth is the famous 'Buddha's ear', rich in wealth and blessings, while a small, thin lobe marks someone who makes their own luck. An upper rim higher than the brow was said to mean a bright mind and early fame.\n\nThe ears are also where health and longevity are read. Traditional medicine linked the ears to the energy of the kidneys, and physiognomy held that firm, glossy ears mean strong inborn stamina and a long life. Thin ears that droop limply signal low energy and a warning not to overdo things.",
      zh: "相学称耳为“采听官”，是收听世间声音的部位。耳也被认为是胎中最先长成的部位，因此从耳看天生福气、体质以及一至十四岁的童年运：左耳主1~7岁，右耳主8~14岁。耳大而厚、色比脸白亮者为贵相，主名声远播。\n\n看耳要看大小、厚薄、耳垂形状、耳的位置与角度。耳上部（天轮）主智慧与早年运，中部（人轮）主意志与中年运，下部耳垂（地轮）主福气与晚年运。耳垂厚实下垂朝向嘴者俗称“佛耳”，主财多福厚；耳垂小而薄者靠自己造福。耳上缘高过眉者聪明、早成名。\n\n耳也是看健康与长寿的部位。中医认为耳通肾气，相学也说耳坚实有光泽者天生体力好、长寿。耳薄无力下垂者气弱，提示不要勉强。",
      ja: "人相で耳は「採聴官」と呼ばれ、世の音を集めて聞く場所と見ます。また耳は母の胎内で最も早く完成する部位とされ、生まれつきの福と体質、そして1歳から14歳までの幼い頃の運を耳から読みました。左耳は1〜7歳、右耳は8〜14歳を意味するとされました。耳が大きく厚く、色が顔より白く明るければ名声が遠くまで広がる貴い相とされました。\n\n耳を見るときは大きさ、厚さ、耳たぶの形、耳の位置と角度を見ます。耳の上部（天輪）は知恵と初年運、中部（人輪）は意志と中年運、下の耳たぶ（地輪）は福と晩年運を意味します。耳たぶが厚く垂れて口の方を向いていればいわゆる「福耳」で財と福が多いとされ、耳たぶが小さく薄ければ福を自分で作っていく相と見ます。耳の上の線が眉より高ければ聡明で早く名を得るとされました。\n\n耳はまた健康と長寿を見る場所でもあります。漢方では耳は腎の気と通じると見ており、人相でも耳が硬くつやがあれば生まれつきの体力が良く長生きすると解釈しました。耳が薄く力なく垂れていれば気が弱いので無理をするなという合図と読みます。",
    },
    shapes: [
      {
        name: { ko: "크고 두툼한 귀", en: "Large, thick ears", zh: "大而厚的耳朵", ja: "大きく厚い耳" },
        meaning: {
          ko: "타고난 복과 체력이 좋은 상입니다. 어린 시절 부모의 보살핌을 잘 받고, 남의 말을 끝까지 듣는 힘이 있어 지혜가 쌓입니다. 명성이 멀리 퍼지는 귀라 하여 큰 조직이나 공직에 어울립니다. 복이 많은 만큼 게을러지기 쉬우니 스스로 움직이는 습관이 복을 지킵니다.",
          en: "Good inborn blessings and stamina. Well cared for in childhood, with the patience to hear others out, so wisdom accumulates. Called the ear whose name travels far, it suits large organizations and public office. Abundant luck can breed laziness, so the habit of moving on your own keeps the blessings.",
          zh: "天生福气与体力好之相。童年受父母照顾好，能把别人的话听到底，智慧日积。此为名声远播之耳，适合大组织或公职。福多易懒，自己主动行动才能守福。",
          ja: "生まれつきの福と体力が良い相です。幼い頃に親の世話をよく受け、人の話を最後まで聞く力があって知恵が積もります。名声が遠くまで広がる耳とされ大きな組織や公職に向きます。福が多い分怠けやすいので、自分から動く習慣が福を守ります。",
        },
      },
      {
        name: { ko: "작고 얇은 귀", en: "Small, thin ears", zh: "小而薄的耳朵", ja: "小さく薄い耳" },
        meaning: {
          ko: "감각이 예민하고 눈치가 빠른 상입니다. 타고난 복보다 스스로 만들어 가는 복이 많아 젊어서 고생하더라도 노력한 만큼 돌아옵니다. 체력이 강한 편은 아니니 몸을 아끼고, 남의 말에 쉽게 흔들리지 않도록 자기 기준을 세우는 것이 중요합니다.",
          en: "Keen senses and quick perception. More luck made by yourself than inherited, so even if youth is hard, effort comes back in full. Stamina is not your strength, so spare your body, and set your own standards so others' words do not sway you.",
          zh: "感觉敏锐、机灵之相。天生福不多，靠自己造福，年轻时辛苦但付出必有回报。体力不算强，要爱惜身体；立好自己的标准，不被人言左右。",
          ja: "感覚が鋭く察しの早い相です。生まれつきの福より自分で作っていく福が多く、若くして苦労しても努力した分だけ返ってきます。体力が強い方ではないので体をいたわり、人の言葉に簡単に揺れないよう自分の基準を立てることが大切です。",
        },
      },
      {
        name: { ko: "두툼하게 늘어진 귓불(부처님 귀)", en: "Full, hanging earlobes (Buddha's ears)", zh: "厚实下垂的耳垂（佛耳）", ja: "厚く垂れた耳たぶ（福耳）" },
        meaning: {
          ko: "귓불이 크고 도톰하며 살짝 입 쪽을 향해 늘어진 귀를 흔히 부처님 귀라 하여 재물과 복이 많은 상으로 칩니다. 사람이 따르고 말년이 넉넉하며, 베푸는 마음이 있어 베푼 만큼 돌아옵니다. 복이 많다고 안심하면 흐르는 복을 놓칠 수 있으니 꾸준히 나누고 움직이세요.",
          en: "A large, plump lobe that hangs slightly toward the mouth is the Buddha's ear, rich in wealth and blessings. People follow you, later life is comfortable, and a giving heart brings back what it gives. Resting on your luck can let it flow past, so keep sharing and keep moving.",
          zh: "耳垂大而厚、略向嘴下垂者俗称佛耳，财多福厚之相。人缘好、晚年宽裕，有施予之心，施多少回多少。但以为福多而安逸会错失流动的福，要持续分享与行动。",
          ja: "耳たぶが大きく厚く、少し口の方へ垂れた耳をいわゆる福耳と呼び、財と福が多い相とします。人が慕い晩年が豊かで、与える心があり与えた分だけ返ってきます。福が多いと安心すると流れる福を逃すので、絶えず分かち合い動いてください。",
        },
      },
      {
        name: { ko: "귓불이 거의 없는 귀", en: "Ears with little or no lobe", zh: "几乎没有耳垂的耳朵", ja: "耳たぶがほとんどない耳" },
        meaning: {
          ko: "행동이 빠르고 변화를 즐기는 상입니다. 한곳에 머무르기보다 새로운 일을 찾아 움직이며, 유행과 기술에 밝습니다. 재물은 들어오는 대로 쓰는 편이라 저축이 중요합니다. 타고난 복이 적다고 하지만, 움직이는 만큼 기회를 만드는 상이라 바쁘게 사는 것이 곧 개운입니다.",
          en: "Quick to act and fond of change. Rather than staying put you seek new things, and you are sharp with trends and technology. Money tends to be spent as it comes, so saving matters. Said to carry little inborn luck, but you create chances by moving, so a busy life is itself the way to open fortune.",
          zh: "行动快、喜变化之相。不安于一处，寻找新事而动，对潮流与技术敏感。钱财随进随花，储蓄很重要。虽说天生福少，但动得越多机会越多，忙碌本身就是开运。",
          ja: "行動が速く変化を楽しむ相です。一か所にとどまるより新しいことを探して動き、流行と技術に明るいです。財は入った分だけ使う方なので貯蓄が重要です。生まれつきの福が少ないと言われますが、動いた分だけ機会を作る相なので、忙しく生きることがそのまま開運です。",
        },
      },
      {
        name: { ko: "머리에 붙은 귀(첩뇌이)", en: "Ears flat against the head", zh: "贴脑耳", ja: "頭に寝た耳" },
        meaning: {
          ko: "정면에서 귀가 잘 보이지 않을 만큼 뒤로 붙은 귀는 예로부터 귀한 상으로 쳤습니다. 신중하고 속이 깊으며 남의 비밀을 지켜 신뢰를 얻습니다. 조직에서 오래 자리를 지키고 재물도 새지 않습니다. 다만 자기 생각을 잘 드러내지 않아 답답하다는 말을 들을 수 있으니, 가까운 사람에게는 먼저 마음을 열어 보세요.",
          en: "Ears set so far back they barely show from the front have long been counted noble. Prudent and deep, you keep others' secrets and earn trust, hold your place in an organization and keep your wealth from leaking. Because you seldom show your thoughts, some may find you hard to read, so open up first to those close to you.",
          zh: "正面几乎看不见、向后贴着头的耳朵，自古视为贵相。谨慎、城府深、能守秘密而得信任。在组织中长久立足，钱财不漏。但不轻易表露想法，可能被说闷，对亲近之人不妨先敞开心。",
          ja: "正面から耳がよく見えないほど後ろに寝た耳は昔から貴い相とされました。慎重で懐が深く人の秘密を守って信頼を得ます。組織で長く居場所を守り財も漏れません。ただ自分の考えをあまり表に出さないのでもどかしいと言われることがあるので、身近な人には先に心を開いてみてください。",
        },
      },
      {
        name: { ko: "앞으로 벌어진 귀", en: "Protruding ears", zh: "招风耳", ja: "前に立った耳" },
        meaning: {
          ko: "귀가 앞으로 벌어져 정면에서 또렷이 보이는 상은 호기심이 많고 활동적입니다. 남의 이야기를 잘 듣고 정보에 밝아 사업과 영업에 강합니다. 어린 시절에 집을 떠나거나 환경이 바뀌는 경우가 많고, 자유를 중요하게 여겨 틀에 매이는 일을 싫어합니다. 귀가 밝은 만큼 소문에 휘둘리지 않도록 주의가 필요합니다.",
          en: "Ears that stand out and show clearly from the front mark curiosity and energy. A good listener and well informed, you are strong in business and sales. Childhood often involved leaving home or changing surroundings, and you value freedom and dislike confinement. Being so open to sound, take care not to be swayed by rumors.",
          zh: "耳朵向前张开、正面清晰可见者，好奇心强、活跃。善听人言、消息灵通，擅长经商销售。童年多离家或环境变动，重自由、厌束缚。耳聪的同时，要留意不被流言左右。",
          ja: "耳が前に立って正面からはっきり見える相は好奇心が多く活動的です。人の話をよく聞き情報に明るく事業と営業に強いです。幼い頃に家を離れたり環境が変わることが多く、自由を大切にして型にはまる仕事を嫌います。耳が良い分、噂に振り回されないよう注意が必要です。",
        },
      },
    ],
    tips: {
      ko: "귀는 정면과 옆에서 모두 봅니다. 정면에서는 귀가 얼마나 보이는지와 양쪽 귀의 높이가 같은지를, 옆에서는 귀의 윗선이 눈썹과 어느 높이에 있는지와 귓불의 두께를 봅니다. 양쪽 귀의 크기나 높이가 다르면 어린 시절에 변화가 많았다고 풀이합니다. 귀의 색은 얼굴보다 밝을수록 좋고, 귀가 어둡거나 거칠면 신장의 기운이 약해진 것으로 보아 휴식을 권합니다. 귀는 평생 조금씩 자라므로 나이 들어 귓불이 커지는 것은 복이 쌓이는 자연스러운 변화입니다.",
      en: "Read the ears from the front and the side. From the front, see how much of the ear shows and whether both sit at the same height; from the side, where the upper rim sits relative to the brow and how thick the lobe is. Ears of different size or height suggest many changes in childhood. The paler the ears compared with the face, the better; dark or rough ears are read as weakened kidney energy and a call to rest. Ears keep growing slowly all life long, so lobes that enlarge with age are a natural sign of accumulating blessings.",
      zh: "耳要正面侧面都看。正面看耳朵露出多少、两耳高度是否一致；侧面看耳上缘与眉的相对高度以及耳垂厚度。两耳大小高度不同者童年变动多。耳色比脸亮为佳，耳暗或粗糙视为肾气弱，宜休息。耳一生都在缓慢生长，年老耳垂变大是福气积累的自然变化。",
      ja: "耳は正面と横の両方から見ます。正面では耳がどれだけ見えるかと両耳の高さが同じかを、横では耳の上の線が眉とどの高さにあるかと耳たぶの厚さを見ます。両耳の大きさや高さが違えば幼い頃に変化が多かったと解釈します。耳の色は顔より明るいほど良く、耳が暗かったり荒れていれば腎の気が弱まったと見て休息を勧めます。耳は一生少しずつ成長するので、年を取って耳たぶが大きくなるのは福が積もる自然な変化です。",
    },
    faq: [
      {
        question: { ko: "귓불이 작으면 복이 없나요?", en: "Do small earlobes mean no luck?", zh: "耳垂小就没福吗？", ja: "耳たぶが小さいと福がないのですか？" },
        answer: {
          ko: "아닙니다. 관상에서 귓불은 '타고난 복', 즉 부모와 환경에서 받는 복을 뜻합니다. 귓불이 작다는 것은 받는 복보다 스스로 만드는 복이 많다는 뜻으로, 행동이 빠르고 기회를 잘 잡는 상으로 풀이합니다. 실제로 큰 사업가 중에도 귓불이 작은 사람이 많다고 하며, 귀는 평생 자라므로 베풀며 살면 귓불도 복도 함께 커진다고 합니다.",
          en: "No. The lobe stands for inborn luck, the blessings received from parents and surroundings. A small lobe means more luck made than received: a face that acts fast and seizes chances. Many great entrepreneurs are said to have small lobes, and since ears keep growing, a giving life is said to enlarge both the lobe and the luck.",
          zh: "不是。相学中耳垂主“天生之福”，即从父母与环境得到的福。耳垂小意味着自己造的福多于得到的福，是行动快、善抓机会之相。据说大企业家中耳垂小者也不少，且耳一生在长，乐于施予者耳垂与福气会一起变大。",
          ja: "いいえ。人相で耳たぶは「生まれつきの福」、つまり親と環境から受ける福を意味します。耳たぶが小さいのは受ける福より自分で作る福が多いという意味で、行動が速く機会をよくつかむ相と解釈します。実際に大きな事業家にも耳たぶの小さい人が多いとされ、耳は一生成長するので与えながら生きれば耳たぶも福も一緒に大きくなるとされます。",
        },
      },
      {
        question: { ko: "귀에 점이나 사마귀가 있으면 어떤 뜻인가요?", en: "What does a mole on the ear mean?", zh: "耳朵上有痣是什么意思？", ja: "耳にほくろがあるとどんな意味ですか？" },
        answer: {
          ko: "귀의 점은 대체로 좋게 봅니다. 귓불의 점은 재물과 복이 있다 하고, 귀 안쪽의 점은 총명하고 효심이 깊다고 풀이합니다. 귀 뒤의 점은 숨은 복으로, 남이 모르는 재주나 도움이 있다고 합니다. 다만 귀 테두리의 점은 어린 시절 물가를 조심하라는 옛말이 있어 아이에게 있으면 안전에 신경 쓰라는 뜻으로 읽습니다.",
          en: "Moles on the ear are generally read well. One on the lobe means wealth and blessings; one inside the ear means a bright mind and deep filial devotion; one behind the ear is hidden luck, a talent or helper others do not know about. A mole on the rim comes with an old warning to be careful near water in childhood, so for a child it is read as a reminder about safety.",
          zh: "耳上的痣多视为吉。耳垂痣主财多福厚，耳内痣主聪明孝顺，耳后痣为暗福，有不为人知的才能或助力。耳廓痣古有“童年慎水”之说，孩子有此痣提醒注意安全。",
          ja: "耳のほくろはおおむね良く見ます。耳たぶのほくろは財と福があるとされ、耳の内側のほくろは聡明で孝心が深いと解釈します。耳の後ろのほくろは隠れた福で、人の知らない才能や助けがあるとされます。ただ耳の縁のほくろは幼い頃に水辺に気をつけよという昔の言葉があり、子どもにあれば安全に気を配れという意味に読みます。",
        },
      },
      {
        question: { ko: "귀가 얼굴보다 희면 좋은 상인가요?", en: "Is it good if the ears are paler than the face?", zh: "耳朵比脸白是好相吗？", ja: "耳が顔より白いと良い相ですか？" },
        answer: {
          ko: "네, 옛 관상서는 '귀가 얼굴보다 희면 이름이 천하에 알려진다(耳白於面 名聞天下)'고 했습니다. 귀가 밝고 희다는 것은 신장의 기운이 충실하고 타고난 체력이 좋다는 뜻이며, 명예와 평판이 좋아진다고 풀이합니다. 반대로 귀가 얼굴보다 검거나 붉으면 몸이 지쳤거나 구설을 조심하라는 신호로 봅니다.",
          en: "Yes. The old texts say 'ears paler than the face, a name known across the land'. Bright, pale ears mean full kidney energy and strong inborn stamina, and are read as rising honor and reputation. Ears darker or redder than the face signal exhaustion or a warning about gossip.",
          zh: "是的，古相书说“耳白于面，名闻天下”。耳亮而白意味着肾气充足、天生体力好，主名誉声望上升。反之耳比脸黑或红，是身体疲惫或需防口舌之兆。",
          ja: "はい、昔の相書は「耳が顔より白ければ名が天下に知られる（耳白於面 名聞天下）」と言いました。耳が明るく白いのは腎の気が充実し生まれつきの体力が良いという意味で、名誉と評判が良くなると解釈します。逆に耳が顔より黒かったり赤かったりすれば体が疲れているか口の災いに注意という合図と見ます。",
        },
      },
    ],
    relatedTypes: ["health-fortune", "fortune-health", "wisdom-health", "health-wisdom"],
  },

  // ───────────────────────── 턱 ─────────────────────────
  {
    id: "chin",
    hanja: "頤",
    emoji: "🗿",
    featureId: "chin",
    name: { ko: "턱", en: "Chin", zh: "下巴", ja: "顎" },
    title: {
      ko: "턱 관상 보는 법 | 턱 모양별 말년운·의지·자녀운",
      en: "Chin Face Reading | Later-Life Fortune, Will and Children by Chin Shape",
      zh: "下巴面相怎么看 | 不同下巴形状的晚年运·意志·子女运",
      ja: "顎の人相の見方 | 顎の形でわかる晩年運・意志・子ども運",
    },
    description: {
      ko: "관상에서 턱은 땅에 해당하며 말년운과 자녀운, 의지력을 보는 자리입니다. 둥근 턱, 뾰족한 턱, 각진 턱, 이중턱, 갈라진 턱, 주걱턱 등 턱 모양별 해석과 턱 보는 법을 정리했습니다.",
      en: "In face reading the chin corresponds to earth and shows later-life fortune, children and willpower. Round, pointed, square, double, cleft and protruding chins explained.",
      zh: "面相中下巴对应“地”，看晚年运、子女运与意志力。整理了圆下巴、尖下巴、方下巴、双下巴、裂下巴、地包天等下巴形状的解读与看法。",
      ja: "人相で顎は地にあたり、晩年運と子ども運、意志力を見る場所です。丸い顎、尖った顎、角張った顎、二重顎、割れた顎、しゃくれ顎など顎の形ごとの解釈と見方をまとめました。",
    },
    keywords: {
      ko: ["턱 관상", "턱 모양 관상", "주걱턱 관상", "턱 뾰족한 관상", "각진 턱 관상", "말년운 관상", "이중턱 관상"],
      en: ["chin face reading", "chin shape personality", "korean face reading chin"],
      zh: ["下巴面相", "下巴形状 性格", "地包天 面相"],
      ja: ["顎 人相", "顎の形 性格", "しゃくれ 人相"],
    },
    heading: {
      ko: "턱 관상: 턱 모양으로 보는 말년운과 의지",
      en: "Chin Face Reading: Later Fortune and Will in the Jaw",
      zh: "下巴面相：从下巴形状看晚年运与意志",
      ja: "顎の人相：顎の形で見る晩年運と意志",
    },
    intro: {
      ko: "관상학의 삼정(三停) 가운데 턱은 하정(下停)으로 땅(地)에 해당합니다. 이마가 하늘에서 받은 복이라면 턱은 내가 일군 땅, 곧 말년에 거두는 결실입니다. 마의상서는 턱을 지각(地閣)이라 하여 61세 이후의 말년운, 자녀와 아랫사람의 복, 집과 땅의 운을 보는 자리로 삼았습니다. 턱이 둥글고 두툼하며 살집이 있으면 노후가 편안하고 아랫사람이 따르며, 턱이 뾰족하고 살이 없으면 말년에 외롭거나 거처를 자주 옮긴다고 풀이했습니다.\n\n턱은 또한 의지력과 지구력을 보는 자리입니다. 턱이 단단하고 넓으면 한번 마음먹은 일을 끝까지 밀고 나가는 힘이 있고, 턱이 작고 약하면 재주는 있어도 끈기가 부족하다고 봅니다. 옆에서 보았을 때 턱이 앞으로 적당히 나와 있으면 자기 자리를 지키는 힘이 있고, 뒤로 많이 들어가 있으면 남에게 끌려가기 쉽다고 했습니다.\n\n턱을 볼 때 흔히 놓치는 것이 턱선과 볼의 살집입니다. 턱끝만 보지 말고 양쪽 턱선이 귀 아래까지 얼마나 든든하게 이어지는지를 봐야 합니다. 턱선이 넓고 볼에 살이 있으면 사람을 거느리는 상이고, 턱선이 좁고 볼이 꺼져 있으면 혼자 애쓰는 상입니다. 나이가 들며 턱에 살이 붙는 것은 관상학에서는 말년의 복이 쌓이는 좋은 변화로 봅니다.",
      en: "Of the three zones of the face, the chin is the lower zone and corresponds to earth. If the forehead is the blessing received from heaven, the chin is the land you have tilled yourself: the harvest gathered in later life. The Mayi Xiangfa calls it the 'earth pavilion', the seat of fortune after 61, of luck with children and juniors, and of house and land. A round, thick, fleshy chin means a comfortable old age with juniors who follow you; a pointed chin without flesh suggests loneliness late in life or frequent moves.\n\nThe chin is also where willpower and endurance are read. A firm, broad chin carries a decision through to the end, while a small, weak chin has talent but lacks persistence. Seen from the side, a chin that comes forward moderately holds its ground, while one set far back is easily led by others.\n\nWhat readers often miss is the jawline and the flesh of the cheeks. Look beyond the tip to how solidly the jawline runs back to below the ears. A broad jawline with full cheeks is the face of someone who leads people; a narrow jawline with hollow cheeks is the face of someone who struggles alone. Flesh gathering on the chin with age is read in physiognomy as a good change, the blessings of later life accumulating.",
      zh: "三停之中下巴属下停，对应“地”。额头是天赐之福，下巴则是自己耕耘的土地，即晚年收获的果实。《麻衣相法》称下巴为地阁，看六十一岁以后的晚年运、子女与下属之福、房产田地之运。下巴圆厚有肉者晚年安稳、下属追随；下巴尖瘦无肉者晚年孤独或常迁居。\n\n下巴也是看意志力与耐力的部位。下巴结实宽厚者认定的事坚持到底；下巴小而弱者有才但缺毅力。侧面看下巴适度前突者守得住自己的位置，后缩过多者易被人牵着走。\n\n看下巴常忽略的是下颌线与脸颊的肉。不要只看下巴尖，要看两侧下颌线延伸到耳下是否厚实。下颌线宽、脸颊有肉者统领他人；下颌线窄、脸颊凹陷者独自操劳。年纪大了下巴长肉，相学视为晚年福气积累的好变化。",
      ja: "人相学の三停のうち顎は下停で地にあたります。額が天から受けた福なら、顎は自分が耕した土地、つまり晩年に収穫する実りです。麻衣相法は顎を地閣と呼び、61歳以降の晩年運、子どもと目下の福、家と土地の運を見る場所としました。顎が丸く厚く肉づきがあれば老後が安らかで目下が慕い、顎が尖って肉がなければ晩年に寂しかったり住まいを頻繁に移したりすると解釈しました。\n\n顎はまた意志力と持久力を見る場所です。顎がしっかりして広ければ一度決めたことを最後まで押し通す力があり、顎が小さく弱ければ才はあっても粘りが足りないと見ます。横から見て顎がほどよく前に出ていれば自分の場所を守る力があり、後ろに大きく引っ込んでいれば人に引きずられやすいとされました。\n\n顎を見るときによく見落とすのが顎のラインと頬の肉づきです。顎先だけでなく両側の顎のラインが耳の下までどれだけしっかりつながっているかを見る必要があります。顎のラインが広く頬に肉があれば人を率いる相で、顎のラインが狭く頬がこけていれば一人で苦労する相です。年を重ねて顎に肉がつくのは人相学では晩年の福が積もる良い変化と見ます。",
    },
    shapes: [
      {
        name: { ko: "둥글고 두툼한 턱", en: "Round, full chin", zh: "圆而厚的下巴", ja: "丸く厚い顎" },
        meaning: {
          ko: "말년운이 좋은 대표적인 상입니다. 자녀와 아랫사람의 효도를 받고, 노후에 집과 재물이 남습니다. 성품이 너그럽고 포용력이 있어 사람들이 편안해합니다. 느긋한 만큼 결정을 미루기 쉬우니, 중요한 일은 기한을 정해 두는 습관이 복을 더 키웁니다.",
          en: "The classic face of good later fortune. Children and juniors are devoted, and house and wealth remain in old age. Generous and accepting, you put people at ease. Easygoing enough to postpone decisions, so set deadlines for important matters and the blessings grow.",
          zh: "晚年运好的典型之相。享儿孙与下属孝顺，老来有房有财。性情宽厚、有包容力，让人安心。悠闲易拖延决定，重要事定好期限，福气更增。",
          ja: "晩年運が良い代表的な相です。子どもと目下から孝行を受け、老後に家と財が残ります。性品が寛大で包容力があり人が安心します。のんびりしている分決定を先延ばしにしやすいので、大事なことは期限を決めておく習慣が福をさらに育てます。",
        },
      },
      {
        name: { ko: "뾰족한 턱", en: "Pointed chin", zh: "尖下巴", ja: "尖った顎" },
        meaning: {
          ko: "감수성이 풍부하고 머리 회전이 빠른 상입니다. 예술·창작·기획처럼 아이디어를 쓰는 일에 재능이 있습니다. 다만 끈기가 부족하고 말년에 외로울 수 있다고 하니, 젊어서부터 오래 갈 사람과 꾸준한 수입원을 만들어 두는 것이 좋습니다. 턱에 살이 붙으면 말년운이 좋아진다고 봅니다.",
          en: "Rich sensitivity and a quick mind, with talent for work that uses ideas: art, creation, planning. Persistence can run short and later life can be lonely, so from youth build lasting relationships and a steady income. Flesh gathering on the chin is read as improving later fortune.",
          zh: "感性丰富、头脑灵活之相。在艺术、创作、策划等用点子的工作上有才。但毅力不足、晚年易孤独，宜年轻时就培养长久的人和稳定的收入来源。下巴长肉则晚年运转好。",
          ja: "感受性が豊かで頭の回転が速い相です。芸術・創作・企画などアイデアを使う仕事に才能があります。ただ粘りが足りず晩年に寂しくなることがあるとされるので、若いうちから長く続く人と安定した収入源を作っておくのが良いでしょう。顎に肉がつけば晩年運が良くなると見ます。",
        },
      },
      {
        name: { ko: "각진 턱", en: "Square jaw", zh: "方下巴", ja: "角張った顎" },
        meaning: {
          ko: "체력과 의지가 강한 상입니다. 한번 시작한 일은 끝까지 버티며, 어려운 상황에서 오히려 힘을 냅니다. 운동·군인·경영처럼 지구력이 필요한 일에 어울립니다. 고집이 세어 부딪히기 쉬우니 한발 물러서는 법을 익히면 사람 운까지 좋아집니다.",
          en: "Strong stamina and will. You endure to the end of whatever you start and draw strength from hard situations. Suited to sport, the military or management, where endurance counts. Stubbornness causes clashes, so learning to step back one pace improves even your luck with people.",
          zh: "体力与意志强之相。开始的事坚持到底，越困难越有力量。适合运动、军人、经营等需要耐力的工作。固执易起冲突，学会退一步，连人缘都会变好。",
          ja: "体力と意志の強い相です。一度始めた仕事は最後まで耐え、困難な状況でむしろ力を出します。スポーツ・軍人・経営など持久力が必要な仕事に向きます。頑固でぶつかりやすいので一歩引くことを覚えれば人の運まで良くなります。",
        },
      },
      {
        name: { ko: "살집 있는 턱(이중턱)", en: "Fleshy chin (double chin)", zh: "有肉的下巴（双下巴）", ja: "肉づきのよい顎（二重顎）" },
        meaning: {
          ko: "말년에 재물이 쌓이는 복상으로 봅니다. 먹을 복이 있고 노후가 편안하며, 사람을 넉넉하게 대해 아랫사람이 따릅니다. 관상학에서는 턱의 살을 '말년의 곳간'이라 했습니다. 다만 건강 관리는 별개이니, 복은 지키되 몸은 가볍게 유지하는 것이 좋습니다.",
          en: "Read as a blessed face where wealth builds in later years: luck with food, a comfortable old age, and juniors who follow your generosity. Physiognomy called the flesh of the chin 'the storehouse of later life'. Health is a separate matter, so keep the blessings but keep the body light.",
          zh: "视为晚年聚财的福相。有食禄、晚年安逸，待人宽厚故下属追随。相学称下巴的肉为“晚年之仓”。但健康另当别论，守福的同时身体宜保持轻盈。",
          ja: "晩年に財が積もる福相と見ます。食の福があり老後が安らかで、人に寛大に接するので目下が慕います。人相学では顎の肉を「晩年の蔵」と呼びました。ただ健康管理は別なので、福は守りつつ体は軽く保つのが良いでしょう。",
        },
      },
      {
        name: { ko: "가운데가 갈라진 턱", en: "Cleft chin", zh: "中间有凹的下巴", ja: "真ん中が割れた顎" },
        meaning: {
          ko: "열정과 끈기가 남다른 상입니다. 한 우물을 파면 크게 이루며, 사랑에도 열정적입니다. 매력이 있어 이성에게 인기가 많지만, 감정 기복이 커서 인간관계가 극과 극으로 갈릴 수 있습니다. 좋아하는 일을 직업으로 삼을 때 운이 가장 크게 열립니다.",
          en: "Rare passion and persistence. Dig one well and you achieve greatly, and you love with the same intensity. Charm brings popularity, but large mood swings can split relationships into extremes. Fortune opens widest when you make what you love your profession.",
          zh: "热情与毅力非凡之相。专注一事必有大成，爱情也热烈。有魅力、受异性欢迎，但情绪起伏大，人际易走极端。把喜欢的事当职业时运势最开。",
          ja: "情熱と粘り強さが際立つ相です。一つのことを究めれば大きく成し、恋愛にも情熱的です。魅力があって異性に人気がありますが、感情の起伏が大きく人間関係が両極端に分かれることがあります。好きなことを職業にしたときに運が最も大きく開けます。",
        },
      },
      {
        name: { ko: "앞으로 나온 턱(주걱턱)", en: "Protruding chin", zh: "前突的下巴（地包天）", ja: "前に出た顎（しゃくれ）" },
        meaning: {
          ko: "턱이 앞으로 나온 상은 자기주장이 강하고 추진력이 있습니다. 남의 지시보다 스스로 이끄는 자리에서 능력을 발휘하며, 말년에 재물과 사람을 모읍니다. 옛 관상서는 '턱이 나오면 말년이 든든하다'고 했습니다. 다만 고집으로 손해 보는 일이 있으니, 결정 전에 세 사람의 의견을 듣는 습관이 좋습니다.",
          en: "A chin that juts forward marks strong self-assertion and drive. You shine in positions where you lead rather than follow instructions, and you gather wealth and people in later life. The old texts said 'a forward chin, a solid old age'. Stubbornness can cost you, so make it a habit to hear three opinions before deciding.",
          zh: "下巴前突者自我主张强、有推动力。在自己带队而非听指挥的位置上发挥能力，晚年聚财聚人。古相书说“下巴突出，晚年稳固”。但固执易吃亏，决定前养成听三个人意见的习惯为好。",
          ja: "顎が前に出た相は自己主張が強く推進力があります。人の指示より自分で率いる場で能力を発揮し、晩年に財と人を集めます。昔の相書は「顎が出れば晩年が堅い」と言いました。ただ頑固で損をすることがあるので、決める前に三人の意見を聞く習慣が良いでしょう。",
        },
      },
    ],
    tips: {
      ko: "턱은 정면에서 턱끝의 모양과 턱선의 너비를 보고, 옆에서 턱이 앞으로 나왔는지 들어갔는지를 봅니다. 입을 다문 자연스러운 상태에서 보아야 하며, 이를 악물면 턱이 실제보다 각져 보입니다. 턱은 나이가 들수록 살이 붙어 모양이 바뀌는 부위라 젊을 때의 턱으로 말년을 단정하지 않습니다. 관상학에서 턱의 살은 '베풀어 얻은 덕'이 쌓인 것이라 하니, 아랫사람에게 너그럽게 대하는 것이 곧 턱 관상을 좋게 하는 길입니다.",
      en: "From the front, read the shape of the tip and the width of the jawline; from the side, whether the chin juts out or recedes. Look with the mouth closed naturally, since clenching makes the jaw look squarer than it is. The chin gains flesh and changes shape with age, so later life is never judged from a young chin. Physiognomy says the flesh of the chin is accumulated 'virtue earned by giving', so generosity toward juniors is the way to improve a chin reading.",
      zh: "正面看下巴尖的形状与下颌线宽度，侧面看下巴前突或后缩。要在自然闭口状态下看，咬紧牙关会让下巴显得比实际更方。下巴随年龄长肉变形，不以年轻时的下巴断晚年。相学说下巴的肉是“施予所得之德”的积累，善待下属就是改善下巴面相之道。",
      ja: "顎は正面から顎先の形と顎のラインの幅を見て、横から顎が前に出ているか引っ込んでいるかを見ます。口を閉じた自然な状態で見る必要があり、歯を食いしばると顎が実際より角張って見えます。顎は年を重ねるほど肉がついて形が変わる部位なので、若い頃の顎で晩年を断定しません。人相学では顎の肉は「与えて得た徳」が積もったものとされるので、目下に寛大に接することがそのまま顎の人相を良くする道です。",
    },
    faq: [
      {
        question: { ko: "턱이 뾰족하면 말년이 외롭다는 말이 사실인가요?", en: "Is a pointed chin really a sign of a lonely old age?", zh: "尖下巴晚年孤独是真的吗？", ja: "顎が尖っていると晩年が寂しいというのは本当ですか？" },
        answer: {
          ko: "전통 관상에서 턱은 말년운과 아랫사람의 복을 보는 자리라, 턱이 뾰족하고 살이 없으면 말년에 기댈 곳이 적다고 풀이한 것은 사실입니다. 하지만 이는 '턱 하나'만의 해석이고, 입과 귀, 눈썹이 좋으면 충분히 보완됩니다. 또 턱은 나이 들수록 살이 붙으므로 젊을 때 뾰족하다고 말년을 단정할 수 없습니다. 사람에게 베풀고 꾸준한 수입을 만들어 두면 턱 모양과 상관없이 말년이 편안합니다.",
          en: "It is true that traditional readers took a pointed, fleshless chin to mean few places to lean on in old age, since the chin shows later fortune and luck with juniors. But that is the reading of one feature alone, and a good mouth, ears and brows more than make up for it. The chin also gains flesh with age, so a pointed chin in youth settles nothing. Give to people and build a steady income, and later life is comfortable whatever the chin.",
          zh: "传统相学中下巴看晚年运与下属之福，尖瘦无肉解读为晚年少依靠，确有此说。但这只是单一部位的解读，嘴、耳、眉好便足以弥补。且下巴随年龄长肉，年轻时尖不能断定晚年。待人慷慨、建立稳定收入，无论下巴如何晚年都安稳。",
          ja: "伝統的な人相で顎は晩年運と目下の福を見る場所なので、顎が尖って肉がなければ晩年に頼る所が少ないと解釈したのは事実です。しかしこれは「顎ひとつ」だけの解釈で、口と耳、眉が良ければ十分に補われます。また顎は年を取るほど肉がつくので若い頃に尖っているからといって晩年を断定できません。人に与え安定した収入を作っておけば顎の形に関係なく晩年は安らかです。",
        },
      },
      {
        question: { ko: "이중턱은 관상에서 좋은 건가요, 나쁜 건가요?", en: "Is a double chin good or bad in face reading?", zh: "双下巴在面相中是好是坏？", ja: "二重顎は人相では良いのですか、悪いのですか？" },
        answer: {
          ko: "관상에서는 좋게 봅니다. 턱의 살은 말년의 곳간이라 하여 노후에 재물과 먹을 것이 넉넉하고 아랫사람이 따르는 복상으로 풀이합니다. 특히 50대 이후에 턱에 살이 붙는 것은 복이 쌓이는 자연스러운 변화로 봅니다. 다만 관상은 건강 진단이 아니므로, 복은 복대로 받되 몸 관리는 따로 하는 것이 현명합니다.",
          en: "Favorably. The flesh of the chin is called the storehouse of later life, read as plenty of wealth and food in old age and juniors who follow. Flesh gathering on the chin after fifty is seen as blessings accumulating naturally. Physiognomy is not a medical check, though, so accept the blessing and look after your health separately.",
          zh: "相学视为好。下巴的肉称为晚年之仓，主老来财食充足、下属追随。尤其五十岁以后下巴长肉，是福气积累的自然变化。但面相不是体检，福归福，身体另需管理才明智。",
          ja: "人相では良く見ます。顎の肉は晩年の蔵とされ、老後に財と食べ物が豊かで目下が慕う福相と解釈します。特に50代以降に顎に肉がつくのは福が積もる自然な変化と見ます。ただ人相は健康診断ではないので、福は福として受けつつ体の管理は別にするのが賢明です。",
        },
      },
      {
        question: { ko: "턱이 짧거나 뒤로 들어가면 어떤 뜻인가요?", en: "What does a short or receding chin mean?", zh: "下巴短或后缩是什么意思？", ja: "顎が短い、または引っ込んでいるとどんな意味ですか？" },
        answer: {
          ko: "턱이 짧고 뒤로 들어간 상은 마음이 여리고 남의 의견을 잘 따르는 상으로 봅니다. 사람과 부딪히지 않아 적이 없지만, 자기 자리를 지키는 힘이 약해 결정을 남에게 맡기기 쉽습니다. 말년에 거처를 옮기거나 아랫사람 문제로 신경 쓸 일이 있다고도 합니다. 작은 일부터 스스로 결정하는 연습이 턱의 기운을 세운다고 하며, 턱을 살짝 들고 걷는 자세도 도움이 됩니다.",
          en: "A short, receding chin is read as a tender heart that follows others' opinions. You avoid clashes and have no enemies, but the strength to hold your ground is weak and decisions are easily left to others. It may also mean moves late in life or worries over juniors. Practising small decisions of your own is said to raise the energy of the chin, and walking with the chin slightly lifted helps too.",
          zh: "下巴短而后缩者，心软、顺从他人意见之相。不与人冲突故无敌人，但守住自己位置的力量弱，决定易交给别人。晚年也可能迁居或为下属操心。从小事开始自己做决定可立下巴之气，走路时略抬下巴也有帮助。",
          ja: "顎が短く後ろに引っ込んだ相は心が優しく人の意見によく従う相と見ます。人とぶつからないので敵はいませんが、自分の場所を守る力が弱く決定を人に任せやすいです。晩年に住まいを移したり目下のことで気を使うことがあるともされます。小さなことから自分で決める練習が顎の気を立てるとされ、顎を少し上げて歩く姿勢も役立ちます。",
        },
      },
    ],
    relatedTypes: ["health-wealth", "wealth-health", "fortune-wealth", "health-fortune"],
  },

  // ───────────────────────── 점 ─────────────────────────
  {
    id: "moles",
    hanja: "痣",
    emoji: "⚫",
    name: { ko: "점", en: "Moles", zh: "痣", ja: "ほくろ" },
    title: {
      ko: "얼굴 점 관상 | 위치별 점의 의미와 복점·흉점 구별법",
      en: "Face Mole Reading | Meaning of Moles by Position, Lucky and Unlucky Moles",
      zh: "脸上的痣相 | 不同位置痣的含义与吉痣·凶痣区分",
      ja: "顔のほくろ占い | 位置ごとのほくろの意味と福ぼくろ・凶ぼくろの見分け方",
    },
    description: {
      ko: "얼굴 점의 위치별 관상 풀이. 이마, 눈썹, 눈가, 코, 입가, 볼, 턱의 점이 뜻하는 재물운·연애운·건강운과, 색과 윤기로 복점과 흉점을 가리는 법을 정리했습니다.",
      en: "Face mole readings by position: forehead, brow, eye, nose, mouth, cheek and chin moles and what they mean for wealth, love and health, plus how color and sheen separate lucky moles from unlucky ones.",
      zh: "按位置解读脸上的痣：额头、眉毛、眼角、鼻子、嘴边、脸颊、下巴的痣所代表的财运、恋爱运、健康运，以及用颜色与光泽区分吉痣凶痣的方法。",
      ja: "顔のほくろの位置ごとの人相解釈。額、眉、目元、鼻、口元、頬、顎のほくろが意味する財運・恋愛運・健康運と、色とつやで福ぼくろと凶ぼくろを見分ける方法をまとめました。",
    },
    keywords: {
      ko: ["점 관상", "얼굴 점 위치 의미", "복점", "눈가 점 관상", "입가 점 관상", "코 점 관상", "점 빼면 운", "이마 점 관상"],
      en: ["face mole meaning", "mole position meaning", "lucky mole face", "korean face reading moles"],
      zh: ["痣相", "脸上痣的位置含义", "吉痣"],
      ja: ["ほくろ占い", "顔のほくろ 位置 意味", "福ぼくろ"],
    },
    heading: {
      ko: "얼굴 점 관상: 위치별 점의 의미",
      en: "Face Mole Reading: What Each Position Means",
      zh: "脸上的痣相：不同位置痣的含义",
      ja: "顔のほくろ占い：位置ごとのほくろの意味",
    },
    intro: {
      ko: "관상학에서 점은 '얼굴 위의 표시'로, 그 자리가 맡은 운에 더해지는 작은 신호로 봅니다. 옛 관상서는 '숨은 점은 복이요, 드러난 점은 근심'이라 하여 머리카락이나 눈썹 속, 귀 뒤처럼 가려진 자리의 점은 숨은 복으로, 얼굴 한가운데 드러난 점은 그 부위의 운에 변수가 있다는 뜻으로 풀이했습니다. 점 하나로 운명이 바뀐다기보다, 그 부위를 한 번 더 살펴보라는 표지판으로 이해하면 됩니다.\n\n점을 볼 때 가장 중요한 것은 위치보다 색과 윤기입니다. 색이 짙고 윤기가 있으며 도톰하게 살아 있는 점을 '살아 있는 점(活痣)'이라 하여 복점으로 보고, 색이 흐리고 거칠며 테두리가 번진 점을 '죽은 점(死痣)'이라 하여 그 부위의 운을 흐리는 흉점으로 봅니다. 같은 자리의 점이라도 색에 따라 뜻이 반대가 되기 때문에, 위치만 보고 좋고 나쁨을 단정하는 것은 관상학에서도 잘못된 방법으로 여깁니다.\n\n점은 얼굴 부위 가운데 유일하게 '없앨 수 있는' 표시이기도 합니다. 관상학에서는 흉점을 빼는 것을 개운의 하나로 인정하되, 복점은 함부로 빼지 않는 것이 좋다고 했습니다. 아래에서는 얼굴을 이마·눈썹·눈가·코·입가·볼·턱의 일곱 자리로 나누어 점의 의미를 살펴봅니다.",
      en: "In physiognomy a mole is a 'mark on the face', a small signal added to the fortune that its position governs. The old texts said 'a hidden mole is a blessing, a visible one a worry': moles in the hair, inside the brow or behind the ear are hidden blessings, while moles in plain view in the middle of the face mean a variable in that feature's fortune. Rather than a mole changing destiny, think of it as a signpost telling you to look at that feature once more.\n\nMore important than position is color and sheen. A dark, glossy, slightly raised 'living mole' is a lucky mole, while a faint, rough mole with blurred edges is a 'dead mole' that clouds the fortune of its position. The same spot can mean the opposite depending on color, so judging by position alone is considered a mistake even within physiognomy.\n\nA mole is also the only mark on the face that can be removed. Physiognomy accepts removing an unlucky mole as one way of opening fortune, but advises against removing lucky ones. Below the face is divided into seven places, forehead, brows, eyes, nose, mouth, cheeks and chin, and the meaning of a mole in each is explained.",
      zh: "相学把痣视为“脸上的记号”，是加在该部位所主运势上的小信号。古相书说“隐痣为福，显痣为忧”：藏在头发、眉毛里或耳后的痣是暗福，露在脸正中的痣意味着该部位运势有变数。与其说一颗痣改变命运，不如把它理解为提醒再多看一眼该部位的路标。\n\n看痣最重要的不是位置而是颜色与光泽。色深有光、微凸的“活痣”视为吉痣；色淡粗糙、边缘模糊的“死痣”视为扰乱该部位运势的凶痣。同一位置的痣因颜色不同含义相反，所以只看位置断吉凶，在相学中也是错误的方法。\n\n痣也是脸上唯一“可以去掉”的记号。相学承认点掉凶痣是开运之一，但吉痣不宜轻易去除。下面把脸分为额、眉、眼角、鼻、嘴边、脸颊、下巴七处，分别看痣的含义。",
      ja: "人相学でほくろは「顔の上のしるし」で、その場所が受け持つ運に加わる小さな合図と見ます。昔の相書は「隠れたほくろは福、現れたほくろは憂い」と言い、髪や眉の中、耳の後ろのように隠れた場所のほくろは隠れた福、顔の真ん中に現れたほくろはその部位の運に変数があるという意味に解釈しました。ほくろ一つで運命が変わるというより、その部位をもう一度よく見よという道しるべと理解すればよいでしょう。\n\nほくろを見るとき最も大切なのは位置より色とつやです。色が濃くつやがあり少し盛り上がった「生きぼくろ」は福ぼくろと見て、色が薄く荒れて縁がにじんだ「死にぼくろ」はその部位の運を曇らせる凶ぼくろと見ます。同じ場所のほくろでも色によって意味が逆になるため、位置だけ見て良し悪しを断定するのは人相学でも誤った方法とされます。\n\nほくろは顔の部位の中で唯一「消せる」しるしでもあります。人相学では凶ぼくろを取ることを開運の一つと認めつつ、福ぼくろはむやみに取らない方が良いとしました。以下では顔を額・眉・目元・鼻・口元・頬・顎の七か所に分けてほくろの意味を見ていきます。",
    },
    shapes: [
      {
        name: { ko: "이마의 점", en: "Mole on the forehead", zh: "额头的痣", ja: "額のほくろ" },
        meaning: {
          ko: "이마 한가운데의 점은 생각이 많고 부모와 떨어져 자립하는 상으로 봅니다. 이마 양옆 관자놀이 근처의 점은 여행과 이동이 많다는 뜻이고, 머리카락 경계에 가려진 점은 윗사람의 숨은 도움을 받는 복점입니다. 이마 점이 짙고 윤기 있으면 관운이 늦게 열리는 대기만성의 표시로도 풀이합니다.",
          en: "A mole in the center of the forehead marks many thoughts and independence away from parents. Near the temples it means much travel and movement; hidden at the hairline it is a lucky mole of quiet help from seniors. A dark, glossy forehead mole is also read as late-blooming career luck.",
          zh: "额正中的痣主思虑多、离开父母自立。两侧太阳穴附近的痣主旅行迁移多，藏在发际的痣是得长辈暗中相助的吉痣。额痣色深有光者，也解读为官运晚开、大器晚成。",
          ja: "額の真ん中のほくろは考えが多く親と離れて自立する相と見ます。額の両脇こめかみ近くのほくろは旅行と移動が多いという意味で、髪の生え際に隠れたほくろは目上の隠れた助けを受ける福ぼくろです。額のほくろが濃くつやがあれば官運が遅く開く大器晩成のしるしとも解釈します。",
        },
      },
      {
        name: { ko: "눈썹 속·눈썹 주변의 점", en: "Mole in or around the eyebrow", zh: "眉中·眉周的痣", ja: "眉の中・眉のまわりのほくろ" },
        meaning: {
          ko: "눈썹 털 속에 숨은 점은 대표적인 복점으로, 총명하고 형제·친구의 도움이 많다고 합니다. 눈썹 위의 점은 재물이 들어오되 지키기 어렵다는 뜻이고, 눈썹과 눈 사이(전택궁)의 점은 집과 땅 문제로 신경 쓸 일이 생긴다고 풀이합니다. 미간의 점은 성격이 강하고 성취욕이 크다고 봅니다.",
          en: "A mole hidden in the brow hair is a classic lucky mole: a bright mind and much help from siblings and friends. Above the brow it means money comes but is hard to keep; between brow and eye it suggests worries over house and land. A mole between the brows marks a strong character and great ambition.",
          zh: "藏在眉毛里的痣是典型吉痣，主聪明、多得兄弟朋友相助。眉上的痣主财来却难守，眉眼之间（田宅宫）的痣主房产田地之事操心。印堂的痣主性格强、成就欲大。",
          ja: "眉毛の中に隠れたほくろは代表的な福ぼくろで、聡明で兄弟・友人の助けが多いとされます。眉の上のほくろは財が入っても守りにくいという意味で、眉と目の間（田宅宮）のほくろは家と土地のことで気を使うことが起きると解釈します。眉間のほくろは性格が強く達成欲が大きいと見ます。",
        },
      },
      {
        name: { ko: "눈가·눈 밑의 점", en: "Mole beside or under the eye", zh: "眼角·眼下的痣", ja: "目元・目の下のほくろ" },
        meaning: {
          ko: "눈꼬리 옆의 점은 '도화점'이라 하여 이성에게 인기가 많고 매력이 있다는 뜻입니다. 다만 연애가 잦아 구설이 따를 수 있습니다. 눈 밑의 점은 '눈물점'이라 하여 정이 많고 자녀나 사랑하는 사람 일로 눈물 흘릴 일이 있다고 풀이하며, 눈 밑이 도톰하고 점 색이 밝으면 오히려 자녀 복으로 봅니다.",
          en: "A mole beside the outer corner is the 'peach-blossom mole', meaning charm and popularity with the opposite sex, though frequent romance may bring gossip. A mole under the eye is the 'tear mole', a warm heart and tears shed over children or loved ones; with a full under-eye and a bright mole it is instead read as luck with children.",
          zh: "眼尾旁的痣称“桃花痣”，主受异性欢迎、有魅力，但恋爱频繁易招口舌。眼下的痣称“泪痣”，主重情，会为子女或所爱之人流泪；眼下饱满、痣色明亮者反而主子女福。",
          ja: "目尻の横のほくろは「桃花ぼくろ」と呼ばれ、異性に人気があり魅力があるという意味です。ただ恋愛が多く口の災いが伴うことがあります。目の下のほくろは「泣きぼくろ」と呼ばれ、情が深く子どもや愛する人のことで涙を流すことがあると解釈し、目の下がふっくらしてほくろの色が明るければむしろ子ども運と見ます。",
        },
      },
      {
        name: { ko: "코의 점", en: "Mole on the nose", zh: "鼻子上的痣", ja: "鼻のほくろ" },
        meaning: {
          ko: "코는 재물창고이므로 코 위의 점은 창고의 구멍으로 봅니다. 콧대의 점은 중년에 돈이나 건강으로 고생할 수 있다는 뜻이고, 코끝의 점은 씀씀이가 커서 돈이 샌다고 풀이합니다. 콧방울의 점은 재물이 들어와도 나가는 일이 생긴다고 합니다. 다만 색이 짙고 윤기 있는 살아 있는 점은 재물을 끌어오는 복점으로 보기도 합니다.",
          en: "Since the nose is the treasury, a mole on it is a hole in the storehouse. On the bridge it suggests money or health troubles in midlife; on the tip, generous spending that lets money leak; on the wings, wealth that comes and then goes. A dark, glossy living mole, however, may be read as a lucky mole that draws wealth.",
          zh: "鼻为财库，鼻上的痣视为仓库之洞。鼻梁痣主中年为钱或健康操劳，鼻头痣主花销大漏财，鼻翼痣主财来了也会有去处。但色深有光的活痣，也可视为招财的吉痣。",
          ja: "鼻は財の蔵なので鼻の上のほくろは蔵の穴と見ます。鼻筋のほくろは中年にお金や健康で苦労することがあるという意味で、鼻先のほくろは出費が大きくお金が漏れると解釈します。小鼻のほくろは財が入っても出ていくことが起きるとされます。ただ色が濃くつやのある生きぼくろは財を引き寄せる福ぼくろと見ることもあります。",
        },
      },
      {
        name: { ko: "입가·입술의 점", en: "Mole near the mouth or on the lip", zh: "嘴边·嘴唇的痣", ja: "口元・唇のほくろ" },
        meaning: {
          ko: "입 옆의 점은 먹을 복이 있고 말재주가 좋다는 뜻으로, 어디서든 굶지 않는다고 했습니다. 입술 위의 점은 말로 인한 구설을 조심하라는 뜻이고, 아랫입술 아래의 점은 말년에 자녀나 사람 문제로 마음 쓸 일이 있다고 풀이합니다. 인중의 점은 자녀운에 변수가 있다고 보아 예로부터 눈여겨보았습니다.",
          en: "A mole beside the mouth means luck with food and a way with words, never going hungry anywhere. On the lip it warns of trouble caused by speech; under the lower lip, worries over children or people late in life. A mole on the philtrum has long been watched as a variable in luck with children.",
          zh: "嘴旁的痣主有食禄、口才好，到哪都不挨饿。唇上的痣提醒慎防口舌，下唇下方的痣主晚年为子女或人事操心。人中的痣自古被视为子女运的变数而受关注。",
          ja: "口の横のほくろは食の福があり話が上手いという意味で、どこでも飢えないとされました。唇の上のほくろは言葉による災いに注意という意味で、下唇の下のほくろは晩年に子どもや人のことで気を使うことがあると解釈します。人中のほくろは子ども運に変数があると見て昔から注目されました。",
        },
      },
      {
        name: { ko: "볼·광대의 점", en: "Mole on the cheek or cheekbone", zh: "脸颊·颧骨的痣", ja: "頬・頬骨のほくろ" },
        meaning: {
          ko: "광대뼈 위의 점은 권위와 추진력이 강하지만 남과 부딪히기 쉽다는 뜻입니다. 볼 가운데의 점은 사람이 따르고 인기가 많은 복점으로 보되, 점이 흐리면 말과 소문에 시달린다고 풀이합니다. 귀 앞쪽 볼의 점은 재물이 들어오는 복점으로 여겨 예로부터 '돈점'이라 불렀습니다.",
          en: "A mole on the cheekbone means authority and drive but frequent friction with others. In the middle of the cheek it is a lucky mole of popularity and followers, though a faint one means suffering from talk and rumor. A mole on the cheek just in front of the ear was called the 'money mole', a lucky mark of incoming wealth.",
          zh: "颧骨上的痣主权威与推动力强，但易与人冲突。脸颊正中的痣是人缘好、受欢迎的吉痣，但痣色淡者受流言所扰。耳前脸颊的痣视为财入之吉痣，自古称“钱痣”。",
          ja: "頬骨の上のほくろは権威と推進力が強いものの人とぶつかりやすいという意味です。頬の真ん中のほくろは人が慕い人気のある福ぼくろと見ますが、ほくろが薄ければ言葉と噂に悩まされると解釈します。耳の前の頬のほくろは財が入る福ぼくろとされ、昔から「金ぼくろ」と呼ばれました。",
        },
      },
      {
        name: { ko: "턱의 점", en: "Mole on the chin", zh: "下巴的痣", ja: "顎のほくろ" },
        meaning: {
          ko: "턱 가운데의 점은 말년에 거처를 옮기거나 집 문제로 신경 쓸 일이 있다는 뜻으로 봅니다. 턱 양옆의 점은 아랫사람과의 인연이 많아 사람을 거느리는 복점이며, 턱 아래 가려진 점은 말년에 쌓이는 숨은 재물로 풀이합니다. 턱의 점이 짙고 윤기 있으면 노후에 땅과 집의 복이 있다고 합니다.",
          en: "A mole in the center of the chin suggests a move late in life or worries over the home. On either side of the chin it is a lucky mole of many ties with juniors and people to lead; hidden under the chin it is wealth quietly accumulating in later years. A dark, glossy chin mole is said to mean blessings of land and home in old age.",
          zh: "下巴正中的痣主晚年迁居或为房事操心。下巴两侧的痣主与下属缘多、能统领众人的吉痣，下巴底下藏着的痣主晚年暗中积财。下巴痣色深有光者老来有田宅之福。",
          ja: "顎の真ん中のほくろは晩年に住まいを移したり家のことで気を使うことがあるという意味と見ます。顎の両脇のほくろは目下との縁が多く人を率いる福ぼくろで、顎の下に隠れたほくろは晩年に積もる隠れた財と解釈します。顎のほくろが濃くつやがあれば老後に土地と家の福があるとされます。",
        },
      },
    ],
    tips: {
      ko: "점을 볼 때는 먼저 색을 봅니다. 검고 윤기 있는 점, 붉고 선명한 점은 살아 있는 점으로 복점에 가깝고, 갈색으로 흐리거나 테두리가 번진 점은 죽은 점으로 봅니다. 크기가 아주 작은 점(깨알점)은 큰 의미를 두지 않습니다. 점을 뺄지 고민된다면 관상학적으로는 '드러난 자리의 흐린 점'은 빼도 좋고 '가려진 자리의 짙은 점'은 두는 것이 좋다고 합니다. 다만 점의 모양이 갑자기 변하거나 커지면 관상 이전에 피부과 진료가 먼저입니다.",
      en: "Read the color first. A black, glossy mole or a clear red one is a living mole close to a lucky mole; a faint brown one with blurred edges is a dead mole. Very tiny specks carry little meaning. If you are weighing removal, physiognomy says a faint mole in a visible place may be removed, while a dark mole in a hidden place is better left. But if a mole suddenly changes shape or grows, see a dermatologist before any reading.",
      zh: "看痣先看颜色。黑而有光、红而鲜明的痣是活痣，接近吉痣；褐色模糊、边缘晕开的痣是死痣。极小的痣不作大解读。若考虑点痣，相学认为“显处的淡痣”可点，“隐处的深痣”宜留。但痣形突然变化或变大，先看皮肤科再谈面相。",
      ja: "ほくろを見るときはまず色を見ます。黒くつやのあるほくろ、赤く鮮明なほくろは生きぼくろで福ぼくろに近く、茶色で薄かったり縁がにじんだほくろは死にぼくろと見ます。とても小さなほくろには大きな意味を置きません。取るか迷うなら、人相学的には「現れた場所の薄いほくろ」は取ってもよく「隠れた場所の濃いほくろ」は残すのが良いとされます。ただほくろの形が急に変わったり大きくなったりしたら、人相の前に皮膚科の受診が先です。",
    },
    faq: [
      {
        question: { ko: "점을 빼면 운이 바뀌나요?", en: "Does removing a mole change your fortune?", zh: "点痣会改运吗？", ja: "ほくろを取ると運が変わりますか？" },
        answer: {
          ko: "관상학에서는 흉점을 빼는 것을 개운법의 하나로 인정합니다. 특히 코나 입가처럼 드러난 자리의 흐린 점은 빼면 인상이 깨끗해져 사람 운과 재물운에 도움이 된다고 봅니다. 반대로 눈썹 속이나 귀 뒤처럼 가려진 자리의 짙은 점은 숨은 복이라 하여 두는 것이 좋다고 합니다. 결국 점을 빼는 것은 인상을 정돈하는 일이며, 운을 바꾸는 가장 큰 힘은 여전히 표정과 행동에 있습니다.",
          en: "Physiognomy accepts removing an unlucky mole as one way of opening fortune. A faint mole in a visible place such as the nose or mouth, once removed, is said to clean up your impression and help with people and money. A dark mole in a hidden place such as inside the brow or behind the ear is a hidden blessing and better kept. In the end removal tidies your impression; the greatest power to change fortune still lies in expression and conduct.",
          zh: "相学认为点掉凶痣是开运法之一。尤其鼻子、嘴边等显处的淡痣，点掉后印象干净，有助人缘与财运。反之眉中、耳后等隐处的深痣是暗福，宜留。归根结底点痣是整理印象，改运最大的力量仍在表情与行为。",
          ja: "人相学では凶ぼくろを取ることを開運法の一つと認めます。特に鼻や口元のように現れた場所の薄いほくろは取れば印象がきれいになり人の運と財運に役立つと見ます。逆に眉の中や耳の後ろのように隠れた場所の濃いほくろは隠れた福とされ残すのが良いとされます。結局ほくろを取るのは印象を整えることで、運を変える最も大きな力は依然として表情と行動にあります。",
        },
      },
      {
        question: { ko: "눈물점은 정말 눈물 흘릴 일이 많다는 뜻인가요?", en: "Does a 'tear mole' really mean many tears?", zh: "泪痣真的代表多流泪吗？", ja: "泣きぼくろは本当に涙を流すことが多いという意味ですか？" },
        answer: {
          ko: "눈 밑의 점을 눈물점이라 부르는 것은 '정이 많다'는 뜻에서 나왔습니다. 자녀나 사랑하는 사람에게 마음을 많이 쓰다 보니 기쁨의 눈물도 슬픔의 눈물도 많다는 풀이입니다. 눈 밑(와잠)이 도톰하고 점 색이 밝으면 자녀 복으로 보고, 눈 밑이 꺼지고 점이 흐리면 걱정이 많다고 봅니다. 요즘은 매력점으로 여겨 일부러 그리기도 하니, 나쁜 점으로만 볼 필요는 없습니다.",
          en: "The name comes from 'a warm heart': caring so much for children and loved ones that there are many tears of joy as well as sorrow. With a full under-eye and a bright mole it is read as luck with children; with a hollow under-eye and a faint mole, as many worries. Today it is often seen as a beauty mark and even drawn on, so there is no need to read it as bad.",
          zh: "眼下的痣称泪痣，源于“重情”：为子女和所爱之人操心多，喜泪悲泪都多。眼下卧蚕饱满、痣色明亮者主子女福，眼下凹陷、痣色淡者主忧虑多。如今常被视为魅力痣甚至特意画上，不必只当坏痣看。",
          ja: "目の下のほくろを泣きぼくろと呼ぶのは「情が深い」という意味から来ています。子どもや愛する人に心を多く使うので喜びの涙も悲しみの涙も多いという解釈です。目の下（臥蚕）がふっくらしてほくろの色が明るければ子ども運と見て、目の下がくぼんでほくろが薄ければ心配が多いと見ます。今は魅力ぼくろとしてわざと描くこともあるので、悪いほくろとだけ見る必要はありません。",
        },
      },
      {
        question: { ko: "복점은 어떻게 구별하나요?", en: "How do you tell a lucky mole?", zh: "怎么分辨吉痣？", ja: "福ぼくろはどう見分けますか？" },
        answer: {
          ko: "세 가지를 봅니다. 첫째 색: 검고 윤기가 나거나 붉고 선명하면 살아 있는 점입니다. 둘째 모양: 둥글고 테두리가 또렷하며 살짝 도톰하면 좋고, 번지거나 일그러지면 좋지 않습니다. 셋째 자리: 눈썹 속, 귀 뒤, 턱 아래, 머리카락 속처럼 가려진 자리의 점은 숨은 복으로 봅니다. 세 가지를 모두 갖춘 점이 전형적인 복점이며, 위치가 좋아도 색이 흐리면 복점으로 치지 않습니다.",
          en: "Look at three things. Color: black and glossy, or red and clear, means a living mole. Shape: round with a crisp edge and slightly raised is good; blurred or distorted is not. Place: moles in hidden spots such as inside the brow, behind the ear, under the chin or in the hair are hidden blessings. A mole with all three is the classic lucky mole, and a good position with faint color does not count.",
          zh: "看三点。一看颜色：黑而有光或红而鲜明是活痣；二看形状：圆、边缘清晰、略凸为佳，晕开或变形不佳；三看位置：眉中、耳后、下巴底、头发里等隐处的痣是暗福。三者俱全的是典型吉痣，位置好但颜色淡则不算吉痣。",
          ja: "三つを見ます。第一に色：黒くつやがあるか赤く鮮明なら生きぼくろです。第二に形：丸く縁がはっきりして少し盛り上がっていれば良く、にじんだりゆがんだりしていれば良くありません。第三に場所：眉の中、耳の後ろ、顎の下、髪の中のように隠れた場所のほくろは隠れた福と見ます。三つをすべて備えたほくろが典型的な福ぼくろで、位置が良くても色が薄ければ福ぼくろとはしません。",
        },
      },
    ],
    relatedTypes: ["fortune-wealth", "fortune-wisdom", "fortune-charm", "charm-fortune"],
  },

  // ───────────────────────── 얼굴형 ─────────────────────────
  {
    id: "face-shape",
    hanja: "面",
    emoji: "🙂",
    featureId: "face-shape",
    name: { ko: "얼굴형", en: "Face Shape", zh: "脸型", ja: "顔の形" },
    title: {
      ko: "얼굴형 관상 보는 법 | 둥근형·계란형·각진형·긴형별 성격과 운세",
      en: "Face Shape Reading | Round, Oval, Square and Long Faces Explained",
      zh: "脸型面相怎么看 | 圆脸·鹅蛋脸·方脸·长脸的性格与运势",
      ja: "顔の形の人相の見方 | 丸顔・卵型・四角・面長の性格と運勢",
    },
    description: {
      ko: "관상의 기본은 얼굴 전체 윤곽입니다. 둥근 얼굴, 계란형 얼굴, 각진 얼굴, 역삼각형 얼굴, 긴 얼굴 등 얼굴형별 성격과 운세, 오행(목·화·토·금·수)으로 얼굴형을 보는 법을 정리했습니다.",
      en: "Face reading starts with the overall outline. Round, oval, square, heart-shaped and long faces explained with personality and fortune, plus the five-element view of face shapes.",
      zh: "面相的基础是整体轮廓。整理了圆脸、鹅蛋脸、方脸、心形脸、长脸等脸型的性格与运势，以及用五行（木火土金水）看脸型的方法。",
      ja: "人相の基本は顔全体の輪郭です。丸顔、卵型、四角、逆三角形、面長など顔の形ごとの性格と運勢、五行（木・火・土・金・水）で顔の形を見る方法をまとめました。",
    },
    keywords: {
      ko: ["얼굴형 관상", "둥근 얼굴 관상", "계란형 얼굴 관상", "각진 얼굴 관상", "긴 얼굴 관상", "오행 관상", "삼정 관상"],
      en: ["face shape reading", "face shape personality", "korean face reading face shape", "five elements face"],
      zh: ["脸型面相", "脸型性格", "五行面相"],
      ja: ["顔の形 人相", "顔の形 性格", "五行 人相"],
    },
    heading: {
      ko: "얼굴형 관상: 얼굴 윤곽으로 보는 성격과 운세",
      en: "Face Shape Reading: Character and Fortune in the Outline",
      zh: "脸型面相：从脸部轮廓看性格与运势",
      ja: "顔の形の人相：顔の輪郭で見る性格と運勢",
    },
    intro: {
      ko: "관상을 볼 때 가장 먼저 보는 것이 얼굴 전체의 윤곽입니다. 눈·코·입이 아무리 좋아도 그것을 담는 그릇이 얼굴형이기 때문입니다. 옛 관상서는 얼굴형을 오행(五行)으로 나누어 길고 갸름하면 목형(木形), 위가 넓고 아래가 뾰족하면 화형(火形), 두툼하고 둥글면 토형(土形), 각지고 반듯하면 금형(金形), 둥글고 살집이 있으면 수형(水形)이라 했습니다. 각 형은 좋고 나쁨이 아니라 타고난 기질의 차이로, 자기 형에 맞게 살면 운이 순조롭다고 보았습니다.\n\n얼굴형을 볼 때는 삼정(三停)의 균형도 함께 봅니다. 이마(상정)·코(중정)·턱(하정)의 길이가 고르면 초년·중년·말년의 운이 고르게 흐르는 상이고, 어느 한 부분이 유난히 길거나 짧으면 그 시기에 굴곡이 있다고 풀이합니다. 또 얼굴 좌우가 대칭에 가까울수록 마음이 안정되고 인간관계가 원만하다고 봅니다.\n\n요즘 흔히 쓰는 둥근형·계란형·각진형·역삼각형·긴형 분류는 오행 분류를 쉽게 풀어 쓴 것입니다. 둥근형은 수형과 토형, 계란형은 목형과 수형이 섞인 가장 조화로운 상, 각진형은 금형, 역삼각형은 화형, 긴형은 목형에 가깝습니다. 아래에서는 이 다섯 가지 얼굴형이 뜻하는 성격과 운세를 살펴봅니다.",
      en: "The first thing a reader looks at is the outline of the whole face, because however fine the eyes, nose and mouth, the face shape is the vessel that holds them. The old texts sorted faces by the five elements: long and slender is wood, wide above and pointed below is fire, thick and round is earth, angular and even is metal, round and fleshy is water. None is better than another; each is a different inborn temperament, and living in keeping with your own shape was said to make fortune flow smoothly.\n\nA reader also checks the balance of the three zones. When forehead, nose and chin are of even length, fortune flows evenly through early, middle and later life; when one zone is noticeably long or short, that period has its ups and downs. The closer the two sides of the face are to symmetry, the steadier the mind and the smoother the relationships.\n\nThe round, oval, square, heart-shaped and long categories used today are a plain-language version of the five elements. Round corresponds to water and earth, oval to the most harmonious mix of wood and water, square to metal, heart-shaped to fire and long to wood. Below, the character and fortune of these five shapes are explained.",
      zh: "看相最先看的是整张脸的轮廓，因为眼鼻嘴再好，脸型才是盛放它们的容器。古相书按五行分脸型：长而瘦为木形，上宽下尖为火形，厚而圆为土形，方而端正为金形，圆而有肉为水形。各形无好坏，只是天生气质不同，顺着自己的形过活则运势顺畅。\n\n看脸型还要看三停的均衡。额（上停）、鼻（中停）、下巴（下停）长度均匀者，早中晚年运势平顺；某一停特别长或短者，该时期有起伏。脸左右越对称，心越安定、人际越圆满。\n\n如今常用的圆脸、鹅蛋脸、方脸、心形脸、长脸分类，是五行分类的通俗版。圆脸近水形与土形，鹅蛋脸是木水相兼最和谐之相，方脸为金形，心形脸为火形，长脸近木形。下面看这五种脸型所主的性格与运势。",
      ja: "人相を見るとき最初に見るのが顔全体の輪郭です。目・鼻・口がどれほど良くてもそれを収める器が顔の形だからです。昔の相書は顔の形を五行に分け、長く細ければ木形、上が広く下が尖っていれば火形、厚く丸ければ土形、角張って整っていれば金形、丸く肉づきがあれば水形としました。各形は良し悪しではなく生まれつきの気質の違いで、自分の形に合わせて生きれば運が順調だと見ました。\n\n顔の形を見るときは三停の均衡も一緒に見ます。額（上停）・鼻（中停）・顎（下停）の長さが揃っていれば初年・中年・晩年の運が均等に流れる相で、どこか一か所が特に長いか短ければその時期に起伏があると解釈します。また顔の左右が対称に近いほど心が安定し人間関係が円満だと見ます。\n\n今よく使う丸顔・卵型・四角・逆三角形・面長の分類は五行の分類をわかりやすく言い換えたものです。丸顔は水形と土形、卵型は木形と水形が混ざった最も調和のとれた相、四角は金形、逆三角形は火形、面長は木形に近いです。以下ではこの五つの顔の形が意味する性格と運勢を見ていきます。",
    },
    shapes: [
      {
        name: { ko: "둥근 얼굴(원형)", en: "Round face", zh: "圆脸", ja: "丸顔" },
        meaning: {
          ko: "복을 담는 그릇이 넉넉한 상입니다. 성격이 원만하고 정이 많아 사람과 재물이 함께 모이며, 먹을 복이 있어 어디서든 환영받습니다. 장사와 서비스업에 어울립니다. 느긋해서 결정을 미루거나 남의 부탁을 거절하지 못해 손해를 보기 쉬우니, 돈 문제는 선을 분명히 긋는 것이 좋습니다.",
          en: "A generous vessel for blessings. Easygoing and warm, so people and wealth gather together, and luck with food makes you welcome anywhere. Suited to trade and service. Being relaxed, you may postpone decisions or fail to refuse requests and lose out, so draw clear lines in money matters.",
          zh: "盛福之器宽大之相。性格圆融、重情，人与财一起汇聚，有食禄到哪都受欢迎。适合经商与服务业。悠闲易拖延决定、不善拒绝而吃亏，钱财之事要划清界限。",
          ja: "福を入れる器が大きい相です。性格が円満で情が深く人と財が一緒に集まり、食の福があってどこでも歓迎されます。商売とサービス業に向きます。のんびりしていて決定を先延ばしにしたり人の頼みを断れず損をしやすいので、お金のことははっきり線を引くのが良いでしょう。",
        },
      },
      {
        name: { ko: "계란형 얼굴(타원형)", en: "Oval face", zh: "鹅蛋脸", ja: "卵型の顔" },
        meaning: {
          ko: "관상에서 가장 조화로운 얼굴형으로, 삼정이 고르고 모든 운이 균형 있게 발달합니다. 지혜와 매력을 함께 갖춰 어떤 일을 해도 중간 이상은 하며, 사람들에게 호감을 삽니다. 뚜렷한 약점이 없는 대신 강점도 흐려질 수 있으니, 한 가지를 깊이 파는 전문성을 갖추면 크게 됩니다.",
          en: "The most harmonious shape in physiognomy, with even zones and every fortune developing in balance. Wisdom and charm together mean you do better than average at anything and win people's liking. With no clear weakness, strengths can blur too, so build deep expertise in one thing and you go far.",
          zh: "面相中最和谐的脸型，三停均匀，各运平衡发展。兼具智慧与魅力，做什么都中上，讨人喜欢。没有明显弱点，但强项也可能不突出，若在一事上深耕专业则大成。",
          ja: "人相で最も調和のとれた顔の形で、三停が揃いすべての運が均衡よく発達します。知恵と魅力を兼ね備え何をしても中以上はこなし、人に好感を持たれます。はっきりした弱点がない代わりに強みもぼやけることがあるので、一つを深く究める専門性を備えれば大きくなります。",
        },
      },
      {
        name: { ko: "각진 얼굴(사각형)", en: "Square face", zh: "方脸", ja: "四角い顔" },
        meaning: {
          ko: "의지와 끈기가 강한 금형(金形)의 상입니다. 한번 마음먹은 일은 끝까지 해내고, 체력이 좋아 큰 조직을 이끌거나 현장에서 오래 버티는 힘이 있습니다. 원칙을 중시해 신뢰를 얻지만 융통성이 부족하다는 말을 듣기 쉽습니다. 부드러운 말투 하나가 인간관계 운을 크게 바꿉니다.",
          en: "The metal face of strong will and persistence. You finish what you decide, and good stamina lets you lead a large organization or endure long in the field. Principles earn trust, but you may be called inflexible. One softer tone of voice greatly changes your luck with people.",
          zh: "意志与毅力强的金形之相。下定决心的事做到底，体力好，能带领大组织或在一线长期坚持。重原则而得信任，但易被说不够变通。一句柔和的语气就能大大改变人际运。",
          ja: "意志と粘り強さの強い金形の相です。一度決めたことは最後までやり遂げ、体力が良く大きな組織を率いたり現場で長く耐える力があります。原則を重んじて信頼を得ますが融通が利かないと言われやすいです。柔らかな話し方ひとつが人間関係の運を大きく変えます。",
        },
      },
      {
        name: { ko: "역삼각형 얼굴(하트형)", en: "Heart-shaped face", zh: "心形脸（倒三角）", ja: "逆三角形の顔" },
        meaning: {
          ko: "이마가 넓고 턱이 갸름한 화형(火形)의 상으로, 머리가 좋고 감각이 예민합니다. 생각이 빠르고 아이디어가 많아 기획·연구·창작에 어울리며 초년운이 좋습니다. 체력과 끈기가 약해 중도에 지치기 쉬우니, 큰 목표를 작게 쪼개 하나씩 이루는 방식이 맞습니다. 턱에 살이 붙으면 말년운이 보완됩니다.",
          en: "The fire face, wide at the brow and slim at the chin: bright and keenly sensitive. Quick thinking and many ideas suit planning, research and creation, with good early fortune. Stamina and persistence run low, so break big goals into small steps and finish them one by one. Flesh gathering on the chin supplements later fortune.",
          zh: "额宽下巴尖的火形之相，聪明、感觉敏锐。思维快、点子多，适合策划、研究、创作，早年运好。体力与毅力弱易半途而废，适合把大目标拆小逐一完成。下巴长肉可补晚年运。",
          ja: "額が広く顎が細い火形の相で、頭が良く感覚が鋭いです。考えが速くアイデアが多いので企画・研究・創作に向き、初年運が良いです。体力と粘りが弱く途中で疲れやすいので、大きな目標を小さく分けて一つずつ成し遂げる方法が合います。顎に肉がつけば晩年運が補われます。",
        },
      },
      {
        name: { ko: "긴 얼굴(장방형)", en: "Long face", zh: "长脸", ja: "面長の顔" },
        meaning: {
          ko: "사려 깊고 신중한 목형(木形)의 상입니다. 한 분야를 깊이 파는 전문가·학자·장인의 얼굴로, 꾸준함으로 뒤늦게 큰 성취를 이룹니다. 자기 세계가 뚜렷해 외로움을 타지 않는 편이지만, 생각이 많아 결정이 늦고 융통성이 부족할 수 있습니다. 사람을 만나는 자리를 일부러 늘리면 운이 넓어집니다.",
          en: "The wood face of thought and prudence: the face of specialists, scholars and craftsmen who dig deep into one field and achieve greatly, if late, through steadiness. A clear inner world keeps loneliness away, but many thoughts delay decisions and limit flexibility. Deliberately adding occasions to meet people widens your fortune.",
          zh: "深思熟虑、谨慎的木形之相。是专家、学者、匠人之脸，靠坚持大器晚成。自我世界分明，不太孤独，但思虑多、决定慢、不够变通。刻意增加与人见面的场合可拓宽运势。",
          ja: "思慮深く慎重な木形の相です。一つの分野を深く究める専門家・学者・職人の顔で、地道さで遅れて大きな成果を得ます。自分の世界がはっきりしていて寂しさを感じにくい方ですが、考えが多く決定が遅く融通が足りないことがあります。人と会う場をわざと増やせば運が広がります。",
        },
      },
    ],
    tips: {
      ko: "얼굴형은 머리카락을 뒤로 넘기고 정면에서 봅니다. 이마의 너비, 광대의 너비, 턱의 너비 세 가지를 비교해 어디가 가장 넓은지로 형을 가립니다. 이마·코·턱의 길이도 함께 재어 삼정이 고른지 봅니다. 얼굴형은 체중에 따라 달라 보이므로 살이 찌거나 빠졌을 때의 형이 아니라 뼈대의 형을 보는 것이 정확합니다. 관상학에서는 자기 얼굴형의 장점을 살리는 쪽으로 사는 것이 가장 좋은 개운이라 하니, 형에 맞지 않는 삶을 억지로 살기보다 타고난 기질을 아는 것부터 시작하세요.",
      en: "Read the face shape from the front with the hair pushed back. Compare the width of forehead, cheekbones and chin to see which is widest, and measure the length of forehead, nose and chin to see whether the three zones are even. Weight changes how a face looks, so judge the bone structure rather than a face that has gained or lost weight. Physiognomy holds that living in a way that uses the strengths of your own shape is the best way to open fortune, so start by knowing your inborn temperament rather than forcing a life that does not fit it.",
      zh: "看脸型要把头发向后拢、从正面看。比较额宽、颧宽、下巴宽三者哪个最宽来定形，再量额、鼻、下巴的长度看三停是否均匀。脸型随体重而变，看骨架之形比看胖瘦之形更准。相学认为顺着自己脸型的优点生活是最好的开运，与其勉强过不合形的生活，先从了解天生气质开始。",
      ja: "顔の形は髪を後ろに流して正面から見ます。額の幅、頬骨の幅、顎の幅の三つを比べてどこが最も広いかで形を分けます。額・鼻・顎の長さも一緒に測って三停が揃っているかを見ます。顔の形は体重によって違って見えるので、太ったり痩せたりしたときの形ではなく骨格の形を見るのが正確です。人相学では自分の顔の形の長所を生かす方向で生きることが最も良い開運とされるので、形に合わない生き方を無理にするより生まれつきの気質を知ることから始めてください。",
    },
    faq: [
      {
        question: { ko: "어떤 얼굴형이 가장 좋은 관상인가요?", en: "Which face shape is the best?", zh: "哪种脸型面相最好？", ja: "どの顔の形が一番良い人相ですか？" },
        answer: {
          ko: "관상학에서는 특정 얼굴형을 최고로 치지 않습니다. 굳이 꼽자면 삼정이 고르고 좌우가 대칭인 계란형을 가장 조화로운 상으로 보지만, 이는 '약점이 적다'는 뜻이지 '가장 복이 많다'는 뜻이 아닙니다. 둥근 얼굴은 재물, 각진 얼굴은 끈기, 긴 얼굴은 전문성, 역삼각형은 지혜처럼 형마다 강한 운이 다릅니다. 자기 형의 강점을 쓰는 사람이 가장 좋은 관상입니다.",
          en: "Physiognomy names no single best shape. If pressed, the oval face with even zones and symmetry is the most harmonious, but that means 'fewest weaknesses', not 'most blessed'. Each shape has a different strong fortune: round for wealth, square for persistence, long for expertise, heart-shaped for wisdom. The best face is the one whose owner uses its strengths.",
          zh: "相学不把某种脸型奉为最佳。硬要说，三停均匀、左右对称的鹅蛋脸最和谐，但那是“弱点少”而非“福最多”。圆脸主财，方脸主毅力，长脸主专业，心形脸主智慧，各形强运不同。会用自己脸型优点的人，才是最好的面相。",
          ja: "人相学では特定の顔の形を最高とはしません。あえて挙げれば三停が揃い左右対称の卵型を最も調和のとれた相と見ますが、これは「弱点が少ない」という意味で「最も福が多い」という意味ではありません。丸顔は財、四角は粘り、面長は専門性、逆三角形は知恵のように形ごとに強い運が違います。自分の形の強みを使う人が最も良い人相です。",
        },
      },
      {
        question: { ko: "살이 찌거나 빠지면 관상이 바뀌나요?", en: "Does gaining or losing weight change your face reading?", zh: "胖了或瘦了面相会变吗？", ja: "太ったり痩せたりすると人相が変わりますか？" },
        answer: {
          ko: "뼈대가 만드는 기본 형은 바뀌지 않지만, 살집은 관상에서 '현재의 운'을 보여 주는 요소라 해석이 달라집니다. 볼과 턱에 살이 적당히 붙으면 인덕과 말년운이 좋아지는 변화로 보고, 얼굴이 급격히 야위면 기운이 빠진 것으로 봅니다. 관상학은 '얼굴에 윤기가 돌고 살이 알맞은 때'를 운이 열린 때로 보므로, 건강한 체중을 유지하는 것이 곧 좋은 관상을 지키는 일입니다.",
          en: "The basic shape made by the bones does not change, but flesh shows 'present fortune' in physiognomy, so the reading shifts. Moderate flesh on cheeks and chin is a change toward better goodwill and later fortune; a face that thins sharply is read as lost energy. Since physiognomy counts 'a glowing face with the right amount of flesh' as a time of open fortune, keeping a healthy weight is itself keeping a good face.",
          zh: "骨架形成的基本脸型不变，但肉在相学中体现“当下运势”，解读会变。脸颊下巴适度长肉视为人缘与晚年运变好，脸突然消瘦视为气衰。相学把“面有光泽、肉恰到好处之时”视为运开之时，保持健康体重就是守住好面相。",
          ja: "骨格が作る基本の形は変わりませんが、肉づきは人相で「現在の運」を示す要素なので解釈が変わります。頬と顎にほどよく肉がつけば人徳と晩年運が良くなる変化と見て、顔が急にやつれれば気が抜けたと見ます。人相学は「顔につやがあり肉が適度な時」を運が開いた時と見るので、健康な体重を保つことがそのまま良い人相を守ることです。",
        },
      },
      {
        question: { ko: "얼굴 좌우가 다르면 어떤 뜻인가요?", en: "What does an asymmetrical face mean?", zh: "脸左右不对称是什么意思？", ja: "顔の左右が違うとどんな意味ですか？" },
        answer: {
          ko: "누구나 얼굴 좌우는 조금씩 다르며, 관상에서는 왼쪽을 타고난 것과 부모, 오른쪽을 스스로 만든 것과 배우자로 보기도 합니다. 좌우 차이가 크면 생각과 행동이 다르거나 마음에 갈등이 있다고 풀이하고, 차이가 작을수록 마음이 안정되고 인간관계가 원만하다고 봅니다. 한쪽으로만 씹거나 턱을 괴는 습관이 비대칭을 키우므로, 생활 습관을 고치는 것이 관상학적으로도 권하는 개운법입니다.",
          en: "Every face differs slightly side to side. Some readers take the left for what is inborn and the parents, and the right for what is self-made and the spouse. A large difference suggests thought and action out of step or inner conflict; the smaller the difference, the steadier the mind and the smoother the relationships. Chewing on one side or resting the chin on a hand increases asymmetry, so correcting such habits is a way of opening fortune that physiognomy itself recommends.",
          zh: "每个人脸左右都略有不同，相学中左边看先天与父母，右边看后天与配偶。左右差异大者思与行不一或心有矛盾，差异越小心越安定、人际越圆满。单侧咀嚼、托腮等习惯会加大不对称，改正生活习惯是相学也推荐的开运法。",
          ja: "誰でも顔の左右は少しずつ違い、人相では左を生まれつきと親、右を自分で作ったものと配偶者と見ることもあります。左右の差が大きければ考えと行動が違うか心に葛藤があると解釈し、差が小さいほど心が安定し人間関係が円満だと見ます。片側だけで噛んだり頬杖をつく習慣が非対称を育てるので、生活習慣を直すことが人相学的にも勧める開運法です。",
        },
      },
    ],
    relatedTypes: ["wealth-fortune", "leadership-health", "wisdom-charm", "charm-fortune"],
  },

  // ───────────────────────── 광대 ─────────────────────────
  {
    id: "cheekbones",
    hanja: "顴",
    emoji: "💎",
    name: { ko: "광대", en: "Cheekbones", zh: "颧骨", ja: "頬骨" },
    title: {
      ko: "광대 관상 보는 법 | 광대뼈 모양별 권력운·추진력·대인운",
      en: "Cheekbone Face Reading | Power, Drive and Relationships by Cheekbone Shape",
      zh: "颧骨面相怎么看 | 不同颧骨形状的权力运·推动力·人缘",
      ja: "頬骨の人相の見方 | 頬骨の形でわかる権力運・推進力・対人運",
    },
    description: {
      ko: "관상에서 광대뼈는 권력과 추진력, 사람을 거느리는 힘을 보는 자리입니다. 높은 광대, 옆으로 퍼진 광대, 낮은 광대, 살집 있는 광대, 앞으로 나온 광대 등 광대 모양별 해석과 46~47세 운을 정리했습니다.",
      en: "In face reading the cheekbones show power, drive and the strength to lead people. High, wide, low, fleshy and forward cheekbones explained, with the fortune of ages 46 and 47.",
      zh: "面相中颧骨是看权力、推动力与统领他人之力的部位。整理了高颧、横张颧、低颧、有肉颧、前突颧等颧骨形状的解读以及46~47岁的运势。",
      ja: "人相で頬骨は権力と推進力、人を率いる力を見る場所です。高い頬骨、横に張った頬骨、低い頬骨、肉づきのよい頬骨、前に出た頬骨など頬骨の形ごとの解釈と46〜47歳の運をまとめました。",
    },
    keywords: {
      ko: ["광대 관상", "광대뼈 관상", "광대 튀어나온 관상", "광대 없는 관상", "광대 높은 관상", "권력운 관상"],
      en: ["cheekbone face reading", "high cheekbones meaning", "korean face reading cheekbones"],
      zh: ["颧骨面相", "颧骨高 面相", "颧骨 性格"],
      ja: ["頬骨 人相", "頬骨 高い 人相", "頬骨 性格"],
    },
    heading: {
      ko: "광대 관상: 광대뼈로 보는 권력운과 추진력",
      en: "Cheekbone Face Reading: Power and Drive in the Cheekbones",
      zh: "颧骨面相：从颧骨看权力运与推动力",
      ja: "頬骨の人相：頬骨で見る権力運と推進力",
    },
    intro: {
      ko: "관상에서 광대뼈는 '권골(顴骨)'이라 하여 권력과 세력을 보는 자리입니다. 옛 관상서는 코를 임금에, 양쪽 광대를 임금을 보좌하는 신하에 비유했습니다. 코가 아무리 높아도 광대가 받쳐 주지 않으면 '외로운 봉우리'라 하여 혼자 애쓰는 상이고, 광대가 코를 좌우에서 든든히 감싸면 사람을 거느리고 세력을 이룬다고 보았습니다. 나이로는 46세와 47세의 운을 광대에서 읽으며, 이 시기에 권한이 커지고 책임이 무거워지는지를 광대의 힘으로 가늠했습니다.\n\n광대는 높이, 너비, 살집, 그리고 코와의 균형을 봅니다. 광대가 적당히 솟고 살이 덮여 있으면 추진력과 포용력을 함께 갖춘 가장 좋은 상이고, 광대뼈가 뾰족하게 드러나 살이 없으면 추진력은 강하지만 사람과 부딪히기 쉽다고 봅니다. 광대가 옆으로 퍼지면 활동 범위가 넓고 버티는 힘이 좋으며, 앞으로 나오면 자기주장이 강해 조직보다 혼자 하는 일에 맞는다고 풀이합니다.\n\n특히 여성의 광대는 과거에 '기가 세다'는 식으로 나쁘게 풀이되기도 했으나, 현대 관상학에서는 남녀 구분 없이 광대를 '사회적 활동력'으로 봅니다. 광대가 뚜렷한 사람은 직장과 사회에서 역할을 맡고 인정받는 힘이 강하며, 광대가 낮고 부드러운 사람은 경쟁보다 조화를 택하는 성향으로 풀이합니다.",
      en: "In physiognomy the cheekbones are the 'bones of power', where authority and influence are read. The old texts likened the nose to the ruler and the two cheekbones to the ministers who support him. However high the nose, without the cheekbones to back it, it is a 'lonely peak' and a face that struggles alone; when the cheekbones wrap the nose firmly on both sides, you lead people and build influence. In the age map the cheekbones govern 46 and 47, and their strength was used to gauge whether authority and responsibility grow in those years.\n\nA reader looks at height, width, flesh and the balance with the nose. Moderately raised cheekbones covered with flesh are the best face, drive and tolerance together; sharp, fleshless cheekbones mean strong drive but frequent friction. Cheekbones spreading sideways mean a wide range of activity and endurance; cheekbones pushing forward mean strong self-assertion, better suited to working alone than in an organization.\n\nWomen's cheekbones were once read unkindly as 'strong-willed', but modern physiognomy reads cheekbones as 'social energy' regardless of sex. People with defined cheekbones have a strong capacity to take roles and win recognition at work and in society, while people with low, soft cheekbones tend to choose harmony over competition.",
      zh: "相学称颧骨为“权骨”，看权力与势力。古相书把鼻比作君王，两侧颧骨比作辅佐之臣。鼻再高若无颧骨相托，称为“孤峰”，是独自操劳之相；颧骨从左右稳稳包住鼻子，则能统领众人、成就势力。流年上颧骨主四十六、四十七岁，以颧骨之力衡量这一时期权责是否加重。\n\n看颧骨要看高度、宽度、肉与鼻的均衡。颧骨适度隆起且有肉覆盖，是兼具推动力与包容力的最佳之相；颧骨尖露无肉者推动力强但易与人冲突。颧骨横张者活动范围广、耐力好；颧骨前突者自我主张强，适合独立工作而非组织。\n\n过去女性颧骨常被解读为“气强”，而现代相学不分男女，把颧骨视为“社会活动力”。颧骨分明者在职场社会担当角色、获得认可的力量强；颧骨低而柔和者倾向于和谐而非竞争。",
      ja: "人相で頬骨は「権骨」と呼ばれ、権力と勢力を見る場所です。昔の相書は鼻を君主に、両側の頬骨を君主を支える臣下にたとえました。鼻がどれほど高くても頬骨が支えなければ「孤独な峰」とされ一人で苦労する相で、頬骨が鼻を左右からしっかり包めば人を率いて勢力を成すと見ました。年齢では46歳と47歳の運を頬骨から読み、この時期に権限が大きくなり責任が重くなるかを頬骨の力で測りました。\n\n頬骨は高さ、幅、肉づき、そして鼻との均衡を見ます。頬骨がほどよく出て肉に覆われていれば推進力と包容力を兼ね備えた最も良い相で、頬骨が尖って現れ肉がなければ推進力は強いものの人とぶつかりやすいと見ます。頬骨が横に張れば活動範囲が広く耐える力が良く、前に出れば自己主張が強く組織より一人でする仕事に合うと解釈します。\n\n特に女性の頬骨はかつて「気が強い」というように悪く解釈されることもありましたが、現代の人相学では男女の区別なく頬骨を「社会的活動力」と見ます。頬骨がはっきりした人は職場と社会で役割を担い認められる力が強く、頬骨が低く柔らかい人は競争より調和を選ぶ性向と解釈します。",
    },
    shapes: [
      {
        name: { ko: "적당히 솟고 살집 있는 광대", en: "Moderately raised, fleshy cheekbones", zh: "适度隆起有肉的颧骨", ja: "ほどよく出て肉づきのよい頬骨" },
        meaning: {
          ko: "추진력과 포용력을 함께 갖춘 가장 좋은 광대입니다. 사람을 거느리는 힘이 있으면서도 부드러워 아랫사람이 잘 따르고, 중년에 권한과 재물이 함께 커집니다. 관리자·경영자·공직에 어울리며, 46~47세 무렵 큰 기회가 온다고 봅니다. 자리가 커질수록 겸손이 운을 지킵니다.",
          en: "The best cheekbones, drive and tolerance together. You have the strength to lead yet remain gentle, so juniors follow willingly, and authority and wealth grow together in midlife. Suited to management, business and public office, with a big opportunity expected around 46 to 47. The higher the position, the more humility protects your luck.",
          zh: "兼具推动力与包容力的最佳颧骨。有统领之力又柔和，下属乐于追随，中年权与财同增。适合管理者、经营者、公职，46~47岁前后有大机会。位置越高，谦逊越能守运。",
          ja: "推進力と包容力を兼ね備えた最も良い頬骨です。人を率いる力がありながら柔らかく目下がよく慕い、中年に権限と財が一緒に大きくなります。管理者・経営者・公職に向き、46〜47歳頃に大きな機会が来ると見ます。地位が大きくなるほど謙虚さが運を守ります。",
        },
      },
      {
        name: { ko: "뾰족하게 드러난 광대", en: "Sharp, prominent cheekbones", zh: "尖露的颧骨", ja: "尖って現れた頬骨" },
        meaning: {
          ko: "살이 없이 광대뼈가 날카롭게 드러난 상은 추진력과 승부욕이 매우 강합니다. 목표를 향해 밀어붙이는 힘이 있어 개척자·운동선수·영업에서 성과를 내지만, 말이 세고 타협을 싫어해 적을 만들기 쉽습니다. 볼에 살이 붙으면 부딪힘이 줄고 운이 부드러워진다고 하니, 무리한 다이어트보다 건강한 체중을 유지하세요.",
          en: "Fleshless, sharply defined cheekbones mean very strong drive and competitiveness. The power to push toward a goal brings results as a pioneer, athlete or salesperson, but harsh words and a dislike of compromise make enemies easily. Flesh on the cheeks is said to reduce clashes and soften fortune, so keep a healthy weight rather than dieting hard.",
          zh: "无肉、颧骨尖锐外露者推动力与好胜心极强。有朝目标猛进之力，作为开拓者、运动员、销售能出成绩，但言辞强硬、不喜妥协，易树敌。脸颊长肉则冲突减少、运势变柔，与其过度减肥，不如保持健康体重。",
          ja: "肉がなく頬骨が鋭く現れた相は推進力と勝負欲が非常に強いです。目標に向かって押し切る力があり開拓者・スポーツ選手・営業で成果を出しますが、言葉が強く妥協を嫌うので敵を作りやすいです。頬に肉がつけばぶつかりが減り運が柔らかくなるとされるので、無理なダイエットより健康な体重を保ってください。",
        },
      },
      {
        name: { ko: "옆으로 퍼진 광대", en: "Wide, sideways cheekbones", zh: "横张的颧骨", ja: "横に張った頬骨" },
        meaning: {
          ko: "얼굴 폭이 광대에서 가장 넓은 상은 활동 범위가 넓고 버티는 힘이 좋습니다. 체력이 강하고 여러 사람을 상대하는 일에 지치지 않아 현장·조직·단체를 이끄는 데 어울립니다. 고집이 세다는 말을 듣기 쉬우나 한번 믿은 사람은 끝까지 지키는 의리가 있습니다. 중년 이후 세력이 커지는 상입니다.",
          en: "A face widest at the cheekbones means a broad range of activity and strong endurance. Good stamina and no fatigue in dealing with many people suit leading on the ground, in organizations and groups. You may be called stubborn, but you stand by those you trust to the end. Influence grows after midlife.",
          zh: "脸最宽处在颧骨者活动范围广、耐力好。体力强，应对众人不累，适合带领一线、组织、团体。易被说固执，但对信任的人讲义气到底。中年以后势力渐大。",
          ja: "顔の幅が頬骨で最も広い相は活動範囲が広く耐える力が良いです。体力が強く多くの人を相手にする仕事で疲れず、現場・組織・団体を率いるのに向きます。頑固だと言われやすいものの一度信じた人は最後まで守る義理があります。中年以降に勢力が大きくなる相です。",
        },
      },
      {
        name: { ko: "낮고 부드러운 광대", en: "Low, soft cheekbones", zh: "低而柔和的颧骨", ja: "低く柔らかい頬骨" },
        meaning: {
          ko: "광대가 거의 드러나지 않는 상은 경쟁보다 조화를 택하는 성향입니다. 다툼을 피하고 사람을 편하게 해 주어 적이 없고, 전문 기술이나 창작처럼 혼자 깊이 하는 일에서 성취를 이룹니다. 권력을 쥐는 자리보다 뒤에서 받쳐 주는 자리에서 빛을 봅니다. 자기 몫을 챙기는 데 약하니 보수와 조건은 분명히 요구하세요.",
          en: "Cheekbones that barely show mark a preference for harmony over competition. Avoiding conflict and putting people at ease, you have no enemies and achieve in work done deeply alone, such as technical skill or creation. You shine in supporting roles rather than seats of power. Weak at claiming your share, so be clear in asking for pay and terms.",
          zh: "颧骨几乎不显者倾向和谐而非竞争。避争执、让人舒服，无敌人，在专业技术、创作等独自深耕的工作中有成就。在幕后支持的位置比掌权的位置更出彩。不善争取自己应得的，报酬与条件要明确要求。",
          ja: "頬骨がほとんど現れない相は競争より調和を選ぶ性向です。争いを避け人を楽にさせるので敵がなく、専門技術や創作のように一人で深くする仕事で成果を上げます。権力を握る席より後ろで支える席で輝きます。自分の取り分を確保するのが弱いので、報酬と条件ははっきり要求してください。",
        },
      },
      {
        name: { ko: "앞으로 나온 광대", en: "Forward-pushing cheekbones", zh: "前突的颧骨", ja: "前に出た頬骨" },
        meaning: {
          ko: "옆에서 보았을 때 광대가 앞으로 도드라진 상은 자기주장과 독립심이 강합니다. 남의 지시를 받기보다 스스로 결정하는 자리에서 능력이 나오므로 창업·프리랜서·전문직에 어울립니다. 사람과 세력을 모으는 힘도 있으나 성격이 급해 일을 서두르다 그르칠 수 있으니, 중요한 결정은 하루 묵혀 두는 습관이 좋습니다.",
          en: "Cheekbones that stand forward in profile mean strong self-assertion and independence. Your ability comes out where you decide for yourself rather than take orders, so founding a business, freelancing or a profession suits you. You can gather people and influence, but a quick temper can rush and spoil things, so let important decisions sit overnight.",
          zh: "侧面看颧骨向前突出者自我主张与独立心强。在自己做决定而非听指挥的位置上发挥能力，适合创业、自由职业、专业人士。有聚人聚势之力，但性急易因赶而误事，重要决定搁置一天再定为好。",
          ja: "横から見て頬骨が前に際立つ相は自己主張と独立心が強いです。人の指示を受けるより自分で決める席で能力が出るので起業・フリーランス・専門職に向きます。人と勢力を集める力もありますが性格が急で物事を急いで損なうことがあるので、重要な決定は一日寝かせる習慣が良いでしょう。",
        },
      },
    ],
    tips: {
      ko: "광대는 정면에서 얼굴의 가장 넓은 부분이 어디인지, 옆에서 광대가 얼마나 앞으로 나왔는지, 그리고 뼈 위에 살이 얼마나 덮여 있는지를 봅니다. 가장 중요한 것은 코와의 균형입니다. 코가 높은데 광대가 낮으면 혼자 애쓰는 상, 광대가 높은데 코가 낮으면 남 좋은 일만 하는 상으로 보니, 둘이 어울려야 좋습니다. 광대뼈 위의 살은 인덕을 뜻하므로 볼이 너무 꺼지지 않게 관리하고, 웃을 때 광대가 올라가는 표정을 자주 지으면 대인운이 좋아진다고 합니다.",
      en: "From the front, find where the face is widest; from the side, how far the cheekbones come forward; and note how much flesh covers the bone. Balance with the nose matters most. A high nose with low cheekbones struggles alone; high cheekbones with a low nose labors for others' benefit; the two must suit each other. Flesh over the cheekbones stands for goodwill, so keep the cheeks from hollowing, and a frequent smile that lifts the cheeks is said to improve luck with people.",
      zh: "正面看脸最宽处在哪，侧面看颧骨前突多少，再看骨上覆盖多少肉。最重要的是与鼻的均衡。鼻高颧低者独自操劳，颧高鼻低者为他人作嫁，两者相配才好。颧骨上的肉主人缘，不要让脸颊过于凹陷；常做笑起来颧骨上提的表情，据说人缘会变好。",
      ja: "頬骨は正面から顔の最も広い部分がどこか、横から頬骨がどれだけ前に出ているか、そして骨の上に肉がどれだけ覆っているかを見ます。最も大切なのは鼻との均衡です。鼻が高いのに頬骨が低ければ一人で苦労する相、頬骨が高いのに鼻が低ければ人のためにばかり働く相と見るので、二つが釣り合ってこそ良いです。頬骨の上の肉は人徳を意味するので頬がこけすぎないように管理し、笑うときに頬骨が上がる表情を頻繁にすれば対人運が良くなるとされます。",
    },
    faq: [
      {
        question: { ko: "여자 광대가 튀어나오면 기가 세다는 말이 맞나요?", en: "Is it true that prominent cheekbones in women mean a strong will?", zh: "女性颧骨突出就气强是真的吗？", ja: "女性の頬骨が出ていると気が強いというのは本当ですか？" },
        answer: {
          ko: "옛 관상서에 그런 표현이 있는 것은 사실이지만, 이는 여성의 사회 활동이 제한되던 시대의 해석입니다. 현대 관상학은 남녀 구분 없이 광대를 사회적 활동력과 추진력으로 봅니다. 광대가 뚜렷한 여성은 직장과 사회에서 역할을 맡고 인정받는 힘이 강한 상이며, 살이 덮여 부드러우면 포용력까지 갖춘 가장 좋은 광대로 풀이합니다.",
          en: "Such wording does appear in the old texts, but it belongs to an age when women's social activity was restricted. Modern physiognomy reads cheekbones as social energy and drive regardless of sex. A woman with defined cheekbones has a strong capacity to take roles and win recognition at work and in society, and when flesh softens them it is the best kind of cheekbone, tolerance included.",
          zh: "古相书确有此类说法，但那是女性社会活动受限时代的解读。现代相学不分男女，把颧骨视为社会活动力与推动力。颧骨分明的女性在职场社会担当角色、获认可的力量强，若有肉覆盖而柔和，更是兼具包容力的最佳颧骨。",
          ja: "昔の相書にそうした表現があるのは事実ですが、これは女性の社会活動が制限されていた時代の解釈です。現代の人相学は男女の区別なく頬骨を社会的活動力と推進力と見ます。頬骨がはっきりした女性は職場と社会で役割を担い認められる力が強い相で、肉に覆われて柔らかければ包容力まで備えた最も良い頬骨と解釈します。",
        },
      },
      {
        question: { ko: "광대 축소 수술을 하면 운이 나빠지나요?", en: "Does cheekbone reduction surgery hurt your luck?", zh: "做颧骨缩小手术会影响运势吗？", ja: "頬骨の縮小手術をすると運が悪くなりますか？" },
        answer: {
          ko: "관상학에서 광대는 권력과 추진력의 자리라 '광대를 깎으면 세력이 준다'는 말이 있습니다. 다만 뾰족하게 드러나 사람과 부딪히던 광대가 부드러워지면 대인운이 좋아진다고도 보므로 일률적으로 나쁘다고 할 수 없습니다. 관상학의 기본은 '상은 마음을 따른다'이니, 수술 여부보다 자리에 맞는 태도와 표정이 운을 결정합니다.",
          en: "Because the cheekbones are the seat of power and drive, there is a saying that 'shaving the cheekbones shrinks your influence'. But sharp cheekbones that caused friction, once softened, are also read as improving luck with people, so it cannot be called bad across the board. The basic rule of physiognomy is that 'the face follows the heart', so attitude and expression suited to your position decide fortune more than any surgery.",
          zh: "相学中颧骨主权力与推动力，有“削颧则势减”之说。但原本尖露、易与人冲突的颧骨变柔和后人缘会变好，不能一概说坏。相学的根本是“相由心生”，比起是否手术，与位置相称的态度和表情才决定运势。",
          ja: "人相学で頬骨は権力と推進力の場所なので「頬骨を削れば勢力が減る」という言葉があります。ただ尖って現れて人とぶつかっていた頬骨が柔らかくなれば対人運が良くなるとも見るので、一律に悪いとは言えません。人相学の基本は「相は心に従う」なので、手術の有無より席に合った態度と表情が運を決めます。",
        },
      },
      {
        question: { ko: "광대가 없으면 출세를 못 하나요?", en: "Can you not succeed without defined cheekbones?", zh: "没有颧骨就不能出人头地吗？", ja: "頬骨がないと出世できないのですか？" },
        answer: {
          ko: "아닙니다. 광대는 '권력을 쥐는 힘'을 보는 자리일 뿐, 출세의 길은 여러 가지입니다. 광대가 낮은 사람은 경쟁보다 조화를 택하는 성향이라 전문 기술, 연구, 창작, 참모 역할에서 크게 성취합니다. 관상학에서는 이마(관록궁)와 눈빛이 좋으면 광대가 낮아도 윗사람의 추천으로 높이 오른다고 풀이합니다. 자기 자리를 아는 것이 광대 모양보다 중요합니다.",
          en: "No. The cheekbones show only the power to hold authority, and there are many roads to success. People with low cheekbones prefer harmony to competition and achieve greatly in technical skill, research, creation and advisory roles. Physiognomy holds that a good forehead and clear eyes carry you high through seniors' recommendation even with low cheekbones. Knowing your place matters more than the shape of your cheekbones.",
          zh: "不是。颧骨只看“掌权之力”，出人头地的路有很多。颧骨低者倾向和谐而非竞争，在专业技术、研究、创作、参谋角色上大有成就。相学认为额（官禄宫）与眼神好，即使颧骨低也能靠上位者推荐而高升。知道自己的位置比颧骨形状更重要。",
          ja: "いいえ。頬骨は「権力を握る力」を見る場所にすぎず、出世の道はいろいろあります。頬骨が低い人は競争より調和を選ぶ性向なので専門技術、研究、創作、参謀の役割で大きく成し遂げます。人相学では額（官禄宮）と目の光が良ければ頬骨が低くても目上の推薦で高く上がると解釈します。自分の席を知ることが頬骨の形より重要です。",
        },
      },
    ],
    relatedTypes: ["leadership-wealth", "leadership-health", "health-leadership", "wealth-leadership"],
  },
];

/** id 로 가이드 부위를 찾는다 */
export function getFaceGuidePart(id: string): FaceGuidePart | undefined {
  return faceGuideParts.find((p) => p.id === id);
}

/** 테스트 부위 id(faceFeatures[].id)로 그 부위를 다루는 가이드를 찾는다. 테스트에서 묻지 않는 부위(이마·눈썹 등)는 undefined */
export function getFaceGuidePartByFeature(featureId: string): FaceGuidePart | undefined {
  return faceGuideParts.find((p) => p.featureId === featureId);
}

// =====================================================================
// 허브 페이지(/face-reading/guide) 소개글
// =====================================================================

export const faceGuideHub = {
  title: {
    ko: "관상 보는 법 총정리 | 부위별 관상 가이드와 관상 유형 30종",
    en: "Korean Face Reading Guide | Every Feature and All 30 Face Types",
    zh: "面相怎么看 总整理 | 分部位面相指南与30种面相类型",
    ja: "人相の見方まとめ | 部位別人相ガイドと人相タイプ30種",
  },
  description: {
    ko: "눈·코·입·이마·눈썹·귀·턱·광대·얼굴형·점, 부위별 관상 보는 법과 관상 유형 30종을 한 곳에 정리했습니다. 읽고 나서 무료 관상 테스트로 내 유형을 바로 확인해 보세요.",
    en: "Eyes, nose, mouth, forehead, brows, ears, chin, cheekbones, face shape and moles: how to read each feature, plus all 30 face types, in one place. Then take the free face reading test.",
    zh: "眼、鼻、嘴、额、眉、耳、下巴、颧骨、脸型、痣，分部位的面相看法与30种面相类型一站整理。读完后用免费面相测试立即确认自己的类型。",
    ja: "目・鼻・口・額・眉・耳・顎・頬骨・顔の形・ほくろ、部位別の人相の見方と人相タイプ30種を一か所にまとめました。読んだあと無料の人相テストで自分のタイプをすぐ確認してみてください。",
  },
  keywords: {
    ko: ["관상 보는 법", "관상 가이드", "관상 종류", "관상 유형", "무료 관상 테스트", "관상 분석", "관상학"],
    en: ["korean face reading", "face reading guide", "physiognomy guide", "face reading types", "free face reading test"],
    zh: ["面相怎么看", "面相指南", "面相类型", "免费面相测试"],
    ja: ["人相の見方", "人相ガイド", "人相タイプ", "無料人相テスト"],
  },
  heading: {
    ko: "관상 보는 법: 부위별 가이드와 유형 30종",
    en: "How to Read a Face: Feature Guides and 30 Types",
    zh: "面相怎么看：分部位指南与30种类型",
    ja: "人相の見方：部位別ガイドとタイプ30種",
  },
  /** 소개글 (한국어 800자 이상) */
  intro: {
    ko: "관상(觀相)은 얼굴의 생김새로 타고난 기질과 운의 흐름을 읽는 동양의 오래된 지혜입니다. 중국 송나라 때 정리된 마의상서(麻衣相書)와 명나라의 신상전편(神相全篇), 조선에서 널리 읽힌 유장상법(柳莊相法) 같은 책들이 그 바탕이며, 우리나라에서는 조선 시대 과거 시험이나 혼담에서도 관상을 참고했을 만큼 생활 가까이에 있었습니다. 관상학은 얼굴을 이마·코·턱의 삼정(三停)으로 나누어 초년·중년·말년의 운을 보고, 눈·눈썹·코·입·귀의 오관(五官)으로 지혜·형제·재물·복·건강을 읽습니다.\n\n이 가이드는 그 내용을 부위별로 나누어 누구나 거울을 보며 따라 할 수 있게 정리했습니다. 눈 관상에서는 눈 모양과 눈빛으로 보는 마음과 중년운을, 코 관상에서는 재물창고라 불리는 코의 해석을, 입 관상에서는 말년운과 말의 복을 다룹니다. 이마와 눈썹, 귀, 턱, 광대, 얼굴형까지 각 부위가 맡은 나이와 운, 형태별 해석, 자주 묻는 질문을 함께 담았고, 얼굴 점 관상은 위치별 의미와 복점·흉점을 가리는 법을 따로 정리했습니다.\n\n부위별 해석을 모두 합치면 하나의 '관상 유형'이 됩니다. 이 사이트의 관상 테스트는 재물운·지혜운·출세운·인덕·건강운·복운 여섯 가지 가운데 가장 강한 두 가지를 찾아 30가지 유형으로 나눕니다. 부귀장수상, 학자관운상, 인덕복상처럼 옛 관상서의 이름을 딴 각 유형에는 설명과 타고난 장점, 관상가의 조언, 어울리는 유형이 함께 실려 있습니다. 아래 목록에서 궁금한 부위와 유형을 먼저 읽어 보고, 얼굴형·이마·눈·코·입·턱 여섯 가지를 고르는 1분 테스트로 내 유형을 확인해 보세요.\n\n한 가지만 기억해 주세요. 관상학은 '상은 마음을 따라 바뀐다(相由心生)'는 말로 끝납니다. 타고난 얼굴보다 오늘의 표정과 태도가 운을 만든다는 뜻입니다. 이 가이드가 내 얼굴의 강점을 알고 그 강점으로 사는 데 작은 도움이 되기를 바랍니다.",
    en: "Face reading, called gwansang in Korea, is an old East Asian wisdom that reads inborn temperament and the flow of fortune from the features of the face. It rests on books such as the Mayi Xiangfa compiled in Song-dynasty China, the Shenxiang Quanbian of the Ming, and the Liuzhuang Xiangfa widely read in Joseon Korea, where face reading was consulted even for civil-service candidates and marriage proposals. Physiognomy divides the face into three zones, forehead, nose and chin, for early, middle and later life, and reads the five organs, eyes, brows, nose, mouth and ears, for wisdom, siblings, wealth, blessings and health.\n\nThis guide sorts that body of knowledge by feature so that anyone can follow it in a mirror. The eye guide covers the heart and midlife fortune seen in eye shape and gaze; the nose guide explains the 'treasury' of the face; the mouth guide covers later-life fortune and the blessings of speech. Forehead, brows, ears, chin, cheekbones and face shape each come with the ages and fortunes they govern, readings by shape and frequently asked questions, and a separate guide on face moles explains meaning by position and how to tell lucky from unlucky moles.\n\nPut all the feature readings together and you get a single 'face type'. The test on this site finds the two strongest of six fortunes, wealth, wisdom, success, relationships, health and luck, and sorts faces into 30 types. Each type, named after the old texts, such as Wealth and Longevity, Scholar Official or Virtuous Blessing, comes with a description, natural strengths, a reader's advice and compatible types. Read the features and types you are curious about below, then take the one-minute test, choosing face shape, forehead, eyes, nose, mouth and chin, to find your own type.\n\nRemember one thing. Physiognomy ends with the saying 'the face follows the heart': today's expression and attitude make fortune more than the face you were born with. We hope this guide helps you know the strengths in your face and live by them.",
    zh: "面相（观相）是以脸部样貌解读天生气质与运势走向的东方古老智慧。其基础是宋代整理的《麻衣相法》、明代的《神相全编》以及在朝鲜广为流传的《柳庄相法》等书，朝鲜时代科举与议婚时也会参考面相，可见其贴近生活。相学把脸分为额、鼻、下巴三停看早中晚年运，以眼、眉、鼻、口、耳五官看智慧、兄弟、财富、福气、健康。\n\n本指南把这些内容按部位整理，人人都能对着镜子照着看。眼相讲从眼型与眼神看心与中年运，鼻相讲被称为财库的鼻子的解读，口相讲晚年运与言语之福。额、眉、耳、下巴、颧骨、脸型各部位所主的年龄与运势、形状解读、常见问题一并收录，痣相则单独整理了位置含义与吉凶痣的区分。\n\n把各部位解读合起来就是一个“面相类型”。本站的面相测试从财运、智慧运、官运、人缘、健康运、福气六项中找出最强的两项，分为30种类型。富贵长寿相、学者官运相、人德福相等以古相书命名的每种类型，都附有说明、天生优点、相师建议与相合类型。先在下方读你关心的部位与类型，再用选择脸型、额头、眼、鼻、嘴、下巴的一分钟测试确认自己的类型。\n\n请记住一点：相学以“相由心生”作结，意思是今天的表情与态度比天生的脸更能造运。愿本指南帮你认识自己脸上的优点，并靠它生活。",
    ja: "人相（観相）は顔の造作から生まれつきの気質と運の流れを読む東洋の古い知恵です。中国宋代にまとめられた麻衣相法、明代の神相全編、朝鮮で広く読まれた柳荘相法などがその土台で、朝鮮時代には科挙や縁談でも人相を参考にしたほど生活に近いものでした。人相学は顔を額・鼻・顎の三停に分けて初年・中年・晩年の運を見て、目・眉・鼻・口・耳の五官で知恵・兄弟・財・福・健康を読みます。\n\nこのガイドはその内容を部位ごとに分け、誰でも鏡を見ながら辿れるようにまとめました。目の人相では目の形と目の光で見る心と中年運を、鼻の人相では財の蔵と呼ばれる鼻の解釈を、口の人相では晩年運と言葉の福を扱います。額と眉、耳、顎、頬骨、顔の形まで各部位が受け持つ年齢と運、形ごとの解釈、よくある質問を一緒に収め、顔のほくろ占いは位置ごとの意味と福ぼくろ・凶ぼくろの見分け方を別にまとめました。\n\n部位ごとの解釈をすべて合わせると一つの「人相タイプ」になります。このサイトの人相テストは財運・知恵運・出世運・人徳・健康運・福運の六つのうち最も強い二つを見つけて30のタイプに分けます。富貴長寿相、学者官運相、人徳福相のように昔の相書の名を取った各タイプには説明と生まれ持った長所、観相家の助言、相性の良いタイプが載っています。下の一覧で気になる部位とタイプを先に読み、顔の形・額・目・鼻・口・顎の六つを選ぶ1分テストで自分のタイプを確認してみてください。\n\n一つだけ覚えておいてください。人相学は「相は心に由って生ず」という言葉で終わります。生まれつきの顔より今日の表情と態度が運を作るという意味です。このガイドが自分の顔の強みを知り、その強みで生きる小さな助けになることを願っています。",
  },
  faq: [
    {
      question: { ko: "관상은 과학적 근거가 있나요?", en: "Is face reading scientifically proven?", zh: "面相有科学依据吗？", ja: "人相に科学的根拠はありますか？" },
      answer: {
        ko: "관상학은 과학이 아니라 수천 년 동안 쌓인 경험적 해석의 체계입니다. 얼굴 생김새가 운명을 결정한다는 증거는 없지만, 표정과 인상이 사람 관계에 영향을 준다는 점은 심리학에서도 널리 인정됩니다. 이 사이트의 관상 콘텐츠는 재미와 자기 이해를 위한 참고 자료이며, 의학적·법적·재정적 판단의 근거로 쓰여서는 안 됩니다.",
        en: "Physiognomy is not a science but a system of experiential readings built up over thousands of years. There is no evidence that features decide destiny, though psychology widely accepts that expression and impression affect relationships. The face reading content on this site is for fun and self-understanding and must not be used as a basis for medical, legal or financial decisions.",
        zh: "相学不是科学，而是数千年积累的经验性解读体系。没有证据表明容貌决定命运，但表情与印象影响人际关系这一点在心理学中被广泛认可。本站面相内容仅供娱乐与自我了解，不应作为医疗、法律、财务判断的依据。",
        ja: "人相学は科学ではなく、数千年にわたって積み重ねられた経験的な解釈の体系です。顔立ちが運命を決めるという証拠はありませんが、表情と印象が人間関係に影響するという点は心理学でも広く認められています。このサイトの人相コンテンツは楽しみと自己理解のための参考資料で、医学的・法的・財政的判断の根拠に使ってはいけません。",
      },
    },
    {
      question: { ko: "관상 테스트는 어떻게 진행되나요?", en: "How does the face reading test work?", zh: "面相测试怎么进行？", ja: "人相テストはどのように進みますか？" },
      answer: {
        ko: "얼굴형·이마·눈·코·입·턱 여섯 부위에서 거울을 보며 가장 가까운 모양을 하나씩 고르면 됩니다. 사진을 올리면 브라우저 안에서 얼굴 특징을 자동으로 읽어 주는 방식도 있으며, 사진은 서버로 전송되지 않습니다. 결과는 30가지 관상 유형 가운데 하나로 나오고, 부위별 풀이와 여섯 가지 운세 등급, 오늘의 관상 운세까지 함께 볼 수 있습니다.",
        en: "Look in a mirror and pick the closest shape for each of six features: face shape, forehead, eyes, nose, mouth and chin. You can also upload a photo and let the browser read the features automatically; the photo never leaves your device. The result is one of 30 face types, with readings by feature, grades for six fortunes and a daily face fortune.",
        zh: "对着镜子在脸型、额头、眼、鼻、嘴、下巴六个部位各选一个最接近的形状即可。也可以上传照片，由浏览器自动读取脸部特征，照片不会上传到服务器。结果为30种面相类型之一，并附分部位解读、六项运势等级和今日面相运势。",
        ja: "顔の形・額・目・鼻・口・顎の六つの部位で鏡を見ながら最も近い形を一つずつ選ぶだけです。写真を上げるとブラウザ内で顔の特徴を自動で読み取る方式もあり、写真はサーバーに送られません。結果は30の人相タイプのうち一つで、部位ごとの解説と六つの運勢等級、今日の人相運勢まで一緒に見られます。",
      },
    },
    {
      question: { ko: "관상 유형 30종은 어떻게 나뉘나요?", en: "How are the 30 face types divided?", zh: "30种面相类型如何划分？", ja: "人相タイプ30種はどのように分かれますか？" },
      answer: {
        ko: "여섯 가지 운(재물·지혜·출세·인덕·건강·복) 가운데 가장 강한 운과 두 번째로 강한 운의 조합으로 나뉩니다. 6 × 5 = 30가지이며, 예를 들어 재물운이 1등이고 건강운이 2등이면 부귀장수상, 지혜운이 1등이고 출세운이 2등이면 학자관운상이 됩니다. 각 유형 페이지에서 설명과 장점, 어울리는 유형, 그 유형이 나오기 쉬운 얼굴 특징을 볼 수 있습니다.",
        en: "By the combination of the strongest and second-strongest of six fortunes: wealth, wisdom, success, relationships, health and luck. Six times five gives 30. For example, wealth first and health second is Wealth and Longevity; wisdom first and success second is Scholar Official. Each type page shows the description, strengths, compatible types and the features that tend to produce that type.",
        zh: "按六项运势（财、智、官、人缘、健康、福）中最强与次强的组合划分，6×5=30种。例如财运第一、健康运第二为富贵长寿相，智慧运第一、官运第二为学者官运相。各类型页面可查看说明、优点、相合类型以及容易得出该类型的脸部特征。",
        ja: "六つの運（財・知恵・出世・人徳・健康・福）のうち最も強い運と二番目に強い運の組み合わせで分かれます。6×5＝30種で、例えば財運が1位で健康運が2位なら富貴長寿相、知恵運が1位で出世運が2位なら学者官運相になります。各タイプのページで説明と長所、相性の良いタイプ、そのタイプが出やすい顔の特徴を見られます。",
      },
    },
  ],
};

// =====================================================================
// 가이드·유형 페이지 공용 UI 문구
// =====================================================================

export const faceGuideTexts = {
  guideCrumb: { ko: "관상 가이드", en: "Face Reading Guide", zh: "面相指南", ja: "人相ガイド" },
  faceReadingCrumb: { ko: "관상 분석", en: "Face Reading", zh: "面相分析", ja: "人相占い" },
  typesCrumb: { ko: "관상 유형", en: "Face Types", zh: "面相类型", ja: "人相タイプ" },
  /** 기존 /face-reading 랜딩 하단에 붙는 한 줄 링크 */
  landingLink: {
    ko: "부위별 관상 보는 법과 관상 유형 30종 보기",
    en: "Read the feature guides and all 30 face types",
    zh: "查看分部位面相看法与30种面相类型",
    ja: "部位別の人相の見方と人相タイプ30種を見る",
  },
  /** 결과 화면(ResultScreen)에서 유형 페이지(/face-reading/types/{id})로 가는 링크 */
  resultTypeLink: { ko: "이 유형 자세히 보기", en: "Read more about this type", zh: "详细了解此类型", ja: "このタイプを詳しく見る" },
  /** 결과 화면 "부위별 풀이"의 부위 제목 링크에 붙는 접근성 설명 (예: "눈 관상 가이드 보기") */
  resultPartLink: { ko: "관상 가이드 보기", en: "face reading guide", zh: "面相指南", ja: "人相ガイドを見る" },
  ctaAnalyze: { ko: "내 관상 분석해 보기", en: "Analyze my face", zh: "分析我的面相", ja: "自分の人相を分析する" },
  ctaMine: { ko: "나도 분석해 보기", en: "Get my own reading", zh: "我也要分析", ja: "私も分析してみる" },
  ctaSub: {
    ko: "회원가입 없이 1분이면 끝나는 무료 관상 테스트",
    en: "A free one-minute face reading test, no sign-up",
    zh: "无需注册，一分钟完成的免费面相测试",
    ja: "会員登録なしで1分で終わる無料の人相テスト",
  },
  meaningSection: { ko: "전통 관상학에서의 의미", en: "Meaning in traditional physiognomy", zh: "传统相学中的含义", ja: "伝統的な人相学での意味" },
  shapesSection: { ko: "형태별 해석", en: "Readings by shape", zh: "按形状解读", ja: "形ごとの解釈" },
  tipsSection: { ko: "보는 법과 주의할 점", en: "How to read it and what to watch", zh: "看法与注意事项", ja: "見方と注意点" },
  faqSection: { ko: "자주 묻는 질문", en: "Frequently asked questions", zh: "常见问题", ja: "よくある質問" },
  relatedTypesSection: { ko: "관련 관상 유형", en: "Related face types", zh: "相关面相类型", ja: "関連する人相タイプ" },
  otherPartsSection: { ko: "다른 부위 관상 보기", en: "Other features", zh: "看其他部位", ja: "他の部位の人相を見る" },
  testAsksThis: {
    ko: "관상 테스트에서 이 부위를 직접 고릅니다",
    en: "The test asks you to choose this feature",
    zh: "面相测试中会直接选择这个部位",
    ja: "人相テストでこの部位を直接選びます",
  },
  partsSection: { ko: "부위별 관상 가이드", en: "Face reading by feature", zh: "分部位面相指南", ja: "部位別人相ガイド" },
  typesSection: { ko: "관상 유형 30종", en: "All 30 face types", zh: "30种面相类型", ja: "人相タイプ30種" },
  aboutTestSection: { ko: "관상 테스트 소개", en: "About the test", zh: "面相测试介绍", ja: "人相テストについて" },
  primaryTrait: { ko: "가장 강한 운", en: "Strongest fortune", zh: "最强的运", ja: "最も強い運" },
  secondaryTrait: { ko: "두 번째 운", en: "Second fortune", zh: "第二强的运", ja: "二番目の運" },
  strengths: { ko: "타고난 장점", en: "Natural strengths", zh: "天生优点", ja: "生まれ持った長所" },
  advice: { ko: "관상가의 한마디", en: "A word from the reader", zh: "相师寄语", ja: "観相家からひと言" },
  luckyColor: { ko: "행운의 색", en: "Lucky color", zh: "幸运色", ja: "ラッキーカラー" },
  luckyDirection: { ko: "좋은 방향", en: "Lucky direction", zh: "吉方", ja: "吉方位" },
  goodMatch: { ko: "어울리는 유형", en: "Compatible types", zh: "相合类型", ja: "相性の良いタイプ" },
  featuresSection: {
    ko: "이 유형이 나오기 쉬운 얼굴 특징",
    en: "Features that tend to produce this type",
    zh: "容易得出此类型的脸部特征",
    ja: "このタイプが出やすい顔の特徴",
  },
  featuresNote: {
    ko: "관상 테스트의 여섯 부위에서 이 유형의 두 운이 가장 높게 나오는 선택지입니다.",
    en: "For each of the six test features, the option that scores highest on this type's two fortunes.",
    zh: "面相测试六个部位中，此类型两项运势得分最高的选项。",
    ja: "人相テストの六つの部位で、このタイプの二つの運が最も高く出る選択肢です。",
  },
  relatedGuidesSection: { ko: "관련 부위 가이드", en: "Related feature guides", zh: "相关部位指南", ja: "関連する部位ガイド" },
  otherTypesSection: { ko: "다른 관상 유형", en: "Other face types", zh: "其他面相类型", ja: "他の人相タイプ" },
  sameFamily: { ko: "같은 운이 1등인 유형", en: "Types with the same strongest fortune", zh: "同一首运的类型", ja: "同じ運が1位のタイプ" },
  allTypesLink: { ko: "유형 30종 모두 보기", en: "See all 30 types", zh: "查看全部30种类型", ja: "タイプ30種をすべて見る" },
  disclaimer: {
    ko: "관상 풀이는 동양 고전의 해석을 쉽게 풀어 쓴 재미와 자기 이해를 위한 참고 자료입니다. 의학적·과학적 판단의 근거가 아닙니다.",
    en: "These readings are plain-language versions of classical East Asian texts, offered for fun and self-understanding. They are not a basis for medical or scientific judgment.",
    zh: "面相解读是对东方古籍的通俗化诠释，仅供娱乐与自我了解，不作为医学或科学判断的依据。",
    ja: "人相の解釈は東洋古典の解釈をわかりやすく言い換えた、楽しみと自己理解のための参考資料です。医学的・科学的判断の根拠ではありません。",
  },
  home: { ko: "홈", en: "Home", zh: "首页", ja: "ホーム" },
};

// =====================================================================
// 유형 페이지(/face-reading/types/[type]) 보조 함수
// =====================================================================


/** 유형의 1등·2등 운 점수가 가장 높은 선택지를 부위마다 하나씩 고른다 ("이 유형이 나오기 쉬운 얼굴 특징") */
export function getTypeFeatureHighlights(result: FaceReadingResult): { feature: FaceFeature; option: FaceOption }[] {
  return faceFeatures.map((feature) => {
    const option = feature.options.reduce((best, opt) => {
      const score = (o: FaceOption) => o.traits[result.primaryTrait] * 2 + o.traits[result.secondaryTrait];
      return score(opt) > score(best) ? opt : best;
    }, feature.options[0]);
    return { feature, option };
  });
}

/** compatibility 문자열("학문재록상, 복혜겸전상")에 적힌 한국어 유형 이름을 실제 유형으로 바꾼다 */
export function getCompatibleTypes(result: FaceReadingResult): FaceReadingResult[] {
  return result.compatibility.ko
    .split(/[,，、]\s*/)
    .map((name) => faceReadingResults.find((r) => r.type.ko === name.trim()))
    .filter((r): r is FaceReadingResult => Boolean(r) && r!.id !== result.id);
}

/** 유형과 관련이 깊은 부위 가이드 (가이드의 relatedTypes 에 이 유형이 있으면 관련으로 본다) */
export function getGuidesForType(typeId: string): FaceGuidePart[] {
  return faceGuideParts.filter((p) => p.relatedTypes.includes(typeId));
}
