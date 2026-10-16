"use client";

// 로또 추첨기 화면에서 공통으로 쓰는 작은 UI 조각과 스타일 묶음
// - 관상 보기(src/app/face-reading/_components/ui.tsx)와 같은 결: 어르신 기준 글자 20px 이상,
//   버튼 높이 64px 이상, 고대비, 포커스 링. 같은 조각이 두 곳에 있으니 나중에 공용 컴포넌트로 합쳐도 된다.
// - 한지(연한 베이지) 배경 + 먹색 글자 + 주홍 포인트

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

/** 자주 쓰는 Tailwind 클래스 묶음 */
export const cls = {
  /** 페이지 바탕 (globals.css 의 ink-bg 한지 그라데이션). 아래 고정 메뉴만큼 pb-32 여백 */
  page: "min-h-screen ink-bg px-4 pt-6 pb-32",
  /** 본문 최대 폭 */
  container: "max-w-md mx-auto",
  /** 카드 */
  card: "bg-[#fffdf7] dark:bg-[#2b251d] border-2 border-[#d8c8a6] dark:border-[#5c4b35] rounded-3xl shadow-sm",
  /** 카드 안쪽의 연한 상자 */
  innerBox: "bg-[#f6efe0] dark:bg-[#1f1a14] border border-[#d8c8a6] dark:border-[#5c4b35] rounded-2xl",
  /** 본문 글자 */
  body: "text-[20px] leading-relaxed text-stone-900 dark:text-stone-100 break-keep",
  /** 보조 글자 (대비 4.5:1 이상 유지) */
  muted: "text-[18px] leading-relaxed text-stone-700 dark:text-stone-300 break-keep",
  /** 큰 제목 */
  h1: "text-[34px] leading-tight font-bold text-stone-900 dark:text-stone-50 break-keep",
  /** 중간 제목 */
  h2: "text-[26px] leading-snug font-bold text-stone-900 dark:text-stone-50 break-keep",
  /** 포인트 색 글자 (주홍 / 다크모드는 금색) */
  accent: "text-[#8b1a1a] dark:text-[#e2c17a]",
  /** 키보드 포커스 링 */
  focus:
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f0e6] dark:focus-visible:ring-offset-[#1a1814]",
  /** 글자 입력칸 (높이 64px, 글자 22px) */
  input:
    "w-full min-h-[64px] px-4 rounded-2xl text-[22px] text-stone-900 dark:text-stone-50 bg-white dark:bg-[#1f1a14] border-2 border-stone-500 dark:border-stone-400 placeholder:text-stone-500 dark:placeholder:text-stone-400",
};

type ButtonVariant = "primary" | "secondary" | "kakao" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[#8b1a1a] text-white border-2 border-[#8b1a1a] hover:bg-[#731414] active:bg-[#5e0f0f] disabled:bg-stone-400 disabled:border-stone-400 disabled:text-white",
  secondary:
    "bg-white dark:bg-[#3a3128] text-stone-900 dark:text-stone-50 border-2 border-stone-500 dark:border-stone-400 hover:bg-stone-100 dark:hover:bg-[#4a4034] active:bg-stone-200",
  kakao: "bg-[#FEE500] text-[#191919] border-2 border-[#FEE500] hover:bg-[#f5dc00] active:bg-[#e6ce00]",
  ghost: "bg-transparent text-stone-800 dark:text-stone-200 border-2 border-transparent hover:bg-black/5 dark:hover:bg-white/10",
};

interface BigButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** 글자를 조금 작게 (보조 버튼 묶음용) */
  compact?: boolean;
  children: ReactNode;
}

/** 큰 버튼. 높이 64px 이상, 글자 22px 굵게 */
export function BigButton({ variant = "primary", compact = false, className = "", children, ...rest }: BigButtonProps) {
  return (
    <button
      type="button"
      // twMerge: 호출 측 className 의 min-h/text 크기가 기본값을 덮어쓰도록
      className={twMerge(
        "w-full rounded-2xl font-bold transition-colors duration-200 disabled:cursor-not-allowed",
        compact ? "min-h-[56px] px-3 py-2 text-[18px]" : "min-h-[64px] px-5 py-3 text-[22px]",
        variantClass[variant],
        cls.focus,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

interface BackButtonProps {
  label: string;
  /** 링크로 이동할 때 (없으면 onClick 버튼) */
  href?: string;
  onClick?: () => void;
}

/** 화면 왼쪽 위의 "뒤로" 버튼. 화살표와 글자를 함께 보여 준다 */
export function BackButton({ label, href, onClick }: BackButtonProps) {
  const inner = (
    <>
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span className="text-[18px] font-bold">{label}</span>
    </>
  );
  const common = `inline-flex items-center gap-1 min-h-[48px] pl-2 pr-4 rounded-full ${cls.card} text-stone-900 dark:text-stone-50 ${cls.focus}`;

  if (href) {
    return (
      <Link href={href} className={common} aria-label={label}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={common} aria-label={label}>
      {inner}
    </button>
  );
}

interface ToastProps {
  message: string | null;
}

/** 화면 아래쪽에 잠시 뜨는 안내 문구. aria-live 로 보조기기에도 읽힌다 */
export function Toast({ message }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className="fixed left-0 right-0 bottom-28 z-[60] flex justify-center px-4 pointer-events-none">
      {message && (
        <div className="max-w-md w-full bg-stone-900 text-white text-[18px] font-bold text-center rounded-2xl px-5 py-4 shadow-xl animate-fade-in break-keep">
          {message}
        </div>
      )}
    </div>
  );
}
