"use client";

// 카테고리 랜딩 페이지 본문 (/category/[id])
// - 서버 컴포넌트(page.tsx)가 데이터를 넘기고, 여기서 사용자의 언어로 표시한다
// - LanguageProvider 의 초기 언어가 ko 이므로 서버 HTML 에는 한국어 본문이 그대로 담긴다 (검색엔진용)
// - 테스트 카드는 크롤러가 따라갈 수 있도록 실제 <a href>(next/link) 로 만든다
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Category } from "@/data/tests";
import type { CategorySeo } from "@/data/categories";
import Breadcrumb from "@/components/Breadcrumb";
import { HOME_LABEL } from "@/lib/breadcrumb";
import AdUnit from "@/components/AdUnit";

/** 클라이언트로 넘기는 테스트 카드 정보 (tests.ts 전체 대신 필요한 필드만) */
export interface CategoryTestCard {
    id: string;
    href: string;
    name: Record<string, string>;
    description: Record<string, string>;
    emoji: string;
    gradient: string;
    bgGradient: string;
    badge?: "HOT" | "NEW" | null;
}

export interface OtherCategoryLink {
    id: string;
    href: string;
    name: Record<string, string>;
    emoji: string;
    count: number;
}

interface Props {
    category: Category;
    seo: CategorySeo;
    tests: CategoryTestCard[];
    others: OtherCategoryLink[];
}

const texts = {
    testList: { ko: "{c} 테스트 목록", en: "{c} tests", zh: "{c}测试列表", ja: "{c}テスト一覧" },
    countUnit: { ko: "개", en: "", zh: "个", ja: "件" },
    start: { ko: "시작하기", en: "Start", zh: "开始", ja: "始める" },
    faq: { ko: "자주 묻는 질문", en: "FAQ", zh: "常见问题", ja: "よくある質問" },
    otherCategories: { ko: "다른 카테고리 둘러보기", en: "Browse other categories", zh: "浏览其他栏目", ja: "他のカテゴリを見る" },
    allTests: { ko: "전체 테스트 보기", en: "See all tests", zh: "查看全部测试", ja: "すべてのテストを見る" },
    free: { ko: "무료 · 회원가입 없음 · 약 3분", en: "Free · No sign-up · About 3 min", zh: "免费 · 无需注册 · 约3分钟", ja: "無料・登録不要・約3分" },
};

export default function CategoryLanding({ category, seo, tests, others }: Props) {
    const { t } = useLanguage();
    const categoryName = t(category.name);

    return (
        <main className="min-h-screen pb-24 px-4 pt-4">
            <div className="max-w-xl mx-auto">
                {/* 빵부스러기: 홈 > 카테고리. JSON-LD 는 page.tsx 의 @graph 에 포함돼 있으므로 끈다 */}
                <Breadcrumb
                    items={[{ href: "/", label: HOME_LABEL }, { label: category.name }]}
                    withJsonLd={false}
                    className="mb-4"
                />

                {/* 머리말 */}
                <header className="glass-strong rounded-[2rem] p-7 text-center relative overflow-hidden animate-fade-in">
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-400 to-pink-400" />
                    <div className="text-5xl mb-3" role="img" aria-label={categoryName}>{category.emoji}</div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                        {t(seo.heading)}
                    </h1>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 break-keep">
                        {t(seo.description)}
                    </p>
                    <p className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200">
                        {t(texts.free)}
                    </p>
                </header>

                {/* 테스트 목록 */}
                <section className="mt-6" aria-labelledby="category-test-list">
                    <h2 id="category-test-list" className="text-base font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-1.5">
                        <span>{category.emoji}</span>
                        <span>{t(texts.testList).replace("{c}", categoryName)}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                            ({tests.length}{t(texts.countUnit)})
                        </span>
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tests.map((test) => (
                            <li key={test.id}>
                                <Link
                                    href={test.href}
                                    className={`group flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${test.bgGradient} border border-white/40 dark:border-slate-700/60 shadow hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                                >
                                    <span className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${test.gradient} flex items-center justify-center text-2xl shadow`}>
                                        {test.emoji}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="flex items-center gap-1.5">
                                            <span className="font-bold text-sm text-slate-800 dark:text-white break-keep">{t(test.name)}</span>
                                            {test.badge && (
                                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${test.badge === "HOT" ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-green-500 to-emerald-500"}`}>
                                                    {test.badge}
                                                </span>
                                            )}
                                        </span>
                                        <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2 break-keep">
                                            {t(test.description)}
                                        </span>
                                    </span>
                                    <span className="text-xs font-bold text-purple-600 dark:text-purple-300 whitespace-nowrap group-hover:translate-x-0.5 transition-transform">
                                        {t(texts.start)} →
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 소개글 */}
                <article className="mt-6 space-y-4 animate-slide-up">
                    {seo.sections.map((sec, i) => (
                        <section key={i} className="glass rounded-2xl p-5">
                            <h2 className="font-bold text-slate-800 dark:text-white mb-2">{t(sec.heading)}</h2>
                            {t(sec.body).split("\n\n").map((p, j) => (
                                <p key={j} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 break-keep mb-2 last:mb-0">
                                    {p}
                                </p>
                            ))}
                        </section>
                    ))}
                </article>

                {/* 광고: 소개글과 FAQ 사이 한 곳만 */}
                <div className="my-6 flex justify-center">
                    <AdUnit slot="category" format="horizontal" responsive={true} />
                </div>

                {/* FAQ: 접지 않고 전부 노출 (검색엔진·FAQPage 구조화 데이터와 일치) */}
                <section className="glass rounded-2xl p-5" aria-labelledby="category-faq">
                    <h2 id="category-faq" className="font-bold text-slate-800 dark:text-white mb-3">{t(texts.faq)}</h2>
                    <dl className="space-y-4">
                        {seo.faq.map((item, i) => (
                            <div key={i}>
                                <dt className="text-sm font-bold text-slate-700 dark:text-slate-200 break-keep">
                                    Q. {t(item.question)}
                                </dt>
                                <dd className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 break-keep">
                                    {t(item.answer)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                {/* 다른 카테고리 */}
                <nav className="mt-6" aria-labelledby="category-others">
                    <h2 id="category-others" className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">
                        {t(texts.otherCategories)}
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {others.map((o) => (
                            <li key={o.id}>
                                <Link
                                    href={o.href}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold glass dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <span>{o.emoji}</span>
                                    <span>{t(o.name)}</span>
                                    <span className="text-xs text-slate-400">({o.count})</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:shadow-lg transition-shadow"
                            >
                                ✨ {t(texts.allTests)}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    );
}
