import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import {
  CONFIDENCE_LABEL,
  CONFIDENCE_PALETTE,
  ELITE_BG,
  tierFromPercentage,
} from './confidence';
import { EliteBackground } from './EliteBackground';

type Props = {
  value: number;
};

export function ConfidenceBadge({ value }: Props) {
  const tier = tierFromPercentage(value);
  const { bg, fg } = CONFIDENCE_PALETTE[tier];
  const isElite = tier === 'elite';

  return (
    <View
      style={[
        styles.badge,
        isElite ? { backgroundColor: ELITE_BG } : { backgroundColor: bg },
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
  label: {
    ...theme.typography.monoXs,
  },
});
