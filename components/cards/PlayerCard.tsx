import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { theme } from '@/tokens';
import { ConfidenceBadge } from '../atoms/ConfidenceBadge';
import { Avatar } from './parts/Avatar';
import { CardFooter, type StatLine } from './parts/CardFooter';
import { CardHeader } from './parts/CardHeader';

export type PlayerCardProps = {
  team1: string;
  team2: string;
  time: string;
  playerName: string;
  position: string;
  statLine: string;
  confidence: number;
  stats: StatLine[];
  odds: string;
  avatarLabel: string;
  avatarColor: string;
  avatarImage?: ImageSourcePropType;
  teamBadgeLabel?: string;
  teamBadgeColor?: string;
  teamBadgeImage?: ImageSourcePropType;
  onPress?: () => void;
};

export function PlayerCard({
  team1,
  team2,
  time,
  playerName,
  position,
  statLine,
  confidence,
  stats,
  odds,
  avatarLabel,
  avatarColor,
  avatarImage,
  teamBadgeLabel,
  teamBadgeColor,
  teamBadgeImage,
  onPress,
}: PlayerCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
      <CardHeader team1={team1} team2={team2} time={time} />
      <View style={styles.body}>
        <View style={styles.identity}>
          <Avatar
            label={avatarLabel}
            color={avatarColor}
            image={avatarImage}
            size={34}
            badge={
              teamBadgeLabel && teamBadgeColor
                ? { label: teamBadgeLabel, color: teamBadgeColor, image: teamBadgeImage }
                : undefined
            }
          />
          <View style={styles.info}>
            <View style={styles.headerRow}>
              <View style={styles.nameplate}>
                <Text style={styles.name} numberOfLines={1}>
                  {playerName}
                </Text>
                <View style={styles.positionChip}>
                  <Text style={styles.positionText}>{position}</Text>
                </View>
              </View>
              <ConfidenceBadge value={confidence} />
            </View>
            <Text style={styles.statLine} numberOfLines={1}>
              {statLine}
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
  statLine: {
    ...theme.typography.paragraphXxs,
    color: theme.color.text.tertiary,
  },
});
