"use client";

import Link from "next/link";
import { useLanguage, uiTexts } from "@/context/LanguageContext";
import { useState } from "react";
import TestCard from "./TestCard";
import { getActiveTests } from "@/data/tests";
import { useMemo } from "react";

interface ResultActionsProps {
    hasLiked: boolean;
    isLiking: boolean;
    likeCount: number;
    onToggleLike: () => void;
    onSaveImage: () => void;
    onCopyLink: () => void;
    onNativeShare: () => void;
    onTwitterShare: () => void;
    /** 카카오톡 공유. src/lib/kakao.ts 의 shareKakaoFeed 를 호출하고, 불가능하면 링크 복사로 폴백할 것 */
    onKakaoShare: () => void;
    retakeLink?: string;
    excludeTestId?: string;
}

export default function ResultActions({
    hasLiked,
    isLiking,
    likeCount,
    onToggleLike,
    onSaveImage,
    onCopyLink,
    onNativeShare,
    onTwitterShare,
    onKakaoShare,
    retakeLink = "/test",
    excludeTestId
}: ResultActionsProps) {
    const { t, lang } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopyLinkInfo = () => {
        onCopyLink();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-slide-up" style={{ animationDelay: "1.0s" }}>
            {/* 1. 추천 버튼 */}
            <div className="mb-6">
                <button
                    onClick={onToggleLike}
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
                    {likeCount > 0 && (
                        <span className="px-2 py-0.5 bg-pink-200 dark:bg-pink-800 rounded-full text-xs font-bold">
                            {likeCount.toLocaleString()}
                        </span>
                    )}
                </button>
            </div>

            {/* 2. 공유 버튼 그룹 */}
            <div className="mb-6">
                {/* 메인 공유 버튼 (네이티브) */}
                <button
                    onClick={onNativeShare}
                    className={`
                        w-full flex items-center justify-center gap-2 
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                        text-white py-4 rounded-2xl font-bold mb-3
                        shadow-lg shadow-purple-500/30
                        active:scale-[0.98] transition-transform hover:brightness-110
                    `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {copied ? t(uiTexts.copied) : t(uiTexts.share)}
                </button>

                {/* 서브 액션 그리드 */}
                <div className="grid grid-cols-4 gap-2">
                    <button
                        onClick={onSaveImage}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">📷</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '이미지 저장' : lang === 'zh' ? '保存图片' : lang === 'ja' ? '画像保存' : 'Save Image'}
                        </span>
                    </button>

                    <button
                        onClick={handleCopyLinkInfo}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">{copied ? "✅" : "🔗"}</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '링크 복사' : lang === 'zh' ? '复制链接' : lang === 'ja' ? 'リンク' : 'Link'}
                        </span>
                    </button>

                    <button
                        onClick={onTwitterShare}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">𝕏</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            Twitter
                        </span>
                    </button>

                    <button
                        onClick={onKakaoShare}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 glass dark:bg-slate-800/80 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                    >
                        <span className="text-xl">💬</span>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            {lang === 'ko' ? '카톡' : 'Kakao'}
                        </span>
                    </button>
                </div>
            </div>

            {/* 3. 다른 테스트 버튼 */}
            <div className="mb-6">
                <Link href="/">
                    <div className="flex items-center justify-center gap-2 glass dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 py-4 rounded-2xl font-bold h-full active:scale-[0.98] transition-transform hover:bg-white/80 dark:hover:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                        <span className="text-xl">🏠</span>
                        {t(uiTexts.otherTests)}
                    </div>
                </Link>
            </div>

            {/* 4. Cross Promotion */}
            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                    👀 {lang === 'ko' ? '다른 테스트도 해보세요!' : 'Try other tests!'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {useMemo(() => {
                        const others = getActiveTests().filter(t => t.id !== excludeTestId);
                        return others.sort(() => Math.random() - 0.5).slice(0, 2);
                    }, [excludeTestId]).map((test) => (
                        <TestCard key={test.id} test={test} />
                    ))}
                </div>
            </div>

            {/* 5. 다시 하기 (선택적) */}
            <div className="text-center mt-6">
                <Link
                    href={retakeLink}
                    className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
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
