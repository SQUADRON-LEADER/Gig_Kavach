import { create } from 'zustand';

interface AppState {
  darkMode: boolean;
  language: 'hi' | 'en';
  toggleDarkMode: () => void;
  setLanguage: (lang: 'hi' | 'en') => void;
}

export const useAppStore = create<AppState>((set) => ({
  darkMode: false,
  language: 'hi',
  toggleDarkMode: () => set((state) => {
    const next = !state.darkMode;
    document.documentElement.classList.toggle('dark', next);
    return { darkMode: next };
  }),
  setLanguage: (lang) => set({ language: lang }),
}));
