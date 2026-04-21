import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { EliteBackground } from './EliteBackground';
import {
  CONFIDENCE_PALETTE,
  ELITE_BG,
  tierFromPercentage,
} from './confidence';

type Props = {
  value: number;
  label?: string;
};

export function L5Pill({ value, label = 'L5' }: Props) {
  const tier = tierFromPercentage(value);
  const { bg, fg } = CONFIDENCE_PALETTE[tier];
  const isElite = tier === 'elite';
  const displayValue = `${Math.round(value)}%`;

  return (
    <View style={styles.root}>
      <View style={[styles.pill, isElite ? { backgroundColor: ELITE_BG } : { backgroundColor: bg }]}>
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
  pillLabel: {
    ...theme.typography.monoXs,
  },
  value: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.primary,
  },
});
