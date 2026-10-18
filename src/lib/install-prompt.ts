// 앱 설치 안내(InstallPrompt) 노출 제어
// - 예전에는 어느 페이지든 들어오자마자 떴는데, 지금은 심리테스트 결과 화면에서 한 번만 띄운다.
// - 결과 화면이 requestInstallPrompt()를 호출하면 루트 레이아웃의 <InstallPrompt />가 이벤트를 받아 표시한다.
// - 한 번 보여주면(닫든 설치하든) localStorage에 시각을 남기고, 쿨다운이 지나기 전엔 다시 띄우지 않는다.

export const INSTALL_PROMPT_EVENT = "checkme:install-prompt";

const STORAGE_KEY = "installPromptShownAt";

/** 한 번 보여준 뒤 다시 띄우기까지 기다리는 기간 (30일) */
const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

/** 결과 화면에서 호출: 설치 안내를 띄워 달라고 요청한다 (조건 판단은 InstallPrompt가 한다) */
export function requestInstallPrompt(): void {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event(INSTALL_PROMPT_EVENT));
}

/** 최근 쿨다운 기간 안에 이미 보여줬는지 */
export function hasInstallPromptBeenShown(): boolean {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const shownAt = Number(raw);
        if (!Number.isFinite(shownAt)) return false;
        return Date.now() - shownAt < COOLDOWN_MS;
    } catch {
        // 시크릿 모드 등 저장소 접근 불가 → 보여준 적 없는 것으로 취급
        return false;
    }
}

/** 설치 안내를 화면에 띄운 시점을 기록한다 */
export function markInstallPromptShown(): void {
    try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
        // 저장 실패는 무시 (이번 세션에서는 컴포넌트 상태로 중복 노출을 막는다)
    }
}
