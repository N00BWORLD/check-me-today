// 카테고리 랜딩 페이지(/category/[id]) 검색엔진용 데이터
// - 검색용 제목·메타 설명·키워드·소개글·FAQ 를 4개 언어로 관리한다
// - 어떤 카테고리에 페이지를 만들지는 tests.ts 기준(테스트가 1개 이상 있는 카테고리)으로 자동 판단한다 → getLandingCategories()
// - 새 카테고리를 categories[] 에 추가하면 이 파일의 categorySeo 에도 항목을 추가해야 타입 검사를 통과한다
import {
  categories,
  getTestsByCategory,
  hasCategoryLanding,
  getCategoryPath,
  type Category,
  type CategoryId,
  type TestData,
} from "./tests";

export { getCategoryPath };
import type { LocalizedText } from "./engine/types";

/** 랜딩 페이지 데이터를 반드시 갖춰야 하는 카테고리 id (전체·미사용 id 제외) */
export type LandingCategoryId = Exclude<CategoryId, "all" | "visual-novel">;

/** 소개글 섹션 하나 (문단 구분은 "\n\n") */
export interface CategorySection {
  heading: LocalizedText;
  body: LocalizedText;
}

/** 자주 묻는 질문 하나 */
export interface CategoryFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface CategorySeo {
  /** 검색 결과용 제목. 루트 레이아웃이 " | Check Me Today" 를 붙이므로 사이트명은 넣지 않는다 */
  title: LocalizedText;
  /** 메타 설명 (120~160자 권장) */
  description: LocalizedText;
  /** 핵심 검색 키워드 */
  keywords: Record<keyof LocalizedText, string[]>;
  /** 페이지 H1 */
  heading: LocalizedText;
  /** 소개글 2~3개 섹션 (한국어 기준 합계 600자 이상) */
  sections: CategorySection[];
  /** FAQ 3~5개 */
  faq: CategoryFaq[];
}

export const categorySeo: Record<LandingCategoryId, CategorySeo> = {
  // ───────────────────────── 성격·유형 ─────────────────────────
  personality: {
    title: {
      ko: "성격 유형 테스트 모음 | 무료 성향·심리 테스트",
      en: "Personality Type Tests | Free Personality & Psychology Quizzes",
      zh: "性格类型测试合集 | 免费性格·心理测试",
      ja: "性格タイプ診断まとめ | 無料の性格・心理テスト",
    },
    description: {
      ko: "에너지 밸런스, 소비성향 등 나의 성격 유형을 알아보는 무료 심리 테스트 모음. 회원가입 없이 3분 만에 결과를 확인하고 친구와 공유해 보세요.",
      en: "A free collection of personality type tests, from energy balance to spending habits. No sign-up, results in 3 minutes, easy to share with friends.",
      zh: "能量平衡、消费倾向等了解自己性格类型的免费心理测试合集。无需注册，3分钟出结果，还能和朋友分享。",
      ja: "エネルギーバランス、消費傾向など自分の性格タイプが分かる無料心理テストまとめ。登録不要、3分で結果が出て友達と共有できます。",
    },
    keywords: {
      ko: ["성격 유형 테스트", "성격 테스트", "성향 테스트", "심리 테스트 모음", "무료 심리테스트", "MBTI 테스트", "소비성향 테스트"],
      en: ["personality type test", "personality quiz", "free personality test", "psychology quiz", "spending habits test"],
      zh: ["性格类型测试", "性格测试", "心理测试", "免费心理测试", "消费倾向测试"],
      ja: ["性格タイプ診断", "性格診断", "心理テスト", "無料心理テスト", "消費傾向テスト"],
    },
    heading: {
      ko: "성격 유형 테스트 모음",
      en: "Personality Type Tests",
      zh: "性格类型测试合集",
      ja: "性格タイプ診断まとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "성격·유형 카테고리에는 '나는 어떤 사람인가'를 여러 각도에서 비춰 보는 테스트를 모았습니다. 외향과 내향, 행동과 사색처럼 서로 다른 두 에너지가 내 안에서 어떤 비율로 섞여 있는지 살펴보는 에너지 밸런스 테스트, 돈을 쓰는 방식 속에 숨어 있는 가치관을 읽어 내는 소비성향 테스트처럼 일상의 선택에서 성격을 추론하는 방식입니다.\n\n각 테스트는 심리학에서 널리 쓰이는 성향 분류 개념을 참고해 문항을 구성했고, 결과는 단순히 한 줄 라벨이 아니라 그 유형의 강점과 주의할 점, 잘 맞는 유형까지 함께 설명합니다. 전문 심리 검사를 대신하는 것은 아니지만, 평소 의식하지 못했던 내 반응 패턴을 한 번 되돌아보는 계기로는 충분합니다.",
          en: "This category gathers tests that look at who you are from several angles: the energy balance test measures how introversion and extroversion, action and reflection mix inside you, while the spending habits test reads the values hidden in how you use money.\n\nEach test draws on widely used personality frameworks, and the results explain not just a label but the strengths, blind spots and best-matching types for your profile. They are not a substitute for a clinical assessment, but they are a good starting point for noticing patterns you rarely think about.",
          zh: "性格·类型栏目收集了从多个角度观察“我是什么样的人”的测试：能量平衡测试看外向与内向、行动与思考两种能量在你身上的比例，消费倾向测试则从花钱方式读出隐藏的价值观。\n\n每个测试都参考了心理学中常用的性格分类概念，结果不只是一个标签，还会说明该类型的优点、需要注意的地方以及合拍的类型。它不能代替专业心理测评，但足以成为回顾自己反应模式的一个契机。",
          ja: "性格・タイプのカテゴリには「自分はどんな人か」を様々な角度から映す診断を集めました。外向と内向、行動と思索という二つのエネルギーが自分の中でどんな比率で混ざっているかを見るエネルギーバランス診断、お金の使い方に隠れた価値観を読み取る消費傾向診断などです。\n\n各診断は心理学で広く使われる性格分類の考え方を参考に設問を作り、結果はラベルだけでなく強み・注意点・相性の良いタイプまで説明します。専門的な心理検査の代わりにはなりませんが、普段意識しない自分の反応パターンを振り返るきっかけには十分です。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "MBTI처럼 긴 검사는 부담스럽지만 가볍게 내 성향을 확인하고 싶은 분, 새 학기나 새 직장에서 자기소개 소재가 필요한 분, 친구나 연인과 서로의 결과를 비교하며 이야기를 나누고 싶은 분께 잘 맞습니다. 모든 테스트는 회원가입이나 설치 없이 바로 시작할 수 있고, 10문항 안팎이라 3분이면 끝납니다.\n\n결과 화면에서는 이미지 저장과 카카오톡·링크 공유가 되므로 단체 채팅방에서 '너는 뭐 나왔어?' 하고 묻기 좋습니다. 같은 테스트를 몇 달 뒤에 다시 해 보면 환경이 바뀌면서 달라진 나를 발견하는 재미도 있습니다.",
          en: "Perfect if a full-length assessment feels like too much but you still want a quick read on your tendencies, if you need an ice-breaker for a new class or job, or if you want to compare results with friends and partners. Every test starts instantly with no sign-up and takes about three minutes.\n\nResults can be saved as an image or shared via KakaoTalk and links, so they work well in group chats. Retaking a test a few months later is a fun way to see how a new environment has changed you.",
          zh: "适合觉得 MBTI 这类长测试太费时、只想轻松确认自己倾向的人，需要在新学期或新公司做自我介绍素材的人，以及想和朋友、恋人比较结果聊天的人。所有测试无需注册或安装即可开始，十题左右三分钟就能完成。\n\n结果页支持保存图片和 KakaoTalk、链接分享，很适合在群聊里问一句“你测出来是什么”。几个月后再做一次，还能发现环境变化带来的不同的自己。",
          ja: "MBTIのような長い検査は負担だけれど気軽に自分の傾向を知りたい方、新学期や新しい職場で自己紹介のネタが欲しい方、友達や恋人と結果を比べて話したい方にぴったりです。すべての診断は登録やインストールなしですぐ始められ、10問前後なので3分で終わります。\n\n結果画面では画像保存とカカオトーク・リンク共有ができるので、グループチャットで「何が出た？」と聞くのにも便利です。数か月後にもう一度やってみると、環境の変化で変わった自分に気づく楽しさもあります。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "결과에 적힌 강점은 자기소개서나 면접의 '나의 장점' 문항을 준비할 때 출발점으로 쓸 수 있습니다. 반대로 주의할 점은 스트레스를 받을 때 내가 어떤 식으로 무너지는지 미리 알려 주는 힌트가 됩니다. 소비성향 결과는 이번 달 가계부를 열어 보면서 실제 지출 패턴과 맞는지 대조해 보면 더 유용합니다.\n\n잘 맞는 유형과 부딪히기 쉬운 유형 항목은 가족이나 팀원에게도 같은 테스트를 권해 보고 서로의 결과를 놓고 대화하는 데 쓰면 좋습니다. 유형은 좋고 나쁨이 아니라 '다름'을 설명하는 도구라는 점만 기억해 주세요.",
          en: "Use the strengths in your result as a starting point for the 'what are your strengths' question in applications and interviews, and treat the cautions as early warnings about how you tend to crack under stress. For spending results, compare them with this month's actual expenses.\n\nThe 'good match' and 'likely to clash' sections are most useful when family or teammates take the same test and you talk through the differences together. Types describe difference, not better or worse.",
          zh: "结果中的优点可以作为准备自我介绍或面试“我的长处”问题的起点；需要注意的地方则提示了你在压力下容易出现的状态。消费倾向的结果不妨对照本月账单，看是否与实际支出模式一致。\n\n“合拍的类型”和“容易冲突的类型”适合推荐家人或同事也做同一个测试，然后一起讨论彼此的结果。请记住，类型描述的是“不同”，而不是好坏。",
          ja: "結果に書かれた強みは、履歴書や面接の「あなたの長所」を準備する出発点になります。注意点はストレスを受けたとき自分がどう崩れやすいかを先に教えてくれるヒントです。消費傾向の結果は今月の家計簿と照らし合わせると、より役に立ちます。\n\n相性の良いタイプとぶつかりやすいタイプの項目は、家族やチームメンバーにも同じ診断を勧めて結果を見ながら話すのに向いています。タイプは良し悪しではなく「違い」を説明する道具だということだけ覚えておいてください。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "성격 유형 테스트는 무료인가요?", en: "Are the personality tests free?", zh: "性格类型测试是免费的吗？", ja: "性格タイプ診断は無料ですか？" },
        answer: {
          ko: "네, 모든 테스트는 무료이며 회원가입이나 앱 설치 없이 브라우저에서 바로 할 수 있습니다. 결과 저장과 공유 기능도 무료입니다.",
          en: "Yes. Every test is free and runs in your browser with no sign-up or app install. Saving and sharing results is free too.",
          zh: "是的，所有测试都免费，无需注册或安装应用，在浏览器里即可完成。保存和分享结果也免费。",
          ja: "はい。すべての診断は無料で、登録やアプリのインストールなしにブラウザでそのまま受けられます。結果の保存・共有も無料です。",
        },
      },
      {
        question: { ko: "결과가 정확한가요? 전문 심리검사와 같나요?", en: "How accurate are the results?", zh: "结果准确吗？和专业心理测评一样吗？", ja: "結果は正確ですか？専門的な心理検査と同じですか？" },
        answer: {
          ko: "심리학의 성향 분류 개념을 참고해 만들었지만 전문가가 시행하는 표준화 검사는 아닙니다. 자기 이해와 재미를 위한 도구로 활용해 주세요.",
          en: "The tests draw on established personality concepts, but they are not standardized clinical assessments. Treat them as tools for self-reflection and fun.",
          zh: "测试参考了心理学的性格分类概念，但不是专业人员实施的标准化测评，请把它当作自我了解和娱乐的工具。",
          ja: "心理学の性格分類の考え方を参考にしていますが、専門家が実施する標準化された検査ではありません。自己理解と楽しみのための道具としてご利用ください。",
        },
      },
      {
        question: { ko: "테스트 시간은 얼마나 걸리나요?", en: "How long does a test take?", zh: "做一次测试需要多长时间？", ja: "診断にはどのくらい時間がかかりますか？" },
        answer: {
          ko: "대부분 10문항 안팎으로 2~3분이면 결과를 볼 수 있습니다. 중간에 나가도 다시 처음부터 가볍게 시작할 수 있습니다.",
          en: "Most tests have around ten questions and take two to three minutes. You can always restart from the beginning.",
          zh: "大多数测试在十题左右，两三分钟就能看到结果。中途退出也可以随时重新开始。",
          ja: "ほとんどの診断は10問前後で、2〜3分で結果が見られます。途中でやめても気軽に最初からやり直せます。",
        },
      },
      {
        question: { ko: "결과를 친구와 공유할 수 있나요?", en: "Can I share my result with friends?", zh: "可以把结果分享给朋友吗？", ja: "結果を友達と共有できますか？" },
        answer: {
          ko: "결과 화면의 공유 버튼으로 카카오톡, 링크 복사, 이미지 저장이 가능합니다. 공유한 링크를 열면 같은 결과 카드가 보이고 '나도 테스트하기'로 이어집니다.",
          en: "Use the share buttons on the result screen for KakaoTalk, link copy or image download. Anyone opening the link sees the same result card and can take the test themselves.",
          zh: "结果页的分享按钮支持 KakaoTalk、复制链接和保存图片。打开分享链接会看到同样的结果卡片，并可以直接开始测试。",
          ja: "結果画面の共有ボタンからカカオトーク、リンクコピー、画像保存ができます。共有したリンクを開くと同じ結果カードが表示され、「私もテストする」に進めます。",
        },
      },
    ],
  },

  // ───────────────────────── 연애 ─────────────────────────
  love: {
    title: {
      ko: "연애 심리테스트 모음 | 무료 연애 유형·궁합 테스트",
      en: "Love & Relationship Quizzes | Free Dating Style & Compatibility Tests",
      zh: "恋爱心理测试合集 | 免费恋爱类型·配对测试",
      ja: "恋愛心理テストまとめ | 無料の恋愛タイプ・相性診断",
    },
    description: {
      ko: "나의 연애 스타일, 이상형, 궁합까지 알아보는 무료 연애 심리테스트 모음. 회원가입 없이 3분 만에 결과를 확인하고 연인·썸 상대와 공유해 보세요.",
      en: "Free love and relationship quizzes that reveal your dating style, ideal type and compatibility. No sign-up, results in 3 minutes, perfect to share with your crush or partner.",
      zh: "了解自己的恋爱风格、理想型和配对指数的免费恋爱心理测试合集。无需注册，3分钟出结果，可以和恋人或暧昧对象分享。",
      ja: "自分の恋愛スタイル、理想のタイプ、相性まで分かる無料恋愛心理テストまとめ。登録不要、3分で結果が出て恋人や気になる人と共有できます。",
    },
    keywords: {
      ko: ["연애 심리테스트", "연애 유형 테스트", "연애 스타일 테스트", "궁합 테스트", "이상형 테스트", "커플 테스트", "무료 연애 테스트"],
      en: ["love quiz", "dating style test", "relationship quiz", "compatibility test", "ideal type quiz", "couple quiz"],
      zh: ["恋爱心理测试", "恋爱类型测试", "配对测试", "理想型测试", "情侣测试"],
      ja: ["恋愛心理テスト", "恋愛タイプ診断", "相性診断", "理想のタイプ診断", "カップル診断"],
    },
    heading: {
      ko: "연애 심리테스트 모음",
      en: "Love & Relationship Quizzes",
      zh: "恋爱心理测试合集",
      ja: "恋愛心理テストまとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "연애 카테고리에는 사랑할 때의 나를 들여다보는 테스트를 모았습니다. 썸이 시작될 때 먼저 다가가는 편인지 기다리는 편인지, 연인에게 표현을 많이 하는지 묵묵히 챙기는지, 갈등이 생기면 바로 이야기하는지 혼자 삭이는지처럼 연애에서 반복되는 장면을 문항으로 만들어 나의 연애 유형을 찾아 줍니다.\n\n결과에는 유형의 특징뿐 아니라 어떤 이상형에게 끌리는지, 어떤 유형과 궁합이 좋고 어떤 유형과는 오해가 쌓이기 쉬운지도 함께 담았습니다. 친구들 사이에서 유행하는 연애 심리테스트가 늘 그렇듯 가볍게 즐기는 콘텐츠지만, 문항은 애착 유형과 사랑의 언어 같은 관계 심리학의 개념을 참고해 구성했습니다.",
          en: "The love category gathers quizzes about who you become when you are in love: whether you make the first move or wait, whether you say it out loud or show it quietly, whether you talk through conflict or keep it inside. Everyday relationship moments become questions that reveal your dating style.\n\nResults include your type's traits, the ideal partner you tend to fall for, and which types you click with or misunderstand easily. They are light-hearted, but the questions borrow from relationship psychology concepts such as attachment styles and love languages.",
          zh: "恋爱栏目收集了观察“恋爱中的我”的测试：暧昧刚开始时是主动靠近还是等待，对恋人是常常表达还是默默照顾，发生矛盾时是马上沟通还是自己消化。这些在恋爱里反复出现的场景被做成题目，帮你找到自己的恋爱类型。\n\n结果不仅包含类型特征，还有你容易被什么样的理想型吸引、和哪些类型合拍、和哪些类型容易产生误会。它是轻松的娱乐内容，但题目参考了依恋类型、爱的语言等关系心理学概念。",
          ja: "恋愛カテゴリには、恋をしているときの自分を覗く診断を集めました。気になる人ができたとき先に近づくか待つか、恋人に言葉で表現するか黙って尽くすか、すれ違いが起きたらすぐ話すか一人で抱えるか。恋愛で繰り返される場面を設問にして、自分の恋愛タイプを見つけます。\n\n結果にはタイプの特徴だけでなく、どんな理想のタイプに惹かれやすいか、どのタイプと相性が良く、どのタイプと誤解が生まれやすいかも載せています。気軽に楽しむコンテンツですが、設問は愛着スタイルや愛の言語など関係心理学の概念を参考にしています。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "썸 타는 상대에게 자연스럽게 말을 걸 구실이 필요한 분, 연인과 서로의 연애 스타일을 비교하며 대화하고 싶은 커플, '나는 왜 늘 비슷한 이유로 헤어질까' 궁금한 분께 추천합니다. 소개팅 전에 결과를 프로필 한 줄처럼 공유하면 어색함을 줄이는 데도 도움이 됩니다.\n\n회원가입이나 설치 없이 3분이면 끝나고, 결과 화면에서 카카오톡으로 바로 보낼 수 있어 둘이서 같이 해 보기 좋습니다. 결과 카드는 이미지로 저장되니 SNS 스토리에 올려 반응을 보는 것도 재미있습니다.",
          en: "Great for anyone looking for a natural excuse to text their crush, couples who want to compare dating styles, or people wondering why their relationships keep ending for similar reasons. Sharing a result before a blind date is an easy way to break the ice.\n\nEach quiz takes about three minutes with no sign-up, and results can be sent straight to KakaoTalk, so it is easy to do together. Result cards save as images for your social stories.",
          zh: "推荐给需要一个自然话题去跟暧昧对象搭话的人、想比较彼此恋爱风格的情侣，以及好奇“为什么我总因为类似的原因分手”的人。相亲前把结果像个人简介一样分享出去，也能减少尴尬。\n\n无需注册或安装，三分钟完成，结果页可直接发到 KakaoTalk，适合两个人一起做。结果卡片可保存为图片，发到社交平台看看反应也很有趣。",
          ja: "気になる人に自然に話しかけるきっかけが欲しい方、恋人と互いの恋愛スタイルを比べて話したいカップル、「なぜいつも似た理由で別れるのか」が気になる方におすすめです。初デート前に結果をプロフィールのように共有すれば、気まずさを減らすのにも役立ちます。\n\n登録やインストールなしで3分で終わり、結果画面からカカオトークですぐ送れるので二人で一緒にやるのに向いています。結果カードは画像として保存できるので、SNSのストーリーに上げて反応を見るのも楽しいです。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "결과의 '잘 맞는 유형'과 '부딪히기 쉬운 유형'은 상대를 평가하는 기준이 아니라 대화를 여는 재료로 쓰는 것이 가장 좋습니다. 서로 다른 유형이 나왔다면 '네 유형은 표현을 자주 원한대, 나는 그게 부족했던 것 같아'처럼 결과를 핑계 삼아 평소 말하기 어려웠던 이야기를 꺼내 보세요.\n\n혼자 결과를 볼 때는 유형 설명 중에서 '맞다' 싶은 문장과 '아닌데' 싶은 문장을 하나씩 골라 보세요. 두 문장 사이의 간격이 지금 내 연애에서 바라는 것과 실제 모습 사이의 간격일 때가 많습니다.",
          en: "Treat the 'good match' and 'likely to clash' sections as conversation starters, not as a verdict on your partner. If you got different types, use the result as an excuse to bring up things that were hard to say before.\n\nWhen reading alone, pick one sentence that feels true and one that feels wrong. The gap between them often mirrors the gap between what you want from your relationship and how you actually behave.",
          zh: "结果中的“合拍的类型”和“容易冲突的类型”最好当作打开话题的素材，而不是评价对方的标准。如果两个人类型不同，可以借结果说出平时不好开口的话。\n\n一个人看结果时，试着各挑一句“说得对”和“不是这样”的句子。两句话之间的差距，往往就是你在恋爱中想要的样子和实际表现之间的差距。",
          ja: "結果の「相性の良いタイプ」と「ぶつかりやすいタイプ」は、相手を評価する基準ではなく会話を開く材料として使うのが一番です。違うタイプが出たら、結果を口実にして普段言いにくかった話を切り出してみてください。\n\n一人で結果を見るときは、タイプの説明の中から「当たっている」と思う文と「違う」と思う文を一つずつ選んでみましょう。その二つの間の距離が、今の恋愛で望むものと実際の姿との距離であることがよくあります。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "연애 심리테스트는 무료인가요?", en: "Are the love quizzes free?", zh: "恋爱心理测试是免费的吗？", ja: "恋愛心理テストは無料ですか？" },
        answer: {
          ko: "네, 모든 연애 테스트는 무료이고 회원가입 없이 바로 시작할 수 있습니다. 결과 저장과 공유도 무료입니다.",
          en: "Yes. Every quiz is free and starts instantly with no sign-up. Saving and sharing results is free too.",
          zh: "是的，所有恋爱测试都免费，无需注册即可开始，保存和分享结果也免费。",
          ja: "はい。すべての恋愛テストは無料で、登録なしにすぐ始められます。結果の保存・共有も無料です。",
        },
      },
      {
        question: { ko: "솔로도 할 수 있나요?", en: "Can I take them if I'm single?", zh: "单身也可以做吗？", ja: "恋人がいなくてもできますか？" },
        answer: {
          ko: "물론입니다. 문항은 '이런 상황이라면 나는?'을 상상하며 답하는 방식이라 현재 연애 중이 아니어도 나의 연애 유형과 이상형을 알 수 있습니다.",
          en: "Of course. Questions ask how you would react in a given situation, so you can discover your dating style and ideal type even when you are not seeing anyone.",
          zh: "当然可以。题目是想象“如果遇到这种情况我会怎么做”来回答的，所以即使目前没有恋爱也能了解自己的恋爱类型和理想型。",
          ja: "もちろんです。設問は「こんな状況なら自分は？」と想像して答える形式なので、今恋愛中でなくても恋愛タイプと理想のタイプが分かります。",
        },
      },
      {
        question: { ko: "연인과 궁합을 볼 수 있나요?", en: "Can we check our compatibility as a couple?", zh: "可以查看和恋人的配对指数吗？", ja: "恋人との相性を見ることはできますか？" },
        answer: {
          ko: "각자 테스트를 한 뒤 결과의 '잘 맞는 유형'과 '부딪히기 쉬운 유형' 항목에서 서로의 유형을 찾아보면 됩니다. 결과를 공유하면 상대가 바로 자기 테스트로 이어갈 수 있습니다.",
          en: "Take the quiz separately, then look for each other's type in the 'good match' and 'likely to clash' sections. Sharing your result lets your partner jump straight into their own quiz.",
          zh: "两个人各自测试后，在结果的“合拍的类型”和“容易冲突的类型”中找到对方的类型即可。分享结果后对方可以直接开始自己的测试。",
          ja: "それぞれ診断した後、結果の「相性の良いタイプ」と「ぶつかりやすいタイプ」の項目でお互いのタイプを探してみてください。結果を共有すると相手もすぐ自分の診断に進めます。",
        },
      },
      {
        question: { ko: "결과는 어디에 저장되나요?", en: "Where are my answers stored?", zh: "我的答案会被保存吗？", ja: "回答はどこに保存されますか？" },
        answer: {
          ko: "답변 내용은 서버에 저장하지 않습니다. 결과 유형은 공유 링크 주소에만 담기므로 링크를 닫으면 남지 않습니다.",
          en: "Your answers are not stored on our servers. The result type lives only in the share link, so nothing remains once you close it.",
          zh: "答题内容不会保存在服务器上。结果类型只包含在分享链接里，关闭链接后不会留下记录。",
          ja: "回答内容はサーバーに保存しません。結果タイプは共有リンクのURLにだけ含まれるので、リンクを閉じれば残りません。",
        },
      },
    ],
  },

  // ───────────────────────── 동물 ─────────────────────────
  animal: {
    title: {
      ko: "동물 심리테스트 모음 | 나와 닮은 동물 찾기 테스트",
      en: "Animal Personality Tests | Which Animal Are You?",
      zh: "动物心理测试合集 | 找到和你最像的动物",
      ja: "動物心理テストまとめ | 自分に似た動物を探す診断",
    },
    description: {
      ko: "행동 습성으로 알아보는 나의 동물 자아 테스트. 여우, 고양이, 곰 등 어떤 동물과 닮았는지 3분 만에 무료로 확인하고 친구와 비교해 보세요.",
      en: "Find your inner animal through behaviour patterns. Discover whether you are a fox, a cat or a bear in three minutes, free, and compare with friends.",
      zh: "通过行为习性找到你的动物自我。3分钟免费测出你像狐狸、猫还是熊，并和朋友比较。",
      ja: "行動習性から分かる自分の動物キャラ診断。キツネ、ネコ、クマなどどの動物に似ているか3分で無料チェックして友達と比べてみましょう。",
    },
    keywords: {
      ko: ["동물 테스트", "나와 닮은 동물 테스트", "동물 자아 테스트", "동물상 테스트", "동물 심리테스트", "무료 심리테스트"],
      en: ["animal personality test", "which animal are you", "spirit animal quiz", "inner animal test"],
      zh: ["动物测试", "动物性格测试", "我像什么动物", "动物心理测试"],
      ja: ["動物診断", "動物キャラ診断", "自分に似た動物", "動物心理テスト"],
    },
    heading: {
      ko: "동물 심리테스트 모음",
      en: "Animal Personality Tests",
      zh: "动物心理测试合集",
      ja: "動物心理テストまとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "동물 카테고리에는 내 성격을 동물에 빗대어 보는 테스트를 모았습니다. 얼굴 생김새로 동물상을 고르는 방식이 아니라, 낯선 무리에 들어갔을 때 어떻게 행동하는지, 위협을 느끼면 맞서는지 숨는지, 먹이를 모아 두는지 그때그때 구하는지 같은 동물의 행동 습성을 사람의 일상 장면으로 바꿔 질문합니다.\n\n여우처럼 눈치가 빠른 유형, 고양이처럼 혼자만의 영역이 중요한 유형, 곰처럼 느긋하지만 한 번 화나면 무서운 유형 등 결과마다 그 동물의 생태와 사람의 성향을 연결해 설명합니다. 동물이라는 친숙한 비유 덕분에 성격 테스트 중에서도 가장 이야기하기 쉽고 기억에 오래 남는 결과가 나옵니다.",
          en: "The animal category turns your personality into an animal, not by how you look but by how you behave: how you act in a new group, whether you fight or hide when threatened, whether you stockpile or live day to day. Animal behaviour patterns become everyday human situations.\n\nEach result connects an animal's ecology to a human tendency, from the quick-witted fox to the territory-loving cat to the easy-going but formidable bear. The familiar metaphor makes these the easiest results to talk about and the hardest to forget.",
          zh: "动物栏目收集了把自己的性格比作动物的测试。不是按长相选动物脸，而是把动物的行为习性换成人的日常场景来提问：进入陌生群体时怎么做，感到威胁时是对抗还是躲藏，是囤粮还是随吃随找。\n\n每个结果都把该动物的生态和人的倾向联系起来说明：像狐狸一样机灵、像猫一样重视自己的领地、像熊一样慵懒但发火时很可怕。因为用了熟悉的动物比喻，这是性格测试中最容易聊起来、也最让人记得住的结果。",
          ja: "動物カテゴリには、自分の性格を動物にたとえてみる診断を集めました。顔立ちで動物顔を選ぶのではなく、見知らぬ群れに入ったときどう振る舞うか、脅威を感じたら立ち向かうか隠れるか、食べ物をためておくかその都度探すかといった動物の行動習性を、人の日常場面に置き換えて質問します。\n\nキツネのように察しが早いタイプ、ネコのように自分だけの領域が大事なタイプ、クマのようにのんびりしているが一度怒ると怖いタイプなど、結果ごとにその動物の生態と人の傾向をつなげて説明します。身近な動物のたとえのおかげで、性格診断の中でも一番話題にしやすく記憶に残る結果になります。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "딱딱한 성격 검사 대신 귀엽고 가벼운 결과를 받아 보고 싶은 분, 단체 채팅방이나 모임에서 '나는 무슨 동물이게?' 하고 던질 이야깃거리가 필요한 분, 아이와 함께 할 수 있는 테스트를 찾는 분께 잘 맞습니다. 문항이 짧고 그림처럼 떠올리기 쉬워 초등학생도 부모와 같이 풀 수 있습니다.\n\n모든 테스트는 무료이고 회원가입 없이 바로 시작할 수 있으며, 결과 카드에는 동물 이모지와 유형 이름이 크게 들어가 프로필 사진이나 스토리에 올리기 좋습니다. 10문항 안팎이라 3분이면 끝나고, 결과 화면에서 카카오톡과 링크로 바로 공유할 수 있어 여러 명이 돌아가며 해 보기에도 부담이 없습니다.",
          en: "Ideal if you want a cute, light-hearted result instead of a formal assessment, if you need something to throw into a group chat, or if you are looking for a quiz to do with your kids. The short, visual questions work for children with a parent's help.\n\nEverything is free with no sign-up, and result cards feature a big animal emoji and type name that look great as a profile picture or story.",
          zh: "适合想要可爱、轻松的结果而不是正式性格测评的人，需要在群聊或聚会上抛出“猜猜我是什么动物”话题的人，以及在找可以和孩子一起做的测试的人。题目简短、画面感强，小学生在父母陪伴下也能完成。\n\n所有测试免费、无需注册即可开始，结果卡片上有大大的动物表情和类型名称，很适合当头像或发到动态。",
          ja: "堅い性格検査ではなく可愛くて軽い結果を受け取りたい方、グループチャットや集まりで「私は何の動物でしょう？」と投げかける話題が欲しい方、子どもと一緒にできる診断を探している方にぴったりです。設問が短く絵のように想像しやすいので、小学生でも親と一緒に解けます。\n\nすべての診断は無料で登録なしにすぐ始められ、結果カードには動物の絵文字とタイプ名が大きく入るのでプロフィール画像やストーリーに上げるのに向いています。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "결과에 나온 동물의 습성 설명을 읽으면서 '나도 스트레스를 받으면 이렇게 숨는구나' 하고 내 행동 패턴을 객관화해 보세요. 성격을 직접 말하기 어색할 때 '저는 고양이 유형이라 혼자 충전하는 시간이 필요해요'처럼 동물에 빗대면 가족이나 동료에게 내 성향을 설명하기가 훨씬 쉬워집니다.\n\n모임에서는 모두의 동물을 모아 '우리 팀 동물원'을 만들어 보세요. 서로 다른 동물이 어떻게 어울리는지 이야기하다 보면 팀 안의 역할 분담이 자연스럽게 보입니다.",
          en: "Read the description of your animal's habits and notice your own patterns, like how you hide when stressed. When describing yourself feels awkward, the animal metaphor makes it easy: 'I'm a cat type, I need alone time to recharge.'\n\nIn a group, collect everyone's animal and build your 'team zoo'. Talking about how the different animals get along naturally reveals the roles people play on the team.",
          zh: "读一读结果中动物习性的说明，把自己的行为模式客观化：“原来我压力大的时候也会这样躲起来”。直接说性格不好意思时，用动物来比喻会容易得多，比如“我是猫型，需要独处充电的时间”。\n\n在聚会上收集大家的动物，组成“我们的团队动物园”。聊聊不同动物怎么相处，团队里的角色分工就自然显现出来了。",
          ja: "結果に出た動物の習性の説明を読みながら、「自分もストレスを受けるとこうやって隠れるんだ」と行動パターンを客観視してみてください。性格を直接言うのが気恥ずかしいとき、「私はネコタイプだから一人で充電する時間が必要」と動物にたとえると、家族や同僚に自分の傾向を説明しやすくなります。\n\n集まりでは全員の動物を集めて「うちのチーム動物園」を作ってみましょう。違う動物がどう付き合うかを話すうちに、チーム内の役割分担が自然に見えてきます。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "동물상 테스트와 같은 건가요?", en: "Is this the same as an animal-face test?", zh: "和动物脸测试是一样的吗？", ja: "動物顔診断と同じですか？" },
        answer: {
          ko: "아닙니다. 얼굴 생김새가 아니라 행동 습성과 선택을 바탕으로 성격과 닮은 동물을 찾습니다. 사진은 필요하지 않습니다.",
          en: "No. It matches your personality to an animal through behaviour and choices, not facial features. No photo is needed.",
          zh: "不是。它不是看长相，而是根据行为习性和选择来找到与性格相似的动物，不需要照片。",
          ja: "いいえ。顔立ちではなく行動習性と選択をもとに性格の似た動物を探します。写真は必要ありません。",
        },
      },
      {
        question: { ko: "어떤 동물이 나올 수 있나요?", en: "Which animals can I get?", zh: "可能测出哪些动物？", ja: "どんな動物が出ますか？" },
        answer: {
          ko: "여우, 고양이, 곰, 강아지, 사자, 토끼 등 성향이 뚜렷한 동물들이 결과로 나옵니다. 각 테스트 페이지에서 결과 유형 목록을 미리 볼 수 있습니다.",
          en: "Results include animals with distinct personalities such as the fox, cat, bear, dog, lion and rabbit. Each test page lists its result types in advance.",
          zh: "结果包括狐狸、猫、熊、狗、狮子、兔子等性格鲜明的动物。各测试页面可以提前查看结果类型列表。",
          ja: "キツネ、ネコ、クマ、イヌ、ライオン、ウサギなど性格のはっきりした動物が結果として出ます。各診断ページで結果タイプの一覧を事前に見られます。",
        },
      },
      {
        question: { ko: "아이와 함께 해도 되나요?", en: "Can children take the test?", zh: "可以和孩子一起做吗？", ja: "子どもと一緒にやっても大丈夫ですか？" },
        answer: {
          ko: "네, 문항이 쉽고 자극적인 내용이 없어 부모와 함께 풀기 좋습니다. 결과를 보며 서로의 성격을 이야기하는 놀이로 활용해 보세요.",
          en: "Yes. The questions are simple and family-friendly, so they work well with a parent. Use the results as a game to talk about each other's personalities.",
          zh: "可以。题目简单、没有刺激性内容，适合父母陪同完成。可以把结果当作聊彼此性格的小游戏。",
          ja: "はい。設問が易しく刺激的な内容もないので親子で解くのに向いています。結果を見ながらお互いの性格を話す遊びとして活用してみてください。",
        },
      },
    ],
  },

  // ───────────────────────── 퀴즈 ─────────────────────────
  // 현재 테스트가 없어 페이지가 만들어지지 않지만, tests.ts 에 quiz 카테고리 테스트가 추가되면 자동으로 포함된다
  quiz: {
    title: {
      ko: "퀴즈 모음 | 무료 상식·재미 퀴즈",
      en: "Quiz Collection | Free Trivia & Fun Quizzes",
      zh: "问答合集 | 免费常识·趣味问答",
      ja: "クイズまとめ | 無料の雑学・おもしろクイズ",
    },
    description: {
      ko: "상식, 맞춤법, 넌센스까지 가볍게 즐기는 무료 퀴즈 모음. 회원가입 없이 바로 풀고 점수를 친구와 비교해 보세요.",
      en: "Free quizzes on trivia, spelling and riddles. Play instantly with no sign-up and compare scores with friends.",
      zh: "常识、拼写、脑筋急转弯等轻松有趣的免费问答合集。无需注册即可作答，并和朋友比较分数。",
      ja: "雑学、正しい表記、なぞなぞまで気軽に楽しめる無料クイズまとめ。登録なしですぐ解いて友達と点数を比べましょう。",
    },
    keywords: {
      ko: ["퀴즈", "상식 퀴즈", "넌센스 퀴즈", "맞춤법 퀴즈", "무료 퀴즈"],
      en: ["quiz", "trivia quiz", "fun quiz", "free quiz"],
      zh: ["问答", "常识问答", "趣味问答", "免费问答"],
      ja: ["クイズ", "雑学クイズ", "おもしろクイズ", "無料クイズ"],
    },
    heading: {
      ko: "퀴즈 모음",
      en: "Quiz Collection",
      zh: "问答合集",
      ja: "クイズまとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "퀴즈 카테고리에는 정답이 있는 문제를 풀고 점수를 확인하는 콘텐츠를 모읍니다. 일반 상식과 시사, 헷갈리기 쉬운 맞춤법, 머리를 말랑하게 풀어 주는 넌센스처럼 주제별로 나뉘며, 성격 테스트와 달리 맞고 틀림이 분명해 친구들과 점수를 겨루는 재미가 있습니다.\n\n문제는 한 번에 10문항 안팎으로 구성해 쉬는 시간이나 이동 중에 가볍게 풀 수 있도록 했고, 결과 화면에서는 틀린 문제의 해설을 함께 보여 줍니다.",
          en: "The quiz category collects content with right answers and a score: general knowledge, current affairs, tricky spelling and brain-teasing riddles. Unlike personality tests there is a clear right and wrong, which makes competing with friends fun.\n\nEach quiz has around ten questions so it fits a coffee break or a commute, and the result screen explains the questions you missed.",
          zh: "问答栏目收集有标准答案、可以看分数的内容：一般常识与时事、容易混淆的拼写、让大脑放松的脑筋急转弯。和性格测试不同，对错分明，和朋友比分数很有乐趣。\n\n每次十题左右，适合休息时间或通勤途中轻松作答，结果页还会显示错题解析。",
          ja: "クイズカテゴリには正解のある問題を解いて点数を確認するコンテンツを集めます。一般常識や時事、間違えやすい表記、頭を柔らかくするなぞなぞなどテーマ別に分かれ、性格診断と違って正誤がはっきりしているので友達と点数を競う楽しさがあります。\n\n問題は一度に10問前後で、休み時間や移動中に気軽に解けるようにし、結果画面では間違えた問題の解説も一緒に表示します。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "짧은 시간에 두뇌를 깨우고 싶은 분, 모임에서 팀을 나눠 대결할 거리가 필요한 분, 맞춤법이나 상식을 재미있게 복습하고 싶은 학생과 직장인께 추천합니다. 모든 퀴즈는 무료이고 회원가입이 필요 없습니다.",
          en: "Recommended for anyone who wants a quick brain warm-up, groups that need a team challenge, and students or office workers who want to brush up on spelling and trivia in a fun way. All quizzes are free with no sign-up.",
          zh: "推荐给想在短时间内唤醒大脑的人、聚会上需要分组对抗项目的人，以及想有趣地复习拼写和常识的学生与上班族。所有问答免费、无需注册。",
          ja: "短時間で頭を目覚めさせたい方、集まりでチームに分かれて対決するネタが欲しい方、表記や常識を楽しく復習したい学生・社会人におすすめです。すべてのクイズは無料で登録不要です。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "점수 화면을 캡처해 단체 채팅방에 올리고 가장 높은 점수를 겨뤄 보세요. 틀린 문제의 해설은 바로 메모해 두면 다음에 같은 실수를 줄일 수 있습니다. 같은 퀴즈를 며칠 뒤 다시 풀어 점수가 얼마나 올랐는지 확인하는 것도 좋은 복습 방법입니다.",
          en: "Screenshot your score for the group chat and compete for the top spot. Jot down the explanations for missed questions, and retake the quiz a few days later to see how much you improved.",
          zh: "把分数页面截图发到群聊，比比谁最高。错题解析及时记下来，下次就能少犯同样的错误。几天后再做一次同样的问答，看看分数提高了多少，也是不错的复习方法。",
          ja: "点数画面をキャプチャしてグループチャットに上げ、最高点を競ってみましょう。間違えた問題の解説はすぐメモしておくと次に同じミスを減らせます。数日後に同じクイズを解き直して点数がどれだけ上がったか確認するのも良い復習方法です。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "퀴즈는 무료인가요?", en: "Are the quizzes free?", zh: "问答是免费的吗？", ja: "クイズは無料ですか？" },
        answer: {
          ko: "네, 모든 퀴즈는 무료이며 회원가입 없이 바로 풀 수 있습니다.",
          en: "Yes. Every quiz is free and playable without signing up.",
          zh: "是的，所有问答都免费，无需注册即可作答。",
          ja: "はい。すべてのクイズは無料で、登録なしにすぐ解けます。",
        },
      },
      {
        question: { ko: "정답과 해설을 볼 수 있나요?", en: "Can I see answers and explanations?", zh: "可以查看答案和解析吗？", ja: "正解と解説は見られますか？" },
        answer: {
          ko: "결과 화면에서 각 문제의 정답과 짧은 해설을 확인할 수 있습니다.",
          en: "The result screen shows the correct answer and a short explanation for each question.",
          zh: "结果页会显示每道题的正确答案和简短解析。",
          ja: "結果画面で各問題の正解と短い解説を確認できます。",
        },
      },
      {
        question: { ko: "점수를 친구와 비교할 수 있나요?", en: "Can I compare scores with friends?", zh: "可以和朋友比较分数吗？", ja: "点数を友達と比べられますか？" },
        answer: {
          ko: "결과 화면의 공유 버튼으로 점수 카드를 보내면 친구도 같은 퀴즈를 풀고 점수를 비교할 수 있습니다.",
          en: "Share your score card from the result screen and your friends can play the same quiz and compare.",
          zh: "用结果页的分享按钮发送分数卡片，朋友也可以做同一个问答并比较分数。",
          ja: "結果画面の共有ボタンで点数カードを送れば、友達も同じクイズを解いて点数を比べられます。",
        },
      },
    ],
  },

  // ───────────────────────── 사회생활 ─────────────────────────
  social: {
    title: {
      ko: "직장인 심리테스트 모음 | 사회생활·스트레스 유형 테스트",
      en: "Work & Social Life Tests | Workplace Stress & Personality Quizzes",
      zh: "职场心理测试合集 | 社会生活·压力类型测试",
      ja: "社会人向け心理テストまとめ | 職場ストレス・社会生活タイプ診断",
    },
    description: {
      ko: "직장 스트레스 대처 유형, 회사에서의 나의 모습 등 사회생활 속 나를 알아보는 무료 심리테스트 모음. 회원가입 없이 3분 만에 결과를 확인하세요.",
      en: "Free quizzes about who you are at work: stress-coping types, office personas and more. No sign-up, results in three minutes.",
      zh: "职场压力应对类型、公司里的自己等了解社会生活中的你的免费心理测试合集。无需注册，3分钟出结果。",
      ja: "職場ストレス対処タイプ、会社での自分の姿など社会生活の中の自分が分かる無料心理テストまとめ。登録なし、3分で結果が出ます。",
    },
    keywords: {
      ko: ["직장인 심리테스트", "직장 스트레스 테스트", "스트레스 유형 테스트", "번아웃 테스트", "사회생활 테스트", "회사 생활 테스트"],
      en: ["work stress test", "workplace personality quiz", "burnout test", "office personality test"],
      zh: ["职场心理测试", "职场压力测试", "压力类型测试", "倦怠测试"],
      ja: ["社会人心理テスト", "職場ストレス診断", "ストレスタイプ診断", "燃え尽き診断"],
    },
    heading: {
      ko: "직장인·사회생활 심리테스트 모음",
      en: "Work & Social Life Tests",
      zh: "职场·社会生活心理测试合集",
      ja: "社会人・社会生活の心理テストまとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "사회생활 카테고리에는 회사, 학교, 모임처럼 여러 사람과 부대끼는 자리에서의 나를 살펴보는 테스트를 모았습니다. 마감이 몰릴 때 정면으로 부딪히는지 일단 피하는지, 상사의 지적을 혼자 삭이는지 동료에게 털어놓는지, 회식과 점심 약속을 즐기는지 피곤해하는지처럼 직장인이라면 누구나 겪는 장면을 문항으로 만들어 스트레스 대처 유형과 관계 맺기 방식을 알려 줍니다.\n\n문항은 스트레스 대처 전략(문제 중심·정서 중심·회피)과 번아웃 연구에서 다루는 개념을 참고해 구성했습니다. 결과에는 유형별 특징과 함께 '이 유형이 무너지기 전에 나타나는 신호', '지금 당장 해 볼 수 있는 대처법'을 담아 가볍게 읽고도 실제로 써먹을 수 있게 했습니다.",
          en: "The social life category looks at who you are among other people, at work, at school and in groups: whether you charge at a deadline or dodge it, whether you swallow criticism or vent to a colleague, whether team dinners energise or drain you. Everyday workplace scenes become questions that reveal your stress-coping type and relationship style.\n\nThe questions draw on coping-strategy research (problem-focused, emotion-focused, avoidant) and burnout studies. Each result lists the warning signs that appear before you burn out and coping tactics you can try today.",
          zh: "社会生活栏目收集了观察自己在公司、学校、聚会等与人相处场合中的样子的测试：截止日期堆在一起时是迎面硬上还是先躲开，被上司指出问题时是自己消化还是向同事倾诉，聚餐和午饭约会是享受还是疲惫。这些上班族都会遇到的场景被做成题目，告诉你压力应对类型和建立关系的方式。\n\n题目参考了压力应对策略（问题导向、情绪导向、回避）和职业倦怠研究中的概念。结果除了类型特征，还包含“这个类型崩溃前出现的信号”和“现在就能尝试的应对方法”，轻松读完也能实际用上。",
          ja: "社会生活カテゴリには、会社・学校・集まりなど大勢の人と関わる場での自分を見る診断を集めました。締め切りが重なったとき正面からぶつかるかひとまず避けるか、上司の指摘を一人で抱えるか同僚に打ち明けるか、飲み会やランチの約束を楽しむか疲れるか。社会人なら誰もが経験する場面を設問にして、ストレス対処タイプと人間関係の築き方を教えてくれます。\n\n設問はストレス対処戦略（問題焦点型・情動焦点型・回避型）や燃え尽き研究で扱われる概念を参考に作りました。結果にはタイプ別の特徴とともに「このタイプが崩れる前に現れるサイン」「今すぐ試せる対処法」を載せ、気軽に読んでも実際に使えるようにしています。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "요즘 회사만 가면 기운이 빠지는데 이유를 모르겠는 분, 팀원이나 동기와 서로의 업무 스타일을 비교해 보고 싶은 분, 신입사원 교육이나 워크숍에서 아이스브레이킹 소재가 필요한 분께 추천합니다. 취업 준비생이라면 '스트레스를 어떻게 해소하나요?' 같은 면접 단골 질문을 준비하는 데도 도움이 됩니다.\n\n모든 테스트는 무료이고 회원가입 없이 3분이면 끝나며, 결과 카드는 카카오톡과 링크로 바로 공유할 수 있어 팀 채팅방에서 함께 해 보기 좋습니다.",
          en: "Recommended if work drains you and you cannot tell why, if you want to compare work styles with teammates, or if you need an ice-breaker for onboarding or a workshop. Job seekers can use the results to prepare for the classic 'how do you handle stress' interview question.\n\nEvery test is free, takes three minutes with no sign-up, and result cards share straight to KakaoTalk or a link for team chats.",
          zh: "推荐给最近一上班就没精神却不知道原因的人、想和组员或同期比较工作风格的人，以及在新人培训或工作坊需要破冰素材的人。求职者也可以用结果来准备“你怎么缓解压力”这类面试常见问题。\n\n所有测试免费、无需注册、三分钟完成，结果卡片可以直接通过 KakaoTalk 和链接分享，适合在团队群聊里一起做。",
          ja: "最近会社に行くだけで気力が抜けるのに理由が分からない方、チームメンバーや同期と仕事のスタイルを比べたい方、新入社員研修やワークショップでアイスブレイクのネタが欲しい方におすすめです。就活中なら「ストレスをどう解消しますか」といった面接の定番質問の準備にも役立ちます。\n\nすべての診断は無料で登録なしに3分で終わり、結果カードはカカオトークやリンクですぐ共有できるのでチームのチャットで一緒にやるのに向いています。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "결과의 '무너지기 전 신호' 항목을 메모해 두었다가 그 신호가 보이면 조언에 적힌 대처법을 하나만 실천해 보세요. 유형이 다른 동료와 결과를 나누면 '저 사람은 피하는 게 아니라 정리할 시간이 필요한 거구나'처럼 오해가 풀리는 경우가 많습니다.\n\n팀장이라면 팀원들의 유형을 모아 보는 것만으로도 누구에게 급한 일을, 누구에게 꼼꼼한 일을 맡기면 좋을지 힌트를 얻을 수 있습니다. 다만 결과는 참고용이며 진단이 아니므로, 번아웃이 의심될 정도로 힘들다면 전문가와 상담하시길 권합니다.",
          en: "Note the 'warning signs' from your result and, when you spot one, try just one of the suggested coping tactics. Sharing results with colleagues of other types often clears up misunderstandings: 'they are not avoiding me, they need time to sort things out.'\n\nTeam leads can get hints about who suits urgent work and who suits detailed work just by looking at the team's types. Results are for reference, not diagnosis; if you suspect burnout, please talk to a professional.",
          zh: "把结果里“崩溃前的信号”记下来，发现信号时就实践建议中的一个应对方法。和类型不同的同事分享结果，常常能化解误会：“原来他不是在回避，而是需要整理的时间”。\n\n如果你是组长，只要收集组员的类型，就能得到把紧急的事交给谁、把细致的事交给谁的提示。不过结果仅供参考，不是诊断，如果累到怀疑自己职业倦怠，建议咨询专业人士。",
          ja: "結果の「崩れる前のサイン」をメモしておき、そのサインが見えたらアドバイスにある対処法を一つだけ実践してみてください。タイプの違う同僚と結果を分かち合うと「あの人は避けているんじゃなく整理する時間が必要なんだ」と誤解が解けることがよくあります。\n\nチームリーダーならメンバーのタイプを集めて見るだけでも、誰に急ぎの仕事を、誰に細かい仕事を任せると良いかヒントが得られます。ただし結果は参考用で診断ではないので、燃え尽きが疑われるほどつらいときは専門家への相談をおすすめします。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "직장인이 아니어도 할 수 있나요?", en: "Can I take these if I don't work in an office?", zh: "不是上班族也可以做吗？", ja: "会社員でなくてもできますか？" },
        answer: {
          ko: "네, 학교나 동아리, 아르바이트처럼 여러 사람과 함께하는 자리를 떠올리며 답하면 됩니다. 스트레스 대처 방식은 어디서든 비슷하게 나타납니다.",
          en: "Yes. Answer with school, clubs or part-time work in mind. Stress-coping styles show up the same way anywhere.",
          zh: "可以。想着学校、社团或兼职等和很多人一起的场合来回答即可，压力应对方式在哪里都类似。",
          ja: "はい。学校やサークル、アルバイトなど大勢の人と一緒の場を思い浮かべて答えれば大丈夫です。ストレス対処の仕方はどこでも似た形で現れます。",
        },
      },
      {
        question: { ko: "결과가 회사에 공유되나요?", en: "Will my result be shared with my employer?", zh: "结果会被公司看到吗？", ja: "結果は会社に共有されますか？" },
        answer: {
          ko: "아닙니다. 답변은 서버에 저장되지 않으며 결과는 본인이 공유 버튼을 눌렀을 때만 링크로 전달됩니다.",
          en: "No. Answers are not stored, and results are only passed on as a link when you press share yourself.",
          zh: "不会。答案不会保存在服务器上，只有你自己点击分享按钮时结果才会以链接形式传出。",
          ja: "いいえ。回答はサーバーに保存されず、結果はご本人が共有ボタンを押したときだけリンクとして伝わります。",
        },
      },
      {
        question: { ko: "번아웃 진단이 되나요?", en: "Does this diagnose burnout?", zh: "可以诊断职业倦怠吗？", ja: "燃え尽き症候群の診断になりますか？" },
        answer: {
          ko: "의학적 진단은 아닙니다. 나의 대처 유형과 주의 신호를 알아보는 참고 자료이며, 지속적인 무기력이나 불면이 있다면 전문가 상담을 권합니다.",
          en: "It is not a medical diagnosis. It helps you understand your coping type and warning signs; for persistent exhaustion or insomnia, please consult a professional.",
          zh: "不是医学诊断。它是了解自己应对类型和注意信号的参考资料，如果持续无力或失眠，建议咨询专业人士。",
          ja: "医学的な診断ではありません。自分の対処タイプと注意サインを知るための参考資料であり、無気力や不眠が続く場合は専門家への相談をおすすめします。",
        },
      },
      {
        question: { ko: "팀 워크숍에서 써도 되나요?", en: "Can I use it in a team workshop?", zh: "可以在团队工作坊中使用吗？", ja: "チームのワークショップで使ってもいいですか？" },
        answer: {
          ko: "네, 무료로 자유롭게 사용하실 수 있습니다. 링크를 공유하면 각자 휴대폰으로 3분 안에 끝낼 수 있어 아이스브레이킹에 적합합니다.",
          en: "Yes, it is free to use. Share the link and everyone can finish on their phone in three minutes, which makes it a handy ice-breaker.",
          zh: "可以，免费自由使用。分享链接后每个人用手机三分钟就能完成，很适合破冰环节。",
          ja: "はい、無料で自由にお使いいただけます。リンクを共有すれば各自のスマホで3分以内に終わるので、アイスブレイクに適しています。",
        },
      },
    ],
  },

  // ───────────────────────── 재미 ─────────────────────────
  fun: {
    title: {
      ko: "재미있는 테스트·미니게임 모음 | 반응속도·사다리타기·메뉴추천",
      en: "Fun Tests & Mini Games | Reaction Time, Ladder Game, Menu Picker",
      zh: "趣味测试·小游戏合集 | 反应速度·爬梯子·菜单推荐",
      ja: "おもしろテスト・ミニゲームまとめ | 反応速度・あみだくじ・メニューおすすめ",
    },
    description: {
      ko: "반응속도 테스트, 사다리 타기, 10초 맞추기, 오늘의 메뉴추천까지 설치 없이 바로 즐기는 무료 미니게임 모음. 친구와 기록을 겨루고 점심 메뉴도 정해 보세요.",
      en: "Reaction time test, ladder game, stop-at-10-seconds and a daily menu picker: free mini games you can play instantly without installing anything.",
      zh: "反应速度测试、爬梯子、10秒挑战、今日菜单推荐等无需安装即可畅玩的免费小游戏合集。和朋友比记录，顺便决定午饭。",
      ja: "反応速度テスト、あみだくじ、10秒ぴったり、今日のメニューおすすめまでインストールなしですぐ遊べる無料ミニゲームまとめ。友達と記録を競い、ランチも決めましょう。",
    },
    keywords: {
      ko: ["반응속도 테스트", "사다리 타기", "사다리 게임", "10초 맞추기", "메뉴 추천", "점심 메뉴 추천", "미니게임", "심심할 때 할 것"],
      en: ["reaction time test", "ladder game", "amidakuji", "stop at 10 seconds", "menu picker", "mini games", "fun tests"],
      zh: ["反应速度测试", "爬梯子", "10秒挑战", "菜单推荐", "小游戏", "无聊的时候玩什么"],
      ja: ["反応速度テスト", "あみだくじ", "10秒ぴったり", "メニューおすすめ", "ミニゲーム", "暇つぶし"],
    },
    heading: {
      ko: "재미있는 테스트·미니게임 모음",
      en: "Fun Tests & Mini Games",
      zh: "趣味测试·小游戏合集",
      ja: "おもしろテスト・ミニゲームまとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "재미 카테고리에는 심리 분석보다 순간의 즐거움에 초점을 맞춘 콘텐츠를 모았습니다. 화면이 바뀌는 순간 얼마나 빨리 반응하는지 밀리초 단위로 재는 반응속도 테스트, 커피 내기와 역할 정하기에 쓰는 사다리 타기, 눈을 감고 감각만으로 정확히 10초를 맞추는 10초 챌린지, 지금 시간대에 어울리는 식사를 골라 주는 오늘의 메뉴추천이 있습니다.\n\n모두 브라우저에서 바로 실행되므로 앱 설치나 회원가입이 필요 없고, 한 판에 1분도 걸리지 않아 쉬는 시간이나 대기 시간에 꺼내 보기 좋습니다. 반응속도와 10초 맞추기는 기록이 남아 친구와 순위를 겨룰 수 있고, 사다리 타기는 참가자 이름과 결과를 직접 적어 공정하게 뽑을 수 있습니다.",
          en: "The fun category focuses on instant enjoyment rather than analysis: a reaction time test measured in milliseconds, a ladder game for deciding who buys coffee, a stop-at-10-seconds challenge that relies on your inner clock, and a daily menu picker that suggests a meal for the current time of day.\n\nEverything runs in the browser with no install or sign-up, and a round takes under a minute, so it fits a break or a queue. Reaction time and the 10-second challenge keep records for ranking against friends, while the ladder game lets you enter names and prizes for a fair draw.",
          zh: "趣味栏目收集了比起心理分析更注重当下乐趣的内容：以毫秒为单位测量画面变化瞬间反应速度的反应测试，用来决定谁请咖啡、分配角色的爬梯子，闭上眼只靠感觉精确停在10秒的10秒挑战，以及根据当前时段推荐一餐的今日菜单推荐。\n\n全部在浏览器中直接运行，无需安装应用或注册，一局不到一分钟，适合休息或等待时打开。反应速度和10秒挑战会保存记录，可以和朋友比排名；爬梯子可以自己填写参与者姓名和结果，公平抽签。",
          ja: "おもしろカテゴリには、心理分析よりその瞬間の楽しさに焦点を当てたコンテンツを集めました。画面が変わった瞬間にどれだけ速く反応できるかをミリ秒単位で測る反応速度テスト、コーヒーのおごりや役割決めに使うあみだくじ、目を閉じて感覚だけで10秒ぴったりを狙う10秒チャレンジ、今の時間帯に合う食事を選んでくれる今日のメニューおすすめがあります。\n\nすべてブラウザでそのまま動くのでアプリのインストールや登録は不要で、1回1分もかからないので休み時間や待ち時間に開くのにぴったりです。反応速度と10秒ぴったりは記録が残って友達と順位を競え、あみだくじは参加者名と結果を自分で書いて公平に決められます。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "점심 메뉴를 두고 매일 같은 고민을 반복하는 직장인, 모임에서 벌칙이나 계산 담당을 공정하게 정하고 싶은 분, 심심할 때 1분짜리 도전으로 기분 전환하고 싶은 분께 추천합니다. 반응속도 테스트는 게임을 좋아하는 학생들 사이에서 순위 경쟁으로 인기가 많고, 사다리 타기는 수업이나 회식 자리에서 발표 순서를 정할 때 유용합니다.\n\n모든 게임은 무료이며 휴대폰과 PC 어디서든 같은 방식으로 작동합니다. 기록은 기기에 저장되니 어제의 나와 오늘의 나를 비교해 보세요.",
          en: "Recommended for office workers stuck on the same lunch dilemma every day, groups that want a fair way to pick who pays or who gets the forfeit, and anyone who wants a one-minute challenge to reset their mood. The reaction test is a favourite among gamers competing for rank, and the ladder game is handy for deciding presentation order in class or at dinner.\n\nAll games are free and work the same on phone and PC. Records are saved on your device, so you can compare today's you with yesterday's.",
          zh: "推荐给每天为午饭菜单重复纠结的上班族、想在聚会上公平决定惩罚或买单人选的人，以及无聊时想用一分钟挑战换换心情的人。反应速度测试在喜欢游戏的学生之间很受欢迎，大家比排名；爬梯子在课堂或聚餐时决定发言顺序很实用。\n\n所有游戏免费，手机和电脑上的玩法相同。记录保存在设备上，可以比较昨天的自己和今天的自己。",
          ja: "ランチのメニューで毎日同じ悩みを繰り返す社会人、集まりで罰ゲームや会計担当を公平に決めたい方、暇なときに1分のチャレンジで気分転換したい方におすすめです。反応速度テストはゲーム好きの学生の間で順位争いとして人気があり、あみだくじは授業や飲み会で発表順を決めるときに便利です。\n\nすべてのゲームは無料で、スマホでもPCでも同じように動きます。記録は端末に保存されるので、昨日の自分と今日の自分を比べてみてください。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "반응속도 기록은 잠이 부족한 날과 충분히 잔 날을 비교해 보면 컨디션을 숫자로 확인하는 지표가 됩니다. 10초 맞추기는 하루에 세 번씩 며칠만 해 보면 감각이 눈에 띄게 좋아지는 것을 느낄 수 있습니다.\n\n사다리 타기 결과는 화면을 캡처해 채팅방에 올리면 '왜 내가 걸렸냐'는 항의를 깔끔하게 막을 수 있고, 메뉴추천은 마음에 드는 메뉴가 나올 때까지 다시 뽑아도 되지만 처음 나온 메뉴를 그대로 따르는 것이 결정 피로를 줄이는 지름길입니다.",
          en: "Compare your reaction times on a sleepy day and a rested day and you have a numeric condition check. Play the 10-second challenge three times a day for a few days and you will notice your inner clock improving.\n\nScreenshot the ladder result for the group chat to settle any 'why me' complaints, and while you can re-roll the menu picker, going with the first suggestion is the quickest cure for decision fatigue.",
          zh: "把睡眠不足的日子和睡饱的日子的反应速度记录比一比，就是用数字确认状态的指标。10秒挑战每天做三次、坚持几天，就能明显感到感觉在变好。\n\n爬梯子的结果截图发到群里，可以干脆地堵住“为什么是我”的抗议；菜单推荐虽然可以重抽到满意为止，但直接按第一次的结果来，是减少决策疲劳的捷径。",
          ja: "反応速度の記録は寝不足の日と十分寝た日を比べると、コンディションを数字で確認する指標になります。10秒ぴったりは1日3回ずつ数日続けるだけで感覚が目に見えて良くなるのを感じられます。\n\nあみだくじの結果は画面をキャプチャしてチャットに上げれば「なんで俺が」という抗議をきれいに封じられ、メニューおすすめは気に入るまで引き直してもいいですが、最初に出たメニューにそのまま従うのが決断疲れを減らす近道です。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "게임을 하려면 앱을 설치해야 하나요?", en: "Do I need to install an app?", zh: "玩游戏需要安装应用吗？", ja: "ゲームをするにはアプリのインストールが必要ですか？" },
        answer: {
          ko: "아니요, 모든 게임은 브라우저에서 바로 실행되며 무료입니다. 휴대폰과 PC 모두 지원합니다.",
          en: "No. Every game runs in the browser for free, on both phone and PC.",
          zh: "不需要，所有游戏都在浏览器中直接运行且免费，手机和电脑都支持。",
          ja: "いいえ。すべてのゲームはブラウザでそのまま動き、無料です。スマホとPCの両方に対応しています。",
        },
      },
      {
        question: { ko: "반응속도 평균은 얼마인가요?", en: "What is an average reaction time?", zh: "反应速度的平均值是多少？", ja: "反応速度の平均はどのくらいですか？" },
        answer: {
          ko: "일반적으로 시각 자극에 대한 성인의 평균 반응속도는 200~250ms 정도로 알려져 있습니다. 결과 화면에서 내 기록이 상위 몇 %인지 확인할 수 있습니다.",
          en: "Adults typically react to a visual cue in about 200 to 250 ms. The result screen shows which percentile your record falls in.",
          zh: "一般来说，成年人对视觉刺激的平均反应速度在 200～250 毫秒左右。结果页可以看到自己的记录处于前百分之几。",
          ja: "一般に視覚刺激に対する大人の平均反応速度は200〜250ms程度と言われています。結果画面で自分の記録が上位何%かを確認できます。",
        },
      },
      {
        question: { ko: "사다리 타기 결과는 정말 공정한가요?", en: "Is the ladder game fair?", zh: "爬梯子的结果真的公平吗？", ja: "あみだくじの結果は本当に公平ですか？" },
        answer: {
          ko: "가로줄이 무작위로 생성되고 참가자는 자기 출발점을 직접 고르므로 누구도 결과를 미리 알 수 없습니다. 결과 화면을 캡처해 두면 다시 확인할 수 있습니다.",
          en: "Horizontal rungs are generated randomly and each player picks their own starting column, so nobody can know the outcome in advance. Screenshot the result to keep a record.",
          zh: "横线随机生成，参与者自己选择起点，所以没有人能提前知道结果。截图结果页面可以随时再确认。",
          ja: "横線はランダムに生成され、参加者は自分の出発点を自分で選ぶので誰も結果を事前に知ることはできません。結果画面をキャプチャしておけば後から確認できます。",
        },
      },
      {
        question: { ko: "메뉴추천은 어떤 기준으로 골라 주나요?", en: "How does the menu picker choose?", zh: "菜单推荐是根据什么来选的？", ja: "メニューおすすめはどんな基準で選びますか？" },
        answer: {
          ko: "현재 시간대(아침·점심·저녁·야식)에 맞는 메뉴 목록에서 추천합니다. 마음에 들지 않으면 다시 뽑기를 눌러 다른 메뉴를 볼 수 있습니다.",
          en: "It picks from a menu list matched to the current time of day: breakfast, lunch, dinner or late-night. Press re-roll if you want another suggestion.",
          zh: "根据当前时段（早餐、午餐、晚餐、宵夜）对应的菜单列表进行推荐。不满意可以点击重抽查看其他菜单。",
          ja: "現在の時間帯（朝・昼・夕・夜食）に合うメニューリストからおすすめします。気に入らなければ引き直しを押して別のメニューを見られます。",
        },
      },
    ],
  },

  // ───────────────────────── 운세 ─────────────────────────
  fortune: {
    title: {
      ko: "오늘의 운세·관상·로또 번호 | 무료 운세 모음",
      en: "Daily Fortune, Face Reading & Lotto Numbers | Free Fortune Collection",
      zh: "今日运势·面相·乐透号码 | 免费运势合集",
      ja: "今日の運勢・人相占い・ロト番号 | 無料占いまとめ",
    },
    description: {
      ko: "이름과 생년월일로 보는 오늘의 운세, 사진으로 보는 관상 분석, 통계로 뽑는 로또 번호까지. 회원가입 없이 매일 무료로 확인하는 운세 모음입니다.",
      en: "Daily fortune from your name and birth date, face reading from a photo, and lotto numbers picked from draw statistics. Free every day with no sign-up.",
      zh: "用姓名和生日看今日运势，用照片分析面相，用统计抽取乐透号码。无需注册，每天免费查看的运势合集。",
      ja: "名前と生年月日で見る今日の運勢、写真で見る人相占い、統計で選ぶロト番号まで。登録なしで毎日無料で確認できる占いまとめです。",
    },
    keywords: {
      ko: ["오늘의 운세", "무료 운세", "관상 테스트", "관상 보기", "로또 번호 추천", "로또 번호 생성기", "생년월일 운세", "운세 모음"],
      en: ["daily fortune", "free horoscope", "face reading test", "physiognomy", "lotto number generator", "fortune telling"],
      zh: ["今日运势", "免费运势", "面相测试", "面相分析", "乐透号码推荐", "运势合集"],
      ja: ["今日の運勢", "無料占い", "人相占い", "顔占い", "ロト番号生成", "占いまとめ"],
    },
    heading: {
      ko: "오늘의 운세·관상·로또 번호 모음",
      en: "Daily Fortune, Face Reading & Lotto Numbers",
      zh: "今日运势·面相·乐透号码合集",
      ja: "今日の運勢・人相占い・ロト番号まとめ",
    },
    sections: [
      {
        heading: { ko: "이 카테고리가 다루는 것", en: "What this category covers", zh: "本栏目包含的内容", ja: "このカテゴリで分かること" },
        body: {
          ko: "운세 카테고리에는 하루를 시작하며 가볍게 들여다볼 수 있는 콘텐츠를 모았습니다. 이름과 생년월일을 넣으면 총운과 애정운, 금전운, 건강운을 오늘 날짜 기준으로 풀어 주는 오늘의 운세, 사진 한 장으로 이마·눈·코·입의 생김새를 동양 전통 관상학의 관점에서 읽어 주는 관상 분석, 역대 당첨 번호 통계를 바탕으로 번호 6개를 추천하는 로또 번호 뽑기가 있습니다.\n\n운세와 관상은 한국에서 오래전부터 새해나 중요한 날을 앞두고 즐기던 문화이고, 이 사이트에서는 그 전통을 하루 한 번 꺼내 볼 수 있는 가벼운 형식으로 옮겼습니다. 결과는 매일 바뀌므로 아침 루틴처럼 들러 확인하는 분이 많습니다. 모든 결과는 재미와 참고를 위한 것이며 특정 행동을 보장하거나 권유하지 않습니다.",
          en: "The fortune category holds content you can glance at while starting your day: a daily fortune that reads your overall, love, money and health luck from your name and birth date, a face reading that interprets your forehead, eyes, nose and mouth through traditional Eastern physiognomy from a single photo, and a lotto picker that suggests six numbers based on past draw statistics.\n\nFortune telling and face reading have long been part of Korean culture around the new year and important days; here they take a light, once-a-day form. Results change daily, so many people drop by as part of a morning routine. Everything is for fun and reference only and never guarantees or recommends any action.",
          zh: "运势栏目收集了开始一天时可以轻松看一眼的内容：输入姓名和生日，按今天的日期解读总运、爱情运、财运、健康运的今日运势；用一张照片从东方传统面相学角度解读额头、眼睛、鼻子、嘴巴的面相分析；以及基于历史中奖号码统计推荐6个号码的乐透选号。\n\n运势和面相在韩国是很早就有的、在新年或重要日子前享受的文化，本站把这一传统改成每天可以拿出来看一次的轻松形式。结果每天变化，很多人把它当作早晨例行来查看。所有结果仅供娱乐和参考，不保证或建议任何特定行为。",
          ja: "占いカテゴリには、一日を始めながら気軽に覗けるコンテンツを集めました。名前と生年月日を入れると総合運・恋愛運・金運・健康運を今日の日付で読み解く今日の運勢、写真一枚で額・目・鼻・口の形を東洋伝統の人相学の観点から読む人相占い、過去の当選番号の統計をもとに6個の番号を提案するロト番号選びがあります。\n\n占いと人相は韓国で古くから新年や大事な日を前に楽しまれてきた文化で、このサイトではその伝統を一日一回取り出して見られる軽い形に移しました。結果は毎日変わるので、朝のルーティンのように立ち寄って確認する方が多いです。すべての結果は楽しみと参考のためのもので、特定の行動を保証したり勧めたりするものではありません。",
        },
      },
      {
        heading: { ko: "이런 분께 추천해요", en: "Recommended for", zh: "推荐给这样的你", ja: "こんな方におすすめ" },
        body: {
          ko: "아침마다 짧은 긍정 메시지로 하루를 열고 싶은 분, 면접이나 시험처럼 중요한 날을 앞두고 마음을 다잡을 계기가 필요한 분, 가족이나 친구의 생년월일을 넣어 서로의 운세를 비교하며 이야기하고 싶은 분께 추천합니다. 관상 분석은 셀카 한 장이면 되어 모임에서 돌아가며 해 보기 좋고, 로또 번호 뽑기는 매주 번호 고르기가 귀찮은 분께 작은 재미를 줍니다.\n\n모두 무료이고 회원가입이 필요 없으며, 관상 분석에 올린 사진은 기기에서만 처리되고 서버에 저장되지 않습니다.",
          en: "Recommended if you like opening the day with a short positive message, if you want a moment to steady yourself before an interview or exam, or if you enjoy comparing fortunes with family and friends using their birth dates. Face reading needs only a selfie and is fun to pass around at a gathering, and the lotto picker adds a little joy for anyone tired of choosing numbers every week.\n\nEverything is free with no sign-up, and photos uploaded for face reading are processed on your device and never stored on a server.",
          zh: "推荐给想每天早晨用一句简短的积极信息开启一天的人、在面试或考试等重要日子前需要一个契机稳定心态的人，以及想输入家人朋友的生日比较彼此运势聊天的人。面相分析只需一张自拍，适合在聚会上轮流尝试；乐透选号则给每周懒得选号的人带来一点小乐趣。\n\n全部免费、无需注册，面相分析上传的照片只在设备上处理，不会保存到服务器。",
          ja: "毎朝短い前向きなメッセージで一日を開きたい方、面接や試験など大事な日を前に気持ちを引き締めるきっかけが欲しい方、家族や友達の生年月日を入れて互いの運勢を比べながら話したい方におすすめです。人相占いは自撮り一枚で済むので集まりで順番にやるのに向いていて、ロト番号選びは毎週番号を選ぶのが面倒な方に小さな楽しみをくれます。\n\nすべて無料で登録不要、人相占いに上げた写真は端末内でだけ処理されサーバーには保存されません。",
        },
      },
      {
        heading: { ko: "결과를 이렇게 활용해 보세요", en: "How to use your results", zh: "结果可以这样用", ja: "結果の活かし方" },
        body: {
          ko: "오늘의 운세는 좋은 내용이면 그날의 작은 목표로 삼고, 조심하라는 내용이면 평소보다 한 번 더 확인하는 습관을 들이는 정도로 활용하면 충분합니다. 관상 결과는 '나는 이런 인상을 주는구나' 하고 첫인상을 점검하는 용도로 보면 면접이나 소개팅 준비에 의외로 도움이 됩니다.\n\n로또 번호는 통계를 참고했을 뿐 당첨을 보장하지 않으니 즐길 수 있는 금액 안에서만 구매하세요. 운세와 관상 모두 결과 카드를 공유할 수 있으니 가족 채팅방에 아침 인사 대신 올려 보는 것도 좋은 활용법입니다.",
          en: "Treat a good daily fortune as a small goal for the day and a cautionary one as a reminder to double-check things. Face reading works surprisingly well as a first-impression check before an interview or a date.\n\nLotto numbers are based on statistics only and never guarantee a win, so spend only what you can enjoy losing. Both fortune and face-reading cards can be shared, and posting one to the family chat in place of a morning greeting is a nice touch.",
          zh: "今日运势如果内容好，就当作当天的小目标；如果提醒小心，就养成比平时多确认一次的习惯，这样用就够了。面相结果可以当作检查“我给人的第一印象是这样的”，对面试或相亲的准备意外地有帮助。\n\n乐透号码只是参考了统计，不保证中奖，请只在能承受的金额内购买。运势和面相的结果卡片都可以分享，发到家庭群里代替早安问候也是不错的用法。",
          ja: "今日の運勢は良い内容ならその日の小さな目標にし、注意という内容なら普段より一度多く確認する習慣をつける程度に活用すれば十分です。人相の結果は「自分はこんな印象を与えるのか」と第一印象を点検する用途で見ると、面接やお見合いの準備に意外と役立ちます。\n\nロト番号は統計を参考にしただけで当選を保証しないので、楽しめる金額の範囲でだけ購入してください。運勢も人相も結果カードを共有できるので、家族のチャットに朝の挨拶代わりに上げてみるのも良い使い方です。",
        },
      },
    ],
    faq: [
      {
        question: { ko: "오늘의 운세는 매일 바뀌나요?", en: "Does the daily fortune change every day?", zh: "今日运势每天都会变吗？", ja: "今日の運勢は毎日変わりますか？" },
        answer: {
          ko: "네, 같은 이름과 생년월일이라도 날짜에 따라 결과가 달라집니다. 매일 아침 새로 확인해 보세요.",
          en: "Yes. Even with the same name and birth date, the result changes with the date. Check back each morning.",
          zh: "是的，即使姓名和生日相同，结果也会随日期变化。每天早晨可以重新查看。",
          ja: "はい。同じ名前と生年月日でも日付によって結果が変わります。毎朝新しく確認してみてください。",
        },
      },
      {
        question: { ko: "관상 분석에 올린 사진은 저장되나요?", en: "Is my photo stored for face reading?", zh: "面相分析上传的照片会被保存吗？", ja: "人相占いに上げた写真は保存されますか？" },
        answer: {
          ko: "아니요, 사진은 사용자의 기기에서만 분석되며 서버로 전송하거나 저장하지 않습니다.",
          en: "No. Photos are analysed on your device only and are never uploaded or stored.",
          zh: "不会。照片只在用户的设备上分析，不会传输到服务器或保存。",
          ja: "いいえ。写真はご利用の端末内でだけ分析され、サーバーへの送信や保存はしません。",
        },
      },
      {
        question: { ko: "로또 번호는 당첨 확률이 높은가요?", en: "Do the lotto numbers improve my odds?", zh: "推荐的乐透号码中奖率更高吗？", ja: "ロト番号は当選確率が高いですか？" },
        answer: {
          ko: "아닙니다. 역대 당첨 통계를 참고해 재미있게 고를 뿐이며 모든 조합의 당첨 확률은 같습니다. 오락용으로만 이용해 주세요.",
          en: "No. The picker uses past statistics for fun only; every combination has the same odds. Please use it purely for entertainment.",
          zh: "不是。它只是参考历史中奖统计有趣地选号，所有组合的中奖概率都相同。请仅作娱乐使用。",
          ja: "いいえ。過去の当選統計を参考に楽しく選ぶだけで、どの組み合わせも当選確率は同じです。娯楽としてのみご利用ください。",
        },
      },
      {
        question: { ko: "운세와 관상은 무료인가요?", en: "Are fortune and face reading free?", zh: "运势和面相是免费的吗？", ja: "運勢と人相占いは無料ですか？" },
        answer: {
          ko: "네, 운세·관상·로또 번호 뽑기 모두 무료이고 회원가입 없이 이용할 수 있습니다.",
          en: "Yes. Daily fortune, face reading and the lotto picker are all free with no sign-up.",
          zh: "是的，运势、面相和乐透选号都免费，无需注册即可使用。",
          ja: "はい。運勢・人相占い・ロト番号選びはすべて無料で、登録なしに利用できます。",
        },
      },
    ],
  },
};

export interface CategoryLanding {
  category: Category;
  seo: CategorySeo;
  /** 준비중이 아닌 테스트만 */
  tests: TestData[];
}

/** 랜딩 페이지를 만들 카테고리 목록 (테스트가 1개 이상 있는 카테고리만, categories[] 순서) */
export function getLandingCategories(): CategoryLanding[] {
  return categories
    .filter((cat) => hasCategoryLanding(cat.id))
    .map((cat) => ({
      category: cat,
      seo: categorySeo[cat.id as LandingCategoryId],
      tests: getTestsByCategory(cat.id).filter((t) => !t.isComingSoon),
    }));
}

/** id 로 랜딩 데이터 조회. 페이지가 없는 카테고리면 undefined */
export function getCategoryLanding(id: string): CategoryLanding | undefined {
  return getLandingCategories().find((c) => c.category.id === id);
}
