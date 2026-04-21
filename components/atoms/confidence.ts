import { theme } from '@/tokens';

export type ConfidenceTier = 'elite' | 'strong' | 'fair' | 'risky';

export const CONFIDENCE_LABEL: Record<ConfidenceTier, string> = {
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

// Base fill colour for the ELITE badge gradient stack (Figma node I1:2458;146:1726;163:24984).
// Kept here rather than in `palette` because it only ever composes under EliteBackground.
export const ELITE_BG = 'rgb(205, 49, 88)';

type TierPalette = { bg: string; fg: string };

// ELITE's bg is unused — ConfidenceBadge / L5Pill overlay EliteBackground on top of ELITE_BG.
// Keeping the entry so the Record<ConfidenceTier, _> shape stays complete; the fg is what renders.
export const CONFIDENCE_PALETTE: Record<ConfidenceTier, TierPalette> = {
  elite:  { bg: ELITE_BG,                          fg: theme.color.text.primary },
  strong: { bg: theme.color.state.success.lighter, fg: theme.color.state.success.dark },
  fair:   { bg: theme.color.state.away.lighter,    fg: theme.color.state.away.dark },
  risky:  { bg: theme.color.state.error.lighter,   fg: theme.color.state.error.dark },
};
