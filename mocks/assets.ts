import type { ImageSourcePropType } from 'react-native';

export const teamLogos = {
  celtics: require('../assets/figma-icons/team-logo.png'),
  thunder: require('../assets/figma-icons/team-logo-state.png'),
  bulls: require('../assets/figma-icons/team-logo-bulls.png'),
  nuggets: require('../assets/figma-icons/team-logo-state-1.png'),
  lakers: require('../assets/figma-icons/team-logo-lakers.png'),
  suns: require('../assets/figma-icons/team-logo-suns.png'),
  sixers: require('../assets/figma-icons/team-logo-sixers.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export const playerAvatars = {
  white: require('../assets/figma-icons/image.png'),
  jaylenBrown: require('../assets/figma-icons/player-jaylen-brown.png'),
  joelEmbiid: require('../assets/figma-icons/player-joel-embiid.png'),
} as const satisfies Record<string, ImageSourcePropType>;
