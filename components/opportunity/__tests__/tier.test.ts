import { tierFromPercentage } from '../tier';

describe('tierFromPercentage', () => {
  it.each([
    [100, 'elite'],
    [90, 'elite'],
    [89, 'strong'],
    [70, 'strong'],
    [69, 'fair'],
    [40, 'fair'],
    [39, 'risky'],
    [0, 'risky'],
  ])('maps %i → %s', (pct, expected) => {
    expect(tierFromPercentage(pct)).toBe(expected);
  });
});
