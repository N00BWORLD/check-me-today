"use client";

// 추첨 방식 고르기 화면
// - 방식 5가지를 세로 1열 큰 카드 버튼으로 보여 준다 (그림 + 이름 + 한 줄 설명). 누르면 바로 뽑는다.
// - "나의 운 번호"는 이름·생년월일을 적을 수 있도록 카드 아래에 입력칸이 펼쳐진다 (둘 다 안 써도 됨).

import { useId, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { hasLottoStats, LOTTO_BASE_DATE, LOTTO_BASE_ROUND, LOTTO_METHODS, type LottoMethod } from "@/data/lotto";
import { fill, methodTexts, texts } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface MethodScreenProps {
  name: string;
  birth: string;
  onNameChange: (v: string) => void;
  onBirthChange: (v: string) => void;
  onDraw: (method: LottoMethod) => void;
}

export default function MethodScreen({ name, birth, onNameChange, onBirthChange, onDraw }: MethodScreenProps) {
  const { t } = useLanguage();
  const [luckyOpen, setLuckyOpen] = useState(false);
  const nameId = useId();
  const birthId = useId();

  const handlePick = (method: LottoMethod) => {
    if (method === "lucky") {
      setLuckyOpen((open) => !open);
      return;
    }
    onDraw(method);
  };

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="mb-6">
          <BackButton label={t(texts.home)} href="/" />
        </div>

        {/* 제목 영역 */}
        <header className="text-center mb-8">
          <div className="w-28 h-28 mx-auto mb-5 rounded-2xl ink-stamp flex items-center justify-center" aria-hidden="true">
            <span className="text-[64px] leading-none">🎱</span>
          </div>
          <h1 className={cls.h1}>{t(texts.title)}</h1>
          <p className={`${cls.body} mt-3`}>{t(texts.subtitle)}</p>
        </header>

        {/* 방식 목록 */}
        <section aria-labelledby="lotto-method-heading">
          <h2 id="lotto-method-heading" className={`${cls.h2} text-center mb-2`}>
            {t(texts.chooseMethod)}
          </h2>
          <p className={`${cls.muted} text-center mb-5`}>{t(texts.chooseHint)}</p>

          <ul className="space-y-4">
            {LOTTO_METHODS.map((method) => {
              const m = methodTexts[method];
              const isLucky = method === "lucky";
              return (
                <li key={method}>
                  <button
                    type="button"
                    onClick={() => handlePick(method)}
                    aria-label={t(m.name)}
                    aria-expanded={isLucky ? luckyOpen : undefined}
                    className={`w-full text-left ${cls.card} p-5 min-h-[96px] flex items-center gap-4 hover:border-[#8b1a1a] dark:hover:border-[#e2c17a] active:bg-[#f6efe0] dark:active:bg-[#1f1a14] transition-colors ${cls.focus} ${
                      isLucky && luckyOpen ? "border-[#8b1a1a] dark:border-[#e2c17a]" : ""
                    }`}
                  >
                    <span className="text-[44px] leading-none shrink-0" aria-hidden="true">
                      {m.emoji}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[24px] font-bold leading-snug text-stone-900 dark:text-stone-50 break-keep">{t(m.name)}</span>
                      <span className={`block mt-1 ${cls.muted}`}>{t(m.desc)}</span>
                    </span>
                  </button>

                  {/* 나의 운 번호: 이름·생년월일 입력 */}
                  {isLucky && luckyOpen && (
                    <div className={`${cls.innerBox} mt-3 p-5 animate-fade-in`}>
                      <label htmlFor={nameId} className={`block ${cls.body} font-bold mb-2`}>
                        {t(texts.luckyName)}
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder={t(texts.luckyNamePlaceholder)}
                        autoComplete="name"
                        maxLength={30}
                        className={`${cls.input} ${cls.focus} mb-5`}
                      />
                      <label htmlFor={birthId} className={`block ${cls.body} font-bold mb-2`}>
                        {t(texts.luckyBirth)}
                      </label>
                      <input
                        id={birthId}
                        type="text"
                        inputMode="numeric"
                        value={birth}
                        onChange={(e) => onBirthChange(e.target.value)}
                        placeholder={t(texts.luckyBirthPlaceholder)}
                        autoComplete="bday"
                        maxLength={10}
                        className={`${cls.input} ${cls.focus} mb-3`}
                      />
                      <p className={`${cls.muted} mb-5`}>{t(texts.luckyNote)}</p>
                      <BigButton onClick={() => onDraw("lucky")} aria-label={t(texts.luckyDraw)}>
                        🍀 {t(texts.luckyDraw)}
                      </BigButton>
                      <BigButton variant="ghost" compact onClick={() => setLuckyOpen(false)} aria-label={t(texts.cancel)} className="mt-2">
                        {t(texts.cancel)}
                      </BigButton>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* 자료 기준·면책 */}
        <footer className="mt-8 space-y-3">
          <p className={`${cls.muted} text-center`}>
            {hasLottoStats ? fill(t(texts.statsBasis), { round: LOTTO_BASE_ROUND, date: LOTTO_BASE_DATE }) : t(texts.statsMissing)}
          </p>
          <p className={`${cls.muted} text-center`}>{t(texts.disclaimer)}</p>
        </footer>
      </div>
    </main>
  );
}
