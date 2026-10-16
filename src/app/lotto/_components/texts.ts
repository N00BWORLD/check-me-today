// 로또 번호 추첨기 화면 문구 (4개 언어)
// - 어르신이 읽기 쉽도록 외래어 대신 쉬운 한국어를 쓴다.
// - 추첨 방식 이름·설명은 methodTexts 에 방식별로 모아 둔다.

import type { FrequencyTag, LottoGameId, LottoMethod } from "@/data/lotto";

export type LocalizedText = { ko: string; en: string; zh: string; ja: string };

export const texts = {
  // ----- 공통 -----
  title: { ko: "로또 번호 뽑기", en: "Lotto Number Picker", zh: "乐透号码抽取", ja: "ロト番号を選ぶ" },
  subtitle: {
    ko: "마음에 드는 방식을 하나 고르면 번호 6개를 뽑아 드립니다",
    en: "Pick a method and we draw 6 numbers for you",
    zh: "选一种方式，为您抽出6个号码",
    ja: "好きな方式を一つ選ぶと6個の番号を選びます",
  },
  home: { ko: "처음 화면으로", en: "Home", zh: "回到首页", ja: "ホームへ" },
  back: { ko: "방식 다시 고르기", en: "Choose another method", zh: "重新选择方式", ja: "方式を選び直す" },
  disclaimer: {
    ko: "※ 재미로 보는 것이며 당첨을 보장하지 않습니다. 복권은 적당히 즐기세요.",
    en: "※ For fun only. Winning is not guaranteed. Please play responsibly.",
    zh: "※ 仅供娱乐，不保证中奖。请理性购彩。",
    ja: "※ 娯楽目的であり当選を保証するものではありません。ほどほどに楽しみましょう。",
  },
  statsBasisRound: {
    ko: "출현 횟수는 1회부터 {round}회({date})까지의 당첨 번호 기준입니다. 보너스 번호는 빼고 셌습니다. (출처: {source})",
    en: "Frequencies are based on draws 1 to {round} ({date}), bonus numbers excluded. (Source: {source})",
    zh: "出现次数以第1期至第{round}期（{date}）的中奖号码为准，不含奖励号码。（来源：{source}）",
    ja: "出現回数は第1回から第{round}回（{date}）までの当選番号が基準です。ボーナス番号は除きます。（出典：{source}）",
  },
  statsBasisDate: {
    ko: "출현 횟수는 현재 규칙이 시작된 {since}부터 {date}까지 {count}회 추첨의 본번호 기준입니다. 보조 공은 빼고 셌습니다. (출처: {source})",
    en: "Frequencies cover the {count} draws from {since} (current rules) to {date}, main numbers only. (Source: {source})",
    zh: "出现次数以现行规则开始的{since}至{date}共{count}期的主号码为准，不含特别号码。（来源：{source}）",
    ja: "出現回数は現行ルール開始の{since}から{date}までの{count}回の本数字が基準です。特別数字は除きます。（出典：{source}）",
  },
  statsMissing: {
    ko: "이 복권은 믿을 만한 역대 당첨 자료를 구하지 못해 '적게 나온 번호'와 '많이 나온 번호' 방식은 제공하지 않습니다.",
    en: "No reliable draw history is available for this lottery, so the rarely/frequently drawn methods are not offered.",
    zh: "此彩票暂无可靠的历史开奖资料，因此不提供“出现少/出现多的号码”方式。",
    ja: "この宝くじは信頼できる過去の当せんデータが得られないため、「あまり出ていない/よく出ている番号」方式は提供していません。",
  },

  // ----- 게임 고르기 -----
  selectedMark: { ko: "선택함", en: "Selected", zh: "已选", ja: "選択中" },
  chooseGame: { ko: "어느 복권인가요?", en: "Which lottery?", zh: "哪种彩票？", ja: "どの宝くじですか？" },
  ruleMain: { ko: "1~{max} 중 {pick}개", en: "{pick} of 1–{max}", zh: "1~{max}中选{pick}个", ja: "1〜{max}から{pick}個" },
  ruleExtra: { ko: " + {name} 1~{max} 중 1개", en: " + {name} 1–{max}", zh: " + {name} 1~{max}中选1个", ja: " + {name} 1〜{max}から1個" },
  extraRandom: { ko: "{name}은(는) 무작위로 뽑습니다", en: "The {name} is drawn at random", zh: "{name}随机抽取", ja: "{name}はランダムに選びます" },
  reasonLastDate: { ko: "마지막 {date}", en: "last on {date}", zh: "最近{date}", ja: "直近は{date}" },

  // ----- 방식 고르기 화면 -----
  chooseMethod: { ko: "어떤 방식으로 뽑을까요?", en: "How should we pick?", zh: "用哪种方式抽？", ja: "どの方式で選びますか？" },
  chooseHint: { ko: "하나를 누르면 바로 뽑습니다", en: "Tap one to draw right away", zh: "点一下立即抽取", ja: "一つ押すとすぐに選びます" },
  luckyName: { ko: "이름 (안 써도 됩니다)", en: "Name (optional)", zh: "姓名（可不填）", ja: "名前（任意）" },
  luckyNamePlaceholder: { ko: "예: 홍길동", en: "e.g. Jane", zh: "例：张三", ja: "例：山田太郎" },
  luckyBirth: { ko: "생년월일 (안 써도 됩니다)", en: "Date of birth (optional)", zh: "出生日期（可不填）", ja: "生年月日（任意）" },
  luckyBirthPlaceholder: { ko: "예: 1955-03-21", en: "e.g. 1955-03-21", zh: "例：1955-03-21", ja: "例：1955-03-21" },
  luckyNote: {
    ko: "이름과 생년월일, 오늘 날짜로 번호를 정합니다. 같은 날에는 같은 번호가 나옵니다.",
    en: "Numbers come from your name, birth date and today's date, so they stay the same all day.",
    zh: "根据姓名、出生日期和今天的日期决定号码，当天号码保持不变。",
    ja: "名前・生年月日・今日の日付で番号を決めます。同じ日は同じ番号になります。",
  },
  luckyDraw: { ko: "나의 운 번호 뽑기", en: "Draw my lucky numbers", zh: "抽取我的幸运号码", ja: "私のラッキー番号を選ぶ" },
  cancel: { ko: "취소", en: "Cancel", zh: "取消", ja: "キャンセル" },

  // ----- 결과 화면 -----
  resultHeading: { ko: "뽑힌 번호", en: "Your numbers", zh: "抽出的号码", ja: "選ばれた番号" },
  gameLabel: { ko: "{n}번째 게임", en: "Game {n}", zh: "第{n}组", ja: "{n}ゲーム目" },
  methodLabel: { ko: "뽑은 방식", en: "Method", zh: "抽取方式", ja: "方式" },
  reasonHeading: { ko: "번호마다 근거", en: "Why these numbers", zh: "每个号码的依据", ja: "番号ごとの根拠" },
  reasonCount: { ko: "역대 {n}회 출현", en: "Drawn {n} times", zh: "历史出现{n}次", ja: "過去{n}回出現" },
  reasonNever: { ko: "아직 한 번도 안 나옴", en: "Never drawn yet", zh: "至今从未出现", ja: "まだ一度も出ていない" },
  reasonLast: { ko: "마지막 {round}회", en: "last in draw {round}", zh: "最近第{round}期", ja: "直近は第{round}回" },
  reasonNoStats: { ko: "출현 자료 없음", en: "No history data", zh: "无出现记录", ja: "出現データなし" },
  tagNever: { ko: "한 번도 안 나옴", en: "never drawn", zh: "从未出现", ja: "未出現" },
  tagCold: { ko: "적게 나온 편", en: "below average", zh: "出现较少", ja: "少なめ" },
  tagHot: { ko: "많이 나온 편", en: "above average", zh: "出现较多", ja: "多め" },
  tagNormal: { ko: "보통", en: "average", zh: "一般", ja: "ふつう" },
  balancedSum: { ko: "합계 {sum}", en: "Sum {sum}", zh: "合计{sum}", ja: "合計{sum}" },
  balancedOddEven: { ko: "홀수 {odd} · 짝수 {even}", en: "{odd} odd · {even} even", zh: "奇数{odd}·偶数{even}", ja: "奇数{odd}・偶数{even}" },
  luckyBasis: { ko: "{name}님의 {date} 운 번호", en: "Lucky numbers for {name} on {date}", zh: "{name}的{date}幸运号码", ja: "{name}さんの{date}のラッキー番号" },
  luckyAnonymous: { ko: "오늘", en: "you", zh: "您", ja: "あなた" },
  redraw: { ko: "다시 뽑기", en: "Draw again", zh: "再抽一次", ja: "もう一度選ぶ" },
  drawFive: { ko: "5게임 한 번에 뽑기", en: "Draw 5 games at once", zh: "一次抽5组", ja: "5ゲームまとめて選ぶ" },
  copyNumbers: { ko: "번호 복사", en: "Copy numbers", zh: "复制号码", ja: "番号をコピー" },
  numbersCopied: { ko: "번호를 복사했습니다. 붙여넣기 해서 쓰세요.", en: "Numbers copied. Paste them anywhere.", zh: "已复制号码，粘贴即可使用。", ja: "番号をコピーしました。貼り付けて使ってください。" },
  sharedView: { ko: "다른 분이 보내 준 번호입니다", en: "Numbers someone shared with you", zh: "这是别人分享给您的号码", ja: "他の方から届いた番号です" },
  drawMine: { ko: "나도 번호 뽑기", en: "Draw my own numbers", zh: "我也要抽号码", ja: "自分も番号を選ぶ" },

  // ----- 복권 정보 카드 -----
  infoHeading: { ko: "알아 두면 좋은 복권 정보", en: "Good to know about this lottery", zh: "值得了解的彩票信息", ja: "知っておきたい宝くじ情報" },
  infoDisclaimer: {
    ko: "※ 참고용이며 실제 세금·절차는 거주국과 시점에 따라 달라집니다. 정확한 내용은 각 복권 공식 안내를 확인하세요.",
    en: "※ For reference only. Actual taxes and procedures depend on your country of residence and may change. Check the official lottery guidance.",
    zh: "※ 仅供参考，实际税务与手续因居住国和时间而异，请以各彩票官方说明为准。",
    ja: "※ 参考情報です。実際の税金や手続きは居住国や時期により異なります。各宝くじの公式案内をご確認ください。",
  },

  // ----- 공유 -----
  shareHeading: { ko: "번호를 가족·친구에게 보내기", en: "Send the numbers to family and friends", zh: "把号码发给家人朋友", ja: "番号を家族・友人に送る" },
  kakao: { ko: "카카오톡으로 보내기", en: "Send via KakaoTalk", zh: "用KakaoTalk发送", ja: "カカオトークで送る" },
  copyLink: { ko: "주소 복사", en: "Copy link", zh: "复制链接", ja: "リンクをコピー" },
  otherApps: { ko: "다른 앱으로 보내기", en: "Share with other apps", zh: "用其他应用发送", ja: "他のアプリで送る" },
  copiedToast: { ko: "주소를 복사했습니다. 붙여넣기 해서 보내세요.", en: "Link copied. Paste it to share.", zh: "已复制链接，粘贴即可分享。", ja: "リンクをコピーしました。貼り付けて送ってください。" },
  copyFailedToast: { ko: "복사하지 못했습니다. 주소창의 주소를 직접 보내 주세요.", en: "Could not copy. Please share the address manually.", zh: "复制失败，请手动分享地址。", ja: "コピーできませんでした。アドレスを直接送ってください。" },
  kakaoFallbackToast: { ko: "카카오톡을 열 수 없어 주소를 복사했습니다.", en: "KakaoTalk is unavailable, so the link was copied.", zh: "无法打开KakaoTalk，已复制链接。", ja: "カカオトークを開けないためリンクをコピーしました。" },
  shareTitle: { ko: "🎱 내가 뽑은 로또 번호", en: "🎱 My lotto numbers", zh: "🎱 我抽的乐透号码", ja: "🎱 私が選んだロト番号" },
  viewNumbers: { ko: "번호 보기", en: "See numbers", zh: "查看号码", ja: "番号を見る" },
} satisfies Record<string, LocalizedText>;

/** 추첨 방식별 이름·한 줄 설명·그림 */
export const methodTexts: Record<LottoMethod, { emoji: string; name: LocalizedText; desc: LocalizedText }> = {
  cold: {
    emoji: "🧊",
    name: { ko: "적게 나온 번호", en: "Rarely drawn numbers", zh: "出现少的号码", ja: "あまり出ていない番号" },
    desc: {
      ko: "역대 당첨 번호에서 가장 적게 나온 번호들 위주로. \"이제 나올 때가 됐다\"는 생각으로",
      en: "Mostly numbers drawn least often. The \"they are due\" approach",
      zh: "以历史上出现最少的号码为主。“该轮到它们了”",
      ja: "過去の当選番号で最も出ていない番号を中心に。「そろそろ出るはず」の考え方",
    },
  },
  hot: {
    emoji: "🔥",
    name: { ko: "많이 나온 번호", en: "Frequently drawn numbers", zh: "出现多的号码", ja: "よく出ている番号" },
    desc: {
      ko: "역대 당첨 번호에서 가장 자주 나온 번호들 위주로. \"잘 나오는 번호는 또 나온다\"는 생각으로",
      en: "Mostly numbers drawn most often. The \"hot numbers stay hot\" approach",
      zh: "以历史上出现最多的号码为主。“常出的号码还会出”",
      ja: "過去の当選番号で最もよく出た番号を中心に。「出る番号はまた出る」の考え方",
    },
  },
  balanced: {
    emoji: "⚖️",
    name: { ko: "분배가 잘 맞는 조합", en: "Well-balanced combination", zh: "分布均衡的组合", ja: "バランスの良い組み合わせ" },
    desc: {
      ko: "홀짝 3:3이나 4:2, 번호 구간 골고루, 합계 100~175, 연속 번호는 1쌍까지. 통계적으로 가장 흔한 꼴",
      en: "3:3 or 4:2 odd/even, spread across ranges, sum 100–175, at most one consecutive pair. The most common shape",
      zh: "奇偶3:3或4:2、各区间均匀、总和100~175、连号最多1对。统计上最常见的形态",
      ja: "奇偶3:3か4:2、番号帯をまんべんなく、合計100〜175、連番は1組まで。統計的に最も多い形",
    },
  },
  lucky: {
    emoji: "🍀",
    name: { ko: "나의 운 번호", en: "My lucky numbers", zh: "我的幸运号码", ja: "私のラッキー番号" },
    desc: {
      ko: "이름과 생년월일, 오늘 날짜로 나만의 번호를 정합니다",
      en: "Your own numbers from your name, birth date and today's date",
      zh: "用姓名、出生日期和今天的日期决定专属号码",
      ja: "名前と生年月日、今日の日付であなただけの番号を決めます",
    },
  },
  random: {
    emoji: "🎲",
    name: { ko: "완전 무작위", en: "Completely random", zh: "完全随机", ja: "完全ランダム" },
    desc: {
      ko: "아무 조건 없이 1부터 45까지 중 6개를 그냥 뽑습니다",
      en: "Just 6 numbers from 1 to 45, no rules at all",
      zh: "不设条件，从1到45中随机抽6个",
      ja: "条件なしで1〜45から6個をそのまま選びます",
    },
  },
};

/** 게임(복권) 이름·보조 공 이름 */
export const gameTexts: Record<LottoGameId, { flag: string; name: LocalizedText; extraName?: LocalizedText }> = {
  kr645: { flag: "🇰🇷", name: { ko: "로또 6/45 (한국)", en: "Lotto 6/45 (Korea)", zh: "乐透6/45（韩国）", ja: "ロト6/45（韓国）" } },
  "us-powerball": {
    flag: "🇺🇸",
    name: { ko: "파워볼 (미국)", en: "Powerball (USA)", zh: "强力球（美国）", ja: "パワーボール（米国）" },
    extraName: { ko: "파워볼", en: "Powerball", zh: "强力球", ja: "パワーボール" },
  },
  "us-megamillions": {
    flag: "🇺🇸",
    name: { ko: "메가밀리언스 (미국)", en: "Mega Millions (USA)", zh: "超级百万（美国）", ja: "メガミリオンズ（米国）" },
    extraName: { ko: "메가볼", en: "Mega Ball", zh: "超级球", ja: "メガボール" },
  },
  "jp-loto6": { flag: "🇯🇵", name: { ko: "로또6 (일본)", en: "Loto 6 (Japan)", zh: "乐透6（日本）", ja: "ロト6（日本）" } },
  "jp-loto7": { flag: "🇯🇵", name: { ko: "로또7 (일본)", en: "Loto 7 (Japan)", zh: "乐透7（日本）", ja: "ロト7（日本）" } },
  "cn-ssq": {
    flag: "🇨🇳",
    name: { ko: "쌍색구 (중국)", en: "Shuangseqiu (China)", zh: "双色球（中国）", ja: "双色球（中国）" },
    extraName: { ko: "파란 공", en: "blue ball", zh: "蓝球", ja: "青い球" },
  },
};

/** 빈도 분류 → 문구 */
export const tagTexts: Record<FrequencyTag, LocalizedText> = {
  never: texts.tagNever,
  cold: texts.tagCold,
  hot: texts.tagHot,
  normal: texts.tagNormal,
};

/** "{n}" 같은 자리 표시를 값으로 바꾼다 */
export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce((s, [k, v]) => s.split(`{${k}}`).join(String(v)), template);
}
