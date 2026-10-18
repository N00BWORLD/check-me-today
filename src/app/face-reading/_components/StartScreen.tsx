"use client";

// 관상 보기 시작 화면
// - 저장된 관상 결과가 있으면 맨 위에 "오늘의 관상 운세 보기" 큰 버튼을 먼저 보여 준다 (매일 다시 오는 입구)
// - 없으면 큰 제목 + 안내 3줄 + 시작 버튼(크게) + 사진으로 보기(보조)

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FACE_GUIDE_PATH, faceGuideTexts } from "@/data/face-reading-guide";
import type { FaceReadingResult } from "@/data/face-reading";
import { texts } from "./texts";
import { BackButton, BigButton, cls, TypeImage } from "./ui";

interface StartScreenProps {
  /** 기기에 저장된 지난 결과 (없으면 null) */
  saved: FaceReadingResult | null;
  onStart: () => void;
  onPhoto: () => void;
  onDaily: () => void;
}

export default function StartScreen({ saved, onStart, onPhoto, onDaily }: StartScreenProps) {
  const { t } = useLanguage();

  const points = [
    { emoji: "👀", text: t(texts.startPoint1) },
    { emoji: "🔍", text: t(texts.startPoint2) },
    { emoji: "⏱️", text: t(texts.startPoint3) },
  ];

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="mb-6">
          <BackButton label={t(texts.home)} href="/" />
        </div>

        {/* 저장된 결과가 있으면: 오늘의 관상 운세 입구 */}
        {saved && (
          <section className={`${cls.card} overflow-hidden mb-8 animate-fade-in`} aria-label={t(texts.dailyTitle)}>
            <div className="ink-header px-5 py-4 text-center">
              <p className="text-[#e2c17a] text-[18px] tracking-[0.3em] font-serif" aria-hidden="true">
                今日
              </p>
              <h2 className="text-[26px] font-bold text-[#fbf7ee] font-serif leading-tight">{t(texts.dailyTitle)}</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-5">
                <TypeImage id={saved.id} emoji={saved.emoji} alt="" size={80} className="w-20 h-20 my-0 rounded-2xl border-2" />
                <div className="min-w-0">
                  <p className={cls.muted}>{t(texts.yourFace)}</p>
                  <p className="text-[26px] font-bold text-stone-900 dark:text-stone-50 font-serif leading-tight">{t(saved.type)}</p>
                </div>
              </div>
              <BigButton onClick={onDaily} aria-label={t(texts.dailyButton)} className="min-h-[72px] text-[24px]">
                🌅 {t(texts.dailyButton)}
              </BigButton>
              <p className={`${cls.muted} text-center mt-3`}>{t(texts.dailyHint)}</p>
            </div>
          </section>
        )}

        {/* 제목 영역 */}
        <header className="text-center mb-8">
          <p className={`${cls.accent} text-[18px] tracking-[0.4em] font-serif mb-3`} aria-hidden="true">
            觀相
          </p>
          {!saved && (
            <div className="w-28 h-28 mx-auto mb-5 rounded-2xl ink-stamp flex items-center justify-center" aria-hidden="true">
              <span className="text-[64px] leading-none">🔮</span>
            </div>
          )}
          <h1 className={cls.h1}>{saved ? t(texts.retakeHeading) : t(texts.title)}</h1>
          <p className={`${cls.body} mt-3`}>{t(texts.subtitle)}</p>
        </header>

        {/* 안내 카드 (처음 온 사람에게만) */}
        {!saved && (
          <section className={`${cls.card} p-6 mb-8`} aria-label={t(texts.startHeading)}>
            <p className={`${cls.h2} mb-5`}>
              {t(texts.startHeading)}
              <br />
              {t(texts.startHeading2)}
            </p>
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p.text} className="flex items-start gap-4">
                  <span className="text-[32px] leading-none shrink-0" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <span className={cls.body}>{p.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 시작 버튼 */}
        <div className="space-y-4">
          <BigButton
            variant={saved ? "secondary" : "primary"}
            onClick={onStart}
            aria-label={t(texts.startButton)}
            className={saved ? "" : "text-[24px] min-h-[72px]"}
          >
            {saved ? "🔄 " : ""}
            {saved ? t(texts.retakeButton) : t(texts.startButton)} →
          </BigButton>
          <BigButton variant="secondary" onClick={onPhoto} aria-label={t(texts.photoButton)}>
            <span className="block">📷 {t(texts.photoButton)}</span>
            <span className="block text-[16px] font-normal text-stone-700 dark:text-stone-300 mt-1">{t(texts.photoButtonSub)}</span>
          </BigButton>
        </div>

        {!saved && <p className={`${cls.body} text-center mt-6`}>🌅 {t(texts.dailyPromise)}</p>}

        {/* 부위별 관상 가이드·유형 30종 허브로 가는 링크 (검색 유입 콘텐츠 클러스터) */}
        <p className="text-center mt-8">
          <Link href={FACE_GUIDE_PATH} className={`${cls.muted} ${cls.accent} underline underline-offset-4 ${cls.focus}`}>
            📖 {t(faceGuideTexts.landingLink)} →
          </Link>
        </p>

        <p className={`${cls.muted} text-center mt-8`}>{t(texts.disclaimer)}</p>
      </div>
    </main>
  );
}
