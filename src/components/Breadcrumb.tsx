"use client";

// 공용 빵부스러기(Breadcrumb) 내비게이션: 홈 > 카테고리 > 테스트
// - 크롤러가 따라갈 수 있도록 실제 <a href>(next/link) 로 렌더링한다
// - 라벨은 4개 언어 객체. 서버 HTML 에는 한국어(LanguageProvider 초기값)가 담긴다
// - 검색엔진용 BreadcrumbList JSON-LD 는 withJsonLd 로 켠다 (페이지가 따로 넣는 경우 끈다)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/breadcrumb";

// 항목 생성 헬퍼(HOME_LABEL, getTestBreadcrumbItems, buildBreadcrumbJsonLd)는 src/lib/breadcrumb.ts 에서 import 할 것
// ("use client" 파일에서 다시 내보내면 서버 컴포넌트에서 호출할 수 없게 된다)

interface Props {
    items: BreadcrumbItem[];
    className?: string;
    /** BreadcrumbList JSON-LD 를 함께 출력할지 (기본 true) */
    withJsonLd?: boolean;
}

export default function Breadcrumb({ items, className = "", withJsonLd = true }: Props) {
    const { t } = useLanguage();
    // 서버·클라이언트 모두 같은 값이 나오므로 hydration 불일치가 없다
    const pathname = usePathname();

    return (
        <nav aria-label="Breadcrumb" className={`text-xs text-slate-500 dark:text-slate-400 ${className}`}>
            {withJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            ...buildBreadcrumbJsonLd(items, pathname),
                        }),
                    }}
                />
            )}
            <ol className="flex flex-wrap items-center gap-1">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center gap-1 min-w-0">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap"
                                >
                                    {t(item.label)}
                                </Link>
                            ) : (
                                <span aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                                    {t(item.label)}
                                </span>
                            )}
                            {!isLast && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">›</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
