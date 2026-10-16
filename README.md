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
