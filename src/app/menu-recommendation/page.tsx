"use client";

import { useState } from "react";
import { menuRecommendations, timeSlots, type TimeSlot, type MenuItem } from "@/data/menu-recommendation";
import MenuResult from "./_components/MenuResult";
import MenuSelector from "./_components/MenuSelector";
import TextRoulette from "./_components/TextRoulette";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import { incrementPlayCount } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export default function MenuRecommendationPage() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | "random" | null>(null);
  const [recommendedMenu, setRecommendedMenu] = useState<MenuItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { lang } = useLanguage();
  const { stats } = useTestStats("menu-recommendation");

  const pageInfoData = {
    title: {
      ko: "오늘 점심 뭐 먹지?",
      en: "What to eat today?",
      zh: "今天吃什么？",
      ja: "今日のランチは何にする？"
    },
    subtitle: {
      ko: "결정장애 해결사 🦸",
      en: "Decision Solver 🦸",
      zh: "选择困难症救星 🦸",
      ja: "優柔不断解決 🦸"
    },
    description: {
      ko: "지금 이 시간, 가장 완벽한 메뉴를 추천해드려요!",
      en: "We recommend the perfect menu for right now!",
      zh: "为您推荐此时此刻最完美的菜单！",
      ja: "今この時間、最も完璧なメニューをおすすめします！"
    },
    recommend: {
      ko: "메뉴 추천받기",
      en: "Get Recommendation",
      zh: "获取推荐",
      ja: "メニューをおすすめ"
    },
    stats: {
      ko: "참여자 수",
      en: "Participants",
      zh: "参与人数",
      ja: "参加者数"
    },
    back: {
      ko: "처음으로",
      en: "Home",
      zh: "返回首页",
      ja: "ホームへ"
    }
  };

  const localizedPageInfo = {
    title: pageInfoData.title[lang] || pageInfoData.title.ko,
    subtitle: pageInfoData.subtitle[lang] || pageInfoData.subtitle.ko,
    description: pageInfoData.description[lang] || pageInfoData.description.ko,
    recommend: pageInfoData.recommend[lang] || pageInfoData.recommend.ko,
    stats: pageInfoData.stats[lang] || pageInfoData.stats.ko,
    back: pageInfoData.back[lang] || pageInfoData.back.ko,
  };

  const generateRecommendation = (timeSlot: TimeSlot | "random") => {
    setSelectedTimeSlot(timeSlot);
    setIsGenerating(true);
    incrementPlayCount("menu-recommendation");
  };

  const handleRouletteComplete = (selectedItem: MenuItem) => {
    // 룰렛 완료 시 호출
    setTimeout(() => {
      setRecommendedMenu(selectedItem);
      setIsGenerating(false);
    }, 500);
  };

  const resetRecommendation = () => {
    setSelectedTimeSlot(null);
    setRecommendedMenu(null);
    setIsGenerating(false);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
              {localizedPageInfo.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {lang === 'ko' ? '메뉴를 고르고 있어요...' : 'Picking a menu...'}
            </p>
          </div>

          <div className="glass rounded-3xl p-4 mb-8 shadow-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/50 dark:border-slate-700">
            <TextRoulette
              items={menuRecommendations}
              onComplete={handleRouletteComplete}
            />
          </div>

          <button
            onClick={() => setIsGenerating(false)}
            className="text-sm text-slate-400 underline hover:text-slate-600"
          >
            {lang === 'ko' ? '취소' : 'Cancel'}
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
        pageInfo={localizedPageInfo}
        stats={stats?.playCount ?? 0}
      />
    );
  }

  return (
    <MenuSelector
      currentTimeSlot={"random"}
      onSelectTimeSlot={generateRecommendation}
      pageInfo={localizedPageInfo}
      stats={stats?.playCount ?? 0}
    />
  );
}
