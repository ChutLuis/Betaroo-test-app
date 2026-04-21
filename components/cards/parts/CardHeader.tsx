import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '../../atoms/Icon';

type Props = {
  team1: string;
  team2: string;
  time: string;
  onInfoPress?: () => void;
  onSharePress?: () => void;
  onOpenPress?: () => void;
};

export function CardHeader({ team1, team2, time, onInfoPress, onSharePress, onOpenPress }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={styles.vs}>
          <Text style={[styles.meta, styles.metaActive]}>{team1}</Text>
          <Text style={[styles.atSign]}>@</Text>
          <Text style={[styles.meta, styles.metaDisabled]}>{team2}</Text>
        </View>
        <View style={styles.dot} />
        <Text style={[styles.meta, styles.metaDisabled]}>{time}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable hitSlop={8} onPress={onInfoPress} style={styles.iconBtn}>
          <Icon name="info" size={14} color={theme.color.icon.secondary} />
        </Pressable>
        <Pressable hitSlop={8} onPress={onSharePress} style={styles.iconBtn}>
          <Icon name="share" size={14} color={theme.color.icon.secondary} />
        </Pressable>
        <Pressable hitSlop={8} onPress={onOpenPress} style={styles.iconBtn}>
          <Icon name="chevronRight" size={14} color={theme.color.icon.secondary} />
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
    ...theme.typography.monoXxs,
    color: theme.color.text.disabled,
    fontSize: 10,
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
  iconBtn: {
    padding: 0,
  },
});
