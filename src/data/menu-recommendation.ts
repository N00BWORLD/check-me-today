// ─────────────────────────────────────────────────────────────
// 오늘의 메뉴추천 데이터
//
// 구조: 언어(문화권)별로 메뉴 풀을 따로 둔다.
//   - 한국어 사용자에게는 한식·중식·일식·분식… , 영어권에는 American·Italian·Mexican… 처럼
//     그 문화권에서 실제로 "오늘 뭐 먹지?" 할 때 떠올리는 음식을 보여주기 위해서다.
//   - 따라서 음식 이름·설명은 번역이 아니라 해당 언어의 단일 문자열이다.
// 흐름: 카테고리 선택(또는 "아무거나") → 룰렛 → 결과
// ─────────────────────────────────────────────────────────────

export type MenuLang = "ko" | "en" | "zh" | "ja";
export type MealTime = "morning" | "lunch" | "dinner" | "snack";

export interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  /** 카테고리 한 줄 설명 (선택 화면 카드에 표시) */
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
}

export interface MenuPool {
  categories: MenuCategory[];
  items: MenuItem[];
}

/** "아무거나" 선택 시 쓰는 가상 카테고리 id */
export const RANDOM_CATEGORY_ID = "random";

// 항목 작성을 짧게 하기 위한 헬퍼: [id, 이모지, 이름, 설명]
type Row = [string, string, string, string];
function items(category: string, rows: Row[]): MenuItem[] {
  return rows.map(([id, emoji, name, description]) => ({ id, emoji, name, description, category }));
}

// ───────────────────────── 한국어 ─────────────────────────
const ko: MenuPool = {
  categories: [
    { id: "korean", label: "한식", emoji: "🍚", description: "찌개·국밥·고기, 든든한 한 끼" },
    { id: "chinese", label: "중식", emoji: "🥡", description: "짜장·짬뽕부터 마라까지" },
    { id: "japanese", label: "일식", emoji: "🍣", description: "초밥·돈까스·라멘" },
    { id: "western", label: "양식", emoji: "🍝", description: "파스타·피자·스테이크" },
    { id: "bunsik", label: "분식", emoji: "🌶️", description: "떡볶이·김밥·라면" },
    { id: "asian", label: "아시안", emoji: "🍜", description: "쌀국수·팟타이·커리" },
    { id: "latenight", label: "야식·안주", emoji: "🍗", description: "치킨·족발·곱창" },
    { id: "cafe", label: "카페·디저트", emoji: "☕", description: "달달한 게 당길 때" },
  ],
  items: [
    ...items("korean", [
      ["kimchi-jjigae", "🥘", "김치찌개", "얼큰한 국물에 밥 한 공기 뚝딱"],
      ["doenjang-jjigae", "🍲", "된장찌개", "구수하고 속 편한 집밥의 정석"],
      ["bibimbap", "🥗", "비빔밥", "나물과 고추장의 건강한 조화"],
      ["bulgogi", "🥩", "불고기", "달큰한 양념에 재운 소고기"],
      ["samgyeopsal", "🥓", "삼겹살", "지글지글 구워 쌈에 싸 먹는 맛"],
      ["galbitang", "🍖", "갈비탕", "맑고 진한 국물, 푸짐한 갈비"],
      ["sundubu", "🌶️", "순두부찌개", "보들보들 순두부에 매콤한 국물"],
      ["jeyuk", "🍛", "제육볶음", "매콤달콤 돼지고기볶음"],
      ["naengmyeon", "🍜", "냉면", "살얼음 동동, 시원한 한 그릇"],
      ["kalguksu", "🍲", "칼국수", "쫄깃한 면과 뜨끈한 국물"],
      ["gukbap", "🍚", "돼지국밥", "뽀얀 국물에 밥 말아 한 그릇"],
      ["dakgalbi", "🍗", "닭갈비", "철판에 볶아 치즈 얹어 먹기"],
      ["bossam", "🥬", "보쌈", "부드러운 수육과 아삭한 김치"],
      ["tteokguk", "🍲", "떡국", "담백하고 부드러운 떡국 한 그릇"],
    ]),
    ...items("chinese", [
      ["jjajangmyeon", "🍜", "짜장면", "고민될 땐 역시 짜장면"],
      ["jjamppong", "🌶️", "짬뽕", "얼큰한 해물 국물의 유혹"],
      ["tangsuyuk", "🍖", "탕수육", "바삭한 튀김에 새콤달콤 소스"],
      ["malatang", "🍲", "마라탕", "얼얼한 마라 국물, 재료는 내 맘대로"],
      ["malaxiangguo", "🥘", "마라샹궈", "국물 없이 볶아낸 마라의 진수"],
      ["fried-rice", "🍚", "볶음밥", "불맛 가득 고슬고슬 볶음밥"],
      ["kkanpunggi", "🍗", "깐풍기", "매콤달콤 바삭한 닭튀김"],
      ["guobaorou", "🥡", "꿔바로우", "쫀득바삭 찹쌀 탕수육"],
      ["yurinji", "🍗", "유린기", "바삭한 닭에 새콤한 간장 소스"],
      ["dumplings-cn", "🥟", "군만두", "바삭하게 구운 만두 한 접시"],
    ]),
    ...items("japanese", [
      ["sushi", "🍣", "초밥", "신선한 생선과 밥의 조화"],
      ["tonkatsu", "🍱", "돈까스", "바삭한 튀김옷과 소스의 만남"],
      ["ramen", "🍜", "라멘", "진한 육수에 쫄깃한 면"],
      ["udon", "🍲", "우동", "통통한 면발과 담백한 국물"],
      ["gyudon", "🍚", "규동", "달큰한 소고기를 밥 위에 듬뿍"],
      ["katsudon", "🍳", "가츠동", "돈까스와 달걀의 환상 궁합"],
      ["okonomiyaki", "🥞", "오코노미야키", "철판에서 구운 일본식 부침"],
      ["sashimi", "🐟", "사시미", "담백하고 신선한 회 한 접시"],
      ["soba", "🍜", "소바", "메밀 향 가득 시원한 면"],
      ["japanese-curry", "🍛", "카레라이스", "진하고 부드러운 일본식 카레"],
      ["takoyaki", "🐙", "타코야키", "겉바속촉 문어볼"],
    ]),
    ...items("western", [
      ["pasta", "🍝", "파스타", "크림·토마토·오일, 오늘의 소스는?"],
      ["pizza", "🍕", "피자", "치즈 쭉 늘어나는 행복"],
      ["steak", "🥩", "스테이크", "육즙 가득 미디엄 레어"],
      ["burger", "🍔", "수제버거", "두툼한 패티와 신선한 야채"],
      ["risotto", "🍚", "리조또", "꾸덕하고 고소한 이탈리안 쌀요리"],
      ["salad", "🥗", "샐러드", "가볍고 신선하게"],
      ["sandwich", "🥪", "샌드위치", "간편하지만 든든하게"],
      ["omelet", "🍳", "오믈렛", "부드러운 달걀 요리"],
      ["fish-and-chips", "🍟", "피시앤칩스", "바삭한 생선튀김과 감자튀김"],
    ]),
    ...items("bunsik", [
      ["tteokbokki", "🌶️", "떡볶이", "매콤달콤 쫄깃한 국민 간식"],
      ["sundae", "🍢", "순대", "떡볶이 국물에 찍어 먹기"],
      ["twigim", "🍤", "모둠튀김", "오징어·고구마·김말이 다 모여라"],
      ["ramyeon", "🍜", "라면", "언제 먹어도 옳은 선택"],
      ["gimbap", "🍙", "김밥", "한 줄이면 한 끼 해결"],
      ["jjolmyeon", "🍜", "쫄면", "새콤달콤 쫄깃한 비빔면"],
      ["eomuk", "🍢", "어묵", "뜨끈한 국물과 함께"],
      ["hotdog", "🌭", "핫도그", "설탕 솔솔 추억의 간식"],
      ["toast", "🍞", "길거리 토스트", "달걀·양배추 듬뿍 토스트"],
      ["mandu", "🥟", "만두", "찐만두·군만두 골라 먹기"],
    ]),
    ...items("asian", [
      ["pho", "🍜", "쌀국수", "맑은 국물에 고수 한 줌"],
      ["pad-thai", "🍝", "팟타이", "달콤 짭짤한 태국식 볶음면"],
      ["bun-cha", "🥗", "분짜", "숯불 돼지고기와 쌀국수"],
      ["nasi-goreng", "🍚", "나시고렝", "인도네시아식 볶음밥"],
      ["tom-yum", "🍲", "똠얌꿍", "새콤매콤한 태국 대표 수프"],
      ["banh-mi", "🥖", "반미", "바삭한 바게트 베트남 샌드위치"],
      ["indian-curry", "🍛", "인도 커리와 난", "향신료 가득 진한 커리"],
      ["kaopad", "🍚", "카오팟", "태국식 볶음밥"],
    ]),
    ...items("latenight", [
      ["chicken", "🍗", "치킨", "후라이드? 양념? 반반!"],
      ["jokbal", "🍖", "족발", "쫀득한 족발에 쌈 한 입"],
      ["gopchang", "🥘", "곱창", "고소한 곱창에 볶음밥 마무리"],
      ["dakbal", "🌶️", "닭발", "불타는 매운맛 도전"],
      ["golbaengi", "🍜", "골뱅이무침", "소면과 함께 새콤매콤"],
      ["pizza-night", "🍕", "피자", "야식의 영원한 클래식"],
      ["fries", "🍟", "감자튀김", "바삭바삭 손이 멈추지 않는"],
      ["ojingeo", "🦑", "오징어튀김", "바삭하고 쫄깃한 안주"],
      ["nakji", "🐙", "낙지볶음", "매콤한 낙지에 밥 비벼 먹기"],
    ]),
    ...items("cafe", [
      ["americano", "☕", "아메리카노", "오늘도 한 잔으로 시작"],
      ["bingsu", "🍧", "빙수", "시원하고 달콤한 얼음 산"],
      ["waffle", "🧇", "와플", "바삭한 와플에 아이스크림"],
      ["cake", "🍰", "케이크", "오늘은 나에게 주는 선물"],
      ["macaron", "🍬", "마카롱", "한 입 크기 달콤함"],
      ["croffle", "🥐", "크로플", "크루아상을 와플 틀에 구운 요즘 간식"],
      ["bagel", "🥯", "베이글", "쫀득한 베이글에 크림치즈"],
      ["ice-cream", "🍦", "아이스크림", "기분 전환엔 역시"],
      ["hotteok", "🥞", "호떡", "설탕 꿀 흐르는 겨울 간식"],
    ]),
  ],
};

// ───────────────────────── English ─────────────────────────
const en: MenuPool = {
  categories: [
    { id: "american", label: "American", emoji: "🍔", description: "Burgers, BBQ, wings" },
    { id: "italian", label: "Italian", emoji: "🍝", description: "Pasta, pizza, risotto" },
    { id: "mexican", label: "Mexican", emoji: "🌮", description: "Tacos, burritos, nachos" },
    { id: "asian", label: "Asian", emoji: "🍜", description: "Sushi, ramen, curry, pho" },
    { id: "healthy", label: "Healthy", emoji: "🥗", description: "Salads, bowls, grilled" },
    { id: "comfort", label: "Comfort Food", emoji: "🍲", description: "Warm, hearty classics" },
    { id: "breakfast", label: "Breakfast & Brunch", emoji: "🥞", description: "Pancakes, eggs, bagels" },
    { id: "dessert", label: "Dessert", emoji: "🍰", description: "Something sweet" },
  ],
  items: [
    ...items("american", [
      ["cheeseburger", "🍔", "Cheeseburger", "Juicy patty, melted cheese, classic"],
      ["bbq-ribs", "🍖", "BBQ Ribs", "Slow-smoked and fall-off-the-bone"],
      ["fried-chicken", "🍗", "Fried Chicken", "Crispy outside, juicy inside"],
      ["mac-and-cheese", "🧀", "Mac and Cheese", "Creamy, cheesy, impossible to resist"],
      ["hot-dog", "🌭", "Hot Dog", "Ballpark classic with your favorite toppings"],
      ["philly", "🥪", "Philly Cheesesteak", "Thin steak, onions and melted cheese"],
      ["buffalo-wings", "🍗", "Buffalo Wings", "Spicy wings with blue cheese dip"],
      ["steak", "🥩", "Steak", "Grilled to order with a side of fries"],
      ["club-sandwich", "🥪", "Club Sandwich", "Triple-decker turkey, bacon and lettuce"],
    ]),
    ...items("italian", [
      ["margherita", "🍕", "Pizza Margherita", "Tomato, mozzarella and fresh basil"],
      ["carbonara", "🍝", "Spaghetti Carbonara", "Egg, pecorino and crispy guanciale"],
      ["lasagna", "🍝", "Lasagna", "Layers of pasta, ragù and béchamel"],
      ["risotto", "🍚", "Mushroom Risotto", "Creamy arborio rice with mushrooms"],
      ["arrabbiata", "🌶️", "Penne Arrabbiata", "Spicy tomato and garlic sauce"],
      ["gnocchi", "🥔", "Gnocchi", "Pillowy potato dumplings in sage butter"],
      ["chicken-parm", "🍗", "Chicken Parmesan", "Breaded chicken with marinara and cheese"],
      ["bruschetta", "🍅", "Bruschetta", "Toasted bread with tomato and basil"],
    ]),
    ...items("mexican", [
      ["tacos", "🌮", "Tacos", "Street-style with cilantro and lime"],
      ["burrito", "🌯", "Burrito", "Everything wrapped in a warm tortilla"],
      ["quesadilla", "🧀", "Quesadilla", "Crispy tortilla, melted cheese"],
      ["nachos", "🧀", "Loaded Nachos", "Chips, cheese, jalapeños, guacamole"],
      ["enchiladas", "🌶️", "Enchiladas", "Rolled tortillas baked in chili sauce"],
      ["fajitas", "🥘", "Fajitas", "Sizzling peppers, onions and grilled meat"],
      ["chili", "🍲", "Chili con Carne", "Hearty beef and bean stew"],
      ["churros", "🍩", "Churros", "Cinnamon sugar with chocolate dip"],
    ]),
    ...items("asian", [
      ["sushi", "🍣", "Sushi", "Fresh fish over seasoned rice"],
      ["ramen", "🍜", "Ramen", "Rich broth and springy noodles"],
      ["pad-thai", "🍝", "Pad Thai", "Sweet, tangy stir-fried noodles"],
      ["bibimbap", "🥗", "Bibimbap", "Korean rice bowl with veggies and gochujang"],
      ["korean-fried-chicken", "🍗", "Korean Fried Chicken", "Extra crispy with sweet-spicy glaze"],
      ["pho", "🍲", "Pho", "Vietnamese noodle soup with fresh herbs"],
      ["dumplings", "🥟", "Dumplings", "Steamed or pan-fried, with soy dip"],
      ["green-curry", "🍛", "Thai Green Curry", "Coconut, basil and a gentle heat"],
      ["butter-chicken", "🍛", "Butter Chicken", "Creamy tomato curry with naan"],
      ["fried-rice", "🍚", "Fried Rice", "Wok-tossed with egg and vegetables"],
    ]),
    ...items("healthy", [
      ["caesar", "🥗", "Caesar Salad", "Crisp romaine, parmesan, croutons"],
      ["poke", "🐟", "Poke Bowl", "Raw fish, rice and fresh toppings"],
      ["grilled-salmon", "🐟", "Grilled Salmon", "With lemon and roasted vegetables"],
      ["buddha-bowl", "🥗", "Buddha Bowl", "Grains, greens and tahini dressing"],
      ["avocado-toast", "🥑", "Avocado Toast", "Smashed avocado on sourdough"],
      ["chicken-wrap", "🌯", "Grilled Chicken Wrap", "Lean protein, easy to carry"],
      ["greek-salad", "🥗", "Greek Salad", "Feta, olives, cucumber and tomato"],
      ["smoothie-bowl", "🍓", "Smoothie Bowl", "Blended fruit with granola"],
    ]),
    ...items("comfort", [
      ["grilled-cheese", "🧀", "Grilled Cheese", "Golden, buttery and gooey"],
      ["pot-pie", "🥧", "Chicken Pot Pie", "Flaky crust over creamy filling"],
      ["meatloaf", "🍖", "Meatloaf", "Homestyle with mashed potatoes"],
      ["shepherds-pie", "🥔", "Shepherd's Pie", "Minced lamb under mashed potato"],
      ["tomato-soup", "🍅", "Tomato Soup", "Best with a grilled cheese on the side"],
      ["fish-and-chips", "🍟", "Fish and Chips", "Beer-battered cod with chips"],
      ["chicken-noodle", "🍲", "Chicken Noodle Soup", "The cure for everything"],
      ["mashed-potatoes", "🥔", "Bangers and Mash", "Sausages with creamy mash and gravy"],
    ]),
    ...items("breakfast", [
      ["pancakes", "🥞", "Pancakes", "Fluffy stack with maple syrup"],
      ["eggs-benedict", "🍳", "Eggs Benedict", "Poached eggs and hollandaise"],
      ["french-toast", "🍞", "French Toast", "Custardy bread, cinnamon and syrup"],
      ["omelette", "🍳", "Omelette", "Fill it with whatever you love"],
      ["bagel-lox", "🥯", "Bagel with Lox", "Cream cheese, smoked salmon, capers"],
      ["waffles", "🧇", "Waffles", "Crispy edges, soft center"],
      ["breakfast-burrito", "🌯", "Breakfast Burrito", "Eggs, cheese and potatoes to go"],
      ["granola", "🥣", "Yogurt & Granola", "Light start with fresh berries"],
    ]),
    ...items("dessert", [
      ["cheesecake", "🍰", "Cheesecake", "Rich, creamy, graham cracker crust"],
      ["brownie", "🍫", "Brownie", "Fudgy with a scoop of ice cream"],
      ["apple-pie", "🥧", "Apple Pie", "Warm, spiced, à la mode"],
      ["ice-cream", "🍦", "Ice Cream", "Pick your favorite flavor"],
      ["donut", "🍩", "Donut", "Glazed, filled or sprinkled"],
      ["tiramisu", "🍰", "Tiramisu", "Coffee-soaked layers and mascarpone"],
      ["cinnamon-roll", "🥐", "Cinnamon Roll", "Warm swirl with cream cheese icing"],
      ["cookie", "🍪", "Chocolate Chip Cookie", "Still warm from the oven"],
    ]),
  ],
};

// ───────────────────────── 中文 ─────────────────────────
const zh: MenuPool = {
  categories: [
    { id: "sichuan", label: "川菜", emoji: "🌶️", description: "麻辣鲜香，越吃越过瘾" },
    { id: "cantonese", label: "粤菜", emoji: "🥟", description: "烧腊、点心、清淡鲜美" },
    { id: "noodles", label: "面食", emoji: "🍜", description: "拉面、炸酱面、饺子" },
    { id: "hotpot", label: "火锅·烧烤", emoji: "🍲", description: "热闹聚餐首选" },
    { id: "homestyle", label: "家常菜", emoji: "🍚", description: "番茄炒蛋、红烧肉" },
    { id: "snacks", label: "小吃", emoji: "🥠", description: "煎饼、肉夹馍、小笼包" },
    { id: "western", label: "快餐·西餐", emoji: "🍔", description: "汉堡、披萨、牛排" },
    { id: "dessert", label: "甜品·饮品", emoji: "🍮", description: "奶茶、蛋挞、双皮奶" },
  ],
  items: [
    ...items("sichuan", [
      ["mapo-tofu", "🌶️", "麻婆豆腐", "麻辣下饭，一碗米饭不够"],
      ["boiled-fish", "🐟", "水煮鱼", "滑嫩鱼片，红油翻滚"],
      ["twice-cooked-pork", "🥘", "回锅肉", "肥而不腻的川菜之魂"],
      ["kung-pao", "🍗", "宫保鸡丁", "酸甜微辣，花生香脆"],
      ["fuqi-feipian", "🥩", "夫妻肺片", "麻辣凉菜经典"],
      ["lazi-ji", "🌶️", "辣子鸡", "在辣椒堆里找鸡丁的乐趣"],
      ["suancai-yu", "🐟", "酸菜鱼", "酸爽开胃，鱼肉鲜嫩"],
      ["dandan", "🍜", "担担面", "麻辣芝麻酱拌面"],
    ]),
    ...items("cantonese", [
      ["roast-goose", "🍗", "烧鹅", "皮脆肉嫩，蘸酸梅酱"],
      ["char-siu-rice", "🍚", "叉烧饭", "蜜汁叉烧配白饭"],
      ["har-gow", "🥟", "虾饺", "晶莹剔透的早茶经典"],
      ["white-cut-chicken", "🍗", "白切鸡", "原汁原味，蘸姜葱酱"],
      ["cheung-fun", "🍥", "肠粉", "滑嫩米皮淋上豉油"],
      ["claypot-rice", "🍲", "煲仔饭", "锅巴香脆，腊味飘香"],
      ["wonton-noodles", "🍜", "云吞面", "鲜虾云吞配竹升面"],
      ["siu-mai", "🥟", "烧卖", "早茶必点"],
    ]),
    ...items("noodles", [
      ["lanzhou-lamian", "🍜", "兰州拉面", "一清二白三红四绿"],
      ["zhajiangmian", "🍜", "炸酱面", "老北京味道，酱香浓郁"],
      ["daoxiaomian", "🍜", "刀削面", "面片筋道，汤头浓郁"],
      ["chongqing-xiaomian", "🌶️", "重庆小面", "麻辣鲜香的早餐之光"],
      ["reganmian", "🍜", "热干面", "芝麻酱拌面，武汉特色"],
      ["beef-noodles", "🍜", "牛肉面", "大块牛肉，汤浓面韧"],
      ["jiaozi", "🥟", "饺子", "好吃不过饺子"],
      ["biangbiang", "🍜", "油泼面", "宽面淋热油，香气扑鼻"],
    ]),
    ...items("hotpot", [
      ["mala-hotpot", "🍲", "麻辣火锅", "红汤翻滚，越辣越香"],
      ["clear-hotpot", "🍲", "清汤火锅", "养生清淡，涮什么都鲜"],
      ["lamb-skewers", "🍢", "羊肉串", "孜然烤串配啤酒"],
      ["grilled-fish", "🐟", "烤鱼", "烤后再煮，一鱼两吃"],
      ["korean-bbq", "🥩", "烤肉", "滋滋作响，大口吃肉"],
      ["malatang", "🍲", "麻辣烫", "想吃什么自己拿"],
      ["maocai", "🥘", "冒菜", "一个人的火锅"],
      ["chuanchuan", "🍢", "串串香", "签签入味，越撸越上头"],
    ]),
    ...items("homestyle", [
      ["tomato-egg", "🍅", "番茄炒蛋", "永远吃不腻的国民菜"],
      ["hongshao-rou", "🍖", "红烧肉", "肥瘦相间，入口即化"],
      ["yuxiang-rousi", "🥘", "鱼香肉丝", "酸甜咸辣，下饭神器"],
      ["qingjiao-rousi", "🥬", "青椒肉丝", "简单快手家常菜"],
      ["sweet-sour-ribs", "🍖", "糖醋排骨", "酸甜入味，连骨头都想嚼"],
      ["disanxian", "🍆", "地三鲜", "茄子土豆青椒的东北经典"],
      ["egg-fried-rice", "🍚", "蛋炒饭", "粒粒分明，简单满足"],
      ["kung-pao-shrimp", "🦐", "宫保虾球", "鲜嫩虾仁配花生"],
    ]),
    ...items("snacks", [
      ["jianbing", "🥞", "煎饼果子", "薄脆加蛋，早餐之王"],
      ["roujiamo", "🥙", "肉夹馍", "中式汉堡，肉香四溢"],
      ["shengjian", "🥟", "生煎包", "底脆汤多，小心烫嘴"],
      ["xiaolongbao", "🥟", "小笼包", "轻轻咬开，鲜汤四溢"],
      ["stinky-tofu", "🧀", "臭豆腐", "闻着臭吃着香"],
      ["kaolengmian", "🌯", "烤冷面", "东北街头人气小吃"],
      ["tanghulu", "🍡", "糖葫芦", "酸甜山楂裹糖衣"],
      ["liangpi", "🍜", "凉皮", "酸辣爽口，夏天必备"],
    ]),
    ...items("western", [
      ["burger", "🍔", "汉堡", "快捷管饱的经典选择"],
      ["pizza", "🍕", "披萨", "拉丝芝士的幸福感"],
      ["fried-chicken", "🍗", "炸鸡", "外酥里嫩，配可乐绝了"],
      ["pasta", "🍝", "意面", "番茄、奶油、黑椒随你选"],
      ["steak", "🥩", "牛排", "七分熟，肉汁丰盈"],
      ["sushi", "🍣", "寿司", "换个口味吃日料"],
      ["curry-rice", "🍛", "咖喱饭", "浓郁咖喱盖满米饭"],
      ["sandwich", "🥪", "三明治", "轻食快餐的好选择"],
    ]),
    ...items("dessert", [
      ["milk-tea", "🥤", "奶茶", "珍珠要多加一份"],
      ["mango-pomelo", "🥭", "杨枝甘露", "芒果西柚椰奶的清爽组合"],
      ["shuangpinai", "🍮", "双皮奶", "顺滑奶香，广式甜品"],
      ["egg-tart", "🥧", "蛋挞", "酥皮酥脆，蛋液嫩滑"],
      ["mango-pancake", "🥞", "芒果班戟", "鲜芒果裹奶油"],
      ["douhua", "🍮", "豆花", "甜咸之争，你站哪边？"],
      ["bingfen", "🍧", "冰粉", "红糖冰粉，解暑神器"],
      ["tangyuan", "🍡", "汤圆", "软糯香甜，团团圆圆"],
    ]),
  ],
};

// ───────────────────────── 日本語 ─────────────────────────
const ja: MenuPool = {
  categories: [
    { id: "washoku", label: "和食", emoji: "🍱", description: "寿司・天ぷら・定食" },
    { id: "noodles", label: "麺類", emoji: "🍜", description: "ラーメン・うどん・そば" },
    { id: "donburi", label: "丼・ご飯もの", emoji: "🍚", description: "牛丼・カレー・オムライス" },
    { id: "yoshoku", label: "洋食", emoji: "🍝", description: "ハンバーグ・ナポリタン" },
    { id: "chuka", label: "中華", emoji: "🥟", description: "餃子・麻婆豆腐・エビチリ" },
    { id: "izakaya", label: "居酒屋・夜食", emoji: "🍢", description: "唐揚げ・焼き鳥・おでん" },
    { id: "fastfood", label: "ファストフード", emoji: "🍔", description: "手軽にサクッと" },
    { id: "sweets", label: "スイーツ・カフェ", emoji: "🍰", description: "甘いものが欲しいとき" },
  ],
  items: [
    ...items("washoku", [
      ["sushi", "🍣", "寿司", "新鮮なネタとシャリの調和"],
      ["sashimi", "🐟", "刺身", "素材の味をそのまま"],
      ["tempura", "🍤", "天ぷら", "サクサクの衣に天つゆ"],
      ["yakizakana", "🐟", "焼き魚定食", "ご飯と味噌汁でほっと一息"],
      ["nikujaga", "🥘", "肉じゃが", "おふくろの味の代表格"],
      ["onigiri", "🍙", "おにぎり", "具は何にする？"],
      ["unadon", "🍚", "うな丼", "ふっくら鰻にたれが染みる"],
      ["tonkatsu", "🍱", "とんかつ", "サクッと揚がった王道"],
      ["oden", "🍢", "おでん", "出汁の染みた大根がたまらない"],
    ]),
    ...items("noodles", [
      ["ramen", "🍜", "ラーメン", "醤油・味噌・豚骨、今日はどれ？"],
      ["udon", "🍲", "うどん", "もちもち麺と優しい出汁"],
      ["soba", "🍜", "そば", "香り高い蕎麦をつるっと"],
      ["tsukemen", "🍜", "つけ麺", "濃厚スープに太麺をくぐらせて"],
      ["yakisoba", "🍝", "焼きそば", "ソースの香りが食欲をそそる"],
      ["hiyashi-chuka", "🍜", "冷やし中華", "さっぱり食べたい日に"],
      ["champon", "🍲", "ちゃんぽん", "具だくさんの長崎名物"],
      ["tantanmen", "🌶️", "担々麺", "胡麻の香りとピリ辛スープ"],
    ]),
    ...items("donburi", [
      ["gyudon", "🍚", "牛丼", "早い・安い・うまい"],
      ["oyakodon", "🍳", "親子丼", "とろとろ卵と鶏肉"],
      ["katsudon", "🍱", "カツ丼", "勝負の日はこれ"],
      ["tendon", "🍤", "天丼", "揚げたて天ぷらに甘辛だれ"],
      ["curry-rice", "🍛", "カレーライス", "みんな大好き定番の味"],
      ["omurice", "🍳", "オムライス", "ふわとろ卵にケチャップ"],
      ["kaisendon", "🐟", "海鮮丼", "彩り豊かな海の幸"],
      ["chahan", "🍚", "チャーハン", "パラパラ香ばしい炒飯"],
    ]),
    ...items("yoshoku", [
      ["hamburg", "🍖", "ハンバーグ", "肉汁じゅわっとデミグラス"],
      ["napolitan", "🍝", "ナポリタン", "喫茶店の懐かしい味"],
      ["pizza", "🍕", "ピザ", "チーズたっぷり焼きたて"],
      ["gratin", "🧀", "グラタン", "熱々とろーりホワイトソース"],
      ["ebi-fry", "🍤", "エビフライ", "タルタルソースをたっぷり"],
      ["steak", "🥩", "ステーキ", "ごちそう気分の日に"],
      ["doria", "🍚", "ドリア", "ご飯とホワイトソースの幸せ"],
      ["cream-croquette", "🥔", "クリームコロッケ", "外サクッ中とろーり"],
    ]),
    ...items("chuka", [
      ["gyoza", "🥟", "餃子", "パリッと焼けた羽根つき"],
      ["mabo-tofu", "🌶️", "麻婆豆腐", "ピリ辛でご飯が進む"],
      ["hoikoro", "🥘", "回鍋肉", "キャベツと豚肉の甘辛炒め"],
      ["ebi-chili", "🦐", "エビチリ", "プリプリ海老にチリソース"],
      ["chinjao", "🥬", "青椒肉絲", "ピーマンと細切り肉"],
      ["xiaolongbao", "🥟", "小籠包", "熱々スープに注意"],
      ["subuta", "🍖", "酢豚", "甘酸っぱい王道中華"],
      ["karaage-chuka", "🍗", "油淋鶏", "香味だれが決め手"],
    ]),
    ...items("izakaya", [
      ["karaage", "🍗", "唐揚げ", "ビールとの相性抜群"],
      ["yakitori", "🍢", "焼き鳥", "塩かタレか、それが問題だ"],
      ["edamame", "🥬", "枝豆", "まずはこれから"],
      ["takoyaki", "🐙", "たこ焼き", "外カリ中とろ"],
      ["okonomiyaki", "🥞", "お好み焼き", "鉄板で焼く粉もんの王様"],
      ["kushikatsu", "🍢", "串カツ", "二度漬け禁止"],
      ["motsunabe", "🍲", "もつ鍋", "〆はちゃんぽん麺で"],
      ["ochazuke", "🍚", "お茶漬け", "飲んだ後の〆に"],
    ]),
    ...items("fastfood", [
      ["burger", "🍔", "ハンバーガー", "手軽にがっつり"],
      ["fried-chicken", "🍗", "フライドチキン", "サクサクジューシー"],
      ["gyudon-chain", "🍚", "牛丼チェーン", "すぐ出てきてすぐ食べられる"],
      ["kaiten-sushi", "🍣", "回転寿司", "好きなネタを好きなだけ"],
      ["sandwich", "🥪", "サンドイッチ", "コンビニでもカフェでも"],
      ["fries", "🍟", "ポテト", "ついつい手が伸びる"],
      ["hot-dog", "🌭", "ホットドッグ", "片手で食べられる定番"],
    ]),
    ...items("sweets", [
      ["parfait", "🍨", "パフェ", "フルーツと生クリームの塔"],
      ["matcha-latte", "🍵", "抹茶ラテ", "ほろ苦くてまろやか"],
      ["taiyaki", "🐟", "たい焼き", "あんこたっぷり、しっぽまで"],
      ["dorayaki", "🥞", "どら焼き", "ふわふわ生地にあんこ"],
      ["purin", "🍮", "プリン", "カラメルほろ苦なめらか"],
      ["shortcake", "🍰", "ショートケーキ", "いちごと生クリームの定番"],
      ["crepe", "🥞", "クレープ", "原宿スタイルで"],
      ["dango", "🍡", "みたらし団子", "甘じょっぱいたれが絡む"],
    ]),
  ],
};

export const menuPools: Record<MenuLang, MenuPool> = { ko, en, zh, ja };

/** 현재 언어에 맞는 메뉴 풀 (지원하지 않는 언어는 영어) */
export function getMenuPool(lang: string): MenuPool {
  return menuPools[lang as MenuLang] ?? menuPools.en;
}

/** 카테고리의 메뉴 목록. "random" 이면 전체 */
export function getMenuItems(pool: MenuPool, categoryId: string): MenuItem[] {
  if (categoryId === RANDOM_CATEGORY_ID) return pool.items;
  return pool.items.filter((m) => m.category === categoryId);
}

export function getMenuCategory(pool: MenuPool, categoryId: string): MenuCategory | undefined {
  return pool.categories.find((c) => c.id === categoryId);
}

/** 현재 시각 기준 식사 때 (인사말·추천 문구용) */
export function getCurrentMealTime(date = new Date()): MealTime {
  const h = date.getHours();
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 15) return "lunch";
  if (h >= 17 && h < 22) return "dinner";
  if (h >= 22 || h < 5) return "snack";
  return "lunch"; // 15~17시는 늦은 점심으로 취급
}

export const mealTimeLabels: Record<MealTime, Record<MenuLang, string>> = {
  morning: { ko: "아침", en: "breakfast", zh: "早餐", ja: "朝ごはん" },
  lunch: { ko: "점심", en: "lunch", zh: "午餐", ja: "お昼ごはん" },
  dinner: { ko: "저녁", en: "dinner", zh: "晚餐", ja: "晩ごはん" },
  snack: { ko: "야식", en: "a late-night snack", zh: "夜宵", ja: "夜食" },
};

/** 페이지 공용 문구 */
export const menuUiText = {
  title: { ko: "오늘의 메뉴추천", en: "What Should I Eat?", zh: "今日菜单推荐", ja: "今日のメニューおすすめ" },
  subtitle: { ko: "결정장애 해결사 🦸", en: "Decision Solver 🦸", zh: "选择困难症救星 🦸", ja: "優柔不断解決 🦸" },
  pickCategory: {
    ko: "오늘 {time} 뭐 먹지? 종류부터 골라 주세요",
    en: "What's for {time}? Pick a cuisine first",
    zh: "{time}吃什么？先选个种类",
    ja: "{time}は何にする？まずジャンルを選んでね",
  },
  random: { ko: "아무거나!", en: "Surprise me!", zh: "随便来一个！", ja: "なんでもいい！" },
  randomDesc: { ko: "전부 섞어서 룰렛 돌리기", en: "Spin across every cuisine", zh: "全部混合随机抽", ja: "全ジャンルからルーレット" },
  spinning: { ko: "메뉴를 고르고 있어요...", en: "Picking a menu...", zh: "正在挑选菜单...", ja: "メニューを選んでいます..." },
  cancel: { ko: "취소", en: "Cancel", zh: "取消", ja: "キャンセル" },
  resultHeader: { ko: "오늘의 추천 메뉴", en: "Today's pick", zh: "今日推荐", ja: "今日のおすすめ" },
  alsoTry: { ko: "이런 메뉴도 어때요?", en: "Or how about these?", zh: "这些也不错？", ja: "こんなメニューはどう？" },
  spinAgain: { ko: "같은 종류로 다시 뽑기", en: "Spin again in this cuisine", zh: "同类再抽一次", ja: "同じジャンルでもう一度" },
  changeCategory: { ko: "다른 종류 고르기", en: "Pick another cuisine", zh: "换个种类", ja: "別のジャンルを選ぶ" },
  stats: { ko: "참여자 수", en: "Participants", zh: "参与人数", ja: "参加者数" },
  back: { ko: "홈으로", en: "Home", zh: "返回首页", ja: "ホームへ" },
  shareTitle: {
    ko: "오늘 {time}은 \"{menu}\" 어떠세요?",
    en: "How about \"{menu}\" for {time}?",
    zh: "{time}来一份\"{menu}\"怎么样？",
    ja: "{time}は「{menu}」はどう？",
  },
  shareDesc: { ko: "오늘의 메뉴추천 · check-me.today", en: "What Should I Eat? · check-me.today", zh: "今日菜单推荐 · check-me.today", ja: "今日のメニューおすすめ · check-me.today" },
  menuCount: { ko: "{n}가지", en: "{n} dishes", zh: "{n}种", ja: "{n}品" },
} satisfies Record<string, Record<MenuLang, string>>;

export function menuText(key: keyof typeof menuUiText, lang: string, vars: Record<string, string | number> = {}): string {
  const table = menuUiText[key];
  let s = table[lang as MenuLang] ?? table.en;
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
