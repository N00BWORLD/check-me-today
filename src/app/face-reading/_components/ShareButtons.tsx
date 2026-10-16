"use client";

// 공유 버튼 묶음: 카카오톡(가장 크게) → 그림 저장 / 주소 복사 / 다른 앱 / X
// - 결과 화면과 오늘의 관상 운세 화면이 함께 쓴다 (문구·썸네일·저장 카드는 호출 측이 넘긴다)
// - 카카오톡은 src/lib/kakao.ts 의 shareKakaoFeed 를 쓰고, 키가 없으면 주소 복사로 폴백한다
// - 안내 문구(토스트)는 부모가 보여 준다 (onToast)

import { useRef, type ReactNode } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";
import { texts } from "./texts";
import { BigButton, cls } from "./ui";

interface ShareButtonsProps {
  /** 카카오톡·다른 앱 공유 제목 */
  shareTitle: string;
  /** 공유 본문 (2~3줄) */
  shareDescription: string;
  /** 카카오톡 썸네일 절대 URL (JPG/PNG 권장) */
  imageUrl: string;
  /** 공유할 주소. 생략하면 현재 페이지 */
  shareUrl?: string;
  /** 그림 저장 파일 이름 (확장자 제외). 생략하면 그림 저장 버튼을 숨긴다 */
  downloadName?: string;
  /** 그림 저장용 카드 내용 (폭 420px 기준). 화면 밖에 숨겨 두고 캡처한다 */
  card?: ReactNode;
  onToast: (message: string) => void;
}

export default function ShareButtons({
  shareTitle,
  shareDescription,
  imageUrl,
  shareUrl,
  downloadName,
  card,
  onToast,
}: ShareButtonsProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const pageUrl = () => shareUrl ?? (typeof window !== "undefined" ? window.location.href : "https://check-me.today/face-reading");
  const shareLine = () => `${shareTitle}\n${shareDescription}`;

  /** 주소 복사 (성공 여부를 돌려준다) */
  const copyLink = async (successMessage = t(texts.copiedToast)) => {
    const ok = await copyToClipboard(pageUrl());
    onToast(ok ? successMessage : t(texts.copyFailedToast));
    return ok;
  };

  /** 카카오톡: 데스크톱은 팝업이 열리므로 클릭 핸들러 안에서 동기 호출 */
  const handleKakao = () => {
    const sent = shareKakaoFeed({
      title: shareTitle,
      description: shareDescription,
      imageUrl,
      link: pageUrl(),
      buttonTitle: t(texts.viewResult),
    });
    if (!sent) void copyLink(t(texts.kakaoFallbackToast));
  };

  /** 기기의 공유 창 (없으면 주소 복사) */
  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareLine(), url: pageUrl() });
      } catch {
        // 사용자가 취소한 경우 등은 조용히 넘어간다
      }
      return;
    }
    await copyLink();
  };

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareLine())}&url=${encodeURIComponent(pageUrl())}`;
    window.open(url, "_blank", "noopener");
  };

  /** 숨겨 둔 카드를 그림 파일로 저장 */
  const handleSaveImage = async () => {
    if (!cardRef.current || !downloadName) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: "#f6efe0", useCORS: true });
      const link = document.createElement("a");
      link.download = `${downloadName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      onToast(t(texts.imageSavedToast));
    } catch (err) {
      console.error("결과 그림 저장 실패:", err);
      onToast(t(texts.imageFailedToast));
    }
  };

  const canSave = !!downloadName && !!card;

  return (
    <section aria-label={t(texts.shareHeading)}>
      <h2 className={`${cls.h2} text-center mb-4`}>{t(texts.shareHeading)}</h2>

      <BigButton variant="kakao" onClick={handleKakao} aria-label={t(texts.kakao)} className="min-h-[72px] text-[24px] mb-4">
        💬 {t(texts.kakao)}
      </BigButton>

      <div className="grid grid-cols-2 gap-3">
        {canSave && (
          <BigButton variant="secondary" compact onClick={handleSaveImage} aria-label={t(texts.saveImage)}>
            🖼️ {t(texts.saveImage)}
          </BigButton>
        )}
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
      {canSave && (
        <div className="fixed top-0 -left-[9999px] pointer-events-none" aria-hidden="true">
          <div ref={cardRef} className="w-[420px]">
            {card}
          </div>
        </div>
      )}
    </section>
  );
}
