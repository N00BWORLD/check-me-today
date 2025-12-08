import { VNScenario } from "@/components/VisualNovel";

export const starfallScenario: VNScenario = {
    id: "starfall-rooftop",
    title: {
        ko: "별이 떨어지는 옥상",
        en: "The Starfall Rooftop",
        zh: "星光坠落的屋顶",
        ja: "星が降る屋上",
    },
    initialScene: "prologue",
    scenes: {
        // --- Prologue: The Rumor ---
        prologue: {
            id: "prologue",
            background: "/images/vn/starfall/bg_hallway.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "(소문 들었어? 구관 옥상에 유령이 산다는 얘기...)",
                    en: "(Did you hear the rumor? They say a ghost lives on the old building's rooftop...)",
                    zh: "(听说了吗？据说旧馆屋顶住着幽灵...)",
                    ja: "(噂聞いた？旧校舎の屋上に幽霊が住んでるって話...)",
                },
            },
            nextSceneId: "prologue_2",
        },
        prologue_2: {
            id: "prologue_2",
            background: "/images/vn/starfall/bg_hallway.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "유령이라니, 말도 안 되는 소리. 그냥 호기심에 올라가 보는 거다.",
                    en: "A ghost? Nonsense. I'm just going up there out of curiosity.",
                    zh: "幽灵？胡说八道。我只是出于好奇上去看看。",
                    ja: "幽霊だって？馬鹿げてる。ただ好奇心で上がってみるだけだ。",
                },
            },
            nextSceneId: "scene1_start",
        },

        // --- Scene 1: Rooftop Meeting ---
        scene1_start: {
            id: "scene1_start",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "???", en: "???", zh: "???", ja: "???" },
                text: {
                    ko: "...거기 누구야?",
                    en: "...Who's there?",
                    zh: "...是谁？",
                    ja: "…そこに誰かいるの？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "아, 미안. 문이 열려있길래.",
                        en: "Ah, sorry. The door was open.",
                        zh: "啊，抱歉。门开着。",
                        ja: "あ、ごめん。ドアが開いてたから。",
                    },
                    scoreChange: 0,
                    nextSceneId: "scene1_encounter",
                },
                {
                    text: {
                        ko: "유령인 줄 알았네! 사람 맞지?",
                        en: "Thought you were a ghost! You are human, right?",
                        zh: "还以为是幽灵呢！你是人吧？",
                        ja: "幽霊かと思った！人間だよね？",
                    },
                    scoreChange: 5,
                    nextSceneId: "scene1_ghost_joke",
                },
            ],
        },

        scene1_ghost_joke: {
            id: "scene1_ghost_joke",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "후후, 유령이라... 그렇게 보일 수도 있겠네.",
                    en: "Hehe, a ghost... I guess I could look like one.",
                    zh: "呵呵，幽灵... 确实可能看起来像。",
                    ja: "ふふ、幽霊か…そう見えるかもしれないね。",
                },
            },
            nextSceneId: "scene1_encounter_continue",
        },

        scene1_encounter: {
            id: "scene1_encounter",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "여긴 학생들이 잘 오지 않는 곳인데... 너도 혼자가 편하니?",
                    en: "Students rarely come here... Do you prefer being alone too?",
                    zh: "学生们很少来这里... 你也喜欢独处吗？",
                    ja: "ここは生徒があまり来ない場所だけど…君も一人が楽なの？",
                },
            },
            nextSceneId: "scene1_encounter_continue",
        },

        scene1_encounter_continue: {
            id: "scene1_encounter_continue",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "나는 세라라고 해. 전학 온 지 얼마 안 됐어.",
                    en: "I'm Sera. I transferred here recently.",
                    zh: "我叫塞拉。刚转学不久。",
                    ja: "私はセラ。転校してきたばかりなの。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "반가워 세라. 여기서 뭐 하고 있었어?",
                        en: "Nice to meet you Sera. What were you doing here?",
                        zh: "很高兴见到你塞拉。你在这里做什么？",
                        ja: "よろしく、セラ。ここで何してたの？",
                    },
                    scoreChange: 10,
                    nextSceneId: "scene1_sky",
                },
                {
                    text: {
                        ko: "전학생? 처음 보는데. 수업 땡땡이?",
                        en: "Transfer student? Never saw you. Skipping class?",
                        zh: "转学生？第一次见。逃课？",
                        ja: "転校生？初めて見た。授業サボり？",
                    },
                    scoreChange: -5,
                    nextSceneId: "scene1_skip",
                }
            ]
        },

        scene1_sky: {
            id: "scene1_sky",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "그냥 하늘을 보고 있었어. 노을이 지는 게... 마치 세상이 끝나는 것 같아서 예쁘지 않아?",
                    en: "Just watching the sky. The sunset... looks like the end of the world, isn't it beautiful?",
                    zh: "只是在看天空。日落... 就像世界末日一样，不美吗？",
                    ja: "ただ空を見てたの。夕焼けが…まるで世界が終わるみたいで綺麗じゃない？",
                },
            },
            nextSceneId: "scene2_transition",
        },

        scene1_skip: {
            id: "scene1_skip",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "땡땡이라니, 실례네. 방과 후라구.",
                    en: "Skipping? Rude. It's after school.",
                    zh: "逃课？真失礼。是放学后。",
                    ja: "サボりだなんて失礼ね。放課後よ。",
                },
            },
            nextSceneId: "scene2_transition",
        },

        scene2_transition: {
            id: "scene2_transition",
            background: "/images/vn/starfall/bg_hallway.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "(그날 이후, 나는 종종 옥상에서 그녀를 마주쳤다. 그리고 며칠 뒤...)",
                    en: "(Since that day, I often ran into her on the rooftop. And a few days later...)",
                    zh: "(从那天起，我经常在屋顶遇到她。几天后...)",
                    ja: "(あの日以来、僕は度々屋上で彼女と出くわした。そして数日後…)",
                },
            },
            nextSceneId: "scene2_start",
        },

        // --- Scene 2: The Pendant ---
        scene2_start: {
            id: "scene2_start",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "앗...!",
                    en: "Ah...!",
                    zh: "啊...！",
                    ja: "あっ…！",
                },
            },
            nextSceneId: "scene2_drop",
        },

        scene2_drop: {
            id: "scene2_drop",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "시스템", en: "System", zh: "系统", ja: "システム" },
                text: {
                    ko: "(반짝이는 펜던트가 복도 바닥에 떨어졌다. 푸른 빛이 감돌고 있다.)",
                    en: "(A shining pendant fell to the hallway floor. It glows with a blue light.)",
                    zh: "(闪亮的吊坠掉在走廊地板上。散发着蓝光。)",
                    ja: "(輝くペンダントが廊下に落ちた。青い光を放っている。)",
                },
            },
            choices: [
                {
                    text: {
                        ko: "주워준다. \"이거 흘렸어, 세라야.\"",
                        en: "Pick it up. \"You dropped this, Sera.\"",
                        zh: "捡起来。\"你掉了这个，塞拉。\"",
                        ja: "拾ってあげる。「これ落としたよ、セラ。」",
                    },
                    scoreChange: 20,
                    nextSceneId: "scene2_kind",
                },
                {
                    text: {
                        ko: "신기하게 쳐다본다. \"와, 이거 뭐야? 빛나는데?\"",
                        en: "Stare at it. \"Wow, what is this? It's glowing?\"",
                        zh: "神奇地看着。\"哇，这是什么？在发光？\"",
                        ja: "不思議そうに見つめる。「うわ、何これ？光ってる？」",
                    },
                    scoreChange: 10,
                    nextSceneId: "scene2_curious",
                },
                {
                    text: {
                        ko: "모르는 척 지나간다.",
                        en: "Pretend not to notice and walk by.",
                        zh: "装作没看见走过。",
                        ja: "知らないふりをして通り過ぎる。",
                    },
                    scoreChange: -10,
                    nextSceneId: "scene2_ignore",
                }
            ],
        },

        scene2_kind: {
            id: "scene2_kind",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "아... 고마워. 정말 소중한 물건이거든.",
                    en: "Ah... thanks. It's really precious to me.",
                    zh: "啊... 谢谢。这对我很重要。",
                    ja: "あ…ありがとう。本当に大切なものなんだ。",
                },
            },
            nextSceneId: "scene3_pre",
        },

        scene2_curious: {
            id: "scene2_curious",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "이건... 그냥 장난감이야! (황급히 가져간다)",
                    en: "This is... just a toy! (Snatches it away quickly)",
                    zh: "这是... 只是玩具！(慌忙拿走)",
                    ja: "これは…ただのおもちゃよ！(慌てて持っていく)",
                },
            },
            nextSceneId: "scene3_pre",
        },

        scene2_ignore: {
            id: "scene2_ignore",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "......(말없이 펜던트를 줍는다)",
                    en: "......(Silently picks up the pendant)",
                    zh: "......(默默地捡起吊坠)",
                    ja: "......(黙ってペンダントを拾う)",
                },
            },
            nextSceneId: "scene3_pre",
        },

        // --- Scene 3: The Truth ---
        scene3_pre: {
            id: "scene3_pre",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "그날 저녁, 그녀가 옥상으로 나를 불렀다.",
                    en: "That evening, she called me to the rooftop.",
                    zh: "那天晚上，她叫我去屋顶。",
                    ja: "その日の夕方、彼女が屋上に私を呼んだ。",
                },
            },
            nextSceneId: "scene3_start",
        },

        scene3_start: {
            id: "scene3_start",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "나... 내일이면 떠나야 해.",
                    en: "I... have to leave tomorrow.",
                    zh: "我... 明天就要走了。",
                    ja: "私…明日には行かなきゃいけないの。",
                },
            },
            nextSceneId: "scene3_confession",
        },

        scene3_confession: {
            id: "scene3_confession",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_sad.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "사실 나는 이 별 사람이 아니야. 조사를 위해 잠시 머물렀던 것뿐인데...",
                    en: "Actually, I'm not from this planet. I only stayed for research...",
                    zh: "其实我不是这个星球的人。只是为了调查暂住...",
                    ja: "実は、私はこの星の人間じゃないの。調査のために少し滞在してただけなんだけど...",
                },
            },
            choices: [
                {
                    text: {
                        ko: "알고 있었어. 네가 평범하지 않다는 걸.",
                        en: "I knew it. I knew you weren't ordinary.",
                        zh: "我知道。我知道你不平凡。",
                        ja: "知ってたよ。君が普通じゃないってこと。",
                    },
                    scoreChange: 30,
                    nextSceneId: "scene3_love",
                },
                {
                    text: {
                        ko: "장난치지 마. 그게 무슨 소리야?",
                        en: "Don't joke around. What do you mean?",
                        zh: "别开玩笑了。你在说什么？",
                        ja: "ふざけないで。どういうこと？",
                    },
                    scoreChange: 0,
                    nextSceneId: "scene3_doubt",
                },
                {
                    text: {
                        ko: "그래... 잘 가.",
                        en: "I see... goodbye.",
                        zh: "是吗... 再见。",
                        ja: "そう…さようなら。",
                    },
                    scoreChange: -20,
                    nextSceneId: "scene3_cold",
                }
            ],
        },

        scene3_love: {
            id: "scene3_love",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_shy.png" }, // Should be teary/moved but shy works
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "너는... 정말 다정하구나. 내가 없어도, 나를 기억해 줄래?",
                    en: "You... are really kind. Will you remember me even when I'm gone?",
                    zh: "你... 真的很温柔。即使我不在了，你会记得我吗？",
                    ja: "君は…本当に優しいね。私がいなくても、私を覚えていてくれる？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "절대 잊지 않을게. 좋아했어, 세라.",
                        en: "I'll never forget. I liked you, Sera.",
                        zh: "绝对不会忘记。我喜欢你，塞拉。",
                        ja: "絶対忘れないよ。好きだった、セラ。",
                    },
                    scoreChange: 50,
                    nextSceneId: "ending_check",
                },
                {
                    text: {
                        ko: "응, 좋은 친구로 기억할게.",
                        en: "Yeah, I'll remember you as a good friend.",
                        zh: "嗯，我会记得你是好朋友。",
                        ja: "うん、いい友達として覚えておくよ。",
                    },
                    scoreChange: 20,
                    nextSceneId: "ending_check",
                }
            ]
        },

        scene3_doubt: {
            id: "scene3_doubt",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_sad.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "믿기 힘들겠지만 사실이야. 시간이 없어...",
                    en: "Hard to believe, but it's true. I have no time...",
                    zh: "很难相信，或者是真的。没有时间了...",
                    ja: "信じられないだろうけど、本当なの。時間がないの...",
                },
            },
            nextSceneId: "ending_check",
        },

        scene3_cold: {
            id: "scene3_cold",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_sad.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "...그래. 안녕.",
                    en: "...Okay. Bye.",
                    zh: "...好的。再见。",
                    ja: "...そう。さようなら。",
                },
            },
            nextSceneId: "ending_check",
        },

        ending_check: {
            id: "ending_check",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "시스템", en: "System", zh: "系统", ja: "システム" },
                text: {
                    ko: "운명의 시간이 다가옵니다...(터치하여 결과 확인)",
                    en: "Destiny is approaching...(Touch to see result)",
                    zh: "命运的时刻来临...(点击查看结果)",
                    ja: "運命の時間が近づいています...(タッチして結果を確認)",
                },
            },
            isEnding: true,
        },
    },
};
