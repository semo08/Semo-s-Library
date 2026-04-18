import { create } from 'zustand';
import { colors, darkColors } from '../constants/colors';

interface ThemeState {
  isDarkMode: boolean;
  colors: typeof colors;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,
  colors: colors,

  toggleDarkMode: () => {
    const next = !get().isDarkMode;
    set({
      isDarkMode: next,
      colors: next ? darkColors : colors,
    });
  },
}));
