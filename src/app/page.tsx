"use client";

import { useState, useMemo } from "react";
import { tests, categories, getTestsByCategory, getTestPath, getCategoryPath, hasCategoryLanding, CategoryId } from "@/data/tests";
import Link from "next/link";
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

  // 인기 테스트: Firebase 실제 조회수 기준 상위 4개 (배지와 무관)
  // 통계가 아직 안 왔으면 빈 목록 → 섹션 숨김 (잘못된 순서가 잠깐 보이는 것 방지)
  const statsLoaded = Object.keys(allStats).length > 0;
  const plays = (t: typeof tests[number]) => allStats[t.id]?.playCount ?? 0;
  const rankedTests = useMemo(() => {
    if (!statsLoaded) return [];
    return tests
      .filter(t => !t.isComingSoon && plays(t) > 0)
      .sort((a, b) => plays(b) - plays(a));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStats, statsLoaded]);
  const hotTests = rankedTests.slice(0, 4);

  // HOT 배지는 하드코딩이 아니라 실제 조회수 상위 3개에 동적으로 붙인다
  const hotIds = useMemo(() => new Set(rankedTests.slice(0, 3).map(t => t.id)), [rankedTests]);
  const withBadge = (t: typeof tests[number]) =>
    hotIds.has(t.id) ? { ...t, badge: "HOT" as const } : t;


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
                  <span className="text-xl" role="img" aria-label="Logo">✨</span>
                </div>
              </div>
              <div>
                <h1 className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-tight flex flex-col">
                  <span>Check Me Today</span>
                  <span className="sr-only"> - 무료 성격 유형 테스트, 심리 테스트, 운세 모음</span>
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
        {/* Hero Banner - 오늘의 추천 테스트 */}
        {recommendedTest && (
          <a href={getTestPath(recommendedTest)} className="block">
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
                <PosterCard key={test.id} test={withBadge(test)} realStats={allStats[test.id]} />
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
              {/* 카테고리 랜딩 페이지(/category/[id])로 가는 링크 */}
              {!searchQuery && hasCategoryLanding(selectedCategory) && (
                <Link
                  href={getCategoryPath(selectedCategory)}
                  className="ml-auto text-xs font-semibold text-purple-500 dark:text-purple-400 hover:underline"
                >
                  {lang === 'ko' ? '모음 페이지 보기 →' : lang === 'zh' ? '查看合集页 →' : lang === 'ja' ? 'まとめページへ →' : 'View collection →'}
                </Link>
              )}
            </h3>

            {filteredTests.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTests.map(test => (
                  <PosterCard key={test.id} test={withBadge(test)} realStats={allStats[test.id]} />
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
                <PosterCard key={test.id} test={withBadge(test)} realStats={allStats[test.id]} />
              ))}
            </div>
          </section>
        )}

        {/* Revenue Recovery: AdSense Unit */}
        <div className="py-6 flex justify-center">
          <AdUnit slot="home" format="horizontal" responsive={true} />
        </div>
      </div>

      {/* Footer */}
      <footer className="pb-24 pt-8 px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* 카테고리 랜딩 페이지 링크 목록 (검색엔진 내부 링크) */}
          <nav aria-label="Categories" className="mb-4">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2">
              {lang === 'ko' ? '카테고리별 테스트 모음' : lang === 'zh' ? '按栏目查看测试' : lang === 'ja' ? 'カテゴリ別テストまとめ' : 'Tests by category'}
            </p>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-slate-400 dark:text-slate-500">
              {categories.filter(c => hasCategoryLanding(c.id)).map(c => (
                <li key={c.id}>
                  <Link href={getCategoryPath(c.id)} className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    {c.emoji} {c.name[lang] || c.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <a href="/privacy" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              {lang === 'ko' ? '개인정보처리방침' : lang === 'zh' ? '隐私政策' : lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              {lang === 'ko' ? '이용약관' : lang === 'zh' ? '服务条款' : lang === 'ja' ? '利用規約' : 'Terms of Service'}
            </a>
            <span>•</span>
            <a href="/ideas" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              {lang === 'ko' ? '💡 아이디어 제안' : lang === 'zh' ? '💡 创意建议' : lang === 'ja' ? '💡 アイデア提案' : '💡 Suggest an Idea'}
            </a>
          </div>
          <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-2">
            © 2025 Check Me Today. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
