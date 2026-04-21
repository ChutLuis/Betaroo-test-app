import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import {
  CONFIDENCE_LABEL,
  CONFIDENCE_PALETTE,
  tierFromPercentage,
  type ConfidenceTier,
} from './confidence';
import { EliteBackground } from './EliteBackground';

type Props =
  | { tier: ConfidenceTier; value?: never }
  | { value: number; tier?: never };

export function ConfidenceBadge(props: Props) {
  const tier: ConfidenceTier =
    'tier' in props && props.tier ? props.tier : tierFromPercentage(props.value!);
  const { bg, fg } = CONFIDENCE_PALETTE[tier];
  const isElite = tier === 'elite';

  return (
    <View
      style={[
        styles.badge,
        isElite ? styles.badgeElite : { backgroundColor: bg },
      ]}
    >
      {isElite ? <EliteBackground /> : null}
      <Text style={[styles.label, { color: fg }]}>{CONFIDENCE_LABEL[tier]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[4],
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  badgeElite: {
    backgroundColor: 'rgb(205, 49, 88)',
  },
  label: {
    ...theme.typography.monoXs,
  },
});
