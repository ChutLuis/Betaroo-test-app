import { Image, type ImageStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { ComponentType } from 'react';

const assets = {
  info: require('../../../assets/icons/information-2-fill.png'),
  share: require('../../../assets/icons/share-2-fill.png'),
  arrowRight: require('../../../assets/icons/arrow-right-s-line.png'),
  basketball: require('../../../assets/icons/basketball-fill.png'),
  globe: require('../../../assets/icons/global-line.png'),
  addCircle: require('../../../assets/icons/add-circle-line.png'),
  draftKing: require('../../../assets/icons/draft-king.png'),
} as const;

export type IconRenderProps = {
  size: number;
  /** Ignored by multi-colour raster icons (e.g. `sportsbook`). */
  color: string;
};

export type IconRenderer = ComponentType<IconRenderProps>;

type RotateRaster = { asset: keyof typeof assets; rotateDeg?: number };
type TintedRasterIcon = RotateRaster;

function tintedRaster({ asset, rotateDeg = 0 }: TintedRasterIcon): IconRenderer {
  return function RasterIcon({ size, color }) {
    const style: ImageStyle = { width: size, height: size, tintColor: color };
    return (
      <Image
        source={assets[asset]}
        resizeMode="contain"
        style={rotateDeg ? [style, { transform: [{ rotate: `${rotateDeg}deg` }] }] : style}
      />
    );
  };
}

const Sportsbook: IconRenderer = ({ size }) => (
  <Image source={assets.draftKing} style={{ width: size, height: size }} resizeMode="contain" />
);

const Plus: IconRenderer = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path d="M8 5v6M5 8h6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </Svg>
);

const Check: IconRenderer = ({ size, color }) => (
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

export const iconRegistry = {
  info: tintedRaster({ asset: 'info' }),
  share: tintedRaster({ asset: 'share' }),
  chevronRight: tintedRaster({ asset: 'arrowRight' }),
  chevronDown: tintedRaster({ asset: 'arrowRight', rotateDeg: 90 }),
  chevronUp: tintedRaster({ asset: 'arrowRight', rotateDeg: -90 }),
  basketball: tintedRaster({ asset: 'basketball' }),
  globe: tintedRaster({ asset: 'globe' }),
  addCircle: tintedRaster({ asset: 'addCircle' }),
  sportsbook: Sportsbook,
  plus: Plus,
  check: Check,
} as const satisfies Record<string, IconRenderer>;

export type IconName = keyof typeof iconRegistry;
