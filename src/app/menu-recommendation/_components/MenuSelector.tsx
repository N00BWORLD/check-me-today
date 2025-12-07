"use client";

import { timeSlots, type TimeSlot } from "@/data/menu-recommendation";
import Link from "next/link";

interface MenuSelectorProps {
    currentTimeSlot: TimeSlot;
    onSelectTimeSlot: (timeSlot: TimeSlot) => void;
    pageInfo: any;
    stats: number;
}

export default function MenuSelector({
    currentTimeSlot,
    onSelectTimeSlot,
    pageInfo,
    stats
}: MenuSelectorProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* 헤더 */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {pageInfo.title}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                            {pageInfo.subtitle}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {pageInfo.description}
                        </p>
                    </div>

                    {/* 현재 시간 표시 */}
                    <div className="glass rounded-xl p-4 mb-6 text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                            {pageInfo.currentTime}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl">{timeSlots[currentTimeSlot].emoji}</span>
                            <span className="font-bold text-lg">{timeSlots[currentTimeSlot].name.ko}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                ({timeSlots[currentTimeSlot].timeRange})
                            </span>
                        </div>
                    </div>

                    {/* 시간대 선택 */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {(Object.keys(timeSlots) as TimeSlot[]).map((timeSlot) => {
                            const slot = timeSlots[timeSlot];
                            const isCurrent = timeSlot === currentTimeSlot;

                            return (
                                <button
                                    key={timeSlot}
                                    onClick={() => onSelectTimeSlot(timeSlot)}
                                    className={`glass rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                                        isCurrent && timeSlot !== 'random' ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="text-3xl mb-3">{slot.emoji}</div>
                                        <div className="font-bold text-lg mb-1">{slot.name.ko}</div>
                                        {isCurrent && timeSlot !== 'random' && (
                                            <div className="mt-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                                                현재 시간
                                            </div>
                                        )}
                                        {timeSlot === 'random' && (
                                            <div className="mt-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                                                무작위
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* 추천 버튼 */}
                    <div className="text-center mb-8">
                        <button
                            onClick={() => onSelectTimeSlot(currentTimeSlot)}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            🍽️ {pageInfo.recommend}
                        </button>
                    </div>

                    {/* 통계 및 네비게이션 */}
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                        >
                            {pageInfo.back}
                        </Link>
                        <div className="flex items-center gap-1">
                            <span>{pageInfo.stats}:</span>
                            <span className="font-bold">{stats.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
