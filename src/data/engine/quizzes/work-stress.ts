// 직장 스트레스 유형 테스트 — 범용 엔진 샘플 데이터
// 이 파일 하나 + src/data/engine/index.ts 등록 + src/data/tests.ts 한 항목으로 테스트 전체가 생성된다.
import type { QuizDefinition } from "../types";

export const workStressQuiz: QuizDefinition = {
    slug: "work-stress",
    id: "work-stress",
    name: {
        ko: "직장 스트레스 유형 테스트",
        en: "Work Stress Type Test",
        zh: "职场压力类型测试",
        ja: "職場ストレスタイプ診断",
    },
    description: {
        ko: "회사에서 나는 어떻게 버티고 있을까? 💼 스트레스 대처 유형 4가지",
        en: "How do you survive at work? 💼 4 stress-coping types",
        zh: "在公司里我是怎么撑下来的？💼 4种压力应对类型",
        ja: "会社で私はどう耐えている？💼 ストレス対処タイプ4種",
    },
    emoji: "💼",
    theme: {
        gradient: "from-sky-500 via-indigo-500 to-violet-500",
        accent: "indigo",
    },
    keywords: ["직장 스트레스 테스트", "스트레스 대처 유형", "번아웃 테스트", "직장인 심리테스트", "work stress test", "burnout quiz"],

    intro: {
        measures: {
            ko: "이 테스트는 직장에서 압박을 받았을 때 당신이 무의식적으로 꺼내 드는 대처 방식을 알아봅니다. 야근 요청, 애매한 지시, 동료와의 갈등, 실수 뒤의 수습처럼 누구나 겪는 10가지 상황에서 어떤 선택을 하는지를 통해 스트레스를 정면으로 부딪혀 해결하는 편인지, 일단 거리를 두고 피하는 편인지, 주변 사람에게 기대어 풀어내는 편인지, 혼자 분석하고 계획으로 통제하려는 편인지를 네 가지 유형으로 분류합니다. 정답이 있는 테스트가 아니라 지금 내가 어떤 방식에 가장 많이 기대고 있는지를 비춰 보는 거울에 가깝습니다.",
            en: "This test reveals the coping style you reach for, often without noticing, when pressure builds at work. Through 10 everyday situations such as overtime requests, vague instructions, conflicts with coworkers, and cleaning up after a mistake, it sorts you into one of four types: tackling stress head-on, keeping your distance, leaning on people around you, or analyzing and planning your way to control. There are no right answers. Think of it as a mirror that shows which strategy you rely on most right now.",
            zh: "这个测试帮你发现，在职场压力之下你会不自觉采用的应对方式。通过加班要求、模糊的指示、与同事的冲突、失误后的善后等10个人人都会遇到的场景，把你归入四种类型之一：正面迎击型、保持距离型、依靠他人型、分析掌控型。它没有标准答案，更像是一面镜子，照出你此刻最依赖的应对策略。",
            ja: "このテストは、職場でプレッシャーを感じたときに無意識に取ってしまう対処スタイルを明らかにします。残業の依頼、あいまいな指示、同僚との衝突、ミスの後始末など誰もが経験する10の場面での選択から、ストレスに正面からぶつかるタイプ、距離を置くタイプ、周りの人に頼るタイプ、分析と計画でコントロールするタイプの4つに分類します。正解のあるテストではなく、今の自分がどの方法に最も頼っているかを映す鏡のようなものです。",
        },
        background: {
            ko: "심리학자 라자루스와 포크만은 스트레스 자체보다 그것에 대처하는 방식이 건강과 만족도를 좌우한다고 보고, 대처 방식을 크게 '문제 중심 대처'와 '정서 중심 대처'로 나누었습니다. 문제 중심 대처는 스트레스의 원인을 직접 바꾸려는 시도이고, 정서 중심 대처는 원인을 바꿀 수 없을 때 내 감정을 다스리는 시도입니다. 이후 연구에서는 여기에 '회피'와 '사회적 지지 추구'가 독립적인 축으로 더해졌습니다.\n\n이 테스트는 네 축을 각각 하나의 캐릭터로 만들었습니다. 불도저형은 문제 중심 대처, 투명인간형은 회피, 수다쟁이형은 사회적 지지 추구, 전략가형은 인지적 재평가와 계획을 대표합니다. 각 문항의 선택지는 네 유형 가운데 하나 또는 둘에 점수를 주며, 열 문항의 점수를 합산해 가장 높은 유형이 결과로 나옵니다. 어떤 유형도 그 자체로 좋거나 나쁘지 않습니다. 중요한 것은 상황에 따라 다른 방식도 꺼내 쓸 수 있는 유연함이며, 결과 페이지의 조언은 바로 그 점을 짚어 줍니다.",
            en: "Psychologists Lazarus and Folkman argued that how we cope with stress, more than the stress itself, shapes our health and satisfaction. They divided coping into problem-focused coping, which tries to change the source of stress, and emotion-focused coping, which manages our feelings when the source cannot be changed. Later research added avoidance and seeking social support as independent dimensions.\n\nThis test turns each of those four dimensions into a character. The Bulldozer stands for problem-focused coping, the Ghost for avoidance, the Talker for seeking social support, and the Strategist for cognitive reappraisal and planning. Each answer gives points to one or two types, and the type with the highest total after ten questions is your result. No type is good or bad in itself. What matters is the flexibility to switch strategies as the situation demands, and the advice on your result page points to exactly that.",
            zh: "心理学家拉扎勒斯和福克曼认为，决定健康与满意度的不是压力本身，而是应对压力的方式。他们把应对分为\"问题取向应对\"和\"情绪取向应对\"：前者试图直接改变压力源，后者在压力源无法改变时调节自己的情绪。后来的研究又增加了\"回避\"和\"寻求社会支持\"两个独立维度。\n\n这个测试把四个维度各自化为一个角色：推土机型代表问题取向应对，隐形人型代表回避，话痨型代表寻求社会支持，战略家型代表认知重评与计划。每个选项会给一到两个类型加分，十道题累计后得分最高的类型就是你的结果。没有哪种类型本身是好或坏的，重要的是能根据情境灵活切换的能力，结果页的建议正是针对这一点。",
            ja: "心理学者ラザルスとフォルクマンは、ストレスそのものより対処の仕方が健康と満足度を左右すると考え、対処法を「問題焦点型」と「情動焦点型」に分けました。問題焦点型はストレスの原因を直接変えようとする試み、情動焦点型は原因を変えられないときに自分の感情を整える試みです。その後の研究で「回避」と「社会的支援の追求」が独立した軸として加わりました。\n\nこのテストは4つの軸をそれぞれキャラクターにしました。ブルドーザータイプは問題焦点型、透明人間タイプは回避、おしゃべりタイプは社会的支援の追求、戦略家タイプは認知的再評価と計画を表します。各選択肢は4タイプのうち1つか2つに点数を与え、10問の合計が最も高いタイプが結果になります。どのタイプもそれ自体で良い悪いはありません。大切なのは状況に応じて別の方法も使える柔軟さで、結果ページのアドバイスはまさにその点を指摘します。",
        },
        extra: [
            {
                heading: { ko: "이런 분께 추천해요", en: "Who this is for", zh: "推荐给这些人", ja: "こんな方におすすめ" },
                body: {
                    ko: "요즘 퇴근하고도 회사 생각이 머리에서 떠나지 않는 분, 같은 상황에서 동료와 내가 왜 이렇게 다르게 반응하는지 궁금한 분, 번아웃이 오기 전에 내 패턴을 점검해 보고 싶은 분께 추천합니다. 결과를 팀 동료와 공유하면 서로의 대처 방식을 이해하는 대화의 출발점이 됩니다.",
                    en: "Recommended if work follows you home in your head, if you wonder why you and a coworker react so differently to the same situation, or if you want to check your pattern before burnout arrives. Sharing results with teammates is a good starting point for understanding each other's coping styles.",
                    zh: "推荐给下班后脑子里仍放不下工作的人、好奇为什么自己和同事对同一情况反应如此不同的人、想在倦怠来临前检查自己模式的人。把结果分享给同事，可以成为相互理解应对方式的对话起点。",
                    ja: "退勤後も仕事のことが頭から離れない方、同じ状況で同僚と自分の反応がなぜこんなに違うのか気になる方、燃え尽きる前に自分のパターンを点検したい方におすすめです。結果をチームで共有すると、お互いの対処法を理解する対話のきっかけになります。",
                },
            },
        ],
        durationMinutes: 3,
    },

    // scores 키 = 결과 유형 id (fighter / ghost / talker / strategist)
    questions: [
        {
            text: {
                ko: "퇴근 10분 전, 팀장이 \"이거 오늘 안에 끝내 줘\"라며 일을 던진다. 나는?",
                en: "Ten minutes before leaving, your manager drops a task: \"Finish this today.\" You...",
                zh: "下班前10分钟，组长丢来一句\"今天内做完\"。你会？",
                ja: "退勤10分前、上司が「これ今日中に終わらせて」と仕事を投げてきた。あなたは？",
            },
            options: [
                { text: { ko: "\"지금은 어렵고 내일 오전까지 드릴게요\"라고 바로 말한다", en: "Say right away: \"Not tonight, but you'll have it tomorrow morning.\"", zh: "马上说\"今天不行，明早给您\"", ja: "「今は難しいので明日午前までに出します」とすぐ言う" }, scores: { fighter: 2 } },
                { text: { ko: "일단 알겠다고 하고 최대한 빨리 조용히 처리한다", en: "Say okay and quietly get it done as fast as possible", zh: "先答应下来，悄悄尽快做完", ja: "とりあえず分かりましたと言って、静かにできるだけ早く片付ける" }, scores: { ghost: 2 } },
                { text: { ko: "동료에게 \"이거 좀 같이 봐 줄래?\" 하고 나눠서 한다", en: "Ask a coworker, \"Can you help me with this?\" and split it", zh: "问同事\"能帮我一起看看吗？\"然后分工", ja: "同僚に「これ一緒に見てくれる？」と頼んで分担する" }, scores: { talker: 2 } },
                { text: { ko: "범위와 우선순위를 먼저 물어보고 가능한 만큼만 계획한다", en: "Ask about scope and priority first, then plan only what's feasible", zh: "先问清范围和优先级，再规划能做的部分", ja: "範囲と優先順位を先に確認し、できる分だけ計画する" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "내 실수로 고객에게 잘못된 메일이 나갔다. 가장 먼저 하는 행동은?",
                en: "A wrong email went to a client because of your mistake. Your first move?",
                zh: "因为你的失误，错误邮件发给了客户。你的第一反应是？",
                ja: "自分のミスで顧客に誤ったメールを送ってしまった。最初にすることは？",
            },
            options: [
                { text: { ko: "바로 정정 메일을 보내고 상사에게 직접 보고한다", en: "Send a correction immediately and report it to your boss yourself", zh: "立刻发更正邮件，并亲自向上司汇报", ja: "すぐ訂正メールを送り、上司に自分から報告する" }, scores: { fighter: 2 } },
                { text: { ko: "아무도 눈치 못 챘기를 바라며 상황을 지켜본다", en: "Hope nobody noticed and watch how it plays out", zh: "希望没人发现，先观望", ja: "誰も気づいていないことを願いつつ様子を見る" }, scores: { ghost: 2 } },
                { text: { ko: "친한 동료에게 \"나 큰일 났어\" 하고 먼저 털어놓는다", en: "Tell a close coworker first: \"I messed up badly\"", zh: "先对要好的同事说\"我闯祸了\"", ja: "仲のいい同僚に「やばいことになった」とまず打ち明ける" }, scores: { talker: 2 } },
                { text: { ko: "피해 범위와 수습 순서를 메모로 정리한 뒤 움직인다", en: "Write down the damage and a fix order, then act", zh: "先把影响范围和补救顺序写下来再行动", ja: "被害の範囲と対応の順番をメモに整理してから動く" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "회의에서 내 의견이 묵살됐다. 회의가 끝난 뒤 나는?",
                en: "Your idea got brushed aside in a meeting. Afterwards you...",
                zh: "会议上你的意见被无视了。会后你会？",
                ja: "会議で自分の意見が流された。会議の後、あなたは？",
            },
            options: [
                { text: { ko: "결정권자를 따로 찾아가 다시 설명한다", en: "Find the decision-maker and explain it again one-on-one", zh: "单独找决策者再说明一次", ja: "決定権者を別途訪ねてもう一度説明する" }, scores: { fighter: 2 } },
                { text: { ko: "\"뭐, 어차피 안 될 거였어\" 하고 넘긴다", en: "Shrug it off: \"It wasn't going to happen anyway\"", zh: "\"反正也不会通过\"，就这么算了", ja: "「まあ、どうせ通らなかったし」と流す" }, scores: { ghost: 2 } },
                { text: { ko: "점심시간에 동료들에게 억울함을 이야기한다", en: "Vent to coworkers at lunch", zh: "午饭时向同事倾诉委屈", ja: "昼休みに同僚に悔しさを話す" }, scores: { talker: 2 } },
                { text: { ko: "왜 안 먹혔는지 분석해 다음 회의용 자료를 다시 만든다", en: "Analyze why it failed and rebuild the material for next time", zh: "分析为什么没被采纳，重做下次会议的材料", ja: "なぜ通らなかったか分析し、次の会議用に資料を作り直す" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "일이 너무 많아 숨이 막힐 때, 나의 해소법은?",
                en: "When the workload is suffocating, how do you let off steam?",
                zh: "工作多到喘不过气时，你的解压方式是？",
                ja: "仕事が多すぎて息が詰まるとき、あなたの発散法は？",
            },
            options: [
                { text: { ko: "일단 제일 급한 것부터 하나씩 끝내 버린다", en: "Knock out the most urgent thing first, one by one", zh: "先把最急的一个个干掉", ja: "とにかく一番急ぐものから一つずつ片付ける" }, scores: { fighter: 2 } },
                { text: { ko: "잠깐 자리를 비우거나 휴대폰을 본다", en: "Step away from your desk or scroll your phone for a bit", zh: "暂时离开座位或刷手机", ja: "少し席を外すかスマホを見る" }, scores: { ghost: 2 } },
                { text: { ko: "메신저로 친구나 동료에게 하소연한다", en: "Message a friend or coworker to vent", zh: "用聊天软件向朋友或同事吐槽", ja: "メッセージで友人や同僚に愚痴る" }, scores: { talker: 2 } },
                { text: { ko: "할 일을 전부 적고 순서와 마감을 다시 짠다", en: "List everything and re-plan the order and deadlines", zh: "把所有事列出来，重新排顺序和截止时间", ja: "やることを全部書き出し、順番と締め切りを組み直す" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "옆자리 동료가 매번 내 일을 슬쩍 떠넘긴다. 나는?",
                en: "The coworker next to you keeps quietly pushing their work onto you. You...",
                zh: "旁边的同事总是悄悄把工作推给你。你会？",
                ja: "隣の同僚が毎回こっそり仕事を押し付けてくる。あなたは？",
            },
            options: [
                { text: { ko: "\"이건 네 담당이잖아\"라고 그 자리에서 말한다", en: "Say on the spot: \"That's your job, not mine\"", zh: "当场说\"这是你负责的吧\"", ja: "「それは君の担当でしょ」とその場で言う" }, scores: { fighter: 2 } },
                { text: { ko: "싸우기 싫어서 그냥 해 주고 속으로 삭인다", en: "Just do it to avoid a fight and swallow it", zh: "不想吵架，就帮着做了，自己憋着", ja: "揉めたくないので引き受けて、心の中で飲み込む" }, scores: { ghost: 2 } },
                { text: { ko: "다른 동료에게 \"쟤 원래 저래?\" 하고 물어본다", en: "Ask another coworker, \"Is that person always like this?\"", zh: "问其他同事\"他一直这样吗？\"", ja: "別の同僚に「あの人いつもああなの？」と聞く" }, scores: { talker: 2 } },
                { text: { ko: "업무 분담표를 만들어 팀장에게 정리를 요청한다", en: "Make a task-split chart and ask the manager to formalize it", zh: "做一张分工表，请组长明确分工", ja: "業務分担表を作り、上司に整理をお願いする" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "갑자기 전혀 모르는 업무를 맡게 됐다. 첫 반응은?",
                en: "You're suddenly assigned work you know nothing about. First reaction?",
                zh: "突然被安排完全不懂的工作。第一反应是？",
                ja: "突然まったく知らない業務を任された。最初の反応は？",
            },
            options: [
                { text: { ko: "\"해 보죠\" 하고 바로 부딪혀 본다", en: "\"Let's do it\" and dive straight in", zh: "\"试试吧\"，直接上手", ja: "「やってみます」とすぐ取りかかる" }, scores: { fighter: 2 } },
                { text: { ko: "최대한 미루다가 마감 직전에 몰아서 한다", en: "Put it off as long as possible and cram before the deadline", zh: "能拖就拖，临近截止再突击", ja: "できるだけ先延ばしにして、締め切り直前に一気にやる" }, scores: { ghost: 2 } },
                { text: { ko: "그 일을 해 본 사람을 찾아가 물어본다", en: "Find someone who's done it before and ask", zh: "找做过这件事的人请教", ja: "その仕事をやったことがある人に聞きに行く" }, scores: { talker: 2 } },
                { text: { ko: "관련 자료부터 찾아 읽고 순서를 잡는다", en: "Read up on it first and map out the steps", zh: "先查资料学习，再理出步骤", ja: "まず関連資料を探して読み、手順を決める" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "상사가 이유 없이 나에게만 차갑게 군다고 느껴진다. 나는?",
                en: "You feel your boss is cold only toward you, for no reason. You...",
                zh: "感觉上司无缘无故只对你冷淡。你会？",
                ja: "上司が理由もなく自分にだけ冷たい気がする。あなたは？",
            },
            options: [
                { text: { ko: "면담을 잡아 \"혹시 제가 놓친 게 있을까요?\" 하고 직접 묻는다", en: "Book a 1:1 and ask directly: \"Is there something I missed?\"", zh: "约谈一次，直接问\"是不是我哪里没做好？\"", ja: "面談を設定して「何か見落としがありますか」と直接聞く" }, scores: { fighter: 2 } },
                { text: { ko: "마주칠 일을 최대한 줄인다", en: "Minimize contact as much as possible", zh: "尽量减少碰面", ja: "顔を合わせる機会をできるだけ減らす" }, scores: { ghost: 2 } },
                { text: { ko: "동료들에게 \"요즘 팀장 왜 저래?\" 하고 분위기를 살핀다", en: "Ask coworkers, \"What's up with the boss lately?\"", zh: "问同事\"组长最近怎么了？\"摸摸情况", ja: "同僚に「最近上司どうしたの？」と雰囲気を探る" }, scores: { talker: 2 } },
                { text: { ko: "최근 내 업무 결과를 되짚어 보고 개선할 점을 찾는다", en: "Review your recent work and look for what to improve", zh: "回顾最近的工作成果，找改进点", ja: "最近の自分の業務成果を振り返り、改善点を探す" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "일요일 저녁, 월요일 생각에 가슴이 답답하다. 나는?",
                en: "Sunday evening, thinking about Monday makes your chest tight. You...",
                zh: "周日晚上，一想到周一就胸闷。你会？",
                ja: "日曜の夜、月曜のことを考えると胸が重い。あなたは？",
            },
            options: [
                { text: { ko: "미리 메일을 확인하고 월요일 일을 조금 당겨서 한다", en: "Check email early and get a head start on Monday's work", zh: "提前看邮件，把周一的活先干一点", ja: "先にメールを確認し、月曜の仕事を少し前倒しでやる" }, scores: { fighter: 1, strategist: 1 } },
                { text: { ko: "드라마나 게임에 빠져 생각을 지운다", en: "Lose yourself in a show or game and block it out", zh: "沉浸在剧或游戏里，把这事抛开", ja: "ドラマやゲームに没頭して考えを消す" }, scores: { ghost: 2 } },
                { text: { ko: "친구에게 전화해서 수다로 푼다", en: "Call a friend and talk it out", zh: "给朋友打电话聊天解压", ja: "友達に電話しておしゃべりで発散する" }, scores: { talker: 2 } },
                { text: { ko: "이번 주 계획을 세워 보면 마음이 가라앉는다", en: "Planning the week ahead calms you down", zh: "规划一下这周的安排，心就静下来了", ja: "今週の計画を立てると気持ちが落ち着く" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "프로젝트 마감이 코앞인데 팀원 한 명이 잠수를 탔다. 나는?",
                en: "The deadline is tomorrow and a teammate has gone silent. You...",
                zh: "项目截止在即，一个组员却失联了。你会？",
                ja: "プロジェクトの締め切り目前、チームメンバーが音信不通に。あなたは？",
            },
            options: [
                { text: { ko: "그 사람 몫까지 내가 밀어붙여 끝낸다", en: "Push through and finish their part yourself", zh: "连他的那份一起硬扛着做完", ja: "その人の分まで自分で押し切って終わらせる" }, scores: { fighter: 2 } },
                { text: { ko: "내 몫만 끝내고 나머지는 어떻게든 되겠지 한다", en: "Finish your part and figure the rest will sort itself out", zh: "做完自己的部分，其他的听天由命", ja: "自分の分だけ終わらせて、残りはなるようになると思う" }, scores: { ghost: 2 } },
                { text: { ko: "다른 팀원들을 모아 \"우리 어떡하지?\" 하고 같이 의논한다", en: "Gather the other teammates: \"What do we do?\"", zh: "召集其他组员一起商量\"我们怎么办？\"", ja: "他のメンバーを集めて「どうしよう？」と一緒に相談する" }, scores: { talker: 2 } },
                { text: { ko: "남은 작업을 쪼개 재배분하고 팀장에게 리스크를 보고한다", en: "Split the remaining work, reassign it, and report the risk to your manager", zh: "把剩余工作拆分重新分配，并向组长汇报风险", ja: "残りの作業を分割して再配分し、上司にリスクを報告する" }, scores: { strategist: 2 } },
            ],
        },
        {
            text: {
                ko: "\"요즘 괜찮아?\"라는 질문을 들으면 나는 보통 이렇게 답한다",
                en: "When someone asks \"Are you doing okay lately?\" you usually say...",
                zh: "被问到\"最近还好吗？\"时，你通常会这样回答",
                ja: "「最近大丈夫？」と聞かれると、だいたいこう答える",
            },
            options: [
                { text: { ko: "\"힘든데 어떻게든 해결 중이야\"", en: "\"It's tough, but I'm handling it\"", zh: "\"挺累的，但在想办法解决\"", ja: "「大変だけど、なんとか解決中」" }, scores: { fighter: 2 } },
                { text: { ko: "\"응, 괜찮아\" (사실은 안 괜찮다)", en: "\"Yeah, I'm fine\" (you're not)", zh: "\"嗯，还好\"（其实不好）", ja: "「うん、大丈夫」（本当は大丈夫じゃない）" }, scores: { ghost: 2 } },
                { text: { ko: "\"아니, 들어 봐…\" 하고 30분 동안 이야기한다", en: "\"No, listen...\" and talk for 30 minutes", zh: "\"不好，你听我说……\"然后讲上半小时", ja: "「いや、聞いてよ…」と30分話す" }, scores: { talker: 2 } },
                { text: { ko: "\"지금 뭐가 문제인지는 파악했어\"", en: "\"I've figured out what the problem is\"", zh: "\"问题出在哪我已经搞清楚了\"", ja: "「今何が問題かは把握してる」" }, scores: { strategist: 2 } },
            ],
        },
    ],

    results: [
        {
            id: "fighter",
            emoji: "🚜",
            title: { ko: "불도저형", en: "The Bulldozer", zh: "推土机型", ja: "ブルドーザータイプ" },
            subtitle: { ko: "부딪혀서 해결하는 정면돌파 타입", en: "Faces stress head-on and pushes through", zh: "正面迎击、硬碰硬解决的类型", ja: "ぶつかって解決する正面突破タイプ" },
            description: {
                ko: "당신은 스트레스를 '해결해야 할 문제'로 봅니다. 압박이 오면 피하지 않고 원인을 향해 곧장 걸어가며, 말해야 할 것은 그 자리에서 말하는 편입니다. 팀에서 막힌 일이 있으면 가장 먼저 움직이는 사람이고, 그래서 주변에서는 당신을 믿음직한 해결사로 봅니다.\n\n다만 모든 문제를 힘으로 밀어붙이려다 보면 바꿀 수 없는 일에까지 에너지를 쏟게 됩니다. 상사의 성격이나 회사의 구조처럼 내 손 밖에 있는 것과 싸우면 번아웃이 빨리 옵니다. 당신의 강점은 추진력이고, 과제는 '지금 이건 내가 바꿀 수 있는 일인가'를 먼저 묻는 습관입니다.",
                en: "You see stress as a problem to be solved. When pressure comes, you walk straight toward the cause instead of away from it, and you say what needs to be said on the spot. When the team is stuck, you're the first to move, so people see you as a reliable fixer.\n\nBut trying to force every problem means spending energy on things that can't be changed. Fighting what's out of your hands, like a boss's personality or the company's structure, brings burnout fast. Your strength is drive; your task is the habit of first asking, \"Is this something I can actually change?\"",
                zh: "你把压力看作\"需要解决的问题\"。压力来临时你不会躲避，而是径直走向原因，该说的话当场就说。团队遇到瓶颈时，你总是第一个行动的人，所以周围人把你看作可靠的问题解决者。\n\n不过，试图用力推平所有问题，会让你把精力耗在无法改变的事情上。与上司的性格、公司的结构这类自己掌控不了的东西硬碰，倦怠会来得很快。你的优势是推动力，课题是养成先问一句\"这是我能改变的事吗\"的习惯。",
                ja: "あなたはストレスを「解決すべき問題」と捉えます。プレッシャーが来ても逃げずに原因へまっすぐ向かい、言うべきことはその場で言うタイプです。チームで行き詰まった仕事があれば最初に動く人で、周囲からは頼れる解決役と見られています。\n\nただ、すべての問題を力で押し切ろうとすると、変えられないことにまでエネルギーを注いでしまいます。上司の性格や会社の構造のように自分の手の外にあるものと戦うと、燃え尽きが早く訪れます。あなたの強みは推進力、課題は「これは今、自分が変えられることか」をまず問う習慣です。",
            },
            features: [
                { ko: "문제가 생기면 가장 먼저 움직인다", en: "First to act when a problem appears", zh: "出现问题时第一个行动", ja: "問題が起きると最初に動く" },
                { ko: "할 말은 상대가 누구든 그 자리에서 한다", en: "Says what needs saying, to anyone, on the spot", zh: "该说的话无论对谁都当场说", ja: "言うべきことは相手が誰でもその場で言う" },
                { ko: "해결되지 않은 일이 있으면 잠이 안 온다", en: "Can't sleep with an unresolved issue", zh: "有没解决的事就睡不着", ja: "解決していないことがあると眠れない" },
                { ko: "에너지 소모가 커서 번아웃 위험이 높다", en: "High energy spend, high burnout risk", zh: "能量消耗大，倦怠风险高", ja: "エネルギー消耗が大きく燃え尽きリスクが高い" },
            ],
            advice: {
                ko: "문제를 '바꿀 수 있는 것'과 '받아들일 것'으로 먼저 나눠 보세요. 바꿀 수 없는 일에는 투명인간형의 거리 두기를 빌려 오는 것이 오히려 당신의 추진력을 오래 지키는 방법입니다.",
                en: "Sort problems into \"can change\" and \"must accept\" first. Borrowing the Ghost's distance for the unchangeable is what keeps your drive alive longer.",
                zh: "先把问题分成\"能改变的\"和\"要接受的\"。对无法改变的事，借用隐形人型的保持距离，反而能让你的推动力持续更久。",
                ja: "問題をまず「変えられること」と「受け入れること」に分けてみましょう。変えられないことには透明人間タイプの距離の取り方を借りるのが、あなたの推進力を長く保つ方法です。",
            },
            matches: ["strategist", "talker"],
            mismatches: ["ghost"],
            gradient: "from-orange-500 via-red-500 to-rose-500",
        },
        {
            id: "ghost",
            emoji: "👻",
            title: { ko: "투명인간형", en: "The Ghost", zh: "隐形人型", ja: "透明人間タイプ" },
            subtitle: { ko: "일단 거리를 두고 조용히 버티는 타입", en: "Keeps a distance and quietly endures", zh: "先保持距离、默默撑住的类型", ja: "まず距離を置いて静かに耐えるタイプ" },
            description: {
                ko: "당신은 스트레스가 오면 일단 한 발 물러섭니다. 갈등을 키우지 않고, 감정을 밖으로 드러내지 않으며, 폭풍이 지나가기를 기다리는 편입니다. 덕분에 팀 분위기를 흐리지 않고 어떤 상황에서도 크게 흔들리지 않는 사람으로 보입니다. 회피는 흔히 나쁘게 들리지만, 바꿀 수 없는 일 앞에서는 가장 현명한 선택이기도 합니다.\n\n문제는 '괜찮아'가 습관이 될 때입니다. 말하지 않은 불만은 사라지지 않고 쌓이며, 어느 날 갑자기 퇴사 욕구나 무기력으로 터져 나옵니다. 당신의 강점은 평정심이고, 과제는 작은 불편을 작은 목소리로라도 제때 꺼내는 연습입니다.",
                en: "When stress hits, you take a step back first. You don't escalate conflict, you keep emotions inside, and you wait for the storm to pass. That makes you someone who never sours the team mood and seems unshaken in any situation. Avoidance sounds bad, but in front of what can't be changed, it's often the wisest choice.\n\nThe trouble starts when \"I'm fine\" becomes a habit. Unspoken frustration doesn't disappear; it piles up and one day erupts as an urge to quit or a sense of helplessness. Your strength is composure; your task is practicing voicing small discomforts, even quietly, while they're still small.",
                zh: "压力来临时，你会先退一步。你不激化矛盾，不把情绪表露在外，等待风暴过去。因此你从不破坏团队气氛，看起来在任何情况下都不会动摇。回避听起来不好，但面对无法改变的事，它往往是最明智的选择。\n\n问题在于\"没事\"变成习惯的时候。没说出口的不满不会消失，而是不断堆积，某天突然以辞职冲动或无力感爆发出来。你的优势是平静，课题是练习在不适还很小的时候，哪怕小声也要及时说出来。",
                ja: "ストレスが来ると、あなたはまず一歩引きます。対立を大きくせず、感情を外に出さず、嵐が過ぎるのを待つタイプです。おかげでチームの空気を乱さず、どんな状況でも大きく揺れない人に見えます。回避は悪く聞こえがちですが、変えられないことの前では最も賢い選択でもあります。\n\n問題は「大丈夫」が習慣になったときです。言わなかった不満は消えずに積もり、ある日突然、退職願望や無気力として噴き出します。あなたの強みは平常心、課題は小さな不便を小さな声でもいいから早めに口にする練習です。",
            },
            features: [
                { ko: "갈등 상황에서 먼저 물러선다", en: "Steps back first in a conflict", zh: "冲突时先退让", ja: "対立の場面でまず引く" },
                { ko: "\"괜찮아\"가 입버릇이다", en: "\"I'm fine\" is a reflex", zh: "\"没事\"是口头禅", ja: "「大丈夫」が口癖" },
                { ko: "혼자 있는 시간으로 에너지를 회복한다", en: "Recharges with time alone", zh: "靠独处恢复能量", ja: "一人の時間でエネルギーを回復する" },
                { ko: "쌓인 불만이 한꺼번에 터질 위험이 있다", en: "Risk of built-up frustration erupting at once", zh: "积压的不满有一次性爆发的风险", ja: "溜まった不満が一気に爆発するリスクがある" },
            ],
            advice: {
                ko: "일주일에 한 번, 불편했던 일 하나를 가장 편한 사람에게 말해 보세요. 수다쟁이형의 방식을 아주 조금만 빌려도 압력밥솥의 김을 미리 빼는 효과가 있습니다.",
                en: "Once a week, tell the person you're most comfortable with about one thing that bothered you. Borrowing even a little of the Talker's way lets steam out of the pressure cooker early.",
                zh: "每周一次，把一件让你不舒服的事告诉最让你放松的人。哪怕只借用一点话痨型的方式，也能提前给高压锅放气。",
                ja: "週に一度、嫌だったことを一つ、いちばん気楽な相手に話してみましょう。おしゃべりタイプのやり方をほんの少し借りるだけで、圧力鍋の蒸気を先に抜く効果があります。",
            },
            matches: ["strategist"],
            mismatches: ["fighter"],
            gradient: "from-slate-500 via-slate-600 to-indigo-600",
        },
        {
            id: "talker",
            emoji: "💬",
            title: { ko: "수다쟁이형", en: "The Talker", zh: "话痨型", ja: "おしゃべりタイプ" },
            subtitle: { ko: "사람에게 기대어 풀어내는 공감 타입", en: "Leans on people and talks it through", zh: "依靠他人、倾诉解压的共情类型", ja: "人に頼って解きほぐす共感タイプ" },
            description: {
                ko: "당신에게 스트레스 해소의 첫 단계는 '말하기'입니다. 힘든 일이 생기면 동료나 친구를 찾아 이야기하고, 이야기하는 동안 감정이 정리되며, 종종 그 대화에서 해결의 실마리까지 얻습니다. 사회적 지지는 심리학에서 가장 강력한 스트레스 완충 장치로 꼽히는데, 당신은 그것을 본능적으로 활용하고 있습니다. 팀에서는 분위기를 풀고 사람을 잇는 역할을 자연스럽게 맡습니다.\n\n다만 들어 줄 사람이 없는 상황, 혹은 말해서는 안 되는 내용 앞에서는 유독 취약해집니다. 또 하소연이 반복되면 듣는 사람도 지치고, 정작 문제는 그대로인 경우가 생깁니다. 당신의 강점은 관계의 힘이고, 과제는 말한 뒤에 한 가지라도 행동으로 옮기는 마무리입니다.",
                en: "For you, the first step in relieving stress is talking. When something hard happens, you find a coworker or friend, your feelings sort themselves out as you talk, and you often come away with a lead toward a solution. Social support is ranked among the strongest stress buffers in psychology, and you use it instinctively. On a team, you naturally take the role of easing the mood and connecting people.\n\nYou are especially vulnerable, though, when there's no one to listen or when the matter can't be shared. And repeated venting tires the listener while the problem itself stays put. Your strength is the power of relationships; your task is following up each conversation with at least one action.",
                zh: "对你来说，释放压力的第一步是\"说出来\"。遇到难事，你会找同事或朋友聊，聊着聊着情绪就理顺了，常常还能从对话中找到解决的线索。社会支持在心理学中被视为最强的压力缓冲器，而你本能地在运用它。在团队里，你自然地承担着调节气氛、连接人心的角色。\n\n不过，在没人倾听或不能说的事情面前，你会格外脆弱。而且反复倾诉会让听的人疲惫，问题本身却原地不动。你的优势是关系的力量，课题是每次说完之后至少落实一个行动。",
                ja: "あなたにとってストレス解消の第一歩は「話すこと」です。つらいことがあると同僚や友人を探して話し、話しているうちに感情が整理され、その会話から解決の糸口を得ることも多いです。社会的支援は心理学で最も強力なストレス緩衝装置とされますが、あなたはそれを本能的に活用しています。チームでは空気をほぐし、人をつなぐ役割を自然に担います。\n\nただ、聞いてくれる人がいない状況や、話してはいけない内容の前では特に弱くなります。また愚痴が繰り返されると聞く側も疲れ、肝心の問題はそのままということも。あなたの強みは関係の力、課題は話した後に一つでも行動に移す締めくくりです。",
            },
            features: [
                { ko: "힘들면 일단 누군가에게 말해야 풀린다", en: "Needs to tell someone before feeling better", zh: "难受时得先跟人说说才能缓解", ja: "つらいときはまず誰かに話さないと解けない" },
                { ko: "팀의 분위기 메이커이자 상담 창구", en: "The team's mood-maker and go-to listener", zh: "团队的气氛担当兼倾诉窗口", ja: "チームのムードメーカーであり相談窓口" },
                { ko: "다른 사람의 스트레스도 잘 알아챈다", en: "Quick to notice others' stress too", zh: "也很容易察觉别人的压力", ja: "他人のストレスにもよく気づく" },
                { ko: "말로 풀고 나면 행동은 미루기 쉽다", en: "After talking it out, action tends to get postponed", zh: "说完就容易把行动往后推", ja: "話してすっきりすると行動を後回しにしがち" },
            ],
            advice: {
                ko: "하소연이 끝나면 \"그래서 내일 뭘 하지?\"를 한 문장으로 적어 보세요. 전략가형의 메모 습관을 더하면 대화가 위로에서 끝나지 않고 변화로 이어집니다.",
                en: "After venting, write one sentence: \"So what will I do tomorrow?\" Adding the Strategist's note-taking habit turns the conversation from comfort into change.",
                zh: "倾诉结束后，用一句话写下\"那明天我做什么？\"。加上战略家型的记笔记习惯，对话就不会止于安慰，而会带来改变。",
                ja: "愚痴を言い終えたら「じゃあ明日は何をする？」を一文で書いてみましょう。戦略家タイプのメモ習慣を加えると、会話が慰めで終わらず変化につながります。",
            },
            matches: ["fighter", "ghost"],
            mismatches: ["strategist"],
            gradient: "from-pink-500 via-rose-500 to-orange-400",
        },
        {
            id: "strategist",
            emoji: "🧠",
            title: { ko: "전략가형", en: "The Strategist", zh: "战略家型", ja: "戦略家タイプ" },
            subtitle: { ko: "분석하고 계획해서 통제하는 타입", en: "Analyzes, plans, and takes control", zh: "分析规划、掌控局面的类型", ja: "分析し計画してコントロールするタイプ" },
            description: {
                ko: "당신은 스트레스를 '정보가 부족한 상태'로 받아들입니다. 불안이 올라오면 상황을 쪼개고, 원인을 적고, 순서를 세우는 것으로 마음을 가라앉힙니다. 계획이 서는 순간 스트레스의 절반은 이미 사라지는 사람이죠. 덕분에 위기 상황에서 가장 침착하고, 남들이 패닉에 빠질 때 리스크를 보고하고 대안을 꺼내는 역할을 맡습니다.\n\n하지만 모든 것을 통제하려는 마음은 통제할 수 없는 일 앞에서 가장 큰 스트레스가 됩니다. 계획대로 되지 않는 사람이나 예측 불가능한 변화에 유독 지치고, 감정을 분석 대상으로만 다루다 보면 정작 '지금 내가 힘들다'는 사실을 놓치기도 합니다. 당신의 강점은 침착한 설계력이고, 과제는 가끔은 계획 없이 그냥 느끼고 말하는 것입니다.",
                en: "You treat stress as a shortage of information. When anxiety rises, you calm yourself by breaking the situation down, writing out causes, and setting an order. The moment a plan exists, half the stress is already gone. That makes you the calmest person in a crisis, the one who reports risks and offers alternatives while others panic.\n\nBut the wish to control everything becomes your biggest stressor in front of what can't be controlled. People who don't follow the plan and unpredictable change wear you out, and treating emotions only as data to analyze can make you miss the plain fact that you're struggling right now. Your strength is calm design; your task is sometimes just feeling and saying it, with no plan at all.",
                zh: "你把压力理解为\"信息不足的状态\"。焦虑升起时，你会把情况拆开、写下原因、排好顺序来让自己平静。计划一成型，压力就已经消失了一半。因此你在危机中最冷静，当别人陷入恐慌时，你是那个汇报风险、拿出备选方案的人。\n\n但想掌控一切的心，在无法掌控的事情面前会变成最大的压力。不按计划行事的人和不可预测的变化会让你格外疲惫，而把情绪只当作分析对象，有时会让你忽略\"我现在很累\"这个事实本身。你的优势是冷静的规划力，课题是偶尔不带计划，只是去感受、去说出来。",
                ja: "あなたはストレスを「情報が足りない状態」と受け止めます。不安が上がってくると、状況を分解し、原因を書き出し、順番を決めることで心を落ち着かせます。計画が立った瞬間にストレスの半分は消えている人です。おかげで危機のときに最も冷静で、他の人がパニックに陥るときにリスクを報告し代案を出す役割を担います。\n\nしかし、すべてをコントロールしようとする心は、コントロールできないことの前で最大のストレスになります。計画どおりに動かない人や予測不能な変化に特に疲れ、感情を分析対象としてだけ扱っていると「今、自分がつらい」という事実を見落とすこともあります。あなたの強みは冷静な設計力、課題はときには計画なしにただ感じて口にすることです。",
            },
            features: [
                { ko: "할 일을 적고 순서를 세우면 마음이 가라앉는다", en: "Calms down by listing tasks and ordering them", zh: "把事情列出来排好顺序心就静了", ja: "やることを書いて順番を決めると落ち着く" },
                { ko: "위기 상황에서 가장 침착한 사람", en: "The calmest person in a crisis", zh: "危机中最冷静的人", ja: "危機のときに最も冷静な人" },
                { ko: "예측 불가능한 변화와 사람에게 유독 지친다", en: "Especially drained by unpredictable change and people", zh: "对不可预测的变化和人格外疲惫", ja: "予測不能な変化と人に特に疲れる" },
                { ko: "감정보다 분석이 앞서 자기 상태를 놓치기 쉽다", en: "Analysis outruns feeling, easy to miss own state", zh: "分析先于感受，容易忽略自身状态", ja: "感情より分析が先に立ち、自分の状態を見落としがち" },
            ],
            advice: {
                ko: "계획표 맨 위에 '오늘 내 기분'을 한 줄 적는 칸을 만들어 보세요. 수다쟁이형처럼 감정을 먼저 꺼내 놓으면, 당신의 분석은 훨씬 정확해집니다.",
                en: "Add a line at the top of your planner: \"How I feel today.\" Putting the emotion out first, the way the Talker does, makes your analysis far more accurate.",
                zh: "在计划表最上面加一行\"今天我的心情\"。像话痨型那样先把情绪拿出来，你的分析会准确得多。",
                ja: "計画表のいちばん上に「今日の気分」を一行書く欄を作ってみましょう。おしゃべりタイプのように感情を先に出しておくと、あなたの分析はずっと正確になります。",
            },
            matches: ["fighter", "ghost"],
            mismatches: ["talker"],
            gradient: "from-sky-500 via-blue-600 to-indigo-600",
        },
    ],

    scoring: { mode: "sum-max" },
};
