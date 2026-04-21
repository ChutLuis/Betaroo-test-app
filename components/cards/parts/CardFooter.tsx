import { Fragment } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '../../atoms/Icon';
import { L5Pill } from '../../atoms/L5Pill';
import { OddsBadge } from './OddsBadge';

export type StatLine = { label: string; value: number };

type Props = {
  stats: StatLine[];
  odds: string;
  onAddPress?: () => void;
};

export function CardFooter({ stats, odds, onAddPress }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <View style={styles.stats}>
          {stats.map((s, idx) => (
            <Fragment key={s.label}>
              {idx > 0 ? <View style={styles.divider} /> : null}
              <L5Pill label={s.label} value={s.value} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: theme.space[12],
    paddingVertical: theme.space[8],
    borderTopWidth: 1,
    borderTopColor: theme.color.border.dark,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space[8],
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowColor: '#0A0D14',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  addBtnPressed: {
    opacity: 0.8,
  },
});
