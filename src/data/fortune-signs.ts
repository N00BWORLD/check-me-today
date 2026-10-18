// 띠별·별자리별 오늘의 운세 정적 페이지 데이터
// - /fortune/zodiac/[animal] (띠 12종), /fortune/star/[sign] (별자리 12종) 의 SEO 본문
// - 허브 페이지(/fortune/zodiac, /fortune/star) 소개글과 공용 UI 문구
// - 이름 없이 띠(또는 별자리) + 오늘 날짜만으로 시드를 만드는 generateSignFortune()
// 한국어 문장을 기준으로 쓰고 다른 언어는 뜻을 맞춘다. 띠·별자리의 이름·이모지·한 줄 기운은 src/data/fortunes.ts 에 있다.
// 궁합 표현은 삼합·육합·충 같은 전통 명리의 일반적인 해석, 별자리는 4원소(불·흙·공기·물) 상성을 쉽게 풀어 쓴 것으로
// 재미와 참고를 위한 내용이며 과학적 근거가 아니다.

import {
  categoryTexts,
  fortuneKeywords,
  getStarSign,
  getZodiacAnimal,
  hashString,
  luckyColors,
  luckyDirections,
  overallScoreToLevel,
  overallTexts,
  pickScore,
  seededRandom,
  starSigns,
  zodiacAnimals,
  getLocalDateKey,
  type FortuneCategory,
  type LText,
  type StarSign,
  type ZodiacAnimal,
} from "./fortunes";

// ───────────────────────────── 경로 ─────────────────────────────
export const FORTUNE_PATH = "/fortune";
export const FORTUNE_ZODIAC_PATH = "/fortune/zodiac";
export const FORTUNE_STAR_PATH = "/fortune/star";

/** 띠·별자리 운세 페이지 콘텐츠 작성일 (JSON-LD·사이트맵 lastmod 용) */
export const FORTUNE_SIGNS_PUBLISHED = "2026-10-19";

export const getZodiacFortunePath = (animalId: string) => `${FORTUNE_ZODIAC_PATH}/${animalId}`;
export const getStarFortunePath = (signId: string) => `${FORTUNE_STAR_PATH}/${signId}`;

/** 띠 연도 목록의 범위 (양력 연도 기준) */
export const ZODIAC_YEAR_FROM = 1960;
export const ZODIAC_YEAR_TO = 2026;

// ───────────────────────────── 타입 ─────────────────────────────
export type SignKind = "zodiac" | "star";

export interface SignFaq {
  question: LText;
  answer: LText;
}

/** 띠·별자리 한 개의 SEO 본문 */
export interface SignGuide {
  /** zodiacAnimals / starSigns 의 id 와 같다 */
  id: string;
  /** 검색용 키워드 */
  keywords: { ko: string[]; en: string[] };
  /** 성격과 강점 (2~3문장) */
  personality: LText;
  /** 어울리는 사람·일 (1~2문장) */
  match: LText;
  /** 올해 흐름 (한 문단, 연도 고정 문구 없이) */
  yearFlow: LText;
  /** 자주 묻는 질문 2개 (FAQPage 구조화 데이터) */
  faq: SignFaq[];
}

export interface ZodiacGuide extends SignGuide {
  /** 지지 한자 (子丑寅…) */
  hanja: string;
}

export interface StarGuide extends SignGuide {
  /** 4원소 */
  element: LText;
}

// ───────────────────────────── 띠 12종 ─────────────────────────────
export const zodiacGuides: ZodiacGuide[] = [
  {
    id: "rat",
    hanja: "子",
    keywords: { ko: ["쥐띠 오늘의 운세", "쥐띠 운세", "쥐띠 성격", "쥐띠 궁합", "쥐띠 몇년생"], en: ["rat zodiac daily horoscope", "year of the rat personality"] },
    personality: {
      ko: "쥐띠는 눈치가 빠르고 상황 판단이 정확한 띠예요. 작은 변화도 먼저 알아채고, 위기 앞에서 길을 찾아내는 생존력이 강합니다. 사교성이 좋아 어디서든 금세 어울리지만 속마음은 쉽게 내보이지 않는 편이에요.",
      en: "People born in the Year of the Rat are quick-witted and read situations accurately. They notice small changes first and find a way out of any crisis. Sociable and quick to fit in, yet they rarely show their inner thoughts.",
      zh: "鼠年出生的人机敏灵活、判断准确。能最先察觉细微变化，在危机面前总能找到出路。善于社交，走到哪里都很快融入，但不轻易袒露内心。",
      ja: "子年生まれは機転が利き、状況判断が正確です。小さな変化にも先に気づき、危機の前でも道を見つける生存力があります。社交的でどこでもすぐに馴染みますが、本心は簡単には見せません。",
    },
    match: {
      ko: "꾸준하고 믿음직한 소띠, 스케일이 큰 용띠, 재치 있는 원숭이띠와 잘 어울립니다. 정보와 사람을 다루는 영업·기획·금융처럼 빠른 판단이 필요한 일에서 능력을 발휘해요.",
      en: "Rats pair well with the steady Ox, the ambitious Dragon and the witty Monkey. They thrive in sales, planning and finance, where quick judgment with people and information matters.",
      zh: "与踏实的牛、格局大的龙、机灵的猴最为相配。在销售、策划、金融等需要快速判断、处理信息和人际的工作中能发挥所长。",
      ja: "堅実な丑年、スケールの大きい辰年、機知に富む申年と相性が良いです。情報と人を扱う営業・企画・金融など、素早い判断が必要な仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "쥐띠의 올해는 모아 둔 것을 정리하고 다음 도약을 준비하는 흐름이에요. 상반기에는 인간관계에서 뜻밖의 도움을 받기 쉽고, 하반기로 갈수록 재물의 들고 남이 분명해집니다. 욕심을 조금 덜어 내고 확실한 것에 집중하면 연말에 손에 남는 것이 많아요. 건강은 수면 리듬만 지켜도 큰 탈이 없습니다.",
      en: "This year the Rat sorts out what it has gathered and prepares for the next leap. Unexpected help comes through relationships in the first half, and money flows become clearer toward the second half. Trim a little greed, focus on sure things, and you will end the year with more in hand. Health stays fine as long as your sleep rhythm holds.",
      zh: "鼠年出生的人今年是整理积累、准备下一次跃升的一年。上半年容易在人际关系中得到意外帮助，下半年财务进出会越来越清晰。少一点贪心，专注于有把握的事，年底手里留下的会更多。健康方面只要守住睡眠节奏就没有大碍。",
      ja: "子年の今年は、蓄えてきたものを整理し次の飛躍に備える流れです。上半期は人間関係から思わぬ助けを得やすく、下半期に向かうほどお金の出入りがはっきりします。欲を少し減らして確かなものに集中すれば、年末に手元に残るものが多いでしょう。健康は睡眠リズムさえ守れば大きな問題はありません。",
    },
    faq: [
      {
        question: { ko: "쥐띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Rat?", zh: "鼠和什么属相最配？", ja: "子年と相性の良い干支は？" },
        answer: {
          ko: "전통적으로 쥐띠는 용띠·원숭이띠(삼합)와 소띠(육합)와 잘 맞는다고 봅니다. 반대로 말띠와는 성향이 정반대(충)라 서로 이해하려는 노력이 필요하다고 풀이해요. 궁합은 참고일 뿐이고 실제 관계는 두 사람의 노력이 더 중요합니다.",
          en: "Traditionally the Rat harmonizes with the Dragon and Monkey (trine) and the Ox (secret friend). The Horse sits opposite, so that pairing takes more effort to understand each other. Compatibility is only a guide; real relationships depend on both people.",
          zh: "传统上鼠与龙、猴（三合）以及牛（六合）相配。与马相冲，性格相反，需要更多相互理解。属相配对仅供参考，真实关系更取决于双方努力。",
          ja: "伝統的に子年は辰年・申年（三合）と丑年（六合）と相性が良いとされます。反対に午年とは正反対（冲）で、互いを理解する努力が必要とされます。相性はあくまで参考で、実際の関係は二人の努力が大切です。",
        },
      },
      {
        question: { ko: "쥐띠가 조심해야 할 성격적 약점은 무엇인가요?", en: "What weaknesses should Rats watch out for?", zh: "鼠年出生的人要注意哪些性格弱点？", ja: "子年が気をつけたい性格の弱点は？" },
        answer: {
          ko: "눈치가 빠른 만큼 계산적으로 보일 수 있고, 걱정이 많아 작은 일에도 밤잠을 설치기 쉽습니다. 손해 보기 싫어하는 마음이 지나치면 좋은 인연을 놓칠 수 있으니, 가끔은 셈을 내려놓고 베푸는 연습이 운을 키워 줍니다.",
          en: "Being so perceptive can come across as calculating, and a worrying mind loses sleep over small things. If the dislike of losing out grows too strong, good connections slip away, so practicing generosity without keeping score grows your luck.",
          zh: "机敏有时会显得精于算计，心思重也容易为小事失眠。太怕吃亏会错过好缘分，偶尔放下计较、学会付出，反而能壮大运势。",
          ja: "機転が利く分、計算高く見られることがあり、心配性で小さなことでも眠れなくなりがちです。損をしたくない気持ちが強すぎると良い縁を逃すので、時には損得を手放して与える練習が運を育てます。",
        },
      },
    ],
  },
  {
    id: "ox",
    hanja: "丑",
    keywords: { ko: ["소띠 오늘의 운세", "소띠 운세", "소띠 성격", "소띠 궁합", "소띠 몇년생"], en: ["ox zodiac daily horoscope", "year of the ox personality"] },
    personality: {
      ko: "소띠는 묵묵히 끝까지 해내는 뚝심의 띠예요. 화려하지 않아도 맡은 일은 반드시 마무리하고, 한번 믿은 사람에게는 오래 의리를 지킵니다. 속도는 느려 보여도 쌓아 올린 것이 단단해 결국 큰 결실을 봅니다.",
      en: "The Ox is the sign of quiet persistence. Not flashy, but whatever it takes on gets finished, and loyalty once given lasts for years. It may look slow, yet what it builds is solid and bears large fruit in the end.",
      zh: "牛年出生的人踏实稳重、坚持到底。不张扬，但接手的事一定完成，对信任的人长久讲义气。看似节奏慢，积累却扎实，最终收获丰硕。",
      ja: "丑年は黙々と最後までやり遂げる粘りの干支です。派手さはなくても任された仕事は必ず仕上げ、一度信じた人には長く義理を守ります。歩みは遅く見えても積み上げたものが固く、最後には大きな実りを得ます。",
    },
    match: {
      ko: "성실한 뱀띠·닭띠, 그리고 재치로 균형을 맞춰 주는 쥐띠와 잘 맞습니다. 전문 기술, 제조, 농업, 회계처럼 꾸준함이 성과로 이어지는 분야에서 빛나요.",
      en: "The Ox matches the diligent Snake and Rooster, and the Rat whose wit balances it out. It shines in skilled trades, manufacturing, agriculture and accounting, where consistency turns into results.",
      zh: "与勤恳的蛇、鸡，以及用机智互补的鼠最为相配。在专业技术、制造、农业、会计等靠坚持出成果的领域大放异彩。",
      ja: "誠実な巳年・酉年、そして機知でバランスを取ってくれる子年と相性が良いです。専門技術、製造、農業、会計など、継続が成果につながる分野で輝きます。",
    },
    yearFlow: {
      ko: "소띠의 올해는 오래 공들인 일이 조금씩 인정받기 시작하는 흐름이에요. 봄에는 새로운 책임이 늘어 부담스럽지만, 그 일이 가을 이후 든든한 기반이 됩니다. 재물은 큰 투자보다 저축과 꾸준한 수입 쪽이 유리해요. 고집이 세지는 시기라 가까운 사람의 조언에 귀를 열어 두면 불필요한 다툼을 피할 수 있습니다.",
      en: "This year the Ox's long effort slowly starts earning recognition. New responsibilities in spring feel heavy, but they become a firm foundation after autumn. Money favors saving and steady income over big investments. Stubbornness runs high this year, so listening to those close to you avoids needless quarrels.",
      zh: "牛年出生的人今年长期用心的事开始逐渐得到认可。春天新增的责任让人压力不小，但秋后会成为稳固的基础。财运上储蓄和稳定收入比大额投资更有利。今年固执会加重，多听身边人的建议能避免不必要的争执。",
      ja: "丑年の今年は、長く手をかけてきたことが少しずつ認められ始める流れです。春は新しい責任が増えて重く感じますが、それが秋以降の頼もしい基盤になります。お金は大きな投資より貯蓄と安定収入が有利です。頑固になりやすい時期なので身近な人の助言に耳を開いておくと無用な争いを避けられます。",
    },
    faq: [
      {
        question: { ko: "소띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Ox?", zh: "牛和什么属相最配？", ja: "丑年と相性の良い干支は？" },
        answer: {
          ko: "소띠는 뱀띠·닭띠(삼합)와 쥐띠(육합)와 궁합이 좋다고 봅니다. 양띠와는 서로 고집이 부딪히는 충의 관계라 양보가 필요하다고 풀이해요. 어디까지나 전통적인 참고 기준입니다.",
          en: "The Ox is said to suit the Snake and Rooster (trine) and the Rat (secret friend). With the Goat, two stubborn natures clash, so give-and-take is needed. This is a traditional reference only.",
          zh: "牛与蛇、鸡（三合）和鼠（六合）相配。与羊相冲，彼此固执容易碰撞，需要互相让步。这只是传统参考。",
          ja: "丑年は巳年・酉年（三合）と子年（六合）と相性が良いとされます。未年とは互いの頑固さがぶつかる冲の関係で、譲り合いが必要とされます。あくまで伝統的な参考基準です。",
        },
      },
      {
        question: { ko: "소띠에게 어울리는 직업은 무엇인가요?", en: "What careers suit the Ox?", zh: "牛年出生的人适合什么职业？", ja: "丑年に向いている職業は？" },
        answer: {
          ko: "한 분야를 오래 파고드는 힘이 강해 기술직, 의료, 교육, 공직, 회계처럼 신뢰와 꾸준함이 중요한 일에 잘 맞습니다. 변화가 잦고 즉흥적인 환경보다는 규칙이 분명한 조직에서 더 큰 성과를 냅니다.",
          en: "With great staying power in one field, the Ox suits skilled trades, medicine, education, public service and accounting, where trust and consistency count. It performs better in a clearly structured organization than in a fast-changing, improvised one.",
          zh: "牛年出生的人深耕一个领域的能力强，适合技术、医疗、教育、公职、会计等重视信任与坚持的工作。比起多变随性的环境，在规则明确的组织里更能出成绩。",
          ja: "一つの分野を長く掘り下げる力が強く、技術職、医療、教育、公務、会計など信頼と継続が重要な仕事に向いています。変化が多く即興的な環境より、ルールが明確な組織でより大きな成果を出します。",
        },
      },
    ],
  },
  {
    id: "tiger",
    hanja: "寅",
    keywords: { ko: ["호랑이띠 오늘의 운세", "호랑이띠 운세", "호랑이띠 성격", "호랑이띠 궁합", "호랑이띠 몇년생", "범띠 운세"], en: ["tiger zodiac daily horoscope", "year of the tiger personality"] },
    personality: {
      ko: "호랑이띠는 추진력과 용기가 강한 띠예요. 결단이 필요한 순간에 가장 빛나고, 불의를 보면 참지 못하는 정의감이 있습니다. 리더 기질이 뚜렷해 사람들을 이끄는 자리에 자주 서지만, 급한 성격 때문에 손해를 보기도 해요.",
      en: "The Tiger is bold and driven. It shines brightest when a decision is needed and cannot stand by in the face of injustice. A natural leader who often ends up in charge, though a quick temper sometimes costs it.",
      zh: "虎年出生的人勇敢果断、行动力强。在需要决断的时刻最耀眼，见到不公难以坐视。天生的领导气质让他们常站在带领者的位置，但急躁也会让自己吃亏。",
      ja: "寅年は推進力と勇気に満ちた干支です。決断が必要な瞬間に最も輝き、不正を見過ごせない正義感があります。リーダー気質がはっきりしていて人を率いる立場に立つことが多いですが、せっかちな性格で損をすることもあります。",
    },
    match: {
      ko: "활동적인 말띠·개띠, 그리고 넉넉하게 받아 주는 돼지띠와 잘 어울립니다. 창업, 영업 총괄, 스포츠, 군·경처럼 결단과 추진력이 성과로 이어지는 일이 잘 맞아요.",
      en: "The Tiger pairs well with the active Horse and Dog, and the generous Pig who accepts it as it is. It suits entrepreneurship, sales leadership, sports and uniformed service, where decisiveness and drive produce results.",
      zh: "与活跃的马、狗，以及包容大度的猪最为相配。适合创业、销售统筹、体育、军警等靠决断与推动力出成绩的工作。",
      ja: "活動的な午年・戌年、そしておおらかに受け止めてくれる亥年と相性が良いです。起業、営業統括、スポーツ、軍・警察など決断と推進力が成果につながる仕事に向いています。",
    },
    yearFlow: {
      ko: "호랑이띠의 올해는 멈춰 있던 일이 다시 움직이기 시작하는 흐름이에요. 상반기에는 새로운 제안이나 자리 이동이 생기기 쉽고, 받아들일수록 판이 커집니다. 다만 여름 무렵에는 말이 앞서 오해를 사기 쉬우니 한 템포 늦게 대답하세요. 재물은 들어오는 만큼 나가기 쉬운 해라 큰돈은 가을 이후로 미루는 편이 안전합니다.",
      en: "This year things that had stalled start moving again for the Tiger. New offers or a change of position come easily in the first half, and the more you accept, the bigger the stage grows. Around summer, words outrun thought and cause misunderstandings, so answer a beat later. Money comes and goes quickly this year, so postpone large sums until after autumn.",
      zh: "虎年出生的人今年停滞的事重新转动起来。上半年容易出现新的提议或职位变动，越接受局面越大。但夏天前后容易言语抢先引起误会，回答时慢半拍。今年财运进得快出得也快，大额支出放到秋后更稳妥。",
      ja: "寅年の今年は、止まっていたことが再び動き出す流れです。上半期は新しい提案や配置換えが起きやすく、受け入れるほど舞台が大きくなります。ただ夏頃は言葉が先走って誤解を招きやすいので、ひと呼吸おいて答えて。お金は入る分だけ出やすい年なので、大きな出費は秋以降に回すのが安全です。",
    },
    faq: [
      {
        question: { ko: "호랑이띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Tiger?", zh: "虎和什么属相最配？", ja: "寅年と相性の良い干支は？" },
        answer: {
          ko: "호랑이띠는 말띠·개띠(삼합)와 돼지띠(육합)와 궁합이 좋다고 봅니다. 원숭이띠와는 기질이 정반대인 충의 관계라 서로 자존심을 세우기보다 역할을 나누는 지혜가 필요해요. 궁합은 전통적인 참고 기준이지 결론이 아닙니다.",
          en: "The Tiger suits the Horse and Dog (trine) and the Pig (secret friend). With the Monkey, opposite temperaments clash, so dividing roles works better than contests of pride. Compatibility is a traditional reference, not a verdict.",
          zh: "虎与马、狗（三合）和猪（六合）相配。与猴相冲，气质相反，与其较劲自尊不如分工合作。属相配对是传统参考，不是定论。",
          ja: "寅年は午年・戌年（三合）と亥年（六合）と相性が良いとされます。申年とは気質が正反対の冲の関係で、互いにプライドを張るより役割を分ける知恵が必要です。相性は伝統的な参考基準であって結論ではありません。",
        },
      },
      {
        question: { ko: "호랑이띠 운세에서 가장 중요한 조언은 무엇인가요?", en: "What is the key advice for Tigers?", zh: "对虎年出生的人最重要的建议是什么？", ja: "寅年の運勢で最も大事な助言は？" },
        answer: {
          ko: "호랑이띠는 기운이 강한 만큼 '속도 조절'이 운을 좌우합니다. 결정은 빠르게 하되 실행 전에 하루만 묵혀 보는 습관, 화가 날 때 바로 답하지 않는 습관만 지켜도 손해의 절반이 사라집니다. 혼자 다 짊어지려 하지 말고 믿을 만한 동료에게 일을 나누는 것도 중요해요.",
          en: "With such strong energy, pacing decides the Tiger's luck. Decide fast but let it sit a day before acting, and never reply while angry; those two habits alone remove half the losses. Sharing work with trusted colleagues instead of carrying everything alone matters too.",
          zh: "虎年出生的人气场强，“控制节奏”决定运势。决定可以快，但执行前先放一天；生气时不立刻回应，这两个习惯就能减掉一半损失。别一个人扛所有事，把工作分给可靠的同伴也很重要。",
          ja: "寅年は気が強い分、「速度調整」が運を左右します。決断は早くても実行前に一日寝かせる習慣、怒った時にすぐ返事をしない習慣を守るだけで損の半分が消えます。一人で全部背負わず、信頼できる仲間に仕事を分けることも大切です。",
        },
      },
    ],
  },
  {
    id: "rabbit",
    hanja: "卯",
    keywords: { ko: ["토끼띠 오늘의 운세", "토끼띠 운세", "토끼띠 성격", "토끼띠 궁합", "토끼띠 몇년생"], en: ["rabbit zodiac daily horoscope", "year of the rabbit personality"] },
    personality: {
      ko: "토끼띠는 섬세하고 분위기를 잘 읽는 띠예요. 다툼을 싫어해 부드럽게 조율하는 능력이 뛰어나고, 미적 감각과 예의가 몸에 배어 있습니다. 겉은 온순해 보여도 자기 영역은 조용히, 그러나 확실하게 지키는 편이에요.",
      en: "The Rabbit is gentle and reads the room well. Disliking conflict, it excels at smoothing things over, with refined taste and natural courtesy. Mild on the outside, it guards its own territory quietly but firmly.",
      zh: "兔年出生的人细腻敏感、善于察言观色。不喜争执，擅长温和协调，审美与礼貌浑然天成。外表温顺，却会安静而坚定地守住自己的领域。",
      ja: "卯年は繊細で空気を読むのが上手な干支です。争いを嫌い柔らかく調整する力に優れ、美的センスと礼儀が身についています。外見は穏やかでも自分の領域は静かに、しかし確実に守ります。",
    },
    match: {
      ko: "다정한 양띠·돼지띠, 그리고 성실하게 지켜 주는 개띠와 잘 맞습니다. 디자인, 상담, 서비스, 교육, 문화예술처럼 감각과 배려가 중요한 일에서 능력을 발휘해요.",
      en: "The Rabbit matches the affectionate Goat and Pig, and the loyal Dog who protects it. It thrives in design, counseling, service, education and the arts, where sensitivity and care matter.",
      zh: "与温情的羊、猪，以及忠诚守护的狗最为相配。在设计、咨询、服务、教育、文化艺术等重视感觉与体贴的工作中能发挥所长。",
      ja: "優しい未年・亥年、そして誠実に守ってくれる戌年と相性が良いです。デザイン、相談、サービス、教育、文化芸術など感性と気遣いが重要な仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "토끼띠의 올해는 사람 운이 열리는 흐름이에요. 새로운 모임이나 소개를 통해 오래갈 인연을 만나기 쉽고, 그 인연이 일의 기회로도 이어집니다. 다만 거절을 못 해 떠안는 일이 늘 수 있으니 가을에는 일정 정리가 필요해요. 재물은 꾸준히 들어오지만 분위기에 휩쓸린 소비를 조심하면 저축이 늘어납니다.",
      en: "This year people luck opens for the Rabbit. New gatherings and introductions bring lasting connections that also turn into work opportunities. Trouble saying no may pile up commitments, so tidy your schedule in autumn. Money comes in steadily, and avoiding mood-driven spending grows your savings.",
      zh: "兔年出生的人今年人缘运打开。通过新聚会或介绍容易遇到长久的缘分，这些缘分还会带来工作机会。但不会拒绝可能让你揽下太多事，秋天需要整理日程。财运稳定进账，少一些跟风消费，储蓄就会增加。",
      ja: "卯年の今年は人の運が開ける流れです。新しい集まりや紹介を通じて長く続く縁に出会いやすく、その縁が仕事の機会にもつながります。ただ断れずに抱え込む仕事が増えがちなので、秋には予定の整理が必要です。お金は安定して入りますが、雰囲気に流された消費に気をつければ貯蓄が増えます。",
    },
    faq: [
      {
        question: { ko: "토끼띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Rabbit?", zh: "兔和什么属相最配？", ja: "卯年と相性の良い干支は？" },
        answer: {
          ko: "토끼띠는 양띠·돼지띠(삼합)와 개띠(육합)와 궁합이 좋다고 봅니다. 닭띠와는 충의 관계로 서로 예민하게 반응하기 쉬우니 말투에 신경 쓰면 좋아요. 궁합은 참고 자료이고 관계의 결과는 두 사람이 만듭니다.",
          en: "The Rabbit suits the Goat and Pig (trine) and the Dog (secret friend). The Rooster sits opposite, so both tend to react sharply; minding your tone helps. Compatibility is a reference; the outcome is made by the two of you.",
          zh: "兔与羊、猪（三合）和狗（六合）相配。与鸡相冲，彼此容易敏感过度，注意说话语气会更好。属相配对仅供参考，关系的结果由两人共同创造。",
          ja: "卯年は未年・亥年（三合）と戌年（六合）と相性が良いとされます。酉年とは冲の関係で互いに敏感に反応しやすいので、言葉遣いに気をつけると良いでしょう。相性は参考資料で、関係の結果は二人が作ります。",
        },
      },
      {
        question: { ko: "토끼띠가 운을 키우려면 무엇을 해야 하나요?", en: "How can Rabbits grow their luck?", zh: "兔年出生的人如何提升运势？", ja: "卯年が運を育てるには？" },
        answer: {
          ko: "토끼띠는 마음이 편안할 때 운이 가장 잘 돕니다. 집과 작업 공간을 정돈하고, 사람 많은 자리 뒤에는 혼자 쉬는 시간을 꼭 확보하세요. 또 싫은 것을 분명히 말하는 연습이 쌓이면 불필요한 손해와 스트레스가 눈에 띄게 줄어듭니다.",
          en: "The Rabbit's luck flows best when its mind is at ease. Keep home and workspace tidy, and always reserve time alone after crowded events. Practicing saying clearly what you dislike noticeably cuts needless losses and stress.",
          zh: "兔年出生的人心境安稳时运势最旺。整理好家和工作空间，热闹场合之后一定留出独处时间。练习明确说出不喜欢的事，不必要的损失和压力会明显减少。",
          ja: "卯年は心が穏やかな時に運が最もよく巡ります。家と作業空間を整え、人の多い場の後には一人で休む時間を必ず確保しましょう。また嫌なことをはっきり言う練習を重ねると、無用な損失とストレスが目に見えて減ります。",
        },
      },
    ],
  },
  {
    id: "dragon",
    hanja: "辰",
    keywords: { ko: ["용띠 오늘의 운세", "용띠 운세", "용띠 성격", "용띠 궁합", "용띠 몇년생"], en: ["dragon zodiac daily horoscope", "year of the dragon personality"] },
    personality: {
      ko: "용띠는 스케일이 크고 존재감이 뚜렷한 띠예요. 큰 그림을 그리는 데 능하고, 자신감과 카리스마로 사람들을 끌어당깁니다. 이상이 높아 현실의 작은 일을 답답해하기도 하지만, 한번 목표를 정하면 주변까지 끌어올리는 힘이 있어요.",
      en: "The Dragon has grand scale and unmistakable presence. Skilled at seeing the big picture, it draws people in with confidence and charisma. High ideals can make small daily chores feel stifling, but once a goal is set it lifts everyone around it.",
      zh: "龙年出生的人格局开阔、气场强大。擅长谋划大局，用自信与魅力吸引众人。理想高远，有时对现实琐事感到憋闷，但一旦定下目标，就能带动周围的人一起向上。",
      ja: "辰年はスケールが大きく存在感がはっきりした干支です。大きな絵を描くのが得意で、自信とカリスマで人を引きつけます。理想が高く現実の細かいことをもどかしく感じることもありますが、一度目標を決めると周囲まで引き上げる力があります。",
    },
    match: {
      ko: "기민한 쥐띠·원숭이띠, 그리고 꼼꼼하게 뒷받침하는 닭띠와 잘 어울립니다. 경영, 기획, 정치, 연출, 대형 프로젝트 리더처럼 비전을 제시하는 자리에서 가장 빛나요.",
      en: "The Dragon pairs well with the agile Rat and Monkey, and the meticulous Rooster that backs it up. It shines most where vision is required: management, planning, politics, directing and leading large projects.",
      zh: "与敏捷的鼠、猴，以及细致支持的鸡最为相配。在经营、策划、政治、导演、大型项目负责人等需要提出愿景的位置上最为耀眼。",
      ja: "機敏な子年・申年、そして几帳面に支えてくれる酉年と相性が良いです。経営、企画、政治、演出、大型プロジェクトのリーダーなどビジョンを示す立場で最も輝きます。",
    },
    yearFlow: {
      ko: "용띠의 올해는 큰 결정을 내리기에 좋은 흐름이에요. 이직, 창업, 이사처럼 판을 바꾸는 선택이 봄과 가을에 특히 잘 풀립니다. 다만 자신감이 넘쳐 주변 의견을 가볍게 넘기기 쉬우니, 실행 전에 반대 의견을 일부러 들어 보세요. 재물은 투자보다 본업의 성장에서 크게 늘고, 건강은 과로와 수면 부족만 관리하면 됩니다.",
      en: "This year favors big decisions for the Dragon. Game-changing choices like a job move, a startup or relocation unfold especially well in spring and autumn. Overflowing confidence can brush aside others' views, so deliberately seek out objections before acting. Wealth grows most through your main work rather than investments, and health only needs care against overwork and lost sleep.",
      zh: "龙年出生的人今年适合做重大决定。换工作、创业、搬家等改变格局的选择在春季和秋季尤为顺利。但自信过头容易忽视周围意见，行动前要刻意听听反对的声音。财运主要来自本业成长而非投资，健康上只要管好过劳和睡眠不足即可。",
      ja: "辰年の今年は大きな決断に向いた流れです。転職、起業、引っ越しのように局面を変える選択が春と秋に特によく運びます。ただ自信にあふれて周囲の意見を軽く流しがちなので、実行前にあえて反対意見を聞いてみて。お金は投資より本業の成長で大きく増え、健康は過労と睡眠不足だけ管理すれば大丈夫です。",
    },
    faq: [
      {
        question: { ko: "용띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Dragon?", zh: "龙和什么属相最配？", ja: "辰年と相性の良い干支は？" },
        answer: {
          ko: "용띠는 쥐띠·원숭이띠(삼합)와 닭띠(육합)와 궁합이 좋다고 봅니다. 개띠와는 충의 관계로 가치관이 자주 부딪히지만, 서로의 정직함을 인정하면 오히려 든든한 사이가 되기도 해요. 궁합은 참고 기준일 뿐입니다.",
          en: "The Dragon suits the Rat and Monkey (trine) and the Rooster (secret friend). The Dog sits opposite and values often collide, yet mutual respect for each other's honesty can make a strong bond. Compatibility is only a guide.",
          zh: "龙与鼠、猴（三合）和鸡（六合）相配。与狗相冲，价值观常有碰撞，但若认可彼此的正直，反而能成为可靠的伙伴。属相配对仅供参考。",
          ja: "辰年は子年・申年（三合）と酉年（六合）と相性が良いとされます。戌年とは冲の関係で価値観がよくぶつかりますが、互いの正直さを認めればかえって頼もしい仲になることもあります。相性はあくまで参考基準です。",
        },
      },
      {
        question: { ko: "용띠가 실패하기 쉬운 상황은 무엇인가요?", en: "When do Dragons tend to stumble?", zh: "龙年出生的人在什么情况下容易失败？", ja: "辰年が失敗しやすい状況は？" },
        answer: {
          ko: "용띠는 큰 목표에 비해 세부 계획이 허술할 때 실패합니다. 돈과 시간의 계산을 남에게 맡기거나, 칭찬에 취해 검증을 건너뛰는 순간이 위험해요. 비전은 용띠가 세우되 실행 점검은 꼼꼼한 사람과 짝을 이루면 성공 확률이 크게 올라갑니다.",
          en: "Dragons stumble when detailed planning lags behind big goals. Leaving money and time calculations to others, or skipping verification while flattered by praise, is the danger zone. Let the Dragon set the vision but pair with a meticulous partner for execution checks, and success odds rise sharply.",
          zh: "龙年出生的人在目标宏大而细节计划粗糙时容易失败。把钱和时间的计算交给别人，或被称赞冲昏头跳过验证的时刻最危险。愿景由龙来定，执行检查交给细致的人搭档，成功率会大幅提升。",
          ja: "辰年は大きな目標に比べて細かい計画が甘い時に失敗します。お金と時間の計算を人任せにしたり、褒め言葉に酔って検証を飛ばす瞬間が危険です。ビジョンは辰年が立て、実行チェックは几帳面な人と組めば成功確率が大きく上がります。",
        },
      },
    ],
  },
  {
    id: "snake",
    hanja: "巳",
    keywords: { ko: ["뱀띠 오늘의 운세", "뱀띠 운세", "뱀띠 성격", "뱀띠 궁합", "뱀띠 몇년생"], en: ["snake zodiac daily horoscope", "year of the snake personality"] },
    personality: {
      ko: "뱀띠는 깊이 생각하고 조용히 움직이는 지혜의 띠예요. 말수는 적어도 관찰력이 뛰어나 사람과 상황의 본질을 꿰뚫어 봅니다. 신중한 만큼 한번 결정하면 흔들리지 않고, 세련된 취향과 집중력으로 전문 분야에서 두각을 나타내요.",
      en: "The Snake is the sign of quiet wisdom. Few words, but keen observation that sees straight to the core of people and situations. Deliberate by nature, it does not waver once decided, and its refined taste and focus make it stand out in specialized fields.",
      zh: "蛇年出生的人深思熟虑、行事低调。话不多却观察力极强，能看透人和事的本质。谨慎而一旦决定便不动摇，凭借精致的品味与专注力在专业领域崭露头角。",
      ja: "巳年は深く考え静かに動く知恵の干支です。口数は少なくても観察力に優れ、人と状況の本質を見抜きます。慎重な分、一度決めると揺るがず、洗練された趣味と集中力で専門分野で頭角を現します。",
    },
    match: {
      ko: "성실한 소띠·닭띠, 그리고 재치로 분위기를 풀어 주는 원숭이띠와 잘 맞습니다. 연구, 의료, 법률, 금융 분석, 예술처럼 깊이와 집중이 필요한 일에서 능력을 발휘해요.",
      en: "The Snake matches the diligent Ox and Rooster, and the witty Monkey who lightens the mood. It excels in research, medicine, law, financial analysis and the arts, where depth and focus are required.",
      zh: "与勤恳的牛、鸡，以及用机智活跃气氛的猴最为相配。在研究、医疗、法律、金融分析、艺术等需要深度与专注的工作中能发挥所长。",
      ja: "誠実な丑年・酉年、そして機知で場を和ませてくれる申年と相性が良いです。研究、医療、法律、金融分析、芸術など深さと集中が必要な仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "뱀띠의 올해는 안에서 쌓은 실력이 밖으로 드러나는 흐름이에요. 조용히 준비해 온 일이 상반기 끝 무렵 인정받기 시작하고, 하반기에는 그 성과를 바탕으로 더 좋은 조건의 제안이 옵니다. 다만 의심이 깊어지는 시기라 가까운 사람까지 밀어내지 않도록 마음을 조금 열어 두세요. 재물은 안정적이지만 남의 말만 믿은 투자는 피하는 것이 좋습니다.",
      en: "This year the Snake's inner skill becomes visible outside. Quietly prepared work starts earning recognition near the end of the first half, and better offers follow in the second half on that record. Suspicion deepens this year, so keep your heart a little open and do not push away those close to you. Money stays stable, but avoid investments made on someone else's word alone.",
      zh: "蛇年出生的人今年内在积累的实力开始显现于外。默默准备的事在上半年末开始得到认可，下半年会以此为基础迎来条件更好的提议。但今年疑心容易加重，别把亲近的人也推开，心要稍微打开。财运稳定，但要避免只听别人一面之词的投资。",
      ja: "巳年の今年は内側で積んだ実力が外に現れる流れです。静かに準備してきたことが上半期の終わり頃に認められ始め、下半期にはその成果をもとにより良い条件の提案が来ます。ただ疑い深くなる時期なので、身近な人まで遠ざけないよう心を少し開いておいて。お金は安定していますが、人の言葉だけを信じた投資は避けた方が良いでしょう。",
    },
    faq: [
      {
        question: { ko: "뱀띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Snake?", zh: "蛇和什么属相最配？", ja: "巳年と相性の良い干支は？" },
        answer: {
          ko: "뱀띠는 소띠·닭띠(삼합)와 원숭이띠(육합)와 궁합이 좋다고 봅니다. 돼지띠와는 충의 관계로 생활 리듬이 달라 맞춰 가는 시간이 필요해요. 전통적인 참고 기준이며 실제 관계를 결정하지는 않습니다.",
          en: "The Snake suits the Ox and Rooster (trine) and the Monkey (secret friend). The Pig sits opposite, with different life rhythms that take time to align. This is a traditional reference and does not decide real relationships.",
          zh: "蛇与牛、鸡（三合）和猴（六合）相配。与猪相冲，生活节奏不同，需要时间磨合。这只是传统参考，不决定真实关系。",
          ja: "巳年は丑年・酉年（三合）と申年（六合）と相性が良いとされます。亥年とは冲の関係で生活リズムが違い、合わせていく時間が必要です。伝統的な参考基準であり、実際の関係を決めるものではありません。",
        },
      },
      {
        question: { ko: "뱀띠의 재물운은 어떤 특징이 있나요?", en: "What is distinctive about the Snake's money luck?", zh: "蛇年出生的人财运有什么特点？", ja: "巳年の金運の特徴は？" },
        answer: {
          ko: "뱀띠는 전통적으로 돈을 모으고 지키는 힘이 강한 띠로 봅니다. 충동구매가 적고 장기적인 계획에 강해 저축과 자산 관리에 유리해요. 다만 지나치게 신중해 좋은 기회를 놓치기도 하니, 충분히 조사한 뒤에는 결단을 미루지 않는 것이 재물운을 키우는 길입니다.",
          en: "Traditionally the Snake is strong at gathering and keeping money. Few impulse buys and a talent for long-term planning favor saving and asset management. Excess caution can miss good chances though, so once research is done, do not delay the decision; that is how the Snake grows its wealth.",
          zh: "传统上蛇年出生的人聚财守财能力强。很少冲动消费，擅长长期规划，有利于储蓄和资产管理。但过于谨慎也会错过好机会，充分调查后就不要拖延决定，这是壮大财运之道。",
          ja: "巳年は伝統的にお金を貯めて守る力が強い干支とされます。衝動買いが少なく長期的な計画に強いので貯蓄と資産管理に有利です。ただ慎重すぎて良い機会を逃すこともあるので、十分に調べた後は決断を先延ばしにしないことが金運を育てる道です。",
        },
      },
    ],
  },
  {
    id: "horse",
    hanja: "午",
    keywords: { ko: ["말띠 오늘의 운세", "말띠 운세", "말띠 성격", "말띠 궁합", "말띠 몇년생"], en: ["horse zodiac daily horoscope", "year of the horse personality"] },
    personality: {
      ko: "말띠는 자유롭고 활동적인 열정의 띠예요. 한자리에 머물기보다 새로운 곳과 사람을 찾아 움직이며, 밝은 에너지로 주변 분위기를 띄웁니다. 솔직하고 뒤끝이 없지만 싫증을 빨리 느껴 마무리가 약해지기 쉬운 편이에요.",
      en: "The Horse is free-spirited and full of active passion. Rather than staying put, it seeks new places and people, lifting the mood with bright energy. Honest and never one to hold grudges, though it bores quickly and finishing can be its weak point.",
      zh: "马年出生的人自由奔放、充满活力与热情。不愿久留一处，总在寻找新的地方和新的人，用明朗的能量带动气氛。坦率、不记仇，但容易厌倦，收尾往往是弱项。",
      ja: "午年は自由で活動的な情熱の干支です。一か所に留まるより新しい場所と人を求めて動き、明るいエネルギーで周囲の雰囲気を盛り上げます。率直で後腐れがありませんが、飽きっぽく仕上げが弱くなりがちです。",
    },
    match: {
      ko: "용감한 호랑이띠·개띠, 그리고 부드럽게 보듬어 주는 양띠와 잘 어울립니다. 여행, 스포츠, 방송, 마케팅, 해외 업무처럼 움직임과 사람이 많은 일이 체질에 맞아요.",
      en: "The Horse pairs well with the brave Tiger and Dog, and the gentle Goat that soothes it. Travel, sports, broadcasting, marketing and overseas work, full of movement and people, suit its nature.",
      zh: "与勇敢的虎、狗，以及温柔包容的羊最为相配。旅行、体育、传媒、营销、海外业务等充满流动与人气的工作最合体质。",
      ja: "勇敢な寅年・戌年、そして柔らかく包んでくれる未年と相性が良いです。旅行、スポーツ、放送、マーケティング、海外業務など動きと人が多い仕事が体質に合います。",
    },
    yearFlow: {
      ko: "말띠의 올해는 활동 범위가 넓어지는 흐름이에요. 먼 곳으로의 이동이나 새로운 분야의 공부가 생기기 쉽고, 그 경험이 내년의 기회로 이어집니다. 다만 벌여 놓은 일이 많아지면 수습이 어려우니 여름에는 하나를 끝낸 뒤 다음을 시작하세요. 재물은 지출이 늘기 쉬운 해라 자동 저축처럼 손이 닿지 않는 장치를 마련해 두면 좋습니다.",
      en: "This year the Horse's range widens. Travel far away or study in a new field comes easily, and that experience becomes next year's opportunity. Too many open projects become hard to manage, so in summer finish one before starting the next. Spending rises easily this year, so set up automatic savings you cannot easily touch.",
      zh: "马年出生的人今年活动范围扩大。容易出现远行或学习新领域的机会，这些经历会成为明年的契机。但摊开的事太多会难以收拾，夏天先完成一件再开始下一件。今年支出容易增加，设置自动储蓄这类碰不到的机制会很有帮助。",
      ja: "午年の今年は活動範囲が広がる流れです。遠方への移動や新しい分野の勉強が生まれやすく、その経験が来年の機会につながります。ただ広げた仕事が増えると収拾が難しくなるので、夏は一つ終えてから次を始めて。お金は支出が増えやすい年なので、自動積立のように手の届かない仕組みを作っておくと良いでしょう。",
    },
    faq: [
      {
        question: { ko: "말띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Horse?", zh: "马和什么属相最配？", ja: "午年と相性の良い干支は？" },
        answer: {
          ko: "말띠는 호랑이띠·개띠(삼합)와 양띠(육합)와 궁합이 좋다고 봅니다. 쥐띠와는 충의 관계로 속도와 생각하는 방식이 달라 서로 답답해하기 쉬워요. 궁합은 전통적인 참고 기준이지 관계의 결론은 아닙니다.",
          en: "The Horse suits the Tiger and Dog (trine) and the Goat (secret friend). The Rat sits opposite, with different pace and thinking that can frustrate both sides. Compatibility is a traditional reference, not a conclusion.",
          zh: "马与虎、狗（三合）和羊（六合）相配。与鼠相冲，节奏和思维方式不同，容易让彼此着急。属相配对是传统参考，不是关系的结论。",
          ja: "午年は寅年・戌年（三合）と未年（六合）と相性が良いとされます。子年とは冲の関係で速度と考え方が違い、互いにもどかしく感じやすいです。相性は伝統的な参考基準で、関係の結論ではありません。",
        },
      },
      {
        question: { ko: "말띠가 일을 끝까지 해내려면 어떻게 해야 하나요?", en: "How can Horses follow through on what they start?", zh: "马年出生的人怎样才能把事情坚持到底？", ja: "午年が物事を最後までやり遂げるには？" },
        answer: {
          ko: "말띠는 목표가 멀면 금세 흥미를 잃기 때문에 큰 일을 2주 단위의 작은 목표로 쪼개는 것이 효과적입니다. 혼자보다 함께 달리는 동료가 있을 때 완주율이 높아지고, 끝낸 뒤 자신에게 주는 작은 보상이 다음 일을 시작하는 힘이 돼요.",
          en: "Horses lose interest when the goal is far away, so breaking big work into two-week targets works well. Running with a companion rather than alone raises the completion rate, and a small reward after finishing fuels the next start.",
          zh: "马年出生的人目标太远容易很快失去兴趣，把大事拆成两周为单位的小目标最有效。有同伴一起奔跑比独自前行更容易完成，完成后给自己的小奖励是开始下一件事的动力。",
          ja: "午年は目標が遠いとすぐに興味を失うため、大きな仕事を2週間単位の小さな目標に分けるのが効果的です。一人より一緒に走る仲間がいる時に完走率が上がり、終えた後に自分へ与える小さなご褒美が次を始める力になります。",
        },
      },
    ],
  },
  {
    id: "goat",
    hanja: "未",
    keywords: { ko: ["양띠 오늘의 운세", "양띠 운세", "양띠 성격", "양띠 궁합", "양띠 몇년생"], en: ["goat zodiac daily horoscope", "sheep zodiac horoscope", "year of the goat personality"] },
    personality: {
      ko: "양띠는 온화하고 배려심이 깊은 띠예요. 예술적 감수성이 풍부하고 남의 아픔에 잘 공감해 주변 사람들이 편안함을 느낍니다. 다만 결정을 남에게 미루거나 걱정이 앞서 기회를 놓치기도 하니, 자기 의견을 말하는 연습이 필요해요.",
      en: "The Goat is gentle and deeply considerate. Rich artistic sensitivity and empathy for others' pain make people feel at ease around it. It may defer decisions or let worry cost it opportunities, so practice voicing your own opinion.",
      zh: "羊年出生的人温和体贴、心思细腻。艺术感受力丰富，善于共情他人的痛苦，让身边的人感到安心。但容易把决定推给别人，或因担忧而错失机会，需要练习表达自己的意见。",
      ja: "未年は穏やかで思いやりの深い干支です。芸術的な感受性が豊かで他人の痛みによく共感し、周囲の人は安らぎを感じます。ただ決断を人に委ねたり心配が先に立って機会を逃すこともあるので、自分の意見を言う練習が必要です。",
    },
    match: {
      ko: "다정한 토끼띠·돼지띠, 그리고 활력을 불어넣는 말띠와 잘 맞습니다. 예술, 디자인, 돌봄, 상담, 요리처럼 섬세함과 따뜻함이 가치가 되는 일에서 능력을 발휘해요.",
      en: "The Goat matches the affectionate Rabbit and Pig, and the Horse that brings energy. It thrives in the arts, design, caregiving, counseling and cooking, where delicacy and warmth are valued.",
      zh: "与温情的兔、猪，以及注入活力的马最为相配。在艺术、设计、照护、咨询、烹饪等以细腻与温暖为价值的工作中能发挥所长。",
      ja: "優しい卯年・亥年、そして活力を吹き込んでくれる午年と相性が良いです。芸術、デザイン、ケア、相談、料理など繊細さと温かさが価値になる仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "양띠의 올해는 마음의 안정이 성과로 이어지는 흐름이에요. 상반기에는 가족이나 가까운 사람 일로 신경 쓸 일이 생기지만, 그 과정에서 관계가 더 단단해집니다. 하반기에는 미뤄 둔 자기 계발이나 취미가 뜻밖의 수입이나 기회로 연결될 수 있어요. 재물은 큰 변동 없이 안정적이니 무리한 대출이나 보증만 피하면 됩니다.",
      en: "This year the Goat's peace of mind turns into results. Family or close friends need attention in the first half, and relationships grow firmer through it. In the second half, long-postponed self-development or a hobby may lead to unexpected income or opportunity. Finances stay stable without big swings; just avoid heavy loans or guarantees.",
      zh: "羊年出生的人今年内心的安定会转化为成果。上半年家人或亲近的人让你操心，但关系会在过程中更牢固。下半年搁置的自我提升或爱好可能带来意外收入或机会。财运平稳无大波动，只要避开过度借贷和担保即可。",
      ja: "未年の今年は心の安定が成果につながる流れです。上半期は家族や身近な人のことで気を遣う出来事がありますが、その過程で関係がより固くなります。下半期は後回しにしていた自己啓発や趣味が思わぬ収入や機会につながるかもしれません。お金は大きな変動なく安定しているので、無理な借入や保証だけ避ければ大丈夫です。",
    },
    faq: [
      {
        question: { ko: "양띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Goat?", zh: "羊和什么属相最配？", ja: "未年と相性の良い干支は？" },
        answer: {
          ko: "양띠는 토끼띠·돼지띠(삼합)와 말띠(육합)와 궁합이 좋다고 봅니다. 소띠와는 충의 관계로 서로 고집이 세게 부딪히기 쉬우니 역할을 분명히 나누면 좋아요. 궁합은 전통적인 참고 기준입니다.",
          en: "The Goat suits the Rabbit and Pig (trine) and the Horse (secret friend). The Ox sits opposite, and two strong wills tend to clash, so dividing roles clearly helps. Compatibility is a traditional reference.",
          zh: "羊与兔、猪（三合）和马（六合）相配。与牛相冲，彼此固执容易碰撞，分清角色会更好。属相配对是传统参考。",
          ja: "未年は卯年・亥年（三合）と午年（六合）と相性が良いとされます。丑年とは冲の関係で互いの頑固さが強くぶつかりやすいので、役割をはっきり分けると良いでしょう。相性は伝統的な参考基準です。",
        },
      },
      {
        question: { ko: "양띠는 운이 나쁜 띠라는 말이 사실인가요?", en: "Is it true the Goat is an unlucky sign?", zh: "属羊的人运气不好是真的吗？", ja: "未年は運が悪い干支というのは本当？" },
        answer: {
          ko: "아니에요. '양띠는 팔자가 세다'는 말은 근거 없는 속설로, 전통 명리에서 양띠는 오히려 복과 인덕이 많은 띠로 봅니다. 온화한 성품 덕에 어려울 때 돕는 사람이 나타나고, 예술과 재물의 복을 타고났다고 풀이해요. 띠 하나로 인생이 정해지지 않으니 속설에 마음 쓰지 마세요.",
          en: "No. The saying that Goats have a hard fate is a baseless superstition; traditional readings see the Goat as a sign rich in blessings and helpful people. Its gentle nature draws supporters in hard times, and it is said to be born with luck in the arts and wealth. No single sign decides a life, so pay the myth no mind.",
          zh: "不是。“属羊命不好”是毫无根据的俗说，传统命理反而认为羊是福气和人缘都旺的属相。温和的性情让他们在困难时总有人相助，还被认为天生带有艺术和财富的福分。属相决定不了人生，不必在意这种说法。",
          ja: "いいえ。「未年は運が悪い」という話は根拠のない俗説で、伝統的な命理ではむしろ福と人徳に恵まれた干支とされます。穏やかな性格のおかげで困った時に助けてくれる人が現れ、芸術と財の福を持って生まれたと解釈されます。干支一つで人生は決まらないので俗説を気にしないでください。",
        },
      },
    ],
  },
  {
    id: "monkey",
    hanja: "申",
    keywords: { ko: ["원숭이띠 오늘의 운세", "원숭이띠 운세", "원숭이띠 성격", "원숭이띠 궁합", "원숭이띠 몇년생"], en: ["monkey zodiac daily horoscope", "year of the monkey personality"] },
    personality: {
      ko: "원숭이띠는 재치와 두뇌 회전이 빠른 띠예요. 호기심이 많아 무엇이든 금세 배우고, 유머로 어색한 분위기를 단번에 바꿔 놓습니다. 다재다능한 만큼 한 가지에 오래 집중하기 어려워하고, 꾀가 많다는 오해를 받기도 해요.",
      en: "The Monkey is witty and quick-thinking. Curious about everything, it learns fast and flips an awkward mood with a single joke. Being so versatile makes long focus on one thing hard, and its cleverness is sometimes mistaken for cunning.",
      zh: "猴年出生的人机智过人、头脑灵活。好奇心旺盛，学什么都快，一句幽默就能化解尴尬。多才多艺却难以长期专注一件事，有时也会被误会为心机多。",
      ja: "申年は機知と頭の回転が速い干支です。好奇心が強く何でもすぐに覚え、ユーモアで気まずい空気を一瞬で変えます。多才な分、一つのことに長く集中するのが苦手で、要領が良すぎると誤解されることもあります。",
    },
    match: {
      ko: "기민한 쥐띠·용띠, 그리고 깊이로 균형을 잡아 주는 뱀띠와 잘 어울립니다. IT, 광고, 기획, 엔터테인먼트, 외교처럼 아이디어와 순발력이 성과가 되는 일이 잘 맞아요.",
      en: "The Monkey pairs well with the agile Rat and Dragon, and the Snake whose depth balances it. IT, advertising, planning, entertainment and diplomacy, where ideas and quick reflexes pay off, suit it well.",
      zh: "与敏捷的鼠、龙，以及用深度平衡它的蛇最为相配。IT、广告、策划、娱乐、外交等靠创意和应变出成绩的工作很合适。",
      ja: "機敏な子年・辰年、そして深さでバランスを取ってくれる巳年と相性が良いです。IT、広告、企画、エンターテインメント、外交などアイデアと瞬発力が成果になる仕事に向いています。",
    },
    yearFlow: {
      ko: "원숭이띠의 올해는 아이디어가 돈과 기회로 바뀌는 흐름이에요. 평소 머릿속에만 있던 생각을 작게라도 실행하면 봄부터 반응이 옵니다. 다만 여러 일을 동시에 벌이면 어느 하나도 끝내지 못할 수 있으니 가을에는 우선순위를 정하세요. 사람 관계에서는 가벼운 농담이 오해를 부를 수 있어 중요한 자리에서는 말을 아끼는 것이 이롭습니다.",
      en: "This year the Monkey's ideas turn into money and opportunity. Put even a small version of a long-held idea into action and responses arrive from spring. Juggling too many things at once may leave none finished, so set priorities in autumn. In relationships a light joke can be misread, so hold your tongue in important settings.",
      zh: "猴年出生的人今年创意会变成金钱和机会。把平时只在脑子里的想法哪怕小规模地付诸实践，春天起就会有反馈。但同时开太多摊子可能一件也完不成，秋天要排好优先级。人际上随口的玩笑可能引起误会，重要场合少说为妙。",
      ja: "申年の今年はアイデアがお金と機会に変わる流れです。頭の中だけにあった考えを小さくでも実行すれば春から反応が来ます。ただ複数のことを同時に広げるとどれも終わらない恐れがあるので、秋には優先順位を決めて。人間関係では軽い冗談が誤解を招くことがあるので、大事な場では言葉を控えるのが得です。",
    },
    faq: [
      {
        question: { ko: "원숭이띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Monkey?", zh: "猴和什么属相最配？", ja: "申年と相性の良い干支は？" },
        answer: {
          ko: "원숭이띠는 쥐띠·용띠(삼합)와 뱀띠(육합)와 궁합이 좋다고 봅니다. 호랑이띠와는 충의 관계로 기 싸움이 잦지만, 서로의 능력을 인정하면 강력한 파트너가 되기도 해요. 궁합은 참고 기준일 뿐입니다.",
          en: "The Monkey suits the Rat and Dragon (trine) and the Snake (secret friend). The Tiger sits opposite and power struggles are frequent, yet mutual respect for each other's ability can make a powerful partnership. Compatibility is only a guide.",
          zh: "猴与鼠、龙（三合）和蛇（六合）相配。与虎相冲，常有较劲，但若认可彼此能力也能成为强大的搭档。属相配对仅供参考。",
          ja: "申年は子年・辰年（三合）と巳年（六合）と相性が良いとされます。寅年とは冲の関係で張り合いが多いですが、互いの能力を認めれば強力なパートナーになることもあります。相性はあくまで参考基準です。",
        },
      },
      {
        question: { ko: "원숭이띠에게 잘 맞는 공부법이나 일하는 방식은?", en: "What way of working or studying suits the Monkey?", zh: "适合猴年出生的人的学习或工作方式是？", ja: "申年に合う勉強法や働き方は？" },
        answer: {
          ko: "원숭이띠는 지루함을 가장 못 견디므로 한 가지를 오래 붙드는 방식보다 짧게 여러 번 반복하는 방식이 효율적입니다. 배운 것을 남에게 설명하거나 바로 써먹을 때 기억이 오래가고, 게임처럼 점수나 단계를 매기면 집중력이 크게 올라가요.",
          en: "The Monkey tolerates boredom least, so short repeated sessions beat one long stretch on a single topic. Memory lasts when it explains what it learned to others or applies it right away, and turning tasks into scores or levels, like a game, sharply raises focus.",
          zh: "猴年出生的人最受不了无聊，与其长时间死磕一件事，不如短时多次重复更高效。把学到的讲给别人或立刻用上，记忆更持久；像游戏一样设置分数或关卡，专注力会大幅提升。",
          ja: "申年は退屈が最も苦手なので、一つを長く続けるより短く何度も繰り返す方法が効率的です。学んだことを人に説明したりすぐ使ったりすると記憶が長持ちし、ゲームのように点数や段階をつけると集中力が大きく上がります。",
        },
      },
    ],
  },
  {
    id: "rooster",
    hanja: "酉",
    keywords: { ko: ["닭띠 오늘의 운세", "닭띠 운세", "닭띠 성격", "닭띠 궁합", "닭띠 몇년생"], en: ["rooster zodiac daily horoscope", "year of the rooster personality"] },
    personality: {
      ko: "닭띠는 부지런하고 꼼꼼한 완벽주의 성향의 띠예요. 시간 약속과 원칙을 중요하게 여기고, 맡은 일은 세부까지 빈틈없이 챙깁니다. 자기 표현이 분명하고 외모와 매너에 신경 쓰지만, 직설적인 말투 때문에 오해를 사기도 해요.",
      en: "The Rooster is diligent, meticulous and perfectionist. It values punctuality and principle, and handles every detail of its work. Clear in self-expression and attentive to appearance and manners, though its blunt speech is sometimes misread.",
      zh: "鸡年出生的人勤奋细致、追求完美。重视守时和原则，接手的事细节都不放过。善于表达自己，注重仪表和礼节，但直来直去的说话方式有时会招致误会。",
      ja: "酉年は勤勉で几帳面な完璧主義の干支です。時間の約束と原則を重んじ、任された仕事は細部まで抜かりなく仕上げます。自己表現がはっきりして外見とマナーに気を配りますが、直球な物言いで誤解されることもあります。",
    },
    match: {
      ko: "성실한 소띠·뱀띠, 그리고 큰 그림을 그려 주는 용띠와 잘 맞습니다. 회계, 품질 관리, 비서·행정, 미용·패션, 방송처럼 정확함과 표현력이 함께 필요한 일에서 빛나요.",
      en: "The Rooster matches the diligent Ox and Snake, and the Dragon that paints the big picture. It shines in accounting, quality control, administration, beauty and fashion, and broadcasting, where precision and expression are both needed.",
      zh: "与勤恳的牛、蛇，以及擘画大局的龙最为相配。在会计、质量管理、行政秘书、美容时尚、传媒等既需要精准又需要表现力的工作中大放异彩。",
      ja: "誠実な丑年・巳年、そして大きな絵を描いてくれる辰年と相性が良いです。会計、品質管理、秘書・事務、美容・ファッション、放送など正確さと表現力の両方が必要な仕事で輝きます。",
    },
    yearFlow: {
      ko: "닭띠의 올해는 노력한 만큼 정확히 돌아오는 흐름이에요. 상반기에는 성과 평가나 시험처럼 실력을 증명할 자리가 생기고, 준비한 사람에게 좋은 결과가 따릅니다. 하반기에는 사람 때문에 마음 상할 일이 있을 수 있으니, 옳은 말도 부드럽게 전하는 연습이 필요해요. 재물은 꼼꼼한 관리 덕에 늘어나지만 체면 때문에 쓰는 돈은 줄이는 것이 좋습니다.",
      en: "This year the Rooster gets back exactly what it puts in. The first half brings evaluations or exams where skill is proven, and the prepared are rewarded. People may hurt your feelings in the second half, so practice delivering even correct points gently. Money grows through careful management, but cut spending done to save face.",
      zh: "鸡年出生的人今年付出多少就准确回报多少。上半年会有绩效评估或考试这类证明实力的场合，有准备的人会得到好结果。下半年可能因人际而伤心，要练习把对的话说得柔和。财运因细心管理而增长，但为了面子花的钱要减少。",
      ja: "酉年の今年は努力した分だけ正確に返ってくる流れです。上半期は評価や試験など実力を証明する場があり、準備した人に良い結果がついてきます。下半期は人のことで心を痛める出来事があるかもしれないので、正しいことも柔らかく伝える練習が必要です。お金は几帳面な管理のおかげで増えますが、体面のために使うお金は減らすのが良いでしょう。",
    },
    faq: [
      {
        question: { ko: "닭띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Rooster?", zh: "鸡和什么属相最配？", ja: "酉年と相性の良い干支は？" },
        answer: {
          ko: "닭띠는 소띠·뱀띠(삼합)와 용띠(육합)와 궁합이 좋다고 봅니다. 토끼띠와는 충의 관계로 서로의 예민함이 부딪히기 쉬워 표현 방식을 조율해야 해요. 궁합은 전통적인 참고 자료입니다.",
          en: "The Rooster suits the Ox and Snake (trine) and the Dragon (secret friend). The Rabbit sits opposite and both sensitivities tend to collide, so adjust how you express yourselves. Compatibility is a traditional reference.",
          zh: "鸡与牛、蛇（三合）和龙（六合）相配。与兔相冲，彼此的敏感容易碰撞，需要调整表达方式。属相配对是传统参考资料。",
          ja: "酉年は丑年・巳年（三合）と辰年（六合）と相性が良いとされます。卯年とは冲の関係で互いの敏感さがぶつかりやすく、表現の仕方を調整する必要があります。相性は伝統的な参考資料です。",
        },
      },
      {
        question: { ko: "닭띠가 인간관계에서 주의할 점은 무엇인가요?", en: "What should Roosters watch for in relationships?", zh: "鸡年出生的人在人际关系中要注意什么？", ja: "酉年が人間関係で気をつけることは？" },
        answer: {
          ko: "닭띠는 옳은 말을 너무 빨리, 너무 정확하게 해서 상대의 마음을 다치게 할 때가 있습니다. 지적하기 전에 먼저 잘한 점 하나를 말해 주고, 남의 실수를 눈감아 주는 여유를 가지면 주변에 사람이 더 모여요. 완벽을 자신에게만 요구하고 남에게는 조금 느슨해지는 것이 핵심입니다.",
          en: "Roosters sometimes wound others by saying the right thing too fast and too precisely. Mention one thing done well before pointing out a fault, and allow room for others' mistakes, and more people will gather around you. The key is demanding perfection of yourself while loosening up on others.",
          zh: "鸡年出生的人有时把对的话说得太快太准，伤到对方。指出问题前先说一个做得好的地方，对别人的失误多点宽容，身边的人会更多。关键是对自己要求完美，对他人稍微放松。",
          ja: "酉年は正しいことをあまりに早く正確に言って相手の心を傷つけることがあります。指摘する前にまず良かった点を一つ伝え、他人のミスに目をつぶる余裕を持てば周りに人がもっと集まります。完璧を自分にだけ求め、他人には少し緩くするのが要です。",
        },
      },
    ],
  },
  {
    id: "dog",
    hanja: "戌",
    keywords: { ko: ["개띠 오늘의 운세", "개띠 운세", "개띠 성격", "개띠 궁합", "개띠 몇년생"], en: ["dog zodiac daily horoscope", "year of the dog personality"] },
    personality: {
      ko: "개띠는 의리 있고 정직한 신뢰의 띠예요. 한번 믿은 사람과 조직에는 끝까지 충실하고, 불공정한 일을 보면 앞장서서 바로잡으려 합니다. 책임감이 강한 만큼 걱정도 많아 스스로를 몰아세우기 쉬운 편이에요.",
      en: "The Dog is loyal, honest and trustworthy. Faithful to the end to people and organizations it believes in, and the first to step up against unfairness. A strong sense of responsibility also brings much worry, so it tends to push itself too hard.",
      zh: "狗年出生的人重义气、讲诚信、值得信赖。对信任的人和组织忠诚到底，见到不公会带头纠正。责任感强的同时顾虑也多，容易逼迫自己。",
      ja: "戌年は義理堅く正直な信頼の干支です。一度信じた人と組織には最後まで忠実で、不公平なことを見ると先頭に立って正そうとします。責任感が強い分、心配も多く自分を追い込みやすい傾向があります。",
    },
    match: {
      ko: "용감한 호랑이띠·말띠, 그리고 섬세하게 마음을 읽어 주는 토끼띠와 잘 어울립니다. 법률, 공직, 교육, 사회복지, 보안처럼 신뢰와 책임이 핵심인 일에서 능력을 발휘해요.",
      en: "The Dog pairs well with the brave Tiger and Horse, and the Rabbit that reads its heart with care. It excels in law, public service, education, social work and security, where trust and responsibility are central.",
      zh: "与勇敢的虎、马，以及细腻读懂心思的兔最为相配。在法律、公职、教育、社会福利、安保等以信任与责任为核心的工作中能发挥所长。",
      ja: "勇敢な寅年・午年、そして繊細に心を読んでくれる卯年と相性が良いです。法律、公務、教育、社会福祉、セキュリティなど信頼と責任が核心の仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "개띠의 올해는 지켜 온 신뢰가 보상으로 돌아오는 흐름이에요. 상반기에는 오래 알고 지낸 사람에게서 뜻밖의 제안이나 도움을 받기 쉽습니다. 하반기에는 책임이 늘어 부담스럽지만, 그 자리가 곧 당신의 위치를 한 단계 올려 줘요. 재물은 꾸준하되 남을 돕다가 생기는 지출을 미리 계산해 두고, 건강은 어깨와 목의 긴장을 풀어 주는 운동이 좋습니다.",
      en: "This year the Dog's long-kept trust returns as reward. In the first half, unexpected offers or help come from people you have known a long time. Responsibility grows heavy in the second half, but that role lifts your standing a step. Money is steady; budget ahead for the costs of helping others, and exercises that loosen the shoulders and neck are good for health.",
      zh: "狗年出生的人今年守护多年的信任会变成回报。上半年容易从相识已久的人那里得到意外的提议或帮助。下半年责任增加压力不小，但那个位置会让你更上一层。财运平稳，但帮助别人产生的支出要提前算好；健康上多做放松肩颈的运动。",
      ja: "戌年の今年は守ってきた信頼が報酬として返ってくる流れです。上半期は長い付き合いの人から思わぬ提案や助けを得やすいです。下半期は責任が増えて重く感じますが、その役目があなたの立場を一段上げてくれます。お金は安定していますが人を助けて生じる出費を先に見積もっておき、健康は肩と首の緊張をほぐす運動が良いでしょう。",
    },
    faq: [
      {
        question: { ko: "개띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Dog?", zh: "狗和什么属相最配？", ja: "戌年と相性の良い干支は？" },
        answer: {
          ko: "개띠는 호랑이띠·말띠(삼합)와 토끼띠(육합)와 궁합이 좋다고 봅니다. 용띠와는 충의 관계로 가치관 충돌이 잦지만 둘 다 정직해서 솔직한 대화로 풀리는 경우가 많아요. 궁합은 참고 기준일 뿐입니다.",
          en: "The Dog suits the Tiger and Horse (trine) and the Rabbit (secret friend). The Dragon sits opposite and values often clash, but since both are honest, frank conversation usually resolves it. Compatibility is only a guide.",
          zh: "狗与虎、马（三合）和兔（六合）相配。与龙相冲，价值观常有冲突，但两者都正直，多半能靠坦诚对话化解。属相配对仅供参考。",
          ja: "戌年は寅年・午年（三合）と卯年（六合）と相性が良いとされます。辰年とは冲の関係で価値観の衝突が多いですが、どちらも正直なので率直な対話で解けることが多いです。相性はあくまで参考基準です。",
        },
      },
      {
        question: { ko: "개띠가 스트레스를 줄이려면 어떻게 해야 하나요?", en: "How can Dogs reduce stress?", zh: "狗年出生的人怎样减少压力？", ja: "戌年がストレスを減らすには？" },
        answer: {
          ko: "개띠는 남의 문제까지 자기 책임으로 느끼기 때문에 스트레스가 쌓입니다. '내가 바꿀 수 있는 일'과 '아닌 일'을 종이에 나눠 적어 보는 것만으로도 마음이 가벼워져요. 규칙적인 운동과 반려동물·자연과 보내는 시간이 특히 회복에 도움이 됩니다.",
          en: "Dogs accumulate stress by feeling responsible even for others' problems. Simply writing down what you can change and what you cannot lightens the load. Regular exercise and time with pets or in nature are especially restorative.",
          zh: "狗年出生的人把别人的问题也当成自己的责任，压力因此累积。把“我能改变的事”和“不能改变的事”分开写在纸上，心就会轻松许多。规律运动以及和宠物、大自然相处的时间尤其有助于恢复。",
          ja: "戌年は他人の問題まで自分の責任と感じるためストレスが溜まります。「自分が変えられること」と「そうでないこと」を紙に分けて書くだけでも心が軽くなります。規則的な運動とペットや自然と過ごす時間が特に回復に役立ちます。",
        },
      },
    ],
  },
  {
    id: "pig",
    hanja: "亥",
    keywords: { ko: ["돼지띠 오늘의 운세", "돼지띠 운세", "돼지띠 성격", "돼지띠 궁합", "돼지띠 몇년생"], en: ["pig zodiac daily horoscope", "year of the pig personality"] },
    personality: {
      ko: "돼지띠는 넉넉하고 복이 많은 띠예요. 사람을 의심하지 않고 베푸는 성품 덕에 주변에 늘 사람이 모이고, 어려울 때 돕는 손길도 많이 받습니다. 먹고 즐기는 것을 사랑하는 낙천가지만, 그만큼 남에게 쉽게 속거나 과소비로 흐르지 않도록 주의가 필요해요.",
      en: "The Pig is generous and blessed with good fortune. Trusting and giving by nature, it always has people around and receives plenty of help in hard times. An optimist who loves good food and good times, it must take care not to be easily deceived or drift into overspending.",
      zh: "猪年出生的人大度宽厚、福气满满。不疑人、乐于付出，身边总是聚人，困难时也常得援手。热爱美食与享乐的乐天派，但也要注意别轻易受骗或过度消费。",
      ja: "亥年はおおらかで福の多い干支です。人を疑わず与える性格のおかげで周りにいつも人が集まり、困った時に助けの手も多く受けます。食べることと楽しむことを愛する楽天家ですが、その分、人に騙されたり浪費に流れたりしないよう注意が必要です。",
    },
    match: {
      ko: "다정한 토끼띠·양띠, 그리고 용감하게 이끌어 주는 호랑이띠와 잘 맞습니다. 요식업, 유통, 서비스, 복지, 엔터테인먼트처럼 사람을 즐겁게 하고 넉넉함이 가치가 되는 일에서 빛나요.",
      en: "The Pig matches the affectionate Rabbit and Goat, and the Tiger that leads it bravely. It shines in food service, retail, hospitality, welfare and entertainment, where making people happy and generosity are valued.",
      zh: "与温情的兔、羊，以及勇敢引领的虎最为相配。在餐饮、流通、服务、福利、娱乐等让人快乐、以宽厚为价值的工作中大放异彩。",
      ja: "優しい卯年・未年、そして勇敢に導いてくれる寅年と相性が良いです。飲食、流通、サービス、福祉、エンターテインメントなど人を楽しませ、おおらかさが価値になる仕事で輝きます。",
    },
    yearFlow: {
      ko: "돼지띠의 올해는 베푼 것이 복으로 돌아오는 흐름이에요. 상반기에는 모임과 행사가 많아 지출이 늘지만, 그 자리에서 만난 사람이 하반기 기회를 가져옵니다. 다만 보증이나 큰돈을 빌려주는 일은 한 해 내내 피하세요. 건강은 과식과 음주를 조절하고 걷는 시간을 늘리면 체중과 컨디션이 함께 좋아집니다.",
      en: "This year what the Pig has given returns as blessing. Gatherings and events raise spending in the first half, but people met there bring opportunities in the second half. Avoid guarantees or lending large sums all year. For health, moderate overeating and drinking and walk more, and weight and condition improve together.",
      zh: "猪年出生的人今年付出会化作福报。上半年聚会和活动多，支出增加，但在那里结识的人会在下半年带来机会。但担保和大额借款一整年都要避免。健康上控制暴饮暴食，多走路，体重和状态都会变好。",
      ja: "亥年の今年は与えたものが福として返ってくる流れです。上半期は集まりや行事が多く出費が増えますが、そこで出会った人が下半期の機会を運んできます。ただ保証や大金を貸すことは一年を通して避けて。健康は過食と飲酒を控え、歩く時間を増やせば体重とコンディションが一緒に良くなります。",
    },
    faq: [
      {
        question: { ko: "돼지띠는 어떤 띠와 궁합이 좋은가요?", en: "Which signs are compatible with the Pig?", zh: "猪和什么属相最配？", ja: "亥年と相性の良い干支は？" },
        answer: {
          ko: "돼지띠는 토끼띠·양띠(삼합)와 호랑이띠(육합)와 궁합이 좋다고 봅니다. 뱀띠와는 충의 관계로 생각하는 속도와 생활 방식이 달라 적응 기간이 필요해요. 궁합은 전통적인 참고 기준이지 관계의 결론은 아닙니다.",
          en: "The Pig suits the Rabbit and Goat (trine) and the Tiger (secret friend). The Snake sits opposite, with different thinking speed and lifestyle that take time to adjust to. Compatibility is a traditional reference, not a conclusion.",
          zh: "猪与兔、羊（三合）和虎（六合）相配。与蛇相冲，思考速度和生活方式不同，需要适应期。属相配对是传统参考，不是关系的结论。",
          ja: "亥年は卯年・未年（三合）と寅年（六合）と相性が良いとされます。巳年とは冲の関係で考える速さと生活様式が違い、慣れる期間が必要です。相性は伝統的な参考基準で、関係の結論ではありません。",
        },
      },
      {
        question: { ko: "돼지띠는 정말 재물복이 많은 띠인가요?", en: "Is the Pig really a sign of wealth luck?", zh: "属猪的人真的财运好吗？", ja: "亥年は本当に金運に恵まれた干支？" },
        answer: {
          ko: "전통적으로 돼지는 풍요와 다산의 상징이라 재물복이 많은 띠로 봅니다. 실제로 돼지띠는 인덕 덕분에 돈이 들어올 길이 여러 갈래라고 풀이해요. 다만 들어오는 만큼 쉽게 쓰는 성향이 있어, 수입의 일정 비율을 먼저 떼어 두는 습관이 복을 지키는 열쇠입니다.",
          en: "Traditionally the pig symbolizes abundance and fertility, so the sign is read as rich in wealth luck. Thanks to its good standing with people, money is said to come from several directions. It also spends as easily as it earns, so setting aside a fixed share of income first is the key to keeping that fortune.",
          zh: "传统上猪象征丰饶与多产，因此被视为财运旺的属相。猪年出生的人因人缘好，进财的路子据说有好几条。但进多少花多少的倾向也明显，先把收入的固定比例存起来，是守住福气的关键。",
          ja: "伝統的に豚は豊穣と多産の象徴なので金運に恵まれた干支とされます。実際、亥年は人徳のおかげでお金が入る道が何本もあると解釈されます。ただ入った分だけ気軽に使う傾向があるので、収入の一定割合を先に取り分ける習慣が福を守る鍵です。",
        },
      },
    ],
  },
];

// ───────────────────────────── 별자리 12종 ─────────────────────────────
const ELEMENT_FIRE: LText = { ko: "불의 별자리", en: "Fire sign", zh: "火象星座", ja: "火のサイン" };
const ELEMENT_EARTH: LText = { ko: "흙의 별자리", en: "Earth sign", zh: "土象星座", ja: "地のサイン" };
const ELEMENT_AIR: LText = { ko: "공기의 별자리", en: "Air sign", zh: "风象星座", ja: "風のサイン" };
const ELEMENT_WATER: LText = { ko: "물의 별자리", en: "Water sign", zh: "水象星座", ja: "水のサイン" };

export const starGuides: StarGuide[] = [
  {
    id: "capricorn",
    element: ELEMENT_EARTH,
    keywords: { ko: ["염소자리 오늘의 운세", "염소자리 운세", "염소자리 성격", "염소자리 궁합", "염소자리 날짜"], en: ["capricorn daily horoscope", "capricorn personality"] },
    personality: {
      ko: "염소자리는 목표를 향해 묵묵히 산을 오르는 인내의 별자리예요. 현실 감각이 뛰어나고 책임감이 강해 어린 나이부터 어른스럽다는 말을 듣습니다. 겉으로는 차분하고 신중하지만 속에는 반드시 이루고 말겠다는 야망이 단단히 자리 잡고 있어요.",
      en: "Capricorn is the sign of patience, climbing steadily toward its goal. Strong practical sense and responsibility earn it a reputation for maturity from a young age. Calm and careful on the surface, with firm ambition rooted inside.",
      zh: "摩羯座是朝着目标默默攀登的忍耐之星。现实感强、责任心重，从小就被说成熟稳重。表面沉稳谨慎，内心却牢牢扎着一定要成功的野心。",
      ja: "やぎ座は目標に向かって黙々と山を登る忍耐の星座です。現実感覚に優れ責任感が強く、幼い頃から大人びていると言われます。表面は落ち着いて慎重ですが、内には必ず成し遂げるという野心がしっかり根付いています。",
    },
    match: {
      ko: "같은 흙의 별자리인 황소자리·처녀자리, 그리고 깊이로 통하는 전갈자리·물고기자리와 잘 맞습니다. 경영, 행정, 금융, 건축, 법률처럼 체계와 장기 계획이 성과로 이어지는 일에서 빛나요.",
      en: "Capricorn matches fellow earth signs Taurus and Virgo, and connects deeply with Scorpio and Pisces. It shines in management, administration, finance, architecture and law, where structure and long-term planning pay off.",
      zh: "与同为土象的金牛座、处女座，以及心灵相通的天蝎座、双鱼座最为相配。在经营、行政、金融、建筑、法律等靠体系和长期规划出成果的工作中大放异彩。",
      ja: "同じ地のサインであるおうし座・おとめ座、そして深さで通じ合うさそり座・うお座と相性が良いです。経営、行政、金融、建築、法律など体系と長期計画が成果につながる仕事で輝きます。",
    },
    yearFlow: {
      ko: "염소자리의 올해는 오래 준비한 일이 구조를 갖추는 흐름이에요. 상반기에는 책임이 늘어 피로하지만 그만큼 입지가 단단해지고, 하반기에는 승진이나 자격 취득처럼 눈에 보이는 성취가 따릅니다. 일에 몰두하느라 가까운 사람을 소홀히 하기 쉬우니 한 달에 한 번은 일정을 비워 두세요. 재물은 꾸준히 쌓이며 부동산이나 장기 저축 쪽 흐름이 좋습니다.",
      en: "This year Capricorn's long preparation takes shape. Responsibilities tire you in the first half but cement your position, and the second half brings visible achievements such as promotion or a credential. Absorbed in work, you may neglect those close to you, so clear your schedule once a month. Wealth accumulates steadily, with good flow toward property and long-term savings.",
      zh: "摩羯座今年长期准备的事开始成形。上半年责任增加令人疲惫，但地位也随之稳固；下半年会有晋升或取得资格这类看得见的成就。埋头工作容易忽略亲近的人，每月留出一次空档。财运稳步积累，房产和长期储蓄方向走势好。",
      ja: "やぎ座の今年は長く準備したことが形を成す流れです。上半期は責任が増えて疲れますが、その分足場が固まり、下半期には昇進や資格取得など目に見える成果がついてきます。仕事に没頭して身近な人をおろそかにしやすいので、月に一度は予定を空けておいて。お金は着実に積み上がり、不動産や長期貯蓄の流れが良いです。",
    },
    faq: [
      {
        question: { ko: "염소자리는 몇 월 며칠생인가요?", en: "What dates are Capricorn?", zh: "摩羯座是几月几日出生？", ja: "やぎ座は何月何日生まれ？" },
        answer: {
          ko: "염소자리는 12월 22일부터 1월 19일 사이에 태어난 사람이에요. 경계 날짜(12월 21~22일, 1월 19~20일)는 해마다 태양의 위치가 조금씩 달라 사수자리나 물병자리로 보기도 하므로, 정확히 알고 싶다면 출생 시각까지 확인하는 것이 좋습니다.",
          en: "Capricorn covers birthdays from December 22 to January 19. On the cusp dates (around December 21–22 and January 19–20) the sun's position shifts slightly each year, so some are read as Sagittarius or Aquarius; check your birth time for certainty.",
          zh: "摩羯座是12月22日至1月19日出生的人。交界日期（12月21~22日、1月19~20日）因每年太阳位置略有不同，也可能被视为射手座或水瓶座，想确认的话最好核对出生时间。",
          ja: "やぎ座は12月22日から1月19日の間に生まれた人です。境目の日付（12月21〜22日、1月19〜20日）は年ごとに太陽の位置が少し違い、いて座やみずがめ座とされることもあるので、正確に知りたいなら出生時刻まで確認するのが良いでしょう。",
        },
      },
      {
        question: { ko: "염소자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Capricorn?", zh: "摩羯座和什么星座最配？", ja: "やぎ座と相性の良い星座は？" },
        answer: {
          ko: "같은 흙의 별자리인 황소자리·처녀자리와는 가치관이 비슷해 안정적이고, 물의 별자리인 전갈자리·물고기자리와는 서로 부족한 감정과 현실을 채워 줍니다. 불의 별자리인 양자리나 공기의 별자리인 천칭자리와는 속도 차이가 있어 맞춰 가는 노력이 필요해요. 별자리 궁합은 재미로 참고하는 기준입니다.",
          en: "Fellow earth signs Taurus and Virgo share similar values for a stable bond, while water signs Scorpio and Pisces fill in the emotion and practicality each lacks. With fire sign Aries or air sign Libra the pace differs, so adjustment takes effort. Zodiac compatibility is a fun reference only.",
          zh: "与同为土象的金牛座、处女座价值观相近、关系稳定；与水象的天蝎座、双鱼座能互补情感与现实。与火象的白羊座或风象的天秤座节奏不同，需要努力磨合。星座配对仅供娱乐参考。",
          ja: "同じ地のサインのおうし座・おとめ座とは価値観が似て安定し、水のサインのさそり座・うお座とは互いに足りない感情と現実を補い合えます。火のサインのおひつじ座や風のサインのてんびん座とは速度差があり、合わせる努力が必要です。星座の相性は楽しみとして参考にする基準です。",
        },
      },
    ],
  },
  {
    id: "aquarius",
    element: ELEMENT_AIR,
    keywords: { ko: ["물병자리 오늘의 운세", "물병자리 운세", "물병자리 성격", "물병자리 궁합", "물병자리 날짜"], en: ["aquarius daily horoscope", "aquarius personality"] },
    personality: {
      ko: "물병자리는 틀에 갇히지 않는 자유로운 사고의 별자리예요. 남과 다른 관점에서 문제를 보고, 독창적인 아이디어로 주변을 놀라게 합니다. 친구가 많고 누구에게나 공평하지만, 감정보다 생각이 앞서 차갑다는 오해를 받기도 해요.",
      en: "Aquarius is the sign of free, unboxed thinking. It views problems from an angle no one else takes and surprises people with original ideas. Many friends and fair to everyone, yet thought runs ahead of feeling, so it is sometimes misread as cold.",
      zh: "水瓶座是不受框架束缚的自由思想之星。从与众不同的角度看问题，用独创的点子让周围惊叹。朋友多、待人公平，但思考先于情感，有时会被误会为冷淡。",
      ja: "みずがめ座は枠にとらわれない自由な思考の星座です。人と違う視点で問題を見て、独創的なアイデアで周囲を驚かせます。友人が多く誰にでも公平ですが、感情より思考が先に立つため冷たいと誤解されることもあります。",
    },
    match: {
      ko: "같은 공기의 별자리인 쌍둥이자리·천칭자리, 그리고 열정으로 자극을 주는 양자리·사수자리와 잘 맞습니다. IT, 연구 개발, 사회 운동, 디자인, 미디어처럼 새로움과 공공성이 가치가 되는 일이 체질에 맞아요.",
      en: "Aquarius matches fellow air signs Gemini and Libra, and fire signs Aries and Sagittarius that spark it with passion. IT, R&D, social causes, design and media, where novelty and the public good matter, suit its nature.",
      zh: "与同为风象的双子座、天秤座，以及用热情激发它的白羊座、射手座最为相配。IT、研发、社会运动、设计、媒体等以新意和公共性为价值的工作最合体质。",
      ja: "同じ風のサインのふたご座・てんびん座、そして情熱で刺激をくれるおひつじ座・いて座と相性が良いです。IT、研究開発、社会活動、デザイン、メディアなど新しさと公共性が価値になる仕事が体質に合います。",
    },
    yearFlow: {
      ko: "물병자리의 올해는 새로운 사람과 아이디어가 쏟아져 들어오는 흐름이에요. 상반기에는 낯선 분야의 공부나 모임이 생겨 시야가 넓어지고, 하반기에는 그중 하나가 본업과 연결되며 수입으로 이어집니다. 다만 너무 많은 가능성을 동시에 좇으면 어느 것도 깊어지지 않으니 가을에는 하나를 고르세요. 재물은 기술이나 지식에 투자한 돈이 가장 크게 돌아옵니다.",
      en: "This year new people and ideas pour in for Aquarius. Study or gatherings in unfamiliar fields widen your horizon in the first half, and in the second half one of them connects to your main work and turns into income. Chasing too many possibilities at once deepens none, so choose one in autumn. Money invested in skills or knowledge brings the largest return.",
      zh: "水瓶座今年新的人和想法会涌入。上半年陌生领域的学习或聚会拓宽视野，下半年其中一项会与本业相连并带来收入。但同时追逐太多可能性会哪一样都不深入，秋天要选定一个。财运上投在技能或知识上的钱回报最大。",
      ja: "みずがめ座の今年は新しい人とアイデアがあふれるように入ってくる流れです。上半期は見慣れない分野の勉強や集まりが生まれて視野が広がり、下半期にはその一つが本業とつながって収入になります。ただ多くの可能性を同時に追うとどれも深まらないので、秋には一つを選んで。お金は技術や知識に投じたものが最も大きく返ってきます。",
    },
    faq: [
      {
        question: { ko: "물병자리는 몇 월 며칠생인가요?", en: "What dates are Aquarius?", zh: "水瓶座是几月几日出生？", ja: "みずがめ座は何月何日生まれ？" },
        answer: {
          ko: "물병자리는 1월 20일부터 2월 18일 사이에 태어난 사람이에요. 1월 19~20일, 2월 18~19일처럼 경계에 걸린 날짜는 해마다 조금씩 달라 염소자리나 물고기자리로 보기도 하니 출생 시각까지 확인하면 정확합니다.",
          en: "Aquarius covers birthdays from January 20 to February 18. Cusp dates such as January 19–20 and February 18–19 shift slightly each year and may be read as Capricorn or Pisces, so checking your birth time gives certainty.",
          zh: "水瓶座是1月20日至2月18日出生的人。1月19~20日、2月18~19日这类交界日期每年略有不同，也可能被视为摩羯座或双鱼座，核对出生时间会更准确。",
          ja: "みずがめ座は1月20日から2月18日の間に生まれた人です。1月19〜20日、2月18〜19日のような境目の日付は年ごとに少し違い、やぎ座やうお座とされることもあるので、出生時刻まで確認すると正確です。",
        },
      },
      {
        question: { ko: "물병자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Aquarius?", zh: "水瓶座和什么星座最配？", ja: "みずがめ座と相性の良い星座は？" },
        answer: {
          ko: "같은 공기의 별자리인 쌍둥이자리·천칭자리와는 대화가 끊이지 않아 편하고, 불의 별자리인 양자리·사수자리와는 서로의 모험심을 북돋워 줍니다. 물의 별자리인 게자리·전갈자리와는 감정 표현 방식이 달라 오해가 생기기 쉬워요. 궁합은 재미로 보는 참고 기준입니다.",
          en: "Fellow air signs Gemini and Libra keep the conversation flowing, while fire signs Aries and Sagittarius fuel each other's adventurous side. With water signs Cancer and Scorpio, differing emotional styles invite misunderstanding. Compatibility is a fun reference.",
          zh: "与同为风象的双子座、天秤座话题不断、相处轻松；与火象的白羊座、射手座能互相激发冒险精神。与水象的巨蟹座、天蝎座情感表达方式不同，容易产生误会。配对仅供娱乐参考。",
          ja: "同じ風のサインのふたご座・てんびん座とは会話が途切れず楽で、火のサインのおひつじ座・いて座とは互いの冒険心を高め合えます。水のサインのかに座・さそり座とは感情表現の仕方が違い誤解が生まれやすいです。相性は楽しみとして見る参考基準です。",
        },
      },
    ],
  },
  {
    id: "pisces",
    element: ELEMENT_WATER,
    keywords: { ko: ["물고기자리 오늘의 운세", "물고기자리 운세", "물고기자리 성격", "물고기자리 궁합", "물고기자리 날짜"], en: ["pisces daily horoscope", "pisces personality"] },
    personality: {
      ko: "물고기자리는 상상력과 공감 능력이 풍부한 감성의 별자리예요. 남의 기분을 자기 일처럼 느끼고, 예술적 감각으로 세상을 아름답게 해석합니다. 다정하고 헌신적이지만 현실의 숫자나 마감 앞에서는 쉽게 지치고, 거절을 못 해 손해를 보기도 해요.",
      en: "Pisces is the sign of imagination and empathy. It feels others' moods as its own and interprets the world beautifully through an artistic lens. Kind and devoted, yet easily worn down by numbers and deadlines, and prone to losses from not being able to say no.",
      zh: "双鱼座是想象力与共情力丰富的感性之星。把别人的情绪当作自己的事来感受，用艺术的眼光把世界解读得很美。温柔奉献，却在现实的数字和截止日期面前容易疲惫，也因不会拒绝而吃亏。",
      ja: "うお座は想像力と共感力が豊かな感性の星座です。他人の気分を自分のことのように感じ、芸術的な感覚で世界を美しく解釈します。優しく献身的ですが、現実の数字や締め切りの前では疲れやすく、断れずに損をすることもあります。",
    },
    match: {
      ko: "같은 물의 별자리인 게자리·전갈자리, 그리고 현실을 받쳐 주는 황소자리·염소자리와 잘 맞습니다. 예술, 음악, 상담, 간호, 복지, 영상처럼 감성과 치유가 가치가 되는 일에서 능력을 발휘해요.",
      en: "Pisces matches fellow water signs Cancer and Scorpio, and earth signs Taurus and Capricorn that ground it. It excels in art, music, counseling, nursing, welfare and film, where feeling and healing are valued.",
      zh: "与同为水象的巨蟹座、天蝎座，以及给予现实支撑的金牛座、摩羯座最为相配。在艺术、音乐、咨询、护理、福利、影像等以感性和治愈为价值的工作中能发挥所长。",
      ja: "同じ水のサインのかに座・さそり座、そして現実を支えてくれるおうし座・やぎ座と相性が良いです。芸術、音楽、相談、看護、福祉、映像など感性と癒しが価値になる仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "물고기자리의 올해는 감성이 현실의 성과로 바뀌는 흐름이에요. 상반기에는 창작이나 취미로 하던 일이 뜻밖의 인정을 받고, 하반기에는 그것을 수입으로 연결할 기회가 찾아옵니다. 다만 남의 부탁을 다 들어주다 자기 일을 놓치기 쉬우니 거절의 말을 미리 준비해 두세요. 재물은 충동적인 소비와 감정에 휘둘린 투자만 피하면 안정적입니다.",
      en: "This year Pisces' sensitivity turns into real results. Creative or hobby work earns unexpected recognition in the first half, and the second half brings a chance to turn it into income. Saying yes to everyone's requests can cost you your own work, so prepare your words of refusal in advance. Finances stay stable as long as you avoid impulse spending and emotion-driven investments.",
      zh: "双鱼座今年感性会转化为现实成果。上半年创作或爱好的事得到意外认可，下半年会有把它变成收入的机会。但答应所有人的请求容易耽误自己的事，提前准备好拒绝的话。财运上只要避开冲动消费和被情绪左右的投资就很稳定。",
      ja: "うお座の今年は感性が現実の成果に変わる流れです。上半期は創作や趣味でしていたことが思わぬ評価を受け、下半期にはそれを収入につなげる機会が訪れます。ただ人の頼みを全部聞いて自分のことを後回しにしやすいので、断る言葉を先に用意しておいて。お金は衝動的な消費と感情に流された投資さえ避ければ安定しています。",
    },
    faq: [
      {
        question: { ko: "물고기자리는 몇 월 며칠생인가요?", en: "What dates are Pisces?", zh: "双鱼座是几月几日出生？", ja: "うお座は何月何日生まれ？" },
        answer: {
          ko: "물고기자리는 2월 19일부터 3월 20일 사이에 태어난 사람이에요. 2월 18~19일, 3월 20~21일처럼 경계 날짜는 해마다 조금씩 달라 물병자리나 양자리로 보기도 하니 출생 시각을 확인하면 정확합니다.",
          en: "Pisces covers birthdays from February 19 to March 20. Cusp dates such as February 18–19 and March 20–21 shift slightly each year and may be read as Aquarius or Aries, so checking your birth time gives certainty.",
          zh: "双鱼座是2月19日至3月20日出生的人。2月18~19日、3月20~21日这类交界日期每年略有不同，也可能被视为水瓶座或白羊座，核对出生时间会更准确。",
          ja: "うお座は2月19日から3月20日の間に生まれた人です。2月18〜19日、3月20〜21日のような境目の日付は年ごとに少し違い、みずがめ座やおひつじ座とされることもあるので、出生時刻を確認すると正確です。",
        },
      },
      {
        question: { ko: "물고기자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Pisces?", zh: "双鱼座和什么星座最配？", ja: "うお座と相性の良い星座は？" },
        answer: {
          ko: "같은 물의 별자리인 게자리·전갈자리와는 말하지 않아도 마음이 통하고, 흙의 별자리인 황소자리·염소자리는 물고기자리의 꿈을 현실로 받쳐 줍니다. 공기의 별자리인 쌍둥이자리·사수자리처럼 가볍고 빠른 상대와는 감정의 깊이가 달라 외로움을 느낄 수 있어요. 궁합은 재미로 참고하세요.",
          en: "Fellow water signs Cancer and Scorpio understand Pisces without words, while earth signs Taurus and Capricorn ground its dreams in reality. With light, fast partners like Gemini or Sagittarius, the difference in emotional depth can feel lonely. Treat compatibility as a fun reference.",
          zh: "与同为水象的巨蟹座、天蝎座不说话也心意相通；土象的金牛座、摩羯座能把双鱼座的梦想托在现实中。与双子座、射手座这类轻快的对象，情感深度不同可能感到孤单。配对仅供娱乐参考。",
          ja: "同じ水のサインのかに座・さそり座とは言葉がなくても心が通じ、地のサインのおうし座・やぎ座はうお座の夢を現実で支えてくれます。ふたご座・いて座のように軽快で速い相手とは感情の深さが違い、寂しさを感じることがあります。相性は楽しみとして参考に。",
        },
      },
    ],
  },
  {
    id: "aries",
    element: ELEMENT_FIRE,
    keywords: { ko: ["양자리 오늘의 운세", "양자리 운세", "양자리 성격", "양자리 궁합", "양자리 날짜"], en: ["aries daily horoscope", "aries personality"] },
    personality: {
      ko: "양자리는 열두 별자리의 첫 번째답게 시작과 도전의 에너지가 넘치는 별자리예요. 생각보다 행동이 빠르고, 어려운 일 앞에서도 일단 부딪혀 보는 용기가 있습니다. 솔직하고 뒤끝이 없지만 성급함과 승부욕 때문에 다툼이 생기기도 해요.",
      en: "Aries, first of the twelve, overflows with the energy of beginnings and challenge. Action comes before deliberation, and it has the courage to take on hard things head-on. Honest and free of grudges, though impatience and competitiveness can spark quarrels.",
      zh: "白羊座作为十二星座之首，充满开始与挑战的能量。行动快于思考，面对难题也敢先冲上去。坦率不记仇，但急躁和好胜有时会引发争执。",
      ja: "おひつじ座は十二星座の最初らしく、始まりと挑戦のエネルギーにあふれた星座です。考えるより行動が早く、難しいことの前でもまずぶつかってみる勇気があります。率直で後腐れがありませんが、せっかちさと負けん気で争いが起きることもあります。",
    },
    match: {
      ko: "같은 불의 별자리인 사자자리·사수자리, 그리고 지적인 자극을 주는 쌍둥이자리·물병자리와 잘 맞습니다. 창업, 영업, 스포츠, 응급·소방, 군·경처럼 결단력과 순발력이 바로 성과가 되는 일이 어울려요.",
      en: "Aries matches fellow fire signs Leo and Sagittarius, and air signs Gemini and Aquarius that stimulate its mind. Entrepreneurship, sales, sports, emergency services and uniformed work, where decisiveness and quick reflexes pay off directly, suit it.",
      zh: "与同为火象的狮子座、射手座，以及给予智力刺激的双子座、水瓶座最为相配。创业、销售、体育、急救消防、军警等决断力和应变力直接转化为成果的工作很适合。",
      ja: "同じ火のサインのしし座・いて座、そして知的な刺激をくれるふたご座・みずがめ座と相性が良いです。起業、営業、スポーツ、救急・消防、軍・警察など決断力と瞬発力がそのまま成果になる仕事が向いています。",
    },
    yearFlow: {
      ko: "양자리의 올해는 새 판을 벌이기에 좋은 흐름이에요. 봄에 시작한 일은 속도가 붙고, 여름에는 경쟁에서 앞서 나가는 성과가 보입니다. 다만 혼자 앞서 달리다 보면 팀이 따라오지 못할 수 있으니 하반기에는 뒤를 돌아보는 시간이 필요해요. 재물은 들어오는 힘이 강하지만 충동구매와 성급한 투자가 가장 큰 누수이니 결제 전 하루만 기다리세요.",
      en: "This year favors starting something new for Aries. What begins in spring picks up speed, and summer shows you pulling ahead of the competition. Running alone out front can leave the team behind, so the second half needs time to look back. Money comes in strongly, but impulse buying and hasty investments are the biggest leaks, so wait a day before paying.",
      zh: "白羊座今年适合开新局。春天开始的事会加速，夏天能看到在竞争中领先的成果。但一个人跑在前面，团队可能跟不上，下半年需要回头看看。财运进账力强，但冲动消费和草率投资是最大的漏洞，付款前先等一天。",
      ja: "おひつじ座の今年は新しい局面を開くのに良い流れです。春に始めたことは勢いがつき、夏には競争で先に出る成果が見えます。ただ一人で先を走るとチームがついて来られないので、下半期は振り返る時間が必要です。お金は入ってくる力が強いですが、衝動買いと性急な投資が最大の漏れなので、支払う前に一日だけ待って。",
    },
    faq: [
      {
        question: { ko: "양자리는 몇 월 며칠생인가요?", en: "What dates are Aries?", zh: "白羊座是几月几日出生？", ja: "おひつじ座は何月何日生まれ？" },
        answer: {
          ko: "양자리는 3월 21일부터 4월 19일 사이에 태어난 사람이에요. 3월 20~21일, 4월 19~20일처럼 경계에 걸린 날짜는 해마다 조금씩 달라 물고기자리나 황소자리로 보기도 하니 출생 시각까지 확인하면 정확합니다.",
          en: "Aries covers birthdays from March 21 to April 19. Cusp dates such as March 20–21 and April 19–20 shift slightly each year and may be read as Pisces or Taurus, so checking your birth time gives certainty.",
          zh: "白羊座是3月21日至4月19日出生的人。3月20~21日、4月19~20日这类交界日期每年略有不同，也可能被视为双鱼座或金牛座，核对出生时间会更准确。",
          ja: "おひつじ座は3月21日から4月19日の間に生まれた人です。3月20〜21日、4月19〜20日のような境目の日付は年ごとに少し違い、うお座やおうし座とされることもあるので、出生時刻まで確認すると正確です。",
        },
      },
      {
        question: { ko: "양자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Aries?", zh: "白羊座和什么星座最配？", ja: "おひつじ座と相性の良い星座は？" },
        answer: {
          ko: "같은 불의 별자리인 사자자리·사수자리와는 열정의 온도가 맞아 함께 있으면 즐겁고, 공기의 별자리인 쌍둥이자리·물병자리는 양자리의 불꽃을 더 키워 줍니다. 흙의 별자리인 염소자리나 물의 별자리인 게자리와는 속도와 감정 표현이 달라 서로 답답할 수 있어요. 궁합은 재미로 보는 참고 기준입니다.",
          en: "Fellow fire signs Leo and Sagittarius match Aries' temperature, making time together fun, while air signs Gemini and Aquarius fan its flame. With earth sign Capricorn or water sign Cancer, differing pace and emotional expression can frustrate both. Compatibility is a fun reference.",
          zh: "与同为火象的狮子座、射手座热情温度相当，在一起很开心；风象的双子座、水瓶座能让白羊座的火焰更旺。与土象的摩羯座或水象的巨蟹座节奏和情感表达不同，可能互相憋闷。配对仅供娱乐参考。",
          ja: "同じ火のサインのしし座・いて座とは情熱の温度が合って一緒にいると楽しく、風のサインのふたご座・みずがめ座はおひつじ座の炎をさらに大きくしてくれます。地のサインのやぎ座や水のサインのかに座とは速度と感情表現が違い、互いにもどかしく感じることがあります。相性は楽しみとして見る参考基準です。",
        },
      },
    ],
  },
  {
    id: "taurus",
    element: ELEMENT_EARTH,
    keywords: { ko: ["황소자리 오늘의 운세", "황소자리 운세", "황소자리 성격", "황소자리 궁합", "황소자리 날짜"], en: ["taurus daily horoscope", "taurus personality"] },
    personality: {
      ko: "황소자리는 느긋하고 안정을 사랑하는 감각의 별자리예요. 좋은 음식, 아름다운 공간, 편안한 사람처럼 삶의 질을 높이는 것에 관심이 많고, 한번 정한 것은 쉽게 바꾸지 않습니다. 인내심이 강하고 믿음직하지만 고집과 변화에 대한 거부감이 약점이 되기도 해요.",
      en: "Taurus is the sensual sign that loves ease and stability. Drawn to what raises the quality of life, such as good food, beautiful spaces and comfortable company, it rarely changes what it has decided. Patient and dependable, though stubbornness and resistance to change can be its weakness.",
      zh: "金牛座是从容悠然、热爱安定的感官之星。对美食、美好的空间、舒服的人这些提升生活品质的事物兴趣浓厚，一旦决定就不轻易改变。耐心强、靠得住，但固执和抗拒变化有时成为弱点。",
      ja: "おうし座はのんびりと安定を愛する感覚の星座です。おいしい食事、美しい空間、心地よい人など生活の質を高めるものに関心が強く、一度決めたことは簡単に変えません。忍耐強く頼もしいですが、頑固さと変化への抵抗が弱点になることもあります。",
    },
    match: {
      ko: "같은 흙의 별자리인 처녀자리·염소자리, 그리고 정서적으로 깊은 게자리·물고기자리와 잘 맞습니다. 금융, 요리, 디자인, 부동산, 농업·원예처럼 감각과 꾸준함이 자산이 되는 일에서 빛나요.",
      en: "Taurus matches fellow earth signs Virgo and Capricorn, and emotionally deep Cancer and Pisces. It shines in finance, cooking, design, real estate and farming or gardening, where taste and persistence become assets.",
      zh: "与同为土象的处女座、摩羯座，以及情感深厚的巨蟹座、双鱼座最为相配。在金融、烹饪、设计、房地产、农业园艺等以感觉和坚持为资产的工作中大放异彩。",
      ja: "同じ地のサインのおとめ座・やぎ座、そして情緒的に深いかに座・うお座と相性が良いです。金融、料理、デザイン、不動産、農業・園芸など感覚と継続が資産になる仕事で輝きます。",
    },
    yearFlow: {
      ko: "황소자리의 올해는 쌓아 온 것이 자산으로 굳어지는 흐름이에요. 상반기에는 수입이 안정되고 저축이나 자산 운용에서 좋은 소식이 들립니다. 하반기에는 변화를 요구받는 상황이 생기는데, 거부하기보다 천천히 받아들이면 더 큰 안정이 따라와요. 건강은 목과 어깨, 그리고 과식에 주의하고 규칙적인 식사 시간만 지키면 좋습니다.",
      en: "This year what Taurus has built hardens into assets. Income stabilizes in the first half with good news in savings or asset management. The second half demands change; accepting it slowly rather than refusing brings even greater stability. For health, watch the neck, shoulders and overeating, and keep regular mealtimes.",
      zh: "金牛座今年积累的东西会凝固成资产。上半年收入稳定，储蓄或资产运作传来好消息。下半年会出现要求改变的局面，与其抗拒，不如慢慢接受，会迎来更大的安定。健康上注意颈肩和暴食，守住规律的用餐时间。",
      ja: "おうし座の今年は積み上げてきたものが資産として固まる流れです。上半期は収入が安定し、貯蓄や資産運用で良い知らせが聞こえます。下半期は変化を求められる状況が生まれますが、拒むよりゆっくり受け入れるとより大きな安定がついてきます。健康は首と肩、そして過食に注意し、規則的な食事時間を守れば良いでしょう。",
    },
    faq: [
      {
        question: { ko: "황소자리는 몇 월 며칠생인가요?", en: "What dates are Taurus?", zh: "金牛座是几月几日出生？", ja: "おうし座は何月何日生まれ？" },
        answer: {
          ko: "황소자리는 4월 20일부터 5월 20일 사이에 태어난 사람이에요. 4월 19~20일, 5월 20~21일처럼 경계 날짜는 해마다 조금씩 달라 양자리나 쌍둥이자리로 보기도 하니 출생 시각을 확인하면 정확합니다.",
          en: "Taurus covers birthdays from April 20 to May 20. Cusp dates such as April 19–20 and May 20–21 shift slightly each year and may be read as Aries or Gemini, so checking your birth time gives certainty.",
          zh: "金牛座是4月20日至5月20日出生的人。4月19~20日、5月20~21日这类交界日期每年略有不同，也可能被视为白羊座或双子座，核对出生时间会更准确。",
          ja: "おうし座は4月20日から5月20日の間に生まれた人です。4月19〜20日、5月20〜21日のような境目の日付は年ごとに少し違い、おひつじ座やふたご座とされることもあるので、出生時刻を確認すると正確です。",
        },
      },
      {
        question: { ko: "황소자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Taurus?", zh: "金牛座和什么星座最配？", ja: "おうし座と相性の良い星座は？" },
        answer: {
          ko: "같은 흙의 별자리인 처녀자리·염소자리와는 삶의 속도가 맞아 오래가고, 물의 별자리인 게자리·물고기자리는 황소자리의 안정감을 사랑해 줍니다. 불의 별자리인 사자자리나 공기의 별자리인 물병자리와는 변화를 대하는 태도가 달라 고집이 부딪히기 쉬워요. 궁합은 재미로 참고하는 기준입니다.",
          en: "Fellow earth signs Virgo and Capricorn share Taurus' pace of life for lasting bonds, while water signs Cancer and Pisces love its sense of security. With fire sign Leo or air sign Aquarius, differing attitudes toward change make stubbornness clash. Compatibility is a fun reference.",
          zh: "与同为土象的处女座、摩羯座生活节奏一致、关系长久；水象的巨蟹座、双鱼座喜爱金牛座的安定感。与火象的狮子座或风象的水瓶座对待变化的态度不同，固执容易碰撞。配对仅供娱乐参考。",
          ja: "同じ地のサインのおとめ座・やぎ座とは人生の速度が合って長続きし、水のサインのかに座・うお座はおうし座の安定感を愛してくれます。火のサインのしし座や風のサインのみずがめ座とは変化への向き合い方が違い、頑固さがぶつかりやすいです。相性は楽しみとして参考にする基準です。",
        },
      },
    ],
  },
  {
    id: "gemini",
    element: ELEMENT_AIR,
    keywords: { ko: ["쌍둥이자리 오늘의 운세", "쌍둥이자리 운세", "쌍둥이자리 성격", "쌍둥이자리 궁합", "쌍둥이자리 날짜"], en: ["gemini daily horoscope", "gemini personality"] },
    personality: {
      ko: "쌍둥이자리는 호기심과 말솜씨가 뛰어난 소통의 별자리예요. 새로운 정보를 빨리 흡수하고 누구와도 금세 대화를 트며, 재치 있는 말로 분위기를 밝힙니다. 다재다능하지만 관심이 자주 바뀌어 한 가지를 끝까지 파고드는 데는 노력이 필요해요.",
      en: "Gemini is the communicator, rich in curiosity and verbal skill. It absorbs new information fast, strikes up conversation with anyone and brightens the mood with wit. Versatile, but its interests shift often, so seeing one thing through takes effort.",
      zh: "双子座是好奇心与口才兼备的沟通之星。快速吸收新信息，和谁都能很快聊起来，用机智的话语点亮气氛。多才多艺，但兴趣常变，要把一件事钻研到底需要努力。",
      ja: "ふたご座は好奇心と話術に優れたコミュニケーションの星座です。新しい情報を素早く吸収し誰とでもすぐ会話を始め、機知に富む言葉で場を明るくします。多才ですが関心が頻繁に変わるため、一つを最後まで掘り下げるには努力が必要です。",
    },
    match: {
      ko: "같은 공기의 별자리인 천칭자리·물병자리, 그리고 열정으로 함께 달리는 양자리·사자자리와 잘 맞습니다. 언론, 마케팅, 영업, 통역·번역, 교육, 방송처럼 말과 글로 사람을 잇는 일이 체질에 맞아요.",
      en: "Gemini matches fellow air signs Libra and Aquarius, and fire signs Aries and Leo that run alongside with passion. Journalism, marketing, sales, interpreting and translation, teaching and broadcasting, where words connect people, suit its nature.",
      zh: "与同为风象的天秤座、水瓶座，以及用热情一起奔跑的白羊座、狮子座最为相配。新闻、营销、销售、口笔译、教育、传媒等用语言和文字连接人的工作最合体质。",
      ja: "同じ風のサインのてんびん座・みずがめ座、そして情熱で共に走るおひつじ座・しし座と相性が良いです。報道、マーケティング、営業、通訳・翻訳、教育、放送など言葉と文章で人をつなぐ仕事が体質に合います。",
    },
    yearFlow: {
      ko: "쌍둥이자리의 올해는 말과 글이 기회를 여는 흐름이에요. 상반기에는 발표, 글쓰기, 소셜 미디어처럼 표현하는 자리에서 주목받고, 하반기에는 그 인연이 협업이나 새 일로 이어집니다. 다만 약속을 너무 많이 잡아 신뢰를 잃기 쉬우니 일정표를 믿고 '못 한다'는 말도 연습하세요. 재물은 여러 갈래로 들어오지만 작은 지출이 모여 새니 가계부가 큰 도움이 됩니다.",
      en: "This year words open doors for Gemini. Presentations, writing and social media bring attention in the first half, and those connections turn into collaborations or new work in the second half. Overbooking can cost trust, so trust your calendar and practice saying you cannot. Money arrives from several directions but leaks through small expenses, so a spending log helps greatly.",
      zh: "双子座今年语言和文字会打开机会。上半年在演讲、写作、社交媒体等表达场合受到关注，下半年这些缘分会变成合作或新工作。但约定太多容易失去信任，相信日程表，也练习说“做不到”。财运多路进账，却被零碎支出漏掉，记账会很有帮助。",
      ja: "ふたご座の今年は言葉と文章が機会を開く流れです。上半期は発表、執筆、SNSなど表現する場で注目され、下半期にはその縁が協業や新しい仕事につながります。ただ約束を詰め込みすぎて信頼を失いやすいので、予定表を信じて「できない」と言う練習も。お金は複数の道から入りますが小さな出費が集まって漏れるので、家計簿が大きな助けになります。",
    },
    faq: [
      {
        question: { ko: "쌍둥이자리는 몇 월 며칠생인가요?", en: "What dates are Gemini?", zh: "双子座是几月几日出生？", ja: "ふたご座は何月何日生まれ？" },
        answer: {
          ko: "쌍둥이자리는 5월 21일부터 6월 21일 사이에 태어난 사람이에요. 5월 20~21일, 6월 21~22일처럼 경계 날짜는 해마다 조금씩 달라 황소자리나 게자리로 보기도 하니 출생 시각까지 확인하면 정확합니다.",
          en: "Gemini covers birthdays from May 21 to June 21. Cusp dates such as May 20–21 and June 21–22 shift slightly each year and may be read as Taurus or Cancer, so checking your birth time gives certainty.",
          zh: "双子座是5月21日至6月21日出生的人。5月20~21日、6月21~22日这类交界日期每年略有不同，也可能被视为金牛座或巨蟹座，核对出生时间会更准确。",
          ja: "ふたご座は5月21日から6月21日の間に生まれた人です。5月20〜21日、6月21〜22日のような境目の日付は年ごとに少し違い、おうし座やかに座とされることもあるので、出生時刻まで確認すると正確です。",
        },
      },
      {
        question: { ko: "쌍둥이자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Gemini?", zh: "双子座和什么星座最配？", ja: "ふたご座と相性の良い星座は？" },
        answer: {
          ko: "같은 공기의 별자리인 천칭자리·물병자리와는 대화의 결이 맞아 지루할 틈이 없고, 불의 별자리인 양자리·사자자리는 쌍둥이자리의 아이디어를 행동으로 옮겨 줍니다. 물의 별자리인 물고기자리나 흙의 별자리인 처녀자리와는 감정과 디테일을 대하는 방식이 달라 조율이 필요해요. 궁합은 재미로 보는 참고입니다.",
          en: "Fellow air signs Libra and Aquarius match Gemini's conversational wavelength, leaving no room for boredom, while fire signs Aries and Leo turn its ideas into action. With water sign Pisces or earth sign Virgo, different ways of handling emotion and detail call for adjustment. Compatibility is a fun reference.",
          zh: "与同为风象的天秤座、水瓶座聊天频率一致、毫无冷场；火象的白羊座、狮子座能把双子座的点子付诸行动。与水象的双鱼座或土象的处女座在情感和细节的处理方式上不同，需要磨合。配对仅供娱乐参考。",
          ja: "同じ風のサインのてんびん座・みずがめ座とは会話の質が合って退屈する暇がなく、火のサインのおひつじ座・しし座はふたご座のアイデアを行動に移してくれます。水のサインのうお座や地のサインのおとめ座とは感情とディテールの扱い方が違い調整が必要です。相性は楽しみとして見る参考です。",
        },
      },
    ],
  },
  {
    id: "cancer",
    element: ELEMENT_WATER,
    keywords: { ko: ["게자리 오늘의 운세", "게자리 운세", "게자리 성격", "게자리 궁합", "게자리 날짜"], en: ["cancer daily horoscope", "cancer zodiac personality"] },
    personality: {
      ko: "게자리는 가족과 가까운 사람을 지키는 따뜻한 보호자의 별자리예요. 감수성이 풍부하고 기억력이 좋아 사람들의 작은 말과 표정을 오래 간직합니다. 겉은 단단해 보여도 속은 여리고, 상처받으면 껍질 속으로 숨어 버리는 경향이 있어요.",
      en: "Cancer is the warm protector who guards family and close friends. Sensitive with a long memory, it holds onto people's small words and expressions for years. Hard on the outside but tender within, and when hurt it tends to retreat into its shell.",
      zh: "巨蟹座是守护家人和亲近之人的温暖保护者。感受力丰富、记性好，把别人的只言片语和神情记很久。外表坚硬内心柔软，受伤时容易躲回壳里。",
      ja: "かに座は家族と身近な人を守る温かい保護者の星座です。感受性が豊かで記憶力が良く、人の小さな言葉や表情を長く覚えています。外は固く見えても中は柔らかく、傷つくと殻の中に隠れてしまう傾向があります。",
    },
    match: {
      ko: "같은 물의 별자리인 전갈자리·물고기자리, 그리고 안정감을 주는 황소자리·처녀자리와 잘 맞습니다. 교육, 보육, 간호, 요리, 상담, 인테리어처럼 돌봄과 공간을 다루는 일에서 능력을 발휘해요.",
      en: "Cancer matches fellow water signs Scorpio and Pisces, and earth signs Taurus and Virgo that offer stability. It excels in teaching, childcare, nursing, cooking, counseling and interior design, where care and space are the work.",
      zh: "与同为水象的天蝎座、双鱼座，以及带来安定感的金牛座、处女座最为相配。在教育、保育、护理、烹饪、咨询、室内设计等与照护和空间相关的工作中能发挥所长。",
      ja: "同じ水のサインのさそり座・うお座、そして安定感をくれるおうし座・おとめ座と相性が良いです。教育、保育、看護、料理、相談、インテリアなどケアと空間を扱う仕事で力を発揮します。",
    },
    yearFlow: {
      ko: "게자리의 올해는 집과 가족, 그리고 마음의 터전을 다지는 흐름이에요. 상반기에는 이사나 집 꾸미기, 가족 행사처럼 보금자리와 관련된 일이 생기고, 하반기에는 안정된 마음을 바탕으로 일에서 성과가 납니다. 다만 과거의 상처를 곱씹느라 현재의 기회를 놓치지 않도록 주의하세요. 재물은 가족을 위한 지출이 늘지만 그만큼 든든한 지원도 돌아오는 해입니다.",
      en: "This year Cancer builds its home, family and emotional base. The first half brings matters tied to the nest, such as moving, decorating or family events, and the second half yields results at work on that settled footing. Take care not to miss present opportunities while chewing over old wounds. Family spending rises, but equally solid support comes back this year.",
      zh: "巨蟹座今年是夯实家庭、家人和心灵归属的一年。上半年会有搬家、布置房子、家庭活动等与巢穴相关的事，下半年在安稳的心态上工作出成果。但别因反复咀嚼过去的伤痛而错过眼前的机会。为家人的支出增加，但同样会有可靠的支持回馈。",
      ja: "かに座の今年は家と家族、そして心の拠り所を固める流れです。上半期は引っ越しや部屋づくり、家族の行事など住まいに関することが起こり、下半期は安定した心を土台に仕事で成果が出ます。ただ過去の傷を反芻して今の機会を逃さないよう注意を。家族のための出費が増えますが、その分頼もしい支えも返ってくる年です。",
    },
    faq: [
      {
        question: { ko: "게자리는 몇 월 며칠생인가요?", en: "What dates are Cancer?", zh: "巨蟹座是几月几日出生？", ja: "かに座は何月何日生まれ？" },
        answer: {
          ko: "게자리는 6월 22일부터 7월 22일 사이에 태어난 사람이에요. 6월 21~22일, 7월 22~23일처럼 경계 날짜는 해마다 조금씩 달라 쌍둥이자리나 사자자리로 보기도 하니 출생 시각을 확인하면 정확합니다.",
          en: "Cancer covers birthdays from June 22 to July 22. Cusp dates such as June 21–22 and July 22–23 shift slightly each year and may be read as Gemini or Leo, so checking your birth time gives certainty.",
          zh: "巨蟹座是6月22日至7月22日出生的人。6月21~22日、7月22~23日这类交界日期每年略有不同，也可能被视为双子座或狮子座，核对出生时间会更准确。",
          ja: "かに座は6月22日から7月22日の間に生まれた人です。6月21〜22日、7月22〜23日のような境目の日付は年ごとに少し違い、ふたご座やしし座とされることもあるので、出生時刻を確認すると正確です。",
        },
      },
      {
        question: { ko: "게자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Cancer?", zh: "巨蟹座和什么星座最配？", ja: "かに座と相性の良い星座は？" },
        answer: {
          ko: "같은 물의 별자리인 전갈자리·물고기자리와는 감정의 깊이가 비슷해 서로를 잘 이해하고, 흙의 별자리인 황소자리·처녀자리는 게자리가 원하는 안정과 현실감을 줍니다. 불의 별자리인 양자리나 공기의 별자리인 물병자리와는 감정 표현의 온도가 달라 섭섭함이 쌓이기 쉬워요. 궁합은 재미로 참고하세요.",
          en: "Fellow water signs Scorpio and Pisces share Cancer's emotional depth and understand it well, while earth signs Taurus and Virgo provide the stability and realism it wants. With fire sign Aries or air sign Aquarius, the temperature of emotional expression differs and hurt feelings pile up. Treat compatibility as a fun reference.",
          zh: "与同为水象的天蝎座、双鱼座情感深度相近、彼此理解；土象的金牛座、处女座能给巨蟹座想要的安定与现实感。与火象的白羊座或风象的水瓶座情感表达温度不同，容易积累委屈。配对仅供娱乐参考。",
          ja: "同じ水のサインのさそり座・うお座とは感情の深さが似ていてよく理解し合え、地のサインのおうし座・おとめ座はかに座が望む安定と現実感をくれます。火のサインのおひつじ座や風のサインのみずがめ座とは感情表現の温度が違い、寂しさが溜まりやすいです。相性は楽しみとして参考に。",
        },
      },
    ],
  },
  {
    id: "leo",
    element: ELEMENT_FIRE,
    keywords: { ko: ["사자자리 오늘의 운세", "사자자리 운세", "사자자리 성격", "사자자리 궁합", "사자자리 날짜"], en: ["leo daily horoscope", "leo personality"] },
    personality: {
      ko: "사자자리는 태양처럼 빛나는 존재감과 자신감의 별자리예요. 무대 중앙이 어울리는 타고난 리더로, 통이 크고 베풀기를 좋아해 주변에 사람이 모입니다. 자존심이 강해 인정받지 못하면 쉽게 상처받지만, 칭찬 한마디에 다시 세상을 밝힐 힘을 얻어요.",
      en: "Leo is the sign of sun-like presence and confidence. A born leader who belongs at center stage, generous and open-handed, so people gather around it. Strong pride means it is easily hurt when unrecognized, yet one word of praise restores its power to light up the world.",
      zh: "狮子座是如太阳般耀眼的存在感与自信之星。天生的领导者，站在舞台中央再合适不过，大方爱付出，身边总是聚人。自尊心强，得不到认可时容易受伤，但一句称赞就能让他重新点亮世界。",
      ja: "しし座は太陽のように輝く存在感と自信の星座です。舞台の中央が似合う生まれながらのリーダーで、器が大きく与えるのが好きなので周りに人が集まります。プライドが強く認められないと傷つきやすいですが、褒め言葉一つで再び世界を照らす力を得ます。",
    },
    match: {
      ko: "같은 불의 별자리인 양자리·사수자리, 그리고 지적인 대화 상대가 되어 주는 쌍둥이자리·천칭자리와 잘 맞습니다. 경영, 연예·공연, 교육, 정치, 브랜드 마케팅처럼 사람 앞에 서고 이끄는 일에서 가장 빛나요.",
      en: "Leo matches fellow fire signs Aries and Sagittarius, and air signs Gemini and Libra that make great conversation partners. It shines most in management, entertainment and performance, teaching, politics and brand marketing, where it stands before and leads people.",
      zh: "与同为火象的白羊座、射手座，以及能成为智性对话伙伴的双子座、天秤座最为相配。在经营、演艺表演、教育、政治、品牌营销等站在人前引领的工作中最为耀眼。",
      ja: "同じ火のサインのおひつじ座・いて座、そして知的な会話相手になってくれるふたご座・てんびん座と相性が良いです。経営、芸能・公演、教育、政治、ブランドマーケティングなど人前に立って導く仕事で最も輝きます。",
    },
    yearFlow: {
      ko: "사자자리의 올해는 무대가 커지는 흐름이에요. 상반기에는 당신의 성과가 공개적으로 인정받는 자리가 생기고, 그 평판이 하반기의 더 큰 제안으로 이어집니다. 다만 주목받을수록 질투와 견제도 따라오니 겸손한 태도가 최고의 방패가 돼요. 재물은 들어오는 규모가 커지지만 체면과 선물에 쓰는 돈도 함께 늘어나니 비율을 정해 두는 것이 좋습니다.",
      en: "This year Leo's stage grows larger. Public recognition of your achievements arrives in the first half, and that reputation leads to bigger offers in the second. The more attention you draw, the more envy and pushback follow, so humility becomes your best shield. Money comes in on a larger scale, but spending on appearances and gifts grows too, so set a fixed ratio.",
      zh: "狮子座今年舞台变大。上半年你的成果会在公开场合得到认可，这份声望在下半年带来更大的提议。但越受瞩目，嫉妒和牵制也越多，谦逊的态度是最好的盾牌。财运进账规模变大，但花在面子和礼物上的钱也随之增加，最好定好比例。",
      ja: "しし座の今年は舞台が大きくなる流れです。上半期はあなたの成果が公の場で認められる機会があり、その評判が下半期のより大きな提案につながります。ただ注目されるほど嫉妬と牽制もついてくるので、謙虚な態度が最高の盾になります。お金は入る規模が大きくなりますが、体面や贈り物に使うお金も一緒に増えるので、割合を決めておくのが良いでしょう。",
    },
    faq: [
      {
        question: { ko: "사자자리는 몇 월 며칠생인가요?", en: "What dates are Leo?", zh: "狮子座是几月几日出生？", ja: "しし座は何月何日生まれ？" },
        answer: {
          ko: "사자자리는 7월 23일부터 8월 22일 사이에 태어난 사람이에요. 7월 22~23일, 8월 22~23일처럼 경계 날짜는 해마다 조금씩 달라 게자리나 처녀자리로 보기도 하니 출생 시각까지 확인하면 정확합니다.",
          en: "Leo covers birthdays from July 23 to August 22. Cusp dates such as July 22–23 and August 22–23 shift slightly each year and may be read as Cancer or Virgo, so checking your birth time gives certainty.",
          zh: "狮子座是7月23日至8月22日出生的人。7月22~23日、8月22~23日这类交界日期每年略有不同，也可能被视为巨蟹座或处女座，核对出生时间会更准确。",
          ja: "しし座は7月23日から8月22日の間に生まれた人です。7月22〜23日、8月22〜23日のような境目の日付は年ごとに少し違い、かに座やおとめ座とされることもあるので、出生時刻まで確認すると正確です。",
        },
      },
      {
        question: { ko: "사자자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Leo?", zh: "狮子座和什么星座最配？", ja: "しし座と相性の良い星座は？" },
        answer: {
          ko: "같은 불의 별자리인 양자리·사수자리와는 열정이 통해 함께 큰일을 벌이기 좋고, 공기의 별자리인 쌍둥이자리·천칭자리는 사자자리를 빛나게 받쳐 주는 관객이자 조언자가 됩니다. 흙의 별자리인 황소자리나 물의 별자리인 전갈자리와는 둘 다 고집이 세서 주도권 다툼이 생기기 쉬워요. 궁합은 재미로 보는 참고 기준입니다.",
          en: "Fellow fire signs Aries and Sagittarius share Leo's passion and make great partners for big ventures, while air signs Gemini and Libra are the audience and advisors that let Leo shine. With earth sign Taurus or water sign Scorpio, both sides are stubborn and struggles over control arise easily. Compatibility is a fun reference.",
          zh: "与同为火象的白羊座、射手座热情相通，适合一起干大事；风象的双子座、天秤座是让狮子座发光的观众兼顾问。与土象的金牛座或水象的天蝎座都很固执，容易争夺主导权。配对仅供娱乐参考。",
          ja: "同じ火のサインのおひつじ座・いて座とは情熱が通じて一緒に大きなことを始めるのに良く、風のサインのふたご座・てんびん座はしし座を輝かせて支える観客であり助言者になります。地のサインのおうし座や水のサインのさそり座とはどちらも頑固で主導権争いが起きやすいです。相性は楽しみとして見る参考基準です。",
        },
      },
    ],
  },
  {
    id: "virgo",
    element: ELEMENT_EARTH,
    keywords: { ko: ["처녀자리 오늘의 운세", "처녀자리 운세", "처녀자리 성격", "처녀자리 궁합", "처녀자리 날짜"], en: ["virgo daily horoscope", "virgo personality"] },
    personality: {
      ko: "처녀자리는 분석력과 섬세함이 돋보이는 완벽주의의 별자리예요. 남들이 지나치는 작은 오류를 찾아내고, 맡은 일은 계획대로 깔끔하게 마무리합니다. 겸손하고 헌신적이지만 자신과 남에게 기준이 높아 스스로를 피곤하게 만들기도 해요.",
      en: "Virgo is the perfectionist, notable for analysis and attention to detail. It spots the small errors others miss and finishes its work neatly according to plan. Modest and devoted, yet high standards for itself and others can wear it out.",
      zh: "处女座是分析力与细腻并重的完美主义之星。能找出别人忽略的小错误，接手的事按计划干净利落地完成。谦逊奉献，但对自己和他人标准都高，有时把自己弄得很累。",
      ja: "おとめ座は分析力と繊細さが際立つ完璧主義の星座です。人が見過ごす小さな誤りを見つけ、任された仕事は計画通りきれいに仕上げます。謙虚で献身的ですが、自分と他人への基準が高く自分を疲れさせることもあります。",
    },
    match: {
      ko: "같은 흙의 별자리인 황소자리·염소자리, 그리고 깊은 정서를 나누는 게자리·전갈자리와 잘 맞습니다. 의료, 회계, 데이터 분석, 편집, 품질 관리, 연구처럼 정확함이 곧 실력인 일에서 빛나요.",
      en: "Virgo matches fellow earth signs Taurus and Capricorn, and water signs Cancer and Scorpio that share deep feeling. It shines in medicine, accounting, data analysis, editing, quality control and research, where precision is the skill.",
      zh: "与同为土象的金牛座、摩羯座，以及分享深厚情感的巨蟹座、天蝎座最为相配。在医疗、会计、数据分析、编辑、质量管理、研究等精准即实力的工作中大放异彩。",
      ja: "同じ地のサインのおうし座・やぎ座、そして深い情緒を分かち合うかに座・さそり座と相性が良いです。医療、会計、データ分析、編集、品質管理、研究など正確さがそのまま実力になる仕事で輝きます。",
    },
    yearFlow: {
      ko: "처녀자리의 올해는 꼼꼼함이 신뢰와 기회로 돌아오는 흐름이에요. 상반기에는 당신이 정리하고 개선한 일이 조직에서 인정받고, 하반기에는 더 큰 책임이나 전문성을 살릴 자리가 열립니다. 다만 모든 것을 완벽하게 하려다 시작을 미루는 버릇이 발목을 잡을 수 있으니 '80점에 일단 제출'을 올해의 원칙으로 삼으세요. 건강은 소화기와 스트레스성 피로를 살피고, 재물은 계획적인 관리 덕에 꾸준히 늘어납니다.",
      en: "This year Virgo's thoroughness returns as trust and opportunity. What you organized and improved earns recognition in the first half, and the second half opens positions with more responsibility or room for expertise. The habit of delaying a start until everything is perfect can hold you back, so make 'submit at 80 percent' this year's rule. Watch digestion and stress fatigue, and finances grow steadily thanks to planned management.",
      zh: "处女座今年细致会换来信任与机会。上半年你整理和改善的工作在组织中获得认可，下半年会打开承担更大责任或发挥专业的位置。但凡事追求完美而拖延开始的习惯可能绊住你，把“80分先交”当作今年的原则。健康上留意消化系统和压力性疲劳，财运因有计划的管理而稳步增长。",
      ja: "おとめ座の今年は几帳面さが信頼と機会として返ってくる流れです。上半期はあなたが整理し改善したことが組織で認められ、下半期にはより大きな責任や専門性を活かす場が開けます。ただ全てを完璧にしようとして着手を先延ばしにする癖が足を引っ張るので、「80点でまず提出」を今年の原則に。健康は消化器とストレス性の疲れに気を配り、お金は計画的な管理のおかげで着実に増えます。",
    },
    faq: [
      {
        question: { ko: "처녀자리는 몇 월 며칠생인가요?", en: "What dates are Virgo?", zh: "处女座是几月几日出生？", ja: "おとめ座は何月何日生まれ？" },
        answer: {
          ko: "처녀자리는 8월 23일부터 9월 22일 사이에 태어난 사람이에요. 8월 22~23일, 9월 22~23일처럼 경계 날짜는 해마다 조금씩 달라 사자자리나 천칭자리로 보기도 하니 출생 시각을 확인하면 정확합니다.",
          en: "Virgo covers birthdays from August 23 to September 22. Cusp dates such as August 22–23 and September 22–23 shift slightly each year and may be read as Leo or Libra, so checking your birth time gives certainty.",
          zh: "处女座是8月23日至9月22日出生的人。8月22~23日、9月22~23日这类交界日期每年略有不同，也可能被视为狮子座或天秤座，核对出生时间会更准确。",
          ja: "おとめ座は8月23日から9月22日の間に生まれた人です。8月22〜23日、9月22〜23日のような境目の日付は年ごとに少し違い、しし座やてんびん座とされることもあるので、出生時刻を確認すると正確です。",
        },
      },
      {
        question: { ko: "처녀자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Virgo?", zh: "处女座和什么星座最配？", ja: "おとめ座と相性の良い星座は？" },
        answer: {
          ko: "같은 흙의 별자리인 황소자리·염소자리와는 현실적인 가치관이 맞아 든든하고, 물의 별자리인 게자리·전갈자리는 처녀자리의 세심함을 깊은 애정으로 돌려줍니다. 불의 별자리인 사수자리나 공기의 별자리인 쌍둥이자리와는 계획과 즉흥의 차이로 부딪히기 쉬워요. 궁합은 재미로 참고하는 기준입니다.",
          en: "Fellow earth signs Taurus and Capricorn share Virgo's practical values for a dependable bond, while water signs Cancer and Scorpio return its attentiveness with deep affection. With fire sign Sagittarius or air sign Gemini, the gap between planning and improvisation causes friction. Compatibility is a fun reference.",
          zh: "与同为土象的金牛座、摩羯座现实价值观一致、关系可靠；水象的巨蟹座、天蝎座会用深情回报处女座的细心。与火象的射手座或风象的双子座在计划与随性之间容易碰撞。配对仅供娱乐参考。",
          ja: "同じ地のサインのおうし座・やぎ座とは現実的な価値観が合って頼もしく、水のサインのかに座・さそり座はおとめ座の細やかさを深い愛情で返してくれます。火のサインのいて座や風のサインのふたご座とは計画と即興の違いでぶつかりやすいです。相性は楽しみとして参考にする基準です。",
        },
      },
    ],
  },
  {
    id: "libra",
    element: ELEMENT_AIR,
    keywords: { ko: ["천칭자리 오늘의 운세", "천칭자리 운세", "천칭자리 성격", "천칭자리 궁합", "천칭자리 날짜"], en: ["libra daily horoscope", "libra personality"] },
    personality: {
      ko: "천칭자리는 균형과 조화를 사랑하는 우아한 별자리예요. 양쪽 입장을 모두 헤아리는 공정함과 세련된 미적 감각, 부드러운 사교성으로 어디서나 환영받습니다. 다만 모두를 만족시키려다 결정을 미루거나, 갈등을 피하려 속마음을 숨기는 것이 약점이 되기도 해요.",
      en: "Libra is the graceful sign that loves balance and harmony. Fairness that weighs both sides, refined aesthetic taste and gentle sociability make it welcome everywhere. Trying to please everyone can delay decisions, and avoiding conflict can mean hiding true feelings.",
      zh: "天秤座是热爱平衡与和谐的优雅之星。兼顾双方立场的公正、精致的审美和温和的社交力让它处处受欢迎。但想让所有人满意而拖延决定，或为避免冲突而隐藏真心，有时成为弱点。",
      ja: "てんびん座はバランスと調和を愛する優雅な星座です。双方の立場を汲む公正さと洗練された美的センス、柔らかな社交性でどこでも歓迎されます。ただ皆を満足させようとして決断を先延ばしにしたり、衝突を避けるため本心を隠すことが弱点になることもあります。",
    },
    match: {
      ko: "같은 공기의 별자리인 쌍둥이자리·물병자리, 그리고 당당한 에너지로 끌어 주는 사자자리·사수자리와 잘 맞습니다. 디자인, 패션, 법률·중재, 외교, 인사, 예술 기획처럼 조율과 미감이 가치가 되는 일에서 빛나요.",
      en: "Libra matches fellow air signs Gemini and Aquarius, and fire signs Leo and Sagittarius that pull it along with bold energy. It shines in design, fashion, law and mediation, diplomacy, HR and arts curation, where coordination and taste are valued.",
      zh: "与同为风象的双子座、水瓶座，以及用堂堂正正的能量牵引它的狮子座、射手座最为相配。在设计、时尚、法律调解、外交、人事、艺术策划等以协调和美感为价值的工作中大放异彩。",
      ja: "同じ風のサインのふたご座・みずがめ座、そして堂々としたエネルギーで引っ張ってくれるしし座・いて座と相性が良いです。デザイン、ファッション、法律・調停、外交、人事、芸術企画など調整と美意識が価値になる仕事で輝きます。",
    },
    yearFlow: {
      ko: "천칭자리의 올해는 관계가 운을 이끄는 흐름이에요. 상반기에는 파트너십이나 협업 제안이 들어오고, 함께할 사람을 잘 고르면 하반기에 그 결실이 뚜렷해집니다. 다만 우유부단함이 기회를 흘려보낼 수 있으니 결정 마감일을 스스로 정해 두세요. 재물은 공동 사업이나 계약에서 늘어나는데, 서류는 반드시 꼼꼼히 읽고 서명해야 손해가 없습니다.",
      en: "This year relationships lead Libra's luck. Partnership or collaboration offers arrive in the first half, and choosing the right people makes the results clear in the second. Indecision can let chances slip, so set your own deadlines for decisions. Wealth grows through joint ventures and contracts, and reading every document carefully before signing keeps you from loss.",
      zh: "天秤座今年人际关系牵引运势。上半年会收到合伙或合作的提议，选对同行的人，下半年成果就会清晰可见。但优柔寡断可能让机会溜走，给自己定下决定的截止日。财运在合作事业或合同中增长，文件务必仔细读完再签字才不会吃亏。",
      ja: "てんびん座の今年は人間関係が運を導く流れです。上半期はパートナーシップや協業の提案が入り、一緒にやる人をよく選べば下半期にその実りがはっきりします。ただ優柔不断さが機会を流してしまうので、決断の締め切りを自分で決めておいて。お金は共同事業や契約で増えますが、書類は必ず丁寧に読んでから署名すれば損がありません。",
    },
    faq: [
      {
        question: { ko: "천칭자리는 몇 월 며칠생인가요?", en: "What dates are Libra?", zh: "天秤座是几月几日出生？", ja: "てんびん座は何月何日生まれ？" },
        answer: {
          ko: "천칭자리는 9월 23일부터 10월 22일 사이에 태어난 사람이에요. 9월 22~23일, 10월 22~23일처럼 경계 날짜는 해마다 조금씩 달라 처녀자리나 전갈자리로 보기도 하니 출생 시각까지 확인하면 정확합니다.",
          en: "Libra covers birthdays from September 23 to October 22. Cusp dates such as September 22–23 and October 22–23 shift slightly each year and may be read as Virgo or Scorpio, so checking your birth time gives certainty.",
          zh: "天秤座是9月23日至10月22日出生的人。9月22~23日、10月22~23日这类交界日期每年略有不同，也可能被视为处女座或天蝎座，核对出生时间会更准确。",
          ja: "てんびん座は9月23日から10月22日の間に生まれた人です。9月22〜23日、10月22〜23日のような境目の日付は年ごとに少し違い、おとめ座やさそり座とされることもあるので、出生時刻まで確認すると正確です。",
        },
      },
      {
        question: { ko: "천칭자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Libra?", zh: "天秤座和什么星座最配？", ja: "てんびん座と相性の良い星座は？" },
        answer: {
          ko: "같은 공기의 별자리인 쌍둥이자리·물병자리와는 취향과 대화가 잘 맞아 편안하고, 불의 별자리인 사자자리·사수자리는 천칭자리의 망설임을 시원하게 밀어 줍니다. 물의 별자리인 게자리나 흙의 별자리인 염소자리와는 감정과 현실을 대하는 방식이 달라 거리감이 생기기 쉬워요. 궁합은 재미로 참고하세요.",
          en: "Fellow air signs Gemini and Aquarius share Libra's tastes and conversation for easy company, while fire signs Leo and Sagittarius push past its hesitation. With water sign Cancer or earth sign Capricorn, different approaches to emotion and practicality can create distance. Treat compatibility as a fun reference.",
          zh: "与同为风象的双子座、水瓶座品味和话题相投、相处自在；火象的狮子座、射手座能干脆地推开天秤座的犹豫。与水象的巨蟹座或土象的摩羯座对待情感和现实的方式不同，容易产生距离感。配对仅供娱乐参考。",
          ja: "同じ風のサインのふたご座・みずがめ座とは趣味と会話がよく合って楽で、火のサインのしし座・いて座はてんびん座のためらいを気持ちよく押してくれます。水のサインのかに座や地のサインのやぎ座とは感情と現実への向き合い方が違い、距離感が生まれやすいです。相性は楽しみとして参考に。",
        },
      },
    ],
  },
  {
    id: "scorpio",
    element: ELEMENT_WATER,
    keywords: { ko: ["전갈자리 오늘의 운세", "전갈자리 운세", "전갈자리 성격", "전갈자리 궁합", "전갈자리 날짜"], en: ["scorpio daily horoscope", "scorpio personality"] },
    personality: {
      ko: "전갈자리는 깊고 강렬한 감정과 집중력을 가진 신비의 별자리예요. 겉으로는 차분하지만 속에는 뜨거운 열정이 있고, 한번 마음을 정하면 끝까지 파고듭니다. 사람의 본심을 꿰뚫어 보는 직관이 뛰어나지만, 의심과 질투가 깊어지면 스스로를 괴롭히기도 해요.",
      en: "Scorpio is the sign of mystery, with deep intense emotion and focus. Calm on the surface but burning within, once its mind is made up it digs to the end. Its intuition sees through people's true intentions, yet when suspicion and jealousy deepen, they torment it.",
      zh: "天蝎座是拥有深沉强烈情感与专注力的神秘之星。表面平静，内心却炽热，一旦下定决心就钻研到底。看穿人心的直觉出众，但疑心和嫉妒加深时也会折磨自己。",
      ja: "さそり座は深く強烈な感情と集中力を持つ神秘の星座です。表面は落ち着いていますが内には熱い情熱があり、一度心を決めると最後まで掘り下げます。人の本心を見抜く直感に優れますが、疑いと嫉妬が深まると自分を苦しめることもあります。",
    },
    match: {
      ko: "같은 물의 별자리인 게자리·물고기자리, 그리고 현실적으로 받쳐 주는 처녀자리·염소자리와 잘 맞습니다. 심리, 수사·조사, 연구, 외과, 금융 투자, 위기 관리처럼 깊이 파고드는 집중력이 무기가 되는 일에서 빛나요.",
      en: "Scorpio matches fellow water signs Cancer and Pisces, and earth signs Virgo and Capricorn that ground it practically. It shines in psychology, investigation, research, surgery, investment and crisis management, where deep focus is the weapon.",
      zh: "与同为水象的巨蟹座、双鱼座，以及给予现实支撑的处女座、摩羯座最为相配。在心理、侦查调查、研究、外科、金融投资、危机管理等以深度专注为武器的工作中大放异彩。",
      ja: "同じ水のサインのかに座・うお座、そして現実的に支えてくれるおとめ座・やぎ座と相性が良いです。心理、捜査・調査、研究、外科、金融投資、危機管理など深く掘り下げる集中力が武器になる仕事で輝きます。",
    },
    yearFlow: {
      ko: "전갈자리의 올해는 묵은 것을 정리하고 새로 태어나는 흐름이에요. 상반기에는 끝내야 할 관계나 일이 분명해지고, 그것을 놓아 보내면 하반기에 더 깊고 건강한 인연과 기회가 들어옵니다. 다만 집착이 강해지는 시기라 통제하려는 마음을 내려놓는 연습이 필요해요. 재물은 숨어 있던 수입원이나 투자 성과가 드러나지만 비밀스러운 거래는 피하는 것이 좋습니다.",
      en: "This year Scorpio clears out the old and is reborn. Relationships or work that must end become clear in the first half, and letting them go brings deeper, healthier connections and opportunities in the second. Attachment runs strong this year, so practice releasing the urge to control. Hidden income sources or investment gains surface, but avoid secretive dealings.",
      zh: "天蝎座今年是清理陈旧、重获新生的一年。上半年该结束的关系或事情会变得清晰，放手后下半年会迎来更深更健康的缘分与机会。但今年执念容易加重，需要练习放下控制欲。财运上隐藏的收入来源或投资成果会显现，但要避开隐秘的交易。",
      ja: "さそり座の今年は古いものを整理して生まれ変わる流れです。上半期は終わらせるべき関係や仕事がはっきりし、それを手放せば下半期により深く健全な縁と機会が入ってきます。ただ執着が強くなる時期なので、コントロールしたい気持ちを手放す練習が必要です。お金は隠れていた収入源や投資の成果が現れますが、秘密めいた取引は避けた方が良いでしょう。",
    },
    faq: [
      {
        question: { ko: "전갈자리는 몇 월 며칠생인가요?", en: "What dates are Scorpio?", zh: "天蝎座是几月几日出生？", ja: "さそり座は何月何日生まれ？" },
        answer: {
          ko: "전갈자리는 10월 23일부터 11월 21일 사이에 태어난 사람이에요. 10월 22~23일, 11월 21~22일처럼 경계 날짜는 해마다 조금씩 달라 천칭자리나 사수자리로 보기도 하니 출생 시각을 확인하면 정확합니다.",
          en: "Scorpio covers birthdays from October 23 to November 21. Cusp dates such as October 22–23 and November 21–22 shift slightly each year and may be read as Libra or Sagittarius, so checking your birth time gives certainty.",
          zh: "天蝎座是10月23日至11月21日出生的人。10月22~23日、11月21~22日这类交界日期每年略有不同，也可能被视为天秤座或射手座，核对出生时间会更准确。",
          ja: "さそり座は10月23日から11月21日の間に生まれた人です。10月22〜23日、11月21〜22日のような境目の日付は年ごとに少し違い、てんびん座やいて座とされることもあるので、出生時刻を確認すると正確です。",
        },
      },
      {
        question: { ko: "전갈자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Scorpio?", zh: "天蝎座和什么星座最配？", ja: "さそり座と相性の良い星座は？" },
        answer: {
          ko: "같은 물의 별자리인 게자리·물고기자리와는 감정의 깊이가 통해 말없이도 이해받는 느낌을 주고, 흙의 별자리인 처녀자리·염소자리는 전갈자리의 강렬함을 현실적으로 받아 줍니다. 불의 별자리인 사자자리나 공기의 별자리인 물병자리와는 주도권과 거리감을 두고 충돌하기 쉬워요. 궁합은 재미로 보는 참고 기준입니다.",
          en: "Fellow water signs Cancer and Pisces share Scorpio's emotional depth, giving a sense of being understood without words, while earth signs Virgo and Capricorn absorb its intensity practically. With fire sign Leo or air sign Aquarius, clashes over control and distance come easily. Compatibility is a fun reference.",
          zh: "与同为水象的巨蟹座、双鱼座情感深度相通，不说也被理解；土象的处女座、摩羯座能务实地接住天蝎座的强烈。与火象的狮子座或风象的水瓶座容易在主导权和距离感上冲突。配对仅供娱乐参考。",
          ja: "同じ水のサインのかに座・うお座とは感情の深さが通じて言葉がなくても理解される感覚があり、地のサインのおとめ座・やぎ座はさそり座の強烈さを現実的に受け止めてくれます。火のサインのしし座や風のサインのみずがめ座とは主導権と距離感をめぐって衝突しやすいです。相性は楽しみとして見る参考基準です。",
        },
      },
    ],
  },
  {
    id: "sagittarius",
    element: ELEMENT_FIRE,
    keywords: { ko: ["사수자리 오늘의 운세", "사수자리 운세", "사수자리 성격", "사수자리 궁합", "사수자리 날짜", "궁수자리 운세"], en: ["sagittarius daily horoscope", "sagittarius personality"] },
    personality: {
      ko: "사수자리는 자유와 모험을 사랑하는 낙천가의 별자리예요. 넓은 시야와 철학적인 호기심으로 먼 곳과 새로운 생각을 향해 끊임없이 화살을 쏩니다. 솔직하고 유쾌하지만 직설적인 말과 약속을 가볍게 여기는 태도가 오해를 부르기도 해요.",
      en: "Sagittarius is the optimist who loves freedom and adventure. With a wide view and philosophical curiosity, it keeps firing arrows toward distant places and new ideas. Honest and cheerful, though blunt words and a casual attitude toward promises can cause misunderstanding.",
      zh: "射手座是热爱自由与冒险的乐天派。凭借开阔的视野和哲学式的好奇心，不断向远方和新思想射出箭矢。坦率愉快，但直言不讳和不把承诺当回事的态度有时会招致误会。",
      ja: "いて座は自由と冒険を愛する楽天家の星座です。広い視野と哲学的な好奇心で、遠い場所と新しい考えに向かって絶えず矢を放ちます。率直で愉快ですが、直球な言葉と約束を軽く見る態度が誤解を招くこともあります。",
    },
    match: {
      ko: "같은 불의 별자리인 양자리·사자자리, 그리고 자유를 존중해 주는 천칭자리·물병자리와 잘 맞습니다. 여행, 출판, 교육, 해외 사업, 스포츠, 철학·종교처럼 넓은 세계와 의미를 다루는 일이 체질에 맞아요.",
      en: "Sagittarius matches fellow fire signs Aries and Leo, and air signs Libra and Aquarius that respect its freedom. Travel, publishing, teaching, international business, sports and philosophy or religion, dealing with the wide world and meaning, suit its nature.",
      zh: "与同为火象的白羊座、狮子座，以及尊重它自由的天秤座、水瓶座最为相配。旅行、出版、教育、海外事业、体育、哲学宗教等涉及广阔世界与意义的工作最合体质。",
      ja: "同じ火のサインのおひつじ座・しし座、そして自由を尊重してくれるてんびん座・みずがめ座と相性が良いです。旅行、出版、教育、海外事業、スポーツ、哲学・宗教など広い世界と意味を扱う仕事が体質に合います。",
    },
    yearFlow: {
      ko: "사수자리의 올해는 시야가 넓어지고 멀리 나아가는 흐름이에요. 상반기에는 여행, 유학, 새로운 공부처럼 세계를 넓히는 일이 생기고, 하반기에는 그 경험이 일과 수입으로 연결됩니다. 다만 벌여 놓은 일의 마무리가 약해지기 쉬우니 가을에는 한 가지씩 매듭을 지으세요. 재물은 들어오는 운이 좋지만 여행과 배움에 쓰는 돈이 커지니 즐거운 지출에도 한도를 정해 두면 좋습니다.",
      en: "This year Sagittarius' horizon widens and it travels far. Travel, study abroad or new learning expands your world in the first half, and that experience connects to work and income in the second. Finishing what you started weakens easily, so tie up one thing at a time in autumn. Money luck is good, but spending on travel and learning grows, so set a limit even on joyful expenses.",
      zh: "射手座今年视野开阔、走得更远。上半年会有旅行、留学、新学习等拓展世界的事，下半年这些经历会与工作和收入相连。但摊开的事收尾容易变弱，秋天要一件件了结。财运进账不错，但花在旅行和学习上的钱变大，即使是快乐的支出也要设个上限。",
      ja: "いて座の今年は視野が広がり遠くへ進む流れです。上半期は旅行、留学、新しい勉強など世界を広げることが起こり、下半期にはその経験が仕事と収入につながります。ただ広げたことの仕上げが弱くなりやすいので、秋には一つずつ区切りをつけて。お金は入る運が良いですが旅行と学びに使うお金が大きくなるので、楽しい出費にも上限を決めておくと良いでしょう。",
    },
    faq: [
      {
        question: { ko: "사수자리는 몇 월 며칠생인가요?", en: "What dates are Sagittarius?", zh: "射手座是几月几日出生？", ja: "いて座は何月何日生まれ？" },
        answer: {
          ko: "사수자리는 11월 22일부터 12월 21일 사이에 태어난 사람이에요. 11월 21~22일, 12월 21~22일처럼 경계 날짜는 해마다 조금씩 달라 전갈자리나 염소자리로 보기도 하니 출생 시각까지 확인하면 정확합니다. 궁수자리라고도 부릅니다.",
          en: "Sagittarius covers birthdays from November 22 to December 21. Cusp dates such as November 21–22 and December 21–22 shift slightly each year and may be read as Scorpio or Capricorn, so checking your birth time gives certainty. It is also called the Archer.",
          zh: "射手座是11月22日至12月21日出生的人。11月21~22日、12月21~22日这类交界日期每年略有不同，也可能被视为天蝎座或摩羯座，核对出生时间会更准确。也称人马座。",
          ja: "いて座は11月22日から12月21日の間に生まれた人です。11月21〜22日、12月21〜22日のような境目の日付は年ごとに少し違い、さそり座やぎ座とされることもあるので、出生時刻まで確認すると正確です。射手座とも呼ばれます。",
        },
      },
      {
        question: { ko: "사수자리는 어떤 별자리와 궁합이 좋은가요?", en: "Which signs are compatible with Sagittarius?", zh: "射手座和什么星座最配？", ja: "いて座と相性の良い星座は？" },
        answer: {
          ko: "같은 불의 별자리인 양자리·사자자리와는 모험심이 통해 함께 있으면 세상이 넓어지고, 공기의 별자리인 천칭자리·물병자리는 사수자리의 자유를 존중하면서 생각을 나눠 줍니다. 물의 별자리인 물고기자리나 흙의 별자리인 처녀자리와는 자유와 안정을 바라보는 시선이 달라 조율이 필요해요. 궁합은 재미로 보는 참고 기준입니다.",
          en: "Fellow fire signs Aries and Leo share Sagittarius' spirit of adventure, and the world grows larger together, while air signs Libra and Aquarius respect its freedom while sharing ideas. With water sign Pisces or earth sign Virgo, different views on freedom versus security call for adjustment. Compatibility is a fun reference.",
          zh: "与同为火象的白羊座、狮子座冒险精神相通，在一起世界更广阔；风象的天秤座、水瓶座尊重射手座的自由并与之交流思想。与水象的双鱼座或土象的处女座对自由与安定的看法不同，需要磨合。配对仅供娱乐参考。",
          ja: "同じ火のサインのおひつじ座・しし座とは冒険心が通じて一緒にいると世界が広がり、風のサインのてんびん座・みずがめ座はいて座の自由を尊重しながら考えを分かち合ってくれます。水のサインのうお座や地のサインのおとめ座とは自由と安定への眼差しが違い、調整が必要です。相性は楽しみとして見る参考基準です。",
        },
      },
    ],
  },
];

// ───────────────────────────── 허브 페이지 문구 ─────────────────────────────
export interface SignHubContent {
  /** 검색 결과용 제목. 루트 레이아웃이 " | Check Me Today" 를 붙이므로 사이트명은 넣지 않는다 */
  title: LText;
  description: LText;
  keywords: { ko: string[]; en: string[] };
  heading: LText;
  /** 소개글 (문단 구분 "\n\n") */
  intro: LText;
  /** 계산법 섹션 제목과 본문 */
  howToTitle: LText;
  howTo: LText;
  faq: SignFaq[];
}

export const zodiacHub: SignHubContent = {
  title: { ko: "띠별 오늘의 운세 | 12띠 운세·성격·궁합", en: "Daily Horoscope by Chinese Zodiac | 12 Animal Signs", zh: "生肖今日运势 | 十二生肖运势·性格·配对", ja: "干支別 今日の運勢 | 十二支の運勢・性格・相性" },
  description: {
    ko: "쥐띠부터 돼지띠까지 12띠 오늘의 운세를 매일 새로 봅니다. 띠별 성격과 강점, 어울리는 사람, 올해 흐름, 자주 묻는 질문까지 정리했어요. 내 띠 계산법도 함께 확인하세요.",
    en: "Fresh daily fortunes for all 12 Chinese zodiac animals, from Rat to Pig, with personality, strengths, compatible signs, the year's flow and FAQs. Find out how to work out your own sign.",
    zh: "从鼠到猪，十二生肖今日运势每天更新。整理了各生肖的性格与优点、相配的人、今年走势和常见问题，并附生肖计算方法。",
    ja: "子年から亥年まで十二支の今日の運勢を毎日新しく。干支ごとの性格と強み、相性の良い人、今年の流れ、よくある質問をまとめました。自分の干支の調べ方も確認できます。",
  },
  keywords: { ko: ["띠별 운세", "띠별 오늘의 운세", "12띠 운세", "오늘의 띠 운세", "띠 계산", "내 띠 알아보기"], en: ["chinese zodiac daily horoscope", "12 animal signs fortune", "zodiac animal by year"] },
  heading: { ko: "띠별 오늘의 운세", en: "Daily Horoscope by Chinese Zodiac", zh: "生肖今日运势", ja: "干支別 今日の運勢" },
  intro: {
    ko: "띠는 태어난 해를 열두 동물로 나타낸 것으로, 쥐·소·호랑이·토끼·용·뱀·말·양·원숭이·닭·개·돼지가 12년마다 돌아옵니다. 동양에서는 오래전부터 띠로 타고난 기질과 그해의 흐름을 읽어 왔어요.\n\n이 페이지에서는 12띠 각각의 성격과 강점, 어울리는 사람과 일, 올해의 큰 흐름을 정리하고, 띠와 오늘 날짜만으로 계산한 오늘의 띠 운세를 매일 자정에 새로 보여 드립니다. 이름과 생년월일을 넣으면 나만의 더 자세한 운세도 볼 수 있어요.",
    en: "The Chinese zodiac names each birth year after one of twelve animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig, repeating every twelve years. In East Asia these signs have long been used to read innate temperament and the flow of the year.\n\nHere you will find each sign's personality and strengths, compatible people and work, and the year's broad flow, plus a daily fortune for your sign calculated from the sign and today's date, refreshed every midnight. Enter your name and birth date for a more detailed personal reading.",
    zh: "生肖以十二种动物代表出生年份，鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪每十二年轮回一次。东方自古就用生肖来解读天生气质和当年走势。\n\n本页整理了十二生肖各自的性格与优点、相配的人与工作、今年的大趋势，并每天午夜更新仅以生肖和今日日期计算的生肖今日运势。输入姓名和出生日期还可以查看更详细的个人运势。",
    ja: "干支は生まれた年を十二の動物で表したもので、子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥が12年ごとに巡ります。東洋では古くから干支で生まれ持った気質とその年の流れを読んできました。\n\nこのページでは十二支それぞれの性格と強み、相性の良い人と仕事、今年の大きな流れをまとめ、干支と今日の日付だけで計算した今日の干支運勢を毎日午前0時に新しく表示します。名前と生年月日を入れれば自分だけのより詳しい運勢も見られます。",
  },
  howToTitle: { ko: "내 띠 계산법", en: "How to find your sign", zh: "生肖计算方法", ja: "自分の干支の調べ方" },
  howTo: {
    ko: "태어난 해를 12로 나눈 나머지로 띠를 찾습니다. 나머지가 4면 쥐띠, 5면 소띠, 6이면 호랑이띠, 7이면 토끼띠, 8이면 용띠, 9면 뱀띠, 10이면 말띠, 11이면 양띠, 0이면 원숭이띠, 1이면 닭띠, 2면 개띠, 3이면 돼지띠예요. 예를 들어 1990년은 나머지가 10이라 말띠입니다.\n\n전통적으로는 음력 설(또는 입춘)을 기준으로 해가 바뀌므로 1월이나 2월 초에 태어났다면 전년도 띠로 보기도 합니다. 이 페이지의 연도 목록은 양력 연도 기준이에요.",
    en: "Divide your birth year by 12 and look at the remainder: 4 is Rat, 5 Ox, 6 Tiger, 7 Rabbit, 8 Dragon, 9 Snake, 10 Horse, 11 Goat, 0 Monkey, 1 Rooster, 2 Dog and 3 Pig. For example, 1990 leaves a remainder of 10, so it is a Horse year.\n\nTraditionally the year changes at Lunar New Year (or the start of spring), so people born in January or early February are sometimes counted under the previous year's sign. The year lists on this page use the solar calendar year.",
    zh: "用出生年份除以12，看余数：4是鼠，5是牛，6是虎，7是兔，8是龙，9是蛇，10是马，11是羊，0是猴，1是鸡，2是狗，3是猪。例如1990年余数为10，属马。\n\n传统上以农历春节（或立春）为界换年，所以1月或2月初出生的人有时按前一年的生肖算。本页的年份列表以公历年份为准。",
    ja: "生まれた年を12で割った余りで干支を探します。余りが4なら子、5なら丑、6なら寅、7なら卯、8なら辰、9なら巳、10なら午、11なら未、0なら申、1なら酉、2なら戌、3なら亥です。例えば1990年は余りが10なので午年です。\n\n伝統的には旧正月（または立春）を基準に年が変わるため、1月や2月初めに生まれた人は前年の干支とすることもあります。このページの年リストは新暦の年を基準にしています。",
  },
  faq: [
    {
      question: { ko: "띠별 운세는 어떻게 만들어지나요?", en: "How is the zodiac fortune made?", zh: "生肖运势是怎么生成的？", ja: "干支運勢はどうやって作られる？" },
      answer: {
        ko: "띠와 오늘 날짜를 시드로 삼아 종합운 점수와 재물·연애·건강·직장 네 영역의 운세, 행운의 숫자와 색을 계산합니다. 같은 띠는 하루 동안 같은 결과를 보고, 매일 자정에 새로 바뀌어요. 이름과 생년월일을 넣으면 같은 띠라도 사람마다 다른 운세가 나옵니다.",
        en: "The sign and today's date seed the overall score, the four area readings for wealth, love, health and work, and the lucky number and color. Everyone with the same sign sees the same result for the day, and it refreshes at midnight. Adding your name and birth date gives a reading that differs from person to person.",
        zh: "以生肖和今日日期为种子，计算综合运分数、财运、爱情、健康、事业四项运势，以及幸运数字和颜色。同一生肖一天内看到相同结果，每天午夜更新。输入姓名和出生日期后，即使同一生肖每个人的运势也不同。",
        ja: "干支と今日の日付をシードにして、総合運の点数、金運・恋愛・健康・仕事の四分野の運勢、ラッキーナンバーと色を計算します。同じ干支は一日同じ結果を見て、毎日午前0時に新しくなります。名前と生年月日を入れると同じ干支でも人によって違う運勢が出ます。",
      },
    },
    {
      question: { ko: "1월이나 2월에 태어났으면 띠가 달라지나요?", en: "Does the sign change for January or February birthdays?", zh: "1月或2月出生的人生肖会不同吗？", ja: "1月や2月生まれは干支が変わる？" },
      answer: {
        ko: "전통적으로 띠는 음력 설이나 입춘을 기준으로 바뀌기 때문에, 설 이전인 1월이나 2월 초에 태어났다면 전년도 띠로 보는 경우가 많습니다. 다만 일상에서는 양력 연도로 띠를 말하는 사람도 많아요. 이 사이트는 양력 연도를 기준으로 계산하니, 설 전에 태어났다면 전년도 띠 페이지도 함께 참고해 보세요.",
        en: "Traditionally the sign changes at Lunar New Year or the start of spring, so those born in January or early February before that date are often counted under the previous year's sign. In daily life many people simply use the solar year. This site calculates by solar year, so if you were born before Lunar New Year, also check the previous year's sign.",
        zh: "传统上生肖以农历春节或立春为界更替，所以春节前的1月或2月初出生的人常被算作前一年的生肖。不过日常中也有很多人按公历年份说生肖。本站按公历年份计算，若在春节前出生，也可以参考前一年生肖的页面。",
        ja: "伝統的に干支は旧正月や立春を基準に変わるため、旧正月前の1月や2月初めに生まれた人は前年の干支とされることが多いです。ただ日常では新暦の年で干支を言う人も多くいます。このサイトは新暦の年を基準に計算するので、旧正月前に生まれた方は前年の干支のページも合わせて参考にしてください。",
      },
    },
  ],
};

export const starHub: SignHubContent = {
  title: { ko: "별자리 오늘의 운세 | 12별자리 운세·성격·궁합", en: "Daily Horoscope by Star Sign | 12 Zodiac Signs", zh: "星座今日运势 | 十二星座运势·性格·配对", ja: "星座別 今日の運勢 | 12星座の運勢・性格・相性" },
  description: {
    ko: "양자리부터 물고기자리까지 12별자리 오늘의 운세를 매일 새로 봅니다. 별자리별 성격과 강점, 어울리는 사람, 올해 흐름, 자주 묻는 질문까지 정리했어요. 생일로 내 별자리 찾는 법도 함께 확인하세요.",
    en: "Fresh daily horoscopes for all 12 star signs, from Aries to Pisces, with personality, strengths, compatible signs, the year's flow and FAQs. Find your sign by birthday.",
    zh: "从白羊座到双鱼座，十二星座今日运势每天更新。整理了各星座的性格与优点、相配的人、今年走势和常见问题，并附按生日查星座的方法。",
    ja: "おひつじ座からうお座まで12星座の今日の運勢を毎日新しく。星座ごとの性格と強み、相性の良い人、今年の流れ、よくある質問をまとめました。誕生日で自分の星座を探す方法も確認できます。",
  },
  keywords: { ko: ["별자리 운세", "별자리 오늘의 운세", "12별자리 운세", "오늘의 별자리 운세", "별자리 날짜", "내 별자리 찾기"], en: ["daily horoscope", "12 zodiac signs horoscope today", "star sign by birthday"] },
  heading: { ko: "별자리 오늘의 운세", en: "Daily Horoscope by Star Sign", zh: "星座今日运势", ja: "星座別 今日の運勢" },
  intro: {
    ko: "별자리는 태어난 날 태양이 하늘의 어느 자리에 있었는지로 정해지며, 양자리·황소자리·쌍둥이자리·게자리·사자자리·처녀자리·천칭자리·전갈자리·사수자리·염소자리·물병자리·물고기자리 열두 개로 나뉩니다. 서양 점성술에서는 별자리로 타고난 성향과 하루의 기운을 읽어요.\n\n이 페이지에서는 12별자리 각각의 성격과 강점, 어울리는 사람과 일, 올해의 큰 흐름을 정리하고, 별자리와 오늘 날짜만으로 계산한 오늘의 별자리 운세를 매일 자정에 새로 보여 드립니다. 이름과 생년월일을 넣으면 나만의 더 자세한 운세도 볼 수 있어요.",
    en: "Your star sign is set by where the sun stood in the sky on the day you were born, dividing the year into twelve: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces. Western astrology reads innate tendencies and the day's energy from these signs.\n\nHere you will find each sign's personality and strengths, compatible people and work, and the year's broad flow, plus a daily horoscope calculated from the sign and today's date, refreshed every midnight. Enter your name and birth date for a more detailed personal reading.",
    zh: "星座由出生当天太阳在天空中的位置决定，分为白羊、金牛、双子、巨蟹、狮子、处女、天秤、天蝎、射手、摩羯、水瓶、双鱼十二个。西方占星用星座解读天生倾向和一天的气运。\n\n本页整理了十二星座各自的性格与优点、相配的人与工作、今年的大趋势，并每天午夜更新仅以星座和今日日期计算的星座今日运势。输入姓名和出生日期还可以查看更详细的个人运势。",
    ja: "星座は生まれた日に太陽が空のどの位置にあったかで決まり、おひつじ座・おうし座・ふたご座・かに座・しし座・おとめ座・てんびん座・さそり座・いて座・やぎ座・みずがめ座・うお座の12に分かれます。西洋占星術では星座で生まれ持った傾向と一日の気を読みます。\n\nこのページでは12星座それぞれの性格と強み、相性の良い人と仕事、今年の大きな流れをまとめ、星座と今日の日付だけで計算した今日の星座運勢を毎日午前0時に新しく表示します。名前と生年月日を入れれば自分だけのより詳しい運勢も見られます。",
  },
  howToTitle: { ko: "내 별자리 찾는 법", en: "How to find your sign", zh: "怎样找到我的星座", ja: "自分の星座の探し方" },
  howTo: {
    ko: "별자리는 태어난 월과 일로 정해집니다. 아래 목록에서 내 생일이 포함된 날짜 범위를 찾으면 돼요. 예를 들어 8월 10일생은 7월 23일~8월 22일 사이이므로 사자자리입니다.\n\n각 별자리가 시작되는 날짜는 해마다 태양의 위치에 따라 하루 정도 차이가 날 수 있어요. 경계 날짜에 태어났다면 출생 시각에 따라 앞뒤 별자리 중 하나가 되므로, 두 별자리 운세를 모두 참고해 보세요.",
    en: "Your sign is set by your birth month and day. Find the date range below that includes your birthday. For example, August 10 falls between July 23 and August 22, so it is Leo.\n\nThe date each sign begins can shift by about a day from year to year with the sun's position. If you were born on a cusp date, your birth time decides between the two neighboring signs, so check both.",
    zh: "星座由出生的月和日决定。在下方列表中找到包含你生日的日期范围即可。例如8月10日出生，在7月23日至8月22日之间，所以是狮子座。\n\n每个星座开始的日期每年会随太阳位置相差一天左右。如果出生在交界日期，由出生时间决定属于前后哪个星座，可以两个星座的运势都参考。",
    ja: "星座は生まれた月と日で決まります。下のリストから自分の誕生日が含まれる日付の範囲を探してください。例えば8月10日生まれは7月23日〜8月22日の間なのでしし座です。\n\n各星座が始まる日付は年ごとに太陽の位置で一日ほどずれることがあります。境目の日付に生まれた人は出生時刻によって前後どちらかの星座になるので、両方の運勢を参考にしてみてください。",
  },
  faq: [
    {
      question: { ko: "별자리 운세는 어떻게 만들어지나요?", en: "How is the star sign horoscope made?", zh: "星座运势是怎么生成的？", ja: "星座運勢はどうやって作られる？" },
      answer: {
        ko: "별자리와 오늘 날짜를 시드로 삼아 종합운 점수와 재물·연애·건강·직장 네 영역의 운세, 행운의 숫자와 색을 계산합니다. 같은 별자리는 하루 동안 같은 결과를 보고, 매일 자정에 새로 바뀌어요. 이름과 생년월일을 넣으면 같은 별자리라도 사람마다 다른 운세가 나옵니다.",
        en: "The sign and today's date seed the overall score, the four area readings for wealth, love, health and work, and the lucky number and color. Everyone with the same sign sees the same result for the day, and it refreshes at midnight. Adding your name and birth date gives a reading that differs from person to person.",
        zh: "以星座和今日日期为种子，计算综合运分数、财运、爱情、健康、事业四项运势，以及幸运数字和颜色。同一星座一天内看到相同结果，每天午夜更新。输入姓名和出生日期后，即使同一星座每个人的运势也不同。",
        ja: "星座と今日の日付をシードにして、総合運の点数、金運・恋愛・健康・仕事の四分野の運勢、ラッキーナンバーと色を計算します。同じ星座は一日同じ結果を見て、毎日午前0時に新しくなります。名前と生年月日を入れると同じ星座でも人によって違う運勢が出ます。",
      },
    },
    {
      question: { ko: "별자리와 띠 중 어느 쪽 운세를 봐야 하나요?", en: "Should I read my star sign or my zodiac animal?", zh: "该看星座还是生肖运势？", ja: "星座と干支、どちらの運勢を見るべき？" },
      answer: {
        ko: "둘은 뿌리가 다른 체계예요. 띠는 태어난 해로 타고난 기질과 큰 흐름을, 별자리는 태어난 날로 성향과 하루의 기운을 봅니다. 어느 쪽이 맞다기보다 두 관점을 함께 보면 하루를 다양한 각도에서 생각해 볼 수 있어요. 이 사이트의 오늘의 운세는 띠와 별자리를 함께 반영합니다.",
        en: "They are systems with different roots. The zodiac animal reads innate temperament and the broad flow from your birth year, while the star sign reads tendencies and the day's energy from your birth date. Neither is more correct; reading both lets you think about your day from several angles. This site's daily fortune reflects both.",
        zh: "两者是根源不同的体系。生肖从出生年份看天生气质和大趋势，星座从出生日期看倾向和一天的气运。不存在哪个更准，两种视角一起看能从多个角度思考一天。本站的今日运势同时反映生肖和星座。",
        ja: "二つは根の違う体系です。干支は生まれた年で生まれ持った気質と大きな流れを、星座は生まれた日で傾向と一日の気を見ます。どちらが正しいというより、二つの視点を合わせて見ると一日をいろいろな角度から考えられます。このサイトの今日の運勢は干支と星座を一緒に反映しています。",
      },
    },
  ],
};

// ───────────────────────────── 공용 UI 문구 ─────────────────────────────
export const fortuneSignTexts = {
  fortuneCrumb: { ko: "오늘의 운세", en: "Daily Fortune", zh: "今日运势", ja: "今日の運勢" },
  zodiacCrumb: { ko: "띠별 운세", en: "Zodiac Animals", zh: "生肖运势", ja: "干支別運勢" },
  starCrumb: { ko: "별자리 운세", en: "Star Signs", zh: "星座运势", ja: "星座別運勢" },
  /** /fortune 입력 화면 하단 링크 */
  zodiacLink: { ko: "띠별 운세 보기", en: "Fortune by zodiac animal", zh: "查看生肖运势", ja: "干支別の運勢を見る" },
  starLink: { ko: "별자리 운세 보기", en: "Fortune by star sign", zh: "查看星座运势", ja: "星座別の運勢を見る" },
  personalitySection: { ko: "성격과 강점", en: "Personality and strengths", zh: "性格与优点", ja: "性格と強み" },
  matchSection: { ko: "어울리는 사람과 일", en: "Compatible people and work", zh: "相配的人与工作", ja: "相性の良い人と仕事" },
  yearFlowSection: { ko: "올해의 흐름", en: "The year's flow", zh: "今年的走势", ja: "今年の流れ" },
  faqSection: { ko: "자주 묻는 질문", en: "Frequently asked questions", zh: "常见问题", ja: "よくある質問" },
  yearsLabel: { ko: "해당 연도", en: "Birth years", zh: "对应年份", ja: "該当する年" },
  yearsNote: { ko: "양력 연도 기준이에요. 설 이전에 태어났다면 전년도 띠로 보기도 합니다.", en: "Solar calendar years. Those born before Lunar New Year are sometimes counted under the previous sign.", zh: "以公历年份为准。春节前出生的人有时按前一年生肖算。", ja: "新暦の年が基準です。旧正月前に生まれた人は前年の干支とすることもあります。" },
  datesLabel: { ko: "해당 날짜", en: "Dates", zh: "对应日期", ja: "該当する日付" },
  elementLabel: { ko: "원소", en: "Element", zh: "元素", ja: "エレメント" },
  /** 상세 페이지 H1 (metadata.title 과 같은 어순: "호랑이띠 오늘의 운세") */
  pageHeading: { ko: "{name} 오늘의 운세", en: "{name} Daily Fortune", zh: "{name}今日运势", ja: "{name}の今日の運勢" },
  /** 오늘의 공통 운세 카드 제목 */
  todayHeading: { ko: "오늘의 {name} 운세", en: "Today's {name} Fortune", zh: "{name}今日运势", ja: "今日の{name}の運勢" },
  todayNote: { ko: "{name} 공통 운세예요. 매일 자정에 새로 바뀝니다.", en: "Shared by everyone born under {name}. Refreshes every midnight.", zh: "这是{name}的共同运势，每天午夜更新。", ja: "{name}共通の運勢です。毎日午前0時に新しくなります。" },
  overall: { ko: "종합운", en: "Overall", zh: "综合运", ja: "総合運" },
  points: { ko: "점", en: "pts", zh: "分", ja: "点" },
  keyword: { ko: "오늘의 키워드", en: "Keyword", zh: "今日关键词", ja: "今日のキーワード" },
  luckyNumber: { ko: "행운의 숫자", en: "Lucky number", zh: "幸运数字", ja: "ラッキーナンバー" },
  luckyColor: { ko: "행운의 색", en: "Lucky color", zh: "幸运颜色", ja: "ラッキーカラー" },
  luckyDirection: { ko: "행운의 방향", en: "Lucky direction", zh: "幸运方向", ja: "ラッキー方位" },
  loading: { ko: "오늘의 운세를 불러오는 중...", en: "Loading today's fortune...", zh: "正在加载今日运势...", ja: "今日の運勢を読み込み中..." },
  ctaPersonal: { ko: "내 이름으로 자세히 보기", en: "See my detailed fortune", zh: "用我的名字查看详细运势", ja: "自分の名前で詳しく見る" },
  ctaPersonalSub: { ko: "이름과 생년월일을 넣으면 띠·별자리를 함께 반영한 나만의 운세와 행운의 시간·아이템까지 볼 수 있어요.", en: "Add your name and birth date for a personal reading that combines zodiac and star sign, plus lucky hours and items.", zh: "输入姓名和出生日期，可查看结合生肖与星座的专属运势以及幸运时段和物品。", ja: "名前と生年月日を入れると、干支と星座を合わせた自分だけの運勢とラッキータイム・アイテムまで見られます。" },
  otherZodiac: { ko: "다른 띠 운세 보기", en: "Other zodiac animals", zh: "查看其他生肖运势", ja: "他の干支の運勢を見る" },
  otherStar: { ko: "다른 별자리 운세 보기", en: "Other star signs", zh: "查看其他星座运势", ja: "他の星座の運勢を見る" },
  crossZodiac: { ko: "띠별 운세도 보기", en: "Also by zodiac animal", zh: "也看看生肖运势", ja: "干支別の運勢も見る" },
  crossStar: { ko: "별자리 운세도 보기", en: "Also by star sign", zh: "也看看星座运势", ja: "星座別の運勢も見る" },
  zodiacListSection: { ko: "12띠 오늘의 운세", en: "All 12 zodiac animals", zh: "十二生肖今日运势", ja: "十二支の今日の運勢" },
  starListSection: { ko: "12별자리 오늘의 운세", en: "All 12 star signs", zh: "十二星座今日运势", ja: "12星座の今日の運勢" },
  thisYear: { ko: "올해({year}년)는 {name}의 해예요.", en: "This year ({year}) is the Year of the {name}.", zh: "今年（{year}年）是{name}年。", ja: "今年（{year}年）は{name}の年です。" },
  viewFortune: { ko: "운세 보기", en: "View", zh: "查看", ja: "見る" },
  disclaimer: { ko: "재미로 보는 운세예요. 중요한 결정은 스스로의 판단을 믿으세요.", en: "Just for fun. Trust your own judgment for important decisions.", zh: "仅供娱乐。重要决定请相信自己的判断。", ja: "お楽しみとしての運勢です。大事な決断はご自身の判断を信じてください。" },
} satisfies Record<string, LText>;

/** "{name}" 같은 자리표시자를 채운다 */
export function fillText(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

// ───────────────────────────── 조회 헬퍼 ─────────────────────────────
export const getZodiacGuide = (id: string) => zodiacGuides.find((g) => g.id === id);
export const getStarGuide = (id: string) => starGuides.find((g) => g.id === id);
export const getZodiacAnimalById = (id: string): ZodiacAnimal | undefined => zodiacAnimals.find((a) => a.id === id);
export const getStarSignById = (id: string): StarSign | undefined => starSigns.find((s) => s.id === id);

/** 띠에 해당하는 양력 연도 목록 (ZODIAC_YEAR_FROM ~ ZODIAC_YEAR_TO) */
export function getZodiacYears(animalId: string): number[] {
  const years: number[] = [];
  for (let y = ZODIAC_YEAR_FROM; y <= ZODIAC_YEAR_TO; y++) {
    if (getZodiacAnimal(y).id === animalId) years.push(y);
  }
  return years;
}

/** "띠는 몇 년생인가요?" FAQ (연도 목록에서 자동 생성). 화면과 FAQPage JSON-LD 에 같이 쓴다 */
export function getZodiacYearsFaq(animal: ZodiacAnimal): SignFaq {
  const years = getZodiacYears(animal.id);
  const next = years[years.length - 1] + 12;
  const list = years.join(", ");
  return {
    question: {
      ko: `${animal.name.ko}는 몇 년생인가요?`,
      en: `Which birth years are the ${animal.name.en}?`,
      zh: `属${animal.name.zh}是哪些年份出生？`,
      ja: `${animal.name.ja}は何年生まれ？`,
    },
    answer: {
      ko: `${animal.name.ko}는 ${list}년에 태어난 사람이에요(양력 연도 기준). 띠는 12년마다 돌아오므로 다음 ${animal.name.ko} 해는 ${next}년입니다. 전통적으로는 설을 기준으로 해가 바뀌어, 1월이나 2월 초에 태어났다면 전년도 띠로 보기도 해요.`,
      en: `${animal.name.en} years are ${list} (solar calendar). The cycle repeats every 12 years, so the next ${animal.name.en} year is ${next}. Traditionally the year turns at Lunar New Year, so January and early-February birthdays are sometimes counted under the previous sign.`,
      zh: `属${animal.name.zh}的人出生于${list}年（公历）。生肖每12年轮回一次，下一个${animal.name.zh}年是${next}年。传统上以春节换年，1月或2月初出生的人有时按前一年生肖算。`,
      ja: `${animal.name.ja}は${list}年に生まれた人です（新暦基準）。干支は12年ごとに巡るので次の${animal.name.ja}は${next}年です。伝統的には旧正月で年が変わるため、1月や2月初めに生まれた人は前年の干支とすることもあります。`,
    },
  };
}

/** 별자리의 날짜 범위: 시작 [월, 일] ~ 끝 [월, 일] (다음 별자리 시작 전날) */
export function getStarSignRange(signId: string): { from: [number, number]; to: [number, number] } {
  const index = starSigns.findIndex((s) => s.id === signId);
  const sign = starSigns[index];
  const next = starSigns[(index + 1) % starSigns.length];
  // 모든 별자리의 시작일이 19일 이후라 "다음 시작일 - 1" 이 같은 달 안에 있다
  return { from: sign.from, to: [next.from[0], next.from[1] - 1] };
}

/** 날짜 범위를 언어별 문자열로 (예: "7월 23일 ~ 8월 22일") */
export function formatStarSignRange(signId: string, lang: string): string {
  const { from, to } = getStarSignRange(signId);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (lang === "en") return `${monthNames[from[0] - 1]} ${from[1]} – ${monthNames[to[0] - 1]} ${to[1]}`;
  if (lang === "zh") return `${from[0]}月${from[1]}日 ~ ${to[0]}月${to[1]}日`;
  if (lang === "ja") return `${from[0]}月${from[1]}日 〜 ${to[0]}月${to[1]}日`;
  return `${from[0]}월 ${from[1]}일 ~ ${to[0]}월 ${to[1]}일`;
}

/** 오늘 날짜의 별자리 */
export function getTodayStarSign(now: Date = new Date()): StarSign {
  return getStarSign(now.getMonth() + 1, now.getDate());
}

// ───────────────────────────── 띠·별자리 공통 운세 생성 ─────────────────────────────
// generateDailyFortune() 과 같은 난수·점수 규칙을 쓰되, 이름·생년월일 대신 띠(또는 별자리) id 와 오늘 날짜만 시드로 삼는다.
// 그래서 같은 띠는 하루 동안 모두 같은 결과를 본다.
export interface SignDailyFortune {
  /** YYYY-MM-DD (현지 날짜) */
  date: string;
  /** 영역별 점수 1~5 */
  scores: Record<FortuneCategory, number>;
  /** 영역별 본문 */
  texts: Record<FortuneCategory, LText>;
  /** 종합운 등급 1~5 */
  overall: number;
  /** 종합운 점수 0~100 */
  overallScore: number;
  overallText: LText;
  keyword: LText;
  luckyNumber: number;
  /** luckyColors 의 키 */
  luckyColor: string;
  /** luckyDirections 의 키 */
  luckyDirection: string;
}

export function generateSignFortune(kind: SignKind, id: string, date?: string): SignDailyFortune {
  const dateKey = date ?? getLocalDateKey();
  const seed = hashString(`sign|${kind}|${id}|${dateKey}`);
  const random = seededRandom(seed);
  // 선형 합동 생성기는 첫 값이 시드에 치우치므로 몇 번 버린다 (generateDailyFortune 과 동일)
  random(); random(); random();

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

  const sum = scores.wealth + scores.love + scores.health + scores.work;
  const base = 40 + ((sum - 4) / 16) * 58;
  const overallScore = Math.round(Math.min(99, Math.max(35, base + (random() * 8 - 4))));
  const overall = overallScoreToLevel(overallScore);

  const colorKeys = Object.keys(luckyColors);
  const directionKeys = Object.keys(luckyDirections);

  return {
    date: dateKey,
    scores,
    texts,
    overall,
    overallScore,
    overallText: pickVariant(overallTexts[overall]),
    keyword: pickVariant(fortuneKeywords),
    luckyNumber: Math.floor(random() * 45) + 1,
    luckyColor: colorKeys[Math.floor(random() * colorKeys.length)],
    luckyDirection: directionKeys[Math.floor(random() * directionKeys.length)],
  };
}

/** 운세 본문의 첫 문장만 (영역별 한 줄 요약용). 마침표·물음표·느낌표(전각 포함) 기준 */
export function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?。！？](?=\s|$)/);
  return match ? match[0].trim() : text;
}
