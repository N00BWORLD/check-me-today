"use client";

// 출현 횟수 자료의 기준(회차·날짜·출처) 한 줄. 자료가 없는 게임은 빈도 방식을 제공하지 않는 이유를 보여 준다.

import { useLanguage } from "@/context/LanguageContext";
import type { LottoGame } from "@/data/lotto";
import { fill, texts } from "./texts";
import { cls } from "./ui";

export function StatsBasis({ game }: { game: LottoGame }) {
  const { t } = useLanguage();
  const s = game.stats;
  let line: string;
  if (!s) {
    line = t(texts.statsMissing);
  } else if (s.baseRound !== null) {
    line = fill(t(texts.statsBasisRound), { round: s.baseRound, date: s.baseDate, source: s.source });
  } else {
    line = fill(t(texts.statsBasisDate), { since: s.sinceDate, date: s.baseDate, count: s.drawCount, source: s.source });
  }
  return <p className={`${cls.muted} text-center`}>{line}</p>;
}
