export const space = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
} as const;

export type SpaceToken = keyof typeof space;
