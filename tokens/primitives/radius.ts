export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 12,
  '3xl': 16,
  '4xl': 20,
  '5xl': 24,
  '6xl': 28,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
