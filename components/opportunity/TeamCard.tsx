import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { ConfidenceBadge } from './ConfidenceBadge';
import { OpportunityCard } from './OpportunityCard';
import { TeamLogoStack } from './TeamLogoStack';
import type { Matchup, MatchupActions, OpportunityPick } from './types';

export type TeamCardProps = {
  matchup: Matchup;
  /** Display name of the team this pick applies to. */
  teamName: string;
  pick: OpportunityPick;
  actions?: MatchupActions & { onAddPress?: () => void };
  onPress?: () => void;
};

export function TeamCard({ matchup, teamName, pick, actions, onPress }: TeamCardProps) {
  return (
    <OpportunityCard
      matchup={matchup}
      pick={pick}
      actions={actions}
      onPress={onPress}
      body={
        <View style={styles.identity}>
          <TeamLogoStack home={matchup.home} away={matchup.away} size={34} />
          <View style={styles.info}>
            <View style={styles.headerRow}>
              <Text style={styles.name} numberOfLines={1}>
                {teamName}
              </Text>
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
    minWidth: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space[6],
    width: '100%',
  },
  name: {
    ...theme.typography.labelSm,
    color: theme.color.text.primary,
    flex: 1,
  },
  market: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.tertiary,
  },
});
