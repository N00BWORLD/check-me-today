"use client";

import { useState } from "react";
import { timeSlots, type TimeSlot, type MenuItem } from "@/data/menu-recommendation";
import html2canvas from "html2canvas";

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
                            <div className="flex items-center gap-1">
                                <span>🏷️</span>
                                <span>{menu.tags.join(', ')}</span>
                            </div>
                        </div>

                        {/* 브랜드 워터마크 */}
                        <div className="mt-8 text-slate-400 dark:text-slate-500 text-sm">
                            ✨ check-me.today
                        </div>
                    </div>

                    {/* 공유 버튼 */}
                    <div className="mb-6">
                        <button
                            onClick={handleNativeShare}
                            className="w-full py-3 mb-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            공유하기 🎉
                        </button>

                        <div className="grid grid-cols-4 gap-2">
                            <button
                                onClick={handleSaveImage}
                                className="py-3 px-2 glass rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="text-xl mb-1">📷</div>
                                <div className="text-xs">이미지 저장</div>
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="py-3 px-2 glass rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="text-xl mb-1">{copied ? "✅" : "🔗"}</div>
                                <div className="text-xs">{copied ? "복사됨!" : "링크 복사"}</div>
                            </button>
                            <button
                                onClick={handleTwitterShare}
                                className="py-3 px-2 glass rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="text-xl mb-1">𝕏</div>
                                <div className="text-xs">Twitter</div>
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="py-3 px-2 glass rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="text-xl mb-1">💬</div>
                                <div className="text-xs">카카오톡</div>
                            </button>
                        </div>
                    </div>

                    {/* 다시하기 버튼 */}
                    <div className="text-center mb-6">
                        <button
                            onClick={onReset}
                            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors"
                        >
                            🔄 다른 메뉴 추천받기
                        </button>
                    </div>

                    {/* 통계 */}
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-center gap-1">
                            <span>{pageInfo.stats}:</span>
                            <span className="font-bold">{stats.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}