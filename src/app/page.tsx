"use client";

import { useState, useMemo } from "react";
import { tests, categories, getTestsByCategory, CategoryId } from "@/data/tests";
import CategoryTabs from "@/components/CategoryTabs";
import TestCard from "@/components/TestCard";
import SearchBar from "@/components/SearchBar";
import AdUnit from "@/components/AdUnit";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage, uiTexts } from "@/context/LanguageContext";

export default function Home() {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // HOT 테스트 (배지가 HOT인 것들)
  const hotTests = tests.filter(t => t.badge === "HOT" && !t.isComingSoon);
  
  // NEW 테스트
  const newTests = tests.filter(t => t.badge === "NEW");

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
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-5 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <p className="text-white/80 text-xs font-semibold mb-1">
              {lang === 'ko' ? '오늘의 추천' : lang === 'zh' ? '今日推荐' : lang === 'ja' ? '今日のおすすめ' : "Today's Pick"}
            </p>
            <h2 className="text-xl font-black mb-2 leading-tight">
              {lang === 'ko' ? '심리 테스트로' : lang === 'zh' ? '通过心理测试' : lang === 'ja' ? '心理テストで' : 'Discover'}
              <br />
              {lang === 'ko' ? '진짜 나를 발견해봐! 🔮' : lang === 'zh' ? '发现真正的自己！🔮' : lang === 'ja' ? '本当の自分を見つけよう！🔮' : 'the real you! 🔮'}
            </h2>
            <p className="text-white/70 text-xs">
              {lang === 'ko' ? `${tests.filter(t => !t.isComingSoon).length}개 테스트 · 4개 언어 지원` 
                : lang === 'zh' ? `${tests.filter(t => !t.isComingSoon).length}个测试 · 支持4种语言`
                : lang === 'ja' ? `${tests.filter(t => !t.isComingSoon).length}個のテスト · 4言語対応`
                : `${tests.filter(t => !t.isComingSoon).length} tests · 4 languages`}
            </p>
          </div>
        </div>

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
            <div className="space-y-3">
              {hotTests.map(test => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </section>
        )}

        {/* New Section (카테고리가 전체일 때만) */}
        {selectedCategory === "all" && !searchQuery && newTests.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <span className="text-base">🆕</span>
              {lang === 'ko' ? '곧 출시' : lang === 'zh' ? '即将上线' : lang === 'ja' ? 'まもなく登場' : 'Coming Soon'}
            </h3>
            <div className="space-y-3">
              {newTests.slice(0, 3).map(test => (
                <TestCard key={test.id} test={test} />
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
              <div className="space-y-3">
                {filteredTests.map(test => (
                  <TestCard key={test.id} test={test} />
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
            <div className="space-y-3">
              {tests.map(test => (
                <TestCard key={test.id} test={test} />
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
            © 2024 Check Me Today. All rights reserved.
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
