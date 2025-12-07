"use client";

import Link from "next/link";
import { PersonalityType, TraitType, traitNames, maxScores } from "@/data/questions";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useLike, useTestStats } from "@/hooks/useTestStats";
import { useState, useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";

interface ResultCardProps {
    type: PersonalityType;
    traitScores: Record<TraitType, number>;
}

export default function ResultCard({ type, traitScores }: ResultCardProps) {
    const { t, lang } = useLanguage();
    const [copied, setCopied] = useState(false);
    const [showBars, setShowBars] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    // 추천 기능
    const { hasLiked, toggleLike, isLiking } = useLike("teto-vs-egen");
    const { stats } = useTestStats("teto-vs-egen");

    useEffect(() => {
        const timer = setTimeout(() => setShowBars(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const displayTraits: TraitType[] = type === "TETO" 
        ? ["drive", "social", "decision"] 
        : ["empathy", "detail", "creativity"];

    const getPercentage = (trait: TraitType): number => {
        const score = traitScores[trait];
        const max = maxScores[trait];
        const percentage = Math.round((score / max) * 100);
        return Math.min(100, Math.max(20, percentage));
    };

    const descriptions = {
        TETO: {
            title: t(uiTexts.tetoTitle),
            badge: "🔥 TETO TYPE",
            subtitle: t(uiTexts.tetoSubtitle),
            emoji: "🔥",
            tags: [t(uiTexts.tagDrive), t(uiTexts.tagLeadership), t(uiTexts.tagHonesty), t(uiTexts.tagPassion)],
            description: t(uiTexts.tetoDesc),
            color: {
                gradient: "from-orange-500 via-red-500 to-pink-500",
                bg: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                accent: "text-red-500 dark:text-red-400",
                ring: "ring-red-200 dark:ring-red-800",
            },
        },
        EGEN: {
            title: t(uiTexts.egenTitle),
            badge: "🔮 EGEN TYPE",
            subtitle: t(uiTexts.egenSubtitle),
            emoji: "🔮",
            tags: [t(uiTexts.tagCare), t(uiTexts.tagDetail), t(uiTexts.tagListening), t(uiTexts.tagEmpathy)],
            description: t(uiTexts.egenDesc),
            color: {
                gradient: "from-purple-500 via-violet-500 to-indigo-500",
                bg: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
                accent: "text-purple-500 dark:text-purple-400",
                ring: "ring-purple-200 dark:ring-purple-800",
            },
        }
    };

    const content = descriptions[type] || descriptions.TETO;

    // 링크 복사
    const handleCopyLink = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    // 트위터/X 공유
    const handleTwitterShare = () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const text = lang === 'ko' 
            ? `나의 성향은 ${content.title}! 🎉\n테토 vs 에겐 테스트`
            : `My type is ${content.title}! 🎉\nTETO vs EGEN Test`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    // 카카오톡 공유 (URL만 복사)
    const handleKakaoShare = () => {
        handleCopyLink();
    };

    // 이미지로 저장
    const [isSaving, setIsSaving] = useState(false);
    const handleSaveImage = useCallback(async () => {
        if (!cardRef.current || isSaving) return;
        
        setIsSaving(true);
        try {
            // 카드를 캡처
            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // 고해상도
                backgroundColor: null,
                useCORS: true,
                logging: false,
            });
            
            // 이미지로 변환 및 다운로드
            const link = document.createElement('a');
            link.download = `check-me-today-${type.toLowerCase()}-result.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('이미지 저장 실패:', err);
        } finally {
            setIsSaving(false);
        }
    }, [isSaving, type]);

    // 네이티브 공유 (모바일)
    const handleNativeShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareData = {
            title: 'TETO vs EGEN Test',
            text: lang === 'ko' 
                ? `나의 성향은 ${content.title}! 🎉`
                : `My type is: ${content.title}! 🎉`,
            url: url,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                handleCopyLink();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto animate-slide-up">
            {/* Result Card - 스크린샷용 디자인 */}
            <div 
                ref={cardRef}
                className={`glass-strong dark:bg-slate-800/90 rounded-[2.5rem] p-8 relative overflow-hidden mb-6 ${content.color.bg}`}
            >
                {/* 배경 장식 */}
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-br ${content.color.gradient} opacity-10 blur-3xl`} />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/40 dark:from-white/10 to-transparent" />
                
                {/* 장식 이모지 */}
                <div className="absolute top-4 right-6 text-3xl animate-scale-in" style={{ animationDelay: "0.3s" }}>
                    🎉
                </div>

                <div className="relative mx-auto mb-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    <div className={`
                        w-28 h-28 rounded-full 
                        bg-gradient-to-br ${content.color.gradient} 
                        flex items-center justify-center 
                        shadow-2xl shadow-purple-500/30
                        ring-8 ${content.color.ring} ring-opacity-50
                    `}>
                        <span className="text-6xl">{content.emoji}</span>
                    </div>
                </div>

                <div className="text-center mb-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <span className={`
                        inline-block px-4 py-2 rounded-full 
                        bg-gradient-to-r ${content.color.gradient} 
                        text-white text-sm font-bold tracking-wider
                        shadow-lg
                    `}>
                        {content.badge}
                    </span>
                </div>

                <div className="text-center mb-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white break-keep">
                        {content.title}
                    </h1>
                </div>

                <p 
                    className={`text-center text-lg font-medium ${content.color.accent} mb-6 animate-fade-in`}
                    style={{ animationDelay: "0.55s" }}
                >
                    &quot;{content.subtitle}&quot;
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {content.tags.map((tag, idx) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-300 text-sm font-semibold border border-white/50 dark:border-slate-600 animate-scale-in"
                            style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="space-y-4 mb-8">
                    {displayTraits.map((trait, idx) => {
                        const percentage = getPercentage(trait);
                        return (
                            <div key={trait} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                                        {traitNames[trait][lang] || traitNames[trait]["en"]}
                                    </span>
                                    <span className={`font-bold ${content.color.accent}`}>
                                        {percentage}%
                                    </span>
                                </div>
                                <div className="h-2 bg-white/50 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${content.color.gradient} transition-all duration-1000 ease-out`}
                                        style={{ 
                                            width: showBars ? `${percentage}%` : '0%',
                                            transitionDelay: `${0.9 + idx * 0.1}s`
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div 
                    className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-slate-600 animate-fade-in"
                    style={{ animationDelay: "1s" }}
                >
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm break-keep">
                        {content.description}
                    </p>
                </div>

                {/* 워터마크 - 스크린샷용 */}
                <div className="mt-6 pt-4 border-t border-white/30 dark:border-slate-600/50 animate-fade-in" style={{ animationDelay: "1.1s" }}>
                    <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <span className="text-lg">✨</span>
                        <span className="text-xs font-medium tracking-wide">check-me.today</span>
                    </div>
                </div>
            </div>

            {/* 추천 버튼 */}
            <div className="mb-6 animate-slide-up" style={{ animationDelay: "1.05s" }}>
                <button
                    onClick={toggleLike}
                    disabled={hasLiked || isLiking}
                    className={`
                        w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold
                        transition-all duration-300
                        ${hasLiked 
                            ? "bg-pink-100 dark:bg-pink-900/30 text-pink-500 dark:text-pink-400 border-2 border-pink-300 dark:border-pink-700" 
                            : "glass dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500 dark:hover:text-pink-400 border-2 border-transparent hover:border-pink-200 dark:hover:border-pink-800"
                        }
                        active:scale-[0.98]
                        disabled:cursor-not-allowed
                    `}
                >
                    <svg 
                        className={`w-6 h-6 transition-transform ${hasLiked ? "scale-110" : ""}`} 
                        fill={hasLiked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                    </svg>
                    <span>
                        {hasLiked 
                            ? (lang === 'ko' ? '추천했어요!' : lang === 'zh' ? '已推荐!' : lang === 'ja' ? 'おすすめ済み!' : 'Liked!')
                            : (lang === 'ko' ? '이 테스트 추천하기' : lang === 'zh' ? '推荐此测试' : lang === 'ja' ? 'このテストをおすすめ' : 'Recommend this test')
                        }
                    </span>
                    {stats.likeCount > 0 && (
                        <span className="px-2 py-0.5 bg-pink-200 dark:bg-pink-800 rounded-full text-xs font-bold">
                            {stats.likeCount.toLocaleString()}
                        </span>
                    )}
                </button>
            </div>

            {/* 공유 버튼 그룹 */}
            <div className="mb-6 animate-slide-up" style={{ animationDelay: "1.1s" }}>
                {/* 메인 공유 버튼 */}
                <button
                    onClick={handleNativeShare}
                    className={`
                        w-full flex items-center justify-center gap-2 
                        bg-gradient-to-r ${content.color.gradient}
                        text-white py-4 rounded-2xl font-bold mb-3
                        shadow-lg shadow-purple-500/20
                        active:scale-[0.98] transition-transform
                    `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {copied ? t(uiTexts.copied) : t(uiTexts.share)}
                </button>

                {/* 공유 옵션 그리드 */}
                <div className="grid grid-cols-4 gap-2">
                    {/* 이미지 저장 */}
                    <button
                        onClick={handleSaveImage}
                        disabled={isSaving}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98] disabled:opacity-50"
                    >
                        <span className="text-xl">{isSaving ? '⏳' : '📷'}</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '이미지 저장' : lang === 'zh' ? '保存图片' : lang === 'ja' ? '画像保存' : 'Save Image'}
                        </span>
                    </button>

                    {/* 링크 복사 */}
                    <button
                        onClick={handleCopyLink}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">🔗</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '링크 복사' : lang === 'zh' ? '复制链接' : lang === 'ja' ? 'リンク' : 'Link'}
                        </span>
                    </button>

                    {/* 트위터/X */}
                    <button
                        onClick={handleTwitterShare}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">𝕏</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            Twitter
                        </span>
                    </button>

                    {/* 카카오톡 */}
                    <button
                        onClick={handleKakaoShare}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">💬</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '카톡' : 'Kakao'}
                        </span>
                    </button>
                </div>
            </div>

            {/* 다른 테스트 버튼 */}
            <div className="mb-6 animate-slide-up" style={{ animationDelay: "1.15s" }}>
                <Link href="/">
                    <div className="flex items-center justify-center gap-2 glass dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 py-4 rounded-2xl font-bold h-full active:scale-[0.98] transition-transform hover:bg-white/80 dark:hover:bg-slate-700">
                        {t(uiTexts.otherTests)}
                    </div>
                </Link>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
                <Link 
                    href="/test" 
                    className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t(uiTexts.retake)}
                </Link>
            </div>
        </div>
    );
}
