import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';

type TeamMark = {
  label: string;
  color: string;
};

type Props = {
  home: TeamMark;
  away: TeamMark;
  size?: number;
};

/**
 * Two overlapping team logos stacked with a slight offset.
 * Primary (home) sits on top with full opacity; away peeks behind at 0.2 opacity.
 * Mirrors the `teams` group inside the team card in Figma.
 */
export function TeamLogoStack({ home, away, size = 34 }: Props) {
  const overlap = size * 0.31;
  return (
    <View style={[styles.root, { paddingRight: overlap }]}>
      <Logo mark={home} size={size} offsetRight={overlap} zIndex={2} opacity={1} />
      <Logo mark={away} size={size} offsetRight={overlap} zIndex={1} opacity={0.2} />
    </View>
  );
}

function Logo({
  mark,
  size,
  offsetRight,
  zIndex,
  opacity,
}: {
  mark: TeamMark;
  size: number;
  offsetRight: number;
  zIndex: number;
  opacity: number;
}) {
  const radius = size / 2;
  return (
    <View
      style={{
        width: size,
        height: size,
        marginRight: -offsetRight,
        zIndex,
        opacity,
      }}
    >
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: mark.color,
          },
        ]}
      >
        <Text style={styles.label}>{mark.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.color.border.inverse,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.631 },
    shadowOpacity: 0.25,
    shadowRadius: 0.947,
    elevation: 2,
  },
  label: {
    fontFamily: theme.fontFamily.heading,
    fontSize: 11,
    fontWeight: '600',
    color: theme.color.text.primary,
  },
});
