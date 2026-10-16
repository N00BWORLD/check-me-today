"use client";

// 관상 보기 시작 화면: 큰 제목 + 안내 3줄 + 시작 버튼(크게) + 사진으로 보기(보조)

import { useLanguage } from "@/context/LanguageContext";
import { texts } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface StartScreenProps {
  onStart: () => void;
  onPhoto: () => void;
}

export default function StartScreen({ onStart, onPhoto }: StartScreenProps) {
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

        {/* 제목 영역 */}
        <header className="text-center mb-8">
          <p className={`${cls.accent} text-[18px] tracking-[0.4em] font-serif mb-3`} aria-hidden="true">
            觀相
          </p>
          <div
            className="w-28 h-28 mx-auto mb-5 rounded-2xl ink-stamp flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-[64px] leading-none">🔮</span>
          </div>
          <h1 className={cls.h1}>{t(texts.title)}</h1>
          <p className={`${cls.body} mt-3`}>{t(texts.subtitle)}</p>
        </header>

        {/* 안내 카드 */}
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

        {/* 시작 버튼 */}
        <div className="space-y-4">
          <BigButton onClick={onStart} aria-label={t(texts.startButton)} className="text-[24px] min-h-[72px]">
            {t(texts.startButton)} →
          </BigButton>
          <BigButton variant="secondary" onClick={onPhoto} aria-label={t(texts.photoButton)}>
            <span className="block">📷 {t(texts.photoButton)}</span>
            <span className="block text-[16px] font-normal text-stone-700 dark:text-stone-300 mt-1">
              {t(texts.photoButtonSub)}
            </span>
          </BigButton>
        </div>

        <p className={`${cls.muted} text-center mt-8`}>{t(texts.disclaimer)}</p>
      </div>
    </main>
  );
}
