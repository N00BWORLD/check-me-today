"use client";

// 오늘의 운세 입력 화면: 이름(선택) + 생년월일 → 띠·별자리 미리 보기 → 복주머니 열기
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getStarSign, getZodiacAnimal, type FortuneInput } from "@/data/fortunes";
import LuckyPouch from "./LuckyPouch";
import { fortuneTexts } from "./texts";
import { cardClass, inputClass, primaryButtonClass } from "./styles";

const STORAGE_KEY = "fortuneInput";

interface Props {
  onSubmit: (input: FortuneInput) => void;
}

/** 해당 년/월의 마지막 날 */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function FortuneForm({ onSubmit }: Props) {
  const { lang } = useLanguage();
  const t = (key: keyof typeof fortuneTexts) => fortuneTexts[key][lang] || fortuneTexts[key].en;

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 지난번 입력을 기억해 둔다 (매일 다시 들어오는 사람이 많으므로). 저장소가 막혀 있으면 그냥 넘어간다
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Record<"name" | "year" | "month" | "day", string>>;
      // 효과 안에서 외부 저장소 값을 상태로 가져오는 1회성 동기화
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(saved.name ?? "");
      setYear(saved.year ?? "");
      setMonth(saved.month ?? "");
      setDay(saved.day ?? "");
    } catch {
      // 무시
    }
  }, []);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i), [currentYear]);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  const animal = year ? getZodiacAnimal(y) : null;
  const sign = month && day ? getStarSign(m, d) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !month || !day) return;
    if (d > daysInMonth(y, m)) {
      setError(t("invalidDate"));
      return;
    }
    setError(null);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, year, month, day }));
    } catch {
      // 무시
    }
    onSubmit({ name: name.trim(), year: y, month: m, day: d });
  };

  return (
    <main className="min-h-screen px-4 pt-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* 뒤로 */}
        <Link
          href="/"
          aria-label={t("back")}
          className="inline-flex w-10 h-10 rounded-full glass dark:bg-slate-800/80 items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* 타이틀 */}
        <div className="text-center mb-8">
          <LuckyPouch size={104} className="mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 break-keep">{t("title")}</h1>
          <p className="text-[#b3261e] dark:text-[#f0c060] font-semibold mb-3 break-keep">{t("subtitle")}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed break-keep">{t("intro")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={`${cardClass} p-6 space-y-5`}>
            {/* 이름 (선택) */}
            <div>
              <label htmlFor="fortune-name" className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                {t("name")} <span className="font-normal text-slate-400">({t("nameOptional")})</span>
              </label>
              <input
                id="fortune-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                maxLength={20}
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 break-keep">{t("nameHint")}</p>
            </div>

            {/* 생년월일 */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{t("birthDate")}</label>
              <div className="grid grid-cols-3 gap-2">
                <select value={year} onChange={(e) => setYear(e.target.value)} className={`${inputClass} text-center`} required aria-label={t("year")}>
                  <option value="">{t("year")}</option>
                  {years.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className={`${inputClass} text-center`} required aria-label={t("month")}>
                  <option value="">{t("month")}</option>
                  {months.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <select value={day} onChange={(e) => setDay(e.target.value)} className={`${inputClass} text-center`} required aria-label={t("day")}>
                  <option value="">{t("day")}</option>
                  {days.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>

            {/* 띠·별자리 미리 보기 */}
            {(animal || sign) && (
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1 animate-fade-in">
                <span className="text-sm text-slate-500 dark:text-slate-400">{t("yourSigns")}</span>
                {animal && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fdebd3] dark:bg-[#4a3220] text-[#8a3b12] dark:text-[#f3cf8a] text-sm font-bold">
                    {animal.emoji} {animal.name[lang] || animal.name.en}
                  </span>
                )}
                {sign && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e8ecf9] dark:bg-[#2b3250] text-[#2f3f8f] dark:text-[#b9c4f5] text-sm font-bold">
                    {sign.symbol} {sign.name[lang] || sign.name.en}
                  </span>
                )}
              </div>
            )}
          </div>

          <button type="submit" className={primaryButtonClass}>
            {t("submit")}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 break-keep">{t("disclaimer")}</p>
      </div>
    </main>
  );
}
