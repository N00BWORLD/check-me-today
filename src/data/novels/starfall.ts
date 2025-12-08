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
        // -------------------------
        // Act 1: The Inciting Incident
        // -------------------------
        prologue: {
            id: "prologue",
            background: "/images/vn/starfall/bg_hallway.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "학교 게시판에는 '구관 옥상 출입 금지'라는 경고문이 붙어 있다.\n붉은색 스프레이로 덧칠해진 그 경고문은 유령 따위보다 훨씬 현실적인 공포, 즉 '정학'을 의미한다.",
                    en: "'DO NOT ENTER' signs preserve the legend of the rooftop ghost.\nBut to me, that red spray paint screams a much more realistic horror: 'Suspension'.",
                    zh: "学校公告栏上贴着'禁止进入旧馆屋顶'的警告。\n比起幽灵，那红色的喷漆代表着更现实的恐惧——'停学'。",
                    ja: "掲示板には「立ち入り禁止」の張り紙。\nその赤いスプレーが意味するのは幽霊なんかより現実的な恐怖、「停学」だ。",
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
                    ko: "하지만 인간의 호기심이란 금지될수록 타오르는 법이다.\n게다가 유령? 질량 보존의 법칙을 무시하는 존재가 있다면 내 눈으로 직접 확인하고 논문으로 써주지.",
                    en: "But curiosity burns hottest when forbidden.\nAnd ghosts? If there's an entity defying the conservation of mass, I'll document it and publish a paper.",
                    zh: "但好奇心越是被禁止越是燃烧。\n况且幽灵？如果真有无视质量守恒定律的存在，我就亲自确认并写成论文。",
                    ja: "だが好奇心は禁止されるほど燃え上がる。\nそれに幽霊？質量保存の法則を無視する存在がいるなら、この目で確かめて論文にしてやる。",
                },
            },
            nextSceneId: "scene1_start",
        },

        scene1_start: {
            id: "scene1_start",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "???", en: "???", zh: "???", ja: "???" },
                text: {
                    ko: "......밀도가 높아. \n이 구역의 생명체 반응, 예상보다 15% 초과.",
                    en: "......High density.\nLifeform readings in this sector exceed projections by 15%.",
                    zh: "......密度很高。\n该区域的生命体反应比预期高出15%。",
                    ja: "……密度が高い。\nこの区域の生命体反応、予想より15%超過。",
                },
            },
            nextSceneId: "scene1_encounter",
        },
        scene1_encounter: {
            id: "scene1_encounter",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "(누군가 있다. 유령? 아니, 그냥 여학생이다. 하지만 뭔가... 위화감이 든다.)\n저기요?",
                    en: "(Someone's there. A ghost? No, just a girl. But something feels... off.)\nExcuse me?",
                    zh: "(有人。幽灵？不，只是个女学生。但总觉得...有违和感。)\n那个？",
                    ja: "(誰かいる。幽霊？いや、ただの女子生徒だ。でも何か…違和感がある。)\nあの？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "아, 미안. 문이 열려있길래.",
                        en: "Ah, sorry. The door was open.",
                        zh: "抱歉。门开着。",
                        ja: "ごめん。ドアが開いてたから。",
                    },
                    scoreChange: 0,
                    suspicionChange: 0,
                    nextSceneId: "scene1_intro",
                },
                {
                    text: {
                        ko: "거기서 혼자 뭐 하세요?",
                        en: "What are you doing here alone?",
                        zh: "在这个人做什么？",
                        ja: "ここで一人で何してるの？",
                    },
                    scoreChange: 5,
                    suspicionChange: -5,
                    nextSceneId: "scene1_intro",
                },
                {
                    text: {
                        ko: "당신... 사람이 아니군?",
                        en: "You are... not human?",
                        zh: "你...不是人吧？",
                        ja: "君…人間じゃないな？",
                    },
                    scoreChange: -5,
                    suspicionChange: 20,
                    nextSceneId: "scene1_suspicion",
                }
            ],
        },

        scene1_intro: {
            id: "scene1_intro",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "나는 세라. 학습을 위해... 아니, 전학 온 지 얼마 안 됐어.\n이 옥상의 좌표가 노을 관측에 최적화되어 있더군.",
                    en: "I am Sera. Here for learning... no, I transferred recently.\nThese coordinates are optimized for sunset observation.",
                    zh: "我是塞拉。为了学习...不，刚转学不久。\n这屋顶的坐标最适合观测日落。",
                    ja: "私はセラ。学習のために…いや、転校してきたばかり。\nこの屋上の座標が夕焼けの観測に最適化されていたの。",
                },
            },
            nextSceneId: "scene1_sky",
        },

        scene1_suspicion: {
            id: "scene1_suspicion",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "유령? (자신의 손을 내려다보며)\n내 신체 구성 물질의 밀도는 정상 범위인데... 투명화 모듈이 오작동한 건가?",
                    en: "Ghost? (Looks at hand)\nMy body density is within normal parameters... Did the cloaking module malfunction?",
                    zh: "幽灵？(看着自己的手)\n我的身体密度在正常范围内... 隐形模块故障了吗？",
                    ja: "幽霊？(自分の手を見下ろして)\n私の身体構成物質の密度は正常範囲だけど…透明化モジュールが誤作動したのかしら？",
                },
            },
            nextSceneId: "scene1_suspicion_2",
        },
        scene1_suspicion_2: {
            id: "scene1_suspicion_2",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "...뭐라고? 투명화 모듈?",
                    en: "...What? Cloaking module?",
                    zh: "...什么？隐形模块？",
                    ja: "…何だって？透明化モジュール？",
                },
            },
            nextSceneId: "scene1_joke_cover",
        },
        scene1_joke_cover: {
            id: "scene1_joke_cover",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_smile.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "아, 아무것도 아니야! 농담... 농담이야. 하. 하. 하.\n(굉장히 어색한 웃음이다)",
                    en: "Ah, nothing! Joke... it was a joke. Ha. Ha. Ha.\n(It's an incredibly awkward laugh)",
                    zh: "啊，没什么！玩笑...是玩笑。哈。哈。哈。\n(非常尴尬的笑声)",
                    ja: "あ、何でもない！冗談…冗談よ。ハ。ハ。ハ。\n(ものすごくぎこちない笑いだ)",
                },
            },
            nextSceneId: "scene1_sky",
        },

        scene1_sky: {
            id: "scene1_sky",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "태양의 입사각이 굴절되어 대기가 붉게 산란되고 있어.\n이 행성의 생명체들은 이 비효율적인 에너지 소멸 과정을 '아름답다'고 정의한다지?",
                    en: "Angle of incidence refracting, scattering red light.\nBeings on this planet define this inefficient energy dissipation as 'beautiful', correct?",
                    zh: "太阳入射角折射，大气散射红光。\n这星球的生命体把这种低效的能量消散过程定义为'美'，对吧？",
                    ja: "太陽の入射角が屈折し、大気が赤く散乱している。\nこの惑星の生命体は、この非効率的なエネルギー消滅過程を『美しい』と定義するんだったわよね？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "너... 말투가 왜 그래?",
                        en: "Why do you talk like that?",
                        zh: "你怎么那样说话？",
                        ja: "君…喋り方が変だよ？",
                    },
                    scoreChange: -5,
                    suspicionChange: 10,
                    nextSceneId: "scene2_transition",
                },
                {
                    text: {
                        ko: "맞아. 낭만적이잖아. 너도 그렇게 생각해?",
                        en: "Yeah. It's romantic. Don't you think so?",
                        zh: "是啊。很浪漫。你不这么觉得吗？",
                        ja: "うん。ロマンチックじゃない。君もそう思う？",
                    },
                    scoreChange: 10,
                    suspicionChange: 0,
                    nextSceneId: "scene2_transition",
                }
            ]
        },

        // -------------------------
        // Act 2: The Rising Action (Crisis)
        // -------------------------
        scene2_transition: {
            id: "scene2_transition",
            background: "/images/vn/starfall/bg_hallway.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "그날 이후, 나는 그녀를 관찰하기 시작했다.\n급식을 원소 기호로 분석하거나, 자판기와 대화하는 모습... 확실히 평범하지 않다.",
                    en: "Since then, I started observing her.\nAnalyzing lunch via periodic table, talking to vending machines... Definitely not normal.",
                    zh: "那之后，我开始观察她。\n用元素符号分析午餐，和自动售货机对话...确实不正常。",
                    ja: "あの日以来、僕は彼女を観察し始めた。\n給食を元素記号で分析したり、自販機と会話したり…明らかに普通じゃない。",
                },
            },
            nextSceneId: "scene2_start",
        },
        scene2_start: {
            id: "scene2_start",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "으윽...! (갑자기 귀를 막으며 비틀거린다)\n이 주파수... 견딜 수 없어...!",
                    en: "Ugh...! (Stumbles, covering ears)\nThis frequency... Can't withstand it...!",
                    zh: "呃...！(突然捂住耳朵踉跄)\n这频率...受不了...！",
                    ja: "うっ…！(急に耳を塞いでよろめく)\nこの周波数…耐えられない…！",
                },
            },
            effect: "shake",
            nextSceneId: "scene2_drop",
        },
        scene2_drop: {
            id: "scene2_drop",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "시스템", en: "System", zh: "系统", ja: "システム" },
                text: {
                    ko: "(채랭-)\n그녀의 주머니에서 펜던트가 떨어졌다. 단순한 액세서리가 아니다.\n미세하게 진동하며 푸른 빛을 내뿜고 있다.",
                    en: "(Clatter-)\nA pendant fell from her pocket. Not jewelry.\nIt's vibrating subtly, emitting a blue pulse.",
                    zh: "(当啷-)\n她的口袋掉出了吊坠。不是简单的饰品。\n发出微弱振动，散发蓝光。",
                    ja: "(チャリッ-)\n彼女のポケットからペンダントが落ちた。ただのアクセサリーじゃない。\n微かに振動し、青い光を放っている。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "(주워주며) 괜찮아? 많이 아파 보이는데.",
                        en: "(Pick it up) Are you okay? You look in pain.",
                        zh: "(捡起) 没事吧？看起来很痛。",
                        ja: "(拾って) 大丈夫？すごく痛そうだけど。",
                    },
                    scoreChange: 20,
                    suspicionChange: 5,
                    nextSceneId: "scene2_kind",
                },
                {
                    text: {
                        ko: "(펜던트를 자세히 본다) 이거... 지도가 움직이는데?",
                        en: "(Inspect pendant) This... is the map moving?",
                        zh: "(仔细看吊坠) 这个...地图在动？",
                        ja: "(ペンダントを詳しく見る) これ…地図が動いてる？",
                    },
                    scoreChange: -10,
                    suspicionChange: 30,
                    nextSceneId: "scene2_curious",
                },
                {
                    text: {
                        ko: "모르는 척 지나간다.",
                        en: "Ignore and walk away.",
                        zh: "装作不知道走开。",
                        ja: "知らないふりをして通り過ぎる。",
                    },
                    scoreChange: -10,
                    suspicionChange: 0,
                    nextSceneId: "scene2_ignore",
                }
            ],
        },

        scene2_kind: {
            id: "scene2_kind",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_shy.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "아... 고마워.\n(펜던트를 소중히 쥐며) 이건 내... 유일한 연결 고리야.",
                    en: "Ah... thanks.\n(Clutches pendant) This is my... only connection.",
                    zh: "啊...谢谢。\n(珍惜地握着吊坠) 这是我...唯一的连接。",
                    ja: "あ…ありがとう。\n(ペンダントを大事に握り) これは私の…唯一の繋がりなの。",
                },
            },
            nextSceneId: "scene3_pre",
        },
        scene2_curious: {
            id: "scene2_curious",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_surprised.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "내놔! 이건 장난감이 아니야!\n(황급히 낚아채며 경계하는 눈빛을 보낸다)",
                    en: "Give it! It's not a toy!\n(Snatches it back, eyeing you warily)",
                    zh: "拿来！这不是玩具！\n(慌忙夺回，露出警惕的眼神)",
                    ja: "返して！これはおもちゃじゃないの！\n(慌てて奪い取り、警戒した目を向ける)",
                },
            },
            nextSceneId: "scene3_pre",
        },
        scene2_ignore: {
            id: "scene2_ignore",
            background: "/images/vn/starfall/bg_hallway.png",
            character: { image: "/images/vn/starfall/sera_sad.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "......(말없이 펜던트를 줍는다)",
                    en: "......(Silently picks it up)",
                    zh: "......(默默捡起)",
                    ja: "......(黙って拾う)",
                },
            },
            nextSceneId: "scene3_pre",
        },

        // -------------------------
        // Act 3: The Truth (Climax)
        // -------------------------
        scene3_pre: {
            id: "scene3_pre",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            dialogue: {
                speaker: { ko: "나", en: "Me", zh: "我", ja: "私" },
                text: {
                    ko: "그날 밤, 그녀가 옥상으로 나를 불렀다.\n평소와 다른 차가운 공기. 직감이 경고하고 있다.",
                    en: "That night, she called me to the rooftop.\nCold air. My intuition is screaming.",
                    zh: "那天晚上，她叫我去屋顶。\n空气异常寒冷。直觉在警告我。",
                    ja: "その日の夜、彼女が屋上に私を呼んだ。\nいつもと違う冷たい空気。直感が警告している。",
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
                    ko: "나... 내일이면 떠나야 해.\n데이터 수집이 완료됐어. 아니, 사실 오류가 났어.",
                    en: "I... leave tomorrow.\nData collection complete. No, actually, a critical error occurred.",
                    zh: "我...明天要走了。\n数据收集完成。不，其实出错了。",
                    ja: "私…明日には行かなきゃいけないの。\nデータ収集が完了したわ。いや、実はエラーが起きたの。",
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
                    ko: "내 고향엔 '작별'이란 개념이 없어. 데이터가 통합될 뿐이니까.\n하지만 지구에선... 떠나면 영원히 볼 수 없다는 걸 배웠어.\n그래서 지금 나는... 시스템 오류가 날 만큼 슬퍼.",
                    en: "My home has no concept of 'goodbye'. Data just integrates.\nBut here... leaving means never seeing you again.\nI am... sad enough to crash my system.",
                    zh: "我故乡没有'道别'的概念。只是数据统合。\n但在地球...离开就意味着永远不见。\n所以我现在...悲伤到系统要崩溃。",
                    ja: "私の故郷に『さよなら』という概念はないの。データが統合されるだけだから。\nでも地球では…去れば永遠に会えないと学んだわ。\nだから今私は…システムエラーが起きるほど悲しいの。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "상관없어. 네가 외계인이든 유령이든, 넌 그냥 세라잖아.",
                        en: "Doesn't matter. Alien, ghost... you're just Sera.",
                        zh: "没关系。无论外星人还是幽灵，你就是塞拉。",
                        ja: "関係ない。宇宙人でも幽霊でも、君はただのセラだ。",
                    },
                    scoreChange: 30, // High Love
                    suspicionChange: 0,
                    nextSceneId: "scene3_love_path",
                },
                {
                    text: {
                        ko: "그럴 줄 알았어. 펜던트도 말투도... 다 설명이 되는군.",
                        en: "I knew it. The pendant, the speech... explains everything.",
                        zh: "我就知道。吊坠和语气...都能解释了。",
                        ja: "そうだと思った。ペンダントも口調も…全て説明がつく。",
                    },
                    scoreChange: 0,
                    suspicionChange: 20, // High Logic
                    nextSceneId: "scene3_logic_path",
                },
                {
                    text: {
                        ko: "미친 소리 하지 마. SF 영화 너무 많이 본 거 아니야?",
                        en: "Don't be crazy. Too many sci-fi movies?",
                        zh: "别发疯了。科幻片看多了吧？",
                        ja: "ふざけないで。SF映画の見すぎじゃない？",
                    },
                    scoreChange: -20, // Low Love
                    suspicionChange: -10,
                    nextSceneId: "scene3_cold",
                }
            ],
        },

        // --- Paths ---
        scene3_love_path: {
            id: "scene3_love_path",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_shy.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "너는... 정말 비논리적일 정도로 다정하구나.\n내가 없어도, 나를 데이터 속에서라도 기억해 줄래?",
                    en: "You are... illogically kind.\nWill you remember me, even if only in data?",
                    zh: "你...真是温柔得不合逻辑。\n即使我不在，也会在数据中记得我吗？",
                    ja: "君は…本当に非論理的なほど優しいのね。\n私がいなくても、データの中でだけでも覚えていてくれる？",
                },
            },
            nextSceneId: "ending_check",
        },
        scene3_logic_path: {
            id: "scene3_logic_path",
            background: "/images/vn/starfall/bg_rooftop_sunset.png",
            character: { image: "/images/vn/starfall/sera_main.png" },
            dialogue: {
                speaker: { ko: "세라", en: "Sera", zh: "塞拉", ja: "セラ" },
                text: {
                    ko: "역시... 넌 눈치채고 있었구나.\n지구인의 관찰력, 예상 범위를 상회했어.",
                    en: "So... you noticed.\nEarthling observation skills exceeded parameters.",
                    zh: "果然...你察觉到了。\n地球人的观察力超出了预期范围。",
                    ja: "やっぱり…気づいていたのね。\n地球人の観察力、予想範囲を上回ったわ。",
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
                    ko: "...그래. 이해해.\n이런 비과학적인 얘기, 받아들이기 힘들겠지. 안녕.",
                    en: "...Okay. I understand.\nUnscientific data is hard to accept. Bye.",
                    zh: "...好的。我理解。\n这种不科学的话很难接受吧。再见。",
                    ja: "...そう。理解するわ。\nこんな非科学的な話、受け入れ難いわよね。さようなら。",
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
                    ko: "전송 프로토콜 개시...(터치하여 결말 확인)",
                    en: "Transmission Protocol Start...(Touch to see result)",
                    zh: "传输协议启动...(点击查看结果)",
                    ja: "転送プロトコル開始...(タッチして結果を確認)",
                },
            },
            isEnding: true,
        },
    },
};
