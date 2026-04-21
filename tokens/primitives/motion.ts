import { Easing, type EasingFunction } from 'react-native';

export const duration = {
  instant: 0,
  fast: 120,
  normal: 220,
  slow: 360,
} as const;

export const easing = {
  standard: Easing.out(Easing.cubic),
  emphasized: Easing.out(Easing.quad),
} as const satisfies Record<string, EasingFunction>;

export const spring = {
  gentle: { damping: 18, stiffness: 180 },
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
