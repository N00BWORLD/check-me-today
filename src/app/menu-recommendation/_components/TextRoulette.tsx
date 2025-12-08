"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menu-recommendation";

interface TextRouletteProps {
    items: MenuItem[];
    onComplete: (selectedItem: MenuItem) => void;
    duration?: number; // Total duration in ms
}

export default function TextRoulette({ items, onComplete, duration = 3000 }: TextRouletteProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);

    useEffect(() => {
        // Select the winner immediately
        const winnerIndex = Math.floor(Math.random() * items.length);
        const winner = items[winnerIndex];

        let step = 0;
        const totalSteps = 40; // How many items to flash through
        let delay = 50; // Initial speed (ms)

        const spin = () => {
            step++;

            // Calculate next index
            setCurrentIndex((prev) => (prev + 1) % items.length);

            if (step < totalSteps) {
                // Slow down exponentially in the last phase
                if (step > totalSteps - 10) {
                    delay *= 1.2;
                }
                setTimeout(spin, delay);
            } else {
                // Final stop
                setCurrentIndex(items.indexOf(winner));
                setIsSpinning(false);
                setTimeout(() => onComplete(winner), 500); // Wait a bit before showing result
            }
        };

        const timer = setTimeout(spin, delay);
        return () => clearTimeout(timer);
    }, [items, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-64 overflow-hidden relative bg-white dark:bg-slate-800 rounded-3xl shadow-inner border-4 border-slate-200 dark:border-slate-700 w-full max-w-sm mx-auto">
            {/* Selection Highlight / Glass effect */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-white via-transparent to-white dark:from-slate-800 dark:via-transparent dark:to-slate-800 opacity-80"></div>
            <div className="absolute top-1/2 left-0 right-0 h-16 -mt-8 bg-indigo-500/10 dark:bg-yellow-400/10 border-y-2 border-indigo-500/30 z-0"></div>

            <div className="relative z-0 flex flex-col items-center">
                {/* We can animate a motion div specifically for smooth sliding */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ y: -50, opacity: 0.5, filter: 'blur(5px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: 50, opacity: 0.5, filter: 'blur(5px)' }}
                        transition={{ duration: 0.05, ease: "linear" }}
                        className="text-center"
                    >
                        <div className="text-6xl mb-2">{items[currentIndex].emoji}</div>
                        <div className="text-2xl font-black text-slate-800 dark:text-white truncate max-w-[200px]">
                            {items[currentIndex].name['ko']}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-4 text-sm text-slate-400 font-medium tracking-widest uppercase">
                {isSpinning ? "CHOOSING..." : "SELECTED!"}
            </div>
        </div>
    );
}
