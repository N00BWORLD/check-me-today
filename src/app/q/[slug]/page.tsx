// 엔진 테스트 페이지: /q/[slug]
// src/data/engine/index.ts 의 quizzes[] 에 등록된 데이터 파일 하나로 랜딩 → 질문 → 결과가 모두 만들어진다.
// ?r=유형id 가 붙으면 그 결과를 바로 보여주고, OG 메타데이터도 그 유형 기준으로 만든다 (공유 링크용).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getQuizBySlug, getQuizResultType, quizzes } from "@/data/engine";
import { buildOgImageUrl } from "@/lib/kakao";
import QuizEngine from "@/components/engine/QuizEngine";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ r?: string }>;
}

export async function generateStaticParams() {
    return quizzes.map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { r } = await searchParams;
    const quiz = getQuizBySlug(slug);
    if (!quiz) return { title: "Not Found" };

    const result = r ? getQuizResultType(quiz, r) : undefined;

    // 루트 레이아웃의 title 템플릿("%s | Check Me Today")이 사이트명을 붙인다
    const title = result ? `${result.title.ko} - ${quiz.name.ko}` : quiz.name.ko;
    const description = result ? `${result.subtitle.ko} | ${quiz.description.ko}` : quiz.description.ko;
    const ogImage = buildOgImageUrl({
        title: result ? result.title.ko : quiz.name.ko,
        desc: result ? result.subtitle.ko : quiz.description.ko,
        emoji: result?.emoji ?? quiz.emoji,
    });
    const path = `/q/${slug}`;

    return {
        title,
        description,
        keywords: quiz.keywords,
        // ?r= 변형은 모두 본 페이지로 정규화
        alternates: { canonical: path },
        openGraph: {
            title: `${title} | Check Me Today`,
            description,
            type: "website",
            url: result ? `${path}?r=${result.id}` : path,
            images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function QuizPage({ params }: Props) {
    const { slug } = await params;
    const quiz = getQuizBySlug(slug);
    if (!quiz) notFound();

    return (
        <>
            {/* 검색엔진용 구조화 데이터 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Quiz",
                        name: quiz.name.ko,
                        description: quiz.description.ko,
                        url: `https://check-me.today/q/${quiz.slug}`,
                        inLanguage: "ko",
                        numberOfQuestions: quiz.questions.length,
                        about: quiz.intro.measures.ko,
                    }),
                }}
            />
            {/* useSearchParams 를 쓰는 클라이언트 컴포넌트는 Suspense 로 감싼다 */}
            <Suspense fallback={null}>
                <QuizEngine quiz={quiz} />
            </Suspense>
        </>
    );
}
