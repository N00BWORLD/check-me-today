"use client";

import { useState, useMemo } from "react";
import { tests, categories, getTestsByCategory, CategoryId } from "@/data/tests";
import CategoryTabs from "@/components/CategoryTabs";
import PosterCard from "@/components/PosterCard";
import SearchBar from "@/components/SearchBar";
import AdUnit from "@/components/AdUnit";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useAllTestStats } from "@/hooks/useTestStats";

export default function Home() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Firebase에서 모든 테스트 통계 가져오기
  const { allStats } = useAllTestStats();

  // 카테고리 + 검색 필터링
  const filteredTests = useMemo(() => {
    let result = getTestsByCategory(selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(test =>
        test.name[lang]?.toLowerCase().includes(query) ||
        test.name.en?.toLowerCase().includes(query) ||
        test.description[lang]?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery, lang]);

  // HOT 테스트 (배지가 HOT인 것들) - 조회수 기준 정렬
  const hotTests = useMemo(() => {
    const hot = tests.filter(t => t.badge === "HOT" && !t.isComingSoon);
    // 실시간 통계로 조회수 기준 정렬
    return hot.sort((a, b) => {
      const aPlays = allStats[a.id]?.playCount ?? a.playCount;
      const bPlays = allStats[b.id]?.playCount ?? b.playCount;
      return bPlays - aPlays; // 내림차순
    });
  }, [allStats]);


  // 오늘의 추천 - 인기 테스트 중 랜덤 또는 가장 인기 있는 것
  const recommendedTest = useMemo(() => {
    const activeTests = tests.filter(t => !t.isComingSoon);
    if (activeTests.length === 0) return null;

    // 통계가 있으면 플레이 수 기준 정렬, 없으면 랜덤
    const testsWithStats = activeTests.map(t => ({
      ...t,
      realPlayCount: allStats[t.id]?.playCount ?? t.playCount
    }));

    // 가장 인기 있는 테스트 반환 (플레이 수 기준)
    testsWithStats.sort((a, b) => b.realPlayCount - a.realPlayCount);
    return testsWithStats[0];
  }, [allStats]);

  // 날짜
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = today.toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US',
    dateOptions
  );

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong dark:bg-slate-900/90 border-b border-white/50 dark:border-slate-800">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-xl">✨</span>
                </div>
              </div>
              <div>
                <h1 className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-tight">
                  Check Me Today
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {dateString}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 pt-4">
        {/* Hero Banner - 오늘의 추천 테스트 */}
        {recommendedTest && (
          <a href={`/${recommendedTest.slug}`} className="block">
            <div className={`relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br ${recommendedTest.bgGradient} p-5 border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative flex items-center gap-4">
                {/* 이모지 아이콘 */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${recommendedTest.gradient} flex items-center justify-center shadow-lg ring-2 ring-white/40`}>
                  <span className="text-3xl">{recommendedTest.emoji}</span>
                </div>

                <div className="flex-1">
                  <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mb-0.5">
                    {lang === 'ko' ? '✨ 오늘의 추천' : lang === 'zh' ? '✨ 今日推荐' : lang === 'ja' ? '✨ 今日のおすすめ' : "✨ Today's Pick"}
                  </p>
                  <h2 className="text-lg font-black text-slate-800 dark:text-white leading-tight mb-1">
                    {recommendedTest.name[lang] || recommendedTest.name.en}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">
                    {recommendedTest.description[lang] || recommendedTest.description.en}
                  </p>
                </div>

                {/* 화살표 */}
                <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 flex items-center justify-center">
                  <span className="text-slate-600 dark:text-slate-300">→</span>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Search */}
        <SearchBar onSearch={setSearchQuery} />

        {/* Category Tabs */}
        <div className="mb-4">
          <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Hot Section (카테고리가 전체일 때만) */}
        {selectedCategory === "all" && !searchQuery && hotTests.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <span className="text-base">🔥</span>
              {lang === 'ko' ? '인기 테스트' : lang === 'zh' ? '热门测试' : lang === 'ja' ? '人気テスト' : 'Popular'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotTests.map(test => (
                <PosterCard key={test.id} test={test} realStats={allStats[test.id]} />
              ))}
            </div>
          </section>
        )}


        {/* All Tests (필터링된 결과) */}
        {(selectedCategory !== "all" || searchQuery) && (
          <section className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              {selectedCategory !== "all" && (
                <span className="text-base">
                  {categories.find(c => c.id === selectedCategory)?.emoji}
                </span>
              )}
              {searchQuery
                ? (lang === 'ko' ? '검색 결과' : lang === 'zh' ? '搜索结果' : lang === 'ja' ? '検索結果' : 'Results')
                : (categories.find(c => c.id === selectedCategory)?.name[lang] || 'Tests')
              }
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal ml-1">
                ({filteredTests.length})
              </span>
            </h3>

            {filteredTests.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTests.map(test => (
                  <PosterCard key={test.id} test={test} realStats={allStats[test.id]} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass dark:bg-slate-800/60 rounded-2xl">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-400 dark:text-slate-500 font-medium">
                  {lang === 'ko' ? '검색 결과가 없습니다' : lang === 'zh' ? '没有找到结果' : lang === 'ja' ? '結果が見つかりません' : 'No results found'}
                </p>
                <p className="text-slate-300 dark:text-slate-600 text-sm mt-1">
                  {lang === 'ko' ? '다른 키워드로 검색해보세요' : lang === 'zh' ? '请尝试其他关键词' : lang === 'ja' ? '他のキーワードで検索してください' : 'Try different keywords'}
                </p>
              </div>
            )}
          </section>
        )}

        {/* All Tests Section (전체 + 검색어 없을 때) */}
        {selectedCategory === "all" && !searchQuery && (
          <section className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <span className="text-base">📋</span>
              {lang === 'ko' ? '모든 테스트' : lang === 'zh' ? '所有测试' : lang === 'ja' ? 'すべてのテスト' : 'All Tests'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tests.map(test => (
                <PosterCard key={test.id} test={test} realStats={allStats[test.id]} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="pb-24 pt-8 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <a href="/privacy" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              {lang === 'ko' ? '개인정보처리방침' : lang === 'zh' ? '隐私政策' : lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              {lang === 'ko' ? '이용약관' : lang === 'zh' ? '服务条款' : lang === 'ja' ? '利用規約' : 'Terms of Service'}
            </a>
          </div>
          <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-2">
            © 2025 Check Me Today. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bottom Ad */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <AdUnit />
      </div>
    </main>
  );
}
