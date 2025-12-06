"use client";

import { useEffect } from "react";

export default function AdUnit() {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error", err);
        }
    }, []);

    return (
        <div className="w-full glass-strong dark:bg-slate-900/90 border-t border-white/50 dark:border-slate-700 py-2 px-4">
            <div className="max-w-xl mx-auto min-h-[50px] flex items-center justify-center overflow-hidden text-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-slate-300 dark:text-slate-600 font-medium">AD</span>
                </div>
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: "100%", height: "50px" }}
                    data-ad-client="ca-pub-8585338769159452"
                    data-ad-slot="1234567890"
                    data-ad-format="horizontal"
                    data-full-width-responsive="false"
                />
            </div>
        </div>
    );
}
