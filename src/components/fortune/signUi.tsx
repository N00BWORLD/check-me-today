"use client";

// 띠별·별자리별 운세 페이지(/fortune/zodiac, /fortune/star)에서 함께 쓰는 작은 UI 조각
// - 오늘의 운세 화면과 같은 상아색 카드 + 주홍·금색 포인트(src/app/fortune/_components/styles.ts)를 빌려 쓴다
// - 긴 글을 읽는 페이지라 폭은 조금 넓고(max-w-xl) 글자는 본문용 크기
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { LText } from "@/data/fortunes";
import { FORTUNE_PATH, fortuneSignTexts, type SignKind } from "@/data/fortune-signs";
import { cardClass, innerBoxClass } from "@/app/fortune/_components/styles";
import Breadcrumb from "@/components/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/breadcrumb";

/** 목록·링크용 축약형 (RSC 페이로드를 줄이려고 이름·기호만 넘긴다) */
export interface SignSummary {
  id: string;
  /** 띠는 이모지, 별자리는 유니코드 기호 */
  symbol: string;
  name: LText;
  href: string;
}

/** 띠·별자리 페이지용 Tailwind 클래스 묶음 */
export const scls = {
  page: "min-h-screen px-4 pt-5 pb-32",
  container: "max-w-xl mx-auto",
  card: `${cardClass} p-5 sm:p-6`,
  inner: `${innerBoxClass} p-4`,
  body: "text-[16px] leading-[1.8] text-slate-700 dark:text-slate-200 break-keep",
  muted: "text-sm leading-relaxed text-slate-500 dark:text-slate-400 break-keep",
  h1: "text-[28px] sm:text-[32px] leading-tight font-black text-slate-800 dark:text-white break-keep",
  h2: "text-lg font-bold text-slate-800 dark:text-white break-keep",
  h3: "text-[15px] font-bold text-slate-800 dark:text-white break-keep",
  chipZodiac: "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fdebd3] dark:bg-[#4a3220] text-[#8a3b12] dark:text-[#f3cf8a] text-sm font-bold",
  chipStar: "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e8ecf9] dark:bg-[#2b3250] text-[#2f3f8f] dark:text-[#b9c4f5] text-sm font-bold",
  iconZodiac: "bg-[#fdebd3] dark:bg-[#4a3220]",
  iconStar: "bg-[#e8ecf9] dark:bg-[#2b3250] text-[#2f3f8f] dark:text-[#b9c4f5]",
  link: "text-[#b3261e] dark:text-[#f0c060] underline underline-offset-4 decoration-1 hover:opacity-80",
  focus: "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]",
};

/** "\n\n" 로 나뉜 문단을 <p> 로 그린다 */
export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className={`${scls.body} ${i > 0 ? "mt-3" : ""} ${className}`}>
          {para}
        </p>
      ))}
    </>
  );
}

/** 섹션 제목 (왼쪽에 작은 이모지 표시) */
export function SectionHeading({ mark, children, id }: { mark?: string; children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className={`${scls.h2} flex items-center gap-2 mb-3`}>
      {mark && (
        <span aria-hidden="true" className="text-base shrink-0">
          {mark}
        </span>
      )}
      <span>{children}</span>
    </h2>
  );
}

/** 빵부스러기 (JSON-LD 는 서버 페이지가 @graph 안에 따로 넣으므로 여기서는 끈다) */
export function SignBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return <Breadcrumb items={items} withJsonLd={false} className="mb-4 text-[13px]" />;
}

/** "내 이름으로 자세히 보기" 큰 버튼 (/fortune 으로 유입) */
export function PersonalCta({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`text-center ${className}`}>
      <Link
        href={FORTUNE_PATH}
        className={`block w-full py-4 px-5 bg-gradient-to-r from-[#c62f26] to-[#e0702a] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all ${scls.focus}`}
      >
        🧧 {t(fortuneSignTexts.ctaPersonal)} →
      </Link>
      <p className={`${scls.muted} mt-3`}>{t(fortuneSignTexts.ctaPersonalSub)}</p>
    </div>
  );
}

/** 띠 12개 / 별자리 12개 링크 묶음 */
export function SignLinkGrid({ kind, items, currentId }: { kind: SignKind; items: SignSummary[]; currentId?: string }) {
  const { t } = useLanguage();
  const icon = kind === "zodiac" ? scls.iconZodiac : scls.iconStar;
  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {items.map((item) => {
        const isCurrent = item.id === currentId;
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border transition-colors ${scls.focus} ${
                isCurrent
                  ? "border-[#d4a017] bg-[#fff3e0] dark:bg-[#352720]"
                  : "border-[#eadbc0] dark:border-[#5a4030] bg-white/70 dark:bg-[#1f1612] hover:bg-white dark:hover:bg-[#352720]"
              }`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${icon}`} aria-hidden="true">
                {item.symbol}
              </span>
              <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 break-keep text-center leading-tight">{t(item.name)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** 면책 문구 */
export function SignDisclaimer() {
  const { t } = useLanguage();
  return <p className={`${scls.muted} text-center mt-8 text-xs`}>{t(fortuneSignTexts.disclaimer)}</p>;
}
