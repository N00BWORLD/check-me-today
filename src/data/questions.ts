// 에너지 밸런스 테스트 - 심리학적 성향 테스트
// 융의 아니마/아니무스 이론과 벰(Bem)의 성역할 검사를 참고한 에너지 스펙트럼 테스트

export type PersonalityType = 'SOLAR' | 'LUNAR';

// 심리학적 차원 정의 (6가지)
export type TraitType = 
    | 'assertiveness'   // 자기주장성 - Solar
    | 'achievement'     // 성취지향성 - Solar  
    | 'independence'    // 독립성 - Solar
    | 'empathy'         // 공감력 - Lunar
    | 'collaboration'   // 협력성 - Lunar
    | 'intuition';      // 직관력 - Lunar

export interface TraitScore {
    trait: TraitType;
    score: number; // -3 ~ +3 (Solar 긍정, Lunar 부정)
}

export interface Option {
    id: number;
    text: Record<string, string>;
    scores: TraitScore[]; // 선택 시 각 특성에 더해지는 점수
}

export interface Question {
    id: number;
    category: 'assertiveness' | 'achievement' | 'independence' | 'empathy' | 'collaboration' | 'intuition';
    text: Record<string, string>;
    options: Option[];
}

// 특성 이름 (다국어) - 심리학적 차원
export const traitNames: Record<TraitType, Record<string, string>> = {
    assertiveness: { 
        ko: "자기주장성", 
        en: "Assertiveness", 
        zh: "自我主张", 
        ja: "自己主張性" 
    },
    achievement: { 
        ko: "성취지향성", 
        en: "Achievement Drive", 
        zh: "成就导向", 
        ja: "達成志向" 
    },
    independence: { 
        ko: "독립성", 
        en: "Independence", 
        zh: "独立性", 
        ja: "独立性" 
    },
    empathy: { 
        ko: "공감력", 
        en: "Empathy", 
        zh: "共情力", 
        ja: "共感力" 
    },
    collaboration: { 
        ko: "협력성", 
        en: "Collaboration", 
        zh: "合作性", 
        ja: "協調性" 
    },
    intuition: { 
        ko: "직관력", 
        en: "Intuition", 
        zh: "直觉力", 
        ja: "直感力" 
    },
};

// 특성 설명 (다국어)
export const traitDescriptions: Record<TraitType, Record<string, string>> = {
    assertiveness: {
        ko: "자신의 의견과 욕구를 명확히 표현하는 성향",
        en: "Tendency to express opinions and needs clearly",
        zh: "清晰表达意见和需求的倾向",
        ja: "自分の意見や欲求を明確に表現する傾向"
    },
    achievement: {
        ko: "목표를 설정하고 달성하려는 동기와 의지",
        en: "Motivation and drive to set and achieve goals",
        zh: "设定和实现目标的动力和意志",
        ja: "目標を設定し達成しようとする動機と意志"
    },
    independence: {
        ko: "스스로 결정하고 자립적으로 행동하는 성향",
        en: "Tendency to make decisions and act independently",
        zh: "自主决策和独立行动的倾向",
        ja: "自ら決定し自立的に行動する傾向"
    },
    empathy: {
        ko: "타인의 감정과 상황을 이해하고 공감하는 능력",
        en: "Ability to understand and share others' feelings",
        zh: "理解和分享他人感受的能力",
        ja: "他者の感情や状況を理解し共感する能力"
    },
    collaboration: {
        ko: "팀과 조화롭게 협력하고 관계를 중시하는 성향",
        en: "Tendency to work harmoniously with others",
        zh: "与他人和谐合作并重视关系的倾向",
        ja: "チームと調和して協力し関係を重視する傾向"
    },
    intuition: {
        ko: "논리보다 직감과 감각을 신뢰하는 성향",
        en: "Tendency to trust intuition over logic",
        zh: "相信直觉而非逻辑的倾向",
        ja: "論理より直感と感覚を信頼する傾向"
    },
};

// Solar 특성과 Lunar 특성 분류
export const solarTraits: TraitType[] = ['assertiveness', 'achievement', 'independence'];
export const lunarTraits: TraitType[] = ['empathy', 'collaboration', 'intuition'];

// 12문제 - 각 차원당 2문제, 4지선다
export const questions: Question[] = [
    // ===== 자기주장성 (Assertiveness) 문제 =====
    {
        id: 1,
        category: 'assertiveness',
        text: {
            ko: "회의 중 내 의견과 다른 결정이 내려질 때, 나는...",
            en: "When a decision goes against my opinion in a meeting, I...",
            zh: "当会议中的决定与我的意见相左时，我...",
            ja: "会議で自分の意見と違う決定が下されたとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "즉시 손을 들고 반대 의견을 분명히 밝힌다",
                    en: "Immediately raise my hand and clearly state my objection",
                    zh: "立即举手明确表示反对意见",
                    ja: "すぐに手を挙げて反対意見を明確に述べる"
                },
                scores: [{ trait: 'assertiveness', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "회의 후 관련자에게 개별적으로 내 생각을 전달한다",
                    en: "Share my thoughts individually with relevant people after the meeting",
                    zh: "会后单独向相关人员表达我的想法",
                    ja: "会議後に関係者に個別に自分の考えを伝える"
                },
                scores: [{ trait: 'assertiveness', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "다수의 의견을 존중하고 일단 따라가본다",
                    en: "Respect the majority opinion and go along with it first",
                    zh: "尊重多数人的意见，先跟随",
                    ja: "多数の意見を尊重してまず従ってみる"
                },
                scores: [{ trait: 'collaboration', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "조용히 수긍하고 내 생각은 마음에 담아둔다",
                    en: "Quietly accept it and keep my thoughts to myself",
                    zh: "默默接受，把想法放在心里",
                    ja: "静かに受け入れて自分の考えは心に留めておく"
                },
                scores: [{ trait: 'empathy', score: 1 }, { trait: 'collaboration', score: 1 }]
            }
        ]
    },
    {
        id: 2,
        category: 'assertiveness',
        text: {
            ko: "친구가 나에게 불합리한 부탁을 할 때, 나는...",
            en: "When a friend asks me for an unreasonable favor, I...",
            zh: "当朋友向我提出不合理的请求时，我...",
            ja: "友達が無理なお願いをしてきたとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "바로 \"안 돼\"라고 명확하게 거절한다",
                    en: "Clearly say \"No\" right away",
                    zh: "直接明确拒绝说\"不行\"",
                    ja: "すぐに「ダメ」とはっきり断る"
                },
                scores: [{ trait: 'assertiveness', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "이유를 설명하며 정중하게 거절한다",
                    en: "Politely decline while explaining my reasons",
                    zh: "解释原因并礼貌地拒绝",
                    ja: "理由を説明しながら丁寧に断る"
                },
                scores: [{ trait: 'assertiveness', score: 1 }, { trait: 'empathy', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "일단 들어주되, 나중에 조금씩 거리를 둔다",
                    en: "Accept for now, but gradually distance myself later",
                    zh: "先答应，之后慢慢疏远",
                    ja: "一旦聞いてあげるけど、後で少しずつ距離を置く"
                },
                scores: [{ trait: 'collaboration', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "불편해도 우정을 위해 들어준다",
                    en: "Accept it for the friendship even if uncomfortable",
                    zh: "即使不舒服也为了友谊而答应",
                    ja: "不快でも友情のために聞いてあげる"
                },
                scores: [{ trait: 'empathy', score: 2 }, { trait: 'collaboration', score: 1 }]
            }
        ]
    },

    // ===== 성취지향성 (Achievement) 문제 =====
    {
        id: 3,
        category: 'achievement',
        text: {
            ko: "새로운 목표를 세울 때, 나의 스타일은...",
            en: "When setting a new goal, my style is...",
            zh: "设定新目标时，我的风格是...",
            ja: "新しい目標を立てるとき、私のスタイルは..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "도전적이고 야심찬 목표! 높이 설정해야 동기부여가 된다",
                    en: "Ambitious and challenging! High goals motivate me",
                    zh: "挑战性且雄心勃勃！高目标能激励我",
                    ja: "挑戦的で野心的な目標！高く設定してこそやる気が出る"
                },
                scores: [{ trait: 'achievement', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "현실적이지만 조금은 스트레칭하는 목표를 세운다",
                    en: "Realistic but slightly stretching goals",
                    zh: "现实但稍有挑战的目标",
                    ja: "現実的だけど少しストレッチした目標を立てる"
                },
                scores: [{ trait: 'achievement', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "과정을 즐기는 것이 중요, 결과보다 여정이 먼저다",
                    en: "Enjoying the process matters more than the result",
                    zh: "享受过程比结果更重要",
                    ja: "過程を楽しむことが大事、結果より旅路が先"
                },
                scores: [{ trait: 'intuition', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "목표보다는 흐름을 따라가며 자연스럽게 성장한다",
                    en: "Follow the flow and grow naturally rather than setting goals",
                    zh: "随波逐流，自然成长而不是设定目标",
                    ja: "目標よりも流れに身を任せて自然に成長する"
                },
                scores: [{ trait: 'intuition', score: 3 }]
            }
        ]
    },
    {
        id: 4,
        category: 'achievement',
        text: {
            ko: "일이 잘 안 풀릴 때, 나의 반응은...",
            en: "When things aren't going well, my reaction is...",
            zh: "当事情不顺利时，我的反应是...",
            ja: "物事がうまくいかないとき、私の反応は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "더 강하게 밀어붙인다. 포기는 없다!",
                    en: "Push harder. Giving up is not an option!",
                    zh: "更加努力推进。绝不放弃！",
                    ja: "もっと強く押し進める。諦めはない！"
                },
                scores: [{ trait: 'achievement', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "전략을 재점검하고 다른 방법을 찾는다",
                    en: "Review my strategy and find alternative approaches",
                    zh: "重新审视策略，寻找其他方法",
                    ja: "戦略を見直して別の方法を探す"
                },
                scores: [{ trait: 'achievement', score: 1 }, { trait: 'independence', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "잠시 쉬면서 주변 사람들의 조언을 구한다",
                    en: "Take a break and seek advice from others",
                    zh: "休息一下，向周围人寻求建议",
                    ja: "少し休んで周りの人のアドバイスを求める"
                },
                scores: [{ trait: 'collaboration', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "때로는 흘러가는 대로 두는 것도 방법이라고 생각한다",
                    en: "Sometimes letting things flow is also a valid approach",
                    zh: "有时候顺其自然也是一种方法",
                    ja: "時には流れに任せるのも方法だと思う"
                },
                scores: [{ trait: 'intuition', score: 2 }, { trait: 'empathy', score: 1 }]
            }
        ]
    },

    // ===== 독립성 (Independence) 문제 =====
    {
        id: 5,
        category: 'independence',
        text: {
            ko: "중요한 인생 결정을 앞두고 있을 때, 나는...",
            en: "When facing an important life decision, I...",
            zh: "面对重要的人生决定时，我...",
            ja: "重要な人生の決断を前にしたとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "내 판단을 믿고 스스로 결정한다. 내 인생은 내가 책임진다",
                    en: "Trust my judgment and decide on my own. I'm responsible for my life",
                    zh: "相信自己的判断自行决定。我的人生我负责",
                    ja: "自分の判断を信じて自ら決める。自分の人生は自分で責任を取る"
                },
                scores: [{ trait: 'independence', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "정보를 수집한 후 최종 결정은 내가 내린다",
                    en: "Gather information, but make the final decision myself",
                    zh: "收集信息后最终由我自己决定",
                    ja: "情報を集めた後、最終決定は自分で下す"
                },
                scores: [{ trait: 'independence', score: 2 }]
            },
            {
                id: 3,
                text: {
                    ko: "가까운 사람들과 충분히 상의한 후 결정한다",
                    en: "Discuss thoroughly with close people before deciding",
                    zh: "与亲近的人充分商量后再决定",
                    ja: "親しい人たちと十分に相談してから決める"
                },
                scores: [{ trait: 'collaboration', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "주변의 조언을 적극 수용하고 함께 결정한다",
                    en: "Actively take advice and decide together with others",
                    zh: "积极采纳周围人的建议并共同决定",
                    ja: "周りのアドバイスを積極的に受け入れて一緒に決める"
                },
                scores: [{ trait: 'collaboration', score: 3 }]
            }
        ]
    },
    {
        id: 6,
        category: 'independence',
        text: {
            ko: "혼자 여행 vs 그룹 여행, 당신의 선택은?",
            en: "Solo travel vs group travel, your choice?",
            zh: "独自旅行 vs 团体旅行，你的选择是？",
            ja: "一人旅 vs グループ旅行、あなたの選択は？"
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "무조건 혼자! 내 페이스로 자유롭게 다니고 싶다",
                    en: "Definitely solo! I want to travel freely at my own pace",
                    zh: "绝对独自！我想按自己的节奏自由行动",
                    ja: "絶対一人！自分のペースで自由に回りたい"
                },
                scores: [{ trait: 'independence', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "혼자가 편하지만, 가끔은 동행도 괜찮다",
                    en: "I prefer solo, but occasional company is okay",
                    zh: "独自更舒服，但偶尔有同伴也可以",
                    ja: "一人が楽だけど、たまには同行者もいい"
                },
                scores: [{ trait: 'independence', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "친한 친구 2-3명과 함께가 가장 좋다",
                    en: "Best with 2-3 close friends",
                    zh: "和2-3个亲密朋友一起最好",
                    ja: "親しい友達2-3人と一緒がベスト"
                },
                scores: [{ trait: 'collaboration', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "대규모 그룹 여행! 여럿이 함께해야 더 재밌다",
                    en: "Large group travel! It's more fun with many people",
                    zh: "大型团体旅行！人多才更有趣",
                    ja: "大人数のグループ旅行！みんなで一緒がもっと楽しい"
                },
                scores: [{ trait: 'collaboration', score: 3 }]
            }
        ]
    },

    // ===== 공감력 (Empathy) 문제 =====
    {
        id: 7,
        category: 'empathy',
        text: {
            ko: "친구가 힘든 일로 울고 있을 때, 나는...",
            en: "When a friend is crying over something difficult, I...",
            zh: "当朋友因为困难的事情哭泣时，我...",
            ja: "友達が辛いことで泣いているとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "해결책을 제시하며 빨리 기분이 나아지도록 돕는다",
                    en: "Offer solutions to help them feel better quickly",
                    zh: "提供解决方案帮助他们尽快好起来",
                    ja: "解決策を提示して早く気分が良くなるよう助ける"
                },
                scores: [{ trait: 'achievement', score: 2 }]
            },
            {
                id: 2,
                text: {
                    ko: "\"힘들었겠다\"며 공감하지만, 조언도 조금 섞는다",
                    en: "Empathize saying \"That must be hard\" but add some advice",
                    zh: "共情说\"一定很辛苦\"，但也加入一些建议",
                    ja: "「大変だったね」と共感しつつ、アドバイスも少し混ぜる"
                },
                scores: [{ trait: 'empathy', score: 1 }, { trait: 'achievement', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "말없이 옆에서 안아주거나 함께 있어준다",
                    en: "Silently hug them or just be there with them",
                    zh: "默默地在旁边拥抱或陪伴",
                    ja: "黙ってそばで抱きしめたり、一緒にいてあげる"
                },
                scores: [{ trait: 'empathy', score: 3 }]
            },
            {
                id: 4,
                text: {
                    ko: "그들의 감정에 깊이 공감해서 나도 함께 울게 된다",
                    en: "Empathize so deeply that I end up crying with them",
                    zh: "深深共情到我也跟着哭",
                    ja: "彼らの感情に深く共感して、私も一緒に泣いてしまう"
                },
                scores: [{ trait: 'empathy', score: 3 }, { trait: 'intuition', score: 1 }]
            }
        ]
    },
    {
        id: 8,
        category: 'empathy',
        text: {
            ko: "감동적인 영화나 책을 볼 때, 나는...",
            en: "When watching a touching movie or reading a moving book, I...",
            zh: "看感人电影或读感人书籍时，我...",
            ja: "感動的な映画や本を見るとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "스토리와 구성을 분석적으로 감상한다",
                    en: "Analytically appreciate the story and structure",
                    zh: "分析性地欣赏故事和结构",
                    ja: "ストーリーと構成を分析的に鑑賞する"
                },
                scores: [{ trait: 'independence', score: 2 }]
            },
            {
                id: 2,
                text: {
                    ko: "재미있게 보지만 감정적으로 크게 동요하지 않는다",
                    en: "Enjoy it but don't get emotionally moved much",
                    zh: "觉得有趣但情感上不太受影响",
                    ja: "面白く見るけど感情的にはあまり動揺しない"
                },
                scores: [{ trait: 'independence', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "감정이입이 되어 눈물이 핑 돌거나 감동받는다",
                    en: "Get emotionally involved and tear up or feel moved",
                    zh: "产生共情，眼眶湿润或被感动",
                    ja: "感情移入して目がウルウルしたり感動する"
                },
                scores: [{ trait: 'empathy', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "캐릭터의 감정을 깊이 느껴서 오래도록 여운이 남는다",
                    en: "Deeply feel the characters' emotions and it stays with me",
                    zh: "深深感受角色的情感，久久不能释怀",
                    ja: "キャラクターの感情を深く感じて長く余韻が残る"
                },
                scores: [{ trait: 'empathy', score: 3 }]
            }
        ]
    },

    // ===== 협력성 (Collaboration) 문제 =====
    {
        id: 9,
        category: 'collaboration',
        text: {
            ko: "팀 프로젝트에서 의견 충돌이 있을 때, 나는...",
            en: "When there's a conflict of opinions in a team project, I...",
            zh: "团队项目中出现意见冲突时，我...",
            ja: "チームプロジェクトで意見が衝突したとき、私は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "내 의견이 맞다면 끝까지 주장한다",
                    en: "Stand firm if I believe I'm right",
                    zh: "如果我认为自己是对的，就坚持到底",
                    ja: "自分の意見が正しいなら最後まで主張する"
                },
                scores: [{ trait: 'assertiveness', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "논리적으로 토론하되, 더 나은 아이디어가 있으면 수용한다",
                    en: "Discuss logically but accept better ideas",
                    zh: "逻辑讨论，但接受更好的想法",
                    ja: "論理的に議論するが、より良いアイデアがあれば受け入れる"
                },
                scores: [{ trait: 'assertiveness', score: 1 }, { trait: 'collaboration', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "팀의 조화를 위해 적당히 타협점을 찾는다",
                    en: "Find a compromise for team harmony",
                    zh: "为了团队和谐寻找妥协点",
                    ja: "チームの調和のために適度に妥協点を見つける"
                },
                scores: [{ trait: 'collaboration', score: 3 }]
            },
            {
                id: 4,
                text: {
                    ko: "갈등이 싫어서 대부분 양보하는 편이다",
                    en: "I usually yield because I dislike conflict",
                    zh: "因为不喜欢冲突，大多数时候会让步",
                    ja: "対立が嫌いなのでほとんど譲る方だ"
                },
                scores: [{ trait: 'collaboration', score: 2 }, { trait: 'empathy', score: 1 }]
            }
        ]
    },
    {
        id: 10,
        category: 'collaboration',
        text: {
            ko: "성공했을 때, 가장 뿌듯한 순간은...",
            en: "When I succeed, the most rewarding moment is...",
            zh: "成功时，最有成就感的时刻是...",
            ja: "成功したとき、最も誇らしい瞬間は..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "내 노력으로 이룬 성과를 인정받을 때",
                    en: "When my individual efforts are recognized",
                    zh: "当我个人的努力得到认可时",
                    ja: "自分の努力で成し遂げた成果が認められたとき"
                },
                scores: [{ trait: 'achievement', score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "목표를 달성한 그 자체의 성취감",
                    en: "The sense of achievement from reaching the goal itself",
                    zh: "达成目标本身的成就感",
                    ja: "目標を達成したこと自体の達成感"
                },
                scores: [{ trait: 'achievement', score: 2 }]
            },
            {
                id: 3,
                text: {
                    ko: "팀원들과 함께 기쁨을 나눌 때",
                    en: "When I share the joy with my teammates",
                    zh: "与团队成员一起分享喜悦时",
                    ja: "チームメンバーと一緒に喜びを分かち合うとき"
                },
                scores: [{ trait: 'collaboration', score: 3 }]
            },
            {
                id: 4,
                text: {
                    ko: "내 성공이 주변 사람들에게 도움이 되었을 때",
                    en: "When my success helps the people around me",
                    zh: "当我的成功帮助到周围的人时",
                    ja: "自分の成功が周りの人の役に立ったとき"
                },
                scores: [{ trait: 'empathy', score: 2 }, { trait: 'collaboration', score: 1 }]
            }
        ]
    },

    // ===== 직관력 (Intuition) 문제 =====
    {
        id: 11,
        category: 'intuition',
        text: {
            ko: "중요한 선택을 할 때 더 믿는 것은...",
            en: "When making important choices, I trust more in...",
            zh: "做重要选择时，我更相信...",
            ja: "重要な選択をするとき、より信じるのは..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "데이터와 논리적 분석. 숫자는 거짓말하지 않는다",
                    en: "Data and logical analysis. Numbers don't lie",
                    zh: "数据和逻辑分析。数字不会撒谎",
                    ja: "データと論理的分析。数字は嘘をつかない"
                },
                scores: [{ trait: 'achievement', score: 2 }, { trait: 'independence', score: 1 }]
            },
            {
                id: 2,
                text: {
                    ko: "논리가 우선이지만, 직감도 참고한다",
                    en: "Logic first, but I also consider my gut feeling",
                    zh: "逻辑优先，但也参考直觉",
                    ja: "論理が優先だが、直感も参考にする"
                },
                scores: [{ trait: 'independence', score: 1 }, { trait: 'intuition', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "직감과 느낌을 중시하되, 논리도 체크한다",
                    en: "Value intuition and feelings, but also check logic",
                    zh: "重视直觉和感觉，但也检查逻辑",
                    ja: "直感と感覚を重視するが、論理もチェックする"
                },
                scores: [{ trait: 'intuition', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "마음이 끌리는 방향. 내 직감을 믿는다",
                    en: "Where my heart leads. I trust my intuition",
                    zh: "心之所向。我相信我的直觉",
                    ja: "心が惹かれる方向。自分の直感を信じる"
                },
                scores: [{ trait: 'intuition', score: 3 }]
            }
        ]
    },
    {
        id: 12,
        category: 'intuition',
        text: {
            ko: "\"그냥 느낌이 안 좋아\"라는 이유로 계획을 바꾼 적이...",
            en: "Have you changed plans just because you had \"a bad feeling\"?",
            zh: "你曾因为\"感觉不好\"而改变计划吗？",
            ja: "「なんとなく嫌な予感がする」という理由で計画を変えたことが..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "없다. 논리적 근거 없이 결정을 바꾸진 않는다",
                    en: "Never. I don't change decisions without logical reasons",
                    zh: "没有。没有逻辑依据就不会改变决定",
                    ja: "ない。論理的根拠なしに決定を変えることはない"
                },
                scores: [{ trait: 'independence', score: 2 }, { trait: 'achievement', score: 1 }]
            },
            {
                id: 2,
                text: {
                    ko: "드물다. 하지만 아주 강한 직감이면 고려해볼 수도",
                    en: "Rarely. But I might consider a very strong gut feeling",
                    zh: "很少。但如果直觉非常强烈，也会考虑",
                    ja: "めったにない。でもとても強い直感なら考慮するかも"
                },
                scores: [{ trait: 'independence', score: 1 }]
            },
            {
                id: 3,
                text: {
                    ko: "가끔 있다. 직감이 맞았던 경험이 있어서",
                    en: "Sometimes. I've had experiences where my gut was right",
                    zh: "有时会。因为有过直觉正确的经历",
                    ja: "たまにある。直感が当たった経験があるから"
                },
                scores: [{ trait: 'intuition', score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "자주 있다. 내 직감은 거의 틀린 적이 없다",
                    en: "Often. My intuition is almost never wrong",
                    zh: "经常有。我的直觉几乎从未出错",
                    ja: "よくある。私の直感はほとんど外れたことがない"
                },
                scores: [{ trait: 'intuition', score: 3 }]
            }
        ]
    }
];

// 최대 가능 점수 계산 (Solar/Lunar 각각)
// Solar: assertiveness + achievement + independence
// Lunar: empathy + collaboration + intuition
// 각 특성당 최대 6점 (2문제 × 3점)
export const maxTraitScore = 6;
export const maxSolarScore = 18; // 3특성 × 6점
export const maxLunarScore = 18;
