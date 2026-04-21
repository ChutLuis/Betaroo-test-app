import { palette } from './primitives/colors';
import { space } from './primitives/spacing';
import { radius } from './primitives/radius';
import { fontFamily, fontWeight } from './primitives/typography';
import { duration, easing, spring } from './primitives/motion';
import { color } from './semantic/colors';
import { shadow } from './semantic/shadows';
import { typography } from './semantic/typography';

export const theme = {
  color,
  space,
  radius,
  shadow,
  fontFamily,
  fontWeight,
  typography,
  palette,
  motion: { duration, easing, spring },
} as const;

export type Theme = typeof theme;
