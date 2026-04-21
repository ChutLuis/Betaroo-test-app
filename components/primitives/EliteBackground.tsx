import { Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

// Base fill for the ELITE tier surface (Figma node I1:2458;146:1726;163:24984).
// Kept here, next to the only component that layers on top of it.
export const ELITE_BASE = 'rgb(205, 49, 88)';

const noise = require('../../assets/textures/noise.png');

/**
 * 5 stacked layers reproducing Figma's ELITE-tier surface: base fill,
 * pink radial, white radial, dark linear edge-bands, and two noise passes.
 * Drops into any parent with `overflow: 'hidden'` via absoluteFillObject.
 */
export function EliteBackground() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: ELITE_BASE }]} />

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
