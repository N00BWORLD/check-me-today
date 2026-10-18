// 에너지 밸런스 테스트 콘텐츠 클러스터 데이터
// - 차원별 가이드(/test/guide/[trait]) 본문: 심리학 배경, 높을 때·낮을 때의 모습, 상황별 해석, 균형 잡는 법, FAQ
// - 유형 페이지(/test/types/[type]) 본문: Solar·Lunar 우세 유형 설명 전문
// - 허브(/test/guide) 소개글, 공용 UI 문구
// 검색용 제목은 테스트 이름이 아니라 "자기주장성", "공감 능력" 같은 일반 심리 용어로 잡는다 (테스트 이름으로는 검색 유입이 없음).
// 한국어 문장을 기준으로 쓰고 다른 언어는 뜻을 맞춘다. 문단 구분은 "\n\n".
// 심리학 용어는 일반적으로 알려진 수준(융의 아니마·아니무스, 벰의 성역할 검사, 맥클릴랜드의 성취동기, 데시·라이언의 자기결정이론,
// 데이비스의 공감 척도, 빅파이브의 우호성, 카너먼의 시스템 1·2)에서만 인용하고, 진단·치료 근거로 쓰이지 않는 참고 자료임을 밝힌다.

import { traitNames, type PersonalityType, type TraitType } from "./questions";

export type LocalizedText = Record<string, string>;

/** 상황별 해석 하나 (직장에서, 연애에서 …) */
export interface EnergyScene {
  name: LocalizedText;
  text: LocalizedText;
}

export interface EnergyFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface EnergyTraitGuide {
  /** 주소에 쓰는 id = questions.ts 의 TraitType */
  id: TraitType;
  /** 어느 쪽 에너지에 속하는지 */
  pole: PersonalityType;
  emoji: string;
  name: LocalizedText;
  /** 검색 결과용 제목. 루트 레이아웃이 " | Check Me Today" 를 붙이므로 사이트명은 넣지 않는다 */
  title: LocalizedText;
  description: LocalizedText;
  keywords: Record<string, string[]>;
  heading: LocalizedText;
  /** 심리학에서 이 차원이 뜻하는 것 (2~3문단) */
  intro: LocalizedText;
  /** 이 성향이 높은 사람의 모습 */
  high: LocalizedText;
  /** 이 성향이 낮은 사람의 모습 */
  low: LocalizedText;
  /** 상황별 해석 4~5가지 */
  scenes: EnergyScene[];
  /** 균형 잡는 법 (높이는 법 + 지나칠 때 다스리는 법) */
  balance: LocalizedText;
  faq: EnergyFaq[];
}

export interface EnergyTypeGuide {
  /** 주소에 쓰는 id (solar | lunar) */
  id: "solar" | "lunar";
  type: PersonalityType;
  emoji: string;
  name: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  keywords: Record<string, string[]>;
  heading: LocalizedText;
  subtitle: LocalizedText;
  /** 유형 설명 전문 (3문단) */
  intro: LocalizedText;
  strengths: Record<string, string[]>;
  cautions: Record<string, string[]>;
  /** 관계·일에서의 모습 */
  scenes: EnergyScene[];
  /** 성장 포인트 */
  growth: LocalizedText;
  faq: EnergyFaq[];
}

export const ENERGY_TEST_PATH = "/test";
export const ENERGY_GUIDE_PATH = "/test/guide";
export const ENERGY_TYPES_PATH = "/test/types";
/** 콘텐츠 작성일 (JSON-LD·사이트맵 lastmod 용) */
export const ENERGY_GUIDE_PUBLISHED = "2026-10-19";

export const getEnergyTraitPath = (id: string) => `${ENERGY_GUIDE_PATH}/${id}`;
export const getEnergyTypePath = (id: string) => `${ENERGY_TYPES_PATH}/${id}`;

export const energyTraitGuides: EnergyTraitGuide[] = [
  // ───────────────────────── 자기주장성 ─────────────────────────
  {
    id: "assertiveness",
    pole: "SOLAR",
    emoji: "🗣️",
    name: traitNames.assertiveness,
    title: {
      ko: "자기주장성이란 | 자기주장이 강한 사람·약한 사람의 특징과 높이는 법",
      en: "What Is Assertiveness? Traits of High and Low Assertiveness and How to Build It",
      zh: "什么是自我主张 | 自我主张强与弱的人的特征及提升方法",
      ja: "自己主張性とは | 自己主張が強い人・弱い人の特徴と高め方",
    },
    description: {
      ko: "자기주장성은 공격도 순응도 아닌, 내 의견과 욕구를 상대를 존중하며 분명히 말하는 힘입니다. 자기주장이 강한 사람과 약한 사람의 특징, 직장·연애·가족에서의 모습, 자기주장 훈련법과 FAQ를 정리했습니다.",
      en: "Assertiveness is neither aggression nor compliance: it is stating your opinions and needs clearly while respecting the other person. Traits of high and low assertiveness, how it shows at work, in love and in family, and how to train it.",
      zh: "自我主张既非攻击也非顺从，而是在尊重对方的同时清楚表达自己意见与需求的能力。整理了自我主张强与弱的人的特征、在职场·恋爱·家庭中的表现、自我主张训练法与常见问题。",
      ja: "自己主張性は攻撃でも迎合でもなく、相手を尊重しながら自分の意見と欲求をはっきり伝える力です。自己主張が強い人と弱い人の特徴、職場・恋愛・家族での姿、自己主張トレーニングとFAQをまとめました。",
    },
    keywords: {
      ko: ["자기주장성", "자기주장 훈련", "자기주장 강한 사람", "자기주장 못하는 사람", "거절 못하는 성격", "할 말 하는 법", "성향 테스트"],
      en: ["assertiveness", "assertiveness training", "how to be assertive", "passive vs assertive vs aggressive", "personality test"],
      zh: ["自我主张", "自我主张训练", "不会拒绝", "性格测试"],
      ja: ["自己主張性", "アサーション", "自己主張できない", "性格診断"],
    },
    heading: {
      ko: "자기주장성: 공격하지 않고 내 뜻을 말하는 힘",
      en: "Assertiveness: Saying What You Mean Without Attacking",
      zh: "自我主张：不攻击也能表达自己的力量",
      ja: "自己主張性：攻撃せずに自分の意思を伝える力",
    },
    intro: {
      ko: "자기주장성(assertiveness)은 자신의 생각, 감정, 욕구를 상대방의 권리를 침해하지 않으면서 솔직하고 분명하게 표현하는 성향입니다. 심리학에서는 이를 공격성(aggressiveness)과 순응성(passiveness) 사이의 건강한 중간 지점으로 봅니다. 공격적인 사람은 자기 뜻을 관철하려고 상대를 깎아내리고, 순응적인 사람은 갈등을 피하려고 자기 뜻을 숨깁니다. 자기주장적인 사람은 '나는 이렇게 생각한다, 그래서 이것을 원한다'고 말하되 상대가 거절할 권리도 인정합니다.\n\n이 개념은 1970년대 알베르티와 에몬스의 자기주장 훈련(assertiveness training)으로 널리 알려졌고, 벰(Sandra Bem)의 성역할 검사(BSRI)에서는 '자기주장적인', '자기 의견을 지키는' 같은 항목이 전통적으로 남성적이라 여겨진 특성 묶음에 들어 있었습니다. 이 테스트가 자기주장성을 Solar(태양) 에너지의 첫 번째 차원으로 둔 것은 그 전통을 따른 것이지만, 벰의 연구가 보여 준 핵심은 성별과 무관하게 누구나 두 묶음의 특성을 함께 가질 수 있다는 점입니다.\n\n자기주장성은 타고난 기질과 자란 환경이 함께 만듭니다. 의견을 말했을 때 존중받은 경험이 많으면 높아지고, 말했다가 혼나거나 무시당한 경험이 쌓이면 낮아집니다. 그래서 자기주장성은 성격 가운데 훈련으로 가장 잘 바뀌는 영역으로 꼽힙니다.",
      en: "Assertiveness is the tendency to express your thoughts, feelings and needs honestly and clearly without violating the rights of others. Psychology places it as the healthy midpoint between aggressiveness and passiveness. The aggressive person puts others down to get their way; the passive person hides their wishes to avoid conflict. The assertive person says 'this is what I think, so this is what I want' while accepting that the other person may refuse.\n\nThe concept spread through the assertiveness training of Alberti and Emmons in the 1970s, and in Sandra Bem's Sex Role Inventory items such as 'assertive' and 'defends own beliefs' sat in the cluster traditionally labelled masculine. This test places assertiveness as the first dimension of Solar energy in line with that tradition, but Bem's central finding was that anyone, regardless of sex, can carry traits from both clusters.\n\nAssertiveness is shaped by inborn temperament and upbringing together. It rises when speaking up was met with respect and falls when it was met with scolding or dismissal. That is why it is counted among the parts of personality that respond best to training.",
      zh: "自我主张（assertiveness）是在不侵犯他人权利的前提下，坦诚、清楚地表达自己想法、情感与需求的倾向。心理学将其视为攻击性与顺从性之间健康的中间点。攻击型的人为达目的贬低对方，顺从型的人为避免冲突隐藏自己的想法，而自我主张型的人会说“我这样想，所以我想要这个”，同时承认对方有拒绝的权利。\n\n这一概念因1970年代阿尔伯蒂与埃蒙斯的自我主张训练而广为人知。在贝姆的性别角色量表中，“有主见”“坚持己见”等条目属于传统上被视为男性化的特质组。本测试把自我主张列为Solar（太阳）能量的第一个维度正是沿袭这一传统，但贝姆研究的核心在于：无论性别，每个人都可以同时拥有两组特质。\n\n自我主张由天生气质与成长环境共同塑造。表达意见时受到尊重的经历多则增强，被训斥或忽视的经历多则减弱。因此它被认为是性格中最能通过训练改变的领域之一。",
      ja: "自己主張性（assertiveness）は、相手の権利を侵さずに自分の考え・感情・欲求を正直にはっきり表現する傾向です。心理学ではこれを攻撃性と受動性の間の健全な中間点と見ます。攻撃的な人は自分の意思を通すために相手をおとしめ、受動的な人は衝突を避けるために自分の意思を隠します。自己主張的な人は「私はこう考える、だからこれが欲しい」と言いつつ、相手が断る権利も認めます。\n\nこの概念は1970年代のアルベルティとエモンズのアサーション・トレーニングで広く知られ、ベムの性役割検査（BSRI）では「自己主張的な」「自分の信念を守る」といった項目が伝統的に男性的とされた特性群に含まれていました。このテストが自己主張性をSolar（太陽）エネルギーの最初の次元に置いたのはその伝統に沿ったものですが、ベムの研究の核心は性別に関係なく誰もが二つの群の特性を併せ持てるという点です。\n\n自己主張性は生まれつきの気質と育った環境が一緒に作ります。意見を言って尊重された経験が多ければ高まり、言って叱られたり無視された経験が積もれば低くなります。だから自己主張性は性格の中で訓練で最もよく変わる領域に数えられます。",
    },
    high: {
      ko: "자기주장성이 높은 사람은 회의에서 반대 의견을 분명히 말하고, 부당한 요구는 이유를 들어 거절하며, 원하는 것을 돌려 말하지 않습니다. 결정이 빠르고 책임을 지는 자리에 어울립니다. 다만 지나치면 상대의 말을 끝까지 듣지 않거나, 자기주장과 고집을 혼동해 '늘 맞서는 사람'으로 비칠 수 있습니다.",
      en: "People high in assertiveness state disagreement plainly in meetings, decline unfair requests with reasons, and ask for what they want without hinting. They decide quickly and suit positions of responsibility. Taken too far, they may stop listening to the end or confuse assertiveness with stubbornness and come across as someone who always pushes back.",
      zh: "自我主张高的人在会议上明确表达反对意见，对不合理要求说明理由后拒绝，想要什么直说不绕弯。决策快，适合承担责任的位置。但过度时可能不把对方的话听完，或把自我主张与固执混为一谈，被看作“总是对着干的人”。",
      ja: "自己主張性が高い人は会議で反対意見をはっきり言い、不当な要求は理由を挙げて断り、欲しいものを遠回しに言いません。決断が速く責任を負う立場に向きます。ただ行き過ぎると相手の話を最後まで聞かなかったり、自己主張と頑固を混同して「いつも逆らう人」と見られることがあります。",
    },
    low: {
      ko: "자기주장성이 낮은 사람은 분위기를 해치지 않으려고 의견을 삼키고, 부탁을 거절하지 못해 일을 떠안으며, 서운한 마음을 쌓아 두었다가 한꺼번에 터뜨리기도 합니다. 배려심이 많고 갈등을 줄이는 장점이 있지만, 자기 욕구를 오래 무시하면 번아웃과 억울함이 따라옵니다. 이 유형에게 필요한 것은 성격을 바꾸는 일이 아니라 '말하는 기술'을 익히는 일입니다.",
      en: "People low in assertiveness swallow their opinions to keep the peace, take on work because they cannot refuse, and may bottle up hurt until it bursts out at once. They are considerate and reduce conflict, but ignoring their own needs for long brings burnout and resentment. What they need is not a new personality but the skill of speaking up.",
      zh: "自我主张低的人为了不破坏气氛而咽下意见，因不会拒绝而揽下工作，把委屈积攒起来然后一次爆发。他们体贴、能减少冲突，但长期忽视自己的需求会带来倦怠与不甘。这类人需要的不是改变性格，而是学会“说话的技巧”。",
      ja: "自己主張性が低い人は雰囲気を壊さないよう意見を飲み込み、頼みを断れず仕事を抱え込み、悔しさをためてから一度に爆発させることもあります。思いやりがあり衝突を減らす長所がありますが、自分の欲求を長く無視すると燃え尽きと不満が伴います。このタイプに必要なのは性格を変えることではなく「話す技術」を身につけることです。",
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "자기주장성은 승진과 연봉 협상, 업무 분배에서 가장 크게 드러납니다. 높은 사람은 성과를 스스로 알리고 무리한 마감에 '이 일정이면 품질이 떨어진다'고 말합니다. 낮은 사람은 묵묵히 일하다 공을 뺏기기 쉽습니다. 낮은 쪽이라면 회의 전에 할 말을 한 문장으로 적어 두는 것만으로도 발언 빈도가 눈에 띄게 늘어납니다.",
          en: "Assertiveness shows most in promotion, salary talks and the division of work. High scorers publicize their results and tell a manager that a rushed deadline will hurt quality. Low scorers work quietly and often lose credit. If you are on the low side, writing one sentence you intend to say before each meeting noticeably raises how often you speak.",
          zh: "自我主张在升职、谈薪、分配工作时表现最明显。高者主动汇报成果，面对不合理期限会说“这个进度质量会下降”。低者默默做事却容易被抢功。若偏低，开会前把要说的话写成一句话，发言次数就会明显增加。",
          ja: "自己主張性は昇進と年収交渉、業務配分で最も大きく表れます。高い人は成果を自ら知らせ、無理な締切に「この日程では品質が落ちる」と言います。低い人は黙々と働いて手柄を取られやすいです。低い側なら会議の前に言うことを一文書いておくだけで発言の頻度が目に見えて増えます。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "연애에서 자기주장성은 '서운함을 말하는 방식'으로 나타납니다. 높은 사람은 불만을 그때그때 말해 오해가 적지만 상대가 공격받는다고 느낄 수 있습니다. 낮은 사람은 참다가 갑자기 이별을 말해 상대를 당황하게 합니다. 어느 쪽이든 '네가 ~해서'가 아니라 '나는 ~할 때 ~하게 느낀다'로 시작하는 나-전달법이 관계를 지킵니다.",
          en: "In relationships assertiveness appears as the way you voice hurt. High scorers say what bothers them as it happens, so misunderstandings are few, though a partner may feel attacked. Low scorers endure and then suddenly announce a break-up that leaves the partner stunned. Either way, starting with 'I feel X when Y' rather than 'you always' protects the relationship.",
          zh: "恋爱中自我主张体现在“表达委屈的方式”。高者不满当场说出，误会少，但对方可能觉得被攻击。低者一忍再忍，然后突然提分手让对方措手不及。无论哪种，用“我在……时感到……”而不是“你总是……”开头的我-信息能守住关系。",
          ja: "恋愛で自己主張性は「不満を伝える方法」として現れます。高い人は不満をその都度言うので誤解は少ないものの、相手が攻撃されたと感じることがあります。低い人は我慢した末に突然別れを切り出して相手を戸惑わせます。どちらにしても「あなたが〜だから」ではなく「私は〜のとき〜と感じる」で始める私メッセージが関係を守ります。",
        },
      },
      {
        name: { ko: "친구·가족 사이에서", en: "With friends and family", zh: "在朋友·家人之间", ja: "友人・家族の間で" },
        text: {
          ko: "가까운 사이일수록 자기주장이 어려워집니다. 돈을 빌려 달라는 부탁, 명절 역할 분담, 친구의 무리한 약속에서 낮은 사람은 '싫다'를 못 해 관계가 오히려 상합니다. 거절은 관계를 끊는 말이 아니라 관계를 오래 가게 하는 말입니다. '이번엔 어렵고, 대신 이건 도울 수 있어'처럼 거절과 대안을 함께 내놓으면 부담이 줄어듭니다.",
          en: "The closer the relationship, the harder assertiveness gets. Over loans, holiday chores or a friend's unreasonable plans, low scorers cannot say no and the relationship suffers instead. Refusal is not what ends a relationship; it is what lets it last. Pairing the no with an alternative, 'I can't this time, but I can help with this', lightens the load.",
          zh: "关系越亲近，自我主张越难。借钱、节日分工、朋友的无理约定，低者说不出“不”，反而伤了关系。拒绝不是断绝关系的话，而是让关系长久的话。“这次不行，不过这个我可以帮”，把拒绝和替代方案一起给出，负担会小很多。",
          ja: "近い間柄ほど自己主張が難しくなります。お金を貸してという頼み、祝祭日の役割分担、友人の無理な約束で低い人は「嫌だ」と言えず関係がかえって傷みます。断りは関係を切る言葉ではなく関係を長く続かせる言葉です。「今回は難しいけど、代わりにこれなら手伝える」のように断りと代案を一緒に出せば負担が減ります。",
        },
      },
      {
        name: { ko: "갈등 상황에서", en: "In conflict", zh: "在冲突中", ja: "衝突の場面で" },
        text: {
          ko: "갈등이 생기면 자기주장성의 질이 드러납니다. 건강한 자기주장은 목소리를 높이는 것이 아니라 사실, 감정, 요청을 순서대로 말하는 것입니다. '어제 약속에 30분 늦었고(사실), 나는 기다리며 무시당한 기분이었고(감정), 다음부터는 늦으면 미리 연락해 주면 좋겠어(요청)'. 이 세 단계를 지키면 높은 사람은 공격성을 덜고, 낮은 사람은 할 말을 빠뜨리지 않습니다.",
          en: "Conflict reveals the quality of your assertiveness. Healthy assertiveness is not raising your voice but stating fact, feeling and request in order: 'You were 30 minutes late yesterday (fact), I felt ignored while waiting (feeling), next time please message me if you'll be late (request).' These three steps take the edge off for high scorers and keep low scorers from leaving things unsaid.",
          zh: "冲突发生时，自我主张的质量就显露出来。健康的自我主张不是提高音量，而是按事实、感受、请求的顺序说：“你昨天迟到了30分钟（事实），我等的时候觉得被忽视（感受），以后要迟到请提前告诉我（请求）。”守住这三步，高者少了攻击性，低者不会漏掉该说的话。",
          ja: "衝突が起きると自己主張性の質が表れます。健全な自己主張は声を上げることではなく、事実・感情・要望を順に言うことです。「昨日約束に30分遅れた（事実）、私は待ちながら無視された気分だった（感情）、次から遅れるなら前もって連絡してほしい（要望）」。この三段階を守れば高い人は攻撃性を減らし、低い人は言うべきことを落としません。",
        },
      },
    ],
    balance: {
      ko: "자기주장성을 높이려면 작은 상황부터 연습합니다. 식당에서 주문이 잘못 나왔을 때 바로 말하기, 모임에서 메뉴 하나 제안하기, 하루 한 번 '저는 이렇게 생각해요'로 문장을 시작하기 같은 일입니다. 거절 연습은 '지금은 어렵습니다'라는 한 문장을 입에 붙이는 데서 시작합니다. 반대로 자기주장성이 지나친 사람은 말하기 전에 상대의 말을 한 번 요약해 돌려주는 습관('그러니까 네 말은 ~라는 거지?')이 공격성을 크게 줄여 줍니다. 자기주장은 이기는 기술이 아니라 양쪽 모두의 뜻을 테이블 위에 올리는 기술입니다.",
      en: "Build assertiveness in small situations first: speaking up at once when a restaurant order is wrong, suggesting one option when friends choose a menu, starting one sentence a day with 'I think'. Practice refusal by getting a single sentence, 'that's difficult for me right now', to come easily. If your assertiveness runs high, the habit of summarizing the other person's point before you answer ('so what you're saying is…') cuts aggressiveness sharply. Assertiveness is not the skill of winning; it is the skill of putting both sides' wishes on the table.",
      zh: "提升自我主张要从小场景练起：餐厅上错菜立刻说，聚会时提一个菜单建议，每天一次用“我认为”开头说话。拒绝练习从让“现在不太方便”这句话脱口而出开始。反过来，自我主张过强的人在开口前先复述一遍对方的话（“所以你的意思是……对吧？”），能大幅减少攻击性。自我主张不是赢的技巧，而是把双方的意愿都摆上桌面的技巧。",
      ja: "自己主張性を高めるには小さな場面から練習します。食堂で注文が間違って出てきたときすぐ言う、集まりでメニューを一つ提案する、一日一回「私はこう思います」で文を始める、といったことです。断る練習は「今は難しいです」という一文を口に慣らすところから始めます。逆に自己主張性が強すぎる人は、話す前に相手の言葉を一度要約して返す習慣（「つまり君の言うことは〜ということだね？」）が攻撃性を大きく減らしてくれます。自己主張は勝つ技術ではなく、双方の意思をテーブルに載せる技術です。",
    },
    faq: [
      {
        question: { ko: "자기주장이 강한 것과 성격이 센 것은 같은 말인가요?", en: "Is being assertive the same as having a strong personality?", zh: "自我主张强和性格强势是一回事吗？", ja: "自己主張が強いことと気が強いことは同じですか？" },
        answer: {
          ko: "다릅니다. '성격이 세다'는 말은 보통 공격성에 가깝습니다. 자기주장은 상대의 권리를 인정하면서 내 뜻을 말하는 것이고, 공격성은 내 뜻을 위해 상대를 누르는 것입니다. 목소리가 작고 말투가 부드러워도 할 말을 분명히 하면 자기주장성이 높은 사람이고, 목소리가 커도 상대를 비난하는 방식이면 자기주장이 아니라 공격입니다.",
          en: "No. A 'strong personality' usually means something closer to aggression. Assertiveness states your wish while honoring the other person's rights; aggression presses the other person down to get your way. A soft-spoken person who says what needs saying is highly assertive, while a loud person who blames others is being aggressive, not assertive.",
          zh: "不一样。“性格强势”通常更接近攻击性。自我主张是在承认对方权利的同时表达自己，攻击性是为了自己压制对方。声音小、语气柔和但把该说的说清楚，就是自我主张高；声音大却以指责对方的方式，是攻击而非自我主张。",
          ja: "違います。「気が強い」という言葉は普通、攻撃性に近いものです。自己主張は相手の権利を認めながら自分の意思を言うことで、攻撃性は自分の意思のために相手を押さえつけることです。声が小さく口調が柔らかくても言うべきことをはっきり言えば自己主張性の高い人で、声が大きくても相手を非難するやり方なら自己主張ではなく攻撃です。",
        },
      },
      {
        question: { ko: "거절을 못 하는 성격은 고칠 수 있나요?", en: "Can someone who can't say no change?", zh: "不会拒绝的性格能改吗？", ja: "断れない性格は直せますか？" },
        answer: {
          ko: "네, 자기주장성은 성격 특성 가운데 훈련 효과가 가장 잘 보고된 영역입니다. 핵심은 '거절해도 관계가 깨지지 않는다'는 경험을 쌓는 것입니다. 위험이 적은 상대와 상황부터 시작해 '지금은 어렵다'를 말하고, 실제로 관계가 유지되는 것을 확인하세요. 대본을 미리 써 두는 것, 즉답 대신 '생각해 보고 말해 줄게'로 시간을 버는 것도 효과가 큽니다.",
          en: "Yes. Assertiveness is the personality trait with the best-documented response to training. The key is accumulating the experience that saying no does not break the relationship. Start with low-risk people and situations, say 'that's hard for me right now', and notice that the relationship holds. Writing a script in advance and buying time with 'let me think and get back to you' instead of answering on the spot both help a great deal.",
          zh: "可以。自我主张是性格特质中训练效果最有据可查的领域。关键是积累“拒绝了关系也没破裂”的经验。从风险低的人和场景开始说“现在不太方便”，确认关系依然维持。提前写好台词、用“我想想再答复你”争取时间而不是当场回答，效果都很好。",
          ja: "はい、自己主張性は性格特性の中で訓練効果が最もよく報告されている領域です。核心は「断っても関係が壊れない」という経験を積むことです。危険の少ない相手と状況から始めて「今は難しい」と言い、実際に関係が保たれることを確認してください。台本を前もって書いておくこと、即答の代わりに「考えてから返事する」で時間を稼ぐことも効果が大きいです。",
        },
      },
      {
        question: { ko: "이 테스트에서 자기주장성은 어떻게 측정하나요?", en: "How does this test measure assertiveness?", zh: "本测试如何测量自我主张？", ja: "このテストで自己主張性はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 자기주장성을 다룹니다. 회의에서 내 의견과 다른 결정이 내려질 때, 친구가 불합리한 부탁을 할 때 어떻게 반응하는지를 네 가지 선택지로 묻고, 선택에 따라 자기주장성 점수가 더해집니다. 이 점수는 Solar 에너지 합계의 일부가 되며, 결과 화면에서 차원별 막대로 볼 수 있습니다. 문항이 적으므로 정밀 검사라기보다 자기 성향을 돌아보는 출발점으로 보면 됩니다.",
          en: "Two of the twelve questions address assertiveness: how you react when a meeting decides against your view, and when a friend makes an unreasonable request, each with four options that add to the assertiveness score. That score forms part of the Solar total and appears as a bar on the result screen. With so few items, treat it as a starting point for reflection rather than a precise instrument.",
          zh: "12题中有2题涉及自我主张：会议上做出与我意见相反的决定时、朋友提出不合理请求时如何反应，各有四个选项，按选择累加自我主张分数。该分数计入Solar能量总分，并在结果页以维度条形显示。题目较少，与其说是精密测验，不如把它当作回顾自己倾向的起点。",
          ja: "12問のうち2問が自己主張性を扱います。会議で自分の意見と違う決定が下されたとき、友人が不合理な頼みをしてきたときにどう反応するかを四つの選択肢で尋ね、選択に応じて自己主張性の点数が加算されます。この点数はSolarエネルギー合計の一部になり、結果画面で次元別の棒グラフとして見られます。設問が少ないので精密検査というより自分の傾向を振り返る出発点と見てください。",
        },
      },
    ],
  },

  // ───────────────────────── 성취지향성 ─────────────────────────
  {
    id: "achievement",
    pole: "SOLAR",
    emoji: "🏆",
    name: traitNames.achievement,
    title: {
      ko: "성취지향성이란 | 성취욕 강한 사람의 특징, 장단점과 번아웃 예방법",
      en: "What Is Achievement Drive? Traits of Highly Driven People, Pros, Cons and Burnout Prevention",
      zh: "什么是成就导向 | 成就欲强的人的特征、优缺点与倦怠预防",
      ja: "達成志向とは | 達成欲の強い人の特徴、長所短所と燃え尽き予防",
    },
    description: {
      ko: "성취지향성은 목표를 세우고 이루는 데서 힘을 얻는 성향입니다. 맥클릴랜드의 성취동기 이론, 성취욕이 높은 사람과 낮은 사람의 특징, 직장·학업·연애에서의 모습, 번아웃을 막는 균형법과 FAQ를 정리했습니다.",
      en: "Achievement drive is the tendency to draw energy from setting and reaching goals. McClelland's achievement motivation, traits of high and low drive, how it shows at work, in study and in love, and how to keep it from burning you out.",
      zh: "成就导向是从设定并实现目标中获得动力的倾向。整理了麦克利兰的成就动机理论、成就欲高与低的人的特征、在职场·学业·恋爱中的表现、预防倦怠的平衡法与常见问题。",
      ja: "達成志向は目標を立てて成し遂げることから力を得る傾向です。マクレランドの達成動機理論、達成欲が高い人と低い人の特徴、職場・学業・恋愛での姿、燃え尽きを防ぐバランス法とFAQをまとめました。",
    },
    keywords: {
      ko: ["성취지향성", "성취욕", "성취동기", "목표지향적 성격", "일중독", "번아웃 예방", "성취욕 강한 사람"],
      en: ["achievement drive", "achievement motivation", "goal-oriented personality", "workaholic", "burnout"],
      zh: ["成就导向", "成就动机", "目标导向性格", "倦怠"],
      ja: ["達成志向", "達成動機", "目標志向", "燃え尽き症候群"],
    },
    heading: {
      ko: "성취지향성: 목표가 연료가 되는 사람",
      en: "Achievement Drive: When Goals Are Your Fuel",
      zh: "成就导向：以目标为燃料的人",
      ja: "達成志向：目標が燃料になる人",
    },
    intro: {
      ko: "성취지향성(achievement orientation)은 도전적인 목표를 세우고, 그것을 이루는 과정과 결과에서 만족과 에너지를 얻는 성향입니다. 심리학자 맥클릴랜드(David McClelland)는 사람을 움직이는 세 가지 욕구로 성취욕구, 친화욕구, 권력욕구를 들었는데, 그중 성취욕구가 높은 사람은 '적당히 어려운' 목표를 좋아하고, 결과에 대한 피드백을 원하며, 운보다 자기 노력으로 결과가 갈리는 일을 선호한다고 했습니다. 너무 쉬운 일은 지루하고, 운에 좌우되는 일은 성취감이 없기 때문입니다.\n\n이 테스트에서 성취지향성은 Solar 에너지의 두 번째 차원입니다. 자기주장성이 '내 뜻을 말하는 힘'이라면 성취지향성은 '내 뜻을 끝까지 밀고 가는 힘'입니다. 벰의 성역할 검사에서도 '야심 있는', '경쟁적인' 같은 항목이 같은 묶음에 들어 있었습니다. 다만 성취지향성은 경쟁심과는 다릅니다. 경쟁심은 남을 이기는 데서, 성취지향성은 어제의 나보다 나아지는 데서 만족을 얻습니다.\n\n성취지향성은 사회가 가장 높이 사는 성향이라 '높을수록 좋다'고 여기기 쉽지만, 심리학에서는 지나친 성취지향이 완벽주의, 일중독, 번아웃과 이어진다는 점을 꾸준히 지적합니다. 중요한 것은 성취지향성의 높이보다 그것이 어디를 향하는가, 그리고 쉬는 법을 아는가입니다.",
      en: "Achievement orientation is the tendency to set challenging goals and to draw satisfaction and energy from the process and the result of reaching them. The psychologist David McClelland named three needs that move people, achievement, affiliation and power, and found that people high in the need for achievement prefer moderately difficult goals, want feedback on results, and favor tasks where effort rather than luck decides the outcome. Easy tasks bore them and games of chance give no sense of accomplishment.\n\nIn this test achievement drive is the second dimension of Solar energy. If assertiveness is the power to say what you want, achievement drive is the power to carry it through. Bem's inventory placed 'ambitious' and 'competitive' in the same cluster. Yet achievement drive differs from competitiveness: competitiveness is satisfied by beating others, achievement drive by improving on yesterday's self.\n\nBecause society prizes this trait above most others, it is tempting to assume more is always better, but psychology has long linked excessive achievement drive to perfectionism, workaholism and burnout. What matters is less how high it is than where it is pointed, and whether you know how to rest.",
      zh: "成就导向（achievement orientation）是设定有挑战性的目标，并从实现目标的过程与结果中获得满足与能量的倾向。心理学家麦克利兰提出驱动人的三种需求：成就、亲和、权力。他发现成就需求高的人喜欢“难度适中”的目标，渴望结果反馈，偏好靠努力而非运气决定结果的事。太容易的事无聊，靠运气的事没有成就感。\n\n本测试中成就导向是Solar能量的第二个维度。自我主张是“说出自己想法的力量”，成就导向则是“把想法贯彻到底的力量”。贝姆的量表也把“有抱负的”“竞争性的”列入同一组。但成就导向不同于好胜心：好胜心从赢过别人得到满足，成就导向从超越昨天的自己得到满足。\n\n由于社会最推崇这一特质，人们容易认为“越高越好”，但心理学一直指出过度成就导向与完美主义、工作狂、倦怠相关。重要的不是高低，而是它指向何处，以及你是否懂得休息。",
      ja: "達成志向（achievement orientation）は挑戦的な目標を立て、それを成し遂げる過程と結果から満足とエネルギーを得る傾向です。心理学者マクレランドは人を動かす三つの欲求として達成欲求、親和欲求、権力欲求を挙げ、達成欲求が高い人は「ほどよく難しい」目標を好み、結果へのフィードバックを求め、運より自分の努力で結果が分かれる仕事を好むとしました。易しすぎる仕事は退屈で、運に左右される仕事には達成感がないからです。\n\nこのテストで達成志向はSolarエネルギーの二番目の次元です。自己主張性が「自分の意思を言う力」なら、達成志向は「自分の意思を最後まで押し進める力」です。ベムの性役割検査でも「野心的な」「競争的な」といった項目が同じ群に入っていました。ただ達成志向は競争心とは違います。競争心は人に勝つことから、達成志向は昨日の自分より良くなることから満足を得ます。\n\n達成志向は社会が最も高く評価する傾向なので「高いほど良い」と思いがちですが、心理学では過度の達成志向が完璧主義、仕事中毒、燃え尽きにつながる点を一貫して指摘しています。大切なのは達成志向の高さよりそれがどこへ向かうか、そして休み方を知っているかです。",
    },
    high: {
      ko: "성취지향성이 높은 사람은 목표가 없으면 오히려 불안해합니다. 할 일 목록을 지우는 데서 쾌감을 느끼고, 마감이 있어야 집중이 되며, 남이 시키지 않아도 스스로 기준을 올립니다. 결과를 내는 힘이 강해 어디서나 쓸모를 인정받지만, 쉬는 날에도 '생산적이어야 한다'는 압박을 느끼고, 결과가 안 좋으면 자기 가치까지 깎아내리는 함정에 빠지기 쉽습니다.",
      en: "People high in achievement drive feel uneasy without a goal. They enjoy crossing items off a list, focus best under a deadline, and raise their own bar without being told. Their capacity to deliver is valued everywhere, but they feel pressure to be productive even on days off and easily fall into the trap of discounting their own worth when a result disappoints.",
      zh: "成就导向高的人没有目标反而会不安。划掉待办事项让他们愉悦，有期限才能专注，没人要求也会自我加压。他们出成果的能力处处受重视，但休息日也觉得“必须有产出”，结果不好时容易连自我价值一起否定。",
      ja: "達成志向が高い人は目標がないとかえって不安になります。やることリストを消すことに快感を覚え、締切があってこそ集中でき、人に言われなくても自分で基準を上げます。結果を出す力が強くどこでも有用と認められますが、休みの日にも「生産的でなければ」という圧力を感じ、結果が悪いと自分の価値まで下げてしまう罠に陥りやすいです。",
    },
    low: {
      ko: "성취지향성이 낮은 사람은 결과보다 과정과 관계, 지금의 편안함을 중시합니다. 경쟁에 휘말리지 않아 여유 있고, 번아웃이 적으며, 성공과 실패에 크게 흔들리지 않습니다. 다만 목표가 흐릿하면 시간이 흘러도 제자리라는 느낌이 들고, 중요한 기회 앞에서도 '굳이'라며 물러서기 쉽습니다. 이 유형에게는 큰 목표보다 작고 구체적인 '다음 한 걸음'이 잘 맞습니다.",
      en: "People low in achievement drive value process, relationships and present comfort over results. They stay out of rat races, burn out rarely and are not shaken much by success or failure. But with blurry goals they may feel stuck as years pass, and may back away from important chances with a shrug. For this type, a small, concrete next step works better than a grand goal.",
      zh: "成就导向低的人比起结果更看重过程、关系和当下的舒适。不卷入竞争，从容、少倦怠，不太因成败而动摇。但目标模糊时会觉得时间过去了却原地踏步，面对重要机会也容易“算了”退缩。对这类人来说，比起宏大目标，小而具体的“下一步”更合适。",
      ja: "達成志向が低い人は結果より過程と関係、今の心地よさを重んじます。競争に巻き込まれず余裕があり、燃え尽きが少なく、成功と失敗に大きく揺れません。ただ目標がぼやけていると時間が経っても足踏みしている感覚になり、大事な機会の前でも「わざわざ」と引きやすいです。このタイプには大きな目標より小さく具体的な「次の一歩」が合います。",
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "성취지향성이 높은 사람은 영업, 창업, 프로젝트 리더처럼 숫자로 결과가 보이는 일에서 빛납니다. 낮은 사람은 안정적인 운영, 돌봄, 장기 연구처럼 꾸준함이 중요한 일에서 오래 갑니다. 높은 사람이 조심할 것은 동료의 속도를 자기 기준으로 재단하는 것이고, 낮은 사람이 조심할 것은 성과를 말하지 않아 저평가되는 것입니다.",
          en: "High scorers shine in sales, start-ups and project leadership, where results show in numbers. Low scorers last longer in steady operations, caregiving and long-term research, where consistency matters. The high scorer must avoid judging colleagues' pace by their own standard; the low scorer must avoid being undervalued for never mentioning results.",
          zh: "成就导向高的人在销售、创业、项目负责人等结果可量化的工作中发光；低的人在稳定运营、照护、长期研究等重坚持的工作中走得更久。高者要当心用自己的标准衡量同事的节奏，低者要当心不说成果而被低估。",
          ja: "達成志向が高い人は営業、起業、プロジェクトリーダーのように数字で結果が見える仕事で輝きます。低い人は安定した運営、ケア、長期研究のように地道さが重要な仕事で長く続きます。高い人が気をつけるべきは同僚の速度を自分の基準で裁くことで、低い人が気をつけるべきは成果を言わずに過小評価されることです。",
        },
      },
      {
        name: { ko: "학업·자기계발에서", en: "In study and self-improvement", zh: "在学业·自我提升中", ja: "学業・自己啓発で" },
        text: {
          ko: "성취지향성이 높으면 시험과 자격증처럼 목표가 분명한 공부에 강하지만, 점수가 나오지 않는 공부(교양, 취미)는 금방 접습니다. 낮으면 흥미 위주로 오래 배우지만 마무리가 약합니다. 높은 사람은 '점수 없는 배움'을 일부러 하나 두고, 낮은 사람은 배움에 작은 결과물(발표, 글, 작품)을 붙이면 양쪽 모두 균형이 잡힙니다.",
          en: "High drive suits study with clear targets such as exams and certifications, but drops subjects with no score, like general reading or hobbies. Low drive keeps learning for interest but finishes weakly. High scorers benefit from deliberately keeping one 'learning without a score'; low scorers from attaching a small product, a talk, an essay, a piece, to what they learn.",
          zh: "成就导向高的人擅长考试、证书等目标明确的学习，但对没有分数的学习（通识、爱好）很快放弃。低的人凭兴趣学得久却收尾弱。高者有意留一项“无分数的学习”，低者给学习附上小成果（发表、文章、作品），双方都能平衡。",
          ja: "達成志向が高いと試験や資格のように目標がはっきりした勉強に強いですが、点数の出ない勉強（教養、趣味）はすぐやめてしまいます。低いと興味中心で長く学びますが仕上げが弱いです。高い人は「点数のない学び」をわざと一つ持ち、低い人は学びに小さな成果物（発表、文章、作品）をつければ双方とも均衡が取れます。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "성취지향성이 높은 사람은 연애 초반에 적극적이고 기념일과 계획을 잘 챙기지만, 관계가 안정되면 일에 밀려 상대가 '목표 달성 후 방치된 느낌'을 받을 수 있습니다. 낮은 사람은 함께 있는 시간 자체를 즐겨 편안하지만 미래 계획이 없어 상대가 불안해할 수 있습니다. 관계는 달성하는 목표가 아니라 유지하는 과정이라는 점을 높은 쪽이, 함께 그리는 그림도 필요하다는 점을 낮은 쪽이 기억하면 좋습니다.",
          en: "High scorers are proactive early in a relationship and good with anniversaries and plans, but once things settle, work takes over and the partner may feel 'shelved after the goal was met'. Low scorers enjoy simply being together, which is comforting, but their lack of future plans can unsettle a partner. The high scorer should remember that a relationship is a process to maintain, not a goal to reach; the low scorer that a shared picture of the future matters too.",
          zh: "成就导向高的人恋爱初期积极，纪念日和计划都安排得好，但关系稳定后容易被工作挤占，让对方感到“目标达成后被搁置”。低的人享受相处本身，让人安心，但没有未来规划会让对方不安。高者要记住关系是需要维系的过程而非达成的目标，低者要记住一起描绘的蓝图同样重要。",
          ja: "達成志向が高い人は恋愛の初期に積極的で記念日と計画をよく押さえますが、関係が安定すると仕事に押されて相手が「目標達成後に放置された感じ」を受けることがあります。低い人は一緒にいる時間そのものを楽しむので心地よいですが、将来の計画がなく相手が不安になることがあります。関係は達成する目標ではなく維持する過程だという点を高い側が、一緒に描く絵も必要だという点を低い側が覚えておくとよいでしょう。",
        },
      },
      {
        name: { ko: "실패했을 때", en: "When you fail", zh: "失败时", ja: "失敗したとき" },
        text: {
          ko: "실패를 대하는 방식에서 성취지향성의 건강함이 갈립니다. 건강한 고성취자는 실패를 정보로 받아들여 다음 시도를 조정하고, 건강하지 않은 고성취자는 실패를 자기 가치의 판결로 받아들여 숨거나 포기합니다. 캐럴 드웩의 성장 마인드셋 연구가 보여 주듯, '아직 못 한 것'과 '할 수 없는 것'을 구분하는 말버릇이 회복 속도를 바꿉니다.",
          en: "How you handle failure separates healthy from unhealthy achievement drive. The healthy high achiever treats failure as information and adjusts the next attempt; the unhealthy one treats it as a verdict on their worth and hides or quits. As Carol Dweck's growth-mindset research shows, the habit of saying 'not yet' instead of 'I can't' changes how fast you recover.",
          zh: "面对失败的方式区分了成就导向健康与否。健康的高成就者把失败当作信息，调整下一次尝试；不健康的高成就者把失败当作对自我价值的审判，躲起来或放弃。正如德韦克的成长型思维研究所示，区分“还没做到”和“做不到”的口头习惯会改变恢复的速度。",
          ja: "失敗への向き合い方で達成志向の健全さが分かれます。健全な高達成者は失敗を情報として受け取り次の試みを調整し、不健全な高達成者は失敗を自分の価値への判決として受け取り隠れたり諦めたりします。キャロル・ドゥエックの成長マインドセット研究が示すように、「まだできていない」と「できない」を区別する口癖が回復の速さを変えます。",
        },
      },
    ],
    balance: {
      ko: "성취지향성이 낮아 고민이라면 목표를 '크게'가 아니라 '작게, 날짜와 함께' 세우세요. '운동하기'가 아니라 '수요일 저녁 20분 걷기'처럼 실패하기 어려운 크기로 쪼개면, 작은 달성이 쌓이며 성취감이 학습됩니다. 성취지향성이 높아 지친다면 세 가지를 점검하세요. 첫째, 목표가 내 것인지 남이 정해 준 것인지. 둘째, 성과가 없는 하루를 견딜 수 있는지. 셋째, 몸이 보내는 신호(불면, 두통, 짜증)를 무시하고 있지 않은지. 성취지향성은 자동차의 엔진과 같아서, 브레이크와 함께 있을 때만 멀리 갑니다.",
      en: "If low drive worries you, set goals small and dated rather than large: not 'exercise' but 'walk 20 minutes Wednesday evening'. Chunks too small to fail let small wins accumulate and teach your brain the feeling of achievement. If high drive is wearing you down, check three things: whether the goal is yours or someone else's, whether you can tolerate a day with no output, and whether you are ignoring the body's signals, poor sleep, headaches, irritability. Achievement drive is the engine of the car; it only goes far when paired with brakes.",
      zh: "若因成就导向低而烦恼，目标不要“大”，要“小且带日期”。不是“运动”，而是“周三晚上走20分钟”，拆到难以失败的尺度，小成就累积起来就能学会成就感。若因成就导向高而疲惫，检查三点：目标是自己的还是别人定的；能否承受没有产出的一天；是否忽视了身体信号（失眠、头痛、易怒）。成就导向像汽车的引擎，只有配上刹车才能走远。",
      ja: "達成志向が低くて悩んでいるなら目標を「大きく」ではなく「小さく、日付と一緒に」立ててください。「運動する」ではなく「水曜の夜に20分歩く」のように失敗しにくい大きさに分ければ、小さな達成が積もって達成感が学習されます。達成志向が高くて疲れているなら三つを点検してください。第一に、目標が自分のものか人が決めたものか。第二に、成果のない一日に耐えられるか。第三に、体が送る信号（不眠、頭痛、苛立ち）を無視していないか。達成志向は車のエンジンのようなもので、ブレーキと一緒にあるときだけ遠くへ行けます。",
    },
    faq: [
      {
        question: { ko: "성취욕이 강하면 성공할 확률이 높나요?", en: "Does strong achievement drive mean a higher chance of success?", zh: "成就欲强就更容易成功吗？", ja: "達成欲が強いと成功する確率が高いですか？" },
        answer: {
          ko: "성취동기 연구에서는 성취욕이 높은 사람이 도전적 과제에서 더 오래 버티고 더 많이 시도하는 경향이 일관되게 나타납니다. 다만 '성공'의 정의에 따라 다릅니다. 성취욕은 결과를 내는 데 유리하지만, 삶의 만족도는 성취욕 자체보다 목표가 자기 가치와 맞는지, 관계와 건강을 함께 지키는지에 더 좌우됩니다. 성취욕이 낮아도 자기 속도로 원하는 삶을 사는 사람은 많습니다.",
          en: "Research on achievement motivation consistently shows that people high in the trait persist longer and try more often at challenging tasks. But it depends on what you call success. The trait helps produce results, yet life satisfaction depends less on drive itself than on whether your goals match your values and whether you protect relationships and health along the way. Many people with low drive live the life they want at their own pace.",
          zh: "成就动机研究一致显示，成就欲高的人在挑战性任务上坚持更久、尝试更多。但要看如何定义“成功”。成就欲有利于出结果，但生活满意度更取决于目标是否契合自身价值、是否同时守住关系与健康，而非成就欲本身。成就欲低却按自己节奏过上理想生活的人也很多。",
          ja: "達成動機の研究では、達成欲が高い人は挑戦的な課題でより長く粘りより多く試みる傾向が一貫して示されます。ただ「成功」の定義によります。達成欲は結果を出すのに有利ですが、人生の満足度は達成欲そのものより目標が自分の価値観に合っているか、関係と健康を一緒に守っているかに左右されます。達成欲が低くても自分の速さで望む人生を生きている人は多いです。",
        },
      },
      {
        question: { ko: "성취지향성과 완벽주의는 어떻게 다른가요?", en: "How is achievement drive different from perfectionism?", zh: "成就导向和完美主义有什么不同？", ja: "達成志向と完璧主義はどう違いますか？" },
        answer: {
          ko: "성취지향성은 '더 나아지려는' 동기이고, 완벽주의는 '실수하면 안 된다'는 두려움에 가깝습니다. 성취지향적인 사람은 80점짜리 결과를 내고 다음에 90점을 노리지만, 완벽주의자는 100점이 안 될 것 같으면 시작조차 미룹니다. 심리학에서는 건강한 성취지향이 완벽주의로 기울어지는 신호로 '끝내지 못하는 일이 늘어나는 것'과 '남의 평가가 두려워지는 것'을 꼽습니다.",
          en: "Achievement drive is the motivation to get better; perfectionism is closer to the fear of making a mistake. The driven person delivers an 80 and aims for 90 next time; the perfectionist postpones starting if 100 seems out of reach. Psychology names two warning signs that healthy drive is tipping into perfectionism: a growing pile of unfinished work, and a growing fear of other people's judgment.",
          zh: "成就导向是“想变得更好”的动机，完美主义更接近“不能出错”的恐惧。成就导向的人交出80分的结果，下次瞄准90分；完美主义者觉得拿不到100分就连开始都拖延。心理学认为健康的成就导向滑向完美主义的信号是：做不完的事越来越多，越来越害怕他人评价。",
          ja: "達成志向は「より良くなろう」という動機で、完璧主義は「失敗してはいけない」という恐れに近いものです。達成志向の人は80点の結果を出して次に90点を狙いますが、完璧主義者は100点にならなそうなら始めることすら先延ばしにします。心理学では健全な達成志向が完璧主義に傾く信号として「終えられない仕事が増えること」と「人の評価が怖くなること」を挙げます。",
        },
      },
      {
        question: { ko: "이 테스트에서 성취지향성은 어떻게 측정하나요?", en: "How does this test measure achievement drive?", zh: "本测试如何测量成就导向？", ja: "このテストで達成志向はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 성취지향성을 다룹니다. 새로운 목표를 세울 때의 스타일, 일이 잘 안 풀릴 때의 반응을 네 가지 선택지로 묻습니다. 선택에 따라 성취지향성 점수가 쌓여 Solar 에너지 합계에 더해지고, 결과 화면에서 막대 그래프로 확인할 수 있습니다. 가벼운 자기 점검용이므로 전문 성취동기 검사와는 다릅니다.",
          en: "Two of the twelve questions address achievement drive: your style when setting a new goal, and how you react when things go badly, each with four options. The choices build an achievement score that joins the Solar total and appears as a bar on the result screen. It is a light self-check, not a professional achievement motivation inventory.",
          zh: "12题中有2题涉及成就导向：设定新目标时的风格、事情不顺时的反应，各有四个选项。按选择累加成就导向分数，计入Solar能量总分，并在结果页以条形显示。这是轻量自测，不同于专业的成就动机测验。",
          ja: "12問のうち2問が達成志向を扱います。新しい目標を立てるときのスタイル、仕事がうまくいかないときの反応を四つの選択肢で尋ねます。選択に応じて達成志向の点数が積もりSolarエネルギー合計に加わり、結果画面で棒グラフとして確認できます。軽い自己点検用なので専門の達成動機検査とは異なります。",
        },
      },
    ],
  },

  // ───────────────────────── 독립성 ─────────────────────────
  {
    id: "independence",
    pole: "SOLAR",
    emoji: "🧭",
    name: traitNames.independence,
    title: {
      ko: "독립성이란 | 독립적인 성격의 특징, 의존성과의 차이와 균형 잡는 법",
      en: "What Is Independence? Traits of an Independent Personality, Dependence and Finding Balance",
      zh: "什么是独立性 | 独立型性格的特征、与依赖性的区别及平衡方法",
      ja: "独立性とは | 独立した性格の特徴、依存性との違いとバランスの取り方",
    },
    description: {
      ko: "독립성은 스스로 판단하고 결정하며 혼자서도 잘 지내는 성향입니다. 자기결정이론으로 보는 자율성, 독립적인 사람과 의존적인 사람의 특징, 직장·연애·혼자 있는 시간에서의 모습, 고립과 독립을 구별하는 법과 FAQ를 정리했습니다.",
      en: "Independence is the tendency to judge and decide for yourself and to do well on your own. Autonomy in self-determination theory, traits of independent and dependent people, how it shows at work, in love and in solitude, and how to tell independence from isolation.",
      zh: "独立性是自主判断、自主决定、独处也自在的倾向。整理了自我决定理论中的自主性、独立型与依赖型的人的特征、在职场·恋爱·独处时间中的表现、区分孤立与独立的方法及常见问题。",
      ja: "独立性は自分で判断し決定し、一人でもうまく過ごせる傾向です。自己決定理論で見る自律性、独立的な人と依存的な人の特徴、職場・恋愛・一人の時間での姿、孤立と独立を見分ける方法とFAQをまとめました。",
    },
    keywords: {
      ko: ["독립성", "독립적인 성격", "자율성", "의존적인 성격", "혼자가 편한 사람", "독립적인 사람 특징", "성향 테스트"],
      en: ["independence personality", "autonomy", "independent person traits", "dependent personality", "self-determination theory"],
      zh: ["独立性", "独立型性格", "自主性", "依赖型性格"],
      ja: ["独立性", "独立した性格", "自律性", "依存的な性格"],
    },
    heading: {
      ko: "독립성: 내 삶의 운전대를 내가 잡는 힘",
      en: "Independence: Holding the Wheel of Your Own Life",
      zh: "独立性：自己掌握人生方向盘的力量",
      ja: "独立性：自分の人生のハンドルを自分で握る力",
    },
    intro: {
      ko: "독립성(independence)은 중요한 판단과 결정을 남에게 맡기지 않고 스스로 내리며, 혼자 있는 시간에도 안정감을 느끼는 성향입니다. 심리학에서 가장 가까운 개념은 데시와 라이언(Deci & Ryan)의 자기결정이론이 말하는 자율성(autonomy)입니다. 이 이론은 사람이 잘 살기 위해 세 가지가 필요하다고 봅니다. 스스로 선택한다는 느낌(자율성), 할 수 있다는 느낌(유능감), 연결되어 있다는 느낌(관계성)입니다. 독립성은 그중 첫 번째와 깊이 닿아 있습니다.\n\n이 테스트에서 독립성은 Solar 에너지의 세 번째 차원입니다. 벰의 성역할 검사에서 '독립적인', '자립심 있는'은 전통적으로 남성적이라 분류된 항목이었고, 이 테스트는 그 분류를 출발점으로 삼았습니다. 다만 현대 심리학은 독립성을 성별의 문제가 아니라 양육과 문화의 문제로 봅니다. 개인주의 문화에서 자란 사람은 독립성이 높게 측정되는 경향이 있고, 관계를 중시하는 문화에서는 '서로 기대는 것'이 성숙으로 여겨집니다.\n\n독립성에 대한 가장 흔한 오해는 '남이 필요 없는 상태'로 보는 것입니다. 심리학에서 건강한 독립성은 혼자 설 수 있으면서도 필요할 때 도움을 청할 수 있는 상태를 말하며, 이를 상호의존(interdependence)이라고 부릅니다. 도움을 청하지 못하는 독립은 독립이 아니라 고립입니다.",
      en: "Independence is the tendency to make important judgments and decisions yourself rather than handing them to others, and to feel settled when alone. The closest concept in psychology is autonomy in the self-determination theory of Deci and Ryan, which holds that people need three things to thrive: a sense of choosing for themselves (autonomy), a sense of capability (competence) and a sense of connection (relatedness). Independence touches the first most closely.\n\nIn this test independence is the third dimension of Solar energy. In Bem's inventory 'independent' and 'self-reliant' were items in the traditionally masculine cluster, and this test takes that classification as its starting point. Modern psychology, however, treats independence as a matter of upbringing and culture rather than sex. People raised in individualist cultures tend to score higher, while cultures that prize relationships regard leaning on one another as maturity.\n\nThe most common misunderstanding is to see independence as 'not needing anyone'. Healthy independence in psychology means being able to stand alone and also to ask for help when needed, a state called interdependence. Independence that cannot ask for help is not independence but isolation.",
      zh: "独立性（independence）是重要判断与决定不交给他人、由自己做出，并在独处时也感到安稳的倾向。心理学中最接近的概念是德西与瑞安自我决定理论中的自主性。该理论认为人要活得好需要三样东西：自己选择的感觉（自主）、能做到的感觉（胜任）、与人相连的感觉（归属）。独立性与第一项关系最深。\n\n本测试中独立性是Solar能量的第三个维度。贝姆量表中“独立的”“自立的”属于传统上归为男性化的条目，本测试以此为起点。但现代心理学认为独立性不是性别问题，而是养育与文化问题。个人主义文化中长大的人独立性得分偏高，而重视关系的文化把“相互依靠”视为成熟。\n\n对独立性最常见的误解是把它看成“不需要别人”。心理学中健康的独立性指既能独自站立、也能在需要时求助的状态，称为相互依存。不能求助的独立不是独立，而是孤立。",
      ja: "独立性（independence）は重要な判断と決定を人に任せず自分で下し、一人の時間にも安定を感じる傾向です。心理学で最も近い概念はデシとライアンの自己決定理論が言う自律性です。この理論は人がよく生きるために三つが必要だと見ます。自分で選んでいるという感覚（自律性）、できるという感覚（有能感）、つながっているという感覚（関係性）です。独立性はそのうち最初のものと深く結びついています。\n\nこのテストで独立性はSolarエネルギーの三番目の次元です。ベムの性役割検査で「独立した」「自立心のある」は伝統的に男性的と分類された項目で、このテストはその分類を出発点にしました。ただ現代心理学は独立性を性別の問題ではなく養育と文化の問題と見ます。個人主義文化で育った人は独立性が高く測られる傾向があり、関係を重んじる文化では「互いに頼ること」が成熟と見なされます。\n\n独立性への最もよくある誤解は「人が要らない状態」と見ることです。心理学で健全な独立性は一人で立てながら必要なときに助けを求められる状態を言い、これを相互依存と呼びます。助けを求められない独立は独立ではなく孤立です。",
    },
    high: {
      ko: "독립성이 높은 사람은 결정을 내릴 때 남의 허락을 구하지 않고, 혼자 밥 먹고 혼자 여행하는 데 거리낌이 없으며, 남의 평가에 비교적 덜 흔들립니다. 자기 기준이 분명해 위기에 강하고 창업·프리랜서·연구처럼 혼자 책임지는 일에 어울립니다. 다만 도움을 청하는 것을 약함으로 여겨 혼자 끙끙 앓거나, 가까운 사람에게 '나 없이도 잘 사는 사람'으로 비쳐 거리감을 줄 수 있습니다.",
      en: "People high in independence decide without seeking permission, eat and travel alone without discomfort, and are less shaken by others' opinions. Clear personal standards make them strong in crises and suited to founding a business, freelancing or research, where one person carries the responsibility. But they may see asking for help as weakness and suffer alone, or seem to those close to them like someone who does fine without anyone, which creates distance.",
      zh: "独立性高的人做决定不求他人许可，一个人吃饭旅行毫不在意，相对不受他人评价左右。自我标准清晰，危机中坚强，适合创业、自由职业、研究等独自承担责任的工作。但他们可能把求助视为软弱而独自硬扛，或在亲近的人眼中像“没有我也过得很好的人”，产生距离感。",
      ja: "独立性が高い人は決定を下すとき人の許可を求めず、一人で食事し一人で旅行することにためらいがなく、人の評価に比較的揺れません。自分の基準がはっきりしていて危機に強く、起業・フリーランス・研究のように一人で責任を負う仕事に向きます。ただ助けを求めることを弱さと見て一人で抱え込んだり、身近な人に「私がいなくても平気な人」と映って距離感を与えたりすることがあります。",
    },
    low: {
      ko: "독립성이 낮은 사람은 중요한 결정 앞에서 여러 사람의 의견을 모으고, 함께할 때 힘이 나며, 혼자 있는 시간이 길어지면 불안해지기도 합니다. 남의 조언을 잘 받아들여 실수가 적고 관계가 두텁다는 장점이 있습니다. 다만 결정의 책임을 남에게 넘기다 보면 결과가 나빴을 때 원망이 생기고, 자기가 진짜 원하는 것이 무엇인지 점점 흐려집니다. 이 유형에게는 '작은 결정을 혼자 내려 보는 연습'이 가장 효과적입니다.",
      en: "People low in independence gather several opinions before a big decision, draw energy from company, and may grow anxious when alone for long. They take advice well, make fewer mistakes and keep rich relationships. But handing the responsibility for decisions to others breeds resentment when things go wrong, and what they truly want grows blurry. The most effective practice for this type is making small decisions alone.",
      zh: "独立性低的人在重大决定前会收集多人意见，与人同行时有干劲，独处时间长了会不安。他们善于接受建议、少犯错、关系深厚。但把决定的责任推给别人，结果不好时会生怨，自己真正想要什么也越来越模糊。对这类人最有效的练习是“自己做出小决定”。",
      ja: "独立性が低い人は重要な決定の前に何人もの意見を集め、一緒にいるときに力が出て、一人の時間が長くなると不安になることもあります。人の助言をよく受け入れるので失敗が少なく関係が厚いという長所があります。ただ決定の責任を人に渡していると結果が悪かったときに恨みが生まれ、自分が本当に望むものが何かだんだんぼやけていきます。このタイプには「小さな決定を一人で下してみる練習」が最も効果的です。",
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "독립성이 높은 사람은 지시가 세세한 환경에서 숨이 막히고, 재량이 주어지면 성과가 크게 오릅니다. 낮은 사람은 역할과 절차가 분명한 조직에서 안정적으로 일합니다. 높은 사람은 '혼자 다 하려다 공유를 놓치는 것'을, 낮은 사람은 '확인받느라 결정이 늦어지는 것'을 조심해야 합니다. 보고 주기를 미리 합의해 두면 양쪽 모두 편해집니다.",
          en: "High scorers suffocate under micromanagement and perform far better with discretion. Low scorers work steadily where roles and procedures are clear. The high scorer must guard against doing everything alone and failing to share; the low scorer against decisions delayed by seeking confirmation. Agreeing on a reporting rhythm in advance makes both comfortable.",
          zh: "独立性高的人在事无巨细的管理下会窒息，被赋予自主权时业绩大增。低的人在角色与流程清晰的组织中工作稳定。高者要当心“什么都自己做而忘了共享”，低者要当心“为求确认而拖延决定”。事先商定汇报节奏，双方都轻松。",
          ja: "独立性が高い人は指示が細かい環境で息が詰まり、裁量が与えられると成果が大きく上がります。低い人は役割と手順がはっきりした組織で安定して働きます。高い人は「一人で全部やろうとして共有を落とすこと」を、低い人は「確認を取るのに決定が遅れること」を気をつけるべきです。報告の周期を前もって合意しておけば双方とも楽になります。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "독립성의 차이는 연애에서 '연락 빈도'와 '혼자만의 시간'을 두고 가장 자주 부딪힙니다. 높은 사람에게 혼자 있는 시간은 충전이고, 낮은 사람에게는 거리 두기로 느껴집니다. 애착 이론으로 보면 높은 독립성은 회피 애착과, 낮은 독립성은 불안 애착과 겹칠 때 갈등이 커집니다. '혼자 있는 시간이 필요하다'와 '네가 싫은 게 아니다'를 한 문장에 담아 말하는 것이 해법입니다.",
          en: "In relationships, differences in independence clash most often over how often to be in touch and time alone. For the high scorer time alone is recharging; for the low scorer it feels like distancing. In attachment terms, conflict grows when high independence overlaps with avoidant attachment and low independence with anxious attachment. The remedy is to say 'I need time alone' and 'this is not about you' in the same sentence.",
          zh: "独立性的差异在恋爱中最常因“联系频率”和“独处时间”起冲突。对高者独处是充电，对低者则像在疏远。从依恋理论看，高独立性与回避型依恋、低独立性与焦虑型依恋重叠时冲突更大。解法是把“我需要独处时间”和“不是不喜欢你”放在同一句话里说出来。",
          ja: "独立性の違いは恋愛で「連絡の頻度」と「一人の時間」をめぐって最もよくぶつかります。高い人にとって一人の時間は充電で、低い人には距離を置かれたように感じられます。愛着理論で見ると高い独立性は回避型愛着と、低い独立性は不安型愛着と重なるときに衝突が大きくなります。「一人の時間が必要だ」と「あなたが嫌なわけではない」を一つの文に込めて言うのが解決策です。",
        },
      },
      {
        name: { ko: "혼자 있는 시간에서", en: "In time alone", zh: "在独处时间", ja: "一人の時間で" },
        text: {
          ko: "혼자 여행과 그룹 여행 중 무엇을 고르는지는 독립성을 가장 직관적으로 보여 줍니다. 높은 사람은 혼자 여행에서 자유를, 낮은 사람은 그룹 여행에서 안전과 재미를 얻습니다. 어느 쪽이 낫다는 것은 아니지만, 혼자 있는 시간을 전혀 견디지 못한다면 자기 욕구를 들여다볼 기회가 줄어들고, 혼자만 있으려 한다면 관계에서 오는 회복력을 놓치게 됩니다.",
          en: "Whether you choose solo or group travel shows independence most intuitively. High scorers find freedom traveling alone; low scorers find safety and fun in a group. Neither is better, but if you cannot bear any time alone you lose chances to look at your own wants, and if you only want to be alone you miss the resilience that comes from relationships.",
          zh: "选择独自旅行还是团体旅行，最直观地显示独立性。高者在独自旅行中获得自由，低者在团体旅行中获得安全与乐趣。没有优劣之分，但完全受不了独处就少了审视自身需求的机会，只想独处则会错过关系带来的恢复力。",
          ja: "一人旅とグループ旅行のどちらを選ぶかは独立性を最も直観的に示します。高い人は一人旅で自由を、低い人はグループ旅行で安全と楽しさを得ます。どちらが良いというわけではありませんが、一人の時間を全く耐えられないなら自分の欲求を見つめる機会が減り、一人でばかりいようとするなら関係から来る回復力を逃すことになります。",
        },
      },
      {
        name: { ko: "인생의 큰 결정 앞에서", en: "Before a major life decision", zh: "面对人生重大决定时", ja: "人生の大きな決定の前で" },
        text: {
          ko: "이직, 결혼, 이사 같은 결정 앞에서 독립성이 높은 사람은 혼자 조용히 결론을 내리고 통보하는 경향이 있어 가족이 소외감을 느낄 수 있습니다. 낮은 사람은 묻고 또 묻다가 결정 시점을 놓치거나, 남이 골라 준 길을 가다 뒤늦게 후회합니다. 좋은 방법은 '결정은 내가, 의견은 세 사람에게'입니다. 정보는 충분히 모으되 최종 선택의 주인은 자신임을 분명히 하는 것입니다.",
          en: "Facing a job change, marriage or a move, high scorers tend to reach a conclusion quietly alone and announce it, which can leave family feeling shut out. Low scorers ask and ask until the moment passes, or follow a path someone else chose and regret it later. A good rule is 'the decision is mine, opinions from three people': gather enough information while staying clearly the owner of the final choice.",
          zh: "面对跳槽、结婚、搬家等决定，独立性高的人倾向于独自安静地下结论再通知，家人可能感到被排除在外。低的人问了又问错过时机，或走了别人选的路事后后悔。好办法是“决定由我做，意见听三个人的”：充分收集信息，但明确最终选择的主人是自己。",
          ja: "転職、結婚、引っ越しのような決定の前で独立性が高い人は一人で静かに結論を出して通告する傾向があり、家族が疎外感を覚えることがあります。低い人は尋ねては尋ねているうちに決定の時期を逃したり、人が選んでくれた道を行って後で悔やんだりします。良い方法は「決定は自分が、意見は三人に」です。情報は十分に集めつつ最終選択の主人は自分であることをはっきりさせることです。",
        },
      },
    ],
    balance: {
      ko: "독립성을 키우고 싶다면 '혼자 결정하는 범위'를 조금씩 넓히세요. 오늘 점심 메뉴, 주말 계획, 작은 구매처럼 결과가 가벼운 일부터 남에게 묻지 않고 정하고, 결과가 어땠는지 스스로 평가해 보세요. 혼자 카페에 가거나 혼자 영화를 보는 것도 좋은 훈련입니다. 독립성이 지나쳐 외롭다면 한 달에 한 번은 일부러 도움을 청해 보세요. 길을 묻고, 조언을 구하고, 짐을 들어 달라고 하는 사소한 요청이면 충분합니다. 도움을 청하는 것이 약함이 아니라 관계를 여는 기술이라는 것을 몸으로 익히는 과정입니다. 건강한 독립은 혼자 설 수 있으면서 함께 서는 것을 선택하는 상태입니다.",
      en: "To grow independence, widen the range of what you decide alone a little at a time. Start with light outcomes, today's lunch, the weekend plan, a small purchase, decide without asking, then judge the result yourself. Going to a café or a film alone is good training too. If independence has left you lonely, ask for help on purpose once a month. Asking directions, seeking advice, requesting a hand with a bag is enough: it teaches the body that asking is not weakness but a skill for opening relationships. Healthy independence is being able to stand alone and choosing to stand together.",
      zh: "想培养独立性，就一点点扩大“自己做决定的范围”。从今天午饭、周末计划、小额购物等后果轻的事开始，不问别人自己定，再自己评估结果。一个人去咖啡馆、一个人看电影也是好训练。若独立过头而孤独，每月刻意求助一次。问路、求建议、请人帮忙拿东西这样的小请求就够了，让身体记住求助不是软弱，而是打开关系的技巧。健康的独立是能独自站立，却选择与人同行。",
      ja: "独立性を育てたいなら「一人で決める範囲」を少しずつ広げてください。今日の昼食のメニュー、週末の計画、小さな買い物のように結果が軽いことから人に聞かずに決め、結果がどうだったか自分で評価してみてください。一人でカフェに行ったり一人で映画を見たりするのも良い訓練です。独立性が過ぎて寂しいなら月に一度はわざと助けを求めてみてください。道を尋ね、助言を求め、荷物を持ってほしいと頼むささいな要請で十分です。助けを求めることが弱さではなく関係を開く技術だということを体で覚える過程です。健全な独立は一人で立てながら一緒に立つことを選ぶ状態です。",
    },
    faq: [
      {
        question: { ko: "혼자 있는 게 편하면 독립적인 성격인가요, 회피하는 건가요?", en: "If I'm comfortable alone, am I independent or avoidant?", zh: "喜欢独处是独立性格还是回避？", ja: "一人が楽なら独立した性格ですか、それとも回避ですか？" },
        answer: {
          ko: "구별하는 기준은 '함께 있을 때도 편한가'입니다. 독립적인 사람은 혼자도 좋고 함께도 좋으며, 둘 중 상황에 맞는 쪽을 고릅니다. 회피하는 사람은 함께 있는 것이 불편해서 혼자를 택합니다. 또 하나의 기준은 도움이 필요할 때 청할 수 있는가입니다. 청할 수 있으면 독립, 청하지 못하면 회피나 고립에 가깝습니다. 혼자가 편한 것 자체는 전혀 문제가 아닙니다.",
          en: "The test is whether you are also comfortable with others. The independent person enjoys both solitude and company and picks whichever fits the situation; the avoidant person chooses solitude because company is uncomfortable. A second test is whether you can ask for help when you need it. If you can, it is independence; if you cannot, it is closer to avoidance or isolation. Being comfortable alone is not a problem in itself.",
          zh: "区分标准是“与人相处时是否也自在”。独立的人独处也好、相处也好，按情况选择；回避的人是因为相处不舒服才选择独处。另一个标准是需要时能否求助。能求助是独立，不能则更接近回避或孤立。喜欢独处本身完全不是问题。",
          ja: "見分ける基準は「一緒にいるときも楽か」です。独立した人は一人も良く一緒も良く、状況に合う方を選びます。回避する人は一緒にいるのが不快なので一人を選びます。もう一つの基準は助けが必要なときに求められるかです。求められれば独立、求められなければ回避や孤立に近いです。一人が楽なこと自体は全く問題ではありません。",
        },
      },
      {
        question: { ko: "독립적인 사람은 연애가 어렵나요?", en: "Do independent people struggle in relationships?", zh: "独立的人恋爱很难吗？", ja: "独立した人は恋愛が難しいですか？" },
        answer: {
          ko: "어렵다기보다 다른 방식이 필요합니다. 독립성이 높은 사람은 상대에게 매달리지 않아 관계가 건강하게 유지되는 장점이 있지만, 상대가 '내가 필요 없나'라고 느끼기 쉽습니다. 해법은 필요를 숨기지 않는 것입니다. '네가 있어서 좋다', '이건 네 도움이 필요하다'를 말로 표현하면 독립성은 매력이 됩니다. 관계 연구에서는 서로 독립적이면서 필요할 때 기대는 커플의 만족도가 가장 높게 나타납니다.",
          en: "Not harder, but different. Highly independent people do not cling, which keeps relationships healthy, but a partner can easily feel unneeded. The remedy is not hiding your needs: saying 'I'm glad you're here' and 'I need your help with this' out loud turns independence into an attraction. Relationship research finds the highest satisfaction in couples who are each independent and lean on each other when needed.",
          zh: "不是难，而是需要不同的方式。独立性高的人不黏人，关系能健康维持，但对方容易觉得“不需要我”。解法是不隐藏需求。把“有你真好”“这件事需要你帮忙”说出口，独立性就成了魅力。关系研究显示，彼此独立又在需要时相互依靠的伴侣满意度最高。",
          ja: "難しいというより別のやり方が必要です。独立性が高い人は相手にすがらないので関係が健全に保たれる長所がありますが、相手が「私は必要ないのか」と感じやすいです。解決策は必要を隠さないことです。「あなたがいて嬉しい」「これはあなたの助けが必要だ」を言葉で表現すれば独立性は魅力になります。関係の研究では互いに独立していながら必要なときに頼り合うカップルの満足度が最も高く出ています。",
        },
      },
      {
        question: { ko: "이 테스트에서 독립성은 어떻게 측정하나요?", en: "How does this test measure independence?", zh: "本测试如何测量独立性？", ja: "このテストで独立性はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 독립성을 다룹니다. 중요한 인생 결정을 앞두고 어떻게 하는지, 혼자 여행과 그룹 여행 중 무엇을 고르는지를 네 가지 선택지로 묻습니다. 선택에 따라 독립성 점수가 쌓여 Solar 에너지 합계에 더해지고, 결과 화면에서 차원별 막대로 볼 수 있습니다. 가벼운 자기 점검용이므로 애착 유형 검사나 임상 평가와는 다릅니다.",
          en: "Two of the twelve questions address independence: what you do before a major life decision, and whether you choose solo or group travel, each with four options. The choices build an independence score that joins the Solar total and appears as a bar on the result screen. It is a light self-check, not an attachment inventory or a clinical assessment.",
          zh: "12题中有2题涉及独立性：面对人生重大决定时怎么做、独自旅行与团体旅行选哪个，各有四个选项。按选择累加独立性分数，计入Solar能量总分，并在结果页以维度条形显示。这是轻量自测，不同于依恋类型测验或临床评估。",
          ja: "12問のうち2問が独立性を扱います。重要な人生の決定を前にどうするか、一人旅とグループ旅行のどちらを選ぶかを四つの選択肢で尋ねます。選択に応じて独立性の点数が積もりSolarエネルギー合計に加わり、結果画面で次元別の棒グラフとして見られます。軽い自己点検用なので愛着タイプ検査や臨床評価とは異なります。",
        },
      },
    ],
  },

  // ───────────────────────── 공감력 ─────────────────────────
  {
    id: "empathy",
    pole: "LUNAR",
    emoji: "💗",
    name: traitNames.empathy,
    title: {
      ko: "공감 능력이란 | 공감력 높은 사람·낮은 사람의 특징과 공감 능력 키우는 법",
      en: "What Is Empathy? Traits of High and Low Empathy and How to Develop It",
      zh: "什么是共情能力 | 共情力高与低的人的特征及提升方法",
      ja: "共感能力とは | 共感力が高い人・低い人の特徴と共感能力の育て方",
    },
    description: {
      ko: "공감력은 타인의 감정을 알아차리고 함께 느끼며 적절히 반응하는 능력입니다. 인지적 공감과 정서적 공감의 차이, 공감 능력이 높은 사람과 낮은 사람의 특징, 직장·연애·육아에서의 모습, 공감 피로를 막는 법과 FAQ를 정리했습니다.",
      en: "Empathy is the ability to notice others' feelings, share them and respond fittingly. Cognitive versus emotional empathy, traits of high and low empathy, how it shows at work, in love and in parenting, and how to prevent empathy fatigue.",
      zh: "共情力是察觉他人情感、感同身受并恰当回应的能力。整理了认知共情与情感共情的区别、共情力高与低的人的特征、在职场·恋爱·育儿中的表现、预防共情疲劳的方法及常见问题。",
      ja: "共感力は他者の感情に気づき、ともに感じ、適切に反応する能力です。認知的共感と情動的共感の違い、共感能力が高い人と低い人の特徴、職場・恋愛・子育てでの姿、共感疲労を防ぐ方法とFAQをまとめました。",
    },
    keywords: {
      ko: ["공감 능력", "공감력", "공감 능력 키우는 법", "공감 능력 부족", "공감 능력 테스트", "인지적 공감", "공감 피로"],
      en: ["empathy", "how to develop empathy", "cognitive vs emotional empathy", "empathy test", "empathy fatigue"],
      zh: ["共情能力", "共情力", "提升共情能力", "共情疲劳"],
      ja: ["共感能力", "共感力", "共感力を高める", "共感疲労"],
    },
    heading: {
      ko: "공감력: 남의 마음을 내 마음처럼 읽는 힘",
      en: "Empathy: Reading Another's Heart as Your Own",
      zh: "共情力：像读自己的心一样读懂他人",
      ja: "共感力：人の心を自分の心のように読む力",
    },
    intro: {
      ko: "공감력(empathy)은 다른 사람이 느끼는 감정을 알아차리고, 그 감정을 어느 정도 함께 느끼며, 그에 맞게 반응하는 능력입니다. 심리학자 마크 데이비스(Mark Davis)는 공감을 여러 요소로 나누어 측정했는데, 크게는 상대의 입장에서 생각하는 인지적 공감(관점 취하기)과 상대의 감정이 내게 전해지는 정서적 공감(공감적 관심)으로 구분합니다. 친구가 울 때 '왜 우는지 이해하는 것'이 인지적 공감이고, '같이 마음이 아픈 것'이 정서적 공감입니다. 두 가지는 따로 움직일 수 있어서, 이해는 잘하지만 느끼지 못하는 사람도, 느끼지만 왜인지 모르는 사람도 있습니다.\n\n이 테스트에서 공감력은 Lunar 에너지의 첫 번째 차원입니다. 벰의 성역할 검사에서 '동정심 있는', '타인의 필요에 민감한', '이해심 있는' 같은 항목은 전통적으로 여성적이라 분류되었습니다. 그러나 벰의 연구와 이후 수많은 후속 연구가 보여 준 것은 공감이 성별이 아니라 경험과 훈련의 산물이라는 점입니다. 거울 뉴런 연구와 발달심리학은 공감이 모든 사람에게 기본으로 장착된 능력이며 사용할수록 강해진다고 말합니다.\n\n공감력은 흔히 '많을수록 좋은 것'으로 여겨지지만 심리학은 정서적 공감이 지나치면 공감 피로(empathy fatigue)와 소진이 온다는 점을 지적합니다. 간호사, 상담사, 돌봄 노동자에게서 많이 보고되는 현상입니다. 건강한 공감은 상대의 감정에 빠지는 것이 아니라 상대의 감정을 알아차리고 돌아올 수 있는 것입니다.",
      en: "Empathy is the ability to notice what another person feels, to feel some of it with them, and to respond accordingly. The psychologist Mark Davis measured empathy as several components, broadly cognitive empathy, taking the other's perspective, and emotional empathy, being moved by the other's feeling. When a friend cries, understanding why is cognitive empathy; hurting with them is emotional empathy. The two can move separately: some people understand well but feel little, others feel strongly without knowing why.\n\nIn this test empathy is the first dimension of Lunar energy. In Bem's inventory items such as 'compassionate', 'sensitive to the needs of others' and 'understanding' were classified as traditionally feminine. But Bem's work and a great deal of later research showed that empathy is a product of experience and training, not sex. Mirror-neuron research and developmental psychology describe empathy as a capacity built into everyone that strengthens with use.\n\nEmpathy is usually thought of as 'the more the better', yet psychology notes that excessive emotional empathy leads to empathy fatigue and burnout, widely reported among nurses, counselors and care workers. Healthy empathy is not drowning in another's feeling but noticing it and being able to return to yourself.",
      zh: "共情力（empathy）是察觉他人的情感、在一定程度上感同身受并做出相应回应的能力。心理学家马克·戴维斯把共情分为多个成分来测量，大体分为站在对方角度思考的认知共情（观点采择）和对方情绪传递到自己身上的情感共情（共情关怀）。朋友哭时，“理解他为什么哭”是认知共情，“跟着心疼”是情感共情。两者可以分开运作：有人理解得好却感受不到，有人感受到却不知为何。\n\n本测试中共情力是Lunar能量的第一个维度。贝姆量表中“富有同情心”“对他人需求敏感”“善解人意”等条目传统上被归为女性化。但贝姆的研究及之后大量后续研究表明，共情是经验与训练的产物而非性别。镜像神经元研究与发展心理学指出，共情是每个人都具备的基础能力，越用越强。\n\n共情力常被认为“越多越好”，但心理学指出情感共情过度会带来共情疲劳与耗竭，这在护士、咨询师、照护者中多有报告。健康的共情不是陷入对方的情绪，而是能察觉对方的情绪并回到自己。",
      ja: "共感力（empathy）は他の人が感じている感情に気づき、その感情をある程度ともに感じ、それに合わせて反応する能力です。心理学者マーク・デイヴィスは共感をいくつかの要素に分けて測定しましたが、大きくは相手の立場で考える認知的共感（視点取得）と相手の感情が自分に伝わってくる情動的共感（共感的関心）に分けます。友人が泣いているとき「なぜ泣いているか理解すること」が認知的共感で、「一緒に心が痛むこと」が情動的共感です。二つは別々に動くことがあり、理解は上手でも感じられない人も、感じるけれどなぜか分からない人もいます。\n\nこのテストで共感力はLunarエネルギーの最初の次元です。ベムの性役割検査で「同情心のある」「他者の必要に敏感な」「理解のある」といった項目は伝統的に女性的と分類されました。しかしベムの研究とその後の数多くの研究が示したのは、共感が性別ではなく経験と訓練の産物だという点です。ミラーニューロン研究と発達心理学は、共感がすべての人に基本として備わった能力で使うほど強くなると言います。\n\n共感力はよく「多いほど良いもの」と考えられますが、心理学は情動的共感が過ぎると共感疲労と燃え尽きが来る点を指摘します。看護師、カウンセラー、ケア労働者に多く報告される現象です。健全な共感は相手の感情に溺れることではなく、相手の感情に気づいて戻ってこられることです。",
    },
    high: {
      ko: "공감력이 높은 사람은 상대의 표정과 말투 변화를 빨리 알아차리고, 울고 있는 친구 옆에 말없이 있어 줄 줄 알며, 영화나 책에 깊이 몰입합니다. 사람들이 고민을 털어놓는 상대가 되고, 상담·교육·간호·서비스처럼 사람을 돌보는 일에 어울립니다. 다만 남의 감정을 내 것처럼 짊어져 쉽게 지치고, 거절을 못 해 이용당하기도 하며, 자기 감정은 뒤로 미루는 습관이 생기기 쉽습니다.",
      en: "People high in empathy quickly notice shifts in expression and tone, know how to sit silently beside a crying friend, and sink deep into films and books. They become the person others confide in and suit caring work: counseling, teaching, nursing, service. But carrying others' feelings as their own tires them quickly, inability to refuse leaves them open to being used, and they easily fall into the habit of putting their own feelings last.",
      zh: "共情力高的人能很快察觉对方表情和语气的变化，懂得默默陪在哭泣的朋友身边，看电影读书时深深投入。他们是别人倾诉的对象，适合咨询、教育、护理、服务等照顾人的工作。但把别人的情绪当作自己的来背负容易疲惫，不会拒绝也容易被利用，还容易养成把自己情绪往后放的习惯。",
      ja: "共感力が高い人は相手の表情と口調の変化に早く気づき、泣いている友人のそばに黙っていてあげることができ、映画や本に深く没入します。人が悩みを打ち明ける相手になり、相談・教育・看護・サービスのように人をケアする仕事に向きます。ただ人の感情を自分のもののように背負ってすぐ疲れ、断れずに利用されることもあり、自分の感情は後回しにする習慣がつきやすいです。",
    },
    low: {
      ko: "공감력이 낮은 사람은 감정보다 사실과 해결책에 먼저 눈이 가고, 울고 있는 친구에게 '그래서 어떻게 할 건데?'라고 묻곤 합니다. 냉정하다는 말을 듣지만 위기 상황에서 흔들리지 않고, 감정에 휘둘리지 않는 공정한 판단을 내립니다. 다만 상대가 '이해받지 못한다'고 느껴 관계가 겉돌기 쉽습니다. 이 유형에게 필요한 것은 느끼는 연습이 아니라, 해결책을 말하기 전에 '힘들었겠다' 한마디를 먼저 넣는 순서의 연습입니다.",
      en: "People low in empathy look first at facts and solutions rather than feelings, and tend to ask a crying friend 'so what are you going to do?' They are called cold, yet they hold steady in a crisis and judge fairly without being swayed by emotion. But others may feel misunderstood and relationships stay shallow. What this type needs is not practice in feeling but practice in order: one 'that must have been hard' before any solution.",
      zh: "共情力低的人比起情感先看事实与解决方案，常对哭泣的朋友问“那你打算怎么办？”。虽被说冷淡，但危机中不动摇，做出不被情绪左右的公正判断。只是对方容易觉得“不被理解”，关系流于表面。这类人需要的不是练习感受，而是练习顺序：在说解决方案之前先加一句“你一定很难受”。",
      ja: "共感力が低い人は感情より事実と解決策に先に目が行き、泣いている友人に「それでどうするの？」と聞きがちです。冷静だと言われますが危機的状況で揺れず、感情に振り回されない公正な判断を下します。ただ相手が「理解されていない」と感じて関係が上滑りしやすいです。このタイプに必要なのは感じる練習ではなく、解決策を言う前に「つらかったね」の一言を先に入れる順序の練習です。",
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "공감력이 높은 사람은 팀 분위기를 읽고 갈등을 미리 감지해 조정자 역할을 맡습니다. 고객 응대, 인사, 교육, 의료에서 특히 빛납니다. 낮은 사람은 감정에 휘둘리지 않는 결정이 필요한 자리(감사, 구조조정, 위기 대응)에서 강합니다. 높은 사람은 모든 사람의 기분을 책임지려다 지치지 않도록, 낮은 사람은 '맞는 말을 상처 주게' 하지 않도록 주의가 필요합니다.",
          en: "High scorers read the mood of a team, sense conflict early and take the role of mediator; they shine in customer care, HR, teaching and healthcare. Low scorers are strong where decisions must not bend to emotion: audits, restructuring, crisis response. The high scorer must avoid exhausting themselves by owning everyone's mood; the low scorer must avoid saying the right thing in a wounding way.",
          zh: "共情力高的人能读懂团队氛围、提前察觉冲突，担任协调者角色，在客服、人事、教育、医疗中尤其出色。低的人在需要不受情绪左右的决定的岗位（审计、裁员、危机应对）上更强。高者要注意别为所有人的情绪负责而耗尽，低者要注意别“把对的话说得伤人”。",
          ja: "共感力が高い人はチームの雰囲気を読み衝突を前もって察知して調整役を担います。顧客対応、人事、教育、医療で特に輝きます。低い人は感情に振り回されない決定が必要な席（監査、リストラ、危機対応）で強いです。高い人はすべての人の気分に責任を持とうとして疲れないよう、低い人は「正しいことを傷つけるように」言わないよう注意が必要です。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "연애에서 공감력 차이는 '내 얘기를 듣고 있는지'를 두고 드러납니다. 높은 사람은 상대의 기분 변화에 민감해 잘 맞춰 주지만, 상대의 기분이 곧 내 기분이 되어 관계에 자기 자리가 없어지기도 합니다. 낮은 사람은 상대가 속상해할 때 해결책부터 내놓아 '내 마음은 안 궁금하냐'는 말을 듣습니다. 존 가트맨의 부부 연구가 보여 주듯, 문제 해결보다 감정을 먼저 인정하는 순서가 관계 만족도를 좌우합니다.",
          en: "In relationships, differences in empathy surface around 'are you even listening?' High scorers are sensitive to a partner's moods and adapt well, but the partner's mood can become their own until there is no room left for themselves. Low scorers offer solutions the moment a partner is upset and hear 'don't you care how I feel?' As John Gottman's research on couples shows, acknowledging feeling before solving the problem is what decides satisfaction.",
          zh: "恋爱中共情力的差异体现在“你有没有在听我说”。高者对伴侣情绪变化敏感、善于配合，但伴侣的情绪会变成自己的情绪，关系里渐渐没了自己的位置。低者在伴侣难过时先给解决方案，被问“你不关心我的感受吗”。正如戈特曼的婚姻研究所示，先承认情绪再解决问题的顺序决定关系满意度。",
          ja: "恋愛で共感力の差は「私の話を聞いているのか」をめぐって表れます。高い人は相手の気分の変化に敏感でよく合わせますが、相手の気分がそのまま自分の気分になって関係に自分の居場所がなくなることもあります。低い人は相手が落ち込んでいるとき解決策から出して「私の気持ちは気にならないの」と言われます。ジョン・ゴットマンの夫婦研究が示すように、問題解決より先に感情を認める順序が関係の満足度を左右します。",
        },
      },
      {
        name: { ko: "육아·돌봄에서", en: "In parenting and caregiving", zh: "在育儿·照护中", ja: "子育て・ケアで" },
        text: {
          ko: "아이의 감정을 읽어 주는 공감은 애착 형성의 핵심이지만, 아이의 모든 감정을 대신 해결해 주려는 과잉 공감은 아이가 스스로 감정을 다루는 법을 배울 기회를 뺏습니다. 공감력이 높은 양육자는 '속상했구나'까지만 하고 해결은 아이에게 맡기는 연습이, 낮은 양육자는 '뚝 그쳐' 대신 감정에 이름을 붙여 주는 연습이 필요합니다. 돌봄 노동에서는 공감 피로를 막기 위해 교대와 휴식이 제도적으로 필요합니다.",
          en: "Reading a child's feelings is central to attachment, but over-empathy that solves every feeling for the child robs them of the chance to learn to handle feelings themselves. The highly empathic parent should practice stopping at 'that upset you' and leaving the solving to the child; the less empathic parent should practice naming the feeling instead of 'stop crying'. In care work, rotation and rest are needed as a matter of policy to prevent empathy fatigue.",
          zh: "读懂孩子的情绪是形成依恋的核心，但替孩子解决所有情绪的过度共情会剥夺孩子学习自己处理情绪的机会。共情力高的养育者要练习说到“你很难过吧”为止、把解决交给孩子；低的养育者要练习给情绪命名而不是说“别哭了”。在照护工作中，需要制度性的轮班与休息来防止共情疲劳。",
          ja: "子どもの感情を読んであげる共感は愛着形成の核心ですが、子どものすべての感情を代わりに解決しようとする過剰な共感は、子どもが自分で感情を扱う方法を学ぶ機会を奪います。共感力が高い養育者は「悲しかったんだね」までにして解決は子どもに任せる練習が、低い養育者は「泣かないの」の代わりに感情に名前をつけてあげる練習が必要です。ケア労働では共感疲労を防ぐために交代と休息が制度的に必要です。",
        },
      },
      {
        name: { ko: "슬픔과 마주했을 때", en: "Facing grief", zh: "面对悲伤时", ja: "悲しみに向き合うとき" },
        text: {
          ko: "친구가 큰 슬픔을 겪을 때 공감력이 높은 사람은 함께 울고 오래 곁을 지키지만, 그 슬픔을 집에까지 가져와 자기 일상이 무너지기도 합니다. 낮은 사람은 무슨 말을 해야 할지 몰라 연락을 피하다가 관계가 멀어집니다. 상담심리학이 권하는 가장 단순한 방법은 '해결하지 말고 곁에 있기'입니다. 밥을 사 주고, 묻지 않고, 때가 되면 돌아오는 것. 공감력의 높낮이와 상관없이 누구나 할 수 있는 일입니다.",
          en: "When a friend suffers a great loss, high scorers cry with them and stay long, but may carry the grief home until their own life falters. Low scorers avoid contact because they do not know what to say, and the friendship drifts. The simplest advice from counseling psychology is 'don't fix, just be there': buy a meal, ask nothing, come back when it is time. Anyone can do that, whatever their empathy score.",
          zh: "朋友遭遇巨大悲伤时，共情力高的人一起哭、长久陪伴，但也可能把悲伤带回家，让自己的生活崩塌。低的人不知该说什么而回避联系，关系渐渐疏远。咨询心理学建议的最简单方法是“不解决，只陪伴”：请吃饭，不追问，到时候再回来。无论共情力高低，谁都做得到。",
          ja: "友人が大きな悲しみを経験するとき共感力が高い人は一緒に泣いて長くそばを守りますが、その悲しみを家まで持ち帰って自分の日常が崩れることもあります。低い人は何を言えばいいか分からず連絡を避けているうちに関係が遠のきます。カウンセリング心理学が勧める最も単純な方法は「解決せずにそばにいること」です。ご飯をおごり、聞かず、時が来たら戻ってくること。共感力の高低に関係なく誰にでもできることです。",
        },
      },
    ],
    balance: {
      ko: "공감력을 키우려면 '묻고 기다리는' 습관부터 시작하세요. 상대가 힘들다고 할 때 조언 대신 '어떤 점이 제일 힘들어?'라고 묻고 끝까지 듣는 것입니다. 소설을 읽는 것도 도움이 됩니다. 문학 작품을 읽는 사람의 관점 취하기 능력이 높다는 연구가 여럿 있습니다. 공감력이 높아 지치는 사람은 반대로 '경계'를 배워야 합니다. 상대의 감정을 알아차린 뒤 '이건 그 사람의 감정이지 내 감정이 아니다'라고 속으로 말해 보고, 힘든 이야기를 들은 날은 산책이나 샤워처럼 몸으로 끊어 내는 의식을 두세요. 공감은 상대에게 뛰어드는 것이 아니라 다리를 놓는 것입니다. 다리는 양쪽 기슭이 있어야 섭니다.",
      en: "To grow empathy, start with the habit of asking and waiting. When someone says they are struggling, ask 'what's the hardest part?' instead of advising, and listen to the end. Reading fiction helps too; several studies find stronger perspective-taking in readers of literary fiction. If high empathy exhausts you, learn boundaries instead. After noticing someone's feeling, say inwardly 'this is their feeling, not mine', and on days you hear hard stories keep a physical ritual, a walk or a shower, that closes the door. Empathy is not leaping into another person but building a bridge, and a bridge needs both banks.",
      zh: "想提升共情力，从“问并等待”的习惯开始。对方说难受时，不给建议而是问“最难受的是哪一点？”并听到最后。读小说也有帮助，多项研究发现读文学作品的人观点采择能力更强。共情力高而疲惫的人则要反过来学“边界”：察觉对方情绪后在心里说“这是他的情绪，不是我的”；听了沉重故事的日子，用散步或淋浴这样的身体仪式来切断。共情不是跳进对方，而是架桥，桥需要两岸才能立起来。",
      ja: "共感力を育てるには「尋ねて待つ」習慣から始めてください。相手がつらいと言うとき助言の代わりに「どこが一番つらい？」と聞いて最後まで聞くことです。小説を読むのも役立ちます。文学作品を読む人の視点取得能力が高いという研究がいくつもあります。共感力が高くて疲れる人は逆に「境界」を学ぶ必要があります。相手の感情に気づいた後「これはその人の感情で私の感情ではない」と心の中で言ってみて、つらい話を聞いた日は散歩やシャワーのように体で区切る儀式を持ってください。共感は相手に飛び込むことではなく橋をかけることです。橋は両岸があってこそ立ちます。",
    },
    faq: [
      {
        question: { ko: "공감 능력은 타고나는 건가요, 키울 수 있나요?", en: "Is empathy inborn or can it be developed?", zh: "共情能力是天生的还是可以培养的？", ja: "共感能力は生まれつきですか、育てられますか？" },
        answer: {
          ko: "둘 다입니다. 기질적으로 타인의 감정에 더 민감한 사람이 있는 것은 사실이지만, 공감의 핵심인 관점 취하기는 분명히 훈련으로 늘어납니다. 의대와 간호대의 공감 교육, 교도소의 역할극 프로그램, 소설 읽기 연구 등에서 공감 점수가 올라간 결과가 반복해서 보고되었습니다. 정서적 공감(함께 느끼기)보다 인지적 공감(이해하기)이 더 잘 늘어나며, 관계에서 실제로 중요한 것도 후자인 경우가 많습니다.",
          en: "Both. Some people are temperamentally more sensitive to others' feelings, but perspective-taking, the core of empathy, clearly grows with training. Empathy courses in medical and nursing schools, role-play programs in prisons and studies of fiction reading have repeatedly reported rising empathy scores. Cognitive empathy (understanding) grows more readily than emotional empathy (feeling with), and in relationships it is often the former that matters most.",
          zh: "两者都是。确实有人气质上对他人情绪更敏感，但共情的核心——观点采择——显然可以通过训练提高。医学院与护理学院的共情教育、监狱的角色扮演项目、小说阅读研究等都反复报告了共情分数的提升。认知共情（理解）比情感共情（同感）更容易提高，而在关系中真正重要的往往也是前者。",
          ja: "両方です。気質的に他人の感情により敏感な人がいるのは事実ですが、共感の核心である視点取得は明らかに訓練で伸びます。医学部と看護学部の共感教育、刑務所のロールプレイプログラム、小説読書の研究などで共感点数が上がった結果が繰り返し報告されています。情動的共感（ともに感じること）より認知的共感（理解すること）の方がよく伸び、関係で実際に重要なのも後者である場合が多いです。",
        },
      },
      {
        question: { ko: "공감을 너무 잘해서 힘든데 어떻게 하나요?", en: "I empathize so much it hurts. What can I do?", zh: "太会共情以至于很累，怎么办？", ja: "共感しすぎてつらいのですが、どうすればいいですか？" },
        answer: {
          ko: "그것은 공감 피로의 신호이며, 공감을 줄이는 것이 아니라 회복 방법을 갖추는 것이 답입니다. 첫째, 들어 주는 시간에 한도를 두세요. 둘째, 상대의 문제를 대신 해결하려 하지 말고 곁에 있는 것으로 충분하다고 여기세요. 셋째, 내 감정을 들어 주는 사람을 따로 두세요. 넷째, 힘든 이야기를 들은 뒤에는 몸을 쓰는 활동으로 전환하세요. 돌봄 직종이라면 이것은 개인의 문제가 아니라 조직이 교대와 수퍼비전으로 다뤄야 할 문제입니다.",
          en: "That is the sign of empathy fatigue, and the answer is not less empathy but better recovery. First, put a limit on listening time. Second, stop trying to solve the other person's problem and accept that being present is enough. Third, keep someone who listens to you. Fourth, switch to a physical activity after hearing something hard. In care professions this is not a personal failing but something the organization must handle through rotation and supervision.",
          zh: "这是共情疲劳的信号，答案不是减少共情，而是建立恢复方法。第一，给倾听时间设限。第二，别替对方解决问题，陪着就够了。第三，另外找一个听你说话的人。第四，听完沉重的故事后转去做身体活动。若从事照护行业，这不是个人问题，而是组织应通过轮班与督导来处理的问题。",
          ja: "それは共感疲労の合図で、共感を減らすのではなく回復方法を備えることが答えです。第一に、聞いてあげる時間に限度を置いてください。第二に、相手の問題を代わりに解決しようとせず、そばにいることで十分だと考えてください。第三に、自分の感情を聞いてくれる人を別に持ってください。第四に、つらい話を聞いた後は体を使う活動に切り替えてください。ケア職種ならこれは個人の問題ではなく組織が交代とスーパービジョンで扱うべき問題です。",
        },
      },
      {
        question: { ko: "이 테스트에서 공감력은 어떻게 측정하나요?", en: "How does this test measure empathy?", zh: "本测试如何测量共情力？", ja: "このテストで共感力はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 공감력을 다룹니다. 친구가 힘든 일로 울고 있을 때 어떻게 하는지, 감동적인 영화나 책을 볼 때 어떤 반응이 나오는지를 네 가지 선택지로 묻습니다. 첫 문항은 공감적 반응을, 둘째 문항은 정서적 몰입을 봅니다. 선택에 따라 공감력 점수가 쌓여 Lunar 에너지 합계에 더해지고, 결과 화면에서 막대로 확인할 수 있습니다. 전문 공감 척도(IRI 등)와는 다른 가벼운 자기 점검입니다.",
          en: "Two of the twelve questions address empathy: what you do when a friend is crying over something hard, and how you react to a moving film or book, each with four options. The first looks at empathic response, the second at emotional absorption. The choices build an empathy score that joins the Lunar total and appears as a bar on the result screen. It is a light self-check, unlike professional empathy scales such as the IRI.",
          zh: "12题中有2题涉及共情力：朋友因难事哭泣时怎么做、看感人的电影或书时有什么反应，各有四个选项。第一题看共情回应，第二题看情感投入。按选择累加共情力分数，计入Lunar能量总分，并在结果页以条形显示。这是轻量自测，不同于IRI等专业共情量表。",
          ja: "12問のうち2問が共感力を扱います。友人がつらいことで泣いているときどうするか、感動的な映画や本を見るときどんな反応が出るかを四つの選択肢で尋ねます。最初の設問は共感的反応を、二つ目は情動的没入を見ます。選択に応じて共感力の点数が積もりLunarエネルギー合計に加わり、結果画面で棒グラフとして確認できます。専門の共感尺度（IRIなど）とは異なる軽い自己点検です。",
        },
      },
    ],
  },

  // ───────────────────────── 협력성 ─────────────────────────
  {
    id: "collaboration",
    pole: "LUNAR",
    emoji: "🤝",
    name: traitNames.collaboration,
    title: {
      ko: "협력성이란 | 협력적인 사람의 특징, 팀워크 성향과 경쟁 성향의 차이",
      en: "What Is Collaboration? Traits of Cooperative People and How Teamwork Differs From Competition",
      zh: "什么是合作性 | 合作型的人的特征，团队协作倾向与竞争倾向的区别",
      ja: "協調性とは | 協力的な人の特徴、チームワーク志向と競争志向の違い",
    },
    description: {
      ko: "협력성은 함께 이루는 성과를 중시하고 팀의 조화를 지키려는 성향입니다. 빅파이브의 우호성과의 관계, 협력적인 사람과 경쟁적인 사람의 특징, 직장·팀 프로젝트·연애에서의 모습, 과잉 협력(눈치 보기)을 다스리는 법과 FAQ를 정리했습니다.",
      en: "Collaboration is the tendency to value shared achievement and protect team harmony. Its relation to Big Five agreeableness, traits of cooperative and competitive people, how it shows at work, in team projects and in love, and how to manage over-cooperation.",
      zh: "合作性是重视共同成果、维护团队和谐的倾向。整理了它与大五人格宜人性的关系、合作型与竞争型的人的特征、在职场·团队项目·恋爱中的表现、克服过度合作（看人脸色）的方法及常见问题。",
      ja: "協調性はともに成し遂げる成果を重んじチームの調和を守ろうとする傾向です。ビッグファイブの協調性との関係、協力的な人と競争的な人の特徴、職場・チームプロジェクト・恋愛での姿、過剰な協力（顔色うかがい）を抑える方法とFAQをまとめました。",
    },
    keywords: {
      ko: ["협력성", "협력적인 성격", "팀워크 성향", "우호성", "경쟁적인 성격", "눈치 보는 성격", "성향 테스트"],
      en: ["collaboration personality", "cooperative personality", "agreeableness", "teamwork traits", "competitive vs cooperative"],
      zh: ["合作性", "合作型性格", "宜人性", "团队协作"],
      ja: ["協調性", "協力的な性格", "チームワーク", "競争的な性格"],
    },
    heading: {
      ko: "협력성: 함께 이룰 때 더 기쁜 사람",
      en: "Collaboration: Happiest When Achieving Together",
      zh: "合作性：一起做成时更开心的人",
      ja: "協調性：ともに成し遂げるときより嬉しい人",
    },
    intro: {
      ko: "협력성(collaboration)은 혼자 이기는 것보다 함께 이루는 것에서 만족을 얻고, 의견이 부딪힐 때 관계와 조화를 지키는 쪽으로 움직이는 성향입니다. 성격심리학의 빅파이브 모델에서 가장 가까운 요인은 우호성(agreeableness)입니다. 우호성이 높은 사람은 신뢰, 이타심, 순응, 겸손, 온화함 점수가 높고, 낮은 사람은 경쟁적이고 회의적이며 자기 이익을 분명히 챙깁니다. 협력성은 그중에서도 '팀 상황에서 어떻게 행동하는가'에 초점을 둔 개념입니다.\n\n이 테스트에서 협력성은 Lunar 에너지의 두 번째 차원이며 Solar 쪽의 독립성과 짝을 이룹니다. 벰의 성역할 검사에서 '다정한', '협조적인', '충성스러운' 같은 항목이 전통적으로 여성적이라 분류된 데서 출발했지만, 협력은 인간이 집단으로 생존해 온 역사에서 모두에게 깊이 새겨진 본능입니다. 진화심리학은 협력이 성별이 아니라 '반복해서 만나는 관계인가'에 따라 달라진다고 설명합니다.\n\n협력성이 높은 것은 분명한 강점이지만 심리학은 그 그늘도 지적합니다. 집단의 결정에 반대하지 못하는 집단사고(groupthink), 남의 기대에 맞추느라 자기 의견을 잃는 과잉 적응, 갈등을 피하려고 문제를 덮는 회피가 그것입니다. 건강한 협력은 '동의하지 않아도 함께 일할 수 있는' 상태이지, '모두와 같은 의견이 되는' 상태가 아닙니다.",
      en: "Collaboration is the tendency to find satisfaction in achieving together rather than winning alone, and to move toward preserving relationships and harmony when opinions clash. In the Big Five model of personality the closest factor is agreeableness: high scorers rate high on trust, altruism, compliance, modesty and tender-mindedness, while low scorers are competitive, skeptical and clear about their own interests. Collaboration focuses that broad trait on how one behaves in a team.\n\nIn this test collaboration is the second dimension of Lunar energy and the counterpart of independence on the Solar side. It starts from Bem's classification of items such as 'affectionate', 'cooperative' and 'loyal' as traditionally feminine, but cooperation is an instinct carved deep into everyone by the history of human survival in groups. Evolutionary psychology explains that cooperation varies not with sex but with whether a relationship is repeated.\n\nHigh collaboration is a clear strength, yet psychology also points to its shadow: groupthink that cannot oppose a group decision, over-adaptation that loses one's own opinion in meeting others' expectations, and avoidance that buries problems to escape conflict. Healthy collaboration means being able to work together without agreeing, not becoming of one opinion with everyone.",
      zh: "合作性（collaboration）是比起独自取胜更从共同完成中获得满足、意见冲突时倾向于维护关系与和谐的倾向。在人格心理学的大五模型中最接近的因子是宜人性。宜人性高的人在信任、利他、顺从、谦逊、温和上得分高，低的人则竞争性强、多疑、明确维护自身利益。合作性是其中聚焦于“在团队情境下如何行动”的概念。\n\n本测试中合作性是Lunar能量的第二个维度，与Solar侧的独立性相对。它源自贝姆量表把“深情的”“合作的”“忠诚的”等条目归为传统女性化，但合作是人类群体生存史深深刻入每个人的本能。进化心理学解释，合作的差异不在性别，而在“是否是反复相遇的关系”。\n\n合作性高显然是优势，但心理学也指出其阴影：无法反对集体决定的群体思维、为迎合他人期待而失去自己意见的过度适应、为避免冲突而掩盖问题的回避。健康的合作是“不同意也能一起工作”，而不是“和所有人意见一致”。",
      ja: "協調性（collaboration）は一人で勝つことよりともに成し遂げることから満足を得て、意見がぶつかるとき関係と調和を守る方へ動く傾向です。性格心理学のビッグファイブモデルで最も近い因子は協調性（agreeableness）です。これが高い人は信頼、利他心、応諾、謙虚さ、優しさの点数が高く、低い人は競争的で懐疑的で自分の利益をはっきり守ります。ここでの協調性はその中でも「チームの状況でどう行動するか」に焦点を当てた概念です。\n\nこのテストで協調性はLunarエネルギーの二番目の次元で、Solar側の独立性と対をなします。ベムの性役割検査で「愛情深い」「協力的な」「忠実な」といった項目が伝統的に女性的と分類されたところから出発しましたが、協力は人類が集団で生き延びてきた歴史の中で誰にも深く刻まれた本能です。進化心理学は協力が性別ではなく「繰り返し会う関係か」によって変わると説明します。\n\n協調性が高いことは明らかな強みですが、心理学はその影も指摘します。集団の決定に反対できない集団思考、人の期待に合わせようとして自分の意見を失う過剰適応、衝突を避けようとして問題を覆い隠す回避がそれです。健全な協力は「同意しなくても一緒に働ける」状態であって、「みんなと同じ意見になる」状態ではありません。",
    },
    high: {
      ko: "협력성이 높은 사람은 팀 프로젝트에서 의견이 갈릴 때 중간 지점을 찾고, 성공했을 때 혼자 박수받는 것보다 동료와 함께 기뻐하는 순간을 더 뿌듯해합니다. 분위기를 부드럽게 만들고 신뢰를 쌓아 조직에서 오래 사랑받습니다. 다만 반대 의견을 삼켜 잘못된 결정에 동조하거나, 공을 양보하다 저평가되고, 모두를 만족시키려다 자신이 지칩니다.",
      en: "People high in collaboration look for middle ground when a team splits, and on success feel prouder sharing joy with colleagues than receiving applause alone. They soften the atmosphere, build trust and stay well liked in organizations for years. But they may swallow objections and go along with bad decisions, be undervalued after giving away credit, and exhaust themselves trying to satisfy everyone.",
      zh: "合作性高的人在团队项目意见分歧时寻找中间点，成功时比起独自受掌声，更为与同事一起高兴的瞬间自豪。他们缓和气氛、建立信任，在组织中长久受欢迎。但可能咽下反对意见而附和错误决定，让出功劳而被低估，为了让所有人满意而耗尽自己。",
      ja: "協調性が高い人はチームプロジェクトで意見が分かれるとき中間点を探し、成功したとき一人で拍手を受けるより同僚と一緒に喜ぶ瞬間をより誇らしく思います。雰囲気を柔らかくして信頼を築き、組織で長く愛されます。ただ反対意見を飲み込んで誤った決定に同調したり、手柄を譲って過小評価されたり、全員を満足させようとして自分が疲れたりします。",
    },
    low: {
      ko: "협력성이 낮은 사람은 '내가 맞다'는 확신이 있으면 다수에 맞서고, 성과를 분명히 자기 것으로 챙기며, 비효율적인 회의와 눈치 문화를 견디지 못합니다. 집단사고를 깨는 소수 의견의 가치가 바로 이 유형에게서 나옵니다. 다만 동료를 경쟁자로 보기 쉽고, 자기 방식만 고집해 팀의 속도를 떨어뜨리며, 도움을 받을 수 있는 상황에서도 혼자 하려다 손해를 봅니다.",
      en: "People low in collaboration stand against the majority when sure they are right, claim their results clearly, and cannot stand inefficient meetings or a culture of reading the room. The value of the dissenting voice that breaks groupthink comes from exactly this type. But they tend to see colleagues as rivals, slow the team by insisting on their own way, and lose out by going it alone when help was available.",
      zh: "合作性低的人确信自己对时会对抗多数，明确把成果归为己有，受不了低效会议和看脸色的文化。打破群体思维的少数意见的价值正来自这类人。但他们容易把同事当竞争者，只坚持自己的方式而拖慢团队，在可以得到帮助的情况下也想单干而吃亏。",
      ja: "協調性が低い人は「自分が正しい」という確信があれば多数に立ち向かい、成果をはっきり自分のものにし、非効率な会議と顔色をうかがう文化に耐えられません。集団思考を破る少数意見の価値はまさにこのタイプから出てきます。ただ同僚を競争相手と見やすく、自分のやり方だけにこだわってチームの速度を落とし、助けてもらえる状況でも一人でやろうとして損をします。",
    },
    scenes: [
      {
        name: { ko: "팀 프로젝트에서", en: "In a team project", zh: "在团队项目中", ja: "チームプロジェクトで" },
        text: {
          ko: "의견 충돌이 생겼을 때 협력성이 높은 사람은 양쪽 말을 다 듣고 절충안을 냅니다. 그 덕에 팀이 깨지지 않지만, 절충안이 늘 최선은 아닙니다. 낮은 사람은 더 나은 안을 끝까지 밀어붙여 결과물의 질을 올리지만 감정의 골을 남깁니다. 좋은 팀에는 둘 다 필요합니다. 높은 사람은 '반대 의견을 한 번은 말하는 것'을, 낮은 사람은 '내 안이 채택되지 않아도 결정에 따르는 것'을 역할로 삼으면 됩니다.",
          en: "When opinions clash, high scorers hear both sides and propose a compromise, which keeps the team intact though compromise is not always best. Low scorers push the better plan to the end, raising quality but leaving bruised feelings. A good team needs both. The high scorer's job is to voice disagreement at least once; the low scorer's is to follow the decision even when their plan is not chosen.",
          zh: "意见冲突时，合作性高的人听完双方再提折中方案，团队因此不散，但折中未必最优。低的人把更好的方案推到底，提高了成果质量却留下感情裂痕。好团队两者都需要。高者的角色是“至少说一次反对意见”，低者的角色是“即使我的方案没被采纳也服从决定”。",
          ja: "意見の衝突が起きたとき協調性が高い人は双方の話を全部聞いて折衷案を出します。おかげでチームは壊れませんが、折衷案がいつも最善とは限りません。低い人はより良い案を最後まで押し通して成果物の質を上げますが感情のしこりを残します。良いチームには両方が必要です。高い人は「反対意見を一度は言うこと」を、低い人は「自分の案が採用されなくても決定に従うこと」を役割にすればよいのです。",
        },
      },
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "협력성이 높은 사람은 조정, 운영, 고객 관계, 인사처럼 여러 사람 사이를 잇는 일에서 빛나고, 낮은 사람은 영업 실적, 전문직, 창업처럼 개인 성과가 분명한 일에서 힘을 냅니다. 평가 제도가 개인 성과 중심이면 높은 사람이, 팀 성과 중심이면 낮은 사람이 손해를 보기 쉬우니, 자기 성향과 조직의 평가 방식이 맞는지 살피는 것이 경력 관리의 중요한 부분입니다.",
          en: "High scorers shine in work that connects people, coordination, operations, client relations, HR, while low scorers thrive where individual results are clear: sales numbers, professional practice, start-ups. Where evaluation centers on individual results the high scorer tends to lose out, and where it centers on team results the low scorer does, so checking whether your disposition matches how your organization evaluates is an important part of managing a career.",
          zh: "合作性高的人在协调、运营、客户关系、人事等连接多人的工作中发光，低的人在销售业绩、专业职、创业等个人成果明确的工作中有力。考核以个人业绩为中心时高者易吃亏，以团队业绩为中心时低者易吃亏，所以审视自己的倾向与组织的考核方式是否匹配，是职业管理的重要部分。",
          ja: "協調性が高い人は調整、運営、顧客関係、人事のように人と人をつなぐ仕事で輝き、低い人は営業成績、専門職、起業のように個人の成果がはっきりした仕事で力を出します。評価制度が個人成果中心なら高い人が、チーム成果中心なら低い人が損をしやすいので、自分の性向と組織の評価方式が合っているかを見ることがキャリア管理の重要な部分です。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "연애에서 협력성은 '양보하는 방식'으로 나타납니다. 높은 사람은 메뉴, 여행지, 주말 계획을 늘 상대에게 맞추다가 어느 날 '나는 뭘 좋아했지?'라는 공허함을 느낍니다. 낮은 사람은 자기 취향이 분명해 데이트가 선명하지만 상대가 끌려다닌다고 느낍니다. 번갈아 정하기, 즉 '이번 주는 네가, 다음 주는 내가'라는 단순한 규칙이 양쪽의 불만을 동시에 줄여 줍니다.",
          en: "In relationships collaboration appears as the way you yield. High scorers fit the menu, the destination and the weekend to their partner until one day they feel the emptiness of 'what did I even like?' Low scorers have clear tastes that make dates vivid, but the partner feels dragged along. Taking turns, 'your pick this week, mine next', is a simple rule that reduces both sides' complaints at once.",
          zh: "恋爱中合作性体现在“让步的方式”。高者菜单、旅行地、周末计划总是迁就对方，直到某天感到“我到底喜欢什么？”的空虚。低者喜好明确、约会鲜明，但对方觉得被牵着走。轮流决定——“这周你定，下周我定”——这条简单规则能同时减少双方的不满。",
          ja: "恋愛で協調性は「譲る方法」として現れます。高い人はメニュー、旅行先、週末の計画をいつも相手に合わせているうちにある日「私は何が好きだったっけ？」という空虚さを感じます。低い人は自分の好みがはっきりしていてデートが鮮明ですが、相手は引きずられていると感じます。交代で決めること、つまり「今週はあなたが、来週は私が」という単純なルールが双方の不満を同時に減らしてくれます。",
        },
      },
      {
        name: { ko: "성공을 나눌 때", en: "When sharing success", zh: "分享成功时", ja: "成功を分かち合うとき" },
        text: {
          ko: "성공했을 때 가장 뿌듯한 순간이 '동료와 함께 기뻐할 때'인지 '내 이름이 불릴 때'인지는 협력성을 가장 솔직하게 드러냅니다. 어느 쪽이든 괜찮지만, 높은 사람은 자기 기여를 말로 남기는 연습이 필요하고(공을 나누는 것과 공을 지우는 것은 다릅니다), 낮은 사람은 함께한 사람의 이름을 먼저 부르는 연습이 필요합니다. 공을 먼저 돌리는 사람에게 다음 기회가 더 많이 온다는 것은 조직 연구에서 반복해서 확인된 사실입니다.",
          en: "Whether your proudest moment of success is rejoicing with colleagues or hearing your own name called reveals collaboration most honestly. Either is fine, but high scorers need to practice putting their contribution into words (sharing credit is not erasing it), and low scorers need to practice naming the people who worked with them first. That more opportunities come to those who give credit first is a finding organizational research has confirmed again and again.",
          zh: "成功时最自豪的瞬间是“与同事一起高兴时”还是“被念到自己名字时”，最真实地揭示合作性。哪种都可以，但高者需要练习用语言留下自己的贡献（分享功劳不等于抹去功劳），低者需要练习先说出共事者的名字。先把功劳给别人的人得到更多下一次机会，这是组织研究反复证实的事实。",
          ja: "成功したとき最も誇らしい瞬間が「同僚と一緒に喜ぶとき」か「自分の名前が呼ばれるとき」かは協調性を最も正直に表します。どちらでも構いませんが、高い人は自分の貢献を言葉で残す練習が必要で（手柄を分けることと手柄を消すことは違います）、低い人は一緒にやった人の名前を先に呼ぶ練習が必要です。手柄を先に譲る人に次の機会がより多く来ることは組織研究で繰り返し確認された事実です。",
        },
      },
    ],
    balance: {
      ko: "협력성을 키우고 싶다면 '먼저 묻기'부터 시작하세요. 일을 시작하기 전에 '네 생각은 어때?'를 한 번 묻는 것만으로 상대는 존중받는다고 느끼고, 결과물의 질도 대개 올라갑니다. 공을 나누는 말('이건 ○○ 덕분이다')을 의식적으로 쓰는 것도 효과가 큽니다. 협력성이 지나쳐 눈치만 보게 된 사람은 '한 번의 반대'를 연습하세요. 회의에서 한 번은 '저는 조금 다르게 봅니다'라고 말하고, 그래도 팀이 깨지지 않는 것을 확인하는 것입니다. 협력은 모두가 같아지는 것이 아니라 서로 다른 사람들이 같은 방향으로 노를 젓는 것입니다. 다른 의견이 있어야 배가 똑바로 갑니다.",
      en: "To grow collaboration, start with asking first. One 'what do you think?' before starting a task makes the other person feel respected and usually raises the quality of the result. Deliberately using credit-sharing phrases ('this was thanks to…') also works well. If collaboration has turned into mere room-reading, practice a single disagreement: say 'I see it a little differently' once in a meeting and notice that the team does not fall apart. Collaboration is not everyone becoming alike but different people rowing in the same direction, and a boat only goes straight when there are different opinions aboard.",
      zh: "想培养合作性，从“先问”开始。开工前问一句“你怎么看？”，对方就会觉得被尊重，成果质量通常也会提高。有意识地使用分享功劳的话（“这多亏了某某”）也很有效。合作过度到只会看脸色的人，要练习“一次反对”：在会议上说一次“我的看法有点不同”，并确认团队并没有因此散掉。合作不是所有人变得一样，而是不同的人朝同一方向划桨，有不同意见船才走得直。",
      ja: "協調性を育てたいなら「先に尋ねる」ことから始めてください。仕事を始める前に「君はどう思う？」と一度尋ねるだけで相手は尊重されていると感じ、成果物の質もたいてい上がります。手柄を分ける言葉（「これは○○のおかげだ」）を意識して使うのも効果が大きいです。協調性が過ぎて顔色ばかりうかがうようになった人は「一度の反対」を練習してください。会議で一度は「私は少し違う見方をしています」と言い、それでもチームが壊れないことを確認するのです。協力はみんなが同じになることではなく、違う人たちが同じ方向に櫂を漕ぐことです。違う意見があってこそ船はまっすぐ進みます。",
    },
    faq: [
      {
        question: { ko: "협력적인 성격은 리더가 되기 어렵나요?", en: "Is it hard for a cooperative person to become a leader?", zh: "合作型性格难以成为领导者吗？", ja: "協力的な性格はリーダーになりにくいですか？" },
        answer: {
          ko: "그렇지 않습니다. 리더십 연구에서 가장 오래 살아남은 결론 중 하나는 '결과를 내는 리더와 사람을 지키는 리더가 모두 필요하다'는 것입니다. 협력성이 높은 리더는 팀의 신뢰와 심리적 안전감을 높여 장기 성과에 유리하다는 연구가 많습니다. 다만 협력적인 리더가 흔히 빠지는 함정은 불편한 결정(저성과자 피드백, 자원 배분)을 미루는 것입니다. 협력성에 '불편한 말을 제때 하는 기술'을 더하면 가장 오래 가는 리더가 됩니다.",
          en: "No. One of the most durable conclusions in leadership research is that both results-focused and people-protecting leaders are needed. Many studies find that highly cooperative leaders raise trust and psychological safety, which favors long-term performance. The trap cooperative leaders commonly fall into is postponing uncomfortable decisions: feedback to underperformers, allocation of resources. Add the skill of saying uncomfortable things on time to collaboration and you get the leader who lasts longest.",
          zh: "并非如此。领导力研究中最经久的结论之一是“既需要出结果的领导，也需要守护人的领导”。很多研究发现合作性高的领导能提升团队信任与心理安全感，有利于长期绩效。合作型领导常掉入的陷阱是拖延不舒服的决定（对低绩效者的反馈、资源分配）。在合作性上加上“及时说出不舒服的话的技巧”，就是最长久的领导者。",
          ja: "そうではありません。リーダーシップ研究で最も長く生き残った結論の一つは「結果を出すリーダーと人を守るリーダーの両方が必要だ」ということです。協調性の高いリーダーはチームの信頼と心理的安全性を高めて長期的な成果に有利だという研究が多くあります。ただ協力的なリーダーがよく陥る罠は不快な決定（低成果者へのフィードバック、資源配分）を先延ばしにすることです。協調性に「不快なことを時機を逃さず言う技術」を加えれば最も長く続くリーダーになります。",
        },
      },
      {
        question: { ko: "협력성과 눈치 보는 것은 어떻게 다른가요?", en: "How is collaboration different from just reading the room?", zh: "合作性和看人脸色有什么不同？", ja: "協調性と顔色をうかがうことはどう違いますか？" },
        answer: {
          ko: "방향이 다릅니다. 협력은 '공동의 목표'를 향해 내 의견을 조정하는 것이고, 눈치 보기는 '미움받지 않기'를 향해 내 의견을 숨기는 것입니다. 협력적인 사람은 반대 의견을 말한 뒤 결정에 따르지만, 눈치 보는 사람은 반대 의견 자체를 말하지 못합니다. 구별하는 간단한 질문은 '내가 양보한 이유가 팀을 위해서인가, 내가 불편해지기 싫어서인가'입니다. 후자가 반복된다면 협력성이 아니라 자기주장성 쪽을 돌아볼 때입니다.",
          en: "The direction differs. Collaboration adjusts your opinion toward a shared goal; reading the room hides your opinion to avoid being disliked. The cooperative person voices disagreement and then follows the decision; the room-reader cannot voice disagreement at all. A simple test: 'did I yield for the team, or because I didn't want to feel uncomfortable?' If the latter keeps recurring, it is assertiveness rather than collaboration that deserves attention.",
          zh: "方向不同。合作是为了“共同目标”调整自己的意见，看脸色是为了“不被讨厌”隐藏自己的意见。合作型的人说出反对意见后服从决定，看脸色的人连反对意见都说不出口。一个简单的区分问题：“我让步是为了团队，还是因为不想让自己难受？”若后者反复出现，该审视的不是合作性，而是自我主张。",
          ja: "方向が違います。協力は「共同の目標」に向かって自分の意見を調整することで、顔色をうかがうのは「嫌われないこと」に向かって自分の意見を隠すことです。協力的な人は反対意見を言ってから決定に従いますが、顔色をうかがう人は反対意見そのものを言えません。見分ける簡単な質問は「自分が譲った理由はチームのためか、自分が不快になりたくないからか」です。後者が繰り返されるなら協調性ではなく自己主張性の方を振り返るときです。",
        },
      },
      {
        question: { ko: "이 테스트에서 협력성은 어떻게 측정하나요?", en: "How does this test measure collaboration?", zh: "本测试如何测量合作性？", ja: "このテストで協調性はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 협력성을 다룹니다. 팀 프로젝트에서 의견 충돌이 있을 때 어떻게 하는지, 성공했을 때 가장 뿌듯한 순간이 언제인지를 네 가지 선택지로 묻습니다. 첫 문항은 갈등 상황의 행동을, 둘째 문항은 성취를 나누는 성향을 봅니다. 선택에 따라 협력성 점수가 쌓여 Lunar 에너지 합계에 더해지고, 결과 화면에서 막대로 볼 수 있습니다. 빅파이브 검사처럼 정밀한 도구는 아닙니다.",
          en: "Two of the twelve questions address collaboration: what you do when opinions clash in a team project, and which moment of success makes you proudest, each with four options. The first looks at behavior in conflict, the second at how you share achievement. The choices build a collaboration score that joins the Lunar total and appears as a bar on the result screen. It is not a precise instrument like a Big Five inventory.",
          zh: "12题中有2题涉及合作性：团队项目中意见冲突时怎么做、成功时最自豪的瞬间是什么，各有四个选项。第一题看冲突中的行为，第二题看分享成就的倾向。按选择累加合作性分数，计入Lunar能量总分，并在结果页以条形显示。它不是像大五测验那样精密的工具。",
          ja: "12問のうち2問が協調性を扱います。チームプロジェクトで意見の衝突があるときどうするか、成功したとき最も誇らしい瞬間はいつかを四つの選択肢で尋ねます。最初の設問は衝突の場面での行動を、二つ目は達成を分かち合う性向を見ます。選択に応じて協調性の点数が積もりLunarエネルギー合計に加わり、結果画面で棒グラフとして見られます。ビッグファイブ検査のように精密な道具ではありません。",
        },
      },
    ],
  },

  // ───────────────────────── 직관력 ─────────────────────────
  {
    id: "intuition",
    pole: "LUNAR",
    emoji: "🔮",
    name: traitNames.intuition,
    title: {
      ko: "직관력이란 | 직관이 뛰어난 사람의 특징, 직감과 논리의 균형 잡는 법",
      en: "What Is Intuition? Traits of Highly Intuitive People and Balancing Gut Feeling With Logic",
      zh: "什么是直觉力 | 直觉敏锐的人的特征，平衡直觉与逻辑的方法",
      ja: "直感力とは | 直感の優れた人の特徴、直感と論理のバランスの取り方",
    },
    description: {
      ko: "직관력은 논리적 분석을 거치지 않고도 상황을 빠르게 읽어 내는 능력입니다. 융의 직관 기능과 카너먼의 시스템 1, 직관적인 사람과 분석적인 사람의 특징, 직장·연애·중요한 선택에서의 모습, 직감을 믿어도 되는 때와 아닌 때, FAQ를 정리했습니다.",
      en: "Intuition is the ability to read a situation quickly without conscious analysis. Jung's intuitive function and Kahneman's System 1, traits of intuitive and analytical people, how it shows at work, in love and in big choices, and when a gut feeling can and cannot be trusted.",
      zh: "直觉力是不经逻辑分析也能快速读懂局面的能力。整理了荣格的直觉功能与卡尼曼的系统1、直觉型与分析型的人的特征、在职场·恋爱·重大选择中的表现、何时可以相信直觉何时不可以，以及常见问题。",
      ja: "直感力は論理的分析を経なくても状況を素早く読み取る能力です。ユングの直観機能とカーネマンのシステム1、直感的な人と分析的な人の特徴、職場・恋愛・重要な選択での姿、直感を信じてよいときとそうでないとき、FAQをまとめました。",
    },
    keywords: {
      ko: ["직관력", "직관적인 사람", "직감", "직관 vs 논리", "감이 좋은 사람", "직관력 키우는 법", "성향 테스트"],
      en: ["intuition", "intuitive person traits", "gut feeling", "intuition vs logic", "how to develop intuition"],
      zh: ["直觉力", "直觉型的人", "直觉与逻辑", "提升直觉"],
      ja: ["直感力", "直感的な人", "直感と論理", "直感を鍛える"],
    },
    heading: {
      ko: "직관력: 이유를 말하기 전에 먼저 아는 힘",
      en: "Intuition: Knowing Before You Can Say Why",
      zh: "直觉力：在说出理由之前就先知道的力量",
      ja: "直感力：理由を言う前にまず分かる力",
    },
    intro: {
      ko: "직관력(intuition)은 단계적인 논리 분석을 거치지 않고 전체 그림이나 결론이 먼저 떠오르는 능력입니다. '왠지 느낌이 안 좋다', '이 사람은 믿어도 될 것 같다' 같은 판단이 여기서 나옵니다. 심리학에서 직관을 처음 성격의 축으로 세운 사람은 카를 융입니다. 융은 사람이 정보를 받아들이는 방식을 감각(구체적 사실)과 직관(가능성과 패턴)으로 나누었고, 이 구분은 훗날 MBTI의 S와 N으로 이어졌습니다.\n\n현대 인지심리학은 직관을 신비한 능력이 아니라 '빠른 사고'로 설명합니다. 대니얼 카너먼은 자동적이고 빠른 시스템 1과 느리고 의식적인 시스템 2를 구분했는데, 직관은 시스템 1이 과거 경험을 압축해 내놓는 결론입니다. 그래서 직관은 경험이 많은 영역에서는 놀랍도록 정확하고(소방관이 건물 붕괴를 미리 느끼는 것처럼), 경험이 없는 영역에서는 편향에 취약합니다. 이 테스트에서 직관력은 Lunar 에너지의 세 번째 차원이며, 벰의 성역할 검사가 '여성적 직관'이라는 통념을 다뤘던 데서 출발했지만 실제 연구는 직관 사용에 성별 차이가 거의 없음을 보여 줍니다.\n\n직관이 높은 사람과 낮은 사람의 차이는 '직감이 오느냐'가 아니라 '직감을 얼마나 믿고 따르느냐'입니다. 모두에게 직감은 옵니다. 다만 어떤 사람은 그것을 결정의 근거로 삼고, 어떤 사람은 근거가 모일 때까지 보류합니다. 둘 다 장단점이 있으며, 심리학이 권하는 것은 어느 한쪽이 아니라 '언제 어느 쪽을 쓸지 아는 것'입니다.",
      en: "Intuition is the ability to have the whole picture or the conclusion arrive first, without stepwise logical analysis. Judgments like 'something feels off' or 'I think I can trust this person' come from here. The first to make intuition an axis of personality was Carl Jung, who divided how people take in information into sensing (concrete facts) and intuition (possibilities and patterns), a distinction that later became the S and N of the MBTI.\n\nModern cognitive psychology explains intuition not as a mystical power but as fast thinking. Daniel Kahneman distinguished the automatic, fast System 1 from the slow, deliberate System 2; intuition is System 1 delivering a conclusion compressed from past experience. That is why intuition is astonishingly accurate in domains of deep experience, like the firefighter who senses a collapse before it happens, and vulnerable to bias where experience is thin. In this test intuition is the third dimension of Lunar energy. It starts from the stereotype of 'feminine intuition' that Bem's inventory engaged with, but research shows almost no sex difference in the use of intuition.\n\nThe difference between high and low scorers is not whether a hunch arrives but how much they trust and follow it. Hunches come to everyone. Some people make them the basis of a decision; others hold off until evidence gathers. Each has strengths and costs, and what psychology recommends is not one or the other but knowing when to use which.",
      zh: "直觉力（intuition）是不经过逐步逻辑分析、整体图景或结论先浮现的能力。“总觉得不对劲”“这个人好像可以信”这类判断都来自这里。心理学中最早把直觉立为性格轴的是荣格。他把人接收信息的方式分为感觉（具体事实）与直觉（可能性与模式），这一区分后来演变为MBTI中的S与N。\n\n现代认知心理学把直觉解释为“快思考”而非神秘能力。卡尼曼区分了自动而快速的系统1与缓慢而有意识的系统2，直觉就是系统1把过去经验压缩后给出的结论。因此在经验丰富的领域直觉惊人地准确（如消防员预感到建筑将塌），在缺乏经验的领域则易受偏差影响。本测试中直觉力是Lunar能量的第三个维度，虽源自贝姆量表所涉及的“女性直觉”这一俗见，但实际研究表明直觉使用几乎没有性别差异。\n\n直觉高与低的人的差别不在于“有没有直觉”，而在于“多大程度相信并跟随直觉”。直觉人人都有，只是有人以它为决定依据，有人要等证据齐全。两者各有利弊，心理学建议的不是选边，而是“知道何时用哪一个”。",
      ja: "直感力（intuition）は段階的な論理分析を経ずに全体像や結論が先に浮かぶ能力です。「なんとなく嫌な感じがする」「この人は信じてよさそうだ」といった判断がここから出ます。心理学で直感を最初に性格の軸として立てたのはカール・ユングです。ユングは人が情報を受け取る方法を感覚（具体的事実）と直観（可能性とパターン）に分け、この区分は後にMBTIのSとNにつながりました。\n\n現代の認知心理学は直感を神秘的な能力ではなく「速い思考」として説明します。ダニエル・カーネマンは自動的で速いシステム1と遅く意識的なシステム2を区別しましたが、直感はシステム1が過去の経験を圧縮して出す結論です。だから直感は経験の多い領域では驚くほど正確で（消防士が建物の崩壊を前もって感じるように）、経験のない領域では偏りに弱いです。このテストで直感力はLunarエネルギーの三番目の次元で、ベムの性役割検査が「女性的直感」という通念を扱ったところから出発しましたが、実際の研究は直感の使用に性差がほとんどないことを示しています。\n\n直感が高い人と低い人の違いは「直感が来るか」ではなく「直感をどれだけ信じて従うか」です。誰にでも直感は来ます。ただある人はそれを決定の根拠にし、ある人は根拠が集まるまで保留します。どちらにも長所と短所があり、心理学が勧めるのはどちらか一方ではなく「いつどちらを使うか知ること」です。",
    },
    high: {
      ko: "직관력이 높은 사람은 처음 만난 사람의 인상을 빠르게 읽고, 데이터보다 '감'으로 방향을 잡으며, '그냥 느낌이 안 좋아서' 계획을 바꾼 경험이 여러 번 있습니다. 창작, 기획, 상담, 투자처럼 패턴을 읽는 일에서 강하고 위기에서 빠르게 움직입니다. 다만 이유를 설명하지 못해 설득에 약하고, 첫인상에 갇혀 사람을 잘못 판단하기도 하며, 직감이 틀렸을 때 그 사실을 인정하기 어려워합니다.",
      en: "People high in intuition read a stranger quickly, set direction by feel rather than data, and have changed plans more than once 'because something felt wrong'. They are strong at pattern-reading work, creation, planning, counseling, investing, and move fast in a crisis. But they are weak at persuasion because they cannot explain why, sometimes misjudge people by getting stuck on a first impression, and find it hard to admit when a hunch was wrong.",
      zh: "直觉力高的人能迅速读出初见者的印象，比起数据更靠“感觉”定方向，有过多次“就是感觉不好”而改变计划的经历。他们擅长创作、策划、咨询、投资等读模式的工作，危机中反应快。但说不出理由而不善说服，有时困于第一印象而看错人，直觉错了时也难以承认。",
      ja: "直感力が高い人は初めて会った人の印象を素早く読み、データより「勘」で方向を決め、「なんとなく嫌な感じがして」計画を変えた経験が何度もあります。創作、企画、相談、投資のようにパターンを読む仕事で強く、危機で素早く動きます。ただ理由を説明できず説得に弱く、第一印象に囚われて人を誤って判断することもあり、直感が外れたときその事実を認めにくいです。",
    },
    low: {
      ko: "직관력이 낮은 사람, 즉 분석적인 사람은 중요한 선택 앞에서 자료를 모으고 장단점을 적어 비교하며, 느낌만으로 계획을 바꾸는 일이 거의 없습니다. 실수가 적고 설명이 분명해 신뢰를 얻으며 회계, 법무, 공학, 연구에 어울립니다. 다만 정보가 부족한 상황에서 결정을 미루다 때를 놓치고, 숫자로 잡히지 않는 신호(분위기, 표정, 어긋나는 느낌)를 무시해 사람 문제에서 뒤늦게 당황하기도 합니다.",
      en: "People low in intuition, the analytical type, gather material before a big choice, write down pros and cons, and almost never change a plan on feeling alone. They make few mistakes, explain clearly, earn trust, and suit accounting, law, engineering and research. But where information is thin they postpone deciding until the moment passes, and they ignore signals numbers cannot capture, mood, expression, a sense that something is off, and are caught late by people problems.",
      zh: "直觉力低的人，即分析型的人，面对重要选择会收集资料、列出利弊比较，几乎不会仅凭感觉改变计划。他们少犯错、解释清楚、赢得信任，适合会计、法务、工程、研究。但在信息不足时拖延决定而错失时机，忽视数字抓不住的信号（气氛、表情、不对劲的感觉），在人际问题上后知后觉。",
      ja: "直感力が低い人、つまり分析的な人は重要な選択の前で資料を集め長所短所を書き出して比べ、感覚だけで計画を変えることはほとんどありません。失敗が少なく説明がはっきりしていて信頼を得て、会計、法務、工学、研究に向きます。ただ情報が足りない状況で決定を先延ばしにして時機を逃し、数字で捉えられない信号（雰囲気、表情、ずれている感じ）を無視して人の問題で遅れて戸惑うこともあります。",
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "직관력이 높은 사람은 시장의 흐름, 고객의 숨은 욕구, 팀의 분위기 변화를 먼저 알아차려 기획과 영업, 리더십에서 빛납니다. 낮은 사람은 그 직감을 검증하고 실행 가능한 계획으로 바꾸는 데서 빛납니다. 가장 강한 팀은 이 둘이 짝을 이룰 때 나옵니다. 높은 사람은 직감을 '가설'로 말하는 습관('내 감으로는 ~인데, 확인해 보자')을, 낮은 사람은 직감을 무시하지 않고 '확인할 목록'에 올리는 습관을 들이면 됩니다.",
          en: "High scorers notice market shifts, customers' hidden wants and changes in team mood first, and shine in planning, sales and leadership. Low scorers shine at testing those hunches and turning them into workable plans. The strongest teams pair the two. The high scorer should get in the habit of stating a hunch as a hypothesis ('my sense is X, let's check'); the low scorer of putting hunches on the list of things to verify rather than dismissing them.",
          zh: "直觉力高的人最先察觉市场走向、客户隐藏的需求、团队氛围的变化，在策划、销售、领导上出色。低的人擅长验证那些直觉并转化为可执行的计划。最强的团队出现在两者搭档时。高者要养成把直觉当“假设”来说的习惯（“我感觉是……，确认一下吧”），低者要养成不忽视直觉、把它列入“待确认清单”的习惯。",
          ja: "直感力が高い人は市場の流れ、顧客の隠れた欲求、チームの雰囲気の変化に先に気づき、企画と営業、リーダーシップで輝きます。低い人はその直感を検証して実行可能な計画に変えるところで輝きます。最も強いチームはこの二人が組むときに生まれます。高い人は直感を「仮説」として言う習慣（「私の勘では〜だけど、確認してみよう」）を、低い人は直感を無視せず「確認するリスト」に載せる習慣をつければよいのです。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "직관력이 높은 사람은 첫 만남에서 '이 사람이다'를 느끼고 빠르게 마음을 열지만, 그 첫인상이 틀렸을 때 빠져나오는 데 오래 걸립니다. 낮은 사람은 조건과 가치관을 따져 신중하게 시작해 안정적이지만, 상대가 '계산된 느낌'을 받을 수 있습니다. 관계 연구는 첫인상의 직감이 매력에는 정확하지만 장기 궁합에는 약하다고 말합니다. 직감으로 시작하고 분석으로 확인하는 순서가 가장 안전합니다.",
          en: "High scorers feel 'this is the one' at a first meeting and open up fast, but take long to get out when that first impression was wrong. Low scorers weigh conditions and values and start carefully, which is stable, though the partner may feel calculated about. Relationship research finds that first-impression intuition is accurate about attraction but weak about long-term fit. Starting on intuition and confirming by analysis is the safest order.",
          zh: "直觉力高的人初次见面就感到“就是这个人”并迅速敞开心扉，但第一印象错了时要很久才能抽身。低的人权衡条件与价值观谨慎开始，稳定，但对方可能觉得“被算计”。关系研究表明，第一印象的直觉对吸引力判断准确，对长期契合度判断较弱。先凭直觉开始、再用分析确认，是最安全的顺序。",
          ja: "直感力が高い人は初対面で「この人だ」と感じて素早く心を開きますが、その第一印象が間違っていたとき抜け出すのに時間がかかります。低い人は条件と価値観を考えて慎重に始めるので安定していますが、相手が「計算された感じ」を受けることがあります。関係の研究は第一印象の直感が魅力には正確でも長期の相性には弱いと言います。直感で始めて分析で確認する順序が最も安全です。",
        },
      },
      {
        name: { ko: "중요한 선택 앞에서", en: "Before a big choice", zh: "面对重大选择时", ja: "重要な選択の前で" },
        text: {
          ko: "의사결정 연구는 흥미로운 결론을 내놓습니다. 경험이 많고 피드백이 빠른 영역(운전, 익숙한 업무, 오래 알던 사람)에서는 직감이 분석보다 낫고, 경험이 적고 피드백이 느린 영역(투자, 이직, 집 구매)에서는 분석이 직감보다 낫다는 것입니다. 직관력이 높은 사람은 후자에서 일부러 느리게, 낮은 사람은 전자에서 일부러 빠르게 결정하는 연습이 필요합니다. '이 영역에서 내 직감은 훈련되어 있는가'를 먼저 묻는 것이 핵심입니다.",
          en: "Decision research reaches an interesting conclusion: in domains of deep experience and fast feedback, driving, familiar work, people you have long known, intuition beats analysis, while in domains of little experience and slow feedback, investing, changing jobs, buying a home, analysis beats intuition. High scorers need to practice deciding deliberately slowly in the latter; low scorers deliberately fast in the former. The key question is 'is my intuition trained in this domain?'",
          zh: "决策研究得出有趣的结论：在经验丰富、反馈快的领域（开车、熟悉的工作、认识很久的人），直觉优于分析；在经验少、反馈慢的领域（投资、跳槽、买房），分析优于直觉。直觉力高的人要练习在后者刻意放慢，低的人要练习在前者刻意加快。关键是先问“在这个领域我的直觉受过训练吗”。",
          ja: "意思決定の研究は興味深い結論を出しています。経験が多くフィードバックが速い領域（運転、慣れた業務、長く知っている人）では直感が分析より優れ、経験が少なくフィードバックが遅い領域（投資、転職、住宅購入）では分析が直感より優れるということです。直感力が高い人は後者でわざとゆっくり、低い人は前者でわざと速く決める練習が必要です。「この領域で自分の直感は訓練されているか」を先に問うことが核心です。",
        },
      },
      {
        name: { ko: "느낌이 안 좋을 때", en: "When something feels wrong", zh: "感觉不对劲时", ja: "嫌な予感がするとき" },
        text: {
          ko: "'그냥 느낌이 안 좋아'는 무시해야 할 미신이 아니라 시스템 1이 보낸 경보입니다. 안전 연구에서는 설명할 수 없는 불안감이 실제 위험과 자주 맞아떨어진다고 보고합니다. 다만 그 경보가 '위험'인지 '낯섦'인지는 구별해야 합니다. 새로운 사람, 새로운 장소에 대한 불편함은 위험이 아니라 낯섦일 때가 많습니다. 좋은 방법은 느낌을 무시하지도 맹신하지도 않고 '무엇이 그 느낌을 만들었는지' 한 번 적어 보는 것입니다.",
          en: "'It just feels wrong' is not a superstition to dismiss but an alarm from System 1. Safety research reports that unexplained unease frequently coincides with real danger. But you must tell 'danger' from 'unfamiliarity': discomfort with a new person or place is often novelty, not threat. The good approach is neither to ignore the feeling nor to trust it blindly, but to write down once what might have produced it.",
          zh: "“就是感觉不好”不是该忽视的迷信，而是系统1发出的警报。安全研究报告，无法解释的不安常与真实危险吻合。但要区分警报是“危险”还是“陌生”：对新人、新地方的不适往往是陌生而非危险。好办法是既不忽视也不盲信，把“是什么产生了这种感觉”写下来一次。",
          ja: "「なんとなく嫌な感じがする」は無視すべき迷信ではなくシステム1が送った警報です。安全研究では説明できない不安感が実際の危険としばしば一致すると報告しています。ただその警報が「危険」なのか「見慣れなさ」なのかは区別しなければなりません。新しい人、新しい場所への不快感は危険ではなく見慣れなさであることが多いです。良い方法は感覚を無視も盲信もせず「何がその感覚を作ったか」を一度書いてみることです。",
        },
      },
    ],
    balance: {
      ko: "직관력을 키우는 가장 확실한 방법은 역설적으로 '경험과 피드백'입니다. 직감은 경험의 압축이므로, 한 분야에서 결정하고 결과를 확인하는 횟수가 늘수록 그 분야의 직감이 정확해집니다. 직감이 왔을 때 '왜 그렇게 느꼈는지'를 한 줄 적어 두고 나중에 맞았는지 확인하는 직감 일기가 도움이 됩니다. 반대로 직감에 너무 기대는 사람은 '큰 결정 앞 24시간 규칙'을 두세요. 직감이 '지금 당장'이라고 말해도 하루를 기다려 같은 느낌이 남아 있는지 보는 것입니다. 좋은 직감은 하루가 지나도 남고, 충동은 사라집니다. 직관과 분석은 경쟁자가 아니라 한 쌍의 눈입니다. 두 눈으로 봐야 거리가 보입니다.",
      en: "Paradoxically, the surest way to grow intuition is experience and feedback. Since a hunch is compressed experience, the more often you decide and see the outcome in a field, the more accurate your hunches there become. An intuition journal helps: when a hunch arrives, write one line on why you felt it, and later check whether it was right. If you lean on intuition too much, adopt a 24-hour rule for big decisions: even when the gut says 'now', wait a day and see whether the same feeling remains. Good intuition survives a day; impulse fades. Intuition and analysis are not rivals but a pair of eyes, and you need both to see depth.",
      zh: "培养直觉最可靠的方法，恰恰是“经验与反馈”。直觉是经验的压缩，在一个领域做决定并确认结果的次数越多，该领域的直觉就越准。直觉来时写一句“为什么这么觉得”，之后再核对是否正确的直觉日记很有帮助。反之，过度依赖直觉的人要立下“大决定前24小时规则”：即使直觉说“马上”，也等一天看感觉是否还在。好的直觉过一天仍在，冲动则消失。直觉与分析不是对手，而是一双眼睛，两只眼睛一起看才有距离感。",
      ja: "直感力を育てる最も確かな方法は逆説的に「経験とフィードバック」です。直感は経験の圧縮なので、一つの分野で決定して結果を確認する回数が増えるほどその分野の直感が正確になります。直感が来たとき「なぜそう感じたか」を一行書いておいて後で当たったか確認する直感日記が役立ちます。逆に直感に頼りすぎる人は「大きな決定の前の24時間ルール」を置いてください。直感が「今すぐ」と言っても一日待って同じ感覚が残っているか見るのです。良い直感は一日経っても残り、衝動は消えます。直観と分析は競争相手ではなく一対の目です。両目で見てこそ距離が分かります。",
    },
    faq: [
      {
        question: { ko: "직감이 잘 맞는 사람은 따로 있나요?", en: "Are some people just better at gut feelings?", zh: "有的人直觉就是更准吗？", ja: "直感がよく当たる人は別にいるのですか？" },
        answer: {
          ko: "'모든 영역에서 직감이 잘 맞는 사람'은 없습니다. 연구가 보여 주는 것은 '특정 영역에서 경험이 많은 사람의 직감이 잘 맞는다'는 것입니다. 베테랑 간호사는 환자 상태 변화를, 체스 고수는 다음 수를 직감적으로 읽지만, 같은 사람이 주식이나 낯선 분야에서는 보통 사람과 다르지 않습니다. 직관력이 높다는 것은 직감을 더 신뢰하고 자주 쓴다는 뜻이며, 그 직감이 정확한지는 영역별 경험이 결정합니다.",
          en: "No one has reliable gut feelings in every domain. What research shows is that people with deep experience in a specific domain have accurate intuition there. A veteran nurse reads a change in a patient, a chess master the next move, intuitively, but the same people are no better than anyone else in the stock market or an unfamiliar field. Scoring high in intuition means trusting and using hunches more; whether they are accurate is decided by experience in each domain.",
          zh: "没有“在所有领域直觉都准的人”。研究表明的是“在特定领域经验丰富的人直觉准”。资深护士能直觉到病人状态变化，象棋高手能直觉到下一步，但同样的人在股市或陌生领域与常人无异。直觉力高意味着更信任、更常用直觉，而直觉是否准确由各领域的经验决定。",
          ja: "「すべての領域で直感がよく当たる人」はいません。研究が示すのは「特定の領域で経験が多い人の直感がよく当たる」ということです。ベテラン看護師は患者の状態変化を、チェスの名人は次の一手を直感的に読みますが、同じ人が株式や見知らぬ分野では普通の人と変わりません。直感力が高いというのは直感をより信頼して頻繁に使うという意味で、その直感が正確かは領域別の経験が決めます。",
        },
      },
      {
        question: { ko: "직관력과 MBTI의 N은 같은 건가요?", en: "Is intuition here the same as the N in MBTI?", zh: "这里的直觉力和MBTI的N一样吗？", ja: "ここでの直感力とMBTIのNは同じですか？" },
        answer: {
          ko: "뿌리는 같지만 초점이 다릅니다. 둘 다 융의 '직관 기능'에서 나왔습니다. MBTI의 N은 정보를 받아들일 때 구체적 사실(S)보다 가능성과 의미(N)를 먼저 보는 선호를 뜻하고, 이 테스트의 직관력은 결정할 때 논리적 근거보다 직감을 얼마나 믿고 따르는지를 봅니다. N이 높아도 결정은 분석적으로 하는 사람이 있고, S가 높아도 직감으로 결정하는 사람이 있습니다. 두 결과가 달라도 모순이 아닙니다.",
          en: "Same root, different focus. Both come from Jung's intuitive function. The N in MBTI means a preference for seeing possibilities and meaning (N) before concrete facts (S) when taking in information; intuition in this test looks at how much you trust and follow a gut feeling over logical grounds when deciding. Some strong N types decide analytically, and some strong S types decide on instinct. Differing results on the two are not a contradiction.",
          zh: "根源相同，侧重不同。两者都源自荣格的“直觉功能”。MBTI的N指接收信息时比起具体事实（S）更先看到可能性与意义（N）的偏好，本测试的直觉力看的是做决定时多大程度相信并跟随直觉而非逻辑依据。N高但决定时很分析的人有，S高但凭直觉决定的人也有。两个结果不同并不矛盾。",
          ja: "根は同じですが焦点が違います。どちらもユングの「直観機能」から出ています。MBTIのNは情報を受け取るとき具体的事実（S）より可能性と意味（N）を先に見る選好を意味し、このテストの直感力は決めるとき論理的根拠より直感をどれだけ信じて従うかを見ます。Nが高くても決定は分析的にする人がいて、Sが高くても直感で決める人がいます。二つの結果が違っても矛盾ではありません。",
        },
      },
      {
        question: { ko: "이 테스트에서 직관력은 어떻게 측정하나요?", en: "How does this test measure intuition?", zh: "本测试如何测量直觉力？", ja: "このテストで直感力はどう測りますか？" },
        answer: {
          ko: "12문항 가운데 2문항이 직관력을 다룹니다. 중요한 선택을 할 때 더 믿는 것이 무엇인지, '그냥 느낌이 안 좋아'라는 이유로 계획을 바꾼 적이 있는지를 네 가지 선택지로 묻습니다. 첫 문항은 결정의 근거를, 둘째 문항은 직감을 따른 실제 경험을 봅니다. 선택에 따라 직관력 점수가 쌓여 Lunar 에너지 합계에 더해지고, 결과 화면에서 막대로 볼 수 있습니다. 가벼운 자기 점검용 문항입니다.",
          en: "Two of the twelve questions address intuition: what you trust more when making an important choice, and whether you have ever changed a plan 'because it just felt wrong', each with four options. The first looks at the basis of decisions, the second at actual experience of following a hunch. The choices build an intuition score that joins the Lunar total and appears as a bar on the result screen. These are light self-check items.",
          zh: "12题中有2题涉及直觉力：做重要选择时更相信什么、是否曾因“就是感觉不好”而改变计划，各有四个选项。第一题看决定的依据，第二题看跟随直觉的实际经历。按选择累加直觉力分数，计入Lunar能量总分，并在结果页以条形显示。这是轻量自测题目。",
          ja: "12問のうち2問が直感力を扱います。重要な選択をするときより信じるものは何か、「なんとなく嫌な感じがする」という理由で計画を変えたことがあるかを四つの選択肢で尋ねます。最初の設問は決定の根拠を、二つ目は直感に従った実際の経験を見ます。選択に応じて直感力の点数が積もりLunarエネルギー合計に加わり、結果画面で棒グラフとして見られます。軽い自己点検用の設問です。",
        },
      },
    ],
  },
];

/** id 로 차원 가이드를 찾는다 */
export function getEnergyTraitGuide(id: string): EnergyTraitGuide | undefined {
  return energyTraitGuides.find((g) => g.id === id);
}

// =====================================================================
// 유형 페이지(/test/types/[type]) — Solar · Lunar 우세 유형
// =====================================================================

export const energyTypeGuides: EnergyTypeGuide[] = [
  {
    id: "solar",
    type: "SOLAR",
    emoji: "☀️",
    name: { ko: "솔라 에너지 우세", en: "Solar Energy Dominant", zh: "太阳能量主导", ja: "ソーラーエネルギー優位" },
    title: {
      ko: "솔라(Solar) 에너지 우세 유형 - 특징, 강점, 관계와 성장 포인트",
      en: "Solar Energy Dominant Type: Traits, Strengths, Relationships and Growth",
      zh: "太阳（Solar）能量主导类型 - 特征、优势、关系与成长要点",
      ja: "ソーラー（Solar）エネルギー優位タイプ - 特徴、強み、人間関係と成長ポイント",
    },
    description: {
      ko: "에너지 밸런스 테스트의 Solar 우세 유형은 자기주장성·성취지향성·독립성이 높은 행동형입니다. 이 유형의 특징과 강점, 주의할 점, 직장과 연애에서의 모습, 번아웃 없이 성장하는 법을 정리했습니다.",
      en: "The Solar dominant type in the Energy Balance Test is the action type, high in assertiveness, achievement drive and independence. Its traits, strengths, cautions, how it shows at work and in love, and how to grow without burning out.",
      zh: "能量平衡测试的Solar主导类型是自我主张、成就导向、独立性高的行动型。整理了该类型的特征与优势、注意点、在职场与恋爱中的表现、不倦怠地成长的方法。",
      ja: "エネルギーバランス診断のSolar優位タイプは自己主張性・達成志向・独立性が高い行動型です。このタイプの特徴と強み、注意点、職場と恋愛での姿、燃え尽きずに成長する方法をまとめました。",
    },
    keywords: {
      ko: ["솔라 에너지", "솔라 유형", "에너지 밸런스 테스트 결과", "행동형 성격", "주도적인 성격", "성향 테스트 결과"],
      en: ["solar energy type", "energy balance test result", "action-oriented personality", "driven personality"],
      zh: ["太阳能量类型", "能量平衡测试结果", "行动型性格"],
      ja: ["ソーラーエネルギー", "エネルギーバランス診断 結果", "行動型 性格"],
    },
    heading: {
      ko: "솔라 에너지 우세: 행동과 성취로 빛나는 태양",
      en: "Solar Dominant: The Sun That Shines Through Action",
      zh: "太阳能量主导：以行动与成就闪耀的太阳",
      ja: "ソーラーエネルギー優位：行動と達成で輝く太陽",
    },
    subtitle: {
      ko: "자기주장성 · 성취지향성 · 독립성이 높은 사람",
      en: "High in assertiveness, achievement drive and independence",
      zh: "自我主张·成就导向·独立性高的人",
      ja: "自己主張性・達成志向・独立性が高い人",
    },
    intro: {
      ko: "Solar 에너지 우세 유형은 여섯 가지 차원 가운데 자기주장성, 성취지향성, 독립성의 합이 공감력, 협력성, 직관력의 합보다 높게 나온 사람입니다. 이름 그대로 태양처럼 스스로 빛을 내고 밖으로 뻗어 나가는 에너지입니다. 목표가 생기면 움직이고, 할 말은 하며, 남의 허락을 기다리기보다 먼저 결정합니다. 융의 용어를 빌리면 '아니무스', 벰의 성역할 검사로는 전통적으로 '남성적'이라 불린 특성 묶음이 강한 상태이지만, 이 테스트에서 Solar 유형은 성별과 무관하게 나옵니다. 여성 Solar도, 남성 Lunar도 똑같이 흔합니다.\n\n이 유형의 하루는 할 일 목록으로 시작해 지운 항목의 수로 끝납니다. 회의에서 침묵이 길어지면 먼저 입을 열고, 프로젝트가 막히면 누군가 시키기 전에 대안을 가져옵니다. 주변 사람들은 이 유형을 '믿고 맡길 수 있는 사람', '추진력 있는 사람'으로 기억합니다. 위기 상황에서 가장 먼저 움직이는 것도, 아무도 하지 않으려는 결정을 떠안는 것도 대개 이 유형입니다.\n\n다만 태양은 가까이 있는 것을 태우기도 합니다. Solar 유형이 가장 자주 듣는 피드백은 '내 말을 끝까지 안 듣는다', '혼자 다 결정한다', '쉬는 법을 모른다'입니다. 결과 화면의 여섯 막대 가운데 공감력·협력성·직관력 막대가 유난히 짧다면, 그 세 가지가 이 유형의 성장 지점입니다. Solar 에너지는 줄일 것이 아니라 방향을 정하고 쉼표를 찍어 주면 됩니다.",
      en: "The Solar dominant type is someone whose combined assertiveness, achievement drive and independence outscored their combined empathy, collaboration and intuition. As the name says, it is energy that shines on its own and reaches outward like the sun. When a goal appears you move, you say what needs saying, and you decide first rather than wait for permission. In Jung's terms the 'animus', in Bem's inventory the cluster traditionally called 'masculine', is strong here, but in this test the Solar type appears regardless of sex: Solar women and Lunar men are equally common.\n\nThis type's day begins with a to-do list and ends with a count of crossed-off items. When silence stretches in a meeting you speak first; when a project stalls you bring an alternative before anyone asks. People remember you as someone they can rely on, someone with drive. You are usually the first to move in a crisis and the one who shoulders the decision nobody wants.\n\nBut the sun also scorches what is close to it. The feedback Solar types hear most often is 'you don't hear me out', 'you decide everything alone', 'you don't know how to rest'. If the empathy, collaboration and intuition bars on your result screen are noticeably short, those three are your growth points. Solar energy does not need reducing; it needs a direction and a few commas.",
      zh: "Solar能量主导类型是六个维度中自我主张、成就导向、独立性之和高于共情力、合作性、直觉力之和的人。顾名思义，这是像太阳一样自己发光、向外延伸的能量。有了目标就行动，该说的话就说，不等别人许可而先决定。借用荣格的说法是“阿尼姆斯”，在贝姆的量表中是传统上称为“男性化”的特质组较强，但本测试中Solar类型的出现与性别无关，女性Solar和男性Lunar同样常见。\n\n这类人的一天从待办清单开始，以划掉的条目数结束。会议上沉默拉长时最先开口，项目卡住时不等人要求就带来替代方案。周围的人记住的是“可以放心托付的人”“有推动力的人”。危机中最先行动的、把没人愿意做的决定扛下来的，多半也是这类人。\n\n但太阳也会灼伤靠近的东西。Solar类型最常听到的反馈是“不把我的话听完”“什么都自己决定”“不知道怎么休息”。如果结果页六个条形中共情力、合作性、直觉力明显偏短，那三项就是这类人的成长点。Solar能量不需要减少，只需定好方向、加上逗号。",
      ja: "Solarエネルギー優位タイプは六つの次元のうち自己主張性、達成志向、独立性の合計が共感力、協調性、直感力の合計より高く出た人です。名前のとおり太陽のように自ら光を出して外へ伸びていくエネルギーです。目標ができれば動き、言うべきことは言い、人の許可を待つより先に決めます。ユングの用語を借りれば「アニムス」、ベムの性役割検査では伝統的に「男性的」と呼ばれた特性群が強い状態ですが、このテストでSolarタイプは性別と無関係に出ます。女性のSolarも男性のLunarも同じくらいよくいます。\n\nこのタイプの一日はやることリストで始まり、消した項目の数で終わります。会議で沈黙が長引けば先に口を開き、プロジェクトが詰まれば誰かに言われる前に代案を持ってきます。周りの人はこのタイプを「信じて任せられる人」「推進力のある人」として記憶します。危機的状況で最初に動くのも、誰もやりたがらない決定を引き受けるのもたいていこのタイプです。\n\nただ太陽は近くにあるものを焦がすこともあります。Solarタイプが最もよく聞くフィードバックは「私の話を最後まで聞かない」「一人で全部決める」「休み方を知らない」です。結果画面の六本の棒のうち共感力・協調性・直感力の棒が特に短ければ、その三つがこのタイプの成長点です。Solarエネルギーは減らすものではなく、方向を決めて読点を打ってあげればよいのです。",
    },
    strengths: {
      ko: ["결정이 빠르고 책임을 진다", "할 말을 분명히 한다", "목표를 끝까지 밀고 간다", "혼자서도 길을 찾는다", "위기에서 먼저 움직인다"],
      en: ["Decides fast and takes responsibility", "Says what needs saying", "Carries goals through to the end", "Finds the way alone", "Moves first in a crisis"],
      zh: ["决策快、敢担责", "把该说的说清楚", "把目标推到底", "独自也能找到路", "危机中率先行动"],
      ja: ["決断が速く責任を負う", "言うべきことをはっきり言う", "目標を最後まで押し進める", "一人でも道を見つける", "危機で先に動く"],
    },
    cautions: {
      ko: ["상대의 말을 끝까지 듣지 않기 쉽다", "자기주장과 고집을 혼동할 수 있다", "성과가 없는 날을 견디기 어렵다", "도움을 청하는 것을 약함으로 여긴다"],
      en: ["Tends not to hear others out", "May confuse assertiveness with stubbornness", "Struggles with days that produce nothing", "Sees asking for help as weakness"],
      zh: ["容易不把对方的话听完", "可能把自我主张与固执混淆", "难以忍受没有成果的日子", "把求助视为软弱"],
      ja: ["相手の話を最後まで聞かないことが多い", "自己主張と頑固を混同することがある", "成果のない日に耐えにくい", "助けを求めることを弱さと見なす"],
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "Solar 유형은 재량이 주어지는 자리에서 성과가 크게 오릅니다. 창업, 영업, 프로젝트 리더, 현장 책임자처럼 결과가 보이고 결정권이 있는 일이 맞습니다. 세세한 지시와 긴 합의 과정은 이 유형의 에너지를 빼앗습니다. 조직에서 오래 가려면 '공유'와 '위임'을 의식적으로 연습해야 합니다. 혼자 다 하는 사람은 빠르지만, 함께 하는 사람이 멀리 갑니다.",
          en: "Solar types perform far better where they have discretion: founding a business, sales, project leadership, site management, work with visible results and decision rights. Detailed instructions and long consensus processes drain them. To last in an organization they must deliberately practice sharing and delegating. The person who does everything alone is fast; the person who works with others goes far.",
          zh: "Solar类型在拥有自主权的位置上业绩大增。创业、销售、项目负责人、现场负责人等结果可见、有决定权的工作适合他们。事无巨细的指示和漫长的协商会消耗其能量。要在组织中长久，必须有意识地练习“共享”与“授权”。独自包办的人快，与人同行的人远。",
          ja: "Solarタイプは裁量が与えられる席で成果が大きく上がります。起業、営業、プロジェクトリーダー、現場責任者のように結果が見えて決定権のある仕事が合います。細かい指示と長い合意の過程はこのタイプのエネルギーを奪います。組織で長く続くには「共有」と「委任」を意識的に練習する必要があります。一人で全部やる人は速いですが、一緒にやる人が遠くへ行きます。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "연애 초반의 Solar 유형은 적극적이고 계획적이며 리드하는 매력이 있습니다. 문제는 관계가 안정된 뒤입니다. 일에 집중하느라 상대가 뒷전이 되고, 서운하다는 말에 '그래서 어떻게 해 줄까?'라고 해결책부터 꺼내 상대를 더 서운하게 합니다. Solar 유형에게 가장 효과적인 한 문장은 '그랬구나, 힘들었겠다'를 해결책보다 먼저 말하는 것입니다. 상대가 원하는 것은 대개 해결이 아니라 들어 주는 것입니다.",
          en: "Early in a relationship the Solar type is proactive, organized and attractively in the lead. The trouble starts once things settle: work takes focus, the partner slips to second place, and when they say they feel hurt the Solar type pulls out a solution first, 'so what should I do?', which hurts more. The most effective sentence for this type is 'I see, that must have been hard' said before any solution. What a partner wants is usually to be heard, not fixed.",
          zh: "恋爱初期的Solar类型积极、有计划、善于引导，很有魅力。问题出在关系稳定之后：专注工作而把对方放在后面，对方说委屈时先掏出解决方案“那我该怎么做？”，让对方更委屈。对Solar类型最有效的一句话，是在解决方案之前先说“原来是这样，你一定很难受”。对方想要的多半不是解决，而是被倾听。",
          ja: "恋愛初期のSolarタイプは積極的で計画的でリードする魅力があります。問題は関係が安定した後です。仕事に集中して相手が後回しになり、寂しいという言葉に「それでどうしてほしい？」と解決策から出して相手をもっと寂しくさせます。Solarタイプに最も効果的な一文は「そうだったんだ、つらかったね」を解決策より先に言うことです。相手が望むのはたいてい解決ではなく聞いてもらうことです。",
        },
      },
      {
        name: { ko: "친구·가족 사이에서", en: "With friends and family", zh: "在朋友·家人之间", ja: "友人・家族の間で" },
        text: {
          ko: "가족과 친구는 Solar 유형을 '의지가 되는 사람'으로 여기면서도 '내 얘기는 잘 안 듣는 사람'으로 느끼기 쉽습니다. 모임을 주도하고 문제를 해결해 주지만, 정작 가까운 사람이 힘들 때 함께 있어 주기보다 방법을 찾아 주려 합니다. 한 달에 한 번은 아무것도 제안하지 않고 상대의 계획을 따라가 보세요. 그 하루가 관계의 온도를 바꿉니다.",
          en: "Family and friends see the Solar type as someone to lean on, yet also as someone who does not really listen. You lead the gathering and solve the problem, but when someone close is struggling you look for a method rather than simply staying beside them. Once a month, propose nothing and follow someone else's plan. That one day changes the temperature of the relationship.",
          zh: "家人朋友把Solar类型当作“可以依靠的人”，却也容易觉得“不太听我说话”。他们主导聚会、解决问题，但亲近的人难过时，比起陪伴更想找方法。每月一次，什么都不提议，跟着对方的计划走。那一天会改变关系的温度。",
          ja: "家族と友人はSolarタイプを「頼りになる人」と思いながらも「私の話はあまり聞かない人」と感じやすいです。集まりを主導し問題を解決してあげますが、いざ身近な人がつらいとき一緒にいてあげるより方法を探してあげようとします。月に一度は何も提案せず相手の計画についていってみてください。その一日が関係の温度を変えます。",
        },
      },
    ],
    growth: {
      ko: "Solar 유형의 성장은 에너지를 줄이는 것이 아니라 세 가지 습관을 더하는 데 있습니다. 첫째, 듣기의 순서를 바꾸세요. 해결책을 말하기 전에 상대의 말을 한 문장으로 요약해 돌려주는 것('그러니까 ~라는 거지?')만으로 공감력 점수가 실제 관계에서 올라갑니다. 둘째, 성과 없는 하루를 일부러 만드세요. 주말 반나절이라도 목표 없이 보내는 연습이 번아웃을 막고, 쉬어도 세상이 무너지지 않는다는 것을 몸에 가르칩니다. 셋째, 결정하기 전에 세 사람에게 물으세요. 결정은 여전히 당신이 하되, 묻는 행위 자체가 사람들을 당신 편으로 만듭니다. 태양은 혼자 빛나지만, 그 빛이 닿는 곳에 사람이 있을 때 비로소 따뜻해집니다.",
      en: "Growth for the Solar type lies not in dimming the energy but in adding three habits. First, change the order of listening: summarizing the other person's point in one sentence before offering a solution ('so you're saying…') raises your empathy where it counts, in real relationships. Second, create a day with no output on purpose; even half a weekend without a goal prevents burnout and teaches the body that the world does not end when you rest. Third, ask three people before deciding. The decision remains yours, but the act of asking brings people to your side. The sun shines alone, but it only becomes warm where its light reaches someone.",
      zh: "Solar类型的成长不在于减少能量，而在于增加三个习惯。第一，改变倾听的顺序：说解决方案之前先把对方的话用一句话复述（“所以你是说……对吧？”），共情力就会在真实关系中提升。第二，刻意制造没有产出的一天，哪怕周末半天不设目标，既防倦怠，也让身体明白休息了世界不会塌。第三，决定前问三个人。决定仍由你做，但询问这个行为本身会让人站到你这边。太阳独自发光，但只有光照到的地方有人，才真正温暖。",
      ja: "Solarタイプの成長はエネルギーを減らすことではなく三つの習慣を加えることにあります。第一に、聞く順序を変えてください。解決策を言う前に相手の話を一文で要約して返すこと（「つまり〜ということだね？」）だけで共感力の点数が実際の関係で上がります。第二に、成果のない一日をわざと作ってください。週末の半日でも目標なしに過ごす練習が燃え尽きを防ぎ、休んでも世界が崩れないことを体に教えます。第三に、決める前に三人に尋ねてください。決定は依然としてあなたがするものの、尋ねる行為そのものが人々をあなたの味方にします。太陽は一人で輝きますが、その光が届くところに人がいてはじめて温かくなります。",
    },
    faq: [
      {
        question: { ko: "Solar 유형이면 리더형이라는 뜻인가요?", en: "Does being Solar mean I'm a leader type?", zh: "Solar类型就是领导型吗？", ja: "Solarタイプならリーダー型という意味ですか？" },
        answer: {
          ko: "'앞에서 끄는 리더'에 가까운 성향이라는 뜻이지, 리더가 되어야 한다는 뜻은 아닙니다. 리더십 연구는 결과를 내는 리더와 사람을 지키는 리더가 모두 필요하다고 말하며, Solar 유형은 전자에 가깝습니다. 혼자 일하는 전문가나 창작자 중에도 Solar 유형이 많습니다. 중요한 것은 직함이 아니라 '내가 결정하고 책임지는 영역'이 삶에 충분히 있는가입니다.",
          en: "It means you lean toward the 'leading from the front' style, not that you must be a leader. Leadership research says both results-focused and people-protecting leaders are needed, and Solar types are closer to the former. Many solo professionals and creators are Solar too. What matters is not the title but whether your life has enough territory where you decide and take responsibility.",
          zh: "意思是倾向于“在前面带领”的风格，不是说必须当领导。领导力研究表明既需要出结果的领导也需要守护人的领导，Solar类型更接近前者。独立工作的专业人士和创作者中也有很多Solar类型。重要的不是头衔，而是生活中是否有足够的“由我决定并负责的领域”。",
          ja: "「前で引っ張るリーダー」に近い性向という意味で、リーダーにならなければならないという意味ではありません。リーダーシップ研究は結果を出すリーダーと人を守るリーダーの両方が必要だと言い、Solarタイプは前者に近いです。一人で働く専門家や創作者にもSolarタイプは多いです。大事なのは肩書きではなく「自分が決めて責任を負う領域」が人生に十分あるかです。",
        },
      },
      {
        question: { ko: "Solar 점수가 조금만 높았는데도 Solar 유형인가요?", en: "I was only slightly higher on Solar. Am I still Solar?", zh: "Solar分数只高一点也算Solar类型吗？", ja: "Solarの点数が少し高いだけでもSolarタイプですか？" },
        answer: {
          ko: "네, 이 테스트는 두 합계 중 높은 쪽을 유형으로 정합니다. 결과 화면의 비율이 55:45처럼 가깝다면 두 에너지가 균형에 가까운 사람이며, 상황에 따라 Solar와 Lunar를 오가는 유연함이 강점입니다. 벰의 연구에서는 이런 균형형을 '양성적(androgynous)'이라 불렀고, 적응력이 가장 높은 집단으로 보고했습니다. 비율이 70:30 이상이면 Solar 성향이 뚜렷한 편입니다.",
          en: "Yes, the test assigns the type by whichever total is higher. If the ratio on your result is close, say 55:45, you are near balance, and flexibility to move between Solar and Lunar as the situation demands is your strength. Bem called this balanced group 'androgynous' and reported it as the most adaptable. A ratio of 70:30 or more marks a pronounced Solar disposition.",
          zh: "是的，本测试以两个总分中较高者定类型。若结果页的比例接近55:45，说明两种能量接近平衡，随情况在Solar与Lunar间切换的灵活性是你的优势。贝姆的研究把这种平衡型称为“双性化”，并报告其适应力最强。比例在70:30以上则Solar倾向明显。",
          ja: "はい、このテストは二つの合計のうち高い方をタイプに決めます。結果画面の比率が55:45のように近ければ二つのエネルギーが均衡に近い人で、状況に応じてSolarとLunarを行き来する柔軟さが強みです。ベムの研究ではこうした均衡型を「両性具有的（androgynous）」と呼び、適応力が最も高い集団として報告しました。比率が70:30以上ならSolar性向がはっきりしている方です。",
        },
      },
      {
        question: { ko: "Solar 유형과 Lunar 유형은 잘 맞나요?", en: "Do Solar and Lunar types get along?", zh: "Solar类型和Lunar类型合得来吗？", ja: "SolarタイプとLunarタイプは相性が良いですか？" },
        answer: {
          ko: "서로 부족한 것을 채워 주기 때문에 잘 맞을 수 있지만, 그 차이가 갈등의 원인이 되기도 합니다. Solar는 Lunar의 공감과 조율을 배우고, Lunar는 Solar의 추진력과 분명함을 배울 때 관계가 깊어집니다. 반대로 Solar가 '왜 결정을 못 해'라고 다그치고 Lunar가 '왜 내 마음을 몰라'라고 섭섭해하면 평행선이 됩니다. 궁합은 유형이 아니라 차이를 대하는 태도가 결정합니다.",
          en: "They can get along well because each supplies what the other lacks, but the same difference can cause conflict. The relationship deepens when Solar learns empathy and attunement from Lunar, and Lunar learns drive and clarity from Solar. It stalls when Solar presses 'why can't you decide?' and Lunar sulks 'why don't you understand me?' Compatibility is decided not by type but by how you treat the difference.",
          zh: "因为互补，可以很合得来，但这种差异也可能成为冲突的原因。Solar向Lunar学习共情与协调，Lunar向Solar学习推动力与明确，关系就会加深。反之，Solar逼问“你怎么就不能决定”，Lunar委屈“你怎么不懂我的心”，就成了平行线。合不合不由类型决定，而由对待差异的态度决定。",
          ja: "互いに足りないものを補い合うので相性が良くなり得ますが、その違いが衝突の原因になることもあります。SolarがLunarの共感と調整を学び、LunarがSolarの推進力と明確さを学ぶとき関係が深まります。逆にSolarが「なぜ決められないの」と責め、Lunarが「なぜ私の気持ちが分からないの」と拗ねれば平行線になります。相性はタイプではなく違いへの向き合い方が決めます。",
        },
      },
    ],
  },
  {
    id: "lunar",
    type: "LUNAR",
    emoji: "🌙",
    name: { ko: "루나 에너지 우세", en: "Lunar Energy Dominant", zh: "月亮能量主导", ja: "ルナエネルギー優位" },
    title: {
      ko: "루나(Lunar) 에너지 우세 유형 - 특징, 강점, 관계와 성장 포인트",
      en: "Lunar Energy Dominant Type: Traits, Strengths, Relationships and Growth",
      zh: "月亮（Lunar）能量主导类型 - 特征、优势、关系与成长要点",
      ja: "ルナ（Lunar）エネルギー優位タイプ - 特徴、強み、人間関係と成長ポイント",
    },
    description: {
      ko: "에너지 밸런스 테스트의 Lunar 우세 유형은 공감력·협력성·직관력이 높은 관계형입니다. 이 유형의 특징과 강점, 주의할 점, 직장과 연애에서의 모습, 지치지 않고 자기 목소리를 내는 법을 정리했습니다.",
      en: "The Lunar dominant type in the Energy Balance Test is the relational type, high in empathy, collaboration and intuition. Its traits, strengths, cautions, how it shows at work and in love, and how to find your own voice without exhaustion.",
      zh: "能量平衡测试的Lunar主导类型是共情力、合作性、直觉力高的关系型。整理了该类型的特征与优势、注意点、在职场与恋爱中的表现、不疲惫地发出自己声音的方法。",
      ja: "エネルギーバランス診断のLunar優位タイプは共感力・協調性・直感力が高い関係型です。このタイプの特徴と強み、注意点、職場と恋愛での姿、疲れずに自分の声を出す方法をまとめました。",
    },
    keywords: {
      ko: ["루나 에너지", "루나 유형", "에너지 밸런스 테스트 결과", "관계형 성격", "공감형 성격", "성향 테스트 결과"],
      en: ["lunar energy type", "energy balance test result", "relational personality", "empathetic personality"],
      zh: ["月亮能量类型", "能量平衡测试结果", "关系型性格"],
      ja: ["ルナエネルギー", "エネルギーバランス診断 結果", "関係型 性格"],
    },
    heading: {
      ko: "루나 에너지 우세: 공감과 직관으로 빛나는 달",
      en: "Lunar Dominant: The Moon That Shines Through Empathy",
      zh: "月亮能量主导：以共情与直觉闪耀的月亮",
      ja: "ルナエネルギー優位：共感と直感で輝く月",
    },
    subtitle: {
      ko: "공감력 · 협력성 · 직관력이 높은 사람",
      en: "High in empathy, collaboration and intuition",
      zh: "共情力·合作性·直觉力高的人",
      ja: "共感力・協調性・直感力が高い人",
    },
    intro: {
      ko: "Lunar 에너지 우세 유형은 여섯 가지 차원 가운데 공감력, 협력성, 직관력의 합이 자기주장성, 성취지향성, 독립성의 합보다 높게 나온 사람입니다. 달이 스스로 빛나는 대신 주변을 비추듯, 이 유형의 에너지는 사람과 관계를 향합니다. 상대의 기분을 먼저 읽고, 함께 이루는 것을 기뻐하며, 논리로 설명하기 전에 느낌으로 먼저 압니다. 융의 용어로는 '아니마', 벰의 성역할 검사로는 전통적으로 '여성적'이라 불린 특성 묶음이 강한 상태이지만, 이 역시 성별과 무관합니다. 남성 Lunar는 흔하며, 그들의 공감력은 조직에서 가장 귀한 자원 중 하나입니다.\n\n이 유형이 있는 자리는 분위기가 부드러워집니다. 누가 힘들어하는지 가장 먼저 알아차리고, 의견이 갈릴 때 양쪽 말을 다 들어 절충안을 내며, 성공했을 때 자기 이름보다 함께한 사람들을 먼저 부릅니다. 사람들은 이 유형에게 고민을 털어놓고, 팀은 이 유형 덕에 깨지지 않습니다. 상담, 교육, 간호, 기획, 창작처럼 사람의 마음과 패턴을 읽는 일에서 이 유형은 대체하기 어려운 강점을 보입니다.\n\n달의 그늘은 자기 자신에게 드리웁니다. Lunar 유형이 가장 자주 겪는 어려움은 '거절을 못 해서 떠안는 것', '남의 감정에 지쳐 내 감정을 잃는 것', '결정을 미루다 때를 놓치는 것'입니다. 결과 화면에서 자기주장성·성취지향성·독립성 막대가 유난히 짧다면, 그 세 가지가 성장 지점입니다. Lunar 에너지는 줄일 것이 아니라, 그 빛이 자기 자신에게도 닿도록 방향을 조금 돌려 주면 됩니다.",
      en: "The Lunar dominant type is someone whose combined empathy, collaboration and intuition outscored their combined assertiveness, achievement drive and independence. As the moon lights its surroundings rather than shining for itself, this type's energy points toward people and relationships. You read the other person's mood first, rejoice in achieving together, and know by feel before you can explain by logic. In Jung's terms the 'anima', in Bem's inventory the cluster traditionally called 'feminine', is strong here, but again sex has nothing to do with it. Lunar men are common, and their empathy is among the most valuable resources an organization has.\n\nWherever this type is, the atmosphere softens. You are the first to notice who is struggling, you hear both sides and propose a compromise when opinions split, and on success you name the people who worked with you before yourself. People confide in you, and teams hold together because of you. In counseling, teaching, nursing, planning and creative work, anything that reads human feeling and pattern, this type shows strengths that are hard to replace.\n\nThe moon's shadow falls on itself. The difficulties Lunar types face most often are taking on too much because they cannot refuse, losing their own feelings in exhaustion from others', and postponing decisions until the moment passes. If the assertiveness, achievement and independence bars on your result are noticeably short, those three are your growth points. Lunar energy does not need reducing; it needs its light turned a little so that it reaches you too.",
      zh: "Lunar能量主导类型是六个维度中共情力、合作性、直觉力之和高于自我主张、成就导向、独立性之和的人。如同月亮不自己发光而照亮周围，这类人的能量朝向人与关系。先读懂对方的心情，为共同完成而高兴，在用逻辑解释之前先凭感觉知道。借用荣格的说法是“阿尼玛”，在贝姆的量表中是传统上称为“女性化”的特质组较强，但这同样与性别无关。男性Lunar很常见，他们的共情力是组织中最宝贵的资源之一。\n\n这类人在的地方气氛会变柔和。最先察觉谁在难受，意见分歧时听完双方提出折中方案，成功时先叫出共事者的名字而非自己。人们向这类人倾诉，团队因这类人而不散。在咨询、教育、护理、策划、创作等读人心与模式的工作中，这类人展现出难以替代的优势。\n\n月亮的阴影落在自己身上。Lunar类型最常遇到的困难是“不会拒绝而揽下太多”“被他人情绪耗尽而失去自己的情绪”“拖延决定而错失时机”。如果结果页中自我主张、成就导向、独立性的条形明显偏短，那三项就是成长点。Lunar能量不需要减少，只需把光稍微转向，让它也照到自己。",
      ja: "Lunarエネルギー優位タイプは六つの次元のうち共感力、協調性、直感力の合計が自己主張性、達成志向、独立性の合計より高く出た人です。月が自ら輝く代わりに周りを照らすように、このタイプのエネルギーは人と関係に向かいます。相手の気分を先に読み、ともに成し遂げることを喜び、論理で説明する前に感覚で先に分かります。ユングの用語では「アニマ」、ベムの性役割検査では伝統的に「女性的」と呼ばれた特性群が強い状態ですが、これも性別とは無関係です。男性のLunarはよくいて、彼らの共感力は組織で最も貴重な資源の一つです。\n\nこのタイプがいる場は雰囲気が柔らかくなります。誰がつらがっているか最初に気づき、意見が分かれるとき双方の話を全部聞いて折衷案を出し、成功したとき自分の名前より一緒にやった人たちを先に呼びます。人々はこのタイプに悩みを打ち明け、チームはこのタイプのおかげで壊れません。相談、教育、看護、企画、創作のように人の心とパターンを読む仕事で、このタイプは代えがたい強みを見せます。\n\n月の影は自分自身に落ちます。Lunarタイプが最もよく経験する困難は「断れずに抱え込むこと」「人の感情に疲れて自分の感情を失うこと」「決定を先延ばしにして時機を逃すこと」です。結果画面で自己主張性・達成志向・独立性の棒が特に短ければ、その三つが成長点です。Lunarエネルギーは減らすものではなく、その光が自分自身にも届くよう向きを少し変えてあげればよいのです。",
    },
    strengths: {
      ko: ["사람의 마음을 빠르게 읽는다", "갈등을 조율하고 팀을 지킨다", "함께 이루는 데서 힘을 얻는다", "설명하기 전에 먼저 안다", "곁에 있어 주는 법을 안다"],
      en: ["Reads people quickly", "Mediates conflict and holds the team together", "Draws strength from shared achievement", "Knows before it can be explained", "Knows how to simply be there"],
      zh: ["快速读懂人心", "调解冲突、守护团队", "从共同完成中获得力量", "在解释之前就先知道", "懂得如何陪伴"],
      ja: ["人の心を素早く読む", "衝突を調整しチームを守る", "ともに成し遂げることから力を得る", "説明する前にまず分かる", "そばにいてあげる方法を知っている"],
    },
    cautions: {
      ko: ["거절을 못 해 일을 떠안기 쉽다", "남의 감정에 지쳐 자기 감정을 잃는다", "결정을 미루다 때를 놓친다", "공을 양보하다 저평가된다"],
      en: ["Takes on too much because refusing is hard", "Loses own feelings in exhaustion from others'", "Postpones decisions until the moment passes", "Gives away credit and ends up undervalued"],
      zh: ["不会拒绝而容易揽下太多", "被他人情绪耗尽而失去自己的情绪", "拖延决定而错失时机", "让出功劳而被低估"],
      ja: ["断れずに仕事を抱え込みやすい", "人の感情に疲れて自分の感情を失う", "決定を先延ばしにして時機を逃す", "手柄を譲って過小評価される"],
    },
    scenes: [
      {
        name: { ko: "직장에서", en: "At work", zh: "在职场", ja: "職場で" },
        text: {
          ko: "Lunar 유형은 사람 사이를 잇는 일에서 빛납니다. 고객 관계, 인사, 교육, 상담, 팀 운영에서 이 유형이 있으면 이직률이 내려가고 분위기가 좋아집니다. 문제는 평가입니다. 성과를 말하지 않고 공을 나누다 보면 '좋은 사람'으로만 남고 승진에서 밀립니다. 분기마다 자기가 한 일을 세 줄로 적어 상사에게 공유하는 습관이 필요합니다. 공을 나누는 것과 공을 지우는 것은 다릅니다.",
          en: "Lunar types shine in work that connects people. In client relations, HR, teaching, counseling and team operations, turnover drops and morale rises when they are present. The problem is evaluation: by never stating results and always sharing credit, they remain merely 'a nice person' and are passed over for promotion. They need the habit of writing three lines each quarter on what they did and sharing it with a manager. Sharing credit is not the same as erasing it.",
          zh: "Lunar类型在连接人与人的工作中发光。在客户关系、人事、教育、咨询、团队运营中，有这类人在，离职率下降、氛围变好。问题在考核：不说成果、总是分功，最后只剩“好人”印象而在升职中落后。需要养成每季度把自己做的事写成三行分享给上司的习惯。分享功劳不等于抹去功劳。",
          ja: "Lunarタイプは人と人をつなぐ仕事で輝きます。顧客関係、人事、教育、相談、チーム運営でこのタイプがいると離職率が下がり雰囲気が良くなります。問題は評価です。成果を言わず手柄を分けているうちに「良い人」としてだけ残り昇進で押しのけられます。四半期ごとに自分がやったことを三行書いて上司に共有する習慣が必要です。手柄を分けることと手柄を消すことは違います。",
        },
      },
      {
        name: { ko: "연애에서", en: "In love", zh: "在恋爱中", ja: "恋愛で" },
        text: {
          ko: "Lunar 유형은 상대의 기분을 세심하게 살피는 다정한 연인입니다. 다만 상대에게 맞추기만 하다 보면 '나는 뭘 원했지?'라는 공허함이 오고, 참았던 서운함이 한꺼번에 터지면 상대는 영문을 모릅니다. 서운함은 쌓이기 전에, 작을 때 말해야 합니다. '나는 ~할 때 ~하게 느꼈어'라는 나-전달법은 Lunar 유형에게 특히 잘 맞는 도구입니다. 상대를 공격하지 않으면서 내 마음을 말할 수 있기 때문입니다.",
          en: "The Lunar type is a tender partner who watches the other's mood closely. But fitting yourself to a partner all the time brings the emptiness of 'what did I want?', and when stored-up hurt bursts out at once the partner has no idea why. Hurt must be spoken while it is small, before it piles up. The I-message, 'I felt X when Y', suits the Lunar type especially well because it lets you speak your heart without attacking.",
          zh: "Lunar类型是细心体察对方心情的温柔恋人。但一味迁就对方会带来“我想要什么？”的空虚，积攒的委屈一次爆发时对方莫名其妙。委屈要在积累之前、还小的时候说出来。“我在……时感到……”的我-信息对Lunar类型尤其适用，因为它能在不攻击对方的前提下说出自己的心。",
          ja: "Lunarタイプは相手の気分を細やかに見る優しい恋人です。ただ相手に合わせてばかりいると「私は何を望んでいたっけ？」という空虚さが来て、我慢していた寂しさが一度に爆発すると相手は訳が分かりません。寂しさはたまる前に、小さいうちに言わなければなりません。「私は〜のとき〜と感じた」という私メッセージはLunarタイプに特によく合う道具です。相手を攻撃せずに自分の気持ちを言えるからです。",
        },
      },
      {
        name: { ko: "친구·가족 사이에서", en: "With friends and family", zh: "在朋友·家人之间", ja: "友人・家族の間で" },
        text: {
          ko: "Lunar 유형은 가족과 친구의 고민 상담소가 되기 쉽습니다. 들어 주는 것은 이 유형의 재능이지만, 모두의 감정을 받아 주다 보면 정작 자기 이야기를 들어 줄 사람이 없다는 것을 뒤늦게 깨닫습니다. 들어 주는 시간에 한도를 두고, 내 이야기를 들어 줄 한 사람을 따로 두세요. 그리고 가족의 부탁을 거절할 때는 '이번엔 어렵고 대신 이건 할게'처럼 대안을 붙이면 죄책감이 줄어듭니다.",
          en: "Lunar types easily become the counseling office for family and friends. Listening is their gift, but after absorbing everyone's feelings they realize late that no one is there to listen to them. Put a limit on listening time and keep one person who listens to you. And when refusing a family request, attaching an alternative, 'I can't this time, but I'll do this instead', eases the guilt.",
          zh: "Lunar类型容易成为家人朋友的烦恼咨询室。倾听是这类人的天赋，但接住所有人的情绪之后，才后知后觉地发现没人听自己说。给倾听时间设限，另外留一个听你说话的人。拒绝家人请求时附上替代方案——“这次不行，不过我可以做这个”——内疚感会减轻。",
          ja: "Lunarタイプは家族と友人の悩み相談所になりやすいです。聞いてあげることはこのタイプの才能ですが、みんなの感情を受け止めているうちに、いざ自分の話を聞いてくれる人がいないことに遅れて気づきます。聞いてあげる時間に限度を置き、自分の話を聞いてくれる一人を別に持ってください。そして家族の頼みを断るときは「今回は難しいけど代わりにこれをするよ」のように代案をつければ罪悪感が減ります。",
        },
      },
    ],
    growth: {
      ko: "Lunar 유형의 성장은 공감을 줄이는 것이 아니라 세 가지 습관을 더하는 데 있습니다. 첫째, 하루 한 번 '저는 이렇게 생각해요'로 문장을 시작하세요. 회의든 가족 식탁이든 상관없습니다. 자기주장성은 성격이 아니라 근육이라 쓸수록 자랍니다. 둘째, 작은 결정을 혼자 내리세요. 점심 메뉴, 주말 계획처럼 가벼운 것부터 남에게 묻지 않고 정하고 결과를 스스로 평가하면 독립성이 자랍니다. 셋째, 성과를 기록하세요. 남을 위해 한 일도 성과입니다. 분기마다 세 줄로 적어 두면 자기 가치를 스스로 확인할 수 있고, 필요할 때 말할 수 있습니다. 달은 태양빛을 받아 빛나지만, 밤바다의 길을 여는 것은 결국 달빛입니다. 그 빛이 당신 자신에게도 닿게 하세요.",
      en: "Growth for the Lunar type lies not in less empathy but in adding three habits. First, start one sentence a day with 'I think', in a meeting or at the family table; assertiveness is a muscle, not a personality, and grows with use. Second, make small decisions alone: lunch, the weekend plan, decided without asking and judged by yourself, builds independence. Third, record your results; what you did for others counts too. Three lines each quarter let you confirm your own worth and speak of it when needed. The moon shines with borrowed sunlight, yet it is moonlight that opens the path across the night sea. Let that light reach you as well.",
      zh: "Lunar类型的成长不在于减少共情，而在于增加三个习惯。第一，每天一次用“我认为”开头说话，会议上、家庭餐桌上都可以。自我主张不是性格而是肌肉，越用越强。第二，小决定自己做。午饭、周末计划等轻的事不问别人自己定、自己评估结果，独立性就会成长。第三，记录成果。为别人做的事也是成果。每季度写三行，能自己确认自己的价值，需要时也能说出来。月亮借太阳光发亮，但照开夜海之路的终究是月光。让那光也照到你自己。",
      ja: "Lunarタイプの成長は共感を減らすことではなく三つの習慣を加えることにあります。第一に、一日一回「私はこう思います」で文を始めてください。会議でも家族の食卓でも構いません。自己主張性は性格ではなく筋肉なので使うほど育ちます。第二に、小さな決定を一人で下してください。昼食のメニュー、週末の計画のように軽いものから人に聞かずに決めて結果を自分で評価すれば独立性が育ちます。第三に、成果を記録してください。人のためにしたことも成果です。四半期ごとに三行書いておけば自分の価値を自分で確認でき、必要なときに言えます。月は太陽の光を受けて輝きますが、夜の海の道を開くのは結局月の光です。その光があなた自身にも届くようにしてください。",
    },
    faq: [
      {
        question: { ko: "Lunar 유형은 리더가 되기 어렵나요?", en: "Is it hard for a Lunar type to lead?", zh: "Lunar类型难以成为领导者吗？", ja: "Lunarタイプはリーダーになりにくいですか？" },
        answer: {
          ko: "아닙니다. 리더십 연구는 팀의 심리적 안전감과 신뢰를 높이는 리더가 장기 성과에 유리하다고 보고하며, 그것이 바로 Lunar 유형의 강점입니다. 다만 Lunar 리더가 빠지기 쉬운 함정은 불편한 결정(저성과자 피드백, 자원 배분, 해고)을 미루는 것입니다. 공감력에 '불편한 말을 제때 하는 기술'을 더하면 가장 오래 사랑받는 리더가 됩니다. 사람을 지키는 리더는 결과를 내는 리더만큼 필요합니다.",
          en: "No. Leadership research reports that leaders who raise a team's psychological safety and trust are favored for long-term performance, and that is exactly the Lunar strength. The trap Lunar leaders fall into is postponing uncomfortable decisions: feedback to underperformers, allocation, dismissals. Add the skill of saying uncomfortable things on time to empathy and you become the leader people love longest. Leaders who protect people are as necessary as leaders who deliver results.",
          zh: "不是。领导力研究表明，提升团队心理安全感与信任的领导更有利于长期绩效，而那正是Lunar类型的优势。Lunar领导容易掉入的陷阱是拖延不舒服的决定（对低绩效者的反馈、资源分配、解雇）。在共情力上加上“及时说出不舒服的话的技巧”，就是最长久受爱戴的领导者。守护人的领导与出结果的领导同样必要。",
          ja: "いいえ。リーダーシップ研究はチームの心理的安全性と信頼を高めるリーダーが長期的な成果に有利だと報告しており、それがまさにLunarタイプの強みです。ただLunarリーダーが陥りやすい罠は不快な決定（低成果者へのフィードバック、資源配分、解雇）を先延ばしにすることです。共感力に「不快なことを時機を逃さず言う技術」を加えれば最も長く愛されるリーダーになります。人を守るリーダーは結果を出すリーダーと同じくらい必要です。",
        },
      },
      {
        question: { ko: "Lunar 점수가 조금만 높았는데도 Lunar 유형인가요?", en: "I was only slightly higher on Lunar. Am I still Lunar?", zh: "Lunar分数只高一点也算Lunar类型吗？", ja: "Lunarの点数が少し高いだけでもLunarタイプですか？" },
        answer: {
          ko: "네, 이 테스트는 두 합계 중 높은 쪽을 유형으로 정합니다. 결과 화면의 비율이 55:45처럼 가깝다면 두 에너지가 균형에 가까운 사람이며, 상황에 따라 공감과 추진을 오갈 수 있는 유연함이 강점입니다. 벰은 이런 균형형을 '양성적(androgynous)'이라 부르며 적응력이 가장 높은 집단으로 보고했습니다. 비율이 70:30 이상이면 Lunar 성향이 뚜렷한 편입니다.",
          en: "Yes, the test assigns the type by whichever total is higher. If the ratio on your result is close, say 55:45, you are near balance, and the flexibility to move between empathy and drive as needed is your strength. Bem called this balanced group 'androgynous' and reported it as the most adaptable. A ratio of 70:30 or more marks a pronounced Lunar disposition.",
          zh: "是的，本测试以两个总分中较高者定类型。若结果页的比例接近55:45，说明两种能量接近平衡，能随情况在共情与推动间切换的灵活性是你的优势。贝姆把这种平衡型称为“双性化”，并报告其适应力最强。比例在70:30以上则Lunar倾向明显。",
          ja: "はい、このテストは二つの合計のうち高い方をタイプに決めます。結果画面の比率が55:45のように近ければ二つのエネルギーが均衡に近い人で、状況に応じて共感と推進を行き来できる柔軟さが強みです。ベムはこうした均衡型を「両性具有的（androgynous）」と呼び適応力が最も高い集団として報告しました。比率が70:30以上ならLunar性向がはっきりしている方です。",
        },
      },
      {
        question: { ko: "Lunar 유형인데 왜 이렇게 자주 지치나요?", en: "I'm Lunar. Why do I get so tired so often?", zh: "我是Lunar类型，为什么这么容易累？", ja: "Lunarタイプですが、なぜこんなによく疲れるのですか？" },
        answer: {
          ko: "공감력과 협력성이 높은 사람은 남의 감정과 팀의 분위기를 계속 받아들이기 때문에 보이지 않는 에너지를 많이 씁니다. 심리학에서는 이를 공감 피로, 정서 노동이라 부릅니다. 해법은 공감을 줄이는 것이 아니라 회복 장치를 두는 것입니다. 들어 주는 시간에 한도 두기, 힘든 이야기를 들은 뒤 몸을 쓰는 활동으로 전환하기, 내 이야기를 들어 줄 사람 따로 두기, 그리고 '지금은 어렵다'는 거절 문장을 입에 붙이기. 이 네 가지가 Lunar 유형의 기본 장비입니다.",
          en: "People high in empathy and collaboration keep absorbing others' feelings and the team's mood, so they spend a great deal of invisible energy. Psychology calls this empathy fatigue and emotional labor. The answer is not less empathy but recovery devices: a limit on listening time, a physical activity after hearing something hard, someone of your own to listen to you, and the refusal sentence 'that's difficult for me right now' ready on your tongue. These four are the Lunar type's basic equipment.",
          zh: "共情力与合作性高的人不断接收他人情绪和团队氛围，消耗大量看不见的能量。心理学称之为共情疲劳、情绪劳动。解法不是减少共情，而是设置恢复装置：给倾听时间设限、听完沉重故事后转去做身体活动、另找一个听你说话的人、把“现在不太方便”这句拒绝挂在嘴边。这四样是Lunar类型的基本装备。",
          ja: "共感力と協調性が高い人は人の感情とチームの雰囲気を受け取り続けるので、目に見えないエネルギーを多く使います。心理学ではこれを共感疲労、感情労働と呼びます。解決策は共感を減らすことではなく回復装置を置くことです。聞いてあげる時間に限度を置く、つらい話を聞いた後は体を使う活動に切り替える、自分の話を聞いてくれる人を別に持つ、そして「今は難しい」という断りの一文を口に慣らす。この四つがLunarタイプの基本装備です。",
        },
      },
    ],
  },
];

/** id 로 유형 가이드를 찾는다 */
export function getEnergyTypeGuide(id: string): EnergyTypeGuide | undefined {
  return energyTypeGuides.find((g) => g.id === id);
}

// =====================================================================
// 허브 페이지(/test/guide) 소개글
// =====================================================================

export const energyGuideHub = {
  title: {
    ko: "성향 테스트 가이드 | 자기주장성·성취지향성·독립성·공감력·협력성·직관력 6가지 심리 차원 총정리",
    en: "Personality Dimensions Guide | Assertiveness, Achievement, Independence, Empathy, Collaboration, Intuition",
    zh: "性格倾向测试指南 | 自我主张·成就导向·独立性·共情力·合作性·直觉力 六大心理维度总整理",
    ja: "性格傾向テストガイド | 自己主張性・達成志向・独立性・共感力・協調性・直感力 6つの心理次元まとめ",
  },
  description: {
    ko: "에너지 밸런스 테스트가 재는 여섯 가지 심리 차원을 한 곳에 정리했습니다. 각 성향이 높을 때와 낮을 때의 특징, 직장·연애에서의 모습, 균형 잡는 법, 그리고 Solar·Lunar 두 유형의 설명까지 읽고 3분 테스트로 내 에너지 비율을 확인해 보세요.",
    en: "The six psychological dimensions measured by the Energy Balance Test in one place: what each looks like when high and low, how it shows at work and in love, how to balance it, plus the Solar and Lunar types. Then take the three-minute test.",
    zh: "把能量平衡测试测量的六个心理维度整理在一处：各倾向高与低时的特征、在职场·恋爱中的表现、平衡方法，以及Solar·Lunar两种类型的说明。读完后用3分钟测试确认自己的能量比例。",
    ja: "エネルギーバランス診断が測る六つの心理次元を一か所にまとめました。各傾向が高いときと低いときの特徴、職場・恋愛での姿、バランスの取り方、そしてSolar・Lunar二つのタイプの説明まで読んで、3分テストで自分のエネルギー比率を確認してみてください。",
  },
  keywords: {
    ko: ["성향 테스트", "심리 성향 종류", "성격 차원", "자기주장성 공감력", "에너지 밸런스 테스트", "무료 성격 테스트", "벰 성역할 검사"],
    en: ["personality dimensions", "personality traits explained", "free personality test", "bem sex role inventory", "energy balance test"],
    zh: ["性格倾向测试", "性格维度", "免费性格测试", "能量平衡测试"],
    ja: ["性格傾向 テスト", "性格 次元", "無料 性格診断", "エネルギーバランス診断"],
  },
  heading: {
    ko: "성향 테스트 가이드: 나를 이루는 6가지 심리 차원",
    en: "Personality Guide: The Six Dimensions That Make You",
    zh: "性格倾向指南：构成你的六个心理维度",
    ja: "性格傾向ガイド：あなたを作る6つの心理次元",
  },
  /** 소개글 (한국어 800자 이상). 마지막 문단은 테스트 소개 섹션에 쓴다 */
  intro: {
    ko: "성격을 설명하는 방법은 많지만, 일상에서 실제로 부딪히는 차이는 몇 가지 축으로 모입니다. 할 말을 하는가 삼키는가, 목표를 세우고 밀어붙이는가 흐름에 맡기는가, 혼자 결정하는가 함께 결정하는가, 남의 감정을 먼저 읽는가 사실을 먼저 보는가, 이기는 것이 좋은가 함께 이루는 것이 좋은가, 직감을 믿는가 근거를 기다리는가. 에너지 밸런스 테스트는 이 여섯 가지를 자기주장성, 성취지향성, 독립성, 공감력, 협력성, 직관력이라는 이름으로 재고, 앞의 세 가지를 Solar(태양) 에너지, 뒤의 세 가지를 Lunar(달) 에너지라 부릅니다.\n\n이 틀은 심리학자 산드라 벰(Sandra Bem)이 1974년에 만든 성역할 검사(BSRI)와 카를 융의 아니마·아니무스 개념에서 출발했습니다. 벰의 검사는 사람들이 전통적으로 '남성적', '여성적'이라 부르던 특성을 따로 재어, 한 사람이 두 묶음을 모두 높게 가질 수 있다는 것을 보여 주었습니다. 벰은 그런 사람을 '양성적(androgynous)'이라 불렀고, 상황에 따라 두 묶음을 자유롭게 쓰는 이들이 가장 적응력이 높다고 보고했습니다. 이 테스트가 Solar와 Lunar라는 이름을 쓰는 이유도 거기 있습니다. 성별이 아니라 에너지의 방향을 말하기 위해서입니다.\n\n이 가이드는 여섯 차원을 하나씩 떼어, 각 성향이 높은 사람과 낮은 사람의 모습, 직장·연애·가족에서 어떻게 드러나는지, 지나칠 때와 부족할 때 균형을 잡는 법, 자주 묻는 질문을 정리했습니다. 심리학 용어는 널리 알려진 수준(맥클릴랜드의 성취동기, 데시와 라이언의 자기결정이론, 데이비스의 공감 척도, 빅파이브의 우호성, 카너먼의 시스템 1과 2)에서만 인용했고, 어느 차원도 '높을수록 좋다'고 쓰지 않았습니다. 각 성향에는 빛과 그늘이 함께 있고, 중요한 것은 내 성향을 알고 그 강점을 쓰는 것이기 때문입니다.\n\n테스트는 12문항, 약 3분이 걸립니다. 차원마다 두 문항씩, 네 가지 선택지 가운데 가장 가까운 것을 고르면 여섯 차원의 점수와 Solar·Lunar 비율이 계산되고, 두 합계 중 높은 쪽이 결과 유형이 됩니다. 결과 화면에서는 차원별 막대 그래프로 어느 성향이 두드러지고 어느 성향이 짧은지 볼 수 있으며, 짧은 막대가 곧 성장 지점입니다. 가이드를 먼저 읽어도 좋고, 테스트를 한 뒤 내 결과의 짧은 막대부터 찾아 읽어도 좋습니다.",
    en: "There are many ways to describe personality, but the differences people actually run into day to day gather along a few axes. Do you say it or swallow it; set a goal and push or go with the flow; decide alone or together; read feelings first or facts first; prefer winning or achieving together; trust a hunch or wait for evidence. The Energy Balance Test measures these six as assertiveness, achievement drive, independence, empathy, collaboration and intuition, and calls the first three Solar energy and the last three Lunar energy.\n\nThe frame starts from the Sex Role Inventory that the psychologist Sandra Bem created in 1974 and from Carl Jung's anima and animus. Bem's inventory measured separately the traits people traditionally called masculine and feminine and showed that one person could score high on both. She called such people androgynous and reported that those who used both clusters freely by situation were the most adaptable. That is why this test uses the names Solar and Lunar: to speak of the direction of energy, not of sex.\n\nThis guide takes the six dimensions one at a time: what high and low scorers look like, how each shows at work, in love and in family, how to balance excess and shortage, and frequently asked questions. Psychological terms are cited only at the widely known level, McClelland's achievement motivation, Deci and Ryan's self-determination theory, Davis's empathy scale, Big Five agreeableness, Kahneman's Systems 1 and 2, and no dimension is written up as 'the higher the better'. Each has light and shadow, and what matters is knowing your disposition and using its strengths.\n\nThe test has 12 questions and takes about three minutes. Two questions per dimension, four options each; your choices yield six scores and a Solar-Lunar ratio, and the higher total becomes your type. The result screen shows a bar for each dimension so you can see which stand out and which run short, and the short bars are your growth points. Read the guide first, or take the test and then start with the shortest bar in your result.",
    zh: "描述性格的方法很多，但日常中真正碰到的差异集中在几条轴上：该说的话说还是咽下；定目标推进还是顺其自然；独自决定还是一起决定；先读情绪还是先看事实；喜欢赢还是喜欢一起完成；相信直觉还是等待依据。能量平衡测试把这六项命名为自我主张、成就导向、独立性、共情力、合作性、直觉力来测量，前三项称为Solar（太阳）能量，后三项称为Lunar（月亮）能量。\n\n这一框架源自心理学家桑德拉·贝姆1974年编制的性别角色量表（BSRI）和荣格的阿尼玛·阿尼姆斯概念。贝姆的量表分别测量人们传统上称为“男性化”“女性化”的特质，证明一个人可以两组都高。她把这样的人称为“双性化”，并报告能随情况自由运用两组特质的人适应力最强。本测试使用Solar与Lunar这两个名字正是为此：说的是能量的方向，而非性别。\n\n本指南把六个维度逐一拆开，整理了各倾向高与低的人的表现、在职场·恋爱·家庭中如何显现、过度与不足时如何平衡，以及常见问题。心理学术语只在广为人知的层面引用（麦克利兰的成就动机、德西与瑞安的自我决定理论、戴维斯的共情量表、大五的宜人性、卡尼曼的系统1与2），且没有把任何维度写成“越高越好”。每种倾向都有光与影，重要的是了解自己的倾向并发挥其优点。\n\n测试共12题，约3分钟。每个维度两题，从四个选项中选最接近的，即可算出六个维度的分数与Solar·Lunar比例，两个总分中较高者为结果类型。结果页用各维度条形图显示哪些倾向突出、哪些偏短，偏短的条形就是成长点。可以先读指南，也可以先做测试再从自己结果中最短的条形读起。",
    ja: "性格を説明する方法は多いですが、日常で実際にぶつかる違いはいくつかの軸に集まります。言うべきことを言うか飲み込むか、目標を立てて押し進めるか流れに任せるか、一人で決めるか一緒に決めるか、人の感情を先に読むか事実を先に見るか、勝つのが好きか一緒に成し遂げるのが好きか、直感を信じるか根拠を待つか。エネルギーバランス診断はこの六つを自己主張性、達成志向、独立性、共感力、協調性、直感力という名前で測り、前の三つをSolar（太陽）エネルギー、後の三つをLunar（月）エネルギーと呼びます。\n\nこの枠組みは心理学者サンドラ・ベムが1974年に作った性役割検査（BSRI）とカール・ユングのアニマ・アニムスの概念から出発しました。ベムの検査は人々が伝統的に「男性的」「女性的」と呼んでいた特性を別々に測り、一人の人が二つの群をどちらも高く持てることを示しました。ベムはそうした人を「両性具有的（androgynous）」と呼び、状況に応じて二つの群を自由に使う人が最も適応力が高いと報告しました。このテストがSolarとLunarという名前を使う理由もそこにあります。性別ではなくエネルギーの方向を言うためです。\n\nこのガイドは六つの次元を一つずつ切り離し、各傾向が高い人と低い人の姿、職場・恋愛・家族でどう表れるか、過ぎるときと足りないときにバランスを取る方法、よくある質問をまとめました。心理学用語は広く知られた水準（マクレランドの達成動機、デシとライアンの自己決定理論、デイヴィスの共感尺度、ビッグファイブの協調性、カーネマンのシステム1と2）でのみ引用し、どの次元も「高いほど良い」とは書いていません。各傾向には光と影が一緒にあり、大切なのは自分の傾向を知ってその強みを使うことだからです。\n\nテストは12問、約3分かかります。次元ごとに二問ずつ、四つの選択肢のうち最も近いものを選ぶと六つの次元の点数とSolar・Lunar比率が計算され、二つの合計のうち高い方が結果タイプになります。結果画面では次元別の棒グラフでどの傾向が目立ちどの傾向が短いかを見ることができ、短い棒がそのまま成長点です。ガイドを先に読んでもよく、テストをした後に自分の結果の短い棒から探して読んでもよいでしょう。",
  },
  faq: [
    {
      question: { ko: "이 테스트는 과학적으로 검증된 검사인가요?", en: "Is this a scientifically validated test?", zh: "这个测试经过科学验证吗？", ja: "このテストは科学的に検証された検査ですか？" },
      answer: {
        ko: "아닙니다. 벰의 성역할 검사와 융의 이론에서 틀을 빌려 왔지만, 12문항짜리 자기 점검용 테스트이며 신뢰도·타당도 검증을 거친 심리 검사가 아닙니다. 결과는 자기 성향을 돌아보는 출발점이자 대화의 소재로 쓰시고, 진로·채용·의학적 판단의 근거로는 쓰지 마세요.",
        en: "No. It borrows its frame from Bem's inventory and Jung's theory, but it is a 12-item self-check, not a psychological test that has gone through reliability and validity testing. Use the result as a starting point for reflection and conversation, not as a basis for career, hiring or medical decisions.",
        zh: "不是。它借用了贝姆量表与荣格理论的框架，但只是12题的自测，并非经过信度·效度检验的心理测验。请把结果作为回顾自身倾向的起点与谈资，不要用作职业、招聘、医疗判断的依据。",
        ja: "いいえ。ベムの性役割検査とユングの理論から枠組みを借りてきましたが、12問の自己点検用テストで、信頼性・妥当性の検証を経た心理検査ではありません。結果は自分の傾向を振り返る出発点と会話の材料として使い、進路・採用・医学的判断の根拠には使わないでください。",
      },
    },
    {
      question: { ko: "Solar와 Lunar는 남성적·여성적이라는 뜻인가요?", en: "Do Solar and Lunar mean masculine and feminine?", zh: "Solar和Lunar是指男性化、女性化吗？", ja: "SolarとLunarは男性的・女性的という意味ですか？" },
      answer: {
        ko: "아닙니다. 출발점이 된 벰의 검사가 그런 명칭을 썼던 것은 사실이지만, 벰의 연구 자체가 '이 특성들은 성별과 무관하게 누구나 가질 수 있다'는 것을 보여 주기 위한 것이었습니다. 이 테스트가 태양과 달이라는 이름을 쓰는 이유는 성별이 아니라 '밖으로 뻗는 에너지'와 '안으로 비추는 에너지'라는 방향을 말하기 위해서입니다. 여성 Solar와 남성 Lunar는 똑같이 흔합니다.",
        en: "No. The inventory it starts from did use those labels, but Bem's research itself existed to show that anyone can carry these traits regardless of sex. This test uses the names sun and moon to speak of direction, energy that reaches outward and energy that lights inward, not of sex. Solar women and Lunar men are equally common.",
        zh: "不是。作为起点的贝姆量表确实用过那样的名称，但贝姆研究本身就是为了证明“这些特质与性别无关，人人可有”。本测试用太阳与月亮命名，是为了表达“向外延伸的能量”与“向内照亮的能量”这两种方向，而非性别。女性Solar与男性Lunar同样常见。",
        ja: "いいえ。出発点になったベムの検査がそうした名称を使っていたのは事実ですが、ベムの研究自体が「これらの特性は性別と無関係に誰でも持てる」ことを示すためのものでした。このテストが太陽と月という名前を使う理由は性別ではなく「外へ伸びるエネルギー」と「内を照らすエネルギー」という方向を言うためです。女性のSolarと男性のLunarは同じくらいよくいます。",
      },
    },
    {
      question: { ko: "결과가 매번 다르게 나오는데 왜 그런가요?", en: "Why do I get a different result each time?", zh: "为什么每次结果都不一样？", ja: "結果が毎回違って出るのはなぜですか？" },
      answer: {
        ko: "두 에너지가 균형에 가까운 사람일수록 그날의 기분과 상황에 따라 결과가 바뀝니다. 그것은 오류가 아니라 '상황에 따라 두 에너지를 모두 쓸 수 있다'는 뜻이며, 벰은 이런 유연함을 가장 적응력 높은 상태로 보았습니다. 결과 유형보다 차원별 막대 그래프를 보세요. 여러 번 해도 늘 짧은 막대가 있다면 그것이 진짜 성장 지점입니다.",
        en: "The closer your two energies are to balance, the more the result shifts with the day's mood and situation. That is not an error but a sign that you can use both energies as the situation calls, which Bem regarded as the most adaptable state. Look at the dimension bars rather than the type. A bar that stays short across several tries is your real growth point.",
        zh: "两种能量越接近平衡的人，结果越容易随当天的心情与情境变化。这不是错误，而是“能随情况运用两种能量”的意思，贝姆认为这种灵活性是适应力最强的状态。与其看结果类型，不如看各维度条形图。多次测试仍然偏短的条形，才是真正的成长点。",
        ja: "二つのエネルギーが均衡に近い人ほどその日の気分と状況によって結果が変わります。それは誤りではなく「状況に応じて二つのエネルギーをどちらも使える」という意味で、ベムはこうした柔軟さを最も適応力の高い状態と見ました。結果タイプより次元別の棒グラフを見てください。何度やってもいつも短い棒があれば、それが本当の成長点です。",
      },
    },
  ],
};

// =====================================================================
// 가이드·유형 페이지 공용 UI 문구
// =====================================================================

export const energyGuideTexts = {
  testCrumb: { ko: "에너지 밸런스 테스트", en: "Energy Balance Test", zh: "能量平衡测试", ja: "エネルギーバランス診断" },
  guideCrumb: { ko: "성향 가이드", en: "Personality Guide", zh: "性格倾向指南", ja: "性格傾向ガイド" },
  /** 기존 /test 랜딩 하단에 붙는 한 줄 링크 */
  landingLink: {
    ko: "6가지 성향 차원과 Solar·Lunar 유형 자세히 읽기",
    en: "Read about the six dimensions and the Solar and Lunar types",
    zh: "详细了解六大性格维度与Solar·Lunar类型",
    ja: "6つの性格次元とSolar・Lunarタイプを詳しく読む",
  },
  ctaTest: { ko: "내 에너지 비율 확인하기", en: "Check my energy balance", zh: "查看我的能量比例", ja: "自分のエネルギー比率を確認する" },
  ctaMine: { ko: "나도 테스트해 보기", en: "Take the test myself", zh: "我也要测试", ja: "私もテストしてみる" },
  ctaSub: {
    ko: "12문항 · 약 3분 · 회원가입 없음",
    en: "12 questions · about 3 minutes · no sign-up",
    zh: "12题 · 约3分钟 · 无需注册",
    ja: "12問・約3分・会員登録なし",
  },
  introSection: { ko: "심리학에서 보는 이 성향", en: "What psychology says", zh: "心理学中的这一倾向", ja: "心理学で見るこの傾向" },
  highSection: { ko: "이 성향이 높은 사람", en: "When this trait is high", zh: "该倾向高的人", ja: "この傾向が高い人" },
  lowSection: { ko: "이 성향이 낮은 사람", en: "When this trait is low", zh: "该倾向低的人", ja: "この傾向が低い人" },
  scenesSection: { ko: "상황별로 보면", en: "Situation by situation", zh: "分情境来看", ja: "場面別に見ると" },
  balanceSection: { ko: "균형 잡는 법", en: "Finding balance", zh: "平衡方法", ja: "バランスの取り方" },
  faqSection: { ko: "자주 묻는 질문", en: "Frequently asked questions", zh: "常见问题", ja: "よくある質問" },
  otherTraitsSection: { ko: "다른 성향 차원 보기", en: "Other dimensions", zh: "查看其他维度", ja: "他の性格次元を見る" },
  belongsTo: { ko: "이 차원이 속한 에너지", en: "This dimension belongs to", zh: "该维度所属能量", ja: "この次元が属するエネルギー" },
  traitsSection: { ko: "6가지 성향 차원", en: "The six dimensions", zh: "六大性格维度", ja: "6つの性格次元" },
  typesSection: { ko: "두 가지 결과 유형", en: "The two result types", zh: "两种结果类型", ja: "二つの結果タイプ" },
  aboutTestSection: { ko: "테스트 소개", en: "About the test", zh: "测试介绍", ja: "テストについて" },
  strengths: { ko: "강점", en: "Strengths", zh: "优势", ja: "強み" },
  cautions: { ko: "주의할 점", en: "Watch out for", zh: "注意点", ja: "注意点" },
  growthSection: { ko: "성장 포인트", en: "Growth points", zh: "成长要点", ja: "成長ポイント" },
  typeTraitsSection: { ko: "이 유형을 이루는 세 차원", en: "The three dimensions behind this type", zh: "构成此类型的三个维度", ja: "このタイプを成す三つの次元" },
  otherTypeSection: { ko: "다른 유형 보기", en: "The other type", zh: "查看另一类型", ja: "もう一つのタイプを見る" },
  solarLabel: { ko: "솔라 (태양) 에너지", en: "Solar energy", zh: "太阳能量", ja: "ソーラー（太陽）エネルギー" },
  lunarLabel: { ko: "루나 (달) 에너지", en: "Lunar energy", zh: "月亮能量", ja: "ルナ（月）エネルギー" },
  disclaimer: {
    ko: "이 가이드와 테스트는 심리학 개념을 쉽게 풀어 쓴 자기 이해용 참고 자료이며, 검증된 심리 검사나 진단 도구가 아닙니다.",
    en: "This guide and test are plain-language references for self-understanding based on psychological concepts, not a validated psychological test or diagnostic tool.",
    zh: "本指南与测试是对心理学概念的通俗化诠释，仅供自我了解，不是经过验证的心理测验或诊断工具。",
    ja: "このガイドとテストは心理学の概念をわかりやすく言い換えた自己理解用の参考資料で、検証された心理検査や診断ツールではありません。",
  },
};
