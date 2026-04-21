import type { PlayerCardProps } from '@/cards/PlayerCard';
import type { TeamCardProps } from '@/cards/TeamCard';

export type Opportunity =
  | ({ kind: 'player'; id: string } & PlayerCardProps)
  | ({ kind: 'team'; id: string } & TeamCardProps);

const playerWhite = require('../assets/figma-icons/image.png');
const logoCeltics = require('../assets/figma-icons/team-logo.png');
const logoThunder = require('../assets/figma-icons/team-logo-state.png');
const logoBulls = require('../assets/figma-icons/team-logo-bulls.png');
const logoNuggets = require('../assets/figma-icons/team-logo-state-1.png');
const logoLakers = require('../assets/figma-icons/team-logo-lakers.png');
const logoSuns = require('../assets/figma-icons/team-logo-suns.png');
const logoSixers = require('../assets/figma-icons/team-logo-sixers.png');
const playerJaylen = require('../assets/figma-icons/player-jaylen-brown.png');
const playerEmbiid = require('../assets/figma-icons/player-joel-embiid.png');

export const opportunities: Opportunity[] = [
  {
    kind: 'team',
    id: 'okc-chi-ml',
    team1: 'OKC',
    team2: 'CHI',
    time: 'FRI 10AM',
    teamName: 'Oklahoma City Thunder',
    market: 'Moneyline',
    confidence: 95,
    stats: [
      { label: 'L5', value: 80 },
      { label: 'L10', value: 80 },
      { label: 'L20', value: 80 },
    ],
    odds: '+172',
    home: { label: 'OKC', color: '#ef5133', image: logoThunder },
    away: { label: 'CHI', color: '#ce1141', image: logoBulls },
  },
  {
    kind: 'player',
    id: 'cel-gsw-dw',
    team1: 'CEL',
    team2: 'GSW',
    time: 'FRI 10AM',
    playerName: 'Derrick White',
    position: 'SG',
    statLine: '+6 Assists',
    confidence: 75,
    stats: [
      { label: 'L5', value: 75 },
      { label: 'L10', value: 72 },
      { label: 'L20', value: 71 },
    ],
    odds: '+172',
    avatarLabel: 'DW',
    avatarColor: '#bb9753',
    avatarImage: playerWhite,
    teamBadgeLabel: 'C',
    teamBadgeColor: '#008348',
    teamBadgeImage: logoCeltics,
  },
  {
    kind: 'team',
    id: 'lal-bos-sprd',
    team1: 'LAL',
    team2: 'BOS',
    time: 'SAT 7PM',
    teamName: 'Los Angeles Lakers',
    market: 'Spread -3.5',
    confidence: 55,
    stats: [
      { label: 'L5', value: 55 },
      { label: 'L10', value: 58 },
      { label: 'L20', value: 52 },
    ],
    odds: '-110',
    home: { label: 'LAL', color: '#552583', image: logoLakers },
    away: { label: 'BOS', color: '#007A33', image: logoCeltics },
  },
  {
    kind: 'player',
    id: 'mia-nyk-jb',
    team1: 'MIA',
    team2: 'NYK',
    time: 'SUN 6PM',
    playerName: 'Jaylen Brown',
    position: 'SF',
    statLine: '+24.5 Points',
    confidence: 95,
    stats: [
      { label: 'L5', value: 92 },
      { label: 'L10', value: 88 },
      { label: 'L20', value: 84 },
    ],
    odds: '-135',
    avatarLabel: 'JB',
    avatarColor: '#007A33',
    avatarImage: playerJaylen,
    teamBadgeLabel: 'B',
    teamBadgeColor: '#008348',
    teamBadgeImage: logoCeltics,
  },
  {
    kind: 'team',
    id: 'den-pho-total',
    team1: 'DEN',
    team2: 'PHO',
    time: 'MON 9PM',
    teamName: 'Denver Nuggets',
    market: 'Total Over 221.5',
    confidence: 75,
    stats: [
      { label: 'L5', value: 78 },
      { label: 'L10', value: 73 },
      { label: 'L20', value: 70 },
    ],
    odds: '+108',
    home: { label: 'DEN', color: '#0d2240', image: logoNuggets },
    away: { label: 'PHO', color: '#E56020', image: logoSuns },
  },
  {
    kind: 'player',
    id: 'phi-tor-je',
    team1: 'PHI',
    team2: 'TOR',
    time: 'TUE 7PM',
    playerName: 'Joel Embiid',
    position: 'C',
    statLine: '+10.5 Rebounds',
    confidence: 25,
    stats: [
      { label: 'L5', value: 32 },
      { label: 'L10', value: 38 },
      { label: 'L20', value: 42 },
    ],
    odds: '+240',
    avatarLabel: 'JE',
    avatarColor: '#ED174C',
    avatarImage: playerEmbiid,
    teamBadgeLabel: 'P',
    teamBadgeColor: '#006BB6',
    teamBadgeImage: logoSixers,
  },
];
