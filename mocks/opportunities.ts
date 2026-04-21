import type { PlayerCardProps, TeamCardProps } from '@/components/opportunity';
import { playerAvatars, teamLogos } from './assets';

export type Opportunity =
  | ({ kind: 'player'; id: string } & PlayerCardProps)
  | ({ kind: 'team'; id: string } & TeamCardProps);

const matchups = {
  okcChi: {
    home: { label: 'OKC', color: '#ef5133', image: teamLogos.thunder },
    away: { label: 'CHI', color: '#ce1141', image: teamLogos.bulls },
    time: 'FRI 10AM',
  },
  celGsw: {
    home: { label: 'CEL', color: '#008348', image: teamLogos.celtics },
    away: { label: 'GSW', color: '#1D428A', image: teamLogos.celtics },
    time: 'FRI 10AM',
  },
  lalBos: {
    home: { label: 'LAL', color: '#552583', image: teamLogos.lakers },
    away: { label: 'BOS', color: '#007A33', image: teamLogos.celtics },
    time: 'SAT 7PM',
  },
  miaNyk: {
    home: { label: 'MIA', color: '#98002E', image: teamLogos.celtics },
    away: { label: 'NYK', color: '#006BB6', image: teamLogos.celtics },
    time: 'SUN 6PM',
  },
  denPho: {
    home: { label: 'DEN', color: '#0d2240', image: teamLogos.nuggets },
    away: { label: 'PHO', color: '#E56020', image: teamLogos.suns },
    time: 'MON 9PM',
  },
  phiTor: {
    home: { label: 'PHI', color: '#006BB6', image: teamLogos.sixers },
    away: { label: 'TOR', color: '#CE1141', image: teamLogos.sixers },
    time: 'TUE 7PM',
  },
};

export const opportunities: Opportunity[] = [
  {
    kind: 'team',
    id: 'okc-chi-ml',
    matchup: matchups.okcChi,
    teamName: 'Oklahoma City Thunder',
    pick: {
      market: 'Moneyline',
      confidence: 95,
      stats: [
        { label: 'L5', value: 80 },
        { label: 'L10', value: 80 },
        { label: 'L20', value: 80 },
      ],
      odds: '+172',
    },
  },
  {
    kind: 'player',
    id: 'cel-gsw-dw',
    matchup: matchups.celGsw,
    player: {
      name: 'Derrick White',
      position: 'SG',
      avatar: { label: 'DW', color: '#bb9753', image: playerAvatars.white },
      teamBadge: { label: 'C', color: '#008348', image: teamLogos.celtics },
    },
    pick: {
      market: '+6 Assists',
      confidence: 75,
      stats: [
        { label: 'L5', value: 75 },
        { label: 'L10', value: 72 },
        { label: 'L20', value: 71 },
      ],
      odds: '+172',
    },
  },
  {
    kind: 'team',
    id: 'lal-bos-sprd',
    matchup: matchups.lalBos,
    teamName: 'Los Angeles Lakers',
    pick: {
      market: 'Spread -3.5',
      confidence: 55,
      stats: [
        { label: 'L5', value: 55 },
        { label: 'L10', value: 58 },
        { label: 'L20', value: 52 },
      ],
      odds: '-110',
    },
  },
  {
    kind: 'player',
    id: 'mia-nyk-jb',
    matchup: matchups.miaNyk,
    player: {
      name: 'Jaylen Brown',
      position: 'SF',
      avatar: { label: 'JB', color: '#007A33', image: playerAvatars.jaylenBrown },
      teamBadge: { label: 'B', color: '#008348', image: teamLogos.celtics },
    },
    pick: {
      market: '+24.5 Points',
      confidence: 95,
      stats: [
        { label: 'L5', value: 92 },
        { label: 'L10', value: 88 },
        { label: 'L20', value: 84 },
      ],
      odds: '-135',
    },
  },
  {
    kind: 'team',
    id: 'den-pho-total',
    matchup: matchups.denPho,
    teamName: 'Denver Nuggets',
    pick: {
      market: 'Total Over 221.5',
      confidence: 75,
      stats: [
        { label: 'L5', value: 78 },
        { label: 'L10', value: 73 },
        { label: 'L20', value: 70 },
      ],
      odds: '+108',
    },
  },
  {
    kind: 'player',
    id: 'phi-tor-je',
    matchup: matchups.phiTor,
    player: {
      name: 'Joel Embiid',
      position: 'C',
      avatar: { label: 'JE', color: '#ED174C', image: playerAvatars.joelEmbiid },
      teamBadge: { label: 'P', color: '#006BB6', image: teamLogos.sixers },
    },
    pick: {
      market: '+10.5 Rebounds',
      confidence: 25,
      stats: [
        { label: 'L5', value: 32 },
        { label: 'L10', value: 38 },
        { label: 'L20', value: 42 },
      ],
      odds: '+240',
    },
  },
];
