// 관상 결과와 방문 기록을 기기(localStorage)에 저장한다
// - 결과를 저장해 두면 다음날부터 첫 화면에서 바로 "오늘의 관상 운세"를 볼 수 있다
// - 모든 읽기/쓰기는 try/catch 로 감싸 사생활 보호 모드 등에서도 페이지가 깨지지 않게 한다

import { todayKey } from "@/data/face-reading-daily";

const RESULT_KEY = "faceReading_result";
const VISIT_KEY = "faceReading_dailyVisit";

export interface SavedFaceReading {
  /** 결과 유형 id (예: wealth-health) */
  typeId: string;
  /** 부위별 선택 (부위별 풀이를 다시 보여 주기 위해) */
  selections: Record<string, string>;
  /** 저장한 날짜 YYYY-MM-DD */
  savedAt: string;
}

export function saveFaceReading(typeId: string, selections: Record<string, string>): void {
  try {
    const data: SavedFaceReading = { typeId, selections, savedAt: todayKey() };
    localStorage.setItem(RESULT_KEY, JSON.stringify(data));
  } catch {
    // 저장이 막힌 환경이면 조용히 넘어간다
  }
}

export function loadFaceReading(): SavedFaceReading | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<SavedFaceReading>;
    if (typeof data.typeId !== "string") return null;
    return { typeId: data.typeId, selections: data.selections ?? {}, savedAt: data.savedAt ?? "" };
  } catch {
    return null;
  }
}

export function clearFaceReading(): void {
  try {
    localStorage.removeItem(RESULT_KEY);
    localStorage.removeItem(VISIT_KEY);
  } catch {
    // 무시
  }
}

interface VisitRecord {
  lastDate: string;
  streak: number;
}

/**
 * 오늘의 관상 운세를 본 날을 기록하고 연속 방문 일수를 돌려준다.
 * 어제 봤으면 +1, 오늘 이미 봤으면 그대로, 그 밖에는 1 부터 다시 센다.
 */
export function recordDailyVisit(): number {
  try {
    const today = todayKey();
    const yesterday = todayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
    const raw = localStorage.getItem(VISIT_KEY);
    const prev = raw ? (JSON.parse(raw) as Partial<VisitRecord>) : {};
    let streak = 1;
    if (prev.lastDate === today) streak = prev.streak ?? 1;
    else if (prev.lastDate === yesterday) streak = (prev.streak ?? 0) + 1;
    localStorage.setItem(VISIT_KEY, JSON.stringify({ lastDate: today, streak } satisfies VisitRecord));
    return streak;
  } catch {
    return 1;
  }
}
