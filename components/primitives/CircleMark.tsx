import { Image, StyleSheet, Text, View, type ImageSourcePropType, type ViewStyle } from 'react-native';
import { theme } from '@/tokens';

export type Mark = {
  label: string;
  color: string;
  image?: ImageSourcePropType;
};

type Props = Mark & {
  size?: number;
  /**
   * Roughly `size / 54` — scales the drop shadow along with the circle so
   * a 12px badge and a 34px avatar render a proportional shadow.
   */
  shadowScale?: number;
  labelFontSize?: number;
  style?: ViewStyle;
};

export function CircleMark({
  label,
  color,
  image,
  size = 34,
  shadowScale = size / 54,
  labelFontSize,
  style,
}: Props) {
  const radius = size / 2;
  // Figma keeps the ring a constant ~3.125% of the diameter (1.75px @ 56, 1.063px @ 34,
  // 0.465px @ 15) so the circle doesn't look chunky at small sizes.
  const borderWidth = Math.max(0.5, size * 0.03125);
  const shadow: ViewStyle = {
    shadowColor: theme.color.border.base,
    shadowOffset: { width: 0, height: 1 * shadowScale },
    shadowOpacity: 0.25,
    shadowRadius: 1.5 * shadowScale,
    elevation: Math.max(1, Math.round(shadowScale * 2)),
  };

  return (
    <View style={[{ width: size, height: size, borderRadius: radius }, shadow, style]}>
      <View
        style={[
          styles.clip,
          { width: size, height: size, borderRadius: radius, backgroundColor: color, borderWidth },
        ]}
      >
        {image ? (
          <Image source={image} style={styles.fill} resizeMode="cover" />
        ) : (
          <Text
            style={[
              styles.label,
              labelFontSize ? { fontSize: labelFontSize } : { fontSize: Math.max(6, Math.round(size * 0.32)) },
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: theme.color.border.inverse,
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontFamily: theme.fontFamily.heading,
    color: theme.color.text.primary,
    fontWeight: '600',
  },
});
