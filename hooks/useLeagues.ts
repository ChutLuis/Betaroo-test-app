import { leagues } from '@/mocks';
import type { LeagueOption } from '@/components/select';

export function useLeagues(): LeagueOption[] {
  return leagues;
}
