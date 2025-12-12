"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav() {
    const pathname = usePathname();
    const { lang, t } = useLanguage();

    const navItems = [
        {
            href: "/",
            icon: "🏠",
            label: { ko: "홈", en: "Home", zh: "主页", ja: "ホーム" },
            match: (path: string) => path === "/"
        },
        {
            href: "/fortune",
            icon: "🔮",
            label: { ko: "운세", en: "Fortune", zh: "运势", ja: "運勢" },
            match: (path: string) => path.startsWith("/fortune")
        },
        {
            href: "/face-reading",
            icon: "👤",
            label: { ko: "관상", en: "Face", zh: "面相", ja: "人相" },
            match: (path: string) => path.startsWith("/face-reading")
        },
        {
            href: "/menu-recommendation",
            icon: "🍽️",
            label: { ko: "메뉴", en: "Menu", zh: "菜单", ja: "メニュー" },
            match: (path: string) => path.startsWith("/menu-recommendation")
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
            <nav className="w-full max-w-xl pointer-events-auto bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6">
                <ul className="flex items-center justify-between">
                    {navItems.map((item) => {
                        const isActive = item.match(pathname);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${isActive
                                            ? "text-purple-600 dark:text-purple-400 scale-105"
                                            : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <span className={`text-xl ${isActive ? "animate-bounce-subtle" : "grayscale"}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-[10px] font-medium">
                                        {item.label[lang] || item.label.en}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
