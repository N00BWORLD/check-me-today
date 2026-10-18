"use client";

// 관상 가이드·유형 페이지(/face-reading/guide, /face-reading/types)에서 함께 쓰는 작은 UI 조각
// - 관상 테스트와 같은 한지(연한 베이지) + 먹색 + 주홍 팔레트를 쓰되, 긴 글을 읽는 페이지라 글자는 조금 작고 폭은 넓다
// - 테스트 화면의 cls 는 src/app/face-reading/_components/ui.tsx 에 있고, 여기서는 카드·포인트 색만 빌려 쓴다
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FACE_READING_PATH, faceGuideTexts } from "@/data/face-reading-guide";
import { cls } from "@/app/face-reading/_components/ui";
import Breadcrumb from "@/components/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/breadcrumb";

/** 가이드 페이지용 Tailwind 클래스 묶음 */
export const gcls = {
  page: "min-h-screen ink-bg px-4 pt-5 pb-32",
  container: "max-w-2xl mx-auto",
  card: `${cls.card} p-5 sm:p-7`,
  inner: `${cls.innerBox} p-4`,
  body: "text-[18px] leading-[1.75] text-stone-900 dark:text-stone-100 break-keep",
  muted: "text-[16px] leading-relaxed text-stone-700 dark:text-stone-300 break-keep",
  h1: "text-[30px] sm:text-[36px] leading-tight font-bold text-stone-900 dark:text-stone-50 font-serif break-keep",
  h2: "text-[24px] leading-snug font-bold text-stone-900 dark:text-stone-50 font-serif break-keep",
  h3: "text-[20px] leading-snug font-bold text-stone-900 dark:text-stone-50 break-keep",
  accent: cls.accent,
  focus: cls.focus,
  link: "text-[#8b1a1a] dark:text-[#e2c17a] underline underline-offset-4 decoration-1 hover:opacity-80",
};

/** "\n\n" 로 나뉜 문단을 <p> 로 그린다 */
export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className={`${gcls.body} ${i > 0 ? "mt-4" : ""} ${className}`}>
          {para}
        </p>
      ))}
    </>
  );
}

/** 섹션 제목: 왼쪽에 한자 도장 느낌의 작은 글자 */
export function SectionHeading({ mark, children, id }: { mark?: string; children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className={`${gcls.h2} flex items-center gap-3 mb-4`}>
      {mark && (
        <span aria-hidden="true" className={`${gcls.accent} text-[18px] font-serif tracking-widest shrink-0`}>
          {mark}
        </span>
      )}
      <span>{children}</span>
    </h2>
  );
}

/** "내 관상 분석해 보기" 큰 버튼 (관상 테스트로 유입) */
export function AnalyzeCta({ label, className = "" }: { label?: Record<string, string>; className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`text-center ${className}`}>
      <Link
        href={FACE_READING_PATH}
        className={`block w-full min-h-[64px] px-5 py-4 rounded-2xl bg-[#8b1a1a] hover:bg-[#731414] active:bg-[#5e0f0f] text-white font-bold text-[22px] transition-colors ${gcls.focus}`}
      >
        🔮 {t(label ?? faceGuideTexts.ctaAnalyze)} →
      </Link>
      <p className={`${gcls.muted} mt-3`}>{t(faceGuideTexts.ctaSub)}</p>
    </div>
  );
}

/** 빵부스러기 (JSON-LD 는 서버 페이지가 @graph 안에 따로 넣으므로 여기서는 끈다) */
export function GuideBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return <Breadcrumb items={items} withJsonLd={false} className="mb-4 text-[14px]" />;
}

/** 면책 문구 */
export function GuideDisclaimer() {
  const { t } = useLanguage();
  return <p className={`${gcls.muted} text-center mt-8`}>{t(faceGuideTexts.disclaimer)}</p>;
}
