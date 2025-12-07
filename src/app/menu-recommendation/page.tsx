"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTestStats } from "@/hooks/useTestStats";
import Link from "next/link";
import { timeSlots, type TimeSlot, getWeightedRandomMenu } from "@/data/menu-recommendation";
import MenuResult from "./_components/MenuResult";

export default function MenuRecommendationPage() {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [recommendedMenu, setRecommendedMenu] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const { lang, t } = useLanguage();
    const { stats, incrementStats } = useTestStats("menu-recommendation");

    // 현재 시간에 맞는 기본 시간대 추천
    const getCurrentTimeSlot = (): TimeSlot => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 6 && hour < 11) return 'breakfast';
        if (hour >= 11 && hour < 17) return 'lunch';
        if (hour >= 17 && hour < 21) return 'dinner';
        return 'snack';
    };

    const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>(getCurrentTimeSlot());

    useEffect(() => {
        const detectedTimeSlot = getCurrentTimeSlot();
        setCurrentTimeSlot(detectedTimeSlot);
        // 페이지 로드 시 자동으로 추천 시작
        generateRecommendation(detectedTimeSlot);
    }, []);

    // 메뉴 추천 함수 (가중치 기반)
    const generateRecommendation = (timeSlot: TimeSlot) => {
        setIsGenerating(true);
        setSelectedTimeSlot(timeSlot);

        // 가중치 기반 랜덤 추천
        const selectedMenu = getWeightedRandomMenu(timeSlot);

        // 통계 증가 (Firebase 설정 후 활성화)
        // incrementStats();

        // 애니메이션 효과를 위한 딜레이
        setTimeout(() => {
            setRecommendedMenu(selectedMenu);
            setIsGenerating(false);
        }, 1500);
    };

    // 다시하기
    const resetRecommendation = () => {
        setSelectedTimeSlot(null);
        setRecommendedMenu(null);
        setCurrentTimeSlot(getCurrentTimeSlot());
    };

    // 테스트 정보 (다국어)
    const pageInfo = {
        ko: {
            title: "오늘의 메뉴추천",
            subtitle: "🍽️ 지금 시간에 맞는 최적의 메뉴",
            description: "현재 시간대에 맞춰 AI가 추천하는 맛있는 메뉴를 만나보세요! 아침·점심·저녁·야식 별로 특화된 메뉴를 추천해드립니다.",
            currentTime: "현재 시간",
            recommend: "메뉴 추천받기",
            back: "← 돌아가기",
            reset: "다른 메뉴 추천받기",
            stats: "총 추천수",
        },
        en: {
            title: "Today's Menu Recommendation",
            subtitle: "🍽️ Perfect Menu for Your Current Time",
            description: "Discover delicious menu recommendations tailored to your current time! Specialized recommendations for breakfast, lunch, dinner, and late-night snacks.",
            currentTime: "Current Time",
            recommend: "Get Recommendation",
            back: "← Back",
            reset: "Get Another Recommendation",
            stats: "Total Recommendations",
        },
        zh: {
            title: "今日菜单推荐",
            subtitle: "🍽️ 适合当前时间的完美菜单",
            description: "根据当前时间为你推荐美味的菜单！早餐、午餐、晚餐、宵夜都有专门的菜单推荐。",
            currentTime: "当前时间",
            recommend: "获取推荐",
            back: "← 返回",
            reset: "获取其他推荐",
            stats: "总推荐数",
        },
        ja: {
            title: "今日のメニューおすすめ",
            subtitle: "🍽️ 現在の時間にぴったりのメニュー",
            description: "現在の時間に合わせてAIがおすすめする美味しいメニューをチェック！朝・昼・夕・夜食別に特化したメニューをおすすめします。",
            currentTime: "現在の時間",
            recommend: "メニューおすすめを受ける",
            back: "← 戻る",
            reset: "他のメニューおすすめを受ける",
            stats: "総おすすめ数",
        },
    };

    const info = pageInfo[lang] || pageInfo.ko;

    // 로딩 중 화면
    if (isGenerating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {info.title}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                {info.subtitle}
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-8 mb-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">맛있는 메뉴를 찾고 있어요... 🍽️</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                현재 시간대에 맞는 최적의 메뉴를 추천해드릴게요!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 결과 화면
    if (recommendedMenu && selectedTimeSlot) {
        return (
            <MenuResult
                menu={recommendedMenu}
                timeSlot={selectedTimeSlot}
                onReset={resetRecommendation}
                pageInfo={info}
                stats={stats}
            />
        );
    }

    // 기본적으로는 로딩 화면 (자동 추천 시작)
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {info.title}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                            {info.subtitle}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {info.description}
                        </p>
                    </div>

                    <div className="glass rounded-2xl p-8 mb-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">맛있는 메뉴를 찾고 있어요... 🍽️</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            현재 시간대({timeSlots[currentTimeSlot].name.ko})에 맞는 최적의 메뉴를 추천해드릴게요!
                        </p>
                    </div>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-center gap-1">
                            <span>{info.stats}:</span>
                            <span className="font-bold">{stats.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
