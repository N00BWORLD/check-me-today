export type PersonalityType = 'TETO' | 'EGEN';

// 특성 타입 정의
export type TraitType = 'drive' | 'social' | 'decision' | 'empathy' | 'detail' | 'creativity';

export interface TraitScore {
    trait: TraitType;
    score: number; // 1-20 점
}

export interface Option {
    id: number;
    text: Record<string, string>; // 다국어 지원
    type: PersonalityType;
    traits: TraitScore[]; // 선택 시 획득하는 특성 점수
}

export interface Question {
    id: number;
    text: Record<string, string>; // 다국어 지원
    options: Option[];
}

// 특성 이름 (다국어)
export const traitNames: Record<TraitType, Record<string, string>> = {
    drive: { ko: "추진력", en: "Drive", zh: "推动力", ja: "推進力" },
    social: { ko: "사교성", en: "Sociability", zh: "社交性", ja: "社交性" },
    decision: { ko: "결단력", en: "Decisiveness", zh: "决断力", ja: "決断力" },
    empathy: { ko: "공감력", en: "Empathy", zh: "共情力", ja: "共感力" },
    detail: { ko: "섬세함", en: "Attention to Detail", zh: "细腻", ja: "繊細さ" },
    creativity: { ko: "창의성", en: "Creativity", zh: "创造力", ja: "創造性" },
};

// TETO 특성: drive, social, decision
// EGEN 특성: empathy, detail, creativity

export const questions: Question[] = [
    {
        id: 1,
        text: {
            ko: "파티에 도착했을 때, 당신의 행동은?",
            en: "When you arrive at a party, what do you do?",
            zh: "当你到达派对时，你会怎么做？",
            ja: "パーティーに着いたとき、あなたはどうしますか？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "큰 소리로 인사하며 존재감을 드러낸다!",
                    en: "Greet loudly and make your presence known!",
                    zh: "大声打招呼，彰显存在感！",
                    ja: "大きな声で挨拶して存在感をアピール！"
                },
                type: 'TETO',
                traits: [
                    { trait: 'social', score: 15 },
                    { trait: 'drive', score: 10 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "조용히 아는 사람이 있는지 스캔한다.",
                    en: "Quietly scan for familiar faces.",
                    zh: "安静地寻找熟人。",
                    ja: "静かに知り合いを探す。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'detail', score: 12 },
                    { trait: 'empathy', score: 10 },
                ]
            },
        ],
    },
    {
        id: 2,
        text: {
            ko: "갑작스러운 계획 변경, 어떻게 반응하나요?",
            en: "How do you react to sudden plan changes?",
            zh: "突然改变计划，你会如何反应？",
            ja: "突然の予定変更にどう反応しますか？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "오히려 좋아! 즉흥적인 게 재밌지.",
                    en: "Even better! Spontaneity is fun.",
                    zh: "反而更好！即兴很有趣。",
                    ja: "むしろ良い！即興が楽しい。"
                },
                type: 'TETO',
                traits: [
                    { trait: 'drive', score: 12 },
                    { trait: 'creativity', score: 8 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "아.. 스트레스 받아. 다시 계획을 세워야 해.",
                    en: "Ugh... stressful. Need to replan.",
                    zh: "啊...有压力。需要重新计划。",
                    ja: "あぁ...ストレス。計画を立て直さないと。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'detail', score: 15 },
                    { trait: 'empathy', score: 5 },
                ]
            },
        ],
    },
    {
        id: 3,
        text: {
            ko: "팀 프로젝트에서 주로 맡는 역할은?",
            en: "What role do you usually take in team projects?",
            zh: "在团队项目中你通常担任什么角色？",
            ja: "チームプロジェクトで主に担当する役割は？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "리더가 되어 방향을 잡고 지시한다.",
                    en: "Become the leader and direct the team.",
                    zh: "成为领导者，指明方向。",
                    ja: "リーダーになって方向性を決める。"
                },
                type: 'TETO',
                traits: [
                    { trait: 'drive', score: 15 },
                    { trait: 'decision', score: 15 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "서포터로서 디테일을 챙기고 보완한다.",
                    en: "Support the team with details and refinements.",
                    zh: "作为支持者，关注细节和完善。",
                    ja: "サポーターとして細部を担当。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'detail', score: 15 },
                    { trait: 'empathy', score: 10 },
                ]
            },
        ],
    },
    {
        id: 4,
        text: {
            ko: "누군가 내 작업을 비판한다면?",
            en: "What if someone criticizes your work?",
            zh: "如果有人批评你的工作？",
            ja: "誰かがあなたの仕事を批判したら？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "뭐가 문제인지 논리적으로 따져 묻는다.",
                    en: "Ask logically what the problem is.",
                    zh: "逻辑地询问问题所在。",
                    ja: "論理的に何が問題か問いただす。"
                },
                type: 'TETO',
                traits: [
                    { trait: 'decision', score: 12 },
                    { trait: 'drive', score: 10 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "상처받고 내가 뭘 잘못했나 곱씹는다.",
                    en: "Feel hurt and reflect on what I did wrong.",
                    zh: "感到受伤，反思自己做错了什么。",
                    ja: "傷ついて、自分の何が悪かったか考える。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'empathy', score: 15 },
                    { trait: 'detail', score: 8 },
                ]
            },
        ],
    },
    {
        id: 5,
        text: {
            ko: "당신이 꿈꾸는 완벽한 주말은?",
            en: "What's your perfect weekend?",
            zh: "你理想中的完美周末是什么？",
            ja: "あなたの理想の週末は？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "클럽, 스포츠, 새로운 사람들과의 모임!",
                    en: "Clubs, sports, meeting new people!",
                    zh: "俱乐部、运动、结识新朋友！",
                    ja: "クラブ、スポーツ、新しい人との出会い！"
                },
                type: 'TETO',
                traits: [
                    { trait: 'social', score: 18 },
                    { trait: 'drive', score: 8 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "집에서 넷플릭스, 독서, 혹은 조용한 카페.",
                    en: "Netflix at home, reading, or a quiet cafe.",
                    zh: "在家看Netflix、读书或安静的咖啡馆。",
                    ja: "家でNetflix、読書、静かなカフェ。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'creativity', score: 12 },
                    { trait: 'detail', score: 10 },
                ]
            },
        ],
    },
    {
        id: 6,
        text: {
            ko: "결정을 내릴 때 가장 중요한 것은?",
            en: "What's most important when making decisions?",
            zh: "做决定时最重要的是什么？",
            ja: "決断するとき最も重要なことは？"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "나의 직감과 그 순간의 끌림.",
                    en: "My intuition and the pull of the moment.",
                    zh: "我的直觉和当下的吸引力。",
                    ja: "直感とその瞬間の引力。"
                },
                type: 'TETO',
                traits: [
                    { trait: 'decision', score: 15 },
                    { trait: 'drive', score: 10 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "철저한 분석과 안전한 선택.",
                    en: "Thorough analysis and safe choices.",
                    zh: "彻底分析和安全的选择。",
                    ja: "徹底的な分析と安全な選択。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'detail', score: 15 },
                    { trait: 'creativity', score: 8 },
                ]
            },
        ],
    },
    {
        id: 7,
        text: {
            ko: "방에 거미가 나타났다!",
            en: "A spider appeared in your room!",
            zh: "房间里出现了一只蜘蛛！",
            ja: "部屋にクモが現れた！"
        },
        options: [
            { 
                id: 1, 
                text: {
                    ko: "바로 잡거나 쫓아낸다! (전투 모드)",
                    en: "Catch or chase it out immediately! (Battle mode)",
                    zh: "立即抓住或赶走！（战斗模式）",
                    ja: "すぐに捕まえるか追い出す！（戦闘モード）"
                },
                type: 'TETO',
                traits: [
                    { trait: 'decision', score: 12 },
                    { trait: 'drive', score: 15 },
                ]
            },
            { 
                id: 2, 
                text: {
                    ko: "소리 지르며 도망가거나 도움을 요청한다.",
                    en: "Scream and run or ask for help.",
                    zh: "尖叫着逃跑或寻求帮助。",
                    ja: "叫んで逃げるか助けを求める。"
                },
                type: 'EGEN',
                traits: [
                    { trait: 'empathy', score: 10 },
                    { trait: 'creativity', score: 12 },
                ]
            },
        ],
    },
];

// 최대 가능 점수 계산 (각 특성별)
export const maxScores: Record<TraitType, number> = {
    drive: 80,      // 최대 획득 가능 점수
    social: 35,
    decision: 55,
    empathy: 50,
    detail: 75,
    creativity: 50,
};
