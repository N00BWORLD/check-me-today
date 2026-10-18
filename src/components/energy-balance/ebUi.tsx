"use client";

// 에너지 밸런스 가이드·유형 페이지(/test/guide, /test/types)에서 함께 쓰는 작은 UI 조각
// - 테스트 랜딩(/test)과 같은 글래스 카드 + 태양(amber)·달(indigo) 그라데이션 팔레트
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { PersonalityType } from "@/data/questions";
import { ENERGY_TEST_PATH, energyGuideTexts } from "@/data/energy-balance-guide";
import Breadcrumb from "@/components/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/breadcrumb";

/** 가이드 페이지용 Tailwind 클래스 묶음 */
export const ecls = {
  page: "min-h-screen px-4 pt-5 pb-32",
  container: "max-w-2xl mx-auto",
  card: "glass-strong dark:bg-slate-800/90 rounded-[2rem] p-5 sm:p-7 mb-6",
  inner: "bg-white/60 dark:bg-slate-700/50 rounded-2xl p-4",
  body: "text-[17px] leading-[1.75] text-slate-700 dark:text-slate-200 break-keep",
  muted: "text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 break-keep",
  h1: "text-[28px] sm:text-[34px] leading-tight font-black text-slate-800 dark:text-white break-keep",
  h2: "text-[22px] leading-snug font-bold text-slate-800 dark:text-white break-keep",
  h3: "text-[18px] leading-snug font-bold text-slate-800 dark:text-white break-keep",
  link: "underline underline-offset-4 decoration-1 hover:opacity-80",
  focus: "focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60",
};

/** 태양·달 에너지별 색 */
export const poleStyle: Record<PersonalityType, { badge: string; text: string; ring: string; gradient: string; label: Record<string, string> }> = {
  SOLAR: {
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-300/60 dark:ring-amber-700/60",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    label: energyGuideTexts.solarLabel,
  },
  LUNAR: {
    badge: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-300/60 dark:ring-indigo-700/60",
    gradient: "from-indigo-500 via-purple-500 to-violet-500",
    label: energyGuideTexts.lunarLabel,
  },
};

/** "\n\n" 로 나뉜 문단을 <p> 로 그린다 */
export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className={`${ecls.body} ${i > 0 ? "mt-4" : ""} ${className}`}>
          {para}
        </p>
      ))}
    </>
  );
}

/** 섹션 제목 (이모지 + 글) */
export function SectionHeading({ emoji, children, id }: { emoji?: string; children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className={`${ecls.h2} flex items-center gap-2 mb-4`}>
      {emoji && (
        <span aria-hidden="true" className="text-[22px] shrink-0">
          {emoji}
        </span>
      )}
      <span>{children}</span>
    </h2>
  );
}

/** 테스트로 가는 큰 버튼 (태양→달 그라데이션, 랜딩의 시작 버튼과 같은 모양) */
export function TestCta({ label, className = "" }: { label?: Record<string, string>; className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`text-center ${className}`}>
      <Link
        href={ENERGY_TEST_PATH}
        className={`block w-full py-4 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 active:scale-[0.98] transition-all ${ecls.focus}`}
      >
        ⚖️ {t(label ?? energyGuideTexts.ctaTest)} →
      </Link>
      <p className={`${ecls.muted} mt-3`}>{t(energyGuideTexts.ctaSub)}</p>
    </div>
  );
}

/** 빵부스러기 (JSON-LD 는 서버 페이지가 @graph 안에 따로 넣으므로 여기서는 끈다) */
export function EbBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return <Breadcrumb items={items} withJsonLd={false} className="mb-4 text-[14px]" />;
}

/** 면책 문구 */
export function EbDisclaimer() {
  const { t } = useLanguage();
  return <p className={`${ecls.muted} text-center mt-8`}>{t(energyGuideTexts.disclaimer)}</p>;
}
