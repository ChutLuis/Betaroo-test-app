import { render } from '@testing-library/react-native';
import { TeamCard } from '../TeamCard';
import type { TeamCardProps } from '../TeamCard';

const props: TeamCardProps = {
  matchup: {
    home: { label: 'OKC', color: '#ef5133' },
    away: { label: 'CHI', color: '#ce1141' },
    time: 'FRI 10AM',
  },
  teamName: 'Oklahoma City Thunder',
  pick: {
    market: 'Moneyline',
    confidence: 95,
    stats: [
      { label: 'L5', value: 80 },
      { label: 'L10', value: 80 },
    ],
    odds: '+172',
  },
};

describe('TeamCard', () => {
  it('renders team name, market and matchup', () => {
    const { getByText } = render(<TeamCard {...props} />);
    expect(getByText('Oklahoma City Thunder')).toBeTruthy();
    expect(getByText('Moneyline')).toBeTruthy();
    expect(getByText('OKC')).toBeTruthy();
    expect(getByText('CHI')).toBeTruthy();
    expect(getByText('FRI 10AM')).toBeTruthy();
  });

  it('renders ELITE badge for confidence >= 90', () => {
    const { getByText } = render(<TeamCard {...props} />);
    expect(getByText('ELITE')).toBeTruthy();
  });
});
