// 관상 보기 화면 문구 (4개 언어)
// - 어르신이 읽기 쉽도록 외래어 대신 쉬운 한국어를 쓴다.
// - 결과 유형·부위 풀이 등 콘텐츠 문구는 src/data/face-reading.ts 에 있다.

import type { LocalizedText } from "@/data/face-reading";

export const texts = {
  // ----- 공통 -----
  title: { ko: "관상 보기", en: "Face Reading", zh: "面相分析", ja: "人相占い" },
  subtitle: {
    ko: "얼굴에 담긴 나의 운을 읽어 드립니다",
    en: "Read the fortune written on your face",
    zh: "为您解读写在脸上的运势",
    ja: "顔に刻まれたあなたの運を読み解きます",
  },
  back: { ko: "뒤로", en: "Back", zh: "返回", ja: "戻る" },
  home: { ko: "처음 화면으로", en: "Home", zh: "回到首页", ja: "ホームへ" },
  backToStart: { ko: "관상 처음으로", en: "Back to start", zh: "回到开始", ja: "最初に戻る" },

  // ----- 시작 화면 -----
  startHeading: { ko: "거울을 보며 하나씩 고르면", en: "Look in a mirror and pick one by one", zh: "照着镜子一项一项选", ja: "鏡を見ながら一つずつ選ぶと" },
  startHeading2: { ko: "관상 풀이를 바로 알려 드려요", en: "and get your reading right away", zh: "马上为您解读面相", ja: "すぐに人相の結果が分かります" },
  startPoint1: { ko: "얼굴형·이마·눈·코·입·턱, 모두 6단계", en: "Face, forehead, eyes, nose, mouth, chin: 6 steps", zh: "脸型、额头、眼、鼻、嘴、下巴，共6步", ja: "顔の形・額・目・鼻・口・顎、全部で6ステップ" },
  startPoint2: { ko: "글자가 크고 버튼이 커서 보기 편해요", en: "Large text and big buttons for easy reading", zh: "字大按钮大，看起来轻松", ja: "文字もボタンも大きくて見やすいです" },
  startPoint3: { ko: "1분이면 충분합니다", en: "It only takes a minute", zh: "一分钟就够了", ja: "1分で十分です" },
  startButton: { ko: "관상 보기 시작", en: "Start reading", zh: "开始看面相", ja: "人相占いを始める" },
  photoButton: { ko: "사진으로 보기", en: "Use a photo", zh: "用照片看", ja: "写真で見る" },
  photoButtonSub: { ko: "얼굴 사진을 고르면 자동으로 읽어 드려요", en: "Pick a face photo and we read it for you", zh: "选一张脸部照片自动解读", ja: "顔写真を選ぶと自動で読み取ります" },
  disclaimer: {
    ko: "※ 재미로 보는 관상입니다. 실제 운명을 정하지 않습니다.",
    en: "※ For fun only. It does not decide your real fate.",
    zh: "※ 仅供娱乐，不代表真实命运。",
    ja: "※ 娯楽目的の占いです。実際の運命を決めるものではありません。",
  },

  // ----- 질문 화면 -----
  step: { ko: "단계", en: "Step", zh: "步", ja: "ステップ" },
  stepOf: { ko: "단계 중", en: "of", zh: "/", ja: "/" },
  chooseOne: { ko: "가장 가까운 것을 하나 고르세요", en: "Choose the one closest to you", zh: "请选择最接近的一项", ja: "いちばん近いものを一つ選んでください" },
  selectedMark: { ko: "선택함", en: "Selected", zh: "已选", ja: "選択中" },
  prev: { ko: "이전", en: "Previous", zh: "上一步", ja: "前へ" },
  next: { ko: "다음", en: "Next", zh: "下一步", ja: "次へ" },
  seeResult: { ko: "결과 보기", en: "See result", zh: "查看结果", ja: "結果を見る" },
  pickFirst: { ko: "하나를 고르면 다음으로 넘어갈 수 있어요", en: "Pick one to continue", zh: "选一项后即可继续", ja: "一つ選ぶと次に進めます" },

  // ----- 사진 화면 -----
  photoTitle: { ko: "사진으로 관상 보기", en: "Reading from a photo", zh: "用照片看面相", ja: "写真で人相を見る" },
  photoDesc: { ko: "얼굴이 정면으로 잘 보이는 사진을 골라 주세요", en: "Choose a clear, front-facing photo", zh: "请选择正面清晰的照片", ja: "顔が正面からはっきり写った写真を選んでください" },
  pickPhoto: { ko: "사진첩에서 고르기", en: "Choose from gallery", zh: "从相册选择", ja: "アルバムから選ぶ" },
  takePhoto: { ko: "지금 사진 찍기", en: "Take a photo now", zh: "现在拍照", ja: "今すぐ撮影する" },
  privacyNote: {
    ko: "사진은 휴대폰 안에서만 읽고, 어디에도 보내거나 저장하지 않습니다.",
    en: "The photo is read on your device only. It is never uploaded or stored.",
    zh: "照片只在您的手机内读取，不会上传或保存。",
    ja: "写真はお使いの端末内でのみ処理され、送信や保存はしません。",
  },
  tipTitle: { ko: "잘 읽히는 사진", en: "Photos that work best", zh: "容易识别的照片", ja: "読み取りやすい写真" },
  tip1: { ko: "정면을 바라본 얼굴", en: "Facing straight ahead", zh: "正对镜头的脸", ja: "正面を向いた顔" },
  tip2: { ko: "밝은 곳에서 찍은 사진", en: "Taken in good light", zh: "光线明亮的照片", ja: "明るい場所で撮った写真" },
  tip3: { ko: "모자·안경·마스크 없이", en: "No hat, glasses or mask", zh: "不戴帽子、眼镜、口罩", ja: "帽子・眼鏡・マスクなしで" },
  manualInstead: { ko: "사진 없이 직접 고르기", en: "Choose manually instead", zh: "不用照片，手动选择", ja: "写真なしで自分で選ぶ" },
  noFace: {
    ko: "얼굴을 찾지 못했습니다. 다른 사진으로 다시 해 보세요.",
    en: "No face was found. Please try another photo.",
    zh: "没有找到脸部，请换一张照片再试。",
    ja: "顔が見つかりませんでした。別の写真でお試しください。",
  },
  photoError: {
    ko: "사진을 읽는 중 문제가 생겼습니다. 직접 고르기로 진행해 보세요.",
    en: "Something went wrong reading the photo. Please choose manually.",
    zh: "读取照片时出了问题，请改为手动选择。",
    ja: "写真の読み取り中に問題が起きました。自分で選ぶ方法をお試しください。",
  },

  // ----- 분석 중 화면 -----
  analyzing: { ko: "관상을 보고 있습니다", en: "Reading your face", zh: "正在看面相", ja: "人相を見ています" },
  analyzingSub: { ko: "잠시만 기다려 주세요", en: "Please wait a moment", zh: "请稍候", ja: "少々お待ちください" },
  analyzingPhoto: { ko: "사진에서 얼굴을 찾고 있습니다", en: "Finding the face in your photo", zh: "正在照片中寻找脸部", ja: "写真から顔を探しています" },
  analyzingPreparing: { ko: "준비하고 있습니다", en: "Getting ready", zh: "正在准备", ja: "準備しています" },
  analyzingDone: { ko: "다 읽었습니다", en: "All done", zh: "已完成", ja: "読み終わりました" },
  proverb: {
    ko: "상은 마음에서 나오고, 마음이 바뀌면 상도 바뀐다",
    en: "The face comes from the heart; change the heart and the face follows",
    zh: "相由心生，心变则相变",
    ja: "相は心より生じ、心が変われば相も変わる",
  },

  // ----- 결과 화면 -----
  yourFace: { ko: "당신의 관상은", en: "Your face reading", zh: "您的面相是", ja: "あなたの人相は" },
  fortuneOverview: { ko: "한눈에 보는 운세", en: "Fortune at a glance", zh: "运势一览", ja: "ひと目で分かる運勢" },
  featureReadings: { ko: "부위별 풀이", en: "Reading by feature", zh: "分部位解读", ja: "部位ごとの解説" },
  strengths: { ko: "타고난 장점", en: "Natural strengths", zh: "天生优点", ja: "生まれ持った長所" },
  advice: { ko: "관상가의 한마디", en: "A word from the reader", zh: "相师寄语", ja: "観相家からひと言" },
  luckyInfo: { ko: "행운 정보", en: "Lucky info", zh: "幸运信息", ja: "ラッキー情報" },
  luckyColor: { ko: "행운의 색", en: "Lucky color", zh: "幸运色", ja: "ラッキーカラー" },
  luckyDirection: { ko: "좋은 방향", en: "Lucky direction", zh: "吉方", ja: "吉方位" },
  goodMatch: { ko: "잘 맞는 상", en: "Good match", zh: "相合之相", ja: "相性の良い相" },
  stars: { ko: "별 5개 중", en: "out of 5", zh: "满分5星", ja: "5つ星中" },

  // ----- 추천·공유 -----
  like: { ko: "이 관상 추천하기", en: "Recommend this", zh: "推荐这个", ja: "この占いをおすすめ" },
  liked: { ko: "추천했습니다", en: "Recommended", zh: "已推荐", ja: "おすすめ済み" },
  shareHeading: { ko: "결과를 가족·친구에게 보내기", en: "Send your result to family and friends", zh: "把结果发给家人朋友", ja: "結果を家族・友人に送る" },
  kakao: { ko: "카카오톡으로 보내기", en: "Send via KakaoTalk", zh: "用KakaoTalk发送", ja: "カカオトークで送る" },
  saveImage: { ko: "그림으로 저장", en: "Save as image", zh: "保存为图片", ja: "画像で保存" },
  copyLink: { ko: "주소 복사", en: "Copy link", zh: "复制链接", ja: "リンクをコピー" },
  otherApps: { ko: "다른 앱으로 보내기", en: "Share with other apps", zh: "用其他应用发送", ja: "他のアプリで送る" },
  xShare: { ko: "X(트위터)", en: "X (Twitter)", zh: "X(推特)", ja: "X(ツイッター)" },
  copiedToast: { ko: "주소를 복사했습니다. 붙여넣기 해서 보내세요.", en: "Link copied. Paste it to share.", zh: "已复制链接，粘贴即可分享。", ja: "リンクをコピーしました。貼り付けて送ってください。" },
  copyFailedToast: { ko: "복사하지 못했습니다. 주소창의 주소를 직접 보내 주세요.", en: "Could not copy. Please share the address manually.", zh: "复制失败，请手动分享地址。", ja: "コピーできませんでした。アドレスを直接送ってください。" },
  kakaoFallbackToast: { ko: "카카오톡을 열 수 없어 주소를 복사했습니다.", en: "KakaoTalk is unavailable, so the link was copied.", zh: "无法打开KakaoTalk，已复制链接。", ja: "カカオトークを開けないためリンクをコピーしました。" },
  imageSavedToast: { ko: "그림을 저장했습니다.", en: "Image saved.", zh: "已保存图片。", ja: "画像を保存しました。" },
  imageFailedToast: { ko: "그림을 저장하지 못했습니다.", en: "Could not save the image.", zh: "无法保存图片。", ja: "画像を保存できませんでした。" },
  shareText: { ko: "나의 관상 결과", en: "My face reading", zh: "我的面相结果", ja: "私の人相占い結果" },
  viewResult: { ko: "결과 보기", en: "View result", zh: "查看结果", ja: "結果を見る" },
  retry: { ko: "다시 보기", en: "Try again", zh: "再看一次", ja: "もう一度" },
  resultOf: { ko: "관상 결과", en: "Result", zh: "面相结果", ja: "人相結果" },
} satisfies Record<string, LocalizedText>;

/** 행운의 색(16진수) → 색 이름. 색만으로 정보를 전하지 않기 위해 글로도 보여 준다 */
export const colorNames: Record<string, LocalizedText> = {
  "#FFD700": { ko: "금색", en: "Gold", zh: "金色", ja: "金色" },
  "#4169E1": { ko: "파란색", en: "Blue", zh: "蓝色", ja: "青色" },
  "#8B0000": { ko: "붉은색", en: "Red", zh: "红色", ja: "赤色" },
  "#FF69B4": { ko: "분홍색", en: "Pink", zh: "粉色", ja: "ピンク" },
  "#228B22": { ko: "초록색", en: "Green", zh: "绿色", ja: "緑色" },
  "#800080": { ko: "보라색", en: "Purple", zh: "紫色", ja: "紫色" },
  "#FF8C00": { ko: "주황색", en: "Orange", zh: "橙色", ja: "オレンジ色" },
  "#1F1A14": { ko: "먹색(검은색)", en: "Ink black", zh: "墨黑色", ja: "墨色(黒)" },
  "#87CEEB": { ko: "하늘색", en: "Sky blue", zh: "天蓝色", ja: "空色" },
  "#C0C0C0": { ko: "은색", en: "Silver", zh: "银色", ja: "銀色" },
  "#8B4513": { ko: "갈색", en: "Brown", zh: "棕色", ja: "茶色" },
};

/** 부위 이름 옆에 붙이는 한자 (전통 관상 느낌용 장식) */
export const featureHanja: Record<string, string> = {
  "face-shape": "面",
  forehead: "額",
  eyes: "眼",
  nose: "鼻",
  mouth: "口",
  chin: "頤",
};
