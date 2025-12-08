import { MetadataRoute } from 'next';
import { tests } from '@/data/tests';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://check-me.today';

    // Static pages
    const staticPages = [
        '',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // Dynamic Test pages
    // We include both the old paths (if we keep them) and new paths
    const testPages = tests.map((test) => ({
        url: `${baseUrl}/tests/${test.slug}`,
        lastModified: new Date(test.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Legacy paths (if needed, otherwise we count on redirects or just index the new ones)
    // For now, let's index the new structure primarily.

    return [...staticPages, ...testPages];
}
