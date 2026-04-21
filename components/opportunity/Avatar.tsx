import { StyleSheet, View } from 'react-native';
import { CircleMark, type Mark } from '@/components/primitives';

type Props = Mark & {
  size?: number;
  /** Optional sub-badge nested in the bottom-right (e.g. team logo on a player). */
  badge?: Mark;
};

export function Avatar({ size = 34, badge, ...mark }: Props) {
  const badgeSize = Math.round(size * 0.45);
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <CircleMark size={size} {...mark} />
      {badge ? (
        <CircleMark size={badgeSize} {...badge} style={styles.badge} labelFontSize={6} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -1,
  },
});
