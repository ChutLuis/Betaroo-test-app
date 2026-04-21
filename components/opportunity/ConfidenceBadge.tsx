import { StyleSheet, Text } from 'react-native';
import { theme } from '@/tokens';
import { TierSurface } from '@/components/primitives';
import { TIER_LABEL, TIER_PALETTE, tierFromPercentage, type ConfidenceTier } from './tier';

type Props =
  | { tier: ConfidenceTier; value?: never }
  | { value: number; tier?: never };

export function ConfidenceBadge(props: Props) {
  const tier = props.tier ?? tierFromPercentage(props.value);
  const { bg, fg } = TIER_PALETTE[tier];

  return (
    <TierSurface elite={tier === 'elite'} backgroundColor={bg} style={styles.badge}>
      <Text style={[styles.label, { color: fg }]}>{TIER_LABEL[tier]}</Text>
    </TierSurface>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[4],
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...theme.typography.monoXs,
  },
});
