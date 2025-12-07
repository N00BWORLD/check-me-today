"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import { menuRecommendations, type TimeSlot } from "@/data/menu-recommendation";
import MenuSelector from "./_components/MenuSelector";
import MenuResult from "./_components/MenuResult";

export default function MenuRecommendationPage() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [recommendedMenu, setRecommendedMenu] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rouletteItems, setRouletteItems] = useState(menuRecommendations.slice(0, 12));
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { lang } = useLanguage();
  const { stats } = useTestStats("menu-recommendation");

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
    setHighlightIndex(0);

    if (pool.length === 0) {
      setIsGenerating(false);
      return;
    }
    const selectedMenu = pool[Math.floor(Math.random() * pool.length)];
    setTimeout(() => {
      setRecommendedMenu(selectedMenu);
      setIsGenerating(false);
    }, 1200);
  };

  const resetRecommendation = () => {
    setSelectedTimeSlot(null);
    setRecommendedMenu(null);
  };

  useEffect(() => {
    if (!isGenerating || rouletteItems.length === 0) return;
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % rouletteItems.length);
    }, 80);
    return () => clearInterval(interval);
  }, [isGenerating, rouletteItems.length]);

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
    },
    ja: {
      title: "今日のメニューおすすめ",
      subtitle: "🍽️ タグで回すルーレット",
      description: "時間帯はなし、タグだけでおすすめを回します。",
      currentTime: "現在の時間",
      recommend: "おすすめを受ける",
      back: "← 戻る",
      reset: "もう一度おすすめ",
      stats: "総おすすめ数",
    },
  };

  const info = pageInfo[lang] || pageInfo.ko;
  const filteredCount = useMemo(
    () => filterByTags(menuRecommendations.filter((m) => m.category !== "dessert")).length,
    [selectedTags]
  );

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {info.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">{info.subtitle}</p>
            </div>

            <div className="glass rounded-2xl p-8 mb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">룰렛이 돌아가는 중... 🍽️</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">선택한 태그에 맞는 메뉴를 찾고 있어요!</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {rouletteItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`glass p-2 rounded-lg text-center transition transform ${
                      idx === highlightIndex ? "ring-2 ring-orange-500 scale-105" : "opacity-80"
                    }`}
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="text-xs font-semibold line-clamp-1">{item.name.ko}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
        stats={stats}
      />
    );
  }

  return (
    <MenuSelector
      currentTimeSlot={"random"}
      onSelectTimeSlot={generateRecommendation}
      pageInfo={info}
      stats={stats}
      tagOptions={TAG_OPTIONS}
      selectedTags={selectedTags}
      onToggleTag={(tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
      }}
      tagLabels={(tag: string) => TAG_LABELS[tag]?.[lang] || TAG_LABELS[tag]?.ko || tag}
      filteredCount={filteredCount}
    />
  );
}
