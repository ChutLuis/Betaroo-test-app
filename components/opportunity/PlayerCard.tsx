import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import type { Mark } from '@/components/primitives';
import { Avatar } from './Avatar';
import { ConfidenceBadge } from './ConfidenceBadge';
import { OpportunityCard } from './OpportunityCard';
import type { Matchup, MatchupActions, OpportunityPick } from './types';

export type Player = {
  name: string;
  position: string;
  avatar: Mark;
  /** Optional team badge overlaid on the avatar. */
  teamBadge?: Mark;
};

export type PlayerCardProps = {
  matchup: Matchup;
  player: Player;
  pick: OpportunityPick;
  actions?: MatchupActions & { onAddPress?: () => void };
  onPress?: () => void;
};

export function PlayerCard({ matchup, player, pick, actions, onPress }: PlayerCardProps) {
  return (
    <OpportunityCard
      matchup={matchup}
      pick={pick}
      actions={actions}
      onPress={onPress}
      body={
        <View style={styles.identity}>
          <Avatar {...player.avatar} badge={player.teamBadge} size={34} />
          <View style={styles.info}>
            <View style={styles.headerRow}>
              <View style={styles.nameplate}>
                <Text style={styles.name} numberOfLines={1}>
                  {player.name}
                </Text>
                <View style={styles.positionChip}>
                  <Text style={styles.positionText}>{player.position}</Text>
                </View>
              </View>
              <ConfidenceBadge value={pick.confidence} />
            </View>
            <Text style={styles.market} numberOfLines={1}>
              {pick.market}
            </Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
  info: {
    flex: 1,
    gap: theme.space[2],
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
    width: '100%',
  },
  nameplate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[4],
    minWidth: 0,
  },
  name: {
    ...theme.typography.labelSm,
    color: theme.color.text.primary,
    flexShrink: 1,
  },
  positionChip: {
    height: 12,
    minWidth: 12,
    padding: theme.space[2],
    borderRadius: theme.radius.sm,
    backgroundColor: theme.color.state.faded.lighter,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  positionText: {
    ...theme.typography.monoMini,
    color: theme.color.state.faded.base,
    textAlign: 'center',
  },
  market: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.tertiary,
  },
});
