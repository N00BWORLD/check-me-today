import { Metadata } from 'next';
import { getTestBySlug, tests } from '@/data/tests';
import { notFound } from 'next/navigation';
import ReactionGame from '@/components/ReactionGame';
import AdUnit from '@/components/AdUnit';

// Force dynamic rendering to ensure search params and randomness work if needed
export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const test = getTestBySlug(slug);

    if (!test) {
        return {
            title: 'Not Found',
        };
    }

    // Default to English if language detection isn't available server-side in this context easily
    // In a real app, we might use middleware for lang, but here we set defaults
    const title = test.name['ko'] || test.name['en'];
    const desc = test.description['ko'] || test.description['en'];

    return {
        title: `${title} | Check Me Today`,
        description: desc,
        openGraph: {
            title: `${title} | Check Me Today`,
            description: desc,
            type: 'website',
            images: [`/og/${slug}.png`], // Placeholder for dynamic OG generation later
        },
        keywords: test.keywords || [],
    };
}

// Generate static params for known tests to speed up build/serving
export async function generateStaticParams() {
    return tests.map((test) => ({
        slug: test.slug,
    }));
}

export default async function TestPage({ params }: Props) {
    const { slug } = await params;
    const test = getTestBySlug(slug);

    if (!test) {
        notFound();
    }

    // Render Strategy based on type
    // For 'test' type (legacy hardcoded), we might redirect or render a placeholder if we haven't migrated logic yet.
    // BUT, for the *new* dynamic structure, we want to render the content here.
    // Since we haven't migrated the complex logic of 'animal-test' etc. to a generous 'GenericQuiz' component yet,
    // we will handle the "Game" type here specifically, and maybe redirect old tests or render them if we create a generic component.

    // Improvement: In the future, we should have a <GenericTestRunner test={test} /> component.
    // For now, if it's a specific simple game like 'reaction-test', we render it.

    const isGame = test.type === 'game';

    return (
        <main className="min-h-screen pb-20 pt-4 px-4 max-w-xl mx-auto">
            {/* Top Ad */}
            <div className="w-full flex justify-center mb-6">
                <AdUnit slotId="1234567890" className="w-[320px] h-[50px] bg-slate-100 dark:bg-slate-800 rounded-lg" />
            </div>

            {/* Header Info */}
            <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-4xl shadow-lg mb-4">
                    {test.emoji}
                </div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                    {/* Client component for language switching would be ideal here, but for SEO server render we use Ko/En default */}
                    {/* We will let the client hydration handle the exact language via a client wrapper if needed, 
               but for now simple server rendering is good for SEO */}
                    {test.name['ko']}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    {test.description['ko']}
                </p>
            </div>

            {/* Content Area */}
            <div className="mb-8">
                {isGame && test.id === 'reaction-test' ? (
                    <ReactionGame />
                ) : (
                    <div className="p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center">
                        <p className="text-lg font-bold mb-2">테스트를 불러오는 중...</p>
                        <p className="text-sm opacity-60">
                            (이 테스트는 아직 구형 페이지에 있습니다. <br />
                            <a href={`/${test.slug}`} className="text-blue-500 underline">여기</a>를 클릭하여 이동하세요.)
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom Ad */}
            <div className="w-full flex justify-center mt-6">
                <AdUnit slotId="0987654321" className="w-[300px] h-[250px] bg-slate-100 dark:bg-slate-800 rounded-lg" />
            </div>
        </main>
    );
}
