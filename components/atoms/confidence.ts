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

type TierPalette = { bg: string; fg: string };

export const CONFIDENCE_PALETTE: Record<ConfidenceTier, TierPalette> = {
  elite:  { bg: theme.color.state.highlight.base,  fg: theme.color.text.primary },
  strong: { bg: theme.color.state.success.lighter, fg: theme.color.state.success.dark },
  fair:   { bg: theme.color.state.away.lighter,    fg: theme.color.state.away.dark },
  risky:  { bg: theme.color.state.error.lighter,   fg: theme.color.state.error.dark },
};

export const L5_PILL_PALETTE: Record<ConfidenceTier, TierPalette> = {
  elite:  { bg: theme.color.state.highlight.base,  fg: theme.color.text.primary },
  strong: { bg: theme.color.state.success.lighter, fg: theme.color.state.success.dark },
  fair:   { bg: theme.color.state.away.lighter,    fg: theme.color.state.away.dark },
  risky:  { bg: theme.color.state.error.lighter,   fg: theme.color.state.error.dark },
};
