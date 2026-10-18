"use client";

// 부위별 관상 가이드 페이지(/face-reading/guide/[part]) 본문
// 서버가 한국어로 렌더링한 HTML 을 검색엔진이 읽고, 클라이언트에서 사용자의 언어로 바뀐다.
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  FACE_GUIDE_PATH,
  FACE_READING_PATH,
  faceGuideTexts,
  getFaceGuidePath,
  getFaceTypePath,
  type FaceGuidePart,
} from "@/data/face-reading-guide";
import { HOME_LABEL } from "@/lib/breadcrumb";
import { TypeImage } from "@/app/face-reading/_components/ui";
import AdUnit from "@/components/AdUnit";
import RecommendedTests from "@/components/RecommendedTests";
import { AnalyzeCta, gcls, GuideBreadcrumb, GuideDisclaimer, Paragraphs, SectionHeading } from "./guideUi";
import type { PartSummary, TypeSummary } from "./summaries";

interface Props {
  part: FaceGuidePart;
  relatedTypes: TypeSummary[];
  otherParts: PartSummary[];
}

export default function FaceGuideView({ part, relatedTypes, otherParts }: Props) {
  const { t } = useLanguage();

  return (
    <main className={gcls.page}>
      <div className={gcls.container}>
        <GuideBreadcrumb
          items={[
            { href: "/", label: HOME_LABEL },
            { href: FACE_READING_PATH, label: faceGuideTexts.faceReadingCrumb },
            { href: FACE_GUIDE_PATH, label: faceGuideTexts.guideCrumb },
            { label: part.name },
          ]}
        />

        {/* 머리: 한자 + 제목 + 요약 */}
        <header className={`${gcls.card} overflow-hidden !p-0 mb-6 animate-fade-in`}>
          <div className="ink-header px-6 py-7 text-center">
            <p className="text-[#e2c17a] text-[40px] leading-none font-serif mb-3" aria-hidden="true">
              {part.hanja}
            </p>
            <h1 className={`${gcls.h1} !text-[#fbf7ee]`}>{t(part.heading)}</h1>
          </div>
          <div className="px-5 sm:px-7 py-5">
            <p className={gcls.body}>{t(part.description)}</p>
            {part.featureId && (
              <p className={`${gcls.muted} mt-3`}>
                <span aria-hidden="true">✅ </span>
                {t(faceGuideTexts.testAsksThis)}
              </p>
            )}
          </div>
        </header>

        {/* 전통 관상학에서의 의미 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="guide-meaning">
          <SectionHeading id="guide-meaning" mark="相">
            {t(faceGuideTexts.meaningSection)}
          </SectionHeading>
          <Paragraphs text={t(part.intro)} />
        </section>

        {/* 형태별 해석 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="guide-shapes">
          <SectionHeading id="guide-shapes" mark="形">
            {t(faceGuideTexts.shapesSection)}
          </SectionHeading>
          <ul className="space-y-4">
            {part.shapes.map((shape, i) => (
              <li key={i} className={gcls.inner}>
                <h3 className={`${gcls.h3} mb-2`}>
                  <span className={`${gcls.accent} mr-2`} aria-hidden="true">
                    {i + 1}.
                  </span>
                  {t(shape.name)}
                </h3>
                <p className={gcls.body}>{t(shape.meaning)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 내 관상 분석해 보기 */}
        <AnalyzeCta className="mb-6" />

        {/* 광고: 본문 콘텐츠 아래 */}
        <div className="mb-6">
          <AdUnit slot="default" format="auto" className="min-h-[100px] rounded-xl" />
        </div>

        {/* 보는 법과 주의할 점 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="guide-tips">
          <SectionHeading id="guide-tips" mark="法">
            {t(faceGuideTexts.tipsSection)}
          </SectionHeading>
          <Paragraphs text={t(part.tips)} />
        </section>

        {/* 자주 묻는 질문 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="guide-faq">
          <SectionHeading id="guide-faq" mark="問">
            {t(faceGuideTexts.faqSection)}
          </SectionHeading>
          <dl className="space-y-4">
            {part.faq.map((f, i) => (
              <div key={i} className={gcls.inner}>
                <dt className={`${gcls.h3} mb-2`}>Q. {t(f.question)}</dt>
                <dd className={gcls.body}>{t(f.answer)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 관련 결과 유형 */}
        {relatedTypes.length > 0 && (
          <section className={`${gcls.card} mb-6`} aria-labelledby="guide-types">
            <SectionHeading id="guide-types" mark="類">
              {t(faceGuideTexts.relatedTypesSection)}
            </SectionHeading>
            <ul className="grid grid-cols-2 gap-3">
              {relatedTypes.map((r) => (
                <li key={r.id}>
                  <Link
                    href={getFaceTypePath(r.id)}
                    className={`block h-full ${gcls.inner} text-center hover:bg-white/80 dark:hover:bg-[#2b251d] transition-colors ${gcls.focus}`}
                  >
                    <TypeImage id={r.id} emoji={r.emoji} alt="" size={96} className="w-24 h-24 my-0 mb-2 rounded-2xl border-2" />
                    <p className={`${gcls.accent} text-[14px] font-serif tracking-widest`} aria-hidden="true">
                      {r.hanja}
                    </p>
                    <p className={`${gcls.h3} text-[18px]`}>{t(r.type)}</p>
                    <p className={`${gcls.muted} text-[14px] mt-1`}>{t(r.subtitle)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 다른 부위 */}
        <section className={`${gcls.card} mb-6`} aria-labelledby="guide-others">
          <SectionHeading id="guide-others" mark="他">
            {t(faceGuideTexts.otherPartsSection)}
          </SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {otherParts.map((p) => (
              <li key={p.id}>
                <Link
                  href={getFaceGuidePath(p.id)}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#f6efe0] dark:bg-[#1f1a14] border border-[#d8c8a6] dark:border-[#5c4b35] text-[16px] font-bold text-stone-900 dark:text-stone-100 hover:bg-white dark:hover:bg-[#2b251d] transition-colors ${gcls.focus}`}
                >
                  <span aria-hidden="true">{p.emoji}</span>
                  {t(p.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={FACE_GUIDE_PATH} className={`inline-flex items-center px-4 py-2 text-[16px] font-bold ${gcls.link}`}>
                {t(faceGuideTexts.guideCrumb)} →
              </Link>
            </li>
          </ul>
        </section>

        <AnalyzeCta className="mb-6" />
        <GuideDisclaimer />
        <RecommendedTests currentTestId="face-reading" />
      </div>
    </main>
  );
}
