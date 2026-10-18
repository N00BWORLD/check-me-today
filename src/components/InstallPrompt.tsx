"use client";

// 앱(PWA) 설치 안내 배너
// - 루트 레이아웃에 항상 떠 있지만 화면에는 보이지 않다가,
//   심리테스트 결과 화면의 <InstallPromptTrigger />가 보내는 이벤트를 받았을 때만 나타난다.
// - 한 번 보여주면 30일 동안 다시 띄우지 않는다 (src/lib/install-prompt.ts).
// - Android/데스크톱 크롬: beforeinstallprompt 이벤트를 미리 잡아 두었다가 버튼으로 설치창을 연다.
// - iOS: 설치 API가 없어서 "공유 → 홈 화면에 추가" 방법을 안내한다.
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import {
    INSTALL_PROMPT_EVENT,
    hasInstallPromptBeenShown,
    markInstallPromptShown,
} from "@/lib/install-prompt";

/** 크롬 계열 브라우저가 보내는 설치 이벤트 (표준 타입 정의가 없어 직접 선언) */
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const texts = {
    titleIos: {
        ko: "홈 화면에 앱 추가하기 📲",
        en: "Add to Home Screen 📲",
        zh: "添加到主屏幕 📲",
        ja: "ホーム画面に追加 📲",
    },
    titleAndroid: {
        ko: "앱으로 설치하기 📲",
        en: "Install the App 📲",
        zh: "安装应用 📲",
        ja: "アプリをインストール 📲",
    },
    descIos: {
        ko: "브라우저 하단의 [공유] 버튼을 누르고 '홈 화면에 추가'를 선택하세요.",
        en: "Tap the [Share] button at the bottom and choose 'Add to Home Screen'.",
        zh: "点击浏览器底部的[分享]按钮，然后选择“添加到主屏幕”。",
        ja: "ブラウザ下部の[共有]ボタンを押して「ホーム画面に追加」を選んでください。",
    },
    descAndroid: {
        ko: "홈 화면에 추가해 두면 다음 테스트를 앱처럼 바로 열 수 있어요.",
        en: "Add it to your home screen and open the next test instantly, like an app.",
        zh: "添加到主屏幕后，下次可以像应用一样直接打开测试。",
        ja: "ホーム画面に追加すると、次のテストをアプリのようにすぐ開けます。",
    },
    install: {
        ko: "앱 설치하기",
        en: "Install",
        zh: "安装",
        ja: "インストール",
    },
    close: {
        ko: "닫기",
        en: "Close",
        zh: "关闭",
        ja: "閉じる",
    },
};

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    // 설치 이벤트는 페이지 로드 직후 한 번만 오므로 ref에 보관해 두었다가 나중에 쓴다
    const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
    // 이번 세션에서 이미 띄웠는지 (localStorage가 막힌 환경에서도 중복 노출을 막는다)
    const shownThisSession = useRef(false);
    const { theme } = useTheme();
    const { lang } = useLanguage();

    const t = (obj: Record<string, string>) => obj[lang] || obj.en;

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        const nav = window.navigator as Navigator & { standalone?: boolean };
        const isRunningStandalone =
            nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;

        // 1. 설치 이벤트를 미리 잡아 둔다 (기본 미니 배너는 막는다)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            deferredPrompt.current = e as BeforeInstallPromptEvent;
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // 2. 결과 화면이 요청했을 때만 띄운다
        const handleRequest = () => {
            if (isRunningStandalone) return; // 이미 앱으로 쓰는 중
            if (shownThisSession.current || hasInstallPromptBeenShown()) return; // 이미 보여줌
            // iOS는 안내만 하면 되고, 그 외에는 브라우저가 설치를 지원할 때(이벤트를 받았을 때)만
            if (!isIosDevice && !deferredPrompt.current) return;

            shownThisSession.current = true;
            markInstallPromptShown();
            setIsIOS(isIosDevice);
            setShowPrompt(true);
        };
        window.addEventListener(INSTALL_PROMPT_EVENT, handleRequest);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener(INSTALL_PROMPT_EVENT, handleRequest);
        };
    }, []);

    // 서비스 워커 등록 (오프라인 캐시·설치 요건) — 안내 노출과 무관하게 항상 실행
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").catch((error) => {
                console.log("SW registration failed:", error);
            });
        }
    }, []);

    const handleInstallClick = async () => {
        const promptEvent = deferredPrompt.current;
        if (!promptEvent) return;
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === "accepted") {
            deferredPrompt.current = null;
        }
        // 설치했든 거절했든 배너는 닫는다 (한 번만 보여주기)
        setShowPrompt(false);
    };

    const handleClose = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div
            className={`fixed bottom-24 left-4 right-4 max-w-md mx-auto p-5 rounded-2xl shadow-2xl z-50 backdrop-blur-md border border-white/20 animate-fade-in ${
                theme === "dark" ? "bg-slate-900/90 text-white" : "bg-white/90 text-slate-900"
            }`}
            role="dialog"
            aria-live="polite"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg break-keep">
                    {isIOS ? t(texts.titleIos) : t(texts.titleAndroid)}
                </h3>
                <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 px-1"
                    aria-label={t(texts.close)}
                >
                    ✕
                </button>
            </div>

            <p className="text-sm mb-4 opacity-90 break-keep">
                {isIOS ? t(texts.descIos) : t(texts.descAndroid)}
            </p>

            {isIOS ? (
                <div className="flex justify-end pr-8">
                    {/* iOS 공유 버튼 위치를 가리키는 화살표 */}
                    <div className="animate-bounce text-3xl">👇</div>
                </div>
            ) : (
                <button
                    onClick={handleInstallClick}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                    {t(texts.install)}
                </button>
            )}
        </div>
    );
}
