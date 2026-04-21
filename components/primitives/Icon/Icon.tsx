import { theme } from '@/tokens';
import { iconRegistry, type IconName } from './registry';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 16, color = theme.color.icon.primary }: Props) {
  const Renderer = iconRegistry[name];
  return <Renderer size={size} color={color} />;
}

export type { IconName } from './registry';
