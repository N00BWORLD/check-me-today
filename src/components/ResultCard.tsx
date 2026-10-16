"use client";

import Link from "next/link";
import { PersonalityType, TraitType, traitNames, traitDescriptions, solarTraits, lunarTraits, maxTraitScore } from "@/data/questions";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useLike, useTestStats } from "@/hooks/useTestStats";
import { useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import ResultActions from "./ResultActions";
import { shareKakaoFeed } from "@/lib/kakao";

interface ResultCardProps {
    type: PersonalityType;
    traitScores: Record<TraitType, number>;
    solarScore: number;
    lunarScore: number;
}

export default function ResultCard({ type, traitScores, solarScore, lunarScore }: ResultCardProps) {
    const { t, lang } = useLanguage();
    const [copied, setCopied] = useState(false);
    const [showBars, setShowBars] = useState(false);

    // 추천 기능
    const { hasLiked, toggleLike, isLiking } = useLike("energy-balance");
    const { stats } = useTestStats("energy-balance");

    useEffect(() => {
        const timer = setTimeout(() => setShowBars(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // 총점 및 퍼센테이지 계산
    const totalScore = solarScore + lunarScore;
    const solarPercent = totalScore > 0 ? Math.round((solarScore / totalScore) * 100) : 50;
    const lunarPercent = 100 - solarPercent;

    // 각 특성의 퍼센테이지 (최대 점수 기준)
    const getTraitPercentage = (trait: TraitType): number => {
        const score = traitScores[trait];
        const percentage = Math.round((score / maxTraitScore) * 100);
        return Math.min(100, Math.max(5, percentage)); // 최소 5%, 최대 100%
    };

    // 주 유형의 특성들
    const displayTraits = type === "SOLAR" ? solarTraits : lunarTraits;

    // 결과 데이터 (다국어)
    const descriptions = {
        SOLAR: {
            title: {
                ko: "솔라 에너지 우세",
                en: "Solar Energy Dominant",
                zh: "太阳能量主导",
                ja: "ソーラーエネルギー優位"
            },
            badge: "☀️ SOLAR TYPE",
            subtitle: {
                ko: "행동과 성취로 빛나는 태양",
                en: "The Sun that shines through action and achievement",
                zh: "通过行动和成就闪耀的太阳",
                ja: "行動と達成で輝く太陽"
            },
            emoji: "☀️",
            tags: {
                ko: ["자기주장", "목표지향", "독립적", "도전정신"],
                en: ["Assertive", "Goal-oriented", "Independent", "Challenger"],
                zh: ["自我主张", "目标导向", "独立", "挑战精神"],
                ja: ["自己主張", "目標志向", "独立的", "挑戦精神"]
            },
            description: {
                ko: "당신은 강한 자기주장과 성취 욕구를 가진 Solar 에너지 우세 유형입니다. 목표를 세우고 달성하는 것에서 큰 에너지를 얻으며, 독립적으로 판단하고 행동하는 것을 선호합니다. 리더십이 뛰어나고 직접적인 소통을 선호하며, 도전을 두려워하지 않습니다. 때로는 타인의 감정에 더 귀 기울이고, 협력의 가치를 인정하면 더욱 균형 잡힌 성장을 할 수 있습니다.",
                en: "You are a Solar energy dominant type with strong assertiveness and drive for achievement. You gain great energy from setting and achieving goals, and prefer to judge and act independently. You have excellent leadership skills, prefer direct communication, and are not afraid of challenges. Sometimes, listening more to others' feelings and recognizing the value of collaboration can lead to more balanced growth.",
                zh: "你是太阳能量主导类型，具有强烈的自我主张和成就欲望。你从设定和实现目标中获得巨大能量，喜欢独立判断和行动。你具有出色的领导能力，喜欢直接沟通，不惧挑战。有时，多倾听他人的感受，认可合作的价值，可以实现更平衡的成长。",
                ja: "あなたは強い自己主張と達成欲求を持つソーラーエネルギー優位タイプです。目標を立てて達成することから大きなエネルギーを得て、独立して判断し行動することを好みます。優れたリーダーシップを持ち、直接的なコミュニケーションを好み、挑戦を恐れません。時には他者の感情にもっと耳を傾け、協力の価値を認めることで、よりバランスの取れた成長ができます。"
            },
            color: {
                gradient: "from-amber-500 via-orange-500 to-red-500",
                bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
                accent: "text-amber-600 dark:text-amber-400",
                ring: "ring-amber-200 dark:ring-amber-800",
                shadow: "shadow-amber-500/30",
            },
        },
        LUNAR: {
            title: {
                ko: "루나 에너지 우세",
                en: "Lunar Energy Dominant",
                zh: "月亮能量主导",
                ja: "ルナエネルギー優位"
            },
            badge: "🌙 LUNAR TYPE",
            subtitle: {
                ko: "공감과 직관으로 빛나는 달",
                en: "The Moon that shines through empathy and intuition",
                zh: "通过共情和直觉闪耀的月亮",
                ja: "共感と直感で輝く月"
            },
            emoji: "🌙",
            tags: {
                ko: ["공감력", "협력적", "직관적", "조화로움"],
                en: ["Empathetic", "Collaborative", "Intuitive", "Harmonious"],
                zh: ["共情力", "合作", "直觉", "和谐"],
                ja: ["共感力", "協調的", "直感的", "調和"]
            },
            description: {
                ko: "당신은 깊은 공감력과 뛰어난 직관을 가진 Lunar 에너지 우세 유형입니다. 타인의 감정을 잘 이해하고 팀의 조화를 중시하며, 직감을 신뢰합니다. 관계 속에서 에너지를 얻고, 부드럽지만 깊이 있는 소통을 선호합니다. 때로는 자신의 의견을 더 적극적으로 표현하고, 독립적인 결정을 내리는 연습을 하면 더욱 균형 잡힌 성장을 할 수 있습니다.",
                en: "You are a Lunar energy dominant type with deep empathy and excellent intuition. You understand others' feelings well, value team harmony, and trust your gut feelings. You gain energy from relationships and prefer soft but deep communication. Sometimes, expressing your opinions more actively and practicing independent decision-making can lead to more balanced growth.",
                zh: "你是月亮能量主导类型，具有深厚的共情力和出色的直觉。你很好地理解他人的感受，重视团队和谐，相信直觉。你从关系中获得能量，喜欢柔和但深入的沟通。有时，更积极地表达自己的意见，练习独立决策，可以实现更平衡的成长。",
                ja: "あなたは深い共感力と優れた直感を持つルナエネルギー優位タイプです。他者の感情をよく理解し、チームの調和を重視し、直感を信頼します。人間関係からエネルギーを得て、柔らかくも深いコミュニケーションを好みます。時には自分の意見をより積極的に表現し、独立した決定を下す練習をすることで、よりバランスの取れた成長ができます。"
            },
            color: {
                gradient: "from-indigo-500 via-purple-500 to-violet-500",
                bg: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
                accent: "text-indigo-600 dark:text-indigo-400",
                ring: "ring-indigo-200 dark:ring-indigo-800",
                shadow: "shadow-indigo-500/30",
            },
        }
    };

    const content = descriptions[type] || descriptions.SOLAR;
    const getLocalizedText = (textObj: Record<string, string>) => textObj[lang] || textObj.en;
    const getLocalizedArray = (arrObj: Record<string, string[]>) => arrObj[lang] || arrObj.en;

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
        const title = getLocalizedText(content.title);
        const text = lang === 'ko'
            ? `나의 에너지 유형은 ${title}! (${type === 'SOLAR' ? '☀️' : '🌙'} ${solarPercent}% : ${lunarPercent}%)\n에너지 밸런스 테스트`
            : `My energy type is ${title}! (${type === 'SOLAR' ? '☀️' : '🌙'} ${solarPercent}% : ${lunarPercent}%)\nEnergy Balance Test`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    // 카카오톡 공유 (Kakao SDK 피드 메시지, 키가 없으면 링크 복사로 폴백)
    const handleKakaoShare = () => {
        const title = getLocalizedText(content.title);
        const emoji = type === 'SOLAR' ? '☀️' : '🌙';
        const sent = shareKakaoFeed({
            title: lang === 'ko' ? `나의 에너지 유형은 ${title}!` : `My energy type: ${title}!`,
            description: lang === 'ko'
                ? `☀️ ${solarPercent}% : 🌙 ${lunarPercent}% · 에너지 밸런스 테스트`
                : `☀️ ${solarPercent}% : 🌙 ${lunarPercent}% · Energy Balance Test`,
            emoji,
            buttonTitle: lang === 'ko' ? '결과 보기' : 'View Result',
        });
        if (!sent) handleCopyLink();
    };

    // 이미지로 저장
    const [isSaving, setIsSaving] = useState(false);
    const handleSaveImage = useCallback(async () => {
        if (isSaving) return;

        setIsSaving(true);
        try {
            const isDark = document.documentElement.classList.contains('dark');
            const bgColor = isDark ? '#1e293b' : '#fafafa';
            const textColor = isDark ? '#f1f5f9' : '#1e293b';
            const accentColor = type === 'SOLAR' ? '#f59e0b' : '#6366f1';
            const gradientStart = type === 'SOLAR' ? '#f59e0b' : '#6366f1';
            const gradientEnd = type === 'SOLAR' ? '#ef4444' : '#8b5cf6';

            const captureDiv = document.createElement('div');
            captureDiv.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: 400px;
                padding: 40px;
                background: linear-gradient(135deg, ${bgColor} 0%, ${isDark ? '#334155' : '#f0f0f0'} 100%);
                border-radius: 32px;
                font-family: 'Pretendard Variable', -apple-system, sans-serif;
            `;

            const tags = getLocalizedArray(content.tags);
            const tagsHtml = tags.map((tag: string) =>
                `<span style="
                    display: inline-block;
                    padding: 6px 14px;
                    background: ${isDark ? '#475569' : '#ffffff'};
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 600;
                    color: ${isDark ? '#cbd5e1' : '#475569'};
                    margin: 4px;
                ">${tag}</span>`
            ).join('');

            // 특성 바 HTML 생성
            const traitsHtml = displayTraits.map((trait: TraitType) => {
                const percentage = getTraitPercentage(trait);
                const traitName = traitNames[trait][lang] || traitNames[trait]["en"];
                return `
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px;">
                            <span style="font-weight: 600; color: ${isDark ? '#cbd5e1' : '#475569'};">${traitName}</span>
                            <span style="font-weight: 700; color: ${accentColor};">${percentage}%</span>
                        </div>
                        <div style="height: 8px; background: ${isDark ? '#475569' : '#e2e8f0'}; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd}); border-radius: 4px;"></div>
                        </div>
                    </div>
                `;
            }).join('');

            captureDiv.innerHTML = `
                <div style="text-align: center;">
                    <!-- 이모지 아이콘 -->
                    <div style="
                        width: 100px;
                        height: 100px;
                        margin: 0 auto 20px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 50px;
                        box-shadow: 0 10px 30px ${accentColor}40;
                    ">${content.emoji}</div>
                    
                    <!-- 배지 -->
                    <div style="
                        display: inline-block;
                        padding: 8px 20px;
                        background: linear-gradient(90deg, ${gradientStart}, ${gradientEnd});
                        border-radius: 20px;
                        color: white;
                        font-size: 12px;
                        font-weight: 700;
                        margin-bottom: 16px;
                        letter-spacing: 1px;
                    ">${content.badge}</div>
                    
                    <!-- 제목 -->
                    <h1 style="
                        font-size: 26px;
                        font-weight: 900;
                        color: ${textColor};
                        margin: 0 0 8px 0;
                    ">${getLocalizedText(content.title)}</h1>
                    
                    <!-- 퍼센테이지 바 -->
                    <div style="margin: 16px 0; padding: 12px; background: ${isDark ? '#475569' : '#ffffff'}; border-radius: 16px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; font-weight: 700;">
                            <span style="color: #f59e0b;">☀️ Solar ${solarPercent}%</span>
                            <span style="color: #6366f1;">🌙 Lunar ${lunarPercent}%</span>
                        </div>
                        <div style="height: 12px; background: ${isDark ? '#334155' : '#e2e8f0'}; border-radius: 6px; overflow: hidden; display: flex;">
                            <div style="width: ${solarPercent}%; background: linear-gradient(90deg, #f59e0b, #f97316); border-radius: 6px 0 0 6px;"></div>
                            <div style="width: ${lunarPercent}%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 0 6px 6px 0;"></div>
                        </div>
                    </div>
                    
                    <!-- 부제목 -->
                    <p style="
                        font-size: 14px;
                        font-weight: 500;
                        color: ${accentColor};
                        margin: 0 0 16px 0;
                    ">"${getLocalizedText(content.subtitle)}"</p>
                    
                    <!-- 태그 -->
                    <div style="margin-bottom: 20px;">${tagsHtml}</div>
                    
                    <!-- 특성 바 -->
                    <div style="text-align: left; margin-bottom: 20px;">${traitsHtml}</div>
                    
                    <!-- 워터마크 -->
                    <div style="
                        padding-top: 16px;
                        border-top: 1px solid ${isDark ? '#475569' : '#e2e8f0'};
                        color: ${isDark ? '#64748b' : '#94a3b8'};
                        font-size: 12px;
                    ">✨ check-me.today</div>
                </div>
            `;

            document.body.appendChild(captureDiv);

            const canvas = await html2canvas(captureDiv, {
                scale: 3,
                backgroundColor: bgColor,
                useCORS: true,
                logging: false,
            });

            document.body.removeChild(captureDiv);

            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `energy-balance-${type.toLowerCase()}-${timestamp}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (err) {
            console.error('이미지 저장 실패:', err);
            alert(lang === 'ko' ? '이미지 저장에 실패했습니다.' : 'Failed to save image.');
        } finally {
            setIsSaving(false);
        }
    }, [isSaving, type, lang, content, displayTraits, getTraitPercentage, solarPercent, lunarPercent, getLocalizedText, getLocalizedArray]);

    // 네이티브 공유 (모바일)
    const handleNativeShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const title = getLocalizedText(content.title);
        const shareData = {
            title: 'Energy Balance Test',
            text: lang === 'ko'
                ? `나의 에너지 유형은 ${title}! (☀️ ${solarPercent}% : 🌙 ${lunarPercent}%)`
                : `My energy type: ${title}! (☀️ ${solarPercent}% : 🌙 ${lunarPercent}%)`,
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
            {/* Result Card */}
            <div
                className={`glass-strong dark:bg-slate-800/90 rounded-[2.5rem] p-8 relative overflow-hidden mb-6 ${content.color.bg}`}
            >
                {/* 배경 장식 */}
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-br ${content.color.gradient} opacity-10 blur-3xl`} />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-white/40 dark:from-white/10 to-transparent" />

                {/* 장식 이모지 */}
                <div className="absolute top-4 right-6 text-3xl animate-scale-in" style={{ animationDelay: "0.3s" }}>
                    ⚖️
                </div>

                {/* 메인 아이콘 */}
                <div className="relative mx-auto mb-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    <div className={`
                        w-28 h-28 rounded-full 
                        bg-gradient-to-br ${content.color.gradient} 
                        flex items-center justify-center 
                        shadow-2xl ${content.color.shadow}
                        ring-8 ${content.color.ring} ring-opacity-50
                    `}>
                        <span className="text-6xl">{content.emoji}</span>
                    </div>
                </div>

                {/* 배지 */}
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

                {/* 제목 */}
                <div className="text-center mb-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white break-keep">
                        {getLocalizedText(content.title)}
                    </h1>
                </div>

                {/* ★ Solar vs Lunar 퍼센테이지 바 (핵심!) */}
                <div
                    className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 mb-4 animate-fade-in"
                    style={{ animationDelay: "0.55s" }}
                >
                    <div className="flex justify-between items-center mb-2 text-sm font-bold">
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                            ☀️ Solar <span className="text-lg">{solarPercent}%</span>
                        </span>
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                            <span className="text-lg">{lunarPercent}%</span> Lunar 🌙
                        </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                            style={{ width: showBars ? `${solarPercent}%` : '0%' }}
                        />
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: showBars ? `${lunarPercent}%` : '0%' }}
                        />
                    </div>
                </div>

                {/* 부제목 */}
                <p
                    className={`text-center text-base font-medium ${content.color.accent} mb-5 animate-fade-in`}
                    style={{ animationDelay: "0.6s" }}
                >
                    &quot;{getLocalizedText(content.subtitle)}&quot;
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {getLocalizedArray(content.tags).map((tag: string, idx: number) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-300 text-sm font-semibold border border-white/50 dark:border-slate-600 animate-scale-in"
                            style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 주요 특성 바 */}
                <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                        {lang === 'ko' ? '📊 주요 특성' : lang === 'zh' ? '📊 主要特征' : lang === 'ja' ? '📊 主な特性' : '📊 Key Traits'}
                    </h3>
                    {displayTraits.map((trait, idx) => {
                        const percentage = getTraitPercentage(trait);
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
                                <div className="h-2.5 bg-white/50 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${content.color.gradient} transition-all duration-1000 ease-out`}
                                        style={{
                                            width: showBars ? `${percentage}%` : '0%',
                                            transitionDelay: `${0.9 + idx * 0.1}s`
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {traitDescriptions[trait][lang] || traitDescriptions[trait]["en"]}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* 설명 */}
                <div
                    className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-slate-600 animate-fade-in"
                    style={{ animationDelay: "1s" }}
                >
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                        {lang === 'ko' ? '💡 상세 분석' : lang === 'zh' ? '💡 详细分析' : lang === 'ja' ? '💡 詳細分析' : '💡 Detailed Analysis'}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm break-keep">
                        {getLocalizedText(content.description)}
                    </p>
                </div>

                {/* 워터마크 */}
                <div className="mt-6 pt-4 border-t border-white/30 dark:border-slate-600/50 animate-fade-in" style={{ animationDelay: "1.1s" }}>
                    <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <span className="text-lg">✨</span>
                        <span className="text-xs font-medium tracking-wide">check-me.today</span>
                    </div>
                </div>
            </div>

            {/* Actions using Standardized Component */}
            <ResultActions
                hasLiked={hasLiked}
                isLiking={isLiking}
                likeCount={stats.likeCount}
                onToggleLike={toggleLike}
                onSaveImage={handleSaveImage}
                onCopyLink={handleCopyLink}
                onNativeShare={handleNativeShare}
                onTwitterShare={handleTwitterShare}
                onKakaoShare={handleKakaoShare}
                retakeLink="/test"
                excludeTestId="energy-balance"
            />
        </div>
    );
}
