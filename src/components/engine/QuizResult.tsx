"use client";

// 결과 화면: 결과 카드 + 광고 + 공유/추천 액션 + 추천 테스트
import { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizSummary, QuizResultType } from "@/data/engine/types";
import { useTestStats, useLike } from "@/hooks/useTestStats";
import { shareKakaoFeed, SITE_URL } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";
import ResultActions from "@/components/ResultActions";
import RecommendedTests from "@/components/RecommendedTests";
import AdUnit from "@/components/AdUnit";
import InstallPromptTrigger from "@/components/InstallPromptTrigger";
import ResultCard from "./ResultCard";
import { engineTexts } from "./engineTexts";

interface Props {
    quiz: QuizSummary;
    result: QuizResultType;
    /** 공유 링크(?r=)로 들어온 경우 true → 상단에 "나도 테스트하기" 안내 */
    viaShare: boolean;
}

export default function QuizResult({ quiz, result, viaShare }: Props) {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);

    const { stats } = useTestStats(quiz.id);
    const { hasLiked, toggleLike, isLiking } = useLike(quiz.id);

    const quizPath = `/q/${quiz.slug}`;
    const shareUrl = `${SITE_URL}${quizPath}?r=${result.id}`;
    const shareTitle = `${t(result.title)} ${result.emoji}`;
    const shareText = `${quiz.emoji} ${t(quiz.name)}: ${shareTitle}\n${t(result.subtitle)}`;

    const handleCopyLink = async () => {
        await copyToClipboard(shareUrl);
    };

    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            "_blank"
        );
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: `${t(quiz.name)} | Check Me Today`, text: shareText, url: shareUrl });
            } catch {
                // 사용자가 공유 시트를 닫은 경우 등 → 무시
            }
        } else {
            handleCopyLink();
        }
    };

    // 카카오톡 피드 공유. SDK/키가 없으면 링크 복사로 폴백
    const handleKakaoShare = () => {
        const sent = shareKakaoFeed({
            title: shareTitle,
            description: `${t(quiz.name)} · ${t(result.subtitle)}`,
            emoji: result.emoji,
            link: shareUrl,
            buttonTitle: t(engineTexts.viewResult),
        });
        if (!sent) handleCopyLink();
    };

    // 결과 카드 DOM 을 그대로 이미지로 저장 (html2canvas 는 필요할 때만 로드)
    const handleSaveImage = async () => {
        if (!cardRef.current) return;
        try {
            const { default: html2canvas } = await import("html2canvas");
            const isDark = document.documentElement.classList.contains("dark");
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
            });
            const link = document.createElement("a");
            link.download = `${quiz.slug}-${result.id}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (err) {
            console.error("이미지 저장 실패:", err);
        }
    };

    return (
        <main className="min-h-screen p-4 pb-24">
            <div className="max-w-md mx-auto">
                <Link href="/" className="inline-block text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-3 transition-colors">
                    ← {t(engineTexts.home)}
                </Link>

                {/* 직접 테스트를 끝낸 뒤에만 앱 설치 안내 (한 번). 공유 링크로 들어온 경우는 제외 */}
                <InstallPromptTrigger enabled={!viaShare} />

                {/* 공유 링크로 들어온 방문자 안내 */}
                {viaShare && (
                    <div className="glass rounded-2xl p-4 mb-4 flex items-center justify-between gap-3 animate-fade-in">
                        <p className="text-sm text-slate-600 dark:text-slate-300 break-keep">{t(engineTexts.sharedHint)}</p>
                        <Link
                            href={quizPath}
                            className={`shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r ${quiz.theme.gradient} text-white text-sm font-bold shadow`}
                        >
                            {t(engineTexts.tryMe)}
                        </Link>
                    </div>
                )}

                <ResultCard ref={cardRef} quiz={quiz} result={result} />

                {/* 광고: 결과 콘텐츠 바로 아래 */}
                <div className="my-6">
                    <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
                </div>

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
                    retakeLink={quizPath}
                    excludeTestId={quiz.id}
                />

                <RecommendedTests currentTestId={quiz.id} />
            </div>
        </main>
    );
}
