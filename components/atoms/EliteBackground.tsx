import { Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { ELITE_BG } from './confidence';

/**
 * Exact-replica background for the ELITE chance badge in Figma (node I1:2458;146:1726;163:24984).
 *
 * 5 layers, bottom → top:
 *   1. Base fill `ELITE_BG`
 *   2. Radial pink highlight from top-center (SVG)
 *   3. White radial highlight from bottom-center (SVG, approximating mix-blend-overlay via alpha)
 *   4. ~155° linear dark overlay (shadow bands at edges)
 *   5. Noise texture, two passes (0.25 + 0.125 opacity) approximating Figma's mix-blend-overlay stack
 *
 * Designed to be dropped into any parent with a clipped border-radius; this component fills
 * its parent via `StyleSheet.absoluteFillObject`.
 */
const noise = require('../../assets/textures/noise.png');

export function EliteBackground() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: ELITE_BG }]} />

      <Svg style={StyleSheet.absoluteFillObject} preserveAspectRatio="none">
        <Defs>
          <RadialGradient id="pink" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
            <Stop offset="0%" stopColor="rgb(255,0,153)" stopOpacity="1" />
            <Stop offset="25%" stopColor="rgb(239,18,157)" stopOpacity="0.75" />
            <Stop offset="50%" stopColor="rgb(223,37,161)" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="rgb(191,73,169)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="bright" cx="50%" cy="100%" r="60%" fx="50%" fy="100%">
            <Stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#pink)" />
        <Rect width="100%" height="100%" fill="url(#bright)" opacity={0.35} />
      </Svg>

      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.25)',
          'rgba(0,0,0,0.05)',
          'rgba(0,0,0,0.25)',
          'rgba(0,0,0,0)',
        ]}
        locations={[0, 0.2, 0.5, 0.8, 1]}
        start={{ x: 0.3, y: 0.05 }}
        end={{ x: 0.7, y: 0.95 }}
        style={StyleSheet.absoluteFillObject}
      />

      <Image
        source={noise}
        resizeMode="repeat"
        style={[StyleSheet.absoluteFillObject, { opacity: 0.25 }]}
      />
      <Image
        source={noise}
        resizeMode="repeat"
        style={[StyleSheet.absoluteFillObject, { opacity: 0.125 }]}
      />
    </View>
  );
}
