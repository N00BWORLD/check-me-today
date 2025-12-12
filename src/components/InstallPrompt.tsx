"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        // 1. Detect Environment
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        // @ts-ignore
        const isRunningStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

        setIsIOS(isIosDevice);
        setIsStandalone(isRunningStandalone);

        // 2. Android BeforeInstallPrompt
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show prompt only if not standalone
            if (!isRunningStandalone) {
                setShowPrompt(true);
            }
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // 3. iOS Logic (Show if iOS and NOT standalone)
        if (isIosDevice && !isRunningStandalone) {
            // Delay showing to avoid annoyance (e.g., 3 seconds)
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
            }
        }
    };

    const handleClose = () => {
        setShowPrompt(false);
    };

    // Service Worker Registration for Push (Run always)
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }, []);

    if (!showPrompt) return null;

    return (
        <div className={`fixed bottom-24 left-4 right-4 p-5 rounded-2xl shadow-2xl z-50 backdrop-blur-md border border-white/20 transition-all duration-500 transform translate-y-0 ${theme === 'dark' ? 'bg-slate-900/90 text-white' : 'bg-white/90 text-slate-900'
            }`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">
                    {isIOS ? "홈 화면에 앱 추가하기 📲" : "앱 설치하고 운세 받기 💌"}
                </h3>
                <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <p className="text-sm mb-4 opacity-90 break-keep">
                {isIOS
                    ? "브라우저 하단의 [공유] 버튼을 누르고 '홈 화면에 추가'를 선택하세요."
                    : "앱을 설치하면 매일 무료 운세 알림을 보내드립니다!"}
            </p>

            {isIOS ? (
                <div className="flex justify-end pr-8">
                    {/* Visual Arrow for iOS Share Button */}
                    <div className="animate-bounce text-3xl">👇</div>
                </div>
            ) : (
                <button
                    onClick={handleInstallClick}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                    앱 설치하기
                </button>
            )}
        </div>
    );
}
