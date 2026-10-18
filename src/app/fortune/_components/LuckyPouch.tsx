// 복주머니 그림 (SVG). 이모지에는 한국식 복주머니가 없어 직접 그린다
// - 빨간 주머니 + 금색 끈 + 가운데 "복" 글자
// - size: 픽셀 크기, shaking: 열기 애니메이션용 흔들림
interface LuckyPouchProps {
  size?: number;
  shaking?: boolean;
  className?: string;
}

export default function LuckyPouch({ size = 120, shaking = false, className = "" }: LuckyPouchProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="복주머니"
      className={`${shaking ? "animate-pouch-shake" : ""} ${className}`}
    >
      <defs>
        <linearGradient id="pouch-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e24b3a" />
          <stop offset="100%" stopColor="#a61e1e" />
        </linearGradient>
        <linearGradient id="pouch-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6d77a" />
          <stop offset="100%" stopColor="#c99418" />
        </linearGradient>
        <radialGradient id="pouch-shine" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 주머니 몸통 */}
      <path
        d="M30 44 C14 56, 12 84, 26 100 C34 110, 86 110, 94 100 C108 84, 106 56, 90 44 Z"
        fill="url(#pouch-body)"
      />
      <path
        d="M30 44 C14 56, 12 84, 26 100 C34 110, 86 110, 94 100 C108 84, 106 56, 90 44 Z"
        fill="url(#pouch-shine)"
      />

      {/* 주머니 입구 주름 */}
      <path d="M38 44 C44 30, 52 24, 60 22 C68 24, 76 30, 82 44" fill="#c62f26" />
      <path d="M44 44 C48 34, 54 29, 60 28 C66 29, 72 34, 76 44" fill="#a61e1e" />

      {/* 금색 끈과 매듭 */}
      <path d="M34 46 Q60 56 86 46" stroke="url(#pouch-gold)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="50" r="5" fill="url(#pouch-gold)" />
      <path d="M56 52 Q46 60 50 70" stroke="url(#pouch-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M64 52 Q74 60 70 70" stroke="url(#pouch-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* 가운데 복 글자 */}
      <circle cx="60" cy="80" r="17" fill="#fff6e5" opacity="0.95" />
      <text
        x="60"
        y="87"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#a61e1e"
        fontFamily="'Noto Sans KR', 'Malgun Gothic', sans-serif"
      >
        복
      </text>
    </svg>
  );
}
