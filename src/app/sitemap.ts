import { MetadataRoute } from 'next';
import { tests, getTestPath } from '@/data/tests';
import { quizzes } from '@/data/engine';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://check-me.today';

    // Static pages
    const staticPages = [
        '',
        '/privacy',
        '/terms',
        '/ideas',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // 테스트 페이지 (준비중인 테스트는 제외)
    // 실제 페이지 경로는 getTestPath()가 결정 (게임은 /tests/[slug], 나머지는 /[slug])
    const testPages = tests
        .filter((test) => !test.isComingSoon)
        .map((test) => ({
            url: `${baseUrl}${getTestPath(test)}`,
            lastModified: new Date(test.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    // 엔진 테스트의 결과 유형별 정적 페이지 (/q/[slug]/[type])
    const quizTypePages = quizzes.flatMap((quiz) => {
        const test = tests.find((t) => t.slug === quiz.slug);
        if (test?.isComingSoon) return [];
        return quiz.results.map((result) => ({
            url: `${baseUrl}/q/${quiz.slug}/${result.id}`,
            lastModified: test ? new Date(test.createdAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    });

    return [...staticPages, ...testPages, ...quizTypePages];
}
