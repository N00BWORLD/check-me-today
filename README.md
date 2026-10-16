# Check Me Today

**심리테스트/운세 웹사이트** (Next.js 16 + React 19 + Tailwind CSS)

- 🌐 다국어 지원: 한국어, 영어, 중국어, 일본어
- 🌓 다크/라이트 모드 지원
- 📊 Firebase 통계 연동
- 🚀 Vercel 배포

---

## 📂 프로젝트 구조 (Project Structure)

```text
src/
├── app/
│   ├── page.tsx              # 홈 (테스트 목록)
│   ├── layout.tsx            # 루트 레이아웃 (Global)
│   ├── globals.css           # 전역 스타일 (Tailwind)
│   │
│   ├── test/                 # 에너지 밸런스 테스트 (Legacy)
│   │
│   ├── fortune/              # 오늘의 운세
│   ├── face-reading/         # 관상 분석
│   ├── animal-test/          # 나의 동물 자아
│   ├── menu-recommendation/  # 오늘의 메뉴 추천
│   ├── spending-test/        # 소비 유형 테스트 (New)
│   │
│   ├── result/               # 결과 페이지 (공용)
│   ├── analyzing/            # 분석 중 (광고 화면)
│   ├── privacy/              # 개인정보처리방침
│   └── terms/                # 이용약관
│
├── components/               # 공용 컴포넌트
│   ├── AdUnit.tsx            # 광고
│   ├── PosterCard.tsx        # 홈 테스트 카드
│   └── ...
│
├── data/                     # 데이터 파일 (질문, 결과 등)
├── context/                  # Context API (테마, 언어)
├── hooks/                    # Custom Hooks
└── lib/                      # 유틸리티 (Firebase 등)
```

---

## 🚀 시작하기 (Getting Started)

개발 서버 실행:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 📏 핵심 개발 규칙 (Core Rules)

### 1. 테스트 추가 가이드
새로운 테스트를 추가할 때는 **독립적인 컴포넌트 구조**를 유지해야 합니다.

1.  **폴더 생성**: `src/app/[test-slug]/`
2.  **데이터 작성**: `src/data/[test-slug].ts`
3.  **등록**: `src/data/tests.ts`

### 2. 코드 스타일 (Code Style)
- **주석**: 한국어 주석 권장
- **스타일링**: Tailwind CSS 사용 (인라인 스타일 지양)
- **다국어**: `useLanguage()` 훅 사용

### 3. 공유 기능 (Share)
- 결과 페이지는 인스타그램 스토리 비율(세로형) 최적화
- `html2canvas`를 사용한 이미지 저장 기능 포함

- 결과 페이지의 공유 버튼 묶음은 `src/components/ResultActions.tsx` (네이티브 공유 / 이미지 저장 / 링크 복사 / X / 카카오톡)
- 카카오톡 버튼은 `src/lib/kakao.ts` 의 `shareKakaoFeed()` 로 피드 메시지(이미지 + 제목 + 설명 + 버튼 링크)를 보낸다.
  썸네일은 `/api/og?title=&desc=&emoji=` 동적 OG 이미지를 쓴다. 앱 키가 없으면 링크 복사로 폴백한다.

#### 카카오톡 공유 설정 (NEXT_PUBLIC_KAKAO_JS_KEY)

1. [카카오 개발자 사이트](https://developers.kakao.com)에 로그인 → **내 애플리케이션 → 애플리케이션 추가하기** 로 앱을 만든다.
2. **앱 키** 메뉴에서 **JavaScript 키**를 복사한다.
3. **플랫폼 → Web → 사이트 도메인** 에 `https://check-me.today` 를 등록한다. (로컬 테스트용으로 `http://localhost:2222` 도 추가 가능)
4. **카카오 로그인 / 동의항목은 필요 없음**. 공유만 쓰므로 "카카오톡 공유(Kakao Share)" 는 별도 활성화 없이 동작한다.
5. Vercel 대시보드 → 프로젝트 → **Settings → Environment Variables** 에 `NEXT_PUBLIC_KAKAO_JS_KEY` = (JavaScript 키) 를 Production/Preview 에 추가하고 **다시 배포**한다.
   (`NEXT_PUBLIC_` 변수는 빌드 시점에 번들에 들어가므로 변수 추가 후 재배포가 필요하다.)
6. 로컬에서는 `.env.example` 을 복사해 `.env.local` 을 만들고 같은 키를 넣는다. 키가 없으면 카카오톡 버튼은 링크 복사로 동작한다.

### 4. 광고 (Ads)
- 결과 확인 전 `analyzing` 단계에서 전면 광고 노출 (권장 5초)
- AdSense ID: `ca-pub-8585338769159452` (public/ads.txt 와 동일)
- 게시자 ID·광고 슬롯 ID 설정: `src/lib/ads.ts` (슬롯 ID가 비어 있으면 해당 위치는 렌더링되지 않음)

### 5. Git 워크플로우
- 작업(Task) 단위 완료 시 즉시 `git push` 실행
- 커밋 메시지는 논리적 작업 단위를 명확히 기술

---

## 📚 기술 스택
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Context API
- **Deployment**: Vercel

자세한 내용은 [Next.js 문서](https://nextjs.org/docs)를 참고하세요.
