import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '@/tokens';
import { MatchupHeader } from './MatchupHeader';
import { OpportunityFooter } from './OpportunityFooter';
import type { Matchup, MatchupActions, OpportunityPick } from './types';

type Props = {
  matchup: Matchup;
  pick: OpportunityPick;
  body: ReactNode;
  actions?: MatchupActions & { onAddPress?: () => void };
  onPress?: () => void;
};

export function OpportunityCard({ matchup, pick, body, actions, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
      <MatchupHeader
        home={matchup.home}
        away={matchup.away}
        time={matchup.time}
        onInfoPress={actions?.onInfoPress}
        onSharePress={actions?.onSharePress}
        onOpenPress={actions?.onOpenPress}
      />
      <View style={styles.body}>{body}</View>
      <OpportunityFooter stats={pick.stats} odds={pick.odds} onAddPress={actions?.onAddPress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.color.bg.primary,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.border.dark,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  body: {
    height: 64,
    padding: theme.space[12],
    justifyContent: 'center',
  },
});
