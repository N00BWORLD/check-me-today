"use client";

// 결과 공유 버튼 묶음: 카카오톡(가장 크게) → 그림 저장 / 주소 복사 / 다른 앱 / X
// - 카카오톡은 src/lib/kakao.ts 의 shareKakaoFeed 를 쓰고, 키가 없으면 주소 복사로 폴백한다
// - 안내 문구(토스트)는 부모가 보여 준다 (onToast)

import { useRef } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import { FaceReadingResult, TraitScores } from "@/data/face-reading";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";
import { texts } from "./texts";
import { BigButton, cls } from "./ui";
import ShareCard from "./ShareCard";

interface ShareButtonsProps {
  result: FaceReadingResult;
  scores: TraitScores;
  onToast: (message: string) => void;
}

export default function ShareButtons({ result, scores, onToast }: ShareButtonsProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const pageUrl = () => (typeof window !== "undefined" ? window.location.href : "https://check-me.today/face-reading");
  const shareLine = () => `🔮 ${t(texts.shareText)}: ${t(result.type)} — ${t(result.title)}`;

  /** 주소 복사 (성공 여부를 돌려준다) */
  const copyLink = async (successMessage = t(texts.copiedToast)) => {
    const ok = await copyToClipboard(pageUrl());
    onToast(ok ? successMessage : t(texts.copyFailedToast));
    return ok;
  };

  /** 카카오톡: 데스크톱은 팝업이 열리므로 클릭 핸들러 안에서 동기 호출 */
  const handleKakao = () => {
    const sent = shareKakaoFeed({
      title: `🔮 ${t(texts.shareText)}: ${t(result.type)}`,
      description: t(result.title),
      emoji: result.emoji,
      buttonTitle: t(texts.viewResult),
    });
    if (!sent) void copyLink(t(texts.kakaoFallbackToast));
  };

  /** 기기의 공유 창 (없으면 주소 복사) */
  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: t(texts.shareText), text: shareLine(), url: pageUrl() });
        return;
      } catch {
        // 사용자가 취소한 경우 등은 조용히 넘어간다
        return;
      }
    }
    await copyLink();
  };

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareLine())}&url=${encodeURIComponent(pageUrl())}`;
    window.open(url, "_blank", "noopener");
  };

  /** 숨겨 둔 결과 카드를 그림 파일로 저장 */
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: "#f6efe0", useCORS: true });
      const link = document.createElement("a");
      const today = new Date().toISOString().split("T")[0];
      link.download = `face-reading-${result.id}-${today}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      onToast(t(texts.imageSavedToast));
    } catch (err) {
      console.error("결과 그림 저장 실패:", err);
      onToast(t(texts.imageFailedToast));
    }
  };

  return (
    <section aria-label={t(texts.shareHeading)}>
      <h2 className={`${cls.h2} text-center mb-4`}>{t(texts.shareHeading)}</h2>

      <BigButton variant="kakao" onClick={handleKakao} aria-label={t(texts.kakao)} className="min-h-[72px] text-[24px] mb-4">
        💬 {t(texts.kakao)}
      </BigButton>

      <div className="grid grid-cols-2 gap-3">
        <BigButton variant="secondary" compact onClick={handleSaveImage} aria-label={t(texts.saveImage)}>
          🖼️ {t(texts.saveImage)}
        </BigButton>
        <BigButton variant="secondary" compact onClick={() => void copyLink()} aria-label={t(texts.copyLink)}>
          🔗 {t(texts.copyLink)}
        </BigButton>
        <BigButton variant="secondary" compact onClick={() => void handleNative()} aria-label={t(texts.otherApps)}>
          📤 {t(texts.otherApps)}
        </BigButton>
        <BigButton variant="secondary" compact onClick={handleX} aria-label={t(texts.xShare)}>
          𝕏 {t(texts.xShare)}
        </BigButton>
      </div>

      {/* 그림 저장용 숨은 카드 */}
      <ShareCard ref={cardRef} result={result} scores={scores} />
    </section>
  );
}
