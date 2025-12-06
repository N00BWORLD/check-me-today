"use client";

import { useSearchParams } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import { Suspense } from "react";
import { PersonalityType } from "@/data/questions";

function ResultContent() {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as PersonalityType) || "TETO";

    return <ResultCard type={type} />;
}

export default function ResultPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Suspense fallback={<div>Loading result...</div>}>
                <ResultContent />
            </Suspense>
        </main>
    );
}
