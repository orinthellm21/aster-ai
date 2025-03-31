import { type FC } from 'react';
import useThemeProvider, {
  ThemeProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';

const ThemeProviderLayout: FC<Props> = (props) => {
  const { children, value } = props;
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

const ThemeProvider: FC<ReceivedProps> = (props) => (
  <ThemeProviderLayout {...useThemeProvider(props)} />
);

export default ThemeProvider;
