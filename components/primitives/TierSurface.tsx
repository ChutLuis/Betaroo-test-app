import { StyleSheet, View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { EliteBackground } from './EliteBackground';

type Props = {
  /** When true, overlay the elite gradient stack; otherwise render a flat fill. */
  elite?: boolean;
  backgroundColor: string;
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

/**
 * Renders the right background for a confidence-tiered chip/pill.
 * Callers shouldn't need to know the elite stack exists.
 */
export function TierSurface({ elite = false, backgroundColor, children, style }: Props) {
  return (
    <View style={[styles.base, { backgroundColor }, style]}>
      {elite ? <EliteBackground /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
