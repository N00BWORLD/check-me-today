"use client";

import { useSearchParams } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import AdUnit from "@/components/AdUnit";
import { Suspense } from "react";
import { PersonalityType, TraitType } from "@/data/questions";

function ResultContent() {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as PersonalityType) || "TETO";
    
    // URL에서 특성 점수 파싱
    const traitScores: Record<TraitType, number> = {
        drive: parseInt(searchParams.get("drive") || "0"),
        social: parseInt(searchParams.get("social") || "0"),
        decision: parseInt(searchParams.get("decision") || "0"),
        empathy: parseInt(searchParams.get("empathy") || "0"),
        detail: parseInt(searchParams.get("detail") || "0"),
        creativity: parseInt(searchParams.get("creativity") || "0"),
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md animate-fade-in">
            <ResultCard type={type} traitScores={traitScores} />
            <AdUnit />
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 animate-pulse" />
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
