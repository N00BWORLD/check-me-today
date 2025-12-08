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
  const { lang } = useLanguage();
  const { stats, incrementPlayCount } = useTestStats("menu-recommendation") as any;

  // Simple pool builder: just exclude desserts if "random", or take all.
  // Actually, random usually implies full random or based on time. 
  // Let's keep it simple: take all items except maybe dessert if it's lunch/dinner?
  // The previous logic filtered by tags. 
  // Now we just take random 30 items or based on category distribution?
  // Let's just shuffle all items for the pool.

  const buildPool = () => {
    // Optional: filter out dessert for main meal times if we had time slots, but here we just have "random" button.
    // Let's keep all except desserts as primary suggestions maybe? 
    // Or just all. "Random" implies anything.
    // Previous code: const nonDessert = menuRecommendations.filter((m) => m.category !== "dessert");
    // Let's stick to non-dessert for the main roulette to avoid getting just a cookie for lunch.
    const nonDessert = menuRecommendations.filter((m) => m.category !== "dessert");
    const shuffled = [...nonDessert].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(30, shuffled.length));
  };

  const generateRecommendation = () => {
    setIsGenerating(true);
    setSelectedTimeSlot("random");
    const pool = buildPool();
    setRouletteItems(pool);
  };

  const resetRecommendation = () => {
    setSelectedTimeSlot(null);
    setRecommendedMenu(null);
  };

  const pageInfo = {
    ko: {
      title: "오늘의 메뉴추천",
      subtitle: "🍽️ 고민될 땐 돌려보세요",
      description: "뭐 먹을지 고민될 때, 랜덤으로 골라드립니다.",
      currentTime: "현재 시간",
      recommend: "메뉴 추천받기",
      back: "← 돌아가기",
      reset: "다른 메뉴 추천받기",
      stats: "총 추천수",
    },
    en: {
      title: "Today's Menu Recommendation",
      subtitle: "🍽️ Spin when in doubt",
      description: "Can't decide? Let us pick for you randomly.",
      currentTime: "Current Time",
      recommend: "Get Recommendation",
      back: "← Back",
      reset: "Get Another Recommendation",
      stats: "Total Recommendations",
    },
    zh: {
      title: "今日菜单推荐",
      subtitle: "🍽️ 犹豫不决就转一转",
      description: "不知道吃什么？随机为您挑选。",
      currentTime: "当前时间",
      recommend: "获取推荐",
      back: "← 返回",
      reset: "再推荐一次",
      stats: "总推荐数",
    },
    ja: {
      title: "今日のメニューおすすめ",
      subtitle: "🍽️ 迷ったら回そう",
      description: "何食べるか迷う時、ランダムで選びます。",
      currentTime: "現在の時間",
      recommend: "おすすめを受ける",
      back: "← 戻る",
      reset: "もう一度おすすめ",
      stats: "総おすすめ数",
    },
  };

  const info = pageInfo[lang] || pageInfo.ko;

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
    />
  );
}
