"use client";

// 사진으로 관상 보기 화면: 사진첩에서 고르기 / 지금 찍기 두 개의 큰 버튼 + 안내
// - 사진은 브라우저 안에서만 처리된다는 안내를 눈에 띄게 보여 준다
// - 얼굴을 못 찾았을 때의 안내문은 alert 대신 화면 안에 크게 보여 준다

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface PhotoScreenProps {
  /** 얼굴을 못 찾았거나 오류가 난 경우의 안내 문구 (없으면 null) */
  errorKey: "noFace" | "photoError" | null;
  onFileSelected: (file: File) => void;
  onManual: () => void;
  onBack: () => void;
  /** 화면에 들어오면 모델을 미리 받아 두기 위한 콜백 */
  onEnter: () => void;
}

export default function PhotoScreen({ errorKey, onFileSelected, onManual, onBack, onEnter }: PhotoScreenProps) {
  const { t } = useLanguage();
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onEnter();
  }, [onEnter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // 같은 파일을 다시 골라도 change 가 나도록 값을 비운다
    event.target.value = "";
    if (file) onFileSelected(file);
  };

  const tips = [t(texts.tip1), t(texts.tip2), t(texts.tip3)];

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="mb-6">
          <BackButton label={t(texts.back)} onClick={onBack} />
        </div>

        <header className="text-center mb-6">
          <p className={`${cls.accent} text-[18px] tracking-[0.4em] font-serif mb-2`} aria-hidden="true">
            面相
          </p>
          <h1 className={cls.h1}>{t(texts.photoTitle)}</h1>
          <p className={`${cls.body} mt-3`}>{t(texts.photoDesc)}</p>
        </header>

        {/* 오류 안내 */}
        {errorKey && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border-4 border-[#8b1a1a] bg-[#fdeaea] dark:bg-[#4a2a2a] px-5 py-4 text-[20px] font-bold text-stone-900 dark:text-stone-50 break-keep"
          >
            ⚠️ {t(texts[errorKey])}
          </div>
        )}

        {/* 사진 고르기 */}
        <section className={`${cls.card} p-6 mb-6`}>
          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-4 border-dashed border-stone-500 dark:border-stone-400 flex items-center justify-center" aria-hidden="true">
            <span className="text-[56px] leading-none">🙂</span>
          </div>

          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" aria-hidden="true" tabIndex={-1} />
          <input ref={cameraInputRef} type="file" accept="image/*" capture="user" onChange={handleChange} className="hidden" aria-hidden="true" tabIndex={-1} />

          <div className="space-y-4">
            <BigButton onClick={() => galleryInputRef.current?.click()} aria-label={t(texts.pickPhoto)}>
              🖼️ {t(texts.pickPhoto)}
            </BigButton>
            <BigButton variant="secondary" onClick={() => cameraInputRef.current?.click()} aria-label={t(texts.takePhoto)}>
              📷 {t(texts.takePhoto)}
            </BigButton>
          </div>

          <p className={`${cls.body} font-bold text-center mt-6`}>🔒 {t(texts.privacyNote)}</p>
        </section>

        {/* 촬영 팁 */}
        <section className={`${cls.innerBox} p-5 mb-8`} aria-label={t(texts.tipTitle)}>
          <h2 className={`${cls.h2} text-[22px] mb-3`}>💡 {t(texts.tipTitle)}</h2>
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip} className={`${cls.body} flex gap-2`}>
                <span aria-hidden="true">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <BigButton variant="ghost" onClick={onManual} aria-label={t(texts.manualInstead)} className="underline underline-offset-4">
          ✍️ {t(texts.manualInstead)}
        </BigButton>
      </div>
    </main>
  );
}
