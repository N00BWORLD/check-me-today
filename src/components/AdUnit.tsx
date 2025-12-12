"use client";

import { useEffect } from "react";

interface AdUnitProps {
    slotId?: string;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    className?: string;
    responsive?: boolean;
}

export default function AdUnit({
    slotId = "1234567890",
    format = "horizontal",
    className = "",
    responsive = true
}: AdUnitProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error", err);
        }
    }, []);

    return (
        <div
            className={`w-full overflow-hidden ${className}`}
            role="complementary"
            aria-label="Advertisement"
        >
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8585338769159452"
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
}
