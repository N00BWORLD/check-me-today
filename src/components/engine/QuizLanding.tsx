"use client";

// 랜딩 화면: 소개 섹션(검색엔진이 읽는 본문) + 시작 버튼
// LanguageProvider 의 초기 언어가 ko 이므로 서버 HTML 에는 한국어 본문이 담기고, 클라이언트에서 사용자의 언어로 바뀐다.
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizDefinition } from "@/data/engine/types";
import { estimateMinutes } from "@/data/engine/scoring";
import { engineTexts, fill } from "./engineTexts";
import { ACCENT } from "./accent";

interface Props {
    quiz: QuizDefinition;
    onStart: () => void;
}

export default function QuizLanding({ quiz, onStart }: Props) {
    const { t } = useLanguage();
    const accent = ACCENT[quiz.theme.accent];
    const minutes = estimateMinutes(quiz);

    const stats = [
        fill(t(engineTexts.questions), quiz.questions.length),
        fill(t(engineTexts.minutes), minutes),
        fill(t(engineTexts.typesCount), quiz.results.length),
    ];

    return (
        <main className="min-h-screen p-4 pb-24">
            <div className="w-full max-w-md mx-auto">
                <Link href="/" className="inline-block text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-3 transition-colors">
                    ← {t(engineTexts.home)}
                </Link>

                {/* 히어로 카드 */}
                <section className="glass-strong rounded-[2rem] p-8 text-center relative overflow-hidden animate-fade-in">
                    <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${quiz.theme.gradient}`} />
                    <div className="text-6xl mb-5 animate-bounce">{quiz.emoji}</div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2 break-keep">
                        {t(quiz.name)}
                    </h1>
                    <p className={`text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${quiz.theme.gradient} mb-5 break-keep`}>
                        {t(quiz.description)}
                    </p>

                    <ul className="flex flex-wrap justify-center gap-2 mb-7" aria-label="test info">
                        {stats.map((s) => (
                            <li key={s} className={`px-3 py-1 rounded-full text-xs font-bold ${accent.badge}`}>
                                {s}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={onStart}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${quiz.theme.gradient} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
                    >
                        {t(engineTexts.start)}
                    </button>
                </section>

                {/* 소개 섹션 (SEO 본문) */}
                <article className="mt-6 space-y-4 animate-slide-up">
                    <IntroSection heading={t(engineTexts.measures)} body={t(quiz.intro.measures)} />
                    <IntroSection heading={t(engineTexts.background)} body={t(quiz.intro.background)} />
                    {quiz.intro.extra?.map((sec, i) => (
                        <IntroSection key={i} heading={t(sec.heading)} body={t(sec.body)} />
                    ))}

                    {/* 결과 유형 미리보기 → 유형별 정적 페이지로 링크 */}
                    <section className="glass rounded-2xl p-5">
                        <h2 className="font-bold text-slate-800 dark:text-white mb-3">{t(engineTexts.resultTypes)}</h2>
                        <ul className="grid grid-cols-2 gap-2">
                            {quiz.results.map((r) => (
                                <li key={r.id}>
                                    <Link
                                        href={`/q/${quiz.slug}/${r.id}`}
                                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
                                    >
                                        <span className="text-2xl">{r.emoji}</span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 break-keep">{t(r.title)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>

                <div className="mt-6">
                    <button
                        onClick={onStart}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${quiz.theme.gradient} text-white font-bold text-lg shadow-lg active:scale-[0.98] transition-all`}
                    >
                        {quiz.emoji} {t(engineTexts.start)}
                    </button>
                </div>
            </div>
        </main>
    );
}

function IntroSection({ heading, body }: { heading: string; body: string }) {
    return (
        <section className="glass rounded-2xl p-5">
            <h2 className="font-bold text-slate-800 dark:text-white mb-2">{heading}</h2>
            {body.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 break-keep mb-2 last:mb-0">
                    {p}
                </p>
            ))}
        </section>
    );
}
