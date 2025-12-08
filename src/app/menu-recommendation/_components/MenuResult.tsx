"use client";

import { useMemo, useState } from "react";
import { timeSlots, type TimeSlot, type MenuItem, menuRecommendations } from "@/data/menu-recommendation";
import { getActiveTests } from "@/data/tests";
import TestCard from "@/components/TestCard";
import html2canvas from "html2canvas";
import ResultActions from "@/components/ResultActions";
import { useLike, useTestStats } from "@/hooks/useTestStats";

interface MenuResultProps {
    menu: MenuItem;
    timeSlot: TimeSlot;
    onReset: () => void;
    pageInfo: any;
    stats: any;
}

export default function MenuResult({
    menu,
    timeSlot,
    onReset,
    pageInfo,
    stats
}: MenuResultProps) {
    const [copied, setCopied] = useState(false);
    const { hasLiked, toggleLike, isLiking } = useLike("menu-recommendation");
    const { stats: likeStats } = useTestStats("menu-recommendation");

    // 추가 추천 메뉴 (동일 시간대에서 랜덤 3개, 랜덤 선택 시 전체에서 3개)
    const suggestedMenus = useMemo(() => {
        const pool = menuRecommendations.filter((m) => {
            if (m.id === menu.id) return false;
            if (timeSlot === 'random') return m.category !== 'dessert'; // 랜덤이면 디저트 제외하고 전체
            return m.category === timeSlot;
        });
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const picks = shuffled.slice(0, 3);
        // 부족하면 전체에서 채우기
        if (picks.length < 3) {
            const fillPool = menuRecommendations.filter((m) => m.id !== menu.id);
            const fill = [...fillPool].sort(() => Math.random() - 0.5).slice(0, 3 - picks.length);
            return [...picks, ...fill];
        }
        return picks;
    }, [menu.id, timeSlot]);

    // 이미지 저장 함수
    const handleSaveImage = async () => {
        const isDark = document.documentElement.classList.contains('dark');
        const bgColor = isDark ? '#1e293b' : '#fafafa';

        // 캡처용 div 동적 생성
        const captureDiv = document.createElement('div');
        captureDiv.style.cssText = `
            position: fixed; left: -9999px; top: 0;
            width: 400px; padding: 40px;
            background: linear-gradient(135deg, ${isDark ? '#0f172a' : '#fff7ed'} 0%, ${bgColor} 100%);
            font-family: system-ui, -apple-system, sans-serif;
        `;

        const timeSlotDisplay = timeSlot === 'random'
            ? '랜덤 추천'
            : timeSlots[timeSlot].name.ko;

        captureDiv.innerHTML = `
            <div style="text-align: center; color: ${isDark ? '#f1f5f9' : '#1e293b'}">
                <div style="font-size: 24px; margin-bottom: 16px;">🍽️ 오늘의 메뉴추천</div>
                <div style="font-size: 18px; margin-bottom: 8px;">${timeSlots[timeSlot].emoji} ${timeSlotDisplay}</div>
                <div style="font-size: 32px; margin: 20px 0; font-weight: bold;">${menu.emoji} ${menu.name.ko}</div>
                <div style="font-size: 14px; margin-bottom: 16px; line-height: 1.5;">${menu.description.ko}</div>
                <div style="font-size: 12px; color: ${isDark ? '#94a3b8' : '#64748b'}; margin-top: 20px;">✨ check-me.today</div>
            </div>
        `;
        document.body.appendChild(captureDiv);

        try {
            const canvas = await html2canvas(captureDiv, {
                scale: 3,
                backgroundColor: bgColor,
                useCORS: true,
            });

            const link = document.createElement('a');
            const today = new Date().toISOString().split('T')[0];
            link.download = `menu-${today}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (error) {
            console.error('이미지 저장 실패:', error);
        } finally {
            document.body.removeChild(captureDiv);
        }
    };

    // 링크 복사 함수
    const handleCopyLink = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 트위터 공유 함수
    const handleTwitterShare = () => {
        const timeSlotDisplay = timeSlot === 'random'
            ? '랜덤 추천'
            : `${timeSlots[timeSlot].name.ko}시간`;

        const url = window.location.href;
        const text = `🍽️ 오늘 ${timeSlotDisplay}에는 "${menu.name.ko}" 어떠세요?`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    // 네이티브 공유 함수
    const handleNativeShare = async () => {
        const timeSlotDisplay = timeSlot === 'random'
            ? '랜덤 추천'
            : `${timeSlots[timeSlot].name.ko}시간`;

        const shareData = {
            title: '오늘의 메뉴추천',
            text: `🍽️ 오늘 ${timeSlotDisplay}에는 "${menu.name.ko}" 어떠세요?`,
            url: window.location.href,
        };

        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await handleCopyLink();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* 헤더 */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            🍽️ {pageInfo.title}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300">
                            🍽️ 오늘의 메뉴 추천 결과
                        </p>
                    </div>

                    {/* 결과 카드 */}
                    <div id="result-card" className="glass rounded-2xl p-8 mb-6 text-center">
                        {/* 시간대 표시 */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                            {timeSlot === 'random' ? (
                                <>
                                    <span className="text-2xl">🎲</span>
                                    <span className="font-bold">랜덤 추천 메뉴</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl">{timeSlots[timeSlot].emoji}</span>
                                    <span className="font-bold">{timeSlots[timeSlot].name.ko} 메뉴</span>
                                </>
                            )}
                        </div>

                        {/* 메뉴 추천 */}
                        <div className="mb-6">
                            <div className="text-6xl mb-4">{menu.emoji}</div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {menu.name.ko}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {menu.description.ko}
                            </p>
                        </div>

                        {/* 메뉴 정보 */}
                        <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                            {menu.calories && (
                                <div className="flex items-center gap-1">
                                    <span>🔥</span>
                                    <span>{menu.calories}kcal</span>
                                </div>
                            )}
                        </div>

                        {/* 추가 추천 카드 */}
                        {suggestedMenus.length > 0 && (
                            <div className="mt-8 text-left">
                                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                    이런 메뉴도 어때요?
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {suggestedMenus.map((item) => (
                                        <div key={item.id} className="glass rounded-xl p-3 flex flex-col gap-2">
                                            <div className="text-2xl">{item.emoji}</div>
                                            <div className="font-bold text-sm">{item.name.ko}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                                {item.description.ko}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 브랜드 워터마크 */}
                        <div className="mt-8 text-slate-400 dark:text-slate-500 text-sm">
                            ✨ check-me.today
                        </div>
                    </div>

                    {/* Actions using Standardized Component */}
                    <ResultActions
                        hasLiked={hasLiked}
                        isLiking={isLiking}
                        likeCount={likeStats?.likeCount || 0}
                        onToggleLike={toggleLike}
                        onSaveImage={handleSaveImage}
                        onCopyLink={handleCopyLink}
                        onNativeShare={handleNativeShare}
                        onTwitterShare={handleTwitterShare}
                        onKakaoShare={handleCopyLink}
                        retakeLink="/"
                        excludeTestId="menu-recommendation"
                    />
                </div>
            </div>
        </div>
    );
}