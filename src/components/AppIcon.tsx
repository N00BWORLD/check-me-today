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
            <div className="flex flex-col items-center gap-2.5 select-none group">
                <div className="relative">
                    {/* Icon Container - Coming Soon */}
                    <div className="icon-container w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center opacity-50 grayscale">
                        <Image 
                            src={iconSrc} 
                            alt={title} 
                            fill 
                            className="object-cover rounded-[22%]" 
                        />
                    </div>
                    {/* Coming Soon Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-slate-400 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        SOON
                    </div>
                </div>
                <div className="text-center">
                    <span className="text-xs sm:text-sm font-medium text-slate-400 leading-tight line-clamp-2">
                        {title}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Link href={href} className="block">
            <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2.5 cursor-pointer group"
            >
                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-[22%] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-110" />
                    
                    {/* Icon Container */}
                    <div className="icon-container w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden">
                        <Image 
                            src={iconSrc} 
                            alt={title} 
                            fill 
                            className="object-cover rounded-[22%]" 
                        />
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-[22%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Active Indicator */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"
                    />
                </div>
                
                {/* Title */}
                <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {title}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
