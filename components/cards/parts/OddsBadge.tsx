import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '../../atoms/Icon';

type Props = {
  odds: string;
};

export function OddsBadge({ odds }: Props) {
  return (
    <View style={styles.root}>
      <Icon name="sportsbook" size={12} color={theme.palette.yellow[500]} />
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
    paddingVertical: 0,
    borderRadius: 5,
    backgroundColor: theme.color.bg.secondary,
  },
  value: {
    ...theme.typography.monoXs,
    // Figma's odds pill uses the wider 16px line-height, not the tight badge 14px.
    lineHeight: 16,
    color: theme.color.text.primary,
    textTransform: 'uppercase',
  },
});
