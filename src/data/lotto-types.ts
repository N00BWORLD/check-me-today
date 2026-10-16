// 로또 추첨기(/lotto)의 공용 타입. 집계 스크립트가 만드는 데이터 파일(src/data/lotto-stats/*.ts)과 로직(lotto.ts)이 함께 쓴다.

/** 지원하는 복권 게임 */
export type LottoGameId = "kr645" | "us-powerball" | "us-megamillions" | "jp-loto6" | "jp-loto7" | "cn-ssq";

/** 역대 당첨 번호 출현 집계 (본번호만. 파워볼·蓝球 같은 보조 공은 세지 않는다) */
export interface LottoStats {
  game: LottoGameId;
  /** 집계한 추첨 횟수 */
  drawCount: number;
  /** 집계 기준 회차 (회차 번호가 있는 게임만, 없으면 null) */
  baseRound: number | null;
  /** 기준(마지막) 추첨일 YYYY-MM-DD */
  baseDate: string;
  /** 집계 시작 추첨일 YYYY-MM-DD (현재 규칙이 시작된 날부터) */
  sinceDate: string;
  /** 출처 (화면에 표시) */
  source: string;
  /** 번호별 출현 횟수. 인덱스 0 은 비워 두고 1~max 사용 */
  counts: number[];
  /** 번호별 마지막으로 나온 회차 (회차가 있는 게임만) */
  lastRound: number[] | null;
  /** 번호별 마지막으로 나온 날짜 YYYY-MM-DD (한 번도 안 나왔으면 "") */
  lastDate: string[];
}
