"use client";

// 메뉴 추천 3단계: 결과 화면
// - 뽑힌 메뉴 + 같은 종류의 다른 메뉴 3개 + 공유/추천 버튼
// - 문구는 사용자의 언어, 메뉴 이름은 해당 언어 풀의 단일 문자열
import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
    getMenuItems,
    getCurrentMealTime,
    mealTimeLabels,
    menuText,
    RANDOM_CATEGORY_ID,
    type MenuCategory,
    type MenuItem,
    type MenuLang,
    type MenuPool,
} from "@/data/menu-recommendation";
import { useLike, useTestStats } from "@/hooks/useTestStats";
import ResultActions from "@/components/ResultActions";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";

interface MenuResultProps {
    menu: MenuItem;
    /** null 이면 "아무거나" */
    category: MenuCategory | null;
    pool: MenuPool;
    onSpinAgain: () => void;
    onChangeCategory: () => void;
}

export default function MenuResult({ menu, category, pool, onSpinAgain, onChangeCategory }: MenuResultProps) {
    const { lang } = useLanguage();
    const [, setCopied] = useState(false);
    const { hasLiked, toggleLike, isLiking } = useLike("menu-recommendation");
    const { stats: likeStats } = useTestStats("menu-recommendation");

    const mealTime = getCurrentMealTime();
    const timeLabel = mealTimeLabels[mealTime][lang as MenuLang] ?? mealTimeLabels[mealTime].en;
    const categoryLabel = category?.label ?? menuText("random", lang);
    const categoryEmoji = category?.emoji ?? "🎲";

    // 같은 종류에서 3개 더 추천 (부족하면 전체에서 채움)
    const suggestedMenus = useMemo(() => {
        const sameCategory = getMenuItems(pool, category?.id ?? RANDOM_CATEGORY_ID).filter((m) => m.id !== menu.id);
        const picks = [...sameCategory].sort(() => Math.random() - 0.5).slice(0, 3);
        if (picks.length < 3) {
            const fill = pool.items
                .filter((m) => m.id !== menu.id && !picks.includes(m))
                .sort(() => Math.random() - 0.5)
                .slice(0, 3 - picks.length);
            return [...picks, ...fill];
        }
        return picks;
    }, [pool, category, menu.id]);

    const shareTitle = menuText("shareTitle", lang, { time: timeLabel, menu: menu.name });
    const shareDesc = menuText("shareDesc", lang);

    // 이미지 저장 (캡처용 div 를 만들어 html2canvas 로 찍는다)
    const handleSaveImage = async () => {
        const isDark = document.documentElement.classList.contains("dark");
        const bgColor = isDark ? "#1e293b" : "#fafafa";
        const captureDiv = document.createElement("div");
        captureDiv.style.cssText = `
            position: fixed; left: -9999px; top: 0;
            width: 400px; padding: 40px;
            background: linear-gradient(135deg, ${isDark ? "#0f172a" : "#fff7ed"} 0%, ${bgColor} 100%);
            font-family: system-ui, -apple-system, sans-serif;
        `;
        captureDiv.innerHTML = `
            <div style="text-align: center; color: ${isDark ? "#f1f5f9" : "#1e293b"}">
                <div style="font-size: 24px; margin-bottom: 16px;">🍽️ ${menuText("title", lang)}</div>
                <div style="font-size: 18px; margin-bottom: 8px;">${categoryEmoji} ${categoryLabel}</div>
                <div style="font-size: 32px; margin: 20px 0; font-weight: bold;">${menu.emoji} ${menu.name}</div>
                <div style="font-size: 14px; margin-bottom: 16px; line-height: 1.5;">${menu.description}</div>
                <div style="font-size: 12px; color: ${isDark ? "#94a3b8" : "#64748b"}; margin-top: 20px;">✨ check-me.today</div>
            </div>
        `;
        document.body.appendChild(captureDiv);
        try {
            const html2canvas = (await import("html2canvas")).default;
            const canvas = await html2canvas(captureDiv, { scale: 3, backgroundColor: bgColor, useCORS: true });
            const link = document.createElement("a");
            link.download = `menu-${new Date().toISOString().split("T")[0]}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        } catch (error) {
            console.error("이미지 저장 실패:", error);
        } finally {
            document.body.removeChild(captureDiv);
        }
    };

    const handleCopyLink = async () => {
        if (!(await copyToClipboard(window.location.href))) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🍽️ ${shareTitle}`)}&url=${encodeURIComponent(window.location.href)}`,
            "_blank"
        );
    };

    // 카카오톡 피드 공유. SDK/키가 없으면 링크 복사로 폴백
    const handleKakaoShare = () => {
        const sent = shareKakaoFeed({
            title: shareTitle,
            description: shareDesc,
            emoji: menu.emoji || "🍽️",
            buttonTitle: lang === "ko" ? "메뉴 보기" : "View menu",
        });
        if (!sent) void handleCopyLink();
    };

    const handleNativeShare = async () => {
        if (!navigator.share) return handleCopyLink();
        try {
            await navigator.share({ title: menuText("title", lang), text: `🍽️ ${shareTitle}`, url: window.location.href });
        } catch {
            // 공유 시트를 닫은 경우 등 → 무시
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-24">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* 헤더 */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            🍽️ {menuText("title", lang)}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300">{menuText("resultHeader", lang)}</p>
                    </div>

                    {/* 결과 카드 */}
                    <div id="result-card" className="glass rounded-2xl p-8 mb-6 text-center animate-scale-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                            <span className="text-2xl">{categoryEmoji}</span>
                            <span className="font-bold text-slate-700 dark:text-slate-100">{categoryLabel}</span>
                        </div>

                        <div className="mb-6">
                            <div className="text-6xl mb-4 animate-bounce">{menu.emoji}</div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent break-keep">
                                {menu.name}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed break-keep">
                                {menu.description}
                            </p>
                        </div>

                        {/* 다시 뽑기 / 종류 바꾸기 */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <button
                                onClick={onSpinAgain}
                                className="py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold shadow active:scale-95 transition-transform"
                            >
                                🔄 {menuText("spinAgain", lang)}
                            </button>
                            <button
                                onClick={onChangeCategory}
                                className="py-3 rounded-xl glass dark:bg-slate-700/70 text-sm font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
                            >
                                📋 {menuText("changeCategory", lang)}
                            </button>
                        </div>

                        {/* 같은 종류 추가 추천 */}
                        {suggestedMenus.length > 0 && (
                            <div className="mt-6 text-left">
                                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                    {menuText("alsoTry", lang)}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {suggestedMenus.map((item) => (
                                        <div key={item.id} className="glass rounded-xl p-3 flex flex-col gap-1.5">
                                            <div className="text-2xl">{item.emoji}</div>
                                            <div className="font-bold text-sm text-slate-800 dark:text-white break-keep">{item.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 break-keep">{item.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 text-slate-400 dark:text-slate-500 text-sm">✨ check-me.today</div>
                    </div>

                    <ResultActions
                        hasLiked={hasLiked}
                        isLiking={isLiking}
                        likeCount={likeStats?.likeCount || 0}
                        onToggleLike={toggleLike}
                        onSaveImage={handleSaveImage}
                        onCopyLink={handleCopyLink}
                        onNativeShare={handleNativeShare}
                        onTwitterShare={handleTwitterShare}
                        onKakaoShare={handleKakaoShare}
                        retakeLink="/menu-recommendation"
                        excludeTestId="menu-recommendation"
                    />
                </div>
            </div>
        </div>
    );
}
