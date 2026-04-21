import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, type ListRenderItem } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { PlayerCard, TeamCard } from '@/components/opportunity';
import { LeagueSelect } from '@/components/select';
import { useAppFonts, useLeagues, useOpportunities } from '@/hooks';
import type { Opportunity } from '@/mocks';
import { theme } from '@/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

const renderOpportunity: ListRenderItem<Opportunity> = ({ item }) => {
  switch (item.kind) {
    case 'player':
      return <PlayerCard matchup={item.matchup} player={item.player} pick={item.pick} />;
    case 'team':
      return <TeamCard matchup={item.matchup} teamName={item.teamName} pick={item.pick} />;
  }
};

const keyExtractor = (item: Opportunity) => item.id;
const ItemSeparator = () => <View style={styles.sep} />;

export default function App() {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const fontsLoaded = useAppFonts();
  const opportunities = useOpportunities();
  const leagues = useLeagues();

  const onLayoutRoot = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safe} onLayout={onLayoutRoot}>
      <StatusBar style="light" />
      <FlatList
        data={opportunities}
        keyExtractor={keyExtractor}
        renderItem={renderOpportunity}
        ItemSeparatorComponent={ItemSeparator}
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
