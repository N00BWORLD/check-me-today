"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AppIconProps {
    title: string;
    iconSrc: string;
    href: string;
    isComingSoon?: boolean;
}

export default function AppIcon({ title, iconSrc, href, isComingSoon = false }: AppIconProps) {
    if (isComingSoon) {
        return (
            <div className="flex flex-col items-center gap-2 opacity-50 grayscale select-none">
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-[22px] shadow-sm flex items-center justify-center border border-slate-100 overflow-hidden">
                    <Image src={iconSrc} alt={title} fill className="object-cover" />
                </div>
                <span className="text-xs md:text-sm font-medium text-slate-500 text-center leading-tight">
                    {title}
                    <br />
                    <span className="text-[10px] text-slate-400">(준비중)</span>
                </span>
            </div>
        );
    }

    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 cursor-pointer"
            >
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-[22px] shadow-lg shadow-slate-200/50 flex items-center justify-center border border-slate-50 overflow-hidden">
                    <Image src={iconSrc} alt={title} fill className="object-cover" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-700 text-center leading-tight">
                    {title}
                </span>
            </motion.div>
        </Link>
    );
}
