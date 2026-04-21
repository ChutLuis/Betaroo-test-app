import { StyleSheet, type TextStyle } from 'react-native';
import { fontFamily } from '../primitives/typography';

const { heading, body, mono } = fontFamily;

export const typography = StyleSheet.create({
  displayXl:    { fontFamily: heading, fontSize: 128, lineHeight: 128, letterSpacing: -3.84, fontWeight: '600' },
  displayLg:    { fontFamily: heading, fontSize: 96, lineHeight: 96, letterSpacing: -2.3, fontWeight: '600' },
  displayMd:    { fontFamily: heading, fontSize: 72, lineHeight: 72, letterSpacing: -1.58, fontWeight: '600' },
  displaySm:    { fontFamily: heading, fontSize: 60, lineHeight: 60, letterSpacing: -1.2, fontWeight: '600' },
  displayXs:    { fontFamily: heading, fontSize: 48, lineHeight: 48, letterSpacing: -0.96, fontWeight: '600' },

  headingLg:    { fontFamily: heading, fontSize: 36, lineHeight: 40, letterSpacing: -0.07, fontWeight: '600' },
  headingMd:    { fontFamily: heading, fontSize: 30, lineHeight: 36, letterSpacing: -0.06, fontWeight: '600' },
  headingSm:    { fontFamily: heading, fontSize: 24, lineHeight: 32, letterSpacing: -0.048, fontWeight: '600' },
  headingXs:    { fontFamily: heading, fontSize: 20, lineHeight: 26, letterSpacing: -0.04, fontWeight: '600' },
  headingXxs:   { fontFamily: heading, fontSize: 14, lineHeight: 16, letterSpacing: -0.028, fontWeight: '600' },

  paragraphXl:  { fontFamily: body, fontSize: 24, lineHeight: 32, letterSpacing: 0, fontWeight: '400' },
  paragraphLg:  { fontFamily: body, fontSize: 18, lineHeight: 24, letterSpacing: 0, fontWeight: '400' },
  paragraphMd:  { fontFamily: body, fontSize: 16, lineHeight: 24, letterSpacing: 0, fontWeight: '400' },
  paragraphSm:  { fontFamily: body, fontSize: 14, lineHeight: 20, letterSpacing: 0, fontWeight: '400' },
  paragraphXs:  { fontFamily: body, fontSize: 13, lineHeight: 18, letterSpacing: 0, fontWeight: '400' },
  paragraphXxs: { fontFamily: body, fontSize: 12, lineHeight: 16, letterSpacing: 0, fontWeight: '400' },
  paragraphMini:{ fontFamily: body, fontSize: 10, lineHeight: 12, letterSpacing: 0, fontWeight: '400' },

  labelXl:      { fontFamily: body, fontSize: 24, lineHeight: 32, letterSpacing: -0.34, fontWeight: '500' },
  labelLg:      { fontFamily: body, fontSize: 18, lineHeight: 24, letterSpacing: -0.22, fontWeight: '500' },
  labelMd:      { fontFamily: body, fontSize: 16, lineHeight: 24, letterSpacing: -0.19, fontWeight: '500' },
  labelSm:      { fontFamily: body, fontSize: 14, lineHeight: 20, letterSpacing: -0.14, fontWeight: '500' },
  labelXs:      { fontFamily: body, fontSize: 13, lineHeight: 18, letterSpacing: -0.13, fontWeight: '500' },
  labelXxs:     { fontFamily: body, fontSize: 12, lineHeight: 16, letterSpacing: -0.096, fontWeight: '500' },
  labelMini:    { fontFamily: body, fontSize: 10, lineHeight: 12, letterSpacing: -0.08, fontWeight: '500' },

  subheadingMd: { fontFamily: body, fontSize: 16, lineHeight: 24, letterSpacing: 1.92, fontWeight: '500' },
  subheadingSm: { fontFamily: body, fontSize: 14, lineHeight: 20, letterSpacing: 1.68, fontWeight: '500' },
  subheadingXs: { fontFamily: body, fontSize: 12, lineHeight: 16, letterSpacing: 1.44, fontWeight: '500' },
  subheadingXxs:{ fontFamily: body, fontSize: 11, lineHeight: 12, letterSpacing: 1.32, fontWeight: '500' },

  monoMd:       { fontFamily: mono, fontSize: 16, lineHeight: 24, letterSpacing: 0, fontWeight: '500' },
  monoSm:       { fontFamily: mono, fontSize: 14, lineHeight: 20, letterSpacing: 0, fontWeight: '500' },
  monoXs:       { fontFamily: mono, fontSize: 12, lineHeight: 14, letterSpacing: 0.24, fontWeight: '500' },
  // Tight-leading variant used inside fixed-height badge/pill chips. Figma spec is
  // `leading-[9.625px]`, but two RN-iOS quirks force a different approach:
  //   1. `lineHeight < fontSize` clips glyphs in `overflow: hidden` parents (L10 -> L1U).
  //   2. iOS places the baseline at ~75% of the line box. With `lineHeight = fontSize`
  //      the glyph lands in the upper half of the Text, so flex-centering an 18px pill
  //      makes the text look top-aligned (see screenshot on first fix pass).
  // `lineHeight: 16` gives a 16px Text box which flex-centers to y=1-17 inside the
  // pill; the baseline at y=13 and cap-top at y=5 balance 5px above / 5px below the
  // uppercase glyph — geometrically centered like Figma's rendering.
  monoBadge:    { fontFamily: mono, fontSize: 12, lineHeight: 16, letterSpacing: 0.24, fontWeight: '500' },
  monoXxs:      { fontFamily: mono, fontSize: 10, lineHeight: 12, letterSpacing: -0.08, fontWeight: '500' },
  monoMini:     { fontFamily: mono, fontSize: 9,  lineHeight: 11, letterSpacing: 0.18, fontWeight: '500' },
} satisfies Record<string, TextStyle>);

export type TypographyToken = keyof typeof typography;
