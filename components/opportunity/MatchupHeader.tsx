import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '@/components/primitives';
import type { Matchup, MatchupActions } from './types';

type Props = Pick<Matchup, 'home' | 'away' | 'time'> & MatchupActions;

const ACTIONS = [
  { icon: 'info', handlerKey: 'onInfoPress' },
  { icon: 'share', handlerKey: 'onSharePress' },
  { icon: 'chevronRight', handlerKey: 'onOpenPress' },
] as const;

export function MatchupHeader({ home, away, time, ...actions }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={styles.vs}>
          <Text style={[styles.meta, styles.metaActive]}>{home.label}</Text>
          <Text style={[styles.meta, styles.metaDisabled, styles.atSign]}>@</Text>
          <Text style={[styles.meta, styles.metaDisabled]}>{away.label}</Text>
        </View>
        <View style={styles.dot} />
        <Text style={[styles.meta, styles.metaDisabled]}>{time}</Text>
      </View>
      <View style={styles.actions}>
        {ACTIONS.map(({ icon, handlerKey }) => (
          <Pressable key={icon} hitSlop={8} onPress={actions[handlerKey]}>
            <Icon name={icon} size={14} color={theme.color.icon.secondary} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.space[12],
    paddingRight: theme.space[8],
    paddingVertical: theme.space[6],
    borderBottomWidth: 1,
    borderBottomColor: theme.color.border.dark,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[6],
    flexShrink: 1,
  },
  vs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[4],
  },
  meta: {
    ...theme.typography.monoXxs,
  },
  metaActive: {
    color: theme.color.text.tertiary,
  },
  metaDisabled: {
    color: theme.color.text.disabled,
  },
  atSign: {
    // Figma glyph (`data-name="vs"`) is an @ character at 9px.
    fontSize: 9,
    letterSpacing: 0,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: theme.color.text.disabled,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[6],
  },
});
