import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { theme } from '@/tokens';

type Input = {
  open: boolean;
  hasValue: boolean;
  panelHeight: number;
  panelOffset: number;
};

/**
 * Drives the LeagueSelect open/close + filled/empty choreography.
 * Callers wire the returned interpolations directly to `Animated.View` styles.
 */
export function useSelectAnimation({ open, hasValue, panelHeight, panelOffset }: Input) {
  const progress = useRef(new Animated.Value(0)).current;
  const filled = useRef(new Animated.Value(hasValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: theme.motion.duration.normal,
      easing: theme.motion.easing.standard,
      useNativeDriver: false,
    }).start();
  }, [open, progress]);

  useEffect(() => {
    Animated.spring(filled, {
      toValue: hasValue ? 1 : 0,
      damping: theme.motion.spring.gentle.damping,
      stiffness: theme.motion.spring.gentle.stiffness,
      useNativeDriver: true,
    }).start();
  }, [hasValue, filled]);

  return {
    panel: {
      height: progress.interpolate({ inputRange: [0, 1], outputRange: [0, panelHeight] }),
      marginTop: progress.interpolate({ inputRange: [0, 1], outputRange: [0, panelOffset] }),
      opacity: progress.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 0, 1] }),
    },
    chevronRotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }),
    ring: progress,
    borderWhite: progress,
    empty: {
      opacity: filled.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
      translateY: filled.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }),
    },
    filled: {
      opacity: filled,
      translateY: filled.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }),
    },
  };
}
