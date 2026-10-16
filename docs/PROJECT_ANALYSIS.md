# check-me.today 프로젝트 구조 분석

> 작성일: 2026-10-16 · 기준 커밋: `bed7bcd` (main, 123 commits) · 분석 도구: Claude Code
> 목적: 블로그 글 소재 정리 + 앞으로 사이트를 발전시키기 위한 기준 문서

---

## 1. 한눈에 보기

| 항목 | 내용 |
|---|---|
| 서비스 | 심리테스트 · 운세 · 미니게임 모음 웹앱 (check-me.today) |
| 저장소 | https://github.com/N00BWORLD/check-me-today |
| 프레임워크 | Next.js 16 (App Router) + React 19 + TypeScript |
| 스타일 | Tailwind CSS 3 + 글래스모피즘 커스텀 CSS, Pretendard 폰트(CDN) |
| 데이터/백엔드 | Firebase (Firestore 통계, 익명 Auth). 별도 서버 없음 |
| 배포 | Vercel (main 브랜치 push 시 자동 배포, 서울 리전 icn1) |
| 수익화 | Google AdSense (`ca-pub-8585338769159452`) |
| 다국어 | ko / en / zh / ja (Context 기반, 코드 내 객체 번역) |
| 테마 | 다크/라이트 (class 기반) |
| 모바일 | PWA (manifest + service worker + 설치 유도 배너) |
| 개발 기간 | 2025-12-06 ~ 2025-12-25 (약 3주, 123 커밋) |
| 코드 규모 | `src/` 63개 파일, 약 11,000줄 |

**현재 라이브 상태 (2026-10-16 확인)**
- 홈에 AdSense 스크립트 정상 삽입됨, `/ads.txt` 정상 응답
- `/sitemap.xml`, `/robots.txt` 정상 생성
- 네이버 사이트 인증 메타태그 적용됨
- 구글 사이트 인증 메타태그는 **자리표시자 문자열** 그대로임 (6절 "발견한 문제" 참고)

---

## 2. 기술 스택 상세

```
next 16.0.7 / react 19.2.0 / typescript 5
tailwindcss 3.4 / postcss / autoprefixer
firebase 12 (firestore, auth)
framer-motion 12        <- 애니메이션
html2canvas 1.4         <- 결과 카드 이미지 저장
face-api.js + tfjs      <- 관상 분석(얼굴 인식, 브라우저에서 실행)
matter-js               <- 메뉴 추천 물리 룰렛
clsx / tailwind-merge   <- 클래스 유틸
```

- 개발 서버 포트는 **2222** (`npm run dev` = `next dev -p 2222`). README의 "localhost:3000"은 오래된 설명.
- `next.config.ts`는 비어 있음(기본 설정). `vercel.json` 없음. Vercel이 Next.js를 자동 감지해 빌드.
- 환경변수 파일 없음. Firebase 설정값은 `src/lib/firebase.ts`에 하드코딩 (Firebase 웹 키는 공개 키라 치명적이진 않지만, 보안 규칙이 중요해짐).

---

## 3. 폴더 구조

```
check-me.today/
├── src/
│   ├── app/                        # Next.js App Router (URL = 폴더)
│   │   ├── layout.tsx              # 루트 레이아웃: 메타데이터, AdSense 스크립트, JSON-LD, 폰트, Provider
│   │   ├── page.tsx                # 홈: 추천 배너 + 검색 + 카테고리 탭 + 테스트 카드 그리드 + 하단 광고
│   │   ├── globals.css             # 디자인 시스템 (CSS 변수, 글래스 효과, 애니메이션)
│   │   ├── robots.ts               # robots.txt 자동 생성
│   │   ├── sitemap.ts              # sitemap.xml 자동 생성 (tests.ts 기반)
│   │   ├── api/og/route.tsx        # 동적 OG 이미지 생성 (Satori, Edge 런타임)
│   │   │
│   │   ├── test/                   # 에너지 밸런스 테스트 (/test)
│   │   ├── fortune/                # 오늘의 운세 (/fortune)
│   │   ├── face-reading/           # 관상 분석 (/face-reading, 1,184줄로 가장 큰 페이지)
│   │   ├── animal-test/            # 나의 동물 자아 (/animal-test)
│   │   ├── love-test/              # 연애 유형 테스트 (/love-test) + _components/
│   │   ├── menu-recommendation/    # 메뉴 추천 (/menu-recommendation) + _components/ (룰렛)
│   │   ├── spending-test/          # 소비 성향 테스트 (/spending-test)
│   │   ├── tests/[slug]/           # 동적 라우트. 현재는 반응속도 게임만 실제 동작
│   │   │
│   │   ├── analyzing/              # "분석 중" 5초 화면 = 광고 노출 지점
│   │   ├── result/                 # 공용 결과 페이지 (에너지밸런스·연애 테스트용)
│   │   ├── privacy/ terms/         # 개인정보처리방침, 이용약관 (AdSense 승인 필수 페이지)
│   │   └── favicon.ico
│   │
│   ├── components/                 # 공용 컴포넌트 (16개)
│   │   ├── AdUnit.tsx              # ★ AdSense 광고 단위
│   │   ├── PosterCard.tsx          # 홈 테스트 카드 (클릭 애니메이션 후 라우팅)
│   │   ├── Quiz.tsx / ResultCard.tsx       # 에너지 밸런스 전용
│   │   ├── ResultActions.tsx       # 좋아요·공유·이미지저장·다른 테스트 버튼 묶음
│   │   ├── RecommendedTests.tsx    # 결과 하단 "다른 테스트" 2개 추천
│   │   ├── ReactionGame.tsx        # 반응속도 게임
│   │   ├── BottomNav.tsx           # 모바일 하단 네비게이션
│   │   ├── InstallPrompt.tsx       # PWA 설치 배너 + service worker 등록
│   │   ├── LanguageSelector.tsx / ThemeToggle.tsx / SearchBar.tsx / CategoryTabs.tsx
│   │   └── AppCard.tsx / AppIcon.tsx / TestCard.tsx   # 대체 카드 스타일 (일부 미사용 가능성)
│   │
│   ├── data/                       # ★ 콘텐츠 데이터 (코드와 분리)
│   │   ├── tests.ts                # ★★ 테스트 레지스트리. 여기에 추가하면 홈·사이트맵에 자동 반영
│   │   ├── questions.ts            # 에너지 밸런스 질문/결과
│   │   ├── animal-test.ts (1,035줄) / face-reading.ts (808줄) / love-test.ts
│   │   └── fortunes.ts / menu-recommendation.ts / spending-test.ts
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx     # lang 상태 + t() 번역 함수 + uiTexts 사전
│   │   └── ThemeContext.tsx        # 다크/라이트 토글
│   ├── hooks/useTestStats.ts       # 조회수·좋아요 훅 (sessionStorage/localStorage로 중복 방지)
│   └── lib/
│       ├── firebase.ts             # Firebase 초기화 + 통계 읽기/증가
│       ├── counters.ts             # 분산 카운터 (10개 샤드로 쓰기 분산)
│       ├── auth.ts                 # 익명 로그인, 구글 계정 연동
│       └── db.ts                   # 사용자별 결과 저장 (/users/{uid}/results)
│
├── public/
│   ├── ads.txt                     # ★ AdSense 판매자 인증 파일
│   ├── manifest.json               # PWA 매니페스트
│   ├── sw.js                       # service worker (푸시 알림 수신용, 캐싱 없음)
│   ├── models/                     # face-api.js 모델 파일 (564KB)
│   ├── icon-*.png, apple-icon.png, og-image.png
│   └── naver99e7….html             # 네이버 서치어드바이저 소유 확인 파일
│
├── docs/
│   ├── I18N_GUIDELINES.md          # 다국어 규칙
│   ├── UI_GUIDELINES.md            # 결과 페이지 버튼 레이아웃 규칙
│   └── PROJECT_ANALYSIS.md         # (이 문서)
├── GUIDE_NEW_TEST.md               # 새 테스트 추가 절차
├── README.md
├── .cursorrules / .agent/rules/    # AI 에디터용 프로젝트 규칙 (Cursor, Antigravity)
├── firestore.rules                 # Firestore 보안 규칙 (Firebase 콘솔에 수동 배포 필요)
├── tailwind.config.ts / postcss.config.mjs / tsconfig.json / eslint.config.mjs
│
└── (정리 대상) ub/, orcheck_me_today, remove_bg.py   <- 6절 참고
```

---

## 4. 핵심 동작 흐름

### 4-1. 사용자 여정
```
홈(/)  →  테스트 랜딩(/slug)  →  질문 N개  →  /analyzing (5초, 광고)  →  /result?test=…&type=…  →  공유 / 좋아요 / 다른 테스트
```
- 홈 카드 클릭 시 0.8초 애니메이션 후 `router.push`.
- 결과는 **URL 쿼리스트링**에 담김. 링크만 공유해도 같은 결과가 열림 (DB 조회 불필요).
- `/analyzing`은 진행바 + 메시지 + `<AdUnit />`. 80% 이후 "결과 보기" 스킵 버튼 등장.
- 일부 테스트(운세, 관상, 동물, 메뉴, 소비)는 공용 `/result`를 안 쓰고 **자기 페이지 안에서 상태(state)로 결과 화면까지 처리**함. 즉 두 가지 패턴이 공존.

### 4-2. 테스트 등록 시스템 (데이터 주도)
`src/data/tests.ts`의 `tests[]` 배열 한 곳에 객체를 추가하면:
- 홈 카드 그리드, 카테고리 필터, 검색, HOT/NEW 배지에 자동 반영
- `sitemap.ts`가 이 배열을 읽어 사이트맵 생성
- `id`는 Firebase 문서 키, `slug`는 URL

페이지 자체는 `src/app/[slug]/page.tsx`를 **직접 만들어야** 함. 각 테스트가 고유 UI를 가지도록 범용 Quiz를 쓰지 않는 것이 프로젝트 원칙(.agent/rules 참고).

### 4-3. 다국어 / 테마
- 번역 라이브러리(i18next 등) 없이 `{ ko, en, zh, ja }` 객체 + `useLanguage().t()` 또는 `text[lang]`.
- 장점: 의존성 0, 단순. 단점: 텍스트가 컴포넌트·데이터에 흩어져 있어 일괄 번역 관리가 어려움.
- 다크모드는 `<html class="dark">` 토글 방식 (`tailwind darkMode: "class"`).

---

## 5. 수익화 · SEO · 인프라 (블로그 핵심 소재)

### 5-1. AdSense 적용 구조
| 요소 | 위치 | 내용 |
|---|---|---|
| 스크립트 로드 | `src/app/layout.tsx` | `next/script`로 `adsbygoogle.js?client=ca-pub-8585338769159452` 삽입, `afterInteractive` 전략 |
| 광고 단위 | `src/components/AdUnit.tsx` | `<ins class="adsbygoogle">` + `useEffect`에서 `adsbygoogle.push({})` |
| ads.txt | `public/ads.txt` | `google.com, pub-8585338769159452, DIRECT, f08c47fec0942fa0` |
| 노출 지점 | 홈 하단 / analyzing / result 하단 / tests/[slug] 상·하단 | |
| 필수 페이지 | `/privacy`, `/terms` | AdSense 심사용 |

**주의**: 현재 모든 `AdUnit`의 `slotId`가 `"1234567890"` 또는 `"0987654321"` 자리표시자. 승인 후 AdSense 콘솔에서 만든 실제 광고 단위 ID로 바꿔야 수동 광고가 노출됨. (자동 광고를 켜면 스크립트만으로도 노출됨.)

### 5-2. SEO
- `metadata` 객체(App Router 방식)로 title 템플릿, description, keywords, OG, Twitter 카드, robots 설정.
- `robots.ts` / `sitemap.ts`를 Next.js가 `/robots.txt`, `/sitemap.xml`로 서빙.
- `api/og/route.tsx`: Satori(`next/og`)로 **URL 파라미터 기반 OG 이미지 동적 생성**. 결과 타입·점수를 넣어 공유 썸네일을 바꿀 수 있음. Pretendard OTF를 CDN에서 받아 한글 렌더링.
- JSON-LD(`WebSite` + `SearchAction`) 삽입.
- 네이버 서치어드바이저: 메타태그 + HTML 파일 둘 다 적용.
- 각 테스트 폴더의 `layout.tsx`에서 페이지별 OG 메타 지정.

### 5-3. Firebase
- **통계**: `tests/{id}` 문서에 `playCount`, `likeCount`. 추가로 `tests/{id}/shards/{0-9}` 분산 카운터(동시 쓰기 분산).
- **중복 방지**: 조회수는 `sessionStorage`, 좋아요는 `localStorage` 키로 클라이언트에서 차단 (우회 가능, 가벼운 수준).
- **익명 로그인 + 결과 저장**: `auth.ts`, `db.ts`에 구현돼 있으나 실제 페이지에서 호출되는지 확인 필요(리텐션 기능 준비 단계).
- `firestore.rules`: `tests/*`는 누구나 read/update 허용. 카운터 조작이 가능한 구조이므로 추후 Cloud Function 또는 규칙 강화 검토.

### 5-4. PWA
- `manifest.json` (standalone, 192/512 아이콘, maskable).
- `InstallPrompt.tsx`: Android는 `beforeinstallprompt` 이벤트, iOS는 3초 후 "홈 화면에 추가" 안내.
- `sw.js`: 푸시 알림 수신/클릭 핸들러만 있음. 오프라인 캐싱 없음. 설치 유도 문구("매일 운세 알림")에 맞는 푸시 발송 백엔드는 아직 없음.

### 5-5. Vercel 배포
- GitHub 연동으로 `main` push 시 자동 빌드·배포. 설정 파일 없이 Next.js 자동 감지.
- 응답 헤더 `Server: Vercel`, `X-Vercel-Id: icn1…`로 서울 엣지 캐시 서빙 확인.
- `/api/og`는 Edge Runtime으로 실행.

---

## 6. 발견한 문제 · 정리 필요 항목

우선순위 순.

| # | 문제 | 영향 | 조치 |
|---|---|---|---|
| 1 | ~~사이트맵이 `/tests/<slug>`를 가리키는데, 반응속도 게임 외 테스트는 실제로 `/<slug>`에 있음~~ **(2026-10-16 수정됨)** | 검색엔진이 빈 페이지를 색인 | `getTestPath()`를 `tests.ts`에 추가해 사이트맵·홈·카드가 공통 사용. `/tests/[slug]`로 잘못 들어오면 실제 경로로 리다이렉트 |
| 2 | ~~구글 사이트 인증값이 `"google-site-verification-code"` 자리표시자~~ **(수정됨)** | 가짜 메타태그 출력 | 자리표시자 제거. 실제 코드는 `layout.tsx`의 `verification.google` 주석 자리에 넣으면 됨 |
| 3 | ~~AdSense `slotId` 전부 자리표시자~~ **(구조 수정됨, 실제 ID 입력 필요)** | 수동 광고 단위 미노출 | 슬롯 ID를 `src/lib/ads.ts`의 `AD_SLOTS`로 모음. 비어 있으면 렌더링 안 함. AdSense 콘솔에서 광고 단위를 만들고 ID를 채울 것 |
| 4 | ~~문서의 AdSense ID `9155498101026498`와 코드의 `8585338769159452`가 다름~~ **(수정됨)** | 혼선 | README, .cursorrules, .agent/rules를 코드 기준으로 통일 |
| 5 | `ub/` 폴더: 검열 우회용 Electron 브라우저 프로젝트가 저장소에 섞여 있음 | 사이트와 무관, 공개 저장소 인상에 영향 | 별도 저장소로 분리 또는 삭제 |
| 6 | `orcheck_me_today`(옛 tests.ts 사본), `remove_bg.py`(삭제된 비주얼노벨 자산용 스크립트) | 불필요 파일 | 삭제 |
| 7 | `firestore.rules`에서 `tests/*` update 전체 허용 | 통계 조작 가능 | 규칙 강화 또는 서버 함수로 이동 |
| 8 | `tests/[slug]/page.tsx`에 `force-dynamic`과 `generateStaticParams` 동시 선언 | 모순 설정(동작은 함) | 하나로 정리 |
| 9 | 아이콘 파일 중복(`icon-192.png` / `icon-192x192.png` 등), `og-test.png`를 참조하나 파일 없음 | 공유 썸네일 깨짐 가능 | 파일 정리 |
| 10 | `.agent/rules`에 연애 테스트 "준비중"으로 표기. 실제로는 활성 | 문서 불일치 | 갱신 |
| 11 | README 포트 3000 표기, 실제 2222 | 문서 불일치 | 갱신 |
| 12 | 테마/언어 값이 클라이언트에서만 결정되어 첫 렌더 깜빡임 가능성 | UX | `suppressHydrationWarning`로 완화 중, 필요 시 쿠키 기반으로 |

---

## 7. 블로그 시리즈 제안 (이 저장소로 쓸 수 있는 글)

1. **"심리테스트 사이트, Next.js + Vercel로 3주 만에 만들기"**: 스택 선택 이유, App Router 폴더 구조, 데이터 주도 설계(`tests.ts` 하나로 홈·사이트맵 자동화)
2. **"Vercel 무료 배포 + 커스텀 도메인 연결"**: GitHub 연동, 자동 배포, 서울 리전, 도메인 DNS
3. **"Next.js 사이트에 구글 애드센스 붙이기"**: 스크립트 삽입(`next/script`), ads.txt, 개인정보처리방침/약관, 광고 단위 컴포넌트, '분석 중' 화면으로 광고 노출 시간을 확보하는 UX
4. **"네이버·구글 검색 등록과 SEO"**: metadata API, sitemap/robots 자동 생성, 네이버 서치어드바이저 인증, JSON-LD
5. **"공유 썸네일을 결과마다 다르게: Satori 동적 OG 이미지"**: `/api/og` 코드 해설, 한글 폰트 로딩
6. **"서버 없이 조회수·좋아요: Firebase Firestore + 분산 카운터"**
7. **"PWA로 앱처럼 설치되게 만들기"**: manifest, 설치 배너, iOS 대응
8. **"다국어 4개를 라이브러리 없이 처리한 방법과 한계"**
9. **"결과 카드를 이미지로 저장: html2canvas 삽질기"**
10. **"브라우저에서 얼굴 인식하는 관상 테스트 (face-api.js)"**

---

## 8. 앞으로의 개발 방향 (제안)

- **단기**: 6절 1~4번 수정 (SEO·수익 직결), 불필요 파일 정리
- **콘텐츠**: `tests.ts` 등록 후 새 테스트 폴더 생성 패턴으로 테스트 추가 (GUIDE_NEW_TEST.md 절차)
- **SEO 강화**: 테스트별 소개 글(정적 텍스트) 추가, 결과 타입별 정적 페이지(`/result/[type]`) 생성으로 색인 면적 확대
- **수익 최적화**: 결과 페이지 광고 위치 A/B, 자동 광고 병행
- **리텐션**: 익명 Auth + 결과 저장 기능을 실제 UI에 연결, 푸시 알림 백엔드
- **품질**: 테스트 코드 없음. 최소한 빌드·린트 CI(GitHub Actions) 추가
