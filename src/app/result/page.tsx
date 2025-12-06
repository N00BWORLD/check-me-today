"use client";

import { useSearchParams } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import AdUnit from "@/components/AdUnit";
import { Suspense } from "react";
import { PersonalityType } from "@/data/questions";
import { motion } from "framer-motion";

function ResultContent() {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as PersonalityType) || "TETO";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8 w-full max-w-md"
        >
            <ResultCard type={type} />
            <AdUnit />
        </motion.div>
    );
}

function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 animate-pulse" />
            <div className="text-slate-400 font-medium">결과 로딩중...</div>
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
