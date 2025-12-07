"use client";

import { useSearchParams } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import AdUnit from "@/components/AdUnit";
import { Suspense } from "react";
import { PersonalityType, TraitType } from "@/data/questions";

function ResultContent() {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as PersonalityType) || "SOLAR";
    
    // URL에서 Solar/Lunar 총점 파싱
    const solarScore = parseInt(searchParams.get("solar") || "0");
    const lunarScore = parseInt(searchParams.get("lunar") || "0");
    
    // URL에서 특성별 점수 파싱
    const traitScores: Record<TraitType, number> = {
        assertiveness: parseInt(searchParams.get("assertiveness") || "0"),
        achievement: parseInt(searchParams.get("achievement") || "0"),
        independence: parseInt(searchParams.get("independence") || "0"),
        empathy: parseInt(searchParams.get("empathy") || "0"),
        collaboration: parseInt(searchParams.get("collaboration") || "0"),
        intuition: parseInt(searchParams.get("intuition") || "0"),
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md animate-fade-in">
            <ResultCard 
                type={type} 
                traitScores={traitScores}
                solarScore={solarScore}
                lunarScore={lunarScore}
            />
            <AdUnit />
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-indigo-500 animate-pulse flex items-center justify-center">
                    <span className="text-3xl">⚖️</span>
                </div>
            </div>
            <div className="text-slate-400 font-medium">Loading...</div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
            <Suspense fallback={<LoadingFallback />}>
                <ResultContent />
            </Suspense>
        </main>
    );
}
