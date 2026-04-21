import { Image, type ImageStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Remix Icon PNG exports from Figma (monochrome — tint via `color` prop).
const infoAsset = require('../../assets/icons/information-2-fill.png');
const shareAsset = require('../../assets/icons/share-2-fill.png');
const arrowRightAsset = require('../../assets/icons/arrow-right-s-line.png');
const basketballAsset = require('../../assets/icons/basketball-fill.png');
const globeAsset = require('../../assets/icons/global-line.png');
const addCircleAsset = require('../../assets/icons/add-circle-line.png');
// DraftKings mark — likely multi-colour; rendered without tint by default.
const draftKingAsset = require('../../assets/icons/draft-king.png');

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
  | 'sportsbook'
  | 'vs';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 16, color = '#fff' }: Props) {
  const tinted: ImageStyle = { width: size, height: size, tintColor: color };

  switch (name) {
    case 'info':
      return <Image source={infoAsset} style={tinted} resizeMode="contain" />;
    case 'share':
      return <Image source={shareAsset} style={tinted} resizeMode="contain" />;
    case 'chevronRight':
      return <Image source={arrowRightAsset} style={tinted} resizeMode="contain" />;
    case 'chevronDown':
      return (
        <Image
          source={arrowRightAsset}
          style={[tinted, { transform: [{ rotate: '90deg' }] }]}
          resizeMode="contain"
        />
      );
    case 'chevronUp':
      return (
        <Image
          source={arrowRightAsset}
          style={[tinted, { transform: [{ rotate: '-90deg' }] }]}
          resizeMode="contain"
        />
      );
    case 'basketball':
      return <Image source={basketballAsset} style={tinted} resizeMode="contain" />;
    case 'globe':
      return <Image source={globeAsset} style={tinted} resizeMode="contain" />;
    case 'addCircle':
      return <Image source={addCircleAsset} style={tinted} resizeMode="contain" />;
    case 'sportsbook':
      // Figma `draft-king` asset — rendered as-is (multi-colour raster).
      return (
        <Image
          source={draftKingAsset}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path d="M8 5v6M5 8h6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </Svg>
      );
    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path
            d="M3 8.5l3.5 3.5L13 5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'vs':
      // Placeholder for the 9×9 "vs" glyph in the card header (Figma asset TBD).
      return (
        <Svg width={size} height={size} viewBox="0 0 9 9" fill="none">
          <Path
            d="M1.2 2.2l1.6 4 1.6-4"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M7.6 2.4c-.6-.3-1.8-.3-1.8.5 0 .8 1.8.5 1.8 1.4 0 .8-1.2.8-1.8.5"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      );
  }
}
