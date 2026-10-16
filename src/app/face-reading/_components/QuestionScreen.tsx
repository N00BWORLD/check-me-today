"use client";

// 질문 화면: 한 화면에 부위 하나. "3 / 6 단계" 큰 숫자 + 진행 막대 + 세로 1열 선택 카드 + 이전/다음 버튼
// - 자동 넘김 없음: 선택 후 "다음"을 눌러야 넘어간다 (잘못 눌러도 바로 고칠 수 있게)
// - 선택 상태는 두꺼운 테두리 + ✓ 글자로 표시해 색만으로 구분하지 않는다

import { useLanguage } from "@/context/LanguageContext";
import { faceFeatures } from "@/data/face-reading";
import { featureHanja, texts } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface QuestionScreenProps {
  stepIndex: number;
  selections: Record<string, string>;
  onSelect: (featureId: string, optionId: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function QuestionScreen({ stepIndex, selections, onSelect, onPrev, onNext }: QuestionScreenProps) {
  const { t } = useLanguage();
  const feature = faceFeatures[stepIndex];
  const total = faceFeatures.length;
  const isLast = stepIndex === total - 1;
  const selected = selections[feature.id];
  const percent = Math.round(((stepIndex + 1) / total) * 100);

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        {/* 머리: 뒤로 + 단계 표시 */}
        <div className="flex items-center justify-between mb-5">
          <BackButton label={t(texts.prev)} onClick={onPrev} />
          <p className="text-right" aria-live="polite">
            <span className="text-[34px] font-bold text-stone-900 dark:text-stone-50 leading-none">{stepIndex + 1}</span>
            <span className="text-[22px] text-stone-700 dark:text-stone-300 font-bold"> / {total} </span>
            <span className="text-[20px] text-stone-700 dark:text-stone-300">{t(texts.step)}</span>
          </p>
        </div>

        {/* 진행 막대 */}
        <div
          className="h-4 bg-[#e3d8c2] dark:bg-[#4a3f31] rounded-full overflow-hidden mb-8"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={stepIndex + 1}
          aria-label={`${stepIndex + 1} / ${total} ${t(texts.step)}`}
        >
          {/* 진행 폭은 단계마다 달라지는 값이라 인라인 style 로 지정한다 */}
          <div className="h-full ink-progress rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
        </div>

        {/* 질문 */}
        <section className={`${cls.card} p-6 mb-6 animate-fade-in`} key={feature.id}>
          <header className="text-center mb-6">
            <p className={`${cls.accent} text-[20px] font-serif tracking-[0.3em]`} aria-hidden="true">
              {featureHanja[feature.id]}
            </p>
            <h1 className={`${cls.h1} mt-1`}>{t(feature.name)}</h1>
            <p className={`${cls.muted} mt-3`}>{t(feature.description)}</p>
            <p className={`${cls.body} font-bold mt-4`}>{t(texts.chooseOne)}</p>
          </header>

          {/* 선택지 */}
          <div role="radiogroup" aria-label={t(feature.name)} className="space-y-4">
            {feature.options.map((option) => {
              const isSelected = selected === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelect(feature.id, option.id)}
                  className={`w-full min-h-[88px] text-left rounded-2xl px-4 py-4 flex items-center gap-4 transition-colors duration-200 ${cls.focus} ${
                    isSelected
                      ? "bg-[#fdeaea] dark:bg-[#4a2a2a] border-4 border-[#8b1a1a] dark:border-[#e2c17a]"
                      : "bg-white dark:bg-[#352d24] border-2 border-stone-400 dark:border-stone-500 hover:border-[#8b1a1a] dark:hover:border-[#e2c17a]"
                  }`}
                >
                  <span
                    className="w-16 h-16 shrink-0 rounded-full bg-[#f6efe0] dark:bg-[#1f1a14] flex items-center justify-center text-[36px] leading-none"
                    aria-hidden="true"
                  >
                    {option.emoji}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[22px] font-bold text-stone-900 dark:text-stone-50 leading-snug break-keep">
                      {t(option.label)}
                    </span>
                    <span className="block text-[18px] text-stone-700 dark:text-stone-300 leading-snug mt-1 break-keep">
                      {t(option.description)}
                    </span>
                  </span>
                  {isSelected && (
                    <span className="shrink-0 text-[18px] font-bold text-[#8b1a1a] dark:text-[#e2c17a] flex flex-col items-center leading-none">
                      <span className="text-[28px]" aria-hidden="true">
                        ✓
                      </span>
                      <span className="mt-1">{t(texts.selectedMark)}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 이전 / 다음 */}
        <div className="grid grid-cols-[1fr_2fr] gap-3">
          <BigButton variant="secondary" onClick={onPrev} aria-label={t(texts.prev)}>
            ← {t(texts.prev)}
          </BigButton>
          <BigButton onClick={onNext} disabled={!selected} aria-label={isLast ? t(texts.seeResult) : t(texts.next)}>
            {isLast ? t(texts.seeResult) : t(texts.next)} →
          </BigButton>
        </div>
        {!selected && <p className={`${cls.muted} text-center mt-4`}>{t(texts.pickFirst)}</p>}
      </div>
    </main>
  );
}
