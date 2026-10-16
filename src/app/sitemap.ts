import { MetadataRoute } from 'next';
import { tests, getTestPath } from '@/data/tests';

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

    return [...staticPages, ...testPages];
}
