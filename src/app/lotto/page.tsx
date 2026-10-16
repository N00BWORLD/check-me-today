"use client";

// 로또 번호 추첨기 (/lotto) — 어르신 친화 UI
// 흐름: (복권 고르기 +) 방식 고르기 → 결과 (다시 뽑기 / 5게임 / 공유)
// 복권은 언어에 따라 기본값이 정해지고(ko 로또, en 파워볼, ja ロト6, zh 双色球) 사용자가 직접 바꿀 수 있다.
// 주소: ?g=<게임>&n=1,2,3,4,5,6[+보조공][;...]&m=<방식> → 공유받은 번호 보기
// 화면은 _components/ 아래 컴포넌트가 그리고, 이 파일은 상태 전환만 맡는다.

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  decodeLines,
  defaultGameForLang,
  drawLines,
  encodeLines,
  LOTTO_GAMES,
  parseGame,
  parseMethod,
  type LottoGameId,
  type LottoLine,
  type LottoMethod,
} from "@/data/lotto";
import { useIncrementPlay } from "@/hooks/useTestStats";
import { SITE_URL } from "@/lib/kakao";
import MethodScreen from "./_components/MethodScreen";
import ResultScreen from "./_components/ResultScreen";
import { Toast } from "./_components/ui";

type Screen = "pick" | "result";

/** 안내 문구가 떠 있는 시간 */
const TOAST_MS = 2500;

export default function LottoPage() {
  const { lang } = useLanguage();
  const [screen, setScreen] = useState<Screen>("pick");
  /** 사용자가 직접 고른 복권 (없으면 언어의 기본 복권을 따른다) */
  const [chosenGame, setChosenGame] = useState<LottoGameId | null>(null);
  const [method, setMethod] = useState<LottoMethod>("random");
  const [lines, setLines] = useState<LottoLine[]>([]);
  /** 결과 화면이 보여 주는 복권 (뽑을 때의 복권을 고정해 두어 언어를 바꿔도 번호가 안 바뀐다) */
  const [resultGame, setResultGame] = useState<LottoGameId>("kr645");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [isSharedView, setIsSharedView] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const gameId = chosenGame ?? defaultGameForLang(lang);

  // 조회수 증가 (세션당 1회)
  useIncrementPlay("lotto");

  // 화면이 바뀌거나 새로 뽑을 때마다 맨 위로 (globals.css 의 smooth 스크롤이 끊기지 않도록 즉시 올린다)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen, lines]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  // 처음 열 때: 공유받은 번호가 주소에 있으면 바로 결과 화면
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedGame = parseGame(params.get("g")) ?? "kr645";
    const shared = decodeLines(LOTTO_GAMES[sharedGame], params.get("n"));
    if (shared) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLines(shared);
      setResultGame(sharedGame);
      setChosenGame(sharedGame);
      setMethod(parseMethod(params.get("m")) ?? "random");
      setIsSharedView(true);
      setScreen("result");
    }
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  /** 방식에 따라 줄을 뽑고 결과 화면으로 */
  const draw = useCallback(
    (id: LottoGameId, m: LottoMethod, count: number) => {
      setMethod(m);
      setResultGame(id);
      setLines(drawLines(LOTTO_GAMES[id], m, count, { name, birth }));
      setIsSharedView(false);
      setScreen("result");
    },
    [name, birth]
  );

  /** 방식 고르기로 돌아갈 때 주소의 공유 파라미터를 지운다 */
  const backToPick = () => {
    if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
    setIsSharedView(false);
    setScreen("pick");
  };

  if (screen === "result" && lines.length > 0) {
    const shareUrl = `${SITE_URL}/lotto?g=${resultGame}&n=${encodeLines(lines)}&m=${method}`;
    return (
      <>
        <ResultScreen
          game={LOTTO_GAMES[resultGame]}
          lines={lines}
          method={method}
          name={name}
          isSharedView={isSharedView}
          shareUrl={shareUrl}
          onRedraw={() => draw(resultGame, method, 1)}
          onDrawFive={() => draw(resultGame, method, 5)}
          onBack={backToPick}
          onToast={showToast}
        />
        <Toast message={toast} />
      </>
    );
  }

  return (
    <>
      <MethodScreen
        gameId={gameId}
        onGameChange={setChosenGame}
        name={name}
        birth={birth}
        onNameChange={setName}
        onBirthChange={setBirth}
        onDraw={(m) => draw(gameId, m, 1)}
      />
      <Toast message={toast} />
    </>
  );
}
