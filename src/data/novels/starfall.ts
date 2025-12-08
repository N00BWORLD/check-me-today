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
                    ko: "학교 게시판에는 '구관 옥상 출입 금지' 경고문이 붙어 있다.\n붉은 스프레이 자국은 유령보다 더 무서운 '정학'을 의미한다.",
                    en: "'DO NOT ENTER' signs are plastered everywhere.\nThat red spray paint screams a horror worse than ghosts: 'Suspension'.",
                    zh: "学校公告栏上贴着'禁止进入旧馆屋顶'的警告。\n红色的喷漆代表着比幽灵更可怕的——'停学'。",
                    ja: "掲示板には「立ち入り禁止」の張り紙。\nその赤いスプレーは幽霊より恐ろしい「停学」を意味している。",
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
                    ko: "하지만 하지 말라면 더 하고 싶은 법.\n게다가 유령이라니, 요즘 세상에 그런 게 있을 리가. 그냥 옥상 바람이나 쐬러 가는 거다.",
                    en: "But forbidden fruit tastes sweetest.\nAnd ghosts? In this day and age? No way. I'm just going for some fresh air.",
                    zh: "但越是不让做越想做。\n况且幽灵，这世道哪有那种东西。只是去吹吹风。",
                    ja: "でもダメだと言われるとやりたくなるもの。\nそれに幽霊？今の時代にそんなものあるわけない。ただ風にあたりに行くだけだ。",
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
                    ko: "......(빤히 쳐다본다)\n숨소리가 너무 커. 조용한 감상에 방해돼.",
                    en: "......(Stares intently)\nYou're breathing too loudly. It disrupts the observation.",
                    zh: "......(盯着看)\n呼吸声太大了。妨碍了安静的欣赏。",
                    ja: "……(じっと見つめる)\n息遣いがうるさいわ。静かな鑑賞の邪魔よ。",
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
                    ko: "(누군가 있다. 유령은 아니고... 우리 학교 교복이다. 근데 분위기가 좀 특이하다.)\n아, 미안. 사람이 있을 줄은 몰랐네.",
                    en: "(Someone's here. Not a ghost... wearing our uniform. But she feels odd.)\nAh, sorry. Didn't know anyone was here.",
                    zh: "(有人。不是幽灵...穿着我们学校的校服。但气氛有点特别。)\n啊，抱歉。没想到有人。",
                    ja: "(誰かいる。幽霊じゃなくて…ウチの制服だ。でも雰囲気が少し変わってる。)\nあ、ごめん。人がいるとは思わなかった。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "그냥 갈게. 방해해서 미안.",
                        en: "I'll leave. Sorry to disturb.",
                        zh: "我这就走。抱歉打扰。",
                        ja: "もう行くよ。邪魔してごめん。",
                    },
                    scoreChange: 0,
                    suspicionChange: 0,
                    nextSceneId: "scene1_intro",
                },
                {
                    text: {
                        ko: "근데 여기서 혼자 뭐 해?",
                        en: "But what are you doing here alone?",
                        zh: "但是你一个人在这里做什么？",
                        ja: "でもここで一人で何してるの？",
                    },
                    scoreChange: 5,
                    suspicionChange: -5,
                    nextSceneId: "scene1_intro",
                },
                {
                    text: {
                        ko: "너... 처음 보는데? 전학생?",
                        en: "Never seen you before. Transfer student?",
                        zh: "没见过你？转学生？",
                        ja: "君…初めて見るけど？転校生？",
                    },
                    scoreChange: -5,
                    suspicionChange: 10,
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
                    ko: "나는 세라. 전학 온 지 얼마 안 됐어.\n이 옥상이... 학교에서 하늘이 가장 잘 보여서 좋아.",
                    en: "I'm Sera. Just transferred.\nI like this rooftop... it has the best view of the sky.",
                    zh: "我是塞拉。刚转学不久。\n这屋顶...是学校里看天空最好的地方。",
                    ja: "私はセラ。転校してきたばかり。\nこの屋上…学校で一番空がよく見えるから好きなの。",
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
                    ko: "전학생 맞아. 좀 조용히 지내고 싶었는데... 눈에 띄었나 보네.",
                    en: "Comparison accurate. I wanted to be quiet... but I guess I stand out.",
                    zh: "是转学生。本来想安静待着的...看来也太显眼了。",
                    ja: "転校生よ。少し静かに過ごしたかったんだけど…目立っちゃったみたいね。",
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
                    ko: "저거 봐. 가스가 불타면서 색이 변하고 있어.\n사람들은 왜 저런 비효율적인 연소 과정을 멍하니 쳐다보는 걸까? 너도 저게 예뻐?",
                    en: "Look. Gas burning, changing colors.\nWhy do people stare at such inefficient combustion? do you find it pretty too?",
                    zh: "看那个。气体燃烧，颜色在变。\n人们为什么发呆看着这种低效的燃烧过程？你也觉得那个漂亮吗？",
                    ja: "あれを見て。ガスが燃えて色が変わってる。\n人々はどうしてあんな非効率的な燃焼過程をぼんやり見つめるのかしら？君もあれが綺麗？",
                },
            },
            choices: [
                {
                    text: {
                        ko: "말하는 게 참... 독특하네.",
                        en: "You talk... really uniquely.",
                        zh: "说话真...独特。",
                        ja: "喋り方が…独特だね。",
                    },
                    scoreChange: -5,
                    suspicionChange: 10,
                    nextSceneId: "scene2_transition",
                },
                {
                    text: {
                        ko: "글쎄, 그냥 보고 있으면 기분이 묘해지잖아.",
                        en: "I don't know, it just makes you feel something.",
                        zh: "不知道，只是看着心情会变微妙。",
                        ja: "さあね、ただ見てると気分が不思議になるじゃない。",
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
                    ko: "그날 이후, 복도에서 그녀를 종종 마주쳤다.\n그녀는 항상 뭔가에 쫓기는 사람처럼 주변을 두리번거렸다. 평범한 학생 같지는 않다.",
                    en: "Since then, I saw her in the halls often.\nShe always looked around like she was being chased. Definitely not a normal student.",
                    zh: "那之后，经常在走廊遇到她。\n她总是像被什么追赶一样东张西望。不像普通学生。",
                    ja: "あの日以来、廊下で彼女を度々見かけた。\n彼女はいつも何かに追われている人のように辺りを見回していた。普通の生徒には見えない。",
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
                    ko: "윽...! (갑자기 귀를 막으며 웅크린다)\n이 소리... 종소리가 너무 날카로워... 머리가 깨질 것 같아.",
                    en: "Ugh...! (Crouches, covering ears)\nThis sound... the bell is too sharp... my head feels like it's splitting.",
                    zh: "呃...！(突然捂住耳朵蹲下)\n这声音...钟声太尖锐了...头要炸了。",
                    ja: "うっ…！(急に耳を塞いでうずくまる)\nこの音…チャイムが鋭すぎる…頭が割れそう。",
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
                    ko: "(챙그랑-)\n그녀의 주머니에서 무언가 떨어졌다. 기하학적인 문양이 새겨진 금속 펜던트다.\n은은하게 푸른 빛이 돌고 있다.",
                    en: "(Clatter-)\nSomething fell from her pocket. A metal pendant with geometric patterns.\nIt's glowing faintly blue.",
                    zh: "(当啷-)\n她口袋里掉了什么东西。刻有几何花纹的金属吊坠。\n散发着隐约的蓝光。",
                    ja: "(チャリッ-)\n彼女のポケットから何かが落ちた。幾何学模様が刻まれた金属のペンダントだ。\nほのかに青い光を放っている。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "(주워주며) 괜찮아? 어디 아픈 거야?",
                        en: "(Pick it up) You okay? Are you sick?",
                        zh: "(捡起) 没事吧？哪里不舒服吗？",
                        ja: "(拾って) 大丈夫？どこか具合悪いの？",
                    },
                    scoreChange: 20,
                    suspicionChange: 5,
                    nextSceneId: "scene2_kind",
                },
                {
                    text: {
                        ko: "(펜던트를 유심히 본다) 이거 폰 고리야? 빛이 나는데?",
                        en: "(Inspect closely) Is this a phone charm? It's glowing?",
                        zh: "(仔细看) 这是手机挂件？在发光？",
                        ja: "(ペンダントをよく見る) これスマホのストラップ？光ってるけど？",
                    },
                    scoreChange: -10,
                    suspicionChange: 30,
                    nextSceneId: "scene2_curious",
                },
                {
                    text: {
                        ko: "귀찮아질 거 같다. 모르는 척 가자.",
                        en: "Looks troublesome. Pretend I didn't see.",
                        zh: "好像很麻烦。装作没看见走吧。",
                        ja: "面倒になりそうだ。知らないふりして行こう。",
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
                    ko: "아... 고마워.\n(황급히 펜던트를 챙기며) 그냥... 빈혈이야. 이건 내 부적 같은 거고.",
                    en: "Ah... thanks.\n(Quickly takes pendant) Just... anemia. This is like my charm.",
                    zh: "啊...谢谢。\n(慌忙收起吊坠) 只是...贫血。这是我的护身符。",
                    ja: "あ…ありがとう。\n(慌ててペンダントをしまい) ただの…貧血よ。これは私のお守りみたいなもので。",
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
                    ko: "손대지 마!\n(거칠게 낚아채 간다) ...미안, 남이 만지는 거 싫어해.",
                    en: "Don't touch it!\n(Snatches it away) ...Sorry, I don't like people touching my stuff.",
                    zh: "别碰！\n(粗暴地夺走) ...抱歉，我不喜欢别人碰。",
                    ja: "触らないで！\n(荒々しく奪い取る) …ごめん、人が触るの嫌いなの。",
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
                    ko: "......(한숨을 쉬며 펜던트를 줍는다)",
                    en: "......(Sighs and picks up the pendant)",
                    zh: "......(叹气捡起吊坠)",
                    ja: "......(ため息をついてペンダントを拾う)",
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
                    ko: "며칠 뒤 저녁, 그녀가 옥상으로 나를 불렀다.\n평소의 멍한 표정이 아니다. 뭔가 결심한 듯한 눈빛이다.",
                    en: "Changes later, she called me to the rooftop.\nNot her usual blank look. She looks determined.",
                    zh: "几天后的晚上，她叫我去屋顶。\n不是平时发呆的表情。眼神仿佛下了决心。",
                    ja: "数日後の夕方、彼女が屋上に私を呼んだ。\nいつものぼんやりした顔じゃない。何か決心したような目だ。",
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
                    ko: "나... 내일이면 가야 해.\n원래는 더 일찍 갔어야 했는데... 자꾸 미루게 됐어.",
                    en: "I... have to go tomorrow.\nShould have gone earlier... but I kept delaying it.",
                    zh: "我...明天得走了。\n本来该早点走的...一直拖着。",
                    ja: "私…明日には行かなきゃいけないの。\n本当はもっと早く行くべきだったんだけど…ずっと先延ばしにしてた。",
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
                    ko: "믿을지 모르겠지만, 난 여기서 아주 먼 곳에서 왔어.\n내 고향엔 '작별'이란 말이 없어. 그냥 다같이 하나로 연결되어 있거든.\n근데 여기선... 헤어지면 끝이잖아? 그게 너무... 가슴이 아파.",
                    en: "You might not believe me, but I'm from very far away.\nWe don't have 'goodbye' there. We are all connected.\nBut here... leaving means the end, right? That... hurts my chest.",
                    zh: "不知你信不信，我来自很远的地方。\n我故乡没有'道别'。大家都是连在一起的。\n但这这里...分开就是结束对吧？那太...心痛了。",
                    ja: "信じないかもしれないけど、私はすごく遠い所から来たの。\n故郷には『さよなら』という言葉がないの。みんな一つに繋がってるから。\nでもここでは…別れたら終わりでしょ？それがすごく…胸が痛いの。",
                },
            },
            choices: [
                {
                    text: {
                        ko: "알고 있었어. 넌 좀... 특별했으니까.",
                        en: "I knew. You were always... special.",
                        zh: "我知道。你一直...很特别。",
                        ja: "知ってたよ。君はずっと…特別だったから。",
                    },
                    scoreChange: 30, // High Love
                    suspicionChange: 0,
                    nextSceneId: "scene3_love_path",
                },
                {
                    text: {
                        ko: "솔직히 말해줘서 고마워. 이제야 이해가 되네.",
                        en: "Thanks for being honest. Makes sense now.",
                        zh: "谢谢你坦白。现在理解了。",
                        ja: "正直に話してくれてありがとう。やっと理解できたよ。",
                    },
                    scoreChange: 0,
                    suspicionChange: 20, // High Logic
                    nextSceneId: "scene3_logic_path",
                },
                {
                    text: {
                        ko: "무슨 소설 써? 전학 가는 거면서.",
                        en: "Writing a novel? You're just transferring.",
                        zh: "写小说呢？明明只是转学。",
                        ja: "小説でも書いてるの？ただの転校でしょ。",
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
                    ko: "너는... 정말 이상한 애야.\n외계인이라고 해도 놀라지도 않고... 그냥 내 옆에 있어주는구나.",
                    en: "You are... really weird.\nNot scanned by 'alien'... just staying by my side.",
                    zh: "你...真是奇怪的孩子。\n说是外星人也不惊讶...只是待在我身边。",
                    ja: "君は…本当に変な子ね。\n宇宙人だと言っても驚きもしないで…ただ私のそばにいてくれるのね。",
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
                    ko: "눈치채고 있었어? 하긴... 내가 좀 어설펐지.\n지구인들은 생각보다 예리하구나.",
                    en: "Did you notice? Well... I was clumsy.\nEarthlings are sharper than I thought.",
                    zh: "察觉到了？也是...我有点笨拙。\n地球人比想象中敏锐啊。",
                    ja: "気づいてたの？まあ…私が少し不器用だったわね。\n地球人は思ったより鋭いのね。",
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
                    ko: "...그래. 차라리 농담으로 받아들이는 게 낫겠네.\n잘 지내. 안녕.",
                    en: "...Okay. Better to take it as a joke.\nTake care. Bye.",
                    zh: "...好的。当成玩笑更好。\n保重。再见。",
                    ja: "...そう。冗談として受け取る方がいいわね。\n元気で。さようなら。",
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
                    ko: "그녀와의 시간이 끝났습니다...(터치하여 결과 확인)",
                    en: "Time with her is up...(Touch to see result)",
                    zh: "与她的时间结束了...(点击查看结果)",
                    ja: "彼女との時間が終わりました...(タッチして結果を確認)",
                },
            },
            isEnding: true,
        },
    },
};
