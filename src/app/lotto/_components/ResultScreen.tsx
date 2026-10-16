"use client";

// 결과 화면
// - 게임마다 공 6개를 큰 원으로 보여 주고, 각 번호 옆에 "역대 n회 출현" 근거를 한 줄씩 적는다
// - 아래에 다시 뽑기 / 5게임 한 번에 뽑기 / 번호 복사 / 공유 버튼 / 광고 / 추천 테스트

import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { useLanguage } from "@/context/LanguageContext";
import {
  countOf,
  frequencyTag,
  hasLottoStats,
  LOTTO_BASE_DATE,
  LOTTO_BASE_ROUND,
  LOTTO_LAST_SEEN,
  todayKey,
  type LottoMethod,
} from "@/data/lotto";
import { copyToClipboard } from "@/lib/share";
import LottoBall from "./LottoBall";
import ShareButtons from "./ShareButtons";
import { fill, methodTexts, tagTexts, texts } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface ResultScreenProps {
  games: number[][];
  method: LottoMethod;
  /** 나의 운 번호일 때 입력한 이름 (근거 문구용) */
  name: string;
  /** 공유받은 번호를 보는 중인지 */
  isSharedView: boolean;
  /** 공유용 주소 (번호가 들어 있음) */
  shareUrl: string;
  onRedraw: () => void;
  onDrawFive: () => void;
  onBack: () => void;
  onToast: (message: string) => void;
}

/** 번호 한 줄의 근거 문구: "역대 171회 출현 · 많이 나온 편 · 마지막 1244회" */
function reasonLine(n: number, t: (x: { ko: string; en: string; zh: string; ja: string }) => string): string {
  if (!hasLottoStats) return t(texts.reasonNoStats);
  const count = countOf(n);
  if (count === 0) return t(texts.reasonNever);
  const parts = [fill(t(texts.reasonCount), { n: count }), t(tagTexts[frequencyTag(n)])];
  const last = LOTTO_LAST_SEEN[n];
  if (last) parts.push(fill(t(texts.reasonLast), { round: last }));
  return parts.join(" · ");
}

export default function ResultScreen({
  games,
  method,
  name,
  isSharedView,
  shareUrl,
  onRedraw,
  onDrawFive,
  onBack,
  onToast,
}: ResultScreenProps) {
  const { t } = useLanguage();
  const m = methodTexts[method];
  const multi = games.length > 1;

  /** 번호 복사용 글: 한 줄에 게임 하나 */
  const numbersText = games.map((g) => g.join(", ")).join("\n");

  const handleCopyNumbers = async () => {
    const ok = await copyToClipboard(numbersText);
    onToast(ok ? t(texts.numbersCopied) : t(texts.copyFailedToast));
  };

  /** 방식별 보조 근거 (분배 조합은 합계·홀짝, 운 번호는 이름·날짜) */
  const extraReason = (game: number[]): string | null => {
    if (method === "balanced") {
      const odd = game.filter((n) => n % 2 === 1).length;
      const sum = game.reduce((a, b) => a + b, 0);
      return `${fill(t(texts.balancedOddEven), { odd, even: 6 - odd })} · ${fill(t(texts.balancedSum), { sum })}`;
    }
    if (method === "lucky") {
      return fill(t(texts.luckyBasis), { name: name.trim() || t(texts.luckyAnonymous), date: todayKey() });
    }
    return null;
  };

  return (
    <main className={cls.page}>
      <div className={cls.container}>
        <div className="mb-6">
          <BackButton label={t(texts.back)} onClick={onBack} />
        </div>

        <header className="text-center mb-6">
          {isSharedView && <p className={`${cls.accent} text-[20px] font-bold mb-2`}>{t(texts.sharedView)}</p>}
          <h1 className={cls.h1}>{t(texts.resultHeading)}</h1>
          <p className={`${cls.body} mt-2`}>
            <span className={cls.muted}>{t(texts.methodLabel)}: </span>
            <span aria-hidden="true">{m.emoji} </span>
            <span className="font-bold">{t(m.name)}</span>
          </p>
        </header>

        {/* 게임별 번호 */}
        <div className="space-y-5">
          {games.map((game, gi) => {
            const extra = extraReason(game);
            return (
              <section key={gi} className={`${cls.card} p-5 animate-fade-in`} aria-label={multi ? fill(t(texts.gameLabel), { n: gi + 1 }) : t(texts.resultHeading)}>
                {multi && <h2 className={`${cls.h2} mb-3`}>{fill(t(texts.gameLabel), { n: gi + 1 })}</h2>}

                {/* 공 6개 */}
                <ol className="grid grid-cols-6 gap-1 sm:gap-2 justify-items-center" aria-label={game.join(", ")}>
                  {game.map((n) => (
                    <li key={n} className="w-full flex justify-center">
                      <LottoBall number={n} size={multi ? "md" : "lg"} />
                    </li>
                  ))}
                </ol>

                {extra && <p className={`${cls.body} text-center mt-4 font-bold`}>{extra}</p>}

                {/* 번호마다 근거 한 줄 (5게임일 때는 접어 둔다) */}
                {multi ? (
                  <details className="mt-4">
                    <summary className={`${cls.body} font-bold cursor-pointer min-h-[48px] flex items-center ${cls.focus} rounded-xl px-2`}>
                      {t(texts.reasonHeading)}
                    </summary>
                    <ReasonList game={game} reason={(n) => reasonLine(n, t)} />
                  </details>
                ) : (
                  <div className="mt-5">
                    <h2 className={`${cls.body} font-bold mb-2`}>{t(texts.reasonHeading)}</h2>
                    <ReasonList game={game} reason={(n) => reasonLine(n, t)} />
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* 자료 기준 */}
        <p className={`${cls.muted} text-center mt-5`}>
          {hasLottoStats ? fill(t(texts.statsBasis), { round: LOTTO_BASE_ROUND, date: LOTTO_BASE_DATE }) : t(texts.statsMissing)}
        </p>

        {/* 다시 뽑기 / 5게임 / 번호 복사 */}
        <div className="mt-6 space-y-3">
          {isSharedView ? (
            <BigButton onClick={onBack} aria-label={t(texts.drawMine)} className="min-h-[72px] text-[24px]">
              🎱 {t(texts.drawMine)}
            </BigButton>
          ) : (
            <>
              <BigButton onClick={onRedraw} aria-label={t(texts.redraw)} className="min-h-[72px] text-[24px]">
                🔄 {t(texts.redraw)}
              </BigButton>
              <BigButton variant="secondary" onClick={onDrawFive} aria-label={t(texts.drawFive)}>
                🖐️ {t(texts.drawFive)}
              </BigButton>
            </>
          )}
          <BigButton variant="secondary" onClick={() => void handleCopyNumbers()} aria-label={t(texts.copyNumbers)}>
            📋 {t(texts.copyNumbers)}
          </BigButton>
        </div>

        {/* 공유 */}
        <div className="mt-10">
          <ShareButtons shareTitle={t(texts.shareTitle)} shareDescription={numbersText.split("\n").join(" / ")} shareUrl={shareUrl} onToast={onToast} />
        </div>

        <p className={`${cls.muted} text-center mt-8`}>{t(texts.disclaimer)}</p>

        {/* 광고 */}
        <div className="mt-8">
          <AdUnit slot="default" format="auto" />
        </div>

        {/* 다른 테스트 추천 */}
        <div className="mt-10">
          <RecommendedTests currentTestId="lotto" />
        </div>
      </div>
    </main>
  );
}

interface ReasonListProps {
  game: number[];
  reason: (n: number) => string;
}

/** 번호 + 근거 한 줄 목록 */
function ReasonList({ game, reason }: ReasonListProps) {
  return (
    <ul className="space-y-2 mt-2">
      {game.map((n) => (
        <li key={n} className={`${cls.innerBox} flex items-center gap-3 px-3 py-2`}>
          <LottoBall number={n} size="md" className="w-11 h-11 max-w-none text-[20px] shadow-none" />
          <span className={cls.muted}>{reason(n)}</span>
        </li>
      ))}
    </ul>
  );
}
