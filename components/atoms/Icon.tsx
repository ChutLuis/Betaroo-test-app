import Svg, { Circle, Path } from 'react-native-svg';

export type IconName =
  | 'info'
  | 'share'
  | 'chevronRight'
  | 'chevronDown'
  | 'chevronUp'
  | 'plus'
  | 'addCircle'
  | 'check'
  | 'basketball'
  | 'globe'
  | 'sportsbook';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 16, color = '#fff' }: Props) {
  switch (name) {
    case 'info':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3" />
          <Path d="M8 7.25v4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <Circle cx="8" cy="5.1" r="0.75" fill={color} />
        </Svg>
      );
    case 'share':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M8 2v8.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <Path d="M5 5l3-3 3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M3.25 8.5v4A1.25 1.25 0 004.5 13.75h7a1.25 1.25 0 001.25-1.25v-4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </Svg>
      );
    case 'chevronRight':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M6 3l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'chevronDown':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M3 6l5 5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'chevronUp':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M3 10l5-5 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3" />
          <Path d="M8 5v6M5 8h6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </Svg>
      );
    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M3 8.5l3.5 3.5L13 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'basketball':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.2" />
          <Path d="M1.5 8h13M8 1.5v13" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <Path d="M3.3 3.3c1.7 1.4 2.7 3.2 2.7 4.7s-1 3.3-2.7 4.7M12.7 3.3c-1.7 1.4-2.7 3.2-2.7 4.7s1 3.3 2.7 4.7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </Svg>
      );
    case 'globe':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.2" />
          <Path d="M1.5 8h13M8 1.5c1.8 2 2.7 4.2 2.7 6.5s-.9 4.5-2.7 6.5c-1.8-2-2.7-4.2-2.7-6.5s.9-4.5 2.7-6.5z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'addCircle':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" />
          <Path d="M8 5.3v5.4M5.3 8h5.4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </Svg>
      );
    case 'sportsbook':
      // Placeholder mark standing in for the DraftKings logo from the Figma source.
      // Three stylised crown/peak strokes — generic enough to avoid trademark concerns.
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path
            d="M2 11.5l1.5-6 2.5 3 2-5 2 5 2.5-3 1.5 6z"
            fill={color}
            stroke={color}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <Path d="M2.5 13h11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </Svg>
      );
  }
}
