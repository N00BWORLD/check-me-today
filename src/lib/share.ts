// 공유 관련 공용 유틸

/**
 * 텍스트를 클립보드에 복사한다.
 * - navigator.clipboard 가 막힌 환경(권한 거부, http, 구형 브라우저)에서는
 *   숨은 textarea + execCommand('copy') 로 폴백한다.
 * - 절대 예외를 던지지 않고 성공 여부만 돌려준다 (unhandled rejection 방지).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (typeof window === "undefined") return false;

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        // 권한 거부 등 → 아래 폴백 시도
    }

    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
    } catch {
        return false;
    }
}
