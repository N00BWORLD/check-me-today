"use client";

// 결과 화면
// - 줄(게임)마다 본번호 공을 큰 원으로, 보조 공(파워볼·메가볼·蓝球)은 "+" 뒤에 다른 색으로 보여 준다
// - 각 번호 옆에 "역대 n회 출현" 근거를 한 줄씩 적는다 (자료가 있는 게임만)
// - 아래에 다시 뽑기 / 5게임 한 번에 뽑기 / 번호 복사 / 공유 / 복권 정보 카드 / 광고 / 추천 테스트

import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { useLanguage } from "@/context/LanguageContext";
import {
  balancedSumRange,
  countOf,
  frequencyTag,
  lineToText,
  todayKey,
  type LottoGame,
  type LottoLine,
  type LottoMethod,
} from "@/data/lotto";
import { copyToClipboard } from "@/lib/share";
import InfoCard from "./InfoCard";
import LottoBall from "./LottoBall";
import ShareButtons from "./ShareButtons";
import { StatsBasis } from "./StatsBasis";
import { fill, gameTexts, methodTexts, tagTexts, texts, type LocalizedText } from "./texts";
import { BackButton, BigButton, cls } from "./ui";

interface ResultScreenProps {
  game: LottoGame;
  lines: LottoLine[];
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

type T = (x: LocalizedText) => string;

/** 공 개수(보조 공이 있으면 "+" 칸까지)에 맞는 격자 열 클래스. Tailwind 가 클래스를 찾을 수 있도록 글자 그대로 둔다 */
function gridCols(n: number): string {
  switch (n) {
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    default:
      return "grid-cols-8";
  }
}

/** 번호 한 줄의 근거 문구: "역대 171회 출현 · 많이 나온 편 · 마지막 1244회" */
function reasonLine(game: LottoGame, n: number, t: T): string {
  const s = game.stats;
  if (!s) return t(texts.reasonNoStats);
  const count = countOf(game, n);
  if (count === 0) return t(texts.reasonNever);
  const parts = [fill(t(texts.reasonCount), { n: count }), t(tagTexts[frequencyTag(game, n)])];
  if (s.lastRound) parts.push(fill(t(texts.reasonLast), { round: s.lastRound[n] }));
  else if (s.lastDate[n]) parts.push(fill(t(texts.reasonLastDate), { date: s.lastDate[n] }));
  return parts.join(" · ");
}

export default function ResultScreen({
  game,
  lines,
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
  const gameText = gameTexts[game.id];
  const multi = lines.length > 1;
  const extraName = gameText.extraName ? t(gameText.extraName) : "";

  /** 번호 복사용 글: 한 줄에 게임 하나 */
  const numbersText = lines.map(lineToText).join("\n");

  const handleCopyNumbers = async () => {
    const ok = await copyToClipboard(numbersText);
    onToast(ok ? t(texts.numbersCopied) : t(texts.copyFailedToast));
  };

  /** 방식별 보조 근거 (분배 조합은 합계·홀짝, 운 번호는 이름·날짜) */
  const extraReason = (line: LottoLine): string | null => {
    if (method === "balanced") {
      const odd = line.main.filter((n) => n % 2 === 1).length;
      const sum = line.main.reduce((a, b) => a + b, 0);
      const [lo, hi] = balancedSumRange(game);
      return `${fill(t(texts.balancedOddEven), { odd, even: game.pick - odd })} · ${fill(t(texts.balancedSum), { sum })} (${lo}~${hi})`;
    }
    if (method === "lucky") {
      return fill(t(texts.luckyBasis), { name: name.trim() || t(texts.luckyAnonymous), date: todayKey() });
    }
    return null;
  };

  const ballSize = multi ? "md" : "lg";

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
            <span aria-hidden="true">{gameText.flag} </span>
            <span className="font-bold">{t(gameText.name)}</span>
          </p>
          <p className={`${cls.body} mt-1`}>
            <span className={cls.muted}>{t(texts.methodLabel)}: </span>
            <span aria-hidden="true">{m.emoji} </span>
            <span className="font-bold">{t(m.name)}</span>
          </p>
        </header>

        {/* 줄별 번호 */}
        <div className="space-y-5">
          {lines.map((line, li) => {
            const extra = extraReason(line);
            const label = multi ? fill(t(texts.gameLabel), { n: li + 1 }) : t(texts.resultHeading);
            return (
              <section key={li} className={`${cls.card} p-5 animate-fade-in`} aria-label={label}>
                {multi && <h2 className={`${cls.h2} mb-3`}>{label}</h2>}

                {/* 본번호 공 (+ 보조 공) */}
                <ol className={`grid gap-1 sm:gap-2 justify-items-center items-center ${gridCols(game.pick + (line.extra !== undefined ? 2 : 0))}`} aria-label={lineToText(line)}>
                  {line.main.map((n) => (
                    <li key={n} className="w-full flex justify-center">
                      <LottoBall number={n} scheme={game.scheme} size={ballSize} />
                    </li>
                  ))}
                  {line.extra !== undefined && (
                    <>
                      <li className="w-full flex justify-center text-[28px] font-bold text-stone-700 dark:text-stone-300" aria-hidden="true">
                        +
                      </li>
                      <li className="w-full flex justify-center">
                        <LottoBall number={line.extra} scheme={game.scheme} extra size={ballSize} />
                      </li>
                    </>
                  )}
                </ol>

                {extra && <p className={`${cls.body} text-center mt-4 font-bold`}>{extra}</p>}

                {/* 번호마다 근거 한 줄 (자료가 있는 게임만. 5게임일 때는 접어 둔다) */}
                {game.stats &&
                  (multi ? (
                    <details className="mt-4">
                      <summary className={`${cls.body} font-bold cursor-pointer min-h-[48px] flex items-center ${cls.focus} rounded-xl px-2`}>
                        {t(texts.reasonHeading)}
                      </summary>
                      <ReasonList game={game} line={line} reason={(n) => reasonLine(game, n, t)} extraName={extraName} />
                    </details>
                  ) : (
                    <div className="mt-5">
                      <h2 className={`${cls.body} font-bold mb-2`}>{t(texts.reasonHeading)}</h2>
                      <ReasonList game={game} line={line} reason={(n) => reasonLine(game, n, t)} extraName={extraName} />
                    </div>
                  ))}
              </section>
            );
          })}
        </div>

        {/* 자료 기준 */}
        <div className="mt-5">
          <StatsBasis game={game} />
        </div>

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
          <ShareButtons
            shareTitle={`${t(texts.shareTitle)} · ${t(gameText.name)}`}
            shareDescription={numbersText.split("\n").join(" / ")}
            shareUrl={shareUrl}
            onToast={onToast}
          />
        </div>

        {/* 복권 정보 카드 */}
        <div className="mt-10">
          <InfoCard gameId={game.id} />
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
  game: LottoGame;
  line: LottoLine;
  reason: (n: number) => string;
  extraName: string;
}

/** 번호 + 근거 한 줄 목록. 보조 공은 "무작위" 라고만 적는다 */
function ReasonList({ game, line, reason, extraName }: ReasonListProps) {
  const { t } = useLanguage();
  const small = "w-11 h-11 max-w-none text-[20px] shadow-none";
  return (
    <ul className="space-y-2 mt-2">
      {line.main.map((n) => (
        <li key={n} className={`${cls.innerBox} flex items-center gap-3 px-3 py-2`}>
          <LottoBall number={n} scheme={game.scheme} size="md" className={small} />
          <span className={cls.muted}>{reason(n)}</span>
        </li>
      ))}
      {line.extra !== undefined && (
        <li className={`${cls.innerBox} flex items-center gap-3 px-3 py-2`}>
          <LottoBall number={line.extra} scheme={game.scheme} extra size="md" className={small} />
          <span className={cls.muted}>{fill(t(texts.extraRandom), { name: extraName })}</span>
        </li>
      )}
    </ul>
  );
}
