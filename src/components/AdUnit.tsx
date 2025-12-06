"use client";

import { useEffect } from "react";

export default function AdUnit() {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            ```javascript
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
        <div className="w-full max-w-xl mx-auto my-8 min-h-[100px] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden text-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-300">Google AdSense</span>
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
```
