import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '../atoms/Icon';

export type LeagueOption = {
  id: string;
  name: string;
};

type Props = {
  label?: string;
  required?: boolean;
  options: LeagueOption[];
  value: string[];
  onChange: (next: string[]) => void;
};

const ROW_HEIGHT = 36;
const PANEL_PAD = 4;

export function LeagueSelect({
  label = 'Preferred Leagues',
  required = true,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const countProgress = useRef(new Animated.Value(value.length === 0 ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [open, progress]);

  useEffect(() => {
    Animated.spring(countProgress, {
      toValue: value.length === 0 ? 0 : 1,
      damping: 18,
      stiffness: 180,
      useNativeDriver: true,
    }).start();
  }, [value.length, countProgress]);

  const panelHeight = useMemo(
    () => options.length * ROW_HEIGHT + PANEL_PAD * 2,
    [options.length],
  );

  const animatedHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, panelHeight],
  });
  const panelMarginTop = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });
  const panelOpacity = progress.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, 1],
  });
  const chevronRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const ringOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const borderWhiteOpacity = progress;

  const filledOpacity = countProgress;
  const emptyOpacity = countProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const emptyTranslate = countProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  const filledTranslate = countProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 0],
  });

  const toggle = () => setOpen((o) => !o);
  const toggleItem = (id: string) => {
    const next = value.includes(id) ? value.filter((v) => v !== id) : [...value, id];
    onChange(next);
  };

  const summaryText = `${value.length} Leagues Selected`;
  const isDefaultState = !open && value.length === 0;
  const iconColor = isDefaultState ? theme.color.icon.tertiary : theme.color.icon.secondary;
  const emptyTextColor = open ? theme.color.text.primary : theme.color.text.tertiary;

  return (
    <View style={styles.root}>
      <View style={styles.fieldGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required ? <Text style={styles.required}>*</Text> : null}
        </View>

        <View style={styles.fieldWrap}>
        <Animated.View
          pointerEvents="none"
          style={[styles.focusRingOuter, { opacity: ringOpacity }]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.focusRingInner, { opacity: ringOpacity }]}
        />
        <Pressable onPress={toggle} style={styles.field}>
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              styles.fieldBorderWhite,
              { opacity: borderWhiteOpacity },
            ]}
          />
          <View style={styles.fieldLeft}>
            <Icon name="basketball" size={20} color={iconColor} />
            <View style={styles.placeholderWrap}>
              <Animated.Text
                style={[
                  styles.placeholder,
                  styles.placeholderStacked,
                  {
                    color: emptyTextColor,
                    opacity: emptyOpacity,
                    transform: [{ translateY: emptyTranslate }],
                  },
                ]}
                numberOfLines={1}
              >
                0 Leagues Selected
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.placeholder,
                  styles.placeholderStacked,
                  {
                    opacity: filledOpacity,
                    transform: [{ translateY: filledTranslate }],
                  },
                ]}
                numberOfLines={1}
              >
                {summaryText}
              </Animated.Text>
            </View>
          </View>
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <Icon name="chevronDown" size={20} color={iconColor} />
          </Animated.View>
        </Pressable>
        </View>
      </View>

      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.panel,
          { height: animatedHeight, marginTop: panelMarginTop, opacity: panelOpacity },
        ]}
      >
        <View style={styles.panelInner}>
          {options.map((opt) => {
            const selected = value.includes(opt.id);
            return (
              <Pressable
                key={opt.id}
                onPress={() => toggleItem(opt.id)}
                style={({ pressed }) => [
                  styles.row,
                  selected && styles.rowSelected,
                  pressed && styles.rowPressed,
                ]}
              >
                <View style={styles.rowLeft}>
                  <Icon name="globe" size={20} color={theme.color.icon.secondary} />
                  <Text style={styles.rowText}>{opt.name}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  fieldGroup: {
    gap: theme.space[4],
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
  },
  label: {
    ...theme.typography.labelXxs,
    color: theme.color.text.tertiary,
  },
  required: {
    ...theme.typography.labelXxs,
    color: theme.color.brand.base,
  },
  fieldWrap: {
    position: 'relative',
  },
  focusRingOuter: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: theme.radius.lg + 4,
    borderWidth: 2,
    borderColor: theme.color.border.focus,
  },
  focusRingInner: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: theme.radius.lg + 2,
    borderWidth: 2,
    borderColor: theme.color.bg.base,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.space[10],
    paddingRight: theme.space[8],
    paddingVertical: theme.space[8],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.border.primary,
    backgroundColor: theme.color.bg.base,
    gap: theme.space[8],
    ...theme.shadow.compact,
  },
  fieldBorderWhite: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.border.inverse,
  },
  fieldLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
  placeholderWrap: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
  },
  placeholderStacked: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  placeholder: {
    ...theme.typography.paragraphSm,
    color: theme.color.text.primary,
    letterSpacing: -0.084,
  },
  panel: {
    overflow: 'hidden',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.border.primary,
    backgroundColor: theme.color.bg.base,
  },
  panelInner: {
    padding: PANEL_PAD,
  },
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space[8],
    borderRadius: theme.radius.lg,
    backgroundColor: theme.color.bg.base,
  },
  rowSelected: {
    backgroundColor: theme.color.bg.primary,
    borderRadius: theme.radius.md,
  },
  rowPressed: {
    opacity: 0.8,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[8],
  },
  rowText: {
    ...theme.typography.labelSm,
    color: theme.color.text.primary,
  },
});
