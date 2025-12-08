import { VNScenario } from "@/components/VisualNovel";

export const starfallScenario: VNScenario = {
    id: "starfall-rooftop",
    title: {
        ko: "별이 떨어지는 옥상",
        en: "The Starfall Rooftop",
        zh: "星光坠落的屋顶",
        ja: "星が降る屋上",
    },
    initialScene: "scene1_start",
    scenes: {
        // --- Scene 1: Rooftop Meeting ---
        scene1_start: {
            id: "scene1_start",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: {
                image: "/images/vn/starfall/sera_base.png",
            },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "...아, 너구나. 여기 출입 금지인 거 몰랐어?",
                    en: "...Ah, it's you. Didn't you know this area is off-limits?",
                    zh: "...啊，是你。不知道这里禁止进入吗？",
                    ja: "…あ、あなたね。ここ立ち入り禁止だって知らなかった？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "미안, 문이 열려있길래. 너는 뭐 하고 있었어?",
                        en: "Sorry, the door was open. What were you doing?",
                        zh: "抱歉，门开着。你在做什么？",
                        ja: "ごめん、ドアが開いてたから。何してたの？",
                    },
                    scoreChange: 10,
                    nextSceneId: "scene1_polite",
                },
                {
                    text: {
                        ko: "너야말로 여기서 뭐 해? 선생님한테 이른다?",
                        en: "What are YOU doing here? I'm telling the teacher.",
                        zh: "你在这里做什么？我要告诉老师。",
                        ja: "あなたこそここで何してるの？先生に言うよ？",
                    },
                    scoreChange: -10,
                    nextSceneId: "scene1_playful",
                },
                {
                    text: {
                        ko: "그냥 바람 좀 쐬러 왔어. 옆에 있어도 돼?",
                        en: "Just came for some air. Can I stay with you?",
                        zh: "只是来吹吹风。可以待在你旁边吗？",
                        ja: "ただ風に当たりに来たんだ。隣にいてもいい？",
                    },
                    scoreChange: 20,
                    nextSceneId: "scene1_active",
                },
                {
                    text: {
                        ko: "...(아무 말 없이 옆에 가서 선다)",
                        en: "...(Stand next to her silently)",
                        zh: "...(默默地站在旁边)",
                        ja: "…(何も言わずに隣に立つ)",
                    },
                    scoreChange: 5,
                    nextSceneId: "scene1_silent",
                },
            ],
        },
        scene1_polite: {
            id: "scene1_polite",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" }, // Ideally need 'surprised'
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "딱히... 그냥 하늘 보고 있었어. 너도 볼래?",
                    en: "Nothing really... just watching the sky. Want to watch too?",
                    zh: "没做什么... 只是在看天空。你也想看吗？",
                    ja: "別に…ただ空を見てただけ。あなたも見る？",
                },
            },
            nextSceneId: "scene2_start",
        },
        scene1_playful: {
            id: "scene1_playful",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" }, // Ideally need 'annoyed'
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "흥, 이를 테면 이르던가. 난 상관없어.",
                    en: "Hmph, tell if you want. I don't care.",
                    zh: "哼，想告就告吧。我无所谓。",
                    ja: "ふん、言いたければ言えば。私は構わない。",
                },
            },
            nextSceneId: "scene2_start",
        },
        scene1_active: {
            id: "scene1_active",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" }, // Ideally need 'shy'
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "...마음대로 해. 옥상은 내 것도 아니니까.",
                    en: "...Do as you please. The rooftop isn't mine anyway.",
                    zh: "...随你便。反正屋顶也不是我的。",
                    ja: "…好きにして。屋上は私のものじゃないし。",
                },
            },
            nextSceneId: "scene2_start",
        },
        scene1_silent: {
            id: "scene1_silent",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" }, // Ideally need 'expressionless'
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "(그녀는 말없이 다시 하늘을 올려다본다...)",
                    en: "(She silently looks back up at the sky...)",
                    zh: "(她默默地再次仰望天空...)",
                    ja: "(彼女は言葉なく再び空を見上げる…)",
                },
            },
            nextSceneId: "scene2_start",
        },

        // --- Scene 2: The Pendant ---
        scene2_start: {
            id: "scene2_start",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "앗... (펜던트가 당신 발앞에 떨어진다)",
                    en: "Ah... (The pendant falls in front of your feet)",
                    zh: "啊... (吊坠掉在你脚前)",
                    ja: "あっ… (ペンダントがあなたの足元に落ちる)",
                },
            },
            choices: [
                {
                    text: {
                        ko: "이거 뭐야? 엄청 예쁘다. 빛이 나는데?",
                        en: "What's this? It's beautiful. It's glowing?",
                        zh: "这是什么？好漂亮。在发光？",
                        ja: "これ何？すごく綺麗。光ってる？",
                    },
                    scoreChange: 10,
                    nextSceneId: "scene2_curious",
                },
                {
                    text: {
                        ko: "조심해야지. 자, 여기.",
                        en: "Be careful. Here you go.",
                        zh: "小心点。给，这里。",
                        ja: "気をつけなきゃ。はい、これ。",
                    },
                    scoreChange: 20,
                    nextSceneId: "scene2_kind",
                },
                {
                    text: {
                        ko: "너... 외계인이지? 이거 통신기지?",
                        en: "You... are an alien, right? Is this a communicator?",
                        zh: "你... 是外星人吧？这是通讯器？",
                        ja: "お前…宇宙人だろ？これ通信機？",
                    },
                    scoreChange: -20,
                    nextSceneId: "scene2_weird",
                },
                {
                    text: {
                        ko: "(못 본 척하고 그냥 지나간다)",
                        en: "(Pretend not to see and walk past)",
                        zh: "(装作没看见走过)",
                        ja: "(見なかったことにして通り過ぎる)",
                    },
                    scoreChange: -5,
                    nextSceneId: "scene2_ignore",
                },
            ],
        },
        scene2_curious: {
            id: "scene2_curious",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "아, 아무것도 아냐! ...고마워.",
                    en: "Ah, it's nothing! ...Thanks.",
                    zh: "啊，没什么！...谢谢。",
                    ja: "あ、何でもない！…ありがとう。",
                },
            },
            nextSceneId: "scene3_start",
        },
        scene2_kind: {
            id: "scene2_kind",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "...고마워. 정말 소중한 거였거든.",
                    en: "...Thank you. It was really precious to me.",
                    zh: "...谢谢。这对我很重要。",
                    ja: "…ありがとう。本当に大切なものだったの。",
                },
            },
            nextSceneId: "scene3_start",
        },
        scene2_weird: {
            id: "scene2_weird",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "....(한심하다는 눈빛으로 쳐다보고 가버린다)",
                    en: "....(Looks at you with pathetic eyes and leaves)",
                    zh: "....(用看傻瓜的眼神看着你然后离开了)",
                    ja: "....(呆れた目つきで見て行ってしまう)",
                },
            },
            nextSceneId: "scene3_start",
        },
        scene2_ignore: {
            id: "scene2_ignore",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "....(쓸쓸하게 혼자 줍는다)",
                    en: "....(Lonely picks it up alone)",
                    zh: "....(寂寞地独自捡起)",
                    ja: "....(寂しそうに一人で拾う)",
                },
            },
            nextSceneId: "scene3_start",
        },

        // --- Scene 3: Climax (Night Rooftop) ---
        // Note: Reusing sunset bg as placeholder, ideally 'night'
        scene3_start: {
            id: "scene3_start",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "나... 사실 오늘이 마지막이야. 내가 떠나면, 나를 기억해 줄래?",
                    en: "I... actually today is my last day. When I leave, will you remember me?",
                    zh: "我... 其实今天是最后一天。如果我离开，你会记得我吗？",
                    ja: "私…実は今日が最後なの。私が去ったら、私を覚えていてくれる？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "당연하지. 너는 내게 가장 소중한 별이니까.",
                        en: "Of course. You are my most precious star.",
                        zh: "当然。你是我最珍贵的星星。",
                        ja: "もちろん。君は僕にとって一番大切な星だから。",
                    },
                    scoreChange: 30,
                    nextSceneId: "ending_check",
                },
                {
                    text: {
                        ko: "어디로 가는데? 연락처라도 주고 가.",
                        en: "Where are you going? Give me your contact info at least.",
                        zh: "要去哪里？至少留下联系方式吧。",
                        ja: "どこに行くの？連絡先くらい置いてってよ。",
                    },
                    scoreChange: 10,
                    nextSceneId: "ending_check",
                },
                {
                    text: {
                        ko: "기억은 하겠지만... 너무 갑작스럽네.",
                        en: "I'll remember... but it's so sudden.",
                        zh: "会记得... 但太突然了。",
                        ja: "覚えているとは思うけど…あまりに急だね。",
                    },
                    scoreChange: 0,
                    nextSceneId: "ending_check",
                },
                {
                    text: {
                        ko: "글쎄, 시간이 지나면 잊혀지겠지.",
                        en: "Well, I'll probably forget as time passes.",
                        zh: "这个嘛，随着时间流逝应该会忘吧。",
                        ja: "さあ、時間が経てば忘れるだろうね。",
                    },
                    scoreChange: -30,
                    nextSceneId: "ending_check",
                },
            ],
        },

        // --- Ending Check Node (score evaluation is done in component onComplete usually, 
        // but here we want in-game branching. Our engine does simple nextScene logic.
        // For advanced logic, we need to handle it in handleChoice or make a 'Logic Scene'.
        // Workaround: We will let the LAST choice lead to an 'ending' scene, but wait!
        // The engine's handleChoice is simple. We need dynamic branching.
        // Let's modify visual novel engine OR add 4 separate ending paths?
        // User requested specific logic: if score >= 80 etc.
        // Since the engine component I wrote relies on `onComplete` for the final score,
        // let's pass the buck to the parent component to render the Ending Screen?
        // Yes! Let's make the last choices all lead to a "finish" state.
        // So nextSceneId="ENDING" 

        ending_check: {
            id: "ending_check",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_base.png" },
            dialogue: {
                speaker: { ko: "시스템", en: "System", zh: "系统", ja: "システム" },
                text: {
                    ko: "엔딩을 확인합니다...",
                    en: "Checking ending...",
                    zh: "正在确认结局...",
                    ja: "エンディングを確認します...",
                }
            },
            isEnding: true,
        }
    },
};
