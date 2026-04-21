import { DMMono_500Medium, useFonts as useDmMono } from '@expo-google-fonts/dm-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  useFonts as useManrope,
} from '@expo-google-fonts/manrope';

/**
 * Loads the three Google Font families the theme references.
 * Returns a single boolean so callers don't have to AND 3 hooks together.
 */
export function useAppFonts(): boolean {
  const [manrope] = useManrope({ Manrope_500Medium, Manrope_600SemiBold });
  const [inter] = useInter({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const [dmMono] = useDmMono({ DMMono_500Medium });
  return manrope && inter && dmMono;
}
