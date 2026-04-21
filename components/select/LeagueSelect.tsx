import { useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/tokens';
import { Icon } from '@/components/primitives';
import { useSelectAnimation } from './useSelectAnimation';

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
  /** Override the placeholder template. Receives the current count. */
  renderSummary?: (count: number) => string;
};

const ROW_HEIGHT = 36;
const PANEL_PAD = 4;
const PANEL_OFFSET = 8;

const defaultSummary = (count: number) => `${count} Leagues Selected`;

export function LeagueSelect({
  label = 'Preferred Leagues',
  required = true,
  options,
  value,
  onChange,
  renderSummary = defaultSummary,
}: Props) {
  const [open, setOpen] = useState(false);

  const panelHeight = useMemo(
    () => options.length * ROW_HEIGHT + PANEL_PAD * 2,
    [options.length],
  );

  const anim = useSelectAnimation({
    open,
    hasValue: value.length > 0,
    panelHeight,
    panelOffset: PANEL_OFFSET,
  });

  const toggle = () => setOpen((prev) => !prev);
  const toggleItem = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const isDefaultState = !open && value.length === 0;
  const iconColor = isDefaultState ? theme.color.icon.tertiary : theme.color.icon.secondary;
  const emptyTextColor = open ? theme.color.text.primary : theme.color.text.tertiary;

  return (
    <View>
      <View style={styles.fieldGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required ? <Text style={styles.required}>*</Text> : null}
        </View>

        <View style={styles.fieldWrap}>
          <Animated.View pointerEvents="none" style={[styles.focusRingOuter, { opacity: anim.ring }]} />
          <Animated.View pointerEvents="none" style={[styles.focusRingInner, { opacity: anim.ring }]} />
          <Pressable onPress={toggle} style={styles.field}>
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFillObject,
                styles.fieldBorderWhite,
                { opacity: anim.borderWhite },
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
                      opacity: anim.empty.opacity,
                      transform: [{ translateY: anim.empty.translateY }],
                    },
                  ]}
                  numberOfLines={1}
                >
                  {renderSummary(0)}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.placeholder,
                    styles.placeholderStacked,
                    {
                      opacity: anim.filled.opacity,
                      transform: [{ translateY: anim.filled.translateY }],
                    },
                  ]}
                  numberOfLines={1}
                >
                  {renderSummary(value.length)}
                </Animated.Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ rotate: anim.chevronRotate }] }}>
              <Icon name="chevronDown" size={20} color={iconColor} />
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <Animated.View pointerEvents={open ? 'auto' : 'none'} style={[styles.panel, anim.panel]}>
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
