// 로또 번호 추첨기 데이터와 추첨 로직 (/lotto)
// - 게임(복권) 6종: 한국 로또 6/45, 미국 파워볼·메가밀리언스, 일본 ロト6·ロト7, 중국 双色球
//   언어에 따라 기본 게임이 정해지고(ko→로또, en→파워볼, ja→ロト6, zh→双色球) 사용자가 직접 바꿀 수도 있다.
// - 역대 출현 횟수 표는 scripts/ 의 집계 스크립트가 src/data/lotto-stats/ 에 만든다. (한국·미국만. 일본·중국은 공개 자료를 못 구해 없음)
//   사이트는 정적 배포라 실행 중 외부 호출을 하지 않는다. 새 회차가 쌓이면 스크립트를 다시 돌려 갱신한다.
// - 추첨은 전부 브라우저 안에서 계산한다. 재미용이며 당첨과는 아무 관계가 없다.

import { hashString, seededRandom } from "./fortunes";
import type { LottoGameId, LottoStats } from "./lotto-types";
import { kr645Stats } from "./lotto-stats/kr645";
import { usPowerballStats } from "./lotto-stats/us-powerball";
import { usMegaMillionsStats } from "./lotto-stats/us-megamillions";

export type { LottoGameId, LottoStats } from "./lotto-types";

/** 공 색 묶음 (LottoBall 이 해석) */
export type BallScheme = "kr" | "powerball" | "mega" | "ssq" | "mono";

export interface LottoGame {
  id: LottoGameId;
  /** 나라 (정보 카드·기본 게임 선택용) */
  country: "kr" | "us" | "jp" | "cn";
  /** 본번호 범위 1~max 에서 pick 개 */
  max: number;
  pick: number;
  /** 별도 통에서 뽑는 보조 공 1개 (파워볼·메가볼·蓝球). 없으면 undefined */
  extra?: { max: number };
  scheme: BallScheme;
  /** 역대 출현 집계 (없으면 null → 빈도 방식 숨김) */
  stats: LottoStats | null;
}

export const LOTTO_GAMES: Record<LottoGameId, LottoGame> = {
  kr645: { id: "kr645", country: "kr", max: 45, pick: 6, scheme: "kr", stats: kr645Stats },
  "us-powerball": { id: "us-powerball", country: "us", max: 69, pick: 5, extra: { max: 26 }, scheme: "powerball", stats: usPowerballStats },
  "us-megamillions": { id: "us-megamillions", country: "us", max: 70, pick: 5, extra: { max: 24 }, scheme: "mega", stats: usMegaMillionsStats },
  "jp-loto6": { id: "jp-loto6", country: "jp", max: 43, pick: 6, scheme: "mono", stats: null },
  "jp-loto7": { id: "jp-loto7", country: "jp", max: 37, pick: 7, scheme: "mono", stats: null },
  "cn-ssq": { id: "cn-ssq", country: "cn", max: 33, pick: 6, extra: { max: 16 }, scheme: "ssq", stats: null },
};

/** 화면에 보여 주는 순서 */
export const LOTTO_GAME_IDS: LottoGameId[] = ["kr645", "us-powerball", "us-megamillions", "jp-loto6", "jp-loto7", "cn-ssq"];

/** 언어별 기본 게임 */
export function defaultGameForLang(lang: string): LottoGameId {
  switch (lang) {
    case "en":
      return "us-powerball";
    case "ja":
      return "jp-loto6";
    case "zh":
      return "cn-ssq";
    default:
      return "kr645";
  }
}

export function parseGame(value: string | null): LottoGameId | null {
  return value && (LOTTO_GAME_IDS as string[]).includes(value) ? (value as LottoGameId) : null;
}

/** 추첨 방식 */
export type LottoMethod = "cold" | "hot" | "balanced" | "lucky" | "random";

export const LOTTO_METHODS: LottoMethod[] = ["cold", "hot", "balanced", "lucky", "random"];

/** 이 게임에서 쓸 수 있는 방식 (출현 자료가 없으면 빈도 방식 제외) */
export function availableMethods(game: LottoGame): LottoMethod[] {
  return game.stats ? LOTTO_METHODS : LOTTO_METHODS.filter((m) => m !== "cold" && m !== "hot");
}

export function parseMethod(value: string | null): LottoMethod | null {
  return value && (LOTTO_METHODS as string[]).includes(value) ? (value as LottoMethod) : null;
}

/** 한 게임(한 줄)의 결과: 본번호 + 보조 공 */
export interface LottoLine {
  main: number[];
  extra?: number;
}

/** 번호 빈도 분류 (근거 문구용) */
export type FrequencyTag = "never" | "cold" | "normal" | "hot";

/** 한국 로또 공 색 구간 (1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록) */
export type KrBallColor = "yellow" | "blue" | "red" | "gray" | "green";

export function krBallColor(n: number): KrBallColor {
  if (n <= 10) return "yellow";
  if (n <= 20) return "blue";
  if (n <= 30) return "red";
  if (n <= 40) return "gray";
  return "green";
}

function range(max: number): number[] {
  return Array.from({ length: max }, (_, i) => i + 1);
}

/** 출현 횟수 (자료 없으면 0) */
export function countOf(game: LottoGame, n: number): number {
  return game.stats?.counts[n] ?? 0;
}

/**
 * 번호가 역대 평균보다 많이/적게 나왔는지 분류한다.
 * - never: 한 번도 안 나옴, cold: 하위 1/3, hot: 상위 1/3, normal: 그 사이
 */
export function frequencyTag(game: LottoGame, n: number): FrequencyTag {
  if (!game.stats) return "normal";
  const c = countOf(game, n);
  if (c === 0) return "never";
  const sorted = range(game.max).sort((a, b) => countOf(game, a) - countOf(game, b));
  const third = Math.floor(game.max / 3);
  const coldMax = countOf(game, sorted[third - 1]);
  const hotMin = countOf(game, sorted[game.max - third]);
  if (c <= coldMax) return "cold";
  if (c >= hotMin) return "hot";
  return "normal";
}

/** 0 이상 1 미만의 난수를 돌려주는 함수 */
export type Rng = () => number;

/** 브라우저 기본 난수 */
export const mathRandom: Rng = () => Math.random();

/** 배열을 제자리에서 섞는다 (Fisher–Yates) */
function shuffle<T>(arr: T[], rng: Rng): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 후보 목록에서 count 개를 뽑아 오름차순으로 돌려준다 */
function pickFrom(pool: number[], count: number, rng: Rng): number[] {
  return shuffle([...pool], rng)
    .slice(0, count)
    .sort((a, b) => a - b);
}

/** 보조 공 1개 (게임에 보조 공이 있을 때만) */
function drawExtra(game: LottoGame, rng: Rng): number | undefined {
  return game.extra ? Math.floor(rng() * game.extra.max) + 1 : undefined;
}

/** 완전 무작위 */
export function drawRandom(game: LottoGame, rng: Rng = mathRandom): LottoLine {
  return { main: pickFrom(range(game.max), game.pick, rng), extra: drawExtra(game, rng) };
}

/** 적게/많이 나온 순으로 정렬했을 때 후보로 삼는 번호 수 (뽑는 수의 두 배) */
function poolSize(game: LottoGame): number {
  return game.pick * 2;
}

/**
 * 가장 적게 나온 번호 위주: 출현 횟수 하위 후보(동률은 무작위 순)에서 뽑는다.
 * 한 번도 안 나온 번호가 있으면 자연히 맨 앞에 온다. 보조 공은 무작위.
 */
export function drawCold(game: LottoGame, rng: Rng = mathRandom): LottoLine {
  const ordered = shuffle(range(game.max), rng).sort((a, b) => countOf(game, a) - countOf(game, b));
  return { main: pickFrom(ordered.slice(0, poolSize(game)), game.pick, rng), extra: drawExtra(game, rng) };
}

/** 가장 많이 나온 번호 위주: 출현 횟수 상위 후보에서 뽑는다. 보조 공은 무작위 */
export function drawHot(game: LottoGame, rng: Rng = mathRandom): LottoLine {
  const ordered = shuffle(range(game.max), rng).sort((a, b) => countOf(game, b) - countOf(game, a));
  return { main: pickFrom(ordered.slice(0, poolSize(game)), game.pick, rng), extra: drawExtra(game, rng) };
}

/** 번호 구간: 1~max 를 5구간으로 나눈다 (한국 로또는 1~10, 11~20, …, 41~45) */
export const ZONE_COUNT = 5;

function zoneSize(game: LottoGame): number {
  return Math.ceil(game.max / ZONE_COUNT);
}

function zoneOf(game: LottoGame, n: number): number {
  return Math.min(ZONE_COUNT - 1, Math.floor((n - 1) / zoneSize(game)));
}

/** 분배 조합의 홀수 개수 허용 범위 (6개면 2~4, 5개면 2~3, 7개면 3~4) */
export function balancedOddRange(game: LottoGame): [number, number] {
  const even = game.pick % 2 === 0 ? 1 : 0;
  return [Math.floor(game.pick / 2) - even, Math.ceil(game.pick / 2) + even];
}

/**
 * 분배 조합의 합계 허용 범위: 무작위 합계의 평균 ± 1.25 표준편차 (10 단위로 둥글림)
 * 한국 로또 6/45 는 평균 138, 표준편차 약 30 → 100~175
 */
export function balancedSumRange(game: LottoGame): [number, number] {
  const n = game.pick;
  const N = game.max;
  const mean = (n * (N + 1)) / 2;
  const sd = Math.sqrt((n * (N + 1) * (N - n)) / 12);
  const lo = Math.floor((mean - 1.25 * sd) / 5) * 5;
  const hi = Math.ceil((mean + 1.25 * sd) / 5) * 5;
  return [lo, hi];
}

/** 한 구간에 몰릴 수 있는 최대 개수 (7개 뽑는 ロト7 만 3개) */
function maxPerZone(game: LottoGame): number {
  return game.pick >= 7 ? 3 : 2;
}

/**
 * "분배가 잘 맞는" 조합인지 검사한다. 통계적으로 가장 흔한 꼴:
 * - 홀짝이 반반에 가깝고 (balancedOddRange)
 * - 번호 구간이 3곳 이상에 걸치며, 한 구간에 너무 몰리지 않고
 * - 합계가 평균 근처이며 (balancedSumRange)
 * - 연속 번호(예 7,8)는 최대 1쌍
 */
export function isBalanced(game: LottoGame, numbers: number[]): boolean {
  const sorted = [...numbers].sort((a, b) => a - b);
  const odd = sorted.filter((n) => n % 2 === 1).length;
  const [oddLo, oddHi] = balancedOddRange(game);
  if (odd < oddLo || odd > oddHi) return false;

  const zones = new Array(ZONE_COUNT).fill(0);
  for (const n of sorted) zones[zoneOf(game, n)]++;
  if (zones.filter((z) => z > 0).length < 3) return false;
  if (zones.some((z) => z > maxPerZone(game))) return false;

  const sum = sorted.reduce((a, b) => a + b, 0);
  const [sumLo, sumHi] = balancedSumRange(game);
  if (sum < sumLo || sum > sumHi) return false;

  let consecutive = 0;
  for (let i = 1; i < sorted.length; i++) if (sorted[i] - sorted[i - 1] === 1) consecutive++;
  return consecutive <= 1;
}

/** 조건을 만족할 때까지 무작위로 다시 뽑는다 (보통 몇 번 안에 끝남, 안전장치로 최대 2000번) */
export function drawBalanced(game: LottoGame, rng: Rng = mathRandom): LottoLine {
  let last = drawRandom(game, rng);
  for (let i = 0; i < 2000; i++) {
    if (isBalanced(game, last.main)) return last;
    last = drawRandom(game, rng);
  }
  return last;
}

/** 오늘 날짜 (기기 현지 시간, YYYY-MM-DD) */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 나의 운 번호: 이름·생년월일·오늘 날짜·게임으로 시드를 만들어 뽑는다.
 * 같은 사람은 같은 날 같은 번호가 나오고, 날이 바뀌면 번호도 바뀐다.
 * @param gameIndex 5게임 뽑기에서 줄마다 다른 번호가 나오도록 하는 번호 (0부터)
 */
export function drawLucky(game: LottoGame, name: string, birth: string, gameIndex = 0, date = new Date()): LottoLine {
  const key = `${game.id}|${name.trim()}|${birth.trim()}|${todayKey(date)}|${gameIndex}`;
  // hashString 은 32비트 정수를 돌려주므로 seededRandom 의 곱셈이 넘치지 않도록 줄여 쓴다
  const rng = seededRandom((hashString(key) % 233279) + 1);
  // 처음 몇 개 값은 시드 영향이 커서 버린다
  rng();
  rng();
  return drawRandom(game, rng);
}

export interface DrawOptions {
  name?: string;
  birth?: string;
  gameIndex?: number;
}

/** 방식에 따라 한 줄을 뽑는다 (자료가 없는 게임에서 빈도 방식을 고르면 무작위로 대신한다) */
export function drawLine(game: LottoGame, method: LottoMethod, options: DrawOptions = {}): LottoLine {
  switch (method) {
    case "cold":
      return game.stats ? drawCold(game) : drawRandom(game);
    case "hot":
      return game.stats ? drawHot(game) : drawRandom(game);
    case "balanced":
      return drawBalanced(game);
    case "lucky":
      return drawLucky(game, options.name ?? "", options.birth ?? "", options.gameIndex ?? 0);
    default:
      return drawRandom(game);
  }
}

/** 여러 줄을 한 번에 뽑는다 (같은 줄이 겹치면 다시 뽑는다) */
export function drawLines(game: LottoGame, method: LottoMethod, count: number, options: DrawOptions = {}): LottoLine[] {
  const lines: LottoLine[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (lines.length < count && guard++ < count * 20) {
    const line = drawLine(game, method, { ...options, gameIndex: lines.length });
    const key = lineToText(line);
    if (seen.has(key) && method !== "lucky") continue;
    seen.add(key);
    lines.push(line);
  }
  return lines;
}

/** 한 줄을 글로: "1, 2, 3, 4, 5, 6" 또는 "1, 2, 3, 4, 5 + 7" */
export function lineToText(line: LottoLine): string {
  return line.extra === undefined ? line.main.join(", ") : `${line.main.join(", ")} + ${line.extra}`;
}

/** 공유 주소용: 줄 목록 → "1,2,3,4,5,6;7,8,9,10,11,12" (보조 공은 "+n" 으로 붙인다) */
export function encodeLines(lines: LottoLine[]): string {
  return lines.map((l) => l.main.join(",") + (l.extra === undefined ? "" : `+${l.extra}`)).join(";");
}

/** 공유 주소에서 줄 목록 복원. 게임 규칙에 안 맞으면 null */
export function decodeLines(game: LottoGame, value: string | null): LottoLine[] | null {
  if (!value) return null;
  const parts = value.split(";");
  if (parts.length === 0 || parts.length > 5) return null;
  const lines: LottoLine[] = [];
  for (const part of parts) {
    const [mainText, extraText] = part.split("+");
    const main = mainText.split(",").map(Number);
    const validMain =
      main.length === game.pick &&
      main.every((n) => Number.isInteger(n) && n >= 1 && n <= game.max) &&
      new Set(main).size === game.pick;
    if (!validMain) return null;
    let extra: number | undefined;
    if (game.extra) {
      extra = Number(extraText);
      if (!Number.isInteger(extra) || extra < 1 || extra > game.extra.max) return null;
    } else if (extraText !== undefined) {
      return null;
    }
    lines.push({ main: [...main].sort((a, b) => a - b), extra });
  }
  return lines;
}
