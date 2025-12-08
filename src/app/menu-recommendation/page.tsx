"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import { menuRecommendations } from "@/data/menu-recommendation";
import MenuSelector from "./_components/MenuSelector";
import MenuResult from "./_components/MenuResult";
import PhysicsRoulette from "./_components/PhysicsRoulette";

export default function MenuRecommendationPage() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<"random" | null>(null);
  const [recommendedMenu, setRecommendedMenu] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rouletteItems, setRouletteItems] = useState(menuRecommendations.slice(0, 12));
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { lang } = useLanguage();
  const { stats, incrementPlayCount } = useTestStats("menu-recommendation") as any;

  const TAG_LABELS: Record<string, Record<string, string>> = {
    korean: { ko: "한식", en: "Korean", zh: "韩餐", ja: "韓国料理" },
    chinese: { ko: "중식", en: "Chinese", zh: "中餐", ja: "中華" },
    japanese: { ko: "일식", en: "Japanese", zh: "日餐", ja: "和食" },
    western: { ko: "양식", en: "Western", zh: "西餐", ja: "洋食" },
    mexican: { ko: "멕시칸", en: "Mexican", zh: "墨西哥", ja: "メキシカン" },
    thai: { ko: "태국", en: "Thai", zh: "泰国", ja: "タイ" },
    vietnamese: { ko: "베트남", en: "Vietnamese", zh: "越南", ja: "ベトナム" },
    rice: { ko: "쌀밥", en: "Rice", zh: "米饭", ja: "ご飯" },
    noodles: { ko: "면/누들", en: "Noodles", zh: "面", ja: "麺" },
    soup: { ko: "국/수프", en: "Soup", zh: "汤", ja: "スープ" },
    stew: { ko: "찌개/스튜", en: "Stew", zh: "炖菜", ja: "シチュー" },
    spicy: { ko: "매운맛", en: "Spicy", zh: "辣", ja: "辛い" },
    mild: { ko: "순한맛", en: "Mild", zh: "清淡", ja: "マイルド" },
    fried: { ko: "튀김", en: "Fried", zh: "油炸", ja: "揚げ物" },
    grilled: { ko: "구이", en: "Grilled", zh: "烤", ja: "グリル" },
    bowl: { ko: "덮밥/볼", en: "Bowl", zh: "盖饭/碗餐", ja: "丼/ボウル" },
    seafood: { ko: "해산물", en: "Seafood", zh: "海鲜", ja: "海鮮" },
    salad: { ko: "샐러드", en: "Salad", zh: "沙拉", ja: "サラダ" },
    meat: { ko: "고기", en: "Meat", zh: "肉类", ja: "肉料理" },
    chicken: { ko: "치킨", en: "Chicken", zh: "鸡肉", ja: "チキン" },
    beef: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉" },
    pork: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉" },
    fish: { ko: "생선", en: "Fish", zh: "鱼", ja: "魚" },
    veggie: { ko: "채식", en: "Veggie", zh: "素食", ja: "ベジ" },
    healthy: { ko: "건강식", en: "Healthy", zh: "健康", ja: "ヘルシー" },
    light: { ko: "라이트", en: "Light", zh: "清爽", ja: "ライト" },
    hearty: { ko: "든든한", en: "Hearty", zh: "饱腹", ja: "ボリューム" },
    sweet: { ko: "달콤", en: "Sweet", zh: "甜", ja: "スイート" },
    dessert: { ko: "디저트", en: "Dessert", zh: "甜点", ja: "デザート" },
    coffee: { ko: "커피", en: "Coffee", zh: "咖啡", ja: "コーヒー" },
    tea: { ko: "차/티", en: "Tea", zh: "茶", ja: "ティー" },
    bread: { ko: "빵/베이커리", en: "Bakery", zh: "面包", ja: "ベーカリー" },
    wrap: { ko: "랩/또띠아", en: "Wrap", zh: "卷饼", ja: "ラップ" },
    burger: { ko: "버거", en: "Burger", zh: "汉堡", ja: "バーガー" },
    pizza: { ko: "피자", en: "Pizza", zh: "披萨", ja: "ピザ" },
    taco: { ko: "타코", en: "Taco", zh: "墨西哥卷", ja: "タコス" },
    set: { ko: "세트", en: "Set", zh: "套餐", ja: "セット" },
    platter: { ko: "플래터", en: "Platter", zh: "拼盘", ja: "プレート" },
    combo: { ko: "콤보", en: "Combo", zh: "组合", ja: "コンボ" },
    value: { ko: "가성비", en: "Value", zh: "性价比", ja: "コスパ" },
    rich: { ko: "진한맛", en: "Rich", zh: "浓郁", ja: "リッチ" },
    creamy: { ko: "크리미", en: "Creamy", zh: "奶香", ja: "クリーミー" },
    cheese: { ko: "치즈", en: "Cheesy", zh: "奶酪", ja: "チーズ" },
    noodle: { ko: "면", en: "Noodle", zh: "面", ja: "麺" },
    ramen: { ko: "라멘", en: "Ramen", zh: "拉面", ja: "ラーメン" },
    ricebowl: { ko: "덮밥", en: "Rice Bowl", zh: "盖饭", ja: "丼" },
    crispy: { ko: "바삭", en: "Crispy", zh: "酥脆", ja: "サクサク" },
    fresh: { ko: "신선", en: "Fresh", zh: "新鲜", ja: "新鮮" },
    classic: { ko: "클래식", en: "Classic", zh: "经典", ja: "クラシック" },
    bacon: { ko: "베이컨", en: "Bacon", zh: "培根", ja: "ベーコン" },
    buttery: { ko: "버터향", en: "Buttery", zh: "黄油香", ja: "バター風味" },
    american: { ko: "아메리칸", en: "American", zh: "美式", ja: "アメリカン" },
    chewy: { ko: "쫄깃", en: "Chewy", zh: "有嚼劲", ja: "もちもち" },
    smoked: { ko: "훈제", en: "Smoked", zh: "熏制", ja: "スモーク" },
    "new-york": { ko: "뉴욕스타일", en: "New York Style", zh: "纽约风", ja: "ニューヨークスタイル" },
    trendy: { ko: "트렌디", en: "Trendy", zh: "潮流", ja: "トレンディ" },
    instagram: { ko: "인스타감성", en: "Instagrammable", zh: "出片", ja: "インスタ映え" },
    luxurious: { ko: "고급", en: "Luxurious", zh: "高档", ja: "リッチ" },
    "poached-egg": { ko: "수란", en: "Poached Egg", zh: "水波蛋", ja: "ポーチドエッグ" },
    hollandaise: { ko: "홀랜데이즈", en: "Hollandaise", zh: "荷兰酱", ja: "オランデーズ" },
    fragrant: { ko: "향긋", en: "Fragrant", zh: "香气", ja: "香り高い" },
    comforting: { ko: "편안한", en: "Comforting", zh: "治愈", ja: "ホッとする" },
    porridge: { ko: "죽/포리지", en: "Porridge", zh: "粥", ja: "おかゆ" },
    quick: { ko: "빠른", en: "Quick", zh: "快捷", ja: "クイック" },
    simple: { ko: "심플", en: "Simple", zh: "简单", ja: "シンプル" },
    signature: { ko: "시그니처", en: "Signature", zh: "招牌", ja: "シグネチャー" },
    mcdonalds: { ko: "맥도날드", en: "McDonald's", zh: "麦当劳", ja: "マクドナルド" },
    filling: { ko: "배부른", en: "Filling", zh: "管饱", ja: "ボリューム" },
    cheesy: { ko: "치즈가득", en: "Cheesy", zh: "奶酪味", ja: "チーズたっぷり" },
    pepperoni: { ko: "페퍼로니", en: "Pepperoni", zh: "意大利辣香肠", ja: "ペパロニ" },
    "sweet-salty": { ko: "단짠", en: "Sweet-Salty", zh: "甜咸", ja: "甘じょっぱい" },
    "korean-chinese": { ko: "중화풍", en: "Korean-Chinese", zh: "韩中式", ja: "韓中" },
    "street-food": { ko: "길거리음식", en: "Street Food", zh: "街头小吃", ja: "屋台風" },
    popular: { ko: "인기", en: "Popular", zh: "人气", ja: "人気" },
    tuna: { ko: "참치", en: "Tuna", zh: "金枪鱼", ja: "ツナ" },
    convenient: { ko: "간편", en: "Convenient", zh: "方便", ja: "手軽" },
    traditional: { ko: "전통", en: "Traditional", zh: "传统", ja: "伝統" },
    nutritious: { ko: "영양가", en: "Nutritious", zh: "营养", ja: "栄養" },
    hot: { ko: "뜨거운", en: "Hot", zh: "热", ja: "熱い" },
    "rice-bowl": { ko: "덮밥", en: "Rice Bowl", zh: "盖饭", ja: "丼" },
    "hot-stone": { ko: "돌솥", en: "Hot Stone", zh: "石锅", ja: "石鍋" },
    "burger-king": { ko: "버거킹", en: "Burger King", zh: "汉堡王", ja: "バーガーキング" },
    thick: { ko: "두툼한", en: "Thick", zh: "厚实", ja: "分厚い" },
    dumpling: { ko: "만두", en: "Dumpling", zh: "饺子", ja: "餃子" },
    cool: { ko: "시원한", en: "Cool", zh: "清凉", ja: "さっぱり" },
    "stir-fry": { ko: "볶음", en: "Stir-fry", zh: "炒", ja: "炒め" },
    hawaiian: { ko: "하와이안", en: "Hawaiian", zh: "夏威夷", ja: "ハワイアン" },
    gyoza: { ko: "교자", en: "Gyoza", zh: "饺子", ja: "餃子" },
    comfort: { ko: "위로", en: "Comfort", zh: "安慰", ja: "癒やし" },
    salmon: { ko: "연어", en: "Salmon", zh: "三文鱼", ja: "サーモン" },
    crunchy: { ko: "아삭한", en: "Crunchy", zh: "脆爽", ja: "カリカリ" },
    premium: { ko: "프리미엄", en: "Premium", zh: "高端", ja: "プレミアム" },
    juicy: { ko: "육즙가득", en: "Juicy", zh: "多汁", ja: "ジューシー" },
    special: { ko: "특별", en: "Special", zh: "特别", ja: "スペシャル" },
    "korean-style": { ko: "한식풍", en: "Korean Style", zh: "韩式", ja: "韓国風" },
    "omega-3": { ko: "오메가3", en: "Omega-3", zh: "欧米伽3", ja: "オメガ3" },
    mushroom: { ko: "버섯", en: "Mushroom", zh: "蘑菇", ja: "きのこ" },
    spanish: { ko: "스페인식", en: "Spanish", zh: "西班牙风", ja: "スペイン風" },
    flavorful: { ko: "풍미가득", en: "Flavorful", zh: "风味足", ja: "風味豊か" },
    superfood: { ko: "슈퍼푸드", en: "Superfood", zh: "超级食物", ja: "スーパーフード" },
    balanced: { ko: "균형", en: "Balanced", zh: "均衡", ja: "バランス" },
    sharing: { ko: "함께먹기", en: "Sharing", zh: "分享", ja: "シェア" },
    braised: { ko: "조림/찜", en: "Braised", zh: "焖/蒸", ja: "煮込み/蒸し" },
    soy: { ko: "간장", en: "Soy", zh: "酱油", ja: "醤油" },
    kimchi: { ko: "김치", en: "Kimchi", zh: "泡菜", ja: "キムチ" },
    potato: { ko: "감자", en: "Potato", zh: "土豆", ja: "ポテト" },
    ink: { ko: "먹물", en: "Ink", zh: "墨汁", ja: "イカスミ" },
    steak: { ko: "스테이크", en: "Steak", zh: "牛排", ja: "ステーキ" },
    luxury: { ko: "럭셔리", en: "Luxury", zh: "奢华", ja: "ラグジュアリー" },
    custom: { ko: "커스텀", en: "Custom", zh: "自选", ja: "カスタム" },
    share: { ko: "공유/나눔", en: "Share", zh: "分享", ja: "シェア" },
    cutlet: { ko: "돈카츠", en: "Cutlet", zh: "炸猪排", ja: "カツ" },
    kfc: { ko: "KFC", en: "KFC", zh: "肯德基", ja: "ケンタッキー" },
    "fire-hot": { ko: "불맛매움", en: "Fire Hot", zh: "火辣", ja: "激辛" },
    addictive: { ko: "중독성", en: "Addictive", zh: "上瘾", ja: "やみつき" },
    brothy: { ko: "국물가득", en: "Brothy", zh: "汤多", ja: "スープ多め" },
    essential: { ko: "기본", en: "Essential", zh: "基础", ja: "定番" },
    wings: { ko: "윙", en: "Wings", zh: "鸡翅", ja: "ウィング" },
    sausage: { ko: "소시지", en: "Sausage", zh: "香肠", ja: "ソーセージ" },
    octopus: { ko: "문어", en: "Octopus", zh: "章鱼", ja: "タコ" },
    fruity: { ko: "과일맛", en: "Fruity", zh: "果味", ja: "フルーティ" },
    refreshing: { ko: "상큼/시원", en: "Refreshing", zh: "清爽", ja: "さっぱり" },
    drink: { ko: "음료", en: "Drink", zh: "饮品", ja: "ドリンク" },
    waffle: { ko: "와플", en: "Waffle", zh: "华夫", ja: "ワッフル" },
    street: { ko: "길거리", en: "Street", zh: "街头", ja: "ストリート" },
    fluffy: { ko: "폭신", en: "Fluffy", zh: "蓬松", ja: "ふわふわ" },
  };

  // 태그 카테고리 정의
  const TAG_CATEGORIES = {
    style: {
      label: { ko: "🇰🇷 나라/스타일", en: "🇰🇷 Cuisine/Style", zh: "🇰🇷 国家/风格", ja: "🇰🇷 国/スタイル" },
      tags: ["korean", "chinese", "japanese", "western", "mexican", "thai", "vietnamese", "american", "spanish", "italian", "new-york", "korean-chinese", "korean-style", "street-food", "street"]
    },
    type: {
      label: { ko: "🍜 종류", en: "🍜 Type", zh: "🍜 种类", ja: "🍜 種類" },
      tags: ["rice", "noodles", "noodle", "ramen", "soup", "stew", "bowl", "ricebowl", "rice-bowl", "porridge", "burger", "pizza", "taco", "wrap", "bread", "waffle", "dumpling", "gyoza", "steak", "cutlet", "wings", "salad", "set", "combo", "platter", "drink", "dessert", "coffee", "tea"]
    },
    ingredient: {
      label: { ko: "🥩 재료", en: "🥩 Ingredient", zh: "🥩 材料", ja: "🥩 材料" },
      tags: ["meat", "chicken", "beef", "pork", "seafood", "fish", "tuna", "salmon", "octopus", "veggie", "mushroom", "potato", "cheese", "cheesy", "bacon", "sausage", "poached-egg"]
    },
    taste: {
      label: { ko: "😋 맛/식감", en: "😋 Taste/Texture", zh: "😋 味道/口感", ja: "😋 味/食感" },
      tags: ["spicy", "mild", "sweet", "sweet-salty", "rich", "creamy", "buttery", "crispy", "crunchy", "chewy", "fluffy", "juicy", "fresh", "hot", "cool", "fire-hot", "fruity", "fragrant", "smoked", "flavorful"]
    },
    vibe: {
      label: { ko: "✨ 분위기/기타", en: "✨ Vibe/Other", zh: "✨ 氛围/其他", ja: "✨ 雰囲気/その他" },
      tags: ["healthy", "light", "hearty", "filling", "quick", "simple", "convenient", "value", "premium", "luxury", "special", "popular", "trendy", "instagram", "comfort", "comforting", "traditional", "addictive", "superfood", "balanced", "nutritious", "sharing", "share", "essential", "mcdonalds", "burger-king", "kfc", "subway"]
    }
  };

  const TAG_OPTIONS = useMemo(() => {
    const set = new Set<string>();
    menuRecommendations.forEach((m) => m.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filterByTags = (pool: typeof menuRecommendations) => {
    if (selectedTags.length === 0) return pool;
    return pool.filter((m) => selectedTags.every((tag) => m.tags?.includes(tag)));
  };

  const buildPool = () => {
    const nonDessert = menuRecommendations.filter((m) => m.category !== "dessert");
    const filtered = filterByTags(nonDessert);
    const effectivePool = filtered.length > 0 ? filtered : filterByTags(menuRecommendations);
    const shuffled = [...effectivePool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(30, shuffled.length));
  };

  const generateRecommendation = () => {
    setIsGenerating(true);
    setSelectedTimeSlot("random");
    const pool = buildPool();
    setRouletteItems(pool);
    // Removed legacy timeout logic here; waiting for onComplete from Roulette
  };

  const resetRecommendation = () => {
    setSelectedTimeSlot(null);
    setRecommendedMenu(null);
  };

  // Removed useEffect for highlightIndex loop

  const pageInfo = {
    ko: {
      title: "오늘의 메뉴추천",
      subtitle: "🍽️ 태그로 골라 돌리는 룰렛",
      description: "시간대 없이 원하는 태그만 켜서 추천받으세요.",
      currentTime: "현재 시간",
      recommend: "메뉴 추천받기",
      back: "← 돌아가기",
      reset: "다른 메뉴 추천받기",
      stats: "총 추천수",
      filtered: "해당 메뉴",
    },
    en: {
      title: "Today's Menu Recommendation",
      subtitle: "🍽️ Tag-based roulette",
      description: "Pick tags you want; no time slots, just spin the roulette.",
      currentTime: "Current Time",
      recommend: "Get Recommendation",
      back: "← Back",
      reset: "Get Another Recommendation",
      stats: "Total Recommendations",
      filtered: "Matches",
    },
    zh: {
      title: "今日菜单推荐",
      subtitle: "🍽️ 按标签选择的轮盘",
      description: "不分时间段，只选标签来获取推荐。",
      currentTime: "当前时间",
      recommend: "获取推荐",
      back: "← 返回",
      reset: "再推荐一次",
      stats: "总推荐数",
      filtered: "匹配",
    },
    ja: {
      title: "今日のメニューおすすめ",
      subtitle: "🍽️ タグで回すルーレット",
      description: "時間帯なし、タグだけでおすすめします。",
      currentTime: "現在の時間",
      recommend: "おすすめを受ける",
      back: "← 戻る",
      reset: "もう一度おすすめ",
      stats: "総おすすめ数",
      filtered: "該当",
    },
  };

  const info = pageInfo[lang] || pageInfo.ko;

  const filteredCount = useMemo(
    () => filterByTags(menuRecommendations.filter((m) => m.category !== "dessert")).length,
    [selectedTags]
  );

  const handleRouletteComplete = (selectedMenu: any) => {
    // 룰렛 완료 시 호출됨
    setTimeout(() => {
      setRecommendedMenu(selectedMenu);
      setIsGenerating(false);
      if (incrementPlayCount) incrementPlayCount();
    }, 1000); // 1초 뒤 결과창으로 이동 (여운)
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
              {info.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {rouletteItems.length}개의 메뉴가 기다리고 있어요!
            </p>
          </div>

          <div className="glass rounded-3xl p-4 mb-8 shadow-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/50 dark:border-slate-700">
            <PhysicsRoulette
              items={rouletteItems}
              onComplete={handleRouletteComplete}
              lang={lang}
            />
          </div>

          <button
            onClick={() => setIsGenerating(false)}
            className="text-sm text-slate-400 underline hover:text-slate-600"
          >
            {info.back}
          </button>
        </div>
      </div>
    );
  }

  if (recommendedMenu && selectedTimeSlot) {
    return (
      <MenuResult
        menu={recommendedMenu}
        timeSlot={selectedTimeSlot}
        onReset={resetRecommendation}
        pageInfo={info}
        stats={stats?.playCount ?? 0}
      />
    );
  }

  return (
    <MenuSelector
      currentTimeSlot={"random"}
      onSelectTimeSlot={generateRecommendation}
      pageInfo={info}
      stats={stats?.playCount ?? 0}
      tagOptions={TAG_OPTIONS}
      tagCategories={TAG_CATEGORIES}
      selectedTags={selectedTags}
      onToggleTag={(tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
      }}
      tagLabels={(tag: string) => TAG_LABELS[tag]?.[lang] || TAG_LABELS[tag]?.ko || tag}
      filteredCount={filteredCount}
    />
  );
}
