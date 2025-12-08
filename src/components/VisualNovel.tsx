"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

// Types for the VN engine
export interface VNChoice {
    text: { [key: string]: string };
    scoreChange?: number; // Love score change
    suspicionChange?: number; // Suspicion score change
    nextSceneId?: string; // Jump to specific scene
}

export interface VNScene {
    id: string;
    background: string; // Path to image
    character?: {
        image: string; // Path to image
        position?: "left" | "center" | "right";
        expression?: string; // Optional CSS class or filter
    };
    dialogue: {
        speaker: { [key: string]: string };
        text: { [key: string]: string };
    };
    effect?: "shake" | "flash" | "zoom"; // Visual effects
    choices?: VNChoice[];
    nextSceneId?: string; // Default next scene if no choice
    isEnding?: boolean; // If true, shows ending screen
}

export interface VNScenario {
    id: string;
    title: { [key: string]: string };
    scenes: { [key: string]: VNScene };
    initialScene: string;
}

interface VisualNovelProps {
    scenario: VNScenario;
    onComplete: (results: { love: number; suspicion: number }) => void;
    onExit: () => void;
}

export default function VisualNovel({ scenario, onComplete, onExit }: VisualNovelProps) {
    const { lang } = useLanguage();
    const [currentSceneId, setCurrentSceneId] = useState(scenario.initialScene);
    const [loveScore, setLoveScore] = useState(0);
    const [suspicionScore, setSuspicionScore] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showChoices, setShowChoices] = useState(false);

    // Effect state
    const [isShaking, setIsShaking] = useState(false);

    const scene = scenario.scenes[currentSceneId];
    if (!scene) return <div>Scene not found: {currentSceneId}</div>;

    const fullText = scene.dialogue.text[lang] || scene.dialogue.text["ko"];
    const speakerName = scene.dialogue.speaker[lang] || scene.dialogue.speaker["ko"];

    // Handle Scene Effects
    useEffect(() => {
        if (scene.effect === "shake") {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 500);
            return () => clearTimeout(timer);
        }
    }, [currentSceneId, scene.effect]);

    // Typing effect
    useEffect(() => {
        setDisplayedText("");
        setIsTyping(true);
        setShowChoices(false);

        let i = 0;
        const speed = 30; // ms per char
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                if (scene.choices && scene.choices.length > 0) {
                    setShowChoices(true);
                }
            }
        }, speed);

        return () => clearInterval(interval);
    }, [currentSceneId, fullText, scene.choices]);

    const handleNext = () => {
        if (isTyping) {
            // Skip typing
            setDisplayedText(fullText);
            setIsTyping(false);
            if (scene.choices && scene.choices.length > 0) {
                setShowChoices(true);
            }
        } else {
            // Go to next scene if no choices
            if (!scene.choices || scene.choices.length === 0) {
                if (scene.isEnding) {
                    // Combine scores for final result
                    onComplete({ love: loveScore, suspicion: suspicionScore });
                } else if (scene.nextSceneId) {
                    setCurrentSceneId(scene.nextSceneId);
                }
            }
        }
    };

    const handleChoice = (choice: VNChoice) => {
        if (choice.scoreChange) {
            setLoveScore((prev) => prev + choice.scoreChange!);
        }
        if (choice.suspicionChange) {
            setSuspicionScore((prev) => prev + choice.suspicionChange!);
        }

        if (choice.nextSceneId) {
            setCurrentSceneId(choice.nextSceneId);
        } else if (scene.nextSceneId) {
            setCurrentSceneId(scene.nextSceneId);
        } else {
            console.warn("No next scene defined for choice");
        }
    };

    return (
        <div className={`relative w-full h-screen max-h-[900px] overflow-hidden bg-black font-sans select-none ${isShaking ? 'animate-shake' : ''}`}>
            {/* Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={scene.background}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={scene.background}
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Character Layer */}
            {scene.character && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scene.character.image}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute bottom-0 z-10 w-full flex items-end justify-center h-[90%] pointer-events-none`}
                    >
                        <div className="relative h-full w-auto aspect-[1/1.5] md:aspect-[2/3]">
                            <Image
                                src={scene.character.image}
                                alt="character"
                                fill
                                className="object-contain object-bottom"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Vignette & Effects Layer */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* UI Layer */}
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12" onClick={handleNext}>

                {/* Top Controls & Debug/Stats */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-pink-300 text-sm border border-pink-500/30">
                            ❤️ {loveScore}
                        </div>
                        {/* Hidden/Debug Suspicion Meter - typically hidden but useful for dev */}
                        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-purple-300 text-sm border border-purple-500/30">
                            👁️ {suspicionScore}
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); onExit(); }}
                        className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm border border-white/10 hover:bg-white/10 transition"
                    >
                        Exit
                    </button>
                </div>

                {/* Dialogue Box */}
                <div className="w-full max-w-4xl mx-auto mb-8 relative">
                    {/* Choices Overlay - CENTERED */}
                    {showChoices && scene.choices && (
                        <div className="fixed inset-0 flex flex-col items-center justify-center gap-3 z-50 px-4 pointer-events-auto bg-black/60 backdrop-blur-sm">
                            {scene.choices.map((choice, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleChoice(choice);
                                    }}
                                    className="w-full max-w-2xl p-6 bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 hover:border-orange-500/50 backdrop-blur-xl rounded-2xl shadow-2xl transition-all text-xl font-bold text-center group transform hover:scale-105"
                                >
                                    <span className="text-orange-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                                    {choice.text[lang] || choice.text["ko"]}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Text Area */}
                    <div className={`relative bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl transition-opacity duration-300 ${showChoices ? 'opacity-0' : 'opacity-100'}`}>
                        {/* Speaker Name Tag */}
                        {speakerName && (
                            <div className="absolute -top-5 left-8 bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2 rounded-xl shadow-lg">
                                <span className="text-white font-bold tracking-wide">{speakerName}</span>
                            </div>
                        )}

                        {/* Main Text */}
                        <p className="text-white text-lg md:text-2xl leading-relaxed mt-2 min-h-[3em] whitespace-pre-wrap">
                            {displayedText}
                            <span className="animate-pulse inline-block ml-1">|</span>
                        </p>

                        {/* Click Indicator */}
                        {!isTyping && !showChoices && (
                            <div className="absolute bottom-4 right-6 animate-bounce text-orange-400">
                                ▼
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Styles for shake animation */}
            <style jsx global>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .animate-shake {
                    animation: shake 0.5s;
                    animation-iteration-count: 1;
                }
            `}</style>
        </div>
    );
}

