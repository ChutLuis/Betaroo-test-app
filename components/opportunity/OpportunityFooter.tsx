import { Fragment } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '@/components/primitives';
import { StatPill } from './StatPill';
import { OddsBadge } from './OddsBadge';
import type { StatLine } from './types';

type Props = {
  stats: StatLine[];
  odds: string;
  onAddPress?: () => void;
};

export function OpportunityFooter({ stats, odds, onAddPress }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.stats}>
        {stats.map((stat, idx) => (
          <Fragment key={stat.label}>
            {idx > 0 ? <View style={styles.divider} /> : null}
            <StatPill label={stat.label} value={stat.value} />
          </Fragment>
        ))}
      </View>
      <View style={styles.right}>
        <OddsBadge odds={odds} />
        <Pressable
          hitSlop={8}
          onPress={onAddPress}
          style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
        >
          <Icon name="addCircle" size={14} color={theme.color.icon.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space[8],
    paddingHorizontal: theme.space[12],
    paddingVertical: theme.space[8],
    borderTopWidth: 1,
    borderTopColor: theme.color.border.dark,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space[6],
    flexShrink: 1,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.color.bg.secondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[4],
  },
  addBtn: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.bg.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.compact,
  },
  addBtnPressed: {
    opacity: 0.8,
  },
});
