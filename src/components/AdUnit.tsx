"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT, AD_SLOTS, AdSlotKey } from "@/lib/ads";

// adsbygoogle.js 가 window 에 추가하는 전역 큐
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface AdUnitProps {
    /** src/lib/ads.ts 의 AD_SLOTS 키. 기본값 "default" */
    slot?: AdSlotKey;
    /** 슬롯 ID를 직접 지정할 때 (AD_SLOTS 보다 우선) */
    slotId?: string;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    className?: string;
    responsive?: boolean;
}

export default function AdUnit({
    slot = "default",
    slotId,
    format = "horizontal",
    className = "",
    responsive = true
}: AdUnitProps) {
    // 실제 사용할 슬롯 ID. 비어 있으면 광고를 렌더링하지 않음
    const resolvedSlotId = slotId || AD_SLOTS[slot];

    useEffect(() => {
        if (!resolvedSlotId) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error", err);
        }
    }, [resolvedSlotId]);

    if (!resolvedSlotId) return null;

    return (
        <div
            className={`w-full overflow-hidden ${className}`}
            role="complementary"
            aria-label="Advertisement"
        >
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={resolvedSlotId}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
}
