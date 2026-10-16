"use client";

// 공유 버튼 묶음: 카카오톡(가장 크게) → 주소 복사 / 다른 앱으로 보내기
// - 카카오톡은 src/lib/kakao.ts 의 shareKakaoFeed 를 쓰고, 키가 없거나 실패하면 주소 복사로 폴백한다
// - 안내 문구(토스트)는 부모가 보여 준다 (onToast)

import { useLanguage } from "@/context/LanguageContext";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";
import { texts } from "./texts";
import { BigButton, cls } from "./ui";

interface ShareButtonsProps {
  /** 카카오톡·다른 앱 공유 제목 */
  shareTitle: string;
  /** 공유 본문 (번호 줄) */
  shareDescription: string;
  /** 공유할 주소 (번호가 들어 있는 주소) */
  shareUrl: string;
  onToast: (message: string) => void;
}

export default function ShareButtons({ shareTitle, shareDescription, shareUrl, onToast }: ShareButtonsProps) {
  const { t } = useLanguage();

  /** 주소 복사 */
  const copyLink = async (successMessage = t(texts.copiedToast)) => {
    const ok = await copyToClipboard(shareUrl);
    onToast(ok ? successMessage : t(texts.copyFailedToast));
  };

  /** 카카오톡: 데스크톱은 팝업이 열리므로 클릭 핸들러 안에서 동기 호출 */
  const handleKakao = () => {
    const sent = shareKakaoFeed({
      title: shareTitle,
      description: shareDescription,
      emoji: "🎱",
      link: shareUrl,
      buttonTitle: t(texts.viewNumbers),
    });
    if (!sent) void copyLink(t(texts.kakaoFallbackToast));
  };

  /** 기기의 공유 창 (없으면 주소 복사) */
  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: `${shareTitle}\n${shareDescription}`, url: shareUrl });
      } catch {
        // 사용자가 취소한 경우 등은 조용히 넘어간다
      }
      return;
    }
    await copyLink();
  };

  return (
    <section aria-label={t(texts.shareHeading)}>
      <h2 className={`${cls.h2} text-center mb-4`}>{t(texts.shareHeading)}</h2>

      <BigButton variant="kakao" onClick={handleKakao} aria-label={t(texts.kakao)} className="min-h-[72px] text-[24px] mb-4">
        💬 {t(texts.kakao)}
      </BigButton>

      <div className="grid grid-cols-2 gap-3">
        <BigButton variant="secondary" compact onClick={() => void copyLink()} aria-label={t(texts.copyLink)}>
          🔗 {t(texts.copyLink)}
        </BigButton>
        <BigButton variant="secondary" compact onClick={() => void handleNative()} aria-label={t(texts.otherApps)}>
          📤 {t(texts.otherApps)}
        </BigButton>
      </div>
    </section>
  );
}
