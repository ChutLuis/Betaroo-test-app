import { theme } from '@/tokens';
import { ELITE_BASE } from '@/components/primitives';

export type ConfidenceTier = 'elite' | 'strong' | 'fair' | 'risky';

export const TIER_LABEL: Record<ConfidenceTier, string> = {
  elite: 'ELITE',
  strong: 'STRONG',
  fair: 'FAIR',
  risky: 'RISKY',
};

export function tierFromPercentage(pct: number): ConfidenceTier {
  if (pct >= 90) return 'elite';
  if (pct >= 70) return 'strong';
  if (pct >= 40) return 'fair';
  return 'risky';
}

type TierPalette = { bg: string; fg: string };

// `elite.bg` is painted under a full-bleed gradient stack; callers that render
// <TierSurface elite> rely on the fg only. The shape stays complete so
// Record<ConfidenceTier, _> exhaustiveness holds.
export const TIER_PALETTE: Record<ConfidenceTier, TierPalette> = {
  elite: { bg: ELITE_BASE, fg: theme.color.text.primary },
  strong: { bg: theme.color.state.success.lighter, fg: theme.color.state.success.dark },
  fair: { bg: theme.color.state.away.lighter, fg: theme.color.state.away.dark },
  risky: { bg: theme.color.state.error.lighter, fg: theme.color.state.error.dark },
};
