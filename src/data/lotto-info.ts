// 게임(복권)별 "알아 두면 좋은 복권 정보" 카드 내용 (4개 언어)
// - 세금·법률 내용은 참고용. 화면에는 확인 날짜(verifiedAt)와 면책 문구를 함께 보여 준다.
// - 값은 2026년 10월 16일에 공식 사이트·법령으로 확인한 것만 넣었다. 확인하지 못한 항목은 넣지 않았다.
//   (미확인: 한국·중국·일본 판매점에서의 외국인 구매·수령 공식 규정, 일본의 당첨자 비공개 "규정")
// - 출처 요약
//   한국: 동행복권 안내(dhlottery.co.kr/lt645/intro, /guide/wnrGuide), 소득세법 84·129조, 복권 및 복권기금법 10조
//   미국: powerball.com/faqs, megamillions.com/FAQs, IRS Form W-2G 안내(2026-01), NBC DFW 익명 수령 주 목록(2025-09)
//   일본: 宝くじ公式サイト(ロト6/7 feature, check/period, FAQ), 当せん金付証票法 12·13조(e-Gov)
//   중국: 中国福利彩票 双色球 규칙(cwl.gov.cn), 个人所得税法 3조, 财政部 등 2024년 제12호 공고, 彩票管理条例 27조·实施细则 41조

import type { LottoGameId } from "./lotto-types";

export type InfoText = { ko: string; en: string; zh: string; ja: string };

export interface LottoInfoItem {
  emoji: string;
  label: InfoText;
  value: InfoText;
}

export interface LottoInfo {
  /** 확인 시점 문구 */
  verifiedAt: InfoText;
  items: LottoInfoItem[];
}

const VERIFIED_2026_10: InfoText = { ko: "2026년 10월 기준", en: "As of October 2026", zh: "截至2026年10月", ja: "2026年10月時点" };

/** 항목 이름 */
const L = {
  odds: { ko: "1등 당첨 확률", en: "Jackpot odds", zh: "头奖中奖概率", ja: "1等の当せん確率" },
  draw: { ko: "추첨 요일", en: "Draw days", zh: "开奖日", ja: "抽せん日" },
  tax: { ko: "당첨금 세금", en: "Tax on prizes", zh: "奖金税收", ja: "当せん金の税金" },
  deadline: { ko: "당첨금 수령 기한", en: "Claim deadline", zh: "兑奖期限", ja: "当せん金の受取期限" },
  anonymous: { ko: "당첨자 신원 공개", en: "Winner identity", zh: "中奖者身份", ja: "当せん者の公表" },
  buy: { ko: "구매 조건", en: "Who can play", zh: "购买条件", ja: "購入条件" },
};

/** 미국 두 게임이 함께 쓰는 세금·수령 항목 (연방 규정은 같다) */
const US_TAX: LottoInfoItem = {
  emoji: "💵",
  label: L.tax,
  value: {
    ko: "5천 달러를 넘는 당첨금은 연방 소득세 24%를 먼저 떼고 줍니다. 외국인(비거주자)은 30%를 뗍니다. 주(州) 세금은 주마다 따로 있고, 일시금과 30년 연금 중 고를 수 있습니다.",
    en: "Prizes over $5,000 have 24% federal tax withheld (30% for nonresident aliens). State taxes vary. You choose a lump sum or a 30-payment annuity.",
    zh: "超过5000美元的奖金先预扣24%联邦所得税，非居民外国人预扣30%。各州另有州税。可选择一次性领取或30期年金。",
    ja: "5,000ドル超の当せん金は連邦所得税24%（非居住外国人は30%）が源泉徴収されます。州税は州ごとに異なり、一括か30回の年金払いを選べます。",
  },
};

const US_BUY: LottoInfoItem = {
  emoji: "🧳",
  label: L.buy,
  value: {
    ko: "미국 시민·거주자가 아니어도 살 수 있습니다. 산 곳(주)의 나이 기준을 지켜야 하고, 당첨금은 복권을 산 주에서 받아야 합니다.",
    en: "You do not need to be a U.S. citizen or resident. Follow the age rule where you buy, and claim the prize in the jurisdiction where the ticket was bought.",
    zh: "无需美国公民或居民身份也可购买。需符合购买地的年龄要求，奖金须在购票所在州领取。",
    ja: "米国の市民・居住者でなくても購入できます。購入地の年齢制限を守り、当せん金はチケットを買った州で受け取ります。",
  },
};

const US_ANON: LottoInfoItem = {
  emoji: "🕶️",
  label: L.anonymous,
  value: {
    ko: "주마다 다릅니다. 델라웨어·뉴저지·캔자스 등 일부 주는 익명 수령이 되고, 텍사스(100만 달러 초과)처럼 금액 조건이 있는 주도 있으며, 많은 주는 이름을 공개합니다.",
    en: "Depends on the state. Some (Delaware, New Jersey, Kansas and others) allow anonymous claims, some only above a threshold (e.g. Texas over $1M), and many publish winner names.",
    zh: "各州不同。特拉华、新泽西、堪萨斯等州允许匿名领奖，德州等州设有金额门槛（超过100万美元），许多州会公开中奖者姓名。",
    ja: "州により異なります。デラウェア・ニュージャージー・カンザスなどは匿名で受け取れ、テキサス（100万ドル超）のように金額条件がある州もあり、多くの州は氏名を公表します。",
  },
};

const US_DEADLINE: LottoInfoItem = {
  emoji: "⏳",
  label: L.deadline,
  value: {
    ko: "복권을 산 주에 따라 다르며 보통 90일에서 1년 사이입니다.",
    en: "Varies by the state where you bought the ticket, typically 90 days to one year.",
    zh: "因购票所在州而异，通常为90天至1年。",
    ja: "購入した州によって異なり、通常90日から1年です。",
  },
};

/** 일본 두 게임이 함께 쓰는 항목 */
const JP_TAX: LottoInfoItem = {
  emoji: "🎌",
  label: L.tax,
  value: {
    ko: "세금이 없습니다. 일본 법(当せん金付証票法 13조)이 복권 당첨금에 소득세를 매기지 않는다고 정해 두었고, 국적 조건이 없어 외국인도 마찬가지입니다.",
    en: "No tax. Japanese law (Act on Prize-Bearing Lottery Tickets, Article 13) exempts lottery prizes from income tax, with no nationality condition, so this applies to foreigners too.",
    zh: "免税。日本《当せん金付证票法》第13条规定彩票奖金不征收所得税，且没有国籍限制，外国人同样免税。",
    ja: "税金はかかりません。当せん金付証票法第13条で当せん金に所得税を課さないと定められており、国籍の条件もないため外国人も同じです。",
  },
};

const JP_DEADLINE: LottoInfoItem = {
  emoji: "⏳",
  label: L.deadline,
  value: {
    ko: "추첨일 다음 날부터 1년입니다. 지나면 받을 수 없습니다.",
    en: "One year from the day after the draw. After that the prize can no longer be claimed.",
    zh: "自开奖次日起1年，逾期不能兑奖。",
    ja: "抽せん日の翌日から1年間です。過ぎると受け取れません。",
  },
};

const JP_ANON: LottoInfoItem = {
  emoji: "🕶️",
  label: L.anonymous,
  value: {
    ko: "공식 사이트의 당첨자 자료는 지역(도도부현)·연령대·성별만 보여 주고 이름은 싣지 않습니다.",
    en: "The official winner reports show only prefecture, age group and gender. Names are not published.",
    zh: "官方中奖者资料只显示都道府县、年龄段和性别，不公布姓名。",
    ja: "公式サイトの当せん者レポートは都道府県・年代・性別のみで、氏名は公表されません。",
  },
};

const JP_BUY: LottoInfoItem = {
  emoji: "🧳",
  label: L.buy,
  value: {
    ko: "인터넷 구매는 일본에 사는 20세 이상만 되고, 본인 명의의 일본 은행 계좌가 있어야 합니다. 국적 조건은 없습니다. 해외(일시 출국 중 포함)에서는 살 수 없습니다.",
    en: "Online purchase is limited to residents of Japan aged 20+, with a Japanese bank account in your own name. There is no nationality rule. Buying from abroad (even while temporarily overseas) is not allowed.",
    zh: "网上购买仅限居住在日本的20岁以上人士，需本人名义的日本银行账户，无国籍限制。在海外（含临时出境）不能购买。",
    ja: "ネット購入は日本国内に住む20歳以上の方が対象で、本人名義の日本の銀行口座が必要です。国籍の条件はありません。海外（一時出国中を含む）からは購入できません。",
  },
};

// 내용이 비어 있으면 카드를 보여 주지 않는다
export const LOTTO_INFO: Record<LottoGameId, LottoInfo> = {
  kr645: {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "814만 5,060분의 1입니다. (45개 중 6개를 모두 맞힐 확률)",
          en: "1 in 8,145,060 (matching all 6 of 45).",
          zh: "约814.5万分之一（45选6全部命中）。",
          ja: "814万5,060分の1です（45個中6個をすべて当てる確率）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 토요일 저녁 8시 35분쯤 추첨합니다. (방송 사정에 따라 조금 달라질 수 있음)",
          en: "Every Saturday around 8:35 pm KST (may shift slightly with the broadcast).",
          zh: "每周六晚8:35左右开奖（可能因直播安排略有变动）。",
          ja: "毎週土曜日の夜8時35分ごろに抽せんします（放送の都合で前後することがあります）。",
        },
      },
      {
        emoji: "💵",
        label: L.tax,
        value: {
          ko: "200만 원 이하는 세금이 없습니다. 200만 원을 넘으면 22%, 3억 원을 넘는 부분은 33%를 떼고 줍니다. (소득세와 지방소득세 포함, 원천징수)",
          en: "Prizes up to 2 million KRW are tax-free. Above that, 22% is withheld, and 33% on the portion over 300 million KRW (income tax plus local tax).",
          zh: "200万韩元以下免税。超过200万韩元预扣22%，超过3亿韩元的部分预扣33%（含所得税和地方所得税）。",
          ja: "200万ウォン以下は非課税。200万ウォン超は22%、3億ウォンを超える部分は33%が源泉徴収されます（所得税＋地方所得税）。",
        },
      },
      {
        emoji: "⏳",
        label: L.deadline,
        value: {
          ko: "지급 시작일(추첨 다음 날)부터 1년입니다. 지나면 복권기금으로 넘어갑니다.",
          en: "One year from the payment start date (the day after the draw). Unclaimed prizes go to the lottery fund.",
          zh: "自开始兑奖日（开奖次日）起1年，逾期归入彩票基金。",
          ja: "支払開始日（抽せん日の翌日）から1年です。過ぎると宝くじ基金に移ります。",
        },
      },
      {
        emoji: "🕶️",
        label: L.anonymous,
        value: {
          ko: "법(복권 및 복권기금법 10조)으로 당첨자 동의 없이는 신원을 공개하지 못하게 돼 있습니다. 1등이 나온 판매점과 지역만 공개됩니다.",
          en: "By law (Lottery and Lottery Fund Act, Art. 10) a winner's identity cannot be disclosed without consent. Only the winning retailer and region are announced.",
          zh: "依法（彩票及彩票基金法第10条）未经中奖者同意不得公开其身份，只公布中奖销售点和地区。",
          ja: "法律（宝くじ及び宝くじ基金法10条）により本人の同意なく当せん者の身元は公開されません。1等が出た販売店と地域のみ公表されます。",
        },
      },
      {
        emoji: "🧳",
        label: L.buy,
        value: {
          ko: "19세 이상만 살 수 있습니다. 인터넷·모바일 구매는 본인인증을 마친 19세 이상 회원만 됩니다. (외국인 구매에 대한 공식 안내는 확인되지 않았습니다)",
          en: "You must be 19 or older. Online and mobile purchases require identity-verified membership. (No official guidance on foreign nationals was found.)",
          zh: "须年满19岁。网上及手机购买仅限完成实名认证的19岁以上会员。（未找到关于外国人购买的官方说明）",
          ja: "19歳以上のみ購入できます。ネット・モバイル購入は本人確認を済ませた19歳以上の会員に限られます。（外国人の購入に関する公式案内は確認できませんでした）",
        },
      },
    ],
  },

  "us-powerball": {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "2억 9,220만 1,338분의 1입니다. (69개 중 5개 + 파워볼 26개 중 1개)",
          en: "1 in 292,201,338 (5 of 69 plus the Powerball from 26).",
          zh: "约2.92亿分之一（69选5加26选1强力球）。",
          ja: "2億9,220万1,338分の1です（69個中5個＋パワーボール26個中1個）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 월·수·토요일 밤 10시 59분(미국 동부시간)에 추첨합니다. 한국 시간으로는 다음 날 낮입니다.",
          en: "Every Monday, Wednesday and Saturday at 10:59 pm ET.",
          zh: "每周一、三、六晚10:59（美国东部时间）开奖。",
          ja: "毎週月・水・土曜日の夜10時59分（米国東部時間）に抽せんします。日本時間では翌日の昼です。",
        },
      },
      US_TAX,
      US_DEADLINE,
      US_ANON,
      US_BUY,
    ],
  },

  "us-megamillions": {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "2억 9,047만 2,336분의 1입니다. (70개 중 5개 + 메가볼 24개 중 1개, 2025년 4월 8일 추첨부터 적용된 규칙, 한 게임 5달러)",
          en: "1 in 290,472,336 (5 of 70 plus the Mega Ball from 24; rules in effect since the April 8, 2025 drawing; $5 per play).",
          zh: "约2.9亿分之一（70选5加24选1超级球，2025年4月8日起实行的规则，每注5美元）。",
          ja: "2億9,047万2,336分の1です（70個中5個＋メガボール24個中1個。2025年4月8日の抽せんから適用、1口5ドル）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 화·금요일 밤 11시(미국 동부시간)에 추첨합니다. 한국 시간으로는 다음 날 낮입니다.",
          en: "Every Tuesday and Friday at 11 pm ET.",
          zh: "每周二、五晚11点（美国东部时间）开奖。",
          ja: "毎週火・金曜日の夜11時（米国東部時間）に抽せんします。日本時間では翌日の昼です。",
        },
      },
      US_TAX,
      US_DEADLINE,
      US_ANON,
      US_BUY,
    ],
  },

  "jp-loto6": {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "609만 6,454분의 1입니다. (43개 중 6개, 한 게임 200엔)",
          en: "1 in 6,096,454 (6 of 43; ¥200 per play).",
          zh: "约609.6万分之一（43选6，每注200日元）。",
          ja: "609万6,454分の1です（43個中6個、1口200円）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 월요일과 목요일에 추첨합니다. (연말연시 제외)",
          en: "Every Monday and Thursday (except the New Year holidays).",
          zh: "每周一、四开奖（年末年初除外）。",
          ja: "毎週月曜日と木曜日に抽せんします（年末年始を除く）。",
        },
      },
      JP_TAX,
      JP_DEADLINE,
      JP_ANON,
      JP_BUY,
    ],
  },

  "jp-loto7": {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "1,029만 5,472분의 1입니다. (37개 중 7개, 한 게임 300엔)",
          en: "1 in 10,295,472 (7 of 37; ¥300 per play).",
          zh: "约1029.5万分之一（37选7，每注300日元）。",
          ja: "1,029万5,472分の1です（37個中7個、1口300円）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 금요일에 추첨합니다.",
          en: "Every Friday.",
          zh: "每周五开奖。",
          ja: "毎週金曜日に抽せんします。",
        },
      },
      JP_TAX,
      JP_DEADLINE,
      JP_ANON,
      JP_BUY,
    ],
  },

  "cn-ssq": {
    verifiedAt: VERIFIED_2026_10,
    items: [
      {
        emoji: "🎯",
        label: L.odds,
        value: {
          ko: "약 1,772만분의 1입니다. (빨간 공 33개 중 6개 + 파란 공 16개 중 1개, 한 게임 2위안)",
          en: "About 1 in 17.72 million (6 red of 33 plus 1 blue of 16; ¥2 per play).",
          zh: "约1772万分之一（红球33选6加蓝球16选1，每注2元）。",
          ja: "約1,772万分の1です（赤球33個中6個＋青球16個中1個、1口2元）。",
        },
      },
      {
        emoji: "📅",
        label: L.draw,
        value: {
          ko: "매주 화·목·일요일 밤 9시 15분(베이징 시간)에 추첨합니다.",
          en: "Every Tuesday, Thursday and Sunday at 9:15 pm Beijing time.",
          zh: "每周二、四、日晚21:15开奖。",
          ja: "毎週火・木・日曜日の夜9時15分（北京時間）に抽せんします。",
        },
      },
      {
        emoji: "💵",
        label: L.tax,
        value: {
          ko: "한 번에 받는 당첨금이 1만 위안을 넘으면 20% 개인소득세를 뗍니다. 1만 위안 이하는 면세입니다. 3천 위안을 넘으면 실명 등록을 합니다.",
          en: "Prizes over 10,000 yuan are taxed 20% (individual income tax). 10,000 yuan or less is tax-free. Prizes over 3,000 yuan require real-name registration.",
          zh: "一次中奖收入超过1万元的，按20%缴纳个人所得税；1万元及以下免税。超过3000元需实名登记。",
          ja: "1回の当せん金が1万元を超えると20%の個人所得税がかかります。1万元以下は非課税です。3,000元超は実名登録が必要です。",
        },
      },
      {
        emoji: "⏳",
        label: L.deadline,
        value: {
          ko: "추첨일부터 60일(달력일) 안에 받아야 합니다. 마지막 날이 휴일이면 다음 영업일까지입니다.",
          en: "Within 60 calendar days of the draw (extended to the next business day if it ends on a holiday).",
          zh: "自开奖之日起60个自然日内兑奖，遇节假日顺延。",
          ja: "抽せん日から60日（暦日）以内に受け取ります。最終日が休日なら翌営業日までです。",
        },
      },
      {
        emoji: "🕶️",
        label: L.anonymous,
        value: {
          ko: "복권관리조례 27조에 따라 판매 기관은 당첨자의 개인정보를 비밀로 지켜야 합니다. 이름은 공개되지 않습니다.",
          en: "Under Article 27 of the Lottery Administration Regulations, lottery bodies must keep winners' personal information confidential. Names are not published.",
          zh: "根据《彩票管理条例》第27条，发行销售机构须对中奖者个人信息保密，不会公开姓名。",
          ja: "宝くじ管理条例27条により販売機関は当せん者の個人情報を秘密にしなければなりません。氏名は公表されません。",
        },
      },
      {
        emoji: "🧳",
        label: L.buy,
        value: {
          ko: "인터넷 판매는 재정부 허가 없이는 금지돼 있어(2015년 공고) 판매점에서만 삽니다. (외국인 구매에 대한 공식 규정은 확인되지 않았습니다)",
          en: "Internet sales are banned without Ministry of Finance approval (2015 notice), so tickets are sold only at retailers. (No official rule on foreign nationals was found.)",
          zh: "未经财政部批准不得通过互联网销售彩票（2015年公告），只能在实体销售点购买。（未找到关于外国人购买的官方规定）",
          ja: "財政部の許可なくインターネット販売は禁止されており（2015年公告）、販売店でのみ購入できます。（外国人の購入に関する公式規定は確認できませんでした）",
        },
      },
    ],
  },
};
