// 결과 유형별 정적 페이지: /q/[slug]/[type]
// 유형 설명 전문을 서버에서 렌더링해 검색 색인 면적을 넓히고, "나도 테스트하기" 링크로 테스트에 유입시킨다.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuizBySlug, getQuizResultType, quizzes, toQuizSummary } from "@/data/engine";
import { buildOgImageUrl } from "@/lib/kakao";
import QuizTypeView from "@/components/engine/QuizTypeView";

interface Props {
    params: Promise<{ slug: string; type: string }>;
}

// 등록된 모든 테스트 × 결과 유형을 빌드 시 정적 생성
export async function generateStaticParams() {
    return quizzes.flatMap((quiz) =>
        quiz.results.map((result) => ({ slug: quiz.slug, type: result.id }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, type } = await params;
    const quiz = getQuizBySlug(slug);
    const result = quiz ? getQuizResultType(quiz, type) : undefined;
    if (!quiz || !result) return { title: "Not Found" };

    const title = `${result.title.ko} ${result.emoji} - ${quiz.name.ko}`;
    const description = `${result.subtitle.ko}. ${result.description.ko.replace(/\s+/g, " ").slice(0, 120)}…`;
    const ogImage = buildOgImageUrl({ title: result.title.ko, desc: quiz.name.ko, emoji: result.emoji });
    const path = `/q/${slug}/${type}`;

    return {
        title,
        description,
        keywords: [...(quiz.keywords ?? []), ...(result.keywords ?? [])],
        alternates: { canonical: path },
        openGraph: {
            title: `${title} | Check Me Today`,
            description,
            type: "article",
            url: path,
            images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    };
}

export default async function QuizTypePage({ params }: Props) {
    const { slug, type } = await params;
    const quiz = getQuizBySlug(slug);
    const result = quiz ? getQuizResultType(quiz, type) : undefined;
    if (!quiz || !result) notFound();

    // 질문 데이터는 이 페이지에 필요 없으므로 축약형만 클라이언트로 넘긴다
    return <QuizTypeView quiz={toQuizSummary(quiz)} result={result} />;
}
