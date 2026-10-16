"use client";

// 결과 유형별 정적 페이지(/q/[slug]/[type]) 본문
// 서버가 한국어로 렌더링한 HTML 을 검색엔진이 읽고, 클라이언트에서 사용자의 언어로 바뀐다.
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizSummary, QuizResultType } from "@/data/engine/types";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import ResultCard from "./ResultCard";
import { engineTexts } from "./engineTexts";

interface Props {
    quiz: QuizSummary;
    result: QuizResultType;
}

export default function QuizTypeView({ quiz, result }: Props) {
    const { t } = useLanguage();
    const quizPath = `/q/${quiz.slug}`;

    return (
        <main className="min-h-screen p-4 pb-24">
            <div className="max-w-md mx-auto">
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">{t(engineTexts.home)}</Link>
                    <span>›</span>
                    <Link href={quizPath} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors break-keep">{t(quiz.name)}</Link>
                </nav>

                <ResultCard quiz={quiz} result={result} />

                {/* 나도 테스트하기 */}
                <div className="mt-6">
                    <Link
                        href={quizPath}
                        className={`block w-full text-center py-4 rounded-xl bg-gradient-to-r ${quiz.theme.gradient} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
                    >
                        {quiz.emoji} {t(engineTexts.tryMe)}
                    </Link>
                </div>

                {/* 광고: 결과 콘텐츠 바로 아래 */}
                <div className="my-6">
                    <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
                </div>

                {/* 다른 유형 */}
                <section className="glass rounded-2xl p-5">
                    <h2 className="font-bold text-slate-800 dark:text-white mb-3">{t(engineTexts.allTypes)}</h2>
                    <ul className="grid grid-cols-2 gap-2">
                        {quiz.results.map((r) => (
                            <li key={r.id}>
                                <Link
                                    href={`/q/${quiz.slug}/${r.id}`}
                                    aria-current={r.id === result.id ? "page" : undefined}
                                    className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${r.id === result.id
                                        ? "bg-white/70 dark:bg-slate-700/70 font-bold"
                                        : "hover:bg-white/60 dark:hover:bg-slate-700/60"}`}
                                >
                                    <span className="text-2xl">{r.emoji}</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 break-keep">{t(r.title)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <RecommendedTests currentTestId={quiz.id} />
            </div>
        </main>
    );
}
