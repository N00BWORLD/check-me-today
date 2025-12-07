

export interface SpendingQuestion {
    id: number;
    text: { ko: string; en: string };
    options: {
        id: number;
        text: { ko: string; en: string };
        scores: { trait: string; score: number }[];
    }[];
}

export type SpendingType = "MINIMALIST" | "FLEX" | "INVESTOR" | "VALUE";

export const spendingQuestions: SpendingQuestion[] = [
    {
        id: 1,
        text: {
            ko: "월급날 내 통장에 들어온 돈, 가장 먼저 하는 생각은?",
            en: "Payday! What's the first thing that comes to mind?"
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "일단 저축부터! 미래를 위해 시드머니를 모아야 해.",
                    en: "Save first! Need to build up that seed money."
                },
                scores: [{ trait: "achievement", score: 2 }] // Investor
            },
            {
                id: 2,
                text: {
                    ko: "수고한 나를 위한 선물! 사고 싶었던 옷이나 맛집을 검색한다.",
                    en: "Treat myself! Looking up that outfit or fancy dinner."
                },
                scores: [{ trait: "intuition", score: 2 }] // Flex
            },
            {
                id: 3,
                text: {
                    ko: "이번 달 카드값부터 체크... 고정 지출을 계산한다.",
                    en: "Check the credit card bill... Calculate fixed expenses."
                },
                scores: [{ trait: "independence", score: 2 }] // Minimalist
            },
            {
                id: 4,
                text: {
                    ko: "특가 할인 정보를 확인하며 생필품을 미리 쟁여둔다.",
                    en: "Check for deals and stock up on essentials."
                },
                scores: [{ trait: "assertiveness", score: 2 }] // Value
            }
        ]
    },
    {
        id: 2,
        text: {
            ko: "친구들과의 모임, 계산할 때 나는?",
            en: "At a friends' gathering, when the bill comes, I..."
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "오늘은 내가 쏜다! 기분 좋게 긁는다.",
                    en: "It's on me today! Happily swiping the card."
                },
                scores: [{ trait: "intuition", score: 2 }] // Flex
            },
            {
                id: 2,
                text: {
                    ko: "정확하게 1/N! 깔끔하게 송금해달라고 한다.",
                    en: "Split it exactly! Ask for a clean transfer."
                },
                scores: [{ trait: "independence", score: 2 }] // Minimalist
            },
            {
                id: 3,
                text: {
                    ko: "가성비 좋은 세트 메뉴를 미리 제안해서 예산을 맞춘다.",
                    en: "Suggest a value set menu beforehand to fit the budget."
                },
                scores: [{ trait: "assertiveness", score: 2 }] // Value
            },
            {
                id: 4,
                text: {
                    ko: "적립금이나 제휴 할인을 챙겨서 스마트하게 결제한다.",
                    en: "Smart payment using points or partnership discounts."
                },
                scores: [{ trait: "achievement", score: 2 }] // Investor/Smart
            }
        ]
    },
    {
        id: 3,
        text: {
            ko: "갑자기 100만원이 생겼다! 무엇을 할까?",
            en: "Suddenly got $1000! What do you do?"
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "주식이나 코인, 혹은 적금에 넣어서 불린다.",
                    en: "Invest in stocks, crypto, or savings to grow it."
                },
                scores: [{ trait: "achievement", score: 2 }]
            },
            {
                id: 2,
                text: {
                    ko: "평소 눈여겨보던 명품이나 전자기기를 지른다.",
                    en: "Buy that luxury item or gadget I've been eyeing."
                },
                scores: [{ trait: "intuition", score: 2 }]
            },
            {
                id: 3,
                text: {
                    ko: "비상금 통장에 넣어두고 필요할 때를 대비한다.",
                    en: "Put it in an emergency fund just in case."
                },
                scores: [{ trait: "independence", score: 2 }]
            },
            {
                id: 4,
                text: {
                    ko: "여행을 가거나 배우고 싶었던 강의를 결제한다.",
                    en: "Go on a trip or pay for a course I wanted to take."
                },
                scores: [{ trait: "assertiveness", score: 2 }] // Value/Experience
            }
        ]
    },
    {
        id: 4,
        text: {
            ko: "마트에서 1+1 행사를 하고 있다. 내 반응은?",
            en: "Buy 1 Get 1 Free sale at the mart. My reaction?"
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "어차피 쓸 거니까 무조건 산다. 이게 돈 버는 거야!",
                    en: "I'll use it anyway, so buy it. This is saving money!"
                },
                scores: [{ trait: "assertiveness", score: 2 }]
            },
            {
                id: 2,
                text: {
                    ko: "필요 없는 물건이면 쳐다보지도 않는다.",
                    en: "If I don't need it, I don't even look at it."
                },
                scores: [{ trait: "independence", score: 2 }]
            },
            {
                id: 3,
                text: {
                    ko: "친구랑 반반 나눠서 살까 고민한다.",
                    en: "Think about splitting it with a friend."
                },
                scores: [{ trait: "achievement", score: 1 }]
            },
            {
                id: 4,
                text: {
                    ko: "행사 상품보다는 내가 원래 사려던 브랜드 제품을 산다.",
                    en: "I buy the brand I intended to, rather than the sale item."
                },
                scores: [{ trait: "intuition", score: 2 }]
            }
        ]
    },
    {
        id: 5,
        text: {
            ko: "나의 소비 철학은?",
            en: "My spending philosophy?"
        },
        options: [
            {
                id: 1,
                text: {
                    ko: "현재를 즐겨라! (YOLO)",
                    en: "You Only Live Once (YOLO)"
                },
                scores: [{ trait: "intuition", score: 3 }]
            },
            {
                id: 2,
                text: {
                    ko: "티끌 모아 태산.",
                    en: "Wait for the drops to fill the glass."
                },
                scores: [{ trait: "achievement", score: 3 }]
            },
            {
                id: 3,
                text: {
                    ko: "안 쓰면 100% 할인이다.",
                    en: "If you don't buy it, it's 100% off."
                },
                scores: [{ trait: "independence", score: 3 }]
            },
            {
                id: 4,
                text: {
                    ko: "가격 대비 성능(가성비)이 최고다.",
                    en: "Price-performance ratio is king."
                },
                scores: [{ trait: "assertiveness", score: 3 }]
            }
        ]
    }
];

export const spendingResults = {
    INVESTOR: {
        name: { ko: "스노우볼 메이커", en: "Snowball Maker" },
        description: {
            ko: "돈이 돈을 버는 구조를 만드는 당신! 미래를 위한 투자가 최우선입니다.",
            en: "You make money work for you! Future investment is your priority."
        },
        features: [
            "복리의 마법을 믿습니다.",
            "충동구매를 거의 하지 않습니다.",
            "금융 지식에 관심이 많습니다."
        ],
        advice: "가끔은 현재의 자신에게도 보상을 주세요. 밸런스가 중요합니다!",
        emoji: "📈",
        color: "from-blue-500 to-cyan-500"
    },
    FLEX: {
        name: { ko: "이 구역의 큰손", en: "The Big Spender" },
        description: {
            ko: "돈은 쓰려고 버는 것! 현재의 행복과 경험을 중요시하는 당신은 멋쟁이.",
            en: "Money is for spending! You value current happiness and experiences."
        },
        features: [
            "기분파 소비가 잦습니다.",
            "주변 사람들에게 잘 베풂니다.",
            "트렌드에 민감합니다."
        ],
        advice: "월급날 스쳐지나가는 통장 잔고를 조심하세요. '텅장' 주의보!",
        emoji: "💸",
        color: "from-pink-500 to-rose-500"
    },
    MINIMALIST: {
        name: { ko: "무소유의 현자", en: "The Minimalist Sage" },
        description: {
            ko: "꼭 필요한 것만 산다. 불필요한 소비는 죄악! 깔끔한 재정 상태를 유지합니다.",
            en: "Only buy what's needed. Unnecessary spending is a sin!"
        },
        features: [
            "물건을 살 때 10번 고민합니다.",
            "단순하고 소박한 삶을 지향합니다.",
            "비상금이 두둑합니다."
        ],
        advice: "너무 아끼다 똥 됩니다! 가끔은 질 좋은 물건에 투자해보세요.",
        emoji: "🧘",
        color: "from-green-500 to-emerald-500"
    },
    VALUE: {
        name: { ko: "가성비 헌터", en: "Value Hunter" },
        description: {
            ko: "할인, 적립, 쿠폰의 달인. 같은 물건도 남들보다 싸게 사야 직성이 풀립니다.",
            en: "Master of deals and coupons. Must buy cheaper than others."
        },
        features: [
            "최저가 검색의 달인입니다.",
            "1+1 행사를 사랑합니다.",
            "합리적인 소비를 자부합니다."
        ],
        advice: "싼 게 비지떡일 수도 있어요. 가심비도 챙겨보세요!",
        emoji: "🛒",
        color: "from-amber-500 to-orange-500"
    }
};
