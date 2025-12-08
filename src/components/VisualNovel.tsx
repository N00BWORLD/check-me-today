"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

// Types for the VN engine
export interface VNChoice {
    text: { [key: string]: string };
    scoreChange?: number; // Change to love_score
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
    onComplete: (score: number) => void;
    onExit: () => void;
}

export default function VisualNovel({ scenario, onComplete, onExit }: VisualNovelProps) {
    const { lang } = useLanguage();
    const [currentSceneId, setCurrentSceneId] = useState(scenario.initialScene);
    const [loveScore, setLoveScore] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showChoices, setShowChoices] = useState(false);

    const scene = scenario.scenes[currentSceneId];
    if (!scene) return <div>Scene not found: {currentSceneId}</div>;

    const fullText = scene.dialogue.text[lang] || scene.dialogue.text["ko"];
    const speakerName = scene.dialogue.speaker[lang] || scene.dialogue.speaker["ko"];

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
                    onComplete(loveScore);
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

        if (choice.nextSceneId) {
            // Special transitions or checks can go here
            setCurrentSceneId(choice.nextSceneId);
        } else if (scene.nextSceneId) {
            setCurrentSceneId(scene.nextSceneId);
        } else {
            // Fallback or end
            console.warn("No next scene defined for choice");
        }
    };

    return (
        <div className="relative w-full h-screen max-h-[900px] overflow-hidden bg-black font-sans select-none">
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
                        className={`absolute bottom-0 z-10 w-full flex items-end justify-center h-[80%] pointer-events-none icon-shadow-lg`}
                    >
                        {/* Using a container to constrain excessive height if needed */}
                        <div className="relative h-full w-auto aspect-[1/2]">
                            <Image
                                src={scene.character.image}
                                alt="character"
                                fill
                                className="object-contain object-bottom drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Vignette & Effects Layer */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* UI Layer */}
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12" onClick={handleNext}>

                {/* Top Controls */}
                <div className="flex justify-between items-start">
                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm border border-white/10">
                        ❤️ Score: {loveScore}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onExit(); }}
                        className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm border border-white/10 hover:bg-white/10 transition"
                    >
                        Exit
                    </button>
                </div>

                {/* Dialogue Box */}
                <div className="w-full max-w-4xl mx-auto mb-8">
                    {/* Choices Overlay */}
                    {showChoices && scene.choices && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-50">
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
                                    className="w-[90%] max-w-2xl p-6 bg-white/90 dark:bg-slate-900/90 hover:bg-white hover:scale-105 transition-all text-slate-800 dark:text-slate-100 font-bold text-lg md:text-xl rounded-2xl shadow-xl border border-white/50"
                                >
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
                        <p className="text-white text-lg md:text-2xl leading-relaxed mt-2 min-h-[3em]">
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
        </div>
    );
}
