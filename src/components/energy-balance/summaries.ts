// 서버 페이지 → 클라이언트 뷰로 넘기는 축약형 (4개 언어 본문 전체를 넘기지 않기 위해)
import type { PersonalityType } from "@/data/questions";
import type { EnergyTraitGuide, EnergyTypeGuide, LocalizedText } from "@/data/energy-balance-guide";

export interface TraitSummary {
  id: string;
  pole: PersonalityType;
  emoji: string;
  name: LocalizedText;
  heading: LocalizedText;
}

export interface TypeSummary {
  id: string;
  type: PersonalityType;
  emoji: string;
  name: LocalizedText;
  subtitle: LocalizedText;
}

export const toTraitSummary = (g: EnergyTraitGuide): TraitSummary => ({
  id: g.id,
  pole: g.pole,
  emoji: g.emoji,
  name: g.name,
  heading: g.heading,
});

export const toTypeSummary = (g: EnergyTypeGuide): TypeSummary => ({
  id: g.id,
  type: g.type,
  emoji: g.emoji,
  name: g.name,
  subtitle: g.subtitle,
});
