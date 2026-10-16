// 빵부스러기(Breadcrumb) 공용 헬퍼 — 서버·클라이언트 어디서든 import 가능
// (컴포넌트는 src/components/Breadcrumb.tsx. "use client" 파일에서 내보낸 함수는 서버에서 호출할 수 없어 여기로 분리)
import { categories, getCategoryPath, hasCategoryLanding, type TestData } from "@/data/tests";

export interface BreadcrumbItem {
    /** 링크 경로. 마지막 항목(현재 페이지)은 생략 */
    href?: string;
    label: Record<string, string>;
}

const SITE_URL = "https://check-me.today";

export const HOME_LABEL = { ko: "홈", en: "Home", zh: "首页", ja: "ホーム" };

/** 테스트 페이지용 항목: 홈 > (카테고리 페이지가 있으면) 카테고리 > 테스트 */
export function getTestBreadcrumbItems(test: TestData): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [{ href: "/", label: HOME_LABEL }];
    const category = categories.find((c) => c.id === test.category);
    if (category && hasCategoryLanding(category.id)) {
        items.push({ href: getCategoryPath(category.id), label: category.name });
    }
    items.push({ label: test.name });
    return items;
}

/** BreadcrumbList JSON-LD 생성 (한국어 라벨 기준). currentPath 는 마지막 항목의 경로 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[], currentPath: string) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label.ko || item.label.en,
            item: `${SITE_URL}${item.href ?? currentPath}`,
        })),
    };
}
