export type PersonalityType = 'TETO' | 'EGEN';

export interface Option {
    id: number;
    text: string;
    type: PersonalityType;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        text: "파티에 도착했을 때, 당신의 행동은?",
        options: [
            { id: 1, text: "큰 소리로 인사하며 존재감을 드러낸다!", type: 'TETO' },
            { id: 2, text: "조용히 아는 사람이 있는지 스캔한다.", type: 'EGEN' },
        ],
    },
    {
        id: 2,
        text: "갑작스러운 계획 변경, 어떻게 반응하나요?",
        options: [
            { id: 1, text: "오히려 좋아! 즉흥적인 게 재밌지.", type: 'TETO' },
            { id: 2, text: "아.. 스트레스 받아. 다시 계획을 세워야 해.", type: 'EGEN' },
        ],
    },
    {
        id: 3,
        text: "팀 프로젝트에서 주로 맡는 역할은?",
        options: [
            { id: 1, text: "리더가 되어 방향을 잡고 지시한다.", type: 'TETO' },
            { id: 2, text: "서포터로서 디테일을 챙기고 보완한다.", type: 'EGEN' },
        ],
    },
    {
        id: 4,
        text: "누군가 내 작업을 비판한다면?",
        options: [
            { id: 1, text: "뭐가 문제인지 논리적으로 따져 묻는다.", type: 'TETO' },
            { id: 2, text: "상처받고 내가 뭘 잘못했나 곱씹는다.", type: 'EGEN' },
        ],
    },
    {
        id: 5,
        text: "당신이 꿈꾸는 완벽한 주말은?",
        options: [
            { id: 1, text: "클럽, 스포츠, 새로운 사람들과의 모임!", type: 'TETO' },
            { id: 2, text: "집에서 넷플릭스, 독서, 혹은 조용한 카페.", type: 'EGEN' },
        ],
    },
    {
        id: 6,
        text: "결정을 내릴 때 가장 중요한 것은?",
        options: [
            { id: 1, text: "나의 직감과 그 순간의 끌림.", type: 'TETO' },
            { id: 2, text: "철저한 분석과 안전한 선택.", type: 'EGEN' },
        ],
    },
    {
        id: 7,
        text: "방에 거미가 나타났다!",
        options: [
            { id: 1, text: "바로 잡거나 쫓아낸다! (전투 모드)", type: 'TETO' },
            { id: 2, text: "소리 지르며 도망가거나 도움을 요청한다.", type: 'EGEN' },
        ],
    },
];
