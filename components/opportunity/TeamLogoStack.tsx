import { StyleSheet, View } from 'react-native';
import { CircleMark, type Mark } from '@/components/primitives';

type Props = {
  home: Mark;
  away: Mark;
  size?: number;
  /** Background opacity applied to the secondary (away) logo. */
  secondaryOpacity?: number;
};

/**
 * Two overlapping team logos. Ratio `0.3125` mirrors Figma's `pr-10.625` on size 34
 * (node I1:2458;146:1726;144:6434).
 */
export function TeamLogoStack({ home, away, size = 34, secondaryOpacity = 0.2 }: Props) {
  const overlap = size * 0.3125;
  return (
    <View style={[styles.root, { paddingRight: overlap }]}>
      <CircleMark size={size} {...home} style={{ marginRight: -overlap, zIndex: 2 }} />
      <CircleMark
        size={size}
        {...away}
        style={{ marginRight: -overlap, zIndex: 1, opacity: secondaryOpacity }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
