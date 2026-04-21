import type { ViewStyle } from 'react-native';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadowPrimitive = {
  xs: {
    shadowColor: '#0A0D14',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0E121B',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 4,
  },
  xl: {
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
  },
  '2xl': {
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 48 },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 6,
  },
} as const satisfies Record<string, ShadowStyle>;

export type ShadowToken = keyof typeof shadowPrimitive;
