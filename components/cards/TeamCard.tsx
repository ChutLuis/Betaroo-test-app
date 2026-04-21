import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { ConfidenceBadge } from '../atoms/ConfidenceBadge';
import type { ConfidenceTier } from '../atoms/confidence';
import { CardFooter, type StatLine } from './parts/CardFooter';
import { CardHeader } from './parts/CardHeader';
import { TeamLogoStack } from './parts/TeamLogoStack';

export type TeamCardProps = {
  team1: string;
  team2: string;
  time: string;
  teamName: string;
  market: string;
  confidence: ConfidenceTier;
  stats: StatLine[];
  odds: string;
  home: { label: string; color: string };
  away: { label: string; color: string };
  onPress?: () => void;
};

export function TeamCard({
  team1,
  team2,
  time,
  teamName,
  market,
  confidence,
  stats,
  odds,
  home,
  away,
  onPress,
}: TeamCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
      <CardHeader team1={team1} team2={team2} time={time} />
      <View style={styles.body}>
        <View style={styles.identity}>
          <TeamLogoStack home={home} away={away} size={34} />
          <View style={styles.info}>
            <View style={styles.headerRow}>
              <Text style={styles.name} numberOfLines={1}>
                {teamName}
              </Text>
              <ConfidenceBadge tier={confidence} />
            </View>
            <Text style={styles.market} numberOfLines={1}>
              {market}
            </Text>
          </View>
        </View>
      </View>
      <CardFooter stats={stats} odds={odds} />
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
