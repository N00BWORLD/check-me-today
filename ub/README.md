# UB (Unblock Browser)

검열 없는 안전한 브라우징을 위한 Electron 기반 브라우저입니다.

## 주요 기능

- 🌐 **Tor 네트워크 지원**: 프록시 없이도 사용 가능! Tor Browser 설치 시 자동 연결
- 🔐 **프록시 지원**: HTTP, SOCKS4, SOCKS5 프록시 지원
- 🌐 **DNS over HTTPS**: 암호화된 DNS 쿼리로 DNS 차단 우회
- 🛡️ **추적 방지**: 자동 추적 방지 및 쿠키 관리
- 🔒 **프라이버시 강화**: User-Agent 랜덤화, Referer 제거 등

## 설치 방법

1. 의존성 설치:
```bash
npm install
```

2. 실행:
```bash
npm start
```

개발 모드 (개발자 도구 포함):
```bash
npm run dev
```

## 사용 방법

### 방법 1: Tor 네트워크 사용 (추천 - 프록시 불필요!)

1. **Tor Browser 설치** (선택사항이지만 권장):
   - [Tor Browser 다운로드](https://www.torproject.org/download/)
   - 설치 후 실행하여 Tor 네트워크 연결

2. **UB 브라우저에서 Tor 활성화**:
   - 설정 버튼(⚙️) 클릭
   - "Tor 네트워크 사용" 체크
   - "자동 연결" 체크 (Tor Browser 설치 시)
   - "Tor 설정 저장" 클릭

3. 이제 프록시 없이도 차단된 사이트에 접속 가능!

### 방법 2: DNS over HTTPS 사용

1. 설정 버튼(⚙️) 클릭
2. DNS 설정 섹션에서 DNS over HTTPS 활성화
3. 제공자 선택 (Cloudflare, Google, Quad9)
4. "DNS 저장" 버튼 클릭
5. DNS 차단만 있는 경우 이 방법으로 우회 가능

### 방법 3: 프록시 설정

1. 설정 버튼(⚙️) 클릭
2. 프록시 설정 섹션에서 프록시 정보 입력
3. "프록시 저장" 버튼 클릭

## 주의사항

- 이 브라우저는 교육 및 연구 목적으로 제작되었습니다.
- 불법적인 활동에 사용하지 마세요.
- 프록시 서버는 신뢰할 수 있는 제공자를 사용하세요.

## 라이선스

MIT

