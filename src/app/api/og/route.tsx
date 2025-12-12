import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic Params
        const title = searchParams.get('title') || 'Check Me Today';
        const description = searchParams.get('desc') || '나를 발견하는 가장 쉬운 방법';
        const score = searchParams.get('score');
        const type = searchParams.get('type');
        const emoji = searchParams.get('emoji') || '✨';

        // Font Loading (Pretendard Bold - Subset or Webfont)
        // Using OTF from JSDelivr for Satori compatibility
        const fontData = await fetch(
            new URL('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/public/static/alternative/Pretendard-Bold.otf')
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fce7f3)',
                        fontFamily: '"Pretendard"',
                    }}
                >
                    {/* Logo / Brand */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 40,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 30,
                                background: 'white',
                                width: 60,
                                height: 60,
                                borderRadius: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 20,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            }}
                        >
                            🚀
                        </div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#334155' }}>
                            Check Me Today
                        </div>
                    </div>

                    {/* Main Card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: 40,
                            padding: '60px 80px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            maxWidth: '80%',
                        }}
                    >
                        {/* Emoji Icon */}
                        <div
                            style={{
                                width: 120,
                                height: 120,
                                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 60,
                                marginBottom: 30,
                                boxShadow: '0 10px 20px rgba(168, 85, 247, 0.4)',
                                color: 'white',
                            }}
                        >
                            {emoji}
                        </div>

                        {/* Title / Type */}
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 900,
                                marginBottom: 20,
                                lineHeight: 1.2,
                                backgroundImage: 'linear-gradient(90deg, #1e293b, #475569)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {type ? `${type}` : title}
                        </div>

                        {/* Description / Score */}
                        <div style={{ fontSize: 32, color: '#64748b', fontWeight: 500 }}>
                            {score ? `나의 점수는 ${score}점!` : description}
                        </div>
                    </div>

                    {/* Footer Call to Action */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            fontSize: 24,
                            color: '#475569',
                            fontWeight: 600,
                        }}
                    >
                        👉 지금 바로 확인해보세요
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Pretendard',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
                // Cache for 1 week (stale-while-revalidate)
                headers: {
                    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=604800',
                },
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
