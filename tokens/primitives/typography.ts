export const fontFamily = {
  heading: 'Manrope',
  body: 'Inter',
  mono: 'DM Mono',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const;

export type FontFamily = keyof typeof fontFamily;
export type FontWeight = keyof typeof fontWeight;
