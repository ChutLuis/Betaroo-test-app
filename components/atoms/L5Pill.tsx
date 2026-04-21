import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { EliteBackground } from './EliteBackground';
import {
  L5_PILL_PALETTE,
  tierFromPercentage,
  type ConfidenceTier,
} from './confidence';

type Props = {
  value: number;
  label?: string;
  tier?: ConfidenceTier;
};

export function L5Pill({ value, label = 'L5', tier }: Props) {
  const resolved = tier ?? tierFromPercentage(value);
  const { bg, fg } = L5_PILL_PALETTE[resolved];
  const isElite = resolved === 'elite';
  const displayValue = `${Math.round(value)}%`;

  return (
    <View style={styles.root}>
      <View style={[styles.pill, isElite ? styles.pillElite : { backgroundColor: bg }]}>
        {isElite ? <EliteBackground /> : null}
        <Text style={[styles.pillLabel, { color: fg }]}>{label}</Text>
      </View>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[4],
  },
  pill: {
    height: 18,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[4],
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pillElite: {
    backgroundColor: 'rgb(205, 49, 88)',
  },
  pillLabel: {
    ...theme.typography.monoXs,
  },
  value: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.primary,
  },
});
