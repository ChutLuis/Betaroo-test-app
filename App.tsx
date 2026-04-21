import { useCallback, useEffect, useState } from 'react';
import {
  DMMono_500Medium,
  useFonts as useDmMono,
} from '@expo-google-fonts/dm-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  useFonts as useManrope,
} from '@expo-google-fonts/manrope';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { PlayerCard } from '@/cards/PlayerCard';
import { TeamCard } from '@/cards/TeamCard';
import { LeagueSelect } from '@/select/LeagueSelect';
import { leagues } from '@/mocks/leagues';
import { opportunities, type Opportunity } from '@/mocks/opportunities';
import { theme } from '@/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

function renderOpportunity({ item }: { item: Opportunity }) {
  if (item.kind === 'player') {
    return (
      <PlayerCard
        team1={item.team1}
        team2={item.team2}
        time={item.time}
        playerName={item.playerName}
        position={item.position}
        statLine={item.statLine}
        confidence={item.confidence}
        stats={item.stats}
        odds={item.odds}
        avatarLabel={item.avatarLabel}
        avatarColor={item.avatarColor}
        teamBadgeLabel={item.teamBadgeLabel}
        teamBadgeColor={item.teamBadgeColor}
      />
    );
  }
  return (
    <TeamCard
      team1={item.team1}
      team2={item.team2}
      time={item.time}
      teamName={item.teamName}
      market={item.market}
      confidence={item.confidence}
      stats={item.stats}
      odds={item.odds}
      home={item.home}
      away={item.away}
    />
  );
}

export default function App() {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [manropeLoaded] = useManrope({ Manrope_500Medium, Manrope_600SemiBold });
  const [interLoaded] = useInter({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const [dmMonoLoaded] = useDmMono({ DMMono_500Medium });
  const fontsLoaded = manropeLoaded && interLoaded && dmMonoLoaded;

  const onLayoutRoot = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safe} onLayout={onLayoutRoot}>
      <StatusBar style="light" />
      <FlatList
        data={opportunities}
        keyExtractor={(it) => it.id}
        renderItem={renderOpportunity}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Today's Opportunities</Text>
            <Text style={styles.subtitle}>{opportunities.length} edges tracked</Text>
            <View style={styles.selectWrap}>
              <LeagueSelect
                options={leagues}
                value={selectedLeagues}
                onChange={setSelectedLeagues}
              />
            </View>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.color.bg.base,
  },
  list: {
    paddingHorizontal: theme.space[16],
    paddingBottom: theme.space[48],
  },
  header: {
    paddingTop: theme.space[24],
    paddingBottom: theme.space[16],
    gap: theme.space[4],
  },
  title: {
    ...theme.typography.headingSm,
    color: theme.color.text.primary,
  },
  subtitle: {
    ...theme.typography.paragraphXs,
    color: theme.color.text.tertiary,
    marginBottom: theme.space[16],
  },
  selectWrap: {
    marginTop: theme.space[8],
  },
  sep: {
    height: theme.space[12],
  },
});
