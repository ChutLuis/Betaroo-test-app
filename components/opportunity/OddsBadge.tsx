import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon, type IconName } from '@/components/primitives';

type Props = {
  odds: string;
  iconName?: IconName;
  iconColor?: string;
};

export function OddsBadge({
  odds,
  iconName = 'sportsbook',
  iconColor = theme.palette.yellow[500],
}: Props) {
  return (
    <View style={styles.root}>
      <Icon name={iconName} size={12} color={iconColor} />
      <Text style={styles.value}>{odds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
    height: 20,
    minWidth: 15,
    paddingHorizontal: theme.space[4],
    borderRadius: theme.radius.sm + 1,
    backgroundColor: theme.color.bg.secondary,
  },
  value: {
    ...theme.typography.monoXs,
    // Figma's odds pill uses the wider 16px line-height, not the tight 14px of monoXs.
    lineHeight: 16,
    color: theme.color.text.primary,
    textTransform: 'uppercase',
  },
});
