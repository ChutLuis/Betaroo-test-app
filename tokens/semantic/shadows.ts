import { shadowPrimitive } from '../primitives/shadows';

export const shadow = {
  card: shadowPrimitive.sm,
  dropdown: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
  tooltip: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
  },
  modal: shadowPrimitive.lg,
} as const;

export type ShadowRole = keyof typeof shadow;
