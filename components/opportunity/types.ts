import type { Mark } from '@/components/primitives';

export type Matchup = {
  home: Mark;
  away: Mark;
  /** Short display string (e.g. "FRI 10AM"). */
  time: string;
};

export type StatLine = {
  label: string;
  value: number;
};

export type OpportunityPick = {
  /** 0-100 confidence for both the badge and stats tier. */
  confidence: number;
  /** Market description (e.g. "Moneyline" or "+24.5 Points"). */
  market: string;
  stats: StatLine[];
  /** Odds string (e.g. "+172"). */
  odds: string;
};

export type MatchupActions = {
  onInfoPress?: () => void;
  onSharePress?: () => void;
  onOpenPress?: () => void;
};
