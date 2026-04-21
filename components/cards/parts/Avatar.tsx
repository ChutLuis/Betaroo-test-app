import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';

type Props = {
  label: string;
  color: string;
  size?: number;
  /** Optional sub-badge in bottom-right (e.g. team logo on a player avatar). */
  badge?: {
    label: string;
    color: string;
  };
};

export function Avatar({ label, color, size = 34, badge }: Props) {
  const radius = size / 2;
  const badgeSize = Math.round(size * 0.45);
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: color,
          },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </View>
      {badge ? (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badge.color,
            },
          ]}
        >
          <Text style={styles.badgeLabel}>{badge.label}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border.inverse,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.631 },
    shadowOpacity: 0.25,
    shadowRadius: 0.947,
    elevation: 2,
  },
  label: {
    ...theme.typography.monoXxs,
    color: theme.color.text.primary,
    fontFamily: theme.fontFamily.heading,
    fontSize: 11,
  },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border.inverse,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.276 },
    shadowOpacity: 0.25,
    shadowRadius: 0.414,
    elevation: 1,
  },
  badgeLabel: {
    fontFamily: theme.fontFamily.mono,
    fontSize: 6,
    color: theme.color.text.primary,
    fontWeight: '500',
  },
});
