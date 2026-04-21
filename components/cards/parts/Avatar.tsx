import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { theme } from '@/tokens';

type Mark = {
  label: string;
  color: string;
  image?: ImageSourcePropType;
};

type Props = Mark & {
  size?: number;
  /** Optional sub-badge in bottom-right (e.g. team logo on a player avatar). */
  badge?: Mark;
};

export function Avatar({ label, color, image, size = 34, badge }: Props) {
  const radius = size / 2;
  const badgeSize = Math.round(size * 0.45);
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View
        style={[
          styles.circleShadow,
          { width: size, height: size, borderRadius: radius },
        ]}
      >
        <View
          style={[
            styles.circleClip,
            { width: size, height: size, borderRadius: radius, backgroundColor: color },
          ]}
        >
          {image ? (
            <Image source={image} style={styles.fill} resizeMode="cover" />
          ) : (
            <Text style={styles.label}>{label}</Text>
          )}
        </View>
      </View>
      {badge ? (
        <View
          style={[
            styles.badgeShadow,
            { width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 },
          ]}
        >
          <View
            style={[
              styles.badgeClip,
              {
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
                backgroundColor: badge.color,
              },
            ]}
          >
            {badge.image ? (
              <Image source={badge.image} style={styles.fill} resizeMode="cover" />
            ) : (
              <Text style={styles.badgeLabel}>{badge.label}</Text>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  circleShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.631 },
    shadowOpacity: 0.25,
    shadowRadius: 0.947,
    elevation: 2,
  },
  circleClip: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border.inverse,
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  label: {
    ...theme.typography.monoXxs,
    color: theme.color.text.primary,
    fontFamily: theme.fontFamily.heading,
    fontSize: 11,
  },
  badgeShadow: {
    position: 'absolute',
    right: -2,
    bottom: -1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.276 },
    shadowOpacity: 0.25,
    shadowRadius: 0.414,
    elevation: 1,
  },
  badgeClip: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: theme.fontFamily.mono,
    fontSize: 6,
    color: theme.color.text.primary,
    fontWeight: '500',
  },
});
