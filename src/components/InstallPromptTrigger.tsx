"use client";

// 심리테스트 결과 화면에 끼워 넣는 보이지 않는 컴포넌트
// 마운트되고 잠시 뒤(결과를 먼저 읽을 시간을 준 뒤) 앱 설치 안내를 요청한다.
// 실제로 띄울지(이미 설치됨/이미 보여줌/설치 불가 브라우저)는 InstallPrompt가 판단한다.
import { useEffect } from "react";
import { requestInstallPrompt } from "@/lib/install-prompt";

interface Props {
    /** 결과가 뜬 뒤 안내까지 기다리는 시간 (기본 2.5초) */
    delayMs?: number;
    /** false면 요청하지 않음 (예: 남이 공유한 결과를 보는 중) */
    enabled?: boolean;
}

export default function InstallPromptTrigger({ delayMs = 2500, enabled = true }: Props) {
    useEffect(() => {
        if (!enabled) return;
        const timer = setTimeout(requestInstallPrompt, delayMs);
        return () => clearTimeout(timer);
    }, [delayMs, enabled]);

    return null;
}
