type Theme = 'dark' | 'light' | 'system';

export type ReceivedProps = PropsWithChildren<{
  defaultTheme?: Theme;
  forcedTheme?: Theme;
  storageKey?: string;
}>;

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

const useThemeProvider = (props: ReceivedProps) => {
  const {
    forcedTheme,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
  } = props;
  const [theme, setTheme] = useState<Theme>(() =>
    forcedTheme
      ? forcedTheme
      : (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemThemeQuery = window.matchMedia(
        '(prefers-color-scheme: dark)',
      );

      const updateTheme = () => {
        root.classList.remove('light', 'dark');

        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';

        root.classList.add(systemTheme);
      };

      updateTheme();

      systemThemeQuery.addEventListener('change', updateTheme);

      return () => {
        systemThemeQuery.removeEventListener('change', updateTheme);
      };
    }

    root.classList.add(theme);
    return;
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useThemeProvider>;

export default useThemeProvider;

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
