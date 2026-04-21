import { render } from '@testing-library/react-native';
import { PlayerCard } from '../PlayerCard';
import type { PlayerCardProps } from '../PlayerCard';

const props: PlayerCardProps = {
  matchup: {
    home: { label: 'BOS', color: '#007A33' },
    away: { label: 'NYK', color: '#006BB6' },
    time: 'FRI 10AM',
  },
  player: {
    name: 'Derrick White',
    position: 'SG',
    avatar: { label: 'DW', color: '#bb9753' },
  },
  pick: {
    market: '+6 Assists',
    confidence: 75,
    stats: [{ label: 'L5', value: 75 }],
    odds: '+172',
  },
};

describe('PlayerCard', () => {
  it('renders matchup, player and pick labels', () => {
    const { getByText } = render(<PlayerCard {...props} />);
    expect(getByText('Derrick White')).toBeTruthy();
    expect(getByText('SG')).toBeTruthy();
    expect(getByText('+6 Assists')).toBeTruthy();
    expect(getByText('BOS')).toBeTruthy();
    expect(getByText('NYK')).toBeTruthy();
    expect(getByText('+172')).toBeTruthy();
  });
});
