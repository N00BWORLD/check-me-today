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
        <div className="w-full max-w-xl mx-auto my-4 min-h-[90px] glass rounded-2xl flex items-center justify-center overflow-hidden text-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-300 font-medium">광고 영역</span>
            </div>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-8585338769159452"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
