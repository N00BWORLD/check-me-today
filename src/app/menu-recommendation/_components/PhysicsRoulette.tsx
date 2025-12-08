"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface RouletteItem {
    id: string;
    name: Record<string, string>;
    emoji: string;
}

interface PhysicsRouletteProps {
    items: RouletteItem[];
    onComplete: (item: RouletteItem) => void;
    lang: string;
}

export default function PhysicsRoulette({ items, onComplete, lang }: PhysicsRouletteProps) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const wheelRef = useRef<Matter.Body | null>(null);
    const isSpinningRef = useRef(false);
    const [guideText, setGuideText] = useState("Click or Drag to Spin! 🌀");

    useEffect(() => {
        if (!sceneRef.current) return;

        // 1. Setup Matter.js
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Constraint = Matter.Constraint,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;

        const width = Math.min(window.innerWidth - 32, 400);
        const height = width; // Square canvas

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false, // We will custom render
                background: "transparent",
            },
        });
        renderRef.current = render;

        // 2. Create Wheel Body
        const cx = width / 2;
        const cy = height / 2;
        const radius = width * 0.45;

        // The wheel is a circle sensor (doesn't collide with walls, but can be dragged)
        const wheel = Bodies.circle(cx, cy, radius, {
            frictionAir: 0.015, // Air resistance to slow it down
            restitution: 0.8,
            density: 0.01,
            label: "Wheel",
        });
        wheelRef.current = wheel;

        // Fix the wheel center with a constraint (axle)
        const axle = Constraint.create({
            pointA: { x: cx, y: cy },
            bodyB: wheel,
            pointB: { x: 0, y: 0 },
            stiffness: 1,
            length: 0,
        });

        Composite.add(engine.world, [wheel, axle]);

        // 3. Mouse Interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // 4. Custom Rendering (Wedges & Text)
        Events.on(render, "afterRender", () => {
            const ctx = render.context;
            const angle = wheel.angle;
            const sliceAngle = (2 * Math.PI) / items.length;

            ctx.translate(cx, cy);
            ctx.rotate(angle);

            items.forEach((item, index) => {
                // Draw Wedge
                const startAngle = index * sliceAngle;
                const endAngle = startAngle + sliceAngle;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, startAngle, endAngle);
                ctx.closePath();

                // Colors
                const colors = [
                    "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", // Pastel Rainbow
                    "#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"  // Deep Vibe
                ];
                ctx.fillStyle = colors[index % colors.length];
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();

                // Draw Text
                ctx.save();
                ctx.rotate(startAngle + sliceAngle / 2);
                ctx.translate(radius * 0.65, 0);

                // Emoji
                ctx.font = "24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(item.emoji, 0, -15);

                // Name
                const itemName = item.name[lang] || item.name.ko || item.name.en;
                ctx.font = "bold 12px Pretendard";
                ctx.fillStyle = "#333";
                ctx.fillText(itemName.slice(0, 8) + (itemName.length > 8 ? ".." : ""), 0, 15);

                ctx.restore();
            });

            ctx.rotate(-angle);
            ctx.translate(-cx, -cy);

            // Draw Pointer (Triangle at top)
            ctx.fillStyle = "#FF5722";
            ctx.beginPath();
            ctx.moveTo(cx - 10, 20);
            ctx.lineTo(cx + 10, 20);
            ctx.lineTo(cx, 40);
            ctx.closePath();
            ctx.fill();
        });

        // 5. Spin & Stop Logic
        Events.on(engine, "afterUpdate", () => {
            // Check if spinning fast enough
            const angularVelocity = Math.abs(wheel.angularVelocity);

            if (angularVelocity > 0.1) {
                if (!isSpinningRef.current) {
                    isSpinningRef.current = true;
                    setGuideText("Rolling... 😵‍💫");
                }
            }

            // Stop detection
            if (isSpinningRef.current && angularVelocity < 0.005) {
                isSpinningRef.current = false;

                // Final selection calculation
                // Angle increases positively or negatively. Normalize to 0-2PI.
                // Pointer is at -PI/2 (top). 
                // We need to find which index corresponds to -PI/2 in the wheel's local space.
                // Current angle of the wheel: theta
                // Angle of wedge i: theta + i * slice
                // We want (theta + i*slice) ~ -PI/2 (modulo 2PI)

                const count = items.length;
                const totalAngle = wheel.angle;
                // Normalize angle to [0, 2PI)
                const normalizedAngle = ((totalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

                // pointer is at top (270deg or 3PI/2 in canvas coord? wait)
                // Canvas rotation is clockwise positive.
                // 0 is right (3 o'clock).
                // 90 (PI/2) is bottom (6 o'clock).
                // 270 (3PI/2) is top (12 o'clock).

                // We render slice 0 at angle 0.
                // If we rotate wheel by alpha. slice 0 is at alpha.
                // We want slice that is currently at 3PI/2.
                // alpha + sliceCenter = 3PI/2

                const sliceAngle = (2 * Math.PI) / count;
                // Pointer angle in wheel's coordinate system
                // wheelAngle + wedgeAngle = pointerAngle (= 1.5 * PI)
                // wedgeAngle = 1.5 * PI - wheelAngle

                let pointerAngleInWheel = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);

                const index = Math.floor(pointerAngleInWheel / sliceAngle) % count;
                const safeIndex = (index + count) % count; // ensure positive

                setGuideText("Selected! 🎉");
                onComplete(items[safeIndex]);
            }
        });

        // Run
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [items, lang, onComplete]);

    // Helper to spin button
    const handleSpin = () => {
        if (wheelRef.current) {
            // Add random spin force
            Matter.Body.setAngularVelocity(wheelRef.current, (Math.random() * 0.2 + 0.3) * (Math.random() > 0.5 ? 1 : -1));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className="relative"
                ref={sceneRef}
            />
            <div className="mt-4 text-center">
                <p className="text-lg font-bold text-slate-600 dark:text-slate-300 mb-4 animate-pulse">
                    {guideText}
                </p>
                <button
                    onClick={handleSpin}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                    Spin! 🎰
                </button>
            </div>
        </div>
    );
}
