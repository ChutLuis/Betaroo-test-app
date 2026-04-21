import { opportunities, type Opportunity } from '@/mocks';

/**
 * Source of opportunities. Static today; when a real API lands only this hook
 * changes — screens already consume via hook, not import.
 */
export function useOpportunities(): Opportunity[] {
  return opportunities;
}
