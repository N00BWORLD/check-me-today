"use client";

// 결과 유형 카드. 퀴즈 결과 화면과 유형별 정적 페이지(/q/[slug]/[type])가 함께 사용한다.
import Link from "next/link";
import { forwardRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizSummary, QuizResultType } from "@/data/engine/types";
import { engineTexts } from "./engineTexts";
import { ACCENT } from "./accent";

interface Props {
    quiz: QuizSummary;
    result: QuizResultType;
}

const ResultCard = forwardRef<HTMLDivElement, Props>(function ResultCard({ quiz, result }, ref) {
    const { t } = useLanguage();
    const accent = ACCENT[quiz.theme.accent];
    const gradient = result.gradient ?? quiz.theme.gradient;

    const findType = (id: string) => quiz.results.find((r) => r.id === id);

    return (
        <div ref={ref} className="glass-strong rounded-[2rem] overflow-hidden shadow-xl animate-scale-in">
            {/* 헤더 */}
            <div className={`bg-gradient-to-br ${gradient} p-8 text-center text-white`}>
                <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
                <div className="text-xs font-bold tracking-widest opacity-80 mb-1">
                    {t(engineTexts.myType)} · {t(quiz.name)}
                </div>
                <h1 className="text-3xl font-black break-keep">{t(result.title)}</h1>
                <p className="mt-2 text-sm font-medium opacity-90 break-keep">{t(result.subtitle)}</p>
            </div>

            {/* 본문 */}
            <div className="p-6">
                {t(result.description).split("\n\n").map((p, i) => (
                    <p key={i} className="text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed break-keep mb-3 last:mb-0">
                        {p}
                    </p>
                ))}

                {/* 특징 */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mt-6">
                    <h2 className="font-bold text-slate-800 dark:text-white mb-3">{t(engineTexts.features)}</h2>
                    <ul className="space-y-2">
                        {result.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 break-keep">
                                <span className={`mt-0.5 ${accent.text}`}>✔</span>
                                {t(f)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 조언 */}
                {result.advice && (
                    <div className={`${accent.bg} border ${accent.border} border-opacity-40 rounded-xl p-5 mt-4`}>
                        <h2 className={`font-bold mb-2 ${accent.text}`}>💡 {t(engineTexts.advice)}</h2>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-keep">{t(result.advice)}</p>
                    </div>
                )}

                {/* 궁합 */}
                {(result.matches?.length || result.mismatches?.length) ? (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <MatchList
                            heading={`👍 ${t(engineTexts.goodMatch)}`}
                            ids={result.matches ?? []}
                            slug={quiz.slug}
                            findType={findType}
                            t={t}
                        />
                        <MatchList
                            heading={`⚡ ${t(engineTexts.badMatch)}`}
                            ids={result.mismatches ?? []}
                            slug={quiz.slug}
                            findType={findType}
                            t={t}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
});

export default ResultCard;

function MatchList({
    heading,
    ids,
    slug,
    findType,
    t,
}: {
    heading: string;
    ids: string[];
    slug: string;
    findType: (id: string) => QuizSummary["results"][number] | undefined;
    t: (x: Record<string, string>) => string;
}) {
    if (ids.length === 0) return <div />;
    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{heading}</h3>
            <ul className="space-y-1">
                {ids.map((id) => {
                    const type = findType(id);
                    if (!type) return null;
                    return (
                        <li key={id}>
                            <Link
                                href={`/q/${slug}/${id}`}
                                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline break-keep"
                            >
                                <span>{type.emoji}</span>
                                <span>{t(type.title)}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
