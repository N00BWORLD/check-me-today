import { MetadataRoute } from 'next';
import { tests, getTestPath } from '@/data/tests';
import { quizzes } from '@/data/engine';
import { getLandingCategories, getCategoryPath } from '@/data/categories';
import { faceReadingResults } from '@/data/face-reading';
import {
    faceGuideParts,
    FACE_EN_PATH,
    FACE_GUIDE_PATH,
    FACE_GUIDE_PUBLISHED,
    getFaceGuidePath,
    getFaceTypePath,
} from '@/data/face-reading-guide';

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

    // 카테고리 랜딩 페이지 (/category/[id]) — 테스트가 있는 카테고리만 자동 포함
    const categoryPages = getLandingCategories().map(({ category, tests: catTests }) => ({
        url: `${baseUrl}${getCategoryPath(category.id)}`,
        lastModified: new Date(Math.max(...catTests.map((t) => new Date(t.createdAt).getTime()))),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
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

    // 관상 콘텐츠 클러스터: 허브(0.9) → 부위별 가이드·영어 진입 페이지(0.8) → 유형 30종(0.6)
    const faceGuideDate = new Date(FACE_GUIDE_PUBLISHED);
    const faceHubPage = {
        url: `${baseUrl}${FACE_GUIDE_PATH}`,
        lastModified: faceGuideDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    };
    const faceGuidePages = faceGuideParts.map((part) => ({
        url: `${baseUrl}${getFaceGuidePath(part.id)}`,
        lastModified: faceGuideDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));
    const faceEnPage = {
        url: `${baseUrl}${FACE_EN_PATH}`,
        lastModified: faceGuideDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    };
    const faceTypePages = faceReadingResults.map((result) => ({
        url: `${baseUrl}${getFaceTypePath(result.id)}`,
        lastModified: faceGuideDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        ...staticPages,
        ...categoryPages,
        ...testPages,
        ...quizTypePages,
        faceHubPage,
        ...faceGuidePages,
        faceEnPage,
        ...faceTypePages,
    ];
}
