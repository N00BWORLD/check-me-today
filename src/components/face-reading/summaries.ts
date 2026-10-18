// 서버 페이지 → 클라이언트 뷰로 넘길 때 쓰는 축약형
// 가이드·유형 전체 데이터(4개 언어 본문)를 그대로 넘기면 RSC 페이로드가 커지므로 목록 표시에 필요한 필드만 추린다.
import type { FaceReadingResult, LocalizedText, TraitKey } from "@/data/face-reading";
import type { FaceGuidePart } from "@/data/face-reading-guide";

export interface TypeSummary {
  id: string;
  hanja: string;
  emoji: string;
  type: LocalizedText;
  subtitle: LocalizedText;
  primaryTrait: TraitKey;
  secondaryTrait: TraitKey;
}

export interface PartSummary {
  id: string;
  hanja: string;
  emoji: string;
  name: LocalizedText;
  heading: LocalizedText;
  description: LocalizedText;
}

export const toTypeSummary = (r: FaceReadingResult): TypeSummary => ({
  id: r.id,
  hanja: r.hanja,
  emoji: r.emoji,
  type: r.type,
  subtitle: r.subtitle,
  primaryTrait: r.primaryTrait,
  secondaryTrait: r.secondaryTrait,
});

export const toPartSummary = (p: FaceGuidePart): PartSummary => ({
  id: p.id,
  hanja: p.hanja,
  emoji: p.emoji,
  name: p.name,
  heading: p.heading,
  description: p.description,
});
