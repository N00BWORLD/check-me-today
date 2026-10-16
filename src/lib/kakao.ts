// 카카오 JavaScript SDK 연동 헬퍼
// - SDK 스크립트는 src/app/layout.tsx 에서 next/script 로 로드한다.
// - 앱 키(NEXT_PUBLIC_KAKAO_JS_KEY)가 없거나 SDK가 아직 로드되지 않았으면
//   shareKakaoFeed() 가 false 를 돌려주므로, 호출하는 쪽에서 링크 복사 등으로 폴백한다.

/** 공유 링크·OG 이미지의 기준이 되는 서비스 절대 URL */
export const SITE_URL = "https://check-me.today";

/** 카카오 개발자 콘솔에서 발급한 JavaScript 키 (Vercel 환경변수) */
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

// Kakao SDK 가 window 에 추가하는 전역 객체 (사용하는 부분만 타입 선언)
interface KakaoShareLink {
    mobileWebUrl?: string;
    webUrl?: string;
}

interface KakaoFeedPayload {
    objectType: "feed";
    content: {
        title: string;
        description?: string;
        imageUrl: string;
        imageWidth?: number;
        imageHeight?: number;
        link: KakaoShareLink;
    };
    buttons?: { title: string; link: KakaoShareLink }[];
    installTalk?: boolean;
}

interface KakaoSdk {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Share?: {
        sendDefault: (payload: KakaoFeedPayload) => void;
    };
}

declare global {
    interface Window {
        Kakao?: KakaoSdk;
    }
}

/** 앱 키가 설정돼 있고, SDK 스크립트가 window.Kakao 로 로드됐는지 확인 */
export function isKakaoAvailable(): boolean {
    return (
        typeof window !== "undefined" &&
        !!KAKAO_JS_KEY &&
        !!window.Kakao &&
        typeof window.Kakao.init === "function"
    );
}

/**
 * Kakao.init 을 한 번만 호출한다.
 * @returns 공유를 호출할 수 있는 상태면 true
 */
export function initKakao(): boolean {
    if (!isKakaoAvailable()) return false;
    const kakao = window.Kakao!;
    try {
        if (!kakao.isInitialized()) {
            kakao.init(KAKAO_JS_KEY!);
        }
        return kakao.isInitialized() && !!kakao.Share;
    } catch (err) {
        console.error("Kakao SDK 초기화 실패:", err);
        return false;
    }
}

/** /api/og 동적 OG 이미지의 절대 URL 을 만든다 (1200x630) */
export function buildOgImageUrl(params: {
    title: string;
    desc?: string;
    emoji?: string;
}): string {
    const search = new URLSearchParams();
    search.set("title", params.title);
    if (params.desc) search.set("desc", params.desc);
    if (params.emoji) search.set("emoji", params.emoji);
    return `${SITE_URL}/api/og?${search.toString()}`;
}

export interface KakaoFeedParams {
    /** 메시지 제목 */
    title: string;
    /** 메시지 본문 (2~3줄 권장) */
    description?: string;
    /** 썸네일 이미지 절대 URL. 생략하면 title/description/emoji 로 OG 이미지를 만든다 */
    imageUrl?: string;
    /** OG 이미지에 넣을 이모지 (imageUrl 생략 시 사용) */
    emoji?: string;
    /** 공유할 링크. 생략하면 현재 페이지 주소 */
    link?: string;
    /** 하단 버튼 문구. 기본값 "결과 보기" */
    buttonTitle?: string;
}

/**
 * 카카오톡 피드 메시지(이미지 + 제목 + 설명 + 버튼 링크)를 보낸다.
 * 데스크톱에서는 팝업이 열리므로 반드시 클릭 핸들러 안에서 동기적으로 호출할 것.
 * @returns SDK 로 공유를 띄웠으면 true, 불가능하면 false (호출 측에서 폴백 처리)
 */
export function shareKakaoFeed(params: KakaoFeedParams): boolean {
    if (!initKakao()) return false;

    const link = params.link ?? (typeof window !== "undefined" ? window.location.href : SITE_URL);
    const imageUrl =
        params.imageUrl ??
        buildOgImageUrl({ title: params.title, desc: params.description, emoji: params.emoji });
    const shareLink: KakaoShareLink = { mobileWebUrl: link, webUrl: link };

    try {
        window.Kakao!.Share!.sendDefault({
            objectType: "feed",
            content: {
                title: params.title,
                description: params.description,
                imageUrl,
                imageWidth: 1200,
                imageHeight: 630,
                link: shareLink,
            },
            buttons: [{ title: params.buttonTitle ?? "결과 보기", link: shareLink }],
        });
        return true;
    } catch (err) {
        console.error("카카오톡 공유 실패:", err);
        return false;
    }
}
