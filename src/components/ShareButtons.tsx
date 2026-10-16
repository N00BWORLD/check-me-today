"use client";

// 공용 공유 버튼 묶음: 카카오톡 · 링크 복사 · 기기 공유(navigator.share)
// 결과 화면 어디서든 <ShareButtons title=... description=... emoji=... /> 한 줄로 붙일 수 있다.
// - 카카오톡: Kakao SDK 피드 메시지(이미지는 /api/og 로 자동 생성). 키/SDK가 없으면 링크 복사로 폴백
// - 기기 공유: navigator.share 가 없으면 링크 복사로 폴백
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { shareKakaoFeed } from "@/lib/kakao";
import { copyToClipboard } from "@/lib/share";

interface ShareButtonsProps {
    /** 공유 메시지 제목 (예: "반응속도 183ms · 프로게이머") */
    title: string;
    /** 공유 메시지 본문 한 줄 */
    description: string;
    /** OG 이미지에 넣을 이모지 */
    emoji: string;
    /** 공유할 주소. 생략하면 현재 페이지 */
    url?: string;
    className?: string;
}

const texts = {
    kakao: { ko: "카톡", en: "Kakao", zh: "Kakao", ja: "カカオ" },
    copy: { ko: "링크 복사", en: "Copy link", zh: "复制链接", ja: "リンクをコピー" },
    copied: { ko: "복사됨!", en: "Copied!", zh: "已复制!", ja: "コピー完了!" },
    share: { ko: "공유", en: "Share", zh: "分享", ja: "共有" },
    viewResult: { ko: "결과 보기", en: "View result", zh: "查看结果", ja: "結果を見る" },
};

export default function ShareButtons({ title, description, emoji, url, className = "" }: ShareButtonsProps) {
    const { lang } = useLanguage();
    const t = (key: keyof typeof texts) => texts[key][lang] || texts[key].en;
    const [copied, setCopied] = useState(false);

    const shareUrl = () => url ?? (typeof window !== "undefined" ? window.location.href : "");

    const handleCopy = async () => {
        if (!(await copyToClipboard(shareUrl()))) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleKakao = () => {
        const sent = shareKakaoFeed({
            title,
            description,
            emoji,
            link: shareUrl(),
            buttonTitle: t("viewResult"),
        });
        if (!sent) handleCopy();
    };

    const handleNative = async () => {
        if (!navigator.share) return handleCopy();
        try {
            await navigator.share({ title, text: `${title}\n${description}`, url: shareUrl() });
        } catch {
            // 사용자가 공유 시트를 닫은 경우 등 → 무시
        }
    };

    const base = "flex-1 py-3 px-2 rounded-xl text-center text-sm font-bold transition-transform active:scale-95";

    return (
        <div className={`grid grid-cols-3 gap-2 ${className}`}>
            <button onClick={handleKakao} className={`${base} bg-[#FEE500] text-[#191919] shadow`}>
                💬 {t("kakao")}
            </button>
            <button onClick={handleCopy} className={`${base} glass dark:bg-slate-700/70 text-slate-700 dark:text-slate-200`}>
                {copied ? `✅ ${t("copied")}` : `🔗 ${t("copy")}`}
            </button>
            <button onClick={handleNative} className={`${base} bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow`}>
                📤 {t("share")}
            </button>
        </div>
    );
}
