import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { TierSurface } from '@/components/primitives';
import { TIER_PALETTE, tierFromPercentage } from './tier';

type Props = {
  /** 0-100. Drives both the display value and the tier colour. */
  value: number;
  /** Short caption shown inside the pill (e.g. "L5" for last-5). */
  label: string;
};

export function StatPill({ value, label }: Props) {
  const tier = tierFromPercentage(value);
  const { bg, fg } = TIER_PALETTE[tier];

  return (
    <View style={styles.root}>
      <TierSurface elite={tier === 'elite'} backgroundColor={bg} style={styles.pill}>
        <Text style={[styles.pillLabel, { color: fg }]}>{label}</Text>
      </TierSurface>
      <Text style={styles.value}>{Math.round(value)}%</Text>
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
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillLabel: {
    ...theme.typography.monoBadge,
  },
  value: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.primary,
  },
});
