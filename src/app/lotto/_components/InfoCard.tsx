"use client";

// 게임별 "알아 두면 좋은 복권 정보" 카드 (큰 글자, 항목별 짧은 문장)
// - 내용은 src/data/lotto-info.ts. 항목이 없으면 카드를 그리지 않는다.
// - 세금·법률 내용은 참고용이므로 확인 날짜와 면책 문구를 함께 보여 준다.

import { useLanguage } from "@/context/LanguageContext";
import { LOTTO_INFO } from "@/data/lotto-info";
import type { LottoGameId } from "@/data/lotto";
import { gameTexts, texts } from "./texts";
import { cls } from "./ui";

export default function InfoCard({ gameId }: { gameId: LottoGameId }) {
  const { t } = useLanguage();
  const info = LOTTO_INFO[gameId];
  if (info.items.length === 0) return null;

  return (
    <section className={`${cls.card} p-5`} aria-labelledby="lotto-info-heading">
      <h2 id="lotto-info-heading" className={`${cls.h2} text-center mb-1`}>
        {t(texts.infoHeading)}
      </h2>
      <p className={`${cls.muted} text-center mb-5`}>
        <span aria-hidden="true">{gameTexts[gameId].flag} </span>
        {t(gameTexts[gameId].name)} · {t(info.verifiedAt)}
      </p>
      <dl className="space-y-4">
        {info.items.map((item) => (
          <div key={item.label.ko} className={`${cls.innerBox} px-4 py-3`}>
            <dt className={`${cls.body} font-bold flex items-center gap-2`}>
              <span aria-hidden="true">{item.emoji}</span>
              <span>{t(item.label)}</span>
            </dt>
            <dd className={`${cls.body} mt-1`}>{t(item.value)}</dd>
          </div>
        ))}
      </dl>
      <p className={`${cls.muted} mt-5`}>{t(texts.infoDisclaimer)}</p>
    </section>
  );
}
