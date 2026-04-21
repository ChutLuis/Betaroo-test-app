import { palette } from '../primitives/colors';

export const color = {
  bg: {
    base: palette.gray[950],
    primary: palette.gray[900],
    secondary: palette.gray[800],
    tertiary: palette.gray[700],
    weak: palette.gray[600],
    weaker: palette.gray[400],
    inverse: palette.gray[0],
  },
  text: {
    primary: palette.gray[0],
    secondary: palette.gray[300],
    tertiary: palette.gray[400],
    muted: palette.gray[500],
    disabled: palette.gray[600],
    inverse: palette.gray[950],
  },
  border: {
    base: palette.gray[950],
    primary: palette.gray[800],
    secondary: palette.gray[600],
    tertiary: palette.gray[500],
    inverse: palette.gray[0],
    dark: '#202020',
    focus: 'rgba(153,160,174,0.16)',
  },
  icon: {
    primary: palette.gray[0],
    secondary: palette.gray[400],
    tertiary: palette.gray[500],
    disabled: palette.gray[600],
    inverse: palette.gray[950],
  },
  state: {
    faded: {
      dark: palette.gray[300],
      base: palette.gray[500],
      light: palette.alpha.gray[24],
      lighter: palette.alpha.gray[10],
    },
    info: {
      dark: palette.blue[400],
      base: palette.blue[500],
      light: palette.alpha.blue[24],
    },
    warning: {
      dark: palette.orange[400],
      base: palette.orange[600],
      light: palette.alpha.orange[24],
      lighter: palette.alpha.orange[10],
    },
    error: {
      dark: palette.red[400],
      base: palette.red[600],
      light: palette.alpha.red[24],
      lighter: palette.alpha.red[10],
    },
    success: {
      dark: palette.green[400],
      base: palette.green[600],
      light: palette.alpha.green[24],
      lighter: palette.alpha.green[10],
    },
    away: {
      dark: palette.yellow[400],
      base: palette.yellow[600],
      light: palette.alpha.yellow[24],
      lighter: palette.alpha.yellow[10],
    },
    feature: {
      dark: palette.purple[400],
      base: palette.purple[500],
      light: palette.alpha.purple[24],
      lighter: palette.alpha.purple[10],
    },
    verified: {
      dark: palette.sky[400],
      base: palette.sky[600],
      light: palette.alpha.sky[24],
      lighter: palette.alpha.sky[10],
    },
    highlight: {
      dark: palette.pink[400],
      base: palette.pink[600],
      light: palette.alpha.pink[24],
      lighter: palette.alpha.pink[10],
    },
    stable: {
      dark: palette.teal[400],
      base: palette.teal[600],
      light: palette.alpha.teal[24],
      lighter: palette.alpha.teal[10],
    },
  },
  brand: {
    darker: palette.brand[800],
    dark: palette.brand[600],
    base: palette.brand[500],
    light: palette.brand[100],
    lighter: palette.brand[50],
  },
} as const;

export type ColorGroup = keyof typeof color;
