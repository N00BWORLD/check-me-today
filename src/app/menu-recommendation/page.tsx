"use client";

// 오늘의 메뉴추천: 종류 선택 → 룰렛 → 결과
// 메뉴 풀은 언어(문화권)별로 다르다 (src/data/menu-recommendation.ts)
import { useCallback, useMemo, useState } from "react";
import {
  getMenuPool,
  getMenuItems,
  getMenuCategory,
  menuText,
  type MenuItem,
} from "@/data/menu-recommendation";
import MenuResult from "./_components/MenuResult";
import MenuSelector from "./_components/MenuSelector";
import TextRoulette from "./_components/TextRoulette";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import { incrementPlayCount } from "@/lib/firebase";

type Stage = "select" | "spinning" | "result";

export default function MenuRecommendationPage() {
  const { lang } = useLanguage();
  const { stats } = useTestStats("menu-recommendation");

  const [stage, setStage] = useState<Stage>("select");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [spinKey, setSpinKey] = useState(0); // 같은 카테고리로 다시 돌릴 때 룰렛 재마운트용

  const pool = useMemo(() => getMenuPool(lang), [lang]);
  const items = useMemo(
    () => (categoryId ? getMenuItems(pool, categoryId) : []),
    [pool, categoryId]
  );
  const category = categoryId ? getMenuCategory(pool, categoryId) ?? null : null;

  // 1단계 → 룰렛
  const handleSelectCategory = (id: string) => {
    setCategoryId(id);
    setMenu(null);
    setSpinKey((k) => k + 1);
    setStage("spinning");
    incrementPlayCount("menu-recommendation");
  };

  // 룰렛 완료 → 결과
  const handleRouletteComplete = useCallback((picked: MenuItem) => {
    setTimeout(() => {
      setMenu(picked);
      setStage("result");
    }, 500);
  }, []);

  const spinAgain = () => {
    setMenu(null);
    setSpinKey((k) => k + 1);
    setStage("spinning");
  };

  const changeCategory = () => {
    setCategoryId(null);
    setMenu(null);
    setStage("select");
  };

  if (stage === "spinning" && items.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              <span>{category?.emoji ?? "🎲"}</span>
              <span>{category?.label ?? menuText("random", lang)}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
              {menuText("title", lang)}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{menuText("spinning", lang)}</p>
          </div>

          <div className="glass rounded-3xl p-4 mb-8 shadow-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/50 dark:border-slate-700">
            <TextRoulette key={spinKey} items={items} onComplete={handleRouletteComplete} />
          </div>

          <button
            onClick={changeCategory}
            className="text-sm text-slate-400 underline hover:text-slate-600"
          >
            {menuText("cancel", lang)}
          </button>
        </div>
      </div>
    );
  }

  if (stage === "result" && menu && categoryId) {
    return (
      <MenuResult
        menu={menu}
        category={category}
        pool={pool}
        onSpinAgain={spinAgain}
        onChangeCategory={changeCategory}
      />
    );
  }

  return <MenuSelector onSelectCategory={handleSelectCategory} stats={stats?.playCount ?? 0} />;
}
